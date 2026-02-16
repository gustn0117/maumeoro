import { NextResponse } from 'next/server'
import { getNews, addNewsItem, updateNewsItem, deleteNewsItem } from '@/lib/data'

export async function GET() {
  const news = await getNews()
  return NextResponse.json(news)
}

export async function POST(request: Request) {
  const body = await request.json()
  const newItem = await addNewsItem({
    title: body.title || '',
    content: body.content || '',
    category: body.category || 'notice',
    date: body.date || new Date().toISOString().split('T')[0],
    published: body.published !== false,
  })
  return NextResponse.json(newItem, { status: 201 })
}

export async function PUT(request: Request) {
  const body = await request.json()
  try {
    const updated = await updateNewsItem(body.id, body)
    return NextResponse.json(updated)
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
  await deleteNewsItem(id)
  return NextResponse.json({ success: true })
}
