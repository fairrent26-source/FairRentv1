"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScoreDisplay } from "@/components/scoring/ScoreDisplay";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getPrimaryLandlord } from "@/mock/landlords";

export default function LandlordPedigreePage() {
  const landlord = getPrimaryLandlord();
  const displayScore = landlord.pedigreeScore;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-100">Your FairRent Pedigree & Certification</h2>

      <Card className="mx-auto max-w-md">
        <CardHeader>
          <span className="text-sm font-medium text-slate-100">Your Super-Landlord Score</span>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <ScoreDisplay value={displayScore} max={5} label="Pedigree" size="lg" />
          <p className="text-center text-sm text-slate-400">Upload Gas Safety Certificate for Property A to reach 4.9.</p>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { metric: "95%", label: "Statutory Compliance", desc: "All EICR, Gas Safety, and EPCs up to date.", color: "bg-emerald-500" },
          { metric: "92%", label: "Tenant Satisfaction", desc: "Derived from verified tenant feedback.", color: "bg-emerald-500" },
          { metric: "88%", label: "Maintenance Excellence", desc: "Tracking resolution against legal benchmarks.", color: "bg-amber-500" },
          { metric: "98%", label: "Lease Stability", desc: "Proving you are a fair, stable provider.", color: "bg-emerald-500" },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="pt-6">
              <p className="text-2xl font-bold text-slate-100">{item.metric}</p>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div className={cn("h-full rounded-full", item.color)} style={{ width: item.metric }} />
              </div>
              <p className="mt-2 text-sm font-medium text-slate-100">{item.label}</p>
              <p className="text-xs text-slate-400">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <span className="text-sm font-medium text-slate-100">Local Ranking</span>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-emerald-500">Top 5% in SW1</p>
            <p className="text-sm text-slate-400">Your 4.8 score places you among the best.</p>
          </CardContent>
        </Card>
        <Card className="border-amber-500/50">
          <CardHeader className="flex flex-row items-center gap-2">
            <span className="text-sm font-medium text-slate-100">Action Required: Pedigree Alert</span>
            <Badge variant="warning">⚠</Badge>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-300">EICR expiring in 14 days for Property Address.</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <span className="text-sm font-medium text-slate-100">Visual Achievement Tracker</span>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-14 w-14 rounded-full border-2 border-slate-600 bg-slate-800 flex items-center justify-center text-xs text-slate-500">
                Badge {i}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
