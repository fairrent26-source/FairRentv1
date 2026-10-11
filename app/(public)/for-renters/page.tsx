import { AccountabilityTicker } from "@/components/atmosphere/AccountabilityTicker";
import { AppPreviewPhones } from "@/components/atmosphere/AppPreviewPhones";
import { LandingFlywheel } from "@/components/atmosphere/LandingFlywheel";
import { LandingPageFrame } from "@/components/atmosphere/LandingPageFrame";
import { LANDING_SECTIONS } from "@/lib/landing-sections";

export default function ForRentersPage() {
  return (
    <LandingPageFrame
      waitlistRole="tenant"
      heroAlign="left"
      heroTitle={
        <span className="flex flex-col items-center gap-1 md:items-start">
          <span className="whitespace-nowrap">
            Find{" "}
            <span className="font-body text-sm font-semibold normal-case tracking-normal text-text-primary sm:text-lg md:text-2xl">
              great properties
            </span>
          </span>
          <span className="whitespace-nowrap">
            Rent{" "}
            <span className="font-body text-sm font-semibold normal-case tracking-normal text-text-primary sm:text-lg md:text-2xl">
              with reliable landlords
            </span>
          </span>
          <span>
            and enjoy{" "}
            <span className="block font-accent text-xl italic normal-case tracking-normal text-[#3D5800] md:inline md:text-2xl">
              a smoother rental experience.
            </span>
          </span>
        </span>
      }
      heroFooter={<LandingFlywheel audience="tenant" />}
    >
      <AccountabilityTicker />
      <section
        id={LANDING_SECTIONS.accountability}
        className="scroll-mt-28"
        aria-labelledby="landing-accountability-heading"
        data-entrance
      >
        <AppPreviewPhones audience="tenant" />
      </section>
    </LandingPageFrame>
  );
}
