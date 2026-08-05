import { createFileRoute, Link } from "@tanstack/react-router";
import { NeonCity } from "@/components/NeonCity";

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

function Index() {
  return (
    <section className="scanlines relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <NeonCity />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent,oklch(0.08_0.05_295/0.85))]" />

      <div className="relative z-10 px-6 text-center">
        <p className="font-display text-[10px] tracking-[0.5em] text-neon-cyan/90 md:text-xs">
          CYBER SPACE CLUB PRESENTS
        </p>

        <h1 className="animate-flicker mt-5 font-display text-[13vw] leading-[0.85] md:text-[8.5vw]">
          <span className="neon-text">REWIND</span>
          <span className="block text-2xl tracking-[0.6em] text-muted-foreground md:text-3xl">
            &amp;
          </span>
          <span className="neon-text">RECODE</span>
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
  );
}
