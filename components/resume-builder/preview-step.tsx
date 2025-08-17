"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Eye, Share2 } from "lucide-react"
import type { ResumeData } from "@/app/dashboard/resume-builder/page"

interface PreviewStepProps {
  resumeData: ResumeData
}

export function PreviewStep({ resumeData }: PreviewStepProps) {
  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    console.log("Downloading resume...", resumeData)
    alert("Resume download functionality would be implemented here!")
  }

  const handlePreview = () => {
    // In a real app, this would open a full preview modal
    console.log("Opening preview...", resumeData)
    alert("Full preview functionality would be implemented here!")
  }

  const handleShare = () => {
    // In a real app, this would generate a shareable link
    console.log("Sharing resume...", resumeData)
    alert("Share functionality would be implemented here!")
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString + "-01")
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  return (
    <div className="space-y-6">
      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Your Resume is Ready!</CardTitle>
          <CardDescription>
            {resumeData.aiEnhanced
              ? "Your AI-enhanced resume is ready for download and sharing."
              : "Your resume is complete and ready for download."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleDownload} size="lg">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" onClick={handlePreview} size="lg">
              <Eye className="h-4 w-4 mr-2" />
              Full Preview
            </Button>
            <Button variant="outline" onClick={handleShare} size="lg">
              <Share2 className="h-4 w-4 mr-2" />
              Share Link
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resume Preview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Resume Preview</CardTitle>
            {resumeData.aiEnhanced && (
              <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                AI Enhanced
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-white border rounded-lg p-8 shadow-sm max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-6 pb-4 border-b">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{resumeData.personalInfo.fullName}</h1>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  {resumeData.personalInfo.email} • {resumeData.personalInfo.phone}
                </p>
                <p>{resumeData.personalInfo.location}</p>
                {resumeData.personalInfo.linkedin && <p>{resumeData.personalInfo.linkedin}</p>}
              </div>
            </div>

            {/* Professional Summary */}
            {(resumeData.personalInfo.summary || resumeData.enhancedContent?.summary) && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-1">
                  Professional Summary
                </h2>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {resumeData.enhancedContent?.summary || resumeData.personalInfo.summary}
                </p>
              </div>
            )}

            {/* Experience */}
            {resumeData.experience.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                  Work Experience
                </h2>
                <div className="space-y-4">
                  {resumeData.experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium text-gray-900">{exp.position}</h3>
                        <span className="text-sm text-gray-600">
                          {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{exp.company}</p>
                      <div className="text-sm text-gray-700 whitespace-pre-line">
                        {resumeData.enhancedContent?.experienceDescriptions[exp.id] || exp.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {resumeData.education.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">Education</h2>
                <div className="space-y-3">
                  {resumeData.education.map((edu) => (
                    <div key={edu.id}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {edu.degree} {edu.field && `in ${edu.field}`}
                          </h3>
                          <p className="text-sm text-gray-700">{edu.institution}</p>
                        </div>
                        <span className="text-sm text-gray-600">
                          {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                        </span>
                      </div>
                      {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {(resumeData.skills.technical.length > 0 ||
              resumeData.skills.soft.length > 0 ||
              resumeData.skills.languages.length > 0) && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">Skills</h2>
                <div className="space-y-2">
                  {resumeData.skills.technical.length > 0 && (
                    <div>
                      <span className="text-sm font-medium text-gray-900">Technical: </span>
                      <span className="text-sm text-gray-700">{resumeData.skills.technical.join(", ")}</span>
                    </div>
                  )}
                  {resumeData.skills.soft.length > 0 && (
                    <div>
                      <span className="text-sm font-medium text-gray-900">Soft Skills: </span>
                      <span className="text-sm text-gray-700">{resumeData.skills.soft.join(", ")}</span>
                    </div>
                  )}
                  {resumeData.skills.languages.length > 0 && (
                    <div>
                      <span className="text-sm font-medium text-gray-900">Languages: </span>
                      <span className="text-sm text-gray-700">{resumeData.skills.languages.join(", ")}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
