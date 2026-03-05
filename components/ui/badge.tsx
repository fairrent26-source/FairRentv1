import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-tight transition-colors",
  {
    variants: {
      variant: {
        default: "border-slate-luxe/50 bg-slate-luxe/60 text-ivory",
        positive: "border-champagne/40 bg-champagne/10 text-champagne",
        warning: "border-amber-500/40 bg-amber-500/10 text-amber-400",
        destructive: "border-red-600/40 bg-red-500/10 text-red-400",
        secondary: "border-slate-luxe/50 bg-slate-luxe/60 text-ivory/70",
        info: "border-champagne/40 bg-champagne/10 text-champagne",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
