import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-tight transition-colors",
  {
    variants: {
      variant: {
        default: "border-ui-tags bg-ui-tags text-text-primary",
        positive: "border-ui-tags bg-ui-tags text-text-primary",
        premium: "border-ui-tags bg-ui-tags text-text-primary",
        verified: "border-verified/40 bg-verified/10 text-verified",
        success: "border-success/40 bg-success/10 text-success",
        warning: "border-warning/40 bg-warning/10 text-warning",
        destructive: "border-alert-watermelon/40 bg-alert-watermelon/10 text-alert-watermelon",
        secondary: "border-ui-tags bg-ui-tags text-text-muted",
        info: "border-brand-teal/40 bg-brand-teal/10 text-text-primary",
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
  default: "bg-text-muted",
  positive: "bg-brand-teal",
  premium: "bg-brand-teal",
  verified: "bg-verified",
  success: "bg-success",
  warning: "bg-warning",
  destructive: "bg-destructive",
  secondary: "bg-text-muted",
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
