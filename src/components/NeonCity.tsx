import { useEffect, useRef } from "react";

type Building = { x: number; w: number; h: number; lit: number; accent: number };

function makeLayer(count: number, seed: number, maxH: number, minH: number) {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const list: Building[] = [];
  let x = -0.05;
  for (let i = 0; i < count; i++) {
    const w = 0.02 + rand() * 0.05;
    list.push({
      x,
      w,
      h: minH + rand() * (maxH - minH),
      lit: rand(),
      accent: rand(),
    });
    x += w + rand() * 0.012;
  }
  return list;
}

/**
 * Animated parallax neon skyline. Layers drift at different speeds, windows
 * flicker, light trails sweep the foreground road, stars twinkle overhead.
 */
export function NeonCity() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const layers = [
      { b: makeLayer(70, 11, 0.42, 0.16), speed: 0.0035, col: "#2a1d55", glow: "#6d3bff", y: 0.9 },
      { b: makeLayer(60, 733, 0.58, 0.22), speed: 0.009, col: "#1b1440", glow: "#ff37c7", y: 0.95 },
      { b: makeLayer(46, 4211, 0.72, 0.3), speed: 0.019, col: "#0d0a24", glow: "#22d3ee", y: 1.0 },
    ];

    const stars = Array.from({ length: 130 }, (_, i) => ({
      x: Math.random(),
      y: Math.random() * 0.55,
      r: Math.random() * 1.3 + 0.2,
      p: Math.random() * Math.PI * 2,
      i,
    }));

    const trails = Array.from({ length: 7 }, () => ({
      x: Math.random(),
      y: 0.86 + Math.random() * 0.12,
      v: 0.0018 + Math.random() * 0.004,
      c: Math.random() > 0.5 ? "#22d3ee" : "#ff37c7",
      len: 0.06 + Math.random() * 0.16,
    }));

    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let t = 0;

    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, w, h);

      // sky
      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, "#05030f");
      sky.addColorStop(0.45, "#160a33");
      sky.addColorStop(0.78, "#3b1063");
      sky.addColorStop(1, "#7a1d6b");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

      // stars
      for (const s of stars) {
        const a = 0.35 + 0.45 * Math.sin(t * 0.02 + s.p);
        ctx.globalAlpha = Math.max(a, 0.05);
        ctx.fillStyle = s.i % 7 === 0 ? "#ff8ce0" : "#cfe9ff";
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // moon glow
      const g = ctx.createRadialGradient(w * 0.78, h * 0.18, 0, w * 0.78, h * 0.18, h * 0.35);
      g.addColorStop(0, "rgba(120,60,255,0.30)");
      g.addColorStop(1, "rgba(120,60,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // skyline layers
      layers.forEach((layer, li) => {
        const off = ((t * layer.speed) % 1.4) - 0.2;
        const base = h * layer.y;
        for (const b of layer.b) {
          const bx = ((b.x - off * (li + 1) * 0.12 + 2) % 1.6) * w - w * 0.15;
          const bw = b.w * w;
          const bh = b.h * h;
          ctx.fillStyle = layer.col;
          ctx.fillRect(bx, base - bh, bw, bh);

          // neon roof edge
          ctx.strokeStyle = layer.glow;
          ctx.globalAlpha = 0.55 + 0.35 * Math.sin(t * 0.03 + b.lit * 8);
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(bx, base - bh);
          ctx.lineTo(bx + bw, base - bh);
          ctx.stroke();
          ctx.globalAlpha = 1;

          // windows
          if (li >= 1) {
            const cols = Math.max(2, Math.floor(bw / 9));
            const rows = Math.max(3, Math.floor(bh / 14));
            for (let cx = 0; cx < cols; cx++) {
              for (let cy = 0; cy < rows; cy++) {
                const seed = (cx * 31 + cy * 17 + b.lit * 100) | 0;
                if ((seed + Math.floor(t / 60)) % 5 === 0) continue;
                if (seed % 3 === 0) continue;
                ctx.fillStyle = seed % 11 === 0 ? "#ff6a3d" : b.accent > 0.6 ? "#7fe6ff" : "#ffbf6b";
                ctx.globalAlpha = 0.18 + ((seed % 7) / 7) * 0.5;
                ctx.fillRect(bx + 4 + cx * 9, base - bh + 8 + cy * 14, 3, 5);
              }
            }
            ctx.globalAlpha = 1;
          }
        }
      });

      // road glow
      const road = ctx.createLinearGradient(0, h * 0.86, 0, h);
      road.addColorStop(0, "rgba(255,55,199,0.05)");
      road.addColorStop(1, "rgba(255,120,220,0.30)");
      ctx.fillStyle = road;
      ctx.fillRect(0, h * 0.86, w, h * 0.14);

      // light trails
      for (const tr of trails) {
        tr.x += tr.v;
        if (tr.x > 1.3) tr.x = -0.3;
        const x = tr.x * w;
        const y = tr.y * h;
        const lg = ctx.createLinearGradient(x - tr.len * w, y, x, y);
        lg.addColorStop(0, "rgba(0,0,0,0)");
        lg.addColorStop(1, tr.c);
        ctx.strokeStyle = lg;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.75;
        ctx.beginPath();
        ctx.moveTo(x - tr.len * w, y);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // perspective grid
      ctx.strokeStyle = "rgba(34,211,238,0.18)";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 22; i++) {
        const p = i / 22;
        ctx.beginPath();
        ctx.moveTo(w * 0.5, h * 0.9);
        ctx.lineTo(p * w * 2 - w * 0.5, h);
        ctx.stroke();
      }
      for (let i = 0; i < 7; i++) {
        const p = ((i + ((t * 0.004) % 1)) / 7) ** 2.4;
        ctx.globalAlpha = 0.25 * p + 0.05;
        ctx.beginPath();
        ctx.moveTo(0, h * 0.9 + p * h * 0.1);
        ctx.lineTo(w, h * 0.9 + p * h * 0.1);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}