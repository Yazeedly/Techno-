import { KnowledgeDocument, KnowledgeChunk, ConflictItem, DocumentStatus, ServicePackage, VersionHistoryEntry, ConflictWarning } from '../types';
import { INITIAL_DOCUMENTS, INITIAL_SERVICES } from '../data/seedData';
import { db } from './firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';

// Helper function to normalize Arabic text for robust search matching
export function normalizeArabicText(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[\u064B-\u0652]/g, '') // Remove tashkeel (diacritics)
    .replace(/[أإآء]/g, 'ا')        // Normalize Alef variants
    .replace(/ة/g, 'ه')            // Normalize Teh Marbuta to Heh
    .replace(/ى/g, 'ي')            // Normalize Alef Maqsura to Yeh
    .replace(/[^\w\s\u0600-\u06FF]/g, ' ') // Replace special symbols with spaces
    .replace(/\s+/g, ' ')
    .trim();
}

// Helper to clean and format raw Arabic document content into structured solution layout
export function formatArabicSolutionContent(rawContent: string): string {
  if (!rawContent) return '';
  let cleaned = rawContent.trim();

  // If content is plain text or JSON string, ensure neat Arabic paragraphs and section headings
  cleaned = cleaned
    .replace(/([0-9]+\.)\s*/g, '\n$1 ')
    .replace(/(-|\u2022)\s*/g, '\n• ')
    .replace(/\n{3,}/g, '\n\n');

  return cleaned;
}

// Auto-generate Arabic telecom keywords based on content inspection
export function autoExtractArabicKeywords(title: string, content: string, existingKeywords: string[] = []): string[] {
  const norm = normalizeArabicText(title + ' ' + content);
  const keywordSet = new Set<string>(existingKeywords.map(k => k.trim()).filter(Boolean));

  const keywordMap: Record<string, string> = {
    'فايبر': 'الألياف البصرية',
    'الياف': 'الألياف البصرية',
    'ftth': 'FTTH',
    '4g': 'الجيل الرابع 4G',
    'جيل رابع': 'الجيل الرابع 4G',
    'myfi': 'MyFi ماي فاي',
    'ماي فاي': 'MyFi ماي فاي',
    'راوتر': 'راوتر',
    'مودم': 'إعدادات المودم',
    'apn': 'إعدادات APN',
    'سرعه': 'اختبار السرعة',
    'انقطاع': 'أعطال الاتصال',
    'شريحه': 'شريحة البيانات',
    'باقه': 'باقات البيانات',
    'اشتراك': 'تجديد الاشتراك',
    'تغطيه': 'تغطية الشبكة',
    'شحن': 'كروت الشحن',
    'اي بي': 'IP Static',
    'ip': 'IP Static',
  };

  Object.entries(keywordMap).forEach(([key, val]) => {
    if (norm.includes(key)) {
      keywordSet.add(val);
    }
  });

  if (keywordSet.size === 0) {
    keywordSet.add('الدعم الفني LTT');
    keywordSet.add('إرشادات الحلول');
  }

  return Array.from(keywordSet);
}

export class KnowledgeProvider {
  private static localDocs: KnowledgeDocument[] = [...INITIAL_DOCUMENTS];

  // Retrieve top relevant chunks for RAG based on user query and persona
  public static async retrieveRelevantChunks(userQuery: string, limit: number = 5): Promise<KnowledgeChunk[]> {
    const queryNorm = normalizeArabicText(userQuery);
    const keywords = queryNorm.split(/\s+/).filter(k => k.length > 1);

    let allDocs = await this.getAllApprovedDocuments();

    const chunks: KnowledgeChunk[] = [];

    for (const docItem of allDocs) {
      // Clean and format content
      const formattedContent = formatArabicSolutionContent(docItem.content);
      const paragraphs = formattedContent.split(/\n\s*\n/).filter(p => p.trim().length > 10);
      
      paragraphs.forEach((p, idx) => {
        let score = 0;
        const pNorm = normalizeArabicText(p);
        const titleNorm = normalizeArabicText(docItem.title);
        const sourceNorm = normalizeArabicText(docItem.sourceName);
        const keywordsNorm = docItem.keywords.map(normalizeArabicText);

        keywords.forEach(kw => {
          if (pNorm.includes(kw)) score += 3;
          if (titleNorm.includes(kw)) score += 5;
          if (sourceNorm.includes(kw)) score += 2;
          if (keywordsNorm.some(k => k.includes(kw))) score += 4;
        });

        // Extra boost for solution steps / procedures
        if (pNorm.includes('خطوات') || pNorm.includes('حل') || pNorm.includes('طريقة') || pNorm.includes('الضبط')) {
          score += 2;
        }

        if (score > 0) {
          chunks.push({
            id: `${docItem.id}-chunk-${idx}`,
            documentId: docItem.id,
            docTitle: docItem.title,
            category: docItem.category,
            content: p.trim(),
            version: docItem.version,
            sourceName: docItem.sourceName,
            updatedAt: docItem.updatedAt,
            keywords: docItem.keywords,
            score,
          });
        }
      });
    }

    // Sort by relevance score
    chunks.sort((a, b) => (b.score || 0) - (a.score || 0));

    // If no exact keyword match was found, return top general approved chunks
    if (chunks.length === 0) {
      return allDocs.slice(0, 3).map((d, i) => ({
        id: `${d.id}-fallback-${i}`,
        documentId: d.id,
        docTitle: d.title,
        category: d.category,
        content: d.content.slice(0, 350) + '...',
        version: d.version,
        sourceName: d.sourceName,
        updatedAt: d.updatedAt,
        keywords: d.keywords,
        score: 1,
      }));
    }

    return chunks.slice(0, limit);
  }

  // Merge Firestore documents with local initial documents safely
  public static async getAllApprovedDocuments(): Promise<KnowledgeDocument[]> {
    let firestoreDocs: KnowledgeDocument[] = [];
    try {
      const q = query(collection(db, 'knowledgeDocuments'), where('status', '==', 'approved'));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        firestoreDocs = snapshot.docs.map(docSnap => ({
          id: docSnap.id,
          ...docSnap.data()
        })) as KnowledgeDocument[];
      }
    } catch (e) {
      console.warn('Firestore fetch fallback to local seed documents:', e);
    }

    // Deduplicate by ID or Title between Firestore and Local
    const docMap = new Map<string, KnowledgeDocument>();
    this.localDocs.filter(d => d.status === 'approved').forEach(d => docMap.set(d.id, d));
    firestoreDocs.forEach(d => docMap.set(d.id, d));

    return Array.from(docMap.values());
  }

  // Get ALL documents regardless of status (for Knowledge Admins)
  public static async getAllDocuments(): Promise<KnowledgeDocument[]> {
    let firestoreDocs: KnowledgeDocument[] = [];
    try {
      const snapshot = await getDocs(collection(db, 'knowledgeDocuments'));
      if (!snapshot.empty) {
        firestoreDocs = snapshot.docs.map(docSnap => ({
          id: docSnap.id,
          ...docSnap.data()
        })) as KnowledgeDocument[];
      }
    } catch (e) {
      console.warn('Firestore fetch fallback to local seed:', e);
    }

    const docMap = new Map<string, KnowledgeDocument>();
    this.localDocs.forEach(d => docMap.set(d.id, d));
    firestoreDocs.forEach(d => docMap.set(d.id, d));

    return Array.from(docMap.values());
  }

  // Duplicate and Conflict Detection Engine
  public static async detectDuplicatesAndConflictsForDoc(newTitle: string, newContent: string, currentDocId?: string): Promise<ConflictWarning[]> {
    const allDocs = await this.getAllDocuments();
    const warnings: ConflictWarning[] = [];

    const normNewTitle = normalizeArabicText(newTitle);
    const normNewContent = normalizeArabicText(newContent);
    const newTokens = new Set(normNewTitle.split(' ').concat(normNewContent.split(' ')).filter(t => t.length > 2));

    for (const existing of allDocs) {
      if (currentDocId && existing.id === currentDocId) continue;

      const normExistTitle = normalizeArabicText(existing.title);
      const normExistContent = normalizeArabicText(existing.content);

      // Title exact or high overlap check
      if (normNewTitle.length > 3 && normExistTitle.length > 3) {
        if (normNewTitle === normExistTitle) {
          warnings.push({
            existingDocId: existing.id,
            existingTitle: existing.title,
            existingVersion: existing.version,
            similarityScore: 98,
            conflictType: 'duplicate',
            details: `مستند مكرر بالكامل بنفس العنوان: "${existing.title}" (${existing.status === 'approved' ? 'معتمد' : 'مسودة'}).`
          });
          continue;
        } else if (normNewTitle.includes(normExistTitle) || normExistTitle.includes(normNewTitle)) {
          warnings.push({
            existingDocId: existing.id,
            existingTitle: existing.title,
            existingVersion: existing.version,
            similarityScore: 85,
            conflictType: 'duplicate',
            details: `تشابه عالٍ جداً في العنوان مع المستند: "${existing.title}".`
          });
        }
      }

      // Content Token Similarity check (Jaccard Index)
      const existTokens = new Set(normExistTitle.split(' ').concat(normExistContent.split(' ')).filter(t => t.length > 2));
      let intersection = 0;
      newTokens.forEach(t => {
        if (existTokens.has(t)) intersection++;
      });

      const union = new Set([...newTokens, ...existTokens]).size;
      const jaccardScore = union > 0 ? Math.round((intersection / union) * 100) : 0;

      if (jaccardScore >= 45 && !warnings.some(w => w.existingDocId === existing.id)) {
        warnings.push({
          existingDocId: existing.id,
          existingTitle: existing.title,
          existingVersion: existing.version,
          similarityScore: jaccardScore,
          conflictType: jaccardScore >= 75 ? 'duplicate' : 'conflicting_content',
          details: `تشابه المحتوى بنسبة ${jaccardScore}% مع المستند المعتمد (${existing.title}). يرجى المراجعة.`
        });
      }
    }

    return warnings;
  }

  // Create Version History Entry Helper
  public static createVersionEntry(
    version: string,
    status: DocumentStatus,
    updatedBy: string,
    changeSummary: string,
    contentSnippet?: string
  ): VersionHistoryEntry {
    return {
      id: `ver-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      version,
      status,
      updatedAt: new Date().toISOString().split('T')[0],
      updatedBy,
      changeSummary,
      contentSnippet: contentSnippet ? contentSnippet.slice(0, 100) + '...' : undefined
    };
  }

  // Add new document to Knowledge Base (Defaults to Draft unless approved)
  public static async addDocument(docData: Omit<KnowledgeDocument, 'id'>): Promise<string> {
    const enrichedKeywords = autoExtractArabicKeywords(docData.title, docData.content, docData.keywords);
    const formattedContent = formatArabicSolutionContent(docData.content);

    const docStatus: DocumentStatus = docData.status || 'draft';
    const conflicts = await this.detectDuplicatesAndConflictsForDoc(docData.title, formattedContent);

    const initialHistory: VersionHistoryEntry[] = docData.versionHistory || [
      this.createVersionEntry(
        docData.version || '1.0',
        docStatus,
        docData.createdBy || 'النظام الإداري',
        docStatus === 'approved' ? 'إنشاء واعتماد المستند مباشرة' : 'إنشاء مسودة مستند جديدة وحفظها لمعاينة الفرز'
      )
    ];

    const newDocObj: KnowledgeDocument = {
      ...docData,
      status: docStatus,
      keywords: enrichedKeywords,
      content: formattedContent,
      description: docData.description || formattedContent.slice(0, 140) + '...',
      versionHistory: initialHistory,
      conflictWarnings: conflicts,
      id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`
    };

    try {
      const docRef = await addDoc(collection(db, 'knowledgeDocuments'), newDocObj);
      newDocObj.id = docRef.id;
    } catch (e) {
      console.warn('Added to local memory fallback:', e);
      this.localDocs.unshift(newDocObj);
    }

    return newDocObj.id;
  }

  // Process and optimize all database items for clean Arabic presentation and high solution accuracy
  public static async processAndOptimizeDatabase(): Promise<{ processedCount: number; enrichedKeywordsCount: number }> {
    const allDocs = await this.getAllDocuments();
    let processedCount = 0;
    let enrichedKeywordsCount = 0;

    for (const d of allDocs) {
      const formatted = formatArabicSolutionContent(d.content);
      const newKeywords = autoExtractArabicKeywords(d.title, formatted, d.keywords);
      
      const isUpdated = formatted !== d.content || newKeywords.length !== d.keywords.length;

      if (isUpdated) {
        d.content = formatted;
        d.keywords = newKeywords;
        processedCount++;
        enrichedKeywordsCount += newKeywords.length;

        // Sync back to Firestore if document exists there
        try {
          const docRef = doc(db, 'knowledgeDocuments', d.id);
          await updateDoc(docRef, {
            content: formatted,
            keywords: newKeywords,
            updatedAt: new Date().toISOString().split('T')[0]
          });
        } catch (err) {
          // Local fallback update
          const localItem = this.localDocs.find(item => item.id === d.id);
          if (localItem) {
            localItem.content = formatted;
            localItem.keywords = newKeywords;
          }
        }
      }
    }

    return { processedCount, enrichedKeywordsCount };
  }

  // Update entire document data
  public static async updateDocument(
    docId: string, 
    updatedData: Partial<KnowledgeDocument>,
    updatedBy: string = 'مدير المعرفة',
    changeSummary: string = 'تحديث بيانات وسياق المستند'
  ): Promise<void> {
    const todayStr = new Date().toISOString().split('T')[0];
    const allDocs = await this.getAllDocuments();
    const existingDoc = allDocs.find(d => d.id === docId);

    const patchObj: Partial<KnowledgeDocument> = {
      ...updatedData,
      updatedAt: todayStr,
    };

    if (updatedData.content || updatedData.title) {
      const docTitle = updatedData.title || existingDoc?.title || '';
      const docContent = updatedData.content || existingDoc?.content || '';
      if (docContent) patchObj.content = formatArabicSolutionContent(docContent);
      patchObj.keywords = autoExtractArabicKeywords(docTitle, patchObj.content || docContent, updatedData.keywords || existingDoc?.keywords);

      // Re-evaluate conflicts
      patchObj.conflictWarnings = await this.detectDuplicatesAndConflictsForDoc(docTitle, patchObj.content || docContent, docId);
    }

    // Append version history entry
    const currentVer = updatedData.version || existingDoc?.version || '1.0';
    const currentStatus = updatedData.status || existingDoc?.status || 'draft';
    const currentHistory = existingDoc?.versionHistory || [];

    const newHistoryEntry = this.createVersionEntry(
      currentVer,
      currentStatus,
      updatedBy,
      changeSummary,
      patchObj.content || existingDoc?.content
    );

    patchObj.versionHistory = [newHistoryEntry, ...currentHistory];

    try {
      const docRef = doc(db, 'knowledgeDocuments', docId);
      await updateDoc(docRef, patchObj as Record<string, unknown>);
    } catch (e) {
      console.warn('Local update fallback:', e);
    }

    const idx = this.localDocs.findIndex(d => d.id === docId);
    if (idx !== -1) {
      this.localDocs[idx] = { ...this.localDocs[idx], ...patchObj };
    }
  }

  // Delete document
  public static async deleteDocument(docId: string): Promise<void> {
    try {
      const docRef = doc(db, 'knowledgeDocuments', docId);
      await deleteDoc(docRef);
    } catch (e) {
      console.warn('Local delete fallback:', e);
    }

    this.localDocs = this.localDocs.filter(d => d.id !== docId);
  }

  // Local storage cache for Services
  private static localServices: ServicePackage[] = [...INITIAL_SERVICES];

  // Service Packages CRUD Operations (Dynamically updated according to market changes)
  public static async getAllServices(): Promise<ServicePackage[]> {
    let firestoreServices: ServicePackage[] = [];
    try {
      const snapshot = await getDocs(collection(db, 'servicePackages'));
      if (!snapshot.empty) {
        firestoreServices = snapshot.docs.map(docSnap => ({
          id: docSnap.id,
          ...docSnap.data()
        })) as ServicePackage[];
      }
    } catch (e) {
      console.warn('Firestore services fetch fallback:', e);
    }

    const srvMap = new Map<string, ServicePackage>();
    this.localServices.forEach(s => srvMap.set(s.id, s));
    firestoreServices.forEach(s => srvMap.set(s.id, s));

    return Array.from(srvMap.values());
  }

  public static async addServicePackage(serviceData: Omit<ServicePackage, 'id'>): Promise<string> {
    const newService: ServicePackage = {
      ...serviceData,
      id: `srv-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`
    };

    try {
      const docRef = await addDoc(collection(db, 'servicePackages'), newService);
      newService.id = docRef.id;
    } catch (e) {
      console.warn('Local services fallback add:', e);
      this.localServices.unshift(newService);
    }

    return newService.id;
  }

  public static async updateServicePackage(serviceId: string, updatedData: Partial<ServicePackage>): Promise<void> {
    try {
      const docRef = doc(db, 'servicePackages', serviceId);
      await updateDoc(docRef, updatedData as Record<string, unknown>);
    } catch (e) {
      console.warn('Local services fallback update:', e);
    }

    const idx = this.localServices.findIndex(s => s.id === serviceId);
    if (idx !== -1) {
      this.localServices[idx] = { ...this.localServices[idx], ...updatedData };
    }
  }

  public static async deleteServicePackage(serviceId: string): Promise<void> {
    try {
      const docRef = doc(db, 'servicePackages', serviceId);
      await deleteDoc(docRef);
    } catch (e) {
      console.warn('Local services fallback delete:', e);
    }

    this.localServices = this.localServices.filter(s => s.id !== serviceId);
  }

  // Update document status (e.g., Approve / Reject / Archive)
  public static async updateDocumentStatus(
    docId: string, 
    status: DocumentStatus, 
    approvedBy: string = 'مدير المعرفة',
    changeSummary?: string
  ): Promise<void> {
    const todayStr = new Date().toISOString().split('T')[0];
    const allDocs = await this.getAllDocuments();
    const docItem = allDocs.find(d => d.id === docId);

    const versionHistory = docItem?.versionHistory || [];
    const summaryText = changeSummary || (
      status === 'approved' 
        ? `اعتماد المستند رسمياً بواسطة ${approvedBy} ونشره في RAG` 
        : status === 'rejected'
        ? `رفض المستند بواسطة ${approvedBy}`
        : `تحديث حالة المستند إلى ${status}`
    );

    const newHistoryEntry = this.createVersionEntry(
      docItem?.version || '1.0',
      status,
      approvedBy,
      summaryText,
      docItem?.content
    );

    const updatedHistory = [newHistoryEntry, ...versionHistory];

    const patch = {
      status,
      approvedBy: status === 'approved' ? approvedBy : (docItem?.approvedBy || approvedBy),
      updatedAt: todayStr,
      versionHistory: updatedHistory
    };

    try {
      const docRef = doc(db, 'knowledgeDocuments', docId);
      await updateDoc(docRef, patch as Record<string, unknown>);
    } catch (e) {
      console.warn('Local update fallback:', e);
    }

    const found = this.localDocs.find(d => d.id === docId);
    if (found) {
      found.status = status;
      if (status === 'approved') found.approvedBy = approvedBy;
      found.updatedAt = todayStr;
      found.versionHistory = updatedHistory;
    }
  }

  // Conflict Detection Engine
  public static detectConflicts(docs: KnowledgeDocument[]): ConflictItem[] {
    const conflicts: ConflictItem[] = [];

    for (let i = 0; i < docs.length; i++) {
      for (let j = i + 1; j < docs.length; j++) {
        const d1 = docs[i];
        const d2 = docs[j];

        if (d1.category === d2.category && d1.id !== d2.id) {
          const norm1 = normalizeArabicText(d1.content);
          const norm2 = normalizeArabicText(d2.content);

          if ((norm1.includes('4g') || norm1.includes('فايبر')) && (norm2.includes('4g') || norm2.includes('فايبر'))) {
            if (d1.version !== d2.version) {
              conflicts.push({
                id: `cfl-${d1.id}-${d2.id}`,
                title: `تعارض إرشادات وقواعد ${d1.category}`,
                type: 'policy_procedure',
                doc1: { id: d1.id, title: d1.title, version: d1.version, content: d1.content.slice(0, 150), source: d1.sourceName, date: d1.updatedAt },
                doc2: { id: d2.id, title: d2.title, version: d2.version, content: d2.content.slice(0, 150), source: d2.sourceName, date: d2.updatedAt },
                status: 'open',
                createdAt: new Date().toISOString().split('T')[0]
              });
            }
          }
        }
      }
    }

    return conflicts;
  }

  // Convert Knowledge documents to JSONL string format
  public static exportToJsonl(docs: KnowledgeDocument[]): string {
    return docs.map(d => JSON.stringify({
      id: d.id,
      title: d.title,
      description: d.description,
      category: d.category,
      contentType: d.contentType,
      sourceName: d.sourceName,
      version: d.version,
      keywords: d.keywords,
      status: d.status,
      content: d.content,
      createdBy: d.createdBy,
      createdAt: d.createdAt,
      updatedAt: d.updatedAt,
    })).join('\n');
  }

  // Allowed LTT Categories for validation
  public static readonly ALLOWED_CATEGORIES = [
    'خدمات الأفراد',
    'خدمات الأعمال',
    'الدعم الفني والخدمات',
    'الألياف البصرية FTTH',
    'الجيل الرابع 4G',
    'الأعطال والإنذارات',
    'السياسات والإجراءات',
  ];

  // Category validator and matcher
  public static validateAndMatchCategory(rawCat?: string, title: string = '', content: string = ''): string {
    if (rawCat) {
      const trimmed = rawCat.trim();
      const exactMatch = this.ALLOWED_CATEGORIES.find(c => c === trimmed);
      if (exactMatch) return exactMatch;

      const normCat = normalizeArabicText(trimmed);
      if (normCat.includes('فايبر') || normCat.includes('الياف') || normCat.includes('ftth')) return 'الألياف البصرية FTTH';
      if (normCat.includes('4g') || normCat.includes('جيل رابع')) return 'الجيل الرابع 4G';
      if (normCat.includes('عطل') || normCat.includes('اعطال') || normCat.includes('انذار')) return 'الأعطال والإنذارات';
      if (normCat.includes('سياسه') || normCat.includes('اجراء')) return 'السياسات والإجراءات';
      if (normCat.includes('اعمال') || normCat.includes('شركات')) return 'خدمات الأعمال';
      if (normCat.includes('افراد') || normCat.includes('شخصي')) return 'خدمات الأفراد';
      if (normCat.includes('دعم') || normCat.includes('خدمات')) return 'الدعم الفني والخدمات';
    }

    // Keyword matching based on title & content
    const combinedNorm = normalizeArabicText(title + ' ' + content);
    if (combinedNorm.includes('فايبر') || combinedNorm.includes('الياف') || combinedNorm.includes('ftth')) return 'الألياف البصرية FTTH';
    if (combinedNorm.includes('4g') || combinedNorm.includes('جيل رابع') || combinedNorm.includes('ماي فاي')) return 'الجيل الرابع 4G';
    if (combinedNorm.includes('عطل') || combinedNorm.includes('انقطاع') || combinedNorm.includes('بلاغ')) return 'الأعطال والإنذارات';
    if (combinedNorm.includes('سياسه') || combinedNorm.includes('شرط') || combinedNorm.includes('لائحه')) return 'السياسات والإجراءات';
    if (combinedNorm.includes('اعمال') || combinedNorm.includes('عقد مؤسسي')) return 'خدمات الأعمال';

    return 'الدعم الفني والخدمات';
  }

  // Parse raw JSONL text into structured document items with safety checks
  public static parseJsonlContent(jsonlText: string): { items: Omit<KnowledgeDocument, 'id'>[]; invalidLinesCount: number } {
    const lines = jsonlText.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
    const items: Omit<KnowledgeDocument, 'id'>[] = [];
    let invalidLinesCount = 0;

    const todayStr = new Date().toISOString().split('T')[0];

    lines.forEach((line, index) => {
      try {
        const obj = JSON.parse(line);
        if (!obj || typeof obj !== 'object') {
          invalidLinesCount++;
          return;
        }

        let title = obj.title || obj.question || obj.prompt || obj.name || obj.heading || `مستند مستورد #${index + 1}`;
        let content = obj.content || obj.answer || obj.completion || obj.text || obj.description || (typeof obj === 'object' ? JSON.stringify(obj, null, 2) : String(obj));
        
        // Handle conversational array format (e.g. OpenAI/Gemini JSONL dataset format)
        if (Array.isArray(obj.messages)) {
          const userMsg = obj.messages.find((m: any) => m.role === 'user')?.content || '';
          const assistantMsg = obj.messages.find((m: any) => m.role === 'assistant')?.content || '';
          if (userMsg) title = `سؤال: ${userMsg.slice(0, 60)}...`;
          if (assistantMsg) content = `الإجابة المعتمدة:\n${assistantMsg}`;
        }

        const formattedContent = formatArabicSolutionContent(String(content));
        const category = this.validateAndMatchCategory(obj.category, String(title), formattedContent);
        const keywords = autoExtractArabicKeywords(String(title), formattedContent, Array.isArray(obj.keywords) ? obj.keywords : (obj.keywords ? [String(obj.keywords)] : ['LTT', 'JSONL']));
        const sourceName = obj.sourceName || 'استيراد حزمة JSONL';

        items.push({
          title: String(title),
          description: obj.description || formattedContent.slice(0, 120) + '...',
          contentType: obj.contentType || 'procedure',
          category: String(category),
          targetAudience: obj.targetAudience || 'internal',
          keywords,
          sourceName: String(sourceName),
          version: obj.version || '1.0',
          status: obj.status || 'approved',
          confidentiality: obj.confidentiality || 'internal',
          content: formattedContent,
          createdBy: obj.createdBy || 'مسؤول المعرفة',
          approvedBy: obj.approvedBy || 'النظام الإداري',
          createdAt: obj.createdAt || todayStr,
          updatedAt: obj.updatedAt || todayStr,
        });
      } catch (e) {
        invalidLinesCount++;
      }
    });

    return { items, invalidLinesCount };
  }

  // Detailed JSONL chunk parser per line with validation and category mapping
  public static processJsonlChunks(jsonlText: string, createdBy: string = 'مدير المعرفة'): {
    validChunks: Omit<KnowledgeDocument, 'id'>[];
    invalidLinesCount: number;
    categoryStats: Record<string, number>;
    lineErrors: { lineNumber: number; lineContent: string; reason: string }[];
  } {
    const lines = jsonlText.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
    const validChunks: Omit<KnowledgeDocument, 'id'>[] = [];
    const lineErrors: { lineNumber: number; lineContent: string; reason: string }[] = [];
    const categoryStats: Record<string, number> = {};
    let invalidLinesCount = 0;

    const todayStr = new Date().toISOString().split('T')[0];

    lines.forEach((line, idx) => {
      const lineNumber = idx + 1;
      try {
        const obj = JSON.parse(line);
        if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
          invalidLinesCount++;
          lineErrors.push({ lineNumber, lineContent: line.slice(0, 80), reason: 'السطر ليس كائن JSON صالح' });
          return;
        }

        let title = obj.title || obj.question || obj.prompt || obj.name || obj.heading || '';
        let content = obj.content || obj.answer || obj.completion || obj.text || obj.description || '';

        // Handle conversational messages array
        if (Array.isArray(obj.messages)) {
          const userMsg = obj.messages.find((m: any) => m.role === 'user')?.content || '';
          const assistantMsg = obj.messages.find((m: any) => m.role === 'assistant')?.content || '';
          if (userMsg) title = title || `سؤال: ${userMsg}`;
          if (assistantMsg) content = content || `الإجابة المعتمدة:\n${assistantMsg}`;
        }

        if (!title && !content) {
          invalidLinesCount++;
          lineErrors.push({ lineNumber, lineContent: line.slice(0, 80), reason: 'لا يحتوي السطر على عنوان أو محتوى نصي' });
          return;
        }

        const cleanTitle = String(title || `مستند JSONL #${lineNumber}`).trim();
        const cleanContent = formatArabicSolutionContent(String(content || title).trim());

        if (cleanContent.length < 5) {
          invalidLinesCount++;
          lineErrors.push({ lineNumber, lineContent: line.slice(0, 80), reason: 'المحتوى النصي قصير جداً غير مفيد' });
          return;
        }

        const matchedCategory = this.validateAndMatchCategory(obj.category, cleanTitle, cleanContent);
        categoryStats[matchedCategory] = (categoryStats[matchedCategory] || 0) + 1;

        const keywords = autoExtractArabicKeywords(cleanTitle, cleanContent, Array.isArray(obj.keywords) ? obj.keywords : (obj.keywords ? [String(obj.keywords)] : ['LTT', 'JSONL Chunk']));

        validChunks.push({
          title: cleanTitle,
          description: obj.description || cleanContent.slice(0, 130) + '...',
          contentType: obj.contentType || 'procedure',
          category: matchedCategory,
          targetAudience: obj.targetAudience || 'internal',
          keywords,
          sourceName: obj.sourceName || `مقطع JSONL سطر #${lineNumber}`,
          version: obj.version || '1.0',
          status: 'approved',
          confidentiality: obj.confidentiality || 'internal',
          content: cleanContent,
          createdBy: obj.createdBy || createdBy,
          approvedBy: 'النظام الإداري',
          createdAt: obj.createdAt || todayStr,
          updatedAt: obj.updatedAt || todayStr,
          chunksCount: 1,
        });
      } catch (e: any) {
        invalidLinesCount++;
        lineErrors.push({ lineNumber, lineContent: line.slice(0, 80), reason: `خطأ في تحليل صيغة JSON: ${e?.message || 'تنسيق غير صالح'}` });
      }
    });

    return { validChunks, invalidLinesCount, categoryStats, lineErrors };
  }

  // Directly save JSONL Document Chunks to Firestore with tracking
  public static async saveJsonlChunksToFirestore(
    chunks: Omit<KnowledgeDocument, 'id'>[]
  ): Promise<{ successCount: number; failedCount: number; insertedIds: string[] }> {
    let successCount = 0;
    let failedCount = 0;
    const insertedIds: string[] = [];

    for (const chunk of chunks) {
      try {
        const id = await this.addDocument(chunk);
        insertedIds.push(id);
        successCount++;
      } catch (err) {
        console.error('Error saving chunk to Firestore:', err);
        failedCount++;
      }
    }

    return { successCount, failedCount, insertedIds };
  }

  // Import JSONL document items into Firestore and local memory
  public static async importFromJsonl(jsonlText: string, createdBy: string = 'مدير المعرفة'): Promise<{ successCount: number; invalidLinesCount: number }> {
    const { items, invalidLinesCount } = this.parseJsonlContent(jsonlText);
    let successCount = 0;

    for (const item of items) {
      await this.addDocument({
        ...item,
        createdBy: item.createdBy || createdBy,
      });
      successCount++;
    }

    return { successCount, invalidLinesCount };
  }

  // Reset and Wipe Database to official 69 LTT Business Services records
  public static async resetToOfficialLttServicesKB(): Promise<{ docsCount: number; servicesCount: number }> {
    this.localDocs = [...INITIAL_DOCUMENTS];
    this.localServices = [...INITIAL_SERVICES];

    // Wipe Firestore documents and replace with official seed
    try {
      const docsSnap = await getDocs(collection(db, 'knowledgeDocuments'));
      for (const d of docsSnap.docs) {
        await deleteDoc(doc(db, 'knowledgeDocuments', d.id));
      }
      for (const docObj of INITIAL_DOCUMENTS) {
        await addDoc(collection(db, 'knowledgeDocuments'), docObj);
      }

      const srvSnap = await getDocs(collection(db, 'servicePackages'));
      for (const s of srvSnap.docs) {
        await deleteDoc(doc(db, 'servicePackages', s.id));
      }
      for (const srvObj of INITIAL_SERVICES) {
        await addDoc(collection(db, 'servicePackages'), srvObj);
      }
    } catch (e) {
      console.warn('Firestore reset fallback to local seed:', e);
    }

    return { docsCount: this.localDocs.length, servicesCount: this.localServices.length };
  }
}

