import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/sponsors")({
  head: () => ({
    meta: [
      { title: "Sponsors — CraftnCode'26" },
      { name: "description", content: "Partners powering the CraftnCode'26 overnight hackathon." },
      { property: "og:title", content: "Sponsors — CraftnCode'26" },
      { property: "og:description", content: "Partners powering our overnight hackathon." },
    ],
  }),
  component: Sponsors,
});

const tiers = [
  { tier: "TITLE PARTNER", names: ["Your Brand Here"] },
  { tier: "POWERED BY", names: ["Slot Open", "Slot Open"] },
  { tier: "COMMUNITY", names: ["Slot Open", "Slot Open", "Slot Open"] },
];

function Sponsors() {
  return (
    <PageShell eyebrow="POWERED BY" title="Sponsors">
      <p>
        Want your logo glowing over a hall of 200 builders at 3 AM? Write to{" "}
        <a className="text-neon-cyan underline-offset-4 hover:underline" href="mailto:sponsors@craftncode.dev">
          sponsors@craftncode.dev
        </a>
        .
      </p>
      {tiers.map((t) => (
        <div key={t.tier}>
          <h2 className="font-display text-[10px] tracking-[0.35em] text-neon-magenta">{t.tier}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {t.names.map((n, i) => (
              <div
                key={n + i}
                className="glass-panel flex h-24 items-center justify-center rounded-sm font-display text-[11px] tracking-[0.2em] text-muted-foreground"
              >
                {n}
              </div>
            ))}
          </div>
        </div>
      ))}
    </PageShell>
  );
}