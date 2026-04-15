import { Suspense } from 'react';
import StudioApp from '../components/studio/StudioApp';

export const metadata = {
  title: 'Premium 3D Studio | Robel',
  description:
    'A full-screen premium 3D studio for kitchen, cupboard, and TV unit laminate visualization with save and share flows.'
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover'
};

export default function StudioPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[100svh] items-center justify-center bg-[#06080f] px-4 text-sm text-white/70">
          Preparing premium 3D studio...
        </div>
      }
    >
      <StudioApp />
    </Suspense>
  );
}
