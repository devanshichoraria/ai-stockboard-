import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface BadgeProps {
  children: ReactNode
  variant?: "default" | "success" | "warning" | "danger" | "info" | "ai"
  className?: string
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default: "bg-white/[0.06] text-text-secondary",
    success: "bg-accent-emerald/10 text-accent-emerald",
    warning: "bg-orange-500/10 text-orange-400",
    danger: "bg-accent-crimson/10 text-accent-crimson",
    info: "bg-accent-blue/10 text-accent-blue",
    ai: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
