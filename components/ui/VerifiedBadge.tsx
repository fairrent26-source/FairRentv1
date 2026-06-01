import * as React from "react";
import { BadgeCheck, ShieldCheck, Clock, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type VerifiedStatus = "verified" | "secure" | "pending" | "unverified";
type VerifiedSize = "sm" | "md";

interface VerifiedBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: VerifiedStatus;
  label?: string;
  size?: VerifiedSize;
  /** Render as a compact icon-only chip (label still announced to AT). */
  iconOnly?: boolean;
}

const statusConfig: Record<
  VerifiedStatus,
  { icon: React.ComponentType<{ className?: string }>; label: string; classes: string }
> = {
  verified: {
    icon: BadgeCheck,
    label: "Verified",
    classes: "border-verified/40 bg-verified/10 text-verified",
  },
  secure: {
    icon: ShieldCheck,
    label: "Secure",
    classes: "border-verified/40 bg-verified/10 text-verified",
  },
  pending: {
    icon: Clock,
    label: "Pending",
    classes: "border-warning/40 bg-warning/10 text-warning",
  },
  unverified: {
    icon: ShieldAlert,
    label: "Unverified",
    classes: "border-slate-luxe/60 bg-slate-luxe/40 text-ivory/60",
  },
};

const sizeConfig: Record<VerifiedSize, { wrap: string; icon: string }> = {
  sm: { wrap: "gap-1 px-2 py-0.5 text-[11px]", icon: "h-3 w-3" },
  md: { wrap: "gap-1.5 px-2.5 py-1 text-xs", icon: "h-3.5 w-3.5" },
};

export function VerifiedBadge({
  status = "verified",
  label,
  size = "md",
  iconOnly = false,
  className,
  ...props
}: VerifiedBadgeProps) {
  const config = statusConfig[status];
  const sizing = sizeConfig[size];
  const Icon = config.icon;
  const text = label ?? config.label;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium tracking-tight",
        config.classes,
        iconOnly ? "p-1" : sizing.wrap,
        className
      )}
      role="status"
      aria-label={text}
      title={text}
      {...props}
    >
      <Icon className={cn(sizing.icon, "shrink-0")} aria-hidden />
      {!iconOnly && <span>{text}</span>}
    </span>
  );
}
