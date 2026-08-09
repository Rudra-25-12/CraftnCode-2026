/**
 * A chomping Pac-Man used in place of the letter "C" in the poster title.
 * Sized in `em` so it scales with the surrounding type.
 */
export function PacGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-label="C"
      className={`inline-block h-[0.78em] w-[0.78em] -rotate-180 align-[-0.06em] ${className}`}
      style={{ filter: "drop-shadow(0 0 10px oklch(0.9 0.2 118 / 0.75))" }}
    >
      <path fill="#c8f31d" stroke="#0b0512" strokeWidth="6" strokeLinejoin="round">
        <animate
          attributeName="d"
          dur="0.42s"
          repeatCount="indefinite"
          calcMode="linear"
          values="
            M50,50 L96.6,23 A54,54 0 1 0 96.6,77 Z;
            M50,50 L99.9,46 A54,54 0 1 0 99.9,54 Z;
            M50,50 L96.6,23 A54,54 0 1 0 96.6,77 Z"
        />
      </path>
    </svg>
  );
}