export const HOMEPAGE_QUERY = `{
  "config": *[_type == "siteConfig"][0] {
    heroHeadline,
    heroSub,
    newsletterSubtitle,
    "featuredArticles": featuredArticles[]-> {
      _id, title, slug, pillar, tags, publishedAt, coverImage, excerpt
    }
  },
  "affiliates": *[_type == "affiliateItem" && featured == true] | order(_createdAt desc) [0...4] {
    _id, partner, name, url, destination, price, image
  }
}`

export const ARTICLES_QUERY = `*[_type == "article" && pillar == $pillar] | order(publishedAt desc) {
  _id, title, slug, pillar, tags, region, publishedAt, coverImage, excerpt
}`

export const ARTICLE_QUERY = `*[_type == "article" && slug.current == $slug][0] {
  _id, title, slug, pillar, tags, region, publishedAt, coverImage, excerpt, body,
  seoTitle, seoDescription
}`

export const RELATED_ARTICLES_QUERY = `*[_type == "article" && pillar == $pillar && slug.current != $slug] | order(publishedAt desc) [0...3] {
  _id, title, slug, pillar, tags, publishedAt, coverImage, excerpt
}`

export const REELS_QUERY = `*[_type == "reel"] | order(publishedAt desc) {
  _id, title, instagramUrl, account, pillar, tags, publishedAt, coverImage, stats, featured
}`

export const AFFILIATE_QUERY = `*[_type == "affiliateItem"] | order(_createdAt desc) {
  _id, partner, name, url, destination, price, image, featured
}`
