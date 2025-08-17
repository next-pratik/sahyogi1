import { Card, CardContent } from "@/components/ui/card"
import { Search, MessageCircle, Handshake } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      icon: Search,
      title: "Search",
      description: "Tell us what you need. Search by job category, location, and date.",
      step: "1",
    },
    {
      icon: MessageCircle,
      title: "Connect",
      description: "Browse profiles, view ratings, and connect directly with available workers.",
      step: "2",
    },
    {
      icon: Handshake,
      title: "Hire",
      description: "Confirm the job and pay securely after the work is done. Simple and transparent.",
      step: "3",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-foreground mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting the help you need is simple with our three-step process
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <Card key={index} className="relative bg-card border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-accent-foreground font-bold text-sm">{step.step}</span>
                  </div>
                </div>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 mt-4">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-sans font-semibold text-xl text-foreground mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
