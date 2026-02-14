'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import HeroSlider from '@/components/HeroSlider'
import ScrollReveal from '@/components/ScrollReveal'

const features = [
  { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', label: '검증된 품질', sub: 'CE 인증 제품' },
  { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', label: '합리적 가격', sub: '유통 최적화' },
  { icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', label: '진심 돌봄', sub: '맞춤 상담' },
  { icon: 'M13 10V3L4 14h7v7l9-11h-7z', label: '빠른 배송', sub: '전국 당일출고' },
]

const newsItems: { id: number; title: string; date: string; category: string; isNew: boolean }[] = []

const bestProducts: { id: number; nameKo: string; nameEn: string; description: string; image: string }[] = []

const partnerItems = [
  { icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', label: '요양병원' },
  { icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', label: '요양원' },
  { icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', label: '복지관' },
  { icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', label: '재가센터' },
  { icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', label: '데이케어' },
  { icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z', label: '의료기관' },
  { icon: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z', label: '공공기관' },
  { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', label: '돌봄시설' },
]

export default function HomePage() {
  const logosRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = logosRef.current
    if (!el) return
    let animationId: number
    let position = 0
    const speed = 0.4

    const animate = () => {
      position += speed
      if (position >= el.scrollWidth / 2) position = 0
      el.style.transform = `translateX(-${position}px)`
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <>
      {/* Hero Slider */}
      <HeroSlider />

      {/* Feature Strip */}
      <ScrollReveal direction="scale" className="relative -mt-12 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-elevated grid grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <div key={i} className="relative flex items-center gap-3.5 px-5 lg:px-6 py-6 group cursor-default">
                {/* Left accent line */}
                {i > 0 && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-8 bg-navy/[0.06]" />}
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-beige/15 to-beige/5 flex items-center justify-center flex-shrink-0 group-hover:from-beige/25 group-hover:to-beige/15 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-glow-beige transition-all duration-300">
                  <svg className="w-5 h-5 text-beige" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={f.icon} />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-navy leading-none">{f.label}</p>
                  <p className="text-[11px] text-navy/30 mt-1 group-hover:text-beige/60 transition-colors">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* News + Best Product Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* 소식지 (News) */}
            <ScrollReveal direction="left" className="lg:col-span-4">
              <div className="bg-white rounded-2xl shadow-card overflow-hidden h-full flex flex-col">
                <div className="px-7 pt-7 pb-5 flex items-end justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-navy">소식지</h2>
                    <span className="text-[10px] text-navy/20 tracking-[0.2em] uppercase font-medium">news</span>
                  </div>
                  <Link href="/news" className="text-xs font-semibold text-beige hover:text-navy transition-colors flex items-center gap-1 group">
                    더보기
                    <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                <div className="flex-1 px-3 pb-4">
                  {newsItems.length > 0 ? newsItems.map((item) => (
                    <Link
                      key={item.id}
                      href="/news"
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-navy/[0.02] transition-colors group ${
                        item.isNew ? 'bg-beige/[0.04]' : ''
                      }`}
                    >
                      <span className={`flex-shrink-0 w-1.5 h-1.5 rounded-full ${
                        item.category === '공지' ? 'bg-rose-400' : item.category === '제품' ? 'bg-blue-400' : 'bg-navy/15'
                      }`} />
                      <span className="flex-1 text-[13px] text-navy/55 group-hover:text-navy transition-colors truncate">
                        {item.title}
                      </span>
                      {item.isNew && (
                        <span className="flex-shrink-0 text-[9px] font-bold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded-full">NEW</span>
                      )}
                      <time className="flex-shrink-0 text-[11px] text-navy/15 tabular-nums">{item.date}</time>
                    </Link>
                  )) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 rounded-2xl bg-navy/[0.03] flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-navy/15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-navy/30">등록된 소식이 없습니다</p>
                      <p className="text-xs text-navy/20 mt-1">새로운 소식을 준비 중입니다</p>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>

            {/* Best Product */}
            <ScrollReveal direction="right" className="lg:col-span-8">
              <div className="bg-white rounded-2xl shadow-card overflow-hidden h-full">
                <div className="px-7 pt-7 pb-5 flex items-end justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-navy">Best Product</h2>
                    <span className="text-[10px] text-navy/20 tracking-[0.2em] uppercase font-medium">인기 제품</span>
                  </div>
                  <Link href="/products" className="text-xs font-semibold text-beige hover:text-navy transition-colors flex items-center gap-1 group">
                    전체보기
                    <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                <div className="px-7 pb-7">
                  {bestProducts.length > 0 ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {bestProducts.map((product) => (
                        <Link key={product.id} href="/products" className="group">
                          <div className="relative rounded-2xl overflow-hidden aspect-square bg-warm-white mb-3">
                            <img
                              src={product.image}
                              alt={product.nameKo}
                              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-navy/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                              <span className="text-white text-xs font-semibold bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                자세히 보기
                              </span>
                            </div>
                          </div>
                          <div className="px-0.5">
                            <p className="text-[13px] font-bold text-navy group-hover:text-beige transition-colors leading-snug">
                              {product.nameKo}
                            </p>
                            <p className="text-[10px] text-navy/25 mt-0.5">{product.nameEn}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="w-20 h-20 rounded-2xl bg-navy/[0.03] flex items-center justify-center mb-4">
                        <svg className="w-10 h-10 text-navy/15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-navy/30">등록된 제품이 없습니다</p>
                      <p className="text-xs text-navy/20 mt-1">새로운 제품을 준비 중입니다</p>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 상담예약 Bar */}
      <ScrollReveal>
        <section className="pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-2xl">
              {/* Background image */}
              <div className="absolute inset-0">
                <img src="/images/about-care.jpg" alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/80 to-navy/70 backdrop-blur-sm" />
              </div>
              {/* Decorative */}
              <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-beige/10 blur-[80px]" />
              <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-white/5 blur-[60px]" />
              <div className="absolute right-10 bottom-0 w-32 h-32 rounded-full bg-beige/5 blur-[50px]" />
              <div className="absolute inset-0 decorative-dots-light pointer-events-none" />

              <div className="relative flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 px-8 py-8 sm:py-7">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-beige/15 backdrop-blur flex items-center justify-center">
                    <svg className="w-6 h-6 text-beige" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-lg font-bold text-white">상담예약</span>
                    <p className="text-[10px] text-beige/40 tracking-widest uppercase">consultation</p>
                  </div>
                </div>

                <div className="hidden sm:block w-px h-12 bg-white/10" />

                <a href="tel:010-6667-2314" className="group flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-beige/20 group-hover:border-beige/30 transition-all">
                    <svg className="w-4.5 h-4.5 text-beige" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  <span className="text-2xl font-extrabold text-white tracking-wider group-hover:text-beige-light transition-colors relative">
                    010-6667-2314
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-beige-light/50 group-hover:w-full transition-all duration-300" />
                  </span>
                </a>

                <div className="hidden sm:block w-px h-12 bg-white/10" />

                <div className="text-center sm:text-left">
                  <p className="text-sm text-white/50">
                    평일 <span className="text-white/80 font-semibold">09:00 ~ 18:00</span>
                  </p>
                  <p className="text-xs text-white/25 mt-1">
                    주말 및 공휴일 <span className="text-white/40">~ 13:00</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 파트너 */}
      <ScrollReveal>
        <section className="py-14 overflow-hidden border-t border-navy/[0.04]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <div className="flex items-center gap-3">
              <span className="w-6 h-[1px] bg-beige/40" />
              <span className="text-[11px] text-navy/25 tracking-[0.2em] uppercase font-semibold">Trusted Partners</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-warm-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-warm-white to-transparent z-10 pointer-events-none" />

            <div className="overflow-hidden">
              <div ref={logosRef} className="flex" style={{ willChange: 'transform' }}>
                {[...partnerItems, ...partnerItems].map((item, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-[180px] h-[80px] mx-3 bg-white rounded-2xl border border-navy/[0.04] flex items-center justify-center gap-3 shadow-soft hover:shadow-card hover:border-beige/20 transition-all duration-300 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-navy/[0.03] flex items-center justify-center group-hover:bg-beige/10 transition-colors">
                      <svg className="w-4.5 h-4.5 text-navy/20 group-hover:text-beige transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                      </svg>
                    </div>
                    <span className="text-[13px] text-navy/25 font-semibold group-hover:text-navy/40 transition-colors">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  )
}
