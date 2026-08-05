import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import cscLogo from "@/assets/csc-logo.webp.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — CraftnCode'26" },
      { name: "description", content: "Who runs CraftnCode'26 and why we hack all night." },
      { property: "og:title", content: "About Us — CraftnCode'26" },
      { property: "og:description", content: "Who runs CraftnCode'26 and why we hack all night." },
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
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <img
          src={cscLogo.url}
          alt="Cyber Space Club logo"
          className="h-28 w-28 shrink-0 rounded-sm"
          width={256}
          height={254}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <p className="text-lg">
          We aim to build an active society for students interested in the domain of cyber security
          and uplift this culture in MUJ.
        </p>
      </div>
      <p>
        For more info visit our website:{" "}
        <a
          href="https://www.cscmuj.com"
          target="_blank"
          rel="noreferrer"
          className="text-neon-cyan underline underline-offset-4"
        >
          cscmuj.com
        </a>
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