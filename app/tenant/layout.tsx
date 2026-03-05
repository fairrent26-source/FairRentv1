"use client";

import { AppShell } from "@/components/layout/AppShell";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { getPrimaryTenant } from "@/mock/tenants";

export default function TenantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tenant = getPrimaryTenant();
  return (
    <AuthGuard role="tenant">
      <AppShell
        role="tenant"
        entityName={tenant.name}
        unreadMessages={tenant.unreadMessages}
        title="Tenant Dashboard"
      >
        {children}
      </AppShell>
    </AuthGuard>
  );
}
