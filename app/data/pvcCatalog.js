export const pvcCatalogCollections = [
  {
    slug: 'all',
    label: 'All Shades',
    description:
      'The complete Robel PVC laminate catalog with fluted finishes, marble-inspired slabs, metallic tones, wood textures, premium pastels, and glossy sparkle surfaces.'
  },
  {
    slug: 'fluted-series',
    label: 'Fluted Series',
    description:
      'Structured PVC laminates with sculpted rhythm and dimensional depth for statement wardrobes, panels, and furniture fronts.'
  },
  {
    slug: 'shimmer-velvet',
    label: 'Shimmer Velvet',
    description:
      'Soft-touch shimmer shades with a refined metallic feel for bold but elegant interior moments.'
  },
  {
    slug: 'marbito-series',
    label: 'Marbito Series',
    description:
      'Large-format marble visuals with premium veining and polished stone character for luxe interior programs.'
  },
  {
    slug: 'royal-velvet',
    label: 'Royal Velvet',
    description:
      'Calm, absorbent soft-touch shades with understated richness for contemporary wardrobes and quiet luxury spaces.'
  },
  {
    slug: 'metallic-finish',
    label: 'Metallic Finish',
    description:
      'Subtle metallic laminates designed to catch light softly while keeping a smooth architectural presence.'
  },
  {
    slug: 'natural-wood',
    label: 'Natural Wood',
    description:
      'Warm timber-inspired surfaces that bring natural grain, depth, and comfort into kitchens, wardrobes, and paneling.'
  },
  {
    slug: 'premium-pastels',
    label: 'Premium Pastels',
    description:
      'Muted color-led laminates for calm, designer-friendly interiors with a fresh modern personality.'
  },
  {
    slug: 'glowing-sparkle',
    label: 'Glowing Sparkle',
    description:
      'Fine sparkling laminates with soft visual shimmer for more expressive kitchens, wardrobes, and feature joinery.'
  }
];

const hiddenPvcCodes = new Set([
  'RL-601',
  'RL-602',
  'RL-603',
  'RL-604',
  'RL-1017',
  'RL-202',
  'RL-407',
  'RL-409',
  'RL-401',
  'RL-416',
  'RL-412',
  'RL-410',
  'RL-414',
  'RL-403',
  'RL-408',
  'RL-418',
  'RL-405'
]);

const allPvcCatalogProducts = [
  { code: 'RL-2001', name: 'Calcutta Topaz', collection: 'Fluted Series', slug: 'fluted-series', image: '/assets/pvc/catalog-clean/rl-2001.png', demoImage: '/assets/pvc/catalog-clean/rl-2001.png' },
  { code: 'RL-2002', name: 'Onyx Marble', collection: 'Fluted Series', slug: 'fluted-series', image: '/assets/pvc/catalog-clean/rl-2002.png', demoImage: '/assets/pvc/catalog-clean/rl-2002.png' },
  { code: 'RL-2003', name: 'Tivoli Sepia', collection: 'Fluted Series', slug: 'fluted-series', image: '/assets/pvc/catalog-clean/rl-2003.png', demoImage: '/assets/pvc/demo-clean/page-05-left.png' },
  { code: 'RL-2051', name: 'Aristrocart', collection: 'Fluted Series', slug: 'fluted-series', image: '/assets/pvc/catalog-clean/rl-2051.png', demoImage: '/assets/pvc/demo-clean/page-05-right.png' },
  { code: 'RL-2052', name: 'Peachy Desire', collection: 'Fluted Series', slug: 'fluted-series', image: '/assets/pvc/catalog-clean/rl-2052.png', demoImage: '/assets/pvc/demo-clean/page-06-left.png' },
  { code: 'RL-2053', name: 'Mystona Flute', collection: 'Fluted Series', slug: 'fluted-series', image: '/assets/pvc/catalog-clean/rl-2053.png', demoImage: '/assets/pvc/demo-clean/page-06-right.png' },
  { code: 'RL-601', name: 'Shimmer White', collection: 'Shimmer Velvet', slug: 'shimmer-velvet', image: '/assets/pvc/catalog-clean/rl-601-shade.png', demoImage: '/assets/pvc/catalog-clean/rl-601-shade.png' },
  { code: 'RL-602', name: 'Shimmer Black', collection: 'Shimmer Velvet', slug: 'shimmer-velvet', image: '/assets/pvc/catalog-clean/rl-602-alt.png', demoImage: '/assets/pvc/catalog-clean/rl-602-alt.png' },
  { code: 'RL-603', name: 'Shimmer Silver', collection: 'Shimmer Velvet', slug: 'shimmer-velvet', image: '/assets/pvc/catalog-clean/rl-603-alt.png', demoImage: '/assets/pvc/catalog-clean/rl-603-alt.png' },
  { code: 'RL-604', name: 'Shimmer Grey', collection: 'Shimmer Velvet', slug: 'shimmer-velvet', image: '/assets/pvc/catalog-clean/rl-604-alt2.png', demoImage: '/assets/pvc/catalog-clean/rl-604-alt2.png' },
  { code: 'RL-1017', name: 'Bianco Regale', collection: 'Marbito Series', slug: 'marbito-series', image: '/assets/pvc/catalog-clean/rl-1017.png', demoImage: '/assets/pvc/catalog-clean/rl-1017.png' },
  { code: 'RL-1001', name: 'Bianco Regale', collection: 'Marbito Series', slug: 'marbito-series', image: '/assets/pvc/catalog-clean/rl-1001.png', demoImage: '/assets/pvc/demo-clean/page-09-left.png' },
  { code: 'RL-1012', name: 'Monte Albus', collection: 'Marbito Series', slug: 'marbito-series', image: '/assets/pvc/catalog-clean/rl-1012.png', demoImage: '/assets/pvc/demo-clean/page-09-right.png' },
  { code: 'RL-1003', name: 'Carrara Mist', collection: 'Marbito Series', slug: 'marbito-series', image: '/assets/pvc/catalog-clean/rl-1003.png', demoImage: '/assets/pvc/demo-clean/page-10-left.png' },
  { code: 'RL-1004', name: 'Onyx Pearl', collection: 'Marbito Series', slug: 'marbito-series', image: '/assets/pvc/catalog-clean/rl-1004.png', demoImage: '/assets/pvc/demo-clean/page-10-right.png' },
  { code: 'RL-1005', name: 'Platinum Vein', collection: 'Marbito Series', slug: 'marbito-series', image: '/assets/pvc/catalog-clean/rl-1005.png', demoImage: '/assets/pvc/demo-clean/page-11-left.png' },
  { code: 'RL-1006', name: 'Silkstone White', collection: 'Marbito Series', slug: 'marbito-series', image: '/assets/pvc/catalog-clean/rl-1006.png', demoImage: '/assets/pvc/demo-clean/page-11-right.png' },
  { code: 'RL-1015', name: 'Venato Supreme', collection: 'Marbito Series', slug: 'marbito-series', image: '/assets/pvc/catalog-clean/rl-1015.png', demoImage: '/assets/pvc/demo-clean/page-12-center.png' },
  { code: 'RL-1016', name: 'Majestic Onyx', collection: 'Marbito Series', slug: 'marbito-series', image: '/assets/pvc/catalog-clean/rl-1016.png', demoImage: '/assets/pvc/demo-clean/page-12-center.png' },
  { code: 'RL-1007', name: 'Fior Di Neve', collection: 'Marbito Series', slug: 'marbito-series', image: '/assets/pvc/catalog-clean/rl-1007.png', demoImage: '/assets/pvc/demo-clean/page-13-left.png' },
  { code: 'RL-1008', name: 'Glacia Marble', collection: 'Marbito Series', slug: 'marbito-series', image: '/assets/pvc/catalog-clean/rl-1008.png', demoImage: '/assets/pvc/demo-clean/page-13-right.png' },
  { code: 'RL-1009', name: 'Pietra Cloud', collection: 'Marbito Series', slug: 'marbito-series', image: '/assets/pvc/catalog-clean/rl-1009.png', demoImage: '/assets/pvc/demo-clean/page-14-left.png' },
  { code: 'RL-1010', name: 'Nero Astrum', collection: 'Marbito Series', slug: 'marbito-series', image: '/assets/pvc/catalog-clean/rl-1010.png', demoImage: '/assets/pvc/demo-clean/page-14-right.png' },
  { code: 'RL-1013', name: 'Noir Velluto', collection: 'Marbito Series', slug: 'marbito-series', image: '/assets/pvc/catalog-clean/rl-1013.png', demoImage: '/assets/pvc/demo-clean/page-15-left.png' },
  { code: 'RL-1014', name: 'Luxe Pietra', collection: 'Marbito Series', slug: 'marbito-series', image: '/assets/pvc/catalog-clean/rl-1014.png', demoImage: '/assets/pvc/demo-clean/page-15-right.png' },
  { code: 'RL-515', name: 'Velvet Cyan', collection: 'Royal Velvet', slug: 'royal-velvet', image: '/assets/pvc/catalog-clean/rl-515.png', demoImage: '/assets/pvc/demo-clean/page-18-left.png' },
  { code: 'RL-513', name: 'Velvet Pista', collection: 'Royal Velvet', slug: 'royal-velvet', image: '/assets/pvc/catalog-clean/rl-513.png', demoImage: '/assets/pvc/demo-clean/page-18-left.png' },
  { code: 'RL-527', name: 'Natural Beige', collection: 'Royal Velvet', slug: 'royal-velvet', image: '/assets/pvc/catalog-clean/rl-527.png', demoImage: '/assets/pvc/demo-clean/page-18-left.png' },
  { code: 'RL-522', name: 'Blush Pink', collection: 'Royal Velvet', slug: 'royal-velvet', image: '/assets/pvc/catalog-clean/rl-522.png', demoImage: '/assets/pvc/demo-clean/page-18-left.png' },
  { code: 'RL-523', name: 'Classic Blue', collection: 'Royal Velvet', slug: 'royal-velvet', image: '/assets/pvc/catalog-clean/rl-523.png', demoImage: '/assets/pvc/demo-clean/page-18-left.png' },
  { code: 'RL-530', name: 'European Beach', collection: 'Royal Velvet', slug: 'royal-velvet', image: '/assets/pvc/catalog-clean/rl-530.png', demoImage: '/assets/pvc/demo-clean/page-17-left.png' },
  { code: 'RL-525', name: 'Mint Beige', collection: 'Royal Velvet', slug: 'royal-velvet', image: '/assets/pvc/catalog-clean/rl-525.png', demoImage: '/assets/pvc/demo-clean/page-17-left.png' },
  { code: 'RL-529', name: 'Pistachio', collection: 'Royal Velvet', slug: 'royal-velvet', image: '/assets/pvc/catalog-clean/rl-529.png', demoImage: '/assets/pvc/demo-clean/page-17-left.png' },
  { code: 'RL-501', name: 'Velvet White', collection: 'Royal Velvet', slug: 'royal-velvet', image: '/assets/pvc/catalog-clean/rl-501.png', demoImage: '/assets/pvc/demo-clean/page-17-left.png' },
  { code: 'RL-528', name: 'Lilac Green', collection: 'Royal Velvet', slug: 'royal-velvet', image: '/assets/pvc/catalog-clean/rl-528.png', demoImage: '/assets/pvc/demo-clean/page-17-left.png' },
  { code: 'RL-526', name: 'Light Pista', collection: 'Royal Velvet', slug: 'royal-velvet', image: '/assets/pvc/catalog-clean/rl-526.png', demoImage: '/assets/pvc/demo-clean/page-18-left.png' },
  { code: 'RL-503', name: 'Velvet Grey', collection: 'Royal Velvet', slug: 'royal-velvet', image: '/assets/pvc/catalog-clean/rl-503.png', demoImage: '/assets/pvc/demo-clean/page-18-left.png' },
  { code: 'RL-531', name: 'Light Pista Rose', collection: 'Royal Velvet', slug: 'royal-velvet', image: '/assets/pvc/catalog-clean/rl-531.png', demoImage: '/assets/pvc/demo-clean/page-18-left.png' },
  { code: 'RL-521', name: 'Cloud Pink', collection: 'Royal Velvet', slug: 'royal-velvet', image: '/assets/pvc/catalog-clean/rl-521.png', demoImage: '/assets/pvc/demo-clean/page-18-left.png' },
  { code: 'RL-502', name: 'Velvet Silver', collection: 'Royal Velvet', slug: 'royal-velvet', image: '/assets/pvc/catalog-clean/rl-502.png', demoImage: '/assets/pvc/demo-clean/page-18-left.png' },
  { code: 'RL-524', name: 'Willow Green', collection: 'Royal Velvet', slug: 'royal-velvet', image: '/assets/pvc/catalog-clean/rl-524.png', demoImage: '/assets/pvc/demo-clean/page-18-left.png' },
  { code: 'RL-801', name: 'Metallic White', collection: 'Metallic Finish', slug: 'metallic-finish', image: '/assets/pvc/catalog-clean/rl-801.png', demoImage: '/assets/pvc/demo-clean/page-19-left.png' },
  { code: 'RL-803', name: 'Metallic Silver', collection: 'Metallic Finish', slug: 'metallic-finish', image: '/assets/pvc/catalog-clean/rl-803.png', demoImage: '/assets/pvc/demo-clean/page-19-left.png' },
  { code: 'RL-804', name: 'Metallic Grey', collection: 'Metallic Finish', slug: 'metallic-finish', image: '/assets/pvc/catalog-clean/rl-804.png', demoImage: '/assets/pvc/demo-clean/page-19-left.png' },
  { code: 'RL-202', name: 'Tiger Teak', collection: 'Natural Wood Series', slug: 'natural-wood', image: '/assets/pvc/catalog-clean/rl-202.png', demoImage: '/assets/pvc/catalog-clean/rl-202.png' },
  { code: 'RL-201', name: 'Indian Teak', collection: 'Natural Wood Series', slug: 'natural-wood', image: '/assets/pvc/catalog-clean/rl-201.png', demoImage: '/assets/pvc/demo-clean/page-21-left.png' },
  { code: 'RL-203', name: 'Light Beech Wood', collection: 'Natural Wood Series', slug: 'natural-wood', image: '/assets/pvc/catalog-clean/rl-203.png', demoImage: '/assets/pvc/demo-clean/page-21-left.png' },
  { code: 'RL-204', name: 'Malabar Wood', collection: 'Natural Wood Series', slug: 'natural-wood', image: '/assets/pvc/catalog-clean/rl-204.png', demoImage: '/assets/pvc/demo-clean/page-22-left.png' },
  { code: 'RL-205', name: 'Timber Oak', collection: 'Natural Wood Series', slug: 'natural-wood', image: '/assets/pvc/catalog-clean/rl-205.png', demoImage: '/assets/pvc/demo-clean/page-22-left.png' },
  { code: 'RL-206', name: 'Mapple Walnut', collection: 'Natural Wood Series', slug: 'natural-wood', image: '/assets/pvc/catalog-clean/rl-206.png', demoImage: '/assets/pvc/demo-clean/page-23-left.png' },
  { code: 'RL-207', name: 'Fire Walnut', collection: 'Natural Wood Series', slug: 'natural-wood', image: '/assets/pvc/catalog-clean/rl-207.png', demoImage: '/assets/pvc/demo-clean/page-23-left.png' },
  { code: 'RL-208', name: 'Wood Classic', collection: 'Natural Wood Series', slug: 'natural-wood', image: '/assets/pvc/catalog-clean/rl-208.png', demoImage: '/assets/pvc/demo-clean/page-24-left.png' },
  { code: 'RL-209', name: 'Monaco Walnut', collection: 'Natural Wood Series', slug: 'natural-wood', image: '/assets/pvc/catalog-clean/rl-209.png', demoImage: '/assets/pvc/demo-clean/page-24-right.png' },
  { code: 'RL-210', name: 'Spanish Oak', collection: 'Natural Wood Series', slug: 'natural-wood', image: '/assets/pvc/catalog-clean/rl-210.png', demoImage: '/assets/pvc/demo-clean/page-25-left.png' },
  { code: 'RL-211', name: 'Premium Teak', collection: 'Natural Wood Series', slug: 'natural-wood', image: '/assets/pvc/catalog-clean/rl-211.png', demoImage: '/assets/pvc/demo-clean/page-25-left.png' },
  { code: 'RL-302', name: 'Dove Off White', collection: 'Premium Pastels', slug: 'premium-pastels', image: '/assets/pvc/catalog-clean/rl-302.png', demoImage: '/assets/pvc/demo-clean/page-27-left.png' },
  { code: 'RL-327', name: 'Natural Beige', collection: 'Premium Pastels', slug: 'premium-pastels', image: '/assets/pvc/catalog-clean/rl-327.png', demoImage: '/assets/pvc/demo-clean/page-27-left.png' },
  { code: 'RL-323', name: 'Classic Blue', collection: 'Premium Pastels', slug: 'premium-pastels', image: '/assets/pvc/catalog-clean/rl-323.png', demoImage: '/assets/pvc/demo-clean/page-27-left.png' },
  { code: 'RL-303', name: 'Silver Grey', collection: 'Premium Pastels', slug: 'premium-pastels', image: '/assets/pvc/catalog-clean/rl-303.png', demoImage: '/assets/pvc/demo-clean/page-27-left.png' },
  { code: 'RL-305', name: 'Pista', collection: 'Premium Pastels', slug: 'premium-pastels', image: '/assets/pvc/catalog-clean/rl-305.png', demoImage: '/assets/pvc/demo-clean/page-27-left.png' },
  { code: 'RL-317', name: 'Mint Green', collection: 'Premium Pastels', slug: 'premium-pastels', image: '/assets/pvc/catalog-clean/rl-317.png', demoImage: '/assets/pvc/demo-clean/page-27-left.png' },
  { code: 'RL-321', name: 'Cloud Pink', collection: 'Premium Pastels', slug: 'premium-pastels', image: '/assets/pvc/catalog-clean/rl-321.png', demoImage: '/assets/pvc/demo-clean/page-27-left.png' },
  { code: 'RL-325', name: 'Mint Beige', collection: 'Premium Pastels', slug: 'premium-pastels', image: '/assets/pvc/catalog-clean/rl-325.png', demoImage: '/assets/pvc/demo-clean/page-27-left.png' },
  { code: 'RL-324', name: 'Willow Green', collection: 'Premium Pastels', slug: 'premium-pastels', image: '/assets/pvc/catalog-clean/rl-324.png', demoImage: '/assets/pvc/demo-clean/page-27-left.png' },
  { code: 'RL-318', name: 'Light Mahendi', collection: 'Premium Pastels', slug: 'premium-pastels', image: '/assets/pvc/catalog-clean/rl-318.png', demoImage: '/assets/pvc/demo-clean/page-27-left.png' },
  { code: 'RL-304', name: 'Smokey Grey', collection: 'Premium Pastels', slug: 'premium-pastels', image: '/assets/pvc/catalog-clean/rl-304.png', demoImage: '/assets/pvc/demo-clean/page-27-left.png' },
  { code: 'RL-306', name: 'Glossy Mint', collection: 'Premium Pastels', slug: 'premium-pastels', image: '/assets/pvc/catalog-clean/rl-306.png', demoImage: '/assets/pvc/demo-clean/page-27-left.png' },
  { code: 'RL-319', name: 'Teal Olive', collection: 'Premium Pastels', slug: 'premium-pastels', image: '/assets/pvc/catalog-clean/rl-319.png', demoImage: '/assets/pvc/demo-clean/page-27-left.png' },
  { code: 'RL-326', name: 'Light Pista', collection: 'Premium Pastels', slug: 'premium-pastels', image: '/assets/pvc/catalog-clean/rl-326.png', demoImage: '/assets/pvc/demo-clean/page-27-left.png' },
  { code: 'RL-322', name: 'Blush Pink', collection: 'Premium Pastels', slug: 'premium-pastels', image: '/assets/pvc/catalog-clean/rl-322.png', demoImage: '/assets/pvc/demo-clean/page-27-left.png' },
  { code: 'RL-309', name: 'Light Blue', collection: 'Premium Pastels', slug: 'premium-pastels', image: '/assets/pvc/catalog-clean/rl-309.png', demoImage: '/assets/pvc/demo-clean/page-27-left.png' },
  { code: 'RL-320', name: 'Mahendi', collection: 'Premium Pastels', slug: 'premium-pastels', image: '/assets/pvc/catalog-clean/rl-320.png', demoImage: '/assets/pvc/demo-clean/page-27-left.png' },
  { code: 'RL-307', name: 'Pitch Puff', collection: 'Premium Pastels', slug: 'premium-pastels', image: '/assets/pvc/catalog-clean/rl-307.png', demoImage: '/assets/pvc/demo-clean/page-27-left.png' },
  { code: 'RL-314', name: 'Ocian Water', collection: 'Premium Pastels', slug: 'premium-pastels', image: '/assets/pvc/catalog-clean/rl-314.png', demoImage: '/assets/pvc/demo-clean/page-27-left.png' },
  { code: 'RL-312', name: 'Rock Dove', collection: 'Premium Pastels', slug: 'premium-pastels', image: '/assets/pvc/catalog-clean/rl-312.png', demoImage: '/assets/pvc/demo-clean/page-27-left.png' },
  { code: 'RL-301', name: 'Pure White', collection: 'Premium Pastels', slug: 'premium-pastels', image: '/assets/pvc/catalog-clean/rl-301.png', demoImage: '/assets/pvc/demo-clean/page-27-left.png' },
  { code: 'RL-310', name: 'Glossy Biscuit', collection: 'Premium Pastels', slug: 'premium-pastels', image: '/assets/pvc/catalog-clean/rl-310.png', demoImage: '/assets/pvc/demo-clean/page-27-left.png' },
  { code: 'RL-331', name: 'Berry Fuzz', collection: 'Premium Pastels', slug: 'premium-pastels', image: '/assets/pvc/catalog-clean/rl-331.png', demoImage: '/assets/pvc/demo-clean/page-27-left.png' },
  { code: 'RL-407', name: 'Pitch Puff', collection: 'Glowing Sparkle', slug: 'glowing-sparkle', image: '/assets/pvc/catalog-clean/rl-407.png', demoImage: '/assets/pvc/demo-clean/page-30-left.png' },
  { code: 'RL-417', name: 'Galaxy Arctic', collection: 'Glowing Sparkle', slug: 'glowing-sparkle', image: '/assets/pvc/catalog-clean/rl-417.png', demoImage: '/assets/pvc/demo-clean/page-30-left.png' },
  { code: 'RL-409', name: 'Galaxy Sea', collection: 'Glowing Sparkle', slug: 'glowing-sparkle', image: '/assets/pvc/catalog-clean/rl-409.png', demoImage: '/assets/pvc/demo-clean/page-30-left.png' },
  { code: 'RL-401', name: 'Pure White', collection: 'Glowing Sparkle', slug: 'glowing-sparkle', image: '/assets/pvc/catalog-clean/rl-401.png', demoImage: '/assets/pvc/demo-clean/page-30-left.png' },
  { code: 'RL-416', name: 'Biscuit', collection: 'Glowing Sparkle', slug: 'glowing-sparkle', image: '/assets/pvc/catalog-clean/rl-416.png', demoImage: '/assets/pvc/demo-clean/page-30-left.png' },
  { code: 'RL-412', name: 'Turquise', collection: 'Glowing Sparkle', slug: 'glowing-sparkle', image: '/assets/pvc/catalog-clean/rl-412.png', demoImage: '/assets/pvc/demo-clean/page-30-left.png' },
  { code: 'RL-410', name: 'Light Chocolate', collection: 'Glowing Sparkle', slug: 'glowing-sparkle', image: '/assets/pvc/catalog-clean/rl-410.png', demoImage: '/assets/pvc/demo-clean/page-30-left.png' },
  { code: 'RL-414', name: 'Baby Cream', collection: 'Glowing Sparkle', slug: 'glowing-sparkle', image: '/assets/pvc/catalog-clean/rl-414.png', demoImage: '/assets/pvc/demo-clean/page-30-left.png' },
  { code: 'RL-403', name: 'Silver Grey', collection: 'Glowing Sparkle', slug: 'glowing-sparkle', image: '/assets/pvc/catalog-clean/rl-403.png', demoImage: '/assets/pvc/demo-clean/page-30-left.png' },
  { code: 'RL-408', name: 'Galaxy Sky', collection: 'Glowing Sparkle', slug: 'glowing-sparkle', image: '/assets/pvc/catalog-clean/rl-408.png', demoImage: '/assets/pvc/demo-clean/page-30-left.png' },
  { code: 'RL-418', name: 'Coffee', collection: 'Glowing Sparkle', slug: 'glowing-sparkle', image: '/assets/pvc/catalog-clean/rl-418.png', demoImage: '/assets/pvc/demo-clean/page-30-left.png' },
  { code: 'RL-405', name: 'Pista', collection: 'Glowing Sparkle', slug: 'glowing-sparkle', image: '/assets/pvc/catalog-clean/rl-405.png', demoImage: '/assets/pvc/demo-clean/page-30-left.png' },
  { code: 'RL-419', name: 'Slate Grey', collection: 'Glowing Sparkle', slug: 'glowing-sparkle', image: '/assets/pvc/catalog-clean/rl-419.png', demoImage: '/assets/pvc/demo-clean/page-31-left.png' },
  { code: 'RL-404', name: 'Smoke Grey', collection: 'Glowing Sparkle', slug: 'glowing-sparkle', image: '/assets/pvc/catalog-clean/rl-404.png', demoImage: '/assets/pvc/demo-clean/page-31-left.png' },
  { code: 'RL-411', name: 'Ivory', collection: 'Glowing Sparkle', slug: 'glowing-sparkle', image: '/assets/pvc/catalog-clean/rl-411.png', demoImage: '/assets/pvc/demo-clean/page-31-left.png' },
  { code: 'RL-402', name: 'Off White', collection: 'Glowing Sparkle', slug: 'glowing-sparkle', image: '/assets/pvc/catalog-clean/rl-402.png', demoImage: '/assets/pvc/demo-clean/page-31-left.png' },
  { code: 'RL-415', name: 'Lavender', collection: 'Glowing Sparkle', slug: 'glowing-sparkle', image: '/assets/pvc/catalog-clean/rl-415.png', demoImage: '/assets/pvc/demo-clean/page-31-left.png' },
  { code: 'RL-406', name: 'Mint Green', collection: 'Glowing Sparkle', slug: 'glowing-sparkle', image: '/assets/pvc/catalog-clean/rl-406.png', demoImage: '/assets/pvc/demo-clean/page-31-left.png' }
];

export const pvcCatalogProducts = allPvcCatalogProducts.filter(
  (product) => !hiddenPvcCodes.has(product.code)
);
