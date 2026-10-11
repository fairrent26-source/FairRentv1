"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Menu, X } from "lucide-react";
import { JoinEarlyAccessButton } from "@/components/atmosphere/WaitlistCta";
import { FairRentLockup } from "@/components/brand/FairRentLogo";
import { LANDING_PATHS } from "@/lib/landing-sections";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 48;

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.pushState(null, "", `/#${id}`);
  return true;
}

function LandingNavLink({
  href,
  children,
  label,
  className,
  onNavigate,
  tone = "renter",
}: {
  href: string;
  children: React.ReactNode;
  label: string;
  className?: string;
  onNavigate?: () => void;
  tone?: "renter" | "landlord";
}) {
  const pathname = usePathname();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith("/#")) return;
    const id = href.slice(2);
    if ((pathname === "/" || pathname.startsWith("/for-")) && scrollToSection(id)) {
      e.preventDefault();
    }
    onNavigate?.();
  };

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={handleClick}
      aria-label={label}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "rounded-full px-2.5 py-1 text-[11px] transition-colors sm:text-xs",
        isActive
          ? tone === "landlord"
            ? "bg-brand-teal font-medium text-white"
            : "bg-accent-lime font-medium text-text-primary"
          : "text-text-muted hover:text-text-primary",
        className
      )}
    >
      {children}
    </Link>
  );
}

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    const t = window.setTimeout(() => scrollToSection(hash), 100);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const islandClass = cn(
    "flex h-9 items-center rounded-xl border px-3 transition-colors duration-300 sm:px-4",
    scrolled ? "border-ui-tags bg-bg-main/80" : "border-ui-tags bg-bg-card"
  );

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center bg-transparent px-4 pt-3 sm:px-5">
      <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-3">
        <Link href="/" className={cn(islandClass, "gap-1.5 pr-3.5")} aria-label="FairRent home">
          <FairRentLockup />
        </Link>

        <div ref={menuRef} className="relative">
          <nav className={cn(islandClass, "gap-2 sm:gap-3")} aria-label="Landing">
            <div className="hidden items-center gap-3 md:flex">
              <LandingNavLink href={LANDING_PATHS.renters} label="Renters" tone="renter">
                Renters
              </LandingNavLink>
              <LandingNavLink href={LANDING_PATHS.landlords} label="Landlords" tone="landlord">
                Landlords
              </LandingNavLink>
            </div>

            <button
              type="button"
              className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-text-primary hover:bg-ui-tags md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="landing-nav-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>

            <JoinEarlyAccessButton size="sm" className="h-7 rounded-lg px-2 text-[11px]">
              Join
            </JoinEarlyAccessButton>
          </nav>

          {menuOpen && (
            <div
              id="landing-nav-menu"
              className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-ui-tags bg-bg-card p-2 shadow-card md:hidden"
            >
              <LandingNavLink
                href={LANDING_PATHS.renters}
                label="Renters"
                tone="renter"
                className="block px-3 py-2 text-xs"
                onNavigate={closeMenu}
              >
                Renters
              </LandingNavLink>
              <LandingNavLink
                href={LANDING_PATHS.landlords}
                label="Landlords"
                tone="landlord"
                className="block px-3 py-2 text-xs"
                onNavigate={closeMenu}
              >
                Landlords
              </LandingNavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
