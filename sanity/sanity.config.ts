import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { article, affiliateBlock, pullQuote, practicalBox } from './schemaTypes/article'
import { reel } from './schemaTypes/reel'
import { affiliateItem } from './schemaTypes/affiliateItem'
import { siteConfig } from './schemaTypes/siteConfig'
import { popup } from './schemaTypes/popup'

export default defineConfig({
  name: 'wanderbite',
  title: 'WanderBite',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [article, affiliateBlock, pullQuote, practicalBox, reel, affiliateItem, siteConfig, popup],
  },
})
