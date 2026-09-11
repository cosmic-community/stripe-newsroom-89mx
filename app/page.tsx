import Link from 'next/link';
import { getCosmic } from '@/lib/cosmic-preview';
import { fetchAllNewsroomStories } from '@/lib/cosmic';
import Hero from '@/components/Hero';
import FeaturedArticle from '@/components/FeaturedArticle';
import ArticleCard from '@/components/ArticleCard';

export const revalidate = 60;

export default async function Home() {
  const { cosmic, previewToken } = await getCosmic();
  const stories = await fetchAllNewsroomStories(cosmic, previewToken);

  const featured = stories.length > 0 ? stories[0] : undefined;
  const gridStories = stories.slice(1, 7);

  return (
    <div>
      <Hero />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
        {featured && (
          <section className="mb-20 pb-16 border-b border-slate-200">
            <FeaturedArticle story={featured} />
          </section>
        )}

        {gridStories.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Latest News
              </h2>
              <Link
                href="/newsroom"
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                View all news →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {gridStories.map((story) => (
                <ArticleCard key={story.id} story={story} />
              ))}
            </div>
          </section>
        )}

        {stories.length === 0 && (
          <p className="text-slate-500 text-center py-20">
            No newsroom stories yet. Check back soon.
          </p>
        )}
      </div>
    </div>
  );
}