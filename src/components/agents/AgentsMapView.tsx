import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Search, 
  Download, 
  Edit3, 
  Plus, 
  ExternalLink, 
  Globe2, 
  CheckCircle2, 
  Building2, 
  Smartphone, 
  Wifi, 
  Filter,
  Layers,
  X
} from 'lucide-react';

export interface AgentLocation {
  id: string;
  name: string;
  type: 'main_center' | 'authorized_agent' | 'sales_kiosk';
  cityName: string;
  region: 'طرابلس الكبرى' | 'المنطقة الشرقية' | 'المنطقة الوسطى' | 'الجنوب' | 'المنطقة الغربية';
  address: string;
  phone: string;
  workingHours: string;
  services: string[];
  lat: number;
  lng: number;
  osmBbox: string;
  managerName?: string;
  status: 'active' | 'busy' | 'closed';
}

const INITIAL_AGENTS: AgentLocation[] = [
  {
    id: 'agent-1',
    name: 'مركز خدمات LTT الرئيسي - طرابلس',
    type: 'main_center',
    cityName: 'طرابلس',
    region: 'طرابلس الكبرى',
    address: 'شارع الزاوية، بالقرب من المدار الجديد، طرابلس',
    phone: '021-3344550 / 114',
    workingHours: '08:00 ص - 08:00 م (السبت - الخميس)',
    services: ['تفعيل 4G', 'تسليم أجهزة FWA', 'اشتراكات الفايبر', 'صيانة واستبدال SIM', 'خدمات قطاع الأعمال'],
    lat: 32.8872,
    lng: 13.1913,
    osmBbox: '13.170,32.870,13.210,32.900',
    managerName: 'م. خالد المجدوب',
    status: 'active'
  },
  {
    id: 'agent-2',
    name: 'وكيل المدار والتقنية المعتمد - بن عاشور',
    type: 'authorized_agent',
    cityName: 'طرابلس',
    region: 'طرابلس الكبرى',
    address: 'شارع بن عاشور، مقابل جامع بن عاشور، طرابلس',
    phone: '091-2233445',
    workingHours: '09:00 ص - 09:00 م (يومياً)',
    services: ['تفعيل 4G', 'شحن كروت ورصيد', 'تسليم أجهزة FWA'],
    lat: 32.8780,
    lng: 13.2050,
    osmBbox: '13.180,32.860,13.220,32.890',
    managerName: 'عمر القمودي',
    status: 'active'
  },
  {
    id: 'agent-3',
    name: 'مركز خدمات LTT بنغازي - البركة',
    type: 'main_center',
    cityName: 'بنغازي',
    region: 'المنطقة الشرقية',
    address: 'منطقة البركة، الشارع الرئيسي، بنغازي',
    phone: '061-2233880 / 114',
    workingHours: '08:00 ص - 06:00 م (السبت - الخميس)',
    services: ['تفعيل 4G', 'تسليم أجهزة FWA', 'خدمات الفايبر', 'الدعم الفني والخدمات التجارية'],
    lat: 32.1167,
    lng: 20.0667,
    osmBbox: '20.040,32.100,20.090,32.130',
    managerName: 'م. سالم العقوري',
    status: 'active'
  },
  {
    id: 'agent-4',
    name: 'وكيل المختار الرقمي - الفويهات',
    type: 'authorized_agent',
    cityName: 'بنغازي',
    region: 'المنطقة الشرقية',
    address: 'الفويهات الغربية، قرب مستشفى الأطفال، بنغازي',
    phone: '092-5566778',
    workingHours: '09:00 ص - 08:30 م',
    services: ['تفعيل 4G', 'استبدال شريحة 4G', 'شحن باقات بيتي ومزاجي'],
    lat: 32.0950,
    lng: 20.0800,
    osmBbox: '20.050,32.080,20.100,32.110',
    managerName: 'عبدالسلام الفيتوري',
    status: 'active'
  },
  {
    id: 'agent-5',
    name: 'مركز مبيعات LTT مصراتة - الشارع الغربي',
    type: 'main_center',
    cityName: 'مصراتة',
    region: 'المنطقة الوسطى',
    address: 'الشارع الغربي، بالقرب من الدائري الرابع، مصراتة',
    phone: '051-2626200 / 114',
    workingHours: '08:30 ص - 07:00 م',
    services: ['تفعيل 4G', 'تسليم أجهزة FWA', 'صيانة وأعطال', 'خدمات الشركات والمؤسسات'],
    lat: 32.3754,
    lng: 15.0925,
    osmBbox: '15.070,32.350,15.120,32.390',
    managerName: 'م. مصطفى الشريف',
    status: 'active'
  },
  {
    id: 'agent-6',
    name: 'وكيل زليتن الرقمي المعتمد',
    type: 'authorized_agent',
    cityName: 'زليتن',
    region: 'المنطقة الوسطى',
    address: 'شارع الفندق، وسط مدينة زليتن',
    phone: '091-7788990',
    workingHours: '09:00 ص - 08:00 م',
    services: ['تفعيل 4G', 'شحن كروت بيتي', 'بيع أجهزة الراوتر المحمول'],
    lat: 32.4674,
    lng: 14.5687,
    osmBbox: '14.540,32.450,14.590,32.480',
    managerName: 'علي بن طاهر',
    status: 'active'
  },
  {
    id: 'agent-7',
    name: 'مركز LTT سبها - الميدان العام',
    type: 'main_center',
    cityName: 'سبها',
    region: 'الجنوب',
    address: 'حي القرضة، قرب الميدان العام، سبها',
    phone: '071-2633000 / 114',
    workingHours: '08:30 ص - 04:30 م',
    services: ['تفعيل 4G', 'تسليم راوترات FWA', 'الدعم الفني الميداني'],
    lat: 27.0377,
    lng: 14.4283,
    osmBbox: '14.400,27.020,14.450,27.050',
    managerName: 'م. إبراهيم الحضيري',
    status: 'active'
  },
  {
    id: 'agent-8',
    name: 'فرع LTT الزاوية - شارع عمر المختار',
    type: 'main_center',
    cityName: 'الزاوية',
    region: 'المنطقة الغربية',
    address: 'شارع عمر المختار، وسط الزاوية',
    phone: '023-622110 / 114',
    workingHours: '08:00 ص - 06:00 م',
    services: ['تفعيل 4G', 'تسليم راوترات FWA', 'تسديد الاشتراكات'],
    lat: 32.7522,
    lng: 12.7278,
    osmBbox: '12.700,32.730,12.750,32.770',
    managerName: 'طارق العلاقي',
    status: 'active'
  },
  {
    id: 'agent-9',
    name: 'فرع LTT البيضاء - وسط المدينة',
    type: 'main_center',
    cityName: 'البيضاء',
    region: 'المنطقة الشرقية',
    address: 'شارع المستشفى القديم، البيضاء',
    phone: '084-622334',
    workingHours: '08:30 ص - 05:00 م',
    services: ['تفعيل 4G', 'أجهزة FWA', 'الدعم الفني'],
    lat: 32.7628,
    lng: 21.7551,
    osmBbox: '21.730,32.740,21.780,32.780',
    managerName: 'م. وائل بومداس',
    status: 'active'
  }
];

interface AgentsMapViewProps {
  user?: UserProfile;
}

export const AgentsMapView: React.FC<AgentsMapViewProps> = ({ user }) => {
  const [agents, setAgents] = useState<AgentLocation[]>(INITIAL_AGENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [activeAgent, setActiveAgent] = useState<AgentLocation>(INITIAL_AGENTS[0]);

  // Edit/Add modal state for Admins
  const [showModal, setShowModal] = useState(false);
  const [editingAgent, setEditingAgent] = useState<AgentLocation | null>(null);
  const [formName, setFormName] = useState('');
  const [formCity, setFormCity] = useState('طرابلس');
  const [formRegion, setFormRegion] = useState<any>('طرابلس الكبرى');
  const [formAddress, setFormAddress] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formHours, setFormHours] = useState('');

  const isAdmin = user && ['super_admin', 'knowledge_admin', 'supervisor'].includes(user.role);

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          agent.cityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          agent.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || agent.region === selectedRegion;
    const matchesType = selectedType === 'all' || agent.type === selectedType;

    return matchesSearch && matchesRegion && matchesType;
  });

  const handleOpenAddModal = (agent?: AgentLocation) => {
    if (agent) {
      setEditingAgent(agent);
      setFormName(agent.name);
      setFormCity(agent.cityName);
      setFormRegion(agent.region);
      setFormAddress(agent.address);
      setFormPhone(agent.phone);
      setFormHours(agent.workingHours);
    } else {
      setEditingAgent(null);
      setFormName('');
      setFormCity('طرابلس');
      setFormRegion('طرابلس الكبرى');
      setFormAddress('');
      setFormPhone('091-0000000');
      setFormHours('08:00 ص - 08:00 م');
    }
    setShowModal(true);
  };

  const handleSaveAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formAddress.trim()) return;

    if (editingAgent) {
      setAgents(prev => prev.map(a => a.id === editingAgent.id ? {
        ...a,
        name: formName,
        cityName: formCity,
        region: formRegion,
        address: formAddress,
        phone: formPhone,
        workingHours: formHours,
      } : a));
    } else {
      const newAgent: AgentLocation = {
        id: `agent-${Date.now()}`,
        name: formName,
        type: 'authorized_agent',
        cityName: formCity,
        region: formRegion,
        address: formAddress,
        phone: formPhone,
        workingHours: formHours,
        services: ['تفعيل 4G', 'تسديد الاشتراكات'],
        lat: 32.8872,
        lng: 13.1913,
        osmBbox: '13.170,32.870,13.210,32.900',
        status: 'active'
      };
      setAgents(prev => [newAgent, ...prev]);
    }

    setShowModal(false);
  };

  const handleDownloadDirectory = () => {
    const textData = `دليل المراكز والوكلاء المعتمدين لشركة ليبيا للاتصالات والتقنية (LTT) - 2026
========================================================================

${filteredAgents.map((a, idx) => `
[${idx + 1}] ${a.name}
- النوع: ${a.type === 'main_center' ? 'مركز خدمات رئيسي' : 'وكيل معتمد'}
- المدينة/المنطقة: ${a.cityName} (${a.region})
- العنوان: ${a.address}
- هاتف التواصل: ${a.phone}
- أوقات العمل: ${a.workingHours}
- الخدمات المتاحة: ${a.services.join('، ')}
------------------------------------------------------------------------
`).join('')}`;

    const blob = new Blob([textData], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `LTT_Agents_Directory_2026.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md">
            <Globe2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 text-base sm:text-lg">
              خريطة المراكز والوكلاء المعتمدين (OpenStreetMap LTT)
            </h1>
            <p className="text-xs text-slate-500">
              دليل وتحديد المتركزات الجغرافية لمراكز الخدمة والوكلاء المعتمدين عبر جميع مدن ومناطق ليبيا
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadDirectory}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all flex items-center gap-2 border border-slate-200"
          >
            <Download className="w-4 h-4 text-blue-600" />
            <span>تنزيل دليل الوكلاء (TXT)</span>
          </button>

          {isAdmin && (
            <button
              onClick={() => handleOpenAddModal()}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة وكيل / مركز جديد</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Interactive OpenStreetMap Frame & Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side (Lg Col 7): OpenStreetMap Container & Active Location Card */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs overflow-hidden space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-500" />
                <h3 className="font-bold text-sm text-slate-900">
                  خريطة الموقع المباشرة ({activeAgent.cityName})
                </h3>
              </div>
              <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2.5 py-1 rounded-md border border-blue-200">
                مشغّل بواسطة OpenStreetMap
              </span>
            </div>

            {/* OpenStreetMap Dynamic Iframe Frame */}
            <div className="relative w-full h-[360px] bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
              <iframe
                title="OpenStreetMap LTT Agent Location"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${activeAgent.osmBbox}&layer=mapnik&marker=${activeAgent.lat}%2C${activeAgent.lng}`}
                className="w-full h-full rounded-xl"
              />
            </div>

            {/* Active Selected Agent Quick Details Box */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    activeAgent.type === 'main_center' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-emerald-600 text-white'
                  }`}>
                    {activeAgent.type === 'main_center' ? 'مركز خدمات رئيسي' : 'وكيل معتمد'}
                  </span>
                  <h4 className="font-extrabold text-slate-900 text-base mt-1">
                    {activeAgent.name}
                  </h4>
                </div>

                <a
                  href={`https://www.openstreetmap.org/?mlat=${activeAgent.lat}&mlon=${activeAgent.lng}#map=16/${activeAgent.lat}/${activeAgent.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline font-bold flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs"
                >
                  <span>فتح في OpenStreetMap</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-200/80">
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span><strong>العنوان:</strong> {activeAgent.address}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span><strong>الهاتف:</strong> {activeAgent.phone}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span><strong>أوقات العمل:</strong> {activeAgent.workingHours}</span>
                </p>
                {activeAgent.managerName && (
                  <p className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span><strong>المسؤول:</strong> {activeAgent.managerName}</span>
                  </p>
                )}
              </div>

              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-500 block mb-1.5">الخدمات المدعومة بالمركز:</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeAgent.services.map((s, idx) => (
                    <span key={idx} className="bg-white text-slate-700 text-[10px] font-bold px-2 py-1 rounded-md border border-slate-200">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Right Side (Lg Col 5): Search, Filters & Agents List */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث بالمدينة، اسم المركز، أو العنوان..."
                className="w-full pr-9 pl-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Region & Type Filters */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-bold text-slate-500 block mb-1">تصفية حسب المنطقة</label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-semibold"
                >
                  <option value="all">كل المناطق (ليبيا)</option>
                  <option value="طرابلس الكبرى">طرابلس الكبرى</option>
                  <option value="المنطقة الشرقية">المنطقة الشرقية</option>
                  <option value="المنطقة الوسطى">المنطقة الوسطى</option>
                  <option value="الجنوب">الجنوب (سبها)</option>
                  <option value="المنطقة الغربية">المنطقة الغربية</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 block mb-1">نوع المركز</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-semibold"
                >
                  <option value="all">كل الأنواع</option>
                  <option value="main_center">مركز رئيسي LTT</option>
                  <option value="authorized_agent">وكيل معتمد</option>
                </select>
              </div>
            </div>

            <div className="text-[11px] font-bold text-slate-500 flex justify-between items-center pt-1 border-t border-slate-100">
              <span>عرض النتائج: {filteredAgents.length} وكيل ومركز</span>
              <span>تحديث 2026</span>
            </div>

            {/* Agents List Cards */}
            <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
              {filteredAgents.map((agent) => (
                <div
                  key={agent.id}
                  onClick={() => setActiveAgent(agent)}
                  className={`p-3.5 rounded-xl border text-right cursor-pointer transition-all ${
                    activeAgent.id === agent.id
                      ? 'bg-blue-50/80 border-blue-500 shadow-xs ring-1 ring-blue-400'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${
                          agent.type === 'main_center' ? 'bg-blue-600' : 'bg-emerald-500'
                        }`} />
                        <h4 className="font-bold text-slate-900 text-xs">{agent.name}</h4>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{agent.address}</p>
                    </div>

                    <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-md shrink-0">
                      {agent.cityName}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 mt-2 border-t border-slate-100">
                    <span>📞 {agent.phone}</span>
                    {isAdmin && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenAddModal(agent);
                        }}
                        className="text-blue-600 hover:underline font-bold flex items-center gap-0.5"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>تعديل</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-base">
                {editingAgent ? 'تعديل بيانات المركز / الوكيل' : 'إضافة مركز أو وكيل معتمد جديد'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAgent} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">اسم المركز أو الوكيل</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">المدينة</label>
                  <input
                    type="text"
                    required
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">المنطقة</label>
                  <select
                    value={formRegion}
                    onChange={(e) => setFormRegion(e.target.value as any)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  >
                    <option value="طرابلس الكبرى">طرابلس الكبرى</option>
                    <option value="المنطقة الشرقية">المنطقة الشرقية</option>
                    <option value="المنطقة الوسطى">المنطقة الوسطى</option>
                    <option value="الجنوب">الجنوب</option>
                    <option value="المنطقة الغربية">المنطقة الغربية</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">العنوان بالتفصيل</label>
                <input
                  type="text"
                  required
                  value={formAddress}
                  onChange={(e) => setFormAddress(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">رقم الهاتف</label>
                  <input
                    type="text"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">أوقات العمل</label>
                  <input
                    type="text"
                    required
                    value={formHours}
                    onChange={(e) => setFormHours(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md"
                >
                  حفظ البيانات
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
