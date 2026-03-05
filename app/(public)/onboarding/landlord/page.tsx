"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { LuxeImage } from "@/components/ui/LuxeImage";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { OnboardingInput } from "@/components/onboarding/OnboardingInput";
import { OnboardingTextarea } from "@/components/onboarding/OnboardingTextarea";
import { LUXE_IMAGES, LUXE_IMAGE_LIST } from "@/lib/images";
import { OnboardingGuard } from "@/components/auth/OnboardingGuard";
import { useAuthStore } from "@/store/auth-store";

const STEPS = [
  { label: "Identity" },
  { label: "Property" },
  { label: "Financials" },
  { label: "Pedigree" },
  { label: "Launch" },
];

/** Landlord entity type for identity step — mutually exclusive, DB-ready. */
export type LandlordEntityType = "private_landlord" | "limited_company";

export default function LandlordOnboardingPage() {
  const router = useRouter();
  const completeOnboarding = useAuthStore((s) => s.completeOnboarding);
  const [step, setStep] = useState(0);
  const [landlordEntityType, setLandlordEntityType] = useState<LandlordEntityType | null>(null);

  const handleContinue = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      completeOnboarding();
      router.push("/landlord");
    }
  };

  return (
    <OnboardingGuard role="landlord">
      <OnboardingShell
        imageSrc={LUXE_IMAGES.onboardingLandlord}
        steps={STEPS}
        currentIndex={step}
        onBack={() => setStep((s) => Math.max(0, s - 1))}
      >
        {step === 0 && (
          <>
            <h1 className="text-2xl font-semibold tracking-tight text-ivory md:text-3xl" style={{ letterSpacing: "-0.02em" }}>
              Verify your identity.
            </h1>
            <p className="mt-2 text-ivory/60">
              Secure your profile. Whether you&apos;re an individual or an entity, we ensure your landlord status is verified and protected.
            </p>
            <div className="mt-8 space-y-6">
              <div>
                <label className="mb-1 block text-sm font-medium text-ivory/70">Are you a Private Landlord or a Company/Entity?</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Button
                    type="button"
                    onClick={() => setLandlordEntityType("private_landlord")}
                    className={`rounded-[2rem] ${landlordEntityType === "private_landlord" ? "bg-champagne text-obsidian hover:bg-champagne/90" : "border-white/20 text-ivory/80 hover:border-champagne/50 hover:text-ivory"}`}
                    variant={landlordEntityType === "private_landlord" ? undefined : "outline"}
                  >
                    Private Landlord
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setLandlordEntityType("limited_company")}
                    className={`rounded-[2rem] ${landlordEntityType === "limited_company" ? "bg-champagne text-obsidian hover:bg-champagne/90" : "border-white/20 text-ivory/80 hover:border-champagne/50 hover:text-ivory"}`}
                    variant={landlordEntityType === "limited_company" ? undefined : "outline"}
                  >
                    Limited Company / Entity
                  </Button>
                </div>
                <p className="mt-1.5 text-xs text-ivory/50">Select one. This will be saved with your profile.</p>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-ivory/70">Full Legal Name</label>
                <OnboardingInput placeholder="Enter your full legal name" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-ivory/70">Current Business/Residential Address</label>
                <OnboardingInput placeholder="Search or enter address" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-ivory/70">Professional Email</label>
                <OnboardingInput type="email" placeholder="your@email.com" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-ivory/70">Professional Phone</label>
                <OnboardingInput placeholder="+44 7XXX XXXXXX" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-ivory">Professional Profile</h3>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[2rem] border-2 border-dashed border-white/20 bg-white/5 text-2xl text-ivory/50">+</div>
                  <p className="text-xs text-ivory/50">Upload a headshot or company logo. This will be visible to tenants.</p>
                </div>
                <div className="mt-4">
                  <label className="mb-1 block text-xs text-ivory/60">Bio / Management Philosophy</label>
                  <OnboardingTextarea placeholder="Tell tenants about your management style (e.g., 'Hands-on landlord with 10 years experience')" />
                </div>
              </div>
              <p className="flex items-center gap-2 text-sm text-ivory/50">
                🛡 FairRent uses bank-level encryption. Your personal documents are used only for verification and never shared with tenants.
              </p>
            </div>
            <Button className="mt-8 w-full rounded-[2rem] bg-champagne text-obsidian hover:bg-champagne/90" size="lg" onClick={handleContinue}>
              Set up my profile and continue
            </Button>
          </>
        )}

        {step === 1 && (
          <>
            <h1 className="text-2xl font-semibold tracking-tight text-ivory md:text-3xl" style={{ letterSpacing: "-0.02em" }}>
              Detail your portfolio.
            </h1>
            <p className="mt-2 text-ivory/60">
              Add your assets to the marketplace. High-quality data attracts high-quality matches.
            </p>
            <div className="mt-8 space-y-6">
              <section className="rounded-[2rem] border border-white/[0.06] bg-white/5 p-6 backdrop-blur-sm">
                <h3 className="text-sm font-medium text-champagne">Primary Asset Details</h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="mb-1 block text-xs text-ivory/60">Property Type</label>
                    <div className="flex flex-wrap gap-2">
                      {["Flat", "Maisonette", "Whole House", "Studio", "Terraced"].map((opt) => (
                        <Button key={opt} variant="outline" size="sm" className="rounded-[2rem] border-white/20 text-ivory/80 hover:border-champagne/50 hover:text-ivory">{opt}</Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-ivory/60">Full Address</label>
                    <OnboardingInput placeholder="Enter property address" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-ivory/60">Monthly Rent</label>
                    <OnboardingInput placeholder="£ 0.00" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch defaultChecked className="data-[state=checked]:bg-champagne" />
                    <span className="text-sm text-ivory/70">Available Now</span>
                  </div>
                </div>
              </section>
              <section className="rounded-[2rem] border border-white/[0.06] bg-white/5 p-6 backdrop-blur-sm">
                <h3 className="text-sm font-medium text-champagne">Occupancy & Dynamic</h3>
                <div className="mt-4 flex gap-4">
                  <div>
                    <label className="mb-1 block text-xs text-ivory/60">Current Occupants</label>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="rounded-[2rem] border-white/20 text-ivory">−</Button>
                      <span className="w-8 text-center text-sm text-ivory">0</span>
                      <Button variant="outline" size="icon" className="rounded-[2rem] border-white/20 text-ivory">+</Button>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-ivory/60">Max Capacity</label>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="rounded-[2rem] border-white/20 text-ivory">−</Button>
                      <span className="w-8 text-center text-sm text-ivory">4</span>
                      <Button variant="outline" size="icon" className="rounded-[2rem] border-white/20 text-ivory">+</Button>
                    </div>
                  </div>
                </div>
              </section>
              <section className="rounded-[2rem] border border-white/[0.06] bg-white/5 p-6 backdrop-blur-sm">
                <h3 className="text-sm font-medium text-champagne">Accountability Layer (Compliance & Docs)</h3>
                <div className="mt-4 space-y-2">
                  {["EPC (Energy Performance Certificate)", "Gas Safety Certificate", "EICR (Electrical Safety)"].map((label) => (
                    <div key={label} className="flex items-center justify-between text-sm text-ivory/70">
                      <span>{label}</span>
                      <span className="text-xs text-champagne">Upload</span>
                    </div>
                  ))}
                </div>
                <OnboardingInput placeholder="e.g. Dropbox/Google Drive link" className="mt-3" />
              </section>
              <section className="rounded-[2rem] border border-dashed border-white/20 bg-white/5 p-8 text-center">
                <p className="text-sm text-ivory/60">Drag & drop your property photos here</p>
                <Button variant="link" size="sm" className="mt-2 text-champagne">Or browse files</Button>
              </section>
              <Button variant="outline" className="w-full rounded-[2rem] border-white/20 text-ivory/80 hover:border-champagne/50">Save and add another property to your portfolio</Button>
            </div>
            <Button className="mt-8 w-full rounded-[2rem] bg-champagne text-obsidian hover:bg-champagne/90" size="lg" onClick={handleContinue}>
              Confirm property details and continue
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="text-2xl font-semibold tracking-tight text-ivory md:text-3xl" style={{ letterSpacing: "-0.02em" }}>
              Secure the settlement.
            </h1>
            <p className="mt-2 text-ivory/60">
              Connect your account to enable automated rent collection and instant payouts. No more chasing transfers—just seamless cash flow.
            </p>
            <div className="mt-8 space-y-6">
              <Button className="w-full justify-start gap-2 rounded-[2rem] bg-champagne text-obsidian hover:bg-champagne/90" size="lg">
                🏦 Connect Bank for Rent Payouts
              </Button>
              <p className="text-xs text-ivory/50">We use bank-level encryption to ensure your rental income reaches you safely and on time, every month.</p>
              <Button variant="link" size="sm" className="text-champagne">Use manual details</Button>
              <section className="rounded-[2rem] border border-white/[0.06] bg-white/5 p-6 backdrop-blur-sm">
                <h3 className="text-sm font-medium text-ivory">Payment Automation Preferences</h3>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-ivory/80">Enable Automated Rent Tracking</span>
                    <Switch defaultChecked className="data-[state=checked]:bg-champagne" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-ivory/80">Auto-generate Monthly Invoices for Tenants</span>
                    <Switch defaultChecked className="data-[state=checked]:bg-champagne" />
                  </div>
                  <p className="text-xs text-ivory/50">By enabling automation, your FairRent Pedigree score increases as we can verify payment consistency automatically.</p>
                </div>
              </section>
              <div className="flex flex-wrap gap-4 text-xs text-ivory/50">
                <span>🛡 FCA Regulated Partner</span>
                <span>🔒 AES-256 Encrypted</span>
                <span>💳 PCI-DSS Compliant</span>
              </div>
            </div>
            <Button className="mt-8 w-full rounded-[2rem] bg-champagne text-obsidian hover:bg-champagne/90" size="lg" onClick={handleContinue}>
              Secure my financial setup and continue
            </Button>
          </>
        )}

        {step === 3 && (
          <>
            <h1 className="text-2xl font-semibold tracking-tight text-ivory md:text-3xl" style={{ letterSpacing: "-0.02em" }}>
              Build your pedigree. Attract the best.
            </h1>
            <p className="mt-2 text-ivory/60">
              High-performance tenants look for high-performance landlords. Showcase your track record to secure a top-tier match.
            </p>
            <div className="mt-8 space-y-6">
              <section className="rounded-[2rem] border border-dashed border-white/20 bg-white/5 p-8 text-center">
                <p className="text-sm text-ivory/60">Upload Compliance Pack</p>
                <p className="mt-1 text-xs text-ivory/50">Drag & drop your EPC, Gas Safety, EICR documents here</p>
              </section>
              <section className="rounded-[2rem] border border-white/[0.06] bg-white/5 p-6 backdrop-blur-sm">
                <h3 className="text-sm font-medium text-champagne">Certifications / Memberships</h3>
                <div className="mt-4 space-y-4">
                  {[
                    { label: "FCA Regulated", checked: false },
                    { label: "NRLA Member", checked: true },
                    { label: "Council Accredited", checked: false },
                  ].map(({ label, checked }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-sm text-ivory/80">{label}</span>
                      <Switch defaultChecked={checked} className="data-[state=checked]:bg-champagne" />
                    </div>
                  ))}
                </div>
              </section>
              <section className="rounded-[2rem] border border-white/[0.06] bg-white/5 p-6 backdrop-blur-sm">
                <h3 className="text-sm font-medium text-champagne">Past Tenant Endorsements</h3>
                <div className="mt-4 flex gap-2">
                  <OnboardingInput placeholder="tenant@example.com" className="flex-1" />
                  <Button size="sm" className="rounded-[2rem] bg-champagne text-obsidian hover:bg-champagne/90">Request a pedigree voucher</Button>
                </div>
                <p className="mt-2 text-xs text-ivory/50">A quick 1-question verification from a past tenant boosts your landlord score significantly.</p>
              </section>
              <section className="rounded-[2rem] border border-white/[0.06] bg-white/5 p-6 backdrop-blur-sm">
                <h3 className="text-sm font-medium text-champagne">Professional Stats</h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="mb-1 block text-xs text-ivory/60">Average Response Time</label>
                    <select className="w-full rounded-[2rem] rounded-b-none rounded-t-[0.25rem] border-b border-white/20 bg-white/5 py-3 text-ivory focus:border-champagne focus:outline-none">
                      <option>&lt;2 hours</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-ivory/60">Years in Property</label>
                    <OnboardingInput placeholder="e.g., 5" />
                  </div>
                </div>
              </section>
            </div>
            <Button className="mt-8 w-full rounded-[2rem] bg-champagne text-obsidian hover:bg-champagne/90" size="lg" onClick={handleContinue}>
              Confirm my pedigree and continue
            </Button>
          </>
        )}

        {step === 4 && (
          <>
            <h1 className="text-2xl font-semibold tracking-tight text-ivory md:text-3xl" style={{ letterSpacing: "-0.02em" }}>
              Your Portfolio is ready for the market.
            </h1>
            <p className="mt-2 text-ivory/60">
              Your profile is optimized and your pedigree is verified. Review your assets before we start matching.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <section className="overflow-hidden rounded-[2rem] border border-white/[0.06] bg-white/5">
                <div className="aspect-video">
                  <LuxeImage src={LUXE_IMAGE_LIST[0]} alt="Property" className="h-full w-full object-cover" />
                </div>
                <div className="p-4">
                  <p className="text-xs text-ivory/50">Property Type</p>
                  <p className="text-sm text-champagne">Address/Postcode · Target Rent</p>
                </div>
              </section>
              <section className="overflow-hidden rounded-[2rem] border border-white/[0.06] bg-white/5">
                <div className="aspect-video">
                  <LuxeImage src={LUXE_IMAGE_LIST[1]} alt="Property" className="h-full w-full object-cover" />
                </div>
                <div className="p-4">
                  <p className="text-xs text-ivory/50">Property Type</p>
                  <p className="text-sm text-champagne">Address/Postcode · Target Rent</p>
                </div>
              </section>
              <section className="flex min-h-[120px] flex-col items-center justify-center rounded-[2rem] border border-dashed border-white/20 bg-white/5 text-ivory/50">
                <span className="text-2xl">+</span>
                <p className="mt-2 text-sm">Add another property to this portfolio</p>
              </section>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <section className="rounded-[2rem] border border-white/[0.06] bg-white/5 p-6 backdrop-blur-sm">
                <h3 className="text-sm font-medium text-champagne">Identity</h3>
                <p className="mt-2 text-sm text-champagne">Name/Entity · Current Location · Management Style</p>
              </section>
              <section className="rounded-[2rem] border border-white/[0.06] bg-white/5 p-6 backdrop-blur-sm">
                <h3 className="text-sm font-medium text-champagne">Verified Pedigree</h3>
                <p className="mt-2 text-sm text-champagne">Compliance Docs: Verified</p>
                <p className="text-sm text-ivory/50">Tenant Refs: Status · Bank Link: Connected</p>
              </section>
            </div>
            <section className="mt-8 rounded-[2rem] border border-champagne/20 bg-champagne/10 p-6">
              <h3 className="text-sm font-medium text-ivory">Your Estimated FairRent Score</h3>
              <p className="mt-2 text-3xl font-semibold tabular-nums text-champagne">4.1 / 5.0</p>
              <p className="mt-2 text-sm text-ivory/70">
                A 4.1 is a strong start—you&apos;re already outperforming 70% of the local market. Once you&apos;re in the portal, we&apos;ll show you how to hit that 5.0 (like completing your compliance pack) to attract the highest-rated tenants in the city.
              </p>
            </section>
            <p className="mt-4 flex items-center gap-2 text-sm text-ivory/60">
              ❤ We&apos;ve found 28 verified tenants in your area currently searching for properties in your portfolio.
            </p>
            <Button className="mt-8 w-full rounded-[2rem] bg-champagne text-obsidian hover:bg-champagne/90" size="lg" onClick={handleContinue}>
              Open my portal and view matches
            </Button>
          </>
        )}
      </OnboardingShell>
    </OnboardingGuard>
  );
}
