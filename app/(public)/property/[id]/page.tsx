import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LuxeImage } from "@/components/ui/LuxeImage";
import { LUXE_IMAGE_LIST } from "@/lib/images";
import { getPropertyById } from "@/mock/properties";

function pickImage(id: string) {
  const i = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return LUXE_IMAGE_LIST[i % LUXE_IMAGE_LIST.length];
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = getPropertyById(id);
  if (!property) notFound();

  return (
    <div className="min-h-screen">
      <header className="flex h-14 items-center justify-between border-b border-slate-luxe/50 px-6 bg-obsidian/95 backdrop-blur-sm">
        <Link href="/marketplace" className="text-sm text-ivory/70 hover:text-ivory">
          ← Back to Marketplace
        </Link>
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold tracking-tight text-ivory" style={{ letterSpacing: "-0.02em" }}>FairRent</span>
        </Link>
        <Link href="/tenant">
          <Button size="sm">Apply as Tenant</Button>
        </Link>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        <div className="mb-6 overflow-hidden rounded-[2rem] border border-slate-luxe/50">
          <LuxeImage src={pickImage(property.id)} alt={property.address} />
        </div>
        <h1 className="mb-2 text-2xl font-bold text-ivory tracking-tight" style={{ letterSpacing: "-0.02em" }}>{property.address}</h1>
        <p className="mb-6 font-mono text-champagne">
          £{property.rent}/month · {property.beds} Beds · {property.baths} Bath
        </p>
        {property.description && (
          <Card className="mb-6 rounded-[2rem]">
            <CardContent className="pt-6">
              <h2 className="mb-2 font-medium text-ivory">Description</h2>
              <p className="text-ivory/80">{property.description}</p>
            </CardContent>
          </Card>
        )}
        <Button asChild>
          <Link href="/tenant">Request viewing</Link>
        </Button>
      </main>
    </div>
  );
}
