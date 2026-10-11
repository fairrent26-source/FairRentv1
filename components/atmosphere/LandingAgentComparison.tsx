"use client";

import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { formatGbp, LANDING_FEE_EXAMPLE, landingFeeSnapshot } from "@/lib/landing-financials";

const EXAMPLE = LANDING_FEE_EXAMPLE;

const HIGH_STREET_ITEMS = [
  "10–15% of rent in full-management fees",
  "Tenant-find fees (often one month’s rent)",
  "Renewal & inventory charges on top",
  "Performance judged by reviews, not records",
] as const;

const FAIRRENT_ITEMS = [
  "£8–£15 per unit / month — indicative platform fee",
  "1–2% on rent you collect through FairRent Pay",
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
        "flex h-full flex-col rounded-[2rem] border p-6 md:rounded-[2.75rem] md:p-8",
        isFairRent
          ? "border-brand-teal/40 bg-bg-card ring-1 ring-brand-teal/20"
          : "border-ui-tags bg-bg-card"
      )}
    >
      <p className="text-xs font-medium uppercase tracking-[0.15em] text-brand-teal">{subtitle}</p>
      <h4 className={cn("mt-2 text-xl font-bold tracking-tight md:text-2xl", isFairRent ? "text-brand-teal" : "text-text-primary")}>
        {title}
      </h4>
      <p className="mt-4 font-mono text-3xl font-bold text-text-primary md:text-4xl">{annualCost}</p>
      <p className="mt-1 text-xs text-text-muted">estimated annual cost (example portfolio)</p>
      <ul className="mt-6 flex-1 space-y-3 border-t border-ui-tags pt-6">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm leading-snug text-text-primary/80">
            {isFairRent ? (
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" aria-hidden />
            ) : (
              <X className="mt-0.5 h-4 w-4 shrink-0 text-text-muted" aria-hidden />
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
    <p className="mb-8 text-center font-display font-bold text-[1.75rem] uppercase tracking-display text-brand-teal md:text-[2rem]">
      {children}
    </p>
  );
}

export function LandingAgentComparison() {
  const { annualRent, highStreetAnnual, fairRentAnnual, estimatedSaving, savingPercent } =
    landingFeeSnapshot();

  return (
    <section
      aria-label="Comparison with traditional estate agents"
      data-landing-card
      className="relative left-1/2 z-10 w-screen -translate-x-1/2 bg-landing-band py-16 md:py-24"
    >
      <div className="mx-auto max-w-5xl px-6">
        <SectionEyebrow>Why FairRent</SectionEyebrow>

        <p className="mx-auto mb-10 max-w-2xl text-center font-body text-sm leading-relaxed text-text-muted md:text-base">
          High-street agents were built for a market that rewards turnover and opacity. FairRent was built for
          landlords who want verified tenants, lower overhead, and a record that travels with the property.
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

        <article className="mt-6 rounded-[2.5rem] border border-ui-tags bg-bg-card p-7 md:mt-7 md:rounded-[3.5rem] md:p-9">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <div className="max-w-md">
              <p className="text-sm font-display font-bold uppercase tracking-display text-brand-teal">
                Estimated saving on management-style fees
              </p>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                Based on {EXAMPLE.units} units at £{EXAMPLE.avgRentMonthly.toLocaleString("en-GB")}/month, with
                traditional fees at ~12% of rent vs FairRent&apos;s indicative platform fee ranges.
              </p>
            </div>
            <div className="shrink-0 text-center md:text-right">
              <p className="font-mono text-4xl font-bold tracking-tight text-brand-teal md:text-5xl">
                {formatGbp(estimatedSaving)}
              </p>
              <p className="mt-1 text-sm text-text-muted">per year · ~{savingPercent}% less on this slice</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 border-t border-ui-tags pt-8 sm:grid-cols-3">
            <div className="text-center sm:text-left">
              <p className="text-xs uppercase tracking-wider text-text-muted">Annual rent (example)</p>
              <p className="mt-1 font-mono text-lg font-semibold text-text-primary">{formatGbp(annualRent)}</p>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-xs uppercase tracking-wider text-text-muted">High-street @ ~12%</p>
              <p className="mt-1 font-mono text-lg font-semibold text-text-primary/70">{formatGbp(highStreetAnnual)}</p>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-xs uppercase tracking-wider text-text-muted">FairRent (fees above)</p>
              <p className="mt-1 font-mono text-lg font-semibold text-brand-teal">{formatGbp(fairRentAnnual)}</p>
            </div>
          </div>
        </article>

        <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-text-muted">
          Illustrative comparison only. High-street fees vary by agency, region, and service level. Tenant-find,
          legal, and maintenance costs are excluded. Your actual saving depends on portfolio size and how you use
          FairRent Pay.
        </p>
      </div>
    </section>
  );
}
