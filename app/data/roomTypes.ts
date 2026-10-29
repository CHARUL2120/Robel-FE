import type { Vector3Tuple } from 'three';

// ─── Zone ──────────────────────────────────────────────────────────────────

/**
 * A logical group of parts within a room (e.g. "Base Cabinetry" in the kitchen).
 * Used to drive the zone-tab filter in the sidebar.
 */
export interface RoomZone {
  /** Unique zone id matching the `zone` field on its member parts */
  id: string;
  /** Human-readable label shown in the sidebar zone tabs */
  label: string;
  /** IDs of parts that belong to this zone */
  partIds: string[];
}

// ─── Part ──────────────────────────────────────────────────────────────────

export type RoomPartType = 'door' | 'drawer' | 'panel' | 'wall-cabinet';

/**
 * A single customisable surface within a room.
 * The `id` must match the mesh name inside the GLTF scene graph for automatic
 * PBR material binding during mesh traversal.
 */
export interface RoomPart {
  /** Unique part id — MUST match the GLTF mesh `name` for texture binding */
  id: string;
  /** Human-readable display name shown in sidebar and hover tooltips */
  name: string;
  /** Zone this part belongs to (used for sidebar tab grouping) */
  zone: string;
  /** Furniture geometry category */
  type: RoomPartType;
  /** Bounding box [width, height, depth] in metres for UV scaling hints */
  size: Vector3Tuple;
  /** World-space centroid [x, y, z] of this part mesh */
  position: Vector3Tuple;
  /** Outward surface normal (used to orient overlay planes correctly) */
  normal: Vector3Tuple;
  /** Small positive z-offset applied to the overlay mesh to prevent z-fighting */
  depthOffset: number;
}

// ─── Room ──────────────────────────────────────────────────────────────────

/**
 * Complete configuration for one 3D room/space.
 * Drives model loading, camera initialisation, zone grouping, and default state.
 */
export interface RoomConfig {
  /** Unique stable room identifier */
  id: string;
  /** Full display name for headings */
  name: string;
  /** Short label for the room-switcher navigation pill */
  shortLabel: string;
  /** Path to the `.glb` asset under `/public` */
  modelUrl: string;
  /**
   * Camera eye position [x, y, z] passed to R3F `<Canvas camera.position>`.
   * Tuned per-room so the entire scene fits the viewport at a comfortable zoom.
   */
  defaultCameraPosition: Vector3Tuple;
  /** OrbitControls look-at target [x, y, z] */
  cameraTarget: Vector3Tuple;
  /** Camera field-of-view in degrees */
  fov: number;
  /** Part id that is pre-selected when the room is first entered */
  defaultFocusPartId: string;
  /** Grouped zones derived from the flat `parts` list */
  zones: RoomZone[];
  /** All customisable parts in this room */
  parts: RoomPart[];
  /** Factory-default material assignments: partId → materialId */
  defaultAssignments: Record<string, string>;
  /** One-sentence room description shown in the switcher tooltip */
  intro: string;
  /** Label used in share / PNG export filenames */
  shareLabel: string;
}

// ─── Material ──────────────────────────────────────────────────────────────

export type GalleryCategory = 'Acrylic' | 'Glossy' | 'Matte' | 'Woodgrain';

/** Ordered list of gallery filter categories shown in the sidebar */
export const GALLERY_CATEGORIES: GalleryCategory[] = [
  'Acrylic',
  'Glossy',
  'Matte',
  'Woodgrain',
];

/**
 * Fully typed material descriptor used by the PBR engine and the sidebar gallery.
 * Extends the raw studioData material shape with a computed `galleryCategory`.
 */
export interface StudioMaterialDef {
  id: string;
  code: string;
  name: string;
  /** Source product category (e.g. "Acrylic Sheet", "PVC Laminate", "ASA Laminate") */
  category: string;
  collection: string;
  /** Thumbnail / preview image path served under `/public` */
  image: string;
  /** Path used as the Three.js albedo texture map */
  texture: string;
  /** Finish descriptor driving PBR roughness/metalness clamping */
  finish: string;
  /** Sheen descriptor for additional material character */
  sheen: string;
  /** CSS hex base colour for surfaces that don't use a texture map */
  baseColor: string;
  /** CSS hex accent colour used as emissive highlight when the part is selected */
  accentColor: string;
  /** 0–1 reflectivity value driving metalness / clearcoat calculations */
  reflectivity: number;
  /** 0–1 base roughness before PBR finish clamping */
  roughness: number;
  /**
   * UV repeat [s, t] applied via `texture.repeat.set()`.
   * Ensures a laminate sheet tiles correctly on large wardrobe doors as well
   * as small kitchen cabinet fronts without visible stretching.
   */
  repeat: [number, number];
  tags: string[];
  /** Room IDs for which this material is especially recommended (surfaces sort first) */
  recommendedFor: string[];
  featured: boolean;
  /** Sidebar gallery category bucket */
  galleryCategory: GalleryCategory;
  luxuryScore?: number;
  /** Whether the material is active and should appear in the viewer */
  active: boolean;
}

// ─── Customizer State ──────────────────────────────────────────────────────

/**
 * Snapshot of the complete customiser state.
 * Can be serialised to JSON for shareable URL encoding.
 */
export interface RoomCustomizerSnapshot {
  version: number;
  activeRoomId: string;
  selectedPartId: string;
  /** Nested map: roomId → partId → materialId */
  assignmentsByRoom: Record<string, Record<string, string>>;
}
