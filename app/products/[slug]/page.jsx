import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import ProductCard from '../../components/site/ProductCard';
import SectionHeading from '../../components/site/SectionHeading';
import { Button } from '../../components/ui/button';
import { allProducts, getProductBySlug } from '../../data/catalog';

const collectionRoutes = {
  Laminates: '/laminates',
  'Acrylic Sheets': '/acrylic-sheets',
  'PVC Sheets': '/contact',
  'WPC Boards': '/contact'
};

export function generateStaticParams() {
  return allProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found | Robel'
    };
  }

  return {
    title: `${product.name} | Robel`,
    description: product.summary
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = allProducts
    .filter(
      (item) =>
        item.material === product.material && item.slug !== product.slug
    )
    .slice(0, 3);
  const collectionHref = collectionRoutes[product.material] ?? '/contact';

  return (
    <div className="container mx-auto space-y-14 px-4 pb-10 pt-28 sm:px-6 lg:px-8 lg:space-y-20 lg:pt-32">
      <section className="grid gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-start">
        <div className="relative overflow-hidden rounded-[34px] border border-white/60 shadow-[0_24px_90px_-38px_rgba(24,18,13,0.42)]">
          <div className="relative aspect-[4/4.5]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
            <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-white backdrop-blur">
              {product.badge}
            </span>
          </div>
        </div>

        <div className="glass-panel rounded-[34px] p-6 sm:p-8 lg:sticky lg:top-28">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8e7964]">
            {product.material}
          </p>
          <h1 className="mt-4 font-heading text-4xl font-semibold tracking-[-0.05em] text-[#1f1915] sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-5 text-sm leading-7 text-[#5f564f] sm:text-base">
            {product.summary}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {[product.finish, product.application, product.badge].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#efe5d9] px-3 py-1 text-xs font-medium text-[#5e5145]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {Object.entries(product.specs).map(([key, value]) => (
              <div
                key={key}
                className="rounded-[22px] border border-[#e2d7ca] bg-white/80 p-4"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8e7964]">
                  {key}
                </p>
                <p className="mt-2 text-sm text-[#2c241e]">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="sm:flex-1">
              <Link href="/contact">Request a quote</Link>
            </Button>
            <Button asChild variant="outline" className="sm:flex-1">
              <Link href={collectionHref}>
                Back to collection
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          eyebrow="Material story"
          title="Designed to feel premium in both close-up detail and full interior application"
          description="This page pairs a strong visual hero with a specification-ready layout so the product feels aspirational without hiding practical information."
        />
        <div className="glass-panel rounded-[32px] p-6 sm:p-8">
          <div className="grid gap-4">
            {product.highlights.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <div className="mt-0.5 flex size-8 items-center justify-center rounded-full bg-[#2d231c] text-white">
                  <Check className="size-4" />
                </div>
                <p className="text-sm leading-7 text-[#4e433c] sm:text-base">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {relatedProducts.length ? (
        <section className="space-y-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Related products"
              title={`More from the ${product.material} collection`}
            />
            <Button asChild variant="ghost" className="w-fit">
              <Link href={collectionHref}>
                View collection
                <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {relatedProducts.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
