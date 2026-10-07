'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import PageHeader from '@/components/PageHeader'

interface Product {
  id: string
  name: string
  nameKo: string
  category: string
  price: number
  description: string
  image: string
  inStock: boolean
}

const categories = [
  { value: 'all', label: '전체' },
  { value: 'bath', label: '목욕·세정' },
  { value: 'hygiene', label: '배뇨·위생' },
  { value: 'disinfect', label: '소독·감염관리' },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()

  useEffect(() => {
    // 홈의 카테고리 카드(/products?category=bath 등)로 들어온 경우 해당 탭을 연다
    const requested = new URLSearchParams(window.location.search).get('category')
    if (requested && categories.some((c) => c.value === requested)) {
      setActiveCategory(requested)
    }

    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => { setProducts(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory)

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      productId: product.id,
      nameKo: product.nameKo,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  return (
    <>
      {/* Hero */}
      <PageHeader
        title="제품소개"
        description="유럽에서 검증된 프리미엄 목욕·세정용품을 합리적인 가격으로 만나보세요."
      />

      {/* Category Filter */}
      <section className="sticky top-[70px] z-30 bg-white/95 border-b border-navy/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 py-0 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`relative px-5 py-4 text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.value
                    ? 'text-navy'
                    : 'text-ink-mute hover:text-ink-soft'
                }`}
              >
                {cat.label}
                {activeCategory === cat.value && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[2px] bg-beige rounded-full" />
                )}
              </button>
            ))}
            <span className="ml-auto text-xs text-ink-mute py-4">{filtered.length}개 제품</span>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i}>
                  <div className="aspect-square bg-navy/5 rounded-xl mb-4 skeleton-shimmer" />
                  <div className="h-4 bg-navy/5 rounded w-3/4 mb-2 skeleton-shimmer" />
                  <div className="h-3 bg-navy/5 rounded w-1/2 skeleton-shimmer" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto rounded-xl bg-navy/5 flex items-center justify-center mb-5">
                <svg className="w-10 h-10 text-navy/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p className="text-ink-mute text-lg">해당 카테고리에 제품이 없습니다.</p>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                {filtered.map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`} className="group card-hover-lift">
                    <div className="relative rounded-xl overflow-hidden aspect-square bg-aloe mb-4 shadow-line transition-all duration-300 group-hover:shadow-raised">
                      <img
                        src={product.image}
                        alt={product.nameKo}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      {!product.inStock && (
                        <div className="absolute top-3 left-3 bg-navy/80 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                          품절
                        </div>
                      )}
                      {product.inStock && (
                        <button
                          onClick={(e) => handleAddToCart(e, product)}
                          className="absolute bottom-3 right-3 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-ink-soft hover:text-beige-deep transition-all opacity-0 group-hover:opacity-100"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                      )}
                    </div>
                    <div>
                      <span className="text-xs text-beige-deep font-semibold">
                        {categories.find((c) => c.value === product.category)?.label}
                      </span>
                      <h3 className="text-[15px] font-bold text-navy group-hover:text-beige-deep transition-colors mt-1 leading-snug">
                        {product.nameKo}
                      </h3>
                      <p className="text-xs text-ink-mute mt-0.5">{product.name}</p>
                      <p className="text-sm font-bold text-navy mt-2">
                        ₩{product.price.toLocaleString('ko-KR')}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
