import Link from 'next/link'

const quickLinks = [
  { href: '/about', label: '회사소개' },
  { href: '/products', label: '제품소개' },
  { href: '/catalog', label: '자료요청' },
  { href: '/news', label: '공지사항' },
  { href: '/faq', label: 'FAQ' },
  { href: '/inquiry', label: '1:1 문의' },
]

export default function Footer() {
  return (
    <footer>
      {/* CTA Band */}
      <div className="relative bg-gradient-to-r from-navy via-navy to-navy-light">
        <div className="absolute inset-0 decorative-dots-light pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h3 className="text-white text-lg font-bold">카탈로그가 필요하신가요?</h3>
            <p className="text-white/40 text-sm mt-1">제품 카탈로그를 무료로 받아보세요.</p>
          </div>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-beige text-white text-sm font-semibold hover:bg-beige-light transition-all duration-300 group"
          >
            카탈로그 요청
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-[#1a2938] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            {/* Company Info */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2.5 mb-5">
                <span className="text-xl font-extrabold">
                  마음으로
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-beige ml-0.5 mb-2" />
                </span>
                <span className="text-white/15 text-[10px] tracking-[0.2em] uppercase font-medium mt-0.5">maumeoro</span>
              </div>
              <p className="text-white/35 text-sm leading-[1.9] max-w-sm">
                <span className="text-beige/60 font-semibold">합리적이고 편리한</span> 노인돌봄 용품 전문점.<br />
                노인 및 장애인 돌봄 보호자를 위한<br />
                고품질 용품을 합리적인 가격으로 공급합니다.
              </p>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-3">
              <h3 className="text-white/20 font-semibold mb-5 text-[11px] tracking-[0.2em] uppercase">바로가기</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-white/45 hover:text-white/80 text-sm transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-4">
              <h3 className="text-white/20 font-semibold mb-5 text-[11px] tracking-[0.2em] uppercase">연락처</h3>
              <ul className="space-y-3 text-sm">
                <li className="text-white/35 leading-relaxed flex items-start gap-2">
                  <svg className="w-4 h-4 text-beige/40 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  서울특별시 관악구 장군봉54길 201호
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-beige/40 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:010-6667-2314" className="text-white/50 hover:text-beige transition-colors font-medium">
                    010-6667-2314
                  </a>
                </li>
                <li className="text-white/25 text-xs pt-1 flex items-center gap-2">
                  <svg className="w-4 h-4 text-beige/40 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  사업자등록번호 119-19-65629
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Gold Line */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-beige/20 to-transparent" />
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/15 text-xs">
            &copy; {new Date().getFullYear()} 마음으로(MAUMEORO). All rights reserved.
          </p>
          <p className="text-white/15 text-xs">
            업태: 도소매업 | 종목: 의료기기판매업 외
          </p>
        </div>
      </div>
    </footer>
  )
}
