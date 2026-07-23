import React from 'react';
import { UserRole } from '../../types';
import { LTTLogo } from './LTTLogo';
import { 
  LayoutDashboard, 
  MessageSquareText, 
  Calculator, 
  Wrench, 
  BookOpen, 
  PackageCheck, 
  FileText, 
  GraduationCap, 
  Upload, 
  GitCompare, 
  ShieldAlert, 
  FlaskConical, 
  Settings, 
  Users, 
  BarChart3,
  Sparkles,
  MapPin
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  userRole: UserRole;
  onNavigate: (view: string) => void;
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  userRole,
  onNavigate,
  isOpen,
}) => {
  const isSuperOrKnowledgeAdmin = userRole === 'super_admin' || userRole === 'knowledge_admin';
  const isSupervisorOrAbove = isSuperOrKnowledgeAdmin || userRole === 'supervisor';

  const menuGroups = [
    {
      title: 'المساعد الذكي',
      items: [
        { id: 'dashboard', label: 'الرئيسية', icon: LayoutDashboard },
        { id: 'chat', label: 'محادثة Techno', icon: MessageSquareText, badge: 'AI' },
        { id: 'sales', label: 'حاسبة التوصيات البيعية', icon: Calculator },
        { id: 'support', label: 'المساعد التشخيصي', icon: Wrench },
      ],
    },
    {
      title: 'دليل المنتجات والمعرفة',
      items: [
        { id: 'agents', label: 'خريطة المراكز والوكلاء', icon: MapPin },
        { id: 'knowledge', label: 'قاعدة المعرفة LTT', icon: BookOpen },
        { id: 'services', label: 'دليل الخدمات والباقات', icon: PackageCheck },
        { id: 'operations', label: 'الإجراءات التشغيلية', icon: FileText },
        { id: 'training', label: 'التدريب والاختبارات', icon: GraduationCap },
      ],
    },
  ];

  if (isSupervisorOrAbove) {
    menuGroups.push({
      title: 'إدارة المحتوى والتعارضات',
      items: [
        { id: 'upload', label: 'رفع ومعالجة المستندات', icon: Upload },
        { id: 'conflicts', label: 'مركز التعارضات', icon: GitCompare, badge: 'تنبيه' },
      ],
    });
  }

  if (isSuperOrKnowledgeAdmin) {
    menuGroups.push({
      title: 'إدارة النظام والذكاء الاصطناعي',
      items: [
        { id: 'admin-users', label: 'إدارة المستخدمين والصلاحيات', icon: Users },
        { id: 'test-lab', label: 'مختبر اختبار AI Test Lab', icon: FlaskConical },
        { id: 'prompt-manager', label: 'إدارة التوجيهات Prompts', icon: Sparkles },
        { id: 'analytics', label: 'التقارير والتحليلات', icon: BarChart3 },
        { id: 'audit', label: 'سجل التدقيق والنشاطات', icon: ShieldAlert },
        { id: 'settings', label: 'إعدادات النظام والربط', icon: Settings },
      ],
    });
  }

  return (
    <aside
      className={`${
        isOpen ? 'w-64' : 'w-0 sm:w-16'
      } transition-all duration-300 bg-slate-900 text-slate-300 border-l border-slate-800 flex flex-col shrink-0 overflow-hidden z-20 select-none`}
    >
      {/* Upper Brand Badge */}
      <div className="p-3.5 border-b border-slate-800 flex items-center justify-between">
        <LTTLogo size="sm" showText={isOpen} lightMode={true} />
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-6">
        {menuGroups.map((group, idx) => (
          <div key={idx}>
            {isOpen && (
              <h3 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                {group.title}
              </h3>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id || currentView.startsWith(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                    title={item.label}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      {isOpen && <span className="truncate">{item.label}</span>}
                    </div>
                    {isOpen && item.badge && (
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                        isActive ? 'bg-white/20 text-white' : 'bg-blue-900/60 text-blue-300'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Footer info */}
      {isOpen && (
        <div className="p-3 border-t border-slate-800 bg-slate-950/40 text-[11px] text-slate-400 text-center">
          <p className="font-medium text-slate-300">ليبيا للاتصالات والتقنية</p>
          <p className="text-[10px]">جميع الحقوق محفوظة © 2026</p>
        </div>
      )}
    </aside>
  );
};
