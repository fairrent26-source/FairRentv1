"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore, type AuthRole } from "@/store/auth-store";
import { LUXE_IMAGES } from "@/lib/images";

export default function AuthPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [role, setRole] = useState<AuthRole>("tenant");
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(role, isRegister);
    if (isRegister) {
      router.push(role === "tenant" ? "/onboarding/tenant" : "/onboarding/landlord");
    } else {
      router.push(role === "tenant" ? "/tenant" : "/landlord");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-obsidian lg:flex-row">
      {/* Go back home — top left, always visible */}
      <Link
        href="/"
        className="fixed left-4 top-4 z-50 flex items-center gap-2 rounded-xl border border-white/10 bg-obsidian/80 px-3 py-2 text-sm font-medium text-ivory/90 backdrop-blur-sm transition-colors hover:border-champagne/40 hover:bg-obsidian/90 hover:text-ivory"
      >
        <span aria-hidden>←</span>
        Back to home
      </Link>

      {/* Brand panel: image blends into auth box via bottom gradient */}
      <div className="relative flex min-h-[220px] flex-1 shrink-0 overflow-hidden lg:min-h-screen lg:items-center lg:justify-center">
        <img
          src={LUXE_IMAGES.authPanel}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-obsidian/50" aria-hidden />
        {/* Gradient at bottom so image blends into auth box (obsidian) */}
        <div
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-obsidian to-transparent lg:h-40"
          aria-hidden
        />
        <div className="relative z-10 flex w-full flex-col items-center justify-center px-6 py-10 lg:p-12">
          <p className="text-center text-2xl font-bold tracking-tight text-ivory" style={{ letterSpacing: "-0.02em" }}>
            Stop guessing. <span className="font-display italic text-champagne">Start scoring.</span>
          </p>
        </div>
      </div>
      {/* Auth box: same bg as gradient target so image blends into it */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-[420px] lg:border-l lg:border-slate-luxe/50 lg:bg-obsidian">
        <Link href="/" className="mb-8 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-luxe/50 bg-slate-luxe/60">
            <span className="text-base font-medium text-champagne">✓</span>
          </div>
          <span className="font-bold tracking-tight text-ivory" style={{ letterSpacing: "-0.02em" }}>FairRent</span>
        </Link>

        <div className="mb-6 flex rounded-2xl border border-slate-luxe/50 bg-slate-luxe/30 p-1">
          <button
            type="button"
            onClick={() => setRole("tenant")}
            className={`flex-1 rounded-xl py-2.5 text-sm font-medium transition-colors ${
              role === "tenant"
                ? "bg-champagne text-obsidian"
                : "text-ivory/70 hover:text-ivory"
            }`}
          >
            I am a Tenant
          </button>
          <button
            type="button"
            onClick={() => setRole("landlord")}
            className={`flex-1 rounded-xl py-2.5 text-sm font-medium transition-colors ${
              role === "landlord"
                ? "bg-champagne text-obsidian"
                : "text-ivory/70 hover:text-ivory"
            }`}
          >
            I am a Landlord
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="sm" className="flex-1">
              G Continue with Google
            </Button>
          </div>
          <Button type="button" variant="outline" size="sm" className="w-full">
            Continue with Apple
          </Button>
          <Button type="button" variant="outline" size="sm" className="w-full">
            Continue with Facebook
          </Button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-luxe/50" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-obsidian px-2 text-ivory/50">or use email</span>
            </div>
          </div>

          <div>
            <label htmlFor="auth-email" className="mb-1 block text-sm font-medium text-ivory/70">
              Email Address
            </label>
            <Input
              id="auth-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="auth-password" className="mb-1 block text-sm font-medium text-ivory/70">
              Password
            </label>
            <Input
              id="auth-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" className="w-full">
            {isRegister ? "Create account" : "Sign In"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-ivory/70">
          {isRegister ? (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className="text-champagne hover:underline"
              >
                Sign in
              </button>
            </>
          ) : (
            <>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className="text-champagne hover:underline"
              >
                Create one here
              </button>
            </>
          )}
        </p>

        <p className="mt-8 flex items-center gap-2 text-xs text-ivory/50">
          <span>🔒</span>
          FairRent uses bank-level encryption. Your data is used only for verification.
        </p>
      </div>
    </div>
  );
}
