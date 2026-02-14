'use client'

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/AdminLayout'

interface Inquiry {
  id: string
  title: string
  category: 'product' | 'order' | 'delivery' | 'etc'
  userName: string
  content: string
  reply?: string
  status: 'waiting' | 'replied'
  createdAt: string
}

const categoryLabels: Record<string, string> = {
  product: '제품',
  order: '주문',
  delivery: '배송',
  etc: '기타',
}

const categoryColors: Record<string, string> = {
  product: 'bg-blue-100 text-blue-700',
  order: 'bg-purple-100 text-purple-700',
  delivery: 'bg-navy/5 text-navy/60',
  etc: 'bg-gray-100 text-gray-600',
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/inquiries')
      const data = await res.json()
      setInquiries(data)
    } catch (err) {
      console.error('Failed to fetch inquiries:', err)
    } finally {
      setLoading(false)
    }
  }

  const waitingCount = inquiries.filter((i) => i.status === 'waiting').length

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const handleReplyChange = (id: string, text: string) => {
    setReplyTexts((prev) => ({ ...prev, [id]: text }))
  }

  const handleReplySubmit = async (id: string, showToast: (msg: string) => void) => {
    const replyText = replyTexts[id]?.trim()
    if (!replyText) return

    setSubmitting(true)
    try {
      const res = await fetch('/api/inquiries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, reply: replyText }),
      })
      if (res.ok) {
        showToast('답변이 등록되었습니다.')
        setReplyTexts((prev) => ({ ...prev, [id]: '' }))
        fetchInquiries()
      }
    } catch (err) {
      console.error('Failed to submit reply:', err)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout currentPage="/admin/inquiries" title="문의 관리">
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
    <AdminLayout currentPage="/admin/inquiries" title="문의 관리" subtitle={`총 ${inquiries.length}건의 문의`}>
      {(showToast) => (
        <>
          {/* Waiting Badge */}
          {waitingCount > 0 && (
            <div className="mb-6 flex items-center">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-50 border border-yellow-200 text-xs font-semibold text-yellow-700">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                미답변 {waitingCount}건
              </span>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(36,52,71,0.06)] overflow-hidden">
            {inquiries.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <svg className="w-16 h-16 text-navy/10 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <p className="text-navy/30 text-lg font-semibold mb-2">문의가 없습니다</p>
                <p className="text-navy/20 text-sm">아직 등록된 문의가 없습니다.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs text-navy/40 uppercase tracking-wider border-b border-navy/5">
                      <th className="px-6 py-4 font-semibold">제목</th>
                      <th className="px-6 py-4 font-semibold">카테고리</th>
                      <th className="px-6 py-4 font-semibold">작성자</th>
                      <th className="px-6 py-4 font-semibold">상태</th>
                      <th className="px-6 py-4 font-semibold">작성일</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy/5">
                    {inquiries.map((inquiry) => (
                      <>
                        <tr
                          key={inquiry.id}
                          className={`hover:bg-navy/[0.01] transition-colors cursor-pointer ${
                            expandedId === inquiry.id ? 'bg-navy/[0.02]' : ''
                          }`}
                          onClick={() => toggleExpand(inquiry.id)}
                        >
                          <td className="px-6 py-4 text-sm font-semibold text-navy">
                            <div className="flex items-center gap-2">
                              <svg
                                className={`w-4 h-4 text-navy/30 transition-transform ${
                                  expandedId === inquiry.id ? 'rotate-90' : ''
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                              {inquiry.title}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[inquiry.category] || 'bg-gray-100 text-gray-600'}`}>
                              {categoryLabels[inquiry.category] || inquiry.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-navy/70">{inquiry.userName}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                inquiry.status === 'waiting'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-green-100 text-green-700'
                              }`}
                            >
                              {inquiry.status === 'waiting' ? '대기중' : '답변완료'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-navy/40">
                            {new Date(inquiry.createdAt).toLocaleDateString('ko-KR')}
                          </td>
                        </tr>

                        {/* Expanded Row */}
                        {expandedId === inquiry.id && (
                          <tr key={`${inquiry.id}-detail`}>
                            <td colSpan={5} className="px-6 py-0">
                              <div className="py-5 border-t border-dashed border-navy/10 space-y-4">
                                {/* Full Content */}
                                <div>
                                  <h4 className="text-xs font-bold text-navy/40 uppercase tracking-wider mb-2">문의 내용</h4>
                                  <div className="bg-warm-white/50 rounded-xl p-4 text-sm text-navy/70 leading-relaxed whitespace-pre-wrap">
                                    {inquiry.content}
                                  </div>
                                </div>

                                {/* Existing Reply */}
                                {inquiry.reply && (
                                  <div>
                                    <h4 className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">답변</h4>
                                    <div className="bg-green-50 rounded-xl p-4 text-sm text-green-800 leading-relaxed whitespace-pre-wrap">
                                      {inquiry.reply}
                                    </div>
                                  </div>
                                )}

                                {/* Reply Form */}
                                <div>
                                  <h4 className="text-xs font-bold text-navy/40 uppercase tracking-wider mb-2">
                                    {inquiry.reply ? '답변 수정' : '답변 작성'}
                                  </h4>
                                  <textarea
                                    value={replyTexts[inquiry.id] || ''}
                                    onChange={(e) => handleReplyChange(inquiry.id, e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border border-navy/10 text-navy bg-warm-white/50 placeholder:text-navy/25 focus:outline-none focus:ring-2 focus:ring-beige/40 focus:border-beige transition-all text-sm resize-none"
                                    placeholder="답변을 입력하세요..."
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                  <div className="flex justify-end mt-2">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleReplySubmit(inquiry.id, showToast)
                                      }}
                                      disabled={submitting || !replyTexts[inquiry.id]?.trim()}
                                      className="px-5 py-2 rounded-xl bg-navy text-white text-sm font-semibold hover:bg-navy-light disabled:opacity-50 transition-all flex items-center gap-2"
                                    >
                                      {submitting ? (
                                        <>
                                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                          </svg>
                                          전송 중...
                                        </>
                                      ) : (
                                        <>
                                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                          </svg>
                                          답변 등록
                                        </>
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
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
