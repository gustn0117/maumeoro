import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getSiteImages, setSiteImage, clearSiteImage } from '@/lib/data'
import { SITE_IMAGE_SLOTS, SITE_IMAGE_TYPES, SITE_IMAGE_MAX_BYTES } from '@/lib/siteImages'

// 항상 DB의 현재 값을 읽는다 (빌드 시점에 고정되지 않도록)
export const dynamic = 'force-dynamic'

const BUCKET = 'maeum-products'

const isSlot = (slot: unknown): slot is string =>
  typeof slot === 'string' && SITE_IMAGE_SLOTS.some((s) => s.key === slot)

export async function GET() {
  try {
    return NextResponse.json(await getSiteImages())
  } catch {
    return NextResponse.json({ error: '이미지 목록을 불러오지 못했습니다.' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const slot = formData.get('slot')
    const file = formData.get('file') as File | null

    if (!isSlot(slot)) {
      return NextResponse.json({ error: '알 수 없는 이미지 자리입니다.' }, { status: 400 })
    }
    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: '파일이 필요합니다.' }, { status: 400 })
    }
    const ext = SITE_IMAGE_TYPES[file.type]
    if (!ext) {
      return NextResponse.json({ error: 'JPG, PNG, WebP 이미지만 올릴 수 있습니다.' }, { status: 400 })
    }
    if (file.size > SITE_IMAGE_MAX_BYTES) {
      return NextResponse.json({ error: '이미지는 5MB 이하만 올릴 수 있습니다.' }, { status: 400 })
    }

    // 같은 주소를 덮어쓰면 브라우저에 옛 이미지가 남으므로 올릴 때마다 새 이름을 쓴다
    const path = `site/${slot}-${Date.now()}.${ext}`
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(path, Buffer.from(await file.arrayBuffer()), { contentType: file.type, upsert: false })
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const url = supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl
    await setSiteImage(slot, url)
    return NextResponse.json({ slot, url })
  } catch {
    return NextResponse.json({ error: '이미지를 올리지 못했습니다.' }, { status: 500 })
  }
}

// 올린 이미지를 빼고 기본 이미지로 되돌린다 (파일 자체는 지우지 않는다)
export async function DELETE(request: Request) {
  const slot = new URL(request.url).searchParams.get('slot')
  if (!isSlot(slot)) {
    return NextResponse.json({ error: '알 수 없는 이미지 자리입니다.' }, { status: 400 })
  }
  try {
    await clearSiteImage(slot)
    return NextResponse.json({ slot })
  } catch {
    return NextResponse.json({ error: '기본 이미지로 되돌리지 못했습니다.' }, { status: 500 })
  }
}
