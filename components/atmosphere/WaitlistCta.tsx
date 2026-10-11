"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type FormEvent, type MouseEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LANDING_SECTIONS } from "@/lib/landing-sections";
import { cn } from "@/lib/utils";

export type WaitlistRole = "tenant" | "landlord";

function waitlistHref(pathname: string) {
  if (pathname === "/" || pathname.startsWith("/for-")) {
    return `${pathname === "/" ? "" : pathname}#${LANDING_SECTIONS.waitlist}`;
  }
  return `/#${LANDING_SECTIONS.waitlist}`;
}

export function JoinEarlyAccessButton({
  children = "Join early access",
  size = "lg",
  className,
}: {
  children?: ReactNode;
  size?: "sm" | "lg" | "default";
  className?: string;
}) {
  const pathname = usePathname();
  const href = waitlistHref(pathname);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = document.getElementById(LANDING_SECTIONS.waitlist);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", href);
  };

  return (
    <Button asChild size={size} className={className}>
      <Link href={href} onClick={handleClick} aria-label="Join early access">
        {children}
      </Link>
    </Button>
  );
}

export function WaitlistCta({ defaultRole = "tenant" }: { defaultRole?: WaitlistRole }) {
  const [role, setRole] = useState<WaitlistRole>(defaultRole);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section
      id={LANDING_SECTIONS.waitlist}
      aria-labelledby="waitlist-heading"
      className="relative scroll-mt-24 px-6 pb-24 pt-16 md:pb-32 md:pt-20"
      data-entrance
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-4 font-display font-bold text-sm uppercase tracking-display text-brand-teal md:text-base">
          Early access
        </p>
        <h2
          id="waitlist-heading"
          className="font-display font-bold text-3xl uppercase tracking-display text-text-primary md:text-5xl"
        >
          {role === "tenant"
            ? "Join the waitlist for early access"
            : "Unlock 3 months free when you sign up for early access"}
        </h2>
        <p className="mt-4 font-accent text-xl italic text-brand-teal md:text-2xl">
          Jump on the waitlist and we&apos;ll keep you posted on launch.
        </p>

        {submitted ? (
          <div className="mt-10 rounded-2xl border border-brand-teal/30 bg-bg-card px-6 py-10 shadow-card">
            <p className="font-display font-bold text-lg uppercase tracking-display text-text-primary">You&apos;re on the list.</p>
            <p className="mt-2 font-body text-sm text-text-muted">
              We&apos;ll email {email} when FairRent opens. Keep an eye on your inbox.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-10 rounded-2xl border border-ui-tags bg-bg-card p-4 text-left shadow-card sm:p-5"
          >
            <div className="mb-4 flex rounded-xl border border-ui-tags bg-bg-main p-1">
              {(["tenant", "landlord"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setRole(option)}
                  className={cn(
                    "flex-1 rounded-lg py-2 text-xs font-medium uppercase tracking-wide transition-colors sm:text-sm",
                    role === option
                      ? option === "tenant"
                        ? "bg-accent-lime text-text-primary"
                        : "bg-brand-teal text-text-primary"
                      : "text-text-muted hover:text-text-primary"
                  )}
                >
                  {option === "tenant" ? "I rent" : "I let"}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                required
                autoComplete="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
                className="h-12 flex-1 rounded-xl bg-bg-main"
              />
              <Button type="submit" size="lg" className="h-12 shrink-0 rounded-xl px-6 sm:w-auto">
                Join the waitlist
              </Button>
            </div>
            <p className="mt-3 text-center text-xs text-text-muted sm:text-left">
              No spam. One email when we&apos;re ready for you.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
