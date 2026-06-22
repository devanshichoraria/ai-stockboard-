"use client"

import { cn } from "@/lib/utils"

interface SegmentedControlProps<T extends string> {
  options: { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
  className?: string
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className,
}: SegmentedControlProps<T>) {
  return (
    <div
      className={cn(
        "inline-flex rounded-lg bg-white/[0.04] p-1",
        className
      )}
    >
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "relative rounded-md px-3 py-1.5 text-sm font-medium transition-all",
            value === option.value
              ? "bg-white/[0.08] text-text-primary shadow-sm"
              : "text-text-secondary hover:text-text-primary"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
