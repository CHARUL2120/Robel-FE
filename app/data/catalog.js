export const categories = [
  {
    title: 'PVC Laminates',
    description:
      'Fluted textures, marble-inspired slabs, woodgrains, metallic tones, and soft-touch PVC laminates for wardrobes, kitchens, and statement joinery.',
    image: '/assets/images/Categories1.png',
    href: '/laminates',
    accent: 'Textured Luxe'
  },
  {
    title: 'Acrylic Sheets',
    description:
      'Mirror-gloss acrylic faces with crisp reflections and contemporary depth for luxe kitchens and premium wardrobes.',
    image: '/assets/images/Categories4.png',
    href: '/acrylic-sheets',
    accent: 'High Gloss'
  },
  {
    title: 'PVC Sheets',
    description:
      'Low-maintenance, moisture-resistant panels designed for fast-moving interior applications and practical wall treatments.',
    image: '/assets/images/Categories2.png',
    href: '/products/pvc-mist-panel',
    accent: 'Easy Care'
  },
  {
    title: 'WPC Boards',
    description:
      'Stable, durable boards for humid environments where performance, machinability, and finish quality all matter.',
    image: '/assets/images/Categories6.png',
    href: '/products/wpc-urban-rib',
    accent: 'Built Strong'
  }
];

export const allProducts = [
  {
    slug: 'walnut-velvet-laminate',
    name: 'Walnut Velvet',
    material: 'Laminates',
    finish: 'Woodgrain',
    application: 'Wardrobes',
    badge: 'New Collection',
    image: '/assets/images/Laminates1.png',
    summary:
      'Deep walnut character with a tactile matte finish that gives wardrobes and paneling a tailored, architectural look.',
    highlights: ['Fingerprint friendly', 'Soft-touch matte', 'Vertical grain'],
    specs: {
      size: '8 x 4 ft',
      thickness: '1.0 mm',
      core: 'Decorative laminate',
      sheen: 'Matte'
    }
  },
  {
    slug: 'marquina-stone-laminate',
    name: 'Marquina Stone',
    material: 'Laminates',
    finish: 'Marble',
    application: 'Feature Walls',
    badge: 'Trending',
    image: '/assets/images/Laminates3.png',
    summary:
      'A dramatic marble-inspired laminate with high visual depth for statement panels, counters, and hospitality interiors.',
    highlights: ['Stone-inspired veins', 'Luxury surface', 'Low-maintenance finish'],
    specs: {
      size: '8 x 4 ft',
      thickness: '1.0 mm',
      core: 'Decorative laminate',
      sheen: 'Silk matte'
    }
  },
  {
    slug: 'siena-oak-laminate',
    name: 'Siena Oak',
    material: 'Laminates',
    finish: 'Woodgrain',
    application: 'Kitchen',
    badge: 'Designer Pick',
    image: '/assets/images/Laminates4.png',
    summary:
      'Warm oak movement with a refined linear grain, suited for kitchen shutters, utility zones, and modern joinery.',
    highlights: ['Warm neutral tone', 'Kitchen ready', 'Rich depth'],
    specs: {
      size: '8 x 4 ft',
      thickness: '1.0 mm',
      core: 'Decorative laminate',
      sheen: 'Super matte'
    }
  },
  {
    slug: 'crystal-pearl-acrylic',
    name: 'Crystal Pearl',
    material: 'Acrylic Sheets',
    finish: 'Gloss',
    application: 'Kitchen',
    badge: 'Best Seller',
    image: '/assets/images/Categories4.png',
    summary:
      'Ultra-reflective pearl white acrylic sheet made for sharp luxury kitchens, island units, and minimalist wardrobes.',
    highlights: ['Mirror gloss', 'UV stable finish', 'Sharp edge appeal'],
    specs: {
      size: '8 x 4 ft',
      thickness: '1.3 mm',
      core: 'MDF / ply compatible',
      sheen: 'High gloss'
    }
  },
  {
    slug: 'graphite-mirror-acrylic',
    name: 'Graphite Mirror',
    material: 'Acrylic Sheets',
    finish: 'Gloss',
    application: 'Wardrobes',
    badge: 'Premium',
    image: '/assets/images/Categories5.png',
    summary:
      'A smoky graphite acrylic surface with a sophisticated reflective tone for wardrobe shutters and statement furniture.',
    highlights: ['Luxury mirror effect', 'Rich depth', 'Contemporary palette'],
    specs: {
      size: '8 x 4 ft',
      thickness: '1.3 mm',
      core: 'MDF / ply compatible',
      sheen: 'High gloss'
    }
  },
  {
    slug: 'ivory-ice-acrylic',
    name: 'Ivory Ice',
    material: 'Acrylic Sheets',
    finish: 'Gloss',
    application: 'Wall Panels',
    badge: 'New Arrival',
    image: '/assets/images/Categories3.png',
    summary:
      'Glossy ivory acrylic sheet that brightens enclosed spaces and balances warm laminates with a crisp premium finish.',
    highlights: ['Bright reflective tone', 'Smooth face', 'Pairs with wood textures'],
    specs: {
      size: '8 x 4 ft',
      thickness: '1.3 mm',
      core: 'MDF / ply compatible',
      sheen: 'Mirror gloss'
    }
  },
  {
    slug: 'pvc-mist-panel',
    name: 'PVC Mist Panel',
    material: 'PVC Sheets',
    finish: 'Soft Matte',
    application: 'Wall Panels',
    badge: 'Project Favorite',
    image: '/assets/images/aboutLeft.png',
    summary:
      'Moisture-friendly PVC panel with a smooth contemporary face for utility areas, walls, and high-turnover interiors.',
    highlights: ['Water resistant', 'Low maintenance', 'Quick to install'],
    specs: {
      size: '8 x 4 ft',
      thickness: '5 mm',
      core: 'PVC',
      sheen: 'Soft matte'
    }
  },
  {
    slug: 'wpc-urban-rib',
    name: 'WPC Urban Rib',
    material: 'WPC Boards',
    finish: 'Textured',
    application: 'Wall Panels',
    badge: 'Contract Grade',
    image: '/assets/images/aboutRight.png',
    summary:
      'Structured WPC board with a ribbed visual language, designed for long-life wall systems and humid-area applications.',
    highlights: ['Termite resistant', 'Stable in humidity', 'Machine friendly'],
    specs: {
      size: '8 x 4 ft',
      thickness: '18 mm',
      core: 'Wood plastic composite',
      sheen: 'Natural texture'
    }
  }
];

export const laminateProducts = allProducts.filter(
  (product) => product.material === 'Laminates'
);

export const acrylicProducts = allProducts.filter(
  (product) => product.material === 'Acrylic Sheets'
);

export const trendingProducts = allProducts.slice(0, 6);

export const galleryImages = [
  {
    title: 'Luxury Kitchen Glow',
    image: '/assets/images/herobg.png',
    span: 'lg:col-span-2 lg:row-span-2'
  },
  {
    title: 'Mirror Gloss Wardrobes',
    image: '/assets/images/Categories4.png',
    span: ''
  },
  {
    title: 'Marble Surface Drama',
    image: '/assets/images/Laminates3.png',
    span: ''
  },
  {
    title: 'Woodgrain Craftsmanship',
    image: '/assets/images/Laminates5.png',
    span: ''
  },
  {
    title: 'Modern Panel Detailing',
    image: '/assets/images/aboutRight.png',
    span: 'lg:col-span-2'
  }
];

export const whyChooseUs = [
  {
    title: 'Curated Premium Finishes',
    description:
      'Every collection is selected to feel intentional in luxury interiors, from calm matte textures to high-gloss reflective surfaces.'
  },
  {
    title: 'Built For Real-World Performance',
    description:
      'Our surfaces are chosen for durability, finish retention, and ease of maintenance across residential and commercial projects.'
  },
  {
    title: 'Material Guidance For Designers',
    description:
      'We help architects, studios, and fabricators shortlist the right finish palette for kitchens, wardrobes, wall systems, and custom furniture.'
  }
];

export const testimonials = [
  {
    name: 'Aarav Mehta',
    role: 'Interior Designer',
    quote:
      'The finish selection feels elevated and the acrylic range photographs beautifully. Clients instantly read it as premium.'
  },
  {
    name: 'Riddhi Shah',
    role: 'Residential Project Lead',
    quote:
      'We specified the walnut and marble collections across a full home and the palette stayed consistent from concept to execution.'
  },
  {
    name: 'Kunal Desai',
    role: 'Modular Kitchen Studio',
    quote:
      'The glossy acrylic sheets give us that high-end showroom effect without compromising usability for day-to-day kitchens.'
  }
];

export const inquiryHighlights = [
  'Material recommendations for kitchens, wardrobes, wall panels, and custom furniture',
  'Sample support for designers, contractors, and retail customers',
  'Fast response for quotation requests and project discussions'
];

export const showrooms = [
  {
    title: 'Ahmedabad Experience Desk',
    detail: 'Robel House, Sarkhej, Ahmedabad, Gujarat'
  },
  {
    title: 'Project Consultation',
    detail: '+91 94279 08150'
  },
  {
    title: 'Email Support',
    detail: 'Redecorindia206@gmail.com'
  }
];

export function getProductBySlug(slug) {
  return allProducts.find((product) => product.slug === slug);
}
