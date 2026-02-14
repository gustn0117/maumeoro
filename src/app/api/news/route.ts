import { NextResponse } from 'next/server'
import { getNews, saveNews, NewsItem } from '@/lib/data'

export async function GET() {
  const news = getNews()
  return NextResponse.json(news.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
}

export async function POST(request: Request) {
  const body = await request.json()
  const news = getNews()
  const newItem: NewsItem = {
    id: String(Date.now()),
    title: body.title || '',
    content: body.content || '',
    category: body.category || 'notice',
    date: body.date || new Date().toISOString().split('T')[0],
    published: body.published !== false,
  }
  news.push(newItem)
  saveNews(news)
  return NextResponse.json(newItem, { status: 201 })
}

export async function PUT(request: Request) {
  const body = await request.json()
  const news = getNews()
  const index = news.findIndex((n) => n.id === body.id)
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  news[index] = { ...news[index], ...body }
  saveNews(news)
  return NextResponse.json(news[index])
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
  let news = getNews()
  news = news.filter((n) => n.id !== id)
  saveNews(news)
  return NextResponse.json({ success: true })
}
