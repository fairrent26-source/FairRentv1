"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LuxeImage } from "@/components/ui/LuxeImage";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { LUXE_IMAGE_LIST } from "@/lib/images";
import { cn } from "@/lib/utils";
import type { MatchCandidate } from "@/mock/types";

interface MatchCardProps {
  match: MatchCandidate;
  variant?: "landlord" | "tenant" | "marketplace";
  showVerificationFlags?: boolean;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  premiumBadge?: boolean;
  className?: string;
}

function pickImage(id: string) {
  const i = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return LUXE_IMAGE_LIST[i % LUXE_IMAGE_LIST.length];
}

export function MatchCard({
  match,
  variant = "tenant",
  showVerificationFlags = true,
  primaryActionLabel = "Request Private Viewing",
  secondaryActionLabel = "Shortlist",
  premiumBadge = false,
  className,
}: MatchCardProps) {
  const matchPct = match.matchPercent / 100;
  const isHighMatch = match.matchPercent >= 90;

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="relative aspect-video w-full overflow-hidden">
        <LuxeImage src={pickImage(match.id)} alt={match.address} />
        {premiumBadge && (
          <Badge className="absolute left-2 top-2" variant="info">
            Premium Match
          </Badge>
        )}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
          <span className={cn("font-semibold tabular-nums font-mono", isHighMatch ? "text-brand-teal" : "text-text-muted")}>
            {match.matchPercent}% Match
          </span>
          {variant === "landlord" && (
            <span className="text-sm text-text-muted">Strength: {match.strengthScore}</span>
          )}
        </div>
      </div>
      <CardContent className="space-y-2 pt-4">
        <p className="font-medium text-text-primary">{match.address}</p>
        <p className="text-sm font-mono text-brand-teal">
          £{match.rent}/mo · {match.beds} Beds | {match.baths} Bath
          {match.sqft ? ` | ${match.sqft} sqft` : ""}
        </p>
        {showVerificationFlags && match.verificationFlags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {match.verificationFlags.map((flag) => (
              <VerifiedBadge key={flag} status="verified" label={flag} size="sm" />
            ))}
          </div>
        )}
        <Progress value={matchPct * 100} className="h-1.5" indicatorClassName="bg-brand-teal" />
      </CardContent>
      <CardFooter className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
        <Button variant="outline" size="sm" className="w-full sm:w-auto">
          {secondaryActionLabel}
        </Button>
        <Button size="sm" className="w-full sm:w-auto">
          {primaryActionLabel}
        </Button>
      </CardFooter>
    </Card>
  );
}
