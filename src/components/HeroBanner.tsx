'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { productCategories } from '@/lib/categories'
import { PHONE, FAX, EMAIL, BUSINESS_HOURS } from '@/lib/contact'

interface Banner {
  key: string
  label: string
  title: string
  description: string
  href: string
  // 사진이 있으면 사진을, 없으면 큰 글자 판(panel)을 오른쪽에 보여준다
  image?: { src: string; alt: string }
  panel?: { text: string; tone: string }
}

const AUTO_ADVANCE_MS = 6000
const SWIPE_THRESHOLD_PX = 40

const PANEL_TONES = ['bg-navy text-white', 'bg-beige-light text-navy', 'bg-navy-light text-white', 'bg-beige-deep text-white']

// 영문 이름을 두 줄로 나눈다: '&' 앞에서, 없으면 마지막 낱말 앞에서
const inTwoLines = (text: string) =>
  text.includes(' & ') ? text.replace(' & ', '\n& ') : text.replace(/ (?=\S+$)/, '\n')

// 배너 목록. 배너용 이미지·문구를 받으면 이 목록만 바꾸면 된다.
// (카테고리 4장은 사진을 받기 전까지 글자 판으로 채워 둔 임시 구성)
const banners: Banner[] = [
  {
    key: 'main',
    label: '의료용품 전문점',
    title: '마음을 담아,\n돌봄을 더하다',
    description: '돌봄이 필요한 모든 분들께, 진심을 담은 제품으로 함께합니다.',
    href: '/products',
    image: { src: '/images/hero-3.jpg', alt: '보호자가 어르신의 손을 두 손으로 감싸 쥔 모습' },
  },
  ...productCategories.map((c, i) => ({
    key: c.value,
    label: '제품 카테고리',
    title: c.label,
    description: c.description,
    href: `/products?category=${c.value}`,
    panel: { text: inTwoLines(c.english), tone: PANEL_TONES[i % PANEL_TONES.length] },
  })),
]

const controlClass = 'w-10 h-10 flex items-center justify-center rounded-full text-ink-soft hover:text-navy hover:bg-navy/5 transition-colors'

export default function HeroBanner() {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)     // 멈춤 버튼으로 정한 상태
  const [isEngaged, setIsEngaged] = useState(false)   // 마우스를 올렸거나 키보드 초점이 안에 있는 동안
  const touchStartX = useRef<number | null>(null)
  const count = banners.length

  const go = (next: number) => setIndex((next + count) % count)

  // '동작 줄이기'를 켠 사용자에게는 자동으로 넘기지 않는다
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setIsPaused(true)
  }, [])

  useEffect(() => {
    if (isPaused || isEngaged) return
    const timer = setTimeout(() => setIndex((i) => (i + 1) % count), AUTO_ADVANCE_MS)
    return () => clearTimeout(timer)
  }, [index, isPaused, isEngaged, count])

  const swipe = {
    onTouchStart: (e: React.TouchEvent) => {
      touchStartX.current = e.touches[0].clientX
    },
    onTouchEnd: (e: React.TouchEvent) => {
      if (touchStartX.current === null) return
      const dx = e.changedTouches[0].clientX - touchStartX.current
      touchStartX.current = null
      if (Math.abs(dx) > SWIPE_THRESHOLD_PX) go(index + (dx < 0 ? 1 : -1))
    },
  }

  return (
    <section className="bg-aloe" aria-roledescription="carousel" aria-label="주요 배너">
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
        // 터치 화면에서는 손을 뗀 뒤에도 '올려둔' 상태가 남으므로 마우스일 때만 멈춘다
        onPointerEnter={(e) => e.pointerType === 'mouse' && setIsEngaged(true)}
        onPointerLeave={(e) => e.pointerType === 'mouse' && setIsEngaged(false)}
        onFocus={(e) => e.target.matches(':focus-visible') && setIsEngaged(true)}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setIsEngaged(false)}
      >
        <div className="lg:col-span-6">
          {/* 글: 모든 배너를 같은 칸에 겹쳐 두어, 넘어갈 때 높이가 흔들리지 않게 한다 */}
          <div className="grid" aria-live={isPaused || isEngaged ? 'polite' : 'off'} {...swipe}>
            {banners.map((b, i) => {
              const active = i === index
              const Title = i === 0 ? 'h1' : 'h2'
              return (
                <div
                  key={b.key}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${count}개 중 ${i + 1}번째`}
                  aria-hidden={!active}
                  className={`col-start-1 row-start-1 flex flex-col transition-[opacity,visibility] duration-500 ${
                    active ? 'opacity-100 visible' : 'opacity-0 invisible'
                  }`}
                >
                  <p className="font-semibold text-beige-deep">{b.label}</p>
                  <Title className="mt-3 text-[2.5rem] sm:text-5xl lg:text-[3.5rem] font-extrabold text-navy leading-[1.18] tracking-wide whitespace-pre-line">
                    {b.title}
                  </Title>
                  <p className="mt-6 text-lg sm:text-xl sm:leading-8 text-ink-soft max-w-xl">{b.description}</p>
                  <div className="mt-auto pt-8 flex flex-col sm:flex-row gap-3">
                    <Link href={b.href} className="btn-primary">제품 보기</Link>
                    <Link href="/catalog" className="btn-outline">카탈로그 요청</Link>
                  </div>
                </div>
              )
            })}
          </div>

          {/* 조작 */}
          <div className="mt-6 flex items-center">
            <div className="flex items-center" role="group" aria-label="배너 선택">
              {banners.map((b, i) => (
                <button
                  key={b.key}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`${i + 1}번째 배너 보기`}
                  aria-current={i === index ? 'true' : undefined}
                  className="group w-8 h-10 flex items-center justify-center"
                >
                  <span className={`w-3 h-3 border-2 border-navy transition-colors ${i === index ? 'bg-navy' : 'group-hover:bg-navy/30'}`} />
                </button>
              ))}
            </div>
            <button type="button" onClick={() => go(index - 1)} aria-label="이전 배너" className={`ml-3 ${controlClass}`}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button type="button" onClick={() => go(index + 1)} aria-label="다음 배너" className={controlClass}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              aria-label={isPaused ? '자동 넘김 시작' : '자동 넘김 멈춤'}
              className={controlClass}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {isPaused ? <path d="M8 5.5v13l11-6.5-11-6.5z" /> : <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />}
              </svg>
            </button>
          </div>

          {/* 연락처: 배너가 넘어가도 항상 보인다 */}
          <div className="mt-6 pt-6 border-t border-navy/15 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="font-semibold text-navy">상담 전화</span>
            <a href={`tel:${PHONE}`} className="text-3xl font-extrabold text-navy hover:text-beige-deep transition-colors">
              {PHONE}
            </a>
            <span className="w-full flex flex-wrap gap-x-4 gap-y-0.5 text-sm text-ink-soft">
              <span>{BUSINESS_HOURS}</span>
              <span>팩스 {FAX}</span>
              <span>
                이메일{' '}
                <a href={`mailto:${EMAIL}`} className="underline underline-offset-2 hover:text-navy transition-colors">
                  {EMAIL}
                </a>
              </span>
            </span>
          </div>
        </div>

        {/* 그림: 모바일에서는 글 위에 온다 */}
        <div className="lg:col-span-6 order-first lg:order-none">
          <div className="relative aspect-[16/10] lg:aspect-[4/3] rounded-2xl overflow-hidden bg-navy/5" {...swipe}>
            {banners.map((b, i) => (
              <div
                key={b.key}
                aria-hidden={i !== index}
                className={`absolute inset-0 transition-opacity duration-500 ${i === index ? 'opacity-100' : 'opacity-0'}`}
              >
                {b.image ? (
                  <img
                    src={b.image.src}
                    alt={b.image.alt}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className={`w-full h-full flex items-end p-7 sm:p-10 ${b.panel?.tone}`}>
                    <p lang="en" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight whitespace-pre-line">
                      {b.panel?.text}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
