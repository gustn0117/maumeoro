'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AuthUser {
  id: string
  email: string
  name: string
  phone: string
  role: string
}

interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  isLoggedIn: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (data: { email: string; password: string; name: string; phone: string }) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateUser: (user: AuthUser) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('auth_user')
    if (saved) {
      try {
        setUser(JSON.parse(saved))
      } catch {}
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        return { success: false, error: data.error }
      }
      setUser(data.user)
      localStorage.setItem('auth_user', JSON.stringify(data.user))
      return { success: true }
    } catch {
      return { success: false, error: '로그인 중 오류가 발생했습니다.' }
    }
  }

  const register = async (regData: { email: string; password: string; name: string; phone: string }) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regData),
      })
      const data = await res.json()
      if (!res.ok) {
        return { success: false, error: data.error }
      }
      setUser(data.user)
      localStorage.setItem('auth_user', JSON.stringify(data.user))
      return { success: true }
    } catch {
      return { success: false, error: '회원가입 중 오류가 발생했습니다.' }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('auth_user')
  }

  const updateUser = (updatedUser: AuthUser) => {
    setUser(updatedUser)
    localStorage.setItem('auth_user', JSON.stringify(updatedUser))
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, isLoggedIn: !!user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
