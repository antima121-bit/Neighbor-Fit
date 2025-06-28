"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { GlassCard } from "@/components/ui/glass-card"
import { AnimatedButton } from "@/components/ui/animated-button"
import {
  Heart,
  TrendingUp,
  Download,
  Share2,
  Bell,
  Calendar,
  DollarSign,
  Home,
  Car,
  GraduationCap,
  Shield,
  Coffee,
  Edit3,
  Save,
  Camera,
  LogIn,
  UserPlus,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  Briefcase,
  Users,
  AlertCircle,
  CheckCircle,
} from "lucide-react"

interface UserProfile {
  name: string
  email: string
  phone: string
  location: string
  occupation: string
  familySize: number
  age: number
  avatar: string
}

interface Preferences {
  budgetRange: { min: number; max: number }
  commuteImportance: number
  safetyImportance: number
  nightlifeImportance: number
  familyFriendliness: number
  publicTransport: boolean
  walkability: number
  diningOptions: number
  shoppingAccess: number
  greenSpaces: number
  culturalActivities: number
}

interface SavedNeighborhood {
  id: number
  name: string
  city: string
  matchScore: number
  savedDate: string
  image: string
  currentRent: string
  priceChange: string
}

interface Analytics {
  totalSearches: number
  neighborhoodsViewed: number
  averageMatchScore: number
  topPreference: string
  searchTrend: string
  lastActive: string
}

export default function ProfilePage() {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState("")
  const [authSuccess, setAuthSuccess] = useState("")

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  })

  // Register form state
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    location: "",
  })

  // Profile state
  const [isEditing, setIsEditing] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 98765 43210",
    location: "Gurgaon, Haryana",
    occupation: "Software Engineer",
    familySize: 4,
    age: 32,
    avatar: "/placeholder.svg?height=100&width=100",
  })

  const [preferences, setPreferences] = useState<Preferences>({
    budgetRange: { min: 25000, max: 45000 },
    commuteImportance: 8,
    safetyImportance: 9,
    nightlifeImportance: 5,
    familyFriendliness: 9,
    publicTransport: true,
    walkability: 7,
    diningOptions: 6,
    shoppingAccess: 7,
    greenSpaces: 8,
    culturalActivities: 6,
  })

  const [savedNeighborhoods, setSavedNeighborhoods] = useState<SavedNeighborhood[]>([
    {
      id: 1,
      name: "Cyber City",
      city: "Gurgaon, Haryana",
      matchScore: 94,
      savedDate: "2024-01-15",
      image: "/placeholder.svg?height=150&width=200",
      currentRent: "₹35,000",
      priceChange: "+5.2%",
    },
    {
      id: 2,
      name: "Koramangala",
      city: "Bangalore, Karnataka",
      matchScore: 89,
      savedDate: "2024-01-10",
      image: "/placeholder.svg?height=150&width=200",
      currentRent: "₹28,000",
      priceChange: "+3.1%",
    },
    {
      id: 3,
      name: "Bandra West",
      city: "Mumbai, Maharashtra",
      matchScore: 87,
      savedDate: "2024-01-08",
      image: "/placeholder.svg?height=150&width=200",
      currentRent: "₹55,000",
      priceChange: "+7.8%",
    },
  ])

  const [analytics, setAnalytics] = useState<Analytics>({
    totalSearches: 47,
    neighborhoodsViewed: 156,
    averageMatchScore: 82.4,
    topPreference: "Safety",
    searchTrend: "+23%",
    lastActive: "2 hours ago",
  })

  // Check authentication status on component mount
  useEffect(() => {
    try {
      const checkAuthStatus = () => {
        const authToken = localStorage.getItem("authToken")
        const userData = localStorage.getItem("userData")

        if (authToken && userData) {
          try {
            const parsedUserData = JSON.parse(userData)
            setUserProfile(parsedUserData)
            setIsLoggedIn(true)
          } catch (error) {
            console.error("Error parsing user data:", error)
            localStorage.removeItem("authToken")
            localStorage.removeItem("userData")
            setIsLoggedIn(false)
          }
        } else {
          setIsLoggedIn(false)
        }
        setIsLoading(false)
      }

      checkAuthStatus()
    } catch (error) {
      console.error("Error checking auth status:", error)
      setIsLoading(false)
      setIsLoggedIn(false)
    }
  }, [])

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError("")
    setAuthSuccess("")

    try {
      // Basic validation
      if (!loginForm.email || !loginForm.password) {
        setAuthError("Please fill in all fields")
        return
      }

      if (!loginForm.email.includes("@")) {
        setAuthError("Please enter a valid email address")
        return
      }

      setIsLoading(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock successful login
      const mockUserData = {
        name: "Rajesh Kumar",
        email: loginForm.email,
        phone: "+91 98765 43210",
        location: "Gurgaon, Haryana",
        occupation: "Software Engineer",
        familySize: 4,
        age: 32,
        avatar: "/placeholder.svg?height=100&width=100",
      }

      // Store auth data
      localStorage.setItem("authToken", "mock-jwt-token-" + Date.now())
      localStorage.setItem("userData", JSON.stringify(mockUserData))

      setUserProfile(mockUserData)
      setIsLoggedIn(true)
      setAuthSuccess("Login successful! Welcome back.")

      // Clear form
      setLoginForm({ email: "", password: "" })
    } catch (error) {
      console.error("Login error:", error)
      setAuthError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError("")
    setAuthSuccess("")

    try {
      // Validation
      if (!registerForm.name || !registerForm.email || !registerForm.password || !registerForm.confirmPassword) {
        setAuthError("Please fill in all required fields")
        return
      }

      if (!registerForm.email.includes("@")) {
        setAuthError("Please enter a valid email address")
        return
      }

      if (registerForm.password.length < 6) {
        setAuthError("Password must be at least 6 characters long")
        return
      }

      if (registerForm.password !== registerForm.confirmPassword) {
        setAuthError("Passwords do not match")
        return
      }

      setIsLoading(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock successful registration
      const newUserData = {
        name: registerForm.name,
        email: registerForm.email,
        phone: registerForm.phone || "+91 00000 00000",
        location: registerForm.location || "India",
        occupation: "Professional",
        familySize: 1,
        age: 25,
        avatar: "/placeholder.svg?height=100&width=100",
      }

      // Store auth data
      localStorage.setItem("authToken", "mock-jwt-token-" + Date.now())
      localStorage.setItem("userData", JSON.stringify(newUserData))

      setUserProfile(newUserData)
      setIsLoggedIn(true)
      setAuthSuccess("Registration successful! Welcome to NeighborFit.")

      // Clear form
      setRegisterForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        location: "",
      })
    } catch (error) {
      console.error("Registration error:", error)
      setAuthError("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle logout
  const handleLogout = () => {
    try {
      localStorage.removeItem("authToken")
      localStorage.removeItem("userData")
      setIsLoggedIn(false)
      setUserProfile({
        name: "",
        email: "",
        phone: "",
        location: "",
        occupation: "",
        familySize: 1,
        age: 25,
        avatar: "/placeholder.svg?height=100&width=100",
      })
      setAuthSuccess("Logged out successfully")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const handleSaveProfile = () => {
    try {
      setIsEditing(false)
      localStorage.setItem("userData", JSON.stringify(userProfile))
      setAuthSuccess("Profile updated successfully!")
      setTimeout(() => setAuthSuccess(""), 3000)
    } catch (error) {
      console.error("Save profile error:", error)
      setAuthError("Failed to save profile. Please try again.")
    }
  }

  const handlePreferenceChange = (key: string, value: any) => {
    try {
      setPreferences((prev) => ({ ...prev, [key]: value }))
    } catch (error) {
      console.error("Preference change error:", error)
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center min-h-[60vh]">
              <GlassCard className="p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-white/80">Loading your profile...</p>
              </GlassCard>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Authentication forms
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4">
                  {authMode === "login" ? "Welcome Back" : "Join NeighborFit"}
                </h1>
                <p className="text-white/80">
                  {authMode === "login"
                    ? "Sign in to access your personalized neighborhood insights"
                    : "Create your account to start finding your perfect neighborhood"}
                </p>
              </div>

              <GlassCard className="p-6">
                {/* Auth Mode Toggle */}
                <div className="flex mb-6">
                  <button
                    onClick={() => {
                      setAuthMode("login")
                      setAuthError("")
                      setAuthSuccess("")
                    }}
                    className={`flex-1 py-2 px-4 text-center transition-all duration-200 ${
                      authMode === "login" ? "bg-blue-500 text-white" : "bg-white/10 text-white/70 hover:bg-white/20"
                    } rounded-l-lg`}
                  >
                    <LogIn className="w-4 h-4 inline mr-2" />
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setAuthMode("register")
                      setAuthError("")
                      setAuthSuccess("")
                    }}
                    className={`flex-1 py-2 px-4 text-center transition-all duration-200 ${
                      authMode === "register" ? "bg-blue-500 text-white" : "bg-white/10 text-white/70 hover:bg-white/20"
                    } rounded-r-lg`}
                  >
                    <UserPlus className="w-4 h-4 inline mr-2" />
                    Register
                  </button>
                </div>

                {/* Error/Success Messages */}
                {authError && (
                  <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center">
                    <AlertCircle className="w-4 h-4 text-red-400 mr-2" />
                    <span className="text-red-200 text-sm">{authError}</span>
                  </div>
                )}

                {authSuccess && (
                  <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span className="text-green-200 text-sm">{authSuccess}</span>
                  </div>
                )}

                {/* Login Form */}
                {authMode === "login" && (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-white/80 mb-2 text-sm">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm((prev) => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-white/80 mb-2 text-sm">
                        <Lock className="w-4 h-4 inline mr-2" />
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={loginForm.password}
                          onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-12"
                          placeholder="Enter your password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <AnimatedButton type="submit" variant="glass" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Signing In...
                        </>
                      ) : (
                        <>
                          <LogIn className="w-4 h-4 mr-2" />
                          Sign In
                        </>
                      )}
                    </AnimatedButton>
                  </form>
                )}

                {/* Register Form */}
                {authMode === "register" && (
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <label className="block text-white/80 mb-2 text-sm">
                        <User className="w-4 h-4 inline mr-2" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={registerForm.name}
                        onChange={(e) => setRegisterForm((prev) => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-white/80 mb-2 text-sm">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm((prev) => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-white/80 mb-2 text-sm">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={registerForm.phone}
                        onChange={(e) => setRegisterForm((prev) => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="+91 00000 00000"
                      />
                    </div>

                    <div>
                      <label className="block text-white/80 mb-2 text-sm">
                        <MapPin className="w-4 h-4 inline mr-2" />
                        Current Location
                      </label>
                      <input
                        type="text"
                        value={registerForm.location}
                        onChange={(e) => setRegisterForm((prev) => ({ ...prev, location: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="City, State"
                      />
                    </div>

                    <div>
                      <label className="block text-white/80 mb-2 text-sm">
                        <Lock className="w-4 h-4 inline mr-2" />
                        Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={registerForm.password}
                          onChange={(e) => setRegisterForm((prev) => ({ ...prev, password: e.target.value }))}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-12"
                          placeholder="Create a password (min 6 characters)"
                          required
                          minLength={6}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/80 mb-2 text-sm">
                        <Lock className="w-4 h-4 inline mr-2" />
                        Confirm Password *
                      </label>
                      <input
                        type="password"
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Confirm your password"
                        required
                      />
                    </div>

                    <AnimatedButton type="submit" variant="glass" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4 mr-2" />
                          Create Account
                        </>
                      )}
                    </AnimatedButton>
                  </form>
                )}

                {/* Demo Login */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-center text-white/60 text-sm mb-3">Quick Demo Access</p>
                  <AnimatedButton
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setLoginForm({ email: "demo@neighborfit.com", password: "demo123" })
                      if (authMode !== "login") setAuthMode("login")
                    }}
                  >
                    Use Demo Credentials
                  </AnimatedButton>
                </div>
              </GlassCard>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Main Profile Dashboard (when logged in)
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your <span className="gradient-text">Profile</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Manage your preferences, view analytics, and track your neighborhood search journey.
            </p>
          </div>

          {/* Success Message */}
          {authSuccess && (
            <div className="mb-6 max-w-md mx-auto">
              <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-green-200 text-sm">{authSuccess}</span>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Profile Card */}
              <GlassCard className="p-6">
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <img
                      src={userProfile.avatar || "/placeholder.svg?height=100&width=100"}
                      alt="Profile"
                      className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white/20"
                    />
                    <button className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full hover:bg-blue-600 transition-colors">
                      <Camera className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={userProfile.name}
                        onChange={(e) => setUserProfile((prev) => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-center placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Full Name"
                      />
                      <input
                        type="email"
                        value={userProfile.email}
                        onChange={(e) => setUserProfile((prev) => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-center placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Email"
                      />
                      <input
                        type="tel"
                        value={userProfile.phone}
                        onChange={(e) => setUserProfile((prev) => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-center placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Phone"
                      />
                      <input
                        type="text"
                        value={userProfile.location}
                        onChange={(e) => setUserProfile((prev) => ({ ...prev, location: e.target.value }))}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-center placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Location"
                      />
                      <input
                        type="text"
                        value={userProfile.occupation}
                        onChange={(e) => setUserProfile((prev) => ({ ...prev, occupation: e.target.value }))}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-center placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Occupation"
                      />
                    </div>
                  ) : (
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">{userProfile.name}</h2>
                      <p className="text-white/70 mb-1">{userProfile.email}</p>
                      <p className="text-white/70 mb-1">{userProfile.phone}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70 flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Location:
                    </span>
                    <span className="text-white font-medium">{userProfile.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70 flex items-center">
                      <Briefcase className="w-4 h-4 mr-2" />
                      Occupation:
                    </span>
                    <span className="text-white font-medium">{userProfile.occupation}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70 flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Family Size:
                    </span>
                    <span className="text-white font-medium">{userProfile.familySize} members</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Age:
                    </span>
                    <span className="text-white font-medium">{userProfile.age} years</span>
                  </div>
                </div>

                <div className="mt-6 flex space-x-2">
                  {isEditing ? (
                    <>
                      <AnimatedButton variant="glass" size="sm" onClick={handleSaveProfile} className="flex-1">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </AnimatedButton>
                      <AnimatedButton
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(false)}
                        className="flex-1"
                      >
                        Cancel
                      </AnimatedButton>
                    </>
                  ) : (
                    <AnimatedButton variant="glass" size="sm" onClick={() => setIsEditing(true)} className="w-full">
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </AnimatedButton>
                  )}
                </div>

                <div className="mt-4">
                  <AnimatedButton
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="w-full text-red-400 border-red-400/30 hover:bg-red-500/20"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Logout
                  </AnimatedButton>
                </div>
              </GlassCard>

              {/* Quick Stats */}
              <GlassCard className="p-6">
                <h3 className="text-xl font-bold mb-4 gradient-text">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-blue-400" />
                      <span className="text-white/80">Searches</span>
                    </div>
                    <span className="text-white font-bold">{analytics.totalSearches}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Home className="w-4 h-4 text-green-400" />
                      <span className="text-white/80">Areas Viewed</span>
                    </div>
                    <span className="text-white font-bold">{analytics.neighborhoodsViewed}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 text-red-400" />
                      <span className="text-white/80">Avg Match</span>
                    </div>
                    <span className="text-white font-bold">{analytics.averageMatchScore}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      <span className="text-white/80">Last Active</span>
                    </div>
                    <span className="text-white font-bold">{analytics.lastActive}</span>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Middle Column - Preferences */}
            <div className="lg:col-span-1 space-y-6">
              <GlassCard className="p-6">
                <h3 className="text-xl font-bold mb-6 gradient-text">Lifestyle Preferences</h3>

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
                        value={preferences.budgetRange.min}
                        onChange={(e) =>
                          handlePreferenceChange("budgetRange", {
                            ...preferences.budgetRange,
                            min: Number.parseInt(e.target.value),
                          })
                        }
                        className="w-full accent-blue-500"
                      />
                      <input
                        type="range"
                        min="10000"
                        max="100000"
                        step="5000"
                        value={preferences.budgetRange.max}
                        onChange={(e) =>
                          handlePreferenceChange("budgetRange", {
                            ...preferences.budgetRange,
                            max: Number.parseInt(e.target.value),
                          })
                        }
                        className="w-full accent-blue-500"
                      />
                      <div className="text-center text-white/60">
                        ₹{preferences.budgetRange.min.toLocaleString("en-IN")} - ₹
                        {preferences.budgetRange.max.toLocaleString("en-IN")}/month
                      </div>
                    </div>
                  </div>

                  {/* Safety Importance */}
                  <div>
                    <label className="block text-white/80 mb-3 flex items-center">
                      <Shield className="w-4 h-4 mr-2" />
                      Safety Priority (1-10)
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={preferences.safetyImportance}
                      onChange={(e) => handlePreferenceChange("safetyImportance", Number.parseInt(e.target.value))}
                      className="w-full accent-blue-500"
                    />
                    <div className="text-center text-white/60">{preferences.safetyImportance}/10</div>
                  </div>

                  {/* Commute Importance */}
                  <div>
                    <label className="block text-white/80 mb-3 flex items-center">
                      <Car className="w-4 h-4 mr-2" />
                      Commute Importance (1-10)
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={preferences.commuteImportance}
                      onChange={(e) => handlePreferenceChange("commuteImportance", Number.parseInt(e.target.value))}
                      className="w-full accent-blue-500"
                    />
                    <div className="text-center text-white/60">{preferences.commuteImportance}/10</div>
                  </div>

                  {/* Family Friendliness */}
                  <div>
                    <label className="block text-white/80 mb-3 flex items-center">
                      <Home className="w-4 h-4 mr-2" />
                      Family Friendliness (1-10)
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={preferences.familyFriendliness}
                      onChange={(e) => handlePreferenceChange("familyFriendliness", Number.parseInt(e.target.value))}
                      className="w-full accent-blue-500"
                    />
                    <div className="text-center text-white/60">{preferences.familyFriendliness}/10</div>
                  </div>

                  {/* Schools */}
                  <div>
                    <label className="block text-white/80 mb-3 flex items-center">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      School Quality (1-10)
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={preferences.greenSpaces}
                      onChange={(e) => handlePreferenceChange("greenSpaces", Number.parseInt(e.target.value))}
                      className="w-full accent-blue-500"
                    />
                    <div className="text-center text-white/60">{preferences.greenSpaces}/10</div>
                  </div>

                  {/* Nightlife */}
                  <div>
                    <label className="block text-white/80 mb-3 flex items-center">
                      <Coffee className="w-4 h-4 mr-2" />
                      Nightlife & Dining (1-10)
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={preferences.nightlifeImportance}
                      onChange={(e) => handlePreferenceChange("nightlifeImportance", Number.parseInt(e.target.value))}
                      className="w-full accent-blue-500"
                    />
                    <div className="text-center text-white/60">{preferences.nightlifeImportance}/10</div>
                  </div>

                  {/* Public Transport Toggle */}
                  <div className="flex items-center justify-between">
                    <label className="text-white/80 flex items-center">
                      <Car className="w-4 h-4 mr-2" />
                      Public Transport Access
                    </label>
                    <button
                      onClick={() => handlePreferenceChange("publicTransport", !preferences.publicTransport)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        preferences.publicTransport ? "bg-blue-600" : "bg-gray-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          preferences.publicTransport ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <AnimatedButton variant="glass" className="w-full mt-6">
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </AnimatedButton>
              </GlassCard>
            </div>

            {/* Right Column - Saved Neighborhoods */}
            <div className="lg:col-span-1 space-y-6">
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold gradient-text">Saved Areas</h3>
                  <span className="text-sm text-white/60">{savedNeighborhoods.length} saved</span>
                </div>

                <div className="space-y-4">
                  {savedNeighborhoods.map((neighborhood) => (
                    <GlassCard key={neighborhood.id} className="p-4 hover:scale-105 transition-all duration-300">
                      <div className="flex space-x-3">
                        <img
                          src={neighborhood.image || "/placeholder.svg?height=64&width=64"}
                          alt={neighborhood.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-white text-sm">{neighborhood.name}</h4>
                            <span className="text-xs text-green-400 font-bold">{neighborhood.matchScore}%</span>
                          </div>
                          <p className="text-xs text-white/70 mb-2">{neighborhood.city}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-white">{neighborhood.currentRent}</span>
                            <span className="text-xs text-green-400">{neighborhood.priceChange}</span>
                          </div>
                          <p className="text-xs text-white/60 mt-1">Saved: {neighborhood.savedDate}</p>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>

                <div className="mt-6 space-y-3">
                  <AnimatedButton variant="glass" size="sm" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </AnimatedButton>
                  <AnimatedButton variant="outline" size="sm" className="w-full">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share List
                  </AnimatedButton>
                </div>
              </GlassCard>

              {/* Notifications Settings */}
              <GlassCard className="p-6">
                <h3 className="text-xl font-bold mb-4 gradient-text">Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="w-4 h-4 text-blue-400" />
                      <span className="text-white/80">Price Alerts</span>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-white/80">Market Updates</span>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 text-red-400" />
                      <span className="text-white/80">New Matches</span>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                    </button>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
