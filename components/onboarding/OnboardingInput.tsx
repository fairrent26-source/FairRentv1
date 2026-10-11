"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type OnboardingInputProps = React.InputHTMLAttributes<HTMLInputElement>;

/** Underline / ghost input — Midnight Luxe. No box, border-b only, champagne focus. */
const OnboardingInput = React.forwardRef<HTMLInputElement, OnboardingInputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "w-full bg-bg-card px-3 py-3 text-text-primary font-body placeholder:text-text-muted transition-all duration-300",
          "border-b border-ui-tags focus:border-brand-teal focus:outline-none focus:ring-0",
          "rounded-[2rem] rounded-b-none rounded-t-[0.25rem]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
OnboardingInput.displayName = "OnboardingInput";

export { OnboardingInput };
