'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'

const navItems = [
  { href: '/about', label: '회사소개', sub: 'company' },
  { href: '/products', label: '제품소개', sub: 'products' },
  { href: '/news', label: '공지사항', sub: 'notice' },
  { href: '/faq', label: 'FAQ', sub: 'faq' },
  { href: '/catalog', label: '자료요청', sub: 'catalog' },
]

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

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/95 backdrop-blur-lg shadow-[0_1px_20px_rgba(36,52,71,0.06)]'
        : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[70px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="text-xl font-extrabold text-navy tracking-tight">
              마음으로
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-beige ml-0.5 mb-2 group-hover:scale-125 transition-transform" />
            </span>
            <span className="text-[10px] text-navy/25 font-medium tracking-[0.2em] uppercase mt-0.5 hidden sm:block">
              maumeoro
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center">
            {navItems.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-center px-5 lg:px-7 py-5 group rounded-lg transition-colors duration-200 ${
                    active ? '' : 'hover:bg-navy/[0.03]'
                  }`}
                >
                  <span className={`text-[14px] font-semibold transition-colors duration-200 ${
                    active ? 'text-navy' : 'text-navy/70 group-hover:text-navy'
                  }`}>
                    {item.label}
                  </span>
                  <span className={`block text-[10px] mt-px tracking-wider font-medium transition-colors duration-200 ${
                    active ? 'text-beige/60' : 'text-navy/20'
                  }`}>
                    {item.sub}
                  </span>
                  <span className={`absolute bottom-3 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-beige to-beige-light rounded-full transition-all duration-300 ${
                    active ? 'w-6' : 'w-0 group-hover:w-6'
                  }`} />
                </Link>
              )
            })}
            <div className="ml-3 pl-3 border-l border-navy/5 flex items-center gap-2">
              {/* Cart */}
              <Link
                href="/cart"
                className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-navy/5 transition-colors"
              >
                <svg className="w-5 h-5 text-navy/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scale-in">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Link>
              {/* Auth */}
              {isLoggedIn ? (
                <>
                  <Link href="/mypage" className="text-xs font-semibold text-navy/50 hover:text-beige transition-colors px-2 py-1.5">
                    {user?.name}님
                  </Link>
                  <button onClick={logout} className="text-xs text-navy/30 hover:text-red-400 transition-colors px-1 py-1.5">
                    로그아웃
                  </button>
                </>
              ) : (
                <Link href="/login" className="text-xs font-semibold text-navy/50 hover:text-beige transition-colors px-2 py-1.5">
                  로그인
                </Link>
              )}
            </div>
          </nav>

          {/* Mobile right */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              href="/cart"
              className="relative w-10 h-10 flex items-center justify-center rounded-full"
            >
              <svg className="w-5 h-5 text-navy/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-navy/5 transition-colors"
              aria-label="메뉴"
            >
              <div className="w-5 flex flex-col gap-[5px]">
                <span className={`h-[1.5px] bg-navy rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
                <span className={`h-[1.5px] bg-navy rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-0' : ''}`} />
                <span className={`h-[1.5px] bg-navy rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${
        isMenuOpen ? 'max-h-[500px] border-t border-navy/5' : 'max-h-0'
      }`}>
        <nav className="max-w-7xl mx-auto px-4 py-3 space-y-0.5">
          {navItems.map((item, idx) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-medium transition-all ${
                  active
                    ? 'bg-beige/10 text-navy'
                    : 'text-navy/70 hover:text-navy hover:bg-warm-white'
                } ${isMenuOpen ? 'mobile-menu-item' : ''}`}
                style={{ animationDelay: isMenuOpen ? `${idx * 50}ms` : '0ms' }}
              >
                <span className="text-[15px]">{item.label}</span>
                <span className={`text-[10px] tracking-wider ${active ? 'text-beige' : 'text-navy/20'}`}>{item.sub}</span>
              </Link>
            )
          })}
          <div className="border-t border-navy/5 mt-2 pt-2">
            {isLoggedIn ? (
              <>
                <Link href="/mypage" onClick={() => setIsMenuOpen(false)} className={`flex items-center justify-between px-4 py-3.5 text-navy/70 hover:text-navy hover:bg-warm-white rounded-xl font-medium transition-all ${isMenuOpen ? 'mobile-menu-item' : ''}`} style={{ animationDelay: isMenuOpen ? `${navItems.length * 50}ms` : '0ms' }}>
                  <span className="text-[15px]">마이페이지</span>
                  <span className="text-[10px] text-navy/20 tracking-wider">{user?.name}님</span>
                </Link>
                <Link href="/inquiry" onClick={() => setIsMenuOpen(false)} className={`flex items-center justify-between px-4 py-3.5 text-navy/70 hover:text-navy hover:bg-warm-white rounded-xl font-medium transition-all ${isMenuOpen ? 'mobile-menu-item' : ''}`} style={{ animationDelay: isMenuOpen ? `${(navItems.length + 1) * 50}ms` : '0ms' }}>
                  <span className="text-[15px]">1:1 문의</span>
                  <span className="text-[10px] text-navy/20 tracking-wider">inquiry</span>
                </Link>
                <button onClick={() => { logout(); setIsMenuOpen(false) }} className={`w-full flex items-center justify-between px-4 py-3.5 text-navy/40 hover:text-red-400 hover:bg-red-50/50 rounded-xl font-medium transition-all ${isMenuOpen ? 'mobile-menu-item' : ''}`} style={{ animationDelay: isMenuOpen ? `${(navItems.length + 2) * 50}ms` : '0ms' }}>
                  <span className="text-[15px]">로그아웃</span>
                </button>
              </>
            ) : (
              <Link href="/login" onClick={() => setIsMenuOpen(false)} className={`flex items-center justify-between px-4 py-3.5 text-navy/70 hover:text-navy hover:bg-warm-white rounded-xl font-medium transition-all ${isMenuOpen ? 'mobile-menu-item' : ''}`} style={{ animationDelay: isMenuOpen ? `${navItems.length * 50}ms` : '0ms' }}>
                <span className="text-[15px]">로그인</span>
                <span className="text-[10px] text-navy/20 tracking-wider">login</span>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
