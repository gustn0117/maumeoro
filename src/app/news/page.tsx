'use client'

import { useState, useEffect } from 'react'
import ScrollReveal from '@/components/ScrollReveal'

interface NewsItem {
  id: string
  title: string
  content: string
  category: string
  date: string
  published: boolean
}

const categoryLabels: Record<string, string> = {
  notice: '공지',
  product: '제품',
  guide: '안내',
}

const categoryColors: Record<string, string> = {
  notice: 'bg-rose-50 text-rose-500',
  product: 'bg-blue-50 text-blue-500',
  guide: 'bg-navy/5 text-navy/50',
}

function parseDateParts(dateStr: string) {
  const d = new Date(dateStr)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = String(d.getFullYear())
  return { day, month, year }
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/news')
      .then((res) => res.json())
      .then((data) => {
        setNews(data.filter((n: NewsItem) => n.published))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filtered = activeCategory === 'all'
    ? news
    : news.filter((n) => n.category === activeCategory)

  const filterTabs = [
    { key: 'all', label: '전체' },
    { key: 'notice', label: '공지' },
    { key: 'product', label: '제품' },
    { key: 'guide', label: '안내' },
  ]

  return (
    <>
      {/* Hero */}
      <section className="page-hero py-16 sm:py-20">
        <div className="absolute inset-0 decorative-dots-light pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-beige/60 text-xs tracking-[0.3em] uppercase font-semibold mb-3">News & Notice</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">소식지</h1>
          <p className="text-white/40 text-sm max-w-md mx-auto">마음으로의 새로운 소식과 유용한 정보를 확인하세요.</p>
        </div>
      </section>

      {/* Filter - refined tab style with bottom border indicator */}
      <section className="sticky top-[70px] z-30 bg-white/95 backdrop-blur-lg border-b border-navy/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveCategory(tab.key)}
                className={`relative px-5 py-4 text-sm font-medium transition-all whitespace-nowrap ${
                  activeCategory === tab.key
                    ? 'text-navy'
                    : 'text-navy/40 hover:text-navy/60'
                }`}
              >
                {tab.label}
                {activeCategory === tab.key && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-beige rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News List */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white rounded-2xl p-6">
                  <div className="h-4 bg-navy/5 rounded w-1/4 mb-3" />
                  <div className="h-5 bg-navy/5 rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-20 h-20 rounded-2xl bg-navy/[0.03] flex items-center justify-center mx-auto mb-6">
                <svg className="w-9 h-9 text-navy/15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <p className="text-navy/30 text-lg font-medium">소식이 없습니다.</p>
              <p className="text-navy/20 text-sm mt-1">새로운 소식이 등록되면 이곳에 표시됩니다.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((item, index) => {
                const { day, month, year } = parseDateParts(item.date)
                const indexNum = String(index + 1).padStart(2, '0')

                return (
                  <ScrollReveal key={item.id} direction="up" delay={Math.min(index, 4)}>
                    <article
                      className="bg-white rounded-2xl shadow-soft overflow-hidden cursor-pointer hover:shadow-card-hover hover:border-l-2 hover:border-l-beige hover:pl-5 transition-all"
                      onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                    >
                      <div className="flex items-center gap-4 px-6 py-5">
                        {/* Index number */}
                        <span className="flex-shrink-0 text-xs font-bold text-navy/15 tabular-nums w-6 text-right">
                          {indexNum}
                        </span>

                        {/* Date visual box */}
                        <div className="flex-shrink-0 w-16 text-center">
                          <div className="bg-warm-white rounded-lg px-3 py-2 border-b-2 border-beige/30">
                            <span className="block text-xl font-bold text-navy leading-tight">{day}</span>
                            <span className="block text-[10px] text-navy/40 font-medium leading-tight mt-0.5">{year}.{month}</span>
                          </div>
                        </div>

                        <span className={`flex-shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full ${categoryColors[item.category] || 'bg-navy/5 text-navy/40'}`}>
                          {categoryLabels[item.category] || item.category}
                        </span>
                        <h3 className="flex-1 text-[15px] font-semibold text-navy truncate">
                          {item.title}
                        </h3>
                        <svg className={`w-4 h-4 text-navy/20 flex-shrink-0 transition-transform ${expandedId === item.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      {expandedId === item.id && (
                        <div className="px-6 pb-6 pt-0">
                          <div className="border-t border-navy/5 pt-4 ml-[5.5rem]">
                            <p className="text-sm text-navy/60 leading-relaxed whitespace-pre-line">
                              {item.content}
                            </p>
                          </div>
                        </div>
                      )}
                    </article>
                  </ScrollReveal>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
