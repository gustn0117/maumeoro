import PageHeader from '@/components/PageHeader'
import { PHONE, FAX, ADDRESS } from '@/lib/contact'

const values = [
  {
    title: '합리적 비용',
    description: '유통 구조를 최적화하여 불필요한 중간 비용을 줄이고, 합리적인 가격으로 고품질 제품을 제공합니다.',
  },
  {
    title: '검증된 품질',
    description: '유럽 CE 인증을 받은 제품, 국내 의료기기로 등록된 제품만을 엄선하여 공급합니다.',
  },
  {
    title: '현장 이해',
    description: '돌봄 현장에서 실제로 필요한 것이 무엇인지를 파악하고, 그에 맞는 제품과 서비스를 제안합니다.',
  },
  {
    title: '지속적 파트너십',
    description: '일회성 판매가 아닌, 돌봄 기관과 보호자가 믿고 함께할 수 있는 장기적인 파트너가 되겠습니다.',
  },
]

const stats = [
  { number: '100+', label: '등록 제품', suffix: '종' },
  { number: '500+', label: '서비스 기관', suffix: '곳' },
  { number: 'CE', label: '유럽 인증', suffix: '' },
  { number: '98%', label: '고객 만족도', suffix: '' },
]

// 인사말의 세 가지 핵심 약속
const greetingPromises = [
  {
    title: '삶의 자립을 돕는 돌봄 솔루션',
    description: '제약 없이 자유롭고 편안한 일상을 누릴 수 있도록 검증된 고품질 Care-Product를 공급합니다.',
  },
  {
    title: '신뢰 기반의 원료 공급',
    description: '엄격한 품질 관리를 거친 화장품 및 제약 원료를 통해 뷰티·바이오 산업 전반에 안전하고 혁신적인 가치를 제공합니다.',
  },
  {
    title: '지속 가능한 상생과 성장',
    description: '파트너사와 함께 성장하며, 사회적 책임을 다하는 리딩 기업으로 도약하겠습니다.',
  },
]

const companyInfo = [
  { label: '상호명', value: '마음으로 (MAUMEORO)' },
  { label: '사업자등록번호', value: '119-19-65629' },
  { label: '업태 / 종목', value: '도소매업 / 의료기기판매업 외' },
  { label: '주소', value: ADDRESS },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="회사소개"
        description="부모님을 돌보는 모든 분들께 합리적인 비용과 신뢰할 수 있는 품질의 제품으로 함께합니다."
      />

      {/* 인사말 */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-semibold text-beige-deep">인사말</h2>
          <p className="mt-3 text-3xl md:text-4xl font-bold text-navy leading-snug md:leading-snug tracking-tight">
            사람을 향한 기술,
            <br className="hidden sm:block" /> 건강한 삶을 위한 바이오 솔루션
            <br className="hidden sm:block" /> <span className="whitespace-nowrap">(주)마음으로입니다.</span>
          </p>

          <div className="mt-10 space-y-5 text-lg leading-8 text-ink-soft max-w-3xl">
            <p>
              안녕하십니까? <span className="whitespace-nowrap">(주)마음으로에</span> 따뜻한 관심과 신뢰를 보내주시는 고객 여러분께 깊은 감사를 드립니다.
            </p>
            <p>
              <span className="whitespace-nowrap">(주)마음으로는</span> 삶의 질을 높이는 돌봄용품 사업과 더불어, 피부와 건강의 근본을 다지는 화장품 및 제약 원료
              분야를 아우르며 한 단계 진화된 라이프 케어 솔루션을 제안합니다.
            </p>
            <p>저희는 끊임없는 열정과 까다로운 원료 선별을 통해 세 가지 핵심 약속을 실천합니다.</p>
          </div>

          <dl className="mt-8 max-w-4xl rounded-xl shadow-line divide-y divide-navy/10">
            {greetingPromises.map((promise) => (
              <div key={promise.title} className="flex flex-col md:flex-row gap-1 md:gap-6 px-5 sm:px-6 py-5">
                <dt className="text-lg font-bold text-navy md:w-64 flex-shrink-0">{promise.title}</dt>
                <dd className="text-ink-soft">{promise.description}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 space-y-5 text-lg leading-8 text-ink-soft max-w-3xl">
            <p>
              진정성 있는 기술과 마음으로 더 나은 내일을 만들어가는 <span className="whitespace-nowrap">(주)마음으로의</span> 앞날에 따뜻한 응원을 부탁드립니다.
            </p>
            <p className="font-bold text-navy">감사합니다.</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-navy/10">
        <dl className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse">
              <dt className="mt-1 text-ink-soft font-medium">{stat.label}</dt>
              <dd className="text-4xl md:text-5xl font-extrabold text-navy tracking-tight">
                {stat.number}
                {stat.suffix && <span className="ml-0.5 text-xl font-bold text-ink-soft">{stat.suffix}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <h2 className="text-3xl md:text-4xl font-bold text-navy leading-snug tracking-tight">
              돌봄의 현실에
              <br />
              진심으로 다가갑니다
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-8 text-ink-soft max-w-2xl">
              <p>
                부모님을 돌보는 일은 마음만으로 되는 일이 아니라는 걸 우리는 알고 있습니다.
                시간도 필요하고, 체력도 필요하고, 무엇보다 꾸준함이 필요합니다.
              </p>
              <p>그래서 돌봄은 늘 현실과 마주합니다.</p>
              <blockquote className="border-l-4 border-beige pl-5 py-1 space-y-1 text-xl leading-8 font-bold text-navy">
                <p>&ldquo;좋은 제품을 쓰고 싶지만 부담은 줄이고 싶다.&rdquo;</p>
                <p>&ldquo;편하게 해드리고 싶지만 비용도 생각해야 한다.&rdquo;</p>
              </blockquote>
              <p>
                저희는 그 고민을 이해합니다.
                가격만 낮춘 제품도, 이름값만 높은 제품도 선택하지 않습니다.
                합리적인 비용으로, 실제로 도움이 되는 품질을 갖춘 제품만을 공급합니다.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] lg:aspect-[4/5] rounded-2xl overflow-hidden bg-aloe">
              <img
                src="/images/about-care.jpg"
                alt="돌봄 상담 기록을 정리하는 모습"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-aloe py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-navy tracking-tight">마음으로의 약속</h2>
          <p className="mt-3 text-lg text-ink-soft max-w-2xl">
            합리적인 가격, 검증된 품질, 현장 이해를 바탕으로 돌봄 현장에 진심을 전합니다.
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            {values.map((value) => (
              <div key={value.title} className="border-t-2 border-navy pt-5">
                <h3 className="text-2xl font-bold text-navy">{value.title}</h3>
                <p className="mt-2 text-lg leading-8 text-ink-soft">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <h2 className="text-3xl md:text-4xl font-bold text-navy tracking-tight">회사 정보</h2>
            <dl className="mt-8 rounded-xl shadow-line divide-y divide-navy/10">
              {companyInfo.map((item) => (
                <div key={item.label} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-5 sm:px-6 py-4">
                  <dt className="text-sm font-semibold text-ink-soft sm:w-36 flex-shrink-0">{item.label}</dt>
                  <dd className="font-medium text-navy">{item.value}</dd>
                </div>
              ))}
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-5 sm:px-6 py-4">
                <dt className="text-sm font-semibold text-ink-soft sm:w-36 flex-shrink-0">전화번호</dt>
                <dd>
                  <a href={`tel:${PHONE}`} className="font-medium text-navy underline underline-offset-4 hover:text-beige-deep transition-colors">
                    {PHONE}
                  </a>
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-5 sm:px-6 py-4">
                <dt className="text-sm font-semibold text-ink-soft sm:w-36 flex-shrink-0">팩스</dt>
                <dd className="font-medium text-navy">{FAX}</dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-5 space-y-5">
            <div className="on-dark bg-navy rounded-xl p-7 sm:p-8">
              <h3 className="text-white text-xl font-bold">상담이 필요하신가요?</h3>
              <p className="mt-2 text-white/85">편하게 전화 주시면 친절하게 안내해 드리겠습니다.</p>
              <a href={`tel:${PHONE}`} className="mt-5 inline-block text-3xl font-extrabold text-white hover:text-beige-light transition-colors">
                {PHONE}
              </a>
              <p className="mt-1 text-sm text-white/85">평일 09:00 ~ 18:00</p>
            </div>

            <div className="rounded-xl shadow-line p-6">
              <h3 className="font-bold text-navy">찾아오시는 길</h3>
              <p className="mt-1 text-ink-soft">{ADDRESS}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
