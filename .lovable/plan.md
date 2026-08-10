# Shorten header wordmark to "cn1"

Replace the top-left header text "craft n 1ode" with "cn1", keeping the exact same arcade Pac font styling (yellow fill, black outline, bevel) and hover scale.

## Technical detail
- `src/components/SiteFrame.tsx` line ~225: change the span content from `craft n 1ode` to `cn1`. Class `poster-title-flex` and sizing stay as-is; bump size slightly if the short mark looks too small.
- Link `aria-label` stays "Craft N Code — home" for accessibility.
