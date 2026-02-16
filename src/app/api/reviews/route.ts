import { NextResponse } from 'next/server'
import { getReviews, getReviewsByProduct, getReviewsByUser, addReview, deleteReview } from '@/lib/data'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const productId = searchParams.get('productId')
  const userId = searchParams.get('userId')

  let reviews
  if (productId) {
    reviews = await getReviewsByProduct(productId)
  } else if (userId) {
    reviews = await getReviewsByUser(userId)
  } else {
    reviews = await getReviews()
  }

  return NextResponse.json(reviews)
}

export async function POST(request: Request) {
  const body = await request.json()
  const review = await addReview({
    productId: body.productId,
    userId: body.userId,
    userName: body.userName,
    rating: body.rating,
    comment: body.comment,
  })
  return NextResponse.json(review, { status: 201 })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
  await deleteReview(id)
  return NextResponse.json({ success: true })
}
