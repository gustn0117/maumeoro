import { NextResponse } from 'next/server'
import { getReviews, getReviewsByProduct, getReviewsByUser, addReview, saveReviews } from '@/lib/data'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const productId = searchParams.get('productId')
  const userId = searchParams.get('userId')

  let reviews
  if (productId) {
    reviews = getReviewsByProduct(productId)
  } else if (userId) {
    reviews = getReviewsByUser(userId)
  } else {
    reviews = getReviews()
  }

  return NextResponse.json(reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
}

export async function POST(request: Request) {
  const body = await request.json()
  const review = addReview({
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
  let reviews = getReviews()
  reviews = reviews.filter((r) => r.id !== id)
  saveReviews(reviews)
  return NextResponse.json({ success: true })
}
