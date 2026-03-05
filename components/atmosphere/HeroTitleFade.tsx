"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface HeroTitleFadeProps {
  children: ReactNode;
  /** Root margin for Intersection Observer (e.g. "0px 0px -20% 0px" to trigger when 20% from bottom) */
  rootMargin?: string;
  /** Threshold (0–1) to consider "out of view" */
  threshold?: number;
}

export function HeroTitleFade({
  children,
  rootMargin = "0px 0px -15% 0px",
  threshold = 0,
}: HeroTitleFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const [e] = entries;
        setIsLeaving(!e.isIntersecting);
      },
      { rootMargin, threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
        isLeaving ? "translate-y-[-24px] opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      {children}
    </div>
  );
}
