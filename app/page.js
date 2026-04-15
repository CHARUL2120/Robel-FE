'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from './components/ui/button';
import ProductCard from './components/site/ProductCard';
import SectionHeading from './components/site/SectionHeading';
import {
  categories,
  galleryImages,
  testimonials,
  trendingProducts,
  whyChooseUs
} from './data/catalog';

const Home = () => {
  return (
    <div className="pb-8 sm:pb-12 lg:pb-16">
      <section className="relative isolate min-h-screen overflow-hidden px-4 pb-12 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <div className="absolute inset-0 -z-20">
          <Image
            src="/assets/images/herobg.png"
            alt="Luxury laminate interior"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(18,14,11,0.84)_12%,rgba(18,14,11,0.52)_42%,rgba(18,14,11,0.18)_72%,rgba(18,14,11,0.08)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_30%)]" />
        </div>

        <div className="container mx-auto grid min-h-[calc(100vh-9rem)] items-end gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-3xl space-y-7"
          >
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80 backdrop-blur">
              Luxury surface collections
            </span>
            <div className="space-y-5">
              <h1 className="font-heading text-4xl font-semibold tracking-[-0.06em] text-white sm:text-5xl lg:text-7xl">
                Premium Surface Solutions for Modern Interiors
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-white/76 sm:text-base lg:text-lg">
                Discover material-forward laminates, acrylic sheets, PVC
                panels, and WPC boards that bring gloss, grain, and crafted
                detail into kitchens, wardrobes, wall panels, and custom spaces.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-12 px-6 text-sm sm:text-base">
                <Link href="/studio">
                  Launch 3D Studio
                  <ArrowRight />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 border-white/20 bg-white/10 px-6 text-sm text-white hover:bg-white/18 sm:text-base"
              >
                <Link href="/laminates">Explore PVC Laminates</Link>
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ['240+', 'Premium decors'],
                ['4', 'Material categories'],
                ['100%', 'Project support']
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-[24px] border border-white/15 bg-white/10 p-4 backdrop-blur-xl"
                >
                  <p className="font-heading text-3xl font-semibold tracking-[-0.05em] text-white">
                    {value}
                  </p>
                  <p className="mt-1 text-sm text-white/70">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
            className="grid gap-4 sm:grid-cols-2 lg:justify-self-end"
          >
            <FeaturePreview
              title="Gloss acrylic lines"
              label="Reflective finishes"
              image="/assets/images/Categories4.png"
            />
            <FeaturePreview
              title="Wood and stone textures"
              label="Material-led PVC laminates"
              image="/assets/images/Laminates3.png"
              className="sm:translate-y-10"
            />
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-6 overflow-hidden rounded-[34px] border border-white/60 bg-[linear-gradient(135deg,#231b17_0%,#3d2a1e_56%,#8e5d39_100%)] px-6 py-8 text-white shadow-[0_28px_100px_-48px_rgba(28,20,14,0.72)] sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:py-10">
          <div className="space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
              New experience
            </p>
            <h2 className="font-heading text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
              Configure wardrobes, kitchens, TV units, and bedroom furniture in a premium 3D studio
            </h2>
            <p className="max-w-xl text-sm leading-7 text-white/74 sm:text-base">
              Click individual doors, panels, and drawers to apply laminates and acrylic finishes in real time, adjust lighting, save concepts, share links, and request quotes directly from the visualization workflow.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-12 bg-white text-[#221914] hover:bg-white/92">
                <Link href="/studio">
                  Open 3D Studio
                  <ArrowRight />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 border-white/18 bg-white/10 text-white hover:bg-white/16"
              >
                <Link href="/studio/admin">View admin panel</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {[
              ['Interactive parts', 'Doors, drawers, panels, and feature walls respond instantly.'],
              ['Lighting controls', 'Orbit, zoom, and relight to evaluate finishes in different moods.'],
              ['Save and share', 'Store concepts locally and send quote-ready design summaries.']
            ].map(([title, detail]) => (
              <div
                key={title}
                className="rounded-[26px] border border-white/12 bg-white/10 p-5 backdrop-blur-xl"
              >
                <h3 className="font-heading text-2xl font-semibold tracking-[-0.04em] text-white">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/72">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="Featured categories"
          title="A curated material library for premium interior surfaces"
          description="Each category is designed to feel luxurious, tactile, and specification-ready for residential and commercial interiors."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <Link
                href={category.href}
                className="group relative block overflow-hidden rounded-[30px] border border-white/60 shadow-[0_22px_70px_-36px_rgba(28,20,14,0.34)]"
              >
                <div className="relative aspect-[4/4.7]">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-white">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">
                    {category.accent}
                  </p>
                  <h3 className="mt-2 font-heading text-2xl font-semibold tracking-[-0.04em]">
                    {category.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/78">
                    {category.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Trending designs"
            title="Surfaces selected to feel editorial, warm, and distinctly high-end"
            description="A premium mix of glossy acrylics, marble laminates, and richly toned grains that work beautifully in modern joinery."
          />
          <Button asChild variant="ghost" className="w-fit">
            <Link href="/laminates">View full collection</Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {trendingProducts.slice(0, 6).map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <SectionHeading
            eyebrow="Why choose us"
            title="We balance finish quality, visual depth, and specification support"
            description="The website is designed to feel premium because the product story is premium. Every surface is positioned as a crafted material, not a commodity tile."
          />
          <div className="grid gap-4">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="glass-panel rounded-[28px] p-5 sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#2d231c] text-white">
                    <Star className="size-4" />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-semibold tracking-[-0.04em] text-[#1f1915]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#5f564f] sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="Product gallery"
          title="Material stories staged for kitchens, wardrobes, wall panels, and signature interiors"
          description="Large imagery, soft gradients, and premium card proportions keep the focus on texture, tone, and finish quality."
        />
        <div className="mt-10 grid auto-rows-[220px] gap-4 sm:auto-rows-[260px] lg:grid-cols-3">
          {galleryImages.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
              viewport={{ once: true }}
              className={`group relative overflow-hidden rounded-[30px] border border-white/60 shadow-[0_18px_60px_-32px_rgba(28,20,14,0.35)] ${item.span}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="font-heading text-2xl font-semibold tracking-[-0.04em]">
                  {item.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted by designers, studios, and premium residential projects"
          description="The visual language stays refined, but the product proposition stays practical: finish quality, consistency, and guidance."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="glass-panel rounded-[30px] p-6"
            >
              <div className="flex items-center gap-1 text-[#8b6a4a]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <p className="mt-5 text-base leading-8 text-[#3f352d]">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="mt-8 border-t border-[#e4d8cc] pt-4">
                <p className="font-heading text-xl font-semibold tracking-[-0.03em] text-[#1f1915]">
                  {item.name}
                </p>
                <p className="text-sm text-[#7a6a5c]">{item.role}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

    </div>
  );
};

function FeaturePreview({ title, label, image, className = '' }) {
  return (
    <div
      className={`overflow-hidden rounded-[28px] border border-white/15 bg-white/10 shadow-[0_20px_80px_-35px_rgba(10,6,4,0.5)] backdrop-blur-xl ${className}`}
    >
      <div className="relative aspect-[4/4.6]">
        <Image src={image} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">
            {label}
          </p>
          <h3 className="mt-2 font-heading text-2xl font-semibold tracking-[-0.04em]">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Home;
