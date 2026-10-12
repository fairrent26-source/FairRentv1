import { cn } from "@/lib/utils";

const TEAL = "#00D2D3";
const GREEN = "#2DCC7A";
const BLACK = "#1A1A1A";
const ICON_BG = "#EEF2F8";

function HouseMarkPaths() {
  return (
    <>
      <path
        d="M13 49V21.5L32 5"
        stroke={GREEN}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M32 5L51 21.5V49"
        stroke={BLACK}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M51 22.5c10 0 12.5 12 1 16"
        stroke={BLACK}
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M49 36.5L61 50"
        stroke={BLACK}
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      <g fill={TEAL}>
        <rect x="24.2" y="24.2" width="4.1" height="4.1" rx="0.85" />
        <rect x="30.2" y="24.2" width="4.1" height="4.1" rx="0.85" />
        <rect x="24.2" y="30.2" width="4.1" height="4.1" rx="0.85" />
        <rect x="30.2" y="30.2" width="4.1" height="4.1" rx="0.85" />
      </g>
    </>
  );
}

function HouseMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 68 56"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <HouseMarkPaths />
    </svg>
  );
}

/** Lower mark: house icon on a rounded tile. */
export function FairRentAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="64" height="64" rx="16" fill={ICON_BG} />
      <g transform="translate(2.5 8) scale(0.86)">
        <HouseMarkPaths />
      </g>
    </svg>
  );
}

/** Upper lockup type: Fai + house rR + ent. */
export function FairRentWordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-display font-extrabold tracking-[-0.04em] text-brand-teal",
        className
      )}
    >
      <span>Fai</span>
      <HouseMark className="mx-[0.02em] h-[0.95em] w-[1.12em] -translate-y-[0.05em]" />
      <span>ent</span>
    </span>
  );
}

/** Navbar lockup: app icon + wordmark. */
export function FairRentLockup({
  className,
  iconClassName,
  wordmarkClassName,
}: {
  className?: string;
  iconClassName?: string;
  wordmarkClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <FairRentAppIcon className={cn("h-6 w-6 shrink-0", iconClassName)} />
      <FairRentWordmark className={cn("text-[15px] leading-none", wordmarkClassName)} />
    </span>
  );
}
