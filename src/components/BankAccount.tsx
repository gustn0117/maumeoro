'use client'

import { useState } from 'react'
import { BANK_ACCOUNT } from '@/lib/payment'

type CopyState = 'idle' | 'copied' | 'failed'

export default function BankAccount() {
  const [copyState, setCopyState] = useState<CopyState>('idle')

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(BANK_ACCOUNT.number)
      setCopyState('copied')
    } catch {
      // 브라우저가 복사를 막은 경우: 번호를 직접 선택해 복사하도록 안내한다
      setCopyState('failed')
    }
    setTimeout(() => setCopyState('idle'), 2500)
  }

  return (
    <dl className="rounded-lg bg-aloe border border-navy/10 divide-y divide-navy/10">
      <div className="flex items-center gap-4 px-4 py-3">
        <dt className="w-16 flex-shrink-0 text-sm font-semibold text-ink-soft">은행</dt>
        <dd className="font-medium text-navy">{BANK_ACCOUNT.bank}</dd>
      </div>
      <div className="flex items-center gap-4 px-4 py-3">
        <dt className="w-16 flex-shrink-0 text-sm font-semibold text-ink-soft">계좌번호</dt>
        <dd className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-lg font-bold text-navy tabular-nums">{BANK_ACCOUNT.number}</span>
          <button
            type="button"
            onClick={copyNumber}
            aria-live="polite"
            className="min-h-[36px] px-3.5 rounded-full border border-navy/25 bg-white text-sm font-semibold text-navy hover:border-navy transition-colors"
          >
            {copyState === 'copied' ? '복사됨' : '계좌번호 복사'}
          </button>
          {copyState === 'failed' && (
            <span className="w-full text-sm text-red-700">복사하지 못했습니다. 번호를 직접 선택해 복사해 주세요.</span>
          )}
        </dd>
      </div>
      <div className="flex items-center gap-4 px-4 py-3">
        <dt className="w-16 flex-shrink-0 text-sm font-semibold text-ink-soft">예금주</dt>
        <dd className="font-medium text-navy">{BANK_ACCOUNT.holder}</dd>
      </div>
    </dl>
  )
}
