import { NextResponse } from 'next/server'
import { getInquiries, getInquiriesByUser, addInquiry, saveInquiries } from '@/lib/data'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  let inquiries
  if (userId) {
    inquiries = getInquiriesByUser(userId)
  } else {
    inquiries = getInquiries()
  }

  return NextResponse.json(inquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
}

export async function POST(request: Request) {
  const body = await request.json()
  const inquiry = addInquiry({
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
  const inquiries = getInquiries()
  const index = inquiries.findIndex((i) => i.id === body.id)
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  inquiries[index] = {
    ...inquiries[index],
    reply: body.reply,
    repliedAt: new Date().toISOString(),
    status: 'replied',
  }
  saveInquiries(inquiries)
  return NextResponse.json(inquiries[index])
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
  let inquiries = getInquiries()
  inquiries = inquiries.filter((i) => i.id !== id)
  saveInquiries(inquiries)
  return NextResponse.json({ success: true })
}
