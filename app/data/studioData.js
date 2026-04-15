import { acrylicCatalogProducts } from './acrylicCatalog';
import { asaCatalogProducts } from './asaCatalog';
import { pvcCatalogProducts } from './pvcCatalog';

function getCatalogItem(items, code) {
  const item = items.find((entry) => entry.code === code);

  if (!item) {
    throw new Error(`Missing studio catalog item for code: ${code}`);
  }

  return item;
}

function buildStudioMaterial(source, config) {
  return {
    id: config.id,
    code: source.code,
    name: source.name,
    category: config.category,
    collection: source.collection,
    image: source.image,
    texture: source.image,
    finish: config.finish,
    sheen: config.sheen,
    baseColor: config.baseColor,
    accentColor: config.accentColor,
    reflectivity: config.reflectivity,
    roughness: config.roughness,
    textureScale: config.textureScale || [2, 2],
    repeat: config.repeat || [1.5, 1.5],
    tags: config.tags || [],
    note: config.note,
    recommendedFor: config.recommendedFor,
    featured: config.featured ?? false,
    active: true,
    luxuryScore: config.luxuryScore,
    thickness: config.thickness,
    arSafe: config.arSafe ?? true
  };
}

export const studioMaterials = [
  buildStudioMaterial(getCatalogItem(pvcCatalogProducts, 'RL-206'), {
    id: 'pvc-mapple-walnut',
    category: 'PVC Laminate',
    finish: 'Woodgrain',
    sheen: 'Soft matte',
    baseColor: '#7d583b',
    accentColor: '#d0b28c',
    reflectivity: 0.18,
    roughness: 0.66,
    textureScale: [2.3, 2.3],
    tags: ['Warm grain', 'Wardrobes', 'Bedrooms'],
    note: 'A deeply warm walnut-inspired laminate for refined, tactile joinery.',
    recommendedFor: ['wardrobe-suite', 'bedroom-signature'],
    featured: true,
    luxuryScore: 93,
    thickness: '1.0 mm'
  }),
  buildStudioMaterial(getCatalogItem(pvcCatalogProducts, 'RL-209'), {
    id: 'pvc-monaco-walnut',
    category: 'PVC Laminate',
    finish: 'Woodgrain',
    sheen: 'Satin',
    baseColor: '#5c412c',
    accentColor: '#a57c56',
    reflectivity: 0.22,
    roughness: 0.58,
    textureScale: [2.1, 2.1],
    tags: ['Rich walnut', 'TV units', 'Luxury joinery'],
    note: 'Darker walnut movement designed for statement cabinetry and lounge furniture.',
    recommendedFor: ['tv-lounge-suite', 'wardrobe-suite'],
    featured: true,
    luxuryScore: 95,
    thickness: '1.0 mm'
  }),
  buildStudioMaterial(getCatalogItem(pvcCatalogProducts, 'RL-1004'), {
    id: 'pvc-onyx-pearl',
    category: 'PVC Laminate',
    finish: 'Stone marble',
    sheen: 'Silk matte',
    baseColor: '#d2ccc6',
    accentColor: '#b29f95',
    reflectivity: 0.2,
    roughness: 0.52,
    textureScale: [1.5, 1.5],
    tags: ['Marble', 'Kitchen islands', 'Feature panels'],
    note: 'Muted onyx stone character with a tailored, premium stone visual.',
    recommendedFor: ['kitchen-atelier', 'tv-lounge-suite'],
    featured: true,
    luxuryScore: 92,
    thickness: '1.0 mm'
  }),
  buildStudioMaterial(getCatalogItem(pvcCatalogProducts, 'RL-1014'), {
    id: 'pvc-luxe-pietra',
    category: 'PVC Laminate',
    finish: 'Stone marble',
    sheen: 'Velvet matte',
    baseColor: '#988c83',
    accentColor: '#ddd2cb',
    reflectivity: 0.16,
    roughness: 0.72,
    textureScale: [1.8, 1.8],
    tags: ['Stone texture', 'Bedrooms', 'Accent walls'],
    note: 'Smoky stone with a velvet depth for architectural joinery and statement headboards.',
    recommendedFor: ['bedroom-signature', 'tv-lounge-suite'],
    luxuryScore: 90,
    thickness: '1.0 mm'
  }),
  buildStudioMaterial(getCatalogItem(pvcCatalogProducts, 'RL-2001'), {
    id: 'pvc-calcutta-topaz',
    category: 'PVC Laminate',
    finish: 'Fluted stone',
    sheen: 'Satin',
    baseColor: '#ccb7a4',
    accentColor: '#f0e3d5',
    reflectivity: 0.24,
    roughness: 0.48,
    textureScale: [1.25, 1.25],
    repeat: [1.1, 1.1],
    tags: ['Fluted', 'Kitchen feature', 'Vertical detail'],
    note: 'A dimensional fluted stone visual that feels editorial in premium kitchens.',
    recommendedFor: ['kitchen-atelier', 'tv-lounge-suite'],
    featured: true,
    luxuryScore: 97,
    thickness: '1.0 mm'
  }),
  buildStudioMaterial(getCatalogItem(pvcCatalogProducts, 'RL-2053'), {
    id: 'pvc-mystona-flute',
    category: 'PVC Laminate',
    finish: 'Fluted stone',
    sheen: 'Textured matte',
    baseColor: '#7f756e',
    accentColor: '#ddd4cd',
    reflectivity: 0.14,
    roughness: 0.7,
    textureScale: [1.35, 1.35],
    repeat: [1.05, 1.05],
    tags: ['Fluted', 'TV units', 'Vertical panels'],
    note: 'Dark fluted texture for strong rhythm and a high-end furniture silhouette.',
    recommendedFor: ['tv-lounge-suite', 'wardrobe-suite'],
    luxuryScore: 94,
    thickness: '1.0 mm'
  }),
  buildStudioMaterial(getCatalogItem(pvcCatalogProducts, 'RL-801'), {
    id: 'pvc-metallic-white',
    category: 'PVC Laminate',
    finish: 'Metallic',
    sheen: 'Brushed satin',
    baseColor: '#d8d4cf',
    accentColor: '#ffffff',
    reflectivity: 0.44,
    roughness: 0.3,
    textureScale: [1.8, 1.8],
    tags: ['Metallic', 'Handles', 'Contemporary'],
    note: 'Soft metallic white for trims, panels, and premium accent zones.',
    recommendedFor: ['kitchen-atelier', 'tv-lounge-suite'],
    luxuryScore: 88,
    thickness: '1.0 mm'
  }),
  buildStudioMaterial(getCatalogItem(pvcCatalogProducts, 'RL-417'), {
    id: 'pvc-galaxy-arctic',
    category: 'PVC Laminate',
    finish: 'Sparkle',
    sheen: 'Gloss sparkle',
    baseColor: '#c8c6c9',
    accentColor: '#f4f5f8',
    reflectivity: 0.56,
    roughness: 0.24,
    textureScale: [1.8, 1.8],
    tags: ['Sparkle', 'Luxury vanity', 'Accent shutters'],
    note: 'A shimmering light grey surface for expressive, gallery-like cabinetry.',
    recommendedFor: ['bedroom-signature', 'kitchen-atelier'],
    luxuryScore: 86,
    thickness: '1.0 mm'
  }),
  buildStudioMaterial(getCatalogItem(pvcCatalogProducts, 'RL-301'), {
    id: 'pvc-pure-white',
    category: 'PVC Laminate',
    finish: 'Solid pastel',
    sheen: 'High clean matte',
    baseColor: '#f4f1ec',
    accentColor: '#ffffff',
    reflectivity: 0.18,
    roughness: 0.58,
    textureScale: [2, 2],
    tags: ['Soft white', 'Minimal kitchen', 'Full-room base'],
    note: 'A calm white base surface that supports richer accent laminates beautifully.',
    recommendedFor: ['kitchen-atelier', 'wardrobe-suite'],
    luxuryScore: 84,
    thickness: '1.0 mm'
  }),
  buildStudioMaterial(getCatalogItem(acrylicCatalogProducts, 'RB-1101'), {
    id: 'acrylic-super-white',
    category: 'Acrylic Sheet',
    finish: 'High gloss',
    sheen: 'Mirror gloss',
    baseColor: '#fbfbfa',
    accentColor: '#ffffff',
    reflectivity: 0.72,
    roughness: 0.12,
    textureScale: [1.75, 1.75],
    tags: ['Mirror gloss', 'Luxury kitchens', 'Clean white'],
    note: 'A showroom-grade white acrylic finish with sharp reflections and crisp edges.',
    recommendedFor: ['kitchen-atelier', 'wardrobe-suite'],
    featured: true,
    luxuryScore: 96,
    thickness: '1.3 mm'
  }),
  buildStudioMaterial(getCatalogItem(acrylicCatalogProducts, 'RB-1107'), {
    id: 'acrylic-gothic-grey',
    category: 'Acrylic Sheet',
    finish: 'High gloss',
    sheen: 'Reflective graphite',
    baseColor: '#767b82',
    accentColor: '#d8dde3',
    reflectivity: 0.7,
    roughness: 0.16,
    textureScale: [1.75, 1.75],
    tags: ['Graphite gloss', 'Wardrobes', 'TV units'],
    note: 'Cool graphite acrylic for smoky luxe wardrobes and floating media consoles.',
    recommendedFor: ['wardrobe-suite', 'tv-lounge-suite'],
    featured: true,
    luxuryScore: 93,
    thickness: '1.3 mm'
  }),
  buildStudioMaterial(getCatalogItem(acrylicCatalogProducts, 'RB-1119'), {
    id: 'acrylic-english-green',
    category: 'Acrylic Sheet',
    finish: 'High gloss',
    sheen: 'Jewelled gloss',
    baseColor: '#3f5842',
    accentColor: '#b2c9b4',
    reflectivity: 0.68,
    roughness: 0.14,
    textureScale: [1.75, 1.75],
    tags: ['Heritage green', 'Premium wardrobes', 'Statement shutters'],
    note: 'A rich English green gloss that gives cabinetry a tailored luxury signature.',
    recommendedFor: ['wardrobe-suite', 'bedroom-signature'],
    luxuryScore: 94,
    thickness: '1.3 mm'
  }),
  buildStudioMaterial(getCatalogItem(acrylicCatalogProducts, 'RB-1204'), {
    id: 'acrylic-silver-sleek',
    category: 'Acrylic Sheet',
    finish: 'Metallic gloss',
    sheen: 'Polished metallic',
    baseColor: '#a6aaaf',
    accentColor: '#eef0f4',
    reflectivity: 0.74,
    roughness: 0.12,
    textureScale: [1.75, 1.75],
    tags: ['Metallic', 'Future-luxe', 'Island fronts'],
    note: 'Polished silver acrylic designed for ultra-modern furniture compositions.',
    recommendedFor: ['kitchen-atelier', 'tv-lounge-suite'],
    luxuryScore: 91,
    thickness: '1.3 mm'
  }),
  buildStudioMaterial(getCatalogItem(acrylicCatalogProducts, 'RB-1301'), {
    id: 'acrylic-calcutta-marble',
    category: 'Acrylic Sheet',
    finish: 'Marble gloss',
    sheen: 'Stone gloss',
    baseColor: '#cfc7bf',
    accentColor: '#fbf9f4',
    reflectivity: 0.54,
    roughness: 0.18,
    textureScale: [1.4, 1.4],
    repeat: [1.1, 1.1],
    tags: ['Marble', 'Feature walls', 'Premium bedrooms'],
    note: 'Calcutta marble acrylic with a polished editorial presence for luxury furniture fronts.',
    recommendedFor: ['bedroom-signature', 'tv-lounge-suite'],
    featured: true,
    luxuryScore: 95,
    thickness: '1.3 mm'
  }),
  buildStudioMaterial(getCatalogItem(acrylicCatalogProducts, 'RB-1402'), {
    id: 'acrylic-rose-gold',
    category: 'Acrylic Sheet',
    finish: 'Mirror metallic',
    sheen: 'Rose gold mirror',
    baseColor: '#b78267',
    accentColor: '#f4c4ab',
    reflectivity: 0.82,
    roughness: 0.08,
    textureScale: [1.4, 1.4],
    tags: ['Rose gold', 'Accent trims', 'Luxury highlights'],
    note: 'Mirror-like rose gold acrylic for high-impact trims and accent panels.',
    recommendedFor: ['kitchen-atelier', 'bedroom-signature'],
    luxuryScore: 98,
    thickness: '1.3 mm',
    arSafe: false
  }),
  buildStudioMaterial(getCatalogItem(asaCatalogProducts, 'RB-101'), {
    id: 'asa-orchid-white',
    category: 'ASA Laminate',
    finish: 'Super matte',
    sheen: 'Soft touch',
    baseColor: '#efede7',
    accentColor: '#ffffff',
    reflectivity: 0.08,
    roughness: 0.82,
    textureScale: [1.6, 1.6],
    tags: ['Super matte', 'Finger friendly', 'Minimal wardrobes'],
    note: 'An ultra-soft white ASA surface for calm, low-glare furniture programs.',
    recommendedFor: ['wardrobe-suite', 'kitchen-atelier'],
    featured: true,
    luxuryScore: 90,
    thickness: '1.0 mm'
  }),
  buildStudioMaterial(getCatalogItem(asaCatalogProducts, 'RB-104'), {
    id: 'asa-oyster',
    category: 'ASA Laminate',
    finish: 'Super matte',
    sheen: 'Stone matte',
    baseColor: '#d0c8be',
    accentColor: '#f2ece3',
    reflectivity: 0.1,
    roughness: 0.8,
    textureScale: [1.6, 1.6],
    tags: ['Warm neutral', 'Bedrooms', 'Calm spaces'],
    note: 'A warm oyster neutral with a refined low-sheen architectural finish.',
    recommendedFor: ['bedroom-signature', 'wardrobe-suite'],
    luxuryScore: 89,
    thickness: '1.0 mm'
  }),
  buildStudioMaterial(getCatalogItem(asaCatalogProducts, 'RB-123'), {
    id: 'asa-sage',
    category: 'ASA Laminate',
    finish: 'Super matte',
    sheen: 'Velvet touch',
    baseColor: '#8a9279',
    accentColor: '#cfd9bd',
    reflectivity: 0.08,
    roughness: 0.84,
    textureScale: [1.6, 1.6],
    tags: ['Muted sage', 'Designer palette', 'Wellness interiors'],
    note: 'Muted sage for restorative wardrobes, dressers, and bedroom accents.',
    recommendedFor: ['bedroom-signature', 'wardrobe-suite'],
    luxuryScore: 87,
    thickness: '1.0 mm'
  }),
  buildStudioMaterial(getCatalogItem(asaCatalogProducts, 'RB-126'), {
    id: 'asa-wisteria',
    category: 'ASA Laminate',
    finish: 'Super matte',
    sheen: 'Powdery matte',
    baseColor: '#a99faf',
    accentColor: '#e2d8ea',
    reflectivity: 0.06,
    roughness: 0.86,
    textureScale: [1.6, 1.6],
    tags: ['Muted mauve', 'Boutique bedrooms', 'Accent furniture'],
    note: 'A powdery wisteria shade that feels boutique and quietly expressive.',
    recommendedFor: ['bedroom-signature', 'tv-lounge-suite'],
    luxuryScore: 85,
    thickness: '1.0 mm'
  })
];

export const studioLightingPresets = [
  {
    id: 'showroom',
    label: 'Showroom',
    description: 'Bright, balanced display lighting for premium sales presentations.',
    ambient: 0.85,
    directional: 1.1,
    rim: 0.5,
    warmth: 0.05,
    exposure: 1
  },
  {
    id: 'residential',
    label: 'Warm Residence',
    description: 'Soft residential warmth for kitchens, bedrooms, and wardrobes.',
    ambient: 0.65,
    directional: 0.92,
    rim: 0.32,
    warmth: 0.2,
    exposure: 0.92
  },
  {
    id: 'editorial',
    label: 'Editorial Night',
    description: 'High-contrast mood lighting for shareable hero compositions.',
    ambient: 0.38,
    directional: 0.88,
    rim: 0.72,
    warmth: -0.04,
    exposure: 0.8
  }
];

export const studioFeatureCards = [
  {
    title: 'Part-level material swaps',
    detail: 'Click shutters, panels, drawers, or headboards and apply curated materials instantly.'
  },
  {
    title: 'Camera and lighting controls',
    detail: 'Orbit, zoom, and shift lighting mood for confident room finish comparisons.'
  },
  {
    title: 'Save, share, and quote workflows',
    detail: 'Generate shareable links, save concepts locally, and send a pre-composed quote brief to sales.'
  }
];

export const studioSpaces = [
  {
    id: 'kitchen-atelier',
    name: 'Modular Kitchen Atelier',
    shortLabel: 'Kitchen',
    category: 'Modular Kitchen',
    heroImage: '/assets/images/herobg.png',
    mood: 'Refined hospitality warmth with stone accents and glossy precision.',
    description:
      'An open premium kitchen with tall storage, wall cabinets, and an island built for fast laminate exploration.',
    dimensions: '16 x 12 ft',
    priceBand: 'Premium',
    partCount: 8,
    arReady: true,
    defaultFocusPartId: 'kitchen-island-front',
    camera: {
      position: [7.5, 4.7, 8.4],
      target: [0.2, 1.55, 0]
    },
    stats: [
      { label: 'Space Type', value: 'Modular kitchen' },
      { label: 'Editable Parts', value: '8 components' },
      { label: 'Ideal Materials', value: 'Acrylic + PVC stone' }
    ],
    defaultAssignments: {
      'kitchen-base-left-door': 'acrylic-super-white',
      'kitchen-base-right-door': 'acrylic-super-white',
      'kitchen-base-drawers': 'pvc-metallic-white',
      'kitchen-wall-left-door': 'acrylic-super-white',
      'kitchen-wall-right-door': 'acrylic-super-white',
      'kitchen-pantry-door': 'acrylic-gothic-grey',
      'kitchen-island-front': 'pvc-calcutta-topaz',
      'kitchen-backsplash-panel': 'acrylic-rose-gold'
    },
    parts: [
      {
        id: 'kitchen-base-left-door',
        name: 'Base Left Door',
        type: 'door',
        zone: 'base-cabinetry',
        size: [1.08, 1.72, 0.08],
        position: [-2.2, 0.98, 1.32],
        normal: [0, 0, 1],
        depthOffset: 0.1
      },
      {
        id: 'kitchen-base-right-door',
        name: 'Base Right Door',
        type: 'door',
        zone: 'base-cabinetry',
        size: [1.08, 1.72, 0.08],
        position: [-0.9, 0.98, 1.32],
        normal: [0, 0, 1],
        depthOffset: 0.1
      },
      {
        id: 'kitchen-base-drawers',
        name: 'Drawer Stack',
        type: 'drawer',
        zone: 'drawer-fronts',
        size: [1.12, 1.72, 0.08],
        position: [0.55, 0.98, 1.32],
        normal: [0, 0, 1],
        depthOffset: 0.12
      },
      {
        id: 'kitchen-wall-left-door',
        name: 'Wall Cabinet Left',
        type: 'wall-cabinet',
        zone: 'wall-cabinetry',
        size: [1.08, 1.28, 0.08],
        position: [-2.2, 3.08, -0.42],
        normal: [0, 0, 1],
        depthOffset: 0.08
      },
      {
        id: 'kitchen-wall-right-door',
        name: 'Wall Cabinet Right',
        type: 'wall-cabinet',
        zone: 'wall-cabinetry',
        size: [1.08, 1.28, 0.08],
        position: [-0.9, 3.08, -0.42],
        normal: [0, 0, 1],
        depthOffset: 0.08
      },
      {
        id: 'kitchen-pantry-door',
        name: 'Pantry Tower',
        type: 'door',
        zone: 'tall-unit',
        size: [1.2, 4.25, 0.08],
        position: [3.1, 2.35, -0.58],
        normal: [0, 0, 1],
        depthOffset: 0.1
      },
      {
        id: 'kitchen-island-front',
        name: 'Island Feature Panel',
        type: 'panel',
        zone: 'island',
        size: [3.3, 1.52, 0.1],
        position: [0.35, 0.92, 3.45],
        normal: [0, 0, 1],
        depthOffset: 0.12
      },
      {
        id: 'kitchen-backsplash-panel',
        name: 'Backsplash Accent',
        type: 'panel',
        zone: 'feature-wall',
        size: [4.55, 1.18, 0.06],
        position: [-1.1, 1.92, -1.02],
        normal: [0, 0, 1],
        depthOffset: 0.04
      }
    ],
    carcass: [
      { size: [4.2, 1.95, 1.26], position: [-0.82, 1.0, 0.76], color: '#e6ddd3' },
      { size: [4.1, 1.42, 0.96], position: [-0.82, 3.06, -0.92], color: '#ece4da' },
      { size: [1.34, 4.38, 1.08], position: [3.15, 2.28, -0.95], color: '#dfd3c8' },
      { size: [3.6, 1.7, 1.58], position: [0.35, 0.96, 2.82], color: '#d9cec1' },
      { size: [4.5, 0.1, 0.72], position: [-1.1, 1.26, -1.02], color: '#efe6dd' }
    ]
  },
  {
    id: 'wardrobe-suite',
    name: 'Wardrobe Gallery Suite',
    shortLabel: 'Wardrobe',
    category: 'Wardrobe',
    heroImage: '/assets/images/Categories4.png',
    mood: 'Mirror-like shutters balanced with matte neutrals and boutique detailing.',
    description:
      'A full-height wardrobe wall with loft units, a vanity stack, and layered material zones for quick customisation.',
    dimensions: '14 x 11 ft',
    priceBand: 'Luxury',
    partCount: 8,
    arReady: true,
    defaultFocusPartId: 'wardrobe-center-left-door',
    camera: {
      position: [6.4, 4.2, 8.6],
      target: [0, 1.9, -0.45]
    },
    stats: [
      { label: 'Space Type', value: 'Luxury wardrobe' },
      { label: 'Editable Parts', value: '8 components' },
      { label: 'Ideal Materials', value: 'ASA + Acrylic gloss' }
    ],
    defaultAssignments: {
      'wardrobe-left-door': 'asa-orchid-white',
      'wardrobe-center-left-door': 'acrylic-gothic-grey',
      'wardrobe-center-right-door': 'acrylic-gothic-grey',
      'wardrobe-right-door': 'asa-orchid-white',
      'wardrobe-loft-left': 'asa-oyster',
      'wardrobe-loft-right': 'asa-oyster',
      'wardrobe-vanity-drawers': 'acrylic-english-green',
      'wardrobe-vanity-panel': 'pvc-monaco-walnut'
    },
    parts: [
      {
        id: 'wardrobe-left-door',
        name: 'Left Wardrobe Door',
        type: 'door',
        zone: 'wardrobe-doors',
        size: [1.22, 4.55, 0.08],
        position: [-2.55, 2.4, -0.8],
        normal: [0, 0, 1],
        depthOffset: 0.1
      },
      {
        id: 'wardrobe-center-left-door',
        name: 'Center Left Door',
        type: 'door',
        zone: 'wardrobe-doors',
        size: [1.22, 4.55, 0.08],
        position: [-1.15, 2.4, -0.8],
        normal: [0, 0, 1],
        depthOffset: 0.1
      },
      {
        id: 'wardrobe-center-right-door',
        name: 'Center Right Door',
        type: 'door',
        zone: 'wardrobe-doors',
        size: [1.22, 4.55, 0.08],
        position: [0.25, 2.4, -0.8],
        normal: [0, 0, 1],
        depthOffset: 0.1
      },
      {
        id: 'wardrobe-right-door',
        name: 'Right Wardrobe Door',
        type: 'door',
        zone: 'wardrobe-doors',
        size: [1.22, 4.55, 0.08],
        position: [1.65, 2.4, -0.8],
        normal: [0, 0, 1],
        depthOffset: 0.1
      },
      {
        id: 'wardrobe-loft-left',
        name: 'Loft Left Panel',
        type: 'panel',
        zone: 'loft-storage',
        size: [2.7, 1.02, 0.08],
        position: [-1.85, 5.22, -0.8],
        normal: [0, 0, 1],
        depthOffset: 0.08
      },
      {
        id: 'wardrobe-loft-right',
        name: 'Loft Right Panel',
        type: 'panel',
        zone: 'loft-storage',
        size: [2.72, 1.02, 0.08],
        position: [0.95, 5.22, -0.8],
        normal: [0, 0, 1],
        depthOffset: 0.08
      },
      {
        id: 'wardrobe-vanity-drawers',
        name: 'Vanity Drawer Fronts',
        type: 'drawer',
        zone: 'drawer-fronts',
        size: [1.28, 1.68, 0.08],
        position: [3.88, 1.02, 0.96],
        normal: [0, 0, 1],
        depthOffset: 0.12
      },
      {
        id: 'wardrobe-vanity-panel',
        name: 'Vanity Side Panel',
        type: 'panel',
        zone: 'accent-panel',
        size: [1.38, 2.28, 0.08],
        position: [3.88, 2.62, -0.24],
        normal: [0, 0, 1],
        depthOffset: 0.08
      }
    ],
    carcass: [
      { size: [5.82, 5.75, 1.12], position: [-0.45, 2.75, -1.32], color: '#e5ddd2' },
      { size: [1.58, 2.1, 1.1], position: [3.88, 1.05, 0.28], color: '#e8dfd4' },
      { size: [1.6, 2.68, 0.22], position: [3.88, 3.02, -0.58], color: '#d9cfc5' }
    ]
  },
  {
    id: 'tv-lounge-suite',
    name: 'TV Lounge Statement Unit',
    shortLabel: 'TV Unit',
    category: 'TV Unit',
    heroImage: '/assets/images/aboutRight.png',
    mood: 'Gallery-like composition with fluted verticals, floating cabinetry, and stone-backed drama.',
    description:
      'A premium media wall with layered panels, floating console storage, and accent trims that showcase contrasting finishes.',
    dimensions: '13 x 12 ft',
    priceBand: 'Luxury',
    partCount: 7,
    arReady: true,
    defaultFocusPartId: 'tv-feature-wall',
    camera: {
      position: [6.8, 3.6, 7.4],
      target: [0, 1.65, -1.1]
    },
    stats: [
      { label: 'Space Type', value: 'TV feature wall' },
      { label: 'Editable Parts', value: '7 components' },
      { label: 'Ideal Materials', value: 'PVC fluted + stone' }
    ],
    defaultAssignments: {
      'tv-feature-wall': 'pvc-mystona-flute',
      'tv-center-panel': 'acrylic-calcutta-marble',
      'tv-console-left': 'pvc-monaco-walnut',
      'tv-console-center': 'pvc-monaco-walnut',
      'tv-console-right': 'pvc-monaco-walnut',
      'tv-shelf-panel': 'acrylic-rose-gold',
      'tv-side-tower': 'acrylic-gothic-grey'
    },
    parts: [
      {
        id: 'tv-feature-wall',
        name: 'Fluted Back Panel',
        type: 'panel',
        zone: 'feature-wall',
        size: [4.3, 4.55, 0.08],
        position: [-1.25, 2.25, -1.68],
        normal: [0, 0, 1],
        depthOffset: 0.06
      },
      {
        id: 'tv-center-panel',
        name: 'TV Center Panel',
        type: 'panel',
        zone: 'feature-wall',
        size: [2.08, 3.18, 0.08],
        position: [-1.15, 2.12, -1.57],
        normal: [0, 0, 1],
        depthOffset: 0.1
      },
      {
        id: 'tv-console-left',
        name: 'Console Left Drawer',
        type: 'drawer',
        zone: 'console-fronts',
        size: [1.2, 0.74, 0.08],
        position: [-2.3, 0.72, 0.32],
        normal: [0, 0, 1],
        depthOffset: 0.12
      },
      {
        id: 'tv-console-center',
        name: 'Console Center Drawer',
        type: 'drawer',
        zone: 'console-fronts',
        size: [1.2, 0.74, 0.08],
        position: [-1.0, 0.72, 0.32],
        normal: [0, 0, 1],
        depthOffset: 0.12
      },
      {
        id: 'tv-console-right',
        name: 'Console Right Drawer',
        type: 'drawer',
        zone: 'console-fronts',
        size: [1.2, 0.74, 0.08],
        position: [0.3, 0.72, 0.32],
        normal: [0, 0, 1],
        depthOffset: 0.12
      },
      {
        id: 'tv-shelf-panel',
        name: 'Floating Shelf Accent',
        type: 'panel',
        zone: 'accent-panel',
        size: [1.16, 2.52, 0.08],
        position: [2.48, 2.2, -0.72],
        normal: [0, 0, 1],
        depthOffset: 0.06
      },
      {
        id: 'tv-side-tower',
        name: 'Display Tower Front',
        type: 'door',
        zone: 'display-tower',
        size: [1.18, 4.55, 0.08],
        position: [3.82, 2.32, -0.88],
        normal: [0, 0, 1],
        depthOffset: 0.1
      }
    ],
    carcass: [
      { size: [4.6, 4.8, 0.22], position: [-1.25, 2.3, -1.82], color: '#d8cec4' },
      { size: [4.15, 0.82, 1.04], position: [-1.0, 0.68, -0.16], color: '#e7dfd4' },
      { size: [1.36, 4.6, 1.12], position: [3.82, 2.32, -1.16], color: '#ddd3c7' }
    ]
  },
  {
    id: 'bedroom-signature',
    name: 'Bedroom Signature Ensemble',
    shortLabel: 'Bedroom',
    category: 'Bedroom Furniture',
    heroImage: '/assets/images/Laminates5.png',
    mood: 'A boutique suite with upholstered-scale geometry, layered headboard panels, and calm cabinetry tones.',
    description:
      'A bedroom furniture composition combining a feature headboard, bedside units, and a compact dresser wall for multi-zone customisation.',
    dimensions: '15 x 13 ft',
    priceBand: 'Luxury',
    partCount: 8,
    arReady: true,
    defaultFocusPartId: 'bedroom-headboard-center',
    camera: {
      position: [7.4, 4.4, 8.1],
      target: [0.2, 1.5, -0.4]
    },
    stats: [
      { label: 'Space Type', value: 'Bedroom suite' },
      { label: 'Editable Parts', value: '8 components' },
      { label: 'Ideal Materials', value: 'ASA + marble acrylic' }
    ],
    defaultAssignments: {
      'bedroom-headboard-left': 'asa-oyster',
      'bedroom-headboard-center': 'acrylic-calcutta-marble',
      'bedroom-headboard-right': 'asa-oyster',
      'bedroom-bed-base': 'pvc-mapple-walnut',
      'bedroom-side-left': 'asa-sage',
      'bedroom-side-right': 'asa-sage',
      'bedroom-dresser-front': 'acrylic-english-green',
      'bedroom-wardrobe-panel': 'asa-wisteria'
    },
    parts: [
      {
        id: 'bedroom-headboard-left',
        name: 'Headboard Left Wing',
        type: 'panel',
        zone: 'headboard',
        size: [1.6, 2.82, 0.08],
        position: [-1.95, 1.98, -1.62],
        normal: [0, 0, 1],
        depthOffset: 0.06
      },
      {
        id: 'bedroom-headboard-center',
        name: 'Headboard Center Panel',
        type: 'panel',
        zone: 'headboard',
        size: [2.46, 2.9, 0.08],
        position: [0, 2.0, -1.56],
        normal: [0, 0, 1],
        depthOffset: 0.08
      },
      {
        id: 'bedroom-headboard-right',
        name: 'Headboard Right Wing',
        type: 'panel',
        zone: 'headboard',
        size: [1.6, 2.82, 0.08],
        position: [1.95, 1.98, -1.62],
        normal: [0, 0, 1],
        depthOffset: 0.06
      },
      {
        id: 'bedroom-bed-base',
        name: 'Bed Base Panel',
        type: 'panel',
        zone: 'bed-base',
        size: [4.25, 0.98, 0.08],
        position: [0, 0.62, 1.84],
        normal: [0, 0, 1],
        depthOffset: 0.1
      },
      {
        id: 'bedroom-side-left',
        name: 'Bedside Left Drawer',
        type: 'drawer',
        zone: 'bedside-units',
        size: [1.02, 0.94, 0.08],
        position: [-3.18, 0.76, 0.94],
        normal: [0, 0, 1],
        depthOffset: 0.12
      },
      {
        id: 'bedroom-side-right',
        name: 'Bedside Right Drawer',
        type: 'drawer',
        zone: 'bedside-units',
        size: [1.02, 0.94, 0.08],
        position: [3.18, 0.76, 0.94],
        normal: [0, 0, 1],
        depthOffset: 0.12
      },
      {
        id: 'bedroom-dresser-front',
        name: 'Dresser Drawer Fronts',
        type: 'drawer',
        zone: 'dresser',
        size: [1.72, 1.82, 0.08],
        position: [4.15, 1.06, -0.48],
        normal: [0, 0, 1],
        depthOffset: 0.12
      },
      {
        id: 'bedroom-wardrobe-panel',
        name: 'Wardrobe Accent Panel',
        type: 'door',
        zone: 'wardrobe-panel',
        size: [1.46, 4.25, 0.08],
        position: [4.15, 3.25, -1.02],
        normal: [0, 0, 1],
        depthOffset: 0.1
      }
    ],
    carcass: [
      { size: [5.5, 0.95, 6.1], position: [0, 0.44, -0.2], color: '#ded2c7' },
      { size: [5.7, 3.05, 0.18], position: [0, 2.02, -1.82], color: '#eae0d6' },
      { size: [1.26, 1.08, 1.1], position: [-3.18, 0.78, 0.42], color: '#e6dbcf' },
      { size: [1.26, 1.08, 1.1], position: [3.18, 0.78, 0.42], color: '#e6dbcf' },
      { size: [2.08, 2.18, 1.02], position: [4.15, 1.12, -0.86], color: '#ddd0c5' },
      { size: [1.62, 4.38, 1.06], position: [4.15, 2.98, -1.42], color: '#e3d7cb' }
    ]
  }
];

export const studioModelLibrary = studioSpaces.map((space) => ({
  id: space.id,
  name: space.name,
  shortLabel: space.shortLabel,
  category: space.category,
  parts: space.partCount,
  arReady: space.arReady,
  engine: 'Procedural WebGL',
  complexity: space.partCount > 7 ? 'Medium' : 'Low',
  hero: space.id === 'kitchen-atelier' || space.id === 'wardrobe-suite',
  active: true
}));

export const studioAdminHighlights = [
  {
    title: 'Catalog governance',
    detail: 'Toggle studio-ready materials and keep the customer experience focused on premium options.'
  },
  {
    title: 'Model availability',
    detail: 'Promote hero scenes, disable incomplete concepts, and keep the viewer catalog lean.'
  },
  {
    title: 'Shareable operations',
    detail: 'Export the current studio setup for future API or CMS integration without changing the UI contract.'
  }
];

export function getStudioMaterial(materialId) {
  return studioMaterials.find((material) => material.id === materialId);
}

export function getStudioSpace(spaceId) {
  return studioSpaces.find((space) => space.id === spaceId);
}

export function applyStudioAdminState(materials, spaces, models, adminState) {
  const materialOverrides = adminState?.materials || {};
  const spaceOverrides = adminState?.spaces || {};
  const modelOverrides = adminState?.models || {};

  return {
    materials: materials.map((material) => ({
      ...material,
      ...(materialOverrides[material.id] || {})
    })),
    spaces: spaces.map((space) => ({
      ...space,
      ...(spaceOverrides[space.id] || {})
    })),
    models: models.map((model) => ({
      ...model,
      ...(modelOverrides[model.id] || {})
    }))
  };
}
