import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArcadeStage } from "@/components/ArcadeStage";
import cscLogo from "@/assets/csc-logo.webp";
import iiitLogo from "@/assets/iiit-logo.webp";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Player Login — CraftnCode'26" },
      {
        name: "description",
        content:
          "Insert a coin and log in to CraftnCode'26, the overnight arcade hackathon by Cyber Space Club and IIIT Bhubaneswar.",
      },
      { property: "og:title", content: "Player Login — CraftnCode'26" },
      {
        property: "og:description",
        content: "Press start, enter your team name and password, and insert a coin to play.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const [team, setTeam] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function insertCoin() {
    if (!team.trim() || !password.trim()) {
      setError("ENTER TEAM NAME AND PASSWORD");
      return;
    }
    setError("");
    if (typeof window !== "undefined") {
      window.localStorage.setItem("cnc-player", team.trim());
    }
    navigate({ to: "/" });
  }

  return (
    <section className="scanlines relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-14">
      <ArcadeStage />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent,oklch(0.08_0.05_295/0.88))]" />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center">
        <div
          className={`flex items-center gap-5 transition-all duration-500 md:gap-8 ${
            started ? "pointer-events-none -translate-y-4 opacity-0" : "opacity-100"
          }`}
        >
          <img
            src={cscLogo}
            alt="Cyber Space Club logo"
            width={96}
            height={96}
            className="h-14 w-14 object-contain drop-shadow-[0_0_18px_oklch(0.7_0.26_340/0.5)] md:h-20 md:w-20"
          />
          <span className="font-display text-xl text-neon-magenta md:text-2xl">X</span>
          <img
            src={iiitLogo}
            alt="IIIT Bhubaneswar logo"
            width={96}
            height={96}
            className="h-14 w-14 rounded-full bg-white object-contain p-1 drop-shadow-[0_0_18px_oklch(0.85_0.18_200/0.35)] md:h-20 md:w-20"
          />
        </div>

        <h1
          className={`poster-title mt-6 text-center text-4xl leading-[0.95] transition-all duration-500 md:text-6xl ${
            started ? "pointer-events-none -translate-y-4 opacity-0" : "opacity-100"
          }`}
        >
          <span className="block">CRAFT N</span>
          <span className="block">CODE&#39;26</span>
        </h1>

        {/* Full-size arcade cabinet */}
        <div
          className={`mt-8 w-full max-w-sm origin-[50%_34%] transition-transform duration-[900ms] ease-out ${
            started ? "scale-[1.55] md:scale-[1.75]" : "scale-100"
          }`}
        >
          {/* Marquee */}
          <div className="mx-auto w-[92%] rounded-t-[2.5rem] border-4 border-b-0 border-neon-magenta/70 bg-[image:var(--gradient-neon)] px-4 py-3 shadow-[var(--shadow-neon)]">
            <p className="text-center font-display text-[11px] tracking-[0.4em] text-primary-foreground">
              PLAYER LOGIN
            </p>
          </div>

          {/* Cabinet body */}
          <div className="relative border-4 border-neon-magenta/70 bg-[oklch(0.32_0.16_320)] px-4 pb-5 pt-5 shadow-[var(--shadow-neon)]">
            {/* Side art strips */}
            <span className="pointer-events-none absolute inset-y-4 left-1 w-1.5 rounded bg-neon-cyan/60" />
            <span className="pointer-events-none absolute inset-y-4 right-1 w-1.5 rounded bg-neon-cyan/60" />

            {/* Screen bezel */}
            <div className="mx-auto w-[90%] overflow-hidden rounded-xl border-[6px] border-[oklch(0.22_0.08_300)] bg-[oklch(0.09_0.05_290)] p-5">
              {!started ? (
                <div className="flex min-h-[210px] flex-col items-center justify-center gap-6 text-center">
                  <p className="animate-pulse font-display text-[10px] tracking-[0.35em] text-neon-cyan">
                    READY PLAYER ONE
                  </p>
                  <button
                    type="button"
                    onClick={() => setStarted(true)}
                    className="rounded-sm bg-[image:var(--gradient-neon)] px-8 py-3 font-display text-[11px] tracking-[0.3em] text-primary-foreground shadow-[var(--shadow-neon)] transition-transform hover:scale-[1.04]"
                  >
                    PRESS START
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    insertCoin();
                  }}
                  className="flex min-h-[210px] flex-col justify-center gap-3"
                >
                  <p className="text-center font-display text-[8px] tracking-[0.35em] text-neon-magenta">
                    ENTER PLAYER DATA
                  </p>
                  <label className="block">
                    <span className="font-display text-[9px] tracking-[0.3em] text-neon-cyan">
                      TEAM NAME
                    </span>
                    <input
                      value={team}
                      onChange={(e) => setTeam(e.target.value)}
                      maxLength={60}
                      autoFocus
                      className="mt-1.5 w-full rounded-sm border border-border bg-background/60 px-2 py-1.5 font-display text-[10px] tracking-[0.2em] text-foreground outline-none focus:border-neon-cyan"
                    />
                  </label>
                  <label className="block">
                    <span className="font-display text-[9px] tracking-[0.3em] text-neon-cyan">
                      PASSWORD
                    </span>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      maxLength={100}
                      className="mt-1.5 w-full rounded-sm border border-border bg-background/60 px-2 py-1.5 font-display text-[10px] tracking-[0.2em] text-foreground outline-none focus:border-neon-cyan"
                    />
                  </label>
                  {error ? (
                    <p className="font-display text-[8px] tracking-[0.25em] text-neon-magenta">
                      {error}
                    </p>
                  ) : null}
                  <button
                    type="submit"
                    className="mt-1 animate-pulse rounded-sm border border-neon-cyan/70 px-4 py-2 font-display text-[9px] tracking-[0.3em] text-neon-cyan transition-colors hover:bg-neon-cyan hover:text-primary-foreground"
                  >
                    ◉ INSERT A COIN
                  </button>
                </form>
              )}
            </div>

            {/* Control deck */}
            <div className="mt-4 flex items-center justify-center gap-5 rounded-md border-2 border-neon-magenta/50 bg-[oklch(0.42_0.14_290)] px-5 py-4">
              <span className="h-6 w-6 rounded-full bg-[oklch(0.85_0.03_260)] shadow-inner" />
              <span className="h-4 w-10 rounded-full bg-neon-magenta/80" />
              <span className="h-4 w-10 rounded-full bg-neon-cyan/80" />
              <span className="h-6 w-6 rounded-full bg-[oklch(0.85_0.03_260)] shadow-inner" />
            </div>

            {/* Coin slot */}
            <div className="mt-4 flex items-center justify-center gap-3 rounded-md border-2 border-[oklch(0.22_0.08_300)] bg-[oklch(0.18_0.07_300)] py-3">
              <span className="h-4 w-1.5 rounded-sm bg-[oklch(0.85_0.03_260)]" />
              <span className="font-display text-[8px] tracking-[0.35em] text-neon-cyan">
                INSERT COIN
              </span>
              <span className="h-4 w-1.5 rounded-sm bg-[oklch(0.85_0.03_260)]" />
            </div>
          </div>

          {/* Base / legs */}
          <div className="mx-auto h-8 w-[96%] border-4 border-t-0 border-neon-magenta/70 bg-[oklch(0.26_0.12_310)]" />
          <div className="mx-auto flex w-[96%] justify-between">
            <span className="h-3 w-6 rounded-b bg-[oklch(0.2_0.08_300)]" />
            <span className="h-3 w-6 rounded-b bg-[oklch(0.2_0.08_300)]" />
          </div>
        </div>
      </div>
    </section>
  );
}