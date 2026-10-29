import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Layers3, Sparkles, UsersRound, Headset } from 'lucide-react';
import { Button } from '../components/ui/button';

const statistics = [
  {
    label: 'Product categories',
    value: '15+',
    detail: 'Explore Robel India’s growing product categories.',
    Icon: Layers3
  },
  {
    label: 'Material collections',
    value: '1K+',
    detail: 'A broad range of colors, textures, and surface finishes.',
    Icon: Sparkles
  },
  {
    label: 'Happy customers',
    value: '100K+',
    detail: 'Customers choosing Robel surfaces for their projects.',
    Icon: UsersRound
  },
  {
    label: 'Project support',
    value: '100%',
    detail: 'Project support, as stated in the current Robel product experience.',
    Icon: Headset
  }
];

export const metadata = {
  title: 'About Us | Robel India',
  description:
    'Learn about Robel India and explore our PVC laminate, ASA laminate, and acrylic surface collections.'
};

export default function AboutPage() {
  return (
    <div className="pb-16 pt-28 sm:pt-32">
      <section className="container mx-auto grid items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-[#ddcdbc] bg-white/75 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7e6d60]">
            About Robel India
          </span>
          <h1 className="max-w-2xl font-heading text-4xl font-semibold tracking-[-0.06em] text-[#1f1915] sm:text-5xl lg:text-6xl">
            Thoughtful surfaces for considered spaces.
          </h1>
          <p className="max-w-2xl text-base leading-8 text-[#5f564f]">
            Robel brings together decorative surfaces for contemporary
            interiors. Explore PVC laminates, ASA laminates, and acrylic
            sheets, with product ranges designed to help customers compare
            color, texture, and finish for their projects.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="h-12 px-6">
              <Link href="/laminates">
                Explore product range <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 px-6">
              <Link href="/contact">Contact our team</Link>
            </Button>
          </div>
        </div>
        <div className="relative min-h-[320px] overflow-hidden rounded-[32px] border border-white/70 shadow-[0_28px_90px_-44px_rgba(28,20,14,0.42)] sm:min-h-[440px]">
          <Image
            src="/assets/images/aboutLeft.png"
            alt="Robel decorative surface in an interior setting"
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 45vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          <p className="absolute bottom-6 left-6 right-6 font-heading text-2xl font-medium text-white sm:text-3xl">
            A material palette for your next idea.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 pt-20 sm:px-6 lg:px-8 lg:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8e7964]">
            At a glance
          </span>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-[-0.05em] text-[#1f1915] sm:text-4xl">
            The collections and support behind every project
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#5f564f] sm:text-base">
            A growing selection of products and materials, backed by dedicated
            support for customers and their projects.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statistics.map(({ label, value, detail, Icon }) => (
            <article
              key={label}
              className="rounded-[28px] border border-white/70 bg-white/75 p-6 shadow-[0_20px_65px_-38px_rgba(28,20,14,0.32)]"
            >
              <div className="flex size-12 items-center justify-center rounded-2xl bg-[#2d231c] text-white">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <p className="mt-6 font-heading text-3xl font-semibold tracking-[-0.05em] text-[#1f1915]">
                {value}
              </p>
              <h3 className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#8e7964]">
                {label}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#5f564f]">{detail}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
