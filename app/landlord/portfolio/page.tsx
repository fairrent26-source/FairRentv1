"use client";

import Link from "next/link";
import { PropertyCard } from "@/components/marketplace/PropertyCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScoreDisplay } from "@/components/scoring/ScoreDisplay";
import { MaintenanceSLAWidget } from "@/components/widgets/MaintenanceSLAWidget";
import { getPropertiesByLandlord } from "@/mock/properties";
import { getPrimaryLandlord } from "@/mock/landlords";
import { slaSummary, maintenanceTickets } from "@/mock/maintenance";

export default function LandlordPortfolioPage() {
  const landlord = getPrimaryLandlord();
  const properties = getPropertiesByLandlord(landlord.id);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-100">Portfolio Properties</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {properties.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-slate-400">No properties yet. Add your first asset to get started.</p>
                <Link href="/landlord/portfolio" className="mt-4 inline-block">
                  <span className="text-blue-500 hover:underline">+ Add Asset</span>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {properties.map((p) => (
                <PropertyCard
                  key={p.id}
                  property={p}
                  href={`/landlord/portfolio/${p.id}`}
                  showPedigree={false}
                  statusBadge
                />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <MaintenanceSLAWidget
            percentMet={slaSummary.percentMet}
            avgResolutionHours={slaSummary.avgResolutionHours}
            activeIssuesCount={slaSummary.activeIssuesCount}
            historicResolved={slaSummary.historicResolved}
            tickets={maintenanceTickets}
          />
          <Card>
            <CardHeader>
              <span className="text-sm font-medium text-slate-100">Portfolio Pedigree</span>
            </CardHeader>
            <CardContent>
              <ScoreDisplay value={landlord.pedigreeScore} max={5} label="Score" size="sm" />
              <p className="mt-2 text-xs text-slate-400">EPC renewal pending for Property C... boosts score to 4.8.</p>
            </CardContent>
          </Card>
          <Card className="border-red-500/50">
            <CardHeader className="flex flex-row items-center gap-2">
              <span className="text-sm font-medium text-slate-100">Actionable Alerts</span>
              <span className="text-red-500">⚠</span>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-300">
              <p>Lease Renewal Due: John Doe (123 Main St)</p>
              <p>Action Required: EICR expiring for Property A</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
