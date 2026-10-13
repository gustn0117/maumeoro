'use client'

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { SITE_IMAGE_SLOTS, SITE_IMAGE_TYPES, SITE_IMAGE_MAX_BYTES, SiteImages } from '@/lib/siteImages'

const ACCEPT = Object.keys(SITE_IMAGE_TYPES).join(',')

export default function AdminImagesPage() {
  const [images, setImages] = useState<SiteImages>({})
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [busySlot, setBusySlot] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch('/api/site-images')
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok) throw new Error(data.error)
        setImages(data)
      })
      .catch((err) => setLoadError(err instanceof Error && err.message ? err.message : '이미지 목록을 불러오지 못했습니다.'))
      .finally(() => setLoading(false))
  }, [])

  const setError = (slot: string, message: string) => setErrors((prev) => ({ ...prev, [slot]: message }))

  const handleUpload = async (slot: string, file: File | undefined, showToast: (msg: string) => void) => {
    if (!file) return
    if (!SITE_IMAGE_TYPES[file.type]) {
      setError(slot, 'JPG, PNG, WebP 이미지만 올릴 수 있습니다.')
      return
    }
    if (file.size > SITE_IMAGE_MAX_BYTES) {
      setError(slot, '이미지는 5MB 이하만 올릴 수 있습니다.')
      return
    }

    setError(slot, '')
    setBusySlot(slot)
    try {
      const formData = new FormData()
      formData.append('slot', slot)
      formData.append('file', file)
      const res = await fetch('/api/site-images', { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setImages((prev) => ({ ...prev, [slot]: data.url }))
      showToast('이미지를 바꿨습니다.')
    } catch (err) {
      setError(slot, err instanceof Error && err.message ? err.message : '이미지를 올리지 못했습니다.')
    } finally {
      setBusySlot(null)
    }
  }

  const handleReset = async (slot: string, showToast: (msg: string) => void) => {
    if (!confirm('올린 이미지를 빼고 기본 상태로 되돌릴까요?')) return
    setError(slot, '')
    setBusySlot(slot)
    try {
      const res = await fetch(`/api/site-images?slot=${slot}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setImages((prev) => {
        const next = { ...prev }
        delete next[slot]
        return next
      })
      showToast('기본 상태로 되돌렸습니다.')
    } catch (err) {
      setError(slot, err instanceof Error && err.message ? err.message : '기본 상태로 되돌리지 못했습니다.')
    } finally {
      setBusySlot(null)
    }
  }

  return (
    <AdminLayout currentPage="/admin/images" title="이미지 관리" subtitle="홈 배너와 회사소개에 쓰이는 이미지를 바꿉니다">
      {(showToast) => (
        <>
          <div className="mb-6 rounded-2xl bg-white border border-navy/5 px-6 py-4 text-sm text-navy/60 leading-relaxed">
            가로로 긴 이미지를 권합니다 (1600×1000px 이상, 가로:세로 = 16:10). JPG, PNG, WebP 파일을 5MB까지 올릴 수 있습니다.
            <br />
            이미지를 올리면 사이트에 바로 반영됩니다. 그림이 자리 비율과 다르면 가운데를 기준으로 잘려 보입니다.
          </div>

          {loading ? (
            <p className="text-sm text-navy/40">불러오는 중...</p>
          ) : loadError ? (
            <p className="text-sm text-red-600">{loadError}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {SITE_IMAGE_SLOTS.map((slot) => {
                const uploaded = images[slot.key]
                const shown = uploaded ?? slot.fallback
                const busy = busySlot === slot.key
                const inputId = `site-image-${slot.key}`
                return (
                  <div key={slot.key} className="bg-white rounded-2xl border border-navy/5 overflow-hidden">
                    <div className="relative aspect-[16/10] bg-warm-white">
                      {shown ? (
                        <img src={shown} alt={`${slot.label} 현재 이미지`} className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-navy/40">
                          올린 이미지가 없어 영문 이름을 크게 쓴 색 판으로 보입니다
                        </div>
                      )}
                      <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${uploaded ? 'bg-navy text-white' : 'bg-white text-navy/60 border border-navy/10'}`}>
                        {uploaded ? '올린 이미지' : shown ? '기본 이미지' : '이미지 없음'}
                      </span>
                    </div>
                    <div className="p-5">
                      <p className="text-sm font-bold text-navy">{slot.label}</p>
                      <p className="text-xs text-navy/50 mt-0.5">{slot.where}</p>
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <label
                          htmlFor={inputId}
                          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                            busy ? 'bg-navy/40 text-white cursor-wait' : 'bg-navy text-white hover:bg-navy-light cursor-pointer'
                          }`}
                        >
                          {busy ? '처리 중...' : uploaded ? '다른 이미지로 바꾸기' : '이미지 올리기'}
                        </label>
                        <input
                          id={inputId}
                          type="file"
                          accept={ACCEPT}
                          disabled={busy}
                          className="sr-only"
                          onChange={(e) => {
                            handleUpload(slot.key, e.target.files?.[0], showToast)
                            e.target.value = ''   // 같은 파일을 다시 골라도 반응하도록
                          }}
                        />
                        {uploaded && (
                          <button
                            type="button"
                            disabled={busy}
                            onClick={() => handleReset(slot.key, showToast)}
                            className="px-4 py-2 rounded-xl text-sm font-semibold text-navy/60 border border-navy/10 hover:border-navy/30 hover:text-navy transition-all disabled:opacity-50"
                          >
                            기본으로 되돌리기
                          </button>
                        )}
                      </div>
                      {errors[slot.key] && <p className="mt-3 text-sm text-red-600">{errors[slot.key]}</p>}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}
    </AdminLayout>
  )
}
