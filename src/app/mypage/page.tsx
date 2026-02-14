'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import ScrollReveal from '@/components/ScrollReveal'

interface OrderItem { productId: string; nameKo: string; price: number; quantity: number }
interface Order { id: string; userId?: string; items: OrderItem[]; status: string; totalAmount: number; createdAt: string }
interface Review { id: string; productId: string; userId: string; userName: string; rating: number; comment: string; createdAt: string }
interface Inquiry { id: string; userId: string; title: string; content: string; category: string; reply?: string; repliedAt?: string; status: string; createdAt: string }

const statusLabels: Record<string, string> = { pending: '접수', confirmed: '확인', processing: '처리중', completed: '완료', cancelled: '취소' }
const statusColors: Record<string, string> = { pending: 'bg-yellow-100 text-yellow-700', confirmed: 'bg-blue-100 text-blue-700', processing: 'bg-purple-100 text-purple-700', completed: 'bg-green-100 text-green-700', cancelled: 'bg-red-100 text-red-700' }
const statusBorderColors: Record<string, string> = { pending: 'border-yellow-400', confirmed: 'border-blue-400', processing: 'border-purple-400', completed: 'border-green-500', cancelled: 'border-red-400' }

export default function MyPage() {
  const router = useRouter()
  const { user, isLoading, isLoggedIn } = useAuth()
  const [activeTab, setActiveTab] = useState<'orders' | 'reviews' | 'inquiries'>('orders')
  const [orders, setOrders] = useState<Order[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoading && !isLoggedIn) { router.push('/login'); return }
    if (user) fetchData()
  }, [isLoading, isLoggedIn, user, router])

  const fetchData = async () => {
    try {
      const [ordersRes, reviewsRes, inquiriesRes] = await Promise.all([
        fetch('/api/orders'), fetch(`/api/reviews?userId=${user!.id}`), fetch(`/api/inquiries?userId=${user!.id}`),
      ])
      const [ordersData, reviewsData, inquiriesData] = await Promise.all([ordersRes.json(), reviewsRes.json(), inquiriesRes.json()])
      setOrders(ordersData.filter((o: Order) => o.userId === user!.id))
      setReviews(reviewsData)
      setInquiries(inquiriesData)
    } catch (err) { console.error('Failed to fetch data:', err) } finally { setLoading(false) }
  }

  if (isLoading || !isLoggedIn) return <div className="min-h-screen bg-warm-white flex items-center justify-center"><div className="w-8 h-8 border-2 border-beige/30 border-t-beige rounded-full animate-spin" /></div>

  const tabs = [
    { key: 'orders' as const, label: '신청 내역', count: orders.length },
    { key: 'reviews' as const, label: '내 리뷰', count: reviews.length },
    { key: 'inquiries' as const, label: '문의 내역', count: inquiries.length },
  ]

  const userInitial = user?.name ? user.name.charAt(0) : '?'

  return (
    <>
      <section className="page-hero py-16 sm:py-20">
        <div className="absolute inset-0 decorative-dots-light pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-beige/60 text-xs tracking-[0.3em] uppercase font-semibold mb-3">My Page</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">마이페이지</h1>
          <p className="text-white/40 text-sm max-w-md mx-auto">{user?.name}님, 환영합니다.</p>
        </div>
      </section>

      <section className="py-16 bg-warm-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* User Info */}
          <ScrollReveal direction="up">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-card mb-8">
              <div className="flex items-start gap-5">
                {/* Avatar */}
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-beige to-beige-light flex items-center justify-center">
                  <span className="text-xl font-bold text-navy">{userInitial}</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
                    회원 정보
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex gap-3"><span className="text-navy/40 w-16 flex-shrink-0">이름</span><span className="text-navy font-medium">{user?.name}</span></div>
                    <div className="flex gap-3"><span className="text-navy/40 w-16 flex-shrink-0">이메일</span><span className="text-navy font-medium">{user?.email}</span></div>
                    <div className="flex gap-3"><span className="text-navy/40 w-16 flex-shrink-0">연락처</span><span className="text-navy font-medium">{user?.phone}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Tabs - pill style */}
          <ScrollReveal direction="up" delay={1}>
            <div className="flex gap-2 mb-6 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.key
                      ? 'bg-navy text-white shadow-md scale-[1.02]'
                      : 'bg-navy/5 text-navy/50 hover:bg-navy/10 hover:text-navy/70 hover:shadow-sm'
                  }`}
                >
                  {tab.label}
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    activeTab === tab.key
                      ? 'bg-white/20 text-white'
                      : 'bg-navy/5 text-navy/30'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </ScrollReveal>

          {loading ? (
            <div className="flex items-center justify-center py-16"><div className="w-8 h-8 border-2 border-beige/30 border-t-beige rounded-full animate-spin" /></div>
          ) : (
            <>
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  {orders.length === 0 ? (
                    <ScrollReveal direction="up">
                      <div className="bg-white rounded-2xl p-12 text-center shadow-soft">
                        <svg className="w-16 h-16 text-navy/8 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                        <p className="text-navy/30 text-sm">신청 내역이 없습니다.</p>
                        <Link href="/products" className="inline-block mt-4 text-sm text-beige font-semibold hover:text-navy transition-colors">제품 둘러보기</Link>
                      </div>
                    </ScrollReveal>
                  ) : orders.map((order, index) => (
                    <ScrollReveal key={order.id} direction="up" delay={Math.min(index, 4)}>
                      <div className={`bg-white rounded-2xl p-6 shadow-soft border-l-4 ${statusBorderColors[order.status] || 'border-gray-300'}`}>
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-sm text-navy/50">{order.id}</span>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColors[order.status] || 'bg-gray-100 text-gray-700'}`}>{statusLabels[order.status] || order.status}</span>
                          </div>
                          <span className="text-xs text-navy/30">{new Date(order.createdAt).toLocaleDateString('ko-KR')}</span>
                        </div>
                        <div className="space-y-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-sm">
                              <span className="text-navy/70">{item.nameKo} x {item.quantity}</span>
                              <span className="font-medium text-navy">{(item.price * item.quantity).toLocaleString()}원</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-navy/5 flex items-center justify-between">
                          <span className="text-sm text-navy/40">합계</span>
                          <span className="text-lg font-bold text-navy">{order.totalAmount.toLocaleString()}원</span>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  {reviews.length === 0 ? (
                    <ScrollReveal direction="up">
                      <div className="bg-white rounded-2xl p-12 text-center shadow-soft">
                        <svg className="w-16 h-16 text-navy/8 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                        <p className="text-navy/30 text-sm">작성한 리뷰가 없습니다.</p>
                      </div>
                    </ScrollReveal>
                  ) : reviews.map((review, index) => (
                    <ScrollReveal key={review.id} direction="up" delay={Math.min(index, 4)}>
                      <div className="bg-white rounded-2xl p-6 shadow-soft border-l-4 border-beige">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1">
                            {[1,2,3,4,5].map((s) => (<svg key={s} className={`w-4 h-4 ${s <= review.rating ? 'text-yellow-400' : 'text-navy/10'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>))}
                          </div>
                          <span className="text-xs text-navy/30">{new Date(review.createdAt).toLocaleDateString('ko-KR')}</span>
                        </div>
                        <p className="text-sm text-navy/70">{review.comment}</p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              )}

              {activeTab === 'inquiries' && (
                <div className="space-y-4">
                  <div className="flex justify-end mb-2">
                    <Link href="/inquiry" className="btn-primary text-sm px-4 py-2">문의 작성</Link>
                  </div>
                  {inquiries.length === 0 ? (
                    <ScrollReveal direction="up">
                      <div className="bg-white rounded-2xl p-12 text-center shadow-soft">
                        <svg className="w-16 h-16 text-navy/8 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                        <p className="text-navy/30 text-sm">문의 내역이 없습니다.</p>
                      </div>
                    </ScrollReveal>
                  ) : inquiries.map((inq, index) => (
                    <ScrollReveal key={inq.id} direction="up" delay={Math.min(index, 4)}>
                      <div className={`bg-white rounded-2xl p-6 shadow-soft border-l-4 ${inq.status === 'replied' ? 'border-green-500' : 'border-yellow-400'}`}>
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <h3 className="font-semibold text-navy">{inq.title}</h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${inq.status === 'replied' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{inq.status === 'replied' ? '답변완료' : '대기중'}</span>
                        </div>
                        <p className="text-sm text-navy/60 mb-2">{inq.content}</p>
                        <p className="text-xs text-navy/30">{new Date(inq.createdAt).toLocaleDateString('ko-KR')}</p>
                        {inq.reply && (
                          <div className="mt-4 p-4 bg-beige/10 rounded-xl border-l-4 border-beige">
                            <div className="flex items-center gap-2 mb-1">
                              <svg className="w-4 h-4 text-beige" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                              </svg>
                              <p className="text-xs font-semibold text-beige">관리자 답변</p>
                            </div>
                            <p className="text-sm text-navy/70">{inq.reply}</p>
                            {inq.repliedAt && <p className="text-xs text-navy/30 mt-2">{new Date(inq.repliedAt).toLocaleDateString('ko-KR')}</p>}
                          </div>
                        )}
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
