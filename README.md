# FairRent — UI Prototype

Frontend-only, local-first interactive prototype. No backend, no auth, no APIs. All data is mock-driven.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use **Dev Panel** (bottom-right) to toggle edge-case states (empty matches, low score, no tenancy, etc.).

## Routes

- **Public:** `/`, `/marketplace`, `/property/[id]`
- **Landlord:** `/landlord`, `/landlord/portfolio`, `/landlord/portfolio/[id]`, `/landlord/matches`, `/landlord/maintenance`, `/landlord/financials`, `/landlord/pedigree`, `/landlord/messages`, `/landlord/settings`
- **Tenant:** `/tenant`, `/tenant/marketplace`, `/tenant/matches`, `/tenant/passport`, `/tenant/tenancy`, `/tenant/messages`, `/tenant/settings`

Switch roles via Landing page (“Enter as Landlord” / “Enter as Tenant”) or sidebar “Log out” then Landing.

## Stack

Next.js 14 (App Router), TypeScript (strict), TailwindCSS, shadcn-style components (Radix + CVA), Lucide React, Zustand (dev toggles only).

## Structure

- `app/(public)/` — Landing, marketplace, property detail
- `app/landlord/` — Landlord dashboard and sub-routes
- `app/tenant/` — Tenant dashboard and sub-routes
- `components/` — layout, navigation, cards, widgets, scoring, compliance, marketplace, messaging, forms, devtools
- `mock/` — typed data (landlords, tenants, properties, matches, messages, maintenance, compliance, financials)
- `store/` — Zustand dev panel state

Design: Preset B (dark, slate-950/900/800, rounded-2xl, emerald/amber/red states).
