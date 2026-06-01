"use client";

import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

/** Illustrative UK portfolio — disclosed in UI as an estimate */
const EXAMPLE = {
  units: 4,
  avgRentMonthly: 1200,
  annualRent: 4 * 1200 * 12,
} as const;

const HIGH_STREET_RATE = 0.12;
const FAIRRENT_UNIT_MONTHLY = 9;
const FAIRRENT_PAY_RATE = 0.012;

function formatGbp(amount: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(amount);
}

const HIGH_STREET_ITEMS = [
  "10–15% of rent in full-management fees",
  "Tenant-find fees (often one month’s rent)",
  "Renewal & inventory charges on top",
  "Performance judged by reviews, not records",
] as const;

const FAIRRENT_ITEMS = [
  "£9 per unit / month — predictable platform fee",
  "1.2% on rent you collect through FairRent Pay",
  "No pay-to-boost listings or opaque commissions",
  "Scores built from payments, repairs & compliance",
] as const;

function ComparisonColumn({
  title,
  subtitle,
  annualCost,
  items,
  variant,
}: {
  title: string;
  subtitle: string;
  annualCost: string;
  items: readonly string[];
  variant: "traditional" | "fairrent";
}) {
  const isFairRent = variant === "fairrent";

  return (
    <article
      className={cn(
        "landing-panel-nested flex h-full flex-col rounded-[2rem] p-6 md:rounded-[2.75rem] md:p-8",
        isFairRent
          ? "border-champagne/25 bg-champagne/[0.07] ring-1 ring-champagne/10"
          : "border-white/[0.07] bg-white/[0.03]"
      )}
    >
      <p className="text-xs font-medium uppercase tracking-[0.15em] text-champagne/80">{subtitle}</p>
      <h4 className={cn("mt-2 text-xl font-bold tracking-tight md:text-2xl", isFairRent ? "text-champagne" : "text-ivory")}>
        {title}
      </h4>
      <p className="mt-4 font-mono text-3xl font-bold text-ivory md:text-4xl">{annualCost}</p>
      <p className="mt-1 text-xs text-ivory/50">estimated annual cost (example portfolio)</p>
      <ul className="mt-6 flex-1 space-y-3 border-t border-white/[0.08] pt-6">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm leading-snug text-ivory/75">
            {isFairRent ? (
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-champagne" aria-hidden />
            ) : (
              <X className="mt-0.5 h-4 w-4 shrink-0 text-ivory/35" aria-hidden />
            )}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-8 text-center text-sm font-medium uppercase tracking-[0.2em] text-champagne/80">
      {children}
    </p>
  );
}

export function LandingAgentComparison() {
  const highStreetAnnual = Math.round(EXAMPLE.annualRent * HIGH_STREET_RATE);
  const fairRentAnnual = Math.round(
    EXAMPLE.units * FAIRRENT_UNIT_MONTHLY * 12 + EXAMPLE.annualRent * FAIRRENT_PAY_RATE
  );
  const estimatedSaving = highStreetAnnual - fairRentAnnual;
  const savingPercent = Math.round((estimatedSaving / highStreetAnnual) * 100);

  return (
    <section aria-label="Comparison with traditional estate agents" data-landing-card>
      <SectionEyebrow>Why FairRent exists</SectionEyebrow>

      <p className="mx-auto mb-10 max-w-2xl text-center text-sm leading-relaxed text-ivory/60 md:text-base">
        High-street agents were built for a market that rewards turnover and opacity. FairRent was built for
        landlords who want verified tenants, lower overhead, and a record that travels with the property — not
        another brochure in a shop window.
      </p>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
        <ComparisonColumn
          variant="traditional"
          subtitle="Typical model"
          title="High-street full management"
          annualCost={formatGbp(highStreetAnnual)}
          items={HIGH_STREET_ITEMS}
        />
        <ComparisonColumn
          variant="fairrent"
          subtitle="FairRent estimate"
          title="Accountability-first platform"
          annualCost={formatGbp(fairRentAnnual)}
          items={FAIRRENT_ITEMS}
        />
      </div>

      <article className="landing-panel landing-panel-beam mt-6 rounded-[2.5rem] p-7 md:mt-7 md:rounded-[3.5rem] md:p-9">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <div className="max-w-md">
            <p className="text-sm font-medium text-champagne">Estimated saving on management-style fees</p>
            <p className="mt-2 text-sm leading-relaxed text-ivory/55">
              Based on {EXAMPLE.units} units at £{EXAMPLE.avgRentMonthly.toLocaleString("en-GB")}/month, with
              traditional fees at ~12% of rent vs FairRent&apos;s published platform pricing.
            </p>
          </div>
          <div className="shrink-0 text-center md:text-right">
            <p className="font-mono text-4xl font-bold tracking-tight text-champagne md:text-5xl">
              {formatGbp(estimatedSaving)}
            </p>
            <p className="mt-1 text-sm text-ivory/50">per year · ~{savingPercent}% less on this slice</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 border-t border-white/[0.08] pt-8 sm:grid-cols-3">
          <div className="text-center sm:text-left">
            <p className="text-xs uppercase tracking-wider text-ivory/45">Annual rent (example)</p>
            <p className="mt-1 font-mono text-lg font-semibold text-ivory">{formatGbp(EXAMPLE.annualRent)}</p>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-xs uppercase tracking-wider text-ivory/45">High-street @ ~12%</p>
            <p className="mt-1 font-mono text-lg font-semibold text-ivory/70">{formatGbp(highStreetAnnual)}</p>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-xs uppercase tracking-wider text-ivory/45">FairRent (fees above)</p>
            <p className="mt-1 font-mono text-lg font-semibold text-champagne">{formatGbp(fairRentAnnual)}</p>
          </div>
        </div>
      </article>

      <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-ivory/45">
        Illustrative comparison only. High-street fees vary by agency, region, and service level. Tenant-find,
        legal, and maintenance costs are excluded. Your actual saving depends on portfolio size and how you use
        FairRent Pay.
      </p>
    </section>
  );
}
