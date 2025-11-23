# Yama's Streaming Platform

End-to-end blueprint for **Yama's**, a Netflix-style streaming platform built on Supabase, Cloudflare Stream, Next.js (Vercel), and React Native (Expo).

## Stack Overview
- **Supabase**: Postgres schema with RLS, Auth, Storage.
- **Next.js (web)**: public landing, streaming UI, admin pages, API routes for Cloudflare Stream helpers.
- **React Native (Expo)**: mobile experience mirroring home feed and player controls.
- **Cloudflare Stream**: upload/encode/playback for all video assets.

## Structure
```
/supabase/schema.sql    # Database + RLS
/web                    # Next.js app (Vercel)
/mobile                 # Expo app (React Native)
```

## Supabase Setup
1. Create a Supabase project and run `supabase/schema.sql` in SQL Editor or via migrations.
2. Create a service role and anon key. Store values in `.env` (see `.env.example`).
3. Seed at least one `user_profiles` row with role `super_admin` to unlock admin features.
4. Buckets: create `posters`, `backdrops`, `avatars` for artwork.

## Environment Variables
Copy `.env.example` to `.env` and fill:
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_JWT_SECRET`
- `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_STREAM_SIGNING_KEY`
- `NEXT_PUBLIC_SITE_URL`, `MOBILE_DEEP_LINK_SCHEME`

## Web (Next.js)
- Install deps: `cd web && npm install`
- Run locally: `npm run dev`
- Key routes:
  - `/` home feed with hero carousel, Continue Watching, Originals, Yama's Choice, mid-feed hero slot, family challenges.
  - `/movie/[id]` detail page with actions for play, watchlist, and ratings section.
  - `/admin` dashboard calling `/api/admin/dashboard-stats`.
- API routes (server only):
  - `POST /api/admin/upload-video` – stub for Cloudflare Stream upload + Supabase metadata write.
  - `POST /api/admin/refresh-playback-token` – returns a short-lived signed URL placeholder.
  - `GET /api/admin/dashboard-stats` – aggregates counts using Supabase service role.

## Mobile (Expo)
- Install deps: `cd mobile && npm install`
- Start: `npm run start`
- Features: hero carousel, Continue Watching row, Originals, Yama's Choice, cinema mode hint. Uses Supabase client for future auth/content wiring.

## Video Flow (Cloudflare Stream)
1. Admin uploads via web admin (API route keeps token secret).
2. Store `cloudflare_video_id` and `playback_url` in `movies` table.
3. Clients request `/api/admin/refresh-playback-token` to obtain a signed playback URL (tokenization placeholder included).

## Safety & Roles
- RLS policies ensure users only touch their own profiles, watchlists, progress, reviews, groups.
- `public.is_admin()` helper gates admin writes for catalog tables.

## Deployment Notes
- Deploy `/web` to Vercel; set env vars in Vercel dashboard.
- Configure Supabase Auth URL to Vercel domain for callback support.
- Expo app consumes the same Supabase backend using the anon key; restrict data via RLS.

## Next Steps
- Wire Supabase auth UI (email/password) on web and mobile.
- Replace mock content with Supabase queries and Cloudflare playback URLs.
- Add parental PIN prompts and casting integrations in mobile player.
