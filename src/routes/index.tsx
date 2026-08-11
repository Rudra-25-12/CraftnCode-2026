import { createFileRoute, Link } from "@tanstack/react-router";
import { ArcadeStage } from "@/components/ArcadeStage";
import { TitleRunner } from "@/components/TitleRunner";
import { useState } from "react";
import { useLoginOverlay } from "@/components/SiteFrame";
import { useSession } from "@/hooks/useSession";
import bgAsset from "@/assets/background.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Craft N Code'26 — Presented by CSC X IIIT Bhubaneswar" },
      {
        name: "description",
        content:
          "Craft N Code is a 24-hour overnight club hackathon. Build through the night, ship at dawn.",
      },
      { property: "og:title", content: "Craft N Code'26 — Presented by CSC X IIIT Bhubaneswar" },
      {
        property: "og:description",
        content: "A 24-hour overnight hackathon. Build through the night, ship at dawn.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const openLogin = useLoginOverlay();
  const { session } = useSession();
  const [revealed, setRevealed] = useState(false);
  return (
    <>
    <section className="scanlines relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-bottom bg-no-repeat"
        style={{ backgroundImage: `url(${bgAsset.url})` }}
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

    </>
  );
}
