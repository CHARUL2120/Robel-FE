const founders = [
  { name: 'Jigar Patel', initials: 'JP', tone: 'from-[#f0d7bf] via-[#d5af86] to-[#7b5739]' },
  { name: 'Bhargav Patel', initials: 'BP', tone: 'from-[#f4e2d4] via-[#c9a485] to-[#6f4f38]' },
  { name: 'Parth Patel', initials: 'PP', tone: 'from-[#efe7df] via-[#b89776] to-[#5d4633]' },
  { name: 'Patel 1', initials: 'P1', tone: 'from-[#f5dcc7] via-[#cfaa88] to-[#765741]' },
  { name: 'Patel 2', initials: 'P2', tone: 'from-[#f2e8df] via-[#d0b49a] to-[#6d5343]' }
];

export default function FounderShowcase() {
  return (
    <section className="container mx-auto px-4 pb-6 sm:px-6 lg:px-8 lg:pb-8">
      <div className="overflow-hidden rounded-[34px] border border-[#e4d7ca] bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(244,235,227,0.96))] px-4 py-8 shadow-[0_28px_90px_-44px_rgba(28,20,14,0.35)] sm:px-6 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-[#ddcdbc] bg-white/75 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#7e6d60] shadow-sm backdrop-blur sm:text-[11px]">
            Founders
          </span>
          <h2 className="mt-4 font-heading text-[2rem] font-semibold tracking-[-0.05em] text-[#1f1a17] sm:text-4xl lg:text-[2.8rem]">
            The people shaping Robel with a premium material-first vision
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#675b52] sm:text-base sm:leading-7">
            A refined founder row designed to feel editorial, polished, and aligned with the rest of the brand experience.
          </p>
        </div>

        <div className="no-scrollbar mt-8 overflow-x-auto pb-2">
          <div className="flex min-w-max gap-4 lg:grid lg:min-w-0 lg:grid-cols-5">
            {founders.map((founder) => (
              <article
                key={founder.name}
                className="group w-[220px] shrink-0 rounded-[28px] border border-white/70 bg-white/68 p-4 shadow-[0_22px_60px_-36px_rgba(27,19,14,0.28)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_90px_-40px_rgba(27,19,14,0.34)] sm:w-[240px] lg:w-auto"
              >
                <div className="relative overflow-hidden rounded-[24px] border border-white/55 bg-[#f6eee6] p-3">
                  <div className={`relative aspect-[4/5] overflow-hidden rounded-[20px] bg-gradient-to-br ${founder.tone}`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.36),transparent_42%),linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.24))]" />
                    <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 top-8 flex items-end justify-center">
                      <svg
                        viewBox="0 0 220 260"
                        className="h-[88%] w-[88%] text-white/72"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="110" cy="82" r="46" fill="currentColor" opacity="0.92" />
                        <path
                          d="M34 244c8-52 42-88 76-88s68 36 76 88"
                          fill="currentColor"
                          opacity="0.88"
                        />
                        <path
                          d="M66 244c5-30 24-52 44-52s39 22 44 52"
                          fill="#f8efe7"
                          opacity="0.2"
                        />
                      </svg>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end px-4 pb-5 text-center text-white">
                      <div className="mb-3 flex size-[4.5rem] items-center justify-center rounded-full border border-white/35 bg-white/12 text-2xl font-semibold tracking-[0.08em] backdrop-blur sm:size-20 sm:text-[1.8rem]">
                        {founder.initials}
                      </div>
                      <span className="rounded-full border border-white/20 bg-white/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.26em] text-white/90 backdrop-blur">
                        Founder
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-1 pt-4 text-center">
                  <h3 className="font-heading text-[1.35rem] font-semibold tracking-[-0.04em] text-[#201914]">
                    {founder.name}
                  </h3>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.24em] text-[#8a7561]">
                    Robel Leadership
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
