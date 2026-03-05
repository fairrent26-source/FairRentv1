"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardWidgetProps {
  children: ReactNode;
  className?: string;
}

/** Glass artifact for dashboard: bg-white/[0.03], backdrop-blur-xl, border-white/10. */
export function DashboardWidget({ children, className }: DashboardWidgetProps) {
  return (
    <div
      className={cn(
        "rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl",
        className
      )}
    >
      {children}
    </div>
  );
}
