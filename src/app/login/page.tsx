'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import ScrollReveal from '@/components/ScrollReveal'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    const result = await login(email, password)
    if (result.success) {
      router.push('/')
    } else {
      setError(result.error || '로그인에 실패했습니다.')
    }
    setIsSubmitting(false)
  }

  return (
    <section className="min-h-screen flex">
      {/* Left Panel - Desktop Only */}
      <div className="hidden lg:flex lg:w-1/2 bg-navy relative overflow-hidden items-center justify-center">
        {/* Decorative blur circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-beige/10 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-16 w-56 h-56 bg-beige-light/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-beige/5 rounded-full blur-2xl" />
        {/* Floating decorative elements */}
        <div className="absolute top-20 right-10 w-16 h-16 rounded-full bg-beige/10 blur-[30px] animate-float" />
        <div className="absolute bottom-40 left-16 w-12 h-12 rounded-full bg-beige-light/15 blur-[20px] animate-float-slow" />
        <div className="absolute top-1/3 right-1/3 w-10 h-10 rounded-full bg-beige/8 blur-[25px] animate-float" />

        <div className="relative z-10 px-16 max-w-lg">
          <ScrollReveal direction="left">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">마음으로</h1>
              <div className="h-1 w-16 bg-gradient-to-r from-beige to-beige-light rounded-full" />
            </div>
            <p className="text-white/80 text-xl font-medium leading-relaxed mb-4">
              합리적이고 편리한<br />노인돌봄 용품 전문점
            </p>
            <p className="text-white/40 text-sm leading-relaxed">
              마음으로는 어르신들의 편안한 일상을 위해<br />
              정성을 담아 최고의 제품을 제공합니다.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 bg-warm-white flex items-center justify-center px-4 sm:px-6 py-20 lg:py-0">
        <div className="w-full max-w-md">
          <ScrollReveal direction="up">
            <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-card">
              {/* Gold accent line */}
              <div className="flex justify-center mb-8">
                <div className="h-1 w-16 bg-gradient-to-r from-beige to-beige-light rounded-full" />
              </div>

              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-navy mb-2">로그인</h2>
                <p className="text-navy/40 text-sm">마음으로 회원 서비스를 이용하세요.</p>
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
                  <label htmlFor="email" className="form-label">이메일</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    className="form-input"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="form-label">비밀번호</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="비밀번호를 입력하세요"
                      className="form-input pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/30 hover:text-navy/60 transition-colors p-1"
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
                      로그인 중...
                    </>
                  ) : '로그인'}
                </button>
              </form>
              <div className="mt-6 text-center">
                <p className="text-sm text-navy/40">
                  아직 회원이 아니신가요?{' '}
                  <Link href="/register" className="text-beige font-semibold hover:text-navy transition-colors">
                    회원가입
                  </Link>
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
