import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  variant?: "primary" | "secondary" | "tertiary"
}

export function GlassCard({ children, className, variant = "primary" }: GlassCardProps) {
  const variants = {
    primary: "glass-card-primary",
    secondary: "glass-card-secondary",
    tertiary: "bg-white/5 backdrop-blur-sm border border-white/10",
  }

  return <div className={cn(variants[variant], className)}>{children}</div>
}
