"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
  subtitle?: string;
  addAssetHref?: string;
  addAssetLabel?: string;
  action?: React.ReactNode;
}

export function Header({
  title,
  subtitle,
  addAssetHref,
  addAssetLabel = "+ Add Asset",
  action,
}: HeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-ui-tags/50 bg-bg-main/95 px-6 backdrop-blur-sm">
      <div>
        <h1 className="text-lg font-display font-bold uppercase tracking-display text-text-primary [-webkit-font-smoothing:antialiased]">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-text-muted">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        {action}
        {addAssetHref && (
          <Button asChild size="sm">
            <Link href={addAssetHref}>{addAssetLabel}</Link>
          </Button>
        )}
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
