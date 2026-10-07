'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'

interface Product {
  id: string; name: string; nameKo: string; category: string; price: number; description: string; detail: string; features: string[]; image: string; inStock: boolean; createdAt: string
}

interface Review {
  id: string; productId: string; userId: string; userName: string; rating: number; comment: string; createdAt: string
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  const { user, isLoggedIn } = useAuth()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  const [reviews, setReviews] = useState<Review[]>([])
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState('')
  const [reviewSubmitting, setReviewSubmitting] = useState(false)
  const [reviewSuccess, setReviewSuccess] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const [prodRes, revRes] = await Promise.all([
          fetch('/api/products'),
          fetch(`/api/reviews?productId=${params.id}`),
        ])
        const products: Product[] = await prodRes.json()
        const found = products.find((p) => p.id === String(params.id))
        if (found) {
          setProduct(found)
          const revData = await revRes.json()
          setReviews(revData)
        } else { setError(true) }
      } catch { setError(true) } finally { setLoading(false) }
    }
    fetchData()
  }, [params.id])

  const handleAddToCart = () => {
    if (!product || !product.inStock) return
    addItem({ productId: product.id, nameKo: product.nameKo, name: product.name, price: product.price, image: product.image }, quantity)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleDirectApply = () => {
    if (!product || !product.inStock) return
    router.push(`/order?productId=${product.id}&quantity=${quantity}`)
  }

  const handleReviewSubmit = async () => {
    if (!user || !product || !reviewComment.trim()) return
    setReviewSubmitting(true)
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, userId: user.id, userName: user.name, rating: reviewRating, comment: reviewComment }),
      })
      if (res.ok) {
        const revRes = await fetch(`/api/reviews?productId=${product.id}`)
        setReviews(await revRes.json())
        setReviewComment('')
        setReviewRating(5)
        setReviewSuccess(true)
        setTimeout(() => setReviewSuccess(false), 3000)
      }
    } catch { /* ignore */ } finally { setReviewSubmitting(false) }
  }

  const avgRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0

  // Rating distribution calculation
  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
    return { star, count, percentage }
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-white rounded-xl skeleton-shimmer" />
            <div className="space-y-4">
              <div className="h-8 w-64 bg-navy/5 rounded skeleton-shimmer" />
              <div className="h-5 w-48 bg-navy/5 rounded skeleton-shimmer" />
              <div className="h-10 w-40 bg-navy/5 rounded skeleton-shimmer mt-6" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-navy/5 flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-navy/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-navy mb-2">제품을 찾을 수 없습니다</h2>
          <p className="text-ink-soft mb-8">요청하신 제품이 존재하지 않거나 삭제되었습니다.</p>
          <Link href="/products" className="btn-primary">제품 목록으로 돌아가기</Link>
        </div>
      </div>
    )
  }

  const categoryMap: Record<string, string> = { bath: '목욕·세정용품', hygiene: '배뇨·위생용품', disinfect: '소독·감염관리용품' }
  const categoryName = categoryMap[product.category] || product.category

  return (
    <>
      <section className="bg-white border-b border-navy/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 py-4 text-sm">
            <Link href="/" className="text-ink-mute hover:text-beige-deep transition-colors">홈</Link>
            <svg className="w-3.5 h-3.5 text-navy/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <Link href="/products" className="text-ink-mute hover:text-beige-deep transition-colors">제품소개</Link>
            <svg className="w-3.5 h-3.5 text-navy/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <span className="text-navy font-medium">{product.nameKo}</span>
          </nav>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <div className="relative">
                <div className="bg-white rounded-xl overflow-hidden aspect-square flex items-center justify-center shadow-line relative cursor-zoom-in">
                  {!product.inStock && <div className="absolute top-5 left-5 z-10 bg-navy/80 text-white text-sm font-bold px-4 py-1.5 rounded-full">품절</div>}
                  <div className="absolute top-5 right-5 z-10 bg-navy text-white text-xs font-medium px-3 py-1 rounded-full">{categoryName}</div>
                  {product.image ? (
                    <img src={product.image} alt={product.nameKo} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-12">
                      <div className="w-32 h-32 mx-auto rounded-xl bg-beige/10 flex items-center justify-center mb-4">
                        <svg className="w-16 h-16 text-beige-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                      </div>
                      <span className="text-sm text-ink-mute">제품 이미지</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="flex flex-col">
                <div className="mb-6">
                  <h1 className="text-3xl md:text-4xl font-bold text-navy tracking-tight mb-1">{product.nameKo}</h1>
                  <p className="text-beige-deep text-sm font-medium">{product.name}</p>
                  {reviews.length > 0 && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-0.5">
                        {[1,2,3,4,5].map((s) => (<svg key={s} className={`w-4 h-4 ${s <= Math.round(avgRating) ? 'text-beige-deep' : 'text-navy/20'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>))}
                      </div>
                      <span className="text-sm text-ink-mute">{avgRating.toFixed(1)} ({reviews.length}개 리뷰)</span>
                    </div>
                  )}
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-navy">{product.price.toLocaleString('ko-KR')}</span>
                    <span className="text-lg text-ink-soft font-medium">원</span>
                  </div>
                  {!product.inStock && <p className="mt-2 text-sm text-rose-700 font-medium flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />현재 품절된 상품입니다</p>}
                </div>

                <div className="mb-8"><p className="text-ink-soft text-[15px] leading-relaxed">{product.description}</p></div>

                {product.detail && (
                  <div className="mb-8 bg-aloe rounded-xl p-6">
                    <h3 className="text-sm font-bold text-navy mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-beige-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      상세 정보
                    </h3>
                    <p className="text-ink-soft text-sm leading-relaxed">{product.detail}</p>
                  </div>
                )}

                {product.features && product.features.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-sm font-bold text-navy mb-3">제품 특징</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((f, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-navy/15 rounded-full text-sm text-ink-soft font-medium"><span className="w-1.5 h-1.5 rounded-full bg-beige flex-shrink-0" />{f}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t border-navy/10 my-2" />

                <div className="mt-6 mb-6">
                  <label className="text-sm font-bold text-navy mb-3 block">수량</label>
                  <div className="inline-flex items-center bg-white border border-navy/15 rounded-xl overflow-hidden">
                    <button onClick={() => setQuantity((p) => Math.max(1, p - 1))} disabled={!product.inStock} className="w-9 h-9 rounded-lg bg-navy/5 hover:bg-navy/10 flex items-center justify-center text-ink-soft hover:text-navy transition-colors disabled:opacity-30 disabled:cursor-not-allowed m-1"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg></button>
                    <span className="w-14 h-11 flex items-center justify-center text-navy font-bold text-base tabular-nums">{quantity}</span>
                    <button onClick={() => setQuantity((p) => Math.min(99, p + 1))} disabled={!product.inStock} className="w-9 h-9 rounded-lg bg-navy/5 hover:bg-navy/10 flex items-center justify-center text-ink-soft hover:text-navy transition-colors disabled:opacity-30 disabled:cursor-not-allowed m-1"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg></button>
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-sm text-ink-mute">총 금액</span>
                    <span className="text-xl font-extrabold text-navy">{(product.price * quantity).toLocaleString('ko-KR')}</span>
                    <span className="text-sm text-ink-mute">원</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-2">
                  <button onClick={handleAddToCart} disabled={!product.inStock} className={`flex-1 relative px-8 py-4 rounded-full font-bold text-base transition-all duration-300 ${product.inStock ? 'bg-white border-2 border-navy text-navy hover:bg-navy hover:text-white' : 'bg-navy/10 text-ink-mute border-2 border-transparent cursor-not-allowed'}`}>
                    {addedToCart ? (<span className="flex items-center justify-center gap-2"><svg className="w-5 h-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>담았습니다!</span>) : '장바구니 담기'}
                  </button>
                  <button onClick={handleDirectApply} disabled={!product.inStock} className={`flex-1 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 ${product.inStock ? 'bg-navy text-white hover:bg-navy-light shadow-lg shadow-navy/20 hover:shadow-navy/30' : 'bg-navy/10 text-ink-mute cursor-not-allowed'}`}>
                    {product.inStock ? '바로 신청하기' : '품절'}
                  </button>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2.5 px-4 py-3 bg-white rounded-xl border border-navy/10">
                    <div className="w-8 h-8 rounded-full bg-beige/15 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-beige-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    </div>
                    <span className="text-xs text-ink-soft">유럽 CE 인증</span>
                  </div>
                  <div className="flex items-center gap-2.5 px-4 py-3 bg-white rounded-xl border border-navy/10">
                    <div className="w-8 h-8 rounded-full bg-beige/15 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-beige-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <span className="text-xs text-ink-soft">빠른 배송</span>
                  </div>
                  <div className="flex items-center gap-2.5 px-4 py-3 bg-white rounded-xl border border-navy/10">
                    <div className="w-8 h-8 rounded-full bg-beige/15 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-beige-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </div>
                    <span className="text-xs text-ink-soft">전화 상담 가능</span>
                  </div>
                  <div className="flex items-center gap-2.5 px-4 py-3 bg-white rounded-xl border border-navy/10">
                    <div className="w-8 h-8 rounded-full bg-beige/15 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-beige-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    </div>
                    <span className="text-xs text-ink-soft">진심 돌봄 서비스</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div>
            <div className="mt-20">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-navy flex items-center gap-3">고객 리뷰{reviews.length > 0 && <span className="text-sm font-normal text-ink-mute">({reviews.length}개)</span>}</h2>
                {reviews.length > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">{[1,2,3,4,5].map((s) => (<svg key={s} className={`w-5 h-5 ${s <= Math.round(avgRating) ? 'text-beige-deep' : 'text-navy/20'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>))}</div>
                    <span className="text-lg font-bold text-navy">{avgRating.toFixed(1)}</span>
                  </div>
                )}
              </div>

              {/* Rating Distribution Bar Chart */}
              {reviews.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
                  <h3 className="text-sm font-bold text-navy mb-4">평점 분포</h3>
                  <div className="space-y-2.5">
                    {ratingDistribution.map(({ star, count, percentage }) => (
                      <div key={star} className="flex items-center gap-3">
                        <div className="flex items-center gap-1 w-12 flex-shrink-0">
                          <span className="text-sm font-medium text-ink-soft">{star}</span>
                          <svg className="w-3.5 h-3.5 text-beige-deep" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        </div>
                        <div className="flex-1 h-3 bg-navy/5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-beige transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-ink-mute w-8 text-right flex-shrink-0">{count}개</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {isLoggedIn ? (
                <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
                  <h3 className="text-sm font-bold text-navy mb-4">리뷰 작성</h3>
                  <div className="mb-4">
                    <label className="text-sm text-ink-soft mb-2 block">별점</label>
                    <div className="flex gap-1">{[1,2,3,4,5].map((s) => (<button key={s} onClick={() => setReviewRating(s)} className="p-0.5"><svg className={`w-7 h-7 ${s <= reviewRating ? 'text-beige-deep' : 'text-navy/20'} hover:text-yellow-300 transition-colors`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg></button>))}</div>
                  </div>
                  <textarea value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} rows={3} placeholder="제품 사용 경험을 공유해 주세요." className="w-full px-4 py-3 rounded-xl border border-navy/15 bg-aloe text-navy placeholder:text-ink-mute focus:outline-none focus:ring-2 focus:ring-beige/50 focus:border-beige transition-all resize-none mb-3" />
                  <div className="flex items-center gap-3">
                    <button onClick={handleReviewSubmit} disabled={reviewSubmitting || !reviewComment.trim()} className="btn-primary text-sm px-5 py-2 disabled:opacity-50 disabled:cursor-not-allowed">{reviewSubmitting ? '등록 중...' : '리뷰 등록'}</button>
                    {reviewSuccess && <span className="text-sm text-green-600 font-medium">리뷰가 등록되었습니다!</span>}
                  </div>
                </div>
              ) : (
                <div className="bg-aloe rounded-xl p-6 mb-8 text-center border border-navy/10">
                  <p className="text-sm text-ink-mute mb-2">로그인 후 리뷰를 작성할 수 있습니다.</p>
                  <Link href="/login" className="text-sm text-beige-deep font-semibold hover:text-navy transition-colors">로그인하기</Link>
                </div>
              )}

              {reviews.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center shadow-sm">
                  <svg className="w-12 h-12 text-navy/30 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                  <p className="text-ink-mute text-sm">아직 리뷰가 없습니다. 첫 번째 리뷰를 작성해 주세요!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-white rounded-xl p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-beige/20 flex items-center justify-center text-xs font-bold text-beige-deep">{review.userName.charAt(0)}</div>
                          <div>
                            <p className="text-sm font-semibold text-navy">{review.userName}</p>
                            <div className="flex items-center gap-0.5">{[1,2,3,4,5].map((s) => (<svg key={s} className={`w-3.5 h-3.5 ${s <= review.rating ? 'text-beige-deep' : 'text-navy/20'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>))}</div>
                          </div>
                        </div>
                        <span className="text-xs text-ink-mute">{new Date(review.createdAt).toLocaleDateString('ko-KR')}</span>
                      </div>
                      <p className="text-sm text-ink-soft leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-ink-mute hover:text-beige-deep transition-colors group">
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              제품 목록으로 돌아가기
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
