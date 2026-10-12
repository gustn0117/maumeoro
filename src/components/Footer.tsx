import Link from 'next/link'
import { PHONE, FAX, EMAIL, BUSINESS_HOURS, ADDRESS } from '@/lib/contact'

const quickLinks = [
  { href: '/about', label: '회사소개' },
  { href: '/products', label: '제품소개' },
  { href: '/catalog', label: '자료요청' },
  { href: '/counsel', label: '상담예약' },
  { href: '/news', label: '공지사항' },
  { href: '/faq', label: 'FAQ' },
  { href: '/inquiry', label: '1:1 문의' },
]

export default function Footer() {
  return (
    <footer className="on-dark">
      {/* CTA Band */}
      <div className="bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h2 className="text-white text-2xl font-bold">카탈로그가 필요하신가요?</h2>
            <p className="text-white/85 mt-1">제품 카탈로그를 무료로 받아보시거나, 전화로 상담해 보세요.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/catalog" className="btn-accent">
              카탈로그 요청
            </Link>
            <a href={`tel:${PHONE}`} className="btn-ghost-light">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {PHONE}
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-navy-deep text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            {/* Company Info */}
            <div className="lg:col-span-5">
              <img
                src="/images/logo-maumeoro-on-dark.png"
                alt="마음으로 MAUMEORO"
                width={638}
                height={195}
                className="h-[46px] w-auto mb-5"
              />
              <p className="text-white/80 text-sm leading-7 max-w-sm">
                합리적이고 편리한 돌봄 용품 전문점.<br />
                노인 및 장애인 돌봄 보호자를 위한<br />
                고품질 용품을 합리적인 가격으로 공급합니다.
              </p>
            </div>

            {/* Quick Links */}
            <nav className="lg:col-span-3" aria-label="바로가기">
              <h2 className="text-white font-semibold mb-3 text-sm">바로가기</h2>
              <ul>
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="inline-flex items-center min-h-[36px] text-white/80 hover:text-white text-sm transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact Info */}
            <div className="lg:col-span-4">
              <h2 className="text-white font-semibold mb-3 text-sm">연락처</h2>
              <ul className="space-y-2 text-sm text-white/80">
                <li>
                  <a href={`tel:${PHONE}`} className="text-xl font-extrabold text-white hover:text-beige-light transition-colors">
                    {PHONE}
                  </a>
                </li>
                <li>팩스 {FAX}</li>
                <li>
                  이메일{' '}
                  <a href={`mailto:${EMAIL}`} className="underline underline-offset-2 hover:text-white transition-colors">
                    {EMAIL}
                  </a>
                </li>
                <li>{BUSINESS_HOURS}</li>
                <li>{ADDRESS}</li>
                <li>사업자등록번호 119-19-65629</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/70 text-xs">
            <p>&copy; {new Date().getFullYear()} 마음으로(MAUMEORO). All rights reserved.</p>
            <p>업태: 도소매업 | 종목: 의료기기판매업 외</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
