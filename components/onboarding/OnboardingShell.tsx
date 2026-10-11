"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import gsap from "gsap";
import { KineticStepper, type StepItem } from "./KineticStepper";
import { cn } from "@/lib/utils";

interface OnboardingShellProps {
  /** Full-bleed background image URL (e.g. LUXE_IMAGES.onboardingTenant) */
  imageSrc: string;
  /** Step labels for the kinetic progress bar */
  steps: StepItem[];
  /** Current step index (0-based) */
  currentIndex: number;
  /** Called when user taps Back (only shown when currentIndex > 0) */
  onBack?: () => void;
  children: ReactNode;
  /** Optional class for the form/content column */
  className?: string;
}

/** Cinematic onboarding layout: full-bleed image, shadow mask, glass form area, GSAP step transitions. */
export function OnboardingShell({
  imageSrc,
  steps,
  currentIndex,
  onBack,
  children,
  className,
}: OnboardingShellProps) {
  const stepRef = useRef<HTMLDivElement>(null);
  const prevIndexRef = useRef(currentIndex);

  useEffect(() => {
    const el = stepRef.current;
    if (!el) return;
    const direction = currentIndex >= prevIndexRef.current ? 1 : -1;
    prevIndexRef.current = currentIndex;
    gsap.fromTo(
      el,
      { opacity: 0, x: direction * 40 },
      { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" }
    );
  }, [currentIndex]);

  return (
    <div className="relative min-h-screen bg-bg-main">
      <KineticStepper steps={steps} currentIndex={currentIndex} />

      {/* Fixed background: stays in place while content scrolls */}
      <div className="fixed inset-0 z-0">
        <img
          src={imageSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"
          aria-hidden
        />
      </div>

      <header className="relative z-10 flex h-14 flex-wrap items-center justify-between gap-2 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          {onBack && currentIndex > 0 ? (
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-1.5 rounded-[2rem] border border-ui-tags bg-white/10 px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:border-brand-teal/50 hover:bg-white/15 hover:text-text-primary"
            >
              <span aria-hidden>←</span>
              Back
            </button>
          ) : null}
          <Link
            href="/"
            className="rounded-[2rem] px-2 py-1.5 text-text-primary/90 transition-colors hover:text-text-primary"
          >
            <span className="text-sm font-bold tracking-tight" style={{ letterSpacing: "-0.02em" }}>
              FairRent
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-text-muted">
            Step {currentIndex + 1} of {steps.length}
          </span>
          <Link
            href="/"
            className="rounded-[2rem] border border-brand-teal/40 bg-brand-teal/20 px-4 py-2 text-sm font-medium text-brand-teal transition-colors hover:bg-brand-teal/30 hover:text-brand-teal"
          >
            Return to home
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex min-h-[calc(100vh-3.5rem)] items-start justify-start px-4 pb-12 pt-6 sm:px-6 lg:px-12">
        {/* Form column: glass, rounded, no hard widths — sits in the shadow */}
        <div
          className={cn(
            "w-full max-w-full rounded-[2rem] py-8 pr-8 pl-6",
            "backdrop-blur-xl",
            "border border-ui-tags bg-bg-card shadow-[0_20px_50px_rgba(0,0,0,0.08)]",
            "sm:max-w-xl lg:max-w-2xl",
            className
          )}
        >
          <div ref={stepRef} className="min-w-0">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
