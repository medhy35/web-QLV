import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID ?? ''

// Validation email simple (RFC 5322 basique)
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Corps de requête invalide.' }, { status: 400 })
  }

  const { email, locale } = body as { email?: string; locale?: string }
  const lang = locale === 'en' ? 'en' : 'fr'

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { error: lang === 'fr' ? 'Adresse email invalide.' : 'Invalid email address.' },
      { status: 400 }
    )
  }

  try {
    // Ajouter le contact à l'audience Resend
    if (AUDIENCE_ID) {
      await resend.contacts.create({
        email,
        audienceId: AUDIENCE_ID,
        unsubscribed: false,
      })
    }

    // Email de confirmation (double opt-in)
    await resend.emails.send({
      from: 'WanderBite <hello@wanderbite.com>',
      to: email,
      subject:
        lang === 'fr'
          ? 'Confirmez votre inscription à WanderBite'
          : 'Confirm your WanderBite subscription',
      html: getConfirmationEmail(lang),
    })

    return NextResponse.json(
      {
        success: true,
        message:
          lang === 'fr'
            ? 'Un email de confirmation vous a été envoyé.'
            : 'A confirmation email has been sent to you.',
      },
      { status: 200 }
    )
  } catch (err) {
    console.error('[newsletter] Resend error:', err)
    return NextResponse.json(
      {
        error:
          lang === 'fr'
            ? 'Une erreur est survenue. Réessayez plus tard.'
            : 'An error occurred. Please try again later.',
      },
      { status: 500 }
    )
  }
}

function getConfirmationEmail(lang: 'fr' | 'en'): string {
  const title =
    lang === 'fr'
      ? "Bienvenue dans l'univers WanderBite"
      : 'Welcome to the WanderBite world'
  const body =
    lang === 'fr'
      ? 'Merci de rejoindre notre communauté voyage & food. Vous recevrez bientôt nos derniers articles, bons plans et aventures culinaires.'
      : 'Thank you for joining our travel & food community. You will soon receive our latest articles, deals and culinary adventures.'
  const cta = lang === 'fr' ? 'Découvrir WanderBite' : 'Discover WanderBite'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wanderbite.com'

  return `<!DOCTYPE html>
<html lang="${lang}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0d0b09;font-family:serif">
  <div style="max-width:560px;margin:0 auto;padding:48px 24px">
    <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.3em;color:#c9a96e;margin-bottom:24px">
      WanderBite
    </p>
    <h1 style="font-size:32px;color:#faf9f6;line-height:1.3;margin-bottom:20px">${title}</h1>
    <p style="font-size:15px;color:rgba(250,249,246,0.6);line-height:1.7;margin-bottom:32px">${body}</p>
    <a href="${siteUrl}/${lang}"
       style="display:inline-block;padding:12px 32px;border:1px solid rgba(201,169,110,0.5);color:#c9a96e;font-size:11px;text-transform:uppercase;letter-spacing:0.25em;text-decoration:none">
      ${cta} →
    </a>
    <p style="margin-top:40px;font-size:11px;color:rgba(250,249,246,0.25)">
      ${lang === 'fr' ? 'Vous recevez cet email car vous vous êtes inscrit sur wanderbite.com' : 'You are receiving this email because you subscribed at wanderbite.com'}
    </p>
  </div>
</body>
</html>`
}
