"use client";

import { useDevStore } from "@/store/dev-store";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScoreDisplay } from "@/components/scoring/ScoreDisplay";
import { MatchCard } from "@/components/marketplace/MatchCard";
import { getPrimaryTenant } from "@/mock/tenants";
import { tenantMatchCandidates } from "@/mock/matches";

export default function TenantTenancyPage() {
  const tenant = getPrimaryTenant();
  const noActiveTenancy = useDevStore((s) => s.noActiveTenancy);
  const highScore = useDevStore((s) => s.highScore);
  const displayScore = highScore ? tenant.strengthScore : 3.2;

  if (noActiveTenancy) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-slate-100">You&apos;re currently between homes, {tenant.name}.</h2>
        <p className="text-slate-400">Your Passport is verified and ready. Let&apos;s find your next 98% match.</p>
        <Button asChild>
          <Link href="/tenant/marketplace">Explore the Marketplace</Link>
        </Button>
        <div className="flex justify-center py-12">
          <div className="h-48 w-48 rounded-full border-2 border-slate-600 flex items-center justify-center text-slate-500 text-sm">
            Match Radar placeholder
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <span className="text-sm font-medium text-slate-100">Your FairRent Strength</span>
            </CardHeader>
            <CardContent>
              <ScoreDisplay value={displayScore} max={5} label="Strength" />
              <p className="mt-2 text-sm text-slate-400">Boost to 4.5 now by completing your &apos;Previous Landlord&apos; check to unlock &apos;Early Access&apos; listings.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <span className="text-sm font-medium text-slate-100">Market Momentum</span>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-500">Target Postcode Insight</p>
              <div className="mt-2 flex gap-2">
                <div className="h-12 flex-1 rounded bg-red-500/30" />
                <div className="h-8 flex-1 rounded bg-amber-500/30" />
                <div className="h-6 flex-1 rounded bg-emerald-500/30" />
              </div>
              <p className="mt-2 text-xs text-slate-500">Pricing Trends (Heat Map)</p>
              <p className="mt-1 text-sm text-slate-400">Highly Competitive: 12 new tenants searching in Target Area.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <span className="text-sm font-medium text-slate-100">Your Tenancy Legacy</span>
            </CardHeader>
            <CardContent>
              <p className="text-slate-100">12-month on-time payment streak</p>
              <p className="text-emerald-500">Your score improved by +0.2 this month.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <span className="text-sm font-medium text-slate-100">Market Status</span>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400">Market Activity: High</p>
              <p className="text-sm text-slate-400">Tenants with 4.0+ scores are currently closing deals in 48 hours.</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {tenantMatchCandidates.slice(0, 2).map((m) => (
            <MatchCard key={m.id} match={m} primaryActionLabel="View Listing" />
          ))}
        </div>

        <Card>
          <CardHeader>
            <span className="text-sm font-medium text-slate-100">Preparation</span>
          </CardHeader>
          <CardContent className="flex gap-4 text-sm text-blue-500">
            <a href="#">How to Rent Guide (2026 Edition)</a>
            <a href="#">Tenancy Checklist</a>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-100">My Tenancy</h2>
      <Card>
        <CardHeader>
          <span className="text-sm font-medium text-slate-100">Active Tenancy</span>
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
