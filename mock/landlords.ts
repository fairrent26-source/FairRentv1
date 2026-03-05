import type { Landlord } from "./types";

export const landlords: Landlord[] = [
  {
    id: "ll-1",
    entityName: "FairRent Properties Ltd.",
    contactEmail: "contact@fairrent.com",
    companyRegNo: "12345678",
    taxId: "9876564321",
    pedigreeScore: 4.8,
    unreadMessages: 1,
  },
  {
    id: "ll-2",
    entityName: "Elm Road Lettings",
    contactEmail: "hello@elmroad.com",
    companyRegNo: "87654321",
    taxId: "1234567890",
    pedigreeScore: 4.2,
    unreadMessages: 0,
  },
];

export function getLandlordById(id: string): Landlord | undefined {
  return landlords.find((l) => l.id === id);
}

export function getPrimaryLandlord(): Landlord {
  return landlords[0];
}
