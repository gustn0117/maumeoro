'use client'

import { useState } from 'react'
import PageHeader from '@/components/PageHeader'
import { PHONE, FAX, EMAIL } from '@/lib/contact'

export default function CatalogPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    type: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would send data to an API
    setSubmitted(true)
  }

  return (
    <>
      {/* Hero */}
      <PageHeader
        title="카탈로그 요청"
        description="마음으로의 전체 제품 카탈로그를 받아보세요. 아래 양식을 작성해 주시면 빠른 시간 내에 보내드리겠습니다."
      />

      {/* Form Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div>
                {submitted ? (
                  <div className="bg-white rounded-xl p-12 text-center shadow-line">
                    <div className="w-20 h-20 mx-auto rounded-full bg-green-50 flex items-center justify-center mb-6 animate-success-pulse">
                      <svg className="w-10 h-10 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-navy mb-3">요청이 완료되었습니다</h2>
                    <p className="text-ink-soft mb-6">
                      카탈로그 요청이 정상적으로 접수되었습니다.<br />
                      빠른 시간 내에 연락드리겠습니다.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setFormData({ name: '', company: '', phone: '', email: '', type: '', message: '' }) }}
                      className="btn-outline"
                    >
                      새로운 요청하기
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 md:p-10 shadow-line">
                    <h2 className="text-2xl font-bold text-navy mb-8">요청 양식</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="form-label">이름 *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="form-input"
                          placeholder="홍길동"
                        />
                      </div>
                      <div>
                        <label className="form-label">기관/회사명</label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="form-input"
                          placeholder="기관명 또는 회사명"
                        />
                      </div>
                      <div>
                        <label className="form-label">연락처 *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="form-input"
                          placeholder="010-0000-0000"
                        />
                      </div>
                      <div>
                        <label className="form-label">이메일</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="form-input"
                          placeholder="example@email.com"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="form-label">관심 분야 *</label>
                        <select
                          required
                          value={formData.type}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                          className="form-select"
                        >
                          <option value="">관심 분야를 선택해 주세요</option>
                          <option value="bath">목욕·세정용품</option>
                          <option value="hygiene">배뇨·위생용품</option>
                          <option value="disinfect">소독·감염관리용품</option>
                          <option value="material">식품·화장품 원료</option>
                          <option value="all">전체 카탈로그</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="form-label">문의사항</label>
                        <textarea
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="form-textarea"
                          placeholder="추가 문의사항이 있으시면 자유롭게 작성해 주세요."
                        />
                      </div>
                    </div>
                    <button type="submit" className="mt-8 w-full btn-primary text-lg py-4">
                      카탈로그 요청하기
                    </button>
                    <p className="mt-4 text-xs text-ink-mute text-center">
                      * 입력하신 정보는 카탈로그 발송 및 상담 목적으로만 사용됩니다.
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div>
                <div className="bg-white rounded-xl p-8 shadow-line">
                  <h3 className="text-lg font-bold text-navy mb-5">문의 안내</h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-beige/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-beige-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-navy">전화 문의</p>
                        <a href={`tel:${PHONE}`} className="text-beige-deep font-bold text-lg hover:underline">{PHONE}</a>
                        <p className="text-ink-soft text-sm">팩스 {FAX}</p>
                        <p className="text-ink-soft text-sm">
                          이메일{' '}
                          <a href={`mailto:${EMAIL}`} className="underline-offset-2 hover:underline hover:text-navy transition-colors">
                            {EMAIL}
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-beige/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-beige-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-navy">방문 상담</p>
                        <p className="text-ink-soft text-sm">서울특별시 관악구<br />장군봉54길 201호</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Process Steps */}
              <div>
                <div className="bg-white rounded-xl p-8 shadow-line">
                  <h3 className="text-lg font-bold text-navy mb-6">진행 절차</h3>
                  <div className="space-y-0">
                    {/* Step 1 */}
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-beige/15 flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-beige-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="w-px h-6 bg-navy/10" />
                      </div>
                      <div className="pb-4">
                        <div className="w-6 h-[2px] bg-beige/40 rounded-full mb-1.5" />
                        <p className="text-xs font-bold text-beige-deep mb-0.5">Step 1</p>
                        <p className="text-sm font-semibold text-navy">자료요청</p>
                        <p className="text-xs text-ink-mute mt-0.5">양식 작성 후 제출</p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-beige/15 flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-beige-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                          </svg>
                        </div>
                        <div className="w-px h-6 bg-navy/10" />
                      </div>
                      <div className="pb-4">
                        <div className="w-6 h-[2px] bg-beige/40 rounded-full mb-1.5" />
                        <p className="text-xs font-bold text-beige-deep mb-0.5">Step 2</p>
                        <p className="text-sm font-semibold text-navy">확인</p>
                        <p className="text-xs text-ink-mute mt-0.5">담당자 접수 및 확인</p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-beige/15 flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-beige-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <div className="w-6 h-[2px] bg-beige/40 rounded-full mb-1.5" />
                        <p className="text-xs font-bold text-beige-deep mb-0.5">Step 3</p>
                        <p className="text-sm font-semibold text-navy">발송</p>
                        <p className="text-xs text-ink-mute mt-0.5">카탈로그 발송 완료</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-navy rounded-xl p-8 text-white">
                  <h3 className="text-lg font-bold mb-3">빠른 상담</h3>
                  <p className="text-white/85 text-sm mb-5 leading-relaxed">
                    전화로 바로 상담받으실 수 있습니다. 제품에 대한 궁금한 점, 주문 관련 문의 등 편하게 연락주세요.
                  </p>
                  <a
                    href={`tel:${PHONE}`}
                    className="block text-center bg-beige text-navy px-6 py-3 rounded-full font-bold hover:bg-beige-light transition-colors"
                  >
                    전화하기
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
