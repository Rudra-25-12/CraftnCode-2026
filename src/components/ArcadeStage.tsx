import { useEffect, useRef } from "react";

type Ghost = { x: number; y: number; dir: number; color: string; speed: number };
type Invader = { x: number; y: number; c: string; phase: number; drift: number };

/**
 * 8-bit arcade hero backdrop: a scrolling pellet maze, a chomping Pac-Man
 * chased by ghosts, drifting space invaders and a magenta perspective floor.
 * Everything is drawn on a chunky pixel grid to keep the retro CRT feel.
 */
export function ArcadeStage() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const LIME = "#c8f31d";
    const CYAN = "#22d3ee";
    const MAGENTA = "#ff37c7";

    const ghosts: Ghost[] = [
      { x: -0.16, y: 0, dir: 1, color: "#ff4d4d", speed: 0.0016 },
      { x: -0.26, y: 0, dir: 1, color: "#ffb3de", speed: 0.0016 },
      { x: -0.36, y: 0, dir: 1, color: CYAN, speed: 0.0016 },
      { x: -0.46, y: 0, dir: 1, color: "#ffa64d", speed: 0.0016 },
    ];

    const invaders: Invader[] = Array.from({ length: 9 }, (_, i) => ({
      x: 0.06 + ((i * 0.11) % 0.9),
      y: 0.08 + ((i * 37) % 5) * 0.055,
      c: [MAGENTA, "#a855f7", "#ff8a3d", CYAN][i % 4] as string,
      phase: i * 0.7,
      drift: (i % 2 === 0 ? 1 : -1) * 0.00035,
    }));

    let pac = { x: 0.05, y: 0 };
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

    // 11x8 invader sprite grid
    const INVADER = [
      "00100000100",
      "00010001000",
      "00111111100",
      "01101110110",
      "11111111111",
      "10111111101",
      "10100000101",
      "00011011000",
    ];

    const drawInvader = (x: number, y: number, px: number, color: string, alt: boolean) => {
      ctx.fillStyle = color;
      for (let r = 0; r < INVADER.length; r++) {
        const row = INVADER[r] as string;
        for (let c = 0; c < row.length; c++) {
          if (row[c] !== "1") continue;
          if (alt && (r === 7 || r === 6) && (c === 0 || c === 10)) continue;
          ctx.fillRect(x + c * px, y + r * px, px, px);
        }
      }
    };

    const drawGhost = (x: number, y: number, s: number, color: string, t: number) => {
      const px = s / 8;
      ctx.fillStyle = color;
      // dome
      ctx.beginPath();
      ctx.arc(x + s / 2, y + s * 0.42, s * 0.42, Math.PI, 0);
      ctx.lineTo(x + s * 0.92, y + s * 0.86);
      // pixel skirt
      const wob = Math.floor(t / 12) % 2 === 0 ? 0 : px;
      for (let i = 3; i >= 0; i--) {
        const bx = x + s * 0.08 + (i * s * 0.84) / 4;
        ctx.lineTo(bx + (s * 0.84) / 4, y + s * 0.86 + (i % 2 ? px : wob));
        ctx.lineTo(bx, y + s * 0.86 + (i % 2 ? px : wob));
      }
      ctx.closePath();
      ctx.fill();
      // eyes
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(x + s * 0.24, y + s * 0.3, px * 1.6, px * 2);
      ctx.fillRect(x + s * 0.58, y + s * 0.3, px * 1.6, px * 2);
      ctx.fillStyle = "#1b2ad0";
      ctx.fillRect(x + s * 0.3, y + s * 0.42, px, px);
      ctx.fillRect(x + s * 0.64, y + s * 0.42, px, px);
    };

    let raf = 0;
    let t = 0;

    const draw = () => {
      t += 1;
      const lane = h * 0.62;

      ctx.clearRect(0, 0, w, h);

      // deep space backdrop
      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, "#05030d");
      bg.addColorStop(0.6, "#0a0518");
      bg.addColorStop(1, "#1a0426");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // starfield (pixel squares, no antialiasing)
      for (let i = 0; i < 90; i++) {
        const sx = ((i * 97) % 100) / 100;
        const sy = ((i * 53) % 60) / 100;
        const tw = 0.25 + 0.5 * Math.abs(Math.sin(t * 0.02 + i));
        ctx.globalAlpha = tw;
        ctx.fillStyle = i % 9 === 0 ? MAGENTA : "#e8f0ff";
        ctx.fillRect(Math.round(sx * w), Math.round(sy * h), 2, 2);
      }
      ctx.globalAlpha = 1;

      // perspective neon floor
      const horizon = h * 0.72;
      ctx.strokeStyle = "rgba(255,55,199,0.35)";
      ctx.lineWidth = 1;
      for (let i = -14; i <= 14; i++) {
        ctx.beginPath();
        ctx.moveTo(w / 2 + i * (w / 26) * 0.16, horizon);
        ctx.lineTo(w / 2 + i * (w / 4), h);
        ctx.stroke();
      }
      for (let i = 0; i < 12; i++) {
        const p = ((i + ((t * 0.006) % 1)) / 12) ** 2.6;
        ctx.globalAlpha = 0.15 + p * 0.5;
        const yy = horizon + p * (h - horizon);
        ctx.beginPath();
        ctx.moveTo(0, yy);
        ctx.lineTo(w, yy);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // maze pellet lane
      const step = 26;
      const off = (t * 0.6) % step;
      ctx.fillStyle = LIME;
      for (let x = -step; x < w + step; x += step) {
        const px = x - off;
        const eaten = px < pac.x * w + 6;
        ctx.globalAlpha = eaten ? 0.08 : 0.85;
        const big = Math.round(px / step) % 8 === 0;
        const s = big ? 8 : 4;
        ctx.fillRect(Math.round(px), Math.round(lane - s / 2), s, s);
      }
      ctx.globalAlpha = 1;

      // lane walls (classic blue maze pipes)
      ctx.strokeStyle = "rgba(80,110,255,0.55)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, lane - 46);
      ctx.lineTo(w, lane - 46);
      ctx.moveTo(0, lane + 46);
      ctx.lineTo(w, lane + 46);
      ctx.stroke();

      // pac-man
      pac.x += 0.0019;
      if (pac.x > 1.18) {
        pac.x = -0.14;
        ghosts.forEach((g, i) => (g.x = -0.16 - i * 0.1));
      }
      const size = Math.max(22, Math.min(h * 0.075, 46));
      const mouth = Math.abs(Math.sin(t * 0.16)) * 0.32 + 0.02;
      const cx = pac.x * w;
      ctx.save();
      ctx.shadowColor = LIME;
      ctx.shadowBlur = 24;
      ctx.fillStyle = LIME;
      ctx.beginPath();
      ctx.moveTo(cx, lane);
      ctx.arc(cx, lane, size / 2, mouth * Math.PI, (2 - mouth) * Math.PI);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // ghosts trailing pac-man
      ghosts.forEach((g, i) => {
        g.x += 0.0019;
        const gx = (pac.x - 0.11 - i * 0.085) * w;
        const bob = Math.sin(t * 0.08 + i) * 2;
        drawGhost(gx - size / 2, lane - size / 2 + bob, size, g.color, t + i * 9);
      });

      // space invaders drifting above
      const alt = Math.floor(t / 26) % 2 === 0;
      invaders.forEach((inv) => {
        inv.x += inv.drift;
        if (inv.x > 1.02) inv.x = -0.05;
        if (inv.x < -0.06) inv.x = 1.0;
        const px = Math.max(2, Math.round(Math.min(w, 1200) / 380));
        const y = inv.y * h + Math.sin(t * 0.03 + inv.phase) * 6;
        ctx.globalAlpha = 0.85;
        drawInvader(Math.round(inv.x * w), Math.round(y), px, inv.c, alt);
        ctx.globalAlpha = 1;
      });

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