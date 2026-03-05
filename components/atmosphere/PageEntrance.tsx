"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

interface PageEntranceProps {
  children: ReactNode;
  /** Selector for stagger children; default "[data-entrance]" */
  staggerSelector?: string;
  /** Stagger delay in seconds */
  stagger?: number;
  /** Initial y offset (default 30) */
  y?: number;
  /** Ease (default power3.out) */
  ease?: string;
  /** Duration in seconds */
  duration?: number;
}

export function PageEntrance({
  children,
  staggerSelector = "[data-entrance]",
  stagger = 0.1,
  y = 30,
  ease = "power3.out",
  duration = 0.5,
}: PageEntranceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = containerRef.current?.querySelectorAll(staggerSelector);
      if (!els?.length) return;
      gsap.fromTo(
        els,
        { opacity: 0, y },
        { opacity: 1, y: 0, duration, stagger, ease, overwrite: "auto" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [staggerSelector, stagger, y, ease, duration]);

  return <div ref={containerRef}>{children}</div>;
}
