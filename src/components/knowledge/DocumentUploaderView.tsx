import React, { useState, useRef } from 'react';
import { UserProfile } from '../../types';
import { KnowledgeProvider } from '../../services/knowledge';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle, 
  Layers, 
  ArrowLeft, 
  Trash2, 
  Plus, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  CheckCheck,
  FileCode,
  FileType,
  RefreshCw,
  X
} from 'lucide-react';

interface DocumentUploaderProps {
  user: UserProfile;
  onNavigateToKnowledge: () => void;
}

interface AnalysisResult {
  extractedTitle: string;
  summary: string;
  category: string;
  keywords: string[];
  extractedContent: string;
  chunksCount: number;
  jsonlDetails?: {
    validChunks: any[];
    invalidLinesCount: number;
    categoryStats: Record<string, number>;
    lineErrors: { lineNumber: number; lineContent: string; reason: string }[];
  };
}

interface FileItem {
  id: string;
  file: File;
  status: 'pending' | 'analyzing' | 'done' | 'error' | 'saved';
  progress: number;
  result?: AnalysisResult;
  error?: string;
  isExpanded?: boolean;
}

const LTT_CATEGORIES = [
  'خدمات الأفراد',
  'خدمات الأعمال',
  'الدعم الفني والخدمات',
  'الألياف البصرية FTTH',
  'الجيل الرابع 4G',
  'الأعطال والإنذارات',
  'السياسات والإجراءات',
];

export const DocumentUploaderView: React.FC<DocumentUploaderProps> = ({
  user,
  onNavigateToKnowledge,
}) => {
  const [fileItems, setFileItems] = useState<FileItem[]>([]);
  const [isProcessingAll, setIsProcessingAll] = useState(false);
  const [isSavingAll, setIsSavingAll] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [batchSuccessMessage, setBatchSuccessMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper to format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Add files to state
  const handleAddFiles = (files: FileList | File[]) => {
    const newItems: FileItem[] = [];
    Array.from(files).forEach((file) => {
      // Check duplicate
      const isDuplicate = fileItems.some(
        (item) => item.file.name === file.name && item.file.size === file.size
      );
      if (!isDuplicate) {
        newItems.push({
          id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          file,
          status: 'pending',
          progress: 0,
          isExpanded: false,
        });
      }
    });

    if (newItems.length > 0) {
      setFileItems((prev) => [...prev, ...newItems]);
      setBatchSuccessMessage(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleAddFiles(e.target.files);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Drag and Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleAddFiles(e.dataTransfer.files);
    }
  };

  // Remove single file
  const handleRemoveFile = (id: string) => {
    setFileItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear all files
  const handleClearAll = () => {
    setFileItems([]);
    setBatchSuccessMessage(null);
  };

  // Analyze single file (PDF, DOCX, TXT, CSV, JSON, JSONL, Markdown)
  const analyzeSingleFile = async (item: FileItem): Promise<FileItem> => {
    return new Promise((resolve) => {
      const { file } = item;
      const isPdf = file.name.toLowerCase().endsWith('.pdf');

      const reader = new FileReader();

      reader.onload = async (event) => {
        const rawResult = event.target?.result;
        let fileContent = '';
        let fileData = '';

        if (isPdf) {
          const dataUrl = (rawResult as string) || '';
          fileData = dataUrl.split(',')[1] || '';
        } else {
          fileContent = (rawResult as string) || '';
        }

        if (file.name.endsWith('.jsonl')) {
          const jsonlRes = KnowledgeProvider.processJsonlChunks(fileContent, user.displayName);
          const title = `حزمة JSONL: ${file.name} (${jsonlRes.validChunks.length} مقطع معرفي)`;
          const topCategory = Object.keys(jsonlRes.categoryStats)[0] || 'الدعم الفني والخدمات';

          const result: AnalysisResult = {
            extractedTitle: title,
            summary: `تم تحليل ملف JSONL بنجاح. تم استخراج وتحقق صحة ${jsonlRes.validChunks.length} كائن/مقطع معرفي جاهز للحفظ بحالة مسودة (Draft). ${
              jsonlRes.invalidLinesCount > 0 ? `(تم استبعاد ${jsonlRes.invalidLinesCount} أسطر غير صالحة)` : ''
            }`,
            category: topCategory,
            keywords: ['JSONL', 'LTT', 'مقاطع معرفية', 'استيراد موحد'],
            extractedContent: fileContent,
            chunksCount: jsonlRes.validChunks.length,
            jsonlDetails: jsonlRes,
          };

          resolve({
            ...item,
            status: 'done',
            progress: 100,
            result,
            isExpanded: true,
          });
          return;
        }

        try {
          const res = await fetch('/api/analyze-file', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              filename: file.name,
              fileContent,
              fileData,
              mimeType: file.type || (isPdf ? 'application/pdf' : 'text/plain'),
              fileType: file.name.split('.').pop() || 'file',
            }),
          });

          if (!res.ok) {
            throw new Error(`خطأ في خادم التحليل (${res.status})`);
          }

          const data = await res.json();
          const autoTitle = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
          const result: AnalysisResult = {
            extractedTitle: data.extractedTitle || autoTitle,
            summary: data.summary || 'تم استخراج وتجزئة المحتوى بنجاح على الخادم بحالة مسودة (Draft).',
            category: data.category || 'الدعم الفني والخدمات',
            keywords: data.keywords && data.keywords.length > 0 ? data.keywords : ['LTT', 'مستند معرفي'],
            extractedContent: data.extractedContent || fileContent,
            chunksCount: data.chunksCount || Math.max(1, Math.ceil((data.extractedContent || fileContent).length / 350)),
          };

          resolve({
            ...item,
            status: 'done',
            progress: 100,
            result,
          });
        } catch (err: any) {
          console.error('Error analyzing file:', err);
          const autoTitle = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
          const fallbackResult: AnalysisResult = {
            extractedTitle: autoTitle,
            summary: `مستند LTT مجهز بحالة مسودة (Draft) للفهرسة (${fileContent.slice(0, 120)}...)`,
            category: 'الدعم الفني والخدمات',
            keywords: ['LTT', 'مستند مرفوع'],
            extractedContent: fileContent,
            chunksCount: Math.max(1, Math.ceil(fileContent.length / 350)),
          };

          resolve({
            ...item,
            status: 'done',
            progress: 100,
            result: fallbackResult,
          });
        }
      };

      reader.onerror = () => {
        resolve({
          ...item,
          status: 'error',
          progress: 100,
          error: 'تعذر قراءة محتوى الملف من الجهاز.',
        });
      };

      if (isPdf) {
        reader.readAsDataURL(item.file);
      } else {
        reader.readAsText(item.file);
      }
    });
  };

  // Batch process all pending files
  const handleProcessAll = async () => {
    setIsProcessingAll(true);
    setBatchSuccessMessage(null);

    const updatedItems = [...fileItems];

    for (let i = 0; i < updatedItems.length; i++) {
      if (updatedItems[i].status === 'pending' || updatedItems[i].status === 'error') {
        setFileItems((prev) =>
          prev.map((it, idx) => (idx === i ? { ...it, status: 'analyzing', progress: 50 } : it))
        );

        const processed = await analyzeSingleFile(updatedItems[i]);

        setFileItems((prev) =>
          prev.map((it, idx) => (idx === i ? processed : it))
        );
      }
    }

    setIsProcessingAll(false);
  };

  // Save single file to Knowledge Base (SAVED AS DRAFT)
  const handleSaveSingleToRAG = async (item: FileItem) => {
    if (!item.result) return;

    if (item.file.name.endsWith('.jsonl')) {
      const chunksToSave = (item.result.jsonlDetails?.validChunks || KnowledgeProvider.parseJsonlContent(item.result.extractedContent).items).map(c => ({
        ...c,
        status: 'draft' as const,
      }));
      await KnowledgeProvider.saveJsonlChunksToFirestore(chunksToSave);
    } else {
      await KnowledgeProvider.addDocument({
        title: item.result.extractedTitle,
        description: item.result.summary,
        contentType: 'policy',
        category: item.result.category || 'الدعم الفني والخدمات',
        targetAudience: 'internal',
        keywords: item.result.keywords || ['LTT'],
        sourceName: `ملف مرفوع: ${item.file.name}`,
        version: '1.0',
        status: 'draft', // Saved in Draft status
        confidentiality: 'internal',
        content: item.result.extractedContent,
        createdBy: user.displayName,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        chunksCount: item.result.chunksCount,
      });
    }

    setFileItems((prev) =>
      prev.map((it) => (it.id === item.id ? { ...it, status: 'saved' } : it))
    );
  };

  // Save all processed files to Knowledge Base as Draft
  const handleSaveAllToRAG = async () => {
    const doneItems = fileItems.filter((item) => item.status === 'done' && item.result);
    if (doneItems.length === 0) return;

    setIsSavingAll(true);
    let totalDocsAdded = 0;
    let totalChunksAdded = 0;

    for (const item of doneItems) {
      if (!item.result) continue;

      if (item.file.name.endsWith('.jsonl')) {
        const chunksToSave = (item.result.jsonlDetails?.validChunks || KnowledgeProvider.parseJsonlContent(item.result.extractedContent).items).map(c => ({
          ...c,
          status: 'draft' as const,
        }));
        const res = await KnowledgeProvider.saveJsonlChunksToFirestore(chunksToSave);
        totalDocsAdded += res.successCount;
        totalChunksAdded += res.successCount;
      } else {
        await KnowledgeProvider.addDocument({
          title: item.result.extractedTitle,
          description: item.result.summary,
          contentType: 'policy',
          category: item.result.category || 'الدعم الفني والخدمات',
          targetAudience: 'internal',
          keywords: item.result.keywords || ['LTT'],
          sourceName: `ملف مرفوع: ${item.file.name}`,
          version: '1.0',
          status: 'draft', // Saved in Draft status
          confidentiality: 'internal',
          content: item.result.extractedContent,
          createdBy: user.displayName,
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0],
          chunksCount: item.result.chunksCount,
        });
        totalDocsAdded++;
        totalChunksAdded += item.result.chunksCount;
      }
    }

    setFileItems((prev) =>
      prev.map((it) => (it.status === 'done' ? { ...it, status: 'saved' } : it))
    );

    setIsSavingAll(false);
    setBatchSuccessMessage(
      `تمت إضافة ${totalDocsAdded} مستنداً و ${totalChunksAdded} مقطعاً بحالة مسودة (Draft) في Firestore بنجاح. لن يتم استخدامها في إجابات Techno قبل اعتمادها رسمياً.`
    );
  };

  // Toggle expanded edit view for a file item
  const toggleExpand = (id: string) => {
    setFileItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isExpanded: !item.isExpanded } : item))
    );
  };

  // Update edit fields for an item
  const updateItemResult = (id: string, field: keyof AnalysisResult, value: any) => {
    setFileItems((prev) =>
      prev.map((item) => {
        if (item.id === id && item.result) {
          return {
            ...item,
            result: {
              ...item.result,
              [field]: value,
            },
          };
        }
        return item;
      })
    );
  };

  // Stats calculation
  const totalFiles = fileItems.length;
  const pendingCount = fileItems.filter((i) => i.status === 'pending').length;
  const doneCount = fileItems.filter((i) => i.status === 'done').length;
  const savedCount = fileItems.filter((i) => i.status === 'saved').length;
  const totalChunks = fileItems.reduce(
    (acc, curr) => acc + (curr.result?.chunksCount || 0),
    0
  );

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-5xl mx-auto font-sans" dir="rtl">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#005FBE] text-white flex items-center justify-center font-bold shadow-md shrink-0">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-[#005FBE] text-base sm:text-lg">
              معالجة ورفع الملفات النصية المتعددة لقاعدة المعرفة
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              رفع وتحليل مجموعة من المستندات في آن واحد وتقسيمها تلقائياً لفهرسة RAG الفورية
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onNavigateToKnowledge}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-xs transition-colors flex items-center gap-2 self-end sm:self-auto"
        >
          <span>استعراض قاعدة المعرفة</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Multiple Files Upload Dropzone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative bg-white p-8 rounded-3xl border-2 border-dashed transition-all text-center space-y-4 ${
          dragActive
            ? 'border-[#005FBE] bg-blue-50/50 scale-[1.01]'
            : 'border-slate-300 hover:border-[#005FBE]'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple
          accept=".jsonl,.txt,.csv,.json,.md,.doc,.docx"
        />

        <div className="w-16 h-16 bg-blue-50 text-[#005FBE] rounded-2xl flex items-center justify-center mx-auto shadow-xs">
          <Layers className="w-8 h-8" />
        </div>

        <div className="max-w-md mx-auto space-y-1">
          <h3 className="font-bold text-sm text-slate-800">
            اختر أو اسحب عدة ملفات ومستندات نصية هنا
          </h3>
          <p className="text-xs text-slate-500">
            يمكنك رفع أكثر من ملف في وقت واحد يدعم صيغ: JSONL (.jsonl)، TXT، CSV، JSON، Markdown
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-2.5 bg-[#005FBE] hover:bg-[#024674] text-white font-bold rounded-2xl text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>تحديد عدة ملفات من الجهاز</span>
          </button>
        </div>
      </div>

      {/* Batch Success Notification */}
      {batchSuccessMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 flex items-center justify-between gap-3 shadow-xs animate-in fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-bold">{batchSuccessMessage}</span>
          </div>
          <button
            onClick={() => setBatchSuccessMessage(null)}
            className="text-emerald-700 hover:text-emerald-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* File List & Batch Operations Controls */}
      {totalFiles > 0 && (
        <div className="space-y-4">
          {/* Stats Bar and Action Buttons */}
          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Stats Summary */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">إجمالي الملفات:</span>
                <span className="font-extrabold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-xl">
                  {totalFiles}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">جاهزة للحفظ:</span>
                <span className="font-extrabold text-[#005FBE] bg-blue-50 px-2.5 py-1 rounded-xl border border-blue-100">
                  {doneCount}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">محفوظة في RAG:</span>
                <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-100">
                  {savedCount}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">إجمالي المقاطع (Chunks):</span>
                <span className="font-extrabold text-[#FF8204] bg-orange-50 px-2.5 py-1 rounded-xl border border-orange-100">
                  {totalChunks}
                </span>
              </div>
            </div>

            {/* Global Actions */}
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
              {pendingCount > 0 && (
                <button
                  type="button"
                  onClick={handleProcessAll}
                  disabled={isProcessingAll}
                  className="px-4 py-2.5 bg-[#FF8204] hover:bg-[#EB6B13] text-white font-bold rounded-2xl text-xs shadow-md transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {isProcessingAll ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>جاري المعالجة الجماعية...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>معالجة جميع الملفات ({pendingCount})</span>
                    </>
                  )}
                </button>
              )}

              {doneCount > 0 && (
                <button
                  type="button"
                  onClick={handleSaveAllToRAG}
                  disabled={isSavingAll}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs shadow-md transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {isSavingAll ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>جاري الحفظ في RAG...</span>
                    </>
                  ) : (
                    <>
                      <CheckCheck className="w-4 h-4" />
                      <span>حفظ وفهرسة الكل في RAG ({doneCount})</span>
                    </>
                  )}
                </button>
              )}

              <button
                type="button"
                onClick={handleClearAll}
                className="px-3 py-2.5 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 font-bold rounded-2xl text-xs transition-colors flex items-center gap-1.5"
                title="مسح كافة الملفات من القائمة"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">مسح القائمة</span>
              </button>
            </div>
          </div>

          {/* List of Uploaded File Cards */}
          <div className="space-y-3">
            {fileItems.map((item, index) => {
              const isJsonl = item.file.name.endsWith('.jsonl');

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-3xl border transition-all shadow-xs overflow-hidden ${
                    item.status === 'saved'
                      ? 'border-emerald-200 bg-emerald-50/20'
                      : item.status === 'done'
                      ? 'border-blue-200'
                      : 'border-slate-200'
                  }`}
                >
                  {/* File Item Summary Header Row */}
                  <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 font-bold ${
                          isJsonl
                            ? 'bg-purple-100 text-purple-700'
                            : item.status === 'saved'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-blue-100 text-[#005FBE]'
                        }`}
                      >
                        {isJsonl ? (
                          <FileCode className="w-5 h-5" />
                        ) : (
                          <FileType className="w-5 h-5" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-slate-900 truncate">
                            {index + 1}. {item.result?.extractedTitle || item.file.name}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-mono">
                            ({formatFileSize(item.file.size)})
                          </span>
                        </div>

                        <p className="text-xs text-slate-500 mt-0.5 truncate">
                          {item.result
                            ? item.result.summary
                            : `ملف نصي مرفوع جاهز للمعالجة والاستخراج`}
                        </p>
                      </div>
                    </div>

                    {/* Status Badge & Individual Actions */}
                    <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
                      {item.status === 'pending' && (
                        <span className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 font-bold text-[11px] rounded-xl flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                          <span>في الانتظار</span>
                        </span>
                      )}

                      {item.status === 'analyzing' && (
                        <span className="px-3 py-1 bg-blue-50 text-[#005FBE] border border-blue-200 font-bold text-[11px] rounded-xl flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 animate-spin text-[#005FBE]" />
                          <span>جاري التحليل...</span>
                        </span>
                      )}

                      {item.status === 'done' && (
                        <span className="px-3 py-1 bg-blue-50 text-[#005FBE] border border-blue-200 font-bold text-[11px] rounded-xl flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#005FBE]" />
                          <span>جاهز للفهرسة ({item.result?.chunksCount} مقطع)</span>
                        </span>
                      )}

                      {item.status === 'saved' && (
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[11px] rounded-xl flex items-center gap-1.5">
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>تم الحفظ والفهرسة</span>
                        </span>
                      )}

                      {item.status === 'error' && (
                        <span className="px-3 py-1 bg-red-50 text-red-700 border border-red-200 font-bold text-[11px] rounded-xl flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                          <span>فشل التحليل</span>
                        </span>
                      )}

                      {/* Individual Action Buttons */}
                      {item.status === 'pending' && (
                        <button
                          type="button"
                          onClick={() => {
                            setFileItems((prev) =>
                              prev.map((it) => (it.id === item.id ? { ...it, status: 'analyzing' } : it))
                            );
                            analyzeSingleFile(item).then((res) => {
                              setFileItems((prev) =>
                                prev.map((it) => (it.id === item.id ? res : it))
                              );
                            });
                          }}
                          className="px-3 py-1.5 bg-[#005FBE] hover:bg-[#024674] text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
                        >
                          تحليل
                        </button>
                      )}

                      {item.status === 'done' && (
                        <button
                          type="button"
                          onClick={() => handleSaveSingleToRAG(item)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <span>حفظ في RAG</span>
                        </button>
                      )}

                      {item.result && (
                        <button
                          type="button"
                          onClick={() => toggleExpand(item.id)}
                          className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors"
                          title="عرض وتعديل بيانات المستند"
                        >
                          {item.isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleRemoveFile(item.id)}
                        className="p-1.5 bg-slate-100 hover:bg-red-100 text-slate-500 hover:text-red-600 rounded-xl transition-colors"
                        title="حذف من القائمة"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Edit Form for Analyzed Document Details */}
                  {item.isExpanded && item.result && (
                    <div className="p-4 sm:p-5 bg-slate-50/80 border-t border-slate-200 space-y-4 text-xs animate-in fade-in">
                      {/* Special UI Panel for JSONL Datasets */}
                      {item.result.jsonlDetails ? (
                        <div className="space-y-4 bg-purple-50/60 p-4 rounded-2xl border border-purple-200">
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-purple-200/60 pb-3">
                            <div className="flex items-center gap-2">
                              <FileCode className="w-5 h-5 text-purple-700" />
                              <span className="font-extrabold text-purple-900 text-sm">
                                تفاصيل تحليل وتعشيب ملف JSONL
                              </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-xl text-[11px] border border-emerald-300">
                                {item.result.jsonlDetails.validChunks.length} مقطع صالح (Chunk)
                              </span>
                              {item.result.jsonlDetails.invalidLinesCount > 0 && (
                                <span className="px-2.5 py-1 bg-amber-100 text-amber-800 font-bold rounded-xl text-[11px] border border-amber-300">
                                  {item.result.jsonlDetails.invalidLinesCount} أسطر مستبعدة
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Category Distribution Badges */}
                          <div>
                            <span className="font-bold text-slate-700 block mb-1.5">
                              التوزيع والتصنيفات المطابقة (LTT Categories):
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {Object.entries(item.result.jsonlDetails.categoryStats).map(
                                ([cat, count]) => (
                                  <span
                                    key={cat}
                                    className="px-2.5 py-1 bg-white border border-purple-200 text-purple-900 font-bold rounded-xl text-[11px] shadow-2xs"
                                  >
                                    {cat}: <span className="text-[#005FBE]">{count}</span>
                                  </span>
                                )
                              )}
                            </div>
                          </div>

                          {/* Line Errors Log if any */}
                          {item.result.jsonlDetails.lineErrors.length > 0 && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-xl space-y-1">
                              <div className="font-bold text-red-800 flex items-center gap-1.5 mb-1">
                                <AlertCircle className="w-4 h-4 text-red-600" />
                                <span>تقرير الأسطر المستبعدة لعدم مطابقة الهيكلية:</span>
                              </div>
                              <div className="max-h-28 overflow-y-auto space-y-1 pr-1 font-mono text-[10px]">
                                {item.result.jsonlDetails.lineErrors.map((err, errIdx) => (
                                  <div key={errIdx} className="text-red-700 bg-white/70 p-1.5 rounded-lg border border-red-100">
                                    <span className="font-bold">سطر #{err.lineNumber}:</span> {err.reason}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Parsed Chunks List Preview */}
                          <div>
                            <span className="font-bold text-slate-700 block mb-1.5">
                              معاينة المقاطع المعرفية المحللة (JSONL Chunks):
                            </span>
                            <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                              {item.result.jsonlDetails.validChunks.map((chunk, cIdx) => (
                                <div
                                  key={cIdx}
                                  className="p-3 bg-white rounded-xl border border-purple-100 shadow-2xs space-y-1"
                                >
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="font-bold text-slate-900 text-xs">
                                      #{cIdx + 1}. {chunk.title}
                                    </span>
                                    <span className="px-2 py-0.5 bg-blue-50 text-[#005FBE] font-bold text-[10px] rounded-lg border border-blue-100">
                                      {chunk.category}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                                    {chunk.content}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="font-bold text-slate-700 block mb-1">
                                العنوان المعتمد للمستند:
                              </label>
                              <input
                                type="text"
                                value={item.result.extractedTitle}
                                onChange={(e) =>
                                  updateItemResult(item.id, 'extractedTitle', e.target.value)
                                }
                                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-hidden focus:border-[#005FBE]"
                              />
                            </div>

                            <div>
                              <label className="font-bold text-slate-700 block mb-1">التصنيف:</label>
                              <select
                                value={item.result.category}
                                onChange={(e) =>
                                  updateItemResult(item.id, 'category', e.target.value)
                                }
                                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-hidden focus:border-[#005FBE]"
                              >
                                {LTT_CATEGORIES.map((cat) => (
                                  <option key={cat} value={cat}>
                                    {cat}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="font-bold text-slate-700 block mb-1">
                              الملخص المستخرج بالذكاء الاصطناعي:
                            </label>
                            <textarea
                              rows={2}
                              value={item.result.summary}
                              onChange={(e) => updateItemResult(item.id, 'summary', e.target.value)}
                              className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-800 leading-relaxed focus:outline-hidden focus:border-[#005FBE]"
                            />
                          </div>

                          <div>
                            <label className="font-bold text-slate-700 block mb-1">
                              الكلمات المفتاحية (تفصل بينها الفواصل):
                            </label>
                            <input
                              type="text"
                              value={item.result.keywords.join(', ')}
                              onChange={(e) =>
                                updateItemResult(
                                  item.id,
                                  'keywords',
                                  e.target.value.split(',').map((k) => k.trim())
                                )
                              }
                              className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-medium text-slate-800 focus:outline-hidden focus:border-[#005FBE]"
                            />
                          </div>

                          {/* Content Preview */}
                          <div>
                            <label className="font-bold text-slate-700 block mb-1">
                              معاينة المحتوى النصي المستخرج:
                            </label>
                            <div className="p-3 bg-white border border-slate-200 rounded-xl text-slate-700 max-h-36 overflow-y-auto whitespace-pre-wrap font-mono text-[11px] leading-relaxed">
                              {item.result.extractedContent}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
