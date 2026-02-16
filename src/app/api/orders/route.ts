import { NextResponse } from 'next/server'
import { getOrders, addOrder, updateOrder } from '@/lib/data'

export async function GET() {
  const orders = await getOrders()
  return NextResponse.json(orders)
}

export async function POST(request: Request) {
  const body = await request.json()
  const order = await addOrder({
    items: body.items,
    customer: body.customer,
    status: 'pending',
    totalAmount: body.totalAmount,
    userId: body.userId || undefined,
  })
  return NextResponse.json({ orderId: order.id }, { status: 201 })
}

export async function PUT(request: Request) {
  const body = await request.json()
  try {
    const updated = await updateOrder(body.id, body)
    return NextResponse.json(updated)
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}
