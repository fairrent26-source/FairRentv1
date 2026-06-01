import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageEntrance } from "@/components/atmosphere/PageEntrance";
import { SpatialMetricsProcess } from "@/components/atmosphere/SpatialMetricsProcess";
import { HeroTitleFade } from "@/components/atmosphere/HeroTitleFade";
import { LandingNav } from "@/components/layout/LandingNav";
import { LandingBridge } from "@/components/atmosphere/LandingBridge";
import { LUXE_IMAGES } from "@/lib/images";
import { cn } from "@/lib/utils";

const COMPARISON_PANELS = [
  {
    eyebrow: "Standard markets focus on",
    headline: "Subjective reviews.",
    emphasis: false,
  },
  {
    eyebrow: "We focus on",
    headline: "Verified track records.",
    emphasis: true,
  },
] as const;

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-obsidian">
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
        <div
          className="absolute left-1/2 top-[12%] h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.03) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[25%] left-[15%] h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.03) 0%, transparent 70%)" }}
        />
      </div>

      <LandingNav />

      <section className="relative z-10 min-h-[100vh] w-full overflow-hidden" aria-label="Hero">
        <img
          src={LUXE_IMAGES.hero}
          alt="Luxury apartment interior — minimalist, high-end materials, soft natural lighting"
          className="absolute inset-0 h-full w-full object-cover grayscale-[0.08] brightness-[0.92]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, transparent 42%, rgba(13,13,18,0.2) 58%, rgba(13,13,18,0.55) 75%, rgba(13,13,18,0.92) 92%, #0D0D12 100%)",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-30 mix-blend-luminosity"
          style={{
            background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 100%)",
          }}
          aria-hidden
        />
        <div className="relative flex min-h-[100vh] flex-col items-center justify-start px-6 pt-24 text-center md:justify-center md:pt-16">
          <HeroTitleFade>
            <h1
              className="text-4xl font-bold tracking-tight text-ivory md:text-5xl [-webkit-font-smoothing:antialiased]"
              style={{ letterSpacing: "-0.02em" }}
            >
              Replacing blind trust with…{" "}
              <span className="font-display italic text-champagne">accountability.</span>
            </h1>
          </HeroTitleFade>
        </div>
      </section>

      <PageEntrance>
        <LandingBridge className="-mt-24 md:-mt-32">
          <section className="mb-14 md:mb-20" data-entrance>
            <p className="mb-8 text-center text-sm font-medium uppercase tracking-[0.2em] text-champagne/80">
              A different standard
            </p>
            <div className="grid gap-5 md:grid-cols-2 md:gap-7">
              {COMPARISON_PANELS.map((panel) => (
                <article
                  key={panel.headline}
                  className={cn(
                    "landing-panel landing-panel-beam rounded-[2.5rem] p-7 md:rounded-[3.5rem] md:p-9",
                    panel.emphasis && "ring-1 ring-champagne/15"
                  )}
                >
                  <p className="mb-3 text-sm font-medium text-champagne">{panel.eyebrow}</p>
                  <p
                    className={cn(
                      "text-2xl leading-snug text-ivory md:text-3xl",
                      panel.emphasis && "font-display text-3xl font-bold italic text-champagne md:text-4xl"
                    )}
                  >
                    {panel.headline}
                  </p>
                </article>
              ))}
            </div>
            <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-ivory/55">
              FairRent scores landlords and tenants on verifiable behaviour — payments, repairs, and compliance —
              not star ratings left after a move-out.
            </p>
          </section>

          <section data-entrance>
            <SpatialMetricsProcess />
          </section>
        </LandingBridge>

        <main className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-8">
          <section
            className="landing-panel flex flex-wrap justify-center gap-4 rounded-[2.5rem] px-8 py-11 md:rounded-[3.5rem] md:px-10 md:py-12"
            data-entrance
          >
            <Button asChild variant="outline" className="rounded-full border-white/20 backdrop-blur-md">
              <Link href="/auth">Enter as Landlord</Link>
            </Button>
            <Button asChild className="rounded-full backdrop-blur-md">
              <Link href="/auth">Enter as Tenant</Link>
            </Button>
            <Button asChild variant="secondary" className="rounded-full backdrop-blur-md">
              <Link href="/marketplace">Browse Marketplace</Link>
            </Button>
          </section>
        </main>
      </PageEntrance>
    </div>
  );
}
