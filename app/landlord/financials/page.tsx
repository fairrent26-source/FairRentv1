"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ShieldCheck, Lock, Globe } from "lucide-react";
import { LUXE_IMAGES } from "@/lib/images";

/** Mock Plaid/TrueLayer Link: returns public_token. No bank details stored. */
function mockOpenBankLink(): Promise<{ public_token: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ public_token: `tl_${Math.random().toString(36).slice(2, 14)}` });
    }, 2200);
  });
}

export default function LandlordFinancialsPage() {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tokenId, setTokenId] = useState<string | null>(null);
  const [autoRentTracking, setAutoRentTracking] = useState(true);
  const [autoInvoices, setAutoInvoices] = useState(true);
  const initialRef = useRef<HTMLDivElement>(null);
  const verifiedRef = useRef<HTMLDivElement>(null);

  const handleBankLink = async () => {
    setLoading(true);
    try {
      const { public_token } = await mockOpenBankLink();
      setTokenId(public_token);
      setConnected(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!connected) return;
    const initial = initialRef.current;
    const verified = verifiedRef.current;
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
  }, [connected]);

  return (
    <div className={`relative min-h-[calc(100vh-8rem)] overflow-hidden rounded-[2rem] ${!connected ? "pb-24 md:pb-0" : ""}`}>
      {/* Full-bleed background: 15% opacity, radial mask → Obsidian at edges */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 75%)",
        }}
      >
        <img
          src={LUXE_IMAGES.financialVault}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-[0.15]"
        />
      </div>
      <div className="relative z-10 mx-auto max-w-2xl px-2 py-6 sm:px-4">
        {/* Glass Vault container */}
        <div className="relative min-h-[320px] rounded-[2.5rem] border border-ui-tags bg-bg-card p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
          {/* Initial state: Connect CTA */}
          <div ref={initialRef} className={connected ? "pointer-events-none absolute inset-0 rounded-[2.5rem] p-6 sm:p-8" : ""}>
            <h2 className="font-display font-bold uppercase tracking-display text-text-primary">
              Secure Bank Integration
            </h2>
            <p className="mt-2 font-accent italic text-lg text-text-muted">Automated Financial Intelligence.</p>
            <div className="mt-8 flex flex-col items-center">
              <div className="relative">
                {loading && (
                  <span
                    className="absolute inset-0 animate-ping rounded-[2rem] opacity-40"
                    style={{ backgroundColor: "#C9A84C", animationDuration: "1.2s" }}
                  />
                )}
                <Button
                  size="lg"
                  disabled={loading}
                  onClick={handleBankLink}
                  className="relative rounded-[2rem] bg-brand-teal px-8 py-6 text-base font-semibold text-text-primary shadow-lg transition-all hover:bg-accent-lime disabled:opacity-90"
                  style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
                >
                  {loading ? "Connecting…" : "Connect Bank"}
                </Button>
              </div>
            </div>
            {/* Security badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 border-t border-ui-tags pt-6">
              <span className="flex items-center gap-2 text-xs text-text-muted">
                <ShieldCheck className="h-4 w-4" /> Authorised partners
              </span>
              <span className="flex items-center gap-2 text-xs text-text-muted">
                <Lock className="h-4 w-4" /> AES-256
              </span>
              <span className="flex items-center gap-2 text-xs text-text-muted">
                <Globe className="h-4 w-4" /> Third-party APIs
              </span>
            </div>
          </div>

          {/* Verified state: badge + automation toggles (overlay after connect) */}
          <div
            ref={verifiedRef}
            className="absolute inset-0 z-10 rounded-[2.5rem] border border-ui-tags bg-bg-card p-6 backdrop-blur-2xl sm:p-8"
            style={{ opacity: 0 }}
          >
            <div
              className="rounded-2xl px-4 py-3 text-center"
              style={{
                background: "linear-gradient(135deg, rgba(0, 210, 211,0.15) 0%, rgba(0, 210, 211,0.05) 100%)",
                border: "1px solid rgba(0, 210, 211,0.25)",
              }}
            >
              <span className="text-sm font-display font-bold uppercase tracking-display text-brand-teal">Verified Landlord</span>
              {tokenId && (
                <p className="mt-1 font-mono text-xs text-text-muted" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                  ID: {tokenId}
                </p>
              )}
            </div>
            <h3 className="mt-8 text-sm font-semibold text-text-primary">Payment Automation Preferences</h3>
            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-6">
              <div
                className={`flex flex-1 items-center justify-between rounded-2xl border px-4 py-3 transition-all ${
                  connected ? "border-brand-teal/30 shadow-[0_0_20px_rgba(0, 210, 211,0.12)]" : "border-ui-tags"
                }`}
              >
                <span className="text-sm text-text-muted">Automated Rent Tracking</span>
                <Switch checked={autoRentTracking} onCheckedChange={setAutoRentTracking} className="data-[state=checked]:bg-brand-teal" />
              </div>
              <div
                className={`flex flex-1 items-center justify-between rounded-2xl border px-4 py-3 transition-all ${
                  connected ? "border-brand-teal/30 shadow-[0_0_20px_rgba(0, 210, 211,0.12)]" : "border-ui-tags"
                }`}
              >
                <span className="text-sm text-text-muted">Auto-generate Monthly Invoices</span>
                <Switch checked={autoInvoices} onCheckedChange={setAutoInvoices} className="data-[state=checked]:bg-brand-teal" />
              </div>
            </div>
            <p className="mt-3 text-xs text-text-muted">
              Banking is connected through authorised third-party providers. We don&apos;t store your banking details.
            </p>
          </div>
        </div>

        {/* Manual fallback: small, dimmed */}
        <p className="mt-6 text-center">
          <a href="#" className="text-xs text-slate-500 hover:text-text-primary">
            Use manual details
          </a>
          <span className="mt-1 block text-xs text-text-primary/40">Stored securely and only shared once a tenancy agreement has been initiated.</span>
        </p>
      </div>

      {/* Mobile only: sticky Connect button when not connected */}
      {!connected && (
        <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-ui-tags bg-bg-main/80 p-4 backdrop-blur-xl md:hidden">
          <div className="mx-auto max-w-2xl">
            <Button
              size="lg"
              disabled={loading}
              onClick={handleBankLink}
              className="w-full rounded-[2rem] bg-brand-teal py-6 text-base font-semibold text-text-primary hover:bg-accent-lime"
            >
              {loading ? "Connecting…" : "Connect Bank"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
