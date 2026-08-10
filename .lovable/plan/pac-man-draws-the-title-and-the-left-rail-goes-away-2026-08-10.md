# Pac-Man draws the title, and the left rail goes away

## Navigation change

The fixed left bar is removed on every page. Home, Problems, About and Sponsors move into the existing right rail, above Submit / Food / Admin, so desktop keeps one rail on the right. The mobile drawer already lists every link, so it stays as is.

## The landing animation

On every load of the home page the wordmark is not there yet. Instead:

1. A trail of glowing dots is laid out along the path Pac-Man will travel.
2. Pac-Man enters from the left edge of the screen, chomping, and runs along the lower line. As he passes, the letters of `1ode` appear one by one behind him, landing exactly where the wordmark sits today.
3. At the end of the lower line he turns and moves up to the upper line, then travels leftwards, spawning `craft n` in reverse order (letters appear right-to-left as he eats past them).
4. Once the top line is complete he drops back down and settles into the position of the `1` in `1ode`, becoming the Pac-Man glyph in the finished title.
5. Total run is roughly 3 seconds. The rest of the hero (LOGIN, PROBLEM STATEMENTS, the club line) fades in once he parks.

Users with reduced-motion settings, and anyone whose page loads mid-animation, see the completed title immediately.

## Technical notes

- `src/components/SiteFrame.tsx`: delete the left `<nav>` block, move `leftNav` entries into the right rail render, keep the mobile drawer unchanged.
- New `src/components/TitleRunner.tsx`: owns the hero wordmark. Renders both lines as per-character spans with the existing `poster-title-flex` styling, each starting at opacity 0, plus an absolutely positioned Pac-Man (the animated SVG from `PacGlyph.tsx`) and a dot trail.
  - Layout measured after mount with `getBoundingClientRect()` on each character span so the path follows the real glyph positions at any breakpoint; measurement re-runs on resize.
  - Drive with a single `requestAnimationFrame` loop over a keyframed path (segment list: enter-left, bottom run, rise, top run right-to-left, drop into slot), revealing a character whenever Pac-Man's x crosses its centre and eating the dot at that point.
  - Pac-Man's rotation follows the segment direction; the final frame swaps him for the inline `PacGlyph` inside the `1ode` line so the static title is a normal text node.
  - `prefers-reduced-motion` and a fallback timer short-circuit to the finished state.
- `src/routes/index.tsx`: replace the current `<h1>` markup with `<TitleRunner />`, and gate the button row behind the completion state for the fade-in.
- No backend or styling-token changes; `poster-title-flex` in `src/styles.css` is reused as is.
