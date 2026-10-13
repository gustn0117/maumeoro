import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import { PHONE, FAX, EMAIL, BUSINESS_HOURS, ADDRESS } from '@/lib/contact'

export const metadata: Metadata = {
  title: '상담예약 | 마음으로 MAUMEORO',
}

export default function CounselPage() {
  return (
    <>
      <PageHeader
        title="상담예약"
        description="제품에 대한 궁금한 점, 주문 관련 문의 등 편하게 연락주세요."
      />

      <section className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* 전화 상담 */}
          <div className="lg:col-span-7 on-dark bg-navy rounded-xl p-7 sm:p-10">
            <h2 className="text-white text-2xl font-bold">전화 상담</h2>
            <p className="mt-2 text-white/85">전화로 바로 상담받으실 수 있습니다.</p>
            <a
              href={`tel:${PHONE}`}
              className="mt-6 inline-block text-4xl sm:text-5xl font-extrabold text-white tracking-tight hover:text-beige-light transition-colors"
            >
              {PHONE}
            </a>
            <p className="mt-3 text-white/85">{BUSINESS_HOURS}</p>
            <a href={`tel:${PHONE}`} className="btn-accent mt-8 w-full sm:w-auto">
              전화하기
            </a>
          </div>

          {/* 그 밖의 연락 방법 */}
          <div className="lg:col-span-5">
            <dl className="rounded-xl shadow-line divide-y divide-navy/10">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-5 sm:px-6 py-4">
                <dt className="text-sm font-semibold text-ink-soft sm:w-24 flex-shrink-0">팩스</dt>
                <dd className="font-medium text-navy">{FAX}</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-5 sm:px-6 py-4">
                <dt className="text-sm font-semibold text-ink-soft sm:w-24 flex-shrink-0">이메일</dt>
                <dd>
                  <a href={`mailto:${EMAIL}`} className="font-medium text-navy underline-offset-4 hover:underline hover:text-beige-deep transition-colors">
                    {EMAIL}
                  </a>
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-5 sm:px-6 py-4">
                <dt className="text-sm font-semibold text-ink-soft sm:w-24 flex-shrink-0">방문 상담</dt>
                <dd className="font-medium text-navy">{ADDRESS}</dd>
              </div>
            </dl>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/inquiry" className="btn-outline">
                1:1 문의 남기기
              </Link>
              <Link href="/catalog" className="btn-outline">
                카탈로그 요청
              </Link>
            </div>
            <p className="mt-3 text-sm text-ink-soft">1:1 문의는 로그인 후 이용하실 수 있습니다.</p>
          </div>
        </div>
      </section>
    </>
  )
}
