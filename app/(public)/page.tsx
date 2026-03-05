import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageEntrance } from "@/components/atmosphere/PageEntrance";
import { ScrollEmphasis } from "@/components/atmosphere/ScrollEmphasis";
import { SpatialMetricsProcess } from "@/components/atmosphere/SpatialMetricsProcess";
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

          {/* Spatial: Metrics + Process in one atmospheric field (no outer boxes) */}
          <section className="vanish-bottom edge-soften-y mb-20" data-entrance>
            <SpatialMetricsProcess />
          </section>

          <section className="mt-20 flex flex-wrap justify-center gap-4" data-entrance>
            <Button asChild variant="outline" className="rounded-full backdrop-blur-md border-white/20">
              <Link href="/auth">Enter as Landlord</Link>
            </Button>
            <Button asChild className="rounded-full backdrop-blur-md">
              <Link href="/auth">Enter as Tenant</Link>
            </Button>
            <Button asChild variant="secondary" className="rounded-full backdrop-blur-md">
              <Link href="/marketplace">Browse Marketplace</Link>
            </Button>
          </section>
        </PageEntrance>
      </main>
    </div>
  );
}
