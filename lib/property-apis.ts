"use client"

// Property data API integrations for Indian real estate market
export interface PropertyData {
  id: string
  lat: number
  lng: number
  rent: number
  propertyType: "apartment" | "house" | "pg" | "studio"
  bedrooms: number
  area: number
  furnished: "furnished" | "semi-furnished" | "unfurnished"
  locality: string
  city: string
  amenities: string[]
  lastUpdated: string
  source: string
  imageUrl?: string
  description?: string
  ownerName?: string
  ownerPhone?: string
}

export interface RentAnalytics {
  averageRent: number
  medianRent: number
  pricePerSqft: number
  rentTrend: number
  totalListings: number
  lastUpdated: string
}

// Mock API responses with realistic Indian property data
const MOCK_PROPERTY_DATA: PropertyData[] = [
  // Gurgaon Properties
  {
    id: "ggn_001",
    lat: 28.4595,
    lng: 77.0266,
    rent: 35000,
    propertyType: "apartment",
    bedrooms: 2,
    area: 1200,
    furnished: "semi-furnished",
    locality: "Cyber City",
    city: "Gurgaon",
    amenities: ["gym", "parking", "security", "metro", "wifi", "power backup"],
    lastUpdated: "2024-01-15T10:30:00Z",
    source: "99acres",
    description: "Modern 2BHK apartment in the heart of Cyber City with excellent connectivity",
    ownerName: "Rajesh Kumar",
    ownerPhone: "+91-9876543210",
  },
  {
    id: "ggn_002",
    lat: 28.4692,
    lng: 77.0347,
    rent: 42000,
    propertyType: "apartment",
    bedrooms: 3,
    area: 1500,
    furnished: "furnished",
    locality: "DLF Phase 2",
    city: "Gurgaon",
    amenities: ["gym", "pool", "parking", "security", "clubhouse", "garden", "kids play area"],
    lastUpdated: "2024-01-15T09:15:00Z",
    source: "magicbricks",
    description: "Luxury 3BHK fully furnished apartment in premium DLF Phase 2",
    ownerName: "Priya Sharma",
    ownerPhone: "+91-9876543211",
  },
  {
    id: "ggn_003",
    lat: 28.4743,
    lng: 77.0513,
    rent: 28000,
    propertyType: "apartment",
    bedrooms: 2,
    area: 1000,
    furnished: "unfurnished",
    locality: "Sector 14",
    city: "Gurgaon",
    amenities: ["parking", "security", "lift", "water supply"],
    lastUpdated: "2024-01-15T11:45:00Z",
    source: "housing",
    description: "Spacious 2BHK unfurnished apartment in peaceful Sector 14",
    ownerName: "Amit Singh",
    ownerPhone: "+91-9876543212",
  },
  // Bangalore Properties
  {
    id: "blr_001",
    lat: 12.9352,
    lng: 77.6245,
    rent: 32000,
    propertyType: "apartment",
    bedrooms: 2,
    area: 1100,
    furnished: "furnished",
    locality: "Koramangala 5th Block",
    city: "Bangalore",
    amenities: ["gym", "parking", "security", "metro", "cafe", "coworking space"],
    lastUpdated: "2024-01-15T08:20:00Z",
    source: "99acres",
    description: "Tech-friendly 2BHK in vibrant Koramangala with startup ecosystem",
    ownerName: "Deepak Reddy",
    ownerPhone: "+91-9876543213",
  },
  {
    id: "blr_002",
    lat: 12.9719,
    lng: 77.6412,
    rent: 38000,
    propertyType: "apartment",
    bedrooms: 3,
    area: 1400,
    furnished: "semi-furnished",
    locality: "Indiranagar",
    city: "Bangalore",
    amenities: ["gym", "pool", "parking", "security", "metro", "shopping mall", "restaurants"],
    lastUpdated: "2024-01-15T07:30:00Z",
    source: "magicbricks",
    description: "Premium 3BHK in upscale Indiranagar with excellent social infrastructure",
    ownerName: "Kavya Nair",
    ownerPhone: "+91-9876543214",
  },
  {
    id: "blr_003",
    lat: 12.9698,
    lng: 77.7499,
    rent: 25000,
    propertyType: "apartment",
    bedrooms: 2,
    area: 950,
    furnished: "unfurnished",
    locality: "Whitefield",
    city: "Bangalore",
    amenities: ["parking", "security", "gym", "bus connectivity", "IT parks nearby"],
    lastUpdated: "2024-01-15T12:00:00Z",
    source: "housing",
    description: "Affordable 2BHK in IT corridor Whitefield with great connectivity",
    ownerName: "Suresh Babu",
    ownerPhone: "+91-9876543215",
  },
  // Mumbai Properties
  {
    id: "mum_001",
    lat: 19.0596,
    lng: 72.8295,
    rent: 65000,
    propertyType: "apartment",
    bedrooms: 2,
    area: 800,
    furnished: "furnished",
    locality: "Bandra West",
    city: "Mumbai",
    amenities: ["gym", "pool", "parking", "security", "metro", "sea view", "premium location"],
    lastUpdated: "2024-01-15T09:45:00Z",
    source: "99acres",
    description: "Luxury 2BHK with sea view in premium Bandra West location",
    ownerName: "Arjun Malhotra",
    ownerPhone: "+91-9876543216",
  },
  {
    id: "mum_002",
    lat: 19.1136,
    lng: 72.8697,
    rent: 55000,
    propertyType: "apartment",
    bedrooms: 3,
    area: 1200,
    furnished: "semi-furnished",
    locality: "Andheri West",
    city: "Mumbai",
    amenities: ["gym", "parking", "security", "metro", "airport connectivity", "malls"],
    lastUpdated: "2024-01-15T10:15:00Z",
    source: "magicbricks",
    description: "Well-connected 3BHK in Andheri West with airport proximity",
    ownerName: "Neha Joshi",
    ownerPhone: "+91-9876543217",
  },
  {
    id: "mum_003",
    lat: 19.1176,
    lng: 72.906,
    rent: 48000,
    propertyType: "apartment",
    bedrooms: 2,
    area: 1000,
    furnished: "furnished",
    locality: "Powai",
    city: "Mumbai",
    amenities: ["gym", "pool", "parking", "security", "lake view", "IT parks", "educational institutes"],
    lastUpdated: "2024-01-15T11:30:00Z",
    source: "housing",
    description: "Scenic 2BHK with lake view in tech hub Powai",
    ownerName: "Vikram Patel",
    ownerPhone: "+91-9876543218",
  },
]

// Simulate API delay and realistic responses
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export class PropertyDataAPI {
  private static instance: PropertyDataAPI
  private cache: Map<string, { data: any; timestamp: number }> = new Map()
  private readonly CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

  static getInstance(): PropertyDataAPI {
    if (!PropertyDataAPI.instance) {
      PropertyDataAPI.instance = new PropertyDataAPI()
    }
    return PropertyDataAPI.instance
  }

  private getCacheKey(params: any): string {
    try {
      return JSON.stringify(params)
    } catch (error) {
      return String(params)
    }
  }

  private isValidCache(timestamp: number): boolean {
    return Date.now() - timestamp < this.CACHE_DURATION
  }

  async fetchPropertiesInBounds(bounds: {
    north: number
    south: number
    east: number
    west: number
  }): Promise<PropertyData[]> {
    try {
      const cacheKey = this.getCacheKey({ type: "bounds", ...bounds })
      const cached = this.cache.get(cacheKey)

      if (cached && this.isValidCache(cached.timestamp)) {
        return cached.data
      }

      // Simulate API call delay
      await delay(800 + Math.random() * 400)

      // Filter properties within bounds
      const properties = MOCK_PROPERTY_DATA.filter(
        (property) =>
          property.lat >= bounds.south &&
          property.lat <= bounds.north &&
          property.lng >= bounds.west &&
          property.lng <= bounds.east,
      )

      // Add some randomization to simulate live data
      const liveProperties = properties.map((property) => ({
        ...property,
        rent: property.rent + Math.floor((Math.random() - 0.5) * property.rent * 0.1), // ±10% variation
        lastUpdated: new Date().toISOString(),
      }))

      this.cache.set(cacheKey, { data: liveProperties, timestamp: Date.now() })
      return liveProperties
    } catch (error) {
      console.error("Error fetching properties in bounds:", error)
      return []
    }
  }

  async fetchRentAnalytics(city: string, locality?: string): Promise<RentAnalytics> {
    const cacheKey = this.getCacheKey({ type: "analytics", city, locality })
    const cached = this.cache.get(cacheKey)

    if (cached && this.isValidCache(cached.timestamp)) {
      return cached.data
    }

    await delay(600 + Math.random() * 300)

    let relevantProperties = MOCK_PROPERTY_DATA.filter((p) => p.city === city)
    if (locality) {
      relevantProperties = relevantProperties.filter((p) => p.locality.toLowerCase().includes(locality.toLowerCase()))
    }

    if (relevantProperties.length === 0) {
      throw new Error(`No data found for ${locality ? locality + ", " : ""}${city}`)
    }

    const rents = relevantProperties.map((p) => p.rent)
    const areas = relevantProperties.map((p) => p.area)

    const averageRent = rents.reduce((sum, rent) => sum + rent, 0) / rents.length
    const medianRent = rents.sort((a, b) => a - b)[Math.floor(rents.length / 2)]
    const totalArea = areas.reduce((sum, area) => sum + area, 0)
    const pricePerSqft = rents.reduce((sum, rent) => sum + rent, 0) / totalArea

    // Simulate trend calculation
    const trend = (Math.random() - 0.5) * 20 // -10% to +10%

    const analytics: RentAnalytics = {
      averageRent: Math.round(averageRent),
      medianRent: Math.round(medianRent),
      pricePerSqft: Math.round(pricePerSqft),
      rentTrend: Math.round(trend * 10) / 10,
      totalListings: relevantProperties.length,
      lastUpdated: new Date().toISOString(),
    }

    this.cache.set(cacheKey, { data: analytics, timestamp: Date.now() })
    return analytics
  }

  async searchProperties(query: {
    city?: string
    locality?: string
    minRent?: number
    maxRent?: number
    bedrooms?: number
    propertyType?: string
    furnished?: string
  }): Promise<PropertyData[]> {
    const cacheKey = this.getCacheKey({ type: "search", ...query })
    const cached = this.cache.get(cacheKey)

    if (cached && this.isValidCache(cached.timestamp)) {
      return cached.data
    }

    await delay(700 + Math.random() * 400)

    let results = [...MOCK_PROPERTY_DATA]

    if (query.city) {
      results = results.filter((p) => p.city.toLowerCase().includes(query.city!.toLowerCase()))
    }

    if (query.locality) {
      results = results.filter((p) => p.locality.toLowerCase().includes(query.locality!.toLowerCase()))
    }

    if (query.minRent) {
      results = results.filter((p) => p.rent >= query.minRent!)
    }

    if (query.maxRent) {
      results = results.filter((p) => p.rent <= query.maxRent!)
    }

    if (query.bedrooms) {
      results = results.filter((p) => p.bedrooms === query.bedrooms)
    }

    if (query.propertyType) {
      results = results.filter((p) => p.propertyType === query.propertyType)
    }

    if (query.furnished) {
      results = results.filter((p) => p.furnished === query.furnished)
    }

    // Add randomization for live feel
    const liveResults = results.map((property) => ({
      ...property,
      rent: property.rent + Math.floor((Math.random() - 0.5) * property.rent * 0.05), // ±5% variation
      lastUpdated: new Date().toISOString(),
    }))

    this.cache.set(cacheKey, { data: liveResults, timestamp: Date.now() })
    return liveResults
  }

  // Simulate real estate aggregator APIs
  async fetch99AcresData(bounds: any): Promise<PropertyData[]> {
    await delay(1000)
    return MOCK_PROPERTY_DATA.filter((p) => p.source === "99acres").slice(0, 3)
  }

  async fetchMagicBricksData(bounds: any): Promise<PropertyData[]> {
    await delay(1200)
    return MOCK_PROPERTY_DATA.filter((p) => p.source === "magicbricks").slice(0, 3)
  }

  async fetchHousingData(bounds: any): Promise<PropertyData[]> {
    await delay(900)
    return MOCK_PROPERTY_DATA.filter((p) => p.source === "housing").slice(0, 3)
  }

  async fetchAllSources(bounds: any): Promise<{
    combined: PropertyData[]
    sources: {
      "99acres": PropertyData[]
      magicbricks: PropertyData[]
      housing: PropertyData[]
    }
  }> {
    const [acres99, magicbricks, housing] = await Promise.all([
      this.fetch99AcresData(bounds),
      this.fetchMagicBricksData(bounds),
      this.fetchHousingData(bounds),
    ])

    return {
      combined: [...acres99, ...magicbricks, ...housing],
      sources: {
        "99acres": acres99,
        magicbricks: magicbricks,
        housing: housing,
      },
    }
  }

  clearCache(): void {
    this.cache.clear()
  }

  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    }
  }
}

// Export singleton instance
export const propertyAPI = PropertyDataAPI.getInstance()
