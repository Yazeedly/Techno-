import React, { useState, useEffect, useRef } from 'react';
import { UserProfile, KnowledgeDocument, DocumentStatus } from '../../types';
import { KnowledgeProvider, normalizeArabicText } from '../../services/knowledge';
import { BookOpen, Search, Plus, Filter, FileText, CheckCircle2, Clock, Archive, AlertCircle, Eye, Edit3, Trash2, Shield, Check, X, Download, Upload, FileJson, Sparkles, Wand2 } from 'lucide-react';

interface KnowledgeViewProps {
  user: UserProfile;
}

export const KnowledgeView: React.FC<KnowledgeViewProps> = ({ user }) => {
  const [documents, setDocuments] = useState<KnowledgeDocument[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('approved');
  const [activeDocModal, setActiveDocModal] = useState<KnowledgeDocument | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Database Optimization State
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizeMessage, setOptimizeMessage] = useState<string | null>(null);

  // JSONL Modal & File Upload State
  const [showJsonlModal, setShowJsonlModal] = useState(false);
  const [jsonlInputText, setJsonlInputText] = useState('');
  const [jsonlFileName, setJsonlFileName] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [importSummary, setImportSummary] = useState<{ successCount: number; invalidLinesCount: number } | null>(null);
  const jsonlFileInputRef = useRef<HTMLInputElement>(null);

  // New Doc Form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('السياسات والامتثال');
  const [newContent, setNewContent] = useState('');
  const [newSource, setNewSource] = useState('');
  const [newVersion, setNewVersion] = useState('1.0');

  // Edit / Delete State
  const [editingDoc, setEditingDoc] = useState<KnowledgeDocument | null>(null);
  const [deletingDocId, setDeletingDocId] = useState<string | null>(null);

  const isAdminOrSupervisor = ['super_admin', 'knowledge_admin', 'supervisor'].includes(user.role);

  useEffect(() => {
    loadDocs();
  }, []);

  const loadDocs = async () => {
    const docs = await KnowledgeProvider.getAllDocuments();
    setDocuments(docs);
  };

  const handleProcessAndOptimize = async () => {
    setIsOptimizing(true);
    setOptimizeMessage(null);
    try {
      const res = await KnowledgeProvider.processAndOptimizeDatabase();
      setOptimizeMessage(`تمت معالجة وتنظيف ${res.processedCount} مستنداً وتوليد ${res.enrichedKeywordsCount} كلمة مفتاحية عربية بنجاح.`);
      await loadDocs();
    } catch (e) {
      console.error('Database optimization error:', e);
      setOptimizeMessage('حدث خطأ أثناء المعالجة، يرجى المحاولة لاحقاً.');
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleResetToOfficialGuide = async () => {
    if (!window.confirm('هل أنت متأكد من مسح البيانات السابقة واكتفاء قاعدة المعرفة بدليل خدمات LTT المنقح المعتمد v2.6 (شامل باقات Fixed VoLTE Business 2026، eSIM، 4G، والمواقع الجغرافية)؟')) {
      return;
    }
    setIsOptimizing(true);
    try {
      const res = await KnowledgeProvider.resetToOfficialLttServicesKB();
      setOptimizeMessage(`تمت عملية المسح والضبط بنجاح! تم اعتماد قاعدة معرفة LTT v2.6 المحدثة المعتمدة جاهزة لـ Techno RAG.`);
      await loadDocs();
    } catch (e) {
      console.error('Reset database error:', e);
      setOptimizeMessage('حدث خطأ أثناء الضبط.');
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleExportJsonl = () => {
    const jsonlData = KnowledgeProvider.exportToJsonl(filteredDocs);
    const blob = new Blob([jsonlData], { type: 'application/x-jsonlines;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ltt_knowledge_base_${new Date().toISOString().split('T')[0]}.jsonl`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleJsonlFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setJsonlFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setJsonlInputText(content || '');
    };
    reader.readAsText(file);
  };

  const handleExecuteJsonlImport = async () => {
    if (!jsonlInputText.trim()) return;

    setIsImporting(true);
    try {
      const res = await KnowledgeProvider.importFromJsonl(jsonlInputText, user.displayName);
      setImportSummary(res);
      await loadDocs();
    } catch (err) {
      console.error('JSONL Import Error:', err);
    } finally {
      setIsImporting(false);
    }
  };

  const handleStatusChange = async (docId: string, status: DocumentStatus) => {
    await KnowledgeProvider.updateDocumentStatus(docId, status, user.displayName);
    loadDocs();
    if (activeDocModal && activeDocModal.id === docId) {
      setActiveDocModal(prev => prev ? { ...prev, status } : null);
    }
  };

  const handleCreateDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    await KnowledgeProvider.addDocument({
      title: newTitle,
      description: newContent.slice(0, 100) + '...',
      contentType: 'policy',
      category: newCategory,
      targetAudience: 'internal',
      keywords: ['LTT', newCategory],
      sourceName: newSource || 'إدارة المعرفة LTT',
      version: newVersion,
      status: isAdminOrSupervisor ? 'approved' : 'under_review',
      confidentiality: 'internal',
      content: newContent,
      createdBy: user.displayName,
      approvedBy: isAdminOrSupervisor ? user.displayName : undefined,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    });

    setShowAddModal(false);
    setNewTitle('');
    setNewContent('');
    setNewSource('');
    loadDocs();
  };

  const handleSaveEditedDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDoc) return;

    await KnowledgeProvider.updateDocument(editingDoc.id, {
      title: editingDoc.title,
      category: editingDoc.category,
      content: editingDoc.content,
      version: editingDoc.version,
      sourceName: editingDoc.sourceName,
      status: editingDoc.status,
    });

    setEditingDoc(null);
    loadDocs();
  };

  const handleDeleteDocument = async (id: string) => {
    await KnowledgeProvider.deleteDocument(id);
    setDeletingDocId(null);
    if (activeDocModal?.id === id) setActiveDocModal(null);
    loadDocs();
  };

  const filteredDocs = documents.filter(d => {
    const normSearch = normalizeArabicText(searchQuery);
    if (!normSearch) {
      const matchesCategory = selectedCategory === 'all' || d.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || d.status === selectedStatus;
      return matchesCategory && matchesStatus;
    }

    const normTitle = normalizeArabicText(d.title);
    const normContent = normalizeArabicText(d.content);
    const normKeywords = d.keywords.map(normalizeArabicText);

    const matchesSearch = normTitle.includes(normSearch) ||
                          normContent.includes(normSearch) ||
                          normKeywords.some(k => k.includes(normSearch));

    const matchesCategory = selectedCategory === 'all' || d.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || d.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: DocumentStatus) => {
    switch (status) {
      case 'approved': return <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> معتمد ومفعل</span>;
      case 'under_review': return <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1"><Clock className="w-3 h-3" /> قيد المراجعة</span>;
      case 'draft': return <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md">مسودة</span>;
      case 'archived': return <span className="bg-slate-200 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1"><Archive className="w-3 h-3" /> مؤرشف</span>;
      case 'rejected': return <span className="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded-md">مرفوض</span>;
      default: return null;
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 text-base sm:text-lg">قاعدة المعرفة المعتمدة LTT</h1>
            <p className="text-xs text-slate-500">استكشاف، إضافة، ومراجعة المستندات التشغيلية والسياسات الرسمية</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleProcessAndOptimize}
            disabled={isOptimizing}
            className="px-3.5 py-2.5 bg-purple-50 hover:bg-purple-100 disabled:opacity-50 text-purple-700 border border-purple-200 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-2xs transition-all"
            title="معالجة وتنسيق النصوص وتوليد الكلمات المفتاحية العربية لقاعدة البيانات"
          >
            <Wand2 className={`w-4 h-4 text-purple-600 ${isOptimizing ? 'animate-spin' : ''}`} />
            <span>{isOptimizing ? 'جاري المعالجة...' : 'معالجة وتنظيف قاعدة البيانات'}</span>
          </button>

          <button
            onClick={() => {
              setImportSummary(null);
              setJsonlInputText('');
              setJsonlFileName('');
              setShowJsonlModal(true);
            }}
            className="px-3.5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-2xs transition-all"
            title="استيراد وتغذية قاعدة البيانات عبر ملفات .jsonl"
          >
            <Upload className="w-4 h-4 text-emerald-600" />
            <span>استيراد .jsonl</span>
          </button>

          <button
            onClick={handleExportJsonl}
            className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-2xs transition-all"
            title="تنزيل قاعدة المعرفة بتنسيق .jsonl"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>تصدير .jsonl</span>
          </button>

          <button
            onClick={handleResetToOfficialGuide}
            disabled={isOptimizing}
            className="px-3.5 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-extrabold rounded-xl text-xs flex items-center gap-1.5 shadow-2xs transition-all"
            title="مسح البيانات السابقة واكتفاء قاعدة المعرفة بدليل خدمات LTT المنقح v2.6 المعتمد"
          >
            <CheckCircle2 className="w-4 h-4 text-amber-600" />
            <span>اعتماد قاعدة LTT v2.6 المحدثة</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة مستند جديد</span>
          </button>
        </div>
      </div>

      {/* Optimization Result Alert Banner */}
      {optimizeMessage && (
        <div className="bg-purple-50 border border-purple-200 p-3.5 rounded-2xl flex items-center justify-between gap-2 text-xs text-purple-900 font-medium">
          <div className="flex items-center gap-2">
            <Wand2 className="w-4 h-4 text-purple-600 shrink-0" />
            <span>{optimizeMessage}</span>
          </div>
          <button onClick={() => setOptimizeMessage(null)} className="text-purple-400 hover:text-purple-700 font-bold">
            ✕
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="البحث في المستندات والكلمات المفتاحية..."
            className="w-full pr-9 pl-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
          >
            <option value="all">كافة التصنيفات</option>
            <option value="السياسات والامتثال">السياسات والامتثال</option>
            <option value="الدعم الفني">الدعم الفني</option>
            <option value="خدمات الأفراد">خدمات الأفراد</option>
            <option value="خدمات الأعمال">خدمات الأعمال</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none font-bold text-slate-700"
          >
            <option value="all">كافة الحالات</option>
            <option value="approved">المعتمدة فقط (في RAG)</option>
            <option value="draft">المسودات الجدد (Draft)</option>
            <option value="under_review">قيد المراجعة</option>
            <option value="archived">المؤرشفة</option>
            <option value="rejected">المرفوضة</option>
          </select>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map((docItem) => (
          <div
            key={docItem.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-400 shadow-2xs transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-md">
                  {docItem.category}
                </span>
                {getStatusBadge(docItem.status)}
              </div>

              <h3 className="font-bold text-sm text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {docItem.title}
              </h3>

              <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                {docItem.description || docItem.content}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>v{docItem.version} • {docItem.updatedAt}</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveDocModal(docItem)}
                  className="text-blue-600 font-bold hover:bg-blue-50 p-1.5 rounded-lg flex items-center gap-1 transition-colors"
                  title="استعراض التفاصيل"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>

                {isAdminOrSupervisor && (
                  <>
                    <button
                      onClick={() => setEditingDoc({ ...docItem })}
                      className="text-emerald-600 font-bold hover:bg-emerald-50 p-1.5 rounded-lg flex items-center gap-1 transition-colors"
                      title="تعديل المستند"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeletingDocId(docItem.id)}
                      className="text-red-500 font-bold hover:bg-red-50 p-1.5 rounded-lg flex items-center gap-1 transition-colors"
                      title="حذف المستند"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Document View & Approval Modal */}
      {activeDocModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 text-right shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                {getStatusBadge(activeDocModal.status)}
                <span className="font-bold text-sm text-slate-900">{activeDocModal.title}</span>
              </div>
              <button onClick={() => setActiveDocModal(null)} className="text-slate-400 hover:text-slate-600 font-bold">
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl">
              <div><span className="font-bold">المصدر المعتمد:</span> {activeDocModal.sourceName}</div>
              <div><span className="font-bold">رقم الإصدار:</span> v{activeDocModal.version}</div>
              <div><span className="font-bold">تاريخ التحديث:</span> {activeDocModal.updatedAt}</div>
              <div><span className="font-bold">أضيف بواسطة:</span> {activeDocModal.createdBy}</div>
            </div>

            {/* Draft Warning Banner */}
            {activeDocModal.status === 'draft' && (
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-900 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <span className="font-extrabold block">حالة المستند: مسودة غير معتمدة (Draft)</span>
                  <span className="text-[11px] text-amber-800">
                    هذا المستند محفوظ ومستخرج بحالة مسودة. تم حظر استخدامه في محرك Techno RAG تلقائياً حتى يتم مراجعته واعتماده رسمياً.
                  </span>
                </div>
              </div>
            )}

            {/* Conflict & Duplication Warnings */}
            {activeDocModal.conflictWarnings && activeDocModal.conflictWarnings.length > 0 && (
              <div className="bg-red-50 border border-red-200 p-3 rounded-xl space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-xs text-red-900">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span>اكتشاف تعارض أو تكرار محتمل ({activeDocModal.conflictWarnings.length}):</span>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  {activeDocModal.conflictWarnings.map((conf, idx) => (
                    <div key={idx} className="bg-white p-2 rounded-lg border border-red-100 flex items-start justify-between gap-2">
                      <div>
                        <span className="font-bold text-slate-800 block">مع المستند: {conf.existingTitle}</span>
                        <span className="text-slate-500">{conf.details}</span>
                      </div>
                      <span className="bg-red-100 text-red-800 font-extrabold text-[10px] px-2 py-0.5 rounded-md shrink-0">
                        تطابق {conf.similarityScore}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <span className="font-bold text-xs text-slate-700 block mb-1">المحتوى النصي الكامل:</span>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 whitespace-pre-wrap leading-relaxed font-sans max-h-60 overflow-y-auto">
                {activeDocModal.content}
              </div>
            </div>

            {/* Version History Log */}
            {activeDocModal.versionHistory && activeDocModal.versionHistory.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="font-bold text-xs text-slate-700 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span>سجل الإصدارات والتغيرات المعتمدة:</span>
                </span>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {activeDocModal.versionHistory.map((ver) => (
                    <div key={ver.id} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-blue-700 text-[11px]">v{ver.version}</span>
                          <span className="text-slate-600 font-semibold text-[11px]">{ver.updatedBy}</span>
                          <span className="text-[10px] text-slate-400">({ver.updatedAt})</span>
                        </div>
                        <p className="text-[11px] text-slate-600">{ver.changeSummary}</p>
                      </div>
                      {getStatusBadge(ver.status)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Approval Controls for Admins */}
            {isAdminOrSupervisor && (
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-semibold">إجراءات المراجعة والاعتماد:</span>
                <div className="flex gap-2">
                  {activeDocModal.status !== 'approved' && (
                    <button
                      onClick={() => handleStatusChange(activeDocModal.id, 'approved')}
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      <Check className="w-4 h-4" />
                      <span>اعتماد وتفعيل في RAG</span>
                    </button>
                  )}
                  {activeDocModal.status !== 'rejected' && (
                    <button
                      onClick={() => handleStatusChange(activeDocModal.id, 'rejected')}
                      className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-bold text-xs rounded-xl flex items-center gap-1"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>رفض</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleStatusChange(activeDocModal.id, 'archived')}
                    className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1"
                  >
                    <Archive className="w-3.5 h-3.5" />
                    <span>أرشفة</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Document Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 text-right shadow-2xl space-y-4">
            <h3 className="font-bold text-sm text-slate-900">إضافة مستند معرفي جديد لـ LTT</h3>
            
            <form onSubmit={handleCreateDocument} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">عنوان المستند الرسمي:</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="مثال: دليل باقات الألياف البصرية Q2-2026"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">التصنيف:</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                >
                  <option value="السياسات والامتثال">السياسات والامتثال</option>
                  <option value="الدعم الفني">الدعم الفني</option>
                  <option value="خدمات الأفراد">خدمات الأفراد</option>
                  <option value="خدمات الأعمال">خدمات الأعمال</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">المصدر الرسمي / رقم القرار:</label>
                <input
                  type="text"
                  value={newSource}
                  onChange={(e) => setNewSource(e.target.value)}
                  placeholder="مثال: قرار الشؤون القانونية رقم 18 لسنة 2026"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">محتوى المستند النصي:</label>
                <textarea
                  required
                  rows={5}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="اكتب المحتوى والخطوات المعتمدة بالتفصيل..."
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl shadow-sm"
                >
                  حفظ في الدليل
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* JSONL Import Modal */}
      {showJsonlModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 text-right shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <FileJson className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">استيراد وتغذية قاعدة البيانات عبر ملفات .jsonl</h3>
                  <p className="text-[11px] text-slate-500">رفع أو لقط بيانات بتنسيق JSON Lines المعتمد لمجموعات RAG أو النماذج</p>
                </div>
              </div>
              <button
                onClick={() => setShowJsonlModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            {/* Input Options: File Upload vs Textarea */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-bold text-xs text-slate-700 block">اختر ملف .jsonl من جهازك:</label>
                <button
                  type="button"
                  onClick={() => {
                    const sample = `{"title":"دليل إعدادات مودم FTTH Huawei EG8145V5","content":"طريقة ضبط اسم الشبكة وكلمة المرور في جهاز مودم الألياف الضوئية المعتمد عبر الصفحة 192.168.100.1","category":"الدعم الفني","keywords":["الألياف","Huawei","FTTH"]}\n{"title":"إجراءات تقديم طلب نقل خط LTT","content":"خطوات نقل اشتراك هاتف ثابت أو ألياف بصرية من منطقة إلى أخرى عبر بوابات الخدمة أو الفروع الرسمية.","category":"السياسات والامتثال","keywords":["نقل الخط","المبيعات"]}`;
                    setJsonlInputText(sample);
                    setJsonlFileName('نموذج_اختبار_تجريبي.jsonl');
                  }}
                  className="text-[11px] text-blue-600 font-bold hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>تعبئة نموذج JSONL تجريبي</span>
                </button>
              </div>

              <input
                type="file"
                ref={jsonlFileInputRef}
                onChange={handleJsonlFileUpload}
                accept=".jsonl,.json,.txt"
                className="hidden"
              />

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => jsonlFileInputRef.current?.click()}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center gap-2 border border-slate-200 shadow-2xs"
                >
                  <Upload className="w-4 h-4 text-emerald-600" />
                  <span>رفع ملف .jsonl</span>
                </button>
                {jsonlFileName && (
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 truncate max-w-xs">
                    📁 {jsonlFileName}
                  </span>
                )}
              </div>

              <div>
                <label className="font-bold text-xs text-slate-700 block mb-1">أو الصق نص JSONL مباشرة (سطر واحد لكل كائن JSON):</label>
                <textarea
                  rows={7}
                  value={jsonlInputText}
                  onChange={(e) => {
                    setJsonlInputText(e.target.value);
                    setImportSummary(null);
                  }}
                  placeholder='{"title": "عنوان المستند", "content": "محتوى المستند...", "category": "الدعم الفني"}\n{"title": "مستند ثاني", "content": "محتوى..."}'
                  className="w-full p-3 bg-slate-900 text-slate-100 rounded-xl font-mono text-[11px] outline-none border border-slate-700 dir-ltr text-left leading-relaxed"
                />
              </div>

              {/* Parsing stats preview */}
              {jsonlInputText.trim() && (
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-800 block">معاينة استخراج الأسطر:</span>
                    <span className="text-slate-600 text-[11px]">
                      تم اكتشاف {KnowledgeProvider.parseJsonlContent(jsonlInputText).items.length} عنصر جاهز للاستيراد.
                      {KnowledgeProvider.parseJsonlContent(jsonlInputText).invalidLinesCount > 0 && (
                        <span className="text-amber-700 font-bold mr-1"> (يوجد {KnowledgeProvider.parseJsonlContent(jsonlInputText).invalidLinesCount} أسطر غير صالحة)</span>
                      )}
                    </span>
                  </div>
                  <span className="bg-blue-100 text-blue-800 font-extrabold text-[10px] px-2.5 py-1 rounded-md">
                    تنسيق JSONL
                  </span>
                </div>
              )}

              {/* Import success notice */}
              {importSummary && (
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-xs text-emerald-900 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-extrabold block text-emerald-950">تم الاستيراد والتغذية بنجاح!</span>
                    <span>
                      تمت إضافة {importSummary.successCount} مستند جديد بنجاح إلى قاعدة بيانات المعرفة و RAG.
                      {importSummary.invalidLinesCount > 0 && ` (تم تجاهل ${importSummary.invalidLinesCount} أسطر غير مطابقة)`}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowJsonlModal(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs"
              >
                إغلاق
              </button>
              <button
                type="button"
                disabled={!jsonlInputText.trim() || isImporting}
                onClick={handleExecuteJsonlImport}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs shadow-sm flex items-center gap-1.5 transition-all"
              >
                {isImporting ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>جاري التخزين والاستيراد...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>تأكيد الاستيراد والحفظ في قاعدة البيانات</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Document Modal */}
      {editingDoc && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 text-right shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-emerald-600" />
                <span className="font-extrabold text-sm text-slate-900">تعديل المستند والمعرفة</span>
              </div>
              <button onClick={() => setEditingDoc(null)} className="text-slate-400 hover:text-slate-600 font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEditedDocument} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">عنوان المستند:</label>
                <input
                  type="text"
                  required
                  value={editingDoc.title}
                  onChange={(e) => setEditingDoc({ ...editingDoc, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">التصنيف الرئيسي:</label>
                  <select
                    value={editingDoc.category}
                    onChange={(e) => setEditingDoc({ ...editingDoc, category: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  >
                    <option value="السياسات والامتثال">السياسات والامتثال</option>
                    <option value="الدعم الفني">الدعم الفني والأعطال</option>
                    <option value="خدمات الأفراد">خدمات الأفراد</option>
                    <option value="خدمات الأعمال">خدمات الأعمال</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">رقم الإصدار:</label>
                  <input
                    type="text"
                    value={editingDoc.version}
                    onChange={(e) => setEditingDoc({ ...editingDoc, version: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-center font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">حالة الاعتماد:</label>
                  <select
                    value={editingDoc.status}
                    onChange={(e) => setEditingDoc({ ...editingDoc, status: e.target.value as DocumentStatus })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  >
                    <option value="approved">معتمد في RAG</option>
                    <option value="under_review">قيد المراجعة</option>
                    <option value="archived">مؤرشف</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">المحتوى النصي الشامل:</label>
                <textarea
                  rows={8}
                  required
                  value={editingDoc.content}
                  onChange={(e) => setEditingDoc({ ...editingDoc, content: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">اسم المصدر المعتمد:</label>
                <input
                  type="text"
                  value={editingDoc.sourceName}
                  onChange={(e) => setEditingDoc({ ...editingDoc, sourceName: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingDoc(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm"
                >
                  حفظ التعديلات
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Document Confirmation Modal */}
      {deletingDocId && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-right shadow-2xl space-y-4">
            <h3 className="font-extrabold text-base text-slate-900">تأكيد حذف المستند</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              هل أنت تأكد من حذف هذا المستند نهائياً من قاعدة البيانات وقاعدة RAG؟
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeletingDocId(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs"
              >
                تراجع
              </button>
              <button
                onClick={() => handleDeleteDocument(deletingDocId)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-sm"
              >
                تأكيد الحذف
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
