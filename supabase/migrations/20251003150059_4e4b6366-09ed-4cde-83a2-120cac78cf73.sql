-- Create a table for player scores
CREATE TABLE public.player_scores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  player_name TEXT NOT NULL,
  score INTEGER NOT NULL,
  asteroid_diameter REAL,
  strategy_used TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.player_scores ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view scores (for leaderboard)
CREATE POLICY "Anyone can view scores" 
ON public.player_scores 
FOR SELECT 
USING (true);

-- Allow anyone to insert their own score
CREATE POLICY "Anyone can insert scores" 
ON public.player_scores 
FOR INSERT 
WITH CHECK (true);

-- Create an index for faster leaderboard queries
CREATE INDEX idx_player_scores_score ON public.player_scores(score DESC, created_at DESC);