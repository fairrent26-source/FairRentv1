import * as React from "react";
import { cn } from "@/lib/utils";

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

/** Loading placeholder. Respects prefers-reduced-motion (pulse disabled). */
function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "rounded-xl bg-ui-tags animate-skeleton-pulse motion-reduce:animate-none",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
