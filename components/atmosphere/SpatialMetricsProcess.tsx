"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Progress } from "@/components/ui/progress";

const METRICS = [
  {
    key: "score",
    label: "t Score",
    scale: "0 — 5 scale",
    mono: true,
    progress: true,
    value: 35,
  },
  {
    key: "metrics",
    label: "Property Metrics",
    desc: "Portfolio and compliance at a glance.",
  },
  {
    key: "communication",
    label: "Communication",
    items: ["> SLA Met", "> Repair Verified", "> Payment Confirmed"],
    champagneList: true,
  },
  {
    key: "scheduling",
    label: "Scheduling",
    desc: "Maintenance window and calendar.",
  },
];

const STEPS = [
  { num: "01", title: "Verify" },
  { num: "02", title: "Quantify" },
  { num: "03", title: "Standardize" },
];

export function SpatialMetricsProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const metricsWrap = metricsRef.current;
    const processWrap = processRef.current;
    if (!section || !metricsWrap || !processWrap) return;

    const ctx = gsap.context(() => {
      const metricEls = metricsWrap.querySelectorAll("[data-metric-card]");
      const processEls = processWrap.querySelectorAll("[data-process-card]");

      gsap.fromTo(
        metricEls,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out", overwrite: "auto" }
      );

      processEls.forEach((el, i) => {
        gsap.to(el, {
          y: 5,
          duration: 2 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.4 + i * 0.15,
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden rounded-[3rem] bg-obsidian px-4 py-16 md:px-6 md:py-20"
      aria-label="Metrics and process"
    >
      {/* Atmospheric field: two soft Champagne radials (2%) */}
      <div
        className="pointer-events-none absolute -left-[20%] -top-[20%] h-[80vh] w-[80vw] rounded-full opacity-100"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.02) 0%, transparent 65%)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-[20%] -right-[20%] h-[80vh] w-[80vw] rounded-full opacity-100"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.02) 0%, transparent 65%)" }}
        aria-hidden
      />

      {/* Metrics: fluid grid, no outer box */}
      <div
        ref={metricsRef}
        className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4"
      >
        {METRICS.map((m, i) => (
          <div
            key={m.key}
            data-metric-card
            className="glass-artifact-metric p-5 md:p-6"
          >
            <p className={`mb-2 text-xs text-ivory/60 ${m.mono ? "font-mono" : "font-medium"}`}>
              {m.label}
            </p>
            {m.progress && (
              <>
                <Progress value={m.value!} className="h-2" indicatorClassName="bg-champagne" />
                <p className="mt-1 font-mono text-xs text-ivory/50">{m.scale}</p>
              </>
            )}
            {m.desc && <p className="text-sm text-ivory/60">{m.desc}</p>}
            {m.items && (
              <ul className="space-y-1.5 text-sm text-ivory/80">
                {m.items.map((item) => {
                  const parts = item.split(" ");
                  const symbol = parts[0];
                  const rest = parts.slice(1).join(" ");
                  return (
                    <li key={item} className="flex items-center gap-2">
                      <span
                        className="font-mono text-champagne"
                        style={{ textShadow: "0 0 12px rgba(201,168,76,0.4)" }}
                      >
                        {symbol}
                      </span>
                      <span>{rest}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Overlap: pull Process up into the field */}
      <div ref={processRef} className="-mt-24">
        <p
          className="mb-8 text-center text-sm text-ivory/60"
          style={{ letterSpacing: "0.2em" }}
        >
          Experience Unrivaled Comfort.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <div
              key={s.num}
              data-process-card
              className="process-card-spatial relative overflow-hidden p-6 pt-6"
            >
              <span
                className="pointer-events-none absolute right-4 top-4 select-none font-display text-[8rem] font-normal italic leading-none text-champagne/[0.03]"
                aria-hidden
              >
                {s.num}
              </span>
              <p className="relative text-right font-mono text-2xl font-bold text-champagne">
                {s.num}.
              </p>
              <p
                className="relative text-lg font-bold tracking-tight text-ivory"
                style={{ letterSpacing: "-0.03em" }}
              >
                {s.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
