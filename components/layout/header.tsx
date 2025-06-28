"use client"

import { useState, useEffect } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { AnimatedButton } from "@/components/ui/animated-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X, Home, Search, User, Settings, Map, BarChart3, Database } from "lucide-react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeItem, setActiveItem] = useState("/")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    // Set active item based on current path
    if (typeof window !== "undefined") {
      setActiveItem(window.location.pathname)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Search, label: "Explore", href: "/explore" },
    { icon: Map, label: "Maps", href: "/map" },
    { icon: BarChart3, label: "Heatmaps", href: "/heatmap" },
    { icon: Database, label: "Live Data", href: "/live-data" },
    { icon: User, label: "Profile", href: "/profile" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-1" : "py-2"}`}>
      <div className="container mx-auto px-3">
        <GlassCard className={`transition-all duration-300 ${isScrolled ? "backdrop-blur-md" : "backdrop-blur-sm"}`}>
          <div className="flex items-center justify-between px-4 py-2">
            {/* Logo - Ultra Compact */}
            <div className="flex items-center space-x-2 min-w-fit">
              <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xs">NF</span>
              </div>
              <span className="text-lg font-bold gradient-text hidden sm:block">NeighborFit</span>
              <span className="text-lg font-bold gradient-text sm:hidden">NF</span>
            </div>

            {/* Desktop Navigation - Ultra Compact Pill */}
            <nav className="hidden lg:flex items-center justify-center flex-1 max-w-lg mx-6">
              <div className="flex items-center bg-white/5 backdrop-blur-md rounded-full px-1 py-1 border border-white/10 shadow-lg">
                {navItems.map((item, index) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`group relative flex items-center justify-center px-3 py-2 rounded-full transition-all duration-300 min-w-fit ${
                      activeItem === item.href
                        ? "bg-white/20 text-white shadow-md"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                    title={item.label}
                    onClick={() => setActiveItem(item.href)}
                  >
                    <item.icon
                      className={`w-4 h-4 transition-all duration-200 ${
                        activeItem === item.href ? "scale-110" : "group-hover:scale-110"
                      }`}
                    />
                    <span
                      className={`ml-1.5 text-xs font-medium transition-all duration-200 ${
                        window.innerWidth >= 1280 ? "block" : "hidden xl:block"
                      }`}
                    >
                      {item.label}
                    </span>

                    {/* Enhanced Tooltip */}
                    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none xl:hidden whitespace-nowrap shadow-lg border border-white/10">
                      {item.label}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45 border-l border-t border-white/10"></div>
                    </div>

                    {/* Active indicator */}
                    {activeItem === item.href && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full"></div>
                    )}
                  </a>
                ))}
              </div>
            </nav>

            {/* Medium Screen Navigation */}
            <nav className="hidden md:flex lg:hidden items-center space-x-1">
              {navItems.slice(0, 5).map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`group relative flex items-center justify-center p-2.5 rounded-xl transition-all duration-200 ${
                    activeItem === item.href
                      ? "bg-white/15 text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                  title={item.label}
                  onClick={() => setActiveItem(item.href)}
                >
                  <item.icon
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeItem === item.href ? "scale-110" : "group-hover:scale-110"
                    }`}
                  />

                  {/* Enhanced Tooltip */}
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-lg border border-white/10">
                    {item.label}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45 border-l border-t border-white/10"></div>
                  </div>
                </a>
              ))}
            </nav>

            {/* Right Side - Compact */}
            <div className="flex items-center space-x-2 min-w-fit">
              <ThemeToggle />
              <AnimatedButton variant="glass" size="sm" className="hidden sm:block text-xs px-4 py-2 font-medium">
                Get Started
              </AnimatedButton>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-white p-2 hover:bg-white/10 rounded-xl transition-all duration-200 active:scale-95"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Enhanced Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-white/10 p-4 animate-in slide-in-from-top-2 duration-300">
              <nav className="grid grid-cols-2 gap-3">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                      activeItem === item.href
                        ? "bg-white/15 text-white"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => {
                      setActiveItem(item.href)
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </a>
                ))}
              </nav>
              <AnimatedButton variant="glass" size="sm" className="w-full mt-4 text-sm font-medium">
                Get Started
              </AnimatedButton>
            </div>
          )}
        </GlassCard>
      </div>
    </header>
  )
}
