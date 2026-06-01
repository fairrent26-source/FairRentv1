"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { LANDING_SECTIONS } from "@/lib/landing-sections";

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
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith("/#")) return;
    const id = href.slice(2);
    if (pathname === "/" && scrollToSection(id)) {
      e.preventDefault();
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className="text-[11px] text-ivory/70 transition-colors hover:text-ivory sm:text-xs"
    >
      {children}
    </Link>
  );
}

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 transition-all duration-300 sm:px-5 ${
        scrolled
          ? "border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-[40px]"
          : "border-transparent bg-transparent shadow-none backdrop-blur-none"
      }`}
    >
      <div
        className={`mx-auto flex h-9 w-full max-w-4xl items-center justify-between rounded-xl border px-3 transition-colors duration-300 sm:px-4 ${
          scrolled ? "border-white/10 bg-obsidian/80" : "border-white/10 bg-white/[0.04]"
        }`}
      >
        <Link href="/" className="flex items-center gap-1.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 bg-white/[0.04]">
            <span className="text-xs font-medium text-champagne">✓</span>
          </div>
          <span className="text-xs font-bold tracking-tight text-ivory" style={{ letterSpacing: "-0.02em" }}>
            FairRent
          </span>
        </Link>
        <nav className="flex items-center gap-3 sm:gap-4" aria-label="Landing">
          <LandingNavLink href={`/#${LANDING_SECTIONS.howItWorks}`}>How It Works</LandingNavLink>
          <LandingNavLink href={`/#${LANDING_SECTIONS.accountability}`}>The Score</LandingNavLink>
          <Link href="/marketplace" className="text-[11px] text-ivory/70 transition-colors hover:text-ivory sm:text-xs">
            Marketplace
          </Link>
          <Link href="/auth">
            <Button variant="outline" size="sm" className="h-7 rounded-lg px-2.5 text-[11px]">
              Log in
            </Button>
          </Link>
          <Link href="/auth">
            <Button size="sm" className="h-7 rounded-lg px-2.5 text-[11px]">
              Sign up
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
