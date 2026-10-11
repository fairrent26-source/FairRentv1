import { TrackRecordDiagram } from "@/components/atmosphere/TrackRecordDiagram";
import { LandingPageFrame } from "@/components/atmosphere/LandingPageFrame";
import { LANDING_SECTIONS } from "@/lib/landing-sections";

export default function LandingPage() {
  return (
    <LandingPageFrame
      heroFooter={
        <section id={LANDING_SECTIONS.about} className="scroll-mt-20" aria-label="Choose renters or landlords">
          <TrackRecordDiagram />
        </section>
      }
    />
  );
}
