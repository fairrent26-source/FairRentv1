"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScoreDisplay } from "@/components/scoring/ScoreDisplay";
import { MatchCard } from "@/components/marketplace/MatchCard";
import { tenantMatchCandidates } from "@/mock/matches";
import { getPrimaryTenant } from "@/mock/tenants";

export default function TenantMatchesPage() {
  const tenant = getPrimaryTenant();
  const displayScore = tenant.strengthScore;
  const list = tenantMatchCandidates;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold uppercase tracking-display text-text-primary">Your Top-Tier Matches.</h2>
        <Button variant="outline" size="sm">Search Criteria</Button>
      </div>
      <p className="text-text-muted">You have new premium matches based on your Strength.</p>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {list.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center text-slate-500">No matches found. Complete your Passport and search criteria.</CardContent>
            </Card>
          ) : (
            list.map((m) => (
              <MatchCard
                key={m.id}
                match={m}
                variant="tenant"
                premiumBadge
                primaryActionLabel="Request Private Viewing"
                secondaryActionLabel="Shortlist"
              />
            ))
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <span className="text-sm font-display font-bold uppercase tracking-display text-text-primary">Your FairRent Strength</span>
            </CardHeader>
            <CardContent>
              <ScoreDisplay value={displayScore} max={5} label="Strength" size="md" />
              <p className="mt-2 text-sm text-text-muted">Increase your strength to 4.5 by setting up Auto-Pay.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <span className="text-sm font-display font-bold uppercase tracking-display text-text-primary">Improve Your Score</span>
            </CardHeader>
            <CardContent className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-slate-300">
                <input type="checkbox" readOnly className="rounded" />
                Increase your strength to 4.5 by setting up Auto-Pay.
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-300">
                <input type="checkbox" readOnly className="rounded" />
                Complete your &apos;Previous Landlord&apos; reference check.
              </label>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <span className="text-sm font-display font-bold uppercase tracking-display text-text-primary">Target Postcode Insight</span>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <div className="h-12 flex-1 rounded bg-red-500/30" />
                <div className="h-8 flex-1 rounded bg-ui-tags" />
                <div className="h-6 flex-1 rounded bg-emerald-500/30" />
              </div>
              <p className="mt-2 text-xs text-slate-500">Pricing Trends (Heat Map)</p>
              <p className="mt-1 text-sm text-text-muted">Highly Competitive: 12 new tenants searching in this area today. Your profile is in the top 5%.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <span className="text-sm font-display font-bold uppercase tracking-display text-text-primary">Your Activity</span>
            </CardHeader>
            <CardContent className="space-y-1 text-sm text-text-muted">
              <p>Matches Viewed: 14</p>
              <p>Viewings Requested: 2</p>
              <p>Saved Favorites: 5</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

