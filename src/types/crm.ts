export type UserRole = 'super_admin' | 'manager' | 'agent' | 'auditor';

export type LeadScore = 'hot' | 'warm' | 'cold';

export type PipelineStage = 
  | 'new_prospect'
  | 'contacted'
  | 'interested'
  | 'visit_scheduled'
  | 'payment_pending'
  | 'admission'
  | 'not_qualified';

export type ActivityType = 'call' | 'whatsapp' | 'visit' | 'note' | 'email' | 'meeting';

export type CallOutcome = 
  | 'connected_discussed'
  | 'no_answer'
  | 'busy'
  | 'wrong_number'
  | 'callback_requested'
  | 'voicemail';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  branch?: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  source: string;
  stage: PipelineStage;
  score: LeadScore;
  scoreValue: number; // 0-100
  assignedTo: string;
  assignedAgent?: User;
  createdAt: Date;
  updatedAt: Date;
  lastContactedAt?: Date;
  nextFollowUp?: Date;
  course?: string;
  budget?: number;
  isDecisionMaker: boolean;
  urgency: 'high' | 'medium' | 'low';
  notes?: string;
  tags?: string[];
  reactivated?: boolean;
  previousStage?: PipelineStage;
}

export interface Activity {
  id: string;
  leadId: string;
  type: ActivityType;
  description: string;
  outcome?: CallOutcome;
  duration?: number; // in seconds
  createdAt: Date;
  createdBy: string;
  agent?: User;
  metadata?: Record<string, unknown>;
}

export interface PipelineStageConfig {
  id: PipelineStage;
  label: string;
  color: string;
  order: number;
  requiresActivity: boolean;
  requiresPayment?: boolean;
}

export interface DashboardStats {
  totalLeads: number;
  newLeadsToday: number;
  hotLeads: number;
  conversionRate: number;
  followUpsToday: number;
  overdueFollowUps: number;
  admissionsThisMonth: number;
  revenueThisMonth: number;
}

export interface AgentPerformance {
  agentId: string;
  agentName: string;
  totalLeads: number;
  conversions: number;
  conversionRate: number;
  avgResponseTime: number;
  activitiesToday: number;
}
