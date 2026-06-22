"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface AnimatedNumberProps {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
  duration?: number
}

export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 2,
  className,
  duration = 800,
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const startTime = useRef<number | null>(null)
  const startValue = useRef(0)
  const targetValue = useRef(value)
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    startValue.current = displayValue
    targetValue.current = value
    startTime.current = null

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp
      const elapsed = timestamp - startTime.current
      const progress = Math.min(elapsed / duration, 1)

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = startValue.current + (targetValue.current - startValue.current) * eased

      setDisplayValue(current)

      if (progress < 1) {
        rafId.current = requestAnimationFrame(animate)
      }
    }

    rafId.current = requestAnimationFrame(animate)

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [value, duration])

  const formatted = displayValue.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span className={cn("tabular-nums", className)}>
      {prefix}{formatted}{suffix}
    </span>
  )
}
