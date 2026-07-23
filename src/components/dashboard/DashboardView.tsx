import React, { useState } from 'react';
import { UserProfile, PersonaType } from '../../types';
import { PERSONAS } from '../../data/seedData';
import { 
  Bot, 
  Search, 
  TrendingUp, 
  Wrench, 
  BookOpen, 
  GraduationCap, 
  Calculator, 
  Sparkles, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Send, 
  Zap, 
  Globe2, 
  HelpCircle, 
  FileText, 
  Layers, 
  Smartphone,
  ArrowUpRight,
  Flame,
  Radio,
  Sliders,
  Check
} from 'lucide-react';

interface DashboardViewProps {
  user: UserProfile;
  onNavigate: (view: string, persona?: PersonaType) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ user, onNavigate }) => {
  const [quickQuery, setQuickQuery] = useState('');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickQuery.trim()) {
      onNavigate('chat', 'techno');
    }
  };

  // Official 4G / FWA Individual Packages Data
  const packagesList = [
    {
      id: 'bayti-100',
      name: 'باقة بيتي',
      capacity: '100GB',
      social: '100GB سوشيال مجاناً',
      price: '75',
      period: 'شهرياً',
      badge: 'الأكثر شعبية للتمويل المنزلي',
      badgeColor: 'bg-blue-500/10 text-blue-600 border-blue-200',
      logoUrl: 'https://ltt.ly/_ipx/w_140/images/personal/4g/packages_logo/BAYTI-03.png',
      description: 'مثالية للاستخدام العائلي المنزلي الاعتيادي وتصفح التواصل الاجتماعي.',
      highlight: 'تصفح غير محدود لتطبيقات التواصل'
    },
    {
      id: 'bayti-plus-200',
      name: 'باقة بيتي +',
      capacity: '200GB',
      social: '100GB سوشيال مجاناً',
      price: '95',
      period: 'شهرياً',
      badge: 'خاصية ترحيل الرصيد',
      badgeColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
      logoUrl: 'https://ltt.ly/_ipx/w_140/images/personal/4g/packages_logo/BAYTI02.png',
      description: 'ترحيل الحصة المتبقية للشهر التالي بشرط التجديد خلال 48 ساعة.',
      highlight: 'ترحيل الحصة + 200GB أساسية'
    },
    {
      id: 'bayti-plus-plus-400',
      name: 'باقة بيتي ++',
      capacity: '400GB',
      social: '100GB سوشيال مجاناً',
      price: '165',
      period: 'شهرياً',
      badge: 'سعة فائقة للعائلات والكبيرة',
      badgeColor: 'bg-purple-500/10 text-purple-600 border-purple-200',
      logoUrl: 'https://ltt.ly/_ipx/w_140/images/personal/4g/packages_logo/BAYTI01.png',
      description: 'سعة ضخمة تناسب العائلات المتعددة والأجهزة الكثيرة مع خاصية الترحيل.',
      highlight: 'سعة ضخمة 400GB + 100GB'
    },
    {
      id: 'gamers-4g',
      name: 'باقات جيميرز 4G',
      capacity: '60GB - 300GB',
      social: 'سيرفرات مخصصة خفيضة الـ Ping',
      price: '60 - 220',
      period: 'حسب السعة',
      badge: 'للاعبين المحترفين',
      badgeColor: 'bg-amber-500/10 text-amber-600 border-amber-200',
      logoUrl: 'https://ltt.ly/_ipx/w_200/images/personal/4g/packages_logo/4gGamers.png',
      description: 'مسارات وتوجيه شبكي مخصص لتقليل زمن الاستجابة Ping في الألعاب الإلكترونية.',
      highlight: 'زمن استجابة منخفض مخصص للألعاب'
    },
    {
      id: 'mazaji-up-30',
      name: 'باقة مزاجي Up',
      capacity: '30GB',
      social: 'حصة تراكمية',
      price: '35',
      period: 'شهرياً',
      badge: 'اقتصادية للأفراد',
      badgeColor: 'bg-sky-500/10 text-sky-600 border-sky-200',
      logoUrl: 'https://ltt.ly/_ipx/w_140/images/personal/4g/packages_logo/mazajiup.png',
      description: 'باقة خفيفة واقتصادية للإنترنت الشخصي اليومي على الهاتف أو الراوتر المحمول.',
      highlight: 'مرونة للتراكم والتعبئة المبكرة'
    },
    {
      id: 'mazaji-70',
      name: 'باقة مزاجي Pro',
      capacity: '70GB',
      social: 'سرعة غير محدودة',
      price: '55',
      period: 'شهرياً',
      badge: 'استخدام شخصي مكثف',
      badgeColor: 'bg-indigo-500/10 text-indigo-600 border-indigo-200',
      logoUrl: 'https://ltt.ly/_ipx/w_140/images/personal/4g/packages_logo/mzagi.png',
      description: 'خيار ممتاز للأفراد ذوي الاستهلاك المتواصل للبث والتصفح اليومي.',
      highlight: 'توازُن ممتاُ بين السعة والسعر'
    },
    {
      id: 'power-600',
      name: 'باقة باور Power',
      capacity: '600GB',
      social: 'صلاحية 90 يوماً',
      price: '260',
      period: 'لكل 3 أشهر',
      badge: 'صلاحية ممتدة 3 أشهر',
      badgeColor: 'bg-rose-500/10 text-rose-600 border-rose-200',
      logoUrl: 'https://ltt.ly/_ipx/w_140/images/personal/4g/packages_logo/Power.png',
      description: 'حجم بيانات ضخم بمرونة استخدام تمتد لثلاثة أشهر متواصلة بدون انقطاع.',
      highlight: '600GB لـ 90 يوماً متواصلة'
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* 1. Executive Modern Opening Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-2xl p-6 sm:p-8 lg:p-10">
        {/* Background Decorative Gradients */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          
          <div className="space-y-4 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold">
                <Globe2 className="w-3.5 h-3.5" />
                شركة ليبيا للاتصالات والتقنية LTT
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                المنصة المعرفية الاستشارية المعتمدة 2026
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">
              أهلاً بك في منصة <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-400">Techno LTT</span> الرقمية
            </h1>

            <p className="text-slate-300 text-sm leading-relaxed">
              مرجعك الذكي لاستشارات المبيعات، توجيه المشتركين، أحدث دليل للباقات والخدمات المعتمدة، وشجرة تشخيص الدعم الفني لحلول شبكة LTT.
            </p>

            {/* Quick Interactive Smart Search Input */}
            <form onSubmit={handleQuickSubmit} className="pt-2">
              <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-1.5 focus-within:ring-2 focus-within:ring-blue-400 transition-all">
                <div className="px-3 text-slate-400">
                  <Search className="w-5 h-5 text-blue-300" />
                </div>
                <input 
                  type="text"
                  value={quickQuery}
                  onChange={(e) => setQuickQuery(e.target.value)}
                  placeholder="ابحث عن مواصفات باقة، حل عطل، أو إجراءات اشتراك الرسمية..."
                  className="w-full bg-transparent text-white placeholder-slate-400 text-xs sm:text-sm outline-none px-2 py-2"
                />
                <button 
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-1.5 shrink-0"
                >
                  <span>استفسر الآن</span>
                  <Send className="w-3.5 h-3.5 rotate-180" />
                </button>
              </div>
            </form>
          </div>

          {/* Quick Metrics & Persona Portal Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-4 min-w-[280px] lg:max-w-[320px]">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-bold text-slate-200">حالة المساعد المعتمد</span>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-md">
                Q1 2026 Mapped
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-[10px] text-slate-400 font-medium block">دقة الاستجابة</span>
                <span className="text-lg font-black text-emerald-400">98.5%</span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-[10px] text-slate-400 font-medium block">خدمات مفهرسة</span>
                <span className="text-lg font-black text-blue-400">42 خدمة</span>
              </div>
            </div>

            <button 
              onClick={() => onNavigate('chat', 'techno')}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Bot className="w-4 h-4" />
              <span>بدء جلسة مع Techno AI</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. Official Sales Policy Direction Notice */}
      <div className="bg-gradient-to-r from-emerald-900/90 via-slate-900 to-blue-950 rounded-2xl p-5 text-white border border-emerald-500/30 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30 mt-0.5">
            <Radio className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-emerald-300 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                توجيه موظفي المبيعات والخدمات
              </span>
              <span className="text-[10px] text-slate-400">التحديث الداخلي المعتمد</span>
            </div>
            <h3 className="font-bold text-sm text-white">
              التوصية الرسمية المعتمدة للمشتركين الأفراد (4G & FWA)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
              عند تقديم استشارة أو ترشيح باقة للمشتركين الأفراد، **يوصى دائماً وأولاً** بخدمات الجيل الرابع (4G) للأفراد وباقات (بيتي) أو (FWA)، باعتبارها الخيارات الرئيسة والأحدث لتغطية عالية الجودة واستقرار في الاتصال.
            </p>
          </div>
        </div>

        <button 
          onClick={() => onNavigate('sales')}
          className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl transition-all shadow-md shrink-0 flex items-center gap-1.5"
        >
          <span>محاكي توصية المشترك</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>

      {/* 3. Showcase of Official 4G & FWA Packages with Real Logos */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500" />
              <span>أحدث باقات الجيل الرابع (4G) وبيتي المعتمدة للأفراد</span>
            </h2>
            <p className="text-xs text-slate-500">الباقات الرئيسية الموصى بها في دليل خدمات LTT مع الشعارات الرسمية</p>
          </div>
          <button 
            onClick={() => onNavigate('knowledge')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>عرض دليل جميع الخدمات</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {packagesList.map((pkg) => (
            <div 
              key={pkg.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-500 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Header Badge & Price */}
                <div className="flex justify-between items-start gap-2">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${pkg.badgeColor}`}>
                    {pkg.badge}
                  </span>
                  <div className="text-left">
                    <span className="text-base font-black text-slate-900">{pkg.price} <span className="text-[10px] font-medium text-slate-500">د.ل</span></span>
                    <span className="text-[10px] text-slate-400 block">{pkg.period}</span>
                  </div>
                </div>

                {/* Package Official Logo Display */}
                <div className="h-20 bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-center justify-center group-hover:bg-blue-50/50 transition-colors">
                  <img 
                    src={pkg.logoUrl} 
                    alt={pkg.name}
                    className="max-h-14 w-auto object-contain transition-transform group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>

                {/* Package Info */}
                <div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                    {pkg.name} ({pkg.capacity})
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {pkg.description}
                  </p>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl text-[11px] font-semibold text-slate-700 flex items-center gap-1.5 border border-slate-100">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{pkg.highlight}</span>
                </div>
              </div>

              <button 
                onClick={() => onNavigate('chat', 'techno')}
                className="mt-4 w-full py-2.5 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-800 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <span>استفسار مبيعات وتفعيل</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Main Executive Functional Portals Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-600" />
          <span>أقسام المنصة الاستشارية الرئيسية</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Portal 1: Knowledge Catalog */}
          <div 
            onClick={() => onNavigate('knowledge')}
            className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-500 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                دليل المعرفة والخدمات الرسمية
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                مكتبة المواصفات والأسعار المعتمدة لكافة خدمات LTT (4G، فايبر، FWA، ADSL، والخدمات المضافة).
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
              <span>استكشاف المستندات والباقات</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Portal 2: Sales Simulator */}
          <div 
            onClick={() => onNavigate('sales')}
            className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center font-bold group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-xs">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-600 transition-colors">
                حاسبة ومحاكي المبيعات والتوصية
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                أداة تفاعلية لتحديد احتياج المشترك (أفراد / شركات)، الميزانية، وتحديد الباقة والحل الأنسب فوراً.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
              <span>بدء جلسة المحاكاة</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Portal 3: Technical Support Diagnostics */}
          <div 
            onClick={() => onNavigate('support')}
            className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-amber-500 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center font-bold group-hover:bg-amber-600 group-hover:text-white transition-all shadow-xs">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-amber-600 transition-colors">
                تشخيص الأعطال والدعم الفني
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                شجرة القرارات التشخيصية لحل مشكلات الإشارة، إعدادات الراوتر، وتتبع بلاغات المشتركين.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600">
              <span>فتح شجرة التشخيص</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Portal 4: Training & Lab */}
          <div 
            onClick={() => onNavigate('training')}
            className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-purple-500 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center font-bold group-hover:bg-purple-600 group-hover:text-white transition-all shadow-xs">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-purple-600 transition-colors">
                مختبر التدريب والاختبارات
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                وحدات تدريبية واختبارات لرفع جاهزية موظفي المبيعات والدعم الفني على دليل LTT 2026.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-600">
              <span>دخول مختبر الاختبارات</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Portal 5: Persona Assistants */}
          <div 
            onClick={() => onNavigate('chat', 'techno')}
            className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-sky-500 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center font-bold group-hover:bg-sky-600 group-hover:text-white transition-all shadow-xs">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-sky-600 transition-colors">
                مساعد الذكاء الاصطناعي Techno
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                محادثة فورية مع خبير المعرفة للرد على الاستفسارات الفنية والتجارية المعقدة بخصوص LTT.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-600">
              <span>بدء المحادثة الذكية</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Portal 6: Conflicts & Governance */}
          <div 
            onClick={() => onNavigate('conflicts')}
            className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-rose-500 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center font-bold group-hover:bg-rose-600 group-hover:text-white transition-all shadow-xs">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-rose-600 transition-colors">
                مركز فض التعارضات والسياسات
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                متابعة المستندات المتعارضة وحسم فروقات الأسعار أو السياسات الملغاة بين الأقسام.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-rose-600">
              <span>مراجعة سياسات التعارض</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
