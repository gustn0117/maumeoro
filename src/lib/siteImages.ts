// 관리자 '이미지 관리'에서 교체할 수 있는 이미지 자리.
// 자리를 늘리려면 여기에 추가하고, 그 자리를 쓰는 화면에서 images[key]를 읽으면 된다.
export interface SiteImageSlot {
  key: string
  label: string
  where: string
  // 올린 이미지가 없을 때 보이는 기본 이미지. 없으면 글자 판이 나온다.
  fallback?: string
}

export const SITE_IMAGE_SLOTS: SiteImageSlot[] = [
  { key: 'banner-main', label: '홈 배너 1', where: '마음을 담아, 돌봄을 더하다', fallback: '/images/hero-3.jpg' },
  { key: 'banner-hygiene', label: '홈 배너 2', where: '배뇨·위생' },
  { key: 'banner-bath', label: '홈 배너 3', where: '목욕·세정' },
  { key: 'banner-disinfect', label: '홈 배너 4', where: '소독·감염관리' },
  { key: 'banner-material', label: '홈 배너 5', where: '원료' },
  { key: 'about-story', label: '회사소개 사진', where: '돌봄의 현실에 진심으로 다가갑니다', fallback: '/images/about-care.jpg' },
]

// 자리 이름 -> 올린 이미지 주소
export type SiteImages = Record<string, string>

export const SITE_IMAGE_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
}
export const SITE_IMAGE_MAX_BYTES = 5 * 1024 * 1024
