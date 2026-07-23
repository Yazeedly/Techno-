import React, { useState } from 'react';
import { TroubleshootingTree, TroubleshootingStep } from '../../types';
import { INITIAL_TROUBLESHOOTING_TREES } from '../../data/seedData';
import { Wrench, CheckCircle2, AlertTriangle, ArrowRight, RotateCcw, Copy, Check, LifeBuoy, FileText, Send } from 'lucide-react';

export const TroubleshootingView: React.FC = () => {
  const [selectedTreeId, setSelectedTreeId] = useState<string>('tree-fiber');
  const [currentStepId, setCurrentStepId] = useState<string>('step-1');
  const [history, setHistory] = useState<{ stepId: string; selectedOption: string }[]>([]);
  const [diagnosisResult, setDiagnosisResult] = useState<{
    text: string;
    escalationNeeded: boolean;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const activeTree: TroubleshootingTree = INITIAL_TROUBLESHOOTING_TREES.find(t => t.id === selectedTreeId) || INITIAL_TROUBLESHOOTING_TREES[0];
  const currentStep: TroubleshootingStep = activeTree.steps[currentStepId] || activeTree.steps['step-1'];

  const handleOptionSelect = (opt: any) => {
    setHistory(prev => [...prev, { stepId: currentStepId, selectedOption: opt.label }]);

    if (opt.isDiagnosis) {
      setDiagnosisResult({
        text: opt.diagnosisText || 'تم اكتمال التشخيص بنجاح.',
        escalationNeeded: !!opt.escalationNeeded,
      });
    } else if (opt.nextStepId) {
      setCurrentStepId(opt.nextStepId);
    }
  };

  const handleReset = () => {
    setCurrentStepId(activeTree.startStepId);
    setHistory([]);
    setDiagnosisResult(null);
  };

  const handleCopyTicketNote = () => {
    const summaryText = `[تقرير تشخيص عطل LTT Technical Support]
الخدمة: ${activeTree.title}
التاريخ: ${new Date().toLocaleDateString('ar-LY')}
خطوات الفحص المتبعة:
${history.map((h, i) => `${i + 1}. ${h.selectedOption}`).join('\n')}
النتيجة والتشخيص النهائي:
${diagnosisResult?.text}
الحالة: ${diagnosisResult?.escalationNeeded ? 'يتطلب فتح تكت صيانة شبكة خارجية' : 'تم الحل محلياً / توجيه الزبون'}`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-5xl mx-auto">
      
      {/* Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-600 text-white flex items-center justify-center font-bold shadow-md">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 text-base sm:text-lg">المساعد التشخيصي للدعم الفني LTT</h1>
            <p className="text-xs text-slate-500">شجرة قرارات تفاعلية لتشخيص أعطال LTT Fiber, 4G, FWA بأسلوب آمن ومأمون</p>
          </div>
        </div>

        {/* Tree category switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => { setSelectedTreeId('tree-fiber'); handleReset(); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedTreeId === 'tree-fiber' ? 'bg-white text-cyan-700 shadow-2xs' : 'text-slate-600'
            }`}
          >
            LTT Fiber (FTTH)
          </button>
          <button
            onClick={() => { setSelectedTreeId('tree-fwa'); handleReset(); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedTreeId === 'tree-fwa' ? 'bg-white text-cyan-700 shadow-2xs' : 'text-slate-600'
            }`}
          >
            LTT 4G & FWA
          </button>
        </div>
      </div>

      {/* Main Diagnostic Interactive Flow */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
        
        {/* Header Title */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-ping" />
            <span className="font-bold text-sm text-slate-900">{activeTree.title}</span>
          </div>

          <button
            onClick={handleReset}
            className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة التشخيص</span>
          </button>
        </div>

        {!diagnosisResult ? (
          <div className="space-y-5 animate-in fade-in">
            {/* Step Question Box */}
            <div className="p-5 bg-slate-900 text-white rounded-2xl shadow-md">
              <span className="text-[11px] font-bold text-cyan-300 block mb-1">السؤال الفني الحالي:</span>
              <h2 className="font-extrabold text-sm sm:text-base leading-relaxed text-white">
                {currentStep.question}
              </h2>
            </div>

            {/* Step Options Buttons */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-slate-600 block">اختر النتيجة الملاحظة لدى الزبون:</span>
              {currentStep.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(opt)}
                  className="w-full text-right p-4 bg-slate-50 hover:bg-cyan-50/60 hover:border-cyan-500 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 transition-all flex items-center justify-between group shadow-2xs"
                >
                  <span>{opt.label}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 group-hover:-translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Diagnosis Summary Output */
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-5 animate-in fade-in">
            
            <div className="flex items-center gap-3">
              {diagnosisResult.escalationNeeded ? (
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              )}

              <div>
                <h3 className="font-extrabold text-base text-slate-900">
                  {diagnosisResult.escalationNeeded ? 'يتطلب تصعيد بلاغ صيانة شبكة خارجية' : 'تم التوصل إلى سبب العطل والحل المحلي'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">نتيجة الفحص التشخيصي المعتمد من LTT Technical Support</p>
              </div>
            </div>

            {/* Diagnosis Content Box */}
            <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed font-medium">
              {diagnosisResult.text}
            </div>

            {/* Steps History Trail */}
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-1">تسلسل خطوات التشخيص المكتملة:</span>
              <div className="flex flex-wrap gap-1.5">
                {history.map((h, idx) => (
                  <span key={idx} className="text-[11px] bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-slate-600 font-medium">
                    {idx + 1}. {h.selectedOption}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={handleCopyTicketNote}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'تم نسخ التقرير للتكت' : 'نسخ التقرير لحقل ملاحظات التكت الداخلي'}</span>
              </button>

              <button
                onClick={handleReset}
                className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl text-xs flex items-center gap-1"
              >
                <RotateCcw className="w-4 h-4" />
                <span>تشخيص حالة أخرى</span>
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
