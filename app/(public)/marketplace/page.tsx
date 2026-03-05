import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LuxeImage } from "@/components/ui/LuxeImage";
import { LUXE_IMAGE_LIST } from "@/lib/images";
import { marketplaceListings } from "@/mock/matches";
import { getPropertyById } from "@/mock/properties";

function pickImage(id: string) {
  const i = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return LUXE_IMAGE_LIST[i % LUXE_IMAGE_LIST.length];
}

export default function MarketplacePage() {
  return (
    <div className="min-h-screen">
      <header className="flex h-14 items-center justify-between border-b border-slate-luxe/50 px-6 bg-obsidian/95 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-luxe/60 border border-slate-luxe/50">
            <span className="text-lg text-champagne">✓</span>
          </div>
          <span className="font-bold tracking-tight text-ivory" style={{ letterSpacing: "-0.02em" }}>FairRent</span>
        </Link>
        <nav className="flex gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm">Landing</Button>
          </Link>
          <Link href="/landlord">
            <Button variant="outline" size="sm">Landlord</Button>
          </Link>
          <Link href="/tenant">
            <Button size="sm">Tenant</Button>
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <h1 className="mb-2 text-2xl font-bold text-ivory tracking-tight" style={{ letterSpacing: "-0.02em" }}>Discover properties</h1>
        <p className="mb-8 text-ivory/70">Browse verified listings. Match by FairRent Strength.</p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {marketplaceListings.map((listing) => {
            const prop = listing.propertyId ? getPropertyById(listing.propertyId) : null;
            return (
              <Card key={listing.id} className="overflow-hidden rounded-[2rem]">
                <div className="relative aspect-video overflow-hidden">
                  <LuxeImage src={pickImage(listing.id)} alt={listing.address} />
                  <Badge className="absolute left-2 top-2" variant="info">
                    Pedigree: {listing.strengthScore}
                  </Badge>
                </div>
                <CardContent className="pt-4">
                  <p className="font-medium text-ivory">{listing.address}</p>
                  <p className="text-sm font-mono text-champagne">
                    £{listing.rent}/month · {listing.beds} Beds | {listing.baths} Bath
                  </p>
                </CardContent>
                <div className="flex gap-2 p-4 pt-0">
                  <Button asChild variant="outline" size="sm">
                    <Link href={prop ? `/property/${prop.id}` : "#"}>View Listing</Link>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
