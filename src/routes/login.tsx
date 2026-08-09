import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArcadeStage } from "@/components/ArcadeStage";
import cscLogo from "@/assets/csc-logo.webp";
import iiitLogo from "@/assets/iiit-logo.webp";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Player Login — Craft N Code" },
      {
        name: "description",
        content:
          "Insert a coin and log in to Craft N Code, the overnight arcade hackathon by Cyber Space Club and IIIT Bhubaneswar.",
      },
      { property: "og:title", content: "Player Login — Craft N Code" },
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
          className={`poster-title-flex mt-6 text-center text-5xl transition-all duration-500 sm:text-6xl md:text-7xl lg:text-8xl ${
            started ? "pointer-events-none -translate-y-4 opacity-0" : "opacity-100"
          }`}
        >
          <span className="block">CRAFT N</span>
          <span className="block">CODE</span>
        </h1>

        {/* Full-size arcade cabinet */}
        <div
          className={`mt-8 w-full max-w-[22rem] origin-[50%_34%] transition-transform duration-[900ms] ease-out ${
            started ? "scale-[1.55] md:scale-[1.75]" : "scale-100"
          }`}
        >
          {/* Cabinet shell */}
          <div className="relative rounded-t-[1.75rem] bg-[linear-gradient(180deg,oklch(0.30_0.15_318),oklch(0.20_0.11_310)_45%,oklch(0.14_0.08_300))] px-3 pb-3 pt-3 shadow-[0_0_60px_-12px_oklch(0.7_0.26_340/0.7),inset_0_1px_0_oklch(1_0_0/0.18)] ring-1 ring-neon-magenta/60">
            {/* glossy cabinet highlight */}
            <span className="pointer-events-none absolute inset-y-3 left-3 w-6 rounded-full bg-[linear-gradient(90deg,oklch(1_0_0/0.14),transparent)]" />
            <span className="pointer-events-none absolute inset-y-3 right-3 w-6 rounded-full bg-[linear-gradient(270deg,oklch(1_0_0/0.10),transparent)]" />

            {/* Marquee */}
            <div className="relative mx-auto w-[86%] rounded-t-2xl rounded-b-sm border border-neon-magenta/70 bg-[image:var(--gradient-neon)] px-4 py-2.5 shadow-[0_0_28px_-4px_oklch(0.7_0.26_340/0.9)]">
              <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-2xl bg-[linear-gradient(180deg,oklch(1_0_0/0.35),transparent)]" />
              <p className="relative text-center font-display text-[11px] tracking-[0.4em] text-primary-foreground">
                PLAYER LOGIN
              </p>
            </div>

            {/* Screen bezel */}
            <div className="relative mx-auto mt-3 w-[92%] rounded-[1.1rem] bg-[linear-gradient(180deg,oklch(0.20_0.06_300),oklch(0.11_0.04_295))] p-2.5 shadow-[inset_0_2px_10px_oklch(0_0_0/0.7)]">
            <div className="scanlines relative overflow-hidden rounded-lg bg-[radial-gradient(120%_90%_at_50%_20%,oklch(0.14_0.06_290),oklch(0.06_0.03_285))] p-5 shadow-[inset_0_0_40px_oklch(0_0_0/0.9)]">
              <span className="pointer-events-none absolute inset-x-2 top-1 h-8 rounded-full bg-[linear-gradient(180deg,oklch(1_0_0/0.10),transparent)] blur-[2px]" />
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
            </div>

            {/* Angled control deck */}
            <div className="relative mx-auto mt-3 flex w-[104%] -translate-x-[2%] items-center justify-center gap-6 rounded-b-lg rounded-t-sm bg-[linear-gradient(180deg,oklch(0.46_0.15_305),oklch(0.30_0.12_300))] px-5 py-4 shadow-[0_10px_20px_-10px_oklch(0_0_0/0.9),inset_0_1px_0_oklch(1_0_0/0.25)]">
              {/* joystick */}
              <span className="relative flex h-8 w-8 items-end justify-center">
                <span className="absolute bottom-0 h-3 w-6 rounded-full bg-[oklch(0.16_0.05_295)]" />
                <span className="absolute bottom-2 h-4 w-1.5 rounded-sm bg-[oklch(0.75_0.02_260)]" />
                <span className="absolute bottom-4 h-5 w-5 rounded-full bg-[radial-gradient(circle_at_32%_28%,oklch(0.95_0.06_20),oklch(0.55_0.22_25))] shadow-[0_2px_6px_oklch(0_0_0/0.6)]" />
              </span>
              {/* buttons */}
              <span className="flex items-center gap-2.5">
                <span className="h-5 w-5 rounded-full bg-[radial-gradient(circle_at_32%_28%,oklch(0.95_0.12_340),oklch(0.6_0.25_340))] shadow-[0_0_10px_oklch(0.7_0.26_340/0.7),inset_0_-2px_3px_oklch(0_0_0/0.4)]" />
                <span className="h-5 w-5 rounded-full bg-[radial-gradient(circle_at_32%_28%,oklch(0.95_0.1_200),oklch(0.65_0.16_200))] shadow-[0_0_10px_oklch(0.8_0.15_200/0.6),inset_0_-2px_3px_oklch(0_0_0/0.4)]" />
                <span className="h-5 w-5 rounded-full bg-[radial-gradient(circle_at_32%_28%,oklch(0.95_0.16_110),oklch(0.72_0.2_120))] shadow-[0_0_10px_oklch(0.85_0.2_120/0.5),inset_0_-2px_3px_oklch(0_0_0/0.4)]" />
              </span>
              {/* joystick 2 */}
              <span className="relative flex h-8 w-8 items-end justify-center">
                <span className="absolute bottom-0 h-3 w-6 rounded-full bg-[oklch(0.16_0.05_295)]" />
                <span className="absolute bottom-2 h-4 w-1.5 rounded-sm bg-[oklch(0.75_0.02_260)]" />
                <span className="absolute bottom-4 h-5 w-5 rounded-full bg-[radial-gradient(circle_at_32%_28%,oklch(0.95_0.08_200),oklch(0.55_0.2_240))] shadow-[0_2px_6px_oklch(0_0_0/0.6)]" />
              </span>
            </div>

            {/* Coin door */}
            <div className="relative mx-auto mt-3 flex items-center justify-center gap-3 rounded-md bg-[linear-gradient(180deg,oklch(0.20_0.07_300),oklch(0.12_0.05_295))] py-3.5 ring-1 ring-neon-cyan/25">
              <span className="h-5 w-1.5 rounded-sm bg-[linear-gradient(180deg,oklch(0.9_0.02_260),oklch(0.6_0.02_260))] shadow-[inset_0_0_2px_oklch(0_0_0/0.6)]" />
              <span className="animate-pulse font-display text-[8px] tracking-[0.35em] text-neon-cyan">
                INSERT COIN
              </span>
              <span className="h-5 w-1.5 rounded-sm bg-[linear-gradient(180deg,oklch(0.9_0.02_260),oklch(0.6_0.02_260))] shadow-[inset_0_0_2px_oklch(0_0_0/0.6)]" />
            </div>
          </div>

          {/* Base / legs */}
          <div className="mx-auto h-6 w-[94%] rounded-b-md bg-[linear-gradient(180deg,oklch(0.18_0.09_308),oklch(0.10_0.05_300))] shadow-[0_18px_40px_-14px_oklch(0.7_0.26_340/0.65)]" />
          <div className="mx-auto flex w-[86%] justify-between">
            <span className="h-3 w-7 rounded-b bg-[oklch(0.14_0.06_300)]" />
            <span className="h-3 w-7 rounded-b bg-[oklch(0.14_0.06_300)]" />
          </div>
        </div>
      </div>
    </section>
  );
}