CREATE TABLE public.submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_name TEXT NOT NULL,
  track TEXT NOT NULL,
  repo_url TEXT NOT NULL,
  demo_url TEXT,
  pitch TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.submissions TO anon;
GRANT INSERT ON public.submissions TO authenticated;
GRANT ALL ON public.submissions TO service_role;

ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a project"
ON public.submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(team_name) BETWEEN 1 AND 100
  AND length(track) BETWEEN 1 AND 50
  AND length(repo_url) BETWEEN 1 AND 500
  AND (demo_url IS NULL OR length(demo_url) <= 500)
  AND length(pitch) BETWEEN 1 AND 2000
);