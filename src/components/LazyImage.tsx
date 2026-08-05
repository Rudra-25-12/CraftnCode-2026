import type { ImgHTMLAttributes } from "react";

type LazyImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  /** Set for above-the-fold / LCP images so they load eagerly instead. */
  priority?: boolean;
};

/**
 * Image wrapper that defaults to below-the-fold behaviour:
 * native lazy loading + async decoding + low fetch priority.
 * Always pass width/height to avoid layout shift.
 */
export function LazyImage({ priority = false, ...props }: LazyImageProps) {
  return (
    <img
      {...props}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "low"}
    />
  );
}
