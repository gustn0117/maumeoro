import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#243447',
        'navy-light': '#3A5068',
        'navy-deep': '#1A2938',
        beige: '#B7A588',
        'beige-light': '#D4C5A9',
        // 흰 바탕 위 글자용 베이지 (대비 5:1). 기본 beige는 글자로 쓰면 대비가 부족하다.
        'beige-deep': '#7D6B4E',
        // 보조 글자색. 흰색·aloe 바탕 모두에서 대비 4.5:1 이상.
        'ink-soft': '#566273',
        'ink-mute': '#636E7C',
        aloe: '#EDF3F0',
        'warm-white': '#FAF8F5',
        'warm-gray': '#F5F0EB',
      },
      fontFamily: {
        sans: [
          '"Pretendard Variable"',
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Apple SD Gothic Neo"',
          '"Noto Sans KR"',
          '"Malgun Gothic"',
          'sans-serif',
        ],
      },
      // 글자 크기는 globals.css의 변수로 정한다. 공개 페이지는 한 단계 크게,
      // 관리자(.admin-scope)는 Tailwind 기본값 그대로.
      fontSize: {
        xs: ['var(--text-xs)', { lineHeight: 'var(--leading-xs)' }],
        sm: ['var(--text-sm)', { lineHeight: 'var(--leading-sm)' }],
        base: ['var(--text-base)', { lineHeight: 'var(--leading-base)' }],
        lg: ['var(--text-lg)', { lineHeight: 'var(--leading-lg)' }],
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },
      boxShadow: {
        'soft': '0 2px 12px rgba(36, 52, 71, 0.04)',
        'card': '0 2px 24px rgba(36, 52, 71, 0.06)',
        'elevated': '0 8px 40px rgba(36, 52, 71, 0.1)',
        'card-hover': '0 12px 40px rgba(36, 52, 71, 0.12)',
        'glow-beige': '0 4px 20px rgba(183, 165, 136, 0.25)',
        // 공개 페이지 카드: 흐린 그림자 대신 또렷한 테두리선
        'line': '0 0 0 1px rgba(36, 52, 71, 0.12)',
        'raised': '0 0 0 1px rgba(36, 52, 71, 0.12), 0 10px 24px -12px rgba(36, 52, 71, 0.25)',
      },
    },
  },
  plugins: [],
}
export default config
