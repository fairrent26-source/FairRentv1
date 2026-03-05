/**
 * Midnight Luxe — high-resolution Unsplash URLs for luxury real estate mood.
 * Keywords: luxury penthouse, architectural shadows, minimalist interior, dark marble, high-end real estate.
 */

const BASE = "https://images.unsplash.com";

export const LUXE_IMAGES = {
  /** Ultra-modern luxury interior, minimalist, soft natural light — full-bleed hero */
  hero:
    `${BASE}/photo-1600607687939-ce8a6c25118c?w=1920&q=85`,
  penthouse:
    `${BASE}/photo-1600585154340-be6161a56a0c?w=800&q=80`,
  interior:
    `${BASE}/photo-1600607687939-ce8a6c25118c?w=800&q=80`,
  marble:
    `${BASE}/photo-1600566753190-17f0baa2a6c3?w=800&q=80`,
  architectural:
    `${BASE}/photo-1600573472592-401b489a3cdc?w=800&q=80`,
  modern:
    `${BASE}/photo-1600585154526-990dced4db0d?w=800&q=80`,
  darkInterior:
    `${BASE}/photo-1600210492486-724fe5c67fb0?w=800&q=80`,
  living:
    `${BASE}/photo-1600566753086-00f18fb6b3ea?w=800&q=80`,
  pool:
    `${BASE}/photo-1600585154340-be6161a56a0c?w=800&q=80`,
  /** Auth panel — modern luxury apartment, blends into auth box */
  authPanel:
    `${BASE}/photo-1600585154526-990dced4db0d?w=1200&q=85`,
  /** Onboarding: landlord — modern luxury office / skyscraper views */
  onboardingLandlord:
    `${BASE}/photo-1497366216548-37526070297c?w=1920&q=85`,
  /** Onboarding: tenant — warm architectural lighting, high-end minimalist lounge */
  onboardingTenant:
    `${BASE}/photo-1600607687939-ce8a6c25118c?w=1920&q=85`,
} as const;

/** Ordered list for cycling in cards */
export const LUXE_IMAGE_LIST = Object.values(LUXE_IMAGES);
