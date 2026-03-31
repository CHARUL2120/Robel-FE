import AsaCatalogSection from '../components/site/AsaCatalogSection';
import {
  asaCatalogCollections,
  asaCatalogProducts
} from '../data/asaCatalog';

export const metadata = {
  title: 'ASA Laminates | Robel',
  description:
    'Discover premium ASA decorative laminates with soft-touch super-matt surfaces, calm colors, and performance-led interior finishes.'
};

export default function AsaLaminatesPage() {
  return (
    <div className="container mx-auto space-y-14 px-4 pb-0 pt-28 sm:px-6 sm:pb-10 lg:px-8 lg:space-y-20 lg:pt-32">
      <div id="catalog-grid">
        <AsaCatalogSection
          collections={asaCatalogCollections}
          products={asaCatalogProducts}
        />
      </div>
    </div>
  );
}
