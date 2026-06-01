"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { LandingAgentComparison } from "@/components/atmosphere/LandingAgentComparison";
import { LANDING_SECTIONS } from "@/lib/landing-sections";

const METRICS = [
  {
    key: "score",
    label: "Trust Score",
    scale: "0 — 5 scale",
    mono: true,
    progress: true,
    value: 72,
  },
  {
    key: "metrics",
    label: "Property Metrics",
    desc: "Portfolio and compliance at a glance.",
  },
  {
    key: "communication",
    label: "Communication",
    items: ["SLA Met", "Repair Verified", "Payment Confirmed"],
  },
  {
    key: "scheduling",
    label: "Scheduling",
    desc: "Maintenance windows and tenancy calendar in one place.",
  },
] as const;

const STEPS = [
  {
    num: "01",
    title: "Verify",
    desc: "Identity, income, and compliance documents — verified once, reused everywhere.",
  },
  {
    num: "02",
    title: "Quantify",
    desc: "Behaviour becomes a score: payments, repairs, notices, and statutory deadlines.",
  },
  {
    num: "03",
    title: "Standardize",
    desc: "Match on track records, not anecdotes. Every party sees the same facts.",
  },
] as const;

const PRICING = [
  {
    role: "Tenants",
    price: "Free",
    period: "to build your Passport",
    features: ["Universal Tenant Passport", "Marketplace & premium matches", "Tenancy ledger & repair logging"],
    highlighted: false,
  },
  {
    role: "Landlords",
    price: "£9",
    period: "per unit / month",
    features: ["Pedigree score & compliance hub", "Tenant matching & messaging", "Maintenance SLA tracking"],
    highlighted: true,
  },
  {
    role: "FairRent Pay",
    price: "1.2%",
    period: "on rent collected",
    features: ["Automated rent collection", "Payout routing to verified accounts", "No hidden listing fees"],
    highlighted: false,
  },
] as const;

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-8 text-center text-sm font-medium uppercase tracking-[0.2em] text-champagne/80">
      {children}
    </p>
  );
}

function GlassPanel({
  className,
  children,
  emphasized,
  ...rest
}: React.HTMLAttributes<HTMLElement> & { emphasized?: boolean }) {
  return (
    <article
      className={cn(
        "landing-panel landing-panel-beam rounded-[2.5rem] p-7 md:rounded-[3.5rem] md:p-9",
        emphasized && "ring-1 ring-champagne/15",
        className
      )}
      {...rest}
    >
      {children}
    </article>
  );
}

export function SpatialMetricsProcess() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const cards = root.querySelectorAll("[data-landing-card]");
      gsap.fromTo(
        cards,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.06,
          ease: "power3.out",
          overwrite: "auto",
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="space-y-14 md:space-y-20" aria-label="Product capabilities and pricing">
      {/* Capability metrics — same glass language as comparison panels */}
      <section
        id={LANDING_SECTIONS.accountability}
        className="scroll-mt-28"
        aria-labelledby="landing-accountability-heading"
      >
        <SectionEyebrow>
          <span id="landing-accountability-heading">Built for accountability</span>
        </SectionEyebrow>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {METRICS.map((m) => (
            <GlassPanel key={m.key} data-landing-card className="flex flex-col">
              <p
                className={cn(
                  "mb-3 text-sm font-medium text-champagne",
                  "mono" in m && m.mono && "font-mono text-xs uppercase tracking-wider"
                )}
              >
                {m.label}
              </p>
              {"progress" in m && m.progress && (
                <>
                  <Progress value={m.value} className="h-2" indicatorClassName="bg-champagne" />
                  <p className="mt-2 font-mono text-xs text-ivory/50">{m.scale}</p>
                </>
              )}
              {"desc" in m && m.desc && (
                <p className="text-sm leading-relaxed text-ivory/65">{m.desc}</p>
              )}
              {"items" in m && m.items && (
                <ul className="mt-auto space-y-2 text-sm text-ivory/80">
                  {m.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 shrink-0 text-champagne" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </GlassPanel>
          ))}
        </div>
      </section>

      <LandingAgentComparison />

      {/* How it works + pricing */}
      <div>
        <section
          id={LANDING_SECTIONS.howItWorks}
          className="scroll-mt-28"
          aria-labelledby="landing-how-it-works-heading"
        >
          <SectionEyebrow>
            <span id="landing-how-it-works-heading">How it works</span>
          </SectionEyebrow>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {STEPS.map((s) => (
            <GlassPanel
              key={s.num}
              data-landing-card
              className="relative min-h-[200px] overflow-hidden"
            >
              <span
                className="pointer-events-none absolute -bottom-4 -right-2 select-none font-mono text-[7rem] font-bold leading-none text-ivory/[0.04]"
                aria-hidden
              >
                {s.num}
              </span>
              <p className="relative text-right font-mono text-xl font-bold text-champagne">{s.num}.</p>
              <h3 className="relative mt-6 text-2xl font-bold tracking-tight text-ivory">{s.title}</h3>
              <p className="relative mt-3 text-sm leading-relaxed text-ivory/60">{s.desc}</p>
            </GlassPanel>
          ))}
        </div>
        </section>

        <GlassPanel
          data-landing-card
          emphasized
          className="mt-6 md:mt-7"
          aria-label="Pricing"
        >
          <div className="mb-8 text-center md:mb-10">
            <p className="text-sm font-medium text-champagne">Transparent pricing</p>
            <h3 className="mt-2 font-display text-2xl italic text-ivory md:text-3xl">
              Pay for outcomes, not listings.
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ivory/55">
              No bidding wars on visibility. Tenants verify for free; landlords scale per unit; rent collection
              is a simple platform fee.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
            {PRICING.map((tier) => (
              <div
                key={tier.role}
                className={cn(
                  "landing-panel-nested rounded-[2rem] p-6 transition-colors duration-300 md:rounded-[2.75rem] md:p-7",
                  tier.highlighted
                    ? "border-champagne/25 bg-champagne/[0.07] ring-1 ring-champagne/10"
                    : "border-white/[0.07] bg-white/[0.035]"
                )}
              >
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-champagne/90">{tier.role}</p>
                <p className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-0">
                  <span className="font-mono text-3xl font-bold text-ivory md:text-4xl">{tier.price}</span>
                  <span className="text-sm text-ivory/50">{tier.period}</span>
                </p>
                <ul className="mt-5 space-y-2.5 border-t border-white/[0.08] pt-5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-ivory/75">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-champagne" aria-hidden />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-ivory/45">
            Prices shown are indicative for the UK market. Final fees confirmed at onboarding.
          </p>
        </GlassPanel>
      </div>
    </div>
  );
}
