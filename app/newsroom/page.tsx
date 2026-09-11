import { getCosmic } from '@/lib/cosmic-preview';
import { fetchAllNewsroomStories } from '@/lib/cosmic';
import ArticleCard from '@/components/ArticleCard';
import Pagination from '@/components/Pagination';

export const revalidate = 60;

export const metadata = {
  title: 'All News | Stripe Newsroom',
  description:
    'Browse all press releases, product news, and stories from Stripe.',
};

const ITEMS_PER_PAGE = 9;

interface NewsroomArchivePageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function NewsroomArchivePage({
  searchParams,
}: NewsroomArchivePageProps) {
  const { page } = await searchParams;
  const requestedPage = Math.max(1, parseInt(page || '1', 10) || 1);

  const { cosmic, previewToken } = await getCosmic();
  const stories = await fetchAllNewsroomStories(cosmic, previewToken);

  const totalPages = Math.max(1, Math.ceil(stories.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(requestedPage, totalPages);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageStories = stories.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
      <header className="mb-12">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-600 mb-2">
          Newsroom
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
          All News
        </h1>
        <p className="text-slate-600 mt-3 max-w-2xl">
          The latest press releases, product announcements, and stories from
          Stripe, updated regularly.
        </p>
      </header>

      {pageStories.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {pageStories.map((story) => (
            <ArticleCard key={story.id} story={story} />
          ))}
        </div>
      ) : (
        <p className="text-slate-500">No stories found.</p>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/newsroom"
      />
    </div>
  );
}