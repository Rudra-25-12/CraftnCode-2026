import { useEffect, useLayoutEffect, useRef, useState } from "react";

const TOP = "craft n";
const BOTTOM = "ode";

type Pt = { x: number; y: number };

function pathLengths(pts: Pt[]) {
  const acc = [0];
  for (let i = 1; i < pts.length; i++) {
    const d = Math.hypot(pts[i]!.x - pts[i - 1]!.x, pts[i]!.y - pts[i - 1]!.y);
    acc.push(acc[i - 1]! + d);
  }
  return acc;
}

function pointAt(pts: Pt[], acc: number[], t: number) {
  const total = acc[acc.length - 1]!;
  const d = Math.max(0, Math.min(total, t));
  let i = 1;
  while (i < acc.length - 1 && acc[i]! < d) i++;
  const seg = acc[i]! - acc[i - 1]! || 1;
  const k = (d - acc[i - 1]!) / seg;
  const a = pts[i - 1]!;
  const b = pts[i]!;
  return {
    x: a.x + (b.x - a.x) * k,
    y: a.y + (b.y - a.y) * k,
    angle: (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI,
  };
}

/**
 * Hero wordmark that is drawn by a Pac-Man running the dot trail:
 * enters from the left, runs the bottom line spawning "ode", climbs to the top
 * line, runs leftwards spawning "craft n" in reverse, then drops back into the
 * slot of the leading "1" glyph.
 */
export function TitleRunner({ onDone }: { onDone?: () => void }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLSpanElement>(null);
  const topRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const bottomRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const [ready, setReady] = useState(false);
  const [done, setDone] = useState(false);
  const [pac, setPac] = useState<{ x: number; y: number; angle: number; size: number } | null>(null);
  const [shownTop, setShownTop] = useState<boolean[]>(() => TOP.split("").map(() => false));
  const [shownBottom, setShownBottom] = useState<boolean[]>(() => BOTTOM.split("").map(() => false));
  const [dots, setDots] = useState<{ x: number; y: number; d: number }[]>([]);
  const [eaten, setEaten] = useState(0);

  const finish = () => {
    setShownTop(TOP.split("").map(() => true));
    setShownBottom(BOTTOM.split("").map(() => true));
    setDone(true);
    onDone?.();
  };

  useLayoutEffect(() => setReady(true), []);

  useEffect(() => {
    if (!ready) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const wrap = wrapRef.current;
    const slot = slotRef.current;
    if (!wrap || !slot) return;

    const wr = wrap.getBoundingClientRect();
    const sr = slot.getBoundingClientRect();
    const rel = (el: Element) => {
      const r = el.getBoundingClientRect();
      return { cx: r.left - wr.left + r.width / 2, cy: r.top - wr.top + r.height / 2, w: r.width };
    };

    const slotBox = { cx: sr.left - wr.left + sr.width / 2, cy: sr.top - wr.top + sr.height / 2 };
    const size = parseFloat(window.getComputedStyle(slot).fontSize) || sr.height;

    if (reduce) {
      setPac({ x: slotBox.cx, y: slotBox.cy, angle: 0, size });
      finish();
      return;
    }

    const topBoxes = topRefs.current.map((el) => (el ? rel(el) : null));
    const bottomBoxes = bottomRefs.current.map((el) => (el ? rel(el) : null));
    const bottomY = slotBox.cy;
    const topY = topBoxes.find(Boolean)?.cy ?? bottomY - sr.height;
    const lastBottom = [...bottomBoxes].reverse().find(Boolean);
    const rightX = (lastBottom?.cx ?? slotBox.cx) + (lastBottom?.w ?? 40) * 0.5;
    const firstTop = topBoxes.find(Boolean);
    const leftX = (firstTop?.cx ?? slotBox.cx) - (firstTop?.w ?? 40) * 0.5;

    const pts: Pt[] = [
      { x: -wr.width * 0.6 - 80, y: bottomY },
      { x: rightX, y: bottomY },
      { x: rightX, y: topY },
      { x: leftX, y: topY },
      { x: leftX, y: bottomY },
      { x: slotBox.cx, y: bottomY },
    ];
    const acc = pathLengths(pts);
    const total = acc[acc.length - 1]!;

    const trail: { x: number; y: number; d: number }[] = [];
    for (let d = 26; d < total - 20; d += 30) {
      const p = pointAt(pts, acc, d);
      trail.push({ x: p.x, y: p.y, d });
    }
    setDots(trail);

    const duration = 5500;
    let raf = 0;
    let start = 0;

    const step = (ts: number) => {
      if (!start) start = ts;
      const k = Math.min(1, (ts - start) / duration);
      const travelled = total * k;
      const p = pointAt(pts, acc, travelled);
      setPac({ x: p.x, y: p.y, angle: p.angle, size });
      setEaten(travelled);

      const onBottomRun = travelled <= acc[1]!;
      const onTopRun = travelled >= acc[2]! && travelled <= acc[3]!;
      if (onBottomRun) {
        setShownBottom((prev) => {
          const next = bottomBoxes.map((b, i) => prev[i] || (b ? b.cx <= p.x : false));
          return next.some((v, i) => v !== prev[i]) ? next : prev;
        });
      }
      if (onTopRun) {
        setShownTop((prev) => {
          const next = topBoxes.map((b, i) => prev[i] || (b ? b.cx >= p.x : false));
          return next.some((v, i) => v !== prev[i]) ? next : prev;
        });
      }

      if (k < 1) {
        raf = requestAnimationFrame(step);
      } else {
        finish();
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  const charClass = (shown: boolean) =>
    `inline-block transition-opacity duration-150 ${shown ? "opacity-100" : "opacity-0"}`;

  return (
    <div ref={wrapRef} className="relative mx-auto w-fit">
      <h1 className="poster-title-flex text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
        <span className="mx-auto block w-fit">
          {TOP.split("").map((c, i) => (
            <span
              key={`t${i}`}
              ref={(el) => {
                topRefs.current[i] = el;
              }}
              className={charClass(!!shownTop[i])}
            >
              {c === " " ? "\u00a0" : c}
            </span>
          ))}
        </span>
        <span className="mx-auto mt-[0.12em] block w-fit text-[1.53em] leading-[1]">
          <span ref={slotRef} className="inline-block opacity-0" aria-hidden>
            1
          </span>
          {BOTTOM.split("").map((c, i) => (
            <span
              key={`b${i}`}
              ref={(el) => {
                bottomRefs.current[i] = el;
              }}
              className={charClass(!!shownBottom[i])}
            >
              {c}
            </span>
          ))}
        </span>
        <span className="sr-only">craft n code</span>
      </h1>

      {/* dot trail */}
      {!done
        ? dots.map((d) =>
            d.d > eaten ? (
              <span
                key={d.d}
                className="pointer-events-none absolute block rounded-full bg-[oklch(0.9_0.19_110)]"
                style={{
                  left: d.x - 3,
                  top: d.y - 3,
                  width: 6,
                  height: 6,
                  boxShadow: "0 0 8px oklch(0.9 0.19 110 / 0.8)",
                }}
              />
            ) : null,
          )
        : null}

      {/* the runner */}
      {pac ? (
        <span
          aria-hidden
          className={`poster-title-flex pac-runner pointer-events-none absolute leading-none ${done ? "" : "pac-chomp"}`}
          style={{
            left: pac.x,
            top: pac.y,
            fontSize: pac.size,
            transform: `translate(-50%, -50%) ${done ? "" : facing(pac.angle)}`,
            transition: done ? "transform 200ms ease-out" : undefined,
          }}
        >
          1
        </span>
      ) : null}
    </div>
  );
}