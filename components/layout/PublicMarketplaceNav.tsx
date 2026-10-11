import Link from "next/link";
import { FairRentLockup } from "@/components/brand/FairRentLogo";
import { Button } from "@/components/ui/button";

export function PublicMarketplaceNav() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-ui-tags/50 bg-bg-main/95 px-6 backdrop-blur-sm">
      <Link href="/" className="flex items-center" aria-label="FairRent home">
        <FairRentLockup />
      </Link>
      <nav className="flex flex-wrap items-center justify-end gap-2 sm:gap-3" aria-label="Marketplace">
        <Link href="/">
          <Button variant="ghost" size="sm">
            Return to homepage
          </Button>
        </Link>
        <Link href="/#early-access">
          <Button size="sm">Join the waitlist</Button>
        </Link>
      </nav>
    </header>
  );
}
