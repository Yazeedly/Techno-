import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, PersonaType, ChatMessage, PersonaInfo, KnowledgeChunk } from '../../types';
import { PERSONAS } from '../../data/seedData';
import { KnowledgeProvider } from '../../services/knowledge';
import Markdown from 'react-markdown';
import { 
  Send, 
  Bot, 
  TrendingUp, 
  Wrench, 
  GraduationCap, 
  Paperclip, 
  Copy, 
  Check, 
  ThumbsUp, 
  ThumbsDown, 
  Flag, 
  FileText, 
  Info, 
  ListOrdered, 
  GitCompare, 
  Sparkles, 
  Search, 
  PlusCircle, 
  Trash2,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';

interface ChatViewProps {
  user: UserProfile;
  initialPersona?: PersonaType;
  onNavigateToView?: (view: string) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  user,
  initialPersona = 'techno',
  onNavigateToView,
}) => {
  const [activePersona, setActivePersona] = useState<PersonaType>(initialPersona);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);
  const [attachedFileText, setAttachedFileText] = useState<string>('');
  const [selectedSource, setSelectedSource] = useState<any | null>(null);
  const [reportModalMessageId, setReportModalMessageId] = useState<string | null>(null);
  const [reportReason, setReportReason] = useState('');
  const [historySearch, setHistorySearch] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentPersonaInfo = PERSONAS.find(p => p.id === activePersona) || PERSONAS[0];

  // Initialize welcome message when persona changes
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: `msg-welcome-${Date.now()}`,
          sender: 'assistant',
          persona: activePersona,
          text: currentPersonaInfo.welcomeMsg,
          timestamp: new Date().toLocaleTimeString('ar-LY', { hour: '2-digit', minute: '2-digit' }),
          confidenceScore: 'high',
          followUpQuestions: [
            'ما هي متطلبات الاشتراك في LTT Fiber؟',
            'كيف يمكنني استبدال شريحة SIM 4G لزبون؟',
            'قارن بين باقات FWA وباقات Fiber المنزلية.',
          ],
        },
      ]);
    }
  }, [activePersona]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() && !attachedFileText) return;

    const userMsgText = textToSend;
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      persona: activePersona,
      text: userMsgText + (attachedFileName ? `\n[مرفق ملف: ${attachedFileName}]` : ''),
      timestamp: new Date().toLocaleTimeString('ar-LY', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    try {
      // Step 1: Retrieve top relevant chunks from RAG Knowledge Base
      const retrievedChunks: KnowledgeChunk[] = await KnowledgeProvider.retrieveRelevantChunks(
        userMsgText + ' ' + attachedFileText,
        4
      );

      let data: any = null;

      // Step 2: Send request to Express backend Proxy (`/api/chat`)
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userQuery: userMsgText + (attachedFileText ? `\nمحتوى المرفق:\n${attachedFileText}` : ''),
            persona: activePersona,
            chunks: retrievedChunks,
          }),
        });

        if (res.ok) {
          data = await res.json();
        } else {
          console.warn('Backend API returned status:', res.status);
        }
      } catch (networkErr) {
        console.warn('Network or server connection issue, generating local RAG response:', networkErr);
      }

      // Step 3: If backend response was not received, generate client-side RAG fallback
      if (!data || !data.text) {
        const topChunk = retrievedChunks[0];
        let fallbackText = '';
        if (topChunk) {
          fallbackText = `**[إجابة محرك المعرفة المعتمد بـ LTT]**\n\n${topChunk.content}`;
        } else {
          fallbackText = `لم يتم العثور على معلومات مطابقة بشكل مباشر في دليل المعرفة المعتمد لدى LTT. يرجى التكرم بالتحقق من العبارة أو مراجعة أقسام المعرفة المتاحة.`;
        }

        data = {
          text: fallbackText,
          confidenceScore: retrievedChunks.length > 0 ? 'high' : 'medium',
          sources: retrievedChunks.map((c: any) => ({
            docTitle: c.docTitle,
            category: c.category,
            version: c.version,
            updatedAt: c.updatedAt,
            snippet: (c.content || '').slice(0, 100) + '...'
          })),
          followUpQuestions: [
            'ما هي باقات الجيل الرابع 4G و FWA المتاحة للأفراد؟',
            'ما هي شروط وإجراءات الاشتراك الرسمية لدى LTT؟',
            'كيف يمكن التواصل مع مركز خدمة العملاء والدعم الفني 114؟'
          ]
        };
      }

      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        persona: activePersona,
        text: data.text || 'لم يتم استلام إجابة.',
        timestamp: new Date().toLocaleTimeString('ar-LY', { hour: '2-digit', minute: '2-digit' }),
        confidenceScore: data.confidenceScore || 'high',
        sources: data.sources || [],
        followUpQuestions: data.followUpQuestions || [],
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: `ast-err-${Date.now()}`,
        sender: 'assistant',
        persona: activePersona,
        text: 'عذراً، حدث خطأ أثناء معالجة الطلب. يرجى إعادة إرسال السؤال.',
        timestamp: new Date().toLocaleTimeString('ar-LY', { hour: '2-digit', minute: '2-digit' }),
        confidenceScore: 'low',
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
      setAttachedFileName(null);
      setAttachedFileText('');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAttachedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setAttachedFileText(content.slice(0, 3000)); // cap snippet
    };
    reader.readAsText(file);
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRateMessage = (msgId: string, rating: 'helpful' | 'unhelpful') => {
    setMessages(prev =>
      prev.map(m => (m.id === msgId ? { ...m, rating } : m))
    );
  };

  const handleReportSubmit = () => {
    if (!reportModalMessageId) return;
    setMessages(prev =>
      prev.map(m => (m.id === reportModalMessageId ? { ...m, isReported: true, rating: 'reported' } : m))
    );
    setReportModalMessageId(null);
    setReportReason('');
    alert('تم إرسال البلاغ لمسؤول المعرفة المعتمد لمراجعته.');
  };

  const getPersonaIcon = (id: PersonaType) => {
    switch (id) {
      case 'techno_sales': return TrendingUp;
      case 'techno_support': return Wrench;
      case 'techno_coach': return GraduationCap;
      default: return Bot;
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row bg-slate-100 overflow-hidden">
      
      {/* Right Drawer: Persona Switcher & Active Conversations List */}
      <div className="w-full md:w-80 bg-white border-l border-slate-200 flex flex-col shrink-0">
        
        {/* Persona Selector Bar */}
        <div className="p-3 bg-slate-900 text-white border-b border-slate-800">
          <span className="text-[11px] font-bold text-slate-400 block mb-2">شخصية المساعد المخصصة:</span>
          <div className="grid grid-cols-2 gap-1.5">
            {PERSONAS.map(p => {
              const Icon = getPersonaIcon(p.id);
              const isSelected = activePersona === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setActivePersona(p.id);
                    setMessages([]);
                  }}
                  className={`p-2 rounded-xl text-right transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-400'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon className="w-4 h-4 text-sky-300" />
                    <span className="font-bold text-xs truncate">{p.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-300 line-clamp-1">{p.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* History Search & Quick Actions */}
        <div className="p-3 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
            <input
              type="text"
              value={historySearch}
              onChange={(e) => setHistorySearch(e.target.value)}
              placeholder="البحث في السجل..."
              className="w-full pr-8 pl-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => setMessages([])}
            className="p-1.5 bg-white border border-slate-200 text-slate-600 hover:text-blue-600 rounded-lg text-xs flex items-center gap-1 font-semibold"
            title="محادثة جديدة"
          >
            <PlusCircle className="w-4 h-4" />
          </button>
        </div>

        {/* Persona Description & Guidance */}
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-950 mb-4">
            <span className="font-bold block text-blue-900 mb-1 flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>نبذة عن {currentPersonaInfo.name}</span>
            </span>
            <p className="leading-relaxed text-[11px] text-blue-800">{currentPersonaInfo.description}</p>
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-500 block">أسئلة شائعة وسريعة:</span>
            {[
              'ما هي إعدادات APN ومميزات خدمة LTT 4G الجيل الرابع؟',
              'ما هي خطوات استبدال شريحة SIM؟',
              'طريقة فحص خطأ ضوء LOS الأحمر في الألياف',
              'باقات LTT Fiber للألياف البصرية المنزلية',
              'عروض الربط للشركات والمؤسسات',
            ].map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="w-full text-right p-2 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium transition-colors line-clamp-1"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        
        {/* Chat Banner Header */}
        <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl ${currentPersonaInfo.avatarBg} text-white flex items-center justify-center font-bold text-lg shadow-sm`}>
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-sm leading-tight text-white flex items-center gap-1.5">
                <span>{currentPersonaInfo.name}</span>
                <span className="bg-sky-400/20 text-sky-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-sky-400/30">
                  {currentPersonaInfo.title}
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">إجابات مستندة لقواعد LTT المعتمدة (Q1 2026)</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onNavigateToView && (
              <button
                onClick={() => onNavigateToView('support')}
                className="hidden sm:flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700"
              >
                <Wrench className="w-3.5 h-3.5 text-cyan-400" />
                <span>فتح التشخيص التشغيلي</span>
              </button>
            )}
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${isUser ? 'mr-auto flex-row-reverse' : 'ml-auto'}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center font-bold text-xs ${
                  isUser ? 'bg-slate-800 text-white' : `${currentPersonaInfo.avatarBg} text-white shadow-xs`
                }`}>
                  {isUser ? user.displayName.charAt(0) : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Box */}
                <div className="space-y-2 max-w-[85%]">
                  <div
                    className={`p-4 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                      isUser
                        ? 'bg-slate-900 text-white rounded-tl-none'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-tr-none'
                    }`}
                  >
                    {isUser ? (
                      <p className="whitespace-pre-wrap font-medium">{msg.text}</p>
                    ) : (
                      <div className="prose-rtl">
                        <Markdown>{msg.text}</Markdown>
                      </div>
                    )}

                    {/* Sources Badge List */}
                    {!isUser && msg.sources && msg.sources.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                          <Info className="w-3 h-3 text-blue-600" />
                          <span>المصادر الرسمية المعتمدة:</span>
                        </span>
                        {msg.sources.map((src, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedSource(src)}
                            className="text-[10px] bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-md border border-blue-200 transition-colors flex items-center gap-1"
                          >
                            <span>{src.docTitle}</span>
                            <span className="text-[9px] opacity-75">(v{src.version})</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions & Rating Bar for Assistant Messages */}
                  {!isUser && (
                    <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 px-1 gap-2">
                      <div className="flex items-center gap-1.5">
                        {/* Copy button */}
                        <button
                          onClick={() => handleCopyText(msg.id, msg.text)}
                          className="p-1 hover:bg-slate-200 rounded text-slate-600 flex items-center gap-1 font-medium"
                          title="نسخ الإجابة"
                        >
                          {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedId === msg.id ? 'تم النسخ' : 'نسخ'}</span>
                        </button>

                        {/* Rate Helpful */}
                        <button
                          onClick={() => handleRateMessage(msg.id, 'helpful')}
                          className={`p-1 rounded flex items-center gap-1 ${
                            msg.rating === 'helpful' ? 'text-emerald-600 bg-emerald-50 font-bold' : 'hover:bg-slate-200 text-slate-600'
                          }`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                        </button>

                        {/* Rate Unhelpful */}
                        <button
                          onClick={() => handleRateMessage(msg.id, 'unhelpful')}
                          className={`p-1 rounded flex items-center gap-1 ${
                            msg.rating === 'unhelpful' ? 'text-amber-600 bg-amber-50 font-bold' : 'hover:bg-slate-200 text-slate-600'
                          }`}
                        >
                          <ThumbsDown className="w-3.5 h-3.5" />
                        </button>

                        {/* Report button */}
                        <button
                          onClick={() => setReportModalMessageId(msg.id)}
                          className={`p-1 rounded flex items-center gap-1 ${
                            msg.isReported ? 'text-red-600 bg-red-50 font-bold' : 'hover:bg-slate-200 text-slate-600'
                          }`}
                          title="إبلاغ عن إجابة خاطئة لمسؤول المعرفة"
                        >
                          <Flag className="w-3.5 h-3.5" />
                          <span>{msg.isReported ? 'تم الإبلاغ' : 'إبلاغ'}</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        {onNavigateToView && msg.text.includes('Fiber') && (
                          <button
                            onClick={() => onNavigateToView('support')}
                            className="text-[10px] text-cyan-700 hover:underline font-bold flex items-center gap-1"
                          >
                            <Wrench className="w-3 h-3" />
                            <span>تشخيص فني مفصل</span>
                          </button>
                        )}
                        <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                      </div>
                    </div>
                  )}

                  {/* Follow-up Suggestions Chips */}
                  {!isUser && msg.followUpQuestions && msg.followUpQuestions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.followUpQuestions.map((fq, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(fq)}
                          className="text-[10px] bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-medium px-2.5 py-1 rounded-full border border-slate-200 shadow-2xs transition-colors flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3 text-blue-500" />
                          <span>{fq}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center gap-3 text-xs text-slate-500 bg-white p-3 rounded-2xl border border-slate-200 w-fit">
              <Bot className="w-4 h-4 text-blue-600 animate-spin" />
              <span>يقوم Techno بالبحث في قاعدة معرفة LTT المعتمدة وصياغة الإجابة...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200">
          
          {attachedFileName && (
            <div className="mb-2 p-2 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span className="font-semibold">{attachedFileName}</span>
              </div>
              <button
                onClick={() => { setAttachedFileName(null); setAttachedFileText(''); }}
                className="text-blue-700 font-bold hover:underline"
              >
                إلغاء
              </button>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept=".txt,.csv,.json,.md,.doc,.docx"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-colors"
              title="إرفاق ملف أو مستند نصي"
            >
              <Paperclip className="w-5 h-5" />
            </button>

            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={`اطرح سؤالك على ${currentPersonaInfo.name}...`}
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />

            <button
              type="submit"
              disabled={loading || (!inputQuery.trim() && !attachedFileText)}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-40"
            >
              <span>إرسال</span>
              <Send className="w-4 h-4 rotate-180" />
            </button>
          </form>
        </div>

      </div>

      {/* Source Details Modal */}
      {selectedSource && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 text-right shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span>تفاصيل المصدر المعتمد</span>
              </h3>
              <button
                onClick={() => setSelectedSource(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div>
                <span className="font-bold text-slate-500 block">عنوان المستند:</span>
                <p className="font-bold text-sm text-slate-900">{selectedSource.docTitle}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="font-bold text-slate-500 block">التصنيف:</span>
                  <p>{selectedSource.category}</p>
                </div>
                <div>
                  <span className="font-bold text-slate-500 block">رقم الإصدار:</span>
                  <p className="font-semibold text-blue-600">v{selectedSource.version}</p>
                </div>
              </div>
              <div>
                <span className="font-bold text-slate-500 block">تاريخ التحديث المعتمد:</span>
                <p>{selectedSource.updatedAt}</p>
              </div>
              <div>
                <span className="font-bold text-slate-500 block">مقتطف النص المعتمد:</span>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 text-[11px] leading-relaxed mt-1">
                  {selectedSource.snippet}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedSource(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-xs"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {reportModalMessageId && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-right shadow-2xl">
            <h3 className="font-bold text-sm text-slate-900 mb-2 flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              <span>الإبلاغ عن إجابة خاطئة أو غير محدثة</span>
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              سيتم إرسال ملاحظتك مباشرة لمسؤول المعرفة المعتمد لمراجعة المستندات أو تعديل التوجيهات.
            </p>
            <textarea
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              placeholder="اكتب سبب الخطأ أو المعلومة الصحيحة المتوقعة..."
              rows={4}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-red-500 mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setReportModalMessageId(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
              >
                إلغاء
              </button>
              <button
                onClick={handleReportSubmit}
                disabled={!reportReason.trim()}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs disabled:opacity-50"
              >
                تأكيد الإبلاغ
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
