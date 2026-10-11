"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { LuxeImage } from "@/components/ui/LuxeImage";
import { LUXE_IMAGE_LIST } from "@/lib/images";
import { marketplaceListings } from "@/mock/matches";

function pickImage(id: string) {
  const i = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return LUXE_IMAGE_LIST[i % LUXE_IMAGE_LIST.length];
}

export default function TenantMarketplacePage() {
  const list = marketplaceListings;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <Input placeholder="Search by City, Postcode, or Landmark" className="max-w-xs" readOnly />
        <div className="flex flex-wrap gap-2">
          {["2 Beds", "£1000-£1500", "Pets Allowed", "Furnished", "Parking"].map((f) => (
            <Button key={f} variant="secondary" size="sm">{f}</Button>
          ))}
        </div>
        <Button>Find My Match</Button>
      </div>

      <h2 className="text-xl font-display font-bold uppercase tracking-display text-text-primary">Discover Your Next Home</h2>
      <p className="text-text-muted">Matches based on your FairRent Strength.</p>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
          {list.map((listing) => (
            <Card key={listing.id} className="overflow-hidden rounded-[2rem]">
              <div className="relative aspect-video overflow-hidden">
                <LuxeImage src={pickImage(listing.id)} alt={listing.address} />
                <Badge className="absolute left-2 top-2" variant="info">
                  Pedigree: {listing.strengthScore}
                </Badge>
              </div>
              <CardContent className="pt-4">
                <p className="font-medium text-text-primary">{listing.address}</p>
                <p className="text-sm font-mono text-brand-teal">£{listing.rent}/month</p>
                <p className="text-xs text-text-muted">{listing.beds} Beds | {listing.baths} Bath | {listing.sqft ?? "—"} sqft</p>
                <div className="mt-3 flex items-center gap-2">
                  <input type="checkbox" readOnly className="rounded border-ui-tags" />
                  <span className="text-xs text-text-muted">Match</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm">Shortlist</Button>
                  <Button size="sm">Request Private Viewing</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card className="rounded-[2rem]">
            <CardHeader>
              <span className="text-sm font-display font-bold uppercase tracking-display text-text-primary">Market Intelligence & Status</span>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-brand-teal">Target Postcode Insight</p>
                <div className="mt-2 flex gap-2">
                  <div className="h-16 flex-1 rounded-xl bg-red-500/20 border border-ui-tags/50" />
                  <div className="h-12 flex-1 rounded-xl bg-ui-tags border border-ui-tags/50" />
                  <div className="h-10 flex-1 rounded-xl bg-brand-teal/20 border border-ui-tags/50" />
                </div>
                <p className="mt-2 text-xs text-text-muted">Pricing Trends (Heat Map)</p>
                <p className="mt-1 text-sm text-text-muted">Highly Competitive: 12 new tenants searching in this area today. Your profile is in the top 5%.</p>
              </div>
              <div>
                <p className="text-xs text-brand-teal">Current Tenancy Status</p>
                <Badge variant="positive" className="mt-1">Active Lease</Badge>
                <label className="mt-2 flex items-center gap-2 text-sm text-text-muted">
                  <input type="checkbox" defaultChecked readOnly className="rounded border-ui-tags" />
                  Auto-Pay Linked
                </label>
              </div>
              <div>
                <p className="text-xs text-brand-teal">Your Trust Ledger</p>
                <p className="mt-1 text-sm text-text-primary">Streak: 12 months on-time payments</p>
                <p className="text-sm text-brand-teal">Your score improved by +0.2 this month.</p>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-[2rem] border-brand-teal/30 bg-ui-tags/30">
            <CardContent className="pt-6">
              <p className="font-medium text-text-primary">Want to increase your Match Rate?</p>
              <p className="mt-1 text-sm text-text-muted">Complete your &apos;Previous Landlord&apos; reference check to boost your Strength to 4.5.</p>
              <Button size="sm" className="mt-4">Send Reminder</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
