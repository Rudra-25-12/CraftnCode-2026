import { createFileRoute, Link } from "@tanstack/react-router";
import { ArcadeStage } from "@/components/ArcadeStage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CraftnCode'26 — Overnight Hackathon" },
      {
        name: "description",
        content:
          "CraftnCode'26 is a 24-hour overnight club hackathon. Build through the night, ship at dawn.",
      },
      { property: "og:title", content: "CraftnCode'26 — Overnight Hackathon" },
      {
        property: "og:description",
        content: "A 24-hour overnight hackathon. Build through the night, ship at dawn.",
      },
    ],
  }),
  component: Index,
});

const stats = [
  { k: "24", v: "Hours Non-Stop" },
  { k: "05", v: "Problem Tracks" },
  { k: "∞", v: "Coffee Refills" },
];

const schedule = [
  { t: "20:00", d: "Check-in, team lock-in, opening brief" },
  { t: "21:30", d: "Problem statements go live. Clock starts." },
  { t: "01:00", d: "Midnight fuel run + mentor rounds" },
  { t: "04:30", d: "Debug hour. The city is asleep, you are not." },
  { t: "09:00", d: "Freeze, demo, judging" },
];

function Index() {
  return (
    <>
    <section className="scanlines relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <ArcadeStage />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent,oklch(0.08_0.05_295/0.85))]" />

      <div className="relative z-10 px-6 text-center">
        <p className="font-display text-[10px] tracking-[0.5em] text-neon-cyan/90 md:text-xs">
          CYBER SPACE CLUB PRESENTS
        </p>

        <h1 className="poster-title animate-flicker mt-5 text-[16vw] md:text-[10vw]">
          <span className="block">CRAFT N</span>
          <span className="block">CODE&#39;26</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl font-display text-[11px] tracking-[0.28em] text-foreground/80 md:text-sm">
          AN OVERNIGHT HACKATHON · DUSK TO DAWN
        </p>
        <p className="mx-auto mt-3 max-w-lg text-base text-muted-foreground">
          {"\n"}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/submit"
            className="rounded-sm bg-[image:var(--gradient-neon)] px-8 py-3 font-display text-[11px] tracking-[0.3em] text-primary-foreground shadow-[var(--shadow-neon)] transition-transform hover:scale-[1.03]"
          >
            ENTER THE NIGHT
          </Link>
          <Link
            to="/problem-statements"
            className="rounded-sm border border-border px-8 py-3 font-display text-[11px] tracking-[0.3em] text-foreground/85 transition-colors hover:border-neon-cyan hover:text-neon-cyan"
          >
            PROBLEM STATEMENTS
          </Link>
        </div>

        <div className="mx-auto mt-14 grid max-w-lg grid-cols-3 gap-3">
          {stats.map((s) => (
            <div key={s.v} className="glass-panel animate-float-slow rounded-sm px-3 py-4">
              <div className="font-display text-2xl text-neon-cyan">{s.k}</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="relative overflow-hidden border-t border-border/60 px-6 py-16 md:px-24">
      <div className="mx-auto grid max-w-4xl items-center gap-10 md:grid-cols-2">
        <img
          src={arcadeCabinet}
          alt="Retro neon arcade cabinet for CraftnCode'26"
          width={1024}
          height={1280}
          loading="lazy"
          decoding="async"
          className="mx-auto w-56 drop-shadow-[0_0_40px_oklch(0.7_0.26_340/0.45)] md:w-72"
        />
        <div>
          <p className="font-display text-[10px] tracking-[0.4em] text-neon-magenta">INSERT COIN</p>
          <h2 className="poster-title mt-3 text-4xl md:text-5xl">PRESS START</h2>
          <p className="mt-4 text-foreground/80">
            One cabinet, one night, endless continues. Grab your crew, pick a track and play the
            longest level of the year.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 font-display text-[10px] tracking-[0.25em]">
            <span className="glass-panel rounded-sm px-4 py-2 text-neon-cyan">TEAM 2-4</span>
            <span className="glass-panel rounded-sm px-4 py-2 text-neon-cyan">PRIZE ₹50K</span>
            <span className="glass-panel rounded-sm px-4 py-2 text-neon-cyan">15 / 08 / 26</span>
          </div>
        </div>
      </div>
    </section>

    <section className="relative border-t border-border/60 px-6 py-20 md:px-24">
      <div className="mx-auto max-w-3xl">
        <p className="font-display text-[10px] tracking-[0.4em] text-neon-cyan">STAGE SELECT</p>
        <h2 className="mt-3 text-3xl neon-text md:text-4xl">Run of the Night</h2>
        <ol className="mt-10 space-y-3">
          {schedule.map((i, idx) => (
            <li
              key={i.t}
              className="glass-panel flex items-center gap-5 rounded-sm px-5 py-4 transition-colors hover:border-neon-cyan/60"
            >
              <span className="font-display text-[10px] text-neon-magenta/70">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="w-16 shrink-0 font-display text-sm text-neon-cyan">{i.t}</span>
              <span className="text-foreground/85">{i.d}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
    </>
  );
}
