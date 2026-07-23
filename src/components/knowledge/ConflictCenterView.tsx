import React, { useState, useEffect } from 'react';
import { ConflictItem, KnowledgeDocument } from '../../types';
import { KnowledgeProvider } from '../../services/knowledge';
import { GitCompare, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Archive, RefreshCw, Layers } from 'lucide-react';

export const ConflictCenterView: React.FC = () => {
  const [conflicts, setConflicts] = useState<ConflictItem[]>([]);
  const [selectedConflict, setSelectedConflict] = useState<ConflictItem | null>(null);

  useEffect(() => {
    loadConflicts();
  }, []);

  const loadConflicts = async () => {
    const docs = await KnowledgeProvider.getAllDocuments();
    const detected = KnowledgeProvider.detectConflicts(docs);
    setConflicts(detected);
    if (detected.length > 0) setSelectedConflict(detected[0]);
  };

  const handleResolve = (action: string) => {
    if (!selectedConflict) return;
    setConflicts(prev => prev.filter(c => c.id !== selectedConflict.id));
    setSelectedConflict(null);
    alert(`تم تطبيق الإجراء (${action}) وتحديث حالة التعارض في قاعدة المعرفة.`);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold shadow-md">
            <GitCompare className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 text-base sm:text-lg">مركز كشف التعارضات (Conflict Resolution Center)</h1>
            <p className="text-xs text-slate-500">يكتشف التضارب بين الأسعار، تواريخ الصلاحية، ودلائل الخدمات لتجنب تزويد الموظفين بمعلومات متضاربة</p>
          </div>
        </div>

        <button
          onClick={loadConflicts}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>إعادة فحص التعارضات</span>
        </button>
      </div>

      {conflicts.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-3">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-sm text-slate-800">لا توجد تعارضات معلقة ببيانات المعرفة حالياً</h3>
          <p className="text-xs text-slate-500">جميع المستندات والباقات المعتمدة متوافق تماماً وبنفس الإصدارات التاريخية.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Conflicts List */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-bold text-slate-700 block">قائمة التناقضات المكتشفة تلقائياً:</span>
            {conflicts.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedConflict(c)}
                className={`w-full text-right p-4 rounded-2xl border transition-all space-y-2 ${
                  selectedConflict?.id === c.id
                    ? 'border-amber-600 bg-amber-50/60 shadow-sm ring-2 ring-amber-500/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded">
                    تضارب إجراءات/إصدارات
                  </span>
                  <span className="text-[10px] text-slate-400">{c.createdAt}</span>
                </div>
                <h4 className="font-bold text-xs text-slate-900">{c.title}</h4>
                <p className="text-[11px] text-slate-500 line-clamp-2">
                  تضارب بين "{c.doc1.title}" و "{c.doc2.title}"
                </p>
              </button>
            ))}
          </div>

          {/* Side by Side Comparison & Resolution Panel */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
            {selectedConflict ? (
              <div className="space-y-5">
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  <div>
                    <span className="font-bold block">تأكيد حالة التعارض:</span>
                    يتعارض الإصدار v{selectedConflict.doc1.version} مع الإصدار v{selectedConflict.doc2.version}. يرجى اعتماد أحد المصدرين أو الدمج.
                  </div>
                </div>

                {/* Side by side comparison */}
                <div className="grid md:grid-cols-2 gap-3 text-xs">
                  {/* Doc 1 */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <span className="bg-blue-600 text-white font-bold text-[10px] px-2 py-0.5 rounded">المصدر الأول (v{selectedConflict.doc1.version})</span>
                    <h5 className="font-bold text-slate-900">{selectedConflict.doc1.title}</h5>
                    <p className="text-[11px] text-slate-600 leading-relaxed bg-white p-2.5 rounded border border-slate-200">
                      {selectedConflict.doc1.content}
                    </p>
                    <span className="text-[10px] text-slate-400 block">التاريخ: {selectedConflict.doc1.date}</span>
                    
                    <button
                      onClick={() => handleResolve(`اعتماد المصدر v${selectedConflict.doc1.version}`)}
                      className="w-full mt-2 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs"
                    >
                      اعتماد هذا المصدر وإلغاء الآخَر
                    </button>
                  </div>

                  {/* Doc 2 */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <span className="bg-slate-800 text-white font-bold text-[10px] px-2 py-0.5 rounded">المصدر الثاني (v{selectedConflict.doc2.version})</span>
                    <h5 className="font-bold text-slate-900">{selectedConflict.doc2.title}</h5>
                    <p className="text-[11px] text-slate-600 leading-relaxed bg-white p-2.5 rounded border border-slate-200">
                      {selectedConflict.doc2.content}
                    </p>
                    <span className="text-[10px] text-slate-400 block">التاريخ: {selectedConflict.doc2.date}</span>

                    <button
                      onClick={() => handleResolve(`اعتماد المصدر v${selectedConflict.doc2.version}`)}
                      className="w-full mt-2 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-lg text-xs"
                    >
                      اعتماد هذا المصدر وإلغاء الآخَر
                    </button>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                  <button
                    onClick={() => handleResolve('أرشفة كلا المستندين للمراجعة التحريرية')}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1"
                  >
                    <Archive className="w-3.5 h-3.5" />
                    <span>أرشفة للتنقيح اليدوي</span>
                  </button>
                </div>
              </div>
            ) : null}
          </div>

        </div>
      )}

    </div>
  );
};
