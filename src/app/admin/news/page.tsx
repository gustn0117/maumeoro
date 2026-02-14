'use client'

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/AdminLayout'

interface NewsItem {
  id: string
  title: string
  content: string
  category: 'notice' | 'product' | 'guide'
  date: string
  published: boolean
}

const categoryLabels: Record<string, string> = {
  notice: '공지',
  product: '제품',
  guide: '안내',
}

const categoryColors: Record<string, string> = {
  notice: 'bg-rose-100 text-rose-700',
  product: 'bg-blue-100 text-blue-700',
  guide: 'bg-navy/5 text-navy/60',
}

const emptyForm = {
  title: '',
  content: '',
  category: 'notice' as 'notice' | 'product' | 'guide',
  date: new Date().toISOString().split('T')[0],
  published: true,
}

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const res = await fetch('/api/news')
      const data = await res.json()
      setNews(data)
    } catch (err) {
      console.error('Failed to fetch news:', err)
    } finally {
      setLoading(false)
    }
  }

  const openAddModal = () => {
    setEditingItem(null)
    setForm(emptyForm)
    setShowModal(true)
  }

  const openEditModal = (item: NewsItem) => {
    setEditingItem(item)
    setForm({
      title: item.title,
      content: item.content,
      category: item.category,
      date: item.date,
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

    try {
      if (editingItem) {
        const res = await fetch('/api/news', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingItem.id, ...form }),
        })
        if (res.ok) {
          showToast('소식이 수정되었습니다.')
          closeModal()
          fetchNews()
        }
      } else {
        const res = await fetch('/api/news', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (res.ok) {
          showToast('소식이 추가되었습니다.')
          closeModal()
          fetchNews()
        }
      }
    } catch (err) {
      console.error('Failed to save news:', err)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string, showToast: (msg: string) => void) => {
    if (!window.confirm('정말 이 소식을 삭제하시겠습니까?')) return

    try {
      const res = await fetch(`/api/news?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        showToast('소식이 삭제되었습니다.')
        fetchNews()
      }
    } catch (err) {
      console.error('Failed to delete news:', err)
    }
  }

  if (loading) {
    return (
      <AdminLayout currentPage="/admin/news" title="소식 관리">
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
    <AdminLayout currentPage="/admin/news" title="소식 관리" subtitle={`총 ${news.length}개 소식`}>
      {(showToast) => (
        <>
          <div className="flex items-center justify-end mb-6">
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy text-white text-sm font-semibold hover:bg-navy-light transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              소식 추가
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(36,52,71,0.06)] overflow-hidden">
            {news.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <svg className="w-16 h-16 text-navy/10 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <p className="text-navy/30 mb-4">등록된 소식이 없습니다.</p>
                <button onClick={openAddModal} className="text-sm text-beige hover:text-navy font-semibold transition-colors">
                  첫 소식 추가하기
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs text-navy/40 uppercase tracking-wider border-b border-navy/5">
                      <th className="px-6 py-4 font-semibold">ID</th>
                      <th className="px-6 py-4 font-semibold">제목</th>
                      <th className="px-6 py-4 font-semibold">카테고리</th>
                      <th className="px-6 py-4 font-semibold">날짜</th>
                      <th className="px-6 py-4 font-semibold">공개여부</th>
                      <th className="px-6 py-4 font-semibold">액션</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy/5">
                    {news.map((item) => (
                      <tr key={item.id} className="hover:bg-navy/[0.01] transition-colors">
                        <td className="px-6 py-4 text-xs font-mono text-navy/40">{item.id.slice(-6)}</td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-semibold text-navy max-w-xs truncate">{item.title}</p>
                          <p className="text-xs text-navy/30 mt-0.5 max-w-xs truncate">{item.content}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[item.category]}`}>
                            {categoryLabels[item.category]}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-navy/50">{item.date}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${item.published ? 'bg-green-100 text-green-700' : 'bg-navy/5 text-navy/40'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${item.published ? 'bg-green-500' : 'bg-navy/20'}`} />
                            {item.published ? '공개' : '비공개'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button onClick={() => openEditModal(item)} className="p-2 rounded-lg hover:bg-navy/5 text-navy/40 hover:text-navy transition-all" title="수정">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button onClick={() => handleDelete(item.id, showToast)} className="p-2 rounded-lg hover:bg-red-50 text-navy/40 hover:text-red-500 transition-all" title="삭제">
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

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-navy/40 backdrop-blur-sm" onClick={closeModal} />
              <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white px-6 py-5 border-b border-navy/5 flex items-center justify-between rounded-t-2xl">
                  <h3 className="text-lg font-bold text-navy">{editingItem ? '소식 수정' : '소식 추가'}</h3>
                  <button onClick={closeModal} className="p-2 rounded-lg hover:bg-navy/5 text-navy/40 hover:text-navy transition-all">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={(e) => handleSubmit(e, showToast)} className="p-6 space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1.5">제목</label>
                    <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-navy/10 text-navy bg-warm-white/50 placeholder:text-navy/25 focus:outline-none focus:ring-2 focus:ring-beige/40 focus:border-beige transition-all text-sm" placeholder="소식 제목을 입력하세요" required />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1.5">내용</label>
                    <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={6} className="w-full px-4 py-2.5 rounded-xl border border-navy/10 text-navy bg-warm-white/50 placeholder:text-navy/25 focus:outline-none focus:ring-2 focus:ring-beige/40 focus:border-beige transition-all text-sm resize-none" placeholder="소식 내용을 입력하세요" required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1.5">카테고리</label>
                      <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as 'notice' | 'product' | 'guide' })} className="w-full px-4 py-2.5 rounded-xl border border-navy/10 text-navy bg-warm-white/50 focus:outline-none focus:ring-2 focus:ring-beige/40 focus:border-beige transition-all text-sm">
                        <option value="notice">공지</option>
                        <option value="product">제품</option>
                        <option value="guide">안내</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1.5">날짜</label>
                      <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-navy/10 text-navy bg-warm-white/50 focus:outline-none focus:ring-2 focus:ring-beige/40 focus:border-beige transition-all text-sm" required />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="sr-only peer" />
                      <div className="w-11 h-6 bg-navy/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500" />
                    </label>
                    <span className="text-sm font-semibold text-navy">공개</span>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button type="button" onClick={closeModal} className="flex-1 py-2.5 rounded-xl border border-navy/10 text-navy/60 text-sm font-semibold hover:bg-navy/5 transition-all">취소</button>
                    <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded-xl bg-navy text-white text-sm font-semibold hover:bg-navy-light disabled:opacity-50 transition-all flex items-center justify-center gap-2">
                      {saving ? (<><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>저장 중...</>) : editingItem ? '수정' : '추가'}
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
