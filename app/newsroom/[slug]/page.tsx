// app/newsroom/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCosmic } from '@/lib/cosmic-preview';
import {
  fetchAllNewsroomStories,
  fetchNewsroomStoryBySlug,
  getMetafieldValue,
} from '@/lib/cosmic';
import { formatDate } from '@/lib/utils';

export const revalidate = 60;

interface NewsroomStoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { cosmic, previewToken } = await getCosmic();
  const stories = await fetchAllNewsroomStories(cosmic, previewToken);
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({
  params,
}: NewsroomStoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { cosmic, previewToken } = await getCosmic();
  const story = await fetchNewsroomStoryBySlug(cosmic, slug, previewToken);

  if (!story) {
    return {
      title: 'Story Not Found | Stripe Newsroom',
    };
  }

  const seoTitle = getMetafieldValue(story.metadata?.seo_title) || story.title;
  const seoDescription = getMetafieldValue(story.metadata?.seo_description);
  const imageUrl = story.metadata?.featured_image?.imgix_url;

  return {
    title: `${seoTitle} | Stripe Newsroom`,
    description: seoDescription || undefined,
    openGraph: {
      title: seoTitle,
      description: seoDescription || undefined,
      images: imageUrl
        ? [`${imageUrl}?w=1200&h=630&fit=crop&auto=format,compress`]
        : undefined,
    },
  };
}

export default async function NewsroomStoryPage({
  params,
}: NewsroomStoryPageProps) {
  const { slug } = await params;
  const { cosmic, previewToken } = await getCosmic();
  const story = await fetchNewsroomStoryBySlug(cosmic, slug, previewToken);

  if (!story) {
    notFound();
  }

  const imageUrl = story.metadata?.featured_image?.imgix_url;
  const publishedAt =
    getMetafieldValue(story.metadata?.published_at) || story.created_at;
  const content = getMetafieldValue(story.metadata?.content);

  return (
    <article className="max-w-3xl mx-auto px-6 sm:px-8 py-16">
      <header className="mb-10">
        <time className="text-sm text-slate-400 uppercase tracking-wide">
          {formatDate(publishedAt)}
        </time>
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 mt-3 leading-tight">
          {story.title}
        </h1>
      </header>

      {imageUrl && (
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl mb-12 bg-slate-100">
          <img
            src={`${imageUrl}?w=2000&h=1125&fit=crop&auto=format,compress`}
            alt={story.title}
            width={1200}
            height={675}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {content && (
        <div
          className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-a:text-indigo-600 hover:prose-a:text-indigo-700"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </article>
  );
}