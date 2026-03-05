import type { FinancialPayout } from "./types";

export const upcomingPayouts: FinancialPayout[] = [
  {
    id: "payout-1",
    amount: 3450,
    clearingDate: "1st Month",
    properties: [
      { address: "Property 1 Address", directDebitVerified: true },
      { address: "Property 2 Address", directDebitVerified: true },
    ],
  },
];

export const revenueVsExpenses = {
  revenue: 5200,
  expenses: 1200,
  labels: ["Revenue", "Expenses"],
};

export const arrearsTable: { tenantName: string; address: string; amount: number; daysOverdue: number }[] = [];

export const investmentHealthScore = 4.6;

export const bankAccountMasked = "****5678";
export const rentCollectionLinked = true;
export const automatedRentTracking = true;
export const autoGenerateInvoices = true;
