import { NextResponse } from 'next/server'
import { getUsers, saveUsers } from '@/lib/data'

export async function GET() {
  const users = getUsers().map(({ password, ...rest }) => rest)
  return NextResponse.json(users.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'ID가 필요합니다.' }, { status: 400 })
  }

  const users = getUsers()
  const filtered = users.filter((u) => u.id !== id)

  if (filtered.length === users.length) {
    return NextResponse.json({ error: '사용자를 찾을 수 없습니다.' }, { status: 404 })
  }

  saveUsers(filtered)
  return NextResponse.json({ success: true })
}
