"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThreadList } from "@/components/messaging/ThreadList";
import { maintenanceTickets, awaabsLawItems } from "@/mock/maintenance";
import { landlordThreads } from "@/mock/messages";
import { useState } from "react";
import { ScoreDisplay } from "@/components/scoring/ScoreDisplay";

const urgencyBg = { emergency: "bg-red-500/20", warning: "bg-amber-500/20", info: "bg-blue-500/20" };

export default function LandlordMaintenancePage() {
  const [activeThreadId, setActiveThreadId] = useState<string | null>(landlordThreads[0]?.id ?? null);
  const tickets = maintenanceTickets;

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold tracking-tight text-slate-100">Maintenance & Statutory Compliance</h2>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div>
            <h3 className="mb-3 text-sm font-medium tracking-tight text-slate-100">Awaab&apos;s Law Compliance Monitor</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              {awaabsLawItems.map((item) => (
                <Card key={item.id} className={urgencyBg[item.urgency]}>
                  <CardContent className="pt-4">
                    <p className="font-medium text-slate-100">{item.label}</p>
                    <p className="text-sm text-slate-400">Days Remaining: {item.daysRemaining}</p>
                    <p className="text-xs text-slate-500">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-medium text-slate-100">Maintenance Tickets</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {tickets.map((t) => (
                <Card key={t.id}>
                  <CardContent className="flex flex-row items-center justify-between pt-4">
                    <div>
                      <p className="font-medium text-slate-100">{t.title} - {t.unit}</p>
                      <p className="text-xs text-slate-400">Tenant Sentiment: {t.tenantSentiment ?? "—"}/10</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={t.priority === "emergency" ? "destructive" : t.priority === "urgent" ? "warning" : "secondary"}>
                        {t.priority}
                      </Badge>
                      <Button size="sm">View Ticket</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card>
            <CardHeader>
              <span className="text-sm font-medium text-slate-100">Decent Homes Standard (DHS) Audit</span>
            </CardHeader>
            <CardContent>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[75%] rounded-full bg-emerald-500" />
              </div>
              <p className="mt-2 text-sm text-slate-400">75% — 3 properties pending final inspection.</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <span className="text-sm font-medium text-slate-100">Portfolio Compliance Score</span>
            </CardHeader>
            <CardContent>
              <ScoreDisplay value={4.8} max={5} label="" size="sm" />
              <p className="mt-2 text-xs text-amber-500">Missing EICR for Property B—Score drops to 3.2 in 14 days.</p>
            </CardContent>
          </Card>
          <Card className="alert-risk border-red-500/30">
            <CardHeader className="flex flex-row items-center gap-2">
              <span className="text-red-500" aria-hidden>⚠</span>
              <span className="text-sm font-medium text-slate-100">Urgent Regulatory Actions</span>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-300">
              <p>Action Required: Smoke/CO Alarm annual test overdue for 101 Elm Rd.</p>
              <p>Action Required: Gas Safety (CP12) expiring in 12 days.</p>
            </CardContent>
          </Card>
          <div className="flex h-48 flex-col rounded-2xl border border-slate-700">
            <div className="border-b border-slate-700 p-2">
              <span className="text-xs font-medium text-slate-400">Tenant Messages</span>
            </div>
            <ThreadList threads={landlordThreads} activeId={activeThreadId} onSelect={setActiveThreadId} />
          </div>
        </div>
      </div>
    </div>
  );
}
