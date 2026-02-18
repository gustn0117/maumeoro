'use client'

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/AdminLayout'

interface Product {
  id: string
  name: string
  nameKo: string
  category: string
  price: number
  description: string
  detail: string
  features: string[]
  image: string
  inStock: boolean
  createdAt: string
}

const categoryLabels: Record<string, string> = {
  bath: '목욕·세정',
  hygiene: '배뇨·위생',
  disinfect: '소독·감염관리',
}

const emptyForm: Omit<Product, 'id' | 'createdAt'> = {
  name: '',
  nameKo: '',
  category: 'bath',
  price: 0,
  description: '',
  detail: '',
  features: [],
  image: '/images/product-bath.jpg',
  inStock: true,
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [featuresInput, setFeaturesInput] = useState('')
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      setProducts(data)
    } catch (err) {
      console.error('Failed to fetch products:', err)
    } finally {
      setLoading(false)
    }
  }

  const openAddModal = () => {
    setEditingProduct(null)
    setForm(emptyForm)
    setFeaturesInput('')
    setImagePreview(null)
    setShowModal(true)
  }

  const openEditModal = (product: Product) => {
    setEditingProduct(product)
    setForm({
      name: product.name,
      nameKo: product.nameKo,
      category: product.category,
      price: product.price,
      description: product.description,
      detail: product.detail,
      features: product.features,
      image: product.image,
      inStock: product.inStock,
    })
    setFeaturesInput(product.features.join(', '))
    setImagePreview(product.image || null)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingProduct(null)
    setForm(emptyForm)
    setFeaturesInput('')
    setImagePreview(null)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 로컬 미리보기
    const reader = new FileReader()
    reader.onload = (ev) => setImagePreview(ev.target?.result as string)
    reader.readAsDataURL(file)

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (res.ok && data.url) {
        setForm((prev) => ({ ...prev, image: data.url }))
      } else {
        alert(data.error || '이미지 업로드에 실패했습니다.')
        setImagePreview(null)
      }
    } catch {
      alert('이미지 업로드에 실패했습니다.')
      setImagePreview(null)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent, showToast: (msg: string) => void) => {
    e.preventDefault()
    setSaving(true)

    const payload = {
      ...form,
      features: featuresInput.split(',').map((f) => f.trim()).filter(Boolean),
      price: Number(form.price),
    }

    try {
      if (editingProduct) {
        const res = await fetch('/api/products', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingProduct.id, ...payload }),
        })
        if (res.ok) {
          showToast('제품이 수정되었습니다.')
          closeModal()
          fetchProducts()
        }
      } else {
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (res.ok) {
          showToast('제품이 추가되었습니다.')
          closeModal()
          fetchProducts()
        }
      }
    } catch (err) {
      console.error('Failed to save product:', err)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string, showToast: (msg: string) => void) => {
    if (!window.confirm('정말 이 제품을 삭제하시겠습니까?')) return

    try {
      const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        showToast('제품이 삭제되었습니다.')
        fetchProducts()
      }
    } catch (err) {
      console.error('Failed to delete product:', err)
    }
  }

  if (loading) {
    return (
      <AdminLayout currentPage="/admin/products" title="제품 관리">
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
    <AdminLayout currentPage="/admin/products" title="제품 관리" subtitle={`총 ${products.length}개 제품`}>
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
              제품 추가
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(36,52,71,0.06)] overflow-hidden">
            {products.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <svg className="w-16 h-16 text-navy/10 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <p className="text-navy/30 mb-4">등록된 제품이 없습니다.</p>
                <button onClick={openAddModal} className="text-sm text-beige hover:text-navy font-semibold transition-colors">
                  첫 제품 추가하기
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs text-navy/40 uppercase tracking-wider border-b border-navy/5">
                      <th className="px-6 py-4 font-semibold">ID</th>
                      <th className="px-6 py-4 font-semibold">이미지</th>
                      <th className="px-6 py-4 font-semibold">제품명</th>
                      <th className="px-6 py-4 font-semibold">카테고리</th>
                      <th className="px-6 py-4 font-semibold">가격</th>
                      <th className="px-6 py-4 font-semibold">재고상태</th>
                      <th className="px-6 py-4 font-semibold">액션</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy/5">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-navy/[0.01] transition-colors">
                        <td className="px-6 py-4 text-xs font-mono text-navy/40">{product.id.slice(-6)}</td>
                        <td className="px-6 py-4">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-warm-white">
                            <img src={product.image} alt={product.nameKo} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = '/images/product-bath.jpg' }} />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-semibold text-navy">{product.nameKo}</p>
                          <p className="text-xs text-navy/30 mt-0.5">{product.name}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-navy/5 text-navy/60">
                            {categoryLabels[product.category] || product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-navy">{product.price.toLocaleString()}원</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {product.inStock ? '재고있음' : '품절'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button onClick={() => openEditModal(product)} className="p-2 rounded-lg hover:bg-navy/5 text-navy/40 hover:text-navy transition-all" title="수정">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button onClick={() => handleDelete(product.id, showToast)} className="p-2 rounded-lg hover:bg-red-50 text-navy/40 hover:text-red-500 transition-all" title="삭제">
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
              <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white px-6 py-5 border-b border-navy/5 flex items-center justify-between rounded-t-2xl">
                  <h3 className="text-lg font-bold text-navy">{editingProduct ? '제품 수정' : '제품 추가'}</h3>
                  <button onClick={closeModal} className="p-2 rounded-lg hover:bg-navy/5 text-navy/40 hover:text-navy transition-all">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={(e) => handleSubmit(e, showToast)} className="p-6 space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1.5">제품명 (한국어)</label>
                      <input type="text" value={form.nameKo} onChange={(e) => setForm({ ...form, nameKo: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-navy/10 text-navy bg-warm-white/50 placeholder:text-navy/25 focus:outline-none focus:ring-2 focus:ring-beige/40 focus:border-beige transition-all text-sm" placeholder="예: 디스포바뇨 알로에베라" required />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1.5">제품명 (영어)</label>
                      <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-navy/10 text-navy bg-warm-white/50 placeholder:text-navy/25 focus:outline-none focus:ring-2 focus:ring-beige/40 focus:border-beige transition-all text-sm" placeholder="예: Dispobaño Aloe Vera" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1.5">카테고리</label>
                      <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-navy/10 text-navy bg-warm-white/50 focus:outline-none focus:ring-2 focus:ring-beige/40 focus:border-beige transition-all text-sm">
                        <option value="bath">목욕·세정</option>
                        <option value="hygiene">배뇨·위생</option>
                        <option value="disinfect">소독·감염관리</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1.5">가격 (원)</label>
                      <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="w-full px-4 py-2.5 rounded-xl border border-navy/10 text-navy bg-warm-white/50 placeholder:text-navy/25 focus:outline-none focus:ring-2 focus:ring-beige/40 focus:border-beige transition-all text-sm" placeholder="0" min="0" required />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1.5">간단 설명</label>
                    <input type="text" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-navy/10 text-navy bg-warm-white/50 placeholder:text-navy/25 focus:outline-none focus:ring-2 focus:ring-beige/40 focus:border-beige transition-all text-sm" placeholder="간단한 제품 설명" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1.5">상세 설명</label>
                    <textarea value={form.detail} onChange={(e) => setForm({ ...form, detail: e.target.value })} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-navy/10 text-navy bg-warm-white/50 placeholder:text-navy/25 focus:outline-none focus:ring-2 focus:ring-beige/40 focus:border-beige transition-all text-sm resize-none" placeholder="상세한 제품 설명을 입력하세요" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1.5">특징 (쉼표로 구분)</label>
                    <input type="text" value={featuresInput} onChange={(e) => setFeaturesInput(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-navy/10 text-navy bg-warm-white/50 placeholder:text-navy/25 focus:outline-none focus:ring-2 focus:ring-beige/40 focus:border-beige transition-all text-sm" placeholder="예: 알로에베라 성분, 물 없이 사용, CE 인증" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1.5">제품 이미지</label>
                    <div
                      className="relative w-full rounded-xl border-2 border-dashed border-navy/15 hover:border-beige/60 bg-warm-white/30 transition-all cursor-pointer overflow-hidden"
                      onClick={() => document.getElementById('image-upload')?.click()}
                    >
                      {imagePreview ? (
                        <div className="relative">
                          <img src={imagePreview} alt="미리보기" className="w-full h-48 object-contain bg-warm-white" />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              setImagePreview(null)
                              setForm((prev) => ({ ...prev, image: '' }))
                            }}
                            className="absolute top-2 right-2 p-1.5 rounded-lg bg-navy/60 text-white hover:bg-navy/80 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                          {uploading && (
                            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                              <svg className="w-8 h-8 animate-spin text-beige" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-8 px-4">
                          <svg className="w-10 h-10 text-navy/20 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-sm text-navy/40 font-medium">클릭하여 이미지를 선택하세요</p>
                          <p className="text-xs text-navy/25 mt-1">JPG, PNG, WebP (최대 5MB)</p>
                        </div>
                      )}
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={form.inStock} onChange={(e) => setForm({ ...form, inStock: e.target.checked })} className="sr-only peer" />
                      <div className="w-11 h-6 bg-navy/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500" />
                    </label>
                    <span className="text-sm font-semibold text-navy">재고 있음</span>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button type="button" onClick={closeModal} className="flex-1 py-2.5 rounded-xl border border-navy/10 text-navy/60 text-sm font-semibold hover:bg-navy/5 transition-all">취소</button>
                    <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded-xl bg-navy text-white text-sm font-semibold hover:bg-navy-light disabled:opacity-50 transition-all flex items-center justify-center gap-2">
                      {saving ? (<><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>저장 중...</>) : editingProduct ? '수정' : '추가'}
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
