"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore, type AuthRole } from "@/store/auth-store";

interface AuthGuardProps {
  role: AuthRole;
  children: React.ReactNode;
}

export function AuthGuard({ role, children }: AuthGuardProps) {
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
      router.replace(currentRole === "landlord" ? "/landlord" : "/tenant");
      return;
    }
    if (!onboardingComplete) {
      router.replace(role === "tenant" ? "/onboarding/tenant" : "/onboarding/landlord");
    }
  }, [hydrated, role, router]);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <p className="text-slate-400">Loading…</p>
      </div>
    );
  }

  const { isLoggedIn, role: currentRole, onboardingComplete } = useAuthStore.getState();
  if (!isLoggedIn || currentRole !== role || !onboardingComplete) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <p className="text-slate-400">Redirecting…</p>
      </div>
    );
  }

  return <>{children}</>;
}
