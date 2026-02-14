'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'
import ScrollReveal from '@/components/ScrollReveal'

function StepIndicatorComplete() {
  const steps = [
    { number: 1, label: '장바구니' },
    { number: 2, label: '정보입력' },
    { number: 3, label: '완료' },
  ]

  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {steps.map((step, idx) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className="step-indicator completed">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-xs mt-2 font-medium text-beige">
              {step.label}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <div className="w-12 sm:w-20 h-0.5 mx-2 mb-5 bg-beige" />
          )}
        </div>
      ))}
    </div>
  )
}

function OrderCompleteContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('id')

  return (
    <>
      {/* Hero */}
      <section className="page-hero py-16 sm:py-20">
        <div className="absolute inset-0 decorative-dots-light pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-beige/60 text-xs tracking-[0.3em] uppercase font-semibold mb-3">Order Complete</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">신청 완료</h1>
          <p className="text-white/40 text-sm max-w-md mx-auto">주문이 성공적으로 접수되었습니다.</p>
        </div>
      </section>

      {/* Complete State */}
      <section className="py-24 bg-warm-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Step Indicator */}
          <ScrollReveal direction="up">
            <StepIndicatorComplete />
          </ScrollReveal>

          <ScrollReveal direction="scale" delay={1}>
            <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-card">

              {/* Success Icon with animation */}
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center animate-success-pulse">
                  <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path className="animate-check-draw" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {/* Particle circles */}
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-beige/40 animate-float" />
                <span className="absolute top-1/2 -left-3 w-2 h-2 rounded-full bg-green-300/50 animate-float" style={{ animationDelay: '0.5s' }} />
                <span className="absolute -bottom-1 right-3 w-3 h-3 rounded-full bg-beige/30 animate-float" style={{ animationDelay: '1s' }} />
                <span className="absolute top-0 left-1/4 w-1.5 h-1.5 rounded-full bg-green-200/60 animate-float" style={{ animationDelay: '1.5s' }} />
              </div>

              {/* Message */}
              <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-3">
                신청이 완료되었습니다!
              </h2>

              {orderId && (
                <div className="inline-flex items-center gap-2 bg-warm-white px-5 py-2.5 rounded-full mb-4">
                  <span className="text-navy/40 text-sm">주문번호</span>
                  <span className="font-mono font-semibold text-navy text-sm">{orderId}</span>
                </div>
              )}

              <p className="text-navy/50 text-lg mb-2">
                담당자가 확인 후 연락드리겠습니다.
              </p>
              <p className="text-navy/35 text-sm mb-10 max-w-md mx-auto">
                신청 내역을 확인하신 후 영업일 기준 1~2일 이내에 연락드리겠습니다. 문의사항이 있으시면 언제든 연락해 주세요.
              </p>

              {/* Info Items with Icons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-warm-white">
                  <div className="w-10 h-10 rounded-full bg-beige/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-beige" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-xs text-navy/50 text-center">1~2 영업일 내<br />확인 연락</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-warm-white">
                  <div className="w-10 h-10 rounded-full bg-beige/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-beige" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="text-xs text-navy/50 text-center">최종 견적<br />안내</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-warm-white">
                  <div className="w-10 h-10 rounded-full bg-beige/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-beige" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="text-xs text-navy/50 text-center">언제든<br />문의 가능</span>
                </div>
              </div>

              {/* Divider */}
              <div className="w-16 h-0.5 bg-gradient-to-r from-beige/20 via-beige/40 to-beige/20 mx-auto mb-10" />

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  홈으로
                </Link>
                <Link
                  href="/products"
                  className="btn-outline inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  제품 더 보기
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}

export default function OrderCompletePage() {
  return (
    <Suspense
      fallback={
        <div className="pt-32 pb-24 bg-warm-white min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-beige/30 border-t-beige rounded-full animate-spin" />
        </div>
      }
    >
      <OrderCompleteContent />
    </Suspense>
  )
}
