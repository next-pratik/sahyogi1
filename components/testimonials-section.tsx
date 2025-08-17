import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Priya S.",
      location: "Mumbai",
      text: "I needed a painter on short notice and found a fantastic professional through Karmik Connect. The process was so simple and transparent. Highly recommended!",
      rating: 5,
      avatar: "/professional-indian-woman-smiling.png",
    },
    {
      name: "Rajesh K.",
      location: "Delhi",
      text: "As a small business owner, finding reliable workers was always a challenge. Karmik Connect has made it incredibly easy to find skilled laborers for our projects.",
      rating: 5,
      avatar: "/professional-indian-man-smiling.png",
    },
    {
      name: "Meera T.",
      location: "Bangalore",
      text: "The domestic help I found through this platform has been amazing. The verification process gave me confidence, and the direct communication made everything smooth.",
      rating: 5,
      avatar: "/happy-indian-professional.png",
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-foreground mb-4">What Our Users Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real experiences from people who found the help they needed
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card border-border">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
