'use client';

import dynamic from 'next/dynamic';

const MultiRoomCustomizerApp = dynamic(
  () => import('../components/studio/MultiRoomCustomizerApp'),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[100svh] flex-col items-center justify-center gap-4 bg-[#06080f]">
        <div className="size-10 animate-spin rounded-full border-2 border-white/10 border-t-[#d8a676]" />
        <p className="text-sm text-white/60">Preparing 3D customiser…</p>
      </div>
    ),
  }
);

export default function CustomizerClient() {
  return <MultiRoomCustomizerApp />;
}
