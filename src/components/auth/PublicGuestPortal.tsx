import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { LTTLogo } from '../common/LTTLogo';
import { SalesWizardView } from '../sales/SalesWizardView';
import { ChatView } from '../chat/ChatView';
import { AgentsMapView } from '../agents/AgentsMapView';
import { ServicesCatalogView } from '../knowledge/ServicesCatalogView';
import { 
  Bot, 
  Sparkles, 
  Calculator, 
  MapPin, 
  BookOpen, 
  Lock, 
  ArrowLeft, 
  CheckCircle2, 
  Globe2, 
  ChevronLeft,
  Flame
} from 'lucide-react';

interface PublicGuestPortalProps {
  onGoToLogin: () => void;
  onLoginAsGuest: (user: UserProfile) => void;
}

export const PublicGuestPortal: React.FC<PublicGuestPortalProps> = ({ 
  onGoToLogin,
  onLoginAsGuest 
}) => {
  const [activeTab, setActiveTab] = useState<'wizard' | 'chat' | 'agents' | 'services'>('wizard');

  const guestUser: UserProfile = {
    uid: 'guest-visitor',
    email: 'visitor@ltt.ly',
    displayName: 'زائر محترم (Guest Visitor)',
    role: 'employee',
    centerOrAgent: 'بوابة الزوار والجمهور',
    region: 'طرابلس الكبرى',
    status: 'active'
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans text-right" dir="rtl">
      
      {/* Top Public Header */}
      <header className="bg-slate-950/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-4 sm:px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <LTTLogo size="md" lightMode={true} />
            <div className="hidden md:block h-6 w-px bg-slate-800" />
            <span className="text-xs text-slate-400 font-medium hidden md:inline">
              البوابة التفاعلية الرسمية لاستشارات الباقات والوكلاء المعتمدين © 2026
            </span>
          </div>

          {/* Guest Navigation Tabs & Employee Login Button */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveTab('wizard')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'wizard'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>توصية الباقات</span>
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'chat'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>المساعد Techno</span>
            </button>

            <button
              onClick={() => setActiveTab('agents')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'agents'
                  ? 'bg-sky-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>خريطة الوكلاء</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'services'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>دليل الباقات</span>
            </button>

            <div className="h-5 w-px bg-slate-800 mx-1 hidden sm:block" />

            <button
              onClick={onGoToLogin}
              className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>دخول الموظفين والمدراء</span>
            </button>
          </div>

        </div>
      </header>

      {/* Hero Opening Banner */}
      <div className="bg-gradient-to-b from-slate-950 to-slate-900 border-b border-slate-800 py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-3 py-0.5 rounded-full border border-emerald-500/30">
                بوابة الخدمة المباشرة للجمهور والمشتركين
              </span>
              <span className="bg-blue-500/20 text-blue-300 text-[10px] font-bold px-3 py-0.5 rounded-full border border-blue-500/30">
                LTT 2026
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              مرحباً بك في المنصة التفاعلية المستقلة لشركة ليبيا للاتصالات والتقنية LTT
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              يمكنك استخدام حاسبة التوصية التفاعلية لاختيار أفضل باقة إنترنت منزلية أو شخصية، الاستفسار المباشر عبر المساعد الذكي Techno، أو تحديد أقرب وكيل معتمد عبر خريطة OpenStreetMap.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onLoginAsGuest(guestUser)}
              className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-xs rounded-xl transition-all"
            >
              استكشاف المنصة الكاملة
            </button>
          </div>
        </div>
      </div>

      {/* Main Public Interactive Content Region */}
      <main className="flex-1 bg-slate-100 text-slate-800">
        {activeTab === 'wizard' && (
          <div className="py-4">
            <SalesWizardView />
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="py-4">
            <ChatView user={guestUser} initialPersona="techno" />
          </div>
        )}

        {activeTab === 'agents' && (
          <div className="py-4">
            <AgentsMapView user={guestUser} />
          </div>
        )}

        {activeTab === 'services' && (
          <div className="py-4">
            <ServicesCatalogView user={guestUser} />
          </div>
        )}
      </main>

      {/* Public Footer */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 py-6 px-4 text-center text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 شركة ليبيا للاتصالات والتقنية (LTT) - جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>مركز اتصالات الدعم الفني: 114</span>
            <span>•</span>
            <span>الموقع الرسمي: ltt.ly</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
