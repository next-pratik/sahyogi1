"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Loader2, Sparkles, RefreshCw } from "lucide-react"
import type { ResumeData } from "@/app/dashboard/resume-builder/page"

interface AIEnhancementStepProps {
  resumeData: ResumeData
  onUpdate: (data: ResumeData) => void
}

export function AIEnhancementStep({ resumeData, onUpdate }: AIEnhancementStepProps) {
  const [enhancing, setEnhancing] = useState(false)
  const [targetRole, setTargetRole] = useState("")

  const enhanceWithAI = async () => {
    setEnhancing(true)

    try {
      // Simulate AI enhancement - in a real app, this would call an AI API
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Mock enhanced content
      const enhancedSummary = `${resumeData.personalInfo.summary} Enhanced with AI: Results-driven professional with proven expertise in driving innovation and delivering exceptional outcomes. Demonstrated ability to lead cross-functional teams and implement strategic solutions that exceed organizational goals.`

      const enhancedExperience: Record<string, string> = {}
      resumeData.experience.forEach((exp) => {
        enhancedExperience[exp.id] =
          `${exp.description}\n\n• AI Enhanced: Leveraged cutting-edge technologies to optimize performance\n• Collaborated with stakeholders to deliver measurable business impact\n• Implemented best practices resulting in improved efficiency and quality`
      })

      onUpdate({
        ...resumeData,
        aiEnhanced: true,
        enhancedContent: {
          summary: enhancedSummary,
          experienceDescriptions: enhancedExperience,
        },
      })
    } catch (error) {
      console.error("Error enhancing resume:", error)
    } finally {
      setEnhancing(false)
    }
  }

  const resetEnhancements = () => {
    onUpdate({
      ...resumeData,
      aiEnhanced: false,
      enhancedContent: undefined,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Enhancement
        </CardTitle>
        <CardDescription>
          Let our AI improve your resume content to make it more compelling and ATS-friendly.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!resumeData.aiEnhanced ? (
          <>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Target Role (Optional)</label>
                <Textarea
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g., Senior Software Engineer, Product Manager, Data Scientist..."
                  rows={2}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Specify the role you're targeting to get more relevant enhancements.
                </p>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg border border-primary/20">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  What our AI will do:
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Enhance your professional summary with impactful language</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Improve job descriptions with action verbs and quantifiable achievements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Optimize content for Applicant Tracking Systems (ATS)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Ensure consistent professional tone throughout</span>
                  </li>
                </ul>
              </div>
            </div>

            <Button onClick={enhanceWithAI} disabled={enhancing} size="lg" className="w-full">
              {enhancing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Enhancing with AI...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Enhance My Resume with AI
                </>
              )}
            </Button>
          </>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                <Sparkles className="h-3 w-3 mr-1" />
                AI Enhanced
              </Badge>
              <Button variant="outline" size="sm" onClick={resetEnhancements}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset Enhancements
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Enhanced Professional Summary:</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm">{resumeData.enhancedContent?.summary}</p>
                </div>
              </div>

              {resumeData.experience.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Enhanced Experience Descriptions:</h3>
                  <div className="space-y-3">
                    {resumeData.experience.map((exp) => (
                      <div key={exp.id} className="bg-muted p-4 rounded-lg">
                        <h4 className="font-medium text-sm mb-2">
                          {exp.position} at {exp.company}
                        </h4>
                        <p className="text-sm whitespace-pre-line">
                          {resumeData.enhancedContent?.experienceDescriptions[exp.id]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Great!</strong> Your resume has been enhanced with AI. Review the changes and proceed to the
                next step to preview your final resume.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
