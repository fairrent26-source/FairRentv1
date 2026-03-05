"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StepItem {
  label: string;
  done?: boolean;
}

interface StepperProps {
  steps: StepItem[];
  currentIndex: number;
  className?: string;
}

export function Stepper({ steps, currentIndex, className }: StepperProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {steps.map((step, i) => {
        const isDone = step.done ?? i < currentIndex;
        const isCurrent = i === currentIndex;
        return (
          <div key={step.label} className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-colors",
                isDone && "bg-emerald-600 text-white",
                isCurrent && !isDone && "bg-emerald-600 text-white",
                !isDone && !isCurrent && "border border-slate-600 bg-slate-900 text-slate-500"
              )}
            >
              {isDone && !isCurrent ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span
              className={cn(
                "text-sm font-medium",
                isCurrent ? "text-slate-100" : "text-slate-500"
              )}
            >
              {step.label}
            </span>
            {i < steps.length - 1 && (
              <div className="mx-1 h-px w-6 bg-slate-700" aria-hidden />
            )}
          </div>
        );
      })}
    </div>
  );
}
