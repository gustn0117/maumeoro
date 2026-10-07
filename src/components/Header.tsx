'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'

const navItems = [
  { href: '/about', label: '회사소개' },
  { href: '/products', label: '제품소개' },
  { href: '/news', label: '공지사항' },
  { href: '/faq', label: 'FAQ' },
  { href: '/catalog', label: '자료요청' },
]

const PHONE = '010-6667-2314'

function CartIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
    </svg>
  )
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { totalItems } = useCart()
  const { user, isLoggedIn, logout } = useAuth()
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const cartLabel = totalItems > 0 ? `장바구니, ${totalItems}개 담김` : '장바구니'
  const cartBadge = totalItems > 0 && (
    <span className="absolute top-0.5 right-0.5 min-w-[20px] h-5 px-1 bg-rose-600 text-white text-[11px] leading-5 font-bold rounded-full text-center">
      {totalItems > 99 ? '99+' : totalItems}
    </span>
  )

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${
      scrolled ? 'shadow-[0_1px_0_rgba(36,52,71,0.12)]' : 'shadow-[0_1px_0_rgba(36,52,71,0.06)]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[70px]">
          {/* Logo */}
          <Link href="/" className="flex items-center min-h-[44px]" aria-label="마음으로 홈">
            <span className="text-2xl font-extrabold text-navy tracking-tight">
              마음으로
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-beige ml-0.5 mb-2.5" />
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center h-full" aria-label="주 메뉴">
            {navItems.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative flex items-center h-full px-3.5 lg:px-5 font-semibold transition-colors duration-200 ${
                    active ? 'text-navy' : 'text-ink-soft hover:text-navy'
                  }`}
                >
                  {item.label}
                  {active && <span className="absolute bottom-0 left-3.5 right-3.5 lg:left-5 lg:right-5 h-[3px] bg-beige" />}
                </Link>
              )
            })}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-1">
            <a
              href={`tel:${PHONE}`}
              className="hidden lg:flex items-center gap-2 min-h-[44px] px-3 font-bold text-navy hover:text-beige-deep transition-colors"
            >
              <svg className="w-5 h-5 text-beige-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {PHONE}
            </a>
            <Link
              href="/cart"
              aria-label={cartLabel}
              className="relative w-11 h-11 flex items-center justify-center rounded-full text-navy hover:bg-navy/5 transition-colors"
            >
              <CartIcon />
              {cartBadge}
            </Link>
            {isLoggedIn ? (
              <>
                <Link href="/mypage" className="flex items-center min-h-[44px] px-2 text-sm font-semibold text-navy hover:text-beige-deep transition-colors">
                  {user?.name}님
                </Link>
                <button onClick={logout} className="min-h-[44px] px-2 text-sm text-ink-soft hover:text-red-700 transition-colors">
                  로그아웃
                </button>
              </>
            ) : (
              <Link href="/login" className="flex items-center min-h-[44px] px-2 text-sm font-semibold text-navy hover:text-beige-deep transition-colors">
                로그인
              </Link>
            )}
          </div>

          {/* Mobile right */}
          <div className="md:hidden flex items-center gap-1">
            <Link
              href="/cart"
              aria-label={cartLabel}
              className="relative w-11 h-11 flex items-center justify-center rounded-full text-navy"
            >
              <CartIcon />
              {cartBadge}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-navy/5 transition-colors"
              aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="w-6 flex flex-col gap-[6px]">
                <span className={`h-[2px] bg-navy rounded-full transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
                <span className={`h-[2px] bg-navy rounded-full transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`h-[2px] bg-navy rounded-full transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav id="mobile-menu" className="md:hidden border-t border-navy/10 bg-white" aria-label="주 메뉴">
          <div className="max-w-7xl mx-auto px-4 py-3">
            {navItems.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={active ? 'page' : undefined}
                  className={`flex items-center min-h-[52px] px-4 rounded-lg text-lg font-semibold transition-colors ${
                    active ? 'bg-aloe text-navy' : 'text-navy hover:bg-aloe'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            <div className="border-t border-navy/10 mt-2 pt-2">
              {isLoggedIn ? (
                <>
                  <Link href="/mypage" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between min-h-[52px] px-4 rounded-lg text-lg font-semibold text-navy hover:bg-aloe transition-colors">
                    마이페이지
                    <span className="text-sm font-medium text-ink-soft">{user?.name}님</span>
                  </Link>
                  <Link href="/inquiry" onClick={() => setIsMenuOpen(false)} className="flex items-center min-h-[52px] px-4 rounded-lg text-lg font-semibold text-navy hover:bg-aloe transition-colors">
                    1:1 문의
                  </Link>
                  <button onClick={() => { logout(); setIsMenuOpen(false) }} className="w-full flex items-center min-h-[52px] px-4 rounded-lg text-lg font-semibold text-ink-soft hover:text-red-700 hover:bg-red-50 transition-colors">
                    로그아웃
                  </button>
                </>
              ) : (
                <Link href="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center min-h-[52px] px-4 rounded-lg text-lg font-semibold text-navy hover:bg-aloe transition-colors">
                  로그인
                </Link>
              )}
              <a href={`tel:${PHONE}`} className="mt-2 flex items-center justify-between min-h-[56px] px-4 rounded-lg bg-navy text-white">
                <span className="text-sm text-white/85">상담 전화</span>
                <span className="text-xl font-extrabold">{PHONE}</span>
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
