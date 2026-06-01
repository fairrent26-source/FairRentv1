"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ShieldCheck, Lock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { LuxeImage } from "@/components/ui/LuxeImage";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { OnboardingInput } from "@/components/onboarding/OnboardingInput";
import { OnboardingTextarea } from "@/components/onboarding/OnboardingTextarea";
import { LUXE_IMAGES, LUXE_IMAGE_LIST } from "@/lib/images";
import { OnboardingGuard } from "@/components/auth/OnboardingGuard";
import { useAuthStore } from "@/store/auth-store";

/** Mock Plaid/TrueLayer Link: returns public_token. No bank details stored. */
function mockOpenBankLink(): Promise<{ public_token: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ public_token: `tl_${Math.random().toString(36).slice(2, 14)}` });
    }, 2200);
  });
}

const STEPS = [
  { label: "Identity" },
  { label: "Property" },
  { label: "Financials" },
  { label: "Pedigree" },
  { label: "Launch" },
];

const AMENITY_OPTIONS = [
  "Parking",
  "Garden",
  "Balcony",
  "Terrace",
  "Dishwasher",
  "Washing machine",
  "Dryer",
  "Central heating",
  "Double glazing",
  "Furnished",
  "Pets allowed",
  "Bike storage",
  "Gym",
  "Elevator",
  "Allocated parking",
  "Driveway",
  "Garage",
  "Outdoor space",
] as const;

/** Landlord entity type for identity step — mutually exclusive, DB-ready. */
export type LandlordEntityType = "private_landlord" | "limited_company";

/** Property type (single selection). Whole house is a separate question. */
export type PropertyType = "flat" | "maisonette" | "studio" | "terraced" | "semi_detached" | "detached";

/** Sharing or whole house — mutually exclusive. */
export type SharingOrWhole = "sharing" | "whole_house";

/** Availability — one of: available now, available from date, or already tenanted. */
export type AvailabilityMode = "available_now" | "available_from" | "already_tenanted";

type ComplianceDocId = "epc" | "gasSafety" | "eicr";

export type ComplianceDocEntry = { haveOne: boolean; provided: boolean; file: File | null };
export type ComplianceDocsState = {
  epc: ComplianceDocEntry & { rating: string | null };
  gasSafety: ComplianceDocEntry;
  eicr: ComplianceDocEntry;
};

const EPC_RATINGS = ["A", "B", "C", "D", "E", "F", "G"] as const;

/** One saved property in this session (in-memory only; no backend yet). */
export interface SavedProperty {
  fullAddress: string;
  propertyType: PropertyType | null;
  sharingOrWhole: SharingOrWhole | null;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  currentOccupants: number;
  maxCapacity: number;
  desiredMonthlyRent: string;
  availabilityMode: AvailabilityMode;
  availableFromDate: string;
  complianceDocs: ComplianceDocsState;
  propertyPhotoFiles: File[];
  billsIncludedInRent: boolean;
  billItems: BillItem[];
}

const defaultComplianceDocs: ComplianceDocsState = {
  epc: { haveOne: false, rating: null, provided: false, file: null },
  gasSafety: { haveOne: false, provided: false, file: null },
  eicr: { haveOne: false, provided: false, file: null },
};

const BILL_OPTIONS = [
  { id: "council_tax", label: "Council tax" },
  { id: "water", label: "Water" },
  { id: "gas", label: "Gas" },
  { id: "electricity", label: "Electricity" },
  { id: "broadband", label: "Broadband / WiFi" },
  { id: "tv_licence", label: "TV licence" },
] as const;

export type BillItem = { id: string; label: string; included: boolean; cost: string };

const defaultBillItems: BillItem[] = BILL_OPTIONS.map(({ id, label }) => ({ id, label, included: false, cost: "" }));

export default function LandlordOnboardingPage() {
  const router = useRouter();
  const completeOnboarding = useAuthStore((s) => s.completeOnboarding);
  const [step, setStep] = useState(0);
  const [landlordEntityType, setLandlordEntityType] = useState<LandlordEntityType | null>(null);
  const [propertyType, setPropertyType] = useState<PropertyType | null>(null);
  const [sharingOrWhole, setSharingOrWhole] = useState<SharingOrWhole | null>(null);
  const [bedrooms, setBedrooms] = useState<number>(1);
  const [bathrooms, setBathrooms] = useState<number>(1);
  const [amenities, setAmenities] = useState<Set<string>>(new Set());
  const [currentOccupants, setCurrentOccupants] = useState<number>(0);
  const [maxCapacity, setMaxCapacity] = useState<number>(4);
  const [fullAddress, setFullAddress] = useState<string>("");
  const [desiredMonthlyRent, setDesiredMonthlyRent] = useState<string>("");
  const [availabilityMode, setAvailabilityMode] = useState<AvailabilityMode>("available_now");
  const [availableFromDate, setAvailableFromDate] = useState<string>("");
  const [complianceDocs, setComplianceDocs] = useState<ComplianceDocsState>(defaultComplianceDocs);
  const complianceFileInputRef = useRef<HTMLInputElement>(null);
  const [complianceUploadTarget, setComplianceUploadTarget] = useState<ComplianceDocId | null>(null);
  const propertyPhotosInputRef = useRef<HTMLInputElement>(null);
  const [propertyPhotoFiles, setPropertyPhotoFiles] = useState<File[]>([]);
  const [billsIncludedInRent, setBillsIncludedInRent] = useState<boolean>(false);
  const [billItems, setBillItems] = useState<BillItem[]>(() => defaultBillItems.map((b) => ({ ...b })));
  const [savedProperties, setSavedProperties] = useState<SavedProperty[]>([]);
  const [bankConnected, setBankConnected] = useState(false);
  const [bankLoading, setBankLoading] = useState(false);
  const [bankTokenId, setBankTokenId] = useState<string | null>(null);
  const [bankAutoRentTracking, setBankAutoRentTracking] = useState(true);
  const [bankAutoInvoices, setBankAutoInvoices] = useState(true);
  const bankInitialRef = useRef<HTMLDivElement>(null);
  const bankVerifiedRef = useRef<HTMLDivElement>(null);
  const [, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreviewUrl, setProfileImagePreviewUrl] = useState<string | null>(null);
  const profileImageInputRef = useRef<HTMLInputElement>(null);

  const handleBankLink = async () => {
    setBankLoading(true);
    try {
      const { public_token } = await mockOpenBankLink();
      setBankTokenId(public_token);
      setBankConnected(true);
    } finally {
      setBankLoading(false);
    }
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    if (profileImagePreviewUrl) URL.revokeObjectURL(profileImagePreviewUrl);
    setProfileImageFile(file);
    setProfileImagePreviewUrl(URL.createObjectURL(file));
    e.target.value = "";
  };

  const handleProfileImageDelete = () => {
    if (profileImagePreviewUrl) URL.revokeObjectURL(profileImagePreviewUrl);
    setProfileImageFile(null);
    setProfileImagePreviewUrl(null);
    if (profileImageInputRef.current) profileImageInputRef.current.value = "";
  };

  const handlePropertyPhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length) setPropertyPhotoFiles((prev) => [...prev, ...files]);
    e.target.value = "";
  };

  const handleComplianceFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && complianceUploadTarget) {
      setComplianceDocs((prev) => {
        const current = prev[complianceUploadTarget];
        const next = { ...prev, [complianceUploadTarget]: { ...current, provided: true, file } };
        return next;
      });
      setComplianceUploadTarget(null);
    }
    e.target.value = "";
  };

  const getCurrentPropertySnapshot = (): SavedProperty => ({
    fullAddress,
    propertyType,
    sharingOrWhole,
    bedrooms,
    bathrooms,
    amenities: Array.from(amenities),
    currentOccupants,
    maxCapacity,
    desiredMonthlyRent,
    availabilityMode,
    availableFromDate,
    complianceDocs: {
      epc: { ...complianceDocs.epc },
      gasSafety: { ...complianceDocs.gasSafety },
      eicr: { ...complianceDocs.eicr },
    },
    propertyPhotoFiles: [...propertyPhotoFiles],
    billsIncludedInRent,
    billItems: billItems.map((i) => ({ ...i })),
  });

  const resetFormToDefaults = () => {
    setFullAddress("");
    setPropertyType(null);
    setSharingOrWhole(null);
    setBedrooms(1);
    setBathrooms(1);
    setAmenities(new Set());
    setCurrentOccupants(0);
    setMaxCapacity(4);
    setDesiredMonthlyRent("");
    setAvailabilityMode("available_now");
    setAvailableFromDate("");
    setComplianceDocs(structuredClone(defaultComplianceDocs));
    setPropertyPhotoFiles([]);
    setBillsIncludedInRent(false);
    setBillItems(defaultBillItems.map((i) => ({ ...i })));
  };

  const loadPropertyIntoForm = (p: SavedProperty) => {
    setFullAddress(p.fullAddress);
    setPropertyType(p.propertyType);
    setSharingOrWhole(p.sharingOrWhole);
    setBedrooms(p.bedrooms);
    setBathrooms(p.bathrooms);
    setAmenities(new Set(p.amenities));
    setCurrentOccupants(p.currentOccupants);
    setMaxCapacity(p.maxCapacity);
    setDesiredMonthlyRent(p.desiredMonthlyRent);
    setAvailabilityMode(p.availabilityMode);
    setAvailableFromDate(p.availableFromDate);
    setComplianceDocs({
      epc: {
        haveOne: (p.complianceDocs as ComplianceDocsState).epc?.haveOne ?? false,
        rating: (p.complianceDocs as ComplianceDocsState).epc?.rating ?? null,
        provided: p.complianceDocs.epc?.provided ?? false,
        file: p.complianceDocs.epc?.file ?? null,
      },
      gasSafety: {
        haveOne: (p.complianceDocs as ComplianceDocsState).gasSafety?.haveOne ?? false,
        provided: p.complianceDocs.gasSafety?.provided ?? false,
        file: p.complianceDocs.gasSafety?.file ?? null,
      },
      eicr: {
        haveOne: (p.complianceDocs as ComplianceDocsState).eicr?.haveOne ?? false,
        provided: p.complianceDocs.eicr?.provided ?? false,
        file: p.complianceDocs.eicr?.file ?? null,
      },
    });
    setPropertyPhotoFiles([...p.propertyPhotoFiles]);
    setBillsIncludedInRent(p.billsIncludedInRent ?? false);
    setBillItems((p.billItems ?? defaultBillItems).map((i) => ({ ...i })));
  };

  const handleSaveAndAddAnother = () => {
    setSavedProperties((prev) => [...prev, getCurrentPropertySnapshot()]);
    resetFormToDefaults();
  };

  const handleEditSavedProperty = (index: number) => {
    const property = savedProperties[index];
    if (!property) return;
    loadPropertyIntoForm(property);
    setSavedProperties((prev) => prev.filter((_, i) => i !== index));
  };

  const handleContinue = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      completeOnboarding();
      router.push("/landlord");
    }
  };

  useEffect(() => {
    if (!bankConnected) return;
    const initial = bankInitialRef.current;
    const verified = bankVerifiedRef.current;
    if (!initial || !verified) return;
    gsap.set(verified, { opacity: 0, scale: 0.98 });
    const tl = gsap.timeline({
      onComplete: () => {
        if (verified) (verified as HTMLElement).style.pointerEvents = "auto";
      },
    });
    tl.to(initial, { opacity: 0, duration: 0.35, ease: "power2.inOut" });
    tl.to(verified, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }, "-=0.1");
    return () => {
      tl.kill();
      if (verified) (verified as HTMLElement).style.pointerEvents = "";
    };
  }, [bankConnected]);

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
                <label className="mb-1 block text-sm font-medium text-ivory/70">Full Name</label>
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
                <input
                  ref={profileImageInputRef}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  aria-hidden
                  onChange={handleProfileImageChange}
                />
                <div className="mt-2 flex items-center gap-4">
                  <button
                    type="button"
                    className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[2rem] border-2 border-dashed border-white/20 bg-white/5 text-2xl text-ivory/50 hover:border-white/30 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-champagne/50"
                    onClick={() => !profileImagePreviewUrl && profileImageInputRef.current?.click()}
                  >
                    {profileImagePreviewUrl ? (
                      <img src={profileImagePreviewUrl} alt="Profile" className="h-full w-full object-cover" />
                    ) : (
                      "+"
                    )}
                  </button>
                  <div className="min-w-0 flex-1">
                    {profileImagePreviewUrl ? (
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <button
                          type="button"
                          onClick={() => window.open(profileImagePreviewUrl ?? undefined, "_blank")}
                          className="font-medium text-champagne underline underline-offset-2 hover:text-champagne/80"
                        >
                          View
                        </button>
                        <span className="text-ivory/40">·</span>
                        <button
                          type="button"
                          onClick={() => profileImageInputRef.current?.click()}
                          className="font-medium text-champagne underline underline-offset-2 hover:text-champagne/80"
                        >
                          Change
                        </button>
                        <span className="text-ivory/40">·</span>
                        <button
                          type="button"
                          onClick={handleProfileImageDelete}
                          className="font-medium text-red-400/90 underline underline-offset-2 hover:text-red-400"
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <p className="text-xs text-ivory/50">Upload a headshot or company logo. This will be visible to tenants.</p>
                    )}
                  </div>
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
              {savedProperties.length === 0 ? "List your first home." : "List another home."}
            </h1>
            <p className="mt-2 text-ivory/60">
              Add your asset to the marketplace. High-quality data attracts high-quality matches.
            </p>
            {savedProperties.length > 0 && (
              <section className="mt-6 rounded-[2rem] border border-white/[0.06] bg-white/5 p-4 backdrop-blur-sm">
                <h3 className="text-xs font-medium text-champagne">Your saved properties</h3>
                <ul className="mt-3 space-y-2">
                  {savedProperties.map((p, index) => (
                    <li key={index} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2">
                      <span className="text-sm text-ivory/80 truncate">
                        {p.fullAddress || `Property ${index + 1}`}
                        {p.desiredMonthlyRent ? ` · ${p.desiredMonthlyRent}` : ""}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleEditSavedProperty(index)}
                        className="text-xs font-medium text-champagne underline underline-offset-2 hover:text-champagne/80"
                      >
                        Edit details
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <div className="mt-8 space-y-6">
              <section className="rounded-[2rem] border border-white/[0.06] bg-white/5 p-6 backdrop-blur-sm">
                <h3 className="text-sm font-medium text-champagne">Property details</h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="mb-1 block text-xs text-ivory/60">Full Address</label>
                    <OnboardingInput placeholder="Enter property address" value={fullAddress} onChange={(e) => setFullAddress(e.target.value)} />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-ivory/60">Property Type</label>
                    <p className="mb-2 text-xs text-ivory/50">Select one.</p>
                    <div className="flex flex-wrap gap-2">
                      {(
                        [
                          { value: "flat" as const, label: "Flat" },
                          { value: "maisonette" as const, label: "Maisonette" },
                          { value: "studio" as const, label: "Studio" },
                          { value: "terraced" as const, label: "Terraced" },
                          { value: "semi_detached" as const, label: "Semi-detached" },
                          { value: "detached" as const, label: "Detached" },
                        ] as const
                      ).map(({ value, label }) => (
                        <Button
                          key={value}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setPropertyType(value)}
                          className={`rounded-[2rem] ${propertyType === value ? "bg-champagne text-obsidian hover:bg-champagne/90" : "border-white/20 text-ivory/80 hover:border-champagne/50 hover:text-ivory"}`}
                        >
                          {label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-6">
                    <div>
                      <label className="mb-1 block text-xs text-ivory/60">Bedrooms</label>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="rounded-[2rem] border-white/20 text-ivory hover:border-champagne/50"
                          onClick={() => setBedrooms((n) => Math.max(1, n - 1))}
                        >
                          −
                        </Button>
                        <span className="w-8 text-center text-sm text-ivory">{bedrooms}</span>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="rounded-[2rem] border-white/20 text-ivory hover:border-champagne/50"
                          onClick={() => setBedrooms((n) => Math.min(20, n + 1))}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-ivory/60">Bathrooms</label>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="rounded-[2rem] border-white/20 text-ivory hover:border-champagne/50"
                          onClick={() => setBathrooms((n) => Math.max(1, n - 1))}
                        >
                          −
                        </Button>
                        <span className="w-8 text-center text-sm text-ivory">{bathrooms}</span>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="rounded-[2rem] border-white/20 text-ivory hover:border-champagne/50"
                          onClick={() => setBathrooms((n) => Math.min(20, n + 1))}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-ivory/60">Amenities</label>
                    <p className="mb-2 text-xs text-ivory/50">Select all that apply.</p>
                    <div className="flex flex-wrap gap-2">
                      {AMENITY_OPTIONS.map((opt) => {
                        const selected = amenities.has(opt);
                        return (
                          <Button
                            key={opt}
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setAmenities((prev) => {
                                const next = new Set(prev);
                                if (next.has(opt)) next.delete(opt);
                                else next.add(opt);
                                return next;
                              });
                            }}
                            className={`rounded-[2rem] ${selected ? "bg-champagne text-obsidian hover:bg-champagne/90" : "border-white/20 text-ivory/80 hover:border-champagne/50 hover:text-ivory"}`}
                          >
                            {opt}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-ivory/60">Sharing property or whole house?</label>
                    <p className="mb-2 text-xs text-ivory/50">Select one.</p>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setSharingOrWhole("sharing")}
                        className={`rounded-[2rem] ${sharingOrWhole === "sharing" ? "bg-champagne text-obsidian hover:bg-champagne/90" : "border-white/20 text-ivory/80 hover:border-champagne/50 hover:text-ivory"}`}
                      >
                        Sharing property
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => { setSharingOrWhole("whole_house"); setMaxCapacity(1); }}
                        className={`rounded-[2rem] ${sharingOrWhole === "whole_house" ? "bg-champagne text-obsidian hover:bg-champagne/90" : "border-white/20 text-ivory/80 hover:border-champagne/50 hover:text-ivory"}`}
                      >
                        Whole house
                      </Button>
                    </div>
                  </div>
                  <div className="border-t border-white/[0.06] pt-4">
                    <h4 className="mb-3 text-xs font-medium text-champagne">Occupancy & Dynamic</h4>
                    <div className="flex flex-wrap gap-6">
                      <div>
                        <label className="mb-1 block text-xs text-ivory/60">Current Occupants</label>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="rounded-[2rem] border-white/20 text-ivory hover:border-champagne/50"
                            onClick={() => setCurrentOccupants((n) => Math.max(0, n - 1))}
                          >
                            −
                          </Button>
                          <span className="w-8 text-center text-sm text-ivory">{currentOccupants}</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="rounded-[2rem] border-white/20 text-ivory hover:border-champagne/50"
                            onClick={() => setCurrentOccupants((n) => n + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <div className={sharingOrWhole === "whole_house" ? "opacity-50" : ""}>
                        <label className="mb-1 block text-xs text-ivory/60">Max Capacity</label>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="rounded-[2rem] border-white/20 text-ivory hover:border-champagne/50 disabled:opacity-100"
                            onClick={() => sharingOrWhole !== "whole_house" && setMaxCapacity((n) => Math.max(1, n - 1))}
                            disabled={sharingOrWhole === "whole_house"}
                          >
                            −
                          </Button>
                          <span className="w-8 text-center text-sm text-ivory">{sharingOrWhole === "whole_house" ? 1 : maxCapacity}</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="rounded-[2rem] border-white/20 text-ivory hover:border-champagne/50 disabled:opacity-100"
                            onClick={() => sharingOrWhole !== "whole_house" && setMaxCapacity((n) => n + 1)}
                            disabled={sharingOrWhole === "whole_house"}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-ivory/60">Date available from</label>
                    <div className="mt-2 space-y-2">
                      <div className="flex flex-wrap gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => { setAvailabilityMode("available_now"); setAvailableFromDate(""); }}
                          className={`rounded-[2rem] ${availabilityMode === "available_now" ? "bg-champagne text-obsidian hover:bg-champagne/90" : "border-white/20 text-ivory/80 hover:border-champagne/50 hover:text-ivory"}`}
                        >
                          Available now
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => { setAvailabilityMode("already_tenanted"); setAvailableFromDate(""); }}
                          className={`rounded-[2rem] ${availabilityMode === "already_tenanted" ? "bg-champagne text-obsidian hover:bg-champagne/90" : "border-white/20 text-ivory/80 hover:border-champagne/50 hover:text-ivory"}`}
                        >
                          Already tenanted
                        </Button>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setAvailabilityMode("available_from")}
                          className={`rounded-[2rem] ${availabilityMode === "available_from" ? "bg-champagne text-obsidian hover:bg-champagne/90" : "border-white/20 text-ivory/80 hover:border-champagne/50 hover:text-ivory"}`}
                        >
                          Pick a date
                        </Button>
                        {availabilityMode === "available_from" && (
                          <input
                            type="date"
                            value={availableFromDate}
                            min={new Date().toISOString().slice(0, 10)}
                            max={(() => {
                              const d = new Date();
                              d.setMonth(d.getMonth() + 12);
                              return d.toISOString().slice(0, 10);
                            })()}
                            onChange={(e) => setAvailableFromDate(e.target.value)}
                            className="rounded-[2rem] border border-white/20 bg-white/5 px-3 py-2 text-sm text-ivory focus:border-champagne focus:outline-none"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="rounded-[2rem] border border-white/[0.06] bg-white/5 p-6 backdrop-blur-sm">
                <h3 className="text-sm font-medium text-champagne">Bills included</h3>
                <p className="mt-1 text-xs text-ivory/50">Are any bills included in the rent? This helps us build your opex profile.</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setBillsIncludedInRent(false)}
                    className={`rounded-[2rem] ${!billsIncludedInRent ? "bg-champagne text-obsidian hover:bg-champagne/90" : "border-white/20 text-ivory/80 hover:border-champagne/50 hover:text-ivory"}`}
                  >
                    No
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setBillsIncludedInRent(true)}
                    className={`rounded-[2rem] ${billsIncludedInRent ? "bg-champagne text-obsidian hover:bg-champagne/90" : "border-white/20 text-ivory/80 hover:border-champagne/50 hover:text-ivory"}`}
                  >
                    Yes
                  </Button>
                </div>
                {!billsIncludedInRent && (
                  <p className="mt-3 text-xs text-ivory/50">Tenant pays bills separately.</p>
                )}
                {billsIncludedInRent && (
                  <div className="mt-4 space-y-3">
                    <p className="text-xs text-ivory/60">Select which bills are included and add monthly costs where relevant.</p>
                    <ul className="space-y-2">
                      {billItems.map((item, index) => (
                        <li key={item.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2">
                          <label className="flex flex-1 cursor-pointer items-center gap-2">
                            <input
                              type="checkbox"
                              checked={item.included}
                              onChange={(e) => {
                                setBillItems((prev) => {
                                  const next = [...prev];
                                  next[index] = { ...next[index], included: e.target.checked, cost: e.target.checked ? next[index].cost : "" };
                                  return next;
                                });
                              }}
                              className="h-4 w-4 rounded border-white/30 bg-white/5 text-champagne focus:ring-champagne/50"
                            />
                            <span className="text-sm text-ivory/80">{item.label}</span>
                          </label>
                          {item.included && (
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-ivory/50">£</span>
                              <input
                                type="number"
                                min={0}
                                step={0.01}
                                placeholder="0"
                                value={item.cost}
                                onChange={(e) => {
                                  const v = e.target.value;
                                  setBillItems((prev) => {
                                    const next = [...prev];
                                    next[index] = { ...next[index], cost: v };
                                    return next;
                                  });
                                }}
                                className="w-20 rounded-[2rem] border border-white/20 bg-white/5 px-2 py-1.5 text-sm text-ivory focus:border-champagne focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                              />
                              <span className="text-xs text-ivory/50">/mo</span>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
              <section className="rounded-[2rem] border border-white/[0.06] bg-white/5 p-6 backdrop-blur-sm">
                <h3 className="text-sm font-medium text-champagne">Accountability Layer (Compliance & Docs)</h3>
                <input
                  ref={complianceFileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,image/*"
                  className="sr-only"
                  aria-hidden
                  onChange={handleComplianceFileChange}
                />
                <div className="mt-4 space-y-4">
                  {(
                    [
                      { id: "epc" as const, label: "EPC (Energy Performance Certificate)" },
                      { id: "gasSafety" as const, label: "Gas Safety Certificate" },
                      { id: "eicr" as const, label: "EICR (Electrical Safety)" },
                    ] as const
                  ).map(({ id, label }) => {
                    const doc = complianceDocs[id];
                    const haveOne = "haveOne" in doc ? doc.haveOne : false;
                    const { provided, file } = doc;
                    const isEpc = id === "epc";
                    const epcRating = isEpc ? (complianceDocs.epc as { rating: string | null }).rating : null;
                    const openUpload = () => {
                      setComplianceUploadTarget(id);
                      complianceFileInputRef.current?.click();
                    };
                    const setHaveOne = (value: boolean) => {
                      setComplianceDocs((prev) => {
                        const current = prev[id];
                        const next = { ...prev, [id]: { ...current, haveOne: value, provided: value ? current.provided : false, file: value ? current.file : null } };
                        if (id === "epc" && !value) (next.epc as { rating: string | null }).rating = null;
                        return next;
                      });
                    };
                    const clearDoc = () => {
                      setComplianceDocs((prev) => {
                        const next = { ...prev };
                        if (id === "epc") {
                          next.epc = { haveOne: false, rating: null, provided: false, file: null };
                        } else {
                          next[id] = { haveOne: false, provided: false, file: null };
                        }
                        return next;
                      });
                    };
                    return (
                      <div key={id} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-sm text-ivory/80">{label}</span>
                          <div className="flex flex-wrap gap-2">
                            <span className="text-xs text-ivory/50">Have one?</span>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setHaveOne(false)}
                              className={`rounded-[2rem] ${!haveOne ? "bg-champagne text-obsidian hover:bg-champagne/90" : "border-white/20 text-ivory/80 hover:border-champagne/50"}`}
                            >
                              No
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setHaveOne(true)}
                              className={`rounded-[2rem] ${haveOne ? "bg-champagne text-obsidian hover:bg-champagne/90" : "border-white/20 text-ivory/80 hover:border-champagne/50"}`}
                            >
                              Yes
                            </Button>
                          </div>
                        </div>
                        {haveOne && (
                          <div className="mt-3 space-y-2 border-t border-white/[0.06] pt-3">
                            {isEpc && (
                              <div>
                                <label className="mb-1 block text-xs text-ivory/60">EPC rating</label>
                                <select
                                  value={epcRating ?? ""}
                                  onChange={(e) =>
                                    setComplianceDocs((prev) => ({
                                      ...prev,
                                      epc: { ...prev.epc, rating: e.target.value || null },
                                    }))
                                  }
                                  className="w-full max-w-[8rem] rounded-[2rem] border border-white/20 bg-white/5 px-3 py-2 text-sm text-ivory focus:border-champagne focus:outline-none"
                                >
                                  <option value="">Select</option>
                                  {EPC_RATINGS.map((r) => (
                                    <option key={r} value={r}>
                                      {r}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}
                            <div className="flex flex-wrap items-center gap-2">
                              {provided ? (
                                <>
                                  <span className="text-xs font-medium text-emerald-400">Document provided</span>
                                  <span className="text-[10px] text-ivory/50">Pending verification</span>
                                  {file && (
                                    <button type="button" onClick={() => { const url = URL.createObjectURL(file); window.open(url, "_blank", "noopener,noreferrer"); setTimeout(() => URL.revokeObjectURL(url), 60000); }} className="text-[10px] text-champagne underline hover:text-champagne/80">
                                      View
                                    </button>
                                  )}
                                  <button type="button" onClick={openUpload} className="text-[10px] text-champagne underline hover:text-champagne/80">
                                    Change
                                  </button>
                                  <button type="button" onClick={clearDoc} className="text-[10px] text-red-400/90 underline hover:text-red-400">
                                    Delete
                                  </button>
                                </>
                              ) : (
                                <button
                                  type="button"
                                  onClick={openUpload}
                                  className="text-xs text-champagne underline underline-offset-2 hover:text-champagne/80"
                                >
                                  Upload document
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
              <section data-section="desired-monthly-rent" className="rounded-[2rem] border border-white/[0.06] bg-white/5 p-6 backdrop-blur-sm">
                <h3 className="text-sm font-medium text-champagne">Desired monthly rent</h3>
                <p className="mt-1 text-xs text-ivory/50">We use the data you’ve provided (property, bills, compliance) to help assess market rent.</p>
                <div className="mt-4">
                  <label className="mb-1 block text-xs text-ivory/60">Monthly rent</label>
                  <OnboardingInput
                    placeholder="£ 0.00"
                    value={desiredMonthlyRent}
                    onChange={(e) => setDesiredMonthlyRent(e.target.value)}
                  />
                  {(() => {
                    const addressDone = fullAddress.trim().length > 0;
                    const typeDone = propertyType !== null;
                    const sharingDone = sharingOrWhole !== null;
                    const dateDone =
                      availabilityMode === "available_now" ||
                      availabilityMode === "already_tenanted" ||
                      (availabilityMode === "available_from" && availableFromDate.length > 0);
                    const rentFilled = desiredMonthlyRent.trim().length > 0;
                    const dataPoints = [addressDone, typeDone, sharingDone, dateDone, billsIncludedInRent, complianceDocs.epc.haveOne || complianceDocs.gasSafety.haveOne || complianceDocs.eicr.haveOne];
                    const completed = dataPoints.filter(Boolean).length;
                    const atLeastHalf = completed >= 3;
                    const showEstimate = rentFilled && atLeastHalf;
                    const needMoreData = rentFilled && !atLeastHalf;
                    const estimatedRent = "£1,450"; // Placeholder: factor in bills + EPC/compliance when engine is built
                    if (showEstimate) {
                      return (
                        <p className="mt-3 text-xs text-ivory/70">
                          Our engine estimates a market rental rate of <span className="font-medium text-champagne">{estimatedRent}</span> in your area given the property characteristics, bills and compliance provided.
                        </p>
                      );
                    }
                    if (needMoreData) {
                      return (
                        <p className="mt-3 text-xs text-ivory/60">
                          Add more property details (address, type, availability), bills included, and compliance (EPC, Gas Safety, EICR) above so we can provide an estimated market rental rate.
                        </p>
                      );
                    }
                    return null;
                  })()}
                </div>
              </section>
              <section className="rounded-[2rem] border border-dashed border-white/20 bg-white/5 p-8 text-center">
                <p className="text-sm text-ivory/60">Drag & drop your property photos here</p>
                <input
                  ref={propertyPhotosInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  multiple
                  className="sr-only"
                  aria-hidden
                  onChange={handlePropertyPhotosChange}
                />
                <button
                  type="button"
                  onClick={() => propertyPhotosInputRef.current?.click()}
                  className="mt-2 text-sm font-medium text-champagne underline underline-offset-4 hover:text-champagne/80"
                >
                  Or browse files
                </button>
                {propertyPhotoFiles.length > 0 && (
                  <p className="mt-2 text-xs text-ivory/50">{propertyPhotoFiles.length} photo{propertyPhotoFiles.length !== 1 ? "s" : ""} selected</p>
                )}
              </section>
              <Button
                variant="outline"
                className="w-full rounded-[2rem] border-white/20 text-ivory/80 hover:border-champagne/50"
                onClick={handleSaveAndAddAnother}
              >
                Save and add another property to your portfolio
              </Button>
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
              Connect your account for automated rent collection and instant payouts. With our partner connection we don&apos;t store your banking details. If you add manual details instead, we store them securely and only share them once a tenancy agreement has been initiated.
            </p>

            {/* Glass Vault: API-first bank connection (same pattern as dashboard financials) */}
            <div className="relative mt-8 min-h-[280px] rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
              <div ref={bankInitialRef} className={bankConnected ? "pointer-events-none absolute inset-0 rounded-[2.5rem] p-6 sm:p-8" : ""}>
                <h2 className="font-bold tracking-tight text-ivory" style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
                  Secure Bank Integration
                </h2>
                <p className="mt-2 font-display-italic text-lg text-ivory/70">Automated Financial Intelligence.</p>
                <div className="mt-8 flex flex-col items-center">
                  <div className="relative">
                    {bankLoading && (
                      <span
                        className="absolute inset-0 animate-ping rounded-[2rem] opacity-40"
                        style={{ backgroundColor: "#C9A84C", animationDuration: "1.2s" }}
                      />
                    )}
                    <Button
                      size="lg"
                      disabled={bankLoading}
                      onClick={handleBankLink}
                      className="relative rounded-[2rem] bg-champagne px-8 py-6 text-base font-semibold text-obsidian shadow-lg transition-all hover:bg-champagne/90 disabled:opacity-90"
                      style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
                    >
                      {bankLoading ? "Connecting…" : "Connect Bank"}
                    </Button>
                  </div>
                </div>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-6 border-t border-white/10 pt-6">
                  <span className="flex items-center gap-2 text-xs text-ivory/50">
                    <ShieldCheck className="h-4 w-4" /> Authorised partners
                  </span>
                  <span className="flex items-center gap-2 text-xs text-ivory/50">
                    <Lock className="h-4 w-4" /> AES-256
                  </span>
                  <span className="flex items-center gap-2 text-xs text-ivory/50">
                    <Globe className="h-4 w-4" /> Third-party APIs
                  </span>
                </div>
              </div>

              <div
                ref={bankVerifiedRef}
                className="absolute inset-0 z-10 rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl sm:p-8"
                style={{ opacity: 0 }}
              >
                <div
                  className="rounded-2xl px-4 py-3 text-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(201,168,76,0.15) 0%, rgba(201,168,76,0.05) 100%)",
                    border: "1px solid rgba(201,168,76,0.25)",
                  }}
                >
                  <span className="text-sm font-medium text-champagne">Bank connected</span>
                  {bankTokenId && (
                    <p className="mt-1 font-mono text-xs text-ivory/70" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                      ID: {bankTokenId}
                    </p>
                  )}
                </div>
                <h3 className="mt-8 text-sm font-semibold text-ivory">Payment Automation Preferences</h3>
                <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-6">
                  <div
                    className={`flex flex-1 items-center justify-between rounded-2xl border px-4 py-3 transition-all ${
                      bankConnected ? "border-champagne/30 shadow-[0_0_20px_rgba(201,168,76,0.12)]" : "border-white/10"
                    }`}
                  >
                    <span className="text-sm text-ivory/80">Automated Rent Tracking</span>
                    <Switch checked={bankAutoRentTracking} onCheckedChange={setBankAutoRentTracking} className="data-[state=checked]:bg-champagne" />
                  </div>
                  <div
                    className={`flex flex-1 items-center justify-between rounded-2xl border px-4 py-3 transition-all ${
                      bankConnected ? "border-champagne/30 shadow-[0_0_20px_rgba(201,168,76,0.12)]" : "border-white/10"
                    }`}
                  >
                    <span className="text-sm text-ivory/80">Auto-generate Monthly Invoices</span>
                    <Switch checked={bankAutoInvoices} onCheckedChange={setBankAutoInvoices} className="data-[state=checked]:bg-champagne" />
                  </div>
                </div>
                <p className="mt-3 text-xs text-ivory/50">
                  Banking is connected through authorised third-party providers. We don&apos;t store your banking details.
                </p>
              </div>
            </div>

            <p className="mt-6 text-center">
              <button type="button" className="text-xs text-slate-500 hover:text-slate-400">
                Use manual details
              </button>
              <span className="mt-1 block text-xs text-ivory/40">Stored securely and only shared once a tenancy agreement has been initiated.</span>
            </p>

            <Button className="mt-8 w-full rounded-[2rem] bg-champagne text-obsidian hover:bg-champagne/90" size="lg" onClick={handleContinue}>
              {bankConnected ? "Continue" : "Continue to next step"}
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
