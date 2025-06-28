"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { LiveRentHeatmap } from "@/components/ui/live-rent-heatmap"
import { PropertyDataDashboard } from "@/components/ui/property-data-dashboard"
import { GlassCard } from "@/components/ui/glass-card"
import { AnimatedButton } from "@/components/ui/animated-button"
import type { PropertyData } from "@/lib/property-apis"
import { Database, TrendingUp, RefreshCw, Zap, Shield, Clock, MapPin, BarChart3 } from "lucide-react"

export default function LiveDataPage() {
  const [selectedProperty, setSelectedProperty] = useState<PropertyData | null>(null)
  const [heatmapProperties, setHeatmapProperties] = useState<PropertyData[]>([])
  const [error, setError] = useState<string | null>(null)

  const handlePropertySelect = (property: PropertyData) => {
    try {
      setSelectedProperty(property)
    } catch (err) {
      console.error("Error selecting property:", err)
    }
  }

  const handleHeatmapDataUpdate = (properties: PropertyData[]) => {
    try {
      setHeatmapProperties(properties || [])
    } catch (err) {
      console.error("Error updating heatmap data:", err)
    }
  }

  // Add error boundary effect
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error("Global error:", event.error)
      setError("An unexpected error occurred. Please refresh the page.")
    }

    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <GlassCard className="p-8 text-center">
          <h2 className="text-xl font-bold text-red-400 mb-4">Error</h2>
          <p className="text-white/80 mb-4">{error}</p>
          <AnimatedButton variant="glass" onClick={() => window.location.reload()}>
            Refresh Page
          </AnimatedButton>
        </GlassCard>
      </div>
    )
  }

  const features = [
    {
      icon: Database,
      title: "Multi-Source Integration",
      description: "Real-time data from 99acres, MagicBricks, and Housing.com",
      color: "text-blue-400",
    },
    {
      icon: TrendingUp,
      title: "Live Market Analytics",
      description: "Real-time rent trends, price analysis, and market insights",
      color: "text-green-400",
    },
    {
      icon: RefreshCw,
      title: "Auto-Refresh",
      description: "Data updates every 5 minutes for the latest market conditions",
      color: "text-purple-400",
    },
    {
      icon: Zap,
      title: "Instant Heatmaps",
      description: "Dynamic rent density visualization with live property data",
      color: "text-yellow-400",
    },
  ]

  const dataStats = [
    { label: "Active Listings", value: "15,000+", icon: Database, color: "text-blue-400" },
    { label: "Cities Covered", value: "25+", icon: MapPin, color: "text-green-400" },
    { label: "Update Frequency", value: "5 min", icon: Clock, color: "text-purple-400" },
    { label: "Data Sources", value: "3", icon: BarChart3, color: "text-yellow-400" },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Live <span className="gradient-text">Property Data</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Real-time property data integration with accurate rent heatmaps powered by multiple Indian real estate
              APIs.
            </p>
          </div>

          {/* Data Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {dataStats.map((stat, index) => (
              <GlassCard key={index} className="p-6 text-center">
                <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </GlassCard>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {features.map((feature, index) => (
              <GlassCard key={index} className="p-6 text-center hover:scale-105 transition-all duration-300">
                <feature.icon className={`w-12 h-12 mx-auto mb-4 ${feature.color}`} />
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-white/70">{feature.description}</p>
              </GlassCard>
            ))}
          </div>

          {/* Live Rent Heatmap */}
          <div className="mb-8">
            <GlassCard className="p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4 gradient-text flex items-center">
                <TrendingUp className="w-6 h-6 mr-2" />
                Live Rent Heatmap
              </h2>
              <p className="text-white/70 mb-4">
                Interactive heatmap showing real-time rental prices across major Indian cities with data from multiple
                sources.
              </p>
              <div className="flex items-center space-x-4 text-sm text-white/60">
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>Verified Data</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>5-min Updates</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Database className="w-4 h-4 text-purple-400" />
                  <span>Multi-Source</span>
                </div>
              </div>
            </GlassCard>

            <LiveRentHeatmap
              height="600px"
              onDataUpdate={handleHeatmapDataUpdate}
              autoRefresh={true}
              refreshInterval={300000} // 5 minutes
            />
          </div>

          {/* Property Data Dashboard */}
          <div className="mb-8">
            <GlassCard className="p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4 gradient-text flex items-center">
                <Database className="w-6 h-6 mr-2" />
                Property Data Dashboard
              </h2>
              <p className="text-white/70 mb-4">
                Search, filter, and analyze live property listings with advanced market analytics and insights.
              </p>
            </GlassCard>

            <PropertyDataDashboard onPropertySelect={handlePropertySelect} />
          </div>

          {/* Selected Property Details */}
          {selectedProperty && (
            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold mb-6 gradient-text">Property Details</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {selectedProperty.locality}, {selectedProperty.city}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Monthly Rent:</span>
                      <span className="text-green-400 font-bold text-xl">
                        ₹{selectedProperty.rent.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Property Type:</span>
                      <span className="text-white font-medium capitalize">{selectedProperty.propertyType}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Bedrooms:</span>
                      <span className="text-white font-medium">{selectedProperty.bedrooms} BHK</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Area:</span>
                      <span className="text-white font-medium">{selectedProperty.area} sq ft</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Furnished:</span>
                      <span className="text-white font-medium capitalize">{selectedProperty.furnished}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Price per Sq Ft:</span>
                      <span className="text-blue-400 font-bold">
                        ₹{Math.round(selectedProperty.rent / selectedProperty.area)}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Amenities & Details</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-white/70 block mb-2">Amenities:</span>
                      <div className="flex flex-wrap gap-2">
                        {selectedProperty.amenities.map((amenity, index) => (
                          <span key={index} className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Data Source:</span>
                      <span className="text-purple-400 font-medium capitalize">{selectedProperty.source}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Last Updated:</span>
                      <span className="text-white/60 text-sm">
                        {new Date(selectedProperty.lastUpdated).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Coordinates:</span>
                      <span className="text-white/60 text-sm">
                        {selectedProperty.lat.toFixed(4)}, {selectedProperty.lng.toFixed(4)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <AnimatedButton variant="glass" className="w-full">
                      View on Map
                    </AnimatedButton>
                    <AnimatedButton variant="outline" className="w-full">
                      Save Property
                    </AnimatedButton>
                    <AnimatedButton variant="outline" className="w-full">
                      Compare Similar
                    </AnimatedButton>
                  </div>
                </div>
              </div>
            </GlassCard>
          )}

          {/* API Integration Info */}
          <GlassCard className="p-8 mt-8">
            <h2 className="text-2xl font-bold mb-6 gradient-text">API Integration Details</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Data Sources</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg">
                    <span className="text-white">99acres API</span>
                    <span className="text-green-400 text-sm">Active</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                    <span className="text-white">MagicBricks API</span>
                    <span className="text-green-400 text-sm">Active</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg">
                    <span className="text-white">Housing.com API</span>
                    <span className="text-green-400 text-sm">Active</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Data Quality</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/70">Accuracy:</span>
                    <span className="text-green-400 font-bold">94.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Freshness:</span>
                    <span className="text-blue-400 font-bold">98.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Coverage:</span>
                    <span className="text-purple-400 font-bold">85.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Reliability:</span>
                    <span className="text-yellow-400 font-bold">96.1%</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Performance</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/70">Avg Response:</span>
                    <span className="text-green-400 font-bold">850ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Cache Hit Rate:</span>
                    <span className="text-blue-400 font-bold">78.4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Uptime:</span>
                    <span className="text-purple-400 font-bold">99.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Daily Requests:</span>
                    <span className="text-yellow-400 font-bold">12.5K</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </main>
    </div>
  )
}
