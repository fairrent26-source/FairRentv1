"use client";

import { useMemo, useState } from "react";
import { formatGbp, LANDING_FEE_EXAMPLE, landingFeeFromInputs } from "@/lib/landing-financials";
import { Input } from "@/components/ui/input";

function sanitiseAmount(raw: string) {
  if (raw === "") return "";
  if (!/^\d*$/.test(raw)) return null;
  return raw;
}

export function LandingSavingsCalculator() {
  const [units, setUnits] = useState(String(LANDING_FEE_EXAMPLE.units));
  const [avgRent, setAvgRent] = useState(String(LANDING_FEE_EXAMPLE.avgRentMonthly));

  const fees = useMemo(
    () => landingFeeFromInputs(Number(units) || 0, Number(avgRent) || 0),
    [units, avgRent]
  );

  return (
    <section
      aria-label="FairRent savings calculator"
      className="relative left-1/2 z-10 w-screen -translate-x-1/2 bg-landing-band py-16 md:py-24"
    >
      <div className="mx-auto max-w-5xl px-6">
        <p className="mb-10 text-center font-display font-bold text-[1.75rem] uppercase tracking-display text-brand-teal md:text-[2rem]">
          Why FairRent
        </p>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          <article className="rounded-[2rem] border border-ui-tags bg-bg-card p-6 md:rounded-[2.75rem] md:p-8">
            <p className="font-display font-bold text-sm uppercase tracking-display text-brand-teal">Your portfolio</p>
            <label className="mt-6 block font-body text-sm font-medium text-text-primary">
              Number of properties
              <Input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={units}
                onChange={(e) => {
                  const next = sanitiseAmount(e.target.value);
                  if (next !== null) setUnits(next);
                }}
                className="mt-2 h-12"
                aria-label="Number of properties"
              />
            </label>
            <label className="mt-5 block font-body text-sm font-medium text-text-primary">
              Average monthly rent
              <Input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={avgRent}
                onChange={(e) => {
                  const next = sanitiseAmount(e.target.value);
                  if (next !== null) setAvgRent(next);
                }}
                className="mt-2 h-12"
                aria-label="Average monthly rent"
              />
            </label>
            <p className="mt-4 text-xs leading-relaxed text-text-muted">
              Annual rent on this example: {formatGbp(fees.annualRent)}
            </p>
          </article>

          <article className="rounded-[2rem] border border-ui-tags bg-bg-card p-6 md:rounded-[2.75rem] md:p-8">
            <p className="font-display font-bold text-sm uppercase tracking-display text-brand-teal">Estimated saving</p>
            <p className="mt-6 font-mono text-4xl font-bold tracking-tight text-brand-teal md:text-5xl">
              {formatGbp(Math.max(0, fees.estimatedSaving))}
            </p>
            <p className="mt-1 text-sm text-text-muted">
              per year · {fees.savingPercent}% less than a typical high-street fee
            </p>
            <dl className="mt-8 grid gap-4 border-t border-ui-tags pt-6 sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-wider text-text-muted">High-street @ 12%</dt>
                <dd className="mt-1 font-mono text-lg font-semibold text-text-primary">
                  {formatGbp(fees.highStreetAnnual)}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-text-muted">FairRent @ 2%</dt>
                <dd className="mt-1 font-mono text-lg font-semibold text-brand-teal">
                  {formatGbp(fees.fairRentAnnual)}
                </dd>
              </div>
            </dl>
          </article>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-text-muted">
          Illustrative only. High-street fees vary by agency and service. Your actual saving depends on portfolio
          size, rent, and how you use FairRent.
        </p>
      </div>
    </section>
  );
}
