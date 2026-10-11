/** Illustrative UK portfolio used on the landing page. Disclosed in UI as an estimate. */
export const LANDING_FEE_EXAMPLE = {
  units: 4,
  avgRentMonthly: 1200,
  highStreetRate: 0.12,
  fairRentUnitMonthly: 12,
  fairRentPayRate: 0.015,
} as const;

export function formatGbp(amount: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function roundToSigFigs(value: number, figs = 2) {
  if (value === 0) return 0;
  const exp = Math.floor(Math.log10(Math.abs(value)));
  const factor = 10 ** (figs - 1 - exp);
  return Math.round(value * factor) / factor;
}

export function landingFeeFromInputs(
  units: number,
  avgRentMonthly: number,
  highStreetRate = LANDING_FEE_EXAMPLE.highStreetRate,
  fairRentRate = 0.02
) {
  const safeUnits = Math.max(0, units);
  const safeRent = Math.max(0, avgRentMonthly);
  const annualRent = safeUnits * safeRent * 12;
  const highStreetAnnual = Math.round(annualRent * highStreetRate);
  const fairRentAnnual = Math.round(annualRent * fairRentRate);
  const estimatedSaving = highStreetAnnual - fairRentAnnual;
  const savingPercent =
    highStreetAnnual > 0 ? Math.round((estimatedSaving / highStreetAnnual) * 100) : 0;

  return {
    annualRent,
    highStreetAnnual,
    fairRentAnnual,
    estimatedSaving,
    savingPercent,
  };
}

export function landingFeeSnapshot(unitCount = LANDING_FEE_EXAMPLE.units) {
  const { avgRentMonthly, highStreetRate, fairRentUnitMonthly, fairRentPayRate } =
    LANDING_FEE_EXAMPLE;
  const units = unitCount;
  const annualRent = units * avgRentMonthly * 12;
  const highStreetAnnual = Math.round(annualRent * highStreetRate);
  const fairRentAnnual = Math.round(
    units * fairRentUnitMonthly * 12 + annualRent * fairRentPayRate
  );
  const estimatedSaving = highStreetAnnual - fairRentAnnual;
  const savingPercent = Math.round((estimatedSaving / highStreetAnnual) * 100);

  return {
    annualRent,
    highStreetAnnual,
    fairRentAnnual,
    estimatedSaving,
    savingPercent,
  };
}
