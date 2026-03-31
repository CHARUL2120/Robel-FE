import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function ProductCard({ product, href }) {
  return (
    <Link
      href={href ?? `/products/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-white/60 bg-white/80 shadow-[0_24px_80px_-32px_rgba(28,24,20,0.28)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_90px_-28px_rgba(28,24,20,0.32)] sm:rounded-[28px]"
    >
      <div className="relative aspect-[4/4.8] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-xl sm:left-4 sm:top-4 sm:text-[11px] sm:tracking-[0.25em]">
          {product.badge}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 sm:gap-5 sm:p-6">
        <div className="space-y-2.5 sm:space-y-3">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#907a63]">
              {product.material}
            </p>
            <ArrowUpRight className="text-[#3b322c] transition group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
          <div className="space-y-2">
            <h3 className="font-heading text-[1.45rem] leading-tight font-semibold tracking-[-0.04em] text-[#201a16] sm:text-2xl">
              {product.name}
            </h3>
            <p className="text-sm leading-6 text-[#5f564f] sm:leading-7">{product.summary}</p>
          </div>
        </div>

        <div className="mt-auto flex flex-wrap gap-2">
          {[product.finish, product.application].map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#f3ede5] px-3 py-1 text-xs font-medium text-[#5f564f]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
