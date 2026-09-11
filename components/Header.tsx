import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg sm:text-xl text-slate-900"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-indigo-600 via-violet-600 to-teal-500" />
            Stripe Newsroom
          </Link>
          <nav className="flex items-center gap-6 sm:gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/newsroom"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              All News
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}