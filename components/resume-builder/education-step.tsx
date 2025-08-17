"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from "lucide-react"
import type { ResumeData } from "@/app/dashboard/resume-builder/page"

interface EducationStepProps {
  data: ResumeData["education"]
  onUpdate: (data: ResumeData["education"]) => void
}

export function EducationStep({ data, onUpdate }: EducationStepProps) {
  const addEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      gpa: "",
    }
    onUpdate([...data, newEducation])
  }

  const updateEducation = (id: string, field: string, value: string) => {
    const updated = data.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    onUpdate(updated)
  }

  const removeEducation = (id: string) => {
    onUpdate(data.filter((edu) => edu.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Education</CardTitle>
            <CardDescription>Add your educational background and qualifications.</CardDescription>
          </div>
          <Button onClick={addEducation} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No education added yet.</p>
            <p className="text-sm">Click "Add Education" to get started.</p>
          </div>
        ) : (
          data.map((education, index) => (
            <Card key={education.id} className="border-dashed">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Education #{index + 1}</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => removeEducation(education.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Institution *</Label>
                    <Input
                      value={education.institution}
                      onChange={(e) => updateEducation(education.id, "institution", e.target.value)}
                      placeholder="University of Example"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Degree *</Label>
                    <Input
                      value={education.degree}
                      onChange={(e) => updateEducation(education.id, "degree", e.target.value)}
                      placeholder="Bachelor of Science"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Field of Study</Label>
                  <Input
                    value={education.field}
                    onChange={(e) => updateEducation(education.id, "field", e.target.value)}
                    placeholder="Computer Science"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      type="month"
                      value={education.startDate}
                      onChange={(e) => updateEducation(education.id, "startDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      type="month"
                      value={education.endDate}
                      onChange={(e) => updateEducation(education.id, "endDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>GPA (Optional)</Label>
                    <Input
                      value={education.gpa}
                      onChange={(e) => updateEducation(education.id, "gpa", e.target.value)}
                      placeholder="3.8"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </CardContent>
    </Card>
  )
}
