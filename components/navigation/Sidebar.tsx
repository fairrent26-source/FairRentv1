"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import {
  LayoutDashboard,
  Building2,
  Users,
  Wrench,
  DollarSign,
  Award,
  MessageSquare,
  Settings,
  LogOut,
  ShoppingCart,
  Heart,
  FileCheck,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type Role = "landlord" | "tenant";

const landlordNav = [
  { href: "/landlord", label: "Overview", icon: LayoutDashboard },
  { href: "/landlord/portfolio", label: "Portfolio", icon: Building2 },
  { href: "/landlord/matches", label: "Tenant Matches", icon: Users },
  { href: "/landlord/maintenance", label: "Maintenance & SLAs", icon: Wrench },
  { href: "/landlord/financials", label: "$ Financials", icon: DollarSign },
  { href: "/landlord/pedigree", label: "Pedigree", icon: Award },
  { href: "/landlord/messages", label: "Messages", icon: MessageSquare },
];

const tenantNav = [
  { href: "/tenant", label: "Overview", icon: LayoutDashboard },
  { href: "/tenant/marketplace", label: "The Marketplace", icon: ShoppingCart },
  { href: "/tenant/matches", label: "My Matches", icon: Heart },
  { href: "/tenant/passport", label: "My Passport", icon: FileCheck },
  { href: "/tenant/tenancy", label: "My Tenancy", icon: Home },
  { href: "/tenant/messages", label: "Messages", icon: MessageSquare },
];

interface SidebarProps {
  role: Role;
  unreadMessages: number;
  entityName: string;
}

function NavLinks({
  role,
  pathname,
  unreadMessages,
  compact = false,
}: {
  role: Role;
  pathname: string;
  unreadMessages: number;
  compact?: boolean;
}) {
  const nav = role === "landlord" ? landlordNav : tenantNav;

  return (
    <>
      {nav.map((item) => {
        const isActive = pathname === item.href || (item.href !== `/${role}` && pathname.startsWith(item.href));
        const showBadge = item.label === "Messages" && unreadMessages > 0;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
              compact ? "flex-col gap-1 py-2" : "",
              isActive ? "bg-champagne/10 text-champagne" : "text-ivory/70 hover:bg-slate-luxe/50 hover:text-ivory"
            )}
            title={item.label}
          >
            {isActive && !compact && (
              <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r bg-champagne" />
            )}
            {isActive && compact && (
              <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-t bg-champagne" />
            )}
            <Icon className="h-4 w-4 shrink-0 opacity-90" />
            {!compact && (
              <>
                <span className="flex-1 tracking-tight">{item.label}</span>
                {showBadge && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500/90 px-1.5 text-[11px] font-semibold text-white">
                    {unreadMessages}
                  </span>
                )}
              </>
            )}
            {compact && showBadge && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500/90 text-[10px] font-semibold text-white">
                {unreadMessages}
              </span>
            )}
          </Link>
        );
      })}
    </>
  );
}

/** Single source of truth for dashboard navigation. Fixed width on desktop; bottom-docked glass bar on mobile. */
export function Sidebar({ role, unreadMessages, entityName }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      {/* Desktop: fixed to viewport — full height, constant width; only active link changes */}
      <aside
        className={cn(
          "hidden md:flex md:fixed md:inset-y-0 md:left-0 md:z-40 md:h-screen md:w-64 md:flex-col",
          "border-r border-white/10 bg-obsidian"
        )}
      >
        <div className="flex h-14 shrink-0 items-center gap-2 border-b border-white/10 px-4">
          <Link href={role === "landlord" ? "/landlord" : "/tenant"} className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
              <span className="text-base font-medium text-champagne">✓</span>
            </div>
            <span className="font-bold tracking-tight text-ivory" style={{ letterSpacing: "-0.02em" }}>
              FairRent
            </span>
          </Link>
        </div>
        <nav className="min-h-0 flex-1 space-y-0.5 overflow-y-auto p-3">
          <NavLinks role={role} pathname={pathname} unreadMessages={unreadMessages} compact={false} />
        </nav>
        <div className="shrink-0 border-t border-white/10 p-3">
          <div className="mb-2 flex items-center gap-2.5 rounded-xl px-3 py-2 text-ivory/60">
            <div className="h-8 w-8 shrink-0 rounded-full border border-white/10 bg-white/[0.03]" />
            <span className="truncate text-sm">{entityName}</span>
          </div>
          <Link
            href={role === "landlord" ? "/landlord/settings" : "/tenant/settings"}
            className={cn(
              "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-ivory/70 transition-colors hover:bg-white/[0.06] hover:text-ivory",
              pathname.includes("settings") ? "bg-white/[0.06] text-ivory" : ""
            )}
          >
            <Settings className="h-4 w-4 shrink-0" />
            Settings
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-ivory/70 transition-colors hover:bg-white/[0.06] hover:text-ivory"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Log out
          </button>
        </div>
      </aside>

      {/* Mobile: bottom-docked glass bar — includes prominent Log out */}
      <nav
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around gap-0.5 overflow-x-auto",
          "border-t border-white/10 bg-obsidian/90 px-1 py-2 backdrop-blur-3xl",
          "md:hidden"
        )}
      >
        <NavLinks role={role} pathname={pathname} unreadMessages={unreadMessages} compact />
        <Link
          href={role === "landlord" ? "/landlord/settings" : "/tenant/settings"}
          className={cn(
            "flex shrink-0 flex-col items-center gap-0.5 rounded-xl px-2 py-2 text-ivory/70",
            pathname.includes("settings") ? "text-champagne" : ""
          )}
          title="Settings"
        >
          <Settings className="h-4 w-4 shrink-0" />
          <span className="text-[10px]">Settings</span>
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="flex shrink-0 flex-col items-center gap-0.5 rounded-xl border border-red-500/40 bg-red-500/15 px-3 py-2 text-red-300 transition-colors hover:bg-red-500/25 hover:text-red-200"
          title="Log out"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <span className="text-[10px] font-medium">Log out</span>
        </button>
      </nav>
    </>
  );
}
