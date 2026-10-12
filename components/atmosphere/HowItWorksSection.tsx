"use client";

import { useEffect, useRef, type HTMLAttributes } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { LANDING_SECTIONS } from "@/lib/landing-sections";
import { LUXE_IMAGES } from "@/lib/images";

const MATCH_STEP = {
  num: "03",
  title: "Match",
  desc: "Evidence-based matching along with a reward system for positive actions, increases the chances of a successful partnership and a positive rental experience.",
} as const;

function stepsFor(audience: "landlord" | "tenant") {
  const measure =
    audience === "tenant"
      ? "We measure factors such as response times, quality of repairs and deposit security, as key signals of landlord quality."
      : "We measure factors such as payment history, speed of flagging issues, and communication, to create a key signal of tenant quality.";
  const score =
    audience === "tenant"
      ? "Our scoring algorithm ranks users based on their history. Renters can improve their scores through verified references and paying rent through direct-debits, for example."
      : "Our scoring algorithm ranks users based on their history. Landlords have the opportunity to improve their score by responding more quickly to queries and regularly updating property information for instance.";

  return [
    { num: "01", title: "Measure", desc: measure },
    { num: "02", title: "Score", desc: score },
    MATCH_STEP,
  ];
}

function GlassPanel({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLElement>) {
  return (
    <article
      className={cn(
        "landing-panel landing-panel-beam rounded-[2.5rem] p-7 md:rounded-[3.5rem] md:p-9",
        className
      )}
      {...rest}
    >
      {children}
    </article>
  );
}

export function HowItWorksSection({ audience = "landlord" }: { audience?: "landlord" | "tenant" }) {
  const steps = stepsFor(audience);
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
    <section
      ref={rootRef}
      id={LANDING_SECTIONS.howItWorks}
      className="relative z-10 scroll-mt-28"
      aria-labelledby="landing-how-it-works-heading"
    >
      <div className="relative left-1/2 w-screen -translate-x-1/2">
        <div className="relative min-h-[36rem] md:min-h-[40rem]">
          <img
            src={LUXE_IMAGES.howItWorks}
            alt="Sunlit open-plan living space with large windows — a home people actually live in"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-transparent"
            aria-hidden
          />
          <div className="relative z-10 mx-auto flex min-h-[36rem] max-w-5xl flex-col justify-start px-6 pb-16 pt-8 md:min-h-[40rem] md:pt-10">
            <div className="mb-8 text-center">
              <p
                id="landing-how-it-works-heading"
                className="font-display font-bold text-[1.75rem] uppercase tracking-display text-white md:text-[2rem]"
              >
                How it works
              </p>
              <p className="mx-auto mt-3 max-w-3xl font-accent text-base italic text-white md:text-lg">
                Engineered to match strong landlords with high-quality tenants.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
              {steps.map((s) => (
                <GlassPanel
                  key={s.num}
                  data-landing-card
                  className="relative min-h-[200px] overflow-hidden bg-bg-card/95 shadow-card backdrop-blur-md"
                >
                  <span
                    className="pointer-events-none absolute -bottom-4 -right-2 select-none font-mono text-[7rem] font-bold leading-none text-text-primary/[0.04]"
                    aria-hidden
                  >
                    {s.num}
                  </span>
                  <p className="relative text-right font-mono text-xl font-bold text-brand-teal">{s.num}.</p>
                  <h3 className="relative mt-6 text-2xl font-bold tracking-tight text-text-primary">{s.title}</h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-text-muted">{s.desc}</p>
                </GlassPanel>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
