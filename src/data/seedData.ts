import { KnowledgeDocument, ServicePackage, RecommendationRule, TroubleshootingTree, TrainingModule, PersonaInfo, UserProfile } from '../types';

export const DEMO_USERS: UserProfile[] = [
  {
    uid: 'admin-super-01',
    email: 'admin@ltt.ly',
    displayName: 'مدير النظام الرئيسي (Super Admin)',
    role: 'super_admin',
    centerOrAgent: 'الإدارة العامة - طرابلس',
    region: 'طرابلس الكبرى',
    status: 'active',
  },
];

export const PERSONAS: PersonaInfo[] = [
  {
    id: 'techno',
    name: 'Techno - تيكنو',
    title: 'المستشار الذكي لشركة LTT',
    description: 'المستشار الذكي الموحد لخدمات الأفراد والأعمال والوكلاء والدعم الفني والمواقع في LTT (النسخة المنقحة 2.6).',
    avatarBg: 'bg-blue-600',
    iconName: 'Bot',
    welcomeMsg: 'مرحباً بك في عالم LTT 👋 أنا تيكنو، المستشار الذكي لخدمات شركة ليبيا للاتصالات والتقنية. أساعدك في اختيار الخدمة الأنسب، الأسعار المعتمدة، أسعار الوكلاء، الدعم الفني والمواقع جغرفياً.',
  },
  {
    id: 'techno_sales',
    name: 'Techno Sales',
    title: 'مستشار المبيعات والحلول الرقمية',
    description: 'يساعد الأفراد والشركات في اختيار الباقات المعتمدة (Fixed VoLTE Business 2026, 4G, FWA, Fiber, eSIM).',
    avatarBg: 'bg-emerald-600',
    iconName: 'TrendingUp',
    welcomeMsg: 'مرحباً! أنا Techno Sales. دعنا نحدد أفضل الباقات والحلول الرقمية التي تحقق لك أعلى قيمة مقابل الاستثمار.',
  },
  {
    id: 'techno_support',
    name: 'Techno Support',
    title: 'خبير التشخيص والدعم الفني',
    description: 'دليل شامل لحل مشاكل انقطاع النت، ضوء LOS الأحمر في الفايبر، ضعف التغطية، وإعدادات المودم.',
    avatarBg: 'bg-cyan-600',
    iconName: 'Wrench',
    welcomeMsg: 'مرحباً! أنا Techno Support. ما المشكلة التقنية أو العطل الذي تواجهه في خدمة LTT اليوم؟',
  },
  {
    id: 'techno_coach',
    name: 'Techno Coach',
    title: 'مدرب ومحاكي أسعار الوكلاء والباقات',
    description: 'يدرب الموظفين والوكلاء المعتمدين على جدول تخفيضات الوكلاء المعتمد وقواعد التسعير والتمييز.',
    avatarBg: 'bg-indigo-600',
    iconName: 'GraduationCap',
    welcomeMsg: 'أهلاً بك! جاهز لاختبار معلوماتك بباقات LTT للأفراد والأعمال والأسعار المعتمدة للجمهور والوكلاء؟',
  },
];

export const INITIAL_SERVICES: ServicePackage[] = [
  // ==========================================
  // --- باقات الجيل الرابع 4G للأفراد ---
  // ==========================================
  {
    id: 'srv-4g-daily',
    name: 'باقة يومي 1GB',
    category: 'خدمات الجيل الرابع 4G',
    type: 'individual',
    description: 'باقة إنترنت يومية للأفراد بسعة 1GB وصلاحية يوم واحد (مناسبة للاستخدام الخفيف والسريع).',
    features: ['حصة 1GB بيانات', 'صلاحية 24 ساعة', 'سرعة غير محدودة'],
    price: '3 د.ل / يومياً',
    quota: '1GB / يوم',
    speed: 'غير محدودة',
    validity: 'يوم واحد',
    requirements: ['شريحة 4G LTT مشغلة'],
    status: 'active',
    sourceName: 'دليل باقات الأفراد LTT 2026',
  },
  {
    id: 'srv-4g-daily-plus',
    name: 'باقة يومي+',
    category: 'خدمات الجيل الرابع 4G',
    type: 'individual',
    description: 'باقة يومية سريعة بحصة غير محدودة حتى سرعة 15 Mbps (مناسبة للاستخدام اليومي المتوسط أو العالي).',
    features: ['حصة غير محدودة / يوم', 'سرعة حتى 15 Mbps', 'تجديد يومي عند الطلب'],
    price: '10 د.ل / يومياً',
    quota: 'غير محدودة / يوم',
    speed: 'حتى 15 Mbps',
    validity: 'يوم واحد',
    requirements: ['شريحة 4G LTT مشغلة'],
    status: 'active',
    sourceName: 'دليل باقات الأفراد LTT 2026',
  },
  {
    id: 'srv-4g-weekly',
    name: 'باقة أسبوعي 5GB',
    category: 'خدمات الجيل الرابع 4G',
    type: 'individual',
    description: 'باقة أسبوعية بسعة 5GB وسعر 8 د.ل (مناسبة للاستخدام الخفيف لمدة أسبوع).',
    features: ['حصة 5GB بيانات', 'صلاحية 7 أيام', 'سرعة غير محدودة'],
    price: '8 د.ل / أسبوعياً',
    quota: '5GB / أسبوع',
    speed: 'غير محدودة',
    validity: '7 أيام',
    requirements: ['شريحة 4G LTT مشغلة'],
    status: 'active',
    sourceName: 'دليل باقات الأفراد LTT 2026',
  },
  {
    id: 'srv-4g-bkeifak',
    name: 'باقة بكيفك (Bkeifak)',
    category: 'خدمات الجيل الرابع 4G',
    type: 'individual',
    description: 'باقة خفيفة بسعة 10GB شهرياً وسعر 15 د.ل (سعر الجيجا الإضافية 2.75 د.ل).',
    features: ['حصة 10GB بيانات شهرياً', 'سرعة غير محدودة', 'سعر الجيجا الإضافي 2.75 د.ل'],
    price: '15 د.ل / شهرياً',
    quota: '10GB / شهر',
    speed: 'غير محدودة',
    validity: '30 يوماً',
    status: 'active',
    sourceName: 'دليل باقات الأفراد LTT 2026',
  },
  {
    id: 'srv-4g-mazaji-up',
    name: 'باقة مزاجي Up',
    category: 'خدمات الجيل الرابع 4G',
    type: 'individual',
    description: 'باقة شهرية متوازنة للأفراد بسعة 30GB وسعر 35 د.ل (مناسبة للاستخدام المتوسط).',
    features: ['حصة 30GB بيانات شهرياً', 'سرعة غير محدودة', 'تراكمية البيانات عند التجديد المبكر'],
    price: '35 د.ل / شهرياً',
    quota: '30GB / شهر',
    speed: 'غير محدودة',
    validity: '30 يوماً',
    status: 'active',
    sourceName: 'دليل باقات الأفراد LTT 2026',
    logoUrl: 'https://ltt.ly/_ipx/w_140/images/personal/4g/packages_logo/mazajiup.png',
  },
  {
    id: 'srv-4g-mazaji-pro',
    name: 'باقة مزاجي Pro',
    category: 'خدمات الجيل الرابع 4G',
    type: 'individual',
    description: 'باقة شهرية عالية السعة بسعة 70GB وسعر 55 د.ل (مناسبة للاستخدام المتوسط إلى العالي).',
    features: ['حصة 70GB بيانات شهرياً', 'سرعة غير محدودة', 'أولوية وسعة إضافية'],
    price: '55 د.ل / شهرياً',
    quota: '70GB / شهر',
    speed: 'غير محدودة',
    validity: '30 يوماً',
    status: 'active',
    sourceName: 'دليل باقات الأفراد LTT 2026',
    logoUrl: 'https://ltt.ly/_ipx/w_140/images/personal/4g/packages_logo/mzagi.png',
  },
  {
    id: 'srv-4g-beiti',
    name: 'باقة بيتي (Beiti)',
    category: 'خدمات الجيل الرابع 4G',
    type: 'individual',
    description: 'باقة منزلية أساسية للأسر بحصة 100GB + 100GB سوشيال ميديا بسعر 75 د.ل شهرياً.',
    features: ['حصة 100GB أساسية + 100GB تطبيقات التواصل الاجتماعي', 'سرعة غير محدودة', 'مناسبة للاستخدام المنزلي المتوسط'],
    price: '75 د.ل / شهرياً',
    quota: '100GB + 100GB سوشيال',
    speed: 'غير محدودة',
    validity: '30 يوماً',
    status: 'active',
    sourceName: 'دليل باقات الأفراد LTT 2026',
    logoUrl: 'https://ltt.ly/_ipx/w_140/images/personal/4g/packages_logo/BAYTI-03.png',
  },
  {
    id: 'srv-4g-beiti-plus',
    name: 'باقة بيتي+ (Beiti+)',
    category: 'خدمات الجيل الرابع 4G',
    type: 'individual',
    description: 'باقة منزلية ممتازة بحصة 200GB + 100GB سوشيال بسعر 95 د.ل شهرياً، مع ترحيل الحصة المتبقية عند التجديد خلال 48 ساعة.',
    features: [
      'حصة 200GB أساسية + 100GB سوشيال',
      'ترحيل الحصة المتبقية عند التجديد خلال 48 ساعة من انتهاء الصلاحية',
      'سرعة غير محدودة للاستخدام العائلي'
    ],
    price: '95 د.ل / شهرياً',
    quota: '200GB + 100GB سوشيال',
    speed: 'غير محدودة',
    validity: '30 يوماً',
    status: 'active',
    sourceName: 'دليل باقات الأفراد LTT 2026',
    logoUrl: 'https://ltt.ly/_ipx/w_140/images/personal/4g/packages_logo/BAYTI02.png',
  },
  {
    id: 'srv-4g-beiti-plus-plus',
    name: 'باقة بيتي++ (Beiti++)',
    category: 'خدمات الجيل الرابع 4G',
    type: 'individual',
    description: 'باقة منزلية عالية السعة بحصة 400GB + 100GB سوشيال بسعر 165 د.ل شهرياً، مع ترحيل الحصة المتبقية عند التجديد خلال 48 ساعة.',
    features: [
      'حصة 400GB أساسية + 100GB سوشيال',
      'ترحيل الحصة المتبقية عند التجديد خلال 48 ساعة من انتهاء الصلاحية',
      'سرعة غير محدودة ومثالية للمنازل ذات الاستخدام العالي'
    ],
    price: '165 د.ل / شهرياً',
    quota: '400GB + 100GB سوشيال',
    speed: 'غير محدودة',
    validity: '30 يوماً',
    status: 'active',
    sourceName: 'دليل باقات الأفراد LTT 2026',
    logoUrl: 'https://ltt.ly/_ipx/w_140/images/personal/4g/packages_logo/BAYTI01.png',
  },
  {
    id: 'srv-4g-infinity-ind',
    name: 'باقة بيتي إنفينيتي (Beiti Infinity)',
    category: 'خدمات الجيل الرابع 4G',
    type: 'individual',
    description: 'باقة 4G منزلية بلا حدود بإنترنت غير محدود بالكامل بسعر 175 د.ل شهرياً وبأقصى سرعة متاحة حسب التغطية.',
    features: [
      'إنترنت غير محدود بالكامل',
      'أقصى سرعة حسب التغطية بالمنطقة',
      'باقة 4G مخصصة للأفراد والمنازل ذات الاستخدام العالي جداً'
    ],
    price: '175 د.ل / شهرياً',
    quota: 'غير محدود',
    speed: 'أقصى سرعة حسب التغطية',
    validity: '30 يوماً',
    status: 'active',
    sourceName: 'دليل باقات الأفراد LTT 2026',
    logoUrl: 'https://ltt.ly/_ipx/w_140/images/personal/4g/packages_logo/BAYTI01.png',
  },
  {
    id: 'srv-4g-gamers',
    name: 'باقة LTT4Gamers (الألعاب)',
    category: 'خدمات الجيل الرابع 4G',
    type: 'individual',
    description: 'باقة ألعاب مخصصة بعناية للاعبين بحصة 60GB + 60GB ألعاب بسعر 60 د.ل شهرياً.',
    features: ['حصة 60GB أساسية + 60GB ألعاب', 'توجيه سيرفرات خاص لتحسين الـ Ping', 'سرعة غير محدودة'],
    price: '60 د.ل / شهرياً',
    quota: '60GB + 60GB ألعاب',
    speed: 'غير محدودة (Ping منخفض)',
    validity: '30 يوماً',
    status: 'active',
    sourceName: 'دليل باقات الأفراد LTT 2026',
    logoUrl: 'https://ltt.ly/_ipx/w_200/images/personal/4g/packages_logo/4gGamers.png',
  },
  {
    id: 'srv-4g-gamers-plus',
    name: 'باقة LTT4Gamers Plus (الألعاب بلس)',
    category: 'خدمات الجيل الرابع 4G',
    type: 'individual',
    description: 'باقة ألعاب متقدمة بحصة 300GB + 100GB ألعاب بسعر 135 د.ل شهرياً.',
    features: ['حصة 300GB أساسية + 100GB ألعاب', 'أولوية وسيرفرات ألعاب منخفضة التأخير Ping', 'سرعة غير محدودة'],
    price: '135 د.ل / شهرياً',
    quota: '300GB + 100GB ألعاب',
    speed: 'غير محدودة (Ping منخفض)',
    validity: '30 يوماً',
    status: 'active',
    sourceName: 'دليل باقات الأفراد LTT 2026',
    logoUrl: 'https://ltt.ly/_ipx/w_200/images/personal/4g/packages_logo/4gGamers.png',
  },
  {
    id: 'srv-4g-power',
    name: 'باقة Power',
    category: 'خدمات الجيل الرابع 4G',
    type: 'individual',
    description: 'باقة بيانات ضخمة بحصة 600GB وصلاحية 3 أشهر بسعر 260 د.ل (مناسبة للاستخدام العالي أو الصلاحية الطويلة).',
    features: ['حصة 600GB بيانات', 'صلاحية 3 أشهر (90 يوماً)', 'سرعة غير محدودة'],
    price: '260 د.ل / 3 أشهر',
    quota: '600GB / 3 أشهر',
    speed: 'غير محدودة',
    validity: '90 يوماً',
    status: 'active',
    sourceName: 'دليل باقات الأفراد LTT 2026',
    logoUrl: 'https://ltt.ly/_ipx/w_140/images/personal/4g/packages_logo/Power.png',
  },

  // ==========================================
  // --- خدمات Fixed VoLTE للأفراد (022) ---
  // ==========================================
  {
    id: 'srv-volte-ind-sub',
    name: 'الاشتراك المبدئي Fixed VoLTE للأفراد (022)',
    category: 'Fixed VoLTE للأفراد',
    type: 'individual',
    description: 'بديل الهاتف الأرضي الحديث يمنحك رقماً ثابتاً يبدأ بـ 022 + إنترنت منزلي ثابت في جهاز CPE.',
    features: [
      'رقم ثابت يبدأ بـ 022 مع مكالمات غير محدودة داخل 095 و022',
      'يشمل جهاز CPE + شريحة + باقة شهرية 15M + 100 دقيقة شبكات أخرى',
      'سعر الجمهور: 375 د.ل | سعر الوكيل المعتمد: 357.25 د.ل'
    ],
    price: '375 د.ل (مرة واحدة)',
    quota: 'غير محدود (الشهر الأول)',
    speed: '15 Mbps',
    validity: 'الشهر الأول مجاناً',
    requirements: ['تأكد التغطية في الموقع', 'إثبات الهوية'],
    status: 'active',
    sourceName: 'دليل باقات LTT المعتمد V2.6',
  },
  {
    id: 'srv-volte-ind-basic',
    name: 'باقة Fixed VoLTE Basic للأفراد',
    category: 'Fixed VoLTE للأفراد',
    type: 'individual',
    description: 'باقة تجديد أساسية للهاتف الثابت بسعر 10 د.ل شهرياً مع خصم الإنترنت حسب الاستهلاك.',
    features: ['تفعيل الخط والمكالمات المحلية', 'إنترنت بحسب الاستهلاك (2 د.ل / 1GB من الرصيد)', 'مكالمات مجانية داخل 095 و022'],
    price: '10 د.ل / شهرياً',
    quota: 'حسب الاستهلاك من الرصيد',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل باقات LTT المعتمد V2.6',
  },
  {
    id: 'srv-volte-ind-lite',
    name: 'باقة Fixed VoLTE Lite للأفراد',
    category: 'Fixed VoLTE للأفراد',
    type: 'individual',
    description: 'باقة إنترنت وصوت منزلية بسعر 80 د.ل شهرياً بسرعة 8 Mbps.',
    features: ['سرعة 8 Mbps غير محدود (FUP 6GB/يومياً ثم 2 Mbps)', '50 دقيقة مكالمات خارج الشبكة', 'مكالمات غير محدودة داخل 095 و022'],
    price: '80 د.ل / شهرياً',
    quota: 'غير محدود (استخدام عادل 6GB/يوم)',
    speed: '8 Mbps',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل باقات LTT المعتمد V2.6',
  },
  {
    id: 'srv-volte-ind-15m',
    name: 'باقة Fixed VoLTE 15M للأفراد',
    category: 'Fixed VoLTE للأفراد',
    type: 'individual',
    description: 'باقة إنترنت وصوت منزلية بسعر 130 د.ل شهرياً بسرعة 15 Mbps.',
    features: ['سرعة 15 Mbps غير محدود (FUP 8GB/يومياً ثم 5 Mbps)', '100 دقيقة مكالمات خارج الشبكة', 'مكالمات غير محدودة داخل 095 و022'],
    price: '130 د.ل / شهرياً',
    quota: 'غير محدود (استخدام عادل 8GB/يوم)',
    speed: '15 Mbps',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل باقات LTT المعتمد V2.6',
  },
  {
    id: 'srv-volte-ind-20m',
    name: 'باقة Fixed VoLTE 20M للأفراد (الأكثر طلباً)',
    category: 'Fixed VoLTE للأفراد',
    type: 'individual',
    description: 'الباقة الأكثر شعبية للمنازل بسعر 155 د.ل شهرياً بسرعة 20 Mbps.',
    features: ['سرعة 20 Mbps غير محدود (FUP 10GB/يومياً ثم 10 Mbps)', '120 دقيقة مكالمات خارج الشبكة', 'مكالمات غير محدودة داخل 095 و022'],
    price: '155 د.ل / شهرياً',
    quota: 'غير محدود (استخدام عادل 10GB/يوم)',
    speed: '20 Mbps',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل باقات LTT المعتمد V2.6',
  },
  {
    id: 'srv-volte-ind-unlimited',
    name: 'باقة Fixed VoLTE Unlimited للأفراد',
    category: 'Fixed VoLTE للأفراد',
    type: 'individual',
    description: 'أعلى باقة صوت وإنترنت منزلي بسعر 175 د.ل شهرياً شاملة اشتراك شاهد VIP.',
    features: ['سرعة غير محدودة (FUP 20GB/يومياً ثم 15 Mbps)', '150 دقيقة مكالمات خارج الشبكة', 'مكالمات مجانية داخل 095 و022', 'اشتراك شاهد VIP مجاناً'],
    price: '175 د.ل / شهرياً',
    quota: 'غير محدود (استخدام عادل 20GB/يوم)',
    speed: 'أقصى سرعة',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل باقات LTT المعتمد V2.6',
  },

  // ==========================================
  // --- خدمات FWA عريض النطاق للأفراد ---
  // ==========================================
  {
    id: 'srv-fwa-beiti-2w',
    name: 'FWA بيتي أسبوعين (8 Mbps)',
    category: 'خدمات FWA عريض النطاق',
    type: 'individual',
    description: 'إنترنت لاسلكي ثابت للمنازل بدون أسلاك هاتف بسرعات ثابتة.',
    features: ['سرعة 8 Mbps غير محدود', 'صلاحية أسبوعين (14 يوماً)'],
    price: '55 د.ل / أسبوعين',
    quota: 'غير محدود',
    speed: '8 Mbps',
    validity: '14 يوماً',
    status: 'active',
    sourceName: 'دليل باقات LTT المعتمد V2.6',
  },
  {
    id: 'srv-fwa-beiti-10m',
    name: 'FWA بيتي (10 Mbps)',
    category: 'خدمات FWA عريض النطاق',
    type: 'individual',
    description: 'إنترنت لاسلكي منزلي ثابت بسعر 100 د.ل شهرياً وسرعة 10 Mbps.',
    features: ['سرعة 10 Mbps غير محدود', 'صلاحية شهرية'],
    price: '100 د.ل / شهرياً',
    quota: 'غير محدود',
    speed: '10 Mbps',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل باقات LTT المعتمد V2.6',
  },
  {
    id: 'srv-fwa-beiti-12m',
    name: 'FWA+ بيتي (12 Mbps)',
    category: 'خدمات FWA عريض النطاق',
    type: 'individual',
    description: 'إنترنت لاسلكي منزلي ثابت بسعر 120 د.ل شهرياً وسرعة 12 Mbps.',
    features: ['سرعة 12 Mbps غير محدود', 'ثبات ممتاز بالاتصال'],
    price: '120 د.ل / شهرياً',
    quota: 'غير محدود',
    speed: '12 Mbps',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل باقات LTT المعتمد V2.6',
  },
  {
    id: 'srv-fwa-beiti-open',
    name: 'FWA++ بيتي (مفتوحة)',
    category: 'خدمات FWA عريض النطاق',
    type: 'individual',
    description: 'أعلى باقة FWA منزلية بسعر 150 د.ل شهرياً بأسلحة سرعة مفتوحة.',
    features: ['أقصى سرعة توفرها تغطية FWA بالمنطقة', 'سعة غير محدودة'],
    price: '150 د.ل / شهرياً',
    quota: 'غير محدود',
    speed: 'سرعة التغطية القصوى (30+ Mbps)',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل باقات LTT المعتمد V2.6',
  },

  // ==========================================
  // --- الألياف البصرية FTTH للأفراد ---
  // ==========================================
  {
    id: 'srv-ftth-install-fee',
    name: 'رسوم تركيب وتأسيس FTTH فايبر',
    category: 'الألياف البصرية Fiber',
    type: 'individual',
    description: 'رسوم حفر وتوصيل كابل الألياف الضوئية المباشرة للمنزل وتوفير جهاز ONT.',
    features: ['تأسيس خط الفايبر وتوصيل الألياف للمنزل', 'تدفع مرة واحدة عند الاشتراك'],
    price: '720 د.ل (مرة واحدة)',
    validity: 'تأسيس',
    requirements: ['توفر تغطية مقسم الفايبر بالمحلة'],
    status: 'active',
    sourceName: 'دليل باقات LTT المعتمد V2.6',
  },
  {
    id: 'srv-ftth-drive150',
    name: 'فايبر Drive 150',
    category: 'الألياف البصرية Fiber',
    type: 'individual',
    description: 'باقة فايبر منزلي اقتصادية بسعة 150GB وسرعة 8 Mbps.',
    features: ['150GB بيانات', 'سرعة 8 Mbps استقرار عالي جداً'],
    price: '60 د.ل / شهرياً',
    quota: '150GB',
    speed: '8 Mbps',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل باقات LTT المعتمد V2.6',
  },
  {
    id: 'srv-ftth-20m',
    name: 'بيتي فايبر 20 Mbps',
    category: 'الألياف البصرية Fiber',
    type: 'individual',
    description: 'باقة فايبر منزلي غير محدودة بسرعة 20 Mbps وسعر 95 د.ل شهرياً.',
    features: ['سرعة 20 Mbps غير محدود', 'أدنى زمن تأخير للجيل الفايبر'],
    price: '95 د.ل / شهرياً',
    quota: 'غير محدود',
    speed: '20 Mbps',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل باقات LTT المعتمد V2.6',
  },
  {
    id: 'srv-ftth-30m',
    name: 'بيتي فايبر+ 30 Mbps',
    category: 'الألياف البصرية Fiber',
    type: 'individual',
    description: 'باقة فايبر منزلي غير محدودة بسرعة 30 Mbps وسعر 170 د.ل شهرياً.',
    features: ['سرعة 30 Mbps غير محدود', 'مثالية للبث المباشر بدقة 4K والتحميل'],
    price: '170 د.ل / شهرياً',
    quota: 'غير محدود',
    speed: '30 Mbps',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل باقات LTT المعتمد V2.6',
  },
  {
    id: 'srv-ftth-100m',
    name: 'بيتي فايبر++ 100 Mbps',
    category: 'الألياف البصرية Fiber',
    type: 'individual',
    description: 'أعلى سرعة فايبر منزلي في ليبيا 100 Mbps غير محدود بسعر 260 د.ل شهرياً.',
    features: ['سرعة 100 Mbps غير محدود', 'تجربة إنترنت فائقة لا تقارن'],
    price: '260 د.ل / شهرياً',
    quota: 'غير محدود',
    speed: '100 Mbps',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل باقات LTT المعتمد V2.6',
  },

  // ==========================================
  // --- خدمات ADSL / VDSL للأفراد ---
  // ==========================================
  {
    id: 'srv-adsl-wajed-20',
    name: 'باقة واجد 20 (ADSL)',
    category: 'خدمات الهاتف الثابت ADSL',
    type: 'individual',
    description: 'باقة إنترنت عبر خط الهاتف الأرضي بسعة 20GB بسعر 20 د.ل.',
    features: ['20GB بيانات', 'صلاحية شهرية'],
    price: '20 د.ل / شهرياً',
    quota: '20GB',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل باقات LTT المعتمد V2.6',
  },
  {
    id: 'srv-adsl-wajed-30',
    name: 'باقة واجد 30 (ADSL)',
    category: 'خدمات الهاتف الثابت ADSL',
    type: 'individual',
    description: 'باقة إنترنت عبر خط الهاتف الأرضي بسعة 30GB بسعر 25 د.ل.',
    features: ['30GB بيانات', 'صلاحية شهرية'],
    price: '25 د.ل / شهرياً',
    quota: '30GB',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل باقات LTT المعتمد V2.6',
  },
  {
    id: 'srv-adsl-wajed-70',
    name: 'باقة واجد 70 (ADSL)',
    category: 'خدمات الهاتف الثابت ADSL',
    type: 'individual',
    description: 'باقة إنترنت عبر خط الهاتف الأرضي بسعة 70GB بسعر 40 د.ل.',
    features: ['70GB بيانات', 'صلاحية شهرية'],
    price: '40 د.ل / شهرياً',
    quota: '70GB',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل باقات LTT المعتمد V2.6',
  },
  {
    id: 'srv-adsl-drive-150',
    name: 'باقة درايف 150 (ADSL)',
    category: 'خدمات الهاتف الثابت ADSL',
    type: 'individual',
    description: 'باقة إنترنت عبر الهاتف الأرضي بسعة 150GB وسرعة 8 Mbps بسعر 65 د.ل.',
    features: ['150GB بيانات', 'سرعة تصل إلى 8 Mbps'],
    price: '65 د.ل / شهرياً',
    quota: '150GB',
    speed: '8 Mbps',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل باقات LTT المعتمد V2.6',
  },
  {
    id: 'srv-adsl-beiti-2m',
    name: 'بيتي ADSL (2 Mbps)',
    category: 'خدمات الهاتف الثابت ADSL',
    type: 'individual',
    description: 'إنترنت ثابت غير محدود بسرعة 2 Mbps بسعر 45 د.ل شهرياً.',
    features: ['سرعة 2 Mbps غير محدود'],
    price: '45 د.ل / شهرياً',
    quota: 'غير محدود',
    speed: '2 Mbps',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل باقات LTT المعتمد V2.6',
  },
  {
    id: 'srv-adsl-beiti-4m',
    name: 'بيتي ADSL (4 Mbps)',
    category: 'خدمات الهاتف الثابت ADSL',
    type: 'individual',
    description: 'إنترنت ثابت غير محدود بسرعة 4 Mbps بسعر 75 د.ل شهرياً.',
    features: ['سرعة 4 Mbps غير محدود'],
    price: '75 د.ل / شهرياً',
    quota: 'غير محدود',
    speed: '4 Mbps',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل باقات LTT المعتمد V2.6',
  },
  {
    id: 'srv-adsl-beiti-8m',
    name: 'بيتي ADSL (8 Mbps)',
    category: 'خدمات الهاتف الثابت ADSL',
    type: 'individual',
    description: 'إنترنت ثابت غير محدود بسرعة 8 Mbps بسعر 95 د.ل شهرياً.',
    features: ['سرعة 8 Mbps غير محدود'],
    price: '95 د.ل / شهرياً',
    quota: 'غير محدود',
    speed: '8 Mbps',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل باقات LTT المعتمد V2.6',
  },
  {
    id: 'srv-vdsl-beiti-20m',
    name: 'بيتي VDSL (20 Mbps)',
    category: 'خدمات الهاتف الثابت VDSL',
    type: 'individual',
    description: 'إنترنت عالي السرعة عبر النحاس المتطور VDSL بسرعة 20 Mbps بسعر 120 د.ل.',
    features: ['سرعة 20 Mbps غير محدود'],
    price: '120 د.ل / شهرياً',
    quota: 'غير محدود',
    speed: '20 Mbps',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل باقات LTT المعتمد V2.6',
  },
  {
    id: 'srv-vdsl-beiti-50m',
    name: 'بيتي VDSL (50 Mbps)',
    category: 'خدمات الهاتف الثابت VDSL',
    type: 'individual',
    description: 'إنترنت عالي السرعة عبر VDSL بسرعة 50 Mbps بسعر 200 د.ل شهرياً.',
    features: ['سرعة 50 Mbps غير محدود'],
    price: '200 د.ل / شهرياً',
    quota: 'غير محدود',
    speed: '50 Mbps',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل باقات LTT المعتمد V2.6',
  },
  {
    id: 'srv-vdsl-beiti-70m',
    name: 'بيتي VDSL (70 Mbps)',
    category: 'خدمات الهاتف الثابت VDSL',
    type: 'individual',
    description: 'أعلى سرعة VDSL للمنازل 70 Mbps غير محدود بسعر 260 د.ل شهرياً.',
    features: ['سرعة 70 Mbps غير محدود'],
    price: '260 د.ل / شهرياً',
    quota: 'غير محدود',
    speed: '70 Mbps',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل باقات LTT المعتمد V2.6',
  },

  // ==========================================
  // --- خدمات الشريحة الإلكترونية eSIM للأفراد ---
  // ==========================================
  {
    id: 'srv-esim-ind-sub',
    name: 'اشتراك مبدئي eSIM للأفراد',
    category: 'خدمات eSIM والشرائح',
    type: 'individual',
    description: 'تفعيل شريحة إلكترونية eSIM جديدة للأفراد بدون حاجة لشريحة بلاستيكية.',
    features: [
      'سعر الجمهور: 15 د.ل',
      'سعر الوكيل المعتمد: 13.5 د.ل',
      'تفعيل فوري عبر رمز QR Code'
    ],
    price: '15 د.ل للجمهور | 13.5 د.ل للوكيل',
    validity: 'دائم',
    status: 'active',
    sourceName: 'دليل باقات LTT المعتمد V2.6',
  },
  {
    id: 'srv-esim-ind-convert',
    name: 'تحويل SIM فعلية إلى eSIM (الأفراد)',
    category: 'خدمات eSIM والشرائح',
    type: 'individual',
    description: 'تحويل الشريحة التقليدية العادية إلى شريحة إلكترونية eSIM بنفس الرقم.',
    features: ['سعر الجمهور: 10 د.ل', 'سعر الوكيل المعتمد: 9.0 د.ل'],
    price: '10 د.ل للجمهور | 9.0 د.ل للوكيل',
    validity: 'دائم',
    status: 'active',
    sourceName: 'دليل باقات LTT المعتمد V2.6',
  },
  {
    id: 'srv-esim-ind-reissue',
    name: 'إعادة إصدار أو نقل eSIM لجهاز جديد',
    category: 'خدمات eSIM والشرائح',
    type: 'individual',
    description: 'إعادة إستخراج رمز QR للشريحة الإلكترونية أو نقلها لهاتف جديد.',
    features: ['سعر الجمهور: 10 د.ل', 'سعر الوكيل المعتمد: 9.0 د.ل'],
    price: '10 د.ل للجمهور | 9.0 د.ل للوكيل',
    validity: 'دائم',
    status: 'active',
    sourceName: 'دليل باقات LTT المعتمد V2.6',
  },
  {
    id: 'srv-esim-ind-to-sim',
    name: 'تحويل eSIM إلى SIM فعلية',
    category: 'خدمات eSIM والشرائح',
    type: 'individual',
    description: 'استبدال الشريحة الإلكترونية بشريحة بلاستيكية تقليدية.',
    features: ['سعر الجمهور: 5 د.ل', 'سعر الوكيل المعتمد: 4.5 د.ل'],
    price: '5 د.ل للجمهور | 4.5 د.ل للوكيل',
    validity: 'دائم',
    status: 'active',
    sourceName: 'دليل باقات LTT المعتمد V2.6',
  },

  // ==========================================
  // --- خدمات ليبيافون (Lybiaphone) للأفراد ---
  // ==========================================
  {
    id: 'srv-lybiaphone-new',
    name: 'اشتراك جديد ليبيافون (Lybiaphone)',
    category: 'خدمات ليبيافون',
    type: 'individual',
    description: 'شريحة ليبيافون للاتصال الهاتفي والبيانات عبر شبكات الهاتف المحمول.',
    features: [
      'يشمل الشريحة + 50 د.ل رصيد مبدئي',
      'سعر الجمهور: 60 د.ل',
      'سعر الوكيل المعتمد: 53.5 د.ل (إجمالي)'
    ],
    price: '60 د.ل للجمهور | 53.5 د.ل للوكيل',
    quota: 'تتضمن 50 د.ل رصيد',
    validity: 'دائم',
    status: 'active',
    sourceName: 'دليل باقات LTT المعتمد V2.6',
  },
  {
    id: 'srv-lybiaphone-replace',
    name: 'بدل فاقد شريحة ليبيافون',
    category: 'خدمات ليبيافون',
    type: 'individual',
    description: 'إصدار شريحة بدل فاقد لخطوط ليبيافون.',
    features: ['سعر الجمهور: 10 د.ل', 'سعر الوكيل المعتمد: 7.0 د.ل'],
    price: '10 د.ل للجمهور | 7.0 د.ل للوكيل',
    validity: 'دائم',
    status: 'active',
    sourceName: 'دليل باقات LTT المعتمد V2.6',
  },

  // --- 1. SCPC (1) ---
  {
    id: 'srv-scpc-bandwidth',
    name: 'عرض النطاق الترددي SCPC (Bandwidth per MHz)',
    category: 'SCPC',
    type: 'business',
    description: 'سعة وقناة اتصالات مخصصة عبر الأقمار الصناعية بنظام SCPC للشركات والمؤسسات.',
    features: ['قناة اتصالات مخصصة غير مشاركة', 'ربط شبكي فضائي مباشر 1:1', 'دعم استمرارية الأعمال والمواقع النائية'],
    price: '18,000 د.ل / سنوياً',
    quota: 'حسب السعة الترددية (MHz)',
    speed: 'مخصصة 1:1',
    validity: 'سنوي',
    requirements: ['ترخيص الاتصالات الفضائية', 'موافقات هيئة الاتصالات'],
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },

  // --- 2. SD-WAN (1) ---
  {
    id: 'srv-sdwan-license',
    name: 'ترخيص الشبكات المحددة برمجياً SD-WAN',
    category: 'SD-WAN',
    type: 'business',
    description: 'ترخيص إدارة وتوجيه الحركة البرمجية الذكية للشبكات الموزعة والفروع.',
    features: ['إدارة حركة البيانات برمجياً', 'توجيه حركة المرور وتجميع المسارات', 'تأمين الاتصالات بين الفروع'],
    price: '2,500 د.ل / سنوياً',
    quota: 'غير محدد',
    speed: 'حسب سرعة الربط',
    validity: 'سنوي',
    requirements: ['بنية شبكية للفروع'],
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },

  // --- 3. Static IP (6) ---
  {
    id: 'srv-static-ip-30',
    name: 'عنوان IP ثابت (/30 - 2 IPs usable)',
    category: 'العناوين الثابتة Static IP',
    type: 'business',
    description: 'نطاق عناوين IP ثابتة بدرجة /30 يوفر عنوانين قابلين للاستخدام المباشر.',
    features: ['2 عناوين IP عامة قابلة للاستخدام', 'مناسب للسيرفرات الصغيرة والكاميرات'],
    price: '250 د.ل / سنوياً',
    quota: '2 Usable IPs',
    validity: 'سنوي',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-static-ip-29',
    name: 'عنوان IP ثابت (/29 - 6 IPs usable)',
    category: 'العناوين الثابتة Static IP',
    type: 'business',
    description: 'نطاق عناوين IP ثابتة بدرجة /29 يوفر 6 عناوين قابلة للاستخدام.',
    features: ['6 عناوين IP عامة قابلة للاستخدام', 'دعم الربط الشبكي والخوادم متعددة الخدمات'],
    price: '500 د.ل / سنوياً',
    quota: '6 Usable IPs',
    validity: 'سنوي',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-static-ip-28',
    name: 'عنوان IP ثابت (/28 - 14 IPs usable)',
    category: 'العناوين الثابتة Static IP',
    type: 'business',
    description: 'نطاق عناوين IP ثابتة بدرجة /28 يوفر 14 عنواناً قابلاً للاستخدام.',
    features: ['14 عنوان IP عام قابل للاستخدام', 'مناسب للشركات المتوسطة ومراكز البيانات الصغيرة'],
    price: '1,000 د.ل / سنوياً',
    quota: '14 Usable IPs',
    validity: 'سنوي',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-static-ip-27',
    name: 'عنوان IP ثابت (/27 - 30 IPs usable)',
    category: 'العناوين الثابتة Static IP',
    type: 'business',
    description: 'نطاق عناوين IP ثابتة بدرجة /27 يوفر 30 عنواناً قابلاً للاستخدام.',
    features: ['30 عنوان IP عام قابل للاستخدام', 'تلبية متطلبات الشبكات الموسعة برمجياً'],
    price: '2,000 د.ل / سنوياً',
    quota: '30 Usable IPs',
    validity: 'سنوي',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-static-ip-26',
    name: 'عنوان IP ثابت (/26 - 62 IPs usable)',
    category: 'العناوين الثابتة Static IP',
    type: 'business',
    description: 'نطاق عناوين IP ثابتة بدرجة /26 يوفر 62 عنواناً قابلاً للاستخدام.',
    features: ['62 عنوان IP عام قابل للاستخدام', 'مخصص للمؤسسات ذات البنية التحتية الكبيرة'],
    price: '4,000 د.ل / سنوياً',
    quota: '62 Usable IPs',
    validity: 'سنوي',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-static-ip-25',
    name: 'عنوان IP ثابت (/25 - 126 IPs usable)',
    category: 'العناوين الثابتة Static IP',
    type: 'business',
    description: 'نطاق عناوين IP ثابتة بدرجة /25 يوفر 126 عنواناً قابلاً للاستخدام.',
    features: ['126 عنوان IP عام قابل للاستخدام', 'مخصص للشركات المزودة ومراكز البيانات الكبرى'],
    price: '8,000 د.ل / سنوياً',
    quota: '126 Usable IPs',
    validity: 'سنوي',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },

  // --- 4. VAPN Lite (3) ---
  {
    id: 'srv-vapn-lite-50',
    name: 'شبكة خاصة افتراضية VAPN Lite 50',
    category: 'VAPN Lite',
    type: 'business',
    description: 'ربط أجهزة الصراف الآلي والأنظمة المحمولة عبر شريحة APN آمنة مع حصة 50GB.',
    features: ['نفق شبكي مشفر وخاص بالشركة', 'حصة بيانات 50GB شهرياً', 'ربط نقاط البيع والـ ATM'],
    price: '500 د.ل / شهرياً',
    quota: '50GB',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-vapn-lite-100',
    name: 'شبكة خاصة افتراضية VAPN Lite 100',
    category: 'VAPN Lite',
    type: 'business',
    description: 'ربط شبكي آمن للأعمال عبر شريحة APN بحصة 100GB.',
    features: ['ربط شبكي آمن ومغلق', 'حصة بيانات 100GB شهرياً', 'إدارة مركزية للشرائح'],
    price: '900 د.ل / شهرياً',
    quota: '100GB',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-vapn-lite-200',
    name: 'شبكة خاصة افتراضية VAPN Lite 200',
    category: 'VAPN Lite',
    type: 'business',
    description: 'ربط شبكي آمن للأعمال عبر شريحة APN بحصة 200GB.',
    features: ['ربط شبكي آمن ومغلق', 'حصة بيانات 200GB شهرياً', 'دعم الفروع الموزعة'],
    price: '1,600 د.ل / شهرياً',
    quota: '200GB',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },

  // --- 5. VAPN Ultra (3) ---
  {
    id: 'srv-vapn-ultra-100',
    name: 'شبكة خاصة افتراضية عالية الأداء VAPN Ultra 100',
    category: 'VAPN Ultra',
    type: 'business',
    description: 'ربط شبكي فائق الأمان والسرعة للأنظمة الحساسة والمصرفية بحصة 100GB.',
    features: ['أولوية مرور وحزم بيانات عالية', 'حصة 100GB شهرياً', 'نظام أمان متقدم مع IP مخصص'],
    price: '1,200 د.ل / شهرياً',
    quota: '100GB',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-vapn-ultra-300',
    name: 'شبكة خاصة افتراضية عالية الأداء VAPN Ultra 300',
    category: 'VAPN Ultra',
    type: 'business',
    description: 'ربط شبكي فائق الأمان والسرعة للأنظمة الحساسة بحصة 300GB.',
    features: ['أولوية مرور وحزم بيانات عالية', 'حصة 300GB شهرياً', 'مناسب للمؤسسات الكبيرة والمصارف'],
    price: '3,000 د.ل / شهرياً',
    quota: '300GB',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-vapn-ultra-500',
    name: 'شبكة خاصة افتراضية عالية الأداء VAPN Ultra 500',
    category: 'VAPN Ultra',
    type: 'business',
    description: 'ربط شبكي فائق الأمان والسرعة للأنظمة الحساسة بحصة 500GB.',
    features: ['أعلى مستوى من أولوية البيانات', 'حصة 500GB شهرياً', 'حل متكامل للقطاعات الحيوية'],
    price: '4,500 د.ل / شهرياً',
    quota: '500GB',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },

  // --- 6. VPS (6) ---
  {
    id: 'srv-vps-bronze-1',
    name: 'خادم افتراضي VPS Bronze (1 vCPU / 2GB RAM / 50GB SSD)',
    category: 'الخوادم الافتراضية VPS',
    type: 'business',
    description: 'سيرفر افتراضي بموارد محددة مناسب للتطبيقات والمواقع الصغيرة.',
    features: ['1 vCPU', '2GB RAM', '50GB SSD Storage', 'عنوان IP عام مخصص'],
    price: '150 د.ل / شهرياً',
    quota: '50GB SSD',
    speed: '1 vCPU / 2GB RAM',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-vps-bronze-2',
    name: 'خادم افتراضي VPS Bronze (2 vCPU / 4GB RAM / 100GB SSD)',
    category: 'الخوادم الافتراضية VPS',
    type: 'business',
    description: 'سيرفر افتراضي بموارد متوسطة مناسب للأنظمة البرمجية ومواقع الشركات.',
    features: ['2 vCPU', '4GB RAM', '100GB SSD Storage', 'عنوان IP عام مخصص'],
    price: '280 د.ل / شهرياً',
    quota: '100GB SSD',
    speed: '2 vCPU / 4GB RAM',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-vps-silver-4',
    name: 'خادم افتراضي VPS Silver (4 vCPU / 8GB RAM / 200GB SSD)',
    category: 'الخوادم الافتراضية VPS',
    type: 'business',
    description: 'سيرفر افتراضي فئة فضية لموارد تشغيلية أعلى للأنظمة الإدارية.',
    features: ['4 vCPU', '8GB RAM', '200GB SSD Storage', 'عنوان IP عام مخصص'],
    price: '520 د.ل / شهرياً',
    quota: '200GB SSD',
    speed: '4 vCPU / 8GB RAM',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-vps-silver-8',
    name: 'خادم افتراضي VPS Silver (8 vCPU / 16GB RAM / 400GB SSD)',
    category: 'الخوادم الافتراضية VPS',
    type: 'business',
    description: 'سيرفر افتراضي متقدم للتطبيقات وقواعد البيانات الكبيرة.',
    features: ['8 vCPU', '16GB RAM', '400GB SSD Storage', 'عنوان IP عام مخصص'],
    price: '980 د.ل / شهرياً',
    quota: '400GB SSD',
    speed: '8 vCPU / 16GB RAM',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-vps-gold-12',
    name: 'خادم افتراضي VPS Gold (12 vCPU / 32GB RAM / 600GB SSD)',
    category: 'الخوادم الافتراضية VPS',
    type: 'business',
    description: 'سيرفر افتراضي فئة ذهبية لقدرات معالجة فائقة وقواعد بيانات ضخمة.',
    features: ['12 vCPU', '32GB RAM', '600GB SSD Storage', 'عنوان IP عام مخصص'],
    price: '1,800 د.ل / شهرياً',
    quota: '600GB SSD',
    speed: '12 vCPU / 32GB RAM',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-vps-gold-16',
    name: 'خادم افتراضي VPS Gold (16 vCPU / 64GB RAM / 1TB SSD)',
    category: 'الخوادم الافتراضية VPS',
    type: 'business',
    description: 'أعلى فئة خوادم افتراضية للمؤسسات والمنظومات الضخمة.',
    features: ['16 vCPU', '64GB RAM', '1TB SSD Storage', 'عنوان IP عام مخصص'],
    price: '3,200 د.ل / شهرياً',
    quota: '1TB SSD',
    speed: '16 vCPU / 64GB RAM',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },

  // --- 7. iDirect (14) ---
  {
    id: 'srv-idirect-cons-1m',
    name: 'iDirect Consumer 1M/256K',
    category: 'اتصالات الفضاء iDirect',
    type: 'individual',
    description: 'إنترنت فضائي للأفراد في المناطق النائية بسرعات الأساسية.',
    features: ['تغطية فضائية شاملة لكافة المناطق', 'سرعة 1 Mbps / 256 Kbps'],
    price: '150 د.ل / شهرياً',
    speed: '1 Mbps / 256 Kbps',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-idirect-cons-2m',
    name: 'iDirect Consumer 2M/512K',
    category: 'اتصالات الفضاء iDirect',
    type: 'individual',
    description: 'إنترنت فضائي للأفراد بسرعات متوسطة للمناطق الصحراوية والبعيدة.',
    features: ['تغطية فضائية لكافة ربوع ليبيا', 'سرعة 2 Mbps / 512 Kbps'],
    price: '280 د.ل / شهرياً',
    speed: '2 Mbps / 512 Kbps',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-idirect-cons-4m',
    name: 'iDirect Consumer 4M/1M',
    category: 'اتصالات الفضاء iDirect',
    type: 'individual',
    description: 'إنترنت فضائي للأفراد بسرعات عالية للاستخدامات السكنية البعيدة.',
    features: ['تغطية فضائية مستقرة', 'سرعة 4 Mbps / 1 Mbps'],
    price: '500 د.ل / شهرياً',
    speed: '4 Mbps / 1 Mbps',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-idirect-biz-2m',
    name: 'iDirect Business 2M/512K (CIR 1:4)',
    category: 'اتصالات الفضاء iDirect',
    type: 'business',
    description: 'إنترنت فضائي مخصص للأعمال والشركات مع معدل تجميع 1:4.',
    features: ['معدل تجميع 1:4 مخصص للأعمال', 'سرعة 2 Mbps / 512 Kbps'],
    price: '800 د.ل / شهرياً',
    speed: '2 Mbps / 512 Kbps (CIR 1:4)',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-idirect-biz-4m',
    name: 'iDirect Business 4M/1M (CIR 1:4)',
    category: 'اتصالات الفضاء iDirect',
    type: 'business',
    description: 'إنترنت فضائي مخصص للمكاتب والشركات بمواقع النفط والحقول.',
    features: ['معدل تجميع 1:4 مخصص للأعمال', 'سرعة 4 Mbps / 1 Mbps'],
    price: '1,500 د.ل / شهرياً',
    speed: '4 Mbps / 1 Mbps (CIR 1:4)',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-idirect-biz-8m',
    name: 'iDirect Business 8M/2M (CIR 1:4)',
    category: 'اتصالات الفضاء iDirect',
    type: 'business',
    description: 'إنترنت فضائي عالي السرعة للشركات في المناطق النائية.',
    features: ['معدل تجميع 1:4 مخصص للأعمال', 'سرعة 8 Mbps / 2 Mbps'],
    price: '2,800 د.ل / شهرياً',
    speed: '8 Mbps / 2 Mbps (CIR 1:4)',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-idirect-biz-10m',
    name: 'iDirect Business 10M/3M (CIR 1:4)',
    category: 'اتصالات الفضاء iDirect',
    type: 'business',
    description: 'أعلى سرعات iDirect فئة Business لتشغيل مشاريع الحقول والمواقع البعيدة.',
    features: ['معدل تجميع 1:4 مخصص للأعمال', 'سرعة 10 Mbps / 3 Mbps'],
    price: '3,500 د.ل / شهرياً',
    speed: '10 Mbps / 3 Mbps (CIR 1:4)',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-idirect-ent-2m',
    name: 'iDirect Enterprise 2M/1M (CIR 1:1 مخصص)',
    category: 'اتصالات الفضاء iDirect',
    type: 'business',
    description: 'ربط فضائي مخصص 1:1 دون أي مشاركة للمؤسسات والشركات الكبرى.',
    features: ['معدل تخصيص نقي 1:1 (CIR 1:1)', 'سرعة 2 Mbps / 1 Mbps مخصصة بالكامل'],
    price: '2,500 د.ل / شهرياً',
    speed: '2 Mbps / 1 Mbps (CIR 1:1)',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-idirect-ent-4m',
    name: 'iDirect Enterprise 4M/2M (CIR 1:1 مخصص)',
    category: 'اتصالات الفضاء iDirect',
    type: 'business',
    description: 'ربط فضائي مخصص 1:1 للقطاعات النفطية والحيوية.',
    features: ['معدل تخصيص نقي 1:1 (CIR 1:1)', 'سرعة 4 Mbps / 2 Mbps مخصصة بالكامل'],
    price: '4,800 د.ل / شهرياً',
    speed: '4 Mbps / 2 Mbps (CIR 1:1)',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-idirect-ent-8m',
    name: 'iDirect Enterprise 8M/4M (CIR 1:1 مخصص)',
    category: 'اتصالات الفضاء iDirect',
    type: 'business',
    description: 'ربط فضائي مخصص 1:1 عالي السعة للمؤسسات السيادية والشركات الكبرى.',
    features: ['معدل تخصيص نقي 1:1 (CIR 1:1)', 'سرعة 8 Mbps / 4 Mbps مخصصة بالكامل'],
    price: '9,000 د.ل / شهرياً',
    speed: '8 Mbps / 4 Mbps (CIR 1:1)',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-idirect-ent-10m',
    name: 'iDirect Enterprise 10M/5M (CIR 1:1 مخصص)',
    category: 'اتصالات الفضاء iDirect',
    type: 'business',
    description: 'أعلى باقة ربط فضائي مخصص 1:1 للأنظمة الحساسة والحقول.',
    features: ['معدل تخصيص نقي 1:1 (CIR 1:1)', 'سرعة 10 Mbps / 5 Mbps مخصصة بالكامل'],
    price: '11,500 د.ل / شهرياً',
    speed: '10 Mbps / 5 Mbps (CIR 1:1)',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-idirect-quota-10gb',
    name: 'باقة حصة iDirect سعة 10GB',
    category: 'اتصالات الفضاء iDirect',
    type: 'business',
    description: 'باقة تعبئة إضافية لحجم البيانات فضائياً بسعة 10GB.',
    features: ['حصة إضافية 10GB', 'صلاحية شهرية'],
    price: '100 د.ل / شهرياً',
    quota: '10GB',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-idirect-quota-30gb',
    name: 'باقة حصة iDirect سعة 30GB',
    category: 'اتصالات الفضاء iDirect',
    type: 'business',
    description: 'باقة تعبئة إضافية لحجم البيانات فضائياً بسعة 30GB.',
    features: ['حصة إضافية 30GB', 'صلاحية شهرية'],
    price: '250 د.ل / شهرياً',
    quota: '30GB',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-idirect-quota-50gb',
    name: 'باقة حصة iDirect سعة 50GB',
    category: 'اتصالات الفضاء iDirect',
    type: 'business',
    description: 'باقة تعبئة إضافية لحجم البيانات فضائياً بسعة 50GB.',
    features: ['حصة إضافية 50GB', 'صلاحية شهرية'],
    price: '400 د.ل / شهرياً',
    quota: '50GB',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },

  // --- 8. إضافات VPS (4) ---
  {
    id: 'srv-vps-extra-vcpu',
    name: 'إضافة VPS: وحدة معالجة 1 vCPU',
    category: 'إضافات VPS',
    type: 'business',
    description: 'إضافة وحدة معالجة مركزية افتراضية إضافية لخوادم VPS.',
    features: ['1 vCPU إضافي'],
    price: '30 د.ل / شهرياً',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-vps-extra-ram',
    name: 'إضافة VPS: ذاكرة عشوائية 1GB RAM',
    category: 'إضافات VPS',
    type: 'business',
    description: 'إضافة 1GB رام لخوادم VPS المفعالة.',
    features: ['1GB RAM إضافي'],
    price: '20 د.ل / شهرياً',
    quota: '1GB RAM',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-vps-extra-ssd',
    name: 'إضافة VPS: مساحة تخزين 10GB SSD',
    category: 'إضافات VPS',
    type: 'business',
    description: 'إضافة مساحة تخزين سريعة 10GB SSD لخوادم VPS.',
    features: ['10GB SSD إضافي'],
    price: '15 د.ل / شهرياً',
    quota: '10GB SSD',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-vps-extra-ip',
    name: 'إضافة VPS: عنوان IP عام مخصص',
    category: 'إضافات VPS',
    type: 'business',
    description: 'إضافة عنوان IP عام إضافي لخادم VPS.',
    features: ['1 Public IP إضافي'],
    price: '25 د.ل / شهرياً',
    quota: '1 Public IP',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },

  // --- 9. اتصالات الفضاء - معدات (6) ---
  {
    id: 'srv-vsat-antenna-12',
    name: 'هوائي VSAT أوفست قياس 1.2 متر',
    category: 'معدات اتصالات الفضاء',
    type: 'business',
    description: 'طبق استقبال وإرسال فضائي قياس 1.2M عالي الجودة للربط الفضائي.',
    features: ['طبق فضائي 1.2M', 'مقاوم للعوامل الجوية الصعبة'],
    price: '3,500 د.ل (مرة واحدة)',
    validity: 'تأسيس / شراء',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-vsat-buc-3w',
    name: 'وحدة إرسال فضائية VSAT BUC 3W',
    category: 'معدات اتصالات الفضاء',
    type: 'business',
    description: 'وحدة إرسال BUC بقدرة 3 واط للطرفيات الفضائية.',
    features: ['قدرة 3 Watt', 'كفاءة إرسال عالية'],
    price: '2,200 د.ل (مرة واحدة)',
    validity: 'تأسيس / شراء',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-vsat-buc-6w',
    name: 'وحدة إرسال فضائية VSAT BUC 6W',
    category: 'معدات اتصالات الفضاء',
    type: 'business',
    description: 'وحدة إرسال BUC بقدرة 6 واط للتطبيقات الفضائية المتقدمة.',
    features: ['قدرة 6 Watt', 'مناسب للمواقع البعيدة ذات الظروف المجهدة'],
    price: '4,100 د.ل (مرة واحدة)',
    validity: 'تأسيس / شراء',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-vsat-lnb',
    name: 'وحدة استقبال فضائية VSAT LNB',
    category: 'معدات اتصالات الفضاء',
    type: 'business',
    description: 'وحدة استقبال LNB للإشارات الفضائية عالي الحساسية.',
    features: ['وحدة LNB فضائية'],
    price: '450 د.ل (مرة واحدة)',
    validity: 'تأسيس / شراء',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-vsat-modem-x1',
    name: 'مودم فضائي iDirect Modem X1',
    category: 'معدات اتصالات الفضاء',
    type: 'business',
    description: 'جهاز مودم استقبال فضائي سلسلة X1 من iDirect.',
    features: ['مودم iDirect X1 المعتمد'],
    price: '2,800 د.ل (مرة واحدة)',
    validity: 'تأسيس / شراء',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-vsat-modem-iq200',
    name: 'مودم فضائي iDirect Modem IQ200',
    category: 'معدات اتصالات الفضاء',
    type: 'business',
    description: 'جهاز مودم فضائي جيل حديث IQ200 لعاليات النطاق والسرعات العالية.',
    features: ['مودم iDirect IQ200 حديث'],
    price: '4,500 د.ل (مرة واحدة)',
    validity: 'تأسيس / شراء',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },

  // --- 10. الإنترنت المخصص Dedicated Internet (9) ---
  {
    id: 'srv-ded-int-2m',
    name: 'إنترنت مخصص Dedicated Internet 2 Mbps (CIR 1:1)',
    category: 'الإنترنت المخصص Dedicated Internet',
    type: 'business',
    description: 'ربط إنترنت مخصص 1:1 نقي بدون مشاركة بسرعة 2 Mbps.',
    features: ['CIR 1:1 مخصص بالكامل', 'سرعة 2 Mbps متماثلة (رفع وتنزيل)', 'اتفاقية مستوى الخدمة SLA 99.9%'],
    price: '1,200 د.ل / شهرياً',
    speed: '2 Mbps (1:1)',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-ded-int-5m',
    name: 'إنترنت مخصص Dedicated Internet 5 Mbps (CIR 1:1)',
    category: 'الإنترنت المخصص Dedicated Internet',
    type: 'business',
    description: 'ربط إنترنت مخصص 1:1 للشركات والمؤسسات بسرعات متماثلة.',
    features: ['CIR 1:1 مخصص بالكامل', 'سرعة 5 Mbps متماثلة', 'SLA 99.9%'],
    price: '2,800 د.ل / شهرياً',
    speed: '5 Mbps (1:1)',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-ded-int-10m',
    name: 'إنترنت مخصص Dedicated Internet 10 Mbps (CIR 1:1)',
    category: 'الإنترنت المخصص Dedicated Internet',
    type: 'business',
    description: 'ربط إنترنت مخصص 1:1 عالي الاستقرار بسعة 10 Mbps.',
    features: ['CIR 1:1 مخصص بالكامل', 'سرعة 10 Mbps متماثلة', 'دعم فني مخصص 24/7'],
    price: '5,200 د.ل / شهرياً',
    speed: '10 Mbps (1:1)',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-ded-int-20m',
    name: 'إنترنت مخصص Dedicated Internet 20 Mbps (CIR 1:1)',
    category: 'الإنترنت المخصص Dedicated Internet',
    type: 'business',
    description: 'ربط إنترنت مخصص للمؤسسات المتوسطة بسعة 20 Mbps.',
    features: ['CIR 1:1 مخصص بالكامل', 'سرعة 20 Mbps متماثلة', 'SLA 99.9%'],
    price: '9,800 د.ل / شهرياً',
    speed: '20 Mbps (1:1)',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-ded-int-30m',
    name: 'إنترنت مخصص Dedicated Internet 30 Mbps (CIR 1:1)',
    category: 'الإنترنت المخصص Dedicated Internet',
    type: 'business',
    description: 'ربط إنترنت مخصص 1:1 بسعة 30 Mbps للمؤسسات والمصارف.',
    features: ['CIR 1:1 مخصص بالكامل', 'سرعة 30 Mbps متماثلة', 'SLA 99.9%'],
    price: '14,000 د.ل / شهرياً',
    speed: '30 Mbps (1:1)',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-ded-int-45m',
    name: 'إنترنت مخصص Dedicated Internet 45 Mbps (CIR 1:1)',
    category: 'الإنترنت المخصص Dedicated Internet',
    type: 'business',
    description: 'ربط إنترنت مخصص 1:1 بسعة 45 Mbps للقطاعات الحيوية.',
    features: ['CIR 1:1 مخصص بالكامل', 'سرعة 45 Mbps متماثلة', 'SLA 99.9%'],
    price: '20,000 د.ل / شهرياً',
    speed: '45 Mbps (1:1)',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-ded-int-50m',
    name: 'إنترنت مخصص Dedicated Internet 50 Mbps (CIR 1:1)',
    category: 'الإنترنت المخصص Dedicated Internet',
    type: 'business',
    description: 'ربط إنترنت مخصص 1:1 بسعة 50 Mbps.',
    features: ['CIR 1:1 مخصص بالكامل', 'سرعة 50 Mbps متماثلة', 'SLA 99.9%'],
    price: '22,000 د.ل / شهرياً',
    speed: '50 Mbps (1:1)',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-ded-int-100m',
    name: 'إنترنت مخصص Dedicated Internet 100 Mbps (CIR 1:1)',
    category: 'الإنترنت المخصص Dedicated Internet',
    type: 'business',
    description: 'ربط إنترنت مخصص 1:1 بسرعات فائقة 100 Mbps للمؤسسات الكبرى.',
    features: ['CIR 1:1 مخصص بالكامل', 'سرعة 100 Mbps متماثلة', 'SLA 99.9%'],
    price: '40,000 د.ل / شهرياً',
    speed: '100 Mbps (1:1)',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-ded-int-155m',
    name: 'إنترنت مخصص Dedicated Internet 155 Mbps (CIR 1:1)',
    category: 'الإنترنت المخصص Dedicated Internet',
    type: 'business',
    description: 'أعلى سرعة إنترنت مخصص 1:1 بسعة STM-1 (155 Mbps) للمشغلين والمؤسسات السيادية.',
    features: ['CIR 1:1 مخصص بالكامل (STM-1)', 'سرعة 155 Mbps متماثلة', 'أعلى مستويات SLA والمراقبة المباشرة'],
    price: '60,000 د.ل / شهرياً',
    speed: '155 Mbps (1:1)',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },

  // --- 11. الاستضافة المكانية Co-location (4) ---
  {
    id: 'srv-coloc-1u',
    name: 'استضافة مكانية وحدة كابينة Co-location 1U Rack',
    category: 'الاستضافة المكانية Co-location',
    type: 'business',
    description: 'استضافة سيرفر بمساحة 1U في مركز بيانات LTT المعتمد.',
    features: ['مساحة 1U في Rack معتمد', 'تغذية كهربائية مستمرة وتبريد متخصص', 'اتصال شبكي عالي السرعة'],
    price: '300 د.ل / شهرياً',
    quota: '1U Rack Space',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-coloc-21u',
    name: 'استضافة مكانية نصف كابينة Co-location 21U Half Rack',
    category: 'الاستضافة المكانية Co-location',
    type: 'business',
    description: 'استضافة نصف كابينة 21U في مركز بيانات LTT.',
    features: ['مساحة 21U Half Rack', 'تغذية كهربائية ونظام حماية وأمان متقدم'],
    price: '4,500 د.ل / شهرياً',
    quota: '21U Half Rack',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-coloc-42u',
    name: 'استضافة مكانية كابينة كاملة Co-location 42U Full Rack',
    category: 'الاستضافة المكانية Co-location',
    type: 'business',
    description: 'استضافة كابينة كاملة 42U مخصصة للشركات في مركز البيانات.',
    features: ['مساحة 42U Full Rack كاملة', 'مراقبة فيزيائية وإلكترونية 24/7'],
    price: '8,000 د.ل / شهرياً',
    quota: '42U Full Rack',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-coloc-power-1a',
    name: 'إضافة طاقة كهربائية للاستضافة المكانية (1A Power Addon)',
    category: 'الاستضافة المكانية Co-location',
    type: 'business',
    description: 'تغذية كهربائية إضافية قدرها 1 أمبير لتجهيزات الاستضافة المكانية.',
    features: ['1 Ampere Power Addon'],
    price: '150 د.ل / شهرياً',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },

  // --- 12. الخدمات المضافة واستضافة النطاقات VAS (4) ---
  {
    id: 'srv-domain-ly',
    name: 'تسجيل نطاق محلي .ly',
    category: 'الخدمات المضافة واستضافة النطاقات',
    type: 'business',
    description: 'تسجيل أو تجديد اسم النطاق الوطني .ly للمؤسسات والأفراد.',
    features: ['رمز الهوية الوطنية الرقمية .ly', 'إدارة سجلات DNS المتقدمة'],
    price: '40 د.ل / سنوياً',
    validity: 'سنوي',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-domain-com-ly',
    name: 'تسجيل نطاق تجاري .com.ly',
    category: 'الخدمات المضافة واستضافة النطاقات',
    type: 'business',
    description: 'تسجيل أو تجديد اسم النطاق التجاري .com.ly للشركات.',
    features: ['نطاق تجاري موثق .com.ly'],
    price: '15 د.ل / سنوياً',
    validity: 'سنوي',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-web-hosting-2gb',
    name: 'استضافة مواقع إلكترونية Web Hosting 2GB',
    category: 'الخدمات المضافة واستضافة النطاقات',
    type: 'business',
    description: 'خطة استضافة مواقع إلكترونية بسعة 2GB مع لوحة تحكم وإيميلات.',
    features: ['سعة تخزين 2GB SSD', 'حسابات بريد إلكتروني مجانية', 'لوحة تحكم CPanel/DirectAdmin'],
    price: '230 د.ل / سنوياً',
    quota: '2GB',
    validity: 'سنوي',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-web-hosting-5gb',
    name: 'استضافة مواقع إلكترونية Web Hosting 5GB',
    category: 'الخدمات المضافة واستضافة النطاقات',
    type: 'business',
    description: 'خطة استضافة مواقع إلكترونية بسعة 5GB للمؤسسات والأنظمة.',
    features: ['سعة تخزين 5GB SSD', 'قواعد بيانات وميزات أمان إضافية'],
    price: '350 د.ل / سنوياً',
    quota: '5GB',
    validity: 'سنوي',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },

  // --- 13. نقل البيانات P2P Point-to-Point (8) ---
  {
    id: 'srv-p2p-2m',
    name: 'ربط شبكي نقل بيانات P2P سرعة 2 Mbps',
    category: 'نقل البيانات Point-to-Point',
    type: 'business',
    description: 'وصلة نقل بيانات متماثلة ومباشرة Point-to-Point بين فرعين بسرعة 2 Mbps.',
    features: ['ربط خاص ومباشر بين المقرات', 'سرعة 2 Mbps متماثلة', 'أمان عالي واستقرارية ممتازة'],
    price: '800 د.ل / شهرياً',
    speed: '2 Mbps P2P',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-p2p-5m',
    name: 'ربط شبكي نقل بيانات P2P سرعة 5 Mbps',
    category: 'نقل البيانات Point-to-Point',
    type: 'business',
    description: 'وصلة نقل بيانات متماثلة بين المكاتب والفروع بسرعة 5 Mbps.',
    features: ['ربط خاص ومباشر', 'سرعة 5 Mbps متماثلة'],
    price: '1,800 د.ل / شهرياً',
    speed: '5 Mbps P2P',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-p2p-10m',
    name: 'ربط شبكي نقل بيانات P2P سرعة 10 Mbps',
    category: 'نقل البيانات Point-to-Point',
    type: 'business',
    description: 'وصلة نقل بيانات متماثلة P2P بسعة 10 Mbps.',
    features: ['ربط خاص ومباشر', 'سرعة 10 Mbps متماثلة'],
    price: '3,200 د.ل / شهرياً',
    speed: '10 Mbps P2P',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-p2p-20m',
    name: 'ربط شبكي نقل بيانات P2P سرعة 20 Mbps',
    category: 'نقل البيانات Point-to-Point',
    type: 'business',
    description: 'وصلة نقل بيانات متماثلة P2P بسعة 20 Mbps.',
    features: ['ربط خاص ومباشر', 'سرعة 20 Mbps متماثلة'],
    price: '6,000 د.ل / شهرياً',
    speed: '20 Mbps P2P',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-p2p-50m',
    name: 'ربط شبكي نقل بيانات P2P سرعة 50 Mbps',
    category: 'نقل البيانات Point-to-Point',
    type: 'business',
    description: 'وصلة نقل بيانات متماثلة P2P بسعة 50 Mbps.',
    features: ['ربط خاص ومباشر عالية السعة', 'سرعة 50 Mbps متماثلة'],
    price: '13,000 د.ل / شهرياً',
    speed: '50 Mbps P2P',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-p2p-100m',
    name: 'ربط شبكي نقل بيانات P2P سرعة 100 Mbps',
    category: 'نقل البيانات Point-to-Point',
    type: 'business',
    description: 'وصلة نقل بيانات متماثلة P2P عالية السرعة 100 Mbps.',
    features: ['ربط فايبر مباشر بين مراكز البيانات والفروع', 'سرعة 100 Mbps متماثلة'],
    price: '24,000 د.ل / شهرياً',
    speed: '100 Mbps P2P',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-p2p-155m',
    name: 'ربط شبكي نقل بيانات P2P سرعة 155 Mbps',
    category: 'نقل البيانات Point-to-Point',
    type: 'business',
    description: 'أعلى سرعة ربط مباشر P2P بسعة STM-1 (155 Mbps).',
    features: ['ربط فايبر بنظام STM-1 155 Mbps', 'أدنى زمن تأخير وأعلى استقرار'],
    price: '35,000 د.ل / شهرياً',
    speed: '155 Mbps P2P',
    validity: 'شهري',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  },
  {
    id: 'srv-p2p-install-fee',
    name: 'رسوم تركيب وتأسيس وصلة P2P فايبر',
    category: 'نقل البيانات Point-to-Point',
    type: 'business',
    description: 'رسوم تأسيس وحفر وتمديد كابلات الفايبر المباشرة لوصلات P2P.',
    features: ['تأسيس وتركيب الوصلة مرة واحدة'],
    price: '1,500 د.ل (مرة واحدة)',
    validity: 'تأسيس',
    status: 'active',
    sourceName: 'دليل خدمات وباقات وأسعار LTT الرسمي',
  }
];

export const INITIAL_DOCUMENTS: KnowledgeDocument[] = [
  {
    id: 'doc-ltt-kb-v26-master',
    title: 'قاعدة المعرفة الموحدة المعتمدة - LTT Knowledge Base Corrected v2.6',
    description: 'الدليل الشامل المعتمد لشركة ليبيا للاتصالات والتقنية LTT الصادر في يوليو 2026.',
    contentType: 'policy',
    category: 'قواعد النظام والمصادر',
    targetAudience: 'internal',
    keywords: ['LTT', 'قاعدة المعرفة', 'Techno v2.6', 'تيكنو', 'الأسعار الرسمية', 'الوكلاء', 'المواقع'],
    sourceName: 'LTT Knowledge Base Corrected v2.6',
    version: '2.6',
    status: 'approved',
    confidentiality: 'public',
    content: `
# LTT Knowledge Base Corrected v2.6 - المرجع الموحد الرسمي

هذا المستند يمثل قاعدة المعرفة المعتمدة رسمياً للمساعد الذكي "تيكنو - Techno" وكافة موظفي ووكلاء شركة ليبيا للاتصالات والتقنية (LTT).

## أولوية المصادر وضوابط منع التضارب:
1. المرجع الأول والمباشر: قاعدة Techno V2.5 المنقحة ومستنداتها المعتمدة.
2. صفحات LTT الرسمية المحددة:
   - خدمات الأفراد: https://ltt.ly/personal
   - خدمات الأعمال: https://ltt.ly/business
   - الدعم الفني: https://ltt.ly/support
   - خدمات 4G: https://ltt.ly/personal/4g
   - الألياف البصرية: https://ltt.ly/personal/fiber
   - ADSL: https://ltt.ly/personal/adsl
   - VDSL: https://ltt.ly/personal/vdsl
   - FWA: https://ltt.ly/personal/fwa
   - ليبيافون: https://ltt.ly/personal/libyaphone
3. صفحة فيسبوك الرسمية (LibyaTT) لمتابعة الأخبار والعروض الحديثة المؤرخة: https://www.facebook.com/LibyaTT
4. قاعدة التسعير للجمهور والوكلاء:
   - عند سؤال الزبون: يتم عرض سعر البيع للجمهور فقط.
   - عند سؤال الوكيل: يتم عرض سعر الوكيل المعتمد بعد التخفيض (أو إجمالي المعاملة).
   - عند عدم تحديد الجمهور: يُعرض سعر الجمهور أولاً مع التنبيه بوجود جدول تخفيضات خاص بالوكلاء المعتمدين.
    `,
    createdBy: 'سارة العبيدي (مسؤول المعرفة)',
    approvedBy: 'أحمد الترهوني (مدير النظام)',
    createdAt: '2026-07-23',
    updatedAt: '2026-07-23',
  },

  {
    id: 'doc-individual-services-and-beiti-guide',
    title: 'دليل باقات الأفراد المعتمد LTT 2026 - باقات بيتي، 4G، فايبر، ADSL، وFixed VoLTE',
    description: 'المواصفات والأسعار المعتمدة لكافة خدمات الأفراد وباقات بيتي المزودة من شركة LTT لعام 2026.',
    contentType: 'package',
    category: 'خدمات الأفراد',
    serviceType: 'بيتي وأفراد',
    targetAudience: 'internal',
    keywords: ['خدمات الأفراد', 'باقات الأفراد', 'بيتي', 'بيتي+', 'بيتي++', 'بيتي إنفينيتي', '4G', 'فايبر', 'ADSL', 'Fixed VoLTE', 'FWA'],
    sourceName: 'دليل خدمات وباقات LTT المعتمد V2.6',
    version: '2026.2',
    status: 'approved',
    confidentiality: 'public',
    content: `
# دليل باقات وخدمات الأفراد في LTT (المعني بالاستخدام الشخصي والمنزلي)

عند سؤال المستخدم عن باقات الأفراد، يتم عرض خدمات الأفراد فقط، دون إدخال باقات الأعمال أو أسعار الوكلاء، إلا إذا طلب ذلك صراحة.

## أولاً: باقات 4G للأفراد

### 1. الباقات اليومية والأسبوعية
- **يومي 1GB**: سعر 3 د.ل | السرعة: غير محدودة | الحصة: 1GB / يوم | الأنسب لـ: استخدام خفيف وسريع
- **يومي+**: سعر 10 د.ل | السرعة: حتى 15 Mbps | الحصة: غير محدودة / يوم | الأنسب لـ: استخدام يومي متوسط أو عالٍ
- **أسبوعي**: سعر 8 د.ل | السرعة: غير محدودة | الحصة: 5GB / أسبوع | الأنسب لـ: استخدام خفيف لمدة أسبوع

### 2. باقات بكيفك ومزاجي
- **بكيفك**: سعر 15 د.ل | السرعة: غير محدودة | الحصة: 10GB / شهر | الأنسب لـ: استخدام خفيف
- **مزاجي Up**: سعر 35 د.ل | السرعة: غير محدودة | الحصة: 30GB / شهر | الأنسب لـ: استخدام متوسط
- **مزاجي Pro**: سعر 55 د.ل | السرعة: غير محدودة | الحصة: 70GB / شهر | الأنسب لـ: استخدام متوسط إلى عالٍ

## ثانياً: باقات 4G بيتي
باقات بيتي مخصصة للاستخدام المنزلي والعائلي عبر شبكة الجيل الرابع.

- **بيتي**: سعر 75 د.ل شهرياً | السرعة: غير محدودة | الحصة: 100GB + 100GB سوشيال | الأنسب لـ: عائلات / استخدام منزلي متوسط
- **بيتي+**: سعر 95 د.ل شهرياً | السرعة: غير محدودة | الحصة: 200GB + 100GB سوشيال | الأنسب لـ: عائلات / استخدام أعلى
- **بيتي++**: سعر 165 د.ل شهرياً | السرعة: غير محدودة | الحصة: 400GB + 100GB سوشيال | الأنسب لـ: استخدام منزلي عالٍ
- **بيتي إنفينيتي**: سعر 175 د.ل شهرياً | السرعة: أقصى سرعة حسب التغطية | الحصة: غير محدود | الأنسب لـ: استخدام عالٍ جداً

### ملاحظات مهمة على باقات بيتي:
- باقة بيتي إنفينيتي تصنف ضمن باقات 4G للأفراد وليست Fixed VoLTE.
- ترحيل الحصص في باقات (بيتي+) و(بيتي++): يتم ترحيل الحصة المتبقية بشرط التجديد خلال 48 ساعة من انتهاء صلاحية الباقة.

## ثالثاً: باقات الألعاب LTT4Gamers
- **LTT4Gamers**: سعر 60 د.ل شهرياً | السرعة: غير محدودة | الحصة: 60GB + 60GB ألعاب
- **LTT4Gamers Plus**: سعر 135 د.ل شهرياً | السرعة: غير محدودة | الحصة: 300GB + 100GB ألعاب

## رابعاً: باقة Power
- **Power**: سعر 260 د.ل | السرعة: غير محدودة | الحصة: 600GB / 3 أشهر

## خامساً: خدمة FWA للأفراد
إنترنت منزلي لاسلكي ثابت لموقع ثابت:
- **بيتي أسبوعين**: سعر 55 د.ل / أسبوعين | السرعة: 8 Mbps | الحصة: غير محدود
- **FWA بيتي**: سعر 100 د.ل شهرياً | السرعة: 10 Mbps | الحصة: غير محدود
- **FWA+ بيتي**: سعر 120 د.ل شهرياً | السرعة: 12 Mbps | الحصة: غير محدود
- **FWA++ بيتي**: سعر 150 د.ل شهرياً | السرعة: مفتوحة حسب التغطية | الحصة: غير محدود

## سادساً: Fixed VoLTE للأفراد (022)
بديل هاتف أرضي حديث يدمج صوت + إنترنت في جهاز CPE ثابت:
- **عرض الاشتراك المبدئي**: سعر 375 د.ل (يشمل CPE + إنترنت 15 Mbps غير محدود + مكالمات غير محدودة داخل 095 و022 + 100 دقيقة خارج الشبكة إلى 091 و092)
- **Fixed VoLTE Basic**: سعر 10 د.ل | خصم من الرصيد 1GB / 2 د.ل | مكالمات داخل الشبكة غير محدودة
- **Fixed VoLTE Lite**: سعر 80 د.ل | سرعة 8 Mbps غير محدود (FUP 6GB/يومياً) | 50 دقيقة خارج الشبكة
- **Fixed VoLTE 15M**: سعر 130 د.ل | سرعة 15 Mbps غير محدود (FUP 8GB/يومياً) | 100 دقيقة خارج الشبكة
- **Fixed VoLTE 20M**: سعر 155 د.ل | سرعة 20 Mbps غير محدود (FUP 10GB/يومياً) | 120 دقيقة خارج الشبكة
- **Fixed VoLTE Unlimited**: سعر 175 د.ل | غير محدود (FUP 20GB/يومياً) | 150 دقيقة خارج الشبكة + شاهد VIP مجاني

## سابعاً: خدمات ADSL / VDSL للأفراد
- **واجد 20**: سعر 20 د.ل شهرياً | سرعة 2 Mbps | حصة 20GB
- **واجد 30**: سعر 30 د.ل شهرياً | سرعة 3 Mbps | حصة 30GB
- **واجد 70**: سعر 40 د.ل شهرياً | سرعة 4 Mbps | حصة 70GB
- **درايف 150**: سعر 65 د.ل شهرياً | سرعة 8 Mbps | حصة 150GB
- **بيتي ADSL**: سعر 45 د.ل شهرياً | سرعة 2 Mbps | غير محدود
- **بيتي ADSL+**: سعر 75 د.ل شهرياً | سرعة 4 Mbps | غير محدود
- **بيتي ADSL++**: سعر 95 د.ل شهرياً | سرعة 8 Mbps | غير محدود
- **بيتي VDSL**: سعر 120 د.ل شهرياً | سرعة 20 Mbps | غير محدود
- **بيتي VDSL+**: سعر 200 د.ل شهرياً | سرعة 50 Mbps | غير محدود
- **بيتي VDSL++**: سعر 260 د.ل شهرياً | سرعة 70 Mbps | غير محدود

## ثامناً: Fiber / FTTH للأفراد
- **بيتي فايبر**: سعر 95 د.ل شهرياً | سرعة 20 Mbps | غير محدود
- **بيتي فايبر+**: سعر 170 د.ل شهرياً | سرعة 30 Mbps | غير محدود
- **بيتي فايبر++**: سعر 260 د.ل شهرياً | سرعة 100 Mbps | غير محدود
- **Drive 150**: سعر 60 د.ل شهرياً | سرعة 8 Mbps | حصة 150GB
- **رسوم تركيب FTTH**: 720 د.ل مرة واحدة

## تاسعاً: خدمات إضافية للأفراد
- **eSIM للأفراد**: اشتراك مبدئي 15 د.ل | تحويل SIM إلى eSIM: 10 د.ل | نقل/إعادة إصدار: 10 د.ل | تحويل لـ SIM: 5 د.ل | إلغاء: مجاني
- **تمديد الصلاحية**: شهر (5 د.ل) | 6 أشهر (25 د.ل) | سنة (45 د.ل)
- **كروت الدفع المسبق**: 5, 10, 30, 55, 100 د.ل
- **الحصص الإضافية**: 4G للأفراد (3 د.ل/1GB) | بكيفك (2.75 د.ل/1GB) | ADSL/VDSL (2 د.ل/1GB)
    `,
    createdBy: 'سارة العبيدي',
    approvedBy: 'أحمد الترهوني',
    createdAt: '2026-07-23',
    updatedAt: '2026-07-23',
  },

  {
    id: 'doc-fixed-volte-2026-guide',
    title: 'دليل Fixed VoLTE للأفراد وباقات Fixed VoLTE Business 2026',
    description: 'المواصفات والأسعار الرسمية لخدمة Fixed VoLTE الصوتية والإنترنت للأفراد والشركات لعام 2026.',
    contentType: 'package',
    category: 'Fixed VoLTE',
    serviceType: 'Fixed VoLTE',
    targetAudience: 'internal',
    keywords: ['Fixed VoLTE', 'فكسد فولت', '022', 'صوت وإنترنت', 'باقات الأعمال 2026', 'Infinity Business', 'CPE'],
    sourceName: 'LTT Knowledge Base Corrected v2.6',
    version: '2026.2',
    status: 'approved',
    confidentiality: 'public',
    content: `
# دليل Fixed VoLTE المعتمد 2026

## 1. Fixed VoLTE للأفراد (صوت + إنترنت منزلي ثابت):
- التعريف: بديل حديث للهاتف الأرضي التقليدي يعتمد على LTE/FWA، يمنح رقماً ثابتاً يبدأ بـ 022 + إنترنت منزلي ثابت.
- الاشتراك المبدئي للجمهور: 375 د.ل (جهاز CPE + شريحة + باقة غير محدودة بسرعة 15 Mbps + مكالمات غير محدودة داخل 095 و022 + 100 دقيقة لشبكات 091 و092).
- الاشتراك المبدئي للوكيل المعتمد: 357.25 د.ل إجمالي (يتضمن تخفيض قيمة الرصيد وقيمة الجهاز).
- باقات تجديد الأفراد بعد الاشتراك الأول:
  1. Fixed VoLTE Basic (10 د.ل): خصم من الرصيد 1GB / 2 د.ل.
  2. Fixed VoLTE Lite (80 د.ل): سرعة 8 Mbps غير محدود (FUP 6GB/يومياً ثم 2 Mbps) + 50 دقيقة خارج الشبكة.
  3. Fixed VoLTE 15M (130 د.ل): سرعة 15 Mbps غير محدود (FUP 8GB/يومياً ثم 5 Mbps) + 100 دقيقة خارج الشبكة.
  4. Fixed VoLTE 20M (155 د.ل - الأكثر مبيعاً): سرعة 20 Mbps غير محدود (FUP 10GB/يومياً ثم 10 Mbps) + 120 دقيقة خارج الشبكة.
  5. Fixed VoLTE Unlimited (175 د.ل): غير محدود (FUP 20GB/يومياً ثم 15 Mbps) + 150 دقيقة خارج الشبكة + اشتراك شاهد مجاني.

## 2. Fixed VoLTE Business 2026 (قطاع الأعمال):
تعتمد على تقنية VoLTE عبر شبكة 4G وتوفر مكالمات غير محدودة داخل الشبكة:
1. إنفينيتي بزنس جو (Infinity Business Go): 20 د.ل/شهر | إنترنت حسب الاستهلاك (3 د.ل/1GB من الرصيد) | دقائق خارج الشبكة PAYG.
2. إنفينيتي بزنس لايت (Infinity Business Lite): 75 د.ل/شهر | 60GB | 600 دقيقة خارج الشبكة.
3. إنفينيتي بزنس بلس (Infinity Business Plus): 150 د.ل/شهر | 100GB | 2,500 دقيقة خارج الشبكة | جيجا إضافي بـ 5 د.ل.
4. إنفينيتي بزنس برو (Infinity Business Pro): 280 د.ل/شهر | 500GB | 1,500 دقيقة خارج الشبكة | جيجا إضافي بـ 5 د.ل.
5. إنفينيتي بزنس ألترا (Infinity Business Ultra): 550 د.ل/شهر | 1000GB (1TB) | 5,000 دقيقة خارج الشبكة | جيجا إضافي بـ 5 د.ل.
    `,
    createdBy: 'سارة العبيدي',
    approvedBy: 'أحمد الترهوني',
    createdAt: '2026-07-23',
    updatedAt: '2026-07-23',
  },

  {
    id: 'doc-esim-pricing-matrix',
    title: 'جدول أسعار خدمات الشريحة الإلكترونية eSIM والخصومات المعتمدة',
    description: 'الأسعار الرسمية لخدمات eSIM للجمهور والوكلاء المعتمدين والمقارنة مع النسبة المرجعية.',
    contentType: 'package',
    category: 'eSIM والشرائح',
    serviceType: 'eSIM',
    targetAudience: 'internal',
    keywords: ['eSIM', 'أسعار الوكلاء', 'تحويل eSIM', 'إعادة إصدار', 'شريحة إلكترونية'],
    sourceName: 'LTT Knowledge Base Corrected v2.6',
    version: '2026.2',
    status: 'approved',
    confidentiality: 'public',
    content: `
# جدول أسعار eSIM المعتمد 2026

قاعدة التسعير: سعر بيع الوكلاء المقترح هو السعر المخفض المعتمد للوكيل، وعمود 30% هو مرجع مقارنة داخلي فقط.

| الخدمة / الإجراء | سعر الجمهور | سعر الوكيل المعتمد | السعر المرجعي (30%) |
| --- | --- | --- | --- |
| اشتراك مبدئي eSIM أفراد | 15 د.ل | 13.5 د.ل | 10.5 د.ل |
| اشتراك مبدئي eSIM أعمال | 60 د.ل | 60.0 د.ل | 42.0 د.ل |
| تحويل SIM فعلية إلى eSIM | 10 د.ل | 9.0 د.ل | 7.0 د.ل |
| نقل eSIM إلى جهاز جديد | 10 د.ل | 9.0 د.ل | 7.0 د.ل |
| إعادة إصدار eSIM لنفس الجهاز | 10 د.ل | 9.0 د.ل | 7.0 د.ل |
| تحويل eSIM إلى SIM فعلية | 5 د.ل | 4.5 د.ل | 3.5 د.ل |
| إلغاء مستخدم eSIM | مجاني (0 د.ل) | مجاني (0 د.ل) | مجاني (0 د.ل) |
    `,
    createdBy: 'سارة العبيدي',
    approvedBy: 'أحمد الترهوني',
    createdAt: '2026-07-23',
    updatedAt: '2026-07-23',
  },

  {
    id: 'doc-dealer-discount-table',
    title: 'جدول تخفيضات أسعار الوكلاء الكلي (Prepaid, 4G, ADSL, Fixed VoLTE, Lybiaphone)',
    description: 'جدول الخصومات ونسب التخفيض المعتمدة للوكلاء المعتمدين عبر كافة الخدمات.',
    contentType: 'policy',
    category: 'أسعار الوكلاء والتخفيضات',
    targetAudience: 'internal',
    keywords: ['أسعار الوكلاء', 'تخفيض الوكلاء', 'كروت التعبئة', '4G بدل فاقد', 'ليبيافون', 'ADSL معدات'],
    sourceName: 'LTT Knowledge Base Corrected v2.6',
    version: '2026.2',
    status: 'approved',
    confidentiality: 'internal',
    content: `
# جدول تخفيضات الوكلاء المعتمدين LTT 2026

1. كروت الدفع المسبق الورقية (نسبة تخفيض 4% ثابتة):
   - كرت 5 د.ل -> سعر الوكيل: 4.8 د.ل
   - كرت 10 د.ل -> سعر الوكيل: 9.6 د.ل
   - كرت 30 د.ل -> سعر الوكيل: 28.8 د.ل
   - كرت 55 د.ل -> سعر الوكيل: 52.8 د.ل
   - كرت 100 د.ل -> سعر الوكيل: 96.0 د.ل

2. المعدات والشرائح:
   - 4G بدل فاقد شريحة (جمهور: 5 د.ل | تخفيض 30% = 1.5 د.ل): سعر الوكيل 3.5 د.ل.
   - 4G اشتراك جديد شريحة فقط (جمهور: 5 د.ل | تخفيض 30% = 1.5 د.ل): سعر الوكيل 3.5 د.ل.
   - 4G اشتراك جديد (مودم + شريحة + باقة غير محدودة): جمهور 365 د.ل | تخفيض 5% (18.25 د.ل) -> سعر الوكيل 346.75 د.ل.
   - ADSL معدات (بدل فاقد أو جديد): جمهور 65 د.ل | تخفيض 5% (3.25 د.ل) -> سعر الوكيل 61.75 د.ل.
   - Fixed VoLTE اشتراك جديد (جهاز + شريحة + باقة): جمهور 375 د.ل | سعر الوكيل الإجمالي المعتمد 357.25 د.ل.
   - ليبيافون شريحة جديدة: جمهور 10 د.ل | سعر الوكيل 7 د.ل (الإجمالي مع الرصيد المبدئي 50د.ل هو 53.5 د.ل للوكيل).
   - ليبيافون بدل فاقد: جمهور 10 د.ل | سعر الوكيل 7 د.ل.
    `,
    createdBy: 'سارة العبيدي',
    approvedBy: 'أحمد الترهوني',
    createdAt: '2026-07-23',
    updatedAt: '2026-07-23',
  },

  {
    id: 'doc-troubleshooting-and-support-runbooks',
    title: 'دليل أدلة الأعطال والإجراءات التشخيصية للدعم الفني (Support Runbooks)',
    description: 'خطوات التعامل الموحدة مع مشاكل انقطاع النت، بطء السرعة، ضعف الإشارة، وضوء LOS الأحمر.',
    contentType: 'procedure',
    category: 'الدعم الفني والتشخيص',
    targetAudience: 'internal',
    keywords: ['الدعم الفني', 'انقطاع النت', 'LOS أحمر', 'بطء السرعة', '114', 'ضعف التغطية', 'PPPoE'],
    sourceName: 'LTT Knowledge Base Corrected v2.6',
    version: '2026.2',
    status: 'approved',
    confidentiality: 'public',
    content: `
# أدلة التشخيص والدعم الفني الموحدة (Runbooks)

## 1. انقطاع الإنترنت (4G / FWA / ADSL):
1. التأكد من توصيل المودم والكهرباء بشكل صحيح.
2. مراجعة لمبات البيان: Internet / Sync / Broadband / LTE.
3. فحص توصيلات الكابلات والـ Splitter.
4. التأكد من صلاحية الاشتراك والرصيد عبر تطبيق LTT Life.
5. إعادة تشغيل المودم لمدة 30 ثانية.
6. في ADSL: التأكد من إعدادات VPI/VCI = 0/35.
7. عند استمرار الخلل، يتم فتح تذكرة عبر رقم الدعم الفني 114.

## 2. بطء سرعة الإنترنت:
1. إجراء اختبار سرعة كابلي حقيقي عبر كابل LAN (مثل Speedtest).
2. إبعاد الراوتر عن العوائق المعدنية والأجهزة اللاسلكية الكهرومغناطيسية.
3. مراجعة الاستهلاك الخلفي للأجهزة المتصلة على الشبكة.
4. التأكد من المتبقي من الحصة أو تطبيق سياسة الاستخدام العادل (FUP).
5. في ADSL/VDSL: فحص معيار SNR Margin في المودم.
6. تغيير قناة الواي فاي Wi-Fi Channel إلى 1 أو 6 أو 11.

## 3. مشاكل الفايبر FTTH:
- ضوء LOS أحمر: يمثل انقطاعاً في الإشارة الضوئية. قم بفحص كابل Patch Cord الأصفر، وتأكد من عدم وجود ثني حاد أو كسر، ونظف الرأس بحذر. إذا استمر، يتم تصعيد تذكرة صيانة ميدانية.
- عدم وجود اتصال مع ثبات PON باللون الأخضر: أعد تشغيل ONT والراوتر، افحص كابل Ethernet، وتأكد من سداد الفاتورة أو إعدادات PPPoE.
    `,
    createdBy: 'سارة العبيدي',
    approvedBy: 'أحمد الترهوني',
    createdAt: '2026-07-23',
    updatedAt: '2026-07-23',
  },

  {
    id: 'doc-locations-directory-summary',
    title: 'دليل مواقع وفهارس وكلاء ومراكز خدمات LTT حسب المدن والروابط الجغرافية',
    description: 'فهرس شامل لأكثر من 322 موقعاً مرئياً و 58 فهارس مدن مع روابط الخرائط وأرقام الهواتف.',
    contentType: 'procedure',
    category: 'المواقع والوكلاء',
    targetAudience: 'internal',
    keywords: ['مواقع LTT', 'وكلاء طرابلس', 'وكلاء بنغازي', 'مصراتة', 'الزاوية', 'سبها', 'خرائط جوجل', 'الوكلاء المعتمدين'],
    sourceName: 'LTT Knowledge Base Corrected v2.6',
    version: '2026.2',
    status: 'approved',
    confidentiality: 'public',
    content: `
# دليل مواقع ومراكز خدمات LTT في ليبيا

تتضمن قاعدة البيانات أكثر من 322 موقعاً فعلياً موثقاً بالإحداثيات وأرقام الهواتف ورابط Google Maps المباشر.

## أمثلة للمراكز الرئيسية في المدن:
- طرابلس:
  • مركز خدمات غرب طرابلس (هاتف: 0910000001) | https://www.google.com/maps/dir/?api=1&destination=32.84333929,13.06906152
  • مركز خدمات جنوب طرابلس (هاتف: 0910000004) | https://www.google.com/maps/dir/?api=1&destination=32.83905969,13.14877326
  • مركز خدمات شارع الزاوية (هاتف: 0910000005) | https://www.google.com/maps/dir/?api=1&destination=32.87278696,13.1905898
  • مركز كبار العملاء (هاتف: 0910000006) | https://www.google.com/maps/dir/?api=1&destination=32.8920476,13.16715321
  • نقطة بيع مطار معيتيقة (هاتف: 0910000010) | https://www.google.com/maps/dir/?api=1&destination=32.905696,13.273555
- الزاوية:
  • مركز خدمات الزاوية (هاتف: 0910000002) | https://www.google.com/maps/dir/?api=1&destination=32.76599097,12.73618057
- غريان:
  • مركز خدمات غريان (هاتف: 0910000003) | https://www.google.com/maps/dir/?api=1&destination=32.17003923,13.00607412
- بنغازي، مصراتة، سبها، الخمس، زليتن، صبراتة، صرمان، طبرق، درنة، زوارة، بني وليد، ترهونة، نالوت، غات، جالو، وغيرها من المدن.

قاعدة عرض المواقع للزبون:
- عند السؤال عن مدينة: يتم استخراج القائمة وفلترتها بحسب حالة customer_visible = true مع إبراز الاسم والنوع والمدينة والهاتف ورابط الخريطة المباشر.
    `,
    createdBy: 'سارة العبيدي',
    approvedBy: 'أحمد الترهوني',
    createdAt: '2026-07-23',
    updatedAt: '2026-07-23',
  },

  {
    id: 'doc-ltt-kb-continuation-services',
    title: 'تكملة قاعدة المعرفة - دليل باقي خدمات وسياسات LTT للأعمال والوكلاء والدعم',
    description: 'الدليل المعتمد الشامل لخدمات الأعمال، الوكلاء، الدعم الفني، السياسات التجارية، وقواعد تصنيف الردود في Techno.',
    contentType: 'policy',
    category: 'قواعد النظام والمصادر',
    targetAudience: 'internal',
    keywords: ['خدمات الأعمال', 'أسعار الوكلاء', 'الدعم الفني', 'FWA الأعمال', 'Fixed VoLTE Business', 'VDSL الأعمال', 'Hosting', 'Domains', 'eSIM', 'سياسات LTT', 'المواكبة والمعرفة'],
    sourceName: 'تكملة قاعدة المعرفة — باقي خدمات LTT 2026',
    version: '2026.3',
    status: 'approved',
    confidentiality: 'public',
    content: `
# تكملة قاعدة المعرفة — باقي خدمات LTT

## قاعدة عامة

بعد اعتماد سؤال “ما هي باقات الأفراد؟” كقسم مستقل، يجب فصل باقي الخدمات إلى أقسام واضحة حتى لا يخلط Techno بين:
- خدمات الأفراد.
- خدمات الأعمال.
- خدمات الوكلاء.
- الدعم الفني.
- المراكز والوكلاء.
- السياسات التجارية.
- الخدمات الرقمية.
- العروض والأخبار.

لا يجوز عرض أسعار الوكلاء للزبون العادي إلا إذا قال صراحة إنه وكيل أو أن السؤال داخلي/تشغيلي.

---

# 1. سؤال: ما هي خدمات الأعمال في LTT؟

عند سؤال المستخدم عن خدمات الأعمال، يجب عرض خدمات الشركات والمؤسسات فقط، دون خلطها مع باقات الأفراد.

تشمل خدمات الأعمال في LTT:
1. 4G للأعمال.
2. FWA للأعمال.
3. Fixed VoLTE Business.
4. VDSL للأعمال.
5. Hosting.
6. Domains.
7. Co-Location.
8. Data Center.
9. VPN / Leased Lines / Data Transfer.
10. حلول الربط المؤسسي مثل VAPN / SD-WAN عند توفر بياناتها المعتمدة.

## إجابة مختصرة جاهزة

🏢 خدمات الأعمال في LTT مصممة للشركات والمؤسسات التي تحتاج اتصالاً مستقراً، إدارة أفضل للتكاليف، وربطاً عملياً يدعم التشغيل اليومي.

تشمل الخدمات:
• 📶 4G Business للشركات.
• 📡 FWA Business للإنترنت الثابت اللاسلكي.
• ☎️ Fixed VoLTE Business للصوت والإنترنت عبر 4G.
• 🌐 VDSL Business.
• 🖥️ الاستضافة والنطاقات وCo-Location.
• 🔗 حلول الربط ونقل البيانات مثل VPN وLeased Lines حسب المتوفر في العروض الرسمية.

🎯 لاختيار الخدمة الأنسب، يجب معرفة: حجم الشركة، عدد المستخدمين، مستوى الاستهلاك، الحاجة للمكالمات، وعدد الفروع أو المواقع.

---

# 2. سؤال: ما هي باقات 4G للأعمال؟

باقات 4G للأعمال مخصصة للشركات والمكاتب والجهات التي تحتاج اتصال بيانات عبر شبكة الجيل الرابع.

| الباقة | السرعة | الحصة | السعر | الأنسب لـ |
| --- | ---: | ---: | ---: | --- |
| أعمال 15 | غير محدودة | 15GB | 25 د.ل شهرياً | مكاتب صغيرة / استخدام محدود |
| أعمالي | غير محدودة | 60GB | 60 د.ل شهرياً | شركات ناشئة / استخدام متوسط |
| أعمالي+ | غير محدودة | 200GB | 160 د.ل شهرياً | شركات متوسطة |
| أعمالي++ | غير محدودة | 1TB | 390 د.ل شهرياً | مؤسسات كبرى / استخدام عالٍ |

## قاعدة التوصية
• إذا كانت الشركة صغيرة واستخدامها محدود: اقترح أعمال 15.
• إذا كان الاستخدام متوسطاً: اقترح أعمالي.
• إذا كانت الشركة تعتمد على الإنترنت يومياً: اقترح أعمالي+.
• إذا كانت المؤسسة كبيرة أو تحتاج حصة عالية جداً: اقترح أعمالي++.

## صياغة بيع مختصرة
📶 باقات 4G للأعمال تمنح شركتك اتصالاً مرناً وسريع التفعيل، مناسباً للمكاتب والفروع التي تحتاج إنترنت عملي دون تعقيدات تركيب كبيرة.

---

# 3. سؤال: ما هي باقات FWA للأعمال؟

خدمة FWA للأعمال هي إنترنت ثابت لاسلكي للشركات، مناسبة للمواقع التي تحتاج إنترنت مستقر دون تمديدات ألياف.

| الباقة | السرعة | الحصة | السعر | الأنسب لـ |
| --- | ---: | ---: | ---: | --- |
| مكتبي | 10 Mbps | غير محدود | 160 د.ل شهرياً | شركات صغيرة |
| مكتبي+ | 20 Mbps | غير محدود | 260 د.ل شهرياً | شركات متوسطة |
| مكتبي++ | 30 Mbps | غير محدود | 480 د.ل شهرياً | شركات كبرى / استخدام أعلى |

## ملاحظات مهمة
• الخدمة مخصصة لموقع ثابت.
• تعتمد جودة الخدمة على التغطية في موقع الشركة.
• لا يتم تأكيد الاشتراك إلا بعد التحقق من التغطية أو المسح الفني عند الحاجة.

## صياغة بيع مختصرة
📡 FWA للأعمال خيار عملي للشركات التي تبحث عن إنترنت ثابت لاسلكي، بسرعة مناسبة وتشغيل مرن دون الحاجة إلى تمديدات ألياف في كل الحالات.

---

# 4. سؤال: ما هي Fixed VoLTE Business؟

خدمة Fixed VoLTE Business هي خدمة مخصصة لقطاع الأعمال، تعتمد على تقنية VoLTE عبر شبكة 4G، وتوفر:
• مكالمات غير محدودة داخل الشبكة.
• باقات بيانات حسب نوع الباقة.
• دقائق خارج الشبكة حسب الباقة.
• احتساب المكالمات الدولية والرسائل النصية بنظام PAYG حسب التعرفة المعتمدة.

## أسماء الباقات
- إنفينيتي بزنس جو (Infinity Business Go)
- إنفينيتي بزنس لايت (Infinity Business Lite)
- إنفينيتي بزنس بلس (Infinity Business Plus)
- إنفينيتي بزنس برو (Infinity Business Pro)
- إنفينيتي بزنس ألترا (Infinity Business Ultra)

## جدول الباقات
| الباقة | الإنترنت | السرعة | داخل الشبكة | خارج الشبكة | السعر |
| --- | ---: | --- | --- | ---: | ---: |
| Infinity Business Go | حسب الاستهلاك: 3 د.ل / 1GB من الرصيد | غير محدودة | غير محدود | PAYG | 20 د.ل شهرياً |
| Infinity Business Lite | 60GB | غير محدودة | غير محدود | 600 دقيقة | 75 د.ل شهرياً |
| Infinity Business Plus | 100GB | غير محدودة | غير محدود | 2,500 دقيقة ثم PAYG | 150 د.ل شهرياً |
| Infinity Business Pro | 500GB | غير محدودة | غير محدود | 1,500 دقيقة ثم PAYG | 280 د.ل شهرياً |
| Infinity Business Ultra | 1000GB / 1TB | غير محدودة | غير محدود | 5,000 دقيقة ثم PAYG | 550 د.ل شهرياً |

## الحصص الإضافية
في باقات (Infinity Business Plus, Infinity Business Pro, Infinity Business Ultra):
سعر الحصة الإضافية هو 5 د.ل لكل 1GB.

## قاعدة التوصية
• تريد مرونة ودفع حسب الاستهلاك -> Infinity Business Go
• شركة صغيرة تبحث عن توازن -> Infinity Business Lite
• شركة تعتمد على المكالمات الخارجية بكثافة -> Infinity Business Plus
• شركة تعتمد على البيانات والعمليات الرقمية -> Infinity Business Pro
• مؤسسة كبيرة تحتاج أعلى حصة وأكبر دقائق -> Infinity Business Ultra

## صياغة بيع مختصرة
☎️ Fixed VoLTE Business يمنح شركتك اتصالاً أكثر تحكماً ومرونة: مكالمات داخل الشبكة بدون حدود، باقات بيانات حسب احتياج العمل، ودقائق خارج الشبكة تدعم تواصل فريقك مع العملاء والشركاء.

---

# 5. سؤال: ما هي باقات VDSL للأعمال؟

خدمة VDSL للأعمال مناسبة للشركات التي تحتاج اتصالاً ثابتاً عبر الخطوط المدعومة، بسرعات أعلى من ADSL.

| الباقة | السرعة | الحصة | السعر | الأنسب لـ |
| --- | ---: | ---: | ---: | --- |
| VDSL أعمال 250 | 20 Down / 10 Up Mbps | 250GB | 100 د.ل شهرياً | أعمال / استخدام متوسط |
| VDSL أعمال 500 | 50 Down / 10 Up Mbps | 500GB | 150 د.ل شهرياً | أعمال / استخدام عالٍ |

## ملاحظات
• الخدمة تعتمد على توفر VDSL في المنطقة.
• مناسبة للمكاتب التي تحتاج اتصالاً ثابتاً أكثر من الاستخدام المتنقل.
• يجب التأكد من جاهزية الخط والتغطية الفنية قبل الاشتراك.

---

# 6. سؤال: ما هي خدمات Hosting وDomains وCo-Location؟

هذه الخدمات موجهة غالباً للشركات أو الأفراد ذوي الاحتياج الرقمي المتقدم، مثل المواقع الإلكترونية، النطاقات، واستضافة المعدات.

## Shared Hosting
• استضافة 2GB: سعة 2GB بسعر 230 د.ل سنوياً
• استضافة 5GB: سعة 5GB بسعر 350 د.ل سنوياً
• استضافة 10GB: سعة 10GB بسعر 490 د.ل سنوياً
• استضافة 20GB: سعة 20GB بسعر 680 د.ل سنوياً

## Domains
• النطاق .ly: بسعر 40 د.ل سنوياً
• النطاق .com.ly: بسعر 15 د.ل سنوياً

## Co-Location
• Co-Location 1U: مساحة 1U بسعر 2000 د.ل سنوياً

## صياغة بيع مختصرة
🖥️ خدمات الاستضافة والنطاقات من LTT تساعد الشركات وأصحاب المشاريع على بناء حضور رقمي رسمي، من حجز النطاق إلى استضافة الموقع أو المعدات داخل بيئة تقنية أكثر تنظيماً.

---

# 7. سؤال: ما هي خدمات الربط ونقل البيانات؟

تشمل خدمات الربط ونقل البيانات:
• VPN.
• Leased Lines.
• Data Transfer.
• Data Center.
• حلول ربط الفروع.
• VAPN / SD-WAN عند توفر تفاصيلها المعتمدة.

## قاعدة الرد
إذا سأل المستخدم عن هذه الخدمات، يجب عدم إعطاء سعر تفصيلي إلا إذا كان السعر موجوداً في قاعدة المعرفة المعتمدة.

## إجابة جاهزة
🔗 خدمات الربط ونقل البيانات في LTT موجهة للشركات والمؤسسات التي تحتاج ربطاً مستقراً وآمناً بين الفروع أو الأنظمة أو مراكز البيانات.

تشمل الحلول: VPN، Leased Lines، Data Transfer، حلول الربط المؤسسي، وData Center حسب المتطلبات الفنية.

⚠️ الأسعار والتصميم الفني لهذه الخدمات يعتمد غالباً على عدد المواقع، السعات المطلوبة، وطبيعة الربط، لذلك يجب تحويل الطلب للفريق المختص أو طلب عرض فني عند عدم توفر سعر ثابت في قاعدة المعرفة.

---

# 8. سؤال: ما هي ليبيافون؟

## قاعدة مهمة
لا يتم اختراع تفاصيل أو باقات ليبيافون إذا لم تكن موجودة في قاعدة المعرفة أو صفحة LTT الرسمية.

## إجابة آمنة
📱 ليبيافون خدمة من خدمات LTT، وتفاصيلها يجب أخذها من المصدر الرسمي أو قاعدة المعرفة المعتمدة.
المعلومات المتوفرة حالياً في قاعدة الأسعار التشغيلية تشمل بعض أسعار الشرائح أو إجراءات الاشتراك/بدل الفاقد، لكنها لا تكفي وحدها لشرح كل الباقات أو المزايا.

⚠️ للحصول على تفاصيل دقيقة حول باقات ليبيافون، يجب الرجوع إلى صفحة ليبيافون الرسمية أو مركز الخدمة.

---

# 9. سؤال: ما هي خدمات eSIM؟

خدمة eSIM هي شريحة إلكترونية، ويجب التفريق بين سعر الجمهور وسعر الوكيل.

## أسعار eSIM للجمهور
• اشتراك مبدئي eSIM أفراد: 15 د.ل
• اشتراك مبدئي eSIM أعمال: 60 د.ل
• تحويل SIM فعلية إلى eSIM: 10 د.ل
• نقل eSIM إلى جهاز جديد: 10 د.ل
• إعادة إصدار eSIM لنفس الجهاز: 10 د.ل
• تحويل eSIM إلى SIM فعلية: 5 د.ل
• إلغاء مستخدم eSIM: مجاني

## أسعار eSIM للوكلاء
• اشتراك مبدئي eSIM أفراد: 13.5 د.ل
• اشتراك مبدئي eSIM أعمال: 60 د.ل
• تحويل SIM فعلية إلى eSIM: 9 د.ل
• نقل eSIM إلى جهاز جديد: 9 د.ل
• إعادة إصدار eSIM لنفس الجهاز: 9 د.ل
• تحويل eSIM إلى SIM فعلية: 4.5 د.ل
• إلغاء مستخدم eSIM: مجاني

## قاعدة الرد
• إذا سأل الزبون: اعرض سعر الجمهور.
• إذا قال إنه وكيل: اعرض سعر الوكيل المعتمد.
• إذا لم يوضح صفته: اعرض سعر الجمهور واذكر أن للوكلاء أسعاراً خاصة.

---

# 10. سؤال: ما هي أسعار الوكلاء؟

## قاعدة مهمة
أسعار الوكلاء لا تُعرض للزبون العادي. تعرض فقط إذا كان السائل وكيلاً، موظفاً داخلياً، من الإدارة/المبيعات، أو يسأل صراحة عن سعر الوكيل.

## أسعار الخدمات والمعدات للوكلاء
• ADSL بدل فاقد / جديد معدات: سعر الجمهور 65 د.ل | تخفيض 5% -> سعر الوكيل 61.75 د.ل
• 4G بدل فاقد / جديد شريحة فقط: سعر الجمهور 5 د.ل | تخفيض 30% -> سعر الوكيل 3.5 د.ل
• 4G جديد (مودم + شريحة + باقة غير محدودة): سعر الجمهور 365 د.ل | تخفيض 5% -> سعر الوكيل 346.75 د.ل
• ليبيافون شريحة جديدة: سعر الجمهور 10 د.ل | تخفيض 30% -> سعر الوكيل 7 د.ل (الإجمالي مع رصيد 50 د.ل هو 53.5 د.ل)
• ليبيافون بدل فاقد: سعر الجمهور 10 د.ل | تخفيض 30% -> سعر الوكيل 7 د.ل
• Fixed VoLTE جديد (جهاز + باقة غير محدودة + شريحة): سعر الجمهور 375 د.ل | السعر الإجمالي المعتمد للوكيل: 357.25 د.ل

---

# 11. سؤال: ما هي أسعار كروت الدفع المسبق؟

## للزبون
• كرت 5 د.ل -> 5 د.ل
• كرت 10 د.ل -> 10 د.ل
• كرت 30 د.ل -> 30 د.ل
• كرت 55 د.ل -> 55 د.ل
• كرت 100 د.ل -> 100 د.ل

## للوكيل (تخفيض 4%)
• كرت 5 د.ل -> 4.8 د.ل
• كرت 10 د.ل -> 9.6 د.ل
• كرت 30 د.ل -> 28.8 د.ل
• كرت 55 د.ل -> 52.8 د.ل
• كرت 100 د.ل -> 96 د.ل

---

# 12. سؤال: أين أقرب وكيل أو مركز LTT؟

عند سؤال المستخدم عن وكيل أو مركز، يجب البحث في قاعدة المواقع وعرض النتيجة بهذا الشكل:
📍 الاسم: [اسم الوكيل أو المركز]
🏷️ النوع: [وكيل / مركز خدمات / نقطة بيع ثابتة]
🏙️ المدينة: [المدينة أو المنطقة]
☎️ الهاتف: [الهاتف إن وجد]
🗺️ الموقع على الخريطة: [رابط Google Maps]

## قواعد البحث
• إذا ذكر المدينة: ابحث حسب المدينة.
• إذا ذكر المنطقة: ابحث حسب المنطقة.
• إذا قال “أقرب وكيل لي”: اطلب المدينة أو مشاركة الموقع.
• إذا كانت النتائج كثيرة: اعرض أول 5 إلى 10 نتائج واطلب تحديد المنطقة.
• لا تعرض أي سجل غير معتمد أو Pending.
• لا تخترع رقم هاتف غير موجود أو عنواناً دون رابط الخريطة.

---

# 13. سؤال: لا يوجد إنترنت، ماذا أفعل؟

1. تأكد من تشغيل المودم والكهرباء.
2. راجع لمبات الجهاز مثل Internet / Sync / Broadband / LTE.
3. افحص الكابلات والـ Splitter إن وجد.
4. تأكد من صلاحية الاشتراك والحصة أو الرصيد.
5. أعد تشغيل المودم لمدة 30 ثانية.
6. في ADSL، راجع إعدادات VPI/VCI = 0/35.
7. إذا استمرت المشكلة، اتصل بالدعم الفني 114.

تنبيك: لا يطلب Techno كلمة مرور أو رمز تحقق أو بيانات سرية.

---

# 14. سؤال: الإنترنت بطيء، ماذا أفعل؟

1. جرّب اختبار السرعة عبر كابل LAN.
2. أبعد المودم عن الحواجز والأجهزة المتداخلة.
3. راجع عدد الأجهزة المتصلة.
4. تحقق من البرامج التي تستهلك البيانات في الخلفية.
5. تأكد من الحصة المتبقية أو سياسة الاستخدام العادل (FUP).
6. في ADSL/VDSL مراجعة SNR Margin.
7. في Wi-Fi، تغيير القناة إلى 1 أو 6 أو 11.

---

# 15. سؤال: لا توجد إشارة 4G أو FWA، ماذا أفعل؟

1. تأكد من تركيب الشريحة بشكل صحيح.
2. ضع المودم قرب نافذة أو في مكان مرتفع.
3. تجنب الرفوف المعدنية والغرف المغلقة.
4. افحص الهوائيات الخارجية إن وجدت.
5. تأكد من حالة التغطية أو وجود أعمال صيانة بالمنطقة.

---

# 16. سؤال: ضوء LOS أحمر في الفايبر، ماذا يعني؟

⚠️ ضوء LOS أحمر يعني وجود مشكلة في الإشارة الضوئية أو انقطاع في كابل الفايبر.
1. افحص كابل الفايبر الأصفر Patch Cord.
2. تأكد من عدم ثنيه أو سحقه.
3. أعد تركيبه بحذر إن كان ذلك آمناً.
4. إذا بقي أحمر، يتم فتح تذكرة صيانة ميدانية.

---

# 17. سؤال: لا يوجد اتصال فايبر رغم أن LOS ليس أحمر

1. تأكد من ثبات ضوء PON باللون الأخضر.
2. أعد تشغيل ONT والراوتر.
3. افحص كابل Ethernet بين ONT والراوتر.
4. تأكد من سداد الفاتورة أو تفعيل الاشتراك.
5. إذا لم يحصل الجهاز على IP، يتم فحص المصادقة أو PPPoE.

---

# 18. سؤال: ما شروط الاشتراك للأفراد؟

1. تعبئة نموذج العقد الموحد.
2. إحضار إثبات هوية ساري.
3. إحضار الرقم الوطني.
4. حضور صاحب العقد أو وكيله القانوني.
5. سداد رسوم التأسيس وقيمة الخدمة.

---

# 19. سؤال: ما شروط اشتراك الشركات؟

1. طلب رسمي مختوم وموقع.
2. سجل تجاري ورخصة نشاط سارية.
3. قيد ضريبي وانتساب غرفة التجارة.
4. إثبات هوية للمفوض.
5. تعبئة نموذج خدمة الشركات.
6. سداد الرسوم المطلوبة.

---

# 20. سؤال: هل يمكن نقل ملكية الاشتراك أو التنازل؟

نعم، يمكن نقل ملكية الاشتراك حسب السياسة المعتمدة بشرط:
• حضور الطرفين.
• إبراز الهويات.
• إحضار عقد الخدمة.
• خلو الاشتراك من المديونية.
• سداد رسوم المعاملة: 10 د.ل.

---

# 21. سؤال: ما سياسة الاستخدام العادل؟

⚠️ قد تخضع بعض الباقات غير المحدودة لسياسة استخدام عادل حسب نوع الباقة والتحديثات المعتمدة، وينصح بمراجعة تفاصيل الباقة قبل الاشتراك.

---

# 22. سؤال: ما أفضل خدمة لشركة؟

أسئلة تحديد الاحتياج: نوع النشاط، عدد المستخدمين، الحاجة للمكالمات، عدد الفروع، الميزانية، والمدينة.

• مكتب صغير واستخدام محدود -> 4G أعمال 15 أو FWA مكتبي
• شركة صغيرة إنترنت ثابت -> FWA مكتبي أو VDSL أعمال
• شركة تعتمد على المكالمات -> Fixed VoLTE Business Plus
• شركة تعتمد على البيانات والعمليات -> Fixed VoLTE Business Pro
• مؤسسة كبيرة -> Fixed VoLTE Business Ultra أو حلول ربط مخصصة
• ربط الفروع -> VPN / Leased Lines / Data Transfer

---

# 23. سؤال: ما آخر العروض أو الأخبار؟

إذا لم تكن المعلومة مؤكدة في قاعدة المعرفة المتاحة، يجاب:
⚠️ لا توجد لدي حالياً معلومة مؤكدة عن عرض جديد في قاعدة المعرفة المتاحة. يرجى متابعة صفحة LTT الرسمية أو صفحة فيسبوك LibyaTT أو زيارة أقرب مركز خدمة.

---

# 24. سؤال: ما مصادر معلومات Techno؟

يعتمد Techno على:
1. قاعدة المعرفة المعتمدة.
2. صفحات LTT الرسمية (ltt.ly).
3. ملفات الخدمات والباقات المعتمدة.
4. ملفات أسعار الوكلاء المعتمدة.
5. قاعدة الوكلاء والمراكز.
6. صفحة فيسبوك الرسمية للأخبار والعروض الحديثة.
7. سياسات وإجراءات الشركة المعتمدة.

عند التعارض: يعتمد المصدر الأحدث المعتمد، وتُقدم السياسة الرسمية على المحتوى التوضيحي.

---

# 25. قالب عدم توفر معلومة

⚠️ لم أجد معلومات معتمدة كافية في قاعدة المعرفة للإجابة بدقة. يفضل مراجعة القناة الرسمية أو رفع السؤال للمراجعة من الإدارة المختصة.

---

# 26. قاعدة نهائية لتصنيف الردود

• عند سؤال المستخدم عن الأفراد: استخدم قسم باقات وخدمات الأفراد فقط.
• عند سؤال المستخدم عن الشركات: استخدم قسم خدمات الأعمال فقط.
• عند سؤال المستخدم عن وكيل: استخدم قاعدة الوكلاء والمراكز.
• عند سؤال المستخدم عن الدعم الفني: استخدم شجرة الدعم الفني حسب نوع الخدمة.
• عند سؤال المستخدم عن الأسعار: حدد هل هو زبون أو وكيل ثم اعرض السعر المناسب.
• عند سؤال المستخدم عن عرض أو خبر جديد: تحقق من المصادر الرسمية والأحدث، ولا تعتمد على التخمين.
    `,
    createdBy: 'سارة العبيدي',
    approvedBy: 'أحمد الترهوني',
    createdAt: '2026-07-23',
    updatedAt: '2026-07-23',
  }
];

export const INITIAL_RULES: RecommendationRule[] = [
  {
    id: 'rule-rec-01',
    name: 'توصية بيتي إنفينيتي للاستهلاك المنزلي العالي جداً',
    condition: 'useCase == "heavy_home_download" || request == "unlimited_home"',
    outcomeServiceId: 'srv-4g-individual',
    outcomeText: 'نوصي بباقة "بيتي إنفينيتي" بسعر 175 د.ل شهرياً للحصول على إنترنت غير محدود بأقصى سرعة متاحة حسب التغطية.',
    priority: 1,
    status: 'active',
    approvedBy: 'أحمد الترهوني',
  },
  {
    id: 'rule-rec-02',
    name: 'توصية Fixed VoLTE لمن يبحث عن هاتف أرضي + إنترنت ثابت',
    condition: 'useCase == "home_landline" || useCase == "landline_internet"',
    outcomeServiceId: 'srv-fixed-volte-ind',
    outcomeText: 'نوصي بخدمة Fixed VoLTE للأفراد بسعر بداية 375 د.ل (CPE + شريحة + مكالمات غير محدودة داخل 095 و 022 + 100 دقيقة خارج الشبكة).',
    priority: 1,
    status: 'active',
    approvedBy: 'أحمد الترهوني',
  },
  {
    id: 'rule-rec-03',
    name: 'توصية باقات Fixed VoLTE Business 2026 للشركات',
    condition: 'useCase == "business_calls_data"',
    outcomeServiceId: 'srv-fixed-volte-biz-2026',
    outcomeText: 'نوصي بباقات إنفينيتي بزنس 2026 (Go / Lite / Plus / Pro / Ultra) بحسب حاجة الشركة للمكالمات الخارجية وحصة البيانات.',
    priority: 2,
    status: 'active',
    approvedBy: 'أحمد الترهوني',
  },
];

export const INITIAL_TROUBLESHOOTING_TREES: TroubleshootingTree[] = [
  {
    id: 'tree-unified-diagnostics',
    serviceCategory: 'all_services',
    title: 'شجرة التشخيص الموحدة لأعطال LTT (إنترنت / فايبر / تغطية)',
    startStepId: 'step-type',
    steps: {
      'step-type': {
        id: 'step-type',
        question: 'ما هي التقنية أو الخدمة التي تعاني من مشكلة بها؟',
        options: [
          { label: 'إنترنت 4G / FWA / ADSL', nextStepId: 'step-internet-check' },
          { label: 'ألياف بصرية Fiber / FTTH', nextStepId: 'step-fiber-check' },
        ],
      },
      'step-internet-check': {
        id: 'step-internet-check',
        question: 'هل المودم يعمل ولمبة Internet / Sync مضاءة؟',
        options: [
          { label: 'المودم مطفأ أو لمبة Internet مطفأة', isDiagnosis: true, diagnosisText: 'افحص توصيلات الكهرباء والكابلات. أعد تشغيل المودم 30 ثانية. في ADSL تأكد من VPI/VCI = 0/35.', escalationNeeded: false },
          { label: 'اللمبة مضاءة ولكن السرعة بطيئة أو مقطوعة', isDiagnosis: true, diagnosisText: 'تأكد من رصيد الاشتراك بـ LTT Life. جرب كابل LAN وغير قناة الواي فاي إلى 1/6/11. اتصل بـ 114 للتحقق من التغطية.', escalationNeeded: true },
        ],
      },
      'step-fiber-check': {
        id: 'step-fiber-check',
        question: 'ما حالة ضوء LOS و PON في جهاز ONT الخاص بالفايبر؟',
        options: [
          { label: 'ضوء LOS أحمر', isDiagnosis: true, diagnosisText: 'يوجد انقطاع في الإشارة الضوئية. افحص كابل Patch Cord الأصفر بحذر وتأكد من عدم وجود كسر. إن استمر أحمر يتطلب فتح تذكرة صيانة.', escalationNeeded: true },
          { label: 'ضوء PON أخضر ثابت ولكن لا يوجد نت', isDiagnosis: true, diagnosisText: 'افحص كابل Ethernet بين ONT والراوتر، وأعد تشغيلهما. راجع اشتراكك وفواتيرك.', escalationNeeded: false },
        ],
      },
    },
  },
];

export const INITIAL_TRAINING_MODULES: TrainingModule[] = [
  {
    id: 'train-v26-mastery',
    title: 'اختبار المعرفة الشامل بدليل LTT V2.6 والأسعار المعتمدة',
    category: 'التدريب والتأهيل الموحد',
    description: 'دورة تدريبية تفاعلية تغطي أسعار باقات 4G، Fixed VoLTE Business 2026، eSIM، وتخفيضات الوكلاء.',
    estimatedMinutes: 15,
    badgeReward: 'وسام الخبير المعرفي المعتمد لشركة LTT V2.6',
    questions: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'كم هو سعر الاشتراك المبدئي لخدمة Fixed VoLTE الجديد للأفراد شامل الجهاز والشريحة والباقة؟',
        options: ['175 د.ل', '357.25 د.ل', '375 د.ل', '550 د.ل'],
        correctAnswer: 2,
        explanation: 'سعر الاشتراك المبدئي للجمهور هو 375 د.ل، بينما السعر الإجمالي المعتمد للوكيل هو 357.25 د.ل.',
      },
      {
        id: 'q2',
        type: 'mcq',
        question: 'كم هو سعر باقة "بيتي إنفينيتي" غير المحدودة شهرياً؟',
        options: ['120 د.ل', '150 د.ل', '165 د.ل', '175 د.ل'],
        correctAnswer: 3,
        explanation: 'سعر باقة بيتي إنفينيتي في دليل LTT المعتمد هو 175 د.ل شهرياً.',
      },
      {
        id: 'q3',
        type: 'boolean',
        question: 'خدمة Fixed VoLTE للأفراد توفر رقماً ثابتاً يبدأ بـ 022 وتعمل كبديل للهاتف الأرضي يوفر الصوت والإنترنت معاً.',
        options: ['صح', 'خطأ'],
        correctAnswer: 0,
        explanation: 'صحيح، Fixed VoLTE للأفراد هي خدمة متكاملة توفر الصوت (رقم 022) والإنترنت الثابت في جهاز CPE واحد.',
      },
    ],
  },
];
