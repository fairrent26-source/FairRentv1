"use client";

import { useRef, useState } from "react";
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
  { label: "Identity & Bio" },
  { label: "Review" },
];

const BIO_MAX_CHARS = 300;
const BIO_PLACEHOLDER =
  "e.g. Quiet professional working in tech, originally from Manchester. I keep my space tidy, love cooking on weekends, and I'm looking for a long-term home where I can settle in. Non-smoker, no pets, always pay rent on time.";

export default function TenantOnboardingPage() {
  const router = useRouter();
  const completeOnboarding = useAuthStore((s) => s.completeOnboarding);
  const [step, setStep] = useState(0);
  const [docType, setDocType] = useState<"passport" | "license" | null>(null);
  const [uploadedDoc, setUploadedDoc] = useState<File | null>(null);
  const [bio, setBio] = useState("");
  const docInputRef = useRef<HTMLInputElement>(null);

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
            <h1 className="text-2xl font-display font-bold uppercase tracking-display text-text-primary md:text-3xl">
              Build your profile and we&apos;ll find the properties and landlords most suited for you
            </h1>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <section className="rounded-[2rem] border border-ui-tags bg-bg-card p-6 backdrop-blur-sm">
                <h2 className="text-sm font-display font-bold uppercase tracking-display text-brand-teal">Status</h2>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="mb-1 block text-xs text-text-muted">Full Name</label>
                    <OnboardingInput placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-text-muted">Current Postcode</label>
                    <OnboardingInput placeholder="SW1A OAA" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-text-muted">Employment Status</label>
                    <div className="flex flex-wrap gap-2">
                      {["Full-time", "Freelance", "Student", "Self-Employed", "Other"].map((opt) => (
                        <Button key={opt} variant="outline" size="sm" className="rounded-[2rem] border-ui-tags text-text-muted hover:border-brand-teal/50 hover:text-text-primary">
                          {opt}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-text-muted">Photos and names are 100% anonymized during matching.</p>
                </div>
              </section>
              <section className="rounded-[2rem] border border-ui-tags bg-bg-card p-6 backdrop-blur-sm">
                <h2 className="text-sm font-display font-bold uppercase tracking-display text-brand-teal">Your Property Preferences</h2>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="mb-1 block text-xs text-text-muted">Target Search Area</label>
                    <OnboardingInput placeholder="Postcode or City" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-text-muted">Search Radius</label>
                    <input type="range" min="0.5" max="20" className="h-2 w-full accent-brand-teal" />
                    <div className="mt-1 flex justify-between text-xs text-text-muted">
                      <span>0.5 miles</span>
                      <span>20 miles</span>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-text-muted">Property Type</label>
                    <div className="flex flex-wrap gap-2">
                      {["Flat", "Maisonette", "Whole House", "Studio", "Terraced"].map((opt) => (
                        <Button key={opt} variant="outline" size="sm" className="rounded-[2rem] border-ui-tags text-text-muted hover:border-brand-teal/50 hover:text-text-primary">
                          {opt}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <div>
                      <label className="mb-1 block text-xs text-text-muted">Max Flatmates</label>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="rounded-[2rem] border-ui-tags text-text-primary">−</Button>
                        <span className="w-8 text-center text-sm text-text-primary">1</span>
                        <Button variant="outline" size="icon" className="rounded-[2rem] border-ui-tags text-text-primary">+</Button>
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-text-muted">Ideal length of stay (months)</label>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="rounded-[2rem] border-ui-tags text-text-primary">−</Button>
                        <span className="w-8 text-center text-sm text-text-primary">1</span>
                        <Button variant="outline" size="icon" className="rounded-[2rem] border-ui-tags text-text-primary">+</Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch className="data-[state=checked]:bg-brand-teal" />
                    <span className="text-sm text-text-muted">Move-in Timeline: ASAP</span>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-text-muted">Monthly Budget</label>
                    <input type="range" className="h-2 w-full accent-brand-teal" />
                    <div className="mt-1 flex justify-between text-xs text-text-muted">
                      <span>£500 (Min)</span>
                      <span>£5000 (Max)</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <Button className="mt-8 w-full rounded-[2rem] bg-brand-teal text-text-primary hover:bg-accent-lime" size="lg" onClick={handleContinue}>
              Save my status and preferences and continue
            </Button>
          </>
        )}

        {step === 1 && (
          <>
            <h1 className="text-2xl font-display font-bold uppercase tracking-display text-text-primary md:text-3xl">
              Bolster your score. Prove your rep.
            </h1>
            <p className="mt-2 text-text-muted">
              Match with landlords whose standards are as high as yours. Turn your history into a high-performance asset.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <section className="rounded-[2rem] border border-ui-tags bg-bg-card p-6 backdrop-blur-sm">
                <h2 className="text-sm font-display font-bold uppercase tracking-display text-brand-teal">The Digital Power-Link (Automated)</h2>
                <div className="relative mt-4 aspect-video overflow-hidden rounded-[2rem] border border-ui-tags">
                  <LuxeImage src={LUXE_IMAGES.interior} alt="Connect 24 months payment history" />
                  <div className="absolute inset-0 flex items-center justify-center bg-bg-main/40">
                    <span className="text-center text-sm font-medium text-text-primary">Connect 24 months payment history</span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-text-muted">Import 24 months of perfect payment history instantly.</p>
                <div className="mt-2 text-sm text-brand-teal">
                  <p>Equifax Sync: +25% Score Potential ✓</p>
                  <p>Landlord Ref: +15% Score Potential</p>
                </div>
              </section>
              <section className="rounded-[2rem] border border-ui-tags bg-bg-card p-6 backdrop-blur-sm">
                <h2 className="text-sm font-display font-bold uppercase tracking-display text-text-primary">Verified References</h2>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="mb-1 block text-xs text-text-muted">Previous Landlord Email</label>
                    <OnboardingInput placeholder="landlord@example.com" />
                  </div>
                  <Button variant="outline" size="sm" className="rounded-[2rem] border-ui-tags text-text-muted hover:border-brand-teal/50">
                    Request Official Handshake
                  </Button>
                  <div className="rounded-[2rem] border border-dashed border-ui-tags bg-bg-card py-6 text-center text-sm text-text-muted">
                    Drag & drop PDF references, tenancy agreements here
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-text-muted">Your Track Record Summary</label>
                    <OnboardingTextarea placeholder="e.g., Always on time, impeccable property care" />
                  </div>
                </div>
              </section>
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-text-muted">
              🔒 Anonymized outreach. We protect your current search until you&apos;re ready to sign.
            </p>
            <Button className="mt-6 w-full rounded-[2rem] bg-brand-teal text-text-primary hover:bg-accent-lime" size="lg" onClick={handleContinue}>
              Submit your reference history and continue
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="text-2xl font-display font-bold uppercase tracking-display text-text-primary md:text-3xl">
              Power your payments.
            </h1>
            <p className="mt-2 text-text-muted">
              Link your account now to enable one-click Direct Debits later. We don&apos;t pull your transaction data—we just verify your connection.
            </p>
            <div className="mt-8 space-y-6">
              <Button className="w-full justify-start gap-2 rounded-[2rem] bg-brand-teal text-text-primary hover:bg-accent-lime" size="lg">
                🔒 Securely Link Bank Account
              </Button>
              <p className="text-xs text-text-muted">Linking now simplifies your Direct Debit setup once you find your perfect match. No data is harvested.</p>
              <Button variant="outline" className="w-full rounded-[2rem] border-ui-tags text-text-muted hover:border-brand-teal/50" onClick={handleContinue}>
                I&apos;ll initiate payments manually
              </Button>
              <div className="rounded-[2rem] border border-red-500/30 bg-red-500/10 p-4 text-sm text-text-primary/90">
                Manual payments require self-initiation each month. Note: Any delays in manual transfers may negatively impact your FairRent score.
              </div>
              <p className="text-xs text-text-muted">FCA Regulated Partner · AES-256 Encryption · Zero Data Harvesting Policy</p>
            </div>
            <Button className="mt-8 w-full rounded-[2rem] bg-brand-teal text-text-primary hover:bg-accent-lime" size="lg" onClick={handleContinue}>
              Confirm my payment preference
            </Button>
          </>
        )}

        {step === 3 && (
          <>
            <h1 className="text-2xl font-display font-bold uppercase tracking-display text-text-primary md:text-3xl">
              Verify your identity and add a personal touch
            </h1>
            <p className="mt-2 text-text-muted">
              A one-time identity check unlocks the &ldquo;Verified&rdquo; badge landlords trust. Add an optional bio to stand out once you match.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <section className="rounded-[2rem] border border-ui-tags bg-bg-card p-6 backdrop-blur-sm">
                <h2 className="text-sm font-display font-bold uppercase tracking-display text-brand-teal">Government ID Verification</h2>
                <p className="mt-2 text-xs text-text-muted">
                  Upload a clear photo of one certified government document.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {([
                    { id: "passport", label: "Passport" },
                    { id: "license", label: "Driver's License" },
                  ] as const).map((opt) => (
                    <Button
                      key={opt.id}
                      variant="outline"
                      size="sm"
                      onClick={() => setDocType(opt.id)}
                      className={`h-auto min-h-9 whitespace-normal px-2 py-2 text-xs leading-tight rounded-[2rem] border-ui-tags text-text-muted hover:border-brand-teal/50 hover:text-text-primary ${
                        docType === opt.id ? "border-brand-teal bg-brand-teal/10 text-text-primary" : ""
                      }`}
                    >
                      {opt.label}
                    </Button>
                  ))}
                </div>
                <input
                  ref={docInputRef}
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={(e) => setUploadedDoc(e.target.files?.[0] ?? null)}
                />
                <button
                  type="button"
                  onClick={() => docInputRef.current?.click()}
                  disabled={!docType}
                  className="mt-4 w-full rounded-[2rem] border border-dashed border-ui-tags bg-bg-card py-6 text-center text-sm text-text-muted transition-colors hover:border-brand-teal/50 hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {uploadedDoc
                    ? `Selected: ${uploadedDoc.name}`
                    : docType
                    ? `Tap to upload your ${docType === "passport" ? "passport" : "driver's license"}`
                    : "Select a document type first"}
                </button>
                <div className="mt-4 rounded-[2rem] border border-brand-teal/20 bg-brand-teal/10 p-4 text-xs text-text-muted">
                  <p className="font-medium text-brand-teal">🔒 We never store your document.</p>
                  <p className="mt-1">
                    Your ID is sent directly to our FCA-regulated verification partner to be checked and reviewed, then permanently deleted. We&apos;ll notify you once your verification is complete. FairRent only ever receives a pass/fail result—never the image itself.
                  </p>
                </div>
              </section>
              <section className="rounded-[2rem] border border-ui-tags bg-bg-card p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-display font-bold uppercase tracking-display text-text-primary">Your Bio</h2>
                  <span className="rounded-full border border-ui-tags px-2 py-0.5 text-[10px] uppercase tracking-wide text-text-muted">
                    Optional
                  </span>
                </div>
                <p className="mt-2 text-xs text-text-muted">
                  A short, friendly intro shared with landlords only after you match.
                </p>
                <div className="mt-4">
                  <OnboardingTextarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value.slice(0, BIO_MAX_CHARS))}
                    maxLength={BIO_MAX_CHARS}
                    placeholder={BIO_PLACEHOLDER}
                    className="min-h-[160px]"
                  />
                  <div className="mt-1 flex justify-end">
                    <span
                      className={`text-xs tabular-nums ${
                        bio.length >= BIO_MAX_CHARS ? "text-red-400" : "text-text-muted"
                      }`}
                    >
                      {bio.length} / {BIO_MAX_CHARS}
                    </span>
                  </div>
                </div>
              </section>
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-text-muted">
              🔒 Identity checks are processed by a certified third party. Your bio stays hidden until you choose to match.
            </p>
            <Button className="mt-6 w-full rounded-[2rem] bg-brand-teal text-text-primary hover:bg-accent-lime" size="lg" onClick={handleContinue}>
              Verify my identity and continue
            </Button>
          </>
        )}

        {step === 4 && (
          <>
            <h1 className="text-2xl font-display font-bold uppercase tracking-display text-text-primary md:text-3xl">
              Review your FairRent Profile
            </h1>
            <p className="mt-2 text-text-muted">
              Your profile is built and 100% anonymized. Here is how you appear to the marketplace.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <section className="rounded-[2rem] border border-ui-tags bg-bg-card p-6 backdrop-blur-sm">
                <h3 className="text-sm font-display font-bold uppercase tracking-display text-brand-teal">Status</h3>
                <p className="mt-2 text-text-muted">John Doe</p>
                <p className="text-xs text-text-muted">Current Location: SW1A OAA</p>
                <p className="text-xs text-text-muted">Employment: Full-time</p>
                <p className="text-xs text-text-muted">Household: 1 Occupant</p>
              </section>
              <section className="rounded-[2rem] border border-ui-tags bg-bg-card p-6 backdrop-blur-sm">
                <h3 className="text-sm font-display font-bold uppercase tracking-display text-brand-teal">The Search</h3>
                <p className="mt-2 text-xs text-text-muted">Area: SW1A OAA · Radius: 5 miles</p>
                <p className="text-xs text-text-muted">Property Types: Flat, House</p>
                <p className="text-xs text-text-muted">Budget: £1500 - £2000 · Timeline: ASAP</p>
              </section>
              <section className="rounded-[2rem] border border-ui-tags bg-bg-card p-6 backdrop-blur-sm">
                <h3 className="text-sm font-display font-bold uppercase tracking-display text-brand-teal">Verified Assets</h3>
                <p className="mt-2 text-xs text-brand-teal">Equifax: Linked</p>
                <p className="text-xs text-text-muted">References: Pending</p>
                <p className="text-xs text-brand-teal">Bank: Connected · Direct Debit: Enabled</p>
                <p className="text-xs text-brand-teal">
                  Identity: {docType ? "Verified ✓" : "Pending"}
                </p>
              </section>
            </div>
            <section className="mt-6 rounded-[2rem] border border-brand-teal/20 bg-brand-teal/10 p-6">
              <h3 className="text-sm font-display font-bold uppercase tracking-display text-text-primary">Your Estimated FairRent Score</h3>
              <p className="mt-2 text-3xl font-semibold tabular-nums text-brand-teal">3.8 / 5.0</p>
              <p className="mt-2 text-sm text-text-muted">
                Not a bad opening act. Let&apos;s get you to a 5.0. Once you&apos;re inside, we&apos;ll show you the easy wins—like a quick reference or ticking the auto-pay box—to put you at the top of every landlord&apos;s list.
              </p>
            </section>
            <p className="mt-4 flex items-center gap-2 text-xs text-text-muted">
              🔒 Names and photos remain hidden. Landlords only see your verified metrics and search intent.
            </p>
            <Button className="mt-8 w-full rounded-[2rem] bg-brand-teal text-text-primary hover:bg-accent-lime" size="lg" onClick={handleContinue}>
              Enter the marketplace and find my match
            </Button>
          </>
        )}
      </OnboardingShell>
    </OnboardingGuard>
  );
}
