import React, { useState } from 'react';
import { UserProfile, UserRole, SystemPromptVersion, AuditLogItem } from '../../types';
import { DEMO_USERS, PERSONAS } from '../../data/seedData';
import { KnowledgeProvider } from '../../services/knowledge';
import { 
  Users, 
  FlaskConical, 
  Sparkles, 
  ShieldAlert, 
  Settings, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Edit3, 
  Trash2, 
  Send, 
  Sliders,
  Database,
  Lock,
  RotateCcw
} from 'lucide-react';

interface AdminViewProps {
  user: UserProfile;
  initialTab?: string;
}

export const AdminView: React.FC<AdminViewProps> = ({ user, initialTab = 'users' }) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  // User Management State
  const [usersList, setUsersList] = useState<UserProfile[]>(DEMO_USERS);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState<UserProfile | null>(null);

  // AI Test Lab State
  const [testQuery, setTestQuery] = useState('ما هي متطلبات استبدال شريحة SIM 4G؟');
  const [testPersona, setTestPersona] = useState('techno');
  const [testUserRole, setTestUserRole] = useState<UserRole>('employee');
  const [testPromptVersion, setTestPromptVersion] = useState('v2.1 - المعتمدة');
  const [testRunning, setTestRunning] = useState(false);
  const [testResult, setTestResult] = useState<{
    outputResponse: string;
    confidenceScore: string;
    evaluation: string;
  } | null>(null);

  // Prompt Manager State
  const [promptVersions, setPromptVersions] = useState<SystemPromptVersion[]>([
    {
      id: 'pv-01',
      persona: 'techno',
      promptText: 'أنت Techno المساعد الذكي لموظفي LTT. الإجابة بالعربية فقط بالاعتماد حصرياً على المقاطع المعتمدة المرفقة.',
      version: '2.1',
      status: 'active',
      approvedBy: 'أحمد الترهوني',
      createdAt: '2026-02-01',
    },
    {
      id: 'pv-02',
      persona: 'techno_sales',
      promptText: 'أنت Techno Sales مستشار المبيعات التفاعلي لـ LTT. ركز على تحليل الاحتياج واقتراح الفرص المضافة.',
      version: '2.0',
      status: 'active',
      approvedBy: 'سارة العبيدي',
      createdAt: '2026-02-10',
    },
  ]);

  // Audit Logs State
  const [auditLogs] = useState<AuditLogItem[]>([
    {
      id: 'log-01',
      userId: 'demo-superadmin',
      userEmail: 'admin@ltt.ly',
      action: 'تعديل توجيهات النظام (Prompt)',
      details: 'تم تحديث التوجيهات لشخصية Techno Sales للإصدار v2.0',
      timestamp: '2026-03-15 10:30',
    },
    {
      id: 'log-02',
      userId: 'demo-knowledgeadmin',
      userEmail: 'knowledge@ltt.ly',
      action: 'اعتماد مستند معرفي',
      details: 'اعتماد "دليل باقات Fiber المنزلية v3.0"',
      timestamp: '2026-03-14 14:15',
    },
  ]);

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    setUsersList(prev => prev.map(u => u.uid === userId ? { ...u, role: newRole } : u));
    setSelectedUserForEdit(null);
  };

  const handleRunTestLab = async () => {
    setTestRunning(true);
    setTestResult(null);

    try {
      const chunks = await KnowledgeProvider.retrieveRelevantChunks(testQuery, 3);
      
      const res = await fetch('/api/test-lab', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testQuery,
          promptVersion: testPromptVersion,
          chunks,
        }),
      });

      const data = await res.json();
      setTestResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setTestRunning(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-700 text-white flex items-center justify-center font-bold shadow-md">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 text-base sm:text-lg">مركز إدارة النظام والذكاء الاصطناعي (Admin Center)</h1>
            <p className="text-xs text-slate-500">إدارة الصلاحيات، اختبار التوجيهات، وسجلات التدقيق المؤسسية لـ LTT</p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold flex-wrap">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'users' ? 'bg-white text-purple-700 shadow-2xs' : 'text-slate-600'
            }`}
          >
            إدارة المستخدمين
          </button>
          <button
            onClick={() => setActiveTab('test-lab')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'test-lab' ? 'bg-white text-purple-700 shadow-2xs' : 'text-slate-600'
            }`}
          >
            مختبر AI Test Lab
          </button>
          <button
            onClick={() => setActiveTab('prompts')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'prompts' ? 'bg-white text-purple-700 shadow-2xs' : 'text-slate-600'
            }`}
          >
            إدارة Prompts
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'audit' ? 'bg-white text-purple-700 shadow-2xs' : 'text-slate-600'
            }`}
          >
            سجل التدقيق
          </button>
        </div>
      </div>

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-600" />
                <span>إدارة المستخدمين والتراخيص والصلاحيات المؤسسية</span>
              </h3>
              <p className="text-xs text-slate-500">التحكم الفردي والمؤسسي بالصلاحيات وتراخيص الوصول لموظفي LTT والوكلاء</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const txt = `قائمة مستخدمي نظام LTT Techno
=========================================
${usersList.map((u, i) => `[${i+1}] ${u.displayName} (${u.email})
   الدور: ${u.role} | الفرع: ${u.centerOrAgent} | الحالة: ${u.status || 'نشط'}`).join('\n\n')}`;
                  const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = 'LTT_Users_Permissions_List.txt';
                  link.click();
                  URL.revokeObjectURL(url);
                }}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-200"
              >
                تنزيل السجل
              </button>

              <button
                onClick={() => {
                  setSelectedUserForEdit({
                    uid: `user-${Date.now()}`,
                    email: '',
                    displayName: '',
                    role: 'employee',
                    centerOrAgent: 'مركز طرابلس الرئيسي',
                    region: 'طرابلس الكبرى',
                    status: 'active'
                  });
                }}
                className="px-4 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة مستخدم وترخيص جديد</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <th className="p-3">الاسم والبريد</th>
                  <th className="p-3">الدور / نوع الترخيص</th>
                  <th className="p-3">المركز / الفرع</th>
                  <th className="p-3">المنطقة</th>
                  <th className="p-3">حالة الحساب</th>
                  <th className="p-3">الإجراءات والتحكم</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {usersList.map((u) => (
                  <tr key={u.uid} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3">
                      <p className="font-bold text-slate-900">{u.displayName}</p>
                      <p className="text-[11px] text-slate-400">{u.email}</p>
                    </td>
                    <td className="p-3">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md border ${
                        u.role === 'super_admin' ? 'bg-purple-100 text-purple-900 border-purple-300' :
                        u.role === 'knowledge_admin' ? 'bg-blue-100 text-blue-900 border-blue-300' :
                        u.role === 'supervisor' ? 'bg-amber-100 text-amber-900 border-amber-300' :
                        'bg-slate-100 text-slate-800 border-slate-200'
                      }`}>
                        {u.role === 'super_admin' ? 'مدير النظام (Super Admin)' :
                         u.role === 'knowledge_admin' ? 'مدير المعرفة' :
                         u.role === 'supervisor' ? 'مشرف المراكز' :
                         u.role === 'agent' ? 'وكيل معتمد' : 'موظف مبيعات ودعم'}
                      </span>
                    </td>
                    <td className="p-3 text-slate-600">{u.centerOrAgent}</td>
                    <td className="p-3 text-slate-600">{u.region}</td>
                    <td className="p-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        u.status === 'disabled' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {u.status === 'disabled' ? 'معلق / محظور' : 'نشط ومعتمد'}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedUserForEdit(u)}
                          className="text-blue-600 font-bold hover:underline"
                        >
                          تعديل الصلاحيات
                        </button>

                        {u.role !== 'super_admin' && (
                          <button
                            onClick={() => {
                              setUsersList(prev => prev.filter(x => x.uid !== u.uid));
                            }}
                            className="text-red-500 font-bold hover:underline"
                          >
                            حذف
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* AI Test Lab Tab */}
      {activeTab === 'test-lab' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-purple-600" />
                <span>مختبر اختبار المساعد والتقييم المعرفي (AI Test Lab)</span>
              </h3>
              <p className="text-xs text-slate-500">إدخال أسئلة اختيارية، محاكاة الأدوار، واختبار درجة الالتزام بقاعدة المعرفة بدون هلوسة</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            
            {/* Input Controls */}
            <div className="lg:col-span-5 space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">السؤال التجريبي (Test Query):</label>
                <textarea
                  rows={3}
                  value={testQuery}
                  onChange={(e) => setTestQuery(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">شخصية المساعد الاختيارية:</label>
                <select
                  value={testPersona}
                  onChange={(e) => setTestPersona(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                >
                  <option value="techno">Techno (المساعد الرئيسي)</option>
                  <option value="techno_sales">Techno Sales (المبيعات)</option>
                  <option value="techno_support">Techno Support (الدعم الفني)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">إصدار التوجيهات (System Prompt Version):</label>
                <input
                  type="text"
                  value={testPromptVersion}
                  onChange={(e) => setTestPromptVersion(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>

              <button
                onClick={handleRunTestLab}
                disabled={testRunning}
                className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                {testRunning ? <span>جاري معالجة الاختبار...</span> : <><span>تشغيل محاكاة الاختبار</span><FlaskConical className="w-4 h-4" /></>}
              </button>
            </div>

            {/* Test Result Output */}
            <div className="lg:col-span-7 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-700 block">مخرجات وتقييم نتائج الاختبار:</span>
              
              {testResult ? (
                <div className="space-y-3 text-xs animate-in fade-in">
                  <div className="p-3 bg-white border border-slate-200 rounded-xl">
                    <span className="font-bold text-purple-700 block mb-1">الإجابة المولّدة:</span>
                    <p className="text-slate-800 leading-relaxed">{testResult.outputResponse}</p>
                  </div>

                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 font-bold">
                    <span>درجة الموثوقية: </span>
                    <span>{testResult.confidenceScore}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400 text-xs">
                  اضغط على "تشغيل محاكاة الاختبار" لعرض النتيجة والتقييم الفوري.
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Prompts Tab */}
      {activeTab === 'prompts' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>إدارة التوجيهات وقواعد الشخصيات (Prompts & Persona Management)</span>
            </h3>
          </div>

          <div className="space-y-3">
            {promptVersions.map((pv) => (
              <div key={pv.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">شخصية: {pv.persona} (v{pv.version})</span>
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                    {pv.status}
                  </span>
                </div>
                <p className="bg-white p-3 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-800">
                  {pv.promptText}
                </p>
                <div className="flex justify-between text-[10px] text-slate-400 pt-1">
                  <span>اعتمد بواسطة: {pv.approvedBy}</span>
                  <span>تاريخ الاعتماد: {pv.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Audit Logs Tab */}
      {activeTab === 'audit' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <ShieldAlert className="w-4 h-4 text-purple-600" />
            <span>سجل التدقيق والنشاطات المؤسسية (Audit Trail)</span>
          </h3>

          <div className="space-y-2">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">{log.action}</span>
                  <p className="text-slate-500 text-[11px] mt-0.5">{log.details}</p>
                </div>
                <div className="text-left">
                  <span className="text-[10px] text-purple-700 font-bold block">{log.userEmail}</span>
                  <span className="text-[10px] text-slate-400 block">{log.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit/Add User Modal */}
      {selectedUserForEdit && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-right space-y-4 shadow-2xl border border-slate-200">
            <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-2">
              {usersList.some(u => u.uid === selectedUserForEdit.uid) ? 'تعديل بيانات المستخدم والترخيص' : 'إضافة مستخدم جديد واعتماد الترخيص'}
            </h3>
            
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">الاسم الكامل للموظف / الوكيل</label>
                <input
                  type="text"
                  value={selectedUserForEdit.displayName}
                  onChange={(e) => setSelectedUserForEdit({ ...selectedUserForEdit, displayName: e.target.value })}
                  placeholder="مثال: أحمد عبدالسلام"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">البريد الإلكتروني المؤسسي</label>
                <input
                  type="email"
                  value={selectedUserForEdit.email}
                  onChange={(e) => setSelectedUserForEdit({ ...selectedUserForEdit, email: e.target.value })}
                  placeholder="name@ltt.ly"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">نوع الدور / الترخيص</label>
                  <select
                    value={selectedUserForEdit.role}
                    onChange={(e) => setSelectedUserForEdit({ ...selectedUserForEdit, role: e.target.value as UserRole })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-slate-800"
                  >
                    <option value="super_admin">مدير النظام (Super Admin)</option>
                    <option value="knowledge_admin">مدير قواعد المعرفة</option>
                    <option value="supervisor">مشرف مراكز ووكلاء</option>
                    <option value="employee">موظف مبيعات ودعم</option>
                    <option value="agent">وكيل معتمد</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">حالة الحساب والترخيص</label>
                  <select
                    value={selectedUserForEdit.status || 'active'}
                    onChange={(e) => setSelectedUserForEdit({ ...selectedUserForEdit, status: e.target.value as any })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-slate-800"
                  >
                    <option value="active">نشط ومعتمد (Active)</option>
                    <option value="disabled">معلق / حظر موقت (Disabled)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">المركز / الفرع أو وكالة الخدمة</label>
                <input
                  type="text"
                  value={selectedUserForEdit.centerOrAgent}
                  onChange={(e) => setSelectedUserForEdit({ ...selectedUserForEdit, centerOrAgent: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>

              <div>
                <span className="block font-bold text-slate-700 mb-1">تراخيص الوصول والصلاحيات الممنوحة:</span>
                <div className="space-y-1.5 p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px]">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-purple-600" />
                    <span>تعديل الباقات ومواصفات الخدمات الرسمية</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-purple-600" />
                    <span>رفع وتحديث مستندات قواعد المعرفة وخطوات التشخيص</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked={selectedUserForEdit.role === 'super_admin'} className="rounded text-purple-600" />
                    <span>تصدير وتنزيل السجلات وتقارير المبيعات ودليل الوكلاء</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked={selectedUserForEdit.role === 'super_admin'} className="rounded text-purple-600" />
                    <span>إدارة الموظفين والترخيصات وحظر الحسابات</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedUserForEdit(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs"
              >
                إلغاء
              </button>
              <button
                onClick={() => {
                  if (selectedUserForEdit.displayName && selectedUserForEdit.email) {
                    setUsersList(prev => {
                      const exists = prev.some(u => u.uid === selectedUserForEdit.uid);
                      if (exists) {
                        return prev.map(u => u.uid === selectedUserForEdit.uid ? selectedUserForEdit : u);
                      } else {
                        return [selectedUserForEdit, ...prev];
                      }
                    });
                    setSelectedUserForEdit(null);
                  }
                }}
                className="px-5 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl text-xs shadow-md"
              >
                حفظ وحفظ الترخيص
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
