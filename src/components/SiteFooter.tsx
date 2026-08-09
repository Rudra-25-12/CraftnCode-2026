import { Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import cscLogo from "@/assets/csc-logo.webp";

const contacts = [
  { phone: "+91 95994 15311", name: "Abhinav Trikha", role: "Chairperson" },
  { phone: "+91 92352 85754", name: "Ambika Seth", role: "Vice Chairperson" },
];

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border/60 bg-background/80 px-6 py-14 md:px-24">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-3">
        {/* Brand */}
        <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
          <img
            src={cscLogo}
            alt="Cyber Space Club logo"
            width={96}
            height={96}
            loading="lazy"
            decoding="async"
            className="h-24 w-24 object-contain"
          />
          <p className="font-display text-sm tracking-[0.28em] text-foreground">CYBER SPACE CLUB</p>
          <p className="font-display text-[10px] tracking-[0.3em] text-neon-cyan">CRAFT N CODE</p>
        </div>

        {/* Contact */}
        <div>
          <h2 className="font-display text-sm tracking-[0.3em] text-neon-magenta">CONTACT US</h2>
          <ul className="mt-6 space-y-5 text-sm">
            {contacts.map((c) => (
              <li key={c.phone}>
                <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 text-foreground transition-colors hover:text-neon-cyan">
                  <Phone className="h-4 w-4 shrink-0 text-neon-magenta" strokeWidth={1.5} />
                  {c.phone}
                </a>
                <p className="mt-1 pl-7 font-semibold text-foreground">{c.name}</p>
                <p className="pl-7 text-neon-magenta">{c.role}</p>
              </li>
            ))}
            <li>
              <a
                href="mailto:cyber.space@muj.manipal.edu"
                className="flex items-center gap-3 break-all text-foreground transition-colors hover:text-neon-cyan"
              >
                <Mail className="h-4 w-4 shrink-0 text-neon-magenta" strokeWidth={1.5} />
                cyber.space@muj.manipal.edu
              </a>
            </li>
          </ul>
        </div>

        {/* Location + socials */}
        <div className="space-y-10">
          <div>
            <h2 className="font-display text-sm tracking-[0.3em] text-neon-magenta">LOCATION</h2>
            <p className="mt-6 flex gap-3 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-neon-magenta" strokeWidth={1.5} />
              <span>
                Manipal University Jaipur, Dehmi Kalan, Near GVK Toll Plaza, Jaipur-Ajmer Expressway,
                Jaipur, Rajasthan 303007
              </span>
            </p>
          </div>
          <div>
            <h2 className="font-display text-sm tracking-[0.3em] text-neon-magenta">CONNECT</h2>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://www.instagram.com/csc_muj/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="rounded-sm border border-border p-2.5 text-foreground/85 transition-colors hover:border-neon-cyan hover:text-neon-cyan"
              >
                <Instagram className="h-5 w-5" strokeWidth={1.5} />
              </a>
              <a
                href="https://www.linkedin.com/company/cyber-space-club"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="rounded-sm border border-border p-2.5 text-foreground/85 transition-colors hover:border-neon-cyan hover:text-neon-cyan"
              >
                <Linkedin className="h-5 w-5" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <p className="mx-auto mt-14 max-w-5xl border-t border-border/60 pt-6 text-center font-display text-[10px] tracking-[0.3em] text-muted-foreground">
        © 2026 CYBER SPACE CLUB · MANIPAL UNIVERSITY JAIPUR
      </p>
    </footer>
  );
}
