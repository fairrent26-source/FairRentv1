import type { ReactNode } from "react";
import { HeroTitleFade } from "@/components/atmosphere/HeroTitleFade";
import { LandingBridge } from "@/components/atmosphere/LandingBridge";
import { PageEntrance } from "@/components/atmosphere/PageEntrance";
import { WaitlistCta, type WaitlistRole } from "@/components/atmosphere/WaitlistCta";
import { LandingNav } from "@/components/layout/LandingNav";
import { LUXE_IMAGES } from "@/lib/images";

const DEFAULT_HERO_TITLE = (
  <>
    A new renting model{" "}
    <span className="font-accent italic normal-case tracking-normal text-text-primary">
      Accountability made easy.
    </span>
  </>
);

export function LandingPageFrame({
  children,
  waitlistRole,
  heroFooter,
  heroTitle,
  heroBody,
  heroAlign = "center",
}: {
  children?: ReactNode;
  waitlistRole?: WaitlistRole;
  heroFooter?: ReactNode;
  heroTitle?: ReactNode;
  heroBody?: ReactNode;
  heroAlign?: "center" | "left";
}) {
  return (
    <div className="relative min-h-screen bg-bg-main">
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
        <div
          className="absolute left-1/2 top-[12%] h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,210,211,0.08) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[25%] left-[15%] h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,210,211,0.08) 0%, transparent 70%)" }}
        />
      </div>

      <LandingNav />

      <section className="relative z-10 min-h-[100vh] w-full overflow-hidden" aria-label="Hero">
        <img
          src={LUXE_IMAGES.hero}
          alt="Luxury apartment interior — minimalist, high-end materials, soft natural lighting"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[55%]"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, #F9F9F9 72%)",
          }}
          aria-hidden
        />
        <div className="relative flex min-h-[100vh] flex-col items-center px-6 pt-24 text-center md:pt-[calc(3rem+12.5vh)]">
          <HeroTitleFade>
            <div
              className={
                heroAlign === "left" ? "w-full max-w-5xl text-center md:text-left" : ""
              }
            >
              <h1
                className={`font-display font-bold uppercase leading-[1.15] text-brand-teal [-webkit-font-smoothing:antialiased] drop-shadow-[0_1px_12px_rgba(249,249,249,0.85)] ${
                  heroAlign === "left"
                    ? "text-[1.65rem] tracking-[0.08em] sm:text-3xl md:text-4xl md:tracking-display"
                    : "max-w-4xl text-4xl tracking-display md:text-5xl"
                }`}
              >
                {heroTitle ?? DEFAULT_HERO_TITLE}
              </h1>
            </div>
          </HeroTitleFade>
          {heroFooter || heroBody ? (
            <div className="relative z-10 mt-auto w-full max-w-5xl pb-10 pt-16 md:pb-14">
              {heroFooter}
              {heroBody ? (
                <div className="mx-auto mt-6 max-w-3xl text-center">
                  {typeof heroBody === "string" ? (
                    <p className="font-body text-sm leading-relaxed text-text-primary md:text-base">{heroBody}</p>
                  ) : (
                    heroBody
                  )}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>

      <PageEntrance>
        {children ? <LandingBridge>{children}</LandingBridge> : null}
        <WaitlistCta defaultRole={waitlistRole} />
      </PageEntrance>
    </div>
  );
}
