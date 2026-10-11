"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore, type AuthRole } from "@/store/auth-store";

interface OnboardingGuardProps {
  role: AuthRole;
  children: React.ReactNode;
}

export function OnboardingGuard({ role, children }: OnboardingGuardProps) {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const rehydrate = useAuthStore((s) => s.rehydrate);

  useEffect(() => {
    rehydrate();
    setHydrated(true);
  }, [rehydrate]);

  useEffect(() => {
    if (!hydrated) return;
    const { isLoggedIn, role: currentRole, onboardingComplete } = useAuthStore.getState();
    if (!isLoggedIn) {
      router.replace("/auth");
      return;
    }
    if (currentRole !== role) {
      router.replace(role === "landlord" ? "/onboarding/landlord" : "/onboarding/tenant");
      return;
    }
    if (onboardingComplete) {
      router.replace(role === "landlord" ? "/landlord" : "/tenant");
    }
  }, [hydrated, role, router]);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <p className="text-text-muted">Loading…</p>
      </div>
    );
  }

  const { isLoggedIn, role: currentRole, onboardingComplete } = useAuthStore.getState();
  if (!isLoggedIn || currentRole !== role || onboardingComplete) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <p className="text-text-muted">Redirecting…</p>
      </div>
    );
  }

  return <>{children}</>;
}
