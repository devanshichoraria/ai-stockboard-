import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
  variant?: "text" | "card" | "chart" | "circle" | "tile"
}

export function Skeleton({ className, variant = "text" }: SkeletonProps) {
  const baseClasses = "shimmer bg-white/[0.04] rounded-md"

  const variantClasses = {
    text: "h-4 w-full",
    card: "h-32 w-full rounded-xl",
    chart: "h-64 w-full rounded-xl",
    circle: "h-12 w-12 rounded-full",
    tile: "h-24 w-full rounded-lg",
  }

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)} />
  )
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={i === lines - 1 ? "w-3/4" : "w-full"}
        />
      ))}
    </div>
  )
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("card-base p-6 space-y-4", className)}>
      <div className="flex items-center gap-3">
        <Skeleton variant="circle" />
        <div className="flex-1 space-y-2">
          <Skeleton className="w-32" />
          <Skeleton className="w-20" />
        </div>
      </div>
      <SkeletonText lines={4} />
    </div>
  )
}
