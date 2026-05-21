import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { routing } from '@/i18n/routing'
import { client } from '@/lib/sanity/client'
import { POPUP_QUERY } from '@/lib/sanity/queries'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import PopupBanner, { type PopupData } from '@/components/ui/PopupBanner'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wanderbite.com'
  return {
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        fr: `${baseUrl}/fr`,
        en: `${baseUrl}/en`,
        'x-default': `${baseUrl}/fr`,
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'fr' | 'en')) {
    notFound()
  }

  const [messages, popup] = await Promise.all([
    getMessages(),
    client
      .fetch(POPUP_QUERY, {}, { next: { revalidate: 60 } })
      .catch(() => null) as Promise<PopupData | null>,
  ])

  return (
    <NextIntlClientProvider messages={messages}>
      {/* Popup global — visible sur toutes les pages si actif */}
      {popup?.active && <PopupBanner data={popup} locale={locale} />}
      <Nav />
      <main>{children}</main>
      <Footer />
    </NextIntlClientProvider>
  )
}
