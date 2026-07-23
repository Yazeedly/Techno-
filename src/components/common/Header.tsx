import React, { useState } from 'react';
import { UserProfile, PersonaType } from '../../types';
import { Bell, Shield, LogOut, Menu, User, Sparkles, AlertCircle, ChevronDown, Building2 } from 'lucide-react';
import { LTTLogo } from './LTTLogo';

interface HeaderProps {
  user: UserProfile;
  activePersona: PersonaType;
  onPersonaChange: (p: PersonaType) => void;
  onLogout: () => void;
  onToggleSidebar: () => void;
  onNavigate: (view: string) => void;
  unreadNotificationsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  activePersona,
  onPersonaChange,
  onLogout,
  onToggleSidebar,
  onNavigate,
  unreadNotificationsCount = 2,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showBrandNotice, setShowBrandNotice] = useState(false);

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'super_admin': return 'مدير عام النظام (Super Admin)';
      case 'knowledge_admin': return 'مسؤول المعرفة (Knowledge Admin)';
      case 'supervisor': return 'مشرف مراكز (Supervisor)';
      case 'employee': return 'موظف خدمات (Employee)';
      case 'agent': return 'وكيل معتمد (Agent)';
      default: return role;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'knowledge_admin': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'supervisor': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'employee': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'agent': return 'bg-sky-100 text-sky-700 border-sky-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs px-4 py-2.5">
      <div className="flex items-center justify-between gap-3">
        
        {/* Left: Menu toggle & Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
            title="تبديل القائمة الجانبية"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* LTT Official Logo Header Visual */}
          <div 
            onClick={() => onNavigate('dashboard')} 
            className="cursor-pointer group hover:opacity-95 transition-all"
          >
            <LTTLogo size="md" />
          </div>
        </div>

        {/* Center: System Status & Brand Compliance Warning */}
        <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-3 py-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-slate-600 font-medium">قاعدة المعرفة: معتمدة ومحدثة (Q1 2026)</span>
          <button 
            onClick={() => setShowBrandNotice(!showBrandNotice)}
            className="text-[11px] text-blue-600 hover:underline flex items-center gap-1 font-semibold mr-1"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            تنبيه الهوية
          </button>
        </div>

        {/* Right: Notifications & User Profile */}
        <div className="flex items-center gap-3">

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
              title="الإشعارات والتنبيهات"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute left-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 text-right animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-800">التنبيهات والأحداث</span>
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-semibold">2 جديدة</span>
                </div>
                <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                  <div className="p-3 hover:bg-slate-50 transition-colors">
                    <p className="text-xs font-semibold text-slate-800">تحديث دليل باقات Fiber المنزلية</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">تم نشر الإصدار 3.0 بواسطة مسؤول المعرفة سارة العبيدي.</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">منذ ساعتين</span>
                  </div>
                  <div className="p-3 hover:bg-slate-50 transition-colors">
                    <p className="text-xs font-semibold text-amber-700">تنبيه تعارض في الأسعار</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">اكتشاف تعارض بسيط في باقات 4G بين قرار سنة 2025 والجدول الجديد.</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">منذ يوم واحد</span>
                  </div>
                </div>
                <div className="p-2 border-t border-slate-100 text-center">
                  <button 
                    onClick={() => { setShowNotifications(false); onNavigate('notifications'); }}
                    className="text-xs text-blue-600 font-semibold hover:underline"
                  >
                    عرض كافة الإشعارات
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1.5 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                {user.displayName.charAt(0)}
              </div>
              <div className="text-right hidden lg:block">
                <div className="text-xs font-bold text-slate-800 truncate max-w-[120px]">{user.displayName}</div>
                <div className={`text-[10px] px-1.5 py-0.2 rounded border ${getRoleBadgeColor(user.role)}`}>
                  {getRoleLabel(user.role).split(' ')[0]}
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {showUserMenu && (
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 text-right">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="font-bold text-sm text-slate-900">{user.displayName}</p>
                  <p className="text-xs text-slate-500">{user.email}</p>
                  <span className={`mt-2 inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full border ${getRoleBadgeColor(user.role)}`}>
                    {getRoleLabel(user.role)}
                  </span>
                  <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-slate-400" />
                    <span>{user.centerOrAgent}</span>
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => { setShowUserMenu(false); onNavigate('profile'); }}
                    className="w-full text-right px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>الملف الشخصي والإعدادات</span>
                  </button>
                  <button
                    onClick={() => { setShowUserMenu(false); onNavigate('audit'); }}
                    className="w-full text-right px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <Shield className="w-4 h-4 text-slate-400" />
                    <span>سجل النشاطات والأمان</span>
                  </button>
                </div>

                <div className="border-t border-slate-100 pt-1">
                  <button
                    onClick={() => { setShowUserMenu(false); onLogout(); }}
                    className="w-full text-right px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 font-semibold"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span>تسجيل الخروج</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Brand Compliance Notice Modal Banner */}
      {showBrandNotice && (
        <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start justify-between gap-3 animate-in fade-in">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-0.5">تنويه استخدام هوية وشعار LTT:</span>
              استخدام شعار وهوية شركة ليبيا للاتصالات والتقنية LTT في هذا النظام مقيّد بالصلاحيات التشغيلية والمؤسسية المعتمدة للموظفين والوكلاء المعتمدين فقط، ويُحظر استخدامه لأغراض خارج نطاق العمل الرسمي.
            </div>
          </div>
          <button 
            onClick={() => setShowBrandNotice(false)}
            className="text-amber-700 font-bold hover:underline text-xs shrink-0"
          >
            إغلاق
          </button>
        </div>
      )}
    </header>
  );
};
