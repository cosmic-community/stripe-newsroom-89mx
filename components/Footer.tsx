import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-bold text-lg text-slate-900">
            <span className="w-2 h-2 rounded-full bg-gradient-to-br from-indigo-600 via-violet-600 to-teal-500" />
            Stripe Newsroom
          </div>
          <nav className="flex items-center gap-6 text-sm text-slate-500">
            <Link href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <Link
              href="/newsroom"
              className="hover:text-indigo-600 transition-colors"
            >
              All News
            </Link>
          </nav>
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Stripe Newsroom
          </p>
        </div>
      </div>
    </footer>
  );
}