import {
  Building2,
  Gauge,
  Home,
  LayoutDashboard,
  MessageSquare,
  Sparkles,
  Store,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { JoinEarlyAccessButton } from "@/components/atmosphere/WaitlistCta";
import { LUXE_IMAGES } from "@/lib/images";
import { cn } from "@/lib/utils";

type PhoneTab = {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
};

const TENANT_TABS: readonly PhoneTab[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "market", label: "Marketplace", icon: Store },
  { id: "score", label: "Score", icon: Gauge },
  { id: "chat", label: "Chat", icon: MessageSquare, badge: 1 },
];

const LANDLORD_TABS: readonly PhoneTab[] = [
  { id: "home", label: "Home", icon: LayoutDashboard },
  { id: "units", label: "Units", icon: Building2 },
  { id: "chats", label: "Chats", icon: MessageSquare },
  { id: "jobs", label: "Jobs", icon: Wrench },
];

const REPAIR_PHOTO =
  "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&q=70";

function PhoneTabBar({
  items,
  active,
}: {
  items: readonly PhoneTab[];
  active: string;
}) {
  return (
    <nav className="flex border-t border-ui-tags bg-bg-card px-0.5 pb-1.5 pt-1" aria-hidden>
      {items.map((item) => {
        const Icon = item.icon;
        const on = item.id === active;
        return (
          <div
            key={item.id}
            className={cn(
              "flex flex-1 flex-col items-center gap-0.5",
              on ? "text-brand-teal" : "text-text-muted"
            )}
          >
            <span className="relative">
              <Icon className="h-2.5 w-2.5" strokeWidth={2.25} />
              {item.badge ? (
                <span className="absolute -right-1.5 -top-1 flex h-2.5 min-w-2.5 items-center justify-center rounded-full bg-alert-watermelon px-0.5 text-[5px] font-bold leading-none text-white">
                  {item.badge}
                </span>
              ) : null}
            </span>
            <span className="max-w-full truncate px-0.5 text-center text-[5px] font-medium leading-none">
              {item.label}
            </span>
          </div>
        );
      })}
    </nav>
  );
}

function PhoneFrame({
  title,
  tabs,
  activeTab,
  children,
}: {
  title: string;
  tabs: readonly PhoneTab[];
  activeTab: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="flex w-[148px] shrink-0 flex-col items-center gap-2.5" data-landing-card>
      <div className="flex w-full flex-col overflow-hidden rounded-[1.35rem] border-[5px] border-zinc-800 bg-bg-card shadow-[0_12px_28px_rgba(0,0,0,0.35)]">
        <div className="flex h-4 shrink-0 items-center justify-center bg-bg-card">
          <div className="h-1.5 w-10 rounded-full bg-ui-tags" />
        </div>
        <div className="flex h-[216px] flex-col overflow-hidden px-2 pb-1.5 pt-0.5">{children}</div>
        <PhoneTabBar items={tabs} active={activeTab} />
      </div>
      <figcaption className="text-center font-body text-[10px] leading-snug text-text-primary/80">
        {title}
      </figcaption>
    </figure>
  );
}

function RolePreviewGroup({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("rounded-3xl px-4 py-5 md:px-5 md:py-6", className)}>
      <p className="mb-4 text-center font-display font-bold text-sm uppercase tracking-display text-text-primary md:text-base">
        {title}
      </p>
      <div className="overflow-hidden md:hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max motion-reduce:animate-none animate-marquee hover:[animation-play-state:paused]">
          <div className="flex shrink-0 gap-4 pr-4">{children}</div>
          <div className="flex shrink-0 gap-4 pr-4" aria-hidden>
            {children}
          </div>
        </div>
      </div>
      <div className="hidden justify-center gap-5 md:flex">{children}</div>
    </div>
  );
}

const PROFIT_MONTHS = [
  { label: "J", rent: 78, opex: 30 },
  { label: "F", rent: 80, opex: 32 },
  { label: "M", rent: 74, opex: 34 },
  { label: "A", rent: 86, opex: 31 },
  { label: "M", rent: 82, opex: 29 },
  { label: "J", rent: 88, opex: 33 },
] as const;

function OccupancyDonut() {
  const pct = 75;
  const r = 42;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - pct / 100);
  return (
    <div className="relative mx-auto h-9 w-9">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden>
        <circle cx="50" cy="50" r={r} fill="none" stroke="#E5E7EB" strokeWidth="10" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="#00D2D3"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[10px] font-bold tabular-nums leading-none text-text-primary">75%</span>
        <span className="text-[6px] leading-none text-text-muted">let</span>
      </div>
    </div>
  );
}

function ProfitBars() {
  const max = Math.max(...PROFIT_MONTHS.map((m) => m.rent));
  return (
    <div>
      <div className="flex h-9 items-end justify-between gap-0.5">
        {PROFIT_MONTHS.map((m) => {
          const rentH = (m.rent / max) * 100;
          const opexH = (m.opex / max) * 100;
          const netH = rentH - opexH;
          return (
            <div key={m.label} className="flex flex-1 flex-col items-center gap-0.5">
              <div className="flex h-7 w-full flex-col justify-end overflow-hidden rounded-[2px]">
                <div className="w-full bg-brand-teal" style={{ height: `${netH}%` }} />
                <div className="w-full bg-alert-watermelon/80" style={{ height: `${opexH}%` }} />
              </div>
              <span className="text-[6px] text-text-muted">{m.label}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-1 flex justify-center gap-2 text-[6px] text-text-muted">
        <span className="flex items-center gap-0.5">
          <span className="h-1 w-1 rounded-sm bg-brand-teal" /> Net
        </span>
        <span className="flex items-center gap-0.5">
          <span className="h-1 w-1 rounded-sm bg-alert-watermelon/80" /> Opex
        </span>
      </div>
    </div>
  );
}

function ScoreRing() {
  return (
    <div className="relative mx-auto h-10 w-10">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden>
        <circle cx="50" cy="50" r="42" fill="none" stroke="#E5E7EB" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="#00D2D3"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray="264"
          strokeDashoffset="58"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[11px] font-bold tabular-nums leading-none text-text-primary">3.8</span>
        <span className="text-[6px] text-text-muted">/ 5.0</span>
      </div>
    </div>
  );
}

function TenantPhones() {
  return (
    <RolePreviewGroup title="Tenant" className="bg-brand-teal/25">
        <PhoneFrame
          title="Your tenancy: the home you rent, repairs, and Auto-Pay."
          tabs={TENANT_TABS}
          activeTab="home"
        >
          <p className="font-display font-bold text-[8px] uppercase tracking-display text-text-primary">
            My tenancy
          </p>
          <button
            type="button"
            tabIndex={-1}
            className="mt-1 flex w-full items-center gap-1.5 rounded-lg border border-ui-tags bg-bg-main p-1 text-left"
          >
            <img
              src={LUXE_IMAGES.living}
              alt=""
              className="h-9 w-9 shrink-0 rounded-md object-cover"
            />
            <span className="min-w-0">
              <span className="block truncate text-[7px] font-semibold leading-tight text-text-primary">
                Garden flat
              </span>
              <span className="block truncate text-[6px] leading-tight text-text-muted">
                N1 · until Jun 27
              </span>
              <span className="block text-[5px] font-medium text-brand-teal">Active let</span>
            </span>
          </button>
          <div className="mt-1 rounded-lg border border-ui-tags bg-bg-main px-1.5 py-1">
            <p className="text-[6px] font-medium uppercase tracking-wide text-text-muted">Rent</p>
            <p className="text-[8px] font-semibold tabular-nums leading-tight text-text-primary">
              £1,450 · due 1st
            </p>
            <p className="text-[6px] leading-tight text-text-muted">Connect your bank to Auto-Pay</p>
            <button
              type="button"
              tabIndex={-1}
              className="mt-1 w-full rounded-md bg-brand-teal px-1.5 py-1 text-center text-[7px] font-semibold text-text-primary"
            >
              Set up direct debit
            </button>
          </div>
          <p className="mt-1.5 text-[6px] font-medium uppercase tracking-wide text-text-muted">
            Recent repairs
          </p>
          <ul className="mt-0.5 space-y-1">
            {[
              { what: "Boiler service", status: "In progress", tone: "text-brand-teal" },
              { what: "Kitchen tap", status: "Resolved", tone: "text-text-muted" },
            ].map((row) => (
              <li
                key={row.what}
                className="flex items-center justify-between rounded-md border border-ui-tags bg-bg-main px-1.5 py-1"
              >
                <span className="text-[7px] font-medium text-text-primary">{row.what}</span>
                <span className={cn("text-[6px] font-medium", row.tone)}>{row.status}</span>
              </li>
            ))}
          </ul>
        </PhoneFrame>

        <PhoneFrame
          title="Browse through your curated properties"
          tabs={TENANT_TABS}
          activeTab="market"
        >
          <p className="font-display font-bold text-[8px] uppercase tracking-display text-text-primary">Marketplace</p>
          <p className="text-[7px] text-text-muted">8 homes · 12 landlords</p>
          <ul className="mt-1.5 space-y-1">
            {[
              { img: LUXE_IMAGES.living, title: "2-bed flat", meta: "Hackney · £1,450" },
              { img: LUXE_IMAGES.marble, title: "Garden flat", meta: "N1 · £1,795" },
              { img: LUXE_IMAGES.modern, title: "Studio", meta: "E8 · £1,250" },
            ].map((row) => (
              <li key={row.title}>
                <button
                  type="button"
                  tabIndex={-1}
                  className="flex w-full items-center gap-1.5 rounded-lg border border-ui-tags bg-bg-main p-1 text-left"
                >
                  <img
                    src={row.img}
                    alt=""
                    className="h-8 w-8 shrink-0 rounded-md object-cover"
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-[6px] font-medium leading-tight text-text-primary">
                      {row.title}
                    </span>
                    <span className="block truncate text-[5px] leading-tight text-text-muted">{row.meta}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </PhoneFrame>

        <PhoneFrame
          title="Score, suggested actions, and which properties fit your criteria"
          tabs={TENANT_TABS}
          activeTab="score"
        >
          <p className="text-[6px] font-medium uppercase tracking-wide text-text-muted">FairRent</p>
          <p className="font-display font-bold text-[8px] uppercase tracking-display text-text-primary">Your score</p>
          <div className="mt-1 rounded-lg border border-ui-tags bg-bg-main px-1.5 py-1.5">
            <ScoreRing />
            <p className="mt-0.5 text-center text-[7px] leading-snug text-text-muted">Let&apos;s get you to 5.0.</p>
          </div>
          <button
            type="button"
            tabIndex={-1}
            className="mt-1.5 flex w-full items-center justify-between rounded-lg bg-brand-teal px-1.5 py-1.5 text-left"
          >
            <span>
              <span className="block text-[8px] font-semibold leading-tight text-text-primary">8 homes</span>
              <span className="block text-[6px] text-text-primary/80">meet your criteria</span>
            </span>
            <span className="text-[7px] font-semibold text-text-primary">View</span>
          </button>
          <p className="mt-1.5 text-[6px] font-medium uppercase tracking-wide text-text-muted">Do these 3</p>
          <ul className="mt-0.5 space-y-1">
            {[
              { tip: "Turn on Auto-Pay", lift: "+0.4" },
              { tip: "Add a reference", lift: "+0.3" },
              { tip: "Verify identity", lift: "+0.2" },
            ].map((item) => (
              <li key={item.tip}>
                <button
                  type="button"
                  tabIndex={-1}
                  className="flex w-full items-center justify-between rounded-md border border-ui-tags bg-bg-main px-1.5 py-1"
                >
                  <span className="text-[7px] font-medium text-text-primary">{item.tip}</span>
                  <span className="text-[7px] font-semibold text-brand-teal">{item.lift}</span>
                </button>
              </li>
            ))}
          </ul>
        </PhoneFrame>

        <PhoneFrame
          title="Notify your landlord of any issues, repair times are logged and stored securely"
          tabs={TENANT_TABS}
          activeTab="chat"
        >
          <p className="font-display font-bold text-[8px] uppercase tracking-display text-text-primary">
            Chat
          </p>
          <p className="truncate text-[6px] text-text-muted">James Cole · Garden flat</p>
          <div className="mt-1 flex-1 space-y-1 overflow-hidden">
            <div className="ml-auto max-w-[92%] rounded-lg rounded-tr-sm bg-brand-teal px-1.5 py-1">
              <p className="text-[6px] leading-snug text-text-primary">
                The kitchen tap is leaking again. Can you send someone?
              </p>
              <img
                src={REPAIR_PHOTO}
                alt="Leaking kitchen tap"
                className="mt-1 h-8 w-full rounded-md object-cover"
              />
              <p className="mt-0.5 text-[5px] text-text-primary/70">Tue 11:14</p>
            </div>
            <div className="max-w-[92%] rounded-lg rounded-tl-sm border border-ui-tags bg-bg-main px-1.5 py-1">
              <p className="text-[5px] font-semibold uppercase tracking-wide text-text-muted">
                James Cole
              </p>
              <p className="mt-0.5 text-[6px] leading-snug text-text-primary">
                All done. The tap is fixed and we&apos;ve logged the repair as finished.
              </p>
              <p className="mt-0.5 text-[5px] text-text-muted">Tue 16:02</p>
            </div>
          </div>
          <div className="mt-1 flex items-center gap-1 rounded-full border border-ui-tags bg-bg-main px-1.5 py-1">
            <span className="min-w-0 flex-1 truncate text-[6px] italic text-text-muted">
              Message your landlord…
            </span>
          </div>
        </PhoneFrame>
    </RolePreviewGroup>
  );
}

function LandlordPhones() {
  return (
    <RolePreviewGroup title="Landlord" className="bg-[#E6F7F2]">
        <PhoneFrame
          title="Occupancy and profitability."
          tabs={LANDLORD_TABS}
          activeTab="home"
        >
          <p className="font-display font-bold text-[8px] uppercase tracking-display text-text-primary">Portfolio</p>
          <p className="text-[7px] text-text-muted">4 units · 3 let · 1 vacant</p>
          <div className="mt-1.5 rounded-lg bg-bg-main p-1.5">
            <OccupancyDonut />
          </div>
          <p className="mt-1.5 text-[7px] font-medium text-text-muted">6-month NOI</p>
          <div className="rounded-lg bg-bg-main px-1 py-1">
            <ProfitBars />
          </div>
          <p className="mt-1.5 text-[6px] font-medium uppercase tracking-wide text-text-muted">Properties</p>
          <ul className="mt-0.5 grid grid-cols-2 gap-1">
            {[
              { name: "Flat 1", status: "Let", rent: "£1,450" },
              { name: "Flat 2", status: "Let", rent: "£1,275" },
              { name: "Garden", status: "Vacant", rent: "—" },
              { name: "Unit 4", status: "Let", rent: "£1,600" },
            ].map((unit) => (
              <li key={unit.name} className="rounded-md bg-bg-main px-1 py-1">
                <p className="truncate text-[7px] font-semibold leading-tight text-text-primary">{unit.name}</p>
                <p
                  className={cn(
                    "text-[6px] font-medium leading-tight",
                    unit.status === "Let" ? "text-brand-teal" : "text-alert-watermelon"
                  )}
                >
                  {unit.status}
                </p>
                <p className="text-[6px] tabular-nums text-text-muted">{unit.rent}</p>
              </li>
            ))}
          </ul>
        </PhoneFrame>

        <PhoneFrame
          title="Each unit, who lives there, and live repair status."
          tabs={LANDLORD_TABS}
          activeTab="units"
        >
          <p className="font-display font-bold text-[8px] uppercase tracking-display text-text-primary">
            Units
          </p>
          <ul className="mt-1 space-y-1">
            {[
              {
                img: LUXE_IMAGES.living,
                name: "Flat 1",
                tenant: "Aisha Khan",
                rent: "£1,450",
                repair: "No open jobs",
                status: "Let",
              },
              {
                img: LUXE_IMAGES.marble,
                name: "Flat 2",
                tenant: "Maya Chen",
                rent: "£1,275",
                repair: "Tap · in progress",
                status: "Let",
              },
              {
                img: LUXE_IMAGES.modern,
                name: "Garden",
                tenant: "Vacant",
                rent: "—",
                repair: "0 jobs",
                status: "Vacant",
              },
              {
                img: LUXE_IMAGES.interior,
                name: "Unit 4",
                tenant: "James Cole",
                rent: "£1,600",
                repair: "Boiler booked",
                status: "Let",
              },
            ].map((unit) => (
              <li key={unit.name}>
                <button
                  type="button"
                  tabIndex={-1}
                  className="flex w-full items-start gap-1.5 rounded-lg border border-ui-tags bg-bg-main p-1 text-left"
                >
                  <img
                    src={unit.img}
                    alt=""
                    className="h-8 w-8 shrink-0 rounded-md object-cover"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-1">
                      <span className="truncate text-[7px] font-semibold leading-tight text-text-primary">
                        {unit.name}
                      </span>
                      <span
                        className={cn(
                          "shrink-0 text-[5px] font-medium",
                          unit.status === "Let" ? "text-brand-teal" : "text-alert-watermelon"
                        )}
                      >
                        {unit.status}
                      </span>
                    </span>
                    <span className="block truncate text-[6px] leading-tight text-text-muted">
                      {unit.tenant} · {unit.rent}
                    </span>
                    <span className="block truncate text-[5px] leading-tight text-text-muted">
                      {unit.repair}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </PhoneFrame>

        <PhoneFrame
          title="Repair reports, photos logged on file. AI agents can arrange repairs."
          tabs={LANDLORD_TABS}
          activeTab="chats"
        >
          <p className="font-display font-bold text-[8px] uppercase tracking-display text-text-primary">Chats</p>
          <p className="truncate text-[6px] text-text-muted">Maya Chen · Flat 2</p>
          <div className="mt-1 flex-1 space-y-1 overflow-hidden">
            <div className="max-w-[92%] rounded-lg rounded-tl-sm border border-ui-tags bg-bg-main px-1.5 py-1">
              <p className="text-[6px] leading-snug text-text-primary">
                The kitchen tap is leaking again. Can you send someone?
              </p>
              <img
                src={REPAIR_PHOTO}
                alt="Leaking kitchen tap"
                className="mt-1 h-8 w-full rounded-md object-cover"
              />
              <p className="mt-0.5 text-[5px] text-text-muted">Tue 11:14</p>
            </div>
            <div className="rounded-lg border border-brand-teal/30 bg-brand-teal/10 px-1.5 py-1">
              <p className="flex items-center gap-0.5 text-[5px] font-semibold uppercase tracking-wide text-brand-teal">
                <Sparkles className="h-2 w-2" strokeWidth={2.4} />
                FairRent AI
              </p>
              <p className="mt-0.5 text-[6px] leading-snug text-text-primary">
                Suggested: North London Plumbing, Thu 09:00, £95 call-out.
              </p>
            </div>
          </div>
          <div className="mt-1 flex items-center gap-1 rounded-full border border-ui-tags bg-bg-main px-1.5 py-1">
            <span className="min-w-0 flex-1 truncate text-[6px] italic text-text-muted">
              Booking a plumber for Thursday…
            </span>
            <span className="flex gap-0.5">
              <span className="h-0.5 w-0.5 animate-pulse rounded-full bg-text-muted" />
              <span className="h-0.5 w-0.5 animate-pulse rounded-full bg-text-muted [animation-delay:150ms]" />
              <span className="h-0.5 w-0.5 animate-pulse rounded-full bg-text-muted [animation-delay:300ms]" />
            </span>
          </div>
        </PhoneFrame>

        <PhoneFrame
          title="Upcoming maintenance."
          tabs={LANDLORD_TABS}
          activeTab="jobs"
        >
          <p className="font-display font-bold text-[8px] uppercase tracking-display text-text-primary">Schedule</p>
          <ul className="mt-1.5 space-y-1">
            {[
              { when: "12 May", what: "Gas safety", where: "Flat 2" },
              { when: "14 days", what: "EICR window", where: "Property B" },
              { when: "Tue 09:00", what: "Boiler service", where: "Unit 4" },
            ].map((row) => (
              <li key={row.what} className="rounded-lg border border-ui-tags bg-bg-main px-1.5 py-1.5">
                <p className="text-[7px] font-medium text-brand-teal">{row.when}</p>
                <p className="text-[8px] font-medium text-text-primary">{row.what}</p>
                <p className="text-[7px] text-text-muted">{row.where}</p>
              </li>
            ))}
          </ul>
          <div className="mt-1.5 rounded-lg bg-bg-main px-1.5 py-1.5">
            <p className="text-[6px] font-medium uppercase tracking-wide text-text-muted">This month</p>
            <p className="text-[8px] font-semibold text-text-primary">2 jobs on SLA</p>
            <p className="text-[6px] text-text-muted">1 awaiting parts · spend £240</p>
          </div>
        </PhoneFrame>
    </RolePreviewGroup>
  );
}

export function AppPreviewPhones({ audience }: { audience: "landlord" | "tenant" }) {
  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 bg-landing-band py-8 md:py-10">
      <p
        id="landing-accountability-heading"
        className="mb-6 text-center font-display font-bold text-[1.75rem] uppercase tracking-display text-brand-teal md:mb-8 md:text-[2rem]"
      >
        Built for accountability
      </p>
      <div className="mx-auto max-w-3xl px-6">
        {audience === "tenant" ? <TenantPhones /> : <LandlordPhones />}
      </div>

      <div className="mx-auto mt-8 flex max-w-lg flex-col items-center px-6 text-center md:mt-10">
        <p className="font-accent text-base italic text-text-primary md:text-lg">
          Be the first to know when we launch. Get on the waitlist for early access.
        </p>
        <JoinEarlyAccessButton className="mt-4">Join early access</JoinEarlyAccessButton>
      </div>
    </div>
  );
}
