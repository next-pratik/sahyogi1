import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { CategoriesSection } from "@/components/categories-section"
import { WhyChooseSection } from "@/components/why-choose-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <CategoriesSection />
        <WhyChooseSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  )
}
