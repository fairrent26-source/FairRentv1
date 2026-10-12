import { AppPreviewPhones } from "@/components/atmosphere/AppPreviewPhones";
import { HowItWorksSection } from "@/components/atmosphere/HowItWorksSection";
import { LandingFlywheel } from "@/components/atmosphere/LandingFlywheel";
import { LandingPageFrame } from "@/components/atmosphere/LandingPageFrame";
import { LandingSavingsCalculator } from "@/components/atmosphere/LandingSavingsCalculator";
import { LANDING_SECTIONS } from "@/lib/landing-sections";

export default function ForLandlordsPage() {
  return (
    <LandingPageFrame
      waitlistRole="landlord"
      heroAlign="left"
      heroTitle={
        <span className="flex flex-col items-center gap-1 md:items-start">
          <span className="whitespace-nowrap">
            List{" "}
            <span className="font-body text-sm font-semibold normal-case tracking-normal text-text-primary sm:text-lg md:text-2xl">
              your properties
            </span>
          </span>
          <span className="whitespace-nowrap">
            Manage{" "}
            <span className="font-body text-sm font-semibold normal-case tracking-normal text-text-primary sm:text-lg md:text-2xl">
              your tenancies
            </span>
          </span>
          <span>
            and monitor{" "}
            <span className="block font-accent text-xl italic normal-case tracking-normal text-[#3D5800] md:inline md:text-2xl">
              your portfolio in one place.
            </span>
          </span>
        </span>
      }
      heroBody={
        <p className="font-accent text-lg italic leading-snug text-text-primary md:text-xl">
          Save money and time. FairRent ensures you remain compliant as regulations change.
        </p>
      }
      heroFooter={<LandingFlywheel audience="landlord" />}
    >
      <section
        id={LANDING_SECTIONS.accountability}
        className="scroll-mt-28"
        aria-labelledby="landing-accountability-heading"
        data-entrance
      >
        <AppPreviewPhones audience="landlord" />
      </section>
      <HowItWorksSection audience="landlord" />
      <LandingSavingsCalculator />
    </LandingPageFrame>
  );
}
