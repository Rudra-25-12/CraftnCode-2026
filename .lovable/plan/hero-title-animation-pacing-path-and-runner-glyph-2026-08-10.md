# Hero title animation: pacing, path, and runner glyph

Three fixes to the Pac-Man that draws the "craft n 1ode" wordmark on the home page.

## 1. Slow the animation down
The run currently completes in 3.4 seconds. Increase it to roughly 5.5 seconds so the letters appear at a readable pace, keeping the chomp cycle unchanged. The rest of the hero content still fades in only after the run finishes.

## 2. Turn upward earlier
Right now the runner overshoots well past the end of "1ode" before climbing. Reduce the right-hand overshoot so it turns up almost immediately after the last letter is revealed, and trim the left-hand overshoot on the top line by the same amount so both ends stay balanced.

## 3. Runner must look like the font's "1"
The runner is currently a hand-drawn SVG Pac-Man, which does not match the Pac-Man shape that the "1" character produces in the Pac Font typeface. Replace it with the actual "1" character rendered in the Pac Font at the same size and with the same yellow fill, black stroke and bevel as the title, so the runner is visually identical to the glyph it parks into. Because the font glyph faces a fixed direction, the runner will be flipped/rotated along the path so its mouth always faces the direction of travel, and it settles unrotated in its final slot.

## Technical notes
- All changes are in `src/components/TitleRunner.tsx`; the font-glyph runner is a small styled span reusing the existing `poster-title` styling rather than `PacGlyph`.
- `PacGlyph` stays in the codebase for any other usage.
- Reduced-motion behaviour is unchanged: title shown instantly, runner parked in slot.
