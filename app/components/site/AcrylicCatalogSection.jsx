'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import SectionHeading from './SectionHeading';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '../ui/sheet';

const DEMO_IMAGE_GROUPS = [
  { fileName: 'page-04.png', width: 1503, height: 1516, codes: ['RB-1301'] },
  { fileName: 'page-05.png', width: 1503, height: 1516, codes: ['RB-1302'] },
  {
    fileName: 'page-06.png',
    width: 979,
    height: 1304,
    codes: ['RB-1303', 'RB-1304']
  },
  { fileName: 'page-07.png', width: 1503, height: 1516, codes: ['RB-1305'] },
  {
    fileName: 'page-08.png',
    width: 1503,
    height: 1516,
    codes: ['RB-1306', 'RB-1307']
  },
  {
    fileName: 'page-09.png',
    width: 1503,
    height: 1516,
    codes: ['RB-1101', 'RB-1102', 'RB-1103']
  },
  {
    fileName: 'page-10.png',
    width: 1503,
    height: 1516,
    codes: ['RB-1104', 'RB-1105', 'RB-1106']
  },
  {
    fileName: 'page-11.png',
    width: 1503,
    height: 1516,
    codes: ['RB-1107', 'RB-1108', 'RB-1109']
  },
  {
    fileName: 'page-12.png',
    width: 1503,
    height: 1516,
    codes: ['RB-1110', 'RB-1111', 'RB-1112']
  },
  {
    fileName: 'page-13.png',
    width: 1503,
    height: 1516,
    codes: ['RB-1113', 'RB-1114', 'RB-1115']
  },
  {
    fileName: 'page-14.png',
    width: 1503,
    height: 1516,
    codes: ['RB-1117', 'RB-1118', 'RB-1119']
  },
  {
    fileName: 'page-15.png',
    width: 1134,
    height: 1516,
    codes: ['RB-1120', 'RB-1121', 'RB-1122', 'RB-1123']
  },
  {
    fileName: 'page-16.png',
    width: 1134,
    height: 1516,
    codes: ['RB-1124', 'RB-1125', 'RB-1126', 'RB-1127']
  },
  {
    fileName: 'page-17.png',
    width: 1134,
    height: 1516,
    codes: ['RB-1128', 'RB-1129', 'RB-1130', 'RB-1131']
  },
  {
    fileName: 'page-19.png',
    width: 1134,
    height: 1460,
    codes: ['RB-1501', 'RB-1502', 'RB-1503', 'RB-1504']
  },
  {
    fileName: 'page-20.png',
    width: 1658,
    height: 1460,
    codes: ['RB-1505', 'RB-1506', 'RB-1507']
  },
  {
    fileName: 'page-21.png',
    width: 1503,
    height: 1516,
    codes: ['RB-1201', 'RB-1202', 'RB-1203']
  },
  {
    fileName: 'page-22.png',
    width: 1503,
    height: 1516,
    codes: ['RB-1204', 'RB-1205', 'RB-1206']
  },
  {
    fileName: 'page-23.png',
    width: 1658,
    height: 1516,
    codes: ['RB-1207', 'RB-1208', 'RB-1209']
  },
  {
    fileName: 'page-24.png',
    width: 1503,
    height: 1516,
    codes: ['RB-1401', 'RB-1402', 'RB-1403']
  }
];

const demoImageByCode = Object.fromEntries(
  DEMO_IMAGE_GROUPS.flatMap(({ fileName, width, height, codes }) =>
    codes.map((code) => [
      code,
      {
        src: `/assets/acrylic/demo-clean/${fileName}`,
        width,
        height
      }
    ])
  )
);

export default function AcrylicCatalogSection({ collections, products }) {
  const [activeCollection, setActiveCollection] = useState('all');
  const [activeProductCode, setActiveProductCode] = useState(
    products[0]?.code ?? null
  );
  const [showAllMobile, setShowAllMobile] = useState(false);
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    if (activeCollection === 'all') {
      return products;
    }

    return products.filter((product) => product.slug === activeCollection);
  }, [activeCollection, products]);

  const activeMeta =
    collections.find((collection) => collection.slug === activeCollection) ??
    collections[0];

  const activeProduct =
    filteredProducts.find((product) => product.code === activeProductCode) ??
    filteredProducts[0] ??
    null;

  const activeDemoAsset =
    (activeProduct && demoImageByCode[activeProduct.code]) || null;

  const handleProductActivate = (code) => {
    setActiveProductCode(code);

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 639px)').matches
    ) {
      setMobilePreviewOpen(true);
    }
  };

  const handleCollectionChange = (slug) => {
    const nextProducts =
      slug === 'all'
        ? products
        : products.filter((product) => product.slug === slug);

    setActiveCollection(slug);
    setShowAllMobile(false);
    setMobilePreviewOpen(false);
    setActiveProductCode((currentCode) =>
      nextProducts.some((product) => product.code === currentCode)
        ? currentCode
        : nextProducts[0]?.code ?? null
    );
  };

  return (
    <section className="space-y-8 lg:space-y-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Choose your shade"
          title="Explore acrylic sheet colors for every kind of interior mood"
          description="Browse solids, marble-inspired designs, matte finishes, metallic tones, and mirror looks, then preview how each shade appears in a real interior setting."
        />
        <div className="glass-panel w-full max-w-md rounded-[26px] p-4 text-sm leading-7 text-[#5c5048]">
          {activeMeta.description}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {collections.map((collection) => {
          const isActive = collection.slug === activeCollection;
          return (
            <button
              key={collection.slug}
              type="button"
              onClick={() => handleCollectionChange(collection.slug)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                isActive
                  ? 'bg-[#201a16] text-white shadow-[0_14px_40px_-22px_rgba(32,26,22,0.52)]'
                  : 'bg-white/75 text-[#5f564f] hover:bg-[#efe4d7]'
              }`}
            >
              {collection.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr] xl:items-start">
        <aside className="hidden glass-panel rounded-[30px] p-4 sm:block sm:p-5 xl:sticky xl:top-28">
          {activeProduct ? (
            <>
              <div className="mb-4">
                <h3 className="font-heading text-3xl font-semibold tracking-[-0.04em] text-[#1f1915]">
                  {activeProduct.name}
                </h3>
              </div>

              <div className="relative rounded-[26px] border border-[#ece0d5] bg-[#f7f0e8] p-3">
                <div className="relative h-[320px] rounded-[20px] bg-white/35 p-2 sm:h-[420px] xl:h-[min(68vh,720px)]">
                  {activeDemoAsset ? (
                    <Image
                      src={activeDemoAsset.src}
                      alt={`${activeProduct.name} brochure application preview`}
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 1279px) 100vw, 38vw"
                    />
                  ) : (
                    <div className="relative h-full w-full">
                      <Image
                        src={activeProduct.image}
                        alt={`${activeProduct.name} sheet swatch`}
                        fill
                        className="object-contain p-2"
                        sizes="(max-width: 1279px) 100vw, 38vw"
                      />
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : null}
        </aside>

        <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
          {filteredProducts.map((product, index) => {
            const isActive = activeProduct?.code === product.code;
            const isHiddenOnMobile = !showAllMobile && index >= 5;

            return (
              <button
                key={product.code}
                type="button"
                onClick={() => handleProductActivate(product.code)}
                onFocus={() => setActiveProductCode(product.code)}
                onMouseEnter={() => setActiveProductCode(product.code)}
                className={`group glass-panel relative overflow-hidden rounded-[28px] p-4 text-left transition sm:p-5 ${
                  isHiddenOnMobile ? 'hidden sm:block ' : ''
                }${
                  isActive
                    ? 'ring-1 ring-[#201a16]/20 shadow-[0_22px_70px_-38px_rgba(27,19,14,0.38)]'
                    : 'hover:-translate-y-1 hover:shadow-[0_24px_80px_-40px_rgba(27,19,14,0.32)]'
                }`}
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                <div className="relative overflow-hidden rounded-[22px] border border-[#ece0d5] bg-[#f8f3ee]">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={product.image}
                      alt={`${product.name} ${product.code}`}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 639px) 100vw, (max-width: 1535px) 50vw, 33vw"
                    />
                    <div className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 rotate-[16deg] bg-white/35 opacity-0 blur-2xl transition duration-700 group-hover:translate-x-[320%] group-hover:opacity-100" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1f1915]/65 via-transparent to-transparent p-4">
                      <span className="inline-flex rounded-full border border-white/20 bg-white/12 px-3 py-1 text-[11px] font-medium text-white backdrop-blur">
                        Hover or tap for application view
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8e7964]">
                        {product.collection}
                      </p>
                      <h3 className="mt-2 font-heading text-2xl font-semibold tracking-[-0.04em] text-[#1f1915]">
                        {product.name}
                      </h3>
                    </div>
                    <span className="rounded-full border border-[#e0d2c6] bg-white/85 px-3 py-1 text-xs font-medium text-[#5f564f]">
                      {product.code}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {filteredProducts.length > 5 ? (
          <div className="sm:hidden">
            <button
              type="button"
              onClick={() => setShowAllMobile((value) => !value)}
              className="w-full rounded-[24px] border border-[#ddd0c3] bg-white/80 px-5 py-3 text-sm font-medium text-[#2d241d] shadow-[0_14px_40px_-28px_rgba(27,19,14,0.25)] transition hover:bg-[#f4eadf]"
            >
              {showAllMobile ? 'View less' : 'View more'}
            </button>
          </div>
        ) : null}
      </div>

      <Sheet open={mobilePreviewOpen} onOpenChange={setMobilePreviewOpen}>
        <SheetContent
          side="bottom"
          className="sm:hidden rounded-t-[30px] border-t border-white/35 bg-[#f7f1ea]/98 px-0 pb-0 pt-0 backdrop-blur-2xl"
        >
          {activeProduct ? (
            <>
              <SheetHeader className="border-b border-[#eadfd3] px-5 pb-4 pt-5 text-left">
                <SheetTitle className="font-heading text-3xl font-semibold tracking-[-0.04em] text-[#1f1915]">
                  {activeProduct.name}
                </SheetTitle>
                <SheetDescription className="text-sm text-[#6b6057]">
                  Premium acrylic application view
                </SheetDescription>
              </SheetHeader>

              <div className="px-4 pb-5 pt-4">
                <div className="rounded-[26px] border border-[#ece0d5] bg-[#f7f0e8] p-3 shadow-[0_26px_80px_-42px_rgba(30,20,14,0.38)]">
                  <div className="relative h-[62vh] rounded-[20px] bg-white/35 p-2">
                    {activeDemoAsset ? (
                      <Image
                        src={activeDemoAsset.src}
                        alt={`${activeProduct.name} brochure application preview`}
                        fill
                        className="object-contain p-2"
                        sizes="100vw"
                      />
                    ) : (
                      <div className="relative h-full w-full">
                        <Image
                          src={activeProduct.image}
                          alt={`${activeProduct.name} sheet swatch`}
                          fill
                          className="object-contain p-2"
                          sizes="100vw"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </section>
  );
}
