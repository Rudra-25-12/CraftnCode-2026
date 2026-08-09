# Redesign the login page

Rebuild `/login` as a proper arcade attract screen: one large, believable cabinet standing in a neon arcade room, with a real "get pulled into the CRT" transition and a login form that reads as an 8-bit game screen.

## The scene

- Dark arcade room instead of a flat page: the existing animated arcade backdrop stays, but dimmed and pushed back, with a floor reflection and a spotlight pool under the cabinet.
- Top plate: CSC logo x IIIT Bhubaneswar logo, smaller and tighter, sitting on a thin neon divider bar.
- Poster title "CRAFT N CODE" in the lime poster type with the Pac-Man glyph, placed above the cabinet.
- The cabinet is the hero: taller, side-panel art with pixel sprites, glowing magenta edge lighting, a lit marquee reading PLAYER LOGIN, a curved CRT with bezel, control deck with joystick + buttons, coin door and legs with a cast shadow.

## The flow

1. Attract mode: CRT shows a blinking "READY PLAYER ONE", a fake high-score table cycling behind it, "PRESS START" button, and a credits counter reading `CREDITS 00`.
2. Press Start: cabinet zooms so the CRT fills the viewport, room dims, a short CRT power-on flash + scanline roll plays, then the login screen boots in line by line.
3. Login screen: TEAM NAME and PASSWORD fields styled as arcade name-entry rows (blinking caret, uppercase pixel type), error text as a red arcade warning line.
4. INSERT A COIN button: on click the coin door flashes, credits tick `00 -> 01`, and the screen wipes to the homepage.
5. A small "BACK" control lets a player exit the zoom back to attract mode.

## Behaviour kept as-is

Login stays a themed gate: any team name + password is accepted and the team name is saved locally, exactly as today. No backend accounts. Rails, header and footer stay hidden on this route.

## Technical notes

- Rewrite `src/routes/login.tsx`; split the cabinet into `src/components/ArcadeCabinet.tsx` so the route file stays readable.
- All colours from existing tokens in `src/styles.css` (neon-magenta, neon-cyan, poster lime) — no hardcoded Tailwind colour utilities; add any new tokens/utilities (CRT flicker, scanline roll, boot-in) to `src/styles.css`.
- Zoom uses a CSS transform on a wrapper with `transform-origin` on the CRT centre, so the screen lands centred at any viewport size; mobile gets a reduced zoom scale and a stacked layout.
- Respect `prefers-reduced-motion`: skip the zoom/flicker, cut straight to the login screen.
- Keep `head()` metadata for the route, updated to match the new copy.
