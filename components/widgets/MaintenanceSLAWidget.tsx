"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { MaintenanceTicket } from "@/mock/types";
import { Shield } from "lucide-react";

interface MaintenanceSLAWidgetProps {
  percentMet: number;
  avgResolutionHours: number;
  activeIssuesCount: number;
  historicResolved: number;
  tickets: MaintenanceTicket[];
  className?: string;
}

const priorityVariant: Record<MaintenanceTicket["priority"], "destructive" | "warning" | "secondary"> = {
  emergency: "destructive",
  urgent: "warning",
  routine: "secondary",
};

export function MaintenanceSLAWidget({
  percentMet,
  avgResolutionHours,
  activeIssuesCount,
  historicResolved,
  tickets,
  className,
}: MaintenanceSLAWidgetProps) {
  const allClear = activeIssuesCount === 0;

  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <span className="text-sm font-medium text-ivory">Maintenance SLA Status</span>
        {allClear ? (
          <Badge variant="positive">All Clear</Badge>
        ) : (
          <Badge variant="warning">{activeIssuesCount} Active</Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-ivory/60">SLA Met (30d)</p>
            <p className="font-semibold font-mono text-champagne">{percentMet}%</p>
          </div>
          <div>
            <p className="text-ivory/60">Avg. Resolution</p>
            <p className="font-semibold font-mono text-ivory">{avgResolutionHours} Hours</p>
          </div>
        </div>
        {allClear ? (
          <p className="text-sm text-ivory/70">0 Active Issues. You are completely up to date.</p>
        ) : null}
        <p className="flex items-center gap-1.5 text-sm text-ivory/70">
          <Shield className="h-4 w-4 text-champagne" />
          {historicResolved} historic repairs resolved successfully since joining.
        </p>
        {tickets.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-champagne">Recent tickets</p>
            <ul className="space-y-2">
              {tickets.slice(0, 4).map((t) => (
                <li
                  key={t.id}
                  className="flex items-center justify-between rounded-xl border border-slate-luxe/50 bg-slate-luxe/30 p-3"
                >
                  <div>
                    <p className="text-sm font-medium text-ivory">
                      {t.title}
                      {t.unit ? ` - ${t.unit}` : ""}
                    </p>
                    <p className="text-xs text-ivory/60">Tenant Sentiment: {t.tenantSentiment ?? "—"}/10</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={priorityVariant[t.priority]}>{t.priority}</Badge>
                    <Button size="sm" variant="ghost">
                      View Ticket
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
