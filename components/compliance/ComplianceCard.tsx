"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ComplianceItem } from "@/mock/types";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";

function statusConfig(status: ComplianceItem["status"]) {
  switch (status) {
    case "verified":
      return { label: "Verified & Current", variant: "positive" as const, icon: CheckCircle };
    case "expiring_soon":
      return { label: "Expiring Soon", variant: "warning" as const, icon: Clock };
    case "expired":
      return { label: "Action Required", variant: "destructive" as const, icon: AlertTriangle };
    default:
      return { label: "Unknown", variant: "secondary" as const, icon: AlertTriangle };
  }
}

interface ComplianceCardProps {
  item: ComplianceItem;
  className?: string;
}

export function ComplianceCard({ item, className }: ComplianceCardProps) {
  const { label, variant, icon: Icon } = statusConfig(item.status);
  const ctaLabel = item.status === "expired" || item.status === "expiring_soon" ? "Upload New" : "Resolve";

  return (
    <Card
      className={cn(
        "transition-colors",
        item.status === "expiring_soon" && "alert-warning border-amber-500/30",
        item.status === "expired" && "alert-risk border-red-500/30",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <span className="text-sm font-display font-bold uppercase tracking-display text-text-primary">{item.label}</span>
        <Badge variant={variant} className="gap-1">
          <Icon className="h-3 w-3" />
          {label}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-xs text-text-muted">
          Expiry: {item.expiryDate}
          {item.propertyAddress && ` · ${item.propertyAddress}`}
        </p>
        {(item.status === "expired" || item.status === "expiring_soon") && (
          <Button variant="secondary" size="sm">
            {ctaLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
