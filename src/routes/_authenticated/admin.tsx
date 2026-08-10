import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageShell } from "@/components/PageShell";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin Console — Craft N Code" },
      {
        name: "description",
        content: "Admin console listing every Craft N Code hackathon submission.",
      },
      { property: "og:title", content: "Admin Console — Craft N Code" },
      { property: "og:description", content: "Every hackathon submission, newest first." },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-submissions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("submissions")
        .select("id, team_name, track, repo_url, demo_url, pitch, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <PageShell eyebrow="ADMIN CONSOLE" title="Submissions">
      {isLoading ? (
        <p className="font-display text-[10px] tracking-[0.3em] text-neon-cyan">LOADING…</p>
      ) : error ? (
        <p className="font-display text-[10px] tracking-[0.3em] text-neon-magenta">
          ACCESS DENIED — ADMIN ACCOUNT REQUIRED
        </p>
      ) : !data?.length ? (
        <p className="text-muted-foreground">No submissions yet.</p>
      ) : (
        <div className="space-y-4">
          <p className="font-display text-[10px] tracking-[0.3em] text-muted-foreground">
            {String(data.length).padStart(2, "0")} ENTRIES
          </p>
          {data.map((s) => (
            <article key={s.id} className="glass-panel rounded-sm p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-display text-sm tracking-[0.2em] text-neon-cyan">
                  {s.team_name}
                </h3>
                <span className="font-display text-[9px] tracking-[0.25em] text-muted-foreground">
                  {new Date(s.created_at).toLocaleString()}
                </span>
              </div>
              <p className="mt-1 font-display text-[9px] tracking-[0.3em] text-neon-magenta">
                {s.track.toUpperCase()}
              </p>
              <p className="mt-3 text-sm text-foreground/85">{s.pitch}</p>
              <div className="mt-3 flex flex-wrap gap-4 text-xs">
                <a
                  href={s.repo_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-neon-cyan underline-offset-4 hover:underline"
                >
                  Repository
                </a>
                {s.demo_url ? (
                  <a
                    href={s.demo_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-neon-cyan underline-offset-4 hover:underline"
                  >
                    Demo
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
      <p className="pt-6">
        <Link to="/" className="font-display text-[10px] tracking-[0.3em] text-muted-foreground hover:text-neon-cyan">
          ← BACK TO SITE
        </Link>
      </p>
    </PageShell>
  );
}
