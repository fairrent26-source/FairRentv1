import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-tight transition-colors",
  {
    variants: {
      variant: {
        default: "border-slate-luxe/50 bg-slate-luxe/60 text-ivory",
        positive: "border-champagne/40 bg-champagne/10 text-champagne",
        premium: "border-champagne/40 bg-champagne/10 text-champagne",
        verified: "border-verified/40 bg-verified/10 text-verified",
        success: "border-success/40 bg-success/10 text-success",
        warning: "border-warning/40 bg-warning/10 text-warning",
        destructive: "border-destructive/40 bg-destructive/10 text-destructive",
        secondary: "border-slate-luxe/50 bg-slate-luxe/60 text-ivory/70",
        info: "border-info/40 bg-info/10 text-info",
      },
      dot: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      dot: false,
    },
  }
);

const dotColor: Record<string, string> = {
  default: "bg-ivory/60",
  positive: "bg-champagne",
  premium: "bg-champagne",
  verified: "bg-verified",
  success: "bg-success",
  warning: "bg-warning",
  destructive: "bg-destructive",
  secondary: "bg-ivory/50",
  info: "bg-info",
};

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, dot, children, ...props }: BadgeProps) {
  const variantKey = (variant ?? "default") as keyof typeof dotColor;
  return (
    <div className={cn(badgeVariants({ variant, dot }), className)} {...props}>
      {dot ? (
        <span
          aria-hidden
          className={cn(
            "h-1.5 w-1.5 shrink-0 rounded-full",
            dotColor[variantKey] ?? dotColor.default
          )}
        />
      ) : null}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
