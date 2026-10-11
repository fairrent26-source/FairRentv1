"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardWidgetProps {
  children: ReactNode;
  className?: string;
}

/** Glass artifact for dashboard: bg-bg-card, backdrop-blur-xl, border-ui-tags. */
export function DashboardWidget({ children, className }: DashboardWidgetProps) {
  return (
    <div
      className={cn(
        "rounded-[2rem] border border-ui-tags bg-bg-card backdrop-blur-xl",
        className
      )}
    >
      {children}
    </div>
  );
}
