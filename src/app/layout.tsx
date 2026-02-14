import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'

export const metadata: Metadata = {
  title: '마음으로 MAUMEORO | 합리적인 노인돌봄 용품 전문점',
  description: '합리적이고 편리한 노인돌봄 용품판매점 마음으로. 노인 및 장애인 돌봄 보호자를 위한 목욕·세정용품, 배뇨·위생용품, 소독·감염관리용품을 합리적인 가격으로 공급합니다.',
  keywords: '노인돌봄, 의료기기, 목욕용품, 세정용품, 위생용품, 소독용품, 마음으로',
  openGraph: {
    title: '마음으로 MAUMEORO',
    description: '합리적이고 편리한 노인돌봄 용품 전문점',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col overflow-x-hidden">
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
