'use client'

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/AdminLayout'

interface FaqItem {
  id: string
  question: string
  answer: string
  category: 'product' | 'order' | 'delivery' | 'general'
  order: number
  published: boolean
  createdAt: string
}

const categoryLabels: Record<string, string> = {
  product: '제품',
  order: '주문',
  delivery: '배송',
  general: '일반',
}

const categoryColors: Record<string, string> = {
  product: 'bg-blue-100 text-blue-700',
  order: 'bg-purple-100 text-purple-700',
  delivery: 'bg-navy/5 text-navy/60',
  general: 'bg-gray-100 text-gray-600',
}

const emptyForm = {
  question: '',
  answer: '',
  category: 'general' as 'product' | 'order' | 'delivery' | 'general',
  order: 0,
  published: true,
}

export default function AdminFaqPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<FaqItem | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchFaqs()
  }, [])

  const fetchFaqs = async () => {
    try {
      const res = await fetch('/api/faq?all=true')
      const data = await res.json()
      setFaqs(data)
    } catch (err) {
      console.error('Failed to fetch FAQ:', err)
    } finally {
      setLoading(false)
    }
  }

  const openAddModal = () => {
    setEditingItem(null)
    setForm(emptyForm)
    setShowModal(true)
  }

  const openEditModal = (item: FaqItem) => {
    setEditingItem(item)
    setForm({
      question: item.question,
      answer: item.answer,
      category: item.category,
      order: item.order,
      published: item.published,
    })
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingItem(null)
    setForm(emptyForm)
  }

  const handleSubmit = async (e: React.FormEvent, showToast: (msg: string) => void) => {
    e.preventDefault()
    setSaving(true)

    const payload = {
      ...form,
      order: Number(form.order),
    }

    try {
      if (editingItem) {
        const res = await fetch('/api/faq', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingItem.id, ...payload }),
        })
        if (res.ok) {
          showToast('FAQ가 수정되었습니다.')
          closeModal()
          fetchFaqs()
        }
      } else {
        const res = await fetch('/api/faq', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (res.ok) {
          showToast('FAQ가 추가되었습니다.')
          closeModal()
          fetchFaqs()
        }
      }
    } catch (err) {
      console.error('Failed to save FAQ:', err)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string, showToast: (msg: string) => void) => {
    if (!window.confirm('정말 이 FAQ를 삭제하시겠습니까?')) return

    try {
      const res = await fetch(`/api/faq?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        showToast('FAQ가 삭제되었습니다.')
        fetchFaqs()
      }
    } catch (err) {
      console.error('Failed to delete FAQ:', err)
    }
  }

  const handleTogglePublished = async (item: FaqItem, showToast: (msg: string) => void) => {
    try {
      const res = await fetch('/api/faq', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, published: !item.published }),
      })
      if (res.ok) {
        showToast(item.published ? 'FAQ가 비공개 처리되었습니다.' : 'FAQ가 공개되었습니다.')
        fetchFaqs()
      }
    } catch (err) {
      console.error('Failed to toggle published:', err)
    }
  }

  if (loading) {
    return (
      <AdminLayout currentPage="/admin/faq" title="FAQ 관리">
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
    <AdminLayout currentPage="/admin/faq" title="FAQ 관리" subtitle={`총 ${faqs.length}건의 FAQ`}>
      {(showToast) => (
        <>
          {/* Header Actions */}
          <div className="flex items-center justify-end mb-6">
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy text-white text-sm font-semibold hover:bg-navy-light transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              FAQ 추가
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(36,52,71,0.06)] overflow-hidden">
            {faqs.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <svg className="w-16 h-16 text-navy/10 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-navy/30 text-lg font-semibold mb-2">FAQ가 없습니다</p>
                <p className="text-navy/20 text-sm mb-4">아직 등록된 FAQ가 없습니다.</p>
                <button onClick={openAddModal} className="text-sm text-beige hover:text-navy font-semibold transition-colors">
                  첫 FAQ 추가하기
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs text-navy/40 uppercase tracking-wider border-b border-navy/5">
                      <th className="px-6 py-4 font-semibold">질문</th>
                      <th className="px-6 py-4 font-semibold">카테고리</th>
                      <th className="px-6 py-4 font-semibold">순서</th>
                      <th className="px-6 py-4 font-semibold">공개</th>
                      <th className="px-6 py-4 font-semibold">액션</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy/5">
                    {faqs.map((faq) => (
                      <tr key={faq.id} className="hover:bg-navy/[0.01] transition-colors">
                        <td className="px-6 py-4 text-sm font-semibold text-navy max-w-md">
                          <p className="truncate">{faq.question}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[faq.category] || 'bg-gray-100 text-gray-600'}`}>
                            {categoryLabels[faq.category] || faq.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-navy/50 font-mono">{faq.order}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleTogglePublished(faq, showToast)}
                            className="relative inline-flex items-center cursor-pointer"
                          >
                            <div
                              className={`w-11 h-6 rounded-full transition-colors ${
                                faq.published ? 'bg-green-500' : 'bg-navy/10'
                              }`}
                            >
                              <div
                                className={`absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full transition-transform ${
                                  faq.published ? 'translate-x-5' : 'translate-x-0'
                                }`}
                              />
                            </div>
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openEditModal(faq)}
                              className="p-2 rounded-lg hover:bg-navy/5 text-navy/40 hover:text-navy transition-all"
                              title="수정"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDelete(faq.id, showToast)}
                              className="p-2 rounded-lg hover:bg-red-50 text-navy/40 hover:text-red-500 transition-all"
                              title="삭제"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Add/Edit Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-navy/40 backdrop-blur-sm" onClick={closeModal} />
              <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white px-6 py-5 border-b border-navy/5 flex items-center justify-between rounded-t-2xl">
                  <h3 className="text-lg font-bold text-navy">
                    {editingItem ? 'FAQ 수정' : 'FAQ 추가'}
                  </h3>
                  <button onClick={closeModal} className="p-2 rounded-lg hover:bg-navy/5 text-navy/40 hover:text-navy transition-all">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={(e) => handleSubmit(e, showToast)} className="p-6 space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1.5">질문</label>
                    <input
                      type="text"
                      value={form.question}
                      onChange={(e) => setForm({ ...form, question: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-navy/10 text-navy bg-warm-white/50 placeholder:text-navy/25 focus:outline-none focus:ring-2 focus:ring-beige/40 focus:border-beige transition-all text-sm"
                      placeholder="자주 묻는 질문을 입력하세요"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1.5">답변</label>
                    <textarea
                      value={form.answer}
                      onChange={(e) => setForm({ ...form, answer: e.target.value })}
                      rows={5}
                      className="w-full px-4 py-2.5 rounded-xl border border-navy/10 text-navy bg-warm-white/50 placeholder:text-navy/25 focus:outline-none focus:ring-2 focus:ring-beige/40 focus:border-beige transition-all text-sm resize-none"
                      placeholder="답변을 입력하세요"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1.5">카테고리</label>
                      <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value as typeof form.category })}
                        className="w-full px-4 py-2.5 rounded-xl border border-navy/10 text-navy bg-warm-white/50 focus:outline-none focus:ring-2 focus:ring-beige/40 focus:border-beige transition-all text-sm"
                      >
                        <option value="product">제품</option>
                        <option value="order">주문</option>
                        <option value="delivery">배송</option>
                        <option value="general">일반</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1.5">순서</label>
                      <input
                        type="number"
                        value={form.order}
                        onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                        className="w-full px-4 py-2.5 rounded-xl border border-navy/10 text-navy bg-warm-white/50 placeholder:text-navy/25 focus:outline-none focus:ring-2 focus:ring-beige/40 focus:border-beige transition-all text-sm"
                        placeholder="0"
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.published}
                        onChange={(e) => setForm({ ...form, published: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-navy/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500" />
                    </label>
                    <span className="text-sm font-semibold text-navy">공개</span>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 py-2.5 rounded-xl border border-navy/10 text-navy/60 text-sm font-semibold hover:bg-navy/5 transition-all"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex-1 py-2.5 rounded-xl bg-navy text-white text-sm font-semibold hover:bg-navy-light disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                    >
                      {saving ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          저장 중...
                        </>
                      ) : editingItem ? '수정' : '추가'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </AdminLayout>
  )
}
