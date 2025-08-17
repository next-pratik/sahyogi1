import { Card, CardContent } from "@/components/ui/card"
import { Hammer, Sparkles, Paintbrush, Wrench, TreePine, Users, Car, MoreHorizontal } from "lucide-react"

export function CategoriesSection() {
  const categories = [
    { icon: Hammer, name: "Construction & Labour", color: "text-orange-600" },
    { icon: Sparkles, name: "Home Cleaning & Maid Services", color: "text-blue-600" },
    { icon: Paintbrush, name: "Painting & Polishing", color: "text-purple-600" },
    { icon: Wrench, name: "Plumbing & Electrical", color: "text-red-600" },
    { icon: TreePine, name: "Gardening & Landscaping", color: "text-green-600" },
    { icon: Users, name: "Event Help & Staffing", color: "text-pink-600" },
    { icon: Car, name: "Driving Services", color: "text-indigo-600" },
    { icon: MoreHorizontal, name: "...and more", color: "text-gray-600" },
  ]

  return (
    <section id="categories" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-foreground mb-4">Categories of Work</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find skilled workers for any job, from home maintenance to event support
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:shadow-lg transition-all hover:scale-105 cursor-pointer"
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <category.icon className={`w-8 h-8 ${category.color}`} />
                </div>
                <h3 className="font-medium text-foreground text-sm leading-tight">{category.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
