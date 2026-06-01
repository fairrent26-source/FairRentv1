"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getPrimaryTenant } from "@/mock/tenants";

export default function TenantTenancyPage() {
  const tenant = getPrimaryTenant();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-100">My Tenancy</h2>
      <Card>
        <CardHeader>
          <span className="text-sm font-medium text-slate-100">Active Tenancy — {tenant.name}</span>
        </CardHeader>
        <CardContent>
          <p className="text-slate-400">Property: 123 Main St, Anytown</p>
          <p className="text-slate-400">Rent: £1,200/month · Next due: 1st</p>
          <p className="text-emerald-500">Auto-Pay Linked · 12-month on-time streak</p>
          <Button size="sm" className="mt-4">Log a Repair</Button>
        </CardContent>
      </Card>
    </div>
  );
}
