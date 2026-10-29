import Link from 'next/link';
import { ArrowDownToLine } from 'lucide-react';
import { acrylicCatalogProducts } from '../data/acrylicCatalog';
import { asaCatalogProducts } from '../data/asaCatalog';
import { pvcCatalogProducts } from '../data/pvcCatalog';

const catalogCoverage = [
  { category: 'PVC laminates', available: pvcCatalogProducts.length },
  { category: 'ASA laminates', available: asaCatalogProducts.length },
  { category: 'Acrylic sheets', available: acrylicCatalogProducts.length }
].map((entry) => ({
  ...entry,
  needed: Math.max(0, 100 - entry.available)
}));

const catalogs = [
  {
    title: 'PVC Laminate Catalog',
    description: 'Browse the Robel PVC laminate range.',
    href: '/api/catalogs/pvc'
  },
  {
    title: 'ASA Laminate Catalog',
    description: 'Browse Robel ASA laminate shades and collections.',
    href: '/api/catalogs/asa'
  },
  {
    title: 'Acrylic Sheet Catalog',
    description: 'Browse Robel acrylic laminate colors and finishes.',
    href: '/api/catalogs/acrylic'
  }
];

export const metadata = {
  title: 'Download Catalogs | Robel India',
  description: 'Download the available Robel product catalogs.'
};

export default function DownloadsPage() {
  return (
    <div className="container mx-auto min-h-[70svh] px-4 pb-20 pt-32 sm:px-6 lg:px-8">
      <header className="max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8e7964]">
          Product resources
        </p>
        <h1 className="mt-3 font-heading text-4xl font-semibold tracking-[-0.05em] text-[#1f1915] sm:text-5xl">
          Download catalogs
        </h1>
        <p className="mt-4 text-base leading-7 text-[#5f564f]">
          Browse the available product catalogs and find the right surface for
          your project.
        </p>
      </header>
      <aside className="mt-8 rounded-[24px] border border-[#e4d8cc] bg-white/65 p-5 text-sm leading-7 text-[#5f564f]">
        <p className="font-semibold text-[#1f1915]">Catalog asset coverage</p>
        <ul className="mt-2 grid gap-x-6 sm:grid-cols-3">
          {catalogCoverage.map(({ category, available, needed }) => (
            <li key={category}>
              {category}: {available} listed; {needed} more approved product
              {needed === 1 ? ' image' : ' images'} needed to reach 100.
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-[#7a6a5c]">
          Only catalog products currently present in the approved source data
          are shown; no duplicate or placeholder products have been added.
        </p>
      </aside>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {catalogs.map((catalog) => (
          <article
            key={catalog.href}
            className="flex min-h-56 flex-col rounded-[28px] border border-white/70 bg-white/75 p-6 shadow-[0_20px_65px_-38px_rgba(28,20,14,0.32)]"
          >
            <div className="flex size-12 items-center justify-center rounded-2xl bg-[#2d231c] text-white">
              <ArrowDownToLine className="size-5" aria-hidden="true" />
            </div>
            <h2 className="mt-6 font-heading text-2xl font-semibold tracking-[-0.04em] text-[#1f1915]">
              {catalog.title}
            </h2>
            <p className="mt-2 flex-1 text-sm leading-6 text-[#5f564f]">
              {catalog.description}
            </p>
            <Link
              href={catalog.href}
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#2d231c] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#49382c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b6a4a]"
            >
              Download PDF <ArrowDownToLine className="size-4" aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
