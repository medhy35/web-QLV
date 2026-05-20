'use client'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { parseHeadline } from '@/lib/parseHeadline'

type Props = {
  headline: string
  sub?: string
}

export default function HeroSection({ headline, sub }: Props) {
  const t = useTranslations('hero')
  const locale = useLocale()

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-[#0d0b09] grain">
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0b09]/30 via-[#0d0b09]/50 to-[#0d0b09]/80" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Surtitre */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs text-[#c9a96e]/70 uppercase tracking-[0.3em] mb-6"
        >
          Travel · Food · Culture
        </motion.p>

        {/* Headline avec italique doré */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#faf9f6] leading-tight text-balance"
        >
          {parseHeadline(headline)}
        </motion.h1>

        {/* Sous-titre */}
        {sub && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 text-[#faf9f6]/70 text-lg max-w-lg mx-auto leading-relaxed"
          >
            {sub}
          </motion.p>
        )}

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
        >
          <Link
            href={`/${locale}/voyage`}
            className="px-8 py-3.5 bg-[#7ec87e]/20 border border-[#7ec87e]/40 text-[#7ec87e] hover:bg-[#7ec87e] hover:text-[#0d0b09] transition-all duration-300 text-sm uppercase tracking-widest font-medium"
          >
            {t('ctaVoyage')}
          </Link>
          <Link
            href={`/${locale}/food`}
            className="px-8 py-3.5 bg-[#f5c07a]/20 border border-[#f5c07a]/40 text-[#f5c07a] hover:bg-[#f5c07a] hover:text-[#0d0b09] transition-all duration-300 text-sm uppercase tracking-widest font-medium"
          >
            {t('ctaFood')}
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[#faf9f6]/30 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#faf9f6]/30 to-transparent" />
      </motion.div>
    </section>
  )
}
