"use client";

import { useState } from "react";
import { ThreadList } from "@/components/messaging/ThreadList";
import { ChatWindow } from "@/components/messaging/ChatWindow";
import { DashboardWidget } from "@/components/layout/DashboardWidget";
import { tenantThreads } from "@/mock/messages";
import { getPrimaryTenant } from "@/mock/tenants";

export default function TenantMessagesPage() {
  const [activeThreadId, setActiveThreadId] = useState<string | null>(tenantThreads[0]?.id ?? null);
  const activeThread = tenantThreads.find((t) => t.id === activeThreadId) ?? null;
  const tenant = getPrimaryTenant();

  return (
    <div className="flex min-h-[60vh] flex-col gap-4 overflow-hidden sm:min-h-[70vh] lg:min-h-[calc(100vh-8rem)] lg:flex-row">
      <DashboardWidget className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[2rem] p-0 lg:min-w-0">
        <div className="flex min-h-0 flex-1 flex-col md:flex-row">
          <div className="w-full shrink-0 border-b border-white/10 md:max-h-none md:w-64 md:border-b-0 md:border-r md:border-white/10 lg:w-80">
            <ThreadList
              threads={tenantThreads}
              activeId={activeThreadId}
              onSelect={setActiveThreadId}
              className="h-full min-h-[180px] md:min-h-0"
            />
          </div>
          <div className="min-h-0 min-w-0 flex-1">
            <ChatWindow thread={activeThread} className="h-full min-h-[240px]" />
          </div>
        </div>
      </DashboardWidget>
      <aside className="w-full shrink-0 rounded-[2rem] border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl lg:w-72 lg:max-h-[calc(100vh-8rem)]">
        <p className="text-sm font-medium text-ivory">Your Trust Ledger</p>
        <p className="mt-2 text-2xl font-bold tabular-nums text-champagne">{tenant.strengthScore} Strength</p>
        <p className="mt-1 text-sm text-ivory/60">{tenant.paymentStreakMonths}-month payment streak</p>
        <p className="text-sm text-ivory/50">Landlord Avg. SLA: 14 hours</p>
      </aside>
    </div>
  );
}
