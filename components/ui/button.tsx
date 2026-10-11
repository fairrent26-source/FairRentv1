import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium font-body tracking-tight transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-main disabled:pointer-events-none disabled:opacity-50 active:opacity-90 motion-reduce:transition-none",
  {
    variants: {
      variant: {
        default: "bg-brand-teal text-text-primary shadow-sm hover:bg-accent-lime",
        destructive: "bg-alert-watermelon text-white hover:bg-alert-watermelon/90",
        outline: "border border-ui-tags bg-transparent text-text-primary hover:border-brand-teal/50 hover:bg-ui-tags",
        secondary: "bg-ui-tags text-text-primary hover:bg-ui-tags/80",
        ghost: "text-text-primary hover:bg-ui-tags",
        link: "text-brand-teal underline-offset-4 hover:text-brand-teal/80 hover:underline",
        info: "bg-brand-teal/20 text-text-primary border border-ui-tags hover:bg-accent-lime/40",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-xl px-3",
        lg: "h-12 rounded-2xl px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** Shows a spinner, hides label, and disables interaction. Ignored when asChild. */
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, loading = false, children, disabled, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    // asChild renders a single child (e.g. <Link>) — don't inject extra nodes.
    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {children}
        </Comp>
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        data-loading={loading || undefined}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {loading && (
          <Loader2 className="absolute h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden />
        )}
        <span className={cn("contents", loading && "invisible")}>{children}</span>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
