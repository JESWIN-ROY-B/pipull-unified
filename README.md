# PiPull Unified

PiPull Unified combines the working PiPull marketplace platform from `gig-economy-platform` with the original MVP role dashboards and flows from `pipull2-0`. The minimal `pipull-5667` repository contributed its MIT license.

## Included features

- Customer and worker role flows with fair-allocation matching.
- Marketplace browsing, worker profiles, skill badges, availability, secure messaging, panic/safety controls, and booking tray.
- Worker workspace with earnings, incentives, mutual-fund voting, team-up, and community actions.
- Admin dashboard with operations toggles, worker KPIs, demand forecasting, and management views.
- API routes for registration, identity verification, worker profiles, worker search, bookings, demand forecasting, and Razorpay order/signature verification.
- Drizzle/Postgres schema and seed data for the marketplace.
- Original MVP dashboard experience available at `/mvp` for compatibility and comparison.

## Development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000` for the unified marketplace. Open `http://localhost:3000/mvp` for the original MVP dashboard flow.

Build and validate with:

```bash
pnpm build
```

## Source lineage

The main application is based on `gig-economy-platform`, which already contains the richer backend and marketplace implementation. The MVP-only dashboards are integrated under `components/pipull/mvp`, with their data model in `lib/mvp-data.ts` and compatibility page in `app/mvp/page.tsx`. No source files from the three input repositories were deleted from the working feature set.

## License

MIT License. Copyright (c) 2026 JESWIN-ROY-B.
