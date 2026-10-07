import { ReactNode } from 'react'

interface PageHeaderProps {
  title: ReactNode
  description?: ReactNode
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <section className="bg-aloe border-b border-navy/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <h1 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">{title}</h1>
        {description && (
          <p className="mt-3 text-base sm:text-lg text-ink-soft max-w-2xl">{description}</p>
        )}
      </div>
    </section>
  )
}
