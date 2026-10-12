import { Fraunces } from "next/font/google";
import {
  Award,
  Building2,
  FileCheck,
  MessageCircle,
  Search,
  Send,
  UserPlus,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const stepScript = Fraunces({
  subsets: ["latin"],
  style: "italic",
  weight: "600",
  display: "swap",
});
import { JoinEarlyAccessButton } from "@/components/atmosphere/WaitlistCta";
import { LANDING_SECTIONS } from "@/lib/landing-sections";
import { formatGbp, landingFeeSnapshot, roundToSigFigs } from "@/lib/landing-financials";

type FlywheelStep = {
  title: string;
  blurb: string;
  icon: LucideIcon;
};

const LANDLORD_STEPS: FlywheelStep[] = [
  { title: "Sign up", icon: UserPlus, blurb: "Open an account, tell us your details and your landlord preferences." },
  { title: "List homes", icon: Building2, blurb: "Upload your properties in a matter of minutes." },
  { title: "Match & view", icon: Users, blurb: "Once your details are verified you will receive a curated list of tenants who match your requirements." },
  { title: "Sign tenancy", icon: FileCheck, blurb: "Invite matched tenants for viewings and enter into a let when you are ready." },
  { title: "Manage in-app", icon: Wrench, blurb: "Chat with tenants, manage repairs and invoices within the app. We'll update you on any statutory requirements too." },
  { title: "Score & save", icon: Award, blurb: "Lower fees, higher-quality tenants and a score that compounds." },
];

const TENANT_STEPS: FlywheelStep[] = [
  { title: "Sign up", icon: UserPlus, blurb: "Create a profile, tell us a bit about your tenant history and what type of property you are looking for." },
  { title: "View homes", icon: Search, blurb: "Browse the marketplace for properties available in your target area." },
  { title: "Share profile", icon: Send, blurb: "Push your profile to landlords and receive priority access to book a viewing." },
  { title: "Sign tenancy", icon: FileCheck, blurb: "Sign when you are ready to move in." },
  { title: "Log issues", icon: MessageCircle, blurb: "Raise repairs in the app and see how quickly they are resolved. Landlords are incentivised to act fast." },
  { title: "Score travels", icon: Award, blurb: "When you move on, your record follows you to your next match." },
];

const FLYWHEEL = {
  vbW: 720,
  vbH: 380,
  cx: 360,
  cy: 190,
  rx: 148,
  ry: 92,
} as const;

const ARROW = "#FFFFFF";

function ellipsePoint(index: number, count: number, radiusScale = 1) {
  const angle = (index / count) * 2 * Math.PI - Math.PI / 2;
  return {
    x: FLYWHEEL.cx + FLYWHEEL.rx * radiusScale * Math.cos(angle),
    y: FLYWHEEL.cy + FLYWHEEL.ry * radiusScale * Math.sin(angle),
    angle,
  };
}

function StepCopy({
  title,
  blurb,
  align,
}: {
  title: string;
  blurb: string;
  align: "left" | "right" | "center";
}) {
  return (
    <div
      className={
        align === "left" ? "text-right" : align === "right" ? "text-left" : "text-center"
      }
    >
      <p className="font-display text-xs font-bold uppercase tracking-display text-white md:text-sm">
        {title}
      </p>
      <p
        className={`${stepScript.className} mt-1 text-xs italic font-semibold leading-snug text-white md:text-sm`}
      >
        {blurb}
      </p>
    </div>
  );
}

function StepIcon({
  icon: Icon,
  n,
}: {
  icon: LucideIcon;
  n: number;
}) {
  return (
    <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
      <span className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-text-primary font-display text-xs font-bold leading-none text-white ring-2 ring-white">
        {n}
      </span>
      <Icon className="h-6 w-6 text-text-primary" strokeWidth={2.1} />
    </span>
  );
}

function Flywheel({
  role,
  steps,
}: {
  role: string;
  steps: readonly FlywheelStep[];
}) {
  const count = steps.length;
  const markerId = `flywheel-arrow-${role.toLowerCase()}`;

  return (
    <article className="w-full rounded-3xl border border-white/25 bg-brand-teal p-6 pb-10 shadow-card md:px-12 md:pb-12 md:pt-8 lg:px-14">
      <p className="text-center font-display font-bold text-lg uppercase tracking-display text-white md:text-xl">
        {role}
      </p>
      <ol className="sr-only">
        {steps.map((step, i) => (
          <li key={step.title}>
            Step {i + 1}: {step.title}. {step.blurb}
          </li>
        ))}
      </ol>

      <ol className="mt-4 flex flex-col gap-0 sm:hidden">
        {steps.map((step, i) => (
          <li key={step.title} className="relative flex gap-3 pb-6 last:pb-0">
            {i < steps.length - 1 ? (
              <span
                className="absolute left-6 top-12 h-[calc(100%-1.5rem)] w-px bg-white/45"
                aria-hidden
              />
            ) : null}
            <StepIcon icon={step.icon} n={i + 1} />
            <StepCopy title={step.title} blurb={step.blurb} align="right" />
          </li>
        ))}
      </ol>

      <div className="relative mx-auto mt-14 hidden h-[26rem] w-full overflow-visible px-6 pb-8 sm:block md:mt-16 md:px-10 md:pb-10 lg:h-[28rem] lg:px-12">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 ${FLYWHEEL.vbW} ${FLYWHEEL.vbH}`}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <defs>
            <marker
              id={markerId}
              markerWidth="14"
              markerHeight="14"
              refX="10"
              refY="7"
              orient="auto"
              markerUnits="userSpaceOnUse"
            >
              <path d="M1 1.4 L13 7 L1 12.6 Z" fill={ARROW} />
            </marker>
          </defs>
          {steps.map((_, i) => {
            const start = ellipsePoint(i + 0.16, count, 0.58);
            const end = ellipsePoint(i + 0.84, count, 0.58);
            const d = `M ${start.x} ${start.y} A ${FLYWHEEL.rx * 0.58} ${FLYWHEEL.ry * 0.58} 0 0 1 ${end.x} ${end.y}`;
            return (
              <path
                key={`arc-${i}`}
                d={d}
                fill="none"
                stroke={ARROW}
                strokeWidth="2.6"
                strokeLinecap="round"
                markerEnd={`url(#${markerId})`}
              />
            );
          })}
        </svg>
        {steps.map((step, i) => {
          const iconPoint = ellipsePoint(i, count, 1);
          const { angle } = iconPoint;
          const side: "left" | "right" | "center" =
            Math.cos(angle) > 0.35 ? "right" : Math.cos(angle) < -0.35 ? "left" : "center";
          const isTop = Math.sin(angle) < -0.5;
          const sideNudge = side === "center" ? 0 : Math.sin(angle) < 0 ? -26 : 16;
          const iconY = iconPoint.y + sideNudge;
          const labelX = iconPoint.x + Math.cos(angle) * (side === "center" ? 0 : 78);
          const labelY = iconY + (side === "center" ? (isTop ? -52 : 52) : 0);
          const transform =
            side === "left"
              ? "translate(-100%, -50%)"
              : side === "right"
                ? "translate(0, -50%)"
                : isTop
                  ? "translate(-50%, -100%)"
                  : "translate(-50%, 0)";
          return (
            <div key={step.title}>
              <div
                className="absolute"
                style={{
                  left: `${(iconPoint.x / FLYWHEEL.vbW) * 100}%`,
                  top: `${(iconY / FLYWHEEL.vbH) * 100}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <StepIcon icon={step.icon} n={i + 1} />
              </div>
              <div
                className={`absolute ${side === "center" ? "w-[13.5rem]" : "w-[10.5rem]"}`}
                style={{
                  left: `${(labelX / FLYWHEEL.vbW) * 100}%`,
                  top: `${(labelY / FLYWHEEL.vbH) * 100}%`,
                  transform,
                }}
              >
                <StepCopy title={step.title} blurb={step.blurb} align={side} />
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}

function AudienceCallout({
  eyebrow,
  headline,
  accent,
  support,
  note,
}: {
  eyebrow: string;
  headline: string;
  accent?: string;
  support: string;
  note?: string;
}) {
  return (
    <article className="rounded-3xl bg-bg-card p-5 md:p-6">
      <p className="font-display font-bold text-sm uppercase tracking-display text-brand-teal">{eyebrow}</p>
      <p className="mt-3 font-display font-bold text-3xl uppercase tracking-display leading-tight text-brand-teal md:text-4xl">
        {headline}
      </p>
      {accent ? (
        <p className="mt-1 font-accent text-2xl italic leading-snug text-text-primary md:text-3xl">{accent}</p>
      ) : null}
      <p className="mt-2 font-body text-sm font-semibold leading-snug text-text-primary md:text-base">{support}</p>
      {note ? <p className="mt-4 font-body text-sm leading-relaxed text-text-muted">{note}</p> : null}
    </article>
  );
}

function ExclusiveAccessCard({ forRenters }: { forRenters: boolean }) {
  return (
    <article className="flex flex-col justify-between rounded-3xl border border-brand-teal/25 bg-bg-card p-5 md:p-6">
      <div>
        <p className="font-display font-bold text-sm uppercase tracking-display text-text-primary">Exclusive access</p>
        <p className="mt-2 font-accent text-lg italic text-text-primary">
          {forRenters ? "FairRent is free for renters." : "Free three-month trial on launch."}
        </p>
        <p className="mt-3 font-body text-sm leading-relaxed text-text-muted">
          {forRenters
            ? "Join the waitlist now. We'll tell you when we go live."
            : "Join the waitlist now. When we go live, early members get the first three months free."}
        </p>
      </div>
      <div className="mt-5">
        <JoinEarlyAccessButton className="w-full">Join</JoinEarlyAccessButton>
      </div>
    </article>
  );
}

export function LandingFlywheel({ audience }: { audience: "landlord" | "tenant" }) {
  const fees = landingFeeSnapshot(1);
  const savingApprox = formatGbp(roundToSigFigs(fees.estimatedSaving, 2));
  const savingPercentApprox = Math.round(fees.savingPercent / 10) * 10;
  const isLandlord = audience === "landlord";

  return (
    <section
      id={LANDING_SECTIONS.journey}
      className="scroll-mt-24"
      aria-label={isLandlord ? "Landlord journey" : "Tenant journey"}
    >
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {isLandlord ? (
              <AudienceCallout
                eyebrow="For landlords"
                headline={`${savingPercentApprox}% less`}
                support="than a typical high-street lettings agent fee."
                note={`About ${savingApprox} a year on one home, at 2% on rental income per month.`}
              />
            ) : (
              <AudienceCallout
                eyebrow="For renters"
                headline="Rent from"
                accent="top-rated"
                support="reliable and responsive landlords."
              />
            )}
            <ExclusiveAccessCard forRenters={!isLandlord} />
          </div>
          <Flywheel
            role={isLandlord ? "Landlord" : "Tenant"}
            steps={isLandlord ? LANDLORD_STEPS : TENANT_STEPS}
          />
        </div>
    </section>
  );
}
