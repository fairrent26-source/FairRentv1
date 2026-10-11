import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LANDING_PATHS } from "@/lib/landing-sections";
import { cn } from "@/lib/utils";

/** What renters check on a landlord */
const RENTER_SEES = [
  "Listing accuracy",
  "Responsiveness to repairs",
  "Communication",
  "Deposit experience",
] as const;

/** What landlords check on a tenant */
const LANDLORD_SEES = [
  "Payment reliability",
  "Successful tenancies",
  "Property care",
  "Verified references",
] as const;

function RecordList({
  items,
  dotClass,
}: {
  items: readonly string[];
  dotClass: string;
}) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2">
          <span
            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-bg-card shadow-sm`}
          >
            <span className={`h-2 w-2 rounded-full ${dotClass}`} />
          </span>
          <span className="whitespace-nowrap font-body text-[11px] font-medium leading-none text-text-primary md:text-xs">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function FlowArrow({ direction }: { direction: "right" | "left" | "down" | "up" }) {
  const rotation =
    direction === "right"
      ? "rotate-0"
      : direction === "left"
        ? "rotate-180"
        : direction === "down"
          ? "rotate-90"
          : "-rotate-90";

  return (
    <div className="flex items-center justify-center" aria-hidden>
      <svg
        viewBox="0 0 40 48"
        className={`h-8 w-7 text-text-primary md:h-12 md:w-10 ${rotation}`}
        fill="currentColor"
      >
        <path d="M6 6 L34 24 L6 42 Z" />
      </svg>
    </div>
  );
}

function SideCta({
  href,
  children,
  tone,
}: {
  href: string;
  children: ReactNode;
  tone: "renter" | "landlord";
}) {
  return (
    <Button
      asChild
      className={cn(
        "mb-4 h-11 w-full rounded-xl border-2 border-text-primary/15 font-semibold shadow-md hover:-translate-y-0.5 hover:bg-accent-lime hover:text-text-primary hover:shadow-lg",
        tone === "landlord" &&
          "bg-[#0F766E] text-white hover:!bg-accent-lime hover:!text-text-primary"
      )}
    >
      <Link href={href}>
        {children}
        <ChevronRight className="h-4 w-4" aria-hidden />
      </Link>
    </Button>
  );
}

export function TrackRecordDiagram() {
  return (
    <div
      className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_minmax(12rem,1.15fr)_auto_1fr] md:gap-2 lg:gap-4"
      aria-label="How FairRent verifies tenant and landlord track records"
    >
      <article className="rounded-2xl bg-[#E6FBFA] p-5 md:p-6">
        <SideCta href={LANDING_PATHS.renters} tone="renter">
          Renters
        </SideCta>
        <RecordList items={RENTER_SEES} dotClass="bg-brand-teal" />
      </article>

      <div className="flex items-center justify-center py-1 md:py-0">
        <span className="md:hidden">
          <FlowArrow direction="down" />
        </span>
        <span className="hidden md:block">
          <FlowArrow direction="right" />
        </span>
      </div>

      <article className="flex flex-col items-center justify-center rounded-2xl bg-accent-lime px-5 py-8 text-center md:px-6">
        <h3 className="font-display font-bold text-2xl uppercase tracking-display text-text-primary md:text-3xl">FairRent</h3>
        <p className="mt-2 font-accent italic text-text-primary">Verified rental history</p>
        <p className="mt-4 max-w-[16rem] font-body text-xs leading-relaxed text-text-primary/80 md:text-sm">
          A shared record of how the rental relationship actually performed.
        </p>
      </article>

      <div className="flex items-center justify-center py-1 md:py-0">
        <span className="md:hidden">
          <FlowArrow direction="up" />
        </span>
        <span className="hidden md:block">
          <FlowArrow direction="left" />
        </span>
      </div>

      <article className="rounded-2xl bg-[#E6F7F2] p-5 md:p-6">
        <SideCta href={LANDING_PATHS.landlords} tone="landlord">
          Landlords
        </SideCta>
        <RecordList items={LANDLORD_SEES} dotClass="bg-[#0F766E]" />
      </article>
    </div>
  );
}
