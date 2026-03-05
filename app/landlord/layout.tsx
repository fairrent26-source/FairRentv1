"use client";

import { AppShell } from "@/components/layout/AppShell";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { getPrimaryLandlord } from "@/mock/landlords";

export default function LandlordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const landlord = getPrimaryLandlord();
  return (
    <AuthGuard role="landlord">
      <AppShell
        role="landlord"
        entityName={landlord.entityName}
        unreadMessages={landlord.unreadMessages}
        title="Landlord Dashboard"
        addAssetHref="/landlord/portfolio"
      >
        {children}
      </AppShell>
    </AuthGuard>
  );
}
