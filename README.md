# Stripe Newsroom

![App Preview](https://imgix.cosmicjs.com/683025b0-ae18-11f1-b8e3-a1b51691e7d1-generated-1789155527473.jpg?w=1200&h=630&fit=crop&auto=format,compress)

A Stripe-style newsroom / press site built with Next.js and Cosmic. Full-bleed hero, featured story, paginated news archive, and rich editorial article pages — all powered by your existing `newsroom` content.

## Features

- 🖼️ Full-bleed hero section with responsive imgix background image
- ⭐ Featured article spotlight on the homepage
- 📰 Paginated newsroom archive sorted by publish date
- 📄 Article detail pages with rich-text content and SEO metadata
- ⚡ Static rendering with ISR revalidation
- ♿ Accessible, fully responsive design
- 🎨 Modern fintech-editorial design system (indigo, violet, teal, coral)

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=6aa4580080b36d6460387ef7&clone_repository=6aa45a4380b36d6460387f08)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built from existing content structure

### Code Generation Prompt

> Build a Next.js application for a company website called "Stripe Newsroom". The content is managed in Cosmic CMS with the following object types: newsroom. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A Stripe-style newsroom / press site built on the existing "newsroom" object type (98 objects). Pages: (1) Home — a full-bleed hero section that uses this exact image as its background: https://imgix.cosmicjs.com/683025b0-ae18-11f1-b8e3-a1b51691e7d1-generated-1789155527473.jpg — render it via next/image or a CSS background-image with the headline and subhead on the left over the generous negative space, subtle dark-to-transparent overlay for text contrast, fully responsive (use imgix params like ?w=2000&auto=format,compress). Below the hero: a featured article, then a paginated grid of newsroom stories showing featured_image, title, published_at, and an excerpt from seo_description. (2) Article detail page at /newsroom/[slug] rendering the rich-text `content` field with clean editorial typography, featured_image as a header image, published_at date, and SEO metadata from seo_title / seo_description via Next.js generateMetadata. (3) A simple archive/index listing all stories sorted by published_at descending.
>
> Design: clean, modern fintech editorial aesthetic matching the hero image palette (indigo, violet, teal, warm coral accents on off-white). Lots of whitespace, generous type scale, sticky minimal header with logo text and nav, footer with links. Tailwind CSS, Next.js App Router, fully responsive, accessible (alt text from the media records), fast static rendering with revalidation.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) with `@tailwindcss/typography`
- [Cosmic](https://www.cosmicjs.com) for content management

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed
- A Cosmic account with a bucket containing a `newsroom` object type

### Installation

```bash
bun install
```

Set the following environment variables (automatically provided by the Cosmic dashboard when deployed):

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

Run the development server:

```bash
bun run dev
```

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all newsroom stories
const { objects } = await cosmic.objects
  .find({ type: 'newsroom' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)

// Fetch a single story by slug
const { object } = await cosmic.objects
  .findOne({ type: 'newsroom', slug: 'my-story-slug' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This app reads from the `newsroom` object type, which includes:

- `seo_title` — used for page `<title>` via `generateMetadata`
- `seo_description` — used for meta description and article excerpts
- `featured_image` — header image on article pages and thumbnail on cards
- `published_at` — sort key and display date
- `content` — rich-text HTML rendered with editorial typography

Learn more about querying content in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel

1. Push this repository to GitHub
2. Import the project in [Vercel](https://vercel.com/)
3. Add the `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, and `COSMIC_WRITE_KEY` environment variables
4. Deploy

### Netlify

1. Push this repository to GitHub
2. Import the project in [Netlify](https://www.netlify.com/)
3. Set build command to `bun run build` and publish directory to `.next`
4. Add the environment variables listed above
5. Deploy
<!-- README_END -->