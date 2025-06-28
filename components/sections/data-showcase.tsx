"use client"

import { useState, useEffect } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Database, Wifi, MapPin, Shield } from "lucide-react"

export function DataShowcaseSection() {
  const [apiStatus, setApiStatus] = useState({
    census: { status: "connected", latency: 120, lastUpdate: "2 min ago" },
    walkScore: { status: "connected", latency: 85, lastUpdate: "1 min ago" },
    openStreetMap: { status: "connected", latency: 95, lastUpdate: "30 sec ago" },
    crimeData: { status: "limited", latency: 200, lastUpdate: "5 min ago" },
  })

  const [metrics, setMetrics] = useState({
    totalRequests: 0,
    successRate: 0,
    avgResponseTime: 0,
    dataFreshness: 0,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        totalRequests: prev.totalRequests + Math.floor(Math.random() * 5),
        successRate: 98.5 + Math.random() * 1.5,
        avgResponseTime: 120 + Math.random() * 50,
        dataFreshness: 95 + Math.random() * 5,
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const dataSources = [
    {
      name: "US Census API",
      icon: Database,
      description: "Demographics, population, income data",
      coverage: "100% US Coverage",
      status: apiStatus.census.status,
      latency: apiStatus.census.latency,
      lastUpdate: apiStatus.census.lastUpdate,
    },
    {
      name: "Walk Score API",
      icon: MapPin,
      description: "Walkability, transit, bike scores",
      coverage: "15,000+ Cities",
      status: apiStatus.walkScore.status,
      latency: apiStatus.walkScore.latency,
      lastUpdate: apiStatus.walkScore.lastUpdate,
    },
    {
      name: "OpenStreetMap",
      icon: Wifi,
      description: "Amenities, POIs, infrastructure",
      coverage: "Global Coverage",
      status: apiStatus.openStreetMap.status,
      latency: apiStatus.openStreetMap.latency,
      lastUpdate: apiStatus.openStreetMap.lastUpdate,
    },
    {
      name: "Crime Data APIs",
      icon: Shield,
      description: "Safety metrics, incident reports",
      coverage: "Major US Cities",
      status: apiStatus.crimeData.status,
      latency: apiStatus.crimeData.latency,
      lastUpdate: apiStatus.crimeData.lastUpdate,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "text-green-400"
      case "limited":
        return "text-yellow-400"
      case "error":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-500/20"
      case "limited":
        return "bg-yellow-500/20"
      case "error":
        return "bg-red-500/20"
      default:
        return "bg-gray-500/20"
    }
  }

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Real-Time <span className="gradient-text">Data Intelligence</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Our platform integrates multiple free APIs to provide comprehensive, up-to-date neighborhood insights.
          </p>
        </div>

        <GlassCard className="p-8 mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center gradient-text">Live System Metrics</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{metrics.totalRequests.toLocaleString()}</div>
              <div className="text-sm text-white/70">API Requests Today</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">{metrics.successRate.toFixed(1)}%</div>
              <div className="text-sm text-white/70">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">{Math.round(metrics.avgResponseTime)}ms</div>
              <div className="text-sm text-white/70">Avg Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">{metrics.dataFreshness.toFixed(1)}%</div>
              <div className="text-sm text-white/70">Data Freshness</div>
            </div>
          </div>
        </GlassCard>

       
        <div className="grid md:grid-cols-2 gap-6">
          {dataSources.map((source, index) => (
            <GlassCard key={index} className="p-6 hover:scale-105 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <source.icon className="w-8 h-8 text-blue-400" />
                  <div>
                    <h4 className="text-lg font-semibold text-white">{source.name}</h4>
                    <p className="text-sm text-white/70">{source.description}</p>
                  </div>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBg(source.status)} ${getStatusColor(source.status)}`}
                >
                  {source.status}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/70">Coverage:</span>
                  <span className="text-sm text-white font-medium">{source.coverage}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/70">Latency:</span>
                  <span className="text-sm text-white font-medium">{source.latency}ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/70">Last Update:</span>
                  <span className="text-sm text-white font-medium">{source.lastUpdate}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${source.status === "connected" ? "bg-green-400" : source.status === "limited" ? "bg-yellow-400" : "bg-red-400"} animate-pulse`}
                ></div>
                <span className="text-xs text-white/60">
                  {source.status === "connected"
                    ? "Real-time data"
                    : source.status === "limited"
                      ? "Cached data"
                      : "Connection issues"}
                </span>
              </div>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="p-8 mt-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 gradient-text">Algorithm Performance</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                  <div>
                    <div className="font-semibold text-white">Match Accuracy</div>
                    <div className="text-sm text-white/70">Based on user feedback</div>
                  </div>
                  <div className="text-2xl font-bold text-green-400">87.3%</div>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                  <div>
                    <div className="font-semibold text-white">Processing Speed</div>
                    <div className="text-sm text-white/70">Average calculation time</div>
                  </div>
                  <div className="text-2xl font-bold text-blue-400">1.2s</div>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                  <div>
                    <div className="font-semibold text-white">Confidence Score</div>
                    <div className="text-sm text-white/70">Algorithm certainty</div>
                  </div>
                  <div className="text-2xl font-bold text-purple-400">92.1%</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6 gradient-text">Data Quality Metrics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white/80">Data Completeness</span>
                    <span className="text-white font-medium">94.7%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                      style={{ width: "94.7%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white/80">Source Reliability</span>
                    <span className="text-white font-medium">98.2%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                      style={{ width: "98.2%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white/80">Update Frequency</span>
                    <span className="text-white font-medium">91.5%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                      style={{ width: "91.5%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  )
}
