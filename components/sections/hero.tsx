"use client"

import { useState, useEffect } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Typewriter } from "@/components/ui/typewriter"
import { FloatingParticles } from "@/components/ui/floating-particles"
import { ArrowDown, MapPin, Heart, Star } from "lucide-react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    { icon: MapPin, text: "Smart Location Matching" },
    { icon: Heart, text: "Lifestyle Compatibility" },
    { icon: Star, text: "Personalized Recommendations" },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <FloatingParticles count={60} />

      <div className="container mx-auto px-4 py-20">
        <div
          className={`text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">Find Your Perfect</h1>
            <div className="text-5xl md:text-7xl font-bold gradient-text">
              <Typewriter text="Neighborhood" speed={150} />
            </div>
          </div>

          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover neighborhoods that match your lifestyle, preferences, and dreams. Our AI-powered platform analyzes
            thousands of data points to find your ideal home.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <GlassCard
                key={index}
                className={`p-6 transition-all duration-700 delay-${index * 200}`}
                style={{
                  animationDelay: `${index * 0.2}s`,
                }}
              >
                <feature.icon className="w-8 h-8 mx-auto mb-4 text-blue-400" />
                <p className="text-white/90 font-medium">{feature.text}</p>
              </GlassCard>
            ))}
          </div>

     
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <AnimatedButton variant="glass" size="lg" className="group">
              <span className="mr-2">Start Your Journey</span>
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-200" />
            </AnimatedButton>

            <AnimatedButton variant="outline" size="lg" magnetic={false}>
              Watch Demo
            </AnimatedButton>
          </div>

        
          <div className="animate-bounce">
            <ArrowDown className="w-6 h-6 mx-auto text-white/60" />
          </div>
        </div>
      </div>

      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </section>
  )
}
