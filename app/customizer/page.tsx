import CustomizerClient from './CustomizerClient';

// ─── Metadata ──────────────────────────────────────────────────────────────

export const metadata = {
  title: '3D Room Customiser | Robel',
  description:
    'Design your perfect space with the Robel 3D Room Customiser. Switch between Kitchen, Bedroom, and TV Unit spaces and apply realistic PBR laminates in real time.',
  keywords: [
    'laminate customiser',
    'kitchen design',
    'bedroom design',
    'TV unit',
    '3D visualiser',
    'interior design',
    'Robel laminates',
    'PBR materials',
  ],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

// ─── Page ──────────────────────────────────────────────────────────────────

/**
 * /customizer — Multi-Room 3D Laminate Customiser
 *
 * Allows users to switch between Kitchen, Bedroom, and TV Unit spaces
 * and apply realistic PBR laminates to designated surfaces in each room.
 *
 * The page uses `data-studio-app="true"` (set inside MultiRoomCustomizerApp)
 * which triggers the existing CSS that hides the global nav/footer, giving
 * the 3D canvas a true full-screen experience.
 */
export default function CustomiserPage() {
  return <CustomizerClient />;
}
