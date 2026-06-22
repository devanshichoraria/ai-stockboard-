import { cn } from "@/lib/utils"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface ErrorStateProps {
  title?: string
  description?: string
  className?: string
  onRetry?: () => void
}

export function ErrorState({ 
  title = "Couldn't load this data", 
  description = "Something went wrong. Try again in a moment.", 
  className,
  onRetry 
}: ErrorStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-8 text-center", className)}>
      <div className="mb-4 rounded-full bg-accent-crimson/10 p-3">
        <AlertTriangle className="h-6 w-6 text-accent-crimson" />
      </div>
      <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
      <p className="mt-1 max-w-xs text-xs text-text-secondary">{description}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-surface-raised px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-white/[0.08]"
        >
          <RefreshCw className="h-4 w-4" />
          Retry
        </button>
      )}
    </div>
  )
}
