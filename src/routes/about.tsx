import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Rewind & Recode" },
      { name: "description", content: "Who runs Rewind & Recode and why we hack all night." },
      { property: "og:title", content: "About Us — Rewind & Recode" },
      { property: "og:description", content: "Who runs Rewind & Recode and why we hack all night." },
    ],
  }),
  component: About,
});

const timeline = [
  { t: "20:00", d: "Check-in, team lock-in, opening brief" },
  { t: "21:30", d: "Problem statements go live. Clock starts." },
  { t: "01:00", d: "Midnight fuel run + mentor rounds" },
  { t: "04:30", d: "Debug hour. The city is asleep, you are not." },
  { t: "09:00", d: "Freeze, demo, judging" },
];

function About() {
  return (
    <PageShell eyebrow="WHO WE ARE" title="About Us">
      <p className="text-lg">
        We are a student-run coding club that believes the best builds happen after midnight.
        Rewind &amp; Recode is our flagship overnight hackathon: no lecture-hall energy, no filler
        sessions — just teams, terminals and a deadline at sunrise.
      </p>
      <p>
        Everything runs in one hall. Mentors float, food arrives on request, and the only rule is
        that whatever you ship must be built that night.
      </p>
      <div className="glass-panel rounded-sm p-6">
        <h2 className="font-display text-xs tracking-[0.3em] text-neon-cyan">RUN OF THE NIGHT</h2>
        <ul className="mt-5 space-y-4">
          {timeline.map((i) => (
            <li key={i.t} className="flex gap-5">
              <span className="w-16 shrink-0 font-display text-sm text-neon-magenta">{i.t}</span>
              <span className="text-foreground/85">{i.d}</span>
            </li>
          ))}
        </ul>
      </div>
    </PageShell>
  );
}