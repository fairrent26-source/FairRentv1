import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-2xl border border-slate-luxe/50 bg-slate-luxe/40 px-3 py-2 text-sm text-ivory placeholder:text-ivory/50 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne/40 focus-visible:border-champagne/30 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
