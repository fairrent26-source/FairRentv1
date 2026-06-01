import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PublicMarketplaceNav() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-slate-luxe/50 bg-obsidian/95 px-6 backdrop-blur-sm">
      <Link href="/" className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-luxe/50 bg-slate-luxe/60">
          <span className="text-lg text-champagne">✓</span>
        </div>
        <span className="font-bold tracking-tight text-ivory" style={{ letterSpacing: "-0.02em" }}>
          FairRent
        </span>
      </Link>
      <nav className="flex flex-wrap items-center justify-end gap-2 sm:gap-3" aria-label="Marketplace">
        <Link href="/">
          <Button variant="ghost" size="sm">
            Return to homepage
          </Button>
        </Link>
        <Link href="/auth?role=landlord">
          <Button variant="outline" size="sm">
            Sign up / login · Landlord
          </Button>
        </Link>
        <Link href="/auth?role=tenant">
          <Button size="sm">Sign up / login · Tenant</Button>
        </Link>
      </nav>
    </header>
  );
}
