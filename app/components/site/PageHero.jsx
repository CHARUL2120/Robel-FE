import Image from 'next/image';

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  accent = 'Warm crafted surfaces'
}) {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-white/60 bg-[#e9dfd1] px-4 py-6 shadow-[0_26px_90px_-40px_rgba(37,27,16,0.45)] sm:rounded-[32px] sm:px-8 sm:py-10 lg:px-12 lg:py-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.85),_rgba(255,255,255,0.15)_45%,_transparent_75%)]" />
      <div className="absolute inset-y-0 right-0 w-full bg-gradient-to-r from-[#ede4d7]/20 via-transparent to-[#c8b29a]/30 lg:w-[48%]" />
      <div className="relative grid items-center gap-7 sm:gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5 sm:space-y-6">
          <span className="inline-flex rounded-full border border-white/60 bg-white/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7c6856] backdrop-blur sm:px-4 sm:text-[11px] sm:tracking-[0.28em]">
            {eyebrow}
          </span>
          <div className="space-y-3 sm:space-y-4">
            <h1 className="max-w-3xl font-heading text-[2.2rem] leading-[0.98] font-semibold tracking-[-0.05em] text-[#1f1915] sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-[#584f49] sm:text-base sm:leading-7">
              {description}
            </p>
          </div>
          <div className="inline-flex max-w-full rounded-full border border-white/60 bg-white/55 px-4 py-2 text-sm text-[#4d433c] backdrop-blur">
            {accent}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[30px] bg-gradient-to-br from-white/40 via-transparent to-[#8f6d4f]/15 blur-2xl sm:-inset-6 sm:rounded-[34px]" />
          <div className="relative overflow-hidden rounded-[24px] border border-white/40 bg-white/20 shadow-[0_20px_60px_-28px_rgba(20,14,8,0.42)] backdrop-blur-xl sm:rounded-[28px]">
            <div className="relative aspect-[4/4.35] sm:aspect-[4/4.3]">
              <Image src={image} alt={title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
