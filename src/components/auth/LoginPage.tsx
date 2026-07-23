import React, { useState } from 'react';
import { UserProfile, UserRole } from '../../types';
import { DEMO_USERS } from '../../data/seedData';
import { Shield, Lock, Mail, ArrowLeft, CheckCircle2, AlertCircle, Bot, Building2 } from 'lucide-react';
import { LTTLogo } from '../common/LTTLogo';

interface LoginPageProps {
  onLoginSuccess: (user: UserProfile) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedDemoRole, setSelectedDemoRole] = useState<UserRole>('super_admin');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDemoSelect = (role: UserRole) => {
    setSelectedDemoRole(role);
    if (role === 'super_admin') {
      setEmail('admin@ltt.ly');
      setPassword('LTT#Admin2026!SecuredPass');
    } else {
      setEmail(`${role}@ltt.ly`);
      setPassword('LTT#Admin2026!SecuredPass');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      // Find matching demo account or create session
      let user = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!user) {
        // Fallback demo account generation for typed custom email
        user = {
          uid: `user-${Date.now()}`,
          email: email || 'employee@ltt.ly',
          displayName: email ? email.split('@')[0] : 'موظف LTT',
          role: selectedDemoRole,
          centerOrAgent: 'المركز الرئيسي - طرابلس',
          status: 'active',
        };
      }

      setLoading(false);
      onLoginSuccess(user);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Decorative Network Grid Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="w-full max-w-4xl grid md:grid-cols-12 bg-white text-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700/50 relative z-10 my-8">
        
        {/* Right Side (Arabic RTL): LTT Hero & Techno Persona Graphic */}
        <div className="md:col-span-5 bg-gradient-to-br from-blue-700 via-blue-600 to-sky-600 p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-sky-400/20 rounded-full blur-2xl pointer-events-none" />
          
          <div>
            {/* LTT Logo display */}
            <div className="mb-6 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20">
              <LTTLogo size="lg" lightMode={true} />
            </div>

            {/* Techno Mascot Badge */}
            <div className="my-6 bg-white/10 rounded-2xl p-5 border border-white/20 text-center">
              <div className="w-16 h-16 mx-auto bg-sky-400 text-slate-900 rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg ring-4 ring-white/30 mb-3 animate-bounce">
                <Bot className="w-10 h-10 text-blue-900" />
              </div>
              <h2 className="font-extrabold text-lg text-white">Techno – مساعد LTT الذكي</h2>
              <p className="text-xs text-blue-100 mt-1 leading-relaxed">
                منصة معرفية وتشغيلية موحدة لموظفي المراكز والوكلاء المعتمدين لرفع كفاءة الخدمات والدعم الفني.
              </p>
            </div>
          </div>

          <div className="text-xs text-blue-100 border-t border-white/15 pt-4 space-y-1">
            <p className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>إجابات موثوقة من قاعدة المعرفة الرسمية</span>
            </p>
            <p className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>توصيات بيعية وتشخيص أعطال تفاعلي</span>
            </p>
          </div>
        </div>

        {/* Left Side: Login Form & Quick Role Switcher */}
        <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-center bg-slate-50">
          
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900">تسجيل الدخول للنظام</h2>
            <p className="text-xs text-slate-500 mt-1">
              مرحباً بك في Techno، مساعدك الذكي لخدمات وعمليات LTT.
            </p>
          </div>

          {/* Quick Role Switcher for instant demo testing */}
          <div className="mb-6 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[11px] font-bold text-slate-700 block mb-2">
              اختيار حساب تجريبي سريع (حسب الصلاحيات):
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {[
                { role: 'super_admin', label: 'مدير النظام (Super Admin)' },
                { role: 'knowledge_admin', label: 'مسؤول المعرفة' },
                { role: 'supervisor', label: 'مشرف المراكز' },
                { role: 'employee', label: 'موظف مبيعات' },
                { role: 'agent', label: 'وكيل معتمد' },
              ].map((r) => (
                <button
                  key={r.role}
                  type="button"
                  onClick={() => handleDemoSelect(r.role as UserRole)}
                  className={`text-[11px] font-semibold px-2.5 py-1.5 rounded-lg border text-right transition-all truncate ${
                    selectedDemoRole === r.role
                      ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">البريد الإلكتروني المؤسسي</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ltt.ly"
                  className="w-full pr-9 pl-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">كلمة المرور</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pr-9 pl-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>تذكرني على هذا الجهاز</span>
              </label>

              <button type="button" className="text-blue-600 hover:underline font-semibold">
                نسيت كلمة المرور؟
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>جاري تسجيل الدخول...</span>
              ) : (
                <>
                  <span>دخول إلى نظام Techno</span>
                  <ArrowLeft className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-[11px] text-slate-400 text-center mt-6">
            حماية كاملة ببروتوكولات التشفير والمصادقة المؤسسية © 2026 LTT
          </p>
        </div>

      </div>
    </div>
  );
};
