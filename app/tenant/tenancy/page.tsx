"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getPrimaryTenant } from "@/mock/tenants";

export default function TenantTenancyPage() {
  const tenant = getPrimaryTenant();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-display font-bold uppercase tracking-display text-text-primary">My Tenancy</h2>
      <Card>
        <CardHeader>
          <span className="text-sm font-display font-bold uppercase tracking-display text-text-primary">Active Tenancy — {tenant.name}</span>
        </CardHeader>
        <CardContent>
          <p className="text-text-muted">Property: 123 Main St, Anytown</p>
          <p className="text-text-muted">Rent: £1,200/month · Next due: 1st</p>
          <p className="text-emerald-500">Auto-Pay Linked · 12-month on-time streak</p>
          <Button size="sm" className="mt-4">Log a Repair</Button>
        </CardContent>
      </Card>
    </div>
  );
}
