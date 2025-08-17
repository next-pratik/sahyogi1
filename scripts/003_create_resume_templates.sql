-- Create resume templates table
CREATE TABLE IF NOT EXISTS resume_templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  preview_url TEXT,
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default templates
INSERT INTO resume_templates (id, name, description, is_premium) VALUES
  ('default', 'Classic Professional', 'A clean, traditional resume template perfect for most industries', FALSE),
  ('modern', 'Modern Minimalist', 'A contemporary design with clean lines and modern typography', FALSE),
  ('creative', 'Creative Portfolio', 'A visually appealing template for creative professionals', TRUE),
  ('executive', 'Executive Summary', 'A sophisticated template for senior-level positions', TRUE)
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security (public read access)
ALTER TABLE resume_templates ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Anyone can view resume templates" ON resume_templates
  FOR SELECT USING (TRUE);
