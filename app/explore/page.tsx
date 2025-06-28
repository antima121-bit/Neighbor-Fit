"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { GlassCard } from "@/components/ui/glass-card"
import { AnimatedButton } from "@/components/ui/animated-button"
import {
  Search,
  Filter,
  MapPin,
  DollarSign,
  Shield,
  Car,
  Coffee,
  GraduationCap,
  Mic,
  Map,
  BarChart3,
  Settings,
} from "lucide-react"

export default function ExplorePage() {
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    budget: [10000, 50000],
    commute: 5,
    safety: 8,
    walkability: 6,
    nightlife: 4,
    schools: 7,
  })
  const [searchMode, setSearchMode] = useState<"text" | "map" | "voice">("text")
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSearch = async () => {
    setIsSearching(true)
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false)
    }, 2000)
  }

  const neighborhoods = [
    {
      id: 1,
      name: "Cyber City",
      city: "Gurgaon, Haryana",
      matchScore: 94,
      image: "/images/cyber-city.png",
      metrics: {
        walkScore: 89,
        transitScore: 76,
        bikeScore: 82,
        crimeRate: 2.1,
        medianRent: 35000,
        schoolRating: 8.5,
      },
      highlights: ["IT Hub", "Metro Access", "Safe", "Modern"],
      description: "Premier IT destination with excellent connectivity and modern amenities.",
    },
    {
      id: 2,
      name: "Koramangala",
      city: "Bangalore, Karnataka",
      matchScore: 89,
      image: "/images/koramangala.png",
      metrics: {
        walkScore: 76,
        transitScore: 84,
        bikeScore: 91,
        crimeRate: 1.8,
        medianRent: 28000,
        schoolRating: 9.2,
      },
      highlights: ["Startup Hub", "Cafes", "Young Crowd", "Nightlife"],
      description: "Vibrant startup ecosystem with excellent food scene and young professionals.",
    },
    {
      id: 3,
      name: "Bandra West",
      city: "Mumbai, Maharashtra",
      matchScore: 87,
      image: "/images/bandra-west.png",
      metrics: {
        walkScore: 92,
        transitScore: 88,
        bikeScore: 79,
        crimeRate: 2.3,
        medianRent: 55000,
        schoolRating: 8.1,
      },
      highlights: ["Bollywood", "Sea View", "Trendy", "Upscale"],
      description: "Premium location with celebrity culture and upscale lifestyle amenities.",
    },
  ]

  // Show loading state during SSR
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="relative">
          <Header />
          <main className="pt-24 pb-12">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                  Explore{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Neighborhoods
                  </span>
                </h1>
                <p className="text-xl text-white/80 max-w-3xl mx-auto">
                  Discover your perfect neighborhood using our advanced search and filtering system powered by real-time
                  data.
                </p>
              </div>
              <div className="h-96 bg-white/5 rounded-lg animate-pulse backdrop-blur-sm border border-white/10" />
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="relative">
        <Header />

        <main className="pt-24 pb-12">
          <div className="container mx-auto px-4">
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Explore{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Neighborhoods
                </span>
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Discover your perfect neighborhood using our advanced search and filtering system powered by real-time
                data.
              </p>
            </div>

            {/* Search Interface */}
            <GlassCard className="p-6 mb-8">
              <div className="space-y-6">
                {/* Search Mode Selector */}
                <div className="flex justify-center space-x-4">
                  <AnimatedButton
                    variant={searchMode === "text" ? "glass" : "outline"}
                    size="sm"
                    onClick={() => setSearchMode("text")}
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Text Search
                  </AnimatedButton>
                  <AnimatedButton
                    variant={searchMode === "map" ? "glass" : "outline"}
                    size="sm"
                    onClick={() => setSearchMode("map")}
                  >
                    <Map className="w-4 h-4 mr-2" />
                    Map Search
                  </AnimatedButton>
                  <AnimatedButton
                    variant={searchMode === "voice" ? "glass" : "outline"}
                    size="sm"
                    onClick={() => setSearchMode("voice")}
                  >
                    <Mic className="w-4 h-4 mr-2" />
                    Voice Search
                  </AnimatedButton>
                </div>

                {/* Search Input */}
                {searchMode === "text" && (
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Try: 'family-friendly area with good schools near downtown'"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                      onClick={handleSearch}
                    >
                      <Search className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {searchMode === "map" && (
                  <div className="text-center p-8 bg-white/5 rounded-lg">
                    <Map className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                    <p className="text-white/80">Interactive map search coming soon</p>
                    <p className="text-sm text-white/60">Draw areas, set radius, explore visually</p>
                  </div>
                )}

                {searchMode === "voice" && (
                  <div className="text-center p-8 bg-white/5 rounded-lg">
                    <Mic className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                    <p className="text-white/80">Voice search ready</p>
                    <AnimatedButton variant="glass" size="sm">
                      Start Recording
                    </AnimatedButton>
                  </div>
                )}
              </div>
            </GlassCard>

            <div className="grid lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <GlassCard className="p-6 sticky top-24">
                  <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent flex items-center">
                    <Filter className="w-5 h-5 mr-2 text-blue-400" />
                    Smart Filters
                  </h3>

                  <div className="space-y-6">
                    {/* Budget Range */}
                    <div>
                      <label className="block text-white/80 mb-3 flex items-center">
                        <DollarSign className="w-4 h-4 mr-2" />
                        Budget Range (Monthly Rent)
                      </label>
                      <div className="space-y-2">
                        <input
                          type="range"
                          min="10000"
                          max="100000"
                          step="5000"
                          value={filters.budget[0]}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              budget: [Number.parseInt(e.target.value), prev.budget[1]],
                            }))
                          }
                          className="w-full"
                        />
                        <input
                          type="range"
                          min="10000"
                          max="100000"
                          step="5000"
                          value={filters.budget[1]}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              budget: [prev.budget[0], Number.parseInt(e.target.value)],
                            }))
                          }
                          className="w-full"
                        />
                        <div className="text-center text-white/60">
                          ₹{filters.budget[0].toLocaleString("en-IN")} - ₹{filters.budget[1].toLocaleString("en-IN")}
                          /month
                        </div>
                      </div>
                    </div>

                    {/* Safety Priority */}
                    <div>
                      <label className="block text-white/80 mb-3 flex items-center">
                        <Shield className="w-4 h-4 mr-2" />
                        Safety Priority
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={filters.safety}
                        onChange={(e) => setFilters((prev) => ({ ...prev, safety: Number.parseInt(e.target.value) }))}
                        className="w-full"
                      />
                      <div className="text-center text-white/60">{filters.safety}/10</div>
                    </div>

                    {/* Commute Importance */}
                    <div>
                      <label className="block text-white/80 mb-3 flex items-center">
                        <Car className="w-4 h-4 mr-2" />
                        Commute Importance
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={filters.commute}
                        onChange={(e) => setFilters((prev) => ({ ...prev, commute: Number.parseInt(e.target.value) }))}
                        className="w-full"
                      />
                      <div className="text-center text-white/60">{filters.commute}/10</div>
                    </div>

                    {/* Walkability */}
                    <div>
                      <label className="block text-white/80 mb-3 flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        Walkability
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={filters.walkability}
                        onChange={(e) =>
                          setFilters((prev) => ({ ...prev, walkability: Number.parseInt(e.target.value) }))
                        }
                        className="w-full"
                      />
                      <div className="text-center text-white/60">{filters.walkability}/10</div>
                    </div>

                    {/* Nightlife */}
                    <div>
                      <label className="block text-white/80 mb-3 flex items-center">
                        <Coffee className="w-4 h-4 mr-2" />
                        Nightlife & Dining
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={filters.nightlife}
                        onChange={(e) =>
                          setFilters((prev) => ({ ...prev, nightlife: Number.parseInt(e.target.value) }))
                        }
                        className="w-full"
                      />
                      <div className="text-center text-white/60">{filters.nightlife}/10</div>
                    </div>

                    {/* Schools */}
                    <div>
                      <label className="block text-white/80 mb-3 flex items-center">
                        <GraduationCap className="w-4 h-4 mr-2" />
                        School Quality
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={filters.schools}
                        onChange={(e) => setFilters((prev) => ({ ...prev, schools: Number.parseInt(e.target.value) }))}
                        className="w-full"
                      />
                      <div className="text-center text-white/60">{filters.schools}/10</div>
                    </div>

                    <AnimatedButton variant="glass" className="w-full" onClick={handleSearch}>
                      Apply Filters
                    </AnimatedButton>
                  </div>
                </GlassCard>
              </div>

              {/* Results Grid */}
              <div className="lg:col-span-3">
                {/* Results Header */}
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Search Results</h2>
                    <p className="text-white/70">{neighborhoods.length} neighborhoods match your criteria</p>
                  </div>
                  <div className="flex space-x-2">
                    <AnimatedButton variant="outline" size="sm">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Compare
                    </AnimatedButton>
                    <AnimatedButton variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Sort
                    </AnimatedButton>
                  </div>
                </div>

                {/* Loading State */}
                {isSearching && (
                  <div className="text-center py-12">
                    <div className="animate-spin w-12 h-12 border-4 border-blue-400/30 border-t-blue-400 rounded-full mx-auto mb-4"></div>
                    <p className="text-white/80">Analyzing neighborhoods...</p>
                  </div>
                )}

                {/* Neighborhood Cards */}
                {!isSearching && (
                  <div className="space-y-6">
                    {neighborhoods.map((neighborhood) => (
                      <GlassCard key={neighborhood.id} className="p-6 hover:scale-105 transition-all duration-300">
                        <div className="grid md:grid-cols-3 gap-6">
                          {/* Image */}
                          <div className="md:col-span-1">
                            <img
                              src={neighborhood.image || "/placeholder.svg?height=200&width=300"}
                              alt={neighborhood.name}
                              className="w-full h-48 object-cover rounded-lg"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.src = "/placeholder.svg?height=200&width=300"
                              }}
                            />
                          </div>

                          {/* Content */}
                          <div className="md:col-span-2">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-xl font-bold text-white mb-1">{neighborhood.name}</h3>
                                <p className="text-white/70">{neighborhood.city}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-3xl font-bold text-green-400">{neighborhood.matchScore}%</div>
                                <div className="text-sm text-white/60">Match Score</div>
                              </div>
                            </div>

                            <p className="text-white/80 mb-4">{neighborhood.description}</p>

                            {/* Highlights */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {neighborhood.highlights.map((highlight, idx) => (
                                <span key={idx} className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">
                                  {highlight}
                                </span>
                              ))}
                            </div>

                            {/* Metrics */}
                            <div className="grid grid-cols-3 gap-4 mb-4">
                              <div className="text-center">
                                <div className="text-lg font-bold text-white">{neighborhood.metrics.walkScore}</div>
                                <div className="text-xs text-white/60">Walk Score</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold text-white">
                                  ₹{neighborhood.metrics.medianRent.toLocaleString("en-IN")}
                                </div>
                                <div className="text-xs text-white/60">Median Rent</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold text-white">{neighborhood.metrics.schoolRating}</div>
                                <div className="text-xs text-white/60">School Rating</div>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex space-x-3">
                              <AnimatedButton variant="glass" size="sm">
                                View Details
                              </AnimatedButton>
                              <AnimatedButton variant="outline" size="sm">
                                Save
                              </AnimatedButton>
                              <AnimatedButton variant="outline" size="sm">
                                Compare
                              </AnimatedButton>
                            </div>
                          </div>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
