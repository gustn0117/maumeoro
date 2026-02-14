'use client'

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/AdminLayout'

interface Review {
  id: string
  productId: string
  userName: string
  rating: number
  comment: string
  createdAt: string
}

interface Product {
  id: string
  nameKo: string
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [reviewsRes, productsRes] = await Promise.all([
        fetch('/api/reviews'),
        fetch('/api/products'),
      ])
      const reviewsData = await reviewsRes.json()
      const productsData = await productsRes.json()
      setReviews(reviewsData)
      setProducts(productsData)
    } catch (err) {
      console.error('Failed to fetch data:', err)
    } finally {
      setLoading(false)
    }
  }

  const getProductName = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    return product ? product.nameKo : '알 수 없는 제품'
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'text-yellow-400' : 'text-navy/10'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

  const truncateComment = (comment: string, maxLength: number = 40) => {
    if (comment.length <= maxLength) return comment
    return comment.slice(0, maxLength) + '...'
  }

  const handleDelete = async (id: string, showToast: (msg: string) => void) => {
    if (!window.confirm('정말 이 리뷰를 삭제하시겠습니까?')) return

    try {
      const res = await fetch(`/api/reviews?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        showToast('리뷰가 삭제되었습니다.')
        fetchData()
      }
    } catch (err) {
      console.error('Failed to delete review:', err)
    }
  }

  if (loading) {
    return (
      <AdminLayout currentPage="/admin/reviews" title="리뷰 관리">
        <div className="flex items-center justify-center py-32">
          <div className="flex flex-col items-center gap-3">
            <svg className="w-8 h-8 animate-spin text-beige" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="text-sm text-navy/40">데이터를 불러오는 중...</span>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout currentPage="/admin/reviews" title="리뷰 관리" subtitle={`총 ${reviews.length}건의 리뷰`}>
      {(showToast) => (
        <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(36,52,71,0.06)] overflow-hidden">
          {reviews.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <svg className="w-16 h-16 text-navy/10 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <p className="text-navy/30 text-lg font-semibold mb-2">리뷰가 없습니다</p>
              <p className="text-navy/20 text-sm">아직 등록된 리뷰가 없습니다.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-navy/40 uppercase tracking-wider border-b border-navy/5">
                    <th className="px-6 py-4 font-semibold">제품명</th>
                    <th className="px-6 py-4 font-semibold">작성자</th>
                    <th className="px-6 py-4 font-semibold">평점</th>
                    <th className="px-6 py-4 font-semibold">내용</th>
                    <th className="px-6 py-4 font-semibold">작성일</th>
                    <th className="px-6 py-4 font-semibold">액션</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy/5">
                  {reviews.map((review) => (
                    <tr key={review.id} className="hover:bg-navy/[0.01] transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-navy">
                        {getProductName(review.productId)}
                      </td>
                      <td className="px-6 py-4 text-sm text-navy/70">{review.userName}</td>
                      <td className="px-6 py-4">{renderStars(review.rating)}</td>
                      <td className="px-6 py-4 text-sm text-navy/50" title={review.comment}>
                        {truncateComment(review.comment)}
                      </td>
                      <td className="px-6 py-4 text-sm text-navy/40">
                        {new Date(review.createdAt).toLocaleDateString('ko-KR')}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete(review.id, showToast)}
                          className="p-2 rounded-lg hover:bg-red-50 text-navy/40 hover:text-red-500 transition-all"
                          title="삭제"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  )
}
