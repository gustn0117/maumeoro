import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  db: { schema: 'maeum' },
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
  global: {
    // Next.js는 서버 화면에서 한 조회 결과를 디스크에 저장해 두고 계속 재사용한다.
    // 그러면 관리자에서 바꾼 내용이 다음 배포 전까지 화면에 나오지 않으므로, DB 조회는 저장하지 않게 한다.
    fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }),
  },
})
