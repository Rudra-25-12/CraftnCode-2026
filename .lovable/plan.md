# Login on the landing page, arcade-style

Remove the standalone `/login` page and the gate that forces everyone through it. The site stays open to browse. Instead, the landing page gets a LOGIN control that opens a big arcade cabinet overlay with two sides: **Team** and **Admin**.

## What changes for visitors

- The whole site is browsable without logging in.
- Header (and hero) shows a LOGIN button. Clicking it opens a full-screen arcade cabinet overlay — the same cabinet art and PRESS START / INSERT A COIN flow from the current login page, now as a modal.
- The overlay has two selectable modes: TEAM and ADMIN, chosen with arcade-style tabs.
- Once signed in, the button turns into the team/admin name with a SIGN OUT option.
- Admins get an extra ADMIN rail link to a dashboard listing all submissions.

## Accounts

Real accounts in the backend (email + password):

- Teams sign up with team name, email and password. On signup a team profile row is created.
- Admins are existing accounts that have been given the admin role; there is no public admin signup. The first admin is granted by us on request.
- Submissions stay open to submit; only signed-in admins can read them.

## Admin dashboard

New protected page `/admin` showing every submission (team, track, repo, demo, pitch, time), newest first, in the arcade table style. Only visible to admin accounts.

## Technical notes

Database (one migration):
- `profiles` (user_id, team_name, created_at) + trigger on new signup to populate from signup metadata. Grants + RLS: users read/update own row.
- `app_role` enum (`admin`, `team`), `user_roles` table, `has_role(uuid, app_role)` security-definer function. Grants + RLS per standard pattern.
- `submissions`: add a SELECT policy `TO authenticated USING (public.has_role(auth.uid(),'admin'))` and the matching GRANT. Insert policy stays as is.

Frontend:
- Delete `src/routes/login.tsx`; remove the localStorage `cnc-player` gate from `SiteFrame.tsx`.
- New `src/components/ArcadeLoginOverlay.tsx` — the cabinet UI lifted out of the old login route, with TEAM/ADMIN tabs, sign in + team sign-up forms, zod validation, sonner toasts, `supabase.auth.signInWithPassword` / `signUp`.
- New `src/hooks/useSession.ts` (or root-level context) wired to a single `onAuthStateChange` in `__root.tsx` with `router.invalidate()`.
- `SiteFrame.tsx`: LOGIN / account button in the header, conditional ADMIN rail item.
- New `src/routes/_authenticated/route.tsx` gate + `src/routes/_authenticated/admin.tsx` dashboard, reading submissions through a `createServerFn` with `requireSupabaseAuth` that verifies the admin role; `attachSupabaseAuth` appended in `src/start.ts`.
- Email confirmation stays on by default unless you'd rather teams be signed in immediately after signup.
