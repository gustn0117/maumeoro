import { NextResponse } from 'next/server'
import { getFAQ, addFAQItem, updateFAQItem, deleteFAQItem } from '@/lib/data'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const all = searchParams.get('all')

  let faq = await getFAQ()
  if (all !== 'true') {
    faq = faq.filter((item) => item.published)
  }

  return NextResponse.json(faq)
}

export async function POST(request: Request) {
  const body = await request.json()
  const allFaq = await getFAQ()
  const newItem = await addFAQItem({
    question: body.question || '',
    answer: body.answer || '',
    category: body.category || 'general',
    order: body.order ?? allFaq.length,
    published: body.published !== false,
  })
  return NextResponse.json(newItem, { status: 201 })
}

export async function PUT(request: Request) {
  const body = await request.json()
  try {
    const updated = await updateFAQItem(body.id, body)
    return NextResponse.json(updated)
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
  await deleteFAQItem(id)
  return NextResponse.json({ success: true })
}
