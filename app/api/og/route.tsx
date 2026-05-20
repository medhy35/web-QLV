import { ImageResponse } from '@vercel/og'
import { client } from '@/lib/sanity/client'
import { ARTICLE_QUERY } from '@/lib/sanity/queries'
import { type NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug') ?? ''
  const locale = searchParams.get('locale') ?? 'fr'

  // Récupérer les données de l'article (optionnel — fallback si pas trouvé)
  let title = 'WanderBite'
  let pillar = ''

  try {
    const article = await client.fetch(ARTICLE_QUERY, { slug })
    if (article) {
      title =
        locale === 'en' && article.title?.en
          ? article.title.en
          : (article.title?.fr ?? 'WanderBite')
      pillar = article.pillar ?? ''
    }
  } catch {
    // Fallback silencieux
  }

  const pillarColor = pillar === 'food' ? '#f5c07a' : '#7ec87e'
  const pillarLabel =
    pillar === 'food'
      ? 'Food'
      : pillar === 'voyage'
        ? 'Voyage'
        : ''

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          width: '100%',
          height: '100%',
          backgroundColor: '#0d0b09',
          padding: '60px',
          fontFamily: 'serif',
        }}
      >
        {/* Ligne décorative */}
        <div
          style={{
            width: '48px',
            height: '2px',
            backgroundColor: '#c9a96e',
            marginBottom: '24px',
          }}
        />

        {/* Badge pilier */}
        {pillarLabel && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '16px',
            }}
          >
            <span
              style={{
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: pillarColor,
              }}
            >
              {pillarLabel}
            </span>
          </div>
        )}

        {/* Titre */}
        <div
          style={{
            fontSize: '56px',
            color: '#faf9f6',
            lineHeight: 1.15,
            maxWidth: '900px',
            marginBottom: '40px',
          }}
        >
          {title}
        </div>

        {/* Branding bas */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span
            style={{
              fontSize: '14px',
              color: '#c9a96e',
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
            }}
          >
            WanderBite
          </span>
          <span style={{ color: '#faf9f6', opacity: 0.2, fontSize: '14px' }}>
            —
          </span>
          <span
            style={{
              fontSize: '12px',
              color: '#faf9f6',
              opacity: 0.4,
            }}
          >
            Voyage &amp; Food
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
