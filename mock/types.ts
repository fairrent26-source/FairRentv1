export type ComplianceStatus = "verified" | "expiring_soon" | "expired";
export type MaintenancePriority = "emergency" | "urgent" | "routine";
export type PropertyStatus = "active_lease" | "pending_renewal" | "vacant";
export type TenancyStatus = "active" | "between_homes" | "pending";

export interface ComplianceItem {
  id: string;
  type: string;
  label: string;
  expiryDate: string;
  status: ComplianceStatus;
  propertyId?: string;
  propertyAddress?: string;
}

export interface MaintenanceTicket {
  id: string;
  title: string;
  propertyAddress: string;
  unit?: string;
  priority: MaintenancePriority;
  tenantSentiment?: number;
  hasAttachments: boolean;
  status: "open" | "in_progress" | "resolved";
  reportedAt: string;
  resolvedAt?: string;
}

export interface Landlord {
  id: string;
  entityName: string;
  contactEmail: string;
  companyRegNo: string;
  taxId: string;
  pedigreeScore: number;
  avatarUrl?: string;
  unreadMessages: number;
}

export interface Tenant {
  id: string;
  name: string;
  strengthScore: number;
  avatarUrl?: string;
  unreadMessages: number;
  paymentStreakMonths: number;
  scoreChangeThisMonth: number;
  hasAutoPay: boolean;
  rentToIncomeRatio?: number;
}

export interface Property {
  id: string;
  address: string;
  shortAddress: string;
  rent: number;
  beds: number;
  baths: number;
  sqft?: number;
  status: PropertyStatus;
  tenantName?: string;
  leaseEndDate?: string;
  pedigreeScore?: number;
  description?: string;
  imagePlaceholder?: boolean;
  landlordId: string;
}

export interface MatchCandidate {
  id: string;
  tenantId?: string;
  landlordId?: string;
  propertyId?: string;
  matchPercent: number;
  strengthScore: number;
  address: string;
  rent: number;
  beds: number;
  baths: number;
  sqft?: number;
  verificationFlags: string[];
  moveInTimeline?: string;
}

export interface MessageThread {
  id: string;
  participantName: string;
  participantScore?: number;
  propertyContext?: string;
  lastSnippet: string;
  lastAt: string;
  isOnline?: boolean;
  avatarUrl?: string;
  messages: ChatMessage[];
}

export interface ChatMessage {
  id: string;
  threadId: string;
  fromSelf: boolean;
  body: string;
  at: string;
  hasAttachment?: boolean;
}

export interface FinancialPayout {
  id: string;
  amount: number;
  clearingDate: string;
  properties: { address: string; directDebitVerified: boolean }[];
}

export interface AwaabsLawItem {
  id: string;
  type: string;
  label: string;
  daysRemaining: number;
  description: string;
  urgency: "emergency" | "warning" | "info";
}

export interface ScoreBreakdownItem {
  label: string;
  value: number;
  max: number;
  description?: string;
}
