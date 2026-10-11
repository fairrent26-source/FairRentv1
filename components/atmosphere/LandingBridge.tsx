import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LandingBridgeProps {
  children: ReactNode;
  className?: string;
}

/**
 * Full-width content band between hero and main product sections.
 */
export function LandingBridge({
  children,
  className,
}: LandingBridgeProps) {
  return (
    <section
      className={cn("relative w-full", className)}
      aria-label="Product highlights"
    >
      <div className="pointer-events-none absolute inset-0 bg-bg-main" aria-hidden />

      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-0 pt-0">{children}</div>
    </section>
  );
}
