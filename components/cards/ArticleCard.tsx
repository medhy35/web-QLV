import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'

type Article = {
  _id: string
  title: { fr: string; en?: string }
  slug: { current: string }
  pillar: 'voyage' | 'food'
  tags?: string[]
  publishedAt: string
  coverImage: Record<string, unknown> | null
  excerpt?: { fr?: string; en?: string }
}

type Props = {
  article: Article
  locale: string
  size?: 'large' | 'small'
}

export default function ArticleCard({ article, locale, size = 'small' }: Props) {
  const title = locale === 'en' && article.title.en ? article.title.en : article.title.fr
  const excerpt =
    locale === 'en' && article.excerpt?.en ? article.excerpt.en : article.excerpt?.fr
  const href = `/${locale}/${article.pillar}/${article.slug.current}`
  const imgW = size === 'large' ? 800 : 400
  const imgH = size === 'large' ? 500 : 300
  const pillarColor = article.pillar === 'voyage' ? 'text-[#7ec87e]' : 'text-[#f5c07a]'

  return (
    <Link href={href} className="group block overflow-hidden rounded-sm">
      <div
        className={`relative overflow-hidden ${
          size === 'large' ? 'aspect-[16/10]' : 'aspect-[4/3]'
        }`}
      >
        {article.coverImage && (
          <Image
            src={urlFor(article.coverImage as Parameters<typeof urlFor>[0]).width(imgW).height(imgH).url()}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes={
              size === 'large'
                ? '(max-width: 768px) 100vw, 66vw'
                : '(max-width: 768px) 100vw, 33vw'
            }
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b09]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span
          className={`absolute top-3 left-3 text-xs uppercase tracking-widest font-medium ${pillarColor}`}
        >
          {article.pillar}
        </span>
      </div>

      <div className="bg-[#faf9f6] pt-4 pb-5 px-1">
        <h3
          className={`font-serif text-[#1c1917] ${
            size === 'large' ? 'text-2xl' : 'text-lg'
          } leading-snug group-hover:text-[#c9a96e] transition-colors mb-2`}
        >
          {title}
        </h3>
        {excerpt && (
          <p className="text-[#3d3330] text-sm leading-relaxed line-clamp-2">{excerpt}</p>
        )}
        <p className="text-xs text-[#3d3330]/50 mt-3">
          {new Date(article.publishedAt).toLocaleDateString(
            locale === 'fr' ? 'fr-FR' : 'en-US',
            { day: 'numeric', month: 'long', year: 'numeric' }
          )}
        </p>
      </div>
    </Link>
  )
}
