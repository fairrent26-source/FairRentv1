import Link from "next/link";
import { PublicMarketplaceNav } from "@/components/layout/PublicMarketplaceNav";
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
      <PublicMarketplaceNav />

      <main className="mx-auto max-w-6xl px-6 py-8">
        <h1 className="mb-2 text-2xl font-display font-bold uppercase tracking-display text-text-primary">Discover properties</h1>
        <p className="mb-8 text-text-muted">Browse verified listings. Match by FairRent Strength.</p>

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
                  <p className="font-medium text-text-primary">{listing.address}</p>
                  <p className="text-sm font-mono text-brand-teal">
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
