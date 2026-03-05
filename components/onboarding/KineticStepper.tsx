"use client";

import { cn } from "@/lib/utils";

export interface StepItem {
  label: string;
  done?: boolean;
}

interface KineticStepperProps {
  steps: StepItem[];
  currentIndex: number;
  className?: string;
}

/** Thin glowing Champagne progress line at the very top of the viewport. */
export function KineticStepper({ steps, currentIndex, className }: KineticStepperProps) {
  const progress = steps.length > 0 ? ((currentIndex + 1) / steps.length) * 100 : 0;

  return (
    <div
      className={cn("fixed left-0 right-0 top-0 z-[100] h-0.5 overflow-hidden bg-obsidian/80", className)}
      role="progressbar"
      aria-valuenow={currentIndex + 1}
      aria-valuemin={1}
      aria-valuemax={steps.length}
      aria-label={`Step ${currentIndex + 1} of ${steps.length}`}
    >
      <div
        className="h-full bg-champagne shadow-[0_0_12px_rgba(201,168,76,0.6)] transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
