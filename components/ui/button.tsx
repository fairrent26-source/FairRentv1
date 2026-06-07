import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium tracking-tight transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne/60 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian disabled:pointer-events-none disabled:opacity-50 active:opacity-90 motion-reduce:transition-none",
  {
    variants: {
      variant: {
        default: "bg-champagne text-obsidian shadow-sm hover:bg-champagne/90",
        destructive: "bg-red-600/90 text-white hover:bg-red-500",
        outline: "border border-slate-luxe/50 bg-transparent text-ivory hover:border-champagne/50 hover:bg-slate-luxe/30",
        secondary: "bg-slate-luxe/60 text-ivory hover:bg-slate-luxe/80",
        ghost: "text-ivory hover:bg-slate-luxe/50",
        link: "text-champagne underline-offset-4 hover:text-champagne/80 hover:underline",
        info: "bg-champagne/20 text-champagne border border-slate-luxe/50 hover:bg-champagne/30",
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
