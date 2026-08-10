import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type PlayerSession = {
  session: Session | null;
  loading: boolean;
  teamName: string | null;
  isAdmin: boolean;
};

export function useSession(): PlayerSession {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [teamName, setTeamName] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let active = true;

    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      if (!active) return;
      setSession(next);
      setLoading(false);
    });

    void supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      setLoading(false);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const userId = session?.user.id;
    if (!userId) {
      setTeamName(null);
      setIsAdmin(false);
      return;
    }
    let active = true;

    void supabase
      .from("profiles")
      .select("team_name")
      .eq("user_id", userId)
      .maybeSingle()
      .then(({ data }) => {
        if (active) setTeamName(data?.team_name?.trim() || null);
      });

    void supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle()
      .then(({ data }) => {
        if (active) setIsAdmin(Boolean(data));
      });

    return () => {
      active = false;
    };
  }, [session?.user.id]);

  return { session, loading, teamName, isAdmin };
}
