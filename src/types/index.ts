export type UserRole = 'super_admin' | 'knowledge_admin' | 'supervisor' | 'employee' | 'agent';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  centerOrAgent?: string;
  region?: string;
  allowedServices?: string[];
  createdAt?: string;
  lastLogin?: string;
  status: 'active' | 'disabled';
}

export type PersonaType = 'techno' | 'techno_sales' | 'techno_support' | 'techno_coach';

export interface PersonaInfo {
  id: PersonaType;
  name: string;
  title: string;
  description: string;
  avatarBg: string;
  iconName: string;
  welcomeMsg: string;
}

export type DocumentStatus = 'draft' | 'under_review' | 'approved' | 'rejected' | 'archived' | 'expired';

export interface VersionHistoryEntry {
  id: string;
  version: string;
  status: DocumentStatus;
  updatedAt: string;
  updatedBy: string;
  changeSummary: string;
  contentSnippet?: string;
}

export interface ConflictWarning {
  existingDocId: string;
  existingTitle: string;
  existingVersion: string;
  similarityScore: number; // 0-100%
  conflictType: 'duplicate' | 'conflicting_content' | 'outdated_policy';
  details: string;
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  description: string;
  contentType: 'article' | 'qa' | 'service' | 'package' | 'policy' | 'procedure' | 'troubleshooting' | 'training';
  category: string;
  subCategory?: string;
  serviceType?: string;
  targetAudience: 'individual' | 'business' | 'agents' | 'internal';
  keywords: string[];
  sourceName: string;
  version: string;
  status: DocumentStatus;
  confidentiality: 'public' | 'internal' | 'confidential';
  content: string;
  createdBy: string;
  approvedBy?: string;
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
  chunksCount?: number;
  fileUrl?: string;
  versionHistory?: VersionHistoryEntry[];
  conflictWarnings?: ConflictWarning[];
}

export interface KnowledgeChunk {
  id: string;
  documentId: string;
  docTitle: string;
  category: string;
  content: string;
  version: string;
  sourceName: string;
  updatedAt: string;
  keywords: string[];
  status?: DocumentStatus;
  score?: number;
}

export interface ServicePackage {
  id: string;
  name: string;
  nameEn?: string;
  category: string;
  type: 'individual' | 'business';
  description: string;
  features: string[];
  price?: string;
  quota?: string;
  speed?: string;
  validity?: string;
  requirements?: string[];
  status: 'active' | 'legacy' | 'upcoming';
  alternativeServices?: string[];
  sourceName: string;
  logoUrl?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  persona: PersonaType;
  text: string;
  timestamp: string;
  confidenceScore?: 'high' | 'medium' | 'low';
  sources?: {
    docTitle: string;
    category: string;
    version: string;
    updatedAt: string;
    snippet: string;
  }[];
  categoryTag?: 'sales' | 'support' | 'individual' | 'business' | 'operations' | 'policies' | 'training' | 'general';
  rating?: 'helpful' | 'unhelpful' | 'reported';
  isReported?: boolean;
  followUpQuestions?: string[];
}

export interface ChatConversation {
  id: string;
  userId: string;
  title: string;
  persona: PersonaType;
  messages: ChatMessage[];
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConflictItem {
  id: string;
  title: string;
  type: 'price' | 'package_name' | 'requirements' | 'validity' | 'duplicate' | 'policy_procedure';
  doc1: { id: string; title: string; version: string; content: string; source: string; date: string };
  doc2: { id: string; title: string; version: string; content: string; source: string; date: string };
  status: 'open' | 'resolved' | 'ignored';
  createdAt: string;
}

export interface RecommendationRule {
  id: string;
  name: string;
  condition: string;
  outcomeServiceId: string;
  outcomeText: string;
  priority: number;
  status: 'active' | 'inactive';
  validFrom?: string;
  validTo?: string;
  approvedBy: string;
}

export interface TroubleshootingStep {
  id: string;
  question: string;
  options: { label: string; nextStepId?: string; isDiagnosis?: boolean; diagnosisText?: string; escalationNeeded?: boolean }[];
}

export interface TroubleshootingTree {
  id: string;
  serviceCategory: string; // '4g' | 'fwa' | 'fiber' | 'adsl'
  title: string;
  startStepId: string;
  steps: Record<string, TroubleshootingStep>;
}

export interface QuizQuestion {
  id: string;
  type: 'mcq' | 'boolean' | 'scenario';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  category: string;
  estimatedMinutes: number;
  questions: QuizQuestion[];
  badgeReward?: string;
}

export interface AuditLogItem {
  id: string;
  userId: string;
  userEmail: string;
  action: string;
  details: string;
  timestamp: string;
}

export interface SystemPromptVersion {
  id: string;
  persona: PersonaType;
  promptText: string;
  version: string;
  status: 'active' | 'draft' | 'archived';
  approvedBy: string;
  createdAt: string;
}
