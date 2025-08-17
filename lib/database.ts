import { createClient } from "@/lib/supabase/server"
import type { ResumeData } from "@/app/dashboard/resume-builder/page"

export interface Profile {
  id: string
  full_name?: string
  phone?: string
  location?: string
  bio?: string
  linkedin?: string
  website?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Resume {
  id: string
  user_id: string
  title: string
  data: ResumeData
  template_id: string
  is_ai_enhanced: boolean
  created_at: string
  updated_at: string
}

export interface ResumeTemplate {
  id: string
  name: string
  description?: string
  preview_url?: string
  is_premium: boolean
  created_at: string
}

// Profile functions
export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = createClient()

  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (error) {
    console.error("Error fetching profile:", error)
    return null
  }

  return data
}

export async function upsertProfile(userId: string, profileData: Partial<Profile>): Promise<Profile | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("profiles")
    .upsert({
      id: userId,
      ...profileData,
    })
    .select()
    .single()

  if (error) {
    console.error("Error upserting profile:", error)
    return null
  }

  return data
}

// Resume functions
export async function getUserResumes(userId: string): Promise<Resume[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })

  if (error) {
    console.error("Error fetching resumes:", error)
    return []
  }

  return data || []
}

export async function getResume(resumeId: string): Promise<Resume | null> {
  const supabase = createClient()

  const { data, error } = await supabase.from("resumes").select("*").eq("id", resumeId).single()

  if (error) {
    console.error("Error fetching resume:", error)
    return null
  }

  return data
}

export async function saveResume(
  userId: string,
  title: string,
  resumeData: ResumeData,
  templateId = "default",
): Promise<Resume | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("resumes")
    .insert({
      user_id: userId,
      title,
      data: resumeData,
      template_id: templateId,
      is_ai_enhanced: resumeData.aiEnhanced || false,
    })
    .select()
    .single()

  if (error) {
    console.error("Error saving resume:", error)
    return null
  }

  return data
}

export async function updateResume(resumeId: string, title: string, resumeData: ResumeData): Promise<Resume | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("resumes")
    .update({
      title,
      data: resumeData,
      is_ai_enhanced: resumeData.aiEnhanced || false,
    })
    .eq("id", resumeId)
    .select()
    .single()

  if (error) {
    console.error("Error updating resume:", error)
    return null
  }

  return data
}

export async function deleteResume(resumeId: string): Promise<boolean> {
  const supabase = createClient()

  const { error } = await supabase.from("resumes").delete().eq("id", resumeId)

  if (error) {
    console.error("Error deleting resume:", error)
    return false
  }

  return true
}

// Template functions
export async function getResumeTemplates(): Promise<ResumeTemplate[]> {
  const supabase = createClient()

  const { data, error } = await supabase.from("resume_templates").select("*").order("created_at")

  if (error) {
    console.error("Error fetching templates:", error)
    return []
  }

  return data || []
}
