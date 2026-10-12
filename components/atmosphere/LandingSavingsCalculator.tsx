"use client";

import { useEffect, useRef, useState } from "react";
import { formatGbp, LANDING_FEE_EXAMPLE, landingFeeFromInputs } from "@/lib/landing-financials";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function sanitiseAmount(raw: string) {
  if (raw === "") return "";
  if (!/^\d*$/.test(raw)) return null;
  return raw;
}

const INPUT_LAG_MS = 900;
const STEP_MS = 560;

type Phase = "settled" | "holding" | "calculating";

type TapeLine = {
  label: string;
  detail: string;
  value: string;
};

function tapeFor(units: number, rent: number, fees: ReturnType<typeof landingFeeFromInputs>): TapeLine[] {
  return [
    {
      label: "Annual rent",
      detail: `${units} × ${formatGbp(rent)} × 12`,
      value: formatGbp(fees.annualRent),
    },
    {
      label: "High-street",
      detail: `${formatGbp(fees.annualRent)} × 12%`,
      value: formatGbp(fees.highStreetAnnual),
    },
    {
      label: "FairRent",
      detail: `${formatGbp(fees.annualRent)} × 2%`,
      value: formatGbp(fees.fairRentAnnual),
    },
  ];
}

const STATUS: Record<Phase, string> = {
  holding: "Noting your portfolio",
  calculating: "Working it out",
  settled: "Estimate ready",
};

export function LandingSavingsCalculator() {
  const [units, setUnits] = useState(String(LANDING_FEE_EXAMPLE.units));
  const [avgRent, setAvgRent] = useState(String(LANDING_FEE_EXAMPLE.avgRentMonthly));
  const [phase, setPhase] = useState<Phase>("holding");
  const [step, setStep] = useState(0);
  const [countToken, setCountToken] = useState(0);
  const [displaySaving, setDisplaySaving] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const [shown, setShown] = useState(() => ({
    ...landingFeeFromInputs(LANDING_FEE_EXAMPLE.units, LANDING_FEE_EXAMPLE.avgRentMonthly),
    units: LANDING_FEE_EXAMPLE.units,
    rent: LANDING_FEE_EXAMPLE.avgRentMonthly,
  }));
  const settledKey = useRef("");
  const inputsKey = `${units}|${avgRent}`;

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setInView(true);
      },
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    if (inputsKey === settledKey.current) return;

    let interval = 0;
    setPhase("holding");
    setStep(0);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeout = window.setTimeout(() => {
      const unitsN = Number(units) || 0;
      const rentN = Number(avgRent) || 0;
      const next = landingFeeFromInputs(unitsN, rentN);

      if (reduced || unitsN === 0 || rentN === 0) {
        settledKey.current = inputsKey;
        setShown({ ...next, units: unitsN, rent: rentN });
        setDisplaySaving(Math.max(0, next.estimatedSaving));
        setStep(unitsN > 0 && rentN > 0 ? 3 : 0);
        setPhase("settled");
        return;
      }

      setShown({ ...next, units: unitsN, rent: rentN });
      setDisplaySaving(0);
      setPhase("calculating");
      let nextStep = 0;
      interval = window.setInterval(() => {
        nextStep += 1;
        setStep(nextStep);
        if (nextStep >= 3) {
          window.clearInterval(interval);
          settledKey.current = inputsKey;
          setPhase("settled");
          setCountToken((token) => token + 1);
        }
      }, STEP_MS);
    }, reduced ? 0 : INPUT_LAG_MS);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [inView, inputsKey, units, avgRent]);

  const savingTarget = Math.max(0, shown.estimatedSaving);
  const revealSaving = phase === "settled" && shown.annualRent > 0;

  useEffect(() => {
    if (countToken === 0) return;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 700);
      const eased = 1 - (1 - t) ** 3;
      setDisplaySaving(Math.round(savingTarget * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [countToken, savingTarget]);

  const tape = tapeFor(shown.units, shown.rent, shown);
  const fairShare =
    shown.highStreetAnnual > 0 ? Math.round((shown.fairRentAnnual / shown.highStreetAnnual) * 100) : 0;
  const showFigures = phase !== "holding" && shown.annualRent > 0;

  return (
    <section
      ref={sectionRef}
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
              {phase === "settled"
                ? `Annual rent on this portfolio: ${formatGbp(shown.annualRent)}`
                : "Annual rent updates once the estimate finishes."}
            </p>
          </article>

          <article
            className="rounded-[2rem] border border-ui-tags bg-bg-card p-6 md:rounded-[2.75rem] md:p-8"
            aria-busy={phase !== "settled"}
          >
            <p className="font-display font-bold text-sm uppercase tracking-display text-brand-teal">Estimated saving</p>

            <div className="mt-6 rounded-2xl border border-brand-teal/25 bg-[#E6FBFA] px-4 py-4 text-left">
              <div className="flex items-center justify-between gap-3">
                <p className="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-teal">
                  {shown.annualRent === 0 && phase === "settled" ? "Waiting for figures" : STATUS[phase]}
                </p>
                <span
                  className={cn(
                    "h-3.5 w-2 rounded-[1px] bg-brand-teal",
                    phase !== "settled" && "motion-safe:animate-pulse"
                  )}
                  aria-hidden
                />
              </div>

              <div className="mt-3 flex gap-1" aria-hidden>
                {tape.map((line, index) => (
                  <span
                    key={line.label}
                    className={cn(
                      "h-1 flex-1 rounded-full transition-colors duration-300",
                      index < step ? "bg-brand-teal" : "bg-brand-teal/20"
                    )}
                  />
                ))}
              </div>

              <div className="mt-4 min-h-[7.25rem] space-y-2.5">
                {phase === "holding" ? (
                  <p className="font-mono text-sm text-text-muted">Reading properties and rent…</p>
                ) : phase === "calculating" && step === 0 ? (
                  <p className="font-mono text-sm text-text-muted">Lining up the sums…</p>
                ) : shown.annualRent === 0 ? (
                  <p className="font-mono text-sm leading-relaxed text-text-muted">
                    Add properties and an average rent to run the estimate.
                  </p>
                ) : (
                  tape.slice(0, step).map((line) => (
                    <div key={line.label} className="motion-safe:animate-savings-tape">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-body text-xs font-medium text-text-primary">{line.label}</span>
                        <span
                          className={cn(
                            "font-mono text-sm font-semibold",
                            line.label === "FairRent" ? "text-brand-teal" : "text-text-primary"
                          )}
                        >
                          {line.value}
                        </span>
                      </div>
                      <p className="font-mono text-[11px] text-text-muted">{line.detail}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-3 border-t border-brand-teal/20 pt-3">
                <p
                  className="font-mono text-4xl font-bold tracking-tight text-brand-teal md:text-5xl"
                  aria-live="polite"
                >
                  {revealSaving ? formatGbp(displaySaving) : "£ —"}
                </p>
                <p className="mt-1 font-body text-xs text-text-muted">
                  {revealSaving
                    ? `per year · ${shown.savingPercent}% less than a typical high-street fee`
                    : "per year"}
                </p>
              </div>
            </div>

            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-wider text-text-muted">High-street @ 12%</dt>
                <dd className="mt-2 h-2 overflow-hidden rounded-full bg-ui-tags">
                  <div
                    className="h-full rounded-full bg-text-primary/80 transition-[width] duration-700 ease-out motion-reduce:transition-none"
                    style={{ width: showFigures && phase === "settled" ? "100%" : "0%" }}
                  />
                </dd>
                <dd className="mt-1 font-mono text-sm font-semibold text-text-primary">
                  {showFigures && phase === "settled" ? formatGbp(shown.highStreetAnnual) : "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-text-muted">FairRent @ 2%</dt>
                <dd className="mt-2 h-2 overflow-hidden rounded-full bg-ui-tags">
                  <div
                    className="h-full rounded-full bg-brand-teal transition-[width] duration-700 ease-out motion-reduce:transition-none"
                    style={{ width: showFigures && phase === "settled" ? `${fairShare}%` : "0%" }}
                  />
                </dd>
                <dd className="mt-1 font-mono text-sm font-semibold text-brand-teal">
                  {showFigures && phase === "settled" ? formatGbp(shown.fairRentAnnual) : "—"}
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
