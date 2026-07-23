import React, { useState, useEffect } from 'react';
import { UserProfile, ServicePackage } from '../../types';
import { KnowledgeProvider, normalizeArabicText } from '../../services/knowledge';
import { PackageCheck, Search, Plus, Edit3, Trash2, Tag, Zap, DollarSign, Shield, Layers, CheckCircle, Sparkles, X, Copy } from 'lucide-react';

interface ServicesCatalogViewProps {
  user: UserProfile;
}

export const ServicesCatalogView: React.FC<ServicesCatalogViewProps> = ({ user }) => {
  const [services, setServices] = useState<ServicePackage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'individual' | 'business'>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingService, setEditingService] = useState<ServicePackage | null>(null);
  const [deletingServiceId, setDeletingServiceId] = useState<string | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formNameEn, setFormNameEn] = useState('');
  const [formCategory, setFormCategory] = useState('خدمات الأفراد');
  const [formType, setFormType] = useState<'individual' | 'business'>('individual');
  const [formDescription, setFormDescription] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formQuota, setFormQuota] = useState('');
  const [formSpeed, setFormSpeed] = useState('');
  const [formValidity, setFormValidity] = useState('');
  const [formFeatures, setFormFeatures] = useState('');
  const [formRequirements, setFormRequirements] = useState('');
  const [formStatus, setFormStatus] = useState<'active' | 'legacy' | 'upcoming'>('active');
  const [formSourceName, setFormSourceName] = useState('');

  const isAdminOrSupervisor = ['super_admin', 'knowledge_admin', 'supervisor'].includes(user.role);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setIsLoading(true);
    const data = await KnowledgeProvider.getAllServices();
    setServices(data);
    setIsLoading(false);
  };

  const handleOpenAddModal = (template?: ServicePackage) => {
    if (template) {
      setFormName(`${template.name} - إصدار محدث`);
      setFormNameEn(template.nameEn || '');
      setFormCategory(template.category);
      setFormType(template.type);
      setFormDescription(template.description);
      setFormPrice(template.price || '');
      setFormQuota(template.quota || '');
      setFormSpeed(template.speed || '');
      setFormValidity(template.validity || '');
      setFormFeatures(template.features?.join('\n') || '');
      setFormRequirements(template.requirements?.join('\n') || '');
      setFormStatus('active');
      setFormSourceName(`تحديث سوق LTT - ${new Date().toISOString().split('T')[0]}`);
    } else {
      setFormName('');
      setFormNameEn('');
      setFormCategory('خدمات الأفراد');
      setFormType('individual');
      setFormDescription('');
      setFormPrice('');
      setFormQuota('');
      setFormSpeed('');
      setFormValidity('');
      setFormFeatures('');
      setFormRequirements('');
      setFormStatus('active');
      setFormSourceName('دليل باقات LTT المعتمد');
    }
    setEditingService(null);
    setShowAddModal(true);
  };

  const handleOpenEditModal = (service: ServicePackage) => {
    setEditingService(service);
    setFormName(service.name);
    setFormNameEn(service.nameEn || '');
    setFormCategory(service.category);
    setFormType(service.type);
    setFormDescription(service.description);
    setFormPrice(service.price || '');
    setFormQuota(service.quota || '');
    setFormSpeed(service.speed || '');
    setFormValidity(service.validity || '');
    setFormFeatures(service.features?.join('\n') || '');
    setFormRequirements(service.requirements?.join('\n') || '');
    setFormStatus(service.status);
    setFormSourceName(service.sourceName || 'دليل باقات LTT');
    setShowAddModal(true);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formDescription.trim()) return;

    const featuresList = formFeatures.split('\n').map(f => f.trim()).filter(Boolean);
    const reqsList = formRequirements.split('\n').map(r => r.trim()).filter(Boolean);

    const payload: Omit<ServicePackage, 'id'> = {
      name: formName,
      nameEn: formNameEn,
      category: formCategory,
      type: formType,
      description: formDescription,
      price: formPrice,
      quota: formQuota,
      speed: formSpeed,
      validity: formValidity,
      features: featuresList,
      requirements: reqsList,
      status: formStatus,
      sourceName: formSourceName,
    };

    if (editingService) {
      await KnowledgeProvider.updateServicePackage(editingService.id, payload);
    } else {
      await KnowledgeProvider.addServicePackage(payload);
    }

    setShowAddModal(false);
    setEditingService(null);
    loadServices();
  };

  const handleDeleteService = async (id: string) => {
    await KnowledgeProvider.deleteServicePackage(id);
    setDeletingServiceId(null);
    loadServices();
  };

  const filteredServices = services.filter(s => {
    const normSearch = normalizeArabicText(searchQuery);
    const matchesType = selectedType === 'all' || s.type === selectedType;

    if (!normSearch) return matchesType;

    const normName = normalizeArabicText(s.name + ' ' + (s.nameEn || ''));
    const normDesc = normalizeArabicText(s.description);
    const normPrice = normalizeArabicText(s.price || '');

    return matchesType && (normName.includes(normSearch) || normDesc.includes(normSearch) || normPrice.includes(normSearch));
  });

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md">
            <PackageCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 text-base sm:text-lg">دليل الخدمات والباقات والأسعار LTT</h1>
            <p className="text-xs text-slate-500">إدارة وتعديل أسعار وباقات الأفراد والأعمال ديناميكياً بحسب تحديثات السوق</p>
          </div>
        </div>

        {isAdminOrSupervisor && (
          <button
            onClick={() => handleOpenAddModal()}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة باقة جديدة</span>
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
            placeholder="بحث في باقات Fiber, 4G, FWA والأسعار..."
            className="w-full pr-9 pl-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedType === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            كافة الباقات ({services.length})
          </button>
          <button
            onClick={() => setSelectedType('individual')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedType === 'individual' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            باقات الأفراد
          </button>
          <button
            onClick={() => setSelectedType('business')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedType === 'business' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            باقات الأعمال والشركات
          </button>
        </div>
      </div>

      {/* Services Grid */}
      {isLoading ? (
        <div className="text-center py-12 text-slate-500 text-xs">جاري تحميل باقات ودليل الخدمات...</div>
      ) : filteredServices.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl text-center text-slate-500 space-y-3">
          <PackageCheck className="w-12 h-12 text-slate-300 mx-auto" />
          <p className="font-bold text-sm text-slate-700">لم يتم العثور على باقات تطابق البحث</p>
          <p className="text-xs">جرب تغيير الكلمة المفتاحية أو اختر تصنيفاً آخر</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Header info */}
                <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                        service.type === 'individual' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-purple-50 text-purple-700 border border-purple-200'
                      }`}>
                        {service.type === 'individual' ? 'خدمات الأفراد' : 'خدمات الأعمال'}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {service.category}
                      </span>
                      {service.status === 'active' && (
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                          متاحة حالياً
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1.5">
                      {service.logoUrl && (
                        <img 
                          src={service.logoUrl} 
                          alt={service.name} 
                          className="h-9 w-auto object-contain shrink-0" 
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base">{service.name}</h3>
                        {service.nameEn && <p className="text-xs text-slate-400 font-mono">{service.nameEn}</p>}
                      </div>
                    </div>
                  </div>

                  {isAdminOrSupervisor && (
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleOpenAddModal(service)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="نسخ وتحديث الباقة"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenEditModal(service)}
                        className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="تعديل الباقة والأسعار"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeletingServiceId(service.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="حذف الباقة"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{service.description}</p>

                {/* Specs Pill Summary */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block">السعر / التعريفة:</span>
                    <span className="font-extrabold text-blue-700">{service.price || 'حسب التغذية'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block">السعة / Quota:</span>
                    <span className="font-bold text-slate-800">{service.quota || 'غير محددة'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block">السرعة / Speed:</span>
                    <span className="font-bold text-slate-800">{service.speed || 'حسب السرعة'}</span>
                  </div>
                </div>

                {/* Features List */}
                {service.features && service.features.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-slate-700 block">المزايا والخصائص الرئيسية:</span>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {service.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Requirements */}
                {service.requirements && service.requirements.length > 0 && (
                  <div className="text-[11px] text-slate-500 bg-amber-50/60 border border-amber-100 p-2.5 rounded-xl">
                    <span className="font-bold text-amber-900 block mb-1">المستندات والمتطلبات:</span>
                    <div className="flex flex-wrap gap-1">
                      {service.requirements.map((req, idx) => (
                        <span key={idx} className="bg-white/80 border border-amber-200/80 px-2 py-0.5 rounded text-[10px] text-amber-950 font-medium">
                          • {req}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer & Export */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">مصدر البيانات: {service.sourceName || 'LTT'}</span>
                
                <button
                  onClick={() => {
                    const txt = `بطاقة مواصفات الباقة - شركة ليبيا للاتصالات والتقنية LTT
==========================================================
اسم الخدمة: ${service.name} (${service.nameEn || ''})
التصنيف: ${service.category} (${service.type === 'individual' ? 'أفراد' : 'أعمال'})
السعر والتعريفة: ${service.price}
السعة: ${service.quota || 'حسب التعبئة'}
السرعة: ${service.speed || 'أقصى سرعة متاحة'}
الصلاحية: ${service.validity || 'شهرية'}

الوصف العام:
${service.description}

المزايا الرسمية:
${service.features?.map(f => ` - ${f}`).join('\n') || 'لا توجد مزايا إضافية مدونة'}

المستندات والمتطلبات:
${service.requirements?.map(r => ` - ${r}`).join('\n') || 'الاشتراك القياسي فقط'}
==========================================================
تاريخ الاستخراج: ${new Date().toLocaleDateString('ar-LY')}
`;
                    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `LTT_Package_${service.name.replace(/\s+/g, '_')}.txt`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] rounded-lg transition-all flex items-center gap-1 border border-slate-200"
                >
                  <span>تنزيل مواصفات الباقة (TXT)</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Service Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 text-right shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <PackageCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">
                    {editingService ? 'تعديل الباقة والتعريفة السعرية' : 'إضافة باقة/خدمة جديدة'}
                  </h3>
                  <p className="text-[11px] text-slate-500">تحديث تفاصيل وأسعار وسعات خدمات LTT لتتماشى مع متغيرات السوق</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">اسم الخدمة/الباقة (بالعربية):</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="مثال: باقة Fiber المنزلية 50 Mbps"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">الاسم بالإنجليزي (اختياري):</label>
                  <input
                    type="text"
                    value={formNameEn}
                    onChange={(e) => setFormNameEn(e.target.value)}
                    placeholder="LTT Fiber Home 50M"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono dir-ltr text-left"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">نوع القطاع المستهدف:</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as 'individual' | 'business')}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                  >
                    <option value="individual">خدمات الأفراد</option>
                    <option value="business">خدمات الأعمال والقطاعات</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">التصنيف الفرعي:</label>
                  <input
                    type="text"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    placeholder="مثال: الألياف البصرية / 4G / FWA"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">حالة الباقة:</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as 'active' | 'legacy' | 'upcoming')}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                  >
                    <option value="active">مفعل ومتاح للجمهور</option>
                    <option value="upcoming">قادمة قريباً (عرض ساري)</option>
                    <option value="legacy">إصدار قديم (للمشتركين السابقين)</option>
                  </select>
                </div>
              </div>

              {/* Pricing & Quota Details */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                <div>
                  <label className="font-bold text-blue-900 block mb-1">السعر والتعريفة:</label>
                  <input
                    type="text"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="مثال: 120 د.ل/شهرياً"
                    className="w-full p-2 bg-white border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-blue-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-blue-900 block mb-1">السعة (Quota):</label>
                  <input
                    type="text"
                    value={formQuota}
                    onChange={(e) => setFormQuota(e.target.value)}
                    placeholder="100 جيجابايت / غير محدودة"
                    className="w-full p-2 bg-white border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-blue-900 block mb-1">السرعة (Speed):</label>
                  <input
                    type="text"
                    value={formSpeed}
                    onChange={(e) => setFormSpeed(e.target.value)}
                    placeholder="تصل إلى 50 Mbps"
                    className="w-full p-2 bg-white border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-blue-900 block mb-1">الصلاحية:</label>
                  <input
                    type="text"
                    value={formValidity}
                    onChange={(e) => setFormValidity(e.target.value)}
                    placeholder="30 يوماً / اشتراك سنوي"
                    className="w-full p-2 bg-white border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">وصف الباقة والهدف منها:</label>
                <textarea
                  rows={3}
                  required
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="اكتب وصفاً شاملاً عن الباقة والجمهور المستهدف..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">المزايا والخصائص (سطر لكل ميزة):</label>
                  <textarea
                    rows={4}
                    value={formFeatures}
                    onChange={(e) => setFormFeatures(e.target.value)}
                    placeholder="تغطية واسعة&#10;إنترنت فائق السرعة&#10;دعم فني 24/7"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">المستندات والشروط (سطر لكل شرط):</label>
                  <textarea
                    rows={4}
                    value={formRequirements}
                    onChange={(e) => setFormRequirements(e.target.value)}
                    placeholder="بطاقة الرقم الوطني&#10;حضور صاحب القيد&#10;التحقق من التغطية"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-[11px]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">مرجع القرار / المصدر:</label>
                <input
                  type="text"
                  value={formSourceName}
                  onChange={(e) => setFormSourceName(e.target.value)}
                  placeholder="قرار إدارة تسعير LTT 2026 - الإصدار 3.2"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 font-medium"
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
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-sm flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{editingService ? 'تحديث وتطبيق التعديلات' : 'حفظ ونشر الباقة'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingServiceId && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-right shadow-2xl space-y-4">
            <h3 className="font-extrabold text-base text-slate-900">تأكيد حذف الباقة</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              هل أنت تأكد من إزالة هذه الباقة من دليل الخدمات والمستندات؟ لن تتمكن من استعادتها لاحقاً إذا تمت إزالتها نهائياً.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeletingServiceId(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs"
              >
                تراجع
              </button>
              <button
                onClick={() => handleDeleteService(deletingServiceId)}
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
