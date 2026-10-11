const TICKER_ITEMS = [
  "Property condition",
  "Landlord responsiveness",
  "Maintenance experience",
  "Listing accuracy",
  "Previous tenant experience",
] as const;

function TickerTrack() {
  return (
    <div className="flex shrink-0 items-center gap-10 px-5" aria-hidden>
      {TICKER_ITEMS.map((label) => (
        <span
          key={label}
          className="whitespace-nowrap font-accent text-lg italic text-text-primary md:text-xl"
        >
          {label}
        </span>
      ))}
    </div>
  );
}

export function AccountabilityTicker() {
  return (
    <section aria-label="What tenancies are scored on">
      <ul className="sr-only">
        {TICKER_ITEMS.map((label) => (
          <li key={label}>{label}</li>
        ))}
      </ul>
      <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-landing-band py-3">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
          <TickerTrack />
          <TickerTrack />
        </div>
      </div>
    </section>
  );
}
