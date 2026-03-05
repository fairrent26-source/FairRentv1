import type { Property } from "./types";

export const properties: Property[] = [
  {
    id: "prop-1",
    address: "123 Main St, Anytown",
    shortAddress: "123 Main St",
    rent: 1200,
    beds: 2,
    baths: 1,
    sqft: 800,
    status: "active_lease",
    tenantName: "John Doe",
    leaseEndDate: "2024-12-31",
    pedigreeScore: 4.8,
    description:
      "Spacious apartment with floor-to-ceiling windows and river views. Includes access to concierge and gym.",
    landlordId: "ll-1",
  },
  {
    id: "prop-2",
    address: "456 Oak Ave, Otherville",
    shortAddress: "456 Oak Ave",
    rent: 1500,
    beds: 3,
    baths: 2,
    status: "pending_renewal",
    tenantName: "Jane Smith",
    leaseEndDate: "2024-09-30",
    landlordId: "ll-1",
  },
  {
    id: "prop-3",
    address: "789 Pine Ln, Somewhere",
    shortAddress: "789 Pine Ln",
    rent: 0,
    beds: 2,
    baths: 1,
    status: "vacant",
    landlordId: "ll-1",
  },
  {
    id: "prop-4",
    address: "101 Elm Rd, Nowhere",
    shortAddress: "101 Elm Rd",
    rent: 1100,
    beds: 1,
    baths: 1,
    status: "active_lease",
    tenantName: "Robert Johnson",
    leaseEndDate: "2025-01-15",
    landlordId: "ll-1",
  },
  {
    id: "prop-5",
    address: "123 Main St, Anytown",
    shortAddress: "123 Main St",
    rent: 1450,
    beds: 2,
    baths: 1,
    description: "Luxury 2-Bed, Battersea",
    landlordId: "ll-1",
    pedigreeScore: 4.8,
    status: "active_lease",
  },
];

export function getPropertyById(id: string): Property | undefined {
  return properties.find((p) => p.id === id);
}

export function getPropertiesByLandlord(landlordId: string): Property[] {
  return properties.filter((p) => p.landlordId === landlordId);
}
