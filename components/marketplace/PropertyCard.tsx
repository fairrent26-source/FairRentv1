"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LuxeImage } from "@/components/ui/LuxeImage";
import { LUXE_IMAGE_LIST } from "@/lib/images";
import { cn } from "@/lib/utils";
import type { Property } from "@/mock/types";

interface PropertyCardProps {
  property: Property;
  href: string;
  showPedigree?: boolean;
  statusBadge?: boolean;
  className?: string;
}

const statusVariant: Record<Property["status"], "positive" | "warning" | "secondary"> = {
  active_lease: "positive",
  pending_renewal: "warning",
  vacant: "secondary",
};

const statusLabel: Record<Property["status"], string> = {
  active_lease: "Active Lease",
  pending_renewal: "Pending Renewal",
  vacant: "Vacant",
};

function pickImage(id: string) {
  const i = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return LUXE_IMAGE_LIST[i % LUXE_IMAGE_LIST.length];
}

export function PropertyCard({
  property,
  href,
  showPedigree = false,
  statusBadge = true,
  className,
}: PropertyCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="relative aspect-video w-full overflow-hidden">
        <LuxeImage src={pickImage(property.id)} alt={property.address} />
        {showPedigree && property.pedigreeScore !== undefined && (
          <Badge className="absolute left-2 top-2" variant="info">
            Pedigree: {property.pedigreeScore}
          </Badge>
        )}
        {statusBadge && (
          <Badge className="absolute right-2 top-2" variant={statusVariant[property.status]}>
            {statusLabel[property.status]}
          </Badge>
        )}
      </div>
      <CardContent className="space-y-1 pt-4">
        <p className="font-medium text-text-primary">{property.address}</p>
        {property.tenantName && (
          <p className="text-sm text-text-muted">Current tenant: {property.tenantName}</p>
        )}
        {property.rent > 0 && (
          <p className="text-sm font-mono text-brand-teal">£{property.rent}/mo</p>
        )}
        {property.leaseEndDate && (
          <p className="text-sm text-text-muted">Lease end: {property.leaseEndDate}</p>
        )}
        {!property.tenantName && property.status === "vacant" && (
          <p className="text-sm text-text-muted">Current tenant: N/A · Lease end: N/A</p>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild size="sm" className="w-full sm:w-auto">
          <Link href={href}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
