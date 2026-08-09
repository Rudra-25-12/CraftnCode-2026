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
      className={`inline-block h-[0.78em] w-[0.78em] align-[-0.06em] ${className}`}
      style={{ filter: "drop-shadow(0 0 10px oklch(0.9 0.2 118 / 0.75))" }}
    >
      <path fill="#c8f31d" stroke="#0b0512" strokeWidth="5" strokeLinejoin="round">
        <animate
          attributeName="d"
          dur="0.42s"
          repeatCount="indefinite"
          calcMode="linear"
          values="
            M50,50 L89.8,27 A46,46 0 1 0 89.8,73 Z;
            M50,50 L95.9,46.8 A46,46 0 1 0 95.9,53.2 Z;
            M50,50 L89.8,27 A46,46 0 1 0 89.8,73 Z"
        />
      </path>
    </svg>
  );
}