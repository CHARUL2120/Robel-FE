import type { RoomConfig, RoomZone } from './roomTypes';

// ─── Utility ───────────────────────────────────────────────────────────────

/**
 * Derives a sorted, de-duplicated `zones` array from a flat `parts` list.
 * Preserves the first-seen declaration order of zone IDs so the sidebar
 * tabs appear in the same order the parts are defined below.
 */
function deriveZones(parts: RoomConfig['parts']): RoomZone[] {
  const seen = new Set<string>();
  const ordered: string[] = [];

  for (const part of parts) {
    if (!seen.has(part.zone)) {
      seen.add(part.zone);
      ordered.push(part.zone);
    }
  }

  return ordered.map((zoneId) => ({
    id: zoneId,
    label: zoneId
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '),
    partIds: parts.filter((p) => p.zone === zoneId).map((p) => p.id),
  }));
}

// ─── Kitchen ───────────────────────────────────────────────────────────────

const KITCHEN_PARTS: RoomConfig['parts'] = [
  {
    id: 'kitchen-base-left-door',
    name: 'Base Left Door',
    type: 'door',
    zone: 'base-cabinetry',
    size: [1.08, 1.72, 0.08],
    position: [-2.2, 0.98, 1.32],
    normal: [0, 0, 1],
    depthOffset: 0.1,
  },
  {
    id: 'kitchen-base-right-door',
    name: 'Base Right Door',
    type: 'door',
    zone: 'base-cabinetry',
    size: [1.08, 1.72, 0.08],
    position: [-0.9, 0.98, 1.32],
    normal: [0, 0, 1],
    depthOffset: 0.1,
  },
  {
    id: 'kitchen-base-drawers',
    name: 'Drawer Stack',
    type: 'drawer',
    zone: 'drawer-fronts',
    size: [1.12, 1.72, 0.08],
    position: [0.55, 0.98, 1.32],
    normal: [0, 0, 1],
    depthOffset: 0.12,
  },
  {
    id: 'kitchen-wall-left-door',
    name: 'Wall Cabinet Left',
    type: 'wall-cabinet',
    zone: 'wall-cabinetry',
    size: [1.08, 1.28, 0.08],
    position: [-2.2, 3.08, -0.42],
    normal: [0, 0, 1],
    depthOffset: 0.08,
  },
  {
    id: 'kitchen-wall-right-door',
    name: 'Wall Cabinet Right',
    type: 'wall-cabinet',
    zone: 'wall-cabinetry',
    size: [1.08, 1.28, 0.08],
    position: [-0.9, 3.08, -0.42],
    normal: [0, 0, 1],
    depthOffset: 0.08,
  },
  {
    id: 'kitchen-pantry-door',
    name: 'Pantry Tower',
    type: 'door',
    zone: 'tall-unit',
    size: [1.2, 4.25, 0.08],
    position: [3.1, 2.35, -0.58],
    normal: [0, 0, 1],
    depthOffset: 0.1,
  },
  {
    id: 'kitchen-island-front',
    name: 'Island Feature Panel',
    type: 'panel',
    zone: 'island',
    size: [3.3, 1.52, 0.1],
    position: [0.35, 0.92, 3.45],
    normal: [0, 0, 1],
    depthOffset: 0.12,
  },
  {
    id: 'kitchen-backsplash-panel',
    name: 'Backsplash Accent',
    type: 'panel',
    zone: 'feature-wall',
    size: [4.55, 1.18, 0.06],
    position: [-1.1, 1.92, -1.02],
    normal: [0, 0, 1],
    depthOffset: 0.04,
  },
];

// ─── Bedroom / Wardrobe Suite ──────────────────────────────────────────────

const BEDROOM_PARTS: RoomConfig['parts'] = [
  {
    id: 'wardrobe-left-door',
    name: 'Left Wardrobe Door',
    type: 'door',
    zone: 'wardrobe-doors',
    size: [1.22, 4.55, 0.08],
    position: [-2.55, 2.4, -0.8],
    normal: [0, 0, 1],
    depthOffset: 0.1,
  },
  {
    id: 'wardrobe-center-left-door',
    name: 'Center Left Door',
    type: 'door',
    zone: 'wardrobe-doors',
    size: [1.22, 4.55, 0.08],
    position: [-1.15, 2.4, -0.8],
    normal: [0, 0, 1],
    depthOffset: 0.1,
  },
  {
    id: 'wardrobe-center-right-door',
    name: 'Center Right Door',
    type: 'door',
    zone: 'wardrobe-doors',
    size: [1.22, 4.55, 0.08],
    position: [0.25, 2.4, -0.8],
    normal: [0, 0, 1],
    depthOffset: 0.1,
  },
  {
    id: 'wardrobe-right-door',
    name: 'Right Wardrobe Door',
    type: 'door',
    zone: 'wardrobe-doors',
    size: [1.22, 4.55, 0.08],
    position: [1.65, 2.4, -0.8],
    normal: [0, 0, 1],
    depthOffset: 0.1,
  },
  {
    id: 'wardrobe-loft-left',
    name: 'Loft Left Panel',
    type: 'panel',
    zone: 'loft-storage',
    size: [2.7, 1.02, 0.08],
    position: [-1.85, 5.22, -0.8],
    normal: [0, 0, 1],
    depthOffset: 0.08,
  },
  {
    id: 'wardrobe-loft-right',
    name: 'Loft Right Panel',
    type: 'panel',
    zone: 'loft-storage',
    size: [2.72, 1.02, 0.08],
    position: [0.95, 5.22, -0.8],
    normal: [0, 0, 1],
    depthOffset: 0.08,
  },
  {
    id: 'wardrobe-vanity-drawers',
    name: 'Vanity Drawer Fronts',
    type: 'drawer',
    zone: 'drawer-fronts',
    size: [1.28, 1.68, 0.08],
    position: [3.88, 1.02, 0.96],
    normal: [0, 0, 1],
    depthOffset: 0.12,
  },
  {
    id: 'wardrobe-vanity-panel',
    name: 'Vanity Side Panel',
    type: 'panel',
    zone: 'accent-panel',
    size: [1.38, 2.28, 0.08],
    position: [3.88, 2.62, -0.24],
    normal: [0, 0, 1],
    depthOffset: 0.08,
  },
];

// ─── TV Unit ───────────────────────────────────────────────────────────────

const TV_PARTS: RoomConfig['parts'] = [
  {
    id: 'tv-feature-wall',
    name: 'Fluted Back Panel',
    type: 'panel',
    zone: 'feature-wall',
    size: [4.3, 4.55, 0.08],
    position: [-1.25, 2.25, -1.68],
    normal: [0, 0, 1],
    depthOffset: 0.06,
  },
  {
    id: 'tv-center-panel',
    name: 'TV Center Panel',
    type: 'panel',
    zone: 'feature-wall',
    size: [2.08, 3.18, 0.08],
    position: [-1.15, 2.12, -1.57],
    normal: [0, 0, 1],
    depthOffset: 0.1,
  },
  {
    id: 'tv-console-left',
    name: 'Console Left Drawer',
    type: 'drawer',
    zone: 'console-fronts',
    size: [1.2, 0.74, 0.08],
    position: [-2.3, 0.72, 0.32],
    normal: [0, 0, 1],
    depthOffset: 0.12,
  },
  {
    id: 'tv-console-center',
    name: 'Console Center Drawer',
    type: 'drawer',
    zone: 'console-fronts',
    size: [1.2, 0.74, 0.08],
    position: [-1.0, 0.72, 0.32],
    normal: [0, 0, 1],
    depthOffset: 0.12,
  },
  {
    id: 'tv-console-right',
    name: 'Console Right Drawer',
    type: 'drawer',
    zone: 'console-fronts',
    size: [1.2, 0.74, 0.08],
    position: [0.3, 0.72, 0.32],
    normal: [0, 0, 1],
    depthOffset: 0.12,
  },
  {
    id: 'tv-shelf-panel',
    name: 'Floating Shelf Accent',
    type: 'panel',
    zone: 'accent-panel',
    size: [1.16, 2.52, 0.08],
    position: [2.48, 2.2, -0.72],
    normal: [0, 0, 1],
    depthOffset: 0.06,
  },
  {
    id: 'tv-side-tower',
    name: 'Display Tower Front',
    type: 'door',
    zone: 'display-tower',
    size: [1.18, 4.55, 0.08],
    position: [3.82, 2.32, -0.88],
    normal: [0, 0, 1],
    depthOffset: 0.1,
  },
];

// ─── Exported rooms ────────────────────────────────────────────────────────

export const ROOMS: RoomConfig[] = [
  {
    id: 'kitchen-atelier',
    name: 'Modular Kitchen Atelier',
    shortLabel: 'Kitchen',
    modelUrl: '/assets/studio-models/kitchen-atelier.glb',
    defaultCameraPosition: [7.5, 4.7, 8.4],
    cameraTarget: [0.2, 1.55, 0.0],
    fov: 36,
    defaultFocusPartId: 'kitchen-island-front',
    intro:
      'Open-plan premium kitchen with tall storage, wall cabinets, and an island built for fast laminate exploration.',
    shareLabel: 'Kitchen',
    parts: KITCHEN_PARTS,
    zones: deriveZones(KITCHEN_PARTS),
    defaultAssignments: {
      'kitchen-base-left-door': 'acrylic-super-white',
      'kitchen-base-right-door': 'acrylic-super-white',
      'kitchen-base-drawers': 'pvc-metallic-white',
      'kitchen-wall-left-door': 'acrylic-super-white',
      'kitchen-wall-right-door': 'acrylic-super-white',
      'kitchen-pantry-door': 'acrylic-gothic-grey',
      'kitchen-island-front': 'pvc-calcutta-topaz',
      'kitchen-backsplash-panel': 'acrylic-rose-gold',
    },
  },
  {
    id: 'wardrobe-suite',
    name: 'Bedroom Wardrobe Suite',
    shortLabel: 'Bedroom',
    modelUrl: '/assets/studio-models/wardrobe-suite.glb',
    defaultCameraPosition: [6.4, 4.2, 8.6],
    cameraTarget: [0.0, 1.9, -0.45],
    fov: 36,
    defaultFocusPartId: 'wardrobe-center-left-door',
    intro:
      'Full-height wardrobe wall with loft units, a vanity stack, and layered material zones for quick customisation.',
    shareLabel: 'Bedroom',
    parts: BEDROOM_PARTS,
    zones: deriveZones(BEDROOM_PARTS),
    defaultAssignments: {
      'wardrobe-left-door': 'asa-orchid-white',
      'wardrobe-center-left-door': 'acrylic-gothic-grey',
      'wardrobe-center-right-door': 'acrylic-gothic-grey',
      'wardrobe-right-door': 'asa-orchid-white',
      'wardrobe-loft-left': 'asa-oyster',
      'wardrobe-loft-right': 'asa-oyster',
      'wardrobe-vanity-drawers': 'acrylic-english-green',
      'wardrobe-vanity-panel': 'pvc-monaco-walnut',
    },
  },
  {
    id: 'tv-lounge-suite',
    name: 'TV Lounge Statement Unit',
    shortLabel: 'TV Unit',
    modelUrl: '/assets/studio-models/tv-lounge-suite.glb',
    defaultCameraPosition: [6.8, 3.6, 7.4],
    cameraTarget: [0.0, 1.65, -1.1],
    fov: 36,
    defaultFocusPartId: 'tv-feature-wall',
    intro:
      'Premium media wall with layered panels, floating console storage, and accent trims showcasing contrasting finishes.',
    shareLabel: 'TV Unit',
    parts: TV_PARTS,
    zones: deriveZones(TV_PARTS),
    defaultAssignments: {
      'tv-feature-wall': 'pvc-mystona-flute',
      'tv-center-panel': 'acrylic-calcutta-marble',
      'tv-console-left': 'pvc-monaco-walnut',
      'tv-console-center': 'pvc-monaco-walnut',
      'tv-console-right': 'pvc-monaco-walnut',
      'tv-shelf-panel': 'acrylic-rose-gold',
      'tv-side-tower': 'acrylic-gothic-grey',
    },
  },
];

/** Quick O(1) lookup by room id */
export const ROOMS_BY_ID: Record<string, RoomConfig> = Object.fromEntries(
  ROOMS.map((room) => [room.id, room])
);
