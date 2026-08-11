import { createFileRoute } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/problem-statements")({
  head: () => ({
    meta: [
      { title: "Problem Statements — Craft N Code" },
      { name: "description", content: "The five tracks teams can build against at Craft N Code." },
      { property: "og:title", content: "Problem Statements — Craft N Code" },
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
    hue: "oklch(0.93 0.2 108)",
  },
  {
    id: "PS-02",
    title: "Night Ops",
    body: "Tooling for people who work odd hours — sleep, safety, focus, logistics.",
    hue: "oklch(0.85 0.15 197)",
  },
  {
    id: "PS-03",
    title: "Signal / Noise",
    body: "Cut through information overload with search, summarisation or ranking.",
    hue: "oklch(0.7 0.26 340)",
  },
  {
    id: "PS-04",
    title: "Open Track",
    body: "Anything you can justify in a 3-minute demo. Surprise the judges.",
    hue: "oklch(0.78 0.19 45)",
  },
  {
    id: "PS-05",
    title: "Hardware Hack",
    body: "Sensors, microcontrollers, ugly wiring. Physical output required.",
    hue: "oklch(0.72 0.2 295)",
  },
];

function Problems() {
  return (
    <PageShell eyebrow="PICK YOUR TRACK" title="Problem Statements">
      <p className="font-display text-[10px] leading-relaxed tracking-[0.22em] text-foreground/70">
        CHOOSE ONE TRACK AT CHECK-IN. SWITCHING AFTER THE CLOCK STARTS COSTS 30 MINUTES.
      </p>
      <div className="pellet-row" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} style={{ animationDelay: `${i * 0.08}s` }} />
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {tracks.map((t, i) => (
          <article
            key={t.id}
            className="arcade-card group p-5"
            style={{ "--pill": t.hue } as CSSProperties}
          >
            <div className="flex items-center justify-between">
              <span
                className="font-display text-[10px] tracking-[0.32em]"
                style={{ color: t.hue, textShadow: `0 0 12px color-mix(in oklab, ${t.hue} 55%, transparent)` }}
              >
                {t.id}
              </span>
              <span className="font-display text-[9px] tracking-[0.28em] text-foreground/40">
                {String((i + 1) * 100).padStart(4, "0")} PTS
              </span>
            </div>
            <h2
              className="mt-3 font-display text-base uppercase tracking-[0.14em] text-foreground transition-colors"
              style={{ textShadow: "3px 3px 0 oklch(0.05 0.01 300)" }}
            >
              {t.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
            <div
              className="mt-4 h-[3px] w-full opacity-40 transition-opacity group-hover:opacity-100"
              style={{ background: t.hue }}
            />
          </article>
        ))}
      </div>
    </PageShell>
  );
}