import type { Tenant } from "./types";

export const tenants: Tenant[] = [
  {
    id: "tn-1",
    name: "Name",
    strengthScore: 4.2,
    unreadMessages: 1,
    paymentStreakMonths: 12,
    scoreChangeThisMonth: 0.2,
    hasAutoPay: true,
    rentToIncomeRatio: 30,
  },
  {
    id: "tn-2",
    name: "Alex Smith",
    strengthScore: 4.8,
    unreadMessages: 0,
    paymentStreakMonths: 24,
    scoreChangeThisMonth: 0,
    hasAutoPay: true,
  },
  {
    id: "tn-3",
    name: "Jane Doe",
    strengthScore: 4.5,
    unreadMessages: 0,
    paymentStreakMonths: 6,
    scoreChangeThisMonth: 0.1,
    hasAutoPay: false,
  },
];

export function getTenantById(id: string): Tenant | undefined {
  return tenants.find((t) => t.id === id);
}

export function getPrimaryTenant(): Tenant {
  return tenants[0];
}
