import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import cscLogo from "@/assets/csc-logo.webp";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — CraftnCode'26" },
      { name: "description", content: "Who runs CraftnCode'26 and why we hack all night." },
      { property: "og:title", content: "About Us — CraftnCode'26" },
      { property: "og:description", content: "Who runs CraftnCode'26 and why we hack all night." },
    ],
    links: [{ rel: "preload", as: "image", href: cscLogo, fetchpriority: "high" }],
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
  const [logoFailed, setLogoFailed] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  return (
    <PageShell eyebrow="WHO WE ARE" title="About Us">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <div className="relative h-28 w-28 shrink-0">
          {(logoFailed || !logoLoaded) && (
            <div
              role={logoFailed ? "img" : undefined}
              aria-label={logoFailed ? "Cyber Space Club logo" : undefined}
              aria-hidden={logoFailed ? undefined : true}
              className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-sm border border-neon-cyan/40 bg-[color-mix(in_oklab,var(--neon-cyan)_8%,transparent)] shadow-[var(--shadow-neon)]"
            >
              <ShieldCheck className="h-8 w-8 text-neon-cyan" strokeWidth={1.25} />
              <span className="font-display text-[10px] tracking-[0.3em] text-neon-cyan">CSC</span>
            </div>
          )}
          {!logoFailed && (
            <img
              src={cscLogo}
              alt="Cyber Space Club logo"
              className={`absolute inset-0 h-28 w-28 rounded-sm transition-opacity duration-300 ${
                logoLoaded ? "opacity-100" : "opacity-0"
              }`}
              width={256}
              height={254}
              sizes="112px"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              onLoad={() => setLogoLoaded(true)}
              onError={() => setLogoFailed(true)}
            />
          )}
        </div>
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