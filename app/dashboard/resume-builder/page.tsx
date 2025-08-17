"use client"

import { useState } from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { PersonalInfoStep } from "@/components/resume-builder/personal-info-step"
import { ExperienceStep } from "@/components/resume-builder/experience-step"
import { EducationStep } from "@/components/resume-builder/education-step"
import { SkillsStep } from "@/components/resume-builder/skills-step"
import { AIEnhancementStep } from "@/components/resume-builder/ai-enhancement-step"
import { PreviewStep } from "@/components/resume-builder/preview-step"

export interface ResumeData {
  personalInfo: {
    fullName: string
    email: string
    phone: string
    location: string
    summary: string
    linkedin: string
    website: string
  }
  experience: Array<{
    id: string
    company: string
    position: string
    startDate: string
    endDate: string
    current: boolean
    description: string
  }>
  education: Array<{
    id: string
    institution: string
    degree: string
    field: string
    startDate: string
    endDate: string
    gpa?: string
  }>
  skills: {
    technical: string[]
    soft: string[]
    languages: string[]
  }
  aiEnhanced: boolean
  enhancedContent?: {
    summary: string
    experienceDescriptions: Record<string, string>
  }
}

const steps = [
  { id: 1, name: "Personal Info", description: "Basic information and contact details" },
  { id: 2, name: "Experience", description: "Work history and achievements" },
  { id: 3, name: "Education", description: "Educational background" },
  { id: 4, name: "Skills", description: "Technical and soft skills" },
  { id: 5, name: "AI Enhancement", description: "Let AI improve your content" },
  { id: 6, name: "Preview & Export", description: "Review and download your resume" },
]

export default function ResumeBuilderPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
      linkedin: "",
      website: "",
    },
    experience: [],
    education: [],
    skills: {
      technical: [],
      soft: [],
      languages: [],
    },
    aiEnhanced: false,
  })

  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = (currentStep / steps.length) * 100

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            data={resumeData.personalInfo}
            onUpdate={(data) => updateResumeData("personalInfo", data)}
          />
        )
      case 2:
        return <ExperienceStep data={resumeData.experience} onUpdate={(data) => updateResumeData("experience", data)} />
      case 3:
        return <EducationStep data={resumeData.education} onUpdate={(data) => updateResumeData("education", data)} />
      case 4:
        return <SkillsStep data={resumeData.skills} onUpdate={(data) => updateResumeData("skills", data)} />
      case 5:
        return <AIEnhancementStep resumeData={resumeData} onUpdate={setResumeData} />
      case 6:
        return <PreviewStep resumeData={resumeData} />
      default:
        return null
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Resume Builder</h1>
        <p className="text-muted-foreground">Create a professional resume with AI assistance in just a few steps.</p>
      </div>

      {/* Progress */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">
                Step {currentStep} of {steps.length}
              </CardTitle>
              <CardDescription>{steps[currentStep - 1].description}</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium mb-1">{Math.round(progress)}% Complete</div>
              <Progress value={progress} className="w-32" />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Step Content */}
      <div className="mb-8">{renderStep()}</div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button onClick={nextStep} disabled={currentStep === steps.length}>
          Next
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
