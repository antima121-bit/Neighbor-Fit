"use client"

import { useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { AnimatedButton } from "@/components/ui/animated-button"
import { MapPin, User, Sliders, Zap, ArrowRight, CheckCircle } from "lucide-react"
import { LeafletMap } from "@/components/ui/leaflet-map"

export function QuickStartSection() {
  const [currentStep, setCurrentStep] = useState(0)
  const [userLocation, setUserLocation] = useState("")
  const [preferences, setPreferences] = useState({
    budget: 30000,
    commute: 5,
    safety: 8,
    nightlife: 6,
  })

  const steps = [
    {
      icon: MapPin,
      title: "Location Detection",
      description: "We'll detect your current location or let you enter your preferred area",
      action: "Detect Location",
    },
    {
      icon: User,
      title: "Quick Profile",
      description: "Tell us about your lifestyle preferences in just 2 minutes",
      action: "Set Preferences",
    },
    {
      icon: Sliders,
      title: "Smart Matching",
      description: "Our AI analyzes thousands of data points to find your matches",
      action: "Find Matches",
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get personalized neighborhood recommendations immediately",
      action: "View Results",
    },
  ]

  const handleStepAction = (stepIndex: number) => {
    if (stepIndex < steps.length - 1) {
      setCurrentStep(stepIndex + 1)
    }
  }

  const sampleMatches = [
    {
      name: "Cyber City",
      score: 94,
      highlights: ["IT Hub", "Metro Access", "Safe"],
      image: "/placeholder.svg?height=200&width=300",
      rent: "₹35,000/month",
    },
    {
      name: "Koramangala",
      score: 89,
      highlights: ["Startup Hub", "Cafes", "Young Crowd"],
      image: "/placeholder.svg?height=200&width=300",
      rent: "₹28,000/month",
    },
    {
      name: "Bandra West",
      score: 87,
      highlights: ["Bollywood", "Sea View", "Trendy"],
      image: "/placeholder.svg?height=200&width=300",
      rent: "₹55,000/month",
    },
  ]

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get Started in <span className="gradient-text">5 Minutes</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Experience the power of data-driven neighborhood matching with our intelligent onboarding flow.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => (
            <GlassCard
              key={index}
              className={`p-6 text-center cursor-pointer transition-all duration-300 ${
                index <= currentStep ? "ring-2 ring-blue-400/50" : ""
              } ${index === currentStep ? "scale-105" : ""}`}
              onClick={() => setCurrentStep(index)}
            >
              <div
                className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  index <= currentStep ? "bg-blue-500/20 text-blue-400" : "bg-white/10 text-white/60"
                }`}
              >
                {index < currentStep ? <CheckCircle className="w-6 h-6" /> : <step.icon className="w-6 h-6" />}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-white/70 mb-4">{step.description}</p>
              {index === currentStep && (
                <AnimatedButton variant="glass" size="sm" onClick={() => handleStepAction(index)}>
                  {step.action}
                </AnimatedButton>
              )}
            </GlassCard>
          ))}
        </div>

        {/* Interactive Demo */}
        <GlassCard className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Side - Input Form */}
            <div>
              <h3 className="text-2xl font-bold mb-6 gradient-text">Try It Now</h3>

              {currentStep === 0 && (
                <div className="space-y-4">
                  <LeafletMap
                    height="300px"
                    onLocationSelect={(location) => {
                      setUserLocation(location.address)
                      console.log("Selected location:", location)
                    }}
                    searchEnabled={true}
                    showControls={false}
                  />
                  <AnimatedButton variant="glass" className="w-full" onClick={() => handleStepAction(0)}>
                    <MapPin className="w-4 h-4 mr-2" />
                    Use Selected Location
                  </AnimatedButton>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-white/80 mb-2">Budget Range (Monthly Rent)</label>
                    <input
                      type="range"
                      min="10000"
                      max="100000"
                      step="5000"
                      value={preferences.budget}
                      onChange={(e) => setPreferences((prev) => ({ ...prev, budget: Number.parseInt(e.target.value) }))}
                      className="w-full"
                    />
                    <div className="text-center text-white/60 mt-1">
                      ₹{preferences.budget.toLocaleString("en-IN")}/month
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 mb-2">Commute Importance (1-10)</label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={preferences.commute}
                      onChange={(e) =>
                        setPreferences((prev) => ({ ...prev, commute: Number.parseInt(e.target.value) }))
                      }
                      className="w-full"
                    />
                    <div className="text-center text-white/60 mt-1">{preferences.commute}/10</div>
                  </div>

                  <div>
                    <label className="block text-white/80 mb-2">Safety Priority (1-10)</label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={preferences.safety}
                      onChange={(e) => setPreferences((prev) => ({ ...prev, safety: Number.parseInt(e.target.value) }))}
                      className="w-full"
                    />
                    <div className="text-center text-white/60 mt-1">{preferences.safety}/10</div>
                  </div>

                  <AnimatedButton variant="glass" className="w-full" onClick={() => handleStepAction(1)}>
                    Continue to Matching
                  </AnimatedButton>
                </div>
              )}

              {currentStep === 2 && (
                <div className="text-center space-y-4">
                  <div className="animate-spin w-12 h-12 border-4 border-blue-400/30 border-t-blue-400 rounded-full mx-auto"></div>
                  <p className="text-white/80">Analyzing 15,000+ neighborhoods...</p>
                  <p className="text-sm text-white/60">Processing your preferences against real-time data</p>
                  <AnimatedButton variant="glass" className="w-full" onClick={() => handleStepAction(2)}>
                    View My Matches
                  </AnimatedButton>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Your Personalized Matches</h4>
                  <p className="text-white/70">Based on your preferences, here are your top neighborhood matches:</p>
                  <AnimatedButton variant="glass" className="w-full">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Explore All Matches
                  </AnimatedButton>
                </div>
              )}
            </div>

            {/* Right Side - Results Preview */}
            <div>
              <h3 className="text-2xl font-bold mb-6 gradient-text">Sample Results</h3>
              <div className="space-y-4">
                {sampleMatches.map((match, index) => (
                  <GlassCard key={index} className="p-4 hover:scale-105 transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <img
                        src={match.image || "/placeholder.svg"}
                        alt={match.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-white">{match.name}</h4>
                          <div className="text-lg font-bold text-green-400">{match.score}%</div>
                        </div>
                        <p className="text-lg font-bold text-blue-400">{match.rent}</p>
                        <div className="flex flex-wrap gap-2">
                          {match.highlights.map((highlight, idx) => (
                            <span key={idx} className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  )
}
