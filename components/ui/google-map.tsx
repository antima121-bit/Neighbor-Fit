"use client"

import { useState, useEffect, useRef } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { AnimatedButton } from "@/components/ui/animated-button"
import { MapPin, Search, Navigation } from "lucide-react"

declare global {
  interface Window {
    google: any
    initMap: () => void
  }
}

interface GoogleMapProps {
  onLocationSelect?: (location: { lat: number; lng: number; address: string }) => void
  initialLocation?: { lat: number; lng: number }
  height?: string
  searchEnabled?: boolean
}

export function GoogleMap({
  onLocationSelect,
  initialLocation = { lat: 28.6139, lng: 77.209 }, // Delhi coordinates
  height = "400px",
  searchEnabled = true,
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [marker, setMarker] = useState<any>(null)
  const [searchBox, setSearchBox] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<string>("")
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Load Google Maps API
    if (!window.google) {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`
      script.async = true
      script.defer = true

      window.initMap = initializeMap
      document.head.appendChild(script)
    } else {
      initializeMap()
    }

    return () => {
      if (window.initMap) {
        delete window.initMap
      }
    }
  }, [])

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: initialLocation,
      zoom: 12,
      styles: [
        {
          featureType: "all",
          elementType: "geometry.fill",
          stylers: [{ weight: "2.00" }],
        },
        {
          featureType: "all",
          elementType: "geometry.stroke",
          stylers: [{ color: "#9c9c9c" }],
        },
        {
          featureType: "all",
          elementType: "labels.text",
          stylers: [{ visibility: "on" }],
        },
        {
          featureType: "landscape",
          elementType: "all",
          stylers: [{ color: "#f2f2f2" }],
        },
        {
          featureType: "landscape",
          elementType: "geometry.fill",
          stylers: [{ color: "#ffffff" }],
        },
        {
          featureType: "landscape.man_made",
          elementType: "geometry.fill",
          stylers: [{ color: "#ffffff" }],
        },
        {
          featureType: "poi",
          elementType: "all",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "road",
          elementType: "all",
          stylers: [{ saturation: -100 }, { lightness: 45 }],
        },
        {
          featureType: "road",
          elementType: "geometry.fill",
          stylers: [{ color: "#eeeeee" }],
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#7b7b7b" }],
        },
        {
          featureType: "road",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#ffffff" }],
        },
        {
          featureType: "road.highway",
          elementType: "all",
          stylers: [{ visibility: "simplified" }],
        },
        {
          featureType: "road.arterial",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "transit",
          elementType: "all",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "water",
          elementType: "all",
          stylers: [{ color: "#46bcec" }, { visibility: "on" }],
        },
        {
          featureType: "water",
          elementType: "geometry.fill",
          stylers: [{ color: "#c8d7d4" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#070707" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#ffffff" }],
        },
      ],
    })

    const markerInstance = new window.google.maps.Marker({
      position: initialLocation,
      map: mapInstance,
      draggable: true,
      title: "Selected Location",
    })

    // Initialize SearchBox if search is enabled
    if (searchEnabled && searchInputRef.current) {
      const searchBoxInstance = new window.google.maps.places.SearchBox(searchInputRef.current)

      // Bias the SearchBox results towards current map's viewport
      mapInstance.addListener("bounds_changed", () => {
        searchBoxInstance.setBounds(mapInstance.getBounds())
      })

      searchBoxInstance.addListener("places_changed", () => {
        const places = searchBoxInstance.getPlaces()
        if (places.length === 0) return

        const place = places[0]
        if (!place.geometry || !place.geometry.location) return

        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          address: place.formatted_address || place.name || "",
        }

        markerInstance.setPosition(location)
        mapInstance.setCenter(location)
        setSelectedLocation(location.address)

        if (onLocationSelect) {
          onLocationSelect(location)
        }
      })

      setSearchBox(searchBoxInstance)
    }

    // Add click listener to map
    mapInstance.addListener("click", (event: any) => {
      const location = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        address: "",
      }

      markerInstance.setPosition(location)

      // Reverse geocoding to get address
      const geocoder = new window.google.maps.Geocoder()
      geocoder.geocode({ location: event.latLng }, (results: any, status: any) => {
        if (status === "OK" && results[0]) {
          location.address = results[0].formatted_address
          setSelectedLocation(location.address)
        }

        if (onLocationSelect) {
          onLocationSelect(location)
        }
      })
    })

    // Add drag listener to marker
    markerInstance.addListener("dragend", (event: any) => {
      const location = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        address: "",
      }

      // Reverse geocoding
      const geocoder = new window.google.maps.Geocoder()
      geocoder.geocode({ location: event.latLng }, (results: any, status: any) => {
        if (status === "OK" && results[0]) {
          location.address = results[0].formatted_address
          setSelectedLocation(location.address)
        }

        if (onLocationSelect) {
          onLocationSelect(location)
        }
      })
    })

    setMap(mapInstance)
    setMarker(markerInstance)
    setIsLoaded(true)
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: "",
          }

          if (map && marker) {
            map.setCenter(location)
            marker.setPosition(location)

            // Reverse geocoding
            const geocoder = new window.google.maps.Geocoder()
            geocoder.geocode({ location }, (results: any, status: any) => {
              if (status === "OK" && results[0]) {
                location.address = results[0].formatted_address
                setSelectedLocation(location.address)
              }

              if (onLocationSelect) {
                onLocationSelect(location)
              }
            })
          }
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
    }
  }

  return (
    <GlassCard className="overflow-hidden">
      {searchEnabled && (
        <div className="p-4 border-b border-white/10">
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search for places in India..."
                className="glass-input w-full pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
            </div>
            <AnimatedButton variant="outline" size="sm" onClick={getCurrentLocation}>
              <Navigation className="w-4 h-4" />
            </AnimatedButton>
          </div>
          {selectedLocation && (
            <div className="mt-2 text-sm text-white/80 flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {selectedLocation}
            </div>
          )}
        </div>
      )}

      <div ref={mapRef} style={{ height }} className="w-full" />

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="text-white/80">Loading map...</div>
        </div>
      )}
    </GlassCard>
  )
}
