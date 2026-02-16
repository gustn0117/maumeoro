import { NextResponse } from 'next/server'
import { getProducts, addProduct, updateProduct, deleteProduct } from '@/lib/data'

export async function GET() {
  const products = await getProducts()
  return NextResponse.json(products)
}

export async function POST(request: Request) {
  const body = await request.json()
  const product = await addProduct({
    name: body.name || '',
    nameKo: body.nameKo || '',
    category: body.category || 'bath',
    price: body.price || 0,
    description: body.description || '',
    detail: body.detail || '',
    features: body.features || [],
    image: body.image || '/images/product-bath.jpg',
    inStock: body.inStock !== false,
  })
  return NextResponse.json(product, { status: 201 })
}

export async function PUT(request: Request) {
  const body = await request.json()
  try {
    const updated = await updateProduct(body.id, body)
    return NextResponse.json(updated)
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
  await deleteProduct(id)
  return NextResponse.json({ success: true })
}
