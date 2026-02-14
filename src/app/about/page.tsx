import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

const values = [
  {
    number: '01',
    title: '합리적 비용',
    description: '유통 구조를 최적화하여 불필요한 중간 비용을 줄이고, 합리적인 가격으로 고품질 제품을 제공합니다.',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    number: '02',
    title: '검증된 품질',
    description: '유럽 CE 인증을 받은 제품, 국내 의료기기로 등록된 제품만을 엄선하여 공급합니다.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
  {
    number: '03',
    title: '현장 이해',
    description: '돌봄 현장에서 실제로 필요한 것이 무엇인지를 파악하고, 그에 맞는 제품과 서비스를 제안합니다.',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  },
  {
    number: '04',
    title: '지속적 파트너십',
    description: '일회성 판매가 아닌, 돌봄 기관과 보호자가 믿고 함께할 수 있는 장기적인 파트너가 되겠습니다.',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  },
]

const stats = [
  { number: '100+', label: '등록 제품', suffix: '종' },
  { number: '500+', label: '서비스 기관', suffix: '곳' },
  { number: 'CE', label: '유럽 인증', suffix: '' },
  { number: '98%', label: '고객 만족도', suffix: '' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero - Full visual */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/images/about-care.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-navy/30" />
        </div>
        {/* Decorative */}
        <div className="absolute -right-20 top-1/4 w-96 h-96 rounded-full bg-beige/10 blur-[120px]" />
        <div className="absolute -left-10 bottom-1/4 w-64 h-64 rounded-full bg-white/5 blur-[80px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
          <ScrollReveal direction="up">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-[1px] bg-beige" />
                <span className="text-beige font-medium text-sm tracking-[0.2em] uppercase">About Us</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-8">
                마음을 담아,
                <br />
                <span className="gradient-text">돌봄</span>을 더하다
              </h1>
              <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-lg">
                부모님을 돌보는 모든 분들께 합리적인 비용과
                신뢰할 수 있는 품질의 제품으로 함께합니다.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-beige text-navy px-7 py-3.5 rounded-full font-bold text-sm hover:bg-beige-light transition-all group"
                >
                  제품 둘러보기
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a
                  href="tel:010-6667-2314"
                  className="inline-flex items-center gap-2 border border-white/20 text-white px-7 py-3.5 rounded-full font-medium text-sm hover:bg-white/10 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  전화 상담
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll-hint">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] text-white/20 tracking-widest uppercase">Scroll</span>
            <div className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1.5">
              <span className="w-1 h-1.5 rounded-full bg-white/40 animate-bounce-slow" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Band */}
      <ScrollReveal direction="scale">
        <section className="relative -mt-16 z-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-elevated grid grid-cols-2 lg:grid-cols-4 divide-x divide-navy/5">
              {stats.map((stat, i) => (
                <div key={i} className="px-6 py-8 text-center group">
                  <p className="text-3xl md:text-4xl font-extrabold text-navy group-hover:text-beige transition-colors">
                    {stat.number}<span className="text-base font-medium text-navy/30">{stat.suffix}</span>
                  </p>
                  <p className="text-xs text-navy/40 mt-2 font-medium tracking-wider uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <ScrollReveal direction="left">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-[1px] bg-beige" />
                  <span className="text-beige text-xs tracking-[0.2em] uppercase font-semibold">Our Story</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-navy mb-8 leading-snug">
                  돌봄의 현실에<br />
                  <span className="text-beige">진심</span>으로 다가갑니다
                </h2>
                <div className="space-y-5 text-navy/65 leading-[1.9] text-[15px]">
                  <p>
                    부모님을 돌보는 일은 마음만으로 되는 일이 아니라는 걸 우리는 알고 있습니다.
                    시간도 필요하고, 체력도 필요하고, 무엇보다 꾸준함이 필요합니다.
                  </p>
                  <p>그래서 돌봄은 늘 현실과 마주합니다.</p>
                  <blockquote className="relative pl-6 py-4 border-l-[3px] border-beige bg-gradient-to-r from-beige/[0.04] to-transparent rounded-r-lg">
                    <p className="text-navy font-medium italic text-base">
                      &ldquo;좋은 제품을 쓰고 싶지만 부담은 줄이고 싶다.&rdquo;
                    </p>
                    <p className="text-navy font-medium italic text-base mt-1">
                      &ldquo;편하게 해드리고 싶지만 비용도 생각해야 한다.&rdquo;
                    </p>
                  </blockquote>
                  <p>
                    저희는 그 고민을 이해합니다.
                    가격만 낮춘 제품도, 이름값만 높은 제품도 선택하지 않습니다.
                    합리적인 비용으로, 실제로 도움이 되는 품질을 갖춘 제품만을 공급합니다.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="relative">
                {/* Main Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-elevated aspect-[4/5]">
                  <img
                    src="/images/about-care.jpg"
                    alt="마음으로 돌봄"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent" />
                </div>
                {/* Floating card */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-elevated p-5 max-w-[220px]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-beige/15 flex items-center justify-center">
                      <svg className="w-5 h-5 text-beige" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-navy">진심 돌봄</p>
                      <p className="text-[10px] text-navy/30">Since 2024</p>
                    </div>
                  </div>
                  <p className="text-xs text-navy/50 leading-relaxed">
                    돌봄 현장의 목소리에 귀 기울이며, 진정으로 필요한 제품을 공급합니다.
                  </p>
                </div>
                {/* Decorative dot pattern */}
                <div className="absolute -top-4 -right-4 w-24 h-24 opacity-20"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #B7A588 1px, transparent 1px)',
                    backgroundSize: '8px 8px',
                  }}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-warm-white relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-beige/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-navy/[0.02] blur-[80px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="w-8 h-[1px] bg-beige/40" />
                <span className="text-beige text-xs tracking-[0.2em] uppercase font-semibold">Our Values</span>
                <span className="w-8 h-[1px] bg-beige/40" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">마음으로의 약속</h2>
              <p className="text-navy/40 text-base max-w-md mx-auto">
                합리적인 가격, 검증된 품질, 현장 이해를 바탕으로 돌봄 현장에 진심을 전합니다.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <ScrollReveal key={value.number} direction="scale" delay={(index + 1) as 1 | 2 | 3 | 4}>
                <div className="bg-white rounded-2xl p-8 card-hover shadow-card group relative overflow-hidden">
                  {/* Accent top line */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-beige to-beige-light scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-beige/15 to-beige/5 flex items-center justify-center flex-shrink-0 group-hover:from-beige/25 group-hover:to-beige/10 transition-colors">
                      <svg className="w-6 h-6 text-beige" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={value.icon} />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-beige/40 text-xs font-bold tracking-widest">{value.number}</span>
                      </div>
                      <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-beige transition-colors">{value.title}</h3>
                      <p className="text-navy/55 leading-relaxed text-[15px]">{value.description}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal direction="left">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-[1px] bg-beige" />
                  <span className="text-beige text-xs tracking-[0.2em] uppercase font-semibold">Company</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">회사 정보</h2>
                <p className="text-navy/40 mb-10">마음으로의 기본 정보를 안내해 드립니다.</p>

                <div className="bg-warm-white rounded-2xl overflow-hidden">
                  <div className="divide-y divide-navy/5">
                    {[
                      { label: '상호명', value: '마음으로 (MAUMEORO)' },
                      { label: '사업자등록번호', value: '119-19-65629' },
                      { label: '업태 / 종목', value: '도소매업 / 의료기기판매업 외' },
                      { label: '주소', value: '서울특별시 관악구 장군봉54길 201호' },
                      { label: '전화번호', value: '010-6667-2314', isPhone: true },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center px-6 py-4 gap-4 hover:bg-white/60 transition-colors">
                        <span className="text-sm text-navy/35 font-semibold w-32 flex-shrink-0">{item.label}</span>
                        {item.isPhone ? (
                          <a href={`tel:${item.value}`} className="text-sm text-navy font-medium hover:text-beige transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <span className="text-sm text-navy font-medium">{item.value}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={1}>
              <div className="space-y-5">
                {/* Quick contact card */}
                <div className="relative bg-navy rounded-2xl p-8 overflow-hidden">
                  <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-beige/10 blur-[60px]" />
                  <div className="absolute -left-5 -bottom-5 w-24 h-24 rounded-full bg-white/5 blur-[40px]" />
                  <div className="relative">
                    <h3 className="text-white font-bold text-lg mb-2">상담이 필요하신가요?</h3>
                    <p className="text-white/40 text-sm mb-6">편하게 전화 주시면 친절하게 안내해 드리겠습니다.</p>
                    <a href="tel:010-6667-2314" className="inline-flex items-center gap-3 group">
                      <span className="w-12 h-12 rounded-full bg-beige/15 flex items-center justify-center group-hover:bg-beige/25 transition-colors">
                        <svg className="w-5 h-5 text-beige" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </span>
                      <div>
                        <p className="text-2xl font-extrabold text-white tracking-wider group-hover:text-beige-light transition-colors">010-6667-2314</p>
                        <p className="text-white/30 text-xs mt-0.5">평일 09:00 ~ 18:00</p>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="bg-warm-white rounded-2xl p-6 border border-navy/5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-beige/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-beige" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-navy mb-1">찾아오시는 길</p>
                      <p className="text-sm text-navy/50">서울특별시 관악구 장군봉54길 201호</p>
                      <p className="text-xs text-navy/30 mt-1">관악역 5번 출구에서 도보 10분</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Full-bleed CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/hero-2.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy/90 backdrop-blur-sm" />
        </div>
        <div className="absolute -right-20 top-0 w-80 h-80 rounded-full bg-beige/10 blur-[100px]" />
        <div className="absolute -left-10 bottom-0 w-60 h-60 rounded-full bg-white/5 blur-[80px]" />

        <ScrollReveal direction="up">
          <div className="relative py-20 md:py-28 text-center px-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-beige/40" />
              <span className="text-beige/60 text-xs tracking-[0.2em] uppercase font-semibold">Contact Us</span>
              <span className="w-8 h-[1px] bg-beige/40" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              마음으로와<br className="sm:hidden" /> 함께하고 싶으시다면
            </h2>
            <p className="text-white/40 text-base md:text-lg mb-10 max-w-md mx-auto">
              제품 카탈로그를 무료로 받아보시거나, 전화로 상담해 보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center gap-2 bg-beige text-navy px-9 py-4 rounded-full font-bold text-sm hover:bg-beige-light transition-all group shadow-lg shadow-beige/20"
              >
                카탈로그 요청하기
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="tel:010-6667-2314"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/20 text-white px-9 py-4 rounded-full hover:bg-white/10 transition-all font-medium text-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                전화 문의하기
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}
