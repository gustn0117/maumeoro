'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useAuth()
  const [form, setForm] = useState({ email: '', password: '', passwordConfirm: '', name: '', phone: '' })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.passwordConfirm) { setError('비밀번호가 일치하지 않습니다.'); return }
    if (form.password.length < 6) { setError('비밀번호는 6자 이상이어야 합니다.'); return }
    setIsSubmitting(true)
    const result = await register({ email: form.email, password: form.password, name: form.name, phone: form.phone })
    if (result.success) { router.push('/') } else { setError(result.error || '회원가입에 실패했습니다.') }
    setIsSubmitting(false)
  }

  return (
    <section className="min-h-screen flex">
      {/* Left Panel - Desktop Only */}
      <div className="hidden lg:flex lg:w-1/2 bg-navy relative overflow-hidden items-center justify-center">

        <div className="relative z-10 px-16 max-w-lg">
          <div>
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">마음으로</h1>
              <div className="h-1 w-16 bg-beige rounded-full" />
            </div>
            <p className="text-white/80 text-xl font-medium leading-relaxed mb-2">
              함께하세요
            </p>
            <p className="text-white/85 text-base leading-relaxed mb-6">
              마음으로의 회원이 되어<br />
              편리한 서비스를 이용하세요.
            </p>
            <div className="space-y-4 mt-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-beige/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-beige-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white/85 text-sm">맞춤 제품 추천</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-beige/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-beige-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white/85 text-sm">간편한 주문 관리</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-beige/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-beige-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white/85 text-sm">회원 전용 혜택</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 bg-aloe flex items-center justify-center px-4 sm:px-6 py-20 lg:py-0">
        <div className="w-full max-w-md">
          <div>
            <div className="bg-white rounded-xl p-8 sm:p-10 shadow-line">
              {/* Gold accent line */}
              <div className="flex justify-center mb-8">
                <div className="h-1 w-16 bg-beige rounded-full" />
              </div>

              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-navy mb-2">회원가입</h2>
                <p className="text-ink-mute text-sm">마음으로의 회원이 되어 편리한 서비스를 이용하세요.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600 flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                  </div>
                )}
                <div>
                  <label htmlFor="name" className="form-label">이름 <span className="text-red-700">*</span></label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="홍길동"
                    className="form-input"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="form-label">이메일 <span className="text-red-700">*</span></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    className="form-input"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="form-label">연락처 <span className="text-red-700">*</span></label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="010-0000-0000"
                    className="form-input"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="form-label">비밀번호 <span className="text-red-700">*</span></label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      required
                      value={form.password}
                      onChange={handleChange}
                      placeholder="6자 이상 입력하세요"
                      className="form-input pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-mute hover:text-ink-soft transition-colors p-1"
                      aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="passwordConfirm" className="form-label">비밀번호 확인 <span className="text-red-700">*</span></label>
                  <div className="relative">
                    <input
                      type={showPasswordConfirm ? 'text' : 'password'}
                      id="passwordConfirm"
                      name="passwordConfirm"
                      required
                      value={form.passwordConfirm}
                      onChange={handleChange}
                      placeholder="비밀번호를 다시 입력하세요"
                      className="form-input pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-mute hover:text-ink-soft transition-colors p-1"
                      aria-label={showPasswordConfirm ? '비밀번호 숨기기' : '비밀번호 보기'}
                    >
                      {showPasswordConfirm ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </button>
                  </div>
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
                      가입 처리 중...
                    </>
                  ) : '회원가입'}
                </button>
              </form>
              <div className="mt-6 text-center">
                <p className="text-sm text-ink-mute">
                  이미 회원이신가요?{' '}
                  <Link href="/login" className="text-beige-deep font-semibold hover:text-navy transition-colors">
                    로그인
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
