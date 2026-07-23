import React, { useState } from 'react';
import { ServicePackage, RecommendationRule } from '../../types';
import { INITIAL_SERVICES, INITIAL_RULES } from '../../data/seedData';
import { Calculator, CheckCircle2, Award, Zap, ShieldCheck, ArrowRight, ArrowLeft, Layers, SlidersHorizontal, Sparkles } from 'lucide-react';

export const SalesWizardView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'wizard' | 'rules'>('wizard');
  const [step, setStep] = useState(1);

  // Form State
  const [customerType, setCustomerType] = useState<'individual' | 'business'>('individual');
  const [region, setRegion] = useState('طرابلس الكبرى');
  const [fiberAvailable, setFiberAvailable] = useState<boolean>(true);
  const [useCase, setUseCase] = useState<'gaming' | 'streaming_family' | 'business_vpn' | 'light'>('gaming');
  const [usersCount, setUsersCount] = useState<number>(4);
  const [budgetRange, setBudgetRange] = useState<string>('متوسط');

  const [recommendationResult, setRecommendationResult] = useState<{
    primary: ServicePackage;
    budgetAlt: ServicePackage;
    highPerfAlt: ServicePackage;
    ruleMatched: string;
    sellingPoints: string[];
  } | null>(null);

  const handleCalculateRecommendation = () => {
    let primary = INITIAL_SERVICES[0];
    let budgetAlt = INITIAL_SERVICES[1];
    let highPerfAlt = INITIAL_SERVICES[2];
    let ruleMatched = 'القاعدة الافتراضية للخدمات العائلية';
    let sellingPoints = [
      'تغطية واسعة وسرعة استجابة فائقة',
      'دعم كامل للتطبيقات الصوتية المرئية',
      'إمكانية إدارة الباقة والحساب عبر تطبيق LTT Life وبوابة my.ltt.ly'
    ];

    if (useCase === 'gaming' && fiberAvailable) {
      primary = INITIAL_SERVICES.find(s => s.id === 'srv-fiber') || INITIAL_SERVICES[2];
      budgetAlt = INITIAL_SERVICES.find(s => s.id === 'srv-fwa') || INITIAL_SERVICES[1];
      highPerfAlt = primary;
      ruleMatched = 'قاعدة الألعاب الإلكترونية والألياف البصرية (Rule-01)';
      sellingPoints = [
        'أقل زمن استجابة Ping ممتازة للألعاب التنافسية والبث المباشر',
        'عدم وجود حد أدنى للسرعة المضمونة وضمان استقرار الإشارة',
        'باقات بسعات غير محدودة'
      ];
    } else if (useCase === 'business_vpn' || customerType === 'business') {
      primary = INITIAL_SERVICES.find(s => s.id === 'srv-biz-vpn') || INITIAL_SERVICES[3];
      budgetAlt = INITIAL_SERVICES.find(s => s.id === 'srv-fiber') || INITIAL_SERVICES[2];
      highPerfAlt = primary;
      ruleMatched = 'قاعدة ربط قطاع الأعمال والشركات (Rule-Biz)';
      sellingPoints = [
        'اتفاقية مستوى خدمة مخصصة SLA للشركات والمصارف',
        'دعم فني مخصص على مدار 24 ساعة طوال الأسبوع',
        'سرعات متماثلة Uplink/Downlink مع تشفير L2/L3 VPN'
      ];
    } else if (!fiberAvailable) {
      primary = INITIAL_SERVICES.find(s => s.id === 'srv-fwa') || INITIAL_SERVICES[1];
      budgetAlt = INITIAL_SERVICES.find(s => s.id === 'srv-4g-mobile') || INITIAL_SERVICES[0];
      highPerfAlt = INITIAL_SERVICES.find(s => s.id === 'srv-fwa') || INITIAL_SERVICES[1];
      ruleMatched = 'قاعدة التغطية اللاسلكية الثابتة FWA (Rule-02)';
      sellingPoints = [
        'أفضل خيار منزلي ثابث في المناطق التي لا تتوفر بها ألياف بصرية',
        'تركيب راوتر خارجي CPE عالي الكفاءة',
        'مرونة ممتازة في تعبئة الرصيد والباقات'
      ];
    }

    setRecommendationResult({
      primary,
      budgetAlt,
      highPerfAlt,
      ruleMatched,
      sellingPoints,
    });
    setStep(4);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 text-base sm:text-lg">حاسبة التوصيات البيعية لـ LTT</h1>
            <p className="text-xs text-slate-500">مستشار بيعي ذكي يحلل احتياجات الزبون ويقترح الباقة المثالية بلمسة واحدة</p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setActiveTab('wizard')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'wizard' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            حاسبة التوصية للزبون
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'rules' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            إدارة قواعد التوصية (Rules Engine)
          </button>
        </div>
      </div>

      {activeTab === 'wizard' && (
        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Wizard Form */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
            
            {/* Step Progress Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                  {step}
                </span>
                <span>الخطوة {step} من 3: تحديد بيانات الاحتياج</span>
              </span>
              <div className="flex gap-1">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`w-8 h-2 rounded-full transition-all ${
                      s <= step ? 'bg-blue-600' : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {step === 1 && (
              <div className="space-y-4 animate-in fade-in">
                <h3 className="font-bold text-sm text-slate-800">1. نوع الزبون والمنطقة الجغرافية:</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCustomerType('individual')}
                    className={`p-4 rounded-xl border text-right transition-all ${
                      customerType === 'individual'
                        ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-bold ring-2 ring-blue-500/20'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="block text-sm">قطاع الأفراد (B2C)</span>
                    <span className="text-[11px] text-slate-500 block mt-1 font-normal">منازل، عائلات، ألعاب، استخدام شخصي</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCustomerType('business')}
                    className={`p-4 rounded-xl border text-right transition-all ${
                      customerType === 'business'
                        ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-bold ring-2 ring-blue-500/20'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="block text-sm">قطاع الأعمال والشركات (B2B)</span>
                    <span className="text-[11px] text-slate-500 block mt-1 font-normal">شركات، مصارف، فروع، ربط افتراضي VPN</span>
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">المنطقة الجغرافية للخدمة:</label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="طرابلس الكبرى">طرابلس الكبرى ومحيطها</option>
                    <option value="بنغازي">بنغازي والمنطقة الشرقية</option>
                    <option value="مصراتة">مصراتة والمنطقة الوسطى</option>
                    <option value="الجنوب">سبها والمنطقة الجنوبية</option>
                    <option value="الزاوية والغرب">الزاوية والجبل الغربي</option>
                  </select>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-sm"
                  >
                    <span>التالي: نوع الاستخدام والتغطية</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-in fade-in">
                <h3 className="font-bold text-sm text-slate-800">2. حالة التغطية ونوع الاستخدام الرئيسي:</h3>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">هل المنطقة مغطاة بشبكة الألياف البصرية LTT Fiber؟</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFiberAvailable(true)}
                      className={`p-3 rounded-xl border text-right transition-all text-xs font-bold ${
                        fiberAvailable
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                          : 'border-slate-200 bg-slate-50 text-slate-700'
                      }`}
                    >
                      نعم (متوفرة)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFiberAvailable(false)}
                      className={`p-3 rounded-xl border text-right transition-all text-xs font-bold ${
                        !fiberAvailable
                          ? 'border-amber-600 bg-amber-50 text-amber-900 ring-2 ring-amber-500/20'
                          : 'border-slate-200 bg-slate-50 text-slate-700'
                      }`}
                    >
                      لا (غير متوفرة حالياً)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">هدف الاستخدام الأهم للزبون:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'gaming', title: 'ألعاب وبث مباشر (Gaming/Streaming)', desc: 'زمن استجابة Ping منخفض جداً' },
                      { id: 'streaming_family', title: 'عائلة ومشاهدة 4K', desc: 'سعة عالية ومشاركة أجهزة كثيرة' },
                      { id: 'business_vpn', title: 'ربط مكاتب وأعمال آمنة', desc: 'سرعات متماثلة وSLA مضمون' },
                      { id: 'light', title: 'تصفح وتواصل خفيف', desc: 'باقة اقتصادية مناسبة' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setUseCase(item.id as any)}
                        className={`p-3 rounded-xl border text-right transition-all ${
                          useCase === item.id
                            ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold'
                            : 'border-slate-200 bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span className="block text-xs font-bold">{item.title}</span>
                        <span className="text-[10px] text-slate-500 block mt-0.5">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1"
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span>السابق</span>
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-sm"
                  >
                    <span>التالي: عدد المستخدمين والميزانية</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 animate-in fade-in">
                <h3 className="font-bold text-sm text-slate-800">3. عدد الأجهزة المتصلة والميزانية المتوقعة:</h3>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    عدد المستخدمين / الأجهزة المتصلة بالتوازي: ({usersCount} أجهزة)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={usersCount}
                    onChange={(e) => setUsersCount(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">الميزانية الشهرية المتوقعة للزبون:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['اقتصادية', 'متوسطة', 'مرتفعة / مفتوحة'].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBudgetRange(b)}
                        className={`p-3 rounded-xl border text-center text-xs font-bold transition-all ${
                          budgetRange === b
                            ? 'border-blue-600 bg-blue-50 text-blue-900'
                            : 'border-slate-200 bg-slate-50 text-slate-700'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1"
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span>السابق</span>
                  </button>
                  <button
                    onClick={handleCalculateRecommendation}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-md"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>توليد التوصية البيعية المثالية</span>
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Result Card */}
          <div className="lg:col-span-5 space-y-4">
            {recommendationResult ? (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg space-y-5 animate-in fade-in">
                
                {/* Header Match */}
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold block">تم تطبيق القاعدة البيعية المعتمدة:</span>
                    <span className="text-[11px] text-emerald-700">{recommendationResult.ruleMatched}</span>
                  </div>
                </div>

                {/* Primary Recommendation */}
                <div className="p-4 bg-gradient-to-br from-blue-900 to-slate-900 text-white rounded-2xl shadow-md relative overflow-hidden">
                  <span className="bg-sky-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full absolute top-3 left-3 uppercase">
                    التوصية الرئيسية الأولى
                  </span>
                  <h3 className="font-bold text-base text-white mt-1">{recommendationResult.primary.name}</h3>
                  <p className="text-xs text-blue-200 mt-1 leading-relaxed">{recommendationResult.primary.description}</p>
                  
                  <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-slate-400 block">السرعة المتوقعة:</span>
                      <span className="font-bold text-sky-300">{recommendationResult.primary.speed}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">السعة:</span>
                      <span className="font-bold text-sky-300">{recommendationResult.primary.quota}</span>
                    </div>
                  </div>
                </div>

                {/* Key Selling Points for Agent */}
                <div>
                  <h4 className="font-bold text-xs text-slate-800 mb-2 flex items-center gap-1">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span>نقاط الإقناع البيعي للموظف (Key Selling Points):</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {recommendationResult.sellingPoints.map((sp, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{sp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Budget Alternative */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <span className="font-bold text-slate-700 block mb-1">الخيار البديل الاقتصادي:</span>
                  <p className="font-bold text-blue-700">{recommendationResult.budgetAlt.name}</p>
                  <p className="text-[11px] text-slate-500">{recommendationResult.budgetAlt.description}</p>
                </div>

                {/* Official Requirements */}
                <div>
                  <h4 className="font-bold text-xs text-slate-800 mb-1 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span>متطلبات التسجيل الرسمية:</span>
                  </h4>
                  <p className="text-[11px] text-slate-600">
                    {recommendationResult.primary.requirements?.join(' • ')}
                  </p>
                </div>

              </div>
            ) : (
              <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-3">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <Calculator className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-sm text-slate-800">جاهز لتوليد التوصية</h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                  قم باستيفاء خطوات النموذج الثلاث للحصول على التوصية البيعية المعتمدة والنقاط التسويقية فوراً.
                </p>
              </div>
            )}
          </div>

        </div>
      )}

      {activeTab === 'rules' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900">قواعد التوصية البيعية النشطة (Rules Engine)</h3>
              <p className="text-xs text-slate-500">القواعد البرمجية المعتمدة لحاسبة المبيعات</p>
            </div>
            <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-bold">
              {INITIAL_RULES.length} قواعد نشطة
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {INITIAL_RULES.map((rule) => (
              <div key={rule.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{rule.name}</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      {rule.status}
                    </span>
                  </div>
                  <p className="text-slate-500 font-mono mt-1 text-[11px]">الشرط: {rule.condition}</p>
                  <p className="text-slate-700 mt-1">{rule.outcomeText}</p>
                </div>
                <div className="text-left shrink-0">
                  <span className="text-[10px] text-slate-400 block">اعتمد بواسطة: {rule.approvedBy}</span>
                  <span className="text-[10px] text-blue-600 font-bold block">الأولوية: #{rule.priority}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
