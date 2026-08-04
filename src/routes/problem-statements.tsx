import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/problem-statements")({
  head: () => ({
    meta: [
      { title: "Problem Statements — Rewind & Recode" },
      { name: "description", content: "The five tracks teams can build against at Rewind & Recode." },
      { property: "og:title", content: "Problem Statements — Rewind & Recode" },
      { property: "og:description", content: "The five tracks teams can build against overnight." },
    ],
  }),
  component: Problems,
});

const tracks = [
  {
    id: "PS-01",
    title: "Rewind the Legacy",
    body: "Take an outdated tool your campus still depends on and rebuild it for 2026.",
  },
  {
    id: "PS-02",
    title: "Night Ops",
    body: "Tooling for people who work odd hours — sleep, safety, focus, logistics.",
  },
  {
    id: "PS-03",
    title: "Signal / Noise",
    body: "Cut through information overload with search, summarisation or ranking.",
  },
  {
    id: "PS-04",
    title: "Open Track",
    body: "Anything you can justify in a 3-minute demo. Surprise the judges.",
  },
  {
    id: "PS-05",
    title: "Hardware Hack",
    body: "Sensors, microcontrollers, ugly wiring. Physical output required.",
  },
];

function Problems() {
  return (
    <PageShell eyebrow="PICK YOUR TRACK" title="Problem Statements">
      <p>Choose one track at check-in. Switching after the clock starts costs you 30 minutes.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {tracks.map((t) => (
          <article
            key={t.id}
            className="glass-panel group rounded-sm p-5 transition-shadow hover:shadow-[var(--shadow-neon)]"
          >
            <span className="font-display text-[10px] tracking-[0.3em] text-neon-magenta">
              {t.id}
            </span>
            <h2 className="mt-2 text-lg text-foreground group-hover:text-neon-cyan">{t.title}</h2>
            <p className="mt-2 text-sm">{t.body}</p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}