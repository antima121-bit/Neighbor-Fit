"use client"

import { useState, useEffect } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { TrendingUp, Users, MapPin, AlertTriangle, CheckCircle, Clock } from "lucide-react"

export function ProblemAnalysisSection() {
  const [stats, setStats] = useState({
    regretRate: 0,
    avgSearchTime: 0,
    dataPoints: 0,
    neighborhoods: 0,
  })

  useEffect(() => {
    // Animate numbers on load
    const timer = setTimeout(() => {
      setStats({
        regretRate: 78,
        avgSearchTime: 6,
        dataPoints: 15000,
        neighborhoods: 12500,
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const problemStats = [
    {
      icon: AlertTriangle,
      value: `${stats.regretRate}%`,
      label: "Regret Their Choice",
      description: "People who wish they chose differently",
      color: "text-red-400",
    },
    {
      icon: Clock,
      value: `${stats.avgSearchTime}mo`,
      label: "Average Search Time",
      description: "Time spent finding the right area",
      color: "text-yellow-400",
    },
    {
      icon: MapPin,
      value: `${stats.dataPoints.toLocaleString()}+`,
      label: "Data Points",
      description: "Real-time neighborhood metrics",
      color: "text-blue-400",
    },
    {
      icon: CheckCircle,
      value: `${stats.neighborhoods.toLocaleString()}+`,
      label: "Neighborhoods",
      description: "Analyzed and scored locations",
      color: "text-green-400",
    },
  ]

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The <span className="gradient-text">Problem</span> We Solve
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Finding the perfect neighborhood is complex. We use data science and AI to simplify this life-changing
            decision.
          </p>
        </div>

        {/* Problem Statistics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {problemStats.map((stat, index) => (
            <GlassCard key={index} className="p-6 text-center group hover:scale-105 transition-all duration-300">
              <stat.icon
                className={`w-12 h-12 mx-auto mb-4 ${stat.color} group-hover:scale-110 transition-transform duration-300`}
              />
              <div className="text-3xl font-bold mb-2 gradient-text">{stat.value}</div>
              <div className="text-lg font-semibold text-white mb-2">{stat.label}</div>
              <p className="text-sm text-white/70">{stat.description}</p>
            </GlassCard>
          ))}
        </div>

        {/* Research Insights */}
        <GlassCard className="p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 gradient-text">Our Research Insights</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <TrendingUp className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-white">Location decisions impact life satisfaction by 40%</p>
                    <p className="text-sm text-white/70">Based on longitudinal studies of 10,000+ residents</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-white">85% prioritize lifestyle over price alone</p>
                    <p className="text-sm text-white/70">When given comprehensive neighborhood data</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-white">Data-driven decisions reduce regret by 60%</p>
                    <p className="text-sm text-white/70">Compared to intuition-based choices</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-white">Current Hypothesis Testing</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-sm text-white/90">Commute time vs. lifestyle balance</span>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Validated</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-sm text-white/90">Safety perception vs. actual crime data</span>
                  <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">Testing</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-sm text-white/90">Amenity density impact on satisfaction</span>
                  <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Analyzing</span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  )
}
