"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Trash2 } from "lucide-react"
import type { ResumeData } from "@/app/dashboard/resume-builder/page"

interface ExperienceStepProps {
  data: ResumeData["experience"]
  onUpdate: (data: ResumeData["experience"]) => void
}

export function ExperienceStep({ data, onUpdate }: ExperienceStepProps) {
  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }
    onUpdate([...data, newExperience])
  }

  const updateExperience = (id: string, field: string, value: any) => {
    const updated = data.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    onUpdate(updated)
  }

  const removeExperience = (id: string) => {
    onUpdate(data.filter((exp) => exp.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Work Experience</CardTitle>
            <CardDescription>Add your work history and key achievements.</CardDescription>
          </div>
          <Button onClick={addExperience} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Experience
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No work experience added yet.</p>
            <p className="text-sm">Click "Add Experience" to get started.</p>
          </div>
        ) : (
          data.map((experience, index) => (
            <Card key={experience.id} className="border-dashed">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Experience #{index + 1}</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => removeExperience(experience.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Company Name *</Label>
                    <Input
                      value={experience.company}
                      onChange={(e) => updateExperience(experience.id, "company", e.target.value)}
                      placeholder="Company Inc."
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Job Title *</Label>
                    <Input
                      value={experience.position}
                      onChange={(e) => updateExperience(experience.id, "position", e.target.value)}
                      placeholder="Software Engineer"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      type="month"
                      value={experience.startDate}
                      onChange={(e) => updateExperience(experience.id, "startDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      type="month"
                      value={experience.endDate}
                      onChange={(e) => updateExperience(experience.id, "endDate", e.target.value)}
                      disabled={experience.current}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`current-${experience.id}`}
                    checked={experience.current}
                    onCheckedChange={(checked) => updateExperience(experience.id, "current", checked)}
                  />
                  <Label htmlFor={`current-${experience.id}`}>I currently work here</Label>
                </div>

                <div className="space-y-2">
                  <Label>Job Description & Achievements</Label>
                  <Textarea
                    value={experience.description}
                    onChange={(e) => updateExperience(experience.id, "description", e.target.value)}
                    placeholder="• Developed and maintained web applications using React and Node.js&#10;• Led a team of 3 developers on key projects&#10;• Improved application performance by 40%"
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">
                    Use bullet points to highlight your key responsibilities and achievements.
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </CardContent>
    </Card>
  )
}
