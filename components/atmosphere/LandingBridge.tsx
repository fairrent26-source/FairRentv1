import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LUXE_IMAGES } from "@/lib/images";

interface LandingBridgeProps {
  children: ReactNode;
  className?: string;
  /** Primary bridge image — architectural interior by default */
  imageSrc?: string;
}

/**
 * Full-width visual band between hero fade and main content.
 * Provides a photographic surface so glass panels are not floating on flat obsidian.
 */
export function LandingBridge({
  children,
  className,
  imageSrc = LUXE_IMAGES.architectural,
}: LandingBridgeProps) {
  return (
    <section
      className={cn("relative w-full overflow-hidden", className)}
      aria-label="Product highlights"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <img
          src={imageSrc}
          alt=""
          className="h-full w-full object-cover object-center opacity-40 grayscale-[0.15]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #0D0D12 0%, rgba(13,13,18,0.55) 18%, rgba(13,13,18,0.72) 50%, rgba(13,13,18,0.88) 82%, #0D0D12 100%)",
          }}
        />
        <div
          className="absolute inset-0 mix-blend-soft-light opacity-50"
          style={{
            background:
              "radial-gradient(ellipse 90% 60% at 50% 40%, rgba(201,168,76,0.08) 0%, transparent 55%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-16 md:py-24">{children}</div>
    </section>
  );
}
