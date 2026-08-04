import { Link } from "@tanstack/react-router";
import {
  Home,
  Users,
  FileTerminal,
  Gem,
  Upload,
  UtensilsCrossed,
  Instagram,
  Linkedin,
  Youtube,
  Github,
  MessagesSquare,
} from "lucide-react";
import type { ReactNode } from "react";

const leftNav = [
  { to: "/", label: "Home", Icon: Home },
  { to: "/problem-statements", label: "Problems", Icon: FileTerminal },
  { to: "/about", label: "About Us", Icon: Users },
  { to: "/sponsors", label: "Sponsors", Icon: Gem },
] as const;

const socials = [
  { href: "https://instagram.com", label: "Instagram", Icon: Instagram },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: Linkedin },
  { href: "https://youtube.com", label: "YouTube", Icon: Youtube },
  { href: "https://github.com", label: "GitHub", Icon: Github },
  { href: "https://discord.com", label: "Discord", Icon: MessagesSquare },
];

export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      {/* Left rail */}
      <nav
        aria-label="Primary"
        className="glass-panel fixed left-0 top-24 z-40 hidden w-[68px] flex-col rounded-r-lg py-2 md:flex"
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
      <div className="glass-panel fixed right-0 top-24 z-40 hidden w-[68px] flex-col rounded-l-lg py-2 md:flex">
        <Link to="/submit" className="rail-item" activeProps={{ className: "rail-item text-neon-cyan" }}>
          <Upload className="h-5 w-5" strokeWidth={1.5} />
          Submit
        </Link>
        <Link to="/food" className="rail-item" activeProps={{ className: "rail-item text-neon-cyan" }}>
          <UtensilsCrossed className="h-5 w-5" strokeWidth={1.5} />
          Food
        </Link>
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
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </a>
        ))}
      </div>

      {/* Mobile bar */}
      <nav className="glass-panel fixed bottom-0 left-0 right-0 z-40 flex justify-around md:hidden">
        {[...leftNav, { to: "/submit", label: "Submit", Icon: Upload }, { to: "/food", label: "Food", Icon: UtensilsCrossed }].map(
          ({ to, label, Icon }) => (
            <Link key={to} to={to} className="rail-item" activeProps={{ className: "rail-item text-neon-cyan" }}>
              <Icon className="h-5 w-5" strokeWidth={1.5} />
              {label}
            </Link>
          ),
        )}
      </nav>

      <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-5 py-4 backdrop-blur-md">
        <Link to="/" className="font-display text-sm tracking-[0.35em] text-foreground">
          R<span className="text-neon-magenta">&amp;</span>R
        </Link>
        <span className="hidden font-display text-[10px] tracking-[0.3em] text-muted-foreground sm:block">
          OVERNIGHT HACKATHON · 24 HOURS
        </span>
        <Link
          to="/submit"
          className="rounded-sm border border-neon-magenta/60 px-4 py-2 font-display text-[10px] tracking-[0.25em] text-neon-magenta transition-shadow hover:shadow-[var(--shadow-neon-pink)]"
        >
          REGISTER
        </Link>
      </header>

      <main className="pb-24 md:pb-0">{children}</main>
    </div>
  );
}