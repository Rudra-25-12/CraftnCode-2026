import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  Users,
  FileTerminal,
  CalendarClock,
  Gem,
  Upload,
  UtensilsCrossed,
  Menu,
  X,
  ShieldCheck,
  LogIn,
  LogOut,
} from "lucide-react";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { ArcadeLoginOverlay } from "./ArcadeLoginOverlay";
import { useSession } from "@/hooks/useSession";
import { supabase } from "@/integrations/supabase/client";
import cscLogo from "@/assets/cyber-space-club.png.asset.json";
import iiitLogo from "@/assets/iiit-bhubaneswar.png.asset.json";
import centerLogo from "@/assets/d3fest-logo.png.asset.json";

const leftNav = [
  { to: "/", label: "Home", Icon: Home },
  { to: "/problem-statements", label: "Problems", Icon: FileTerminal },
  { to: "/about", label: "About Us", Icon: Users },
  { to: "/sponsors", label: "Sponsors", Icon: Gem },
] as const;

const rightNav = [
  { to: "/submit", label: "Submit", Icon: Upload },
  { to: "/food", label: "Food", Icon: UtensilsCrossed },
] as const;

const LoginOverlayContext = createContext<() => void>(() => {});

export function useLoginOverlay() {
  return useContext(LoginOverlayContext);
}

export function SiteFrame({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { session, teamName, isAdmin } = useSession();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const playerLabel = teamName ?? session?.user.email ?? "";
  const navItems = [] as const as ReadonlyArray<{
    to: string;
    label: string;
    Icon: typeof FileTerminal;
    hash?: string;
  }>;

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <LoginOverlayContext.Provider value={() => setLoginOpen(true)}>
    <div className="relative min-h-screen">
      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <nav
          aria-label="Mobile"
          className={`glass-panel absolute right-0 top-0 flex h-full w-[78%] max-w-xs flex-col overflow-y-auto rounded-l-lg px-5 pb-8 pt-20 transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <span className="truncate font-display text-[10px] tracking-[0.35em] text-muted-foreground">
            NAVIGATE
          </span>

          <div className="mt-5 flex flex-col gap-1">
            {navItems.map(({ to, label, Icon, hash }) => (
              <Link
                key={label}
                to={to}
                {...(hash ? { hash } : {})}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-sm px-3 py-3 font-display text-[11px] tracking-[0.28em] text-foreground/85 transition-colors hover:text-neon-cyan"
                activeProps={{
                  className:
                    "flex items-center gap-3 rounded-sm border border-neon-cyan/40 px-3 py-3 font-display text-[11px] tracking-[0.28em] text-neon-cyan",
                }}
                activeOptions={{ exact: to === "/" }}
              >
                <Icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                <span className="truncate">{label.toUpperCase()}</span>
              </Link>
            ))}
            {isAdmin ? (
              <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-sm px-3 py-3 font-display text-[11px] tracking-[0.28em] text-foreground/85 transition-colors hover:text-neon-cyan"
                activeProps={{
                  className:
                    "flex items-center gap-3 rounded-sm border border-neon-cyan/40 px-3 py-3 font-display text-[11px] tracking-[0.28em] text-neon-cyan",
                }}
              >
                <ShieldCheck className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                <span className="truncate">ADMIN</span>
              </Link>
            ) : null}
            {session ? (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  void signOut();
                }}
                className="flex items-center gap-3 rounded-sm px-3 py-3 text-left font-display text-[11px] tracking-[0.28em] text-foreground/85 transition-colors hover:text-neon-magenta"
              >
                <LogOut className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                <span className="truncate">SIGN OUT</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setLoginOpen(true);
                }}
                className="flex items-center gap-3 rounded-sm px-3 py-3 text-left font-display text-[11px] tracking-[0.28em] text-neon-cyan transition-colors hover:text-neon-magenta"
              >
                <LogIn className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                <span className="truncate">LOGIN</span>
              </button>
            )}
          </div>

        </nav>
      </div>

      <header className="absolute left-0 right-0 top-0 z-50 flex items-center gap-3 px-4 py-3 sm:px-5">
        {pathname === "/" ? (
          <img
            src={centerLogo.url}
            alt="D3 Fest logo"
            className="pointer-events-none absolute left-1/2 top-[calc(50vh-250px)] h-8 w-auto -translate-x-1/2 object-contain xl:h-9"
            loading="lazy"
          />
        ) : null}
        <Link
          to="/"
          aria-label="Craft N Code — home"
          className="group flex min-w-0 shrink-0 items-center gap-2 overflow-visible"
        >
          <span className="poster-title-mark origin-left pl-1 text-[15px] leading-none transition-transform duration-200 group-hover:scale-[1.05] sm:text-[20px]">
            cn1
          </span>
        </Link>

        {/* 8-bit top nav */}
        <nav
          aria-label="Primary"
          className="flex min-w-0 flex-1 items-center justify-center gap-1.5 xl:gap-2"
        >
          {navItems.map(({ to, label, Icon, hash }) => (
            <Link
              key={label}
              to={to}
              {...(hash ? { hash } : {})}
              className="arcade-nav-item"
              activeProps={{ className: "arcade-nav-item arcade-nav-item-active" }}
              activeOptions={{ exact: to === "/" }}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
              {label}
            </Link>
          ))}
          {isAdmin ? (
            <Link
              to="/admin"
              className="arcade-nav-item"
              activeProps={{ className: "arcade-nav-item arcade-nav-item-active" }}
            >
              <ShieldCheck className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
              Admin
            </Link>
          ) : null}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <img
              src={iiitLogo.url}
              alt="IIIT Bhubaneswar logo"
              className="h-10 w-auto object-contain sm:h-12"
              loading="lazy"
            />
            <span className="font-display text-sm tracking-[0.2em] text-foreground/70 sm:text-base">
              X
            </span>
            <img
              src={cscLogo.url}
              alt="Cyber Space Club logo"
              className="h-10 w-auto object-contain sm:h-12"
              loading="lazy"
            />
          </div>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="arcade-nav-item lg:hidden"
          >
            {open ? <X className="h-4 w-4" strokeWidth={1.5} /> : <Menu className="h-4 w-4" strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      <main>{children}</main>
      {session && pathname === "/" ? (
        <div className="fixed bottom-3 left-4 z-40 flex items-center gap-3">
          <span
            className="relative -top-[3px] text-[26px] tracking-[0.12em] text-foreground/70"
            style={{ fontFamily: '"8bit Arcade In", var(--font-display)' }}
          >
            TEAM NAME
          </span>
          <span
            className="relative -top-[3px] max-w-[18rem] truncate text-[26px] tracking-[0.12em]"
            style={{
              fontFamily: '"8bit Arcade In", var(--font-display)',
              color: "oklch(0.89 0.19 110)",
            }}
          >
            {playerLabel.toUpperCase()}
          </span>
          <span className="text-[24px] leading-none text-foreground/35" aria-hidden>
            |
          </span>
          <button
            type="button"
            onClick={() => void signOut()}
            className="signout-btn relative -top-[3px] text-[26px] tracking-[0.12em] transition-colors"
            style={{ fontFamily: '"8bit Arcade In", var(--font-display)' }}
          >
            SIGN OUT
          </button>
        </div>
      ) : null}
      {loginOpen ? <ArcadeLoginOverlay onClose={() => setLoginOpen(false)} /> : null}
    </div>
    </LoginOverlayContext.Provider>
  );
}