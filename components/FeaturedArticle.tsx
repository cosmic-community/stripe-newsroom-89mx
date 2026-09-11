import Link from 'next/link';
import { getMetafieldValue } from '@/lib/cosmic';
import { formatDate, truncateText } from '@/lib/utils';
import type { NewsroomStory } from '@/types';

interface FeaturedArticleProps {
  story: NewsroomStory;
}

export default function FeaturedArticle({ story }: FeaturedArticleProps) {
  const imageUrl = story.metadata?.featured_image?.imgix_url;
  const seoDescription = getMetafieldValue(story.metadata?.seo_description);
  const publishedAt =
    getMetafieldValue(story.metadata?.published_at) || story.created_at;

  return (
    <Link
      href={`/newsroom/${story.slug}`}
      className="group grid md:grid-cols-2 gap-8 lg:gap-12 items-center"
    >
      {imageUrl ? (
        <div className="relative overflow-hidden rounded-2xl aspect-[16/10] bg-slate-100">
          <img
            src={`${imageUrl}?w=1600&h=1000&fit=crop&auto=format,compress`}
            alt={story.title}
            width={800}
            height={500}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="rounded-2xl aspect-[16/10] bg-gradient-to-br from-indigo-100 via-violet-100 to-teal-100" />
      )}
      <div>
        <span className="inline-block text-xs font-semibold tracking-wide uppercase text-coral-500 mb-3">
          Featured
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">
          {story.title}
        </h2>
        {seoDescription && (
          <p className="text-slate-600 text-lg leading-relaxed mb-4">
            {truncateText(seoDescription, 220)}
          </p>
        )}
        {publishedAt && (
          <time className="text-sm text-slate-400">
            {formatDate(publishedAt)}
          </time>
        )}
      </div>
    </Link>
  );
}