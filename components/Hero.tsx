const HERO_IMAGE =
  'https://imgix.cosmicjs.com/683025b0-ae18-11f1-b8e3-a1b51691e7d1-generated-1789155527473.jpg';

export default function Hero() {
  return (
    <section className="relative w-full h-[70vh] min-h-[520px] max-h-[820px] overflow-hidden">
      <img
        src={`${HERO_IMAGE}?w=2000&auto=format,compress`}
        srcSet={`${HERO_IMAGE}?w=1200&auto=format,compress 1200w, ${HERO_IMAGE}?w=2000&auto=format,compress 2000w, ${HERO_IMAGE}?w=2800&auto=format,compress 2800w`}
        sizes="100vw"
        alt="Stripe Newsroom hero background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />

      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <div className="max-w-2xl">
            <p className="text-teal-300 font-semibold tracking-wide uppercase text-sm mb-4">
              Press &amp; News
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Stripe Newsroom
            </h1>
            <p className="text-lg sm:text-xl text-slate-200 leading-relaxed max-w-xl">
              The latest news, product announcements, and stories from
              Stripe.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}