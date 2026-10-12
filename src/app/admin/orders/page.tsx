'use client'

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/AdminLayout'

interface OrderItem {
  productId: string
  nameKo: string
  price: number
  quantity: number
  image: string
}

interface Order {
  id: string
  items: OrderItem[]
  customer: {
    name: string
    phone: string
    email: string
    company: string
    address: string
    message: string
    depositor?: string
  }
  status: 'pending' | 'confirmed' | 'processing' | 'completed' | 'cancelled'
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
  pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  confirmed: 'bg-blue-100 text-blue-700 border-blue-200',
  processing: 'bg-purple-100 text-purple-700 border-purple-200',
  completed: 'bg-green-100 text-green-700 border-green-200',
  cancelled: 'bg-red-100 text-red-700 border-red-200',
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders')
      const data = await res.json()
      setOrders(data)
    } catch (err) {
      console.error('Failed to fetch orders:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (orderId: string, newStatus: string, showToast: (msg: string) => void) => {
    try {
      const res = await fetch('/api/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId, status: newStatus }),
      })
      if (res.ok) {
        showToast(`신청 상태가 "${statusLabels[newStatus]}"(으)로 변경되었습니다.`)
        fetchOrders()
      }
    } catch (err) {
      console.error('Failed to update order:', err)
    }
  }

  const toggleExpand = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  if (loading) {
    return (
      <AdminLayout currentPage="/admin/orders" title="신청 관리">
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

  const pendingCount = orders.filter((o) => o.status === 'pending').length

  return (
    <AdminLayout currentPage="/admin/orders" title="신청 관리" subtitle={`총 ${orders.length}건의 신청`}>
      {(showToast) => (
        <>
          {pendingCount > 0 && (
            <div className="mb-6 flex items-center gap-3">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-50 border border-yellow-200 text-xs font-semibold text-yellow-700">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                대기 {pendingCount}건
              </span>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(36,52,71,0.06)] overflow-hidden">
            {orders.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <svg className="w-16 h-16 text-navy/10 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="text-navy/30 text-lg font-semibold mb-2">신청이 없습니다</p>
                <p className="text-navy/20 text-sm">아직 접수된 신청이 없습니다.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs text-navy/40 uppercase tracking-wider border-b border-navy/5">
                      <th className="px-6 py-4 font-semibold">신청번호</th>
                      <th className="px-6 py-4 font-semibold">신청자</th>
                      <th className="px-6 py-4 font-semibold">연락처</th>
                      <th className="px-6 py-4 font-semibold">상품수</th>
                      <th className="px-6 py-4 font-semibold">총액</th>
                      <th className="px-6 py-4 font-semibold">상태</th>
                      <th className="px-6 py-4 font-semibold">신청일</th>
                      <th className="px-6 py-4 font-semibold">액션</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy/5">
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td colSpan={8} className="p-0">
                          <div
                            className={`grid grid-cols-[auto_auto_auto_auto_auto_auto_auto_auto] items-center cursor-pointer hover:bg-navy/[0.01] transition-colors ${
                              expandedOrder === order.id ? 'bg-navy/[0.02]' : ''
                            }`}
                            onClick={() => toggleExpand(order.id)}
                          >
                            <span className="px-6 py-4 text-sm font-mono text-navy/70">{order.id}</span>
                            <span className="px-6 py-4 text-sm font-semibold text-navy">{order.customer.name}</span>
                            <span className="px-6 py-4 text-sm text-navy/50">{order.customer.phone}</span>
                            <span className="px-6 py-4 text-sm text-navy/60">{order.items.length}개</span>
                            <span className="px-6 py-4 text-sm font-semibold text-navy">
                              {order.totalAmount.toLocaleString()}원
                            </span>
                            <span className="px-6 py-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusColors[order.status]}`}>
                                {statusLabels[order.status]}
                              </span>
                            </span>
                            <span className="px-6 py-4 text-sm text-navy/40">
                              {new Date(order.createdAt).toLocaleDateString('ko-KR')}
                            </span>
                            <span className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                              <select
                                value={order.status}
                                onChange={(e) => handleStatusChange(order.id, e.target.value, showToast)}
                                className="px-3 py-1.5 rounded-lg border border-navy/10 text-xs text-navy bg-warm-white/50 focus:outline-none focus:ring-2 focus:ring-beige/40 cursor-pointer"
                              >
                                <option value="pending">접수</option>
                                <option value="confirmed">확인</option>
                                <option value="processing">처리중</option>
                                <option value="completed">완료</option>
                                <option value="cancelled">취소</option>
                              </select>
                            </span>
                          </div>

                          {expandedOrder === order.id && (
                            <div className="px-6 py-5 border-t border-dashed border-navy/10">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <h4 className="text-sm font-bold text-navy mb-3 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-beige" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    신청자 정보
                                  </h4>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex"><span className="w-16 text-navy/30 flex-shrink-0">이름</span><span className="text-navy">{order.customer.name}</span></div>
                                    <div className="flex"><span className="w-16 text-navy/30 flex-shrink-0">연락처</span><span className="text-navy">{order.customer.phone}</span></div>
                                    <div className="flex"><span className="w-16 text-navy/30 flex-shrink-0">이메일</span><span className="text-navy">{order.customer.email || '-'}</span></div>
                                    <div className="flex"><span className="w-16 text-navy/30 flex-shrink-0">기관</span><span className="text-navy">{order.customer.company || '-'}</span></div>
                                    <div className="flex"><span className="w-16 text-navy/30 flex-shrink-0">주소</span><span className="text-navy">{order.customer.address || '-'}</span></div>
                                    <div className="flex"><span className="w-16 text-navy/30 flex-shrink-0">입금자</span><span className="text-navy">{order.customer.depositor || '-'}</span></div>
                                    {order.customer.message && (
                                      <div className="flex"><span className="w-16 text-navy/30 flex-shrink-0">메모</span><span className="text-navy">{order.customer.message}</span></div>
                                    )}
                                  </div>
                                </div>

                                <div>
                                  <h4 className="text-sm font-bold text-navy mb-3 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-beige" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    신청 상품
                                  </h4>
                                  <div className="space-y-3">
                                    {order.items.map((item, idx) => (
                                      <div key={idx} className="flex items-center gap-3 bg-warm-white/50 rounded-xl p-3">
                                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-white flex-shrink-0">
                                          <img src={item.image} alt={item.nameKo} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = '/images/product-bath.jpg' }} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <p className="text-sm font-semibold text-navy truncate">{item.nameKo}</p>
                                          <p className="text-xs text-navy/40">{item.price.toLocaleString()}원 x {item.quantity}개</p>
                                        </div>
                                        <p className="text-sm font-bold text-navy flex-shrink-0">{(item.price * item.quantity).toLocaleString()}원</p>
                                      </div>
                                    ))}
                                    <div className="flex items-center justify-between pt-2 border-t border-navy/5">
                                      <span className="text-sm text-navy/40">합계</span>
                                      <span className="text-base font-bold text-navy">{order.totalAmount.toLocaleString()}원</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </AdminLayout>
  )
}
