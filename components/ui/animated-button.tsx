"use client"

import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface AnimatedButtonProps {
  children: ReactNode
  className?: string
  variant?: "glass" | "solid" | "outline"
  size?: "sm" | "md" | "lg"
  onClick?: () => void
}

export function AnimatedButton({ children, className, variant = "glass", size = "md", onClick }: AnimatedButtonProps) {
  const variants = {
    glass: "fab-glass",
    solid: "bg-blue-600 hover:bg-blue-700 text-white",
    outline: "border border-white/20 text-white hover:bg-white/10",
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }

  return (
    <button
      className={cn(
        "rounded-full font-medium transition-all duration-300 active:scale-95",
        variants[variant],
        sizes[size],
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
