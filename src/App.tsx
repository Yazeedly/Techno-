import React, { useState } from 'react';
import { UserProfile, PersonaType } from './types';
import { DEMO_USERS } from './data/seedData';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { LoginPage } from './components/auth/LoginPage';
import { PublicGuestPortal } from './components/auth/PublicGuestPortal';
import { DashboardView } from './components/dashboard/DashboardView';
import { ChatView } from './components/chat/ChatView';
import { SalesWizardView } from './components/sales/SalesWizardView';
import { TroubleshootingView } from './components/support/TroubleshootingView';
import { KnowledgeView } from './components/knowledge/KnowledgeView';
import { ServicesCatalogView } from './components/knowledge/ServicesCatalogView';
import { OperationsProceduresView } from './components/knowledge/OperationsProceduresView';
import { ConflictCenterView } from './components/knowledge/ConflictCenterView';
import { DocumentUploaderView } from './components/knowledge/DocumentUploaderView';
import { TrainingView } from './components/training/TrainingView';
import { AdminView } from './components/admin/AdminView';
import { AgentsMapView } from './components/agents/AgentsMapView';

export function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(DEMO_USERS[0]); // Logged in as Super Admin by default
  const [authMode, setAuthMode] = useState<'authenticated' | 'login' | 'public'>('authenticated');
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [activePersona, setActivePersona] = useState<PersonaType>('techno');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  if (authMode === 'public') {
    return (
      <PublicGuestPortal 
        onGoToLogin={() => setAuthMode('login')}
        onLoginAsGuest={(guest) => {
          setCurrentUser(guest);
          setAuthMode('authenticated');
        }}
      />
    );
  }

  if (authMode === 'login' || !currentUser) {
    return (
      <div>
        <div className="bg-slate-900 text-slate-300 p-2 text-center text-xs border-b border-slate-800 flex justify-between items-center px-4">
          <span>الواجهة المؤسسية الخاصة ببطاقات الدخول لشركة LTT</span>
          <button 
            onClick={() => setAuthMode('public')}
            className="text-emerald-400 hover:underline font-bold"
          >
            ← الانتقال لبوابة الزوار العامة (توصية الباقات والمساعد الذكي)
          </button>
        </div>
        <LoginPage onLoginSuccess={(user) => {
          setCurrentUser(user);
          setAuthMode('authenticated');
        }} />
      </div>
    );
  }

  const handleNavigate = (view: string, persona?: PersonaType) => {
    if (persona) setActivePersona(persona);
    setCurrentView(view);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView user={currentUser} onNavigate={handleNavigate} />;
      case 'chat':
        return <ChatView user={currentUser} initialPersona={activePersona} onNavigateToView={handleNavigate} />;
      case 'sales':
        return <SalesWizardView />;
      case 'support':
        return <TroubleshootingView />;
      case 'agents':
        return <AgentsMapView user={currentUser} />;
      case 'knowledge':
        return <KnowledgeView user={currentUser} />;
      case 'services':
        return <ServicesCatalogView user={currentUser} />;
      case 'operations':
        return <OperationsProceduresView user={currentUser} />;
      case 'conflicts':
        return <ConflictCenterView />;
      case 'upload':
        return <DocumentUploaderView user={currentUser} onNavigateToKnowledge={() => handleNavigate('knowledge')} />;
      case 'training':
        return <TrainingView user={currentUser} />;
      case 'admin-users':
      case 'test-lab':
      case 'prompt-manager':
      case 'analytics':
      case 'audit':
      case 'settings':
        return <AdminView user={currentUser} initialTab={currentView.replace('admin-', '')} />;
      default:
        return <DashboardView user={currentUser} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-right" dir="rtl">
      
      {/* Top Header */}
      <Header
        user={currentUser}
        activePersona={activePersona}
        onPersonaChange={(p) => setActivePersona(p)}
        onLogout={() => setAuthMode('public')}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onNavigate={(v) => handleNavigate(v)}
      />

      {/* Main Layout Body */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Navigation Sidebar */}
        <Sidebar
          currentView={currentView}
          userRole={currentUser.role}
          onNavigate={(v) => handleNavigate(v)}
          isOpen={sidebarOpen}
        />

        {/* Content Region */}
        <main className="flex-1 overflow-y-auto bg-slate-100">
          {renderCurrentView()}
        </main>

      </div>

    </div>
  );
}

export default App;
