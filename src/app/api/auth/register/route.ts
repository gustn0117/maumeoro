import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getUserByEmail, addUser } from '@/lib/data'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, name, phone } = body

    if (!email || !password || !name || !phone) {
      return NextResponse.json({ error: '모든 필수 항목을 입력해 주세요.' }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: '비밀번호는 6자 이상이어야 합니다.' }, { status: 400 })
    }

    const existing = await getUserByEmail(email)
    if (existing) {
      return NextResponse.json({ error: '이미 가입된 이메일입니다.' }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await addUser({
      email,
      password: hashedPassword,
      name,
      phone,
      role: 'user',
    })

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        role: user.role,
      },
    }, { status: 201 })
  } catch {
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}
