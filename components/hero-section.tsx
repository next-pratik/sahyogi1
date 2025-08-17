import { Button } from "@/components/ui/button"
import { Search, Users } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 to-accent/5 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-sans font-bold text-4xl md:text-6xl lg:text-7xl text-foreground mb-6 leading-tight">
            काम आसान, कामगार भरोसेमंद।
          </h1>
          <p className="font-sans text-xl md:text-2xl text-primary font-semibold mb-4">
            Work Made Easy, Workers You Can Trust.
          </p>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Find and hire skilled daily wage workers, maids, and laborers in your area. Verified, reliable, and ready to
            help.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-3">
              <Search className="w-5 h-5 mr-2" />
              Find Help Now
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent">
              <Users className="w-5 h-5 mr-2" />
              Join as Worker
            </Button>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <img
              src="/indian-workers-group.png"
              alt="Diverse group of skilled workers"
              className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
