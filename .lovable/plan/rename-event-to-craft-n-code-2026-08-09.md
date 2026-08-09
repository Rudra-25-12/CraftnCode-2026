# Rename event to "Craft N Code"

Drop the `'26` / `2026` suffix everywhere. The event is simply **Craft N Code**.

## Changes

- Hero title (`src/routes/index.tsx`): stacked poster text becomes `CRAFT N` / Pac-Man glyph + `ODE` (no apostrophe-26).
- Login page title (`src/routes/login.tsx`): same stacked treatment, `CRAFT N` / `CODE`.
- Footer wordmark (`src/components/SiteFooter.tsx`): `CRAFT N CODE`.
- Page metadata (titles, descriptions, og:title/og:description) on: root, index, about, sponsors, problem-statements, submit, food, login — replace `CraftnCode'26` with `Craft N Code`.

## Left unchanged

- Header logo stays `CsC`.
- `sponsors@craftncode.dev` email and the `cnc-player` localStorage key stay as-is (not user-visible naming).

Say the word if you'd also like the sponsor email or storage key renamed.
