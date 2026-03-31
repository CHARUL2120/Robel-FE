import AcrylicCatalogSection from '../components/site/AcrylicCatalogSection';
import {
  acrylicCatalogCollections,
  acrylicCatalogProducts
} from '../data/acrylicCatalog';

export const metadata = {
  title: 'Acrylic Sheets | Robel',
  description:
    'Discover premium acrylic sheets for wardrobes, kitchens, wall panels, and modern interior surfaces.'
};

export default function AcrylicSheetsPage() {
  return (
    <div className="container mx-auto space-y-14 px-4 pb-0 pt-28 sm:px-6 sm:pb-10 lg:px-8 lg:space-y-20 lg:pt-32">
      <div id="catalog-grid">
        <AcrylicCatalogSection
          collections={acrylicCatalogCollections}
          products={acrylicCatalogProducts}
        />
      </div>
    </div>
  );
}
