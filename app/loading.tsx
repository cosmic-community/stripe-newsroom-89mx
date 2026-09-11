export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 flex items-center justify-center">
      <div
        className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}