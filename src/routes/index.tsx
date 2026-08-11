import { createFileRoute, Link } from "@tanstack/react-router";
import { ArcadeStage } from "@/components/ArcadeStage";
import { TitleRunner } from "@/components/TitleRunner";
import { useState } from "react";
import { useLoginOverlay } from "@/components/SiteFrame";
import { useSession } from "@/hooks/useSession";
import bgAsset from "@/assets/background.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Craft N Code — Overnight Hackathon" },
      {
        name: "description",
        content:
          "Craft N Code is a 24-hour overnight club hackathon. Build through the night, ship at dawn.",
      },
      { property: "og:title", content: "Craft N Code — Overnight Hackathon" },
      {
        property: "og:description",
        content: "A 24-hour overnight hackathon. Build through the night, ship at dawn.",
      },
    ],
  }),
  component: Index,
});

const schedule = [
  { t: "20:00", d: "Check-in, team lock-in, opening brief" },
  { t: "21:30", d: "Problem statements go live. Clock starts." },
  { t: "01:00", d: "Midnight fuel run + mentor rounds" },
  { t: "04:30", d: "Debug hour. The city is asleep, you are not." },
  { t: "09:00", d: "Freeze, demo, judging" },
];

function Index() {
  const openLogin = useLoginOverlay();
  const { session } = useSession();
  const [revealed, setRevealed] = useState(false);
  return (
    <>
    <section className="scanlines relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-bottom bg-no-repeat"
        style={{ backgroundImage: `url(${bgAsset})` }}
      />
      <ArcadeStage />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent,oklch(0.08_0.05_295/0.85))]" />

      <div className="relative z-10 px-6 text-center">
        <div>
          <TitleRunner onDone={() => setRevealed(true)} />
        </div>

        <div
          className={`mt-9 flex flex-wrap items-center justify-center gap-4 transition-opacity duration-700 ${
            revealed ? "opacity-100" : "opacity-0"
          }`}
        >
          {!session ? (
            <button
              type="button"
              onClick={openLogin}
              className="rounded-sm bg-[image:var(--gradient-neon)] px-10 py-3 text-center font-display text-[11px] tracking-[0.3em] text-primary-foreground shadow-[var(--shadow-neon)] transition-transform hover:scale-[1.04]"
            >
              LOGIN
            </button>
          ) : null}
          <Link
            to="/problem-statements"
            className="rounded-sm border border-border px-10 py-3 text-center font-display text-[11px] tracking-[0.3em] text-foreground/85 transition-colors hover:border-neon-cyan hover:text-neon-cyan"
          >
            PROBLEM STATEMENTS
          </Link>
        </div>
      </div>
    </section>

    <section id="event-flow" className="relative scroll-mt-24 border-t border-border/60 px-6 py-20 md:px-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-display text-[10px] tracking-[0.4em] text-neon-cyan">STAGE SELECT</p>
        <h2 className="mt-3 text-3xl neon-text md:text-4xl">Run of the Night</h2>
        <ol className="mt-10 space-y-3">
          {schedule.map((i, idx) => (
            <li
              key={i.t}
              className="glass-panel flex items-center gap-5 rounded-sm px-5 py-4 text-left transition-colors hover:border-neon-cyan/60"
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
