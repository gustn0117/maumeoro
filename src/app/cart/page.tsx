'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import ScrollReveal from '@/components/ScrollReveal'

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalAmount } = useCart()

  if (items.length === 0) {
    return (
      <>
        {/* Hero */}
        <section className="page-hero py-16 sm:py-20">
          <div className="absolute inset-0 decorative-dots-light pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block text-beige/60 text-xs tracking-[0.3em] uppercase font-semibold mb-3">Shopping Cart</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">장바구니</h1>
            <p className="text-white/40 text-sm max-w-md mx-auto">담아둔 제품을 확인해 보세요.</p>
          </div>
        </section>

        {/* Empty State */}
        <section className="py-24 bg-warm-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollReveal direction="scale">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-navy/[0.03] flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-beige/60 animate-bounce-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-navy mb-3">장바구니가 비어있습니다</h2>
              <p className="text-navy/50 mb-8 max-w-md mx-auto">
                아직 장바구니에 담긴 제품이 없습니다. 마음으로의 다양한 제품을 둘러보세요.
              </p>
              <Link href="/products" className="btn-primary inline-block">
                제품 둘러보기
              </Link>
            </ScrollReveal>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="page-hero py-16 sm:py-20">
        <div className="absolute inset-0 decorative-dots-light pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-beige/60 text-xs tracking-[0.3em] uppercase font-semibold mb-3">Shopping Cart</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">장바구니</h1>
          <p className="text-white/40 text-sm max-w-md mx-auto">선택하신 제품을 확인하고 신청해 주세요.</p>
        </div>
      </section>

      {/* Cart Items */}
      <section className="py-16 bg-warm-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Desktop Table Header */}
          <ScrollReveal direction="up">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b-2 border-navy/10 text-sm font-medium text-navy/50 uppercase tracking-wider">
              <div className="col-span-5">제품</div>
              <div className="col-span-2 text-center">단가</div>
              <div className="col-span-2 text-center">수량</div>
              <div className="col-span-2 text-center">소계</div>
              <div className="col-span-1" />
            </div>
          </ScrollReveal>

          {/* Cart Items List */}
          <div className="divide-y divide-navy/5">
            {items.map((item, index) => (
              <ScrollReveal key={item.productId} direction="up" delay={Math.min(index, 3) as 0 | 1 | 2 | 3}>
                <div className="py-6 md:grid md:grid-cols-12 md:gap-4 md:items-center">

                  {/* Product Info */}
                  <div className="col-span-5 flex items-center gap-4 mb-4 md:mb-0">
                    <div className="w-20 h-20 rounded-xl shadow-soft bg-warm-gray flex-shrink-0 overflow-hidden flex items-center justify-center">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.nameKo}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      ) : (
                        <svg className="w-8 h-8 text-beige/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy text-sm md:text-base">{item.nameKo}</h3>
                      <p className="text-navy/40 text-xs mt-0.5">{item.name}</p>
                    </div>
                  </div>

                  {/* Unit Price */}
                  <div className="col-span-2 text-center hidden md:block">
                    <span className="text-navy/70 text-sm">
                      {item.price.toLocaleString('ko-KR')}
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="col-span-2 flex items-center justify-center mb-4 md:mb-0">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="w-9 h-9 flex items-center justify-center text-navy/50 hover:text-navy bg-navy/5 hover:bg-navy/10 rounded-lg transition-all"
                        aria-label="수량 줄이기"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="w-10 h-9 flex items-center justify-center text-sm font-medium text-navy">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center text-navy/50 hover:text-navy bg-navy/5 hover:bg-navy/10 rounded-lg transition-all"
                        aria-label="수량 늘리기"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="col-span-2 text-center hidden md:block">
                    <span className="font-semibold text-navy">
                      {(item.price * item.quantity).toLocaleString('ko-KR')}
                    </span>
                  </div>

                  {/* Mobile Price Row */}
                  <div className="flex items-center justify-between md:hidden mb-4">
                    <span className="text-navy/50 text-sm">
                      {item.price.toLocaleString('ko-KR')} x {item.quantity}
                    </span>
                    <span className="font-semibold text-navy">
                      {(item.price * item.quantity).toLocaleString('ko-KR')}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <div className="col-span-1 flex justify-end">
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-navy/30 hover:text-red-500 hover:bg-red-50 transition-all"
                      aria-label="제품 삭제"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Total & Actions */}
          <ScrollReveal direction="up" delay={2}>
            <div className="mt-8 rounded-2xl bg-warm-white shadow-soft overflow-hidden">
              {/* Beige top accent line */}
              <div className="h-1 bg-gradient-to-r from-beige to-beige-light" />
              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <Link
                    href="/products"
                    className="text-navy/50 hover:text-navy text-sm font-medium transition-colors flex items-center gap-2 order-2 sm:order-1"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    계속 쇼핑하기
                  </Link>

                  <div className="flex flex-col sm:flex-row items-center gap-6 order-1 sm:order-2">
                    <div className="text-right">
                      <p className="text-navy/50 text-sm mb-1">총 합계</p>
                      <p className="text-3xl font-bold text-navy">
                        <span className="text-lg font-normal text-navy/50 mr-1"></span>
                        {totalAmount.toLocaleString('ko-KR')}
                      </p>
                    </div>
                    <Link
                      href="/order"
                      className="btn-primary inline-flex items-center gap-2 whitespace-nowrap"
                    >
                      신청하기
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>
    </>
  )
}
