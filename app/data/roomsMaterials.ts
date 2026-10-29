/**
 * roomsMaterials.ts
 *
 * Typed bridge between the existing JavaScript `studioData.js` material catalog
 * and the new TypeScript-native customiser system.
 *
 * Imports the raw material array, computes the `galleryCategory` for each entry
 * (mirroring the logic in `studioViewerData.js`), and re-exports a fully typed
 * `StudioMaterialDef[]` that the hook and sidebar can consume with type safety.
 */

import type { GalleryCategory, StudioMaterialDef } from './roomTypes';
import { studioMaterials as rawMaterials } from './studioData';

interface RawStudioMaterial {
  id: string;
  code: string;
  name: string;
  category: string;
  collection?: string;
  image: string;
  texture?: string;
  finish?: string;
  sheen?: string;
  baseColor?: string;
  accentColor?: string;
  reflectivity?: number;
  roughness?: number;
  repeat?: [number, number];
  tags?: string[];
  recommendedFor?: string[];
  featured?: boolean;
  luxuryScore?: number;
  active?: boolean;
}

// ─── Gallery category classifier ───────────────────────────────────────────

/**
 * Classifies a raw material record into one of the four sidebar gallery buckets.
 * Mirrors `getViewerGalleryCategory` from `studioViewerData.js` so the two
 * systems show identical category labels.
 */
function classifyGalleryCategory(material: {
  category: string;
  finish?: string;
  sheen?: string;
  tags?: string[];
}): GalleryCategory {
  const descriptor = `${material.finish ?? ''} ${material.sheen ?? ''}`.toLowerCase();
  const tags = (material.tags ?? []).join(' ').toLowerCase();

  // Acrylic Sheet products always go in their own bucket
  if (material.category === 'Acrylic Sheet') return 'Acrylic';

  // Wood / grain textures
  if (
    descriptor.includes('woodgrain') ||
    tags.includes('walnut') ||
    tags.includes('grain') ||
    tags.includes('oak') ||
    descriptor.includes('wood')
  ) {
    return 'Woodgrain';
  }

  // High-reflectivity finishes
  if (
    descriptor.includes('gloss') ||
    descriptor.includes('mirror') ||
    descriptor.includes('metallic') ||
    descriptor.includes('sparkle') ||
    descriptor.includes('reflective')
  ) {
    return 'Glossy';
  }

  // Everything else — matte, satin, soft-touch, stone textures
  return 'Matte';
}

// ─── Typed export ──────────────────────────────────────────────────────────

/**
 * All studio materials with `galleryCategory` computed and TypeScript types applied.
 * Filters out any entries explicitly marked `active: false`.
 */
export const STUDIO_MATERIALS: StudioMaterialDef[] = (rawMaterials as RawStudioMaterial[])
  .filter((m) => m.active !== false)
  .map(
    (m): StudioMaterialDef => ({
      id: m.id,
      code: m.code,
      name: m.name,
      category: m.category,
      collection: m.collection ?? '',
      image: m.image,
      texture: m.texture ?? m.image,
      finish: m.finish ?? '',
      sheen: m.sheen ?? '',
      baseColor: m.baseColor ?? '#cccccc',
      accentColor: m.accentColor ?? '#ffffff',
      reflectivity: m.reflectivity ?? 0.2,
      roughness: m.roughness ?? 0.5,
      repeat: m.repeat ?? [1.5, 1.5],
      tags: m.tags ?? [],
      recommendedFor: m.recommendedFor ?? [],
      featured: m.featured ?? false,
      galleryCategory: classifyGalleryCategory(m),
      luxuryScore: m.luxuryScore,
      active: m.active ?? true,
    })
  );

/** O(1) lookup by material id */
export const MATERIALS_BY_ID: Record<string, StudioMaterialDef> = Object.fromEntries(
  STUDIO_MATERIALS.map((m) => [m.id, m])
);
