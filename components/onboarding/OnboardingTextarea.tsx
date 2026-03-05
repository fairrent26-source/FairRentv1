"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type OnboardingTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

/** Ghost textarea — Midnight Luxe, underline style, champagne focus. */
const OnboardingTextarea = React.forwardRef<HTMLTextAreaElement, OnboardingTextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "w-full min-h-[100px] resize-y bg-white/5 py-3 text-ivory placeholder:text-ivory/50 transition-all duration-300",
          "border-b border-white/20 focus:border-champagne focus:outline-none focus:ring-0",
          "rounded-[2rem] rounded-b-none rounded-t-[0.25rem] px-3",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
OnboardingTextarea.displayName = "OnboardingTextarea";

export { OnboardingTextarea };
