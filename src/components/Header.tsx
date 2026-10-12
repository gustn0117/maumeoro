'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { PHONE, FAX } from '@/lib/contact'

const navItems = [
  { href: '/about', label: '회사소개', sub: 'company' },
  { href: '/products', label: '제품소개', sub: 'products' },
  { href: '/catalog', label: '자료요청', sub: 'catalog' },
  { href: '/counsel', label: '상담예약', sub: 'counsel' },
]

// '고객지원' 아래에 묶이는 페이지
const supportItems = [
  { href: '/news', label: '공지사항' },
  { href: '/faq', label: 'FAQ' },
  { href: '/inquiry', label: '1:1 문의' },
]

const navItemClass = 'relative flex flex-col items-center justify-center h-full px-2.5 lg:px-4 xl:px-5 transition-colors duration-200'

function CartIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
    </svg>
  )
}

function NavLabel({ label, sub, active }: { label: string; sub: string; active: boolean }) {
  return (
    <>
      <span className={`font-semibold leading-tight ${active ? 'text-navy' : 'text-ink-soft group-hover:text-navy'}`}>{label}</span>
      <span className="text-[12px] leading-tight text-ink-mute">{sub}</span>
      {active && <span className="absolute bottom-0 left-2.5 right-2.5 lg:left-4 lg:right-4 xl:left-5 xl:right-5 h-[3px] bg-beige" />}
    </>
  )
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSupportOpen, setIsSupportOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { totalItems } = useCart()
  const { user, isLoggedIn, logout } = useAuth()
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 페이지를 옮기면 열려 있던 메뉴를 닫는다
  useEffect(() => {
    setIsMenuOpen(false)
    setIsSupportOpen(false)
  }, [pathname])

  const isActive = (href: string) => pathname.startsWith(href)
  const closeMenu = () => setIsMenuOpen(false)
  const supportActive = supportItems.some((item) => isActive(item.href))

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
            <img
              src="/images/logo-maumeoro.png"
              alt=""
              width={638}
              height={195}
              className="h-10 lg:h-[46px] w-auto"
            />
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
                  className={`group ${navItemClass}`}
                >
                  <NavLabel label={item.label} sub={item.sub} active={active} />
                </Link>
              )
            })}

            {/* 고객지원: 공지사항 · FAQ · 1:1 문의 */}
            <div
              className="relative h-full"
              onMouseEnter={() => setIsSupportOpen(true)}
              onMouseLeave={() => setIsSupportOpen(false)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) setIsSupportOpen(false)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setIsSupportOpen(false)
              }}
            >
              <button
                type="button"
                onClick={() => setIsSupportOpen(true)}
                aria-expanded={isSupportOpen}
                aria-controls="support-menu"
                className={`group ${navItemClass}`}
              >
                <NavLabel label="고객지원" sub="support" active={supportActive} />
              </button>
              {isSupportOpen && (
                <ul
                  id="support-menu"
                  className="absolute top-full left-1/2 -translate-x-1/2 min-w-[160px] py-2 bg-white rounded-b-lg shadow-raised"
                >
                  {supportItems.map((item) => {
                    const active = isActive(item.href)
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={active ? 'page' : undefined}
                          className={`flex items-center min-h-[44px] px-5 font-semibold whitespace-nowrap transition-colors ${
                            active ? 'text-navy bg-aloe' : 'text-ink-soft hover:text-navy hover:bg-aloe'
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-1">
            {/* 두 줄의 이름표와 번호가 같은 위치에서 시작하도록 2열 격자로 맞춘다 */}
            <dl className="hidden lg:grid grid-cols-[auto_auto] items-baseline gap-x-2 px-3 leading-tight tabular-nums">
              <dt className="text-sm font-semibold text-ink-soft">전화</dt>
              <dd>
                <a href={`tel:${PHONE}`} className="font-bold text-navy hover:text-beige-deep transition-colors">
                  {PHONE}
                </a>
              </dd>
              <dt className="text-sm font-semibold text-ink-soft">팩스</dt>
              <dd className="font-medium text-ink-soft">{FAX}</dd>
            </dl>
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
        <nav id="mobile-menu" className="md:hidden border-t border-navy/10 bg-white max-h-[calc(100vh-70px)] overflow-y-auto" aria-label="주 메뉴">
          <div className="max-w-7xl mx-auto px-4 py-3">
            {navItems.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  aria-current={active ? 'page' : undefined}
                  className={`flex items-center justify-between min-h-[52px] px-4 rounded-lg text-lg font-semibold transition-colors ${
                    active ? 'bg-aloe text-navy' : 'text-navy hover:bg-aloe'
                  }`}
                >
                  {item.label}
                  <span className="text-sm font-medium text-ink-mute">{item.sub}</span>
                </Link>
              )
            })}

            <p className="flex items-center justify-between min-h-[52px] px-4 text-lg font-semibold text-navy">
              고객지원
              <span className="text-sm font-medium text-ink-mute">support</span>
            </p>
            {supportItems.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  aria-current={active ? 'page' : undefined}
                  className={`flex items-center min-h-[48px] ml-4 px-4 rounded-lg font-semibold transition-colors ${
                    active ? 'bg-aloe text-navy' : 'text-ink-soft hover:bg-aloe hover:text-navy'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}

            <div className="border-t border-navy/10 mt-2 pt-2">
              {isLoggedIn ? (
                <>
                  <Link href="/mypage" onClick={closeMenu} className="flex items-center justify-between min-h-[52px] px-4 rounded-lg text-lg font-semibold text-navy hover:bg-aloe transition-colors">
                    마이페이지
                    <span className="text-sm font-medium text-ink-soft">{user?.name}님</span>
                  </Link>
                  <button onClick={() => { logout(); closeMenu() }} className="w-full flex items-center min-h-[52px] px-4 rounded-lg text-lg font-semibold text-ink-soft hover:text-red-700 hover:bg-red-50 transition-colors">
                    로그아웃
                  </button>
                </>
              ) : (
                <Link href="/login" onClick={closeMenu} className="flex items-center min-h-[52px] px-4 rounded-lg text-lg font-semibold text-navy hover:bg-aloe transition-colors">
                  로그인
                </Link>
              )}
              <a href={`tel:${PHONE}`} className="mt-2 flex items-center justify-between min-h-[56px] px-4 rounded-lg bg-navy text-white">
                <span className="text-sm text-white/85">전화</span>
                <span className="text-xl font-extrabold">{PHONE}</span>
              </a>
              <p className="flex items-center justify-between min-h-[44px] px-4 text-ink-soft">
                <span className="text-sm">팩스</span>
                <span className="font-semibold">{FAX}</span>
              </p>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
