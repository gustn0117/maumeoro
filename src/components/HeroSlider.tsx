'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

const slides = [
  {
    title: '마음을 담아,\n돌봄을 더하다',
    subtitle: '노인돌봄 용품 전문점',
    description: '부모님을 돌보는 모든 분들께, 진심을 담은 제품으로 함께합니다.',
    cta: '제품 보기',
    href: '/products',
    image: '/images/hero-1.jpg',
  },
  {
    title: '합리적인 가격,\n신뢰할 수 있는 품질',
    subtitle: '유럽 CE 인증 프리미엄',
    description: '가격만 낮춘 제품도, 이름값만 높은 제품도 아닙니다.',
    cta: '회사소개',
    href: '/about',
    image: '/images/hero-2.jpg',
  },
  {
    title: '카탈로그를\n요청하세요',
    subtitle: '전체 제품 라인업',
    description: '목욕·세정용품부터 소독·감염관리용품까지 전체 라인업을 확인하세요.',
    cta: '카탈로그 요청',
    href: '/catalog',
    image: '/images/hero-3.jpg',
  },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [prevSlide, setPrevSlide] = useState(0)
  const [textKey, setTextKey] = useState(0)

  const goTo = useCallback((index: number) => {
    if (isTransitioning || index === current) return
    setIsTransitioning(true)
    setPrevSlide(current)
    setCurrent(index)
    setTextKey(prev => prev + 1)
    setTimeout(() => setIsTransitioning(false), 1200)
  }, [isTransitioning, current])

  useEffect(() => {
    const timer = setInterval(() => {
      const next = (current + 1) % slides.length
      goTo(next)
    }, 6000)
    return () => clearInterval(timer)
  }, [current, goTo])

  return (
    <section className="relative h-[85vh] min-h-[560px] max-h-[800px] overflow-hidden bg-navy">
      {/* Background Images */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.77,0,0.175,1)]"
          style={{
            opacity: i === current ? 1 : 0,
            transform: i === current ? 'scale(1)' : 'scale(1.08)',
          }}
        >
          <img
            src={slide.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Multi-layer overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-navy/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-navy/20" />
        </div>
      ))}

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 decorative-dots-light pointer-events-none" />

      {/* Decorative blur circles */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-beige/8 blur-[120px] animate-pulse-soft" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/5 blur-[80px]" />

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="w-full lg:w-3/5 xl:w-1/2">
          <div key={textKey}>
            {/* Subtitle line - stagger 1 */}
            <div className="flex items-center gap-3 mb-5 opacity-0 animate-stagger-in" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              <span className="w-10 h-[1px] bg-beige" />
              <span className="text-beige text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">
                {slides[current].subtitle}
              </span>
            </div>

            {/* Title - stagger 2 */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[3.8rem] font-extrabold text-white leading-[1.1] whitespace-pre-line mb-6 drop-shadow-sm opacity-0 animate-stagger-in" style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}>
              {slides[current].title}
            </h1>

            {/* Description - stagger 3 */}
            <p className="text-white/50 text-base sm:text-lg max-w-lg mb-10 leading-relaxed opacity-0 animate-stagger-in" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              {slides[current].description}
            </p>

            {/* CTA - stagger 4 */}
            <div className="flex items-center gap-5 opacity-0 animate-stagger-in" style={{ animationDelay: '0.55s', animationFillMode: 'forwards' }}>
              <Link
                href={slides[current].href}
                className="group inline-flex items-center gap-3 bg-beige text-navy pl-8 pr-6 py-3.5 text-sm font-bold tracking-wide hover:bg-white hover:shadow-glow-beige transition-all duration-300 rounded-full"
              >
                {slides[current].cta}
                <span className="w-7 h-7 rounded-full bg-navy/10 flex items-center justify-center group-hover:bg-navy/20 transition-colors">
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <a
                href="tel:010-6667-2314"
                className="hidden sm:inline-flex items-center gap-2.5 text-white/30 text-sm hover:text-white/70 transition-colors group"
              >
                <span className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/5 transition-all">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                010-6667-2314
              </a>
            </div>
          </div>
        </div>

        {/* Right side decorative element */}
        <div className="hidden xl:block absolute right-8 top-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center gap-4">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2 transition-all duration-500 rounded-full ${
                  i === current ? 'h-10 bg-beige' : 'h-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`슬라이드 ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex items-end justify-between">
          {/* Progress Indicators */}
          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="relative h-1 rounded-full overflow-hidden transition-all duration-500 group xl:hidden"
                style={{ width: i === current ? '56px' : '20px' }}
                aria-label={`슬라이드 ${i + 1}`}
              >
                <span className="absolute inset-0 bg-white/15 rounded-full" />
                {i === current && (
                  <span className="absolute inset-0 bg-gradient-to-r from-beige to-beige-light rounded-full animate-slide-progress shadow-[0_0_8px_rgba(183,165,136,0.4)]" />
                )}
              </button>
            ))}
            <span className="ml-3 text-white/20 text-xs font-mono tabular-nums">
              {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
          </div>

          {/* Nav Arrows */}
          <div className="hidden sm:flex xl:hidden items-center gap-2">
            <button
              onClick={() => goTo((current - 1 + slides.length) % slides.length)}
              className="w-11 h-11 rounded-full border border-white/10 backdrop-blur-sm bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => goTo((current + 1) % slides.length)}
              className="w-11 h-11 rounded-full border border-white/10 backdrop-blur-sm bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex xl:hidden flex-col items-center gap-2 opacity-0 animate-scroll-hint">
        <span className="text-white/15 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-beige/50 animate-bounce-slow" />
        </div>
      </div>
    </section>
  )
}
