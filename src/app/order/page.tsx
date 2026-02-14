'use client'

import { useState, useEffect, FormEvent, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import ScrollReveal from '@/components/ScrollReveal'

interface Product {
  id: string
  name: string
  nameKo: string
  price: number
  image: string
}

function StepIndicator() {
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
            <div
              className={`step-indicator ${
                step.number < 2 ? 'completed' : step.number === 2 ? 'active' : 'pending'
              }`}
            >
              {step.number < 2 ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step.number
              )}
            </div>
            <span className={`text-xs mt-2 font-medium ${step.number === 2 ? 'text-navy' : step.number < 2 ? 'text-beige' : 'text-navy/30'}`}>
              {step.label}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <div className={`w-12 sm:w-20 h-0.5 mx-2 mb-5 ${idx < 1 ? 'bg-beige' : 'bg-navy/10'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

function OrderContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { items: cartItems, totalAmount: cartTotal, clearCart } = useCart()
  const { user, isLoggedIn } = useAuth()

  const directProductId = searchParams.get('productId')
  const directQuantity = Number(searchParams.get('quantity') || '1')

  const [directProduct, setDirectProduct] = useState<Product | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', company: '', address: '', message: '' })
  const [isDirect, setIsDirect] = useState(false)

  useEffect(() => {
    if (isLoggedIn && user) {
      setForm((prev) => ({
        ...prev,
        name: prev.name || user.name,
        phone: prev.phone || user.phone,
        email: prev.email || user.email,
      }))
    }
  }, [isLoggedIn, user])

  useEffect(() => {
    if (directProductId) {
      setIsDirect(true)
      fetch('/api/products')
        .then((res) => res.json())
        .then((products: Product[]) => {
          const found = products.find((p) => p.id === directProductId)
          if (found) setDirectProduct(found)
          else router.replace('/products')
        })
        .catch(() => router.replace('/products'))
    } else if (cartItems.length === 0) {
      router.replace('/cart')
    }
  }, [directProductId, cartItems.length, router])

  const orderItems = isDirect && directProduct
    ? [{ productId: directProduct.id, nameKo: directProduct.nameKo, price: directProduct.price, quantity: directQuantity, image: directProduct.image }]
    : cartItems.map((item) => ({ productId: item.productId, nameKo: item.nameKo, name: item.name, price: item.price, quantity: item.quantity, image: item.image }))

  const totalAmount = isDirect && directProduct
    ? directProduct.price * directQuantity
    : cartTotal

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: orderItems,
          customer: form,
          totalAmount,
          userId: user?.id || undefined,
        }),
      })
      if (!res.ok) throw new Error('신청 요청에 실패했습니다.')
      const data = await res.json()
      if (!isDirect) clearCart()
      router.push(`/order/complete?id=${data.orderId}`)
    } catch (err) {
      alert(err instanceof Error ? err.message : '오류가 발생했습니다.')
      setIsSubmitting(false)
    }
  }

  if (isDirect && !directProduct) return null
  if (!isDirect && cartItems.length === 0) return null

  return (
    <>
      <section className="page-hero py-16 sm:py-20">
        <div className="absolute inset-0 decorative-dots-light pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-beige/60 text-xs tracking-[0.3em] uppercase font-semibold mb-3">Order</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">신청하기</h1>
          <p className="text-white/40 text-sm max-w-md mx-auto">아래 정보를 입력해 주시면 담당자가 확인 후 연락드리겠습니다.</p>
        </div>
      </section>

      <section className="py-16 bg-warm-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Step Indicator */}
          <ScrollReveal direction="up">
            <StepIndicator />
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <ScrollReveal direction="up" delay={1}>
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-card">
                  <h2 className="text-xl font-bold text-navy mb-6 flex items-center gap-2">
                    <svg className="w-5 h-5 text-beige" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    신청자 정보
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="form-label">이름 <span className="text-red-400">*</span></label>
                        <input type="text" id="name" name="name" required value={form.name} onChange={handleChange} placeholder="홍길동" className="form-input" />
                      </div>
                      <div>
                        <label htmlFor="phone" className="form-label">연락처 <span className="text-red-400">*</span></label>
                        <input type="tel" id="phone" name="phone" required value={form.phone} onChange={handleChange} placeholder="010-0000-0000" className="form-input" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="email" className="form-label">이메일</label>
                        <input type="email" id="email" name="email" value={form.email} onChange={handleChange} placeholder="example@email.com" className="form-input" />
                      </div>
                      <div>
                        <label htmlFor="company" className="form-label">회사/기관명</label>
                        <input type="text" id="company" name="company" value={form.company} onChange={handleChange} placeholder="회사 또는 기관명" className="form-input" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="address" className="form-label">배송주소 <span className="text-red-400">*</span></label>
                      <input type="text" id="address" name="address" required value={form.address} onChange={handleChange} placeholder="배송받으실 주소를 입력하세요" className="form-input" />
                    </div>
                    <div>
                      <label htmlFor="message" className="form-label">요청사항</label>
                      <textarea id="message" name="message" rows={4} value={form.message} onChange={handleChange} placeholder="추가 요청사항이 있으시면 입력해 주세요" className="form-textarea" />
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                      <button type="submit" disabled={isSubmitting} className="w-full sm:w-auto btn-primary inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                        {isSubmitting ? (
                          <>
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            신청 처리 중...
                          </>
                        ) : (
                          <>
                            신청하기
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </>
                        )}
                      </button>
                      <Link href={isDirect ? '/products' : '/cart'} className="text-navy/40 hover:text-navy text-sm font-medium transition-colors">
                        {isDirect ? '제품 목록으로' : '장바구니로 돌아가기'}
                      </Link>
                    </div>
                  </form>
                </div>
              </ScrollReveal>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <ScrollReveal direction="right" delay={2}>
                <div className="bg-white rounded-2xl shadow-card sticky top-28 overflow-hidden">
                  {/* Gold accent line at top */}
                  <div className="h-1 bg-gradient-to-r from-beige to-beige-light" />
                  <div className="p-6 sm:p-8">
                    <h2 className="text-xl font-bold text-navy mb-6 flex items-center gap-2">
                      <svg className="w-5 h-5 text-beige" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      신청 요약
                    </h2>
                    <div className="space-y-4 mb-6">
                      {orderItems.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-navy truncate">{item.nameKo}</p>
                            <p className="text-xs text-navy/40">{item.price.toLocaleString('ko-KR')} x {item.quantity}</p>
                          </div>
                          <span className="text-sm font-semibold text-navy whitespace-nowrap">{(item.price * item.quantity).toLocaleString('ko-KR')}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-navy/10 pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-navy/50 font-medium">총 합계</span>
                        <span className="text-2xl font-bold text-navy">{totalAmount.toLocaleString('ko-KR')}</span>
                      </div>
                    </div>
                    <div className="mt-6 p-4 rounded-xl bg-warm-white border border-navy/5">
                      <div className="flex gap-3">
                        <svg className="w-5 h-5 text-beige flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-xs text-navy/50 leading-relaxed">신청 후 담당자가 확인하여 최종 견적과 결제 안내를 드립니다. 대량 구매 시 별도 할인이 적용될 수 있습니다.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default function OrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-warm-white flex items-center justify-center"><div className="w-8 h-8 border-2 border-beige/30 border-t-beige rounded-full animate-spin" /></div>}>
      <OrderContent />
    </Suspense>
  )
}
