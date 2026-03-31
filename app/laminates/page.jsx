import PvcCatalogSection from '../components/site/PvcCatalogSection';
import {
  pvcCatalogCollections,
  pvcCatalogProducts
} from '../data/pvcCatalog';

export const metadata = {
  title: 'PVC Laminates | Robel',
  description:
    'Discover premium PVC laminates with fluted textures, marble-inspired surfaces, wood grains, metallic finishes, and modern interior applications.'
};

export default function LaminatesPage() {
  return (
    <div className="container mx-auto space-y-14 px-4 pb-0 pt-28 sm:px-6 sm:pb-10 lg:px-8 lg:space-y-20 lg:pt-32">
      <div id="catalog-grid">
        <PvcCatalogSection
          collections={pvcCatalogCollections}
          products={pvcCatalogProducts}
        />
      </div>
    </div>
  );
}
