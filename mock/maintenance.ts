import type { MaintenanceTicket, AwaabsLawItem } from "./types";

export const maintenanceTickets: MaintenanceTicket[] = [
  {
    id: "mt-1",
    title: "Leaking Faucet",
    propertyAddress: "123 Main St",
    unit: "Apt 1A",
    priority: "emergency",
    tenantSentiment: 8,
    hasAttachments: true,
    status: "open",
    reportedAt: "2024-03-01T10:00:00Z",
  },
  {
    id: "mt-2",
    title: "Boiler Malfunction",
    propertyAddress: "456 Oak Ave",
    unit: "Apt 2B",
    priority: "urgent",
    tenantSentiment: 4,
    hasAttachments: true,
    status: "in_progress",
    reportedAt: "2024-03-02T14:00:00Z",
  },
  {
    id: "mt-3",
    title: "Broken Window",
    propertyAddress: "789 Pine Ln",
    unit: "Apt 3C",
    priority: "routine",
    tenantSentiment: 9,
    hasAttachments: false,
    status: "open",
    reportedAt: "2024-03-03T09:00:00Z",
  },
  {
    id: "mt-4",
    title: "Blocked Drain",
    propertyAddress: "101 Elm Rd",
    unit: "Apt 4D",
    priority: "urgent",
    tenantSentiment: 6,
    hasAttachments: true,
    status: "open",
    reportedAt: "2024-03-04T11:00:00Z",
  },
];

export const awaabsLawItems: AwaabsLawItem[] = [
  {
    id: "awaab-1",
    type: "emergency_damp",
    label: "Emergency Damp Report",
    daysRemaining: 0,
    description: "24-hour resolution clock",
    urgency: "emergency",
  },
  {
    id: "awaab-2",
    type: "level_2_repair",
    label: "Level 2 Repair Start",
    daysRemaining: 5,
    description: "Must begin within 7 days of investigation",
    urgency: "warning",
  },
  {
    id: "awaab-3",
    type: "level_1_investigation",
    label: "Level 1 Investigation",
    daysRemaining: 10,
    description: "Must be completed within 14 days",
    urgency: "info",
  },
];

export const slaSummary = {
  percentMet: 100,
  avgResolutionHours: 14,
  activeIssuesCount: 0,
  historicResolved: 42,
};

export function getTicketsByPriority(priority: "emergency" | "urgent" | "routine"): MaintenanceTicket[] {
  return maintenanceTickets.filter((t) => t.priority === priority);
}
