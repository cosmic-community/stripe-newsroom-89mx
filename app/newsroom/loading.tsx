export default function NewsroomLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
      <div className="h-8 w-40 bg-slate-100 rounded mb-4 animate-pulse" />
      <div className="h-10 w-64 bg-slate-100 rounded mb-12 animate-pulse" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col">
            <div className="aspect-[16/10] rounded-xl bg-slate-100 mb-4 animate-pulse" />
            <div className="h-5 w-full bg-slate-100 rounded mb-2 animate-pulse" />
            <div className="h-4 w-3/4 bg-slate-100 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}