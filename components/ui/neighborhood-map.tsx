"use client"

import { useState, useEffect, useRef } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { AnimatedButton } from "@/components/ui/animated-button"
import { MapPin, Home, Shield, TrendingUp } from "lucide-react"

interface NeighborhoodData {
  id: number
  name: string
  lat: number
  lng: number
  matchScore: number
  rent: number
  safety: number
  walkability: number
  schools: number
  nightlife: number
}

interface NeighborhoodMapProps {
  neighborhoods: NeighborhoodData[]
  onNeighborhoodSelect?: (neighborhood: NeighborhoodData) => void
  height?: string
  showHeatmap?: boolean
}

export function NeighborhoodMap({
  neighborhoods,
  onNeighborhoodSelect,
  height = "500px",
  showHeatmapProp = false,
}: NeighborhoodMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [markers, setMarkers] = useState<any[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<NeighborhoodData | null>(null)
  const [filterType, setFilterType] = useState<"matchScore" | "rent" | "safety">("matchScore")
  const [heatmapType, setHeatmapType] = useState<"rent" | "safety" | "amenities">("rent")
  const [heatmapLayer, setHeatmapLayer] = useState<any>(null)
  const [showHeatmap, setShowHeatmap] = useState(showHeatmapProp)

  useEffect(() => {
    // Load Leaflet CSS and JS
    if (!document.querySelector('link[href*="leaflet"]')) {
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      document.head.appendChild(link)
    }

    if (!window.L) {
      const script = document.createElement("script")
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
      script.onload = initializeMap
      document.head.appendChild(script)
    } else {
      initializeMap()
    }

    return () => {
      if (map) {
        map.remove()
      }
    }
  }, [])

  useEffect(() => {
    if (map && isLoaded) {
      updateMarkers()
    }
  }, [neighborhoods, filterType, map, isLoaded])

  const initializeMap = () => {
    if (!mapRef.current || !window.L) return

    // Calculate center from neighborhoods
    const center =
      neighborhoods.length > 0
        ? [
            neighborhoods.reduce((sum, n) => sum + n.lat, 0) / neighborhoods.length,
            neighborhoods.reduce((sum, n) => sum + n.lng, 0) / neighborhoods.length,
          ]
        : [28.6139, 77.209] // Delhi default

    const mapInstance = window.L.map(mapRef.current).setView(center, 11)

    // Add tile layer
    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(mapInstance)

    setMap(mapInstance)
    setIsLoaded(true)
  }

  const getMarkerColor = (neighborhood: NeighborhoodData) => {
    let value: number
    switch (filterType) {
      case "matchScore":
        value = neighborhood.matchScore
        break
      case "rent":
        value = 100 - (neighborhood.rent / 100000) * 100 // Invert for color scale
        break
      case "safety":
        value = neighborhood.safety * 10
        break
      default:
        value = neighborhood.matchScore
    }

    if (value >= 80) return "#10B981" // Green
    if (value >= 60) return "#F59E0B" // Yellow
    if (value >= 40) return "#EF4444" // Red
    return "#6B7280" // Gray
  }

  const getMarkerIcon = (neighborhood: NeighborhoodData) => {
    const color = getMarkerColor(neighborhood)
    return window.L.divIcon({
      className: "custom-marker",
      html: `
        <div style="
          background-color: ${color};
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 12px;
        ">
          ${neighborhood.matchScore}
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    })
  }

  const generateHeatmapData = (type: "rent" | "safety" | "amenities") => {
    return neighborhoods.map((neighborhood) => {
      let intensity: number
      switch (type) {
        case "rent":
          // Normalize rent to 0-1 scale (higher rent = higher intensity)
          intensity = Math.min(neighborhood.rent / 100000, 1)
          break
        case "safety":
          // Invert safety (lower safety = higher intensity for danger zones)
          intensity = (10 - neighborhood.safety) / 10
          break
        case "amenities":
          // Combine walkability, schools, and nightlife for amenities score
          const amenityScore = (neighborhood.walkability + neighborhood.schools + neighborhood.nightlife) / 30
          intensity = amenityScore
          break
        default:
          intensity = 0.5
      }

      return [neighborhood.lat, neighborhood.lng, intensity]
    })
  }

  const updateMarkers = () => {
    if (!map || !window.L) return

    // Clear existing markers
    markers.forEach((marker) => map.removeLayer(marker))

    // Add new markers
    const newMarkers = neighborhoods.map((neighborhood) => {
      const marker = window.L.marker([neighborhood.lat, neighborhood.lng], {
        icon: getMarkerIcon(neighborhood),
      }).addTo(map)

      const popupContent = `
        <div style="min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; color: #1f2937; font-weight: bold;">${neighborhood.name}</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px;">
            <div><strong>Match:</strong> ${neighborhood.matchScore}%</div>
            <div><strong>Rent:</strong> ₹${neighborhood.rent.toLocaleString("en-IN")}</div>
            <div><strong>Safety:</strong> ${neighborhood.safety}/10</div>
            <div><strong>Walk:</strong> ${neighborhood.walkability}/10</div>
            <div><strong>Schools:</strong> ${neighborhood.schools}/10</div>
            <div><strong>Nightlife:</strong> ${neighborhood.nightlife}/10</div>
          </div>
          <button 
            onclick="window.selectNeighborhood(${neighborhood.id})"
            style="
              margin-top: 8px;
              padding: 4px 8px;
              background: #3B82F6;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              font-size: 12px;
            "
          >
            View Details
          </button>
        </div>
      `

      marker.bindPopup(popupContent)

      marker.on("click", () => {
        setSelectedNeighborhood(neighborhood)
        if (onNeighborhoodSelect) {
          onNeighborhoodSelect(neighborhood)
        }
      })

      return marker
    })

    setMarkers(newMarkers)

    // Fit map to show all markers
    if (newMarkers.length > 0) {
      const group = new window.L.featureGroup(newMarkers)
      map.fitBounds(group.getBounds().pad(0.1))
    }
  }

  const toggleHeatmap = () => {
    if (!map || !window.L) return

    if (showHeatmap && heatmapLayer) {
      // Remove existing heatmap
      map.removeLayer(heatmapLayer)
      setHeatmapLayer(null)
      setShowHeatmap(false)
    } else {
      // Add heatmap
      loadHeatmapLayer()
    }
  }

  const loadHeatmapLayer = () => {
    if (!map || !window.L) return

    // Load heatmap plugin if not already loaded
    if (!window.L.heatLayer) {
      const script = document.createElement("script")
      script.src = "https://unpkg.com/leaflet.heat@0.2.0/dist/leaflet-heat.js"
      script.onload = () => createHeatmap()
      document.head.appendChild(script)
    } else {
      createHeatmap()
    }
  }

  const createHeatmap = () => {
    if (!map || !window.L.heatLayer) return

    const heatmapData = generateHeatmapData(heatmapType)

    const heatLayer = window.L.heatLayer(heatmapData, {
      radius: 50,
      blur: 35,
      maxZoom: 17,
      gradient: getHeatmapGradient(heatmapType),
    }).addTo(map)

    setHeatmapLayer(heatLayer)
    setShowHeatmap(true)
  }

  const getHeatmapGradient = (type: "rent" | "safety" | "amenities") => {
    switch (type) {
      case "rent":
        return {
          0.0: "#00ff00", // Green (low rent)
          0.3: "#ffff00", // Yellow
          0.6: "#ff8000", // Orange
          1.0: "#ff0000", // Red (high rent)
        }
      case "safety":
        return {
          0.0: "#00ff00", // Green (safe)
          0.3: "#ffff00", // Yellow
          0.6: "#ff8000", // Orange
          1.0: "#ff0000", // Red (dangerous)
        }
      case "amenities":
        return {
          0.0: "#ff0000", // Red (few amenities)
          0.3: "#ff8000", // Orange
          0.6: "#ffff00", // Yellow
          1.0: "#00ff00", // Green (many amenities)
        }
      default:
        return {}
    }
  }

  const changeHeatmapType = (newType: "rent" | "safety" | "amenities") => {
    setHeatmapType(newType)

    if (showHeatmap && heatmapLayer && map) {
      // Remove current heatmap
      map.removeLayer(heatmapLayer)

      // Create new heatmap with new type
      const heatmapData = generateHeatmapData(newType)
      const newHeatLayer = window.L.heatLayer(heatmapData, {
        radius: 50,
        blur: 35,
        maxZoom: 17,
        gradient: getHeatmapGradient(newType),
      }).addTo(map)

      setHeatmapLayer(newHeatLayer)
    }
  }

  // Global function for popup buttons
  useEffect(() => {
    window.selectNeighborhood = (id: number) => {
      const neighborhood = neighborhoods.find((n) => n.id === id)
      if (neighborhood && onNeighborhoodSelect) {
        onNeighborhoodSelect(neighborhood)
      }
    }

    return () => {
      delete window.selectNeighborhood
    }
  }, [neighborhoods, onNeighborhoodSelect])

  const getFilterIcon = (type: string) => {
    switch (type) {
      case "matchScore":
        return <TrendingUp className="w-4 h-4" />
      case "rent":
        return <Home className="w-4 h-4" />
      case "safety":
        return <Shield className="w-4 h-4" />
      default:
        return <MapPin className="w-4 h-4" />
    }
  }

  return (
    <GlassCard className="overflow-hidden">
      {/* Map Controls */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white">Neighborhood Map</h3>
          <span className="text-sm text-white/60">{neighborhoods.length} locations</span>
        </div>

        {/* Marker Filter Controls */}
        <div className="flex space-x-2 mb-3">
          {["matchScore", "rent", "safety"].map((type) => (
            <AnimatedButton
              key={type}
              variant={filterType === type ? "glass" : "outline"}
              size="sm"
              onClick={() => setFilterType(type as any)}
            >
              {getFilterIcon(type)}
              <span className="ml-1 capitalize">{type === "matchScore" ? "Match" : type}</span>
            </AnimatedButton>
          ))}
        </div>

        {/* Heatmap Controls */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/80">Density Heatmap</span>
            <button
              onClick={toggleHeatmap}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                showHeatmap ? "bg-blue-600" : "bg-gray-600"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  showHeatmap ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {showHeatmap && (
            <div className="flex space-x-2">
              {["rent", "safety", "amenities"].map((type) => (
                <AnimatedButton
                  key={type}
                  variant={heatmapType === type ? "glass" : "outline"}
                  size="sm"
                  onClick={() => changeHeatmapType(type as any)}
                >
                  <span className="capitalize">{type}</span>
                </AnimatedButton>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Map Container */}
      <div ref={mapRef} style={{ height }} className="w-full relative">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
            <div className="text-white/80 flex items-center space-x-2">
              <div className="w-6 h-6 border-2 border-white/60 border-t-white rounded-full animate-spin" />
              <span>Loading neighborhood map...</span>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/70">Color Scale:</span>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-white/60">High</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-white/60">Medium</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-white/60">Low</span>
            </div>
          </div>
        </div>
      </div>

      {/* Heatmap Legend */}
      {showHeatmap && (
        <div className="p-4 border-t border-white/10 bg-white/5">
          <div className="text-sm mb-3">
            <span className="text-white/70">Heatmap: </span>
            <span className="text-white font-medium capitalize">{heatmapType}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/60">
              {heatmapType === "rent" ? "Low Rent" : heatmapType === "safety" ? "Safe" : "Few Amenities"}
            </span>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-2 bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 to-red-500 rounded"></div>
            </div>
            <span className="text-white/60">
              {heatmapType === "rent" ? "High Rent" : heatmapType === "safety" ? "Dangerous" : "Many Amenities"}
            </span>
          </div>
        </div>
      )}

      {/* Selected Neighborhood Info */}
      {selectedNeighborhood && (
        <div className="p-4 border-t border-white/10 bg-white/5">
          <h4 className="font-semibold text-white mb-2">{selectedNeighborhood.name}</h4>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-lg font-bold text-green-400">{selectedNeighborhood.matchScore}%</div>
              <div className="text-white/60">Match Score</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-400">
                ₹{selectedNeighborhood.rent.toLocaleString("en-IN")}
              </div>
              <div className="text-white/60">Monthly Rent</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-400">{selectedNeighborhood.safety}/10</div>
              <div className="text-white/60">Safety Score</div>
            </div>
          </div>
        </div>
      )}
    </GlassCard>
  )
}
