'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'scale'
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      el.classList.add('visible')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const directionClass =
    direction === 'left'
      ? 'scroll-reveal-left'
      : direction === 'right'
        ? 'scroll-reveal-right'
        : direction === 'scale'
          ? 'scroll-reveal-scale'
          : 'scroll-reveal'

  const delayClass = delay > 0 ? `scroll-reveal-delay-${delay}` : ''

  return (
    <div ref={ref} className={`${directionClass} ${delayClass} ${className}`}>
      {children}
    </div>
  )
}
