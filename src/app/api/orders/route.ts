import { NextResponse } from 'next/server'
import { getOrders, addOrder, saveOrders } from '@/lib/data'

export async function GET() {
  const orders = getOrders()
  return NextResponse.json(orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
}

export async function POST(request: Request) {
  const body = await request.json()
  const order = addOrder({
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
  const orders = getOrders()
  const index = orders.findIndex((o) => o.id === body.id)
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  orders[index] = { ...orders[index], ...body }
  saveOrders(orders)
  return NextResponse.json(orders[index])
}
