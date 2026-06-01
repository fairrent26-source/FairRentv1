"use client";

import { Button } from "@/components/ui/button";
import { ScoreDisplay } from "@/components/scoring/ScoreDisplay";
import { MatchCard } from "@/components/marketplace/MatchCard";
import { MaintenanceSLAWidget } from "@/components/widgets/MaintenanceSLAWidget";
import { ThreadList } from "@/components/messaging/ThreadList";
import { ChatWindow } from "@/components/messaging/ChatWindow";
import { DashboardWidget } from "@/components/layout/DashboardWidget";
import { DashboardGrid } from "@/components/layout/DashboardGrid";
import { getPrimaryLandlord } from "@/mock/landlords";
import { landlordMatchCandidates } from "@/mock/matches";
import { slaSummary, maintenanceTickets } from "@/mock/maintenance";
import { landlordThreads } from "@/mock/messages";
import { upcomingPayouts } from "@/mock/financials";
import { useState } from "react";

export default function LandlordOverviewPage() {
  const landlord = getPrimaryLandlord();
  const [activeThreadId, setActiveThreadId] = useState<string | null>(landlordThreads[0]?.id ?? null);
  const activeThread = landlordThreads.find((t) => t.id === activeThreadId) ?? null;
  const displayScore = landlord.pedigreeScore;

  return (
    <div className="space-y-8">
      <div className="section-divide pt-0">
        <h2 className="text-xl font-semibold tracking-tight text-ivory">
          Welcome back, {landlord.entityName.split(" ")[0]}
        </h2>
      </div>

      <DashboardGrid className="lg:grid-cols-3">
        <DashboardWidget className="p-6">
          <span className="block text-sm font-medium tracking-tight text-ivory">Your FairRent Pedigree</span>
          <div className="mt-4 flex flex-col items-center gap-4">
            <ScoreDisplay value={displayScore} max={5} label="Pedigree" />
            <p className="text-center text-sm text-ivory/60">
              Upload Gas Safety Certificate for Property A to reach 4.9.
            </p>
            <Button size="sm" className="rounded-[2rem]">Upload Now</Button>
          </div>
        </DashboardWidget>

        <DashboardWidget className="p-6">
          <span className="block text-sm font-medium tracking-tight text-ivory">Asset Overview</span>
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="num-display text-2xl">4</p>
              <p className="text-xs text-ivory/50">Total Units</p>
            </div>
            <div>
              <p className="num-positive text-2xl">3</p>
              <p className="text-xs text-ivory/50">Occupied</p>
            </div>
            <div>
              <p className="num-warning text-2xl">1</p>
              <p className="text-xs text-ivory/50">Vacant</p>
            </div>
          </div>
          <div className="alert-warning mt-4 flex items-start gap-2 rounded-[2rem] p-3 text-sm text-amber-200">
            <span className="text-amber-500" aria-hidden>⚠</span>
            <span>1 Action Required: EICR expiring in 14 days for Property Address.</span>
          </div>
        </DashboardWidget>
      </DashboardGrid>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardWidget className="p-6 lg:col-span-2">
          <span className="block text-sm font-medium tracking-tight text-ivory">Top Tenant Matches</span>
          <div className="mt-4">
            <div className="space-y-4">
                {landlordMatchCandidates.slice(0, 2).map((m) => (
                  <MatchCard
                    key={m.id}
                    match={m}
                    variant="landlord"
                    primaryActionLabel="Invite to View"
                    secondaryActionLabel="Review Passport"
                  />
                ))}
              </div>
          </div>
        </DashboardWidget>

        <div className="space-y-6">
          <DashboardWidget className="overflow-hidden p-0">
            <MaintenanceSLAWidget
              percentMet={slaSummary.percentMet}
              avgResolutionHours={slaSummary.avgResolutionHours}
              activeIssuesCount={slaSummary.activeIssuesCount}
              historicResolved={slaSummary.historicResolved}
              tickets={maintenanceTickets}
              className="border-0 bg-transparent shadow-none"
            />
          </DashboardWidget>
          <DashboardWidget className="p-6">
            <span className="block text-sm font-medium tracking-tight text-ivory">Upcoming Payouts</span>
            <div className="mt-4">
              <p className="text-2xl font-bold text-ivory">£{upcomingPayouts[0]?.amount ?? 0} clearing on {upcomingPayouts[0]?.clearingDate}</p>
              <ul className="mt-2 space-y-1 text-sm text-ivory/60">
                {upcomingPayouts[0]?.properties.map((p) => (
                  <li key={p.address} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    {p.address} (Direct Debit Verified)
                  </li>
                ))}
              </ul>
            </div>
          </DashboardWidget>
        </div>
      </div>

      <DashboardWidget className="flex min-h-0 flex-col overflow-hidden p-6">
        <span className="block shrink-0 text-sm font-medium tracking-tight text-ivory">Tenant Messages</span>
        <div className="mt-4 flex min-h-[280px] flex-1 flex-col overflow-hidden sm:min-h-[320px] md:flex-row">
          <div className="w-full shrink-0 border-b border-white/10 md:max-h-none md:w-64 md:border-b-0 md:border-r md:border-white/10 lg:w-72">
            <ThreadList
              threads={landlordThreads}
              activeId={activeThreadId}
              onSelect={setActiveThreadId}
              className="h-full min-h-[140px] md:min-h-0"
            />
          </div>
          <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            <ChatWindow thread={activeThread} className="min-h-[200px]" />
          </div>
        </div>
      </DashboardWidget>
    </div>
  );
}
