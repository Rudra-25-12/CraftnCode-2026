import type { ReactNode } from "react";

export function PageShell({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(900px_500px_at_20%_-10%,oklch(0.35_0.2_300/0.5),transparent),radial-gradient(700px_500px_at_90%_10%,oklch(0.4_0.18_200/0.35),transparent)]" />
      <div className="relative mx-auto max-w-4xl px-6 pb-24 pt-28 md:px-24">
        <p className="font-display text-[10px] tracking-[0.4em] text-neon-cyan">{eyebrow}</p>
        <h1 className="mt-3 text-4xl md:text-5xl neon-text">{title}</h1>
        <div className="mt-10 space-y-6 text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}