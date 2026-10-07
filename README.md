# 마음으로 (MAUMEORO) 홈페이지

합리적이고 편리한 노인돌봄 용품 전문점 홈페이지입니다.

## 시작하기

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 열어주세요.

### 3. 프로덕션 빌드
```bash
npm run build
npm start
```

## 페이지 구성

- **홈** (`/`) - 메인 페이지 (히어로, 카테고리 바로가기, 제품, 공지사항)
- **회사소개** (`/about`) - 회사 소개 및 정보
- **제품소개** (`/products`) - 제품 카테고리별 소개
- **카탈로그 요청** (`/catalog`) - 카탈로그 요청 양식
- **소식지** (`/news`) - 뉴스 및 공지사항

## 기술 스택

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Pretendard 폰트

## 제품 이미지 추가

`public/images/` 폴더에 제품 이미지를 추가하세요:
- `product-1.jpg` - Dispobaño Aloe Vera
- `product-2.jpg` - Dispoglove Aloe Vera
- `product-3.jpg` - Dispobaño Solución
- `product-4.jpg` - Dispobaño Gel-Shampoo

## 색상 팔레트

- 네이비: `#243447`
- 베이지: `#B7A588` (선·버튼용. 흰 바탕 글자에는 대비가 부족해 쓰지 않음)
- 짙은 베이지: `#7D6B4E` (흰 바탕 위 글자·링크용)
- 알로에: `#EDF3F0` (섹션 배경)
