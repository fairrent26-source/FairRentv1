import type { ComplianceItem } from "./types";

export const complianceItems: ComplianceItem[] = [
  {
    id: "comp-1",
    type: "epc",
    label: "EPC (Energy Performance Certificate)",
    expiryDate: "2025-12-31",
    status: "verified",
    propertyId: "prop-1",
    propertyAddress: "123 Main St",
  },
  {
    id: "comp-2",
    type: "gas_safety",
    label: "Gas Safety (CP12)",
    expiryDate: "2024-07-15",
    status: "expiring_soon",
    propertyId: "prop-1",
    propertyAddress: "123 Main St",
  },
  {
    id: "comp-3",
    type: "eicr",
    label: "EICR (Electrical Safety)",
    expiryDate: "2026-03-31",
    status: "verified",
    propertyId: "prop-1",
    propertyAddress: "123 Main St",
  },
  {
    id: "comp-4",
    type: "eicr",
    label: "EICR",
    expiryDate: "2024-03-18",
    status: "expired",
    propertyId: "prop-2",
    propertyAddress: "Property A",
  },
  {
    id: "comp-5",
    type: "smoke_co",
    label: "Smoke/CO Alarm annual test",
    expiryDate: "2023-12-01",
    status: "expired",
    propertyAddress: "101 Elm Rd",
  },
];

export const portfolioComplianceScore = 4.8;
export const dhsAuditPercent = 75;
export const dhsPendingCount = 3;

export function getComplianceByProperty(propertyId: string): ComplianceItem[] {
  return complianceItems.filter((c) => c.propertyId === propertyId);
}

export function getUrgentCompliance(): ComplianceItem[] {
  return complianceItems.filter((c) => c.status === "expired" || c.status === "expiring_soon");
}
