"use client";

import { useDevStore } from "@/store/dev-store";
import { Button } from "@/components/ui/button";
import { ScoreDisplay } from "@/components/scoring/ScoreDisplay";
import { MatchCard } from "@/components/marketplace/MatchCard";
import { DashboardWidget } from "@/components/layout/DashboardWidget";
import { DashboardGrid } from "@/components/layout/DashboardGrid";
import { tenantMatchCandidates } from "@/mock/matches";
import { getPrimaryTenant } from "@/mock/tenants";

export default function TenantOverviewPage() {
  const tenant = getPrimaryTenant();
  const highScore = useDevStore((s) => s.highScore);
  const displayScore = highScore ? tenant.strengthScore : 3.2;
  const emptyMatches = useDevStore((s) => s.emptyMatches);
  const matches = emptyMatches ? [] : tenantMatchCandidates.slice(0, 2);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-ivory">
          Welcome back, {tenant.name}. You have {matches.length} new premium matches.
        </h2>
        <Button variant="outline" size="sm" className="rounded-[2rem] border-white/20 text-ivory/80 hover:border-champagne/50">Edit Search Criteria</Button>
      </div>

      <DashboardWidget className="p-6">
        <span className="block text-sm font-medium text-ivory">Your FairRent Strength: {displayScore}/5.0</span>
        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <ScoreDisplay value={displayScore} max={5} label="Strength" size="sm" />
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-sm text-ivory/60">
              Increase your strength to 4.5 by setting up Auto-Pay for your next move.
              <Button size="sm" variant="link" className="h-auto p-0 text-champagne">View Options</Button>
            </p>
            <p className="flex items-center gap-2 text-sm text-ivory/60">
              Complete your &apos;Previous Landlord&apos; reference check.
              <Button size="sm" variant="link" className="h-auto p-0 text-champagne">Send Reminder</Button>
            </p>
          </div>
        </div>
      </DashboardWidget>

      <DashboardGrid className="lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <h3 className="text-sm font-medium text-ivory">Your Top-Tier Matches</h3>
          {matches.length === 0 ? (
            <DashboardWidget className="p-6">
              <p className="py-12 text-center text-ivory/50">No matches yet. Complete your Passport to see matches.</p>
            </DashboardWidget>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {matches.map((m) => (
                <MatchCard
                  key={m.id}
                  match={m}
                  variant="tenant"
                  primaryActionLabel="Request Private Viewing"
                  secondaryActionLabel="View Landlord Pedigree"
                />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <DashboardWidget className="p-6">
            <span className="block text-sm font-medium text-ivory">Market Snapshot: Target Postcode</span>
            <p className="mt-4 text-sm text-ivory/60">Highly Competitive: 12 new tenants searching in this area today. Your profile is in the top 5%.</p>
            <div className="mt-4 flex gap-2">
              {[40, 65, 80].map((h, i) => (
                <div key={i} className="flex-1 rounded-[2rem] bg-champagne/20" style={{ height: `${h}px` }} />
              ))}
            </div>
            <p className="mt-2 text-xs text-ivory/50">Average rent for 2-bed flats in Target Postcode has increased by 3% in the last quarter.</p>
          </DashboardWidget>
          <DashboardWidget className="p-6">
            <span className="block text-sm font-medium text-ivory">The Active Tenancy</span>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-ivory/60">Payment Status: <span className="font-medium text-emerald-500">£1,200 Due: 1st Month</span></p>
              <span className="inline-block rounded-full bg-champagne/20 px-2 py-0.5 text-xs text-champagne">Auto-Pay Linked</span>
              <p className="text-sm text-ivory/60">The Trust Ledger: Streak: 12 months on-time payments.</p>
              <p className="text-sm text-emerald-500">↑ Your score improved by +0.2 this month.</p>
              <Button size="sm" className="mt-2 rounded-[2rem]">Log a Repair Ticket</Button>
              <p className="text-xs text-ivory/50">Landlord Avg. SLA: 14 hours</p>
            </div>
          </DashboardWidget>
        </div>
      </DashboardGrid>
    </div>
  );
}
