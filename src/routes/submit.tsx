import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageShell } from "@/components/PageShell";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [
      { title: "Submission — CraftnCode'26" },
      { name: "description", content: "Submit your CraftnCode'26 hackathon project before the dawn deadline." },
      { property: "og:title", content: "Submission — CraftnCode'26" },
      { property: "og:description", content: "Submit your hackathon project before the dawn deadline." },
    ],
  }),
  component: Submit,
});

const field =
  "w-full rounded-sm border border-input bg-background/50 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-neon-cyan";
const label = "font-display text-[10px] tracking-[0.28em] text-muted-foreground";

const submissionSchema = z.object({
  team_name: z.string().trim().min(1, "Team name is required").max(100),
  track: z.string().trim().min(1).max(50),
  repo_url: z.string().trim().url("Repository must be a valid URL").max(500),
  demo_url: z.string().trim().url("Demo link must be a valid URL").max(500).optional().or(z.literal("")),
  pitch: z.string().trim().min(1, "Pitch is required").max(2000),
});

function Submit() {
  const [sent, setSent] = useState(false);
  const [saving, setSaving] = useState(false);

  return (
    <PageShell eyebrow="DEADLINE 09:00" title="Submission">
      <p>One submission per team. You can resubmit until the clock hits zero — latest entry wins.</p>
      <form
        className="glass-panel space-y-5 rounded-sm p-6"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const fd = new FormData(form);
          const parsed = submissionSchema.safeParse({
            team_name: String(fd.get("team") ?? ""),
            track: String(fd.get("track") ?? ""),
            repo_url: String(fd.get("repo") ?? ""),
            demo_url: String(fd.get("demo") ?? ""),
            pitch: String(fd.get("pitch") ?? ""),
          });
          if (!parsed.success) {
            toast.error("Check your entry", { description: parsed.error.issues[0]?.message });
            return;
          }
          setSaving(true);
          const { error } = await supabase.from("submissions").insert({
            ...parsed.data,
            demo_url: parsed.data.demo_url ? parsed.data.demo_url : null,
          });
          setSaving(false);
          if (error) {
            toast.error("Submission failed", { description: "Please try again in a moment." });
            return;
          }
          setSent(true);
          toast.success("Submission logged", { description: "Good luck at demo time." });
        }}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <label className={label} htmlFor="team">TEAM NAME</label>
            <input id="team" name="team" maxLength={100} required className={field} placeholder="null_pointers" />
          </div>
          <div className="space-y-2">
            <label className={label} htmlFor="track">TRACK</label>
            <select id="track" name="track" required className={field} defaultValue="PS-01">
              {["PS-01", "PS-02", "PS-03", "PS-04", "PS-05"].map((t) => (
                <option key={t} value={t} className="bg-popover">{t}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <label className={label} htmlFor="repo">REPOSITORY URL</label>
          <input id="repo" name="repo" type="url" maxLength={500} required className={field} placeholder="https://github.com/..." />
        </div>
        <div className="space-y-2">
          <label className={label} htmlFor="demo">DEMO / VIDEO LINK</label>
          <input id="demo" name="demo" type="url" maxLength={500} className={field} placeholder="https://" />
        </div>
        <div className="space-y-2">
          <label className={label} htmlFor="pitch">60-SECOND PITCH</label>
          <textarea id="pitch" name="pitch" maxLength={2000} required rows={4} className={field} placeholder="What did you craft, and how did you code it?" />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-sm bg-[image:var(--gradient-neon)] py-3 font-display text-[11px] tracking-[0.3em] text-primary-foreground shadow-[var(--shadow-neon)] transition-transform hover:scale-[1.01] disabled:opacity-60"
        >
          {saving ? "SENDING..." : sent ? "RESUBMIT" : "SUBMIT PROJECT"}
        </button>
      </form>
    </PageShell>
  );
}