import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { createHmac } from 'crypto'

// Vérification de la signature HMAC-SHA256 envoyée par Sanity
function verifySignature(
  body: string,
  signature: string | null,
  secret: string
): boolean {
  if (!signature) return false
  try {
    const expected = createHmac('sha256', secret)
      .update(body)
      .digest('hex')
    return signature === expected
  } catch {
    return false
  }
}

type SanityWebhookPayload = {
  _type?: string
  slug?: { current?: string }
  pillar?: string
}

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_WEBHOOK_SECRET ?? ''
  const rawBody = await request.text()
  const signature = request.headers.get('sanity-webhook-signature')

  // En production, on vérifie toujours la signature
  if (process.env.NODE_ENV === 'production' && secret) {
    if (!verifySignature(rawBody, signature, secret)) {
      return NextResponse.json({ error: 'Signature invalide.' }, { status: 401 })
    }
  }

  let payload: SanityWebhookPayload
  try {
    payload = JSON.parse(rawBody) as SanityWebhookPayload
  } catch {
    return NextResponse.json({ error: 'Payload JSON invalide.' }, { status: 400 })
  }

  const type = payload._type
  const slug = payload.slug?.current
  const pillar = payload.pillar

  try {
    if (type === 'article' && slug && pillar) {
      // Revalider la page article spécifique
      revalidatePath(`/fr/${pillar}/${slug}`)
      revalidatePath(`/en/${pillar}/${slug}`)
      // Revalider aussi les pages pilier (liste d'articles)
      revalidatePath(`/fr/${pillar}`)
      revalidatePath(`/en/${pillar}`)
    } else if (type === 'reel') {
      revalidatePath('/fr/reels')
      revalidatePath('/en/reels')
    } else if (type === 'affiliateItem') {
      revalidatePath('/fr/bons-plans')
      revalidatePath('/en/bons-plans')
    } else if (type === 'siteConfig') {
      revalidatePath('/fr')
      revalidatePath('/en')
    } else {
      // Revalider toutes les pages par défaut
      revalidatePath('/', 'layout')
    }

    return NextResponse.json(
      { revalidated: true, type, slug, pillar },
      { status: 200 }
    )
  } catch (err) {
    console.error('[revalidate] Erreur lors de la revalidation:', err)
    return NextResponse.json(
      { error: 'Erreur de revalidation.' },
      { status: 500 }
    )
  }
}
