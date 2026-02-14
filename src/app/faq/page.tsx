'use client'

import { useState, useEffect } from 'react'
import ScrollReveal from '@/components/ScrollReveal'

interface FaqItem {
  id: string
  question: string
  answer: string
  category: string
}

const categoryLabels: Record<string, string> = {
  all: '전체',
  product: '제품',
  order: '주문',
  delivery: '배송',
  general: '일반',
}

const categoryIcons: Record<string, JSX.Element> = {
  all: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  product: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  order: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
  delivery: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </svg>
  ),
  general: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
}

export default function FaqPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/faq')
      .then((res) => res.json())
      .then((data) => {
        setFaqs(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filtered = activeCategory === 'all'
    ? faqs
    : faqs.filter((f) => f.category === activeCategory)

  const toggleItem = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <>
      {/* Hero */}
      <section className="page-hero py-16 sm:py-20">
        <div className="absolute inset-0 decorative-dots-light pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-beige/60 text-xs tracking-[0.3em] uppercase font-semibold mb-3">FAQ</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">자주 묻는 질문</h1>
          <p className="text-white/40 text-sm max-w-md mx-auto">궁금하신 점을 빠르게 확인해 보세요.</p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-[70px] z-30 bg-white/95 backdrop-blur-lg border-b border-navy/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-4 overflow-x-auto">
            {Object.entries(categoryLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => { setActiveCategory(key); setExpandedId(null) }}
                className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeCategory === key
                    ? 'bg-navy text-white'
                    : 'bg-navy/5 text-navy/50 hover:bg-navy/10'
                }`}
              >
                {categoryIcons[key]}
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-12 bg-warm-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white rounded-2xl p-6">
                  <div className="h-4 bg-navy/5 rounded w-2/3 mb-3" />
                  <div className="h-3 bg-navy/5 rounded w-1/3" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <svg className="w-16 h-16 text-navy/10 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-navy/30 text-lg">등록된 FAQ가 없습니다.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((item, index) => (
                <ScrollReveal key={item.id} direction="up" delay={Math.min(index, 4)}>
                  <div
                    className={`rounded-2xl shadow-soft overflow-hidden hover:shadow-card-hover transition-all ${
                      expandedId === item.id ? 'border-l-2 border-beige bg-warm-white' : 'border-l-2 border-transparent bg-white'
                    }`}
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full flex items-center gap-4 px-6 py-5 text-left"
                    >
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-beige/10 text-beige font-bold text-sm flex items-center justify-center">
                        Q
                      </span>
                      <span className="flex-1 text-[15px] font-semibold text-navy">
                        {item.question}
                      </span>
                      <span className="flex-shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full bg-navy/5 text-navy/40">
                        {categoryLabels[item.category] || item.category}
                      </span>
                      <svg
                        className={`w-4 h-4 text-navy/20 flex-shrink-0 transition-transform duration-300 ${
                          expandedId === item.id ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        expandedId === item.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-6 pb-6 pt-0">
                          <div className="border-t border-navy/5 pt-4 flex gap-4">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-navy/10 text-navy font-bold text-sm flex items-center justify-center">
                              A
                            </span>
                            <p className="text-sm text-navy/60 leading-relaxed whitespace-pre-line pt-1">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
