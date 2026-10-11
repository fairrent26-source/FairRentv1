"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    indicatorClassName?: string;
    /** Adds a subtle moving sheen over the filled portion. */
    shimmer?: boolean;
  }
>(({ className, value, indicatorClassName, shimmer = false, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-ui-tags",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        "relative h-full w-full flex-1 overflow-hidden rounded-full transition-transform duration-700 ease-out motion-reduce:transition-none",
        // Default fill: champagne gradient. Override via indicatorClassName.
        "bg-gradient-to-r from-brand-teal via-brand-teal to-accent-lime",
        indicatorClassName
      )}
      style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
    >
      {shimmer && (
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent animate-progress-shimmer motion-reduce:hidden"
        />
      )}
    </ProgressPrimitive.Indicator>
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
