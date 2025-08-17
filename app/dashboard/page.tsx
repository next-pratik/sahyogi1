import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { FileText, PlusCircle, TrendingUp, Users } from "lucide-react"
import { getUserResumes, getProfile } from "@/lib/database"

export default async function DashboardPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const [profile, resumes] = await Promise.all([getProfile(user.id), getUserResumes(user.id)])

  const userName = profile?.full_name || user.user_metadata?.full_name || user.email?.split("@")[0] || "User"
  const profileCompletion = calculateProfileCompletion(profile, user)

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {userName}!</h1>
        <p className="text-muted-foreground">
          Manage your profile and create AI-powered resumes to land your dream job.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resumes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resumes.length}</div>
            <p className="text-xs text-muted-foreground">
              {resumes.length === 0
                ? "No resumes created yet"
                : `${resumes.filter((r) => r.is_ai_enhanced).length} AI enhanced`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Completion</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profileCompletion}%</div>
            <p className="text-xs text-muted-foreground">
              {profileCompletion === 100 ? "Profile complete!" : "Complete your profile"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Templates Used</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(resumes.map((r) => r.template_id)).size}</div>
            <p className="text-xs text-muted-foreground">Try different templates</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account Status</CardTitle>
            <Badge variant="secondary" className="text-xs">
              Free
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Active</div>
            <p className="text-xs text-muted-foreground">Upgrade for more features</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card className="border-dashed border-2 hover:border-primary/50 transition-colors">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <PlusCircle className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Create New Resume</CardTitle>
            <CardDescription>Use our AI-powered builder to create a professional resume in minutes</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/resume-builder">
              <Button className="w-full" size="lg">
                Get Started
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Complete Your Profile</CardTitle>
            <CardDescription>Add your skills, experience, and education to improve resume quality</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/profile">
              <Button variant="outline" className="w-full bg-transparent" size="lg">
                Update Profile
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Browse Templates</CardTitle>
            <CardDescription>Explore our collection of professional resume templates</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full bg-transparent" size="lg">
              View Templates
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Resumes */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Resumes</CardTitle>
              <CardDescription>Your latest resume creations</CardDescription>
            </div>
            {resumes.length > 0 && (
              <Link href="/dashboard/resumes">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {resumes.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No resumes created yet</p>
              <p className="text-sm">Create your first resume to get started!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {resumes.slice(0, 3).map((resume) => (
                <div key={resume.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{resume.title}</p>
                      <p className="text-sm text-muted-foreground">
                        Updated {new Date(resume.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {resume.is_ai_enhanced && (
                      <Badge variant="secondary" className="text-xs">
                        AI Enhanced
                      </Badge>
                    )}
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function calculateProfileCompletion(profile: any, user: any): number {
  const fields = [user.email, profile?.full_name, profile?.phone, profile?.location, profile?.bio, profile?.linkedin]

  const completedFields = fields.filter((field) => field && field.trim().length > 0).length
  return Math.round((completedFields / fields.length) * 100)
}
