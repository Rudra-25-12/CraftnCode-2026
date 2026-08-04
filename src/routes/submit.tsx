import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [
      { title: "Submission — Rewind & Recode" },
      { name: "description", content: "Submit your Rewind & Recode hackathon project before the dawn deadline." },
      { property: "og:title", content: "Submission — Rewind & Recode" },
      { property: "og:description", content: "Submit your hackathon project before the dawn deadline." },
    ],
  }),
  component: Submit,
});

const field =
  "w-full rounded-sm border border-input bg-background/50 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-neon-cyan";
const label = "font-display text-[10px] tracking-[0.28em] text-muted-foreground";

function Submit() {
  const [sent, setSent] = useState(false);

  return (
    <PageShell eyebrow="DEADLINE 09:00" title="Submission">
      <p>One submission per team. You can resubmit until the clock hits zero — latest entry wins.</p>
      <form
        className="glass-panel space-y-5 rounded-sm p-6"
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
          toast.success("Submission logged", { description: "Good luck at demo time." });
        }}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <label className={label} htmlFor="team">TEAM NAME</label>
            <input id="team" required className={field} placeholder="null_pointers" />
          </div>
          <div className="space-y-2">
            <label className={label} htmlFor="track">TRACK</label>
            <select id="track" required className={field} defaultValue="PS-01">
              {["PS-01", "PS-02", "PS-03", "PS-04", "PS-05"].map((t) => (
                <option key={t} value={t} className="bg-popover">{t}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <label className={label} htmlFor="repo">REPOSITORY URL</label>
          <input id="repo" type="url" required className={field} placeholder="https://github.com/..." />
        </div>
        <div className="space-y-2">
          <label className={label} htmlFor="demo">DEMO / VIDEO LINK</label>
          <input id="demo" type="url" className={field} placeholder="https://" />
        </div>
        <div className="space-y-2">
          <label className={label} htmlFor="pitch">60-SECOND PITCH</label>
          <textarea id="pitch" required rows={4} className={field} placeholder="What did you rewind, and what did you recode?" />
        </div>
        <button
          type="submit"
          className="w-full rounded-sm bg-[image:var(--gradient-neon)] py-3 font-display text-[11px] tracking-[0.3em] text-primary-foreground shadow-[var(--shadow-neon)] transition-transform hover:scale-[1.01]"
        >
          {sent ? "RESUBMIT" : "SUBMIT PROJECT"}
        </button>
      </form>
    </PageShell>
  );
}