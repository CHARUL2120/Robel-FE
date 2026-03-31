import { cn } from '../../../lib/utils';

const alignments = {
  left: 'items-start text-left',
  center: 'items-center text-center'
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className
}) {
  return (
    <div className={cn('flex flex-col gap-3 sm:gap-4', alignments[align], className)}>
      {eyebrow ? (
        <span className="inline-flex rounded-full border border-[#d7cec0] bg-white/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7b6e62] shadow-sm backdrop-blur sm:px-4 sm:text-[11px] sm:tracking-[0.28em]">
          {eyebrow}
        </span>
      ) : null}
      <div className="space-y-3 sm:space-y-4">
        <h2 className="max-w-3xl font-heading text-[2rem] leading-[1.02] font-semibold tracking-[-0.05em] text-[#1f1a17] sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-sm leading-6 text-[#5f564f] sm:text-base sm:leading-7">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
