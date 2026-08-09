# Redesign the login page

Rebuild `/login` so it reads like the event flex: black starfield, magenta perspective grid floor, chunky yellow Pac-styled wordmark, drifting invaders with dashed trail paths, and red arcade cabinets flanking the stage.

## The scene (matched to the flex)

- Top bar of partner marks, evenly spaced on a thin neon divider: Manipal University Jaipur, TechSociety IIIT-Bhubaneswar, and IIIT x Cyber Space. (I'll need those extra logo files from you — until then the two existing logos stay and I leave slots for the rest.)
- Black space backdrop with fine white stars, plus the flex's dashed L-shaped circuit trails in red/green/cyan/orange running toward the invaders.
- Magenta wireframe grid floor across the lower third, with the cabinet standing on it and casting a glow.
- Poster wordmark "CRAFT N / CODE" in the flex's yellow slab type with hard drop shadow, the Pac-Man glyph as the C of CODE.
- Under the wordmark, the flex's key line: `15/08/26` and `50K PRIZE POOL`, plus the "in collaboration with IIIT Bhubaneswar" ticker with a Pac-Man and ghost chasing along it.

## The cabinet

One large red arcade cabinet as the centrepiece (matching the flex's red/blue cabinets rather than the current purple one): red shell with yellow trim, lit marquee reading PLAYER LOGIN, blue-glow CRT in a curved bezel, joystick + coloured buttons on the control deck, coin door and legs with a floor reflection.

## The flow

1. Attract mode: CRT shows blinking "READY PLAYER ONE" over a cycling high-score table, a PRESS START button and `CREDITS 00`.
2. Press Start: the cabinet zooms until the CRT fills the viewport, the room dims, a CRT power-on flash and scanline roll play, then the login screen boots in line by line.
3. Login screen: TEAM NAME and PASSWORD as arcade name-entry rows with a blinking caret and pixel type; errors as a red warning line.
4. INSERT A COIN: coin door flashes, credits tick `00 -> 01`, screen wipes to the homepage.
5. A small BACK control returns to attract mode.

## Behaviour kept as-is

Login stays a themed gate: any team name + password is accepted and saved locally. No backend accounts. Rails, header and footer stay hidden on this route.

## Technical notes

- Rewrite `src/routes/login.tsx`; move the cabinet into `src/components/ArcadeCabinet.tsx` and reuse/extend `ArcadeStage` for stars, grid and invaders so the route file stays readable.
- Colours come from tokens in `src/styles.css` — add flex-accurate tokens (poster yellow, cabinet red, grid magenta) and new utilities (CRT flicker, scanline roll, boot-in) there; no hardcoded Tailwind colour utilities in components.
- Zoom is a CSS transform with `transform-origin` at the CRT centre so the screen lands centred at any viewport; mobile gets a reduced scale and stacked layout.
- Respect `prefers-reduced-motion`: skip zoom and flicker, cut straight to the login screen.
- Route `head()` metadata updated to match the new copy.
