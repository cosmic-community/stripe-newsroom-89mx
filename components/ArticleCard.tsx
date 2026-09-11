import Link from 'next/link';
import { getMetafieldValue } from '@/lib/cosmic';
import { formatDate, truncateText } from '@/lib/utils';
import type { NewsroomStory } from '@/types';

interface ArticleCardProps {
  story: NewsroomStory;
}

export default function ArticleCard({ story }: ArticleCardProps) {
  const imageUrl = story.metadata?.featured_image?.imgix_url;
  const seoDescription = getMetafieldValue(story.metadata?.seo_description);
  const publishedAt =
    getMetafieldValue(story.metadata?.published_at) || story.created_at;

  return (
    <Link href={`/newsroom/${story.slug}`} className="group flex flex-col">
      {imageUrl ? (
        <div className="relative overflow-hidden rounded-xl aspect-[16/10] mb-4 bg-slate-100">
          <img
            src={`${imageUrl}?w=800&h=500&fit=crop&auto=format,compress`}
            alt={story.title}
            width={400}
            height={250}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="rounded-xl aspect-[16/10] mb-4 bg-gradient-to-br from-indigo-100 via-violet-100 to-teal-100" />
      )}
      <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
        {story.title}
      </h3>
      {seoDescription && (
        <p className="text-slate-600 text-sm leading-relaxed mb-3 line-clamp-3">
          {truncateText(seoDescription, 140)}
        </p>
      )}
      {publishedAt && (
        <time className="text-xs text-slate-400 mt-auto">
          {formatDate(publishedAt)}
        </time>
      )}
    </Link>
  );
}