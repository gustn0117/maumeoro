import { NextResponse } from 'next/server'
import { getInquiries, getInquiriesByUser, addInquiry, updateInquiry, deleteInquiry } from '@/lib/data'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  let inquiries
  if (userId) {
    inquiries = await getInquiriesByUser(userId)
  } else {
    inquiries = await getInquiries()
  }

  return NextResponse.json(inquiries)
}

export async function POST(request: Request) {
  const body = await request.json()
  const inquiry = await addInquiry({
    userId: body.userId,
    userName: body.userName,
    title: body.title,
    content: body.content,
    category: body.category,
  })
  return NextResponse.json(inquiry, { status: 201 })
}

export async function PUT(request: Request) {
  const body = await request.json()
  try {
    const updated = await updateInquiry(body.id, { reply: body.reply })
    return NextResponse.json(updated)
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
  await deleteInquiry(id)
  return NextResponse.json({ success: true })
}
