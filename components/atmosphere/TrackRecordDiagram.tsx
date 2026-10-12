import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LANDING_PATHS } from "@/lib/landing-sections";
import { cn } from "@/lib/utils";

/** What renters gain by using FairRent */
const RENTER_SEES = [
  "Know who you're renting from",
  "Listings you can trust",
  "Repairs that get a response",
  "A deposit you can account for",
] as const;

/** What landlords gain by using FairRent */
const LANDLORD_SEES = [
  "Tenants who pay on time",
  "Fewer failed tenancies",
  "Homes left in good shape",
  "References you can trust",
] as const;

function RecordList({
  items,
  dotClass,
}: {
  items: readonly string[];
  dotClass: string;
}) {
  return (
    <ul className="space-y-2 text-left">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2">
          <span
            className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-bg-card shadow-sm`}
          >
            <span className={`h-2 w-2 rounded-full ${dotClass}`} />
          </span>
          <span className="text-left font-body text-[11px] font-medium leading-snug text-text-primary md:text-xs">
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
        "mb-3 h-11 w-full rounded-xl border-2 border-text-primary/15 font-semibold shadow-md hover:-translate-y-0.5 hover:bg-accent-lime hover:text-text-primary hover:shadow-lg",
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
      aria-label="What renters and landlords gain from FairRent"
    >
      <article className="rounded-2xl bg-[#E6FBFA] p-5 md:p-6">
        <SideCta href={LANDING_PATHS.renters} tone="renter">
          Renters
        </SideCta>
        <p className="mb-4 text-left font-body text-[13px] font-semibold leading-snug text-text-primary md:text-sm">
          Find a home you can feel good about.
        </p>
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
        <p className="mt-3 max-w-[16rem] font-accent text-lg italic leading-snug text-text-primary md:text-xl">
          Better matches, built to last.
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
        <p className="mb-4 text-left font-body text-[13px] font-semibold leading-snug text-text-primary md:text-sm">
          Rent to quality tenants and stay compliant.
        </p>
        <RecordList items={LANDLORD_SEES} dotClass="bg-[#0F766E]" />
      </article>
    </div>
  );
}
