import { Card, CardContent } from "@/components/ui/card"
import { Shield, MessageSquare, Star, DollarSign } from "lucide-react"

export function WhyChooseSection() {
  const benefits = [
    {
      icon: Shield,
      title: "Verified Profiles",
      description: "Every worker's profile is reviewed for your peace of mind.",
    },
    {
      icon: MessageSquare,
      title: "Direct Communication",
      description: "No middlemen. Chat and negotiate directly.",
    },
    {
      icon: Star,
      title: "Transparent Ratings",
      description: "Make informed decisions with community-powered reviews.",
    },
    {
      icon: DollarSign,
      title: "Fair Wages",
      description: "A platform that promotes fair compensation for honest work.",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-foreground mb-4">Why Choose Karmik Connect?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're committed to creating a trustworthy platform that benefits everyone
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-card border-border text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-sans font-semibold text-lg text-foreground mb-4">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
