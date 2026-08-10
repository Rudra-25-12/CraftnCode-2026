import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

type Mode = "team" | "admin";

const credsSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(6, "Password must be at least 6 characters").max(100),
});

const signUpSchema = credsSchema.extend({
  teamName: z.string().trim().min(1, "Team name is required").max(60),
});

export function ArcadeLoginOverlay({ onClose }: { onClose: () => void }) {
  const [started, setStarted] = useState(false);
  const [mode, setMode] = useState<Mode>("team");
  const [signUpMode, setSignUpMode] = useState(false);
  const [team, setTeam] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  async function insertCoin() {
    setError("");
    const isSignUp = mode === "team" && signUpMode;
    const parsed = isSignUp
      ? signUpSchema.safeParse({ email, password, teamName: team })
      : credsSchema.safeParse({ email, password });

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message.toUpperCase() ?? "INVALID PLAYER DATA");
      return;
    }

    setBusy(true);
    try {
      if (isSignUp) {
        const { error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { team_name: team.trim() },
          },
        });
        if (signUpError) throw signUpError;
        toast.success("Check your email to confirm your team account.");
        setSignUpMode(false);
        return;
      }

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (signInError) throw signInError;

      if (mode === "admin") {
        const { data: role } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", data.user.id)
          .eq("role", "admin")
          .maybeSingle();
        if (!role) {
          await supabase.auth.signOut();
          setError("THIS ACCOUNT IS NOT AN ADMIN");
          return;
        }
      }

      toast.success(mode === "admin" ? "Admin access granted." : "Player one ready.");
      onClose();
    } catch (e) {
      setError((e instanceof Error ? e.message : "LOGIN FAILED").toUpperCase());
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-background/92 px-4 py-10 backdrop-blur-md">
      <button
        type="button"
        aria-label="Close login"
        onClick={onClose}
        className="fixed right-4 top-4 z-10 rounded-sm border border-border p-2 text-foreground/85 transition-colors hover:border-neon-cyan hover:text-neon-cyan"
      >
        <X className="h-4 w-4" strokeWidth={1.5} />
      </button>

      <div className="relative w-full max-w-[26rem]">
        {/* Cabinet shell */}
        <div className="relative rounded-t-[1.75rem] bg-[linear-gradient(180deg,oklch(0.30_0.15_318),oklch(0.20_0.11_310)_45%,oklch(0.14_0.08_300))] px-3 pb-3 pt-3 shadow-[0_0_60px_-12px_oklch(0.7_0.26_340/0.7),inset_0_1px_0_oklch(1_0_0/0.18)] ring-1 ring-neon-magenta/60">
          <span className="pointer-events-none absolute inset-y-3 left-3 w-6 rounded-full bg-[linear-gradient(90deg,oklch(1_0_0/0.14),transparent)]" />
          <span className="pointer-events-none absolute inset-y-3 right-3 w-6 rounded-full bg-[linear-gradient(270deg,oklch(1_0_0/0.10),transparent)]" />

          {/* Marquee */}
          <div className="relative mx-auto w-[86%] rounded-t-2xl rounded-b-sm border border-neon-magenta/70 bg-[image:var(--gradient-neon)] px-4 py-2.5 shadow-[0_0_28px_-4px_oklch(0.7_0.26_340/0.9)]">
            <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-2xl bg-[linear-gradient(180deg,oklch(1_0_0/0.35),transparent)]" />
            <p className="relative text-center font-display text-[11px] tracking-[0.4em] text-primary-foreground">
              {mode === "admin" ? "ADMIN LOGIN" : "PLAYER LOGIN"}
            </p>
          </div>

          {/* Screen bezel */}
          <div className="relative mx-auto mt-3 w-[92%] rounded-[1.1rem] bg-[linear-gradient(180deg,oklch(0.20_0.06_300),oklch(0.11_0.04_295))] p-2.5 shadow-[inset_0_2px_10px_oklch(0_0_0/0.7)]">
            <div className="scanlines relative overflow-hidden rounded-lg bg-[radial-gradient(120%_90%_at_50%_20%,oklch(0.14_0.06_290),oklch(0.06_0.03_285))] p-5 shadow-[inset_0_0_40px_oklch(0_0_0/0.9)]">
              <span className="pointer-events-none absolute inset-x-2 top-1 h-8 rounded-full bg-[linear-gradient(180deg,oklch(1_0_0/0.10),transparent)] blur-[2px]" />

              {!started ? (
                <div className="flex min-h-[240px] flex-col items-center justify-center gap-6 text-center">
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
                    void insertCoin();
                  }}
                  className="flex min-h-[240px] flex-col justify-center gap-3"
                >
                  {/* Mode tabs */}
                  <div className="grid grid-cols-2 gap-2">
                    {(["team", "admin"] as const).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => {
                          setMode(m);
                          setSignUpMode(false);
                          setError("");
                        }}
                        className={`rounded-sm border px-2 py-1.5 font-display text-[9px] tracking-[0.28em] transition-colors ${
                          mode === m
                            ? "border-neon-cyan text-neon-cyan"
                            : "border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {m === "team" ? "TEAM" : "ADMIN"}
                      </button>
                    ))}
                  </div>

                  <p className="text-center font-display text-[8px] tracking-[0.35em] text-neon-magenta">
                    {signUpMode ? "NEW PLAYER" : "ENTER PLAYER DATA"}
                  </p>

                  {signUpMode ? (
                    <label className="block">
                      <span className="font-display text-[9px] tracking-[0.3em] text-neon-cyan">
                        TEAM NAME
                      </span>
                      <input
                        value={team}
                        onChange={(e) => setTeam(e.target.value)}
                        maxLength={60}
                        className="mt-1.5 w-full rounded-sm border border-border bg-background/60 px-2 py-1.5 font-display text-[10px] tracking-[0.2em] text-foreground outline-none focus:border-neon-cyan"
                      />
                    </label>
                  ) : null}

                  <label className="block">
                    <span className="font-display text-[9px] tracking-[0.3em] text-neon-cyan">
                      EMAIL
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      maxLength={255}
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
                    <p className="font-display text-[8px] leading-relaxed tracking-[0.2em] text-neon-magenta">
                      {error}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={busy}
                    className="mt-1 rounded-sm border border-neon-cyan/70 px-4 py-2 font-display text-[9px] tracking-[0.3em] text-neon-cyan transition-colors hover:bg-neon-cyan hover:text-primary-foreground disabled:opacity-50"
                  >
                    {busy ? "LOADING…" : signUpMode ? "◉ CREATE TEAM" : "◉ INSERT A COIN"}
                  </button>

                  {mode === "team" ? (
                    <button
                      type="button"
                      onClick={() => {
                        setSignUpMode((v) => !v);
                        setError("");
                      }}
                      className="font-display text-[8px] tracking-[0.28em] text-muted-foreground transition-colors hover:text-neon-magenta"
                    >
                      {signUpMode ? "← BACK TO LOGIN" : "NEW TEAM? REGISTER"}
                    </button>
                  ) : null}
                </form>
              )}
            </div>
          </div>

          {/* Control deck */}
          <div className="relative mx-auto mt-3 flex w-[104%] -translate-x-[2%] items-center justify-center gap-6 rounded-b-lg rounded-t-sm bg-[linear-gradient(180deg,oklch(0.46_0.15_305),oklch(0.30_0.12_300))] px-5 py-4 shadow-[0_10px_20px_-10px_oklch(0_0_0/0.9),inset_0_1px_0_oklch(1_0_0/0.25)]">
            <span className="relative flex h-8 w-8 items-end justify-center">
              <span className="absolute bottom-0 h-3 w-6 rounded-full bg-[oklch(0.16_0.05_295)]" />
              <span className="absolute bottom-2 h-4 w-1.5 rounded-sm bg-[oklch(0.75_0.02_260)]" />
              <span className="absolute bottom-4 h-5 w-5 rounded-full bg-[radial-gradient(circle_at_32%_28%,oklch(0.95_0.06_20),oklch(0.55_0.22_25))] shadow-[0_2px_6px_oklch(0_0_0/0.6)]" />
            </span>
            <span className="flex items-center gap-2.5">
              <span className="h-5 w-5 rounded-full bg-[radial-gradient(circle_at_32%_28%,oklch(0.95_0.12_340),oklch(0.6_0.25_340))] shadow-[0_0_10px_oklch(0.7_0.26_340/0.7),inset_0_-2px_3px_oklch(0_0_0/0.4)]" />
              <span className="h-5 w-5 rounded-full bg-[radial-gradient(circle_at_32%_28%,oklch(0.95_0.1_200),oklch(0.65_0.16_200))] shadow-[0_0_10px_oklch(0.8_0.15_200/0.6),inset_0_-2px_3px_oklch(0_0_0/0.4)]" />
              <span className="h-5 w-5 rounded-full bg-[radial-gradient(circle_at_32%_28%,oklch(0.95_0.16_110),oklch(0.72_0.2_120))] shadow-[0_0_10px_oklch(0.85_0.2_120/0.5),inset_0_-2px_3px_oklch(0_0_0/0.4)]" />
            </span>
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
  );
}
