"use client"
import { Search, Map, Mic } from "lucide-react"
import { AnimatedButton } from "@/components/ui/animated-button"

interface SearchInterfaceProps {
  searchMode: "text" | "map" | "voice"
  setSearchMode: (mode: "text" | "map" | "voice") => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  onSearch: () => void
}

export default function SearchInterface({
  searchMode,
  setSearchMode,
  searchQuery,
  setSearchQuery,
  onSearch,
}: SearchInterfaceProps) {
  return (
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
            className="glass-input w-full pr-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
            onClick={onSearch}
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
  )
}
