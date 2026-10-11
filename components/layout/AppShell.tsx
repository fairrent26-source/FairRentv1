"use client";

import { Sidebar, type Role } from "@/components/navigation/Sidebar";
import { Header } from "@/components/navigation/Header";
import { CustomScroll } from "@/components/layout/CustomScroll";

interface AppShellProps {
  role: Role;
  entityName: string;
  unreadMessages: number;
  title: string;
  subtitle?: string;
  addAssetHref?: string;
  children: React.ReactNode;
  headerAction?: React.ReactNode;
}

/**
 * Dashboard layout: single source of truth for nav (Sidebar).
 * Sidebar fixed width, zero-shift. Main area uses CustomScroll with champagne scrollbar.
 * Reveal: padding-bottom so bottom widget can peek when content overflows.
 */
export function AppShell({
  role,
  entityName,
  unreadMessages,
  title,
  subtitle,
  addAssetHref,
  children,
  headerAction,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-bg-main">
      <Sidebar role={role} unreadMessages={unreadMessages} entityName={entityName} />
      {/* Main content: offset by fixed sidebar width on desktop so it never sits under the nav */}
      <div className="relative flex min-h-screen min-w-0 flex-col md:ml-64">
        <Header
          title={title}
          subtitle={subtitle}
          addAssetHref={addAssetHref}
          action={headerAction}
        />
        <main className="page-enter flex min-h-0 flex-1 flex-col">
          <CustomScroll className="flex-1 px-4 py-6 sm:px-6">
            {/* Reveal protocol: extra padding so bottom-most widget stays partially visible (peek) */}
            <div className="pb-12 md:pb-16">
              {children}
            </div>
          </CustomScroll>
        </main>
      </div>
    </div>
  );
}
