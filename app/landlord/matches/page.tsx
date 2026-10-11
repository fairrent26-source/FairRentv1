"use client";

import { MatchCard } from "@/components/marketplace/MatchCard";
import { landlordMatchCandidates } from "@/mock/matches";

export default function LandlordMatchesPage() {
  const list = landlordMatchCandidates;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-display font-bold uppercase tracking-display text-text-primary">Tenant Matches</h2>
      <p className="text-text-muted">Top matches for your portfolio based on strength and verification.</p>
      {list.length === 0 ? (
        <div className="rounded-2xl border border-slate-700 bg-slate-900/50 py-16 text-center text-slate-500">
          No matches found. Add properties and criteria to see tenant matches.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {list.map((m) => (
            <MatchCard
              key={m.id}
              match={m}
              variant="landlord"
              primaryActionLabel="Invite to View"
              secondaryActionLabel="Review Passport"
            />
          ))}
        </div>
      )}
    </div>
  );
}
