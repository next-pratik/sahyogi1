import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { FileText, PlusCircle, Calendar, Sparkles } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { getUserResumes } from "@/lib/database"

export default async function ResumesPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const resumes = await getUserResumes(user.id)

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Resumes</h1>
          <p className="text-muted-foreground">Manage and organize all your created resumes.</p>
        </div>
        <Link href="/dashboard/resume-builder">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Create New Resume
          </Button>
        </Link>
      </div>

      {resumes.length === 0 ? (
        <Card className="border-dashed border-2">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No resumes yet</h3>
            <p className="text-muted-foreground text-center mb-6 max-w-md">
              Create your first AI-powered resume to get started. Our intelligent builder will help you craft the
              perfect resume.
            </p>
            <Link href="/dashboard/resume-builder">
              <Button size="lg">
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Your First Resume
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {resumes.map((resume) => (
            <Card key={resume.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg line-clamp-1">{resume.title}</CardTitle>
                  </div>
                  {resume.is_ai_enhanced && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                      <Sparkles className="h-3 w-3 mr-1" />
                      AI
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  Updated {new Date(resume.updated_at).toLocaleDateString()}
                </div>

                <div className="text-sm text-muted-foreground">
                  Template: {resume.template_id === "default" ? "Classic Professional" : resume.template_id}
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
