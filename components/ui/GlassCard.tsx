import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-xl p-6 shadow-glass",
        hover && "transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5",
        className
      )}
    >
      {children}
    </div>
  )
}
