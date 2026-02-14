import { NextResponse } from 'next/server'
import { getProducts, saveProducts, Product } from '@/lib/data'

export async function GET() {
  const products = getProducts()
  return NextResponse.json(products)
}

export async function POST(request: Request) {
  const body = await request.json()
  const products = getProducts()
  const newProduct: Product = {
    id: String(Date.now()),
    name: body.name || '',
    nameKo: body.nameKo || '',
    category: body.category || 'bath',
    price: body.price || 0,
    description: body.description || '',
    detail: body.detail || '',
    features: body.features || [],
    image: body.image || '/images/product-bath.jpg',
    inStock: body.inStock !== false,
    createdAt: new Date().toISOString().split('T')[0],
  }
  products.push(newProduct)
  saveProducts(products)
  return NextResponse.json(newProduct, { status: 201 })
}

export async function PUT(request: Request) {
  const body = await request.json()
  const products = getProducts()
  const index = products.findIndex((p) => p.id === body.id)
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  products[index] = { ...products[index], ...body }
  saveProducts(products)
  return NextResponse.json(products[index])
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
  let products = getProducts()
  products = products.filter((p) => p.id !== id)
  saveProducts(products)
  return NextResponse.json({ success: true })
}
