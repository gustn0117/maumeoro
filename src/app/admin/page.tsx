'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import AdminLayout from '@/components/AdminLayout'

interface Order {
  id: string
  items: { productId: string; nameKo: string; price: number; quantity: number; image: string }[]
  customer: { name: string; phone: string; email: string; company: string; address: string; message: string }
  status: string
  totalAmount: number
  createdAt: string
}

const statusLabels: Record<string, string> = {
  pending: '접수',
  confirmed: '확인',
  processing: '처리중',
  completed: '완료',
  cancelled: '취소',
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<any[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [news, setNews] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [reviews, setReviews] = useState<any[]>([])
  const [inquiries, setInquiries] = useState<any[]>([])
  const [faq, setFaq] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, orderRes, newsRes, userRes, reviewRes, inqRes, faqRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/orders'),
          fetch('/api/news'),
          fetch('/api/users'),
          fetch('/api/reviews'),
          fetch('/api/inquiries'),
          fetch('/api/faq?all=true'),
        ])
        const [prodData, orderData, newsData, userData, reviewData, inqData, faqData] = await Promise.all([
          prodRes.json(),
          orderRes.json(),
          newsRes.json(),
          userRes.json(),
          reviewRes.json(),
          inqRes.json(),
          faqRes.json(),
        ])
        setProducts(prodData)
        setOrders(orderData)
        setNews(newsData)
        setUsers(userData)
        setReviews(reviewData)
        setInquiries(inqData)
        setFaq(faqData)
      } catch (err) {
        console.error('Failed to fetch data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const pendingCount = orders.filter((o) => o.status === 'pending').length
  const unansweredCount = inquiries.filter((i: any) => i.status !== 'replied').length
  const recentOrders = orders.slice(0, 5)

  if (loading) {
    return (
      <AdminLayout currentPage="/admin" title="대시보드">
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
    <AdminLayout currentPage="/admin" title="대시보드" subtitle="마음으로 관리자 현황">
      {/* Stats Cards - Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Link href="/admin/products" className="group">
          <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(36,52,71,0.06)] p-6 hover:shadow-[0_4px_24px_rgba(36,52,71,0.1)] transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <svg className="w-5 h-5 text-navy/20 group-hover:text-navy/40 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <p className="text-sm text-navy/40 mb-1">총 제품수</p>
            <p className="text-3xl font-bold text-navy">{products.length}</p>
          </div>
        </Link>

        <Link href="/admin/orders" className="group">
          <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(36,52,71,0.06)] p-6 hover:shadow-[0_4px_24px_rgba(36,52,71,0.1)] transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <svg className="w-5 h-5 text-navy/20 group-hover:text-navy/40 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <p className="text-sm text-navy/40 mb-1">총 신청수</p>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-navy">{orders.length}</p>
              {pendingCount > 0 && (
                <span className="text-xs font-semibold text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded-full mb-1">
                  대기 {pendingCount}건
                </span>
              )}
            </div>
          </div>
        </Link>

        <Link href="/admin/users" className="group">
          <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(36,52,71,0.06)] p-6 hover:shadow-[0_4px_24px_rgba(36,52,71,0.1)] transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <svg className="w-5 h-5 text-navy/20 group-hover:text-navy/40 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <p className="text-sm text-navy/40 mb-1">총 회원수</p>
            <p className="text-3xl font-bold text-navy">{users.length}</p>
          </div>
        </Link>

        <Link href="/admin/inquiries" className="group">
          <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(36,52,71,0.06)] p-6 hover:shadow-[0_4px_24px_rgba(36,52,71,0.1)] transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <svg className="w-5 h-5 text-navy/20 group-hover:text-navy/40 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <p className="text-sm text-navy/40 mb-1">미답변 문의</p>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-navy">{unansweredCount}</p>
              <span className="text-xs text-navy/30 mb-1">/ {inquiries.length}건</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Stats Cards - Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link href="/admin/news" className="group">
          <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(36,52,71,0.06)] p-6 hover:shadow-[0_4px_24px_rgba(36,52,71,0.1)] transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <svg className="w-5 h-5 text-navy/20 group-hover:text-navy/40 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <p className="text-sm text-navy/40 mb-1">총 소식 수</p>
            <p className="text-3xl font-bold text-navy">{news.length}</p>
          </div>
        </Link>

        <Link href="/admin/reviews" className="group">
          <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(36,52,71,0.06)] p-6 hover:shadow-[0_4px_24px_rgba(36,52,71,0.1)] transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <svg className="w-5 h-5 text-navy/20 group-hover:text-navy/40 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <p className="text-sm text-navy/40 mb-1">총 리뷰 수</p>
            <p className="text-3xl font-bold text-navy">{reviews.length}</p>
          </div>
        </Link>

        <Link href="/admin/faq" className="group">
          <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(36,52,71,0.06)] p-6 hover:shadow-[0_4px_24px_rgba(36,52,71,0.1)] transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <svg className="w-5 h-5 text-navy/20 group-hover:text-navy/40 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <p className="text-sm text-navy/40 mb-1">FAQ 항목</p>
            <p className="text-3xl font-bold text-navy">{faq.length}</p>
          </div>
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(36,52,71,0.06)] overflow-hidden">
        <div className="px-6 py-5 border-b border-navy/5 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-navy">최근 신청</h3>
            <p className="text-xs text-navy/30 mt-0.5">최근 5건의 신청 내역</p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-semibold text-beige hover:text-navy transition-colors flex items-center gap-1"
          >
            전체보기
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <svg className="w-12 h-12 text-navy/10 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-sm text-navy/30">아직 신청이 없습니다.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-navy/40 uppercase tracking-wider">
                  <th className="px-6 py-3 font-semibold">신청번호</th>
                  <th className="px-6 py-3 font-semibold">신청자</th>
                  <th className="px-6 py-3 font-semibold">상품수</th>
                  <th className="px-6 py-3 font-semibold">총액</th>
                  <th className="px-6 py-3 font-semibold">상태</th>
                  <th className="px-6 py-3 font-semibold">신청일</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/5">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-navy/[0.01] transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-navy/70">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-navy">{order.customer.name}</td>
                    <td className="px-6 py-4 text-sm text-navy/60">{order.items.length}개</td>
                    <td className="px-6 py-4 text-sm font-semibold text-navy">
                      {order.totalAmount.toLocaleString()}원
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColors[order.status] || 'bg-navy/5 text-navy/40'}`}>
                        {statusLabels[order.status] || order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-navy/40">
                      {new Date(order.createdAt).toLocaleDateString('ko-KR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
