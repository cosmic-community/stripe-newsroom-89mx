import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-32 text-center">
      <p className="text-teal-600 font-semibold uppercase tracking-wide text-sm mb-4">
        404
      </p>
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
        Story not found
      </h1>
      <p className="text-slate-600 mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}