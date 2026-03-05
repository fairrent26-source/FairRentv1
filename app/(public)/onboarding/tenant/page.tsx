"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { LuxeImage } from "@/components/ui/LuxeImage";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { OnboardingInput } from "@/components/onboarding/OnboardingInput";
import { OnboardingTextarea } from "@/components/onboarding/OnboardingTextarea";
import { LUXE_IMAGES } from "@/lib/images";
import { OnboardingGuard } from "@/components/auth/OnboardingGuard";
import { useAuthStore } from "@/store/auth-store";

const STEPS = [
  { label: "Status/Preferences" },
  { label: "Reputation" },
  { label: "Financials" },
  { label: "Review" },
];

export default function TenantOnboardingPage() {
  const router = useRouter();
  const completeOnboarding = useAuthStore((s) => s.completeOnboarding);
  const [step, setStep] = useState(0);

  const handleContinue = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      completeOnboarding();
      router.push("/tenant");
    }
  };

  return (
    <OnboardingGuard role="tenant">
      <OnboardingShell
        imageSrc={LUXE_IMAGES.onboardingTenant}
        steps={STEPS}
        currentIndex={step}
        onBack={() => setStep((s) => Math.max(0, s - 1))}
      >
        {step === 0 && (
          <>
            <h1 className="text-2xl font-semibold tracking-tight text-ivory md:text-3xl" style={{ letterSpacing: "-0.02em" }}>
              Build your profile and we&apos;ll find the properties and landlords most suited for you
            </h1>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <section className="rounded-[2rem] border border-white/[0.06] bg-white/5 p-6 backdrop-blur-sm">
                <h2 className="text-sm font-medium text-champagne">Status</h2>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="mb-1 block text-xs text-ivory/60">Full Legal Name</label>
                    <OnboardingInput placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-ivory/60">Current Postcode</label>
                    <OnboardingInput placeholder="SW1A OAA" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-ivory/60">Employment Status</label>
                    <div className="flex flex-wrap gap-2">
                      {["Full-time", "Freelance", "Student", "Self-Employed", "Other"].map((opt) => (
                        <Button key={opt} variant="outline" size="sm" className="rounded-[2rem] border-white/20 text-ivory/80 hover:border-champagne/50 hover:text-ivory">
                          {opt}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-ivory/50">Photos and names are 100% anonymized during matching.</p>
                </div>
              </section>
              <section className="rounded-[2rem] border border-white/[0.06] bg-white/5 p-6 backdrop-blur-sm">
                <h2 className="text-sm font-medium text-champagne">Your Property Preferences</h2>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="mb-1 block text-xs text-ivory/60">Target Search Area</label>
                    <OnboardingInput placeholder="Postcode or City" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-ivory/60">Search Radius</label>
                    <input type="range" min="0.5" max="20" className="h-2 w-full accent-champagne" />
                    <div className="mt-1 flex justify-between text-xs text-ivory/50">
                      <span>0.5 miles</span>
                      <span>20 miles</span>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-ivory/60">Property Type</label>
                    <div className="flex flex-wrap gap-2">
                      {["Flat", "Maisonette", "Whole House", "Studio", "Terraced"].map((opt) => (
                        <Button key={opt} variant="outline" size="sm" className="rounded-[2rem] border-white/20 text-ivory/80 hover:border-champagne/50 hover:text-ivory">
                          {opt}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <div>
                      <label className="mb-1 block text-xs text-ivory/60">Max Flatmates</label>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="rounded-[2rem] border-white/20 text-ivory">−</Button>
                        <span className="w-8 text-center text-sm text-ivory">1</span>
                        <Button variant="outline" size="icon" className="rounded-[2rem] border-white/20 text-ivory">+</Button>
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-ivory/60">Ideal length of stay (months)</label>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="rounded-[2rem] border-white/20 text-ivory">−</Button>
                        <span className="w-8 text-center text-sm text-ivory">1</span>
                        <Button variant="outline" size="icon" className="rounded-[2rem] border-white/20 text-ivory">+</Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch className="data-[state=checked]:bg-champagne" />
                    <span className="text-sm text-ivory/70">Move-in Timeline: ASAP</span>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-ivory/60">Monthly Budget</label>
                    <input type="range" className="h-2 w-full accent-champagne" />
                    <div className="mt-1 flex justify-between text-xs text-ivory/50">
                      <span>£500 (Min)</span>
                      <span>£5000 (Max)</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <Button className="mt-8 w-full rounded-[2rem] bg-champagne text-obsidian hover:bg-champagne/90" size="lg" onClick={handleContinue}>
              Save my status and preferences and continue
            </Button>
          </>
        )}

        {step === 1 && (
          <>
            <h1 className="text-2xl font-semibold tracking-tight text-ivory md:text-3xl" style={{ letterSpacing: "-0.02em" }}>
              Bolster your score. Prove your rep.
            </h1>
            <p className="mt-2 text-ivory/60">
              Match with landlords whose standards are as high as yours. Turn your history into a high-performance asset.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <section className="rounded-[2rem] border border-white/[0.06] bg-white/5 p-6 backdrop-blur-sm">
                <h2 className="text-sm font-medium text-champagne">The Digital Power-Link (Automated)</h2>
                <div className="relative mt-4 aspect-video overflow-hidden rounded-[2rem] border border-white/[0.06]">
                  <LuxeImage src={LUXE_IMAGES.interior} alt="Connect 24 months payment history" />
                  <div className="absolute inset-0 flex items-center justify-center bg-obsidian/40">
                    <span className="text-center text-sm font-medium text-ivory">Connect 24 months payment history</span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-ivory/70">Import 24 months of perfect payment history instantly.</p>
                <div className="mt-2 text-sm text-champagne">
                  <p>Equifax Sync: +25% Score Potential ✓</p>
                  <p>Landlord Ref: +15% Score Potential</p>
                </div>
              </section>
              <section className="rounded-[2rem] border border-white/[0.06] bg-white/5 p-6 backdrop-blur-sm">
                <h2 className="text-sm font-medium text-ivory">Verified References</h2>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="mb-1 block text-xs text-ivory/60">Previous Landlord Email</label>
                    <OnboardingInput placeholder="landlord@example.com" />
                  </div>
                  <Button variant="outline" size="sm" className="rounded-[2rem] border-white/20 text-ivory/80 hover:border-champagne/50">
                    Request Official Handshake
                  </Button>
                  <div className="rounded-[2rem] border border-dashed border-white/20 bg-white/5 py-6 text-center text-sm text-ivory/50">
                    Drag & drop PDF references, tenancy agreements here
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-ivory/60">Your Track Record Summary</label>
                    <OnboardingTextarea placeholder="e.g., Always on time, impeccable property care" />
                  </div>
                </div>
              </section>
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-ivory/50">
              🔒 Anonymized outreach. We protect your current search until you&apos;re ready to sign.
            </p>
            <Button className="mt-6 w-full rounded-[2rem] bg-champagne text-obsidian hover:bg-champagne/90" size="lg" onClick={handleContinue}>
              Submit your reference history and continue
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="text-2xl font-semibold tracking-tight text-ivory md:text-3xl" style={{ letterSpacing: "-0.02em" }}>
              Power your payments.
            </h1>
            <p className="mt-2 text-ivory/60">
              Link your account now to enable one-click Direct Debits later. We don&apos;t pull your transaction data—we just verify your connection.
            </p>
            <div className="mt-8 space-y-6">
              <Button className="w-full justify-start gap-2 rounded-[2rem] bg-champagne text-obsidian hover:bg-champagne/90" size="lg">
                🔒 Securely Link Bank Account
              </Button>
              <p className="text-xs text-ivory/50">Linking now simplifies your Direct Debit setup once you find your perfect match. No data is harvested.</p>
              <Button variant="outline" className="w-full rounded-[2rem] border-white/20 text-ivory/80 hover:border-champagne/50" onClick={handleContinue}>
                I&apos;ll initiate payments manually
              </Button>
              <div className="rounded-[2rem] border border-red-500/30 bg-red-500/10 p-4 text-sm text-ivory/90">
                Manual payments require self-initiation each month. Note: Any delays in manual transfers may negatively impact your FairRent score.
              </div>
              <p className="text-xs text-ivory/50">FCA Regulated Partner · AES-256 Encryption · Zero Data Harvesting Policy</p>
            </div>
            <Button className="mt-8 w-full rounded-[2rem] bg-champagne text-obsidian hover:bg-champagne/90" size="lg" onClick={handleContinue}>
              Confirm my payment preference
            </Button>
          </>
        )}

        {step === 3 && (
          <>
            <h1 className="text-2xl font-semibold tracking-tight text-ivory md:text-3xl" style={{ letterSpacing: "-0.02em" }}>
              Review your FairRent Profile
            </h1>
            <p className="mt-2 text-ivory/60">
              Your profile is built and 100% anonymized. Here is how you appear to the marketplace.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <section className="rounded-[2rem] border border-white/[0.06] bg-white/5 p-6 backdrop-blur-sm">
                <h3 className="text-sm font-medium text-champagne">Status</h3>
                <p className="mt-2 text-ivory/80">John Doe</p>
                <p className="text-xs text-ivory/50">Current Location: SW1A OAA</p>
                <p className="text-xs text-ivory/50">Employment: Full-time</p>
                <p className="text-xs text-ivory/50">Household: 1 Occupant</p>
              </section>
              <section className="rounded-[2rem] border border-white/[0.06] bg-white/5 p-6 backdrop-blur-sm">
                <h3 className="text-sm font-medium text-champagne">The Search</h3>
                <p className="mt-2 text-xs text-ivory/50">Area: SW1A OAA · Radius: 5 miles</p>
                <p className="text-xs text-ivory/50">Property Types: Flat, House</p>
                <p className="text-xs text-ivory/50">Budget: £1500 - £2000 · Timeline: ASAP</p>
              </section>
              <section className="rounded-[2rem] border border-white/[0.06] bg-white/5 p-6 backdrop-blur-sm">
                <h3 className="text-sm font-medium text-champagne">Verified Assets</h3>
                <p className="mt-2 text-xs text-champagne">Equifax: Linked</p>
                <p className="text-xs text-ivory/50">References: Pending</p>
                <p className="text-xs text-champagne">Bank: Connected · Direct Debit: Enabled</p>
              </section>
            </div>
            <section className="mt-6 rounded-[2rem] border border-champagne/20 bg-champagne/10 p-6">
              <h3 className="text-sm font-medium text-ivory">Your Estimated FairRent Score</h3>
              <p className="mt-2 text-3xl font-semibold tabular-nums text-champagne">3.8 / 5.0</p>
              <p className="mt-2 text-sm text-ivory/70">
                Not a bad opening act. Let&apos;s get you to a 5.0. Once you&apos;re inside, we&apos;ll show you the easy wins—like a quick reference or ticking the auto-pay box—to put you at the top of every landlord&apos;s list.
              </p>
            </section>
            <p className="mt-4 flex items-center gap-2 text-xs text-ivory/50">
              🔒 Names and photos remain hidden. Landlords only see your verified metrics and search intent.
            </p>
            <Button className="mt-8 w-full rounded-[2rem] bg-champagne text-obsidian hover:bg-champagne/90" size="lg" onClick={handleContinue}>
              Enter the marketplace and find my match
            </Button>
          </>
        )}
      </OnboardingShell>
    </OnboardingGuard>
  );
}
