export interface Deal {
  id: number;
  title: string;
  value: number;
  stage: string;
  company: string;
  contact: string;
  expectedCloseDate: string;
  probability: number;
  lastActivity?: string;
  responsibleName?: string;
  phone?: string;
  email?: string;
  industry?: string;
  firstContactDate?: string;
  followUpDate?: string; // Added new field
  contactResponsible?: string;
  companyResponsible?: string;
  contextInfo?: string;
  interactionHistory?: string;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  lastContact: string;
  status: 'active' | 'inactive';
}

export interface Activity {
  id: number;
  type: 'call' | 'meeting' | 'email' | 'task';
  title: string;
  description: string;
  date: string;
  status: 'pending' | 'completed';
  relatedTo: {
    type: 'deal' | 'contact';
    id: number;
    name: string;
  };
}

export interface Proposal {
  id: number;
  title: string;
  dealId: number;
  dealTitle: string;
  company: string;
  value: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  createdAt: string;
  validUntil: string;
}

export interface DashboardMetrics {
  totalDeals: number;
  totalValue: number;
  wonDeals: number;
  lostDeals: number;
  activeContacts: number;
  pendingActivities: number;
  proposalsSent: number;
  conversionRate: number;
}

export interface DetailModalData {
  dealId: number;
  firstContactDate: string;
  followUpDate: string; // Added new field
  contactResponsible: string;
  companyResponsible: string;
  contextInfo: string;
  interactionHistory: string;
}