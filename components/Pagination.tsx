import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const prevPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(totalPages, currentPage + 1);

  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-2 mt-12"
      aria-label="Pagination"
    >
      <Link
        href={`${basePath}?page=${prevPage}`}
        aria-disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
          currentPage === 1
            ? 'pointer-events-none opacity-40 border-slate-200 text-slate-400'
            : 'border-slate-200 text-slate-700 hover:border-indigo-400 hover:text-indigo-600'
        }`}
      >
        Previous
      </Link>

      <div className="flex items-center gap-1 flex-wrap justify-center">
        {pages.map((pageNum) => (
          <Link
            key={pageNum}
            href={`${basePath}?page=${pageNum}`}
            aria-current={pageNum === currentPage ? 'page' : undefined}
            className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
              pageNum === currentPage
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {pageNum}
          </Link>
        ))}
      </div>

      <Link
        href={`${basePath}?page=${nextPage}`}
        aria-disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
          currentPage === totalPages
            ? 'pointer-events-none opacity-40 border-slate-200 text-slate-400'
            : 'border-slate-200 text-slate-700 hover:border-indigo-400 hover:text-indigo-600'
        }`}
      >
        Next
      </Link>
    </nav>
  );
}