"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { ResumeData } from "@/app/dashboard/resume-builder/page"

interface PersonalInfoStepProps {
  data: ResumeData["personalInfo"]
  onUpdate: (data: ResumeData["personalInfo"]) => void
}

export function PersonalInfoStep({ data, onUpdate }: PersonalInfoStepProps) {
  const handleChange = (field: keyof ResumeData["personalInfo"], value: string) => {
    onUpdate({
      ...data,
      [field]: value,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Enter your basic contact information and professional summary.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              value={data.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="John Doe"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="john@example.com"
              required
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={data.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={data.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="New York, NY"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">Professional Summary</Label>
          <Textarea
            id="summary"
            value={data.summary}
            onChange={(e) => handleChange("summary", e.target.value)}
            placeholder="Write a brief professional summary highlighting your key skills and experience..."
            rows={4}
          />
          <p className="text-xs text-muted-foreground">
            Don't worry if this isn't perfect - our AI will help enhance it later!
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn Profile</Label>
            <Input
              id="linkedin"
              value={data.linkedin}
              onChange={(e) => handleChange("linkedin", e.target.value)}
              placeholder="https://linkedin.com/in/johndoe"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Personal Website</Label>
            <Input
              id="website"
              value={data.website}
              onChange={(e) => handleChange("website", e.target.value)}
              placeholder="https://johndoe.com"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
