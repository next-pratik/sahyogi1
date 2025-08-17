"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"
import type { ResumeData } from "@/app/dashboard/resume-builder/page"

interface SkillsStepProps {
  data: ResumeData["skills"]
  onUpdate: (data: ResumeData["skills"]) => void
}

export function SkillsStep({ data, onUpdate }: SkillsStepProps) {
  const [newSkill, setNewSkill] = useState({ technical: "", soft: "", languages: "" })

  const addSkill = (category: keyof ResumeData["skills"], skill: string) => {
    if (skill.trim() && !data[category].includes(skill.trim())) {
      onUpdate({
        ...data,
        [category]: [...data[category], skill.trim()],
      })
      setNewSkill({ ...newSkill, [category]: "" })
    }
  }

  const removeSkill = (category: keyof ResumeData["skills"], skillToRemove: string) => {
    onUpdate({
      ...data,
      [category]: data[category].filter((skill) => skill !== skillToRemove),
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent, category: keyof ResumeData["skills"]) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill(category, newSkill[category])
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills & Expertise</CardTitle>
        <CardDescription>Add your technical skills, soft skills, and languages.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Technical Skills */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Technical Skills</Label>
          <div className="flex gap-2">
            <Input
              value={newSkill.technical}
              onChange={(e) => setNewSkill({ ...newSkill, technical: e.target.value })}
              onKeyPress={(e) => handleKeyPress(e, "technical")}
              placeholder="e.g., React, Python, AWS"
            />
            <Button
              type="button"
              size="sm"
              onClick={() => addSkill("technical", newSkill.technical)}
              disabled={!newSkill.technical.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.technical.map((skill) => (
              <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                {skill}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-destructive"
                  onClick={() => removeSkill("technical", skill)}
                />
              </Badge>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Soft Skills</Label>
          <div className="flex gap-2">
            <Input
              value={newSkill.soft}
              onChange={(e) => setNewSkill({ ...newSkill, soft: e.target.value })}
              onKeyPress={(e) => handleKeyPress(e, "soft")}
              placeholder="e.g., Leadership, Communication, Problem Solving"
            />
            <Button
              type="button"
              size="sm"
              onClick={() => addSkill("soft", newSkill.soft)}
              disabled={!newSkill.soft.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.soft.map((skill) => (
              <Badge key={skill} variant="outline" className="flex items-center gap-1">
                {skill}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-destructive"
                  onClick={() => removeSkill("soft", skill)}
                />
              </Badge>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Languages</Label>
          <div className="flex gap-2">
            <Input
              value={newSkill.languages}
              onChange={(e) => setNewSkill({ ...newSkill, languages: e.target.value })}
              onKeyPress={(e) => handleKeyPress(e, "languages")}
              placeholder="e.g., English (Native), Spanish (Fluent)"
            />
            <Button
              type="button"
              size="sm"
              onClick={() => addSkill("languages", newSkill.languages)}
              disabled={!newSkill.languages.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.languages.map((language) => (
              <Badge key={language} variant="default" className="flex items-center gap-1">
                {language}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-destructive"
                  onClick={() => removeSkill("languages", language)}
                />
              </Badge>
            ))}
          </div>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Tip:</strong> Add skills that are relevant to the jobs you're applying for. Our AI will help
            optimize these in the next step!
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
