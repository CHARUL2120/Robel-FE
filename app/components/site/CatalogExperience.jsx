'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import ProductCard from './ProductCard';
import SectionHeading from './SectionHeading';

export default function CatalogExperience({
  eyebrow,
  title,
  description,
  products
}) {
  const finishes = useMemo(
    () => ['All', ...new Set(products.map((product) => product.finish))],
    [products]
  );
  const applications = useMemo(
    () => ['All', ...new Set(products.map((product) => product.application))],
    [products]
  );

  const [selectedFinish, setSelectedFinish] = useState('All');
  const [selectedApplication, setSelectedApplication] = useState('All');
  const [search, setSearch] = useState('');

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesFinish =
        selectedFinish === 'All' || product.finish === selectedFinish;
      const matchesApplication =
        selectedApplication === 'All' ||
        product.application === selectedApplication;
      const matchesSearch =
        !query ||
        `${product.name} ${product.summary} ${product.finish} ${product.application}`
          .toLowerCase()
          .includes(query);

      return matchesFinish && matchesApplication && matchesSearch;
    });
  }, [products, search, selectedApplication, selectedFinish]);

  return (
    <section className="space-y-8 lg:space-y-10">
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
      />

      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="rounded-[28px] border border-white/60 bg-white/75 p-5 shadow-[0_18px_60px_-34px_rgba(27,22,18,0.35)] backdrop-blur-xl sm:p-6">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="catalog-search"
                className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-[#8e7964]"
              >
                Search collection
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-[#e4d8cc] bg-white px-4 py-3">
                <Search className="size-4 text-[#8a7662]" />
                <input
                  id="catalog-search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search finish or application"
                  className="w-full bg-transparent text-sm text-[#201a16] outline-none placeholder:text-[#96887a]"
                />
              </div>
            </div>

            <FilterGroup
              label="Finish"
              options={finishes}
              value={selectedFinish}
              onChange={setSelectedFinish}
            />

            <FilterGroup
              label="Application"
              options={applications}
              value={selectedApplication}
              onChange={setSelectedApplication}
            />
          </div>
        </aside>

        <div className="space-y-6">
          <div className="flex flex-col gap-3 rounded-[28px] border border-white/60 bg-white/65 px-5 py-4 text-sm text-[#5f564f] shadow-[0_18px_60px_-34px_rgba(27,22,18,0.3)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p>
              Showing <span className="font-semibold text-[#201a16]">{filteredProducts.length}</span>{' '}
              curated surfaces
            </p>
            <div className="flex flex-wrap gap-2">
              {['New Collection', 'Trending', 'Premium'].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full bg-[#f2e8dd] px-3 py-1 text-xs font-medium text-[#6b5c4f]"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterGroup({ label, options, value, onChange }) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8e7964]">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              value === option
                ? 'bg-[#201a16] text-white shadow-[0_12px_30px_-16px_rgba(15,10,6,0.45)]'
                : 'bg-[#f5eee6] text-[#5f564f] hover:bg-[#eadfd2]'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
