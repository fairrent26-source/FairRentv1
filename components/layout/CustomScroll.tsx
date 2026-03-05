"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CustomScrollProps {
  children: ReactNode;
  className?: string;
}

/** Scrollable widget area with Champagne-accent scrollbar and reveal (peek) padding. */
export function CustomScroll({ children, className }: CustomScrollProps) {
  return (
    <div
      className={cn(
        "custom-scroll overflow-y-auto overflow-x-hidden",
        "pb-24 md:pb-8",
        className
      )}
    >
      {children}
    </div>
  );
}
