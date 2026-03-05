"use client";

import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface MouseGlowCardProps {
  children: ReactNode;
  className?: string;
}

/** #C9A84C at ~6% opacity (0x10 in 8-digit hex) — subtle radial behind glass */
const GLOW_COLOR = "rgba(201, 168, 76, 0.06)";

/**
 * Card with GSAP-powered mouse-follow radial glow.
 * Glow tracks cursor smoothly behind the glass surface.
 */
export function MouseGlowCard({ children, className }: MouseGlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 50, y: 50 });
  const tweenRef = useRef<((v: number) => void) | null>(null);

  useEffect(() => {
    const el = ref.current;
    const glow = glowRef.current;
    if (!el || !glow) return;

    let mounted = true;
    const ctx = gsap.context(() => {
      tweenRef.current = gsap.quickTo(posRef.current, "x", { duration: 0.4, ease: "power2.out" });
      const tweenY = gsap.quickTo(posRef.current, "y", { duration: 0.4, ease: "power2.out" });

      const handleMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        tweenRef.current?.(x);
        tweenY(y);
      };

      el.addEventListener("mousemove", handleMove);
      el.addEventListener("mouseleave", () => {
        tweenRef.current?.(50);
        tweenY(50);
      });

      const tick = () => {
        if (!mounted) return;
        const { x, y } = posRef.current;
        glow.style.background = `radial-gradient(ellipse 55% 35% at ${x}% ${y}%, ${GLOW_COLOR} 0%, transparent 70%)`;
        requestAnimationFrame(tick);
      };
      tick();

      return () => {
        mounted = false;
        el.removeEventListener("mousemove", handleMove);
      };
    }, ref);

    return () => {
      mounted = false;
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden rounded-[2rem]", className)}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(ellipse 55% 35% at 50% 50%, ${GLOW_COLOR} 0%, transparent 70%)`,
        }}
        aria-hidden
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
