import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  Users,
  FileTerminal,
  Gem,
  Upload,
  UtensilsCrossed,
  Instagram,
  Linkedin,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

const leftNav = [
  { to: "/", label: "Home", Icon: Home },
  { to: "/problem-statements", label: "Problems", Icon: FileTerminal },
  { to: "/about", label: "About Us", Icon: Users },
  { to: "/sponsors", label: "Sponsors", Icon: Gem },
] as const;

const socials = [
  { href: "https://www.instagram.com/csc_muj/", label: "Instagram", Icon: Instagram },
  { href: "https://www.linkedin.com/company/cyber-space-club", label: "LinkedIn", Icon: Linkedin },
];

const rightNav = [
  { to: "/submit", label: "Submit", Icon: Upload },
  { to: "/food", label: "Food", Icon: UtensilsCrossed },
] as const;

export function SiteFrame({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="relative min-h-screen">
      {/* Left rail */}
      <nav
        aria-label="Primary"
        className="glass-panel fixed left-0 top-24 z-40 hidden w-[84px] flex-col rounded-r-lg py-2 md:flex"
      >
        {leftNav.map(({ to, label, Icon }) => (
          <Link
            key={to}
            to={to}
            className="rail-item"
            activeProps={{ className: "rail-item text-neon-cyan" }}
            activeOptions={{ exact: to === "/" }}
          >
            <Icon className="h-5 w-5" strokeWidth={1.5} />
            {label}
          </Link>
        ))}
      </nav>

      {/* Right rail */}
      <div
        aria-label="Secondary"
        className="glass-panel fixed right-0 top-24 z-40 hidden w-[84px] flex-col rounded-l-lg py-2 md:flex"
      >
        {rightNav.map(({ to, label, Icon }) => (
          <Link
            key={to}
            to={to}
            className="rail-item"
            activeProps={{ className: "rail-item text-neon-cyan" }}
          >
            <Icon className="h-5 w-5" strokeWidth={1.5} />
            {label}
          </Link>
        ))}
        <span className="mx-auto my-2 h-px w-8 bg-border" />
        {socials.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="rail-item"
          >
            <Icon className="h-5 w-5" strokeWidth={1.5} />
            {label}
          </a>
        ))}
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${open ? "" : "pointer-events-none"}`}
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
            {[...leftNav, ...rightNav].map(({ to, label, Icon }) => (
              <Link
                key={to}
                to={to}
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
          </div>

          <span className="my-6 h-px w-full bg-border" />

          <div className="flex flex-col gap-1">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex items-center gap-3 rounded-sm px-3 py-3 font-display text-[11px] tracking-[0.28em] text-foreground/85 transition-colors hover:text-neon-magenta"
              >
                <Icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                <span className="truncate">{label.toUpperCase()}</span>
              </a>
            ))}
          </div>
        </nav>
      </div>

      <header className="fixed left-0 right-0 top-0 z-50 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-4 backdrop-blur-md sm:px-5">
        <Link
          to="/"
          className="truncate font-display text-sm tracking-[0.35em] text-foreground"
        >
          C<span className="text-neon-magenta">n</span>C&#39;26
        </Link>
        <div className="flex shrink-0 items-center gap-3">
          <span className="hidden font-display text-[10px] tracking-[0.3em] text-muted-foreground lg:block">
            OVERNIGHT HACKATHON · 24 HOURS
          </span>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="rounded-sm border border-border p-2 text-foreground/85 transition-colors hover:border-neon-cyan hover:text-neon-cyan md:hidden"
          >
            {open ? <X className="h-4 w-4" strokeWidth={1.5} /> : <Menu className="h-4 w-4" strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}