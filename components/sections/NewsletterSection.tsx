'use client'
import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'

export default function NewsletterSection() {
  const t = useTranslations('newsletter')
  const locale = useLocale()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="bg-[#faf9f6] py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-8 h-px bg-[#c9a96e]" />
          <p className="text-xs text-[#c9a96e] uppercase tracking-[0.25em]">Newsletter</p>
          <div className="w-8 h-px bg-[#c9a96e]" />
        </div>
        <h2 className="font-serif text-4xl text-[#1c1917] mb-4">{t('title')}</h2>
        <p className="text-[#3d3330] mb-8 leading-relaxed">{t('subtitle')}</p>

        {status === 'success' ? (
          <p className="text-[#7ec87e] font-medium">{t('success')}</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('placeholder')}
              className="flex-1 px-4 py-3 bg-white border border-[#1c1917]/20 text-[#1c1917] placeholder-[#1c1917]/40 focus:outline-none focus:border-[#c9a96e] text-sm"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3 bg-[#0d0b09] text-[#c9a96e] border border-[#0d0b09] text-xs uppercase tracking-widest hover:bg-[#c9a96e] hover:text-[#0d0b09] transition-all duration-300 disabled:opacity-50"
            >
              {status === 'loading' ? '…' : t('cta')}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="text-red-500 text-sm mt-3">{t('error')}</p>
        )}
        <p className="text-xs text-[#3d3330]/50 mt-4">{t('consent')}</p>
      </div>
    </section>
  )
}
