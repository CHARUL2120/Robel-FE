export const studioViewerSpaceIds = [
  'kitchen-atelier',
  'wardrobe-suite',
  'tv-lounge-suite'
];

const viewerSpaceOverrides = {
  'kitchen-atelier': {
    name: 'Kitchen Studio',
    shortLabel: 'Kitchen',
    modelPath: '/assets/studio-models/kitchen-atelier.glb',
    defaultArScale: 0.24,
    intro: 'Modular kitchen visualization with premium shutter, drawer, and island finishes.',
    shareLabel: 'Kitchen'
  },
  'wardrobe-suite': {
    name: 'Cupboard Studio',
    shortLabel: 'Cupboard',
    modelPath: '/assets/studio-models/wardrobe-suite.glb',
    defaultArScale: 0.22,
    intro: 'Full-height cupboard visualization with loft, vanity, and shutter finish control.',
    shareLabel: 'Cupboard'
  },
  'tv-lounge-suite': {
    name: 'TV Unit Studio',
    shortLabel: 'TV Unit',
    modelPath: '/assets/studio-models/tv-lounge-suite.glb',
    defaultArScale: 0.2,
    intro: 'Statement TV unit visualization with panel, drawer, and tower material swaps.',
    shareLabel: 'TV Unit'
  }
};

export const studioViewerCategories = ['Acrylic', 'Glossy', 'Matte', 'Woodgrain'];

export function getViewerGalleryCategory(material) {
  const finish = `${material.finish} ${material.sheen}`.toLowerCase();
  const tags = material.tags.join(' ').toLowerCase();

  if (material.category === 'Acrylic Sheet') {
    return 'Acrylic';
  }

  if (finish.includes('woodgrain') || tags.includes('walnut') || tags.includes('grain')) {
    return 'Woodgrain';
  }

  if (
    finish.includes('gloss') ||
    finish.includes('mirror') ||
    finish.includes('metallic') ||
    finish.includes('sparkle') ||
    finish.includes('reflective')
  ) {
    return 'Glossy';
  }

  return 'Matte';
}

export function buildStudioViewerSpaces(spaces) {
  return studioViewerSpaceIds
    .map((spaceId) => {
      const space = spaces.find((entry) => entry.id === spaceId);

      if (!space) {
        return null;
      }

      return {
        ...space,
        ...viewerSpaceOverrides[spaceId]
      };
    })
    .filter(Boolean);
}

export function buildStudioViewerMaterials(materials) {
  return materials.map((material) => ({
    ...material,
    galleryCategory: getViewerGalleryCategory(material)
  }));
}
