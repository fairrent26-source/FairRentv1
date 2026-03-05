import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ComplianceCard } from "@/components/compliance/ComplianceCard";
import { LuxeImage } from "@/components/ui/LuxeImage";
import { LUXE_IMAGE_LIST } from "@/lib/images";
import { getPropertyById } from "@/mock/properties";
import { getComplianceByProperty } from "@/mock/compliance";

function pickImage(id: string) {
  const i = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return LUXE_IMAGE_LIST[i % LUXE_IMAGE_LIST.length];
}

export default async function LandlordPropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = getPropertyById(id);
  if (!property) notFound();
  const compliance = getComplianceByProperty(id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/landlord/portfolio" className="text-sm text-ivory/70 hover:text-ivory">
          ← Back to Portfolio
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Unpublish/Hide</Button>
          <Button size="sm">Save Changes</Button>
        </div>
      </div>

      <h2 className="text-xl font-bold text-ivory tracking-tight" style={{ letterSpacing: "-0.02em" }}>{property.address}, {property.description ?? ""}</h2>

      <div className="relative aspect-video w-full overflow-hidden rounded-[2rem] border border-slate-luxe/50">
        <LuxeImage src={pickImage(property.id)} alt={property.address} />
        <Button variant="secondary" size="sm" className="absolute right-2 top-2">
          Edit Cover Photo
        </Button>
      </div>
      <div className="flex gap-2">
        <div className="h-16 w-24 overflow-hidden rounded-xl border border-slate-luxe/50">
          <img src={LUXE_IMAGE_LIST[0]} alt="" className="h-full w-full object-cover grayscale-[0.2] brightness-90" />
        </div>
        <div className="h-16 w-24 overflow-hidden rounded-xl border border-slate-luxe/50">
          <img src={LUXE_IMAGE_LIST[1]} alt="" className="h-full w-full object-cover grayscale-[0.2] brightness-90" />
        </div>
        <div className="h-16 w-24 overflow-hidden rounded-xl border border-slate-luxe/50">
          <img src={LUXE_IMAGE_LIST[2]} alt="" className="h-full w-full object-cover grayscale-[0.2] brightness-90" />
        </div>
        <Button variant="outline" size="sm">+ Add Image</Button>
      </div>

      <div className="flex flex-wrap gap-4 text-sm font-mono text-champagne">
        <span>{property.beds} Beds</span>
        <span>{property.baths} Baths</span>
        <span>£{property.rent}/month Rent</span>
        <span className="text-ivory/70">Occupied</span>
      </div>

      <Card className="rounded-[2rem]">
        <CardHeader>
          <span className="text-sm font-medium text-ivory">Property Description</span>
        </CardHeader>
        <CardContent>
          <p className="text-ivory/80">{property.description ?? "Spacious apartment with floor-to-ceiling windows and river views. Includes access to concierge and gym."}</p>
        </CardContent>
      </Card>

      <Card className="rounded-[2rem]">
        <CardHeader>
          <span className="text-sm font-medium text-ivory">Location Intelligence</span>
        </CardHeader>
        <CardContent>
          <div className="aspect-video w-full overflow-hidden rounded-2xl border border-slate-luxe/50">
            <img src={LUXE_IMAGE_LIST[3]} alt="Location" className="h-full w-full object-cover grayscale-[0.2] brightness-90" />
          </div>
          <Link href="#" className="mt-2 inline-block text-sm text-champagne hover:underline">Edit Pin Location</Link>
        </CardContent>
      </Card>

      <Card className="rounded-[2rem]">
        <CardHeader>
          <span className="text-sm font-medium text-ivory">Asset Management & Tenant Status</span>
        </CardHeader>
        <CardContent>
          <p className="text-ivory/70">Current Tenancy Status</p>
          {property.tenantName ? (
            <>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-10 w-10 rounded-full overflow-hidden border border-slate-luxe/50 bg-slate-luxe/60" />
                <div>
                  <p className="font-medium text-ivory">{property.tenantName} — Strength <span className="font-mono text-champagne">{property.pedigreeScore ?? 4.8}</span></p>
                  <p className="text-sm text-ivory/70">Paid — Next due 1st May</p>
                </div>
              </div>
              <Button size="sm" className="mt-4">Message Tenant</Button>
            </>
          ) : (
            <p className="mt-2 text-ivory/50">No current tenant</p>
          )}
        </CardContent>
      </Card>

      <Card className="rounded-[2rem]">
        <CardHeader>
          <span className="text-sm font-medium text-ivory">Statutory Compliance & Documents</span>
        </CardHeader>
        <CardContent className="space-y-4">
          {compliance.length === 0 ? (
            <p className="text-ivory/50">No documents linked</p>
          ) : (
            compliance.map((c) => <ComplianceCard key={c.id} item={c} />)
          )}
        </CardContent>
      </Card>

      <Card className="rounded-[2rem]">
        <CardHeader>
          <span className="text-sm font-medium text-ivory">Quick Maintenance Snapshot</span>
        </CardHeader>
        <CardContent>
          <p className="text-ivory/80">1 Active Repair Ticket: Leaking Tap</p>
          <Link href="/landlord/maintenance" className="text-sm text-champagne hover:underline">View SLA Details</Link>
        </CardContent>
      </Card>

      <div className="flex items-center gap-2">
        <span className="text-sm text-ivory/70">Tenant Preview Mode</span>
        <input type="checkbox" className="rounded border-slate-luxe" readOnly checked={false} />
      </div>
    </div>
  );
}
