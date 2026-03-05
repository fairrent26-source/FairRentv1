import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PageEntrance } from "@/components/atmosphere/PageEntrance";
import { ScrollEmphasis } from "@/components/atmosphere/ScrollEmphasis";
import { MouseGlowCard } from "@/components/atmosphere/MouseGlowCard";
import { HeroTitleFade } from "@/components/atmosphere/HeroTitleFade";
import { LandingNav } from "@/components/layout/LandingNav";
import { LUXE_IMAGES } from "@/lib/images";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-obsidian">
      {/* Layer 0: Ambient light pools — 3% Champagne, 800px wide, fixed */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
        <div
          className="absolute left-1/2 top-[12%] h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.03) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[25%] left-[15%] h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.03) 0%, transparent 70%)" }}
        />
        <div
          className="absolute right-[10%] top-[50%] h-[800px] w-[800px] -translate-y-1/2 translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.03) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[5%] right-1/4 h-[800px] w-[800px] translate-x-1/2 translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.03) 0%, transparent 70%)" }}
        />
      </div>

      <LandingNav />

      {/* Hero: full-bleed to top of viewport (under navbar), gradient fades to obsidian at bottom */}
      <section className="relative z-10 min-h-[100vh] w-full overflow-hidden" aria-label="Hero">
        <img
          src={LUXE_IMAGES.hero}
          alt="Luxury apartment interior — minimalist, high-end materials, soft natural lighting"
          className="absolute inset-0 h-full w-full object-cover grayscale-[0.08] brightness-[0.92]"
        />
        {/* Soft fade into obsidian: long gradient so the bottom blends seamlessly */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, transparent 45%, rgba(13,13,18,0.15) 60%, rgba(13,13,18,0.45) 78%, rgba(13,13,18,0.85) 92%, #0D0D12 100%)",
          }}
          aria-hidden
        />
        {/* Subtle luminosity for depth */}
        <div
          className="absolute inset-0 opacity-30 mix-blend-luminosity"
          style={{
            background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 100%)",
          }}
          aria-hidden
        />
        {/* Hero title: higher on mobile, centered on desktop */}
        <div className="relative flex min-h-[100vh] flex-col items-center justify-start px-6 pt-24 text-center md:justify-center md:pt-16">
          <HeroTitleFade>
            <h1 className="text-4xl font-bold tracking-tight text-ivory md:text-5xl [-webkit-font-smoothing:antialiased]" style={{ letterSpacing: "-0.02em" }}>
              Replacing blind trust with… <span className="font-display italic text-champagne">accountability.</span>
            </h1>
          </HeroTitleFade>
        </div>
      </section>

      <main className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-0">
        <PageEntrance>

          {/* Cards anchored in bottom of hero so “Verified track records” sits in the image */}
          <section className="vanish-bottom edge-soften-y -mt-56 mb-20 grid gap-3 md:grid-cols-3 md:-mt-40 md:gap-6" data-entrance>
            <ScrollEmphasis className="transition-all duration-300">
              <Card className="rounded-[2rem] border-0 bg-transparent shadow-none backdrop-blur-none">
                <CardContent className="pt-6 [&_*]:opacity-100">
                  <p className="mb-2 text-base font-medium text-champagne">Standard markets focus on:</p>
                  <p className="text-3xl text-ivory md:text-3xl">Subjective reviews.</p>
                </CardContent>
              </Card>
            </ScrollEmphasis>
            <ScrollEmphasis className="transition-all duration-300">
              <Card className="rounded-[2rem] border-0 bg-transparent shadow-none backdrop-blur-none">
                <CardContent className="pt-6 box-content [&_*]:opacity-100">
                  <p className="mb-2 text-base font-medium text-champagne">We focus on:</p>
                  <p className="font-display text-3xl font-bold italic text-champagne md:text-3xl">Verified track records.</p>
                </CardContent>
              </Card>
            </ScrollEmphasis>
          </section>

          <section className="vanish-bottom mb-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4" data-entrance>
            <Card className="rounded-[2rem]">
              <CardContent className="pt-6">
                <p className="mb-2 text-xs text-ivory/60">t Score</p>
                <Progress value={35} className="h-2" indicatorClassName="bg-champagne" />
                <p className="mt-1 text-xs text-ivory/50">0 — 5 scale</p>
              </CardContent>
            </Card>
            <Card className="rounded-[2rem]">
              <CardContent className="pt-6">
                <p className="mb-2 text-sm font-medium text-ivory">Property Metrics</p>
                <p className="text-sm text-ivory/60">Portfolio and compliance at a glance.</p>
              </CardContent>
            </Card>
            <Card className="rounded-[2rem] border-champagne/10">
              <CardContent className="pt-6">
                <p className="mb-2 text-sm font-medium text-ivory">Communication</p>
                <ul className="space-y-1 text-sm text-champagne">
                  <li>&gt; SLA Met</li>
                  <li>&gt; Repair Verified</li>
                  <li>&gt; Payment Confirmed</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="rounded-[2rem]">
              <CardContent className="pt-6">
                <p className="mb-2 text-sm font-medium text-ivory">Scheduling</p>
                <p className="text-xs text-ivory/50">Maintenance window and calendar.</p>
              </CardContent>
            </Card>
          </section>

          {/* Layer 1: Watermarks (0.05) — Layer 2: Floating cards (high-spread shadow) — Border beam top+left */}
          <section
            className="relative -mt-20 rounded-[2rem] border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur-2xl"
            data-entrance
          >
            <p className="mb-8 text-center text-sm text-ivory/60">Experience Unrivaled Comfort.</p>
            <div className="grid gap-6 md:grid-cols-3">
              <MouseGlowCard className="border-beam-edges glass-card shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <CardContent className="relative p-6 pt-6">
                  <span className="pointer-events-none absolute right-4 top-4 select-none font-display text-[8rem] font-normal italic leading-none text-champagne/[0.05]" aria-hidden>01</span>
                  <p className="relative text-right text-2xl font-bold font-mono text-champagne/60">01.</p>
                  <p className="relative text-lg font-semibold text-ivory">Verify</p>
                </CardContent>
              </MouseGlowCard>
              <MouseGlowCard className="border-beam-edges glass-card shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <CardContent className="relative p-6 pt-6">
                  <span className="pointer-events-none absolute right-4 top-4 select-none font-display text-[8rem] font-normal italic leading-none text-champagne/[0.05]" aria-hidden>02</span>
                  <p className="relative text-right text-2xl font-bold font-mono text-champagne/60">02.</p>
                  <p className="relative text-lg font-semibold text-ivory">Quantify</p>
                </CardContent>
              </MouseGlowCard>
              <MouseGlowCard className="border-beam-edges glass-card shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <CardContent className="relative p-6 pt-6">
                  <span className="pointer-events-none absolute right-4 top-4 select-none font-display text-[8rem] font-normal italic leading-none text-champagne/[0.05]" aria-hidden>03</span>
                  <p className="relative text-right text-2xl font-bold font-mono text-champagne/60">03.</p>
                  <p className="relative text-lg font-semibold text-ivory">Standardize</p>
                </CardContent>
              </MouseGlowCard>
            </div>
          </section>

          <section className="mt-20 flex justify-center gap-4" data-entrance>
            <Button asChild variant="outline">
              <Link href="/auth">Enter as Landlord</Link>
            </Button>
            <Button asChild>
              <Link href="/auth">Enter as Tenant</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/marketplace">Browse Marketplace</Link>
            </Button>
          </section>
        </PageEntrance>
      </main>
    </div>
  );
}
