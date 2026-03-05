"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { ScoreBreakdownItem } from "@/mock/types";

interface ScoreDisplayProps {
  value: number;
  max?: number;
  label: string;
  breakdown?: ScoreBreakdownItem[];
  size?: "sm" | "md" | "lg";
  className?: string;
}

const maxDefault = 5;

function getScoreColor(value: number, max: number): string {
  const pct = value / max;
  if (pct >= 0.9) return "text-champagne";
  if (pct >= 0.6) return "text-amber-400";
  return "text-red-400";
}

function getStrokeGradient(value: number, max: number): string {
  const pct = value / max;
  if (pct >= 0.9) return "url(#score-champagne)";
  if (pct >= 0.6) return "url(#score-amber)";
  return "url(#score-red)";
}

export function ScoreDisplay({
  value,
  max = maxDefault,
  label,
  breakdown,
  size = "md",
  className,
}: ScoreDisplayProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const pct = Math.min(1, Math.max(0, value / max));
  const colorClass = getScoreColor(value, max);
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - pct * circumference;

  const sizeClasses = {
    sm: "h-20 w-20",
    md: "h-28 w-28",
    lg: "h-36 w-36",
  };

  const numSizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      {label && (
        <span className="text-xs font-medium uppercase tracking-wider text-ivory/60">
          {label}
        </span>
      )}
      <div className={cn("relative", sizeClasses[size])}>
        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden>
          <defs>
            <linearGradient id="score-champagne" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C9A84C" />
              <stop offset="100%" stopColor="#a88b3a" />
            </linearGradient>
            <linearGradient id="score-amber" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(245 158 11)" />
              <stop offset="100%" stopColor="rgb(217 119 6)" />
            </linearGradient>
            <linearGradient id="score-red" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(220 38 38)" />
              <stop offset="100%" stopColor="rgb(185 28 28)" />
            </linearGradient>
          </defs>
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="7"
            className="text-slate-luxe"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="7"
            strokeLinecap="round"
            stroke={getStrokeGradient(value, max)}
            strokeDasharray={circumference}
            strokeDashoffset={mounted ? offset : circumference}
            className="transition-[stroke-dashoffset] duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={cn(
              "font-bold tabular-nums tracking-tight [-webkit-font-smoothing:antialiased]",
              numSizes[size],
              colorClass
            )}
          >
            {value.toFixed(1)}
          </span>
          <span className="text-[10px] font-medium tabular-nums text-ivory/50">
            / {max}
          </span>
        </div>
      </div>
      {breakdown && breakdown.length > 0 && (
        <details className="text-xs text-ivory/60">
          <summary className="cursor-pointer hover:text-ivory/80">Breakdown</summary>
          <ul className="mt-1 space-y-0.5 pl-4">
            {breakdown.map((b) => (
              <li key={b.label}>
                {b.label}: {b.value}/{b.max}
                {b.description && ` — ${b.description}`}
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
