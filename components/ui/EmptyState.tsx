import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface EmptyStateProps {
  title: string
  description?: string
  icon?: LucideIcon
  className?: string
  action?: React.ReactNode
}

export function EmptyState({ title, description, icon: Icon, className, action }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
      {Icon && (
        <div className="mb-4 rounded-full bg-white/[0.04] p-4">
          <Icon className="h-8 w-8 text-text-tertiary" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-text-secondary">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
