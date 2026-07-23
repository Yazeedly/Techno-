import React, { useState, useEffect } from 'react';
import { UserProfile, KnowledgeDocument } from '../../types';
import { KnowledgeProvider, normalizeArabicText, formatArabicSolutionContent } from '../../services/knowledge';
import { FileText, Search, Plus, Edit3, Trash2, Shield, CheckCircle2, AlertTriangle, Layers, Clock, Sparkles, Wand2, ArrowLeft } from 'lucide-react';

interface OperationsProceduresViewProps {
  user: UserProfile;
}

export const OperationsProceduresView: React.FC<OperationsProceduresViewProps> = ({ user }) => {
  const [procedures, setProcedures] = useState<KnowledgeDocument[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubCat, setSelectedSubCat] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Active View / Edit Modals
  const [activeProcedure, setActiveProcedure] = useState<KnowledgeDocument | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProcedure, setEditingProcedure] = useState<KnowledgeDocument | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('الدعم الفني والتشغيل');
  const [formSubCategory, setFormSubCategory] = useState('خطوات حل الأعطال');
  const [formContent, setFormContent] = useState('');
  const [formVersion, setFormVersion] = useState('1.0');
  const [formSource, setFormSource] = useState('إدارة العمليات التشغيلية LTT');

  const isAdminOrSupervisor = ['super_admin', 'knowledge_admin', 'supervisor'].includes(user.role);

  useEffect(() => {
    loadProcedures();
  }, []);

  const loadProcedures = async () => {
    setIsLoading(true);
    const docs = await KnowledgeProvider.getAllDocuments();
    // Filter docs that relate to operational procedures or troubleshooting or policies
    const procDocs = docs.filter(d => 
      ['procedure', 'troubleshooting', 'policy', 'service'].includes(d.contentType) || 
      d.category.includes('إجراء') || d.category.includes('دعم') || d.category.includes('سياسات')
    );
    setProcedures(procDocs);
    setIsLoading(false);
  };

  const handleOpenAddModal = (item?: KnowledgeDocument) => {
    if (item) {
      setEditingProcedure(null);
      setFormTitle(`${item.title} - تحديث إجرائي`);
      setFormCategory(item.category);
      setFormSubCategory(item.subCategory || 'إجراءات تشغيلية');
      setFormContent(item.content);
      setFormVersion(`${(parseFloat(item.version) + 0.1).toFixed(1)}`);
      setFormSource(item.sourceName);
    } else {
      setEditingProcedure(null);
      setFormTitle('');
      setFormCategory('الدعم الفني والتشغيل');
      setFormSubCategory('خطوات حل الأعطال');
      setFormContent('');
      setFormVersion('1.0');
      setFormSource('دليل الإجراءات التشغيلية LTT');
    }
    setShowAddModal(true);
  };

  const handleOpenEditModal = (item: KnowledgeDocument) => {
    setEditingProcedure(item);
    setFormTitle(item.title);
    setFormCategory(item.category);
    setFormSubCategory(item.subCategory || 'إجراءات تشغيلية');
    setFormContent(item.content);
    setFormVersion(item.version);
    setFormSource(item.sourceName);
    setShowAddModal(true);
  };

  const handleSaveProcedure = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim()) return;

    if (editingProcedure) {
      await KnowledgeProvider.updateDocument(editingProcedure.id, {
        title: formTitle,
        category: formCategory,
        subCategory: formSubCategory,
        content: formContent,
        version: formVersion,
        sourceName: formSource,
        contentType: 'procedure',
      });
    } else {
      await KnowledgeProvider.addDocument({
        title: formTitle,
        description: formContent.slice(0, 120) + '...',
        contentType: 'procedure',
        category: formCategory,
        subCategory: formSubCategory,
        targetAudience: 'internal',
        keywords: ['LTT', formCategory, formSubCategory],
        sourceName: formSource,
        version: formVersion,
        status: isAdminOrSupervisor ? 'approved' : 'under_review',
        confidentiality: 'internal',
        content: formContent,
        createdBy: user.displayName,
        approvedBy: isAdminOrSupervisor ? user.displayName : undefined,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      });
    }

    setShowAddModal(false);
    setEditingProcedure(null);
    loadProcedures();
  };

  const handleDeleteProcedure = async (id: string) => {
    await KnowledgeProvider.deleteDocument(id);
    setDeletingId(null);
    if (activeProcedure?.id === id) setActiveProcedure(null);
    loadProcedures();
  };

  const filteredProcedures = procedures.filter(p => {
    const normSearch = normalizeArabicText(searchQuery);
    const matchesSub = selectedSubCat === 'all' || p.category === selectedSubCat;

    if (!normSearch) return matchesSub;

    const normTitle = normalizeArabicText(p.title);
    const normContent = normalizeArabicText(p.content);
    return matchesSub && (normTitle.includes(normSearch) || normContent.includes(normSearch));
  });

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-600 text-white flex items-center justify-center font-bold shadow-md">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 text-base sm:text-lg">دليل الإجراءات التشغيلية والحلول LTT</h1>
            <p className="text-xs text-slate-500">منظومة خطوات تشخيص الأعطال والتعامل مع طلبات المشتركين وتحديث السياسات</p>
          </div>
        </div>

        {isAdminOrSupervisor && (
          <button
            onClick={() => handleOpenAddModal()}
            className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة إجراء جديد</span>
          </button>
        )}
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث في الإجراءات والحلول التشغيلية..."
            className="w-full pr-9 pl-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedSubCat('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedSubCat === 'all' ? 'bg-cyan-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            جميع الإجراءات ({procedures.length})
          </button>
          <button
            onClick={() => setSelectedSubCat('الدعم الفني والخدمات')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedSubCat === 'الدعم الفني والخدمات' ? 'bg-cyan-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            الدعم الفني والأعطال
          </button>
          <button
            onClick={() => setSelectedSubCat('السياسات والامتثال')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedSubCat === 'السياسات والامتثال' ? 'bg-cyan-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            السياسات والاشتراكات
          </button>
        </div>
      </div>

      {/* Procedures List */}
      {isLoading ? (
        <div className="text-center py-12 text-slate-500 text-xs">جاري تحميل دليل الإجراءات التشغيلية...</div>
      ) : filteredProcedures.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl text-center text-slate-500 space-y-3">
          <FileText className="w-12 h-12 text-slate-300 mx-auto" />
          <p className="font-bold text-sm text-slate-700">لا توجد إجراءات تشغيلية مطابقة للبحث</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProcedures.map((proc) => (
            <div
              key={proc.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold bg-cyan-50 text-cyan-800 px-2 py-0.5 rounded-md border border-cyan-200">
                        {proc.category}
                      </span>
                      <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                        الإصدار v{proc.version}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-sm mt-1.5">{proc.title}</h3>
                  </div>

                  {isAdminOrSupervisor && (
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleOpenEditModal(proc)}
                        className="p-1.5 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
                        title="تعديل الإجراء والخطوات"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeletingId(proc.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="حذف الإجراء"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {proc.content}
                </p>

                {proc.keywords && proc.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {proc.keywords.map((kw, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                        #{kw}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400">آخر تحديث: {proc.updatedAt}</span>
                <button
                  onClick={() => setActiveProcedure(proc)}
                  className="text-xs font-bold text-cyan-600 hover:underline flex items-center gap-1"
                >
                  <span>عرض خطوات الإجراء الكاملة</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Active Procedure Details Modal */}
      {activeProcedure && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 text-right shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-extrabold bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded-md">
                  {activeProcedure.category}
                </span>
                <h3 className="font-extrabold text-base text-slate-900 mt-1">{activeProcedure.title}</h3>
              </div>
              <button onClick={() => setActiveProcedure(null)} className="text-slate-400 hover:text-slate-600 font-bold">
                ✕
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-800 whitespace-pre-wrap leading-relaxed font-sans">
              {formatArabicSolutionContent(activeProcedure.content)}
            </div>

            <div className="flex justify-between items-center pt-2 text-xs text-slate-400 border-t border-slate-100">
              <span>المصدر: {activeProcedure.sourceName} | الإصدار v{activeProcedure.version}</span>
              <button
                onClick={() => setActiveProcedure(null)}
                className="px-4 py-2 bg-slate-900 text-white font-bold rounded-xl"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Procedure Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 text-right shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">
                    {editingProcedure ? 'تعديل الإجراء والخطوات التشغيلية' : 'إضافة إجراء تشغيلي جديد'}
                  </h3>
                  <p className="text-[11px] text-slate-500">إدخال الخطوات المعتمدة لحل مشاكل المشتركين والربط الفني</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProcedure} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">عنوان الإجراء التشغيلي:</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="مثال: خطوات معالجة ضعف السرعة لراوتر Fiber Huawei"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 font-bold text-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">التصنيف الرئيسي:</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 font-bold"
                  >
                    <option value="الدعم الفني والخدمات">الدعم الفني والأعطال</option>
                    <option value="السياسات والامتثال">إجراءات المبيعات والاشتراك</option>
                    <option value="خدمات الأعمال والشركات">إجراءات القطاع المؤسسي</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">الإصدار (Version):</label>
                  <input
                    type="text"
                    value={formVersion}
                    onChange={(e) => setFormVersion(e.target.value)}
                    placeholder="1.0"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono text-center font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">خطوات الحل والتفاصيل الإجرائية الكاملة:</label>
                <textarea
                  rows={8}
                  required
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="اكتب خطوات الحل بالتفصيل (مثال: 1. التحقق من كابل الألياف... 2. إعادة ضبط المودم...)"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 leading-relaxed"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">الجهة المصدرة والمعتمدة:</label>
                <input
                  type="text"
                  value={formSource}
                  onChange={(e) => setFormSource(e.target.value)}
                  placeholder="دليل الإجراءات الفنية - إدارة الدعم الفني LTT"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium text-slate-700"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-xl text-xs shadow-sm flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{editingProcedure ? 'حفظ وتحديث الإجراء' : 'حفظ ونشر الإجراء'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-right shadow-2xl space-y-4">
            <h3 className="font-extrabold text-base text-slate-900">حذف الإجراء التشغيلي</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              هل أنت تأكد من حذف هذا الإجراء التشغيلي نهائياً من قاعدة البيانات؟
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs"
              >
                تراجع
              </button>
              <button
                onClick={() => handleDeleteProcedure(deletingId)}
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
