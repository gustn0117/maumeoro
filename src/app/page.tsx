import Link from 'next/link'
import HeroBanner from '@/components/HeroBanner'
import { productCategories } from '@/lib/categories'
import { getProducts, getNews, Product, NewsItem } from '@/lib/data'

// 제품·소식을 요청 시점에 DB에서 읽는다 (빌드 시점에 고정되지 않도록)
export const dynamic = 'force-dynamic'

const strengths = [
  { label: '검증된 품질', sub: 'CE 인증 제품' },
  { label: '합리적 가격', sub: '유통 최적화' },
  { label: '진심 돌봄', sub: '맞춤 상담' },
  { label: '빠른 배송', sub: '전국 당일출고' },
]

const categoryLabels: Record<string, string> = Object.fromEntries(
  productCategories.map((c) => [c.value, c.label])
)

const newsCategoryLabels: Record<string, string> = {
  notice: '공지',
  product: '제품',
  guide: '안내',
}

const supplyPlaces = ['요양병원', '요양원', '복지관', '재가센터', '데이케어', '의료기관', '공공기관', '돌봄시설']

function Chevron() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
    </svg>
  )
}

async function loadHomeData(): Promise<{ products: Product[]; news: NewsItem[] }> {
  // DB가 응답하지 않아도 홈 화면은 떠야 하므로 각각 빈 목록으로 대체한다
  const [products, news] = await Promise.all([
    getProducts().catch(() => [] as Product[]),
    getNews().catch(() => [] as NewsItem[]),
  ])
  return {
    products: [...products].sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? '')).slice(0, 4),
    news: news.filter((n) => n.published).slice(0, 4),
  }
}

export default async function HomePage() {
  const { products, news } = await loadHomeData()

  return (
    <>
      <HeroBanner />

      {/* 강점 */}
      <section className="border-b border-navy/10">
        <dl className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">
          {strengths.map((s) => (
            <div key={s.label}>
              <dt className="text-lg font-bold text-navy">{s.label}</dt>
              <dd className="mt-0.5 text-ink-soft">{s.sub}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 카테고리 */}
      <section className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">어떤 용품을 찾으세요?</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">
            {productCategories.map((c) => (
              <Link
                key={c.value}
                href={`/products?category=${c.value}`}
                className="group flex flex-col justify-between min-h-[168px] rounded-xl bg-white shadow-line p-6 lg:p-7 card-hover"
              >
                <div>
                  <p lang="en" className="text-xs font-semibold text-beige-deep">{c.english}</p>
                  <h3 className="mt-1 text-2xl font-bold text-navy">{c.label}</h3>
                  <p className="mt-2 text-ink-soft">{c.description}</p>
                </div>
                <span className="mt-6 inline-flex items-center gap-1 font-semibold text-beige-deep group-hover:text-navy transition-colors">
                  제품 보기
                  <Chevron />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 보호자의 고민 */}
      <section className="bg-navy on-dark">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <p className="text-lg font-semibold text-beige-light">돌봄은 늘 현실과 마주합니다.</p>
          <blockquote className="mt-6 space-y-4 text-[1.625rem] leading-[1.4] sm:text-4xl sm:leading-[1.35] lg:text-[2.75rem] lg:leading-[1.3] font-bold text-white tracking-tight">
            <p>&ldquo;좋은 제품을 쓰고 싶지만 부담은 줄이고 싶다.&rdquo;</p>
            <p>&ldquo;편하게 해드리고 싶지만 비용도 생각해야 한다.&rdquo;</p>
          </blockquote>
          <p className="mt-10 text-lg sm:text-xl sm:leading-8 text-white/85 max-w-2xl">
            저희는 그 고민을 이해합니다. 가격만 낮춘 제품도, 이름값만 높은 제품도 선택하지 않습니다.
            합리적인 비용으로, 실제로 도움이 되는 품질을 갖춘 제품만을 공급합니다.
          </p>
          <Link href="/about" className="btn-ghost-light mt-8">회사소개 보기</Link>
        </div>
      </section>

      {/* 제품 */}
      {products.length > 0 && (
        <section className="py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">제품</h2>
              <Link href="/products" className="inline-flex items-center gap-1 min-h-[44px] font-semibold text-beige-deep hover:text-navy transition-colors">
                전체 제품 보기
                <Chevron />
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 lg:gap-x-6">
              {products.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`} className="group">
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-aloe shadow-line">
                    <img
                      src={product.image}
                      alt={product.nameKo}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {!product.inStock && (
                      <span className="absolute top-3 left-3 bg-navy text-white text-xs font-bold px-2.5 py-1 rounded-full">
                        품절
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm font-semibold text-beige-deep">{categoryLabels[product.category] ?? product.category}</p>
                  <h3 className="mt-0.5 text-lg font-bold text-navy group-hover:underline underline-offset-4">{product.nameKo}</h3>
                  <p className="mt-1 font-bold text-navy">₩{product.price.toLocaleString('ko-KR')}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 공지사항 */}
      {news.length > 0 && (
        <section className="bg-aloe py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">공지사항</h2>
              <Link href="/news" className="inline-flex items-center gap-1 min-h-[44px] font-semibold text-beige-deep hover:text-navy transition-colors">
                전체 보기
                <Chevron />
              </Link>
            </div>
            <ul className="mt-6 bg-white rounded-xl shadow-line divide-y divide-navy/10">
              {news.map((item) => (
                <li key={item.id}>
                  <Link href="/news" className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-5 sm:px-6 py-4 hover:bg-aloe/60 transition-colors">
                    <span className="flex items-center gap-3 sm:w-48 flex-shrink-0 text-sm text-ink-soft">
                      <time dateTime={item.date} className="tabular-nums">{item.date}</time>
                      <span className="badge badge-neutral">{newsCategoryLabels[item.category] ?? item.category}</span>
                    </span>
                    <span className="font-semibold text-navy">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 공급처 */}
      <section className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">돌봄이 이루어지는 곳에 공급합니다</h2>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {supplyPlaces.map((place) => (
              <li key={place} className="px-5 py-2.5 rounded-full bg-aloe font-semibold text-navy">
                {place}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
