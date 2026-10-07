'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import PageHeader from '@/components/PageHeader'

interface Inquiry {
  id: string
  userId: string
  userName: string
  title: string
  content: string
  category: string
  status: string
  reply?: string
  repliedAt?: string
  createdAt: string
}

const categoryLabels: Record<string, string> = {
  product: '제품문의',
  order: '주문문의',
  delivery: '배송문의',
  etc: '기타',
}

export default function InquiryPage() {
  const router = useRouter()
  const { user, isLoading, isLoggedIn } = useAuth()

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('product')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [listLoading, setListLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push('/login')
      return
    }
    if (user) {
      fetchInquiries()
    }
  }, [isLoading, isLoggedIn, user, router])

  const fetchInquiries = async () => {
    try {
      const res = await fetch(`/api/inquiries?userId=${user!.id}`)
      const data = await res.json()
      setInquiries(data)
    } catch (err) {
      console.error('Failed to fetch inquiries:', err)
    } finally {
      setListLoading(false)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitError('')
    setSubmitSuccess(false)
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user!.id,
          userName: user!.name,
          title,
          content,
          category,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || '문의 등록에 실패했습니다.')
      }

      setTitle('')
      setCategory('product')
      setContent('')
      setSubmitSuccess(true)
      fetchInquiries()
      setTimeout(() => setSubmitSuccess(false), 3000)
    } catch (err: any) {
      setSubmitError(err.message || '문의 등록 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading || !isLoggedIn) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-beige/30 border-t-beige rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <>
      {/* Hero */}
      <PageHeader
        title="1:1 문의"
        description="궁금하신 점이 있으시면 편하게 문의해 주세요."
      />

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Inquiry Form */}
          <div>
            <div className="bg-white rounded-xl shadow-line overflow-hidden mb-12">
              {/* Gold accent line */}
              <div className="h-1 bg-beige" />
              <div className="p-6 sm:p-8">
                <h2 className="text-lg font-bold text-navy mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-beige-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  문의 작성
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {submitError && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600 flex items-center gap-2">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {submitError}
                    </div>
                  )}

                  {submitSuccess && (
                    <div className="p-4 rounded-xl bg-green-50 border border-green-100 text-sm text-green-600 flex items-center gap-2">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      문의가 성공적으로 등록되었습니다.
                    </div>
                  )}

                  <div>
                    <label htmlFor="title" className="form-label">제목</label>
                    <input
                      type="text"
                      id="title"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="문의 제목을 입력하세요"
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="form-label">카테고리</label>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="form-select"
                    >
                      {Object.entries(categoryLabels).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="content" className="form-label">문의 내용</label>
                    <textarea
                      id="content"
                      required
                      rows={6}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="문의하실 내용을 자세히 입력해 주세요"
                      className="form-textarea"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        등록 중...
                      </>
                    ) : '문의 등록'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* My Inquiry List */}
          <div>
            <div>
              <h2 className="text-lg font-bold text-navy mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-beige-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                내 문의 내역
              </h2>

              {listLoading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="w-8 h-8 border-2 border-beige/30 border-t-beige rounded-full animate-spin" />
                </div>
              ) : inquiries.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center shadow-line">
                  <svg className="w-12 h-12 text-navy/30 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <p className="text-ink-mute text-sm">문의 내역이 없습니다.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inq, index) => (
                    <div key={inq.id}>
                      <div
                        className={`bg-white rounded-xl shadow-line overflow-hidden hover:shadow-raised transition-all border-l-4 ${
                          inq.status === 'replied' ? 'border-green-500' : 'border-yellow-400'
                        }`}
                      >
                        <button
                          onClick={() => setExpandedId(expandedId === inq.id ? null : inq.id)}
                          className="w-full px-6 py-5 text-left"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-navy/5 text-ink-mute">
                                {categoryLabels[inq.category] || inq.category}
                              </span>
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                  inq.status === 'replied'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-yellow-100 text-yellow-700'
                                }`}
                              >
                                {inq.status === 'replied' ? '답변완료' : '대기중'}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-ink-mute tabular-nums">
                                {new Date(inq.createdAt).toLocaleDateString('ko-KR')}
                              </span>
                              <svg
                                className={`w-4 h-4 text-ink-mute flex-shrink-0 transition-transform duration-300 ${
                                  expandedId === inq.id ? 'rotate-180' : ''
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                          <h3 className="text-[15px] font-semibold text-navy">{inq.title}</h3>
                        </button>

                        <div
                          className={`grid transition-all duration-300 ease-in-out ${
                            expandedId === inq.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="px-6 pb-6 pt-0">
                              <div className="border-t border-navy/10 pt-4">
                                <p className="text-sm text-ink-soft leading-relaxed whitespace-pre-line">
                                  {inq.content}
                                </p>
                                {inq.reply && (
                                  <div className="mt-4 p-4 bg-beige/10 rounded-xl border-l-4 border-beige">
                                    <div className="flex items-center gap-2 mb-2">
                                      <svg className="w-4 h-4 text-beige-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                      </svg>
                                      <p className="text-xs font-semibold text-beige-deep">관리자 답변</p>
                                    </div>
                                    <p className="text-sm text-ink-soft whitespace-pre-line">{inq.reply}</p>
                                    {inq.repliedAt && (
                                      <p className="text-xs text-ink-mute mt-2">
                                        {new Date(inq.repliedAt).toLocaleDateString('ko-KR')}
                                      </p>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
