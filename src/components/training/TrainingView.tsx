import React, { useState } from 'react';
import { UserProfile, TrainingModule } from '../../types';
import { INITIAL_TRAINING_MODULES } from '../../data/seedData';
import { GraduationCap, Award, CheckCircle2, XCircle, Sparkles, MessageSquare, ArrowLeft, RefreshCcw, HelpCircle } from 'lucide-react';

export const TrainingView: React.FC<{ user: UserProfile }> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'quiz' | 'roleplay'>('quiz');
  const [currentModule] = useState<TrainingModule>(INITIAL_TRAINING_MODULES[0]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  // Roleplay Simulation State
  const [roleplayMode, setRoleplayMode] = useState<'easy' | 'angry' | 'confused'>('angry');
  const [roleplayMessages, setRoleplayMessages] = useState<
    { sender: 'customer' | 'employee'; text: string }[]
  >([
    {
      sender: 'customer',
      text: 'الإنترنت مقطوع عندي من أمس والضوء الأحمر شغال! شنو ندير وتوا أنا مستعجل جداً دارلي عطل في شغلي!',
    },
  ]);
  const [employeeReply, setEmployeeReply] = useState('');

  const currentQuestion = currentModule.questions[currentQuestionIdx];

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null) return;
    setUserAnswers(prev => [...prev, selectedAnswer]);

    if (currentQuestionIdx + 1 < currentModule.questions.length) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    userAnswers.forEach((ans, idx) => {
      if (ans === currentModule.questions[idx].correctAnswer) score += 1;
    });
    return Math.round((score / currentModule.questions.length) * 100);
  };

  const handleSendRoleplayReply = () => {
    if (!employeeReply.trim()) return;

    const newMsgs = [
      ...roleplayMessages,
      { sender: 'employee' as const, text: employeeReply },
    ];

    setRoleplayMessages(newMsgs);
    setEmployeeReply('');

    // Generate virtual customer AI response based on mood
    setTimeout(() => {
      let custReply = 'شكراً للاهتمام، واصل الإجراءات معي.';
      if (roleplayMode === 'angry') {
        if (employeeReply.includes('تأكد') || employeeReply.includes('فحص') || employeeReply.includes('كابل')) {
          custReply = 'تمام تفقدت الكابل الأصفر ومفيش ثني، بس الضوء الأحمر مزال يرمش! شنو البلاغ الرسمي اللي بتفتحه لي؟';
        } else {
          custReply = 'أنا توا مش فاضي للشرح، أعطيني رقم البلاغ أو المشرف المباشر!';
        }
      } else if (roleplayMode === 'confused') {
        custReply = 'معليش ممكن توضحلي خطوة خطوة وين نلقى هذا الزر في الراوتر؟';
      }

      setRoleplayMessages(prev => [...prev, { sender: 'customer', text: custReply }]);
    }, 800);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-5xl mx-auto">
      
      {/* Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 text-base sm:text-lg">منصة التدريب واختبار المهارات LTT</h1>
            <p className="text-xs text-slate-500">وحدات تدريبية، اختبارات معتمدة، ومحاكاة تفاعلية للتعامل مع المشتركين</p>
          </div>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'quiz' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600'
            }`}
          >
            اختبارات المعلومات (Quizzes)
          </button>
          <button
            onClick={() => setActiveTab('roleplay')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'roleplay' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600'
            }`}
          >
            محاكاة خدمة العملاء (Roleplay)
          </button>
        </div>
      </div>

      {activeTab === 'quiz' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded">
                {currentModule.category}
              </span>
              <h3 className="font-bold text-sm text-slate-900 mt-1">{currentModule.title}</h3>
            </div>
            <span className="text-xs text-slate-500 font-semibold">
              الوقت المقدر: {currentModule.estimatedMinutes} دقيقة
            </span>
          </div>

          {!showResult ? (
            <div className="space-y-5 animate-in fade-in">
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>السؤال {currentQuestionIdx + 1} من {currentModule.questions.length}</span>
                <span>نوع السؤال: {currentQuestion.type === 'mcq' ? 'اختيار متعدد' : 'صح / خطأ'}</span>
              </div>

              <div className="p-5 bg-slate-900 text-white rounded-2xl shadow-md">
                <h2 className="font-bold text-sm sm:text-base leading-relaxed">
                  {currentQuestion.question}
                </h2>
              </div>

              <div className="space-y-2">
                {currentQuestion.options?.map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedAnswer(idx)}
                    className={`w-full text-right p-3.5 rounded-xl border text-xs font-bold transition-all ${
                      selectedAnswer === idx
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-500/20'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button
                  onClick={handleAnswerSubmit}
                  disabled={selectedAnswer === null}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-sm disabled:opacity-40"
                >
                  تأكيد الإجابة والاطلاع على التالي
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center p-6 space-y-5 animate-in fade-in">
              <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                <Award className="w-10 h-10" />
              </div>

              <div>
                <h3 className="font-extrabold text-xl text-slate-900">كتمل الاختبار بنجاح!</h3>
                <p className="text-sm text-slate-600 mt-1">النتيجة النهائية الحاصل عليها:</p>
                <div className="text-3xl font-black text-indigo-600 my-2">{calculateScore()}%</div>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 max-w-md mx-auto">
                <span className="font-bold block mb-1">الوسام المستحق:</span>
                <span className="font-extrabold text-emerald-700">{currentModule.badgeReward}</span>
              </div>

              <button
                onClick={() => {
                  setShowResult(false);
                  setCurrentQuestionIdx(0);
                  setUserAnswers([]);
                  setSelectedAnswer(null);
                }}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs shadow-sm"
              >
                إعادة المحاولة لرفع النتيجة
              </button>
            </div>
          )}

        </div>
      )}

      {activeTab === 'roleplay' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900">محاكاة سيناريوهات التعامل مع الزبائن (Customer Roleplay)</h3>
              <p className="text-xs text-slate-500">تدرب على الردود الرسمية والامتثال لسياسات LTT</p>
            </div>

            <select
              value={roleplayMode}
              onChange={(e) => setRoleplayMode(e.target.value as any)}
              className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
            >
              <option value="angry">زبون غاضب ومستعجل</option>
              <option value="confused">زبون غير ملم تقنياً</option>
              <option value="easy">زبون استفسار عادي</option>
            </select>
          </div>

          <div className="h-64 overflow-y-auto p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
            {roleplayMessages.map((m, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl text-xs max-w-md ${
                  m.sender === 'customer'
                    ? 'bg-amber-100 border border-amber-200 text-amber-950 mr-auto'
                    : 'bg-blue-600 text-white ml-auto'
                }`}
              >
                <span className="font-bold block text-[10px] opacity-75 mb-0.5">
                  {m.sender === 'customer' ? 'الزبون الافتراضي:' : 'رد الموظف:'}
                </span>
                <p>{m.text}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={employeeReply}
              onChange={(e) => setEmployeeReply(e.target.value)}
              placeholder="اكتب ردك الاحترافي والمطابق لسياسات LTT..."
              className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleSendRoleplayReply}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-sm"
            >
              إرسال الرد
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
