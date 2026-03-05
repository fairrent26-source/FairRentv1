"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface ScrollEmphasisProps {
  children: ReactNode;
  /** Minimum font weight when out of view (default 400) */
  weightMin?: number;
  /** Maximum font weight when in view (default 700) */
  weightMax?: number;
  /** Scale at focus: 1 = no scale (default 1.03) */
  scaleMax?: number;
  /** Transition duration in ms (default 280) */
  duration?: number;
  /** Root margin for triggering earlier/later (default "0% 0% -15% 0%") */
  rootMargin?: string;
  className?: string;
}

export function ScrollEmphasis({
  children,
  weightMin = 400,
  weightMax = 700,
  scaleMax = 1.03,
  duration = 280,
  rootMargin = "0% 0% -15% 0%",
  className,
}: ScrollEmphasisProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [emphasis, setEmphasis] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const ratio = entry.intersectionRatio;
          setEmphasis(ratio);
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  const weight = Math.round(weightMin + emphasis * (weightMax - weightMin));
  const scale = 1 + emphasis * (scaleMax - 1);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `font-weight ${duration}ms ease-out, transform ${duration}ms ease-out`,
        fontWeight: weight,
        transform: `scale(${scale})`,
        transformOrigin: "center center",
      }}
    >
      {children}
    </div>
  );
}
