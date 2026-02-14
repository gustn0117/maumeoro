'use client'

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/AdminLayout'

interface User {
  id: string
  name: string
  email: string
  phone: string
  createdAt: string
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users')
      const data = await res.json()
      setUsers(data)
    } catch (err) {
      console.error('Failed to fetch users:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, showToast: (msg: string) => void) => {
    if (!window.confirm('정말 이 회원을 삭제하시겠습니까?')) return

    try {
      const res = await fetch(`/api/users?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        showToast('회원이 삭제되었습니다.')
        fetchUsers()
      }
    } catch (err) {
      console.error('Failed to delete user:', err)
    }
  }

  if (loading) {
    return (
      <AdminLayout currentPage="/admin/users" title="회원 관리">
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
    <AdminLayout currentPage="/admin/users" title="회원 관리" subtitle={`총 ${users.length}명의 회원`}>
      {(showToast) => (
        <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(36,52,71,0.06)] overflow-hidden">
          {users.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <svg className="w-16 h-16 text-navy/10 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <p className="text-navy/30 text-lg font-semibold mb-2">회원이 없습니다</p>
              <p className="text-navy/20 text-sm">아직 등록된 회원이 없습니다.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-navy/40 uppercase tracking-wider border-b border-navy/5">
                    <th className="px-6 py-4 font-semibold">이름</th>
                    <th className="px-6 py-4 font-semibold">이메일</th>
                    <th className="px-6 py-4 font-semibold">연락처</th>
                    <th className="px-6 py-4 font-semibold">가입일</th>
                    <th className="px-6 py-4 font-semibold">액션</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy/5">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-navy/[0.01] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-navy/5 flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-bold text-navy/40">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                          <span className="text-sm font-semibold text-navy">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-navy/60">{user.email}</td>
                      <td className="px-6 py-4 text-sm text-navy/50">{user.phone || '-'}</td>
                      <td className="px-6 py-4 text-sm text-navy/40">
                        {new Date(user.createdAt).toLocaleDateString('ko-KR')}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete(user.id, showToast)}
                          className="p-2 rounded-lg hover:bg-red-50 text-navy/40 hover:text-red-500 transition-all"
                          title="삭제"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  )
}
