import { NextResponse } from 'next/server'
import { getFAQ, saveFAQ } from '@/lib/data'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const all = searchParams.get('all')

  let faq = getFAQ()
  if (all !== 'true') {
    faq = faq.filter((item) => item.published)
  }
  faq.sort((a, b) => a.order - b.order)

  return NextResponse.json(faq)
}

export async function POST(request: Request) {
  const body = await request.json()
  const faq = getFAQ()
  const newItem = {
    id: `FAQ-${Date.now()}`,
    question: body.question || '',
    answer: body.answer || '',
    category: body.category || 'general',
    order: body.order ?? faq.length,
    published: body.published !== false,
    createdAt: new Date().toISOString(),
  }
  faq.push(newItem)
  saveFAQ(faq)
  return NextResponse.json(newItem, { status: 201 })
}

export async function PUT(request: Request) {
  const body = await request.json()
  const faq = getFAQ()
  const index = faq.findIndex((item) => item.id === body.id)
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  faq[index] = { ...faq[index], ...body }
  saveFAQ(faq)
  return NextResponse.json(faq[index])
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
  let faq = getFAQ()
  faq = faq.filter((item) => item.id !== id)
  saveFAQ(faq)
  return NextResponse.json({ success: true })
}
