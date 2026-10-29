'use client';

/**
 * MultiRoomCustomizerApp.tsx
 *
 * Top-level orchestrator for the Multi-Room 3D Customiser.
 *
 * Layout:
 * ┌─────────────────────────────────────────────────────────────┐
 * │  [Logo + Badge]        Room Switcher Tab Bar      [Controls] │  ← top bar
 * │  ─────────────────────────────────────────────────────────  │
 * │                                                             │
 * │          Full-bleed RoomCanvas (R3F WebGL)                 │  ← middle
 * │                                                             │
 * │  ─────────────────────────────────────────────────────────  │
 * │  Selected Part Info              CustomizerSidebar (right)  │  ← bottom
 * └─────────────────────────────────────────────────────────────┘
 *
 * The `key={activeRoom.id}` on `<RoomCanvas>` is intentional:
 * React sees a different key and fully unmounts → remounts the canvas,
 * cleanly disposing the old WebGL context. Suspense in RoomCanvas then
 * shows the "Loading 3D model…" fallback while the new GLB streams in,
 * preventing any UI stutter or black-flash during the room switch.
 */

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Suspense, useRef } from 'react';
import { Download, ImageDown, Link2, RotateCcw } from 'lucide-react';
import { Button } from '../ui/button';
import BrandLogo from '../site/BrandLogo';
import { useRoomCustomizer } from '../../hooks/useRoomCustomizer';
import { MATERIALS_BY_ID, STUDIO_MATERIALS } from '../../data/roomsMaterials';
import type { RoomCanvasHandle } from './RoomCanvas';

// Dynamically import the canvas to avoid SSR (WebGL is browser-only)
const RoomCanvas = dynamic(() => import('./RoomCanvas'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[#06080f]">
      <div className="flex flex-col items-center gap-4">
        <div className="size-10 animate-spin rounded-full border-2 border-white/10 border-t-[#d8a676]" />
        <p className="text-sm text-white/60">Preparing 3D studio…</p>
      </div>
    </div>
  ),
});

// Dynamically import sidebar to keep the canvas code-split separate
const CustomizerSidebar = dynamic(() => import('./CustomizerSidebar'), {
  ssr: false,
});

// ─── Room Switcher Icon Map ────────────────────────────────────────────────

const ROOM_ICON_MAP: Record<string, string> = {
  'kitchen-atelier': '🍽',
  'wardrobe-suite': '🛏',
  'tv-lounge-suite': '📺',
};

// ─── Main App ──────────────────────────────────────────────────────────────

export default function MultiRoomCustomizerApp() {
  const canvasRef = useRef<RoomCanvasHandle>(null);

  const {
    rooms,
    activeRoom,
    selectedPart,
    currentAssignments,
    selectedMaterial,
    visibleMaterials,
    activeGalleryCategory,
    galleryCategories,
    changedItems,
    handleRoomSwitch,
    handleSelectPart,
    handleApplyMaterial,
    handleSetCategory,
    handleReset,
  } = useRoomCustomizer();

  // ── Share / Save actions ────────────────────────────────────────────────
  const handleSavePng = async () => {
    const dataUrl = await canvasRef.current?.captureImage();
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `robel-${activeRoom.shareLabel.toLowerCase().replace(/\s+/g, '-')}.png`;
    a.click();
  };

  const handleCopyLink = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Silently fail — clipboard API may be unavailable in some contexts
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Robel ${activeRoom.shareLabel} Customiser`,
          text: `Check out this ${activeRoom.shareLabel.toLowerCase()} laminate design on Robel.`,
          url,
        });
      } else {
        await handleCopyLink();
      }
    } catch {
      // Dismissed / unavailable — silently ignore
    }
  };

  const handleResetView = () => {
    canvasRef.current?.resetView();
  };

  // ── Part selection handler (also opens mobile sheet via sidebar) ────────
  const handleSelectPartExtended = (partId: string) => {
    handleSelectPart(partId);
  };

  // ─── Render ─────────────────────────────────────────────────────────────
  return (
    <div
      data-studio-app="true"
      className="relative h-[100svh] min-h-[100svh] overflow-hidden bg-[#05070d] text-white md:h-[100dvh] md:max-h-[100dvh]"
    >
      {/* ── Full-bleed 3D canvas ─────────────────────────────────────── */}
      <div className="absolute inset-0">
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center bg-[#06080f]">
              <div className="flex flex-col items-center gap-4">
                <div className="size-10 animate-spin rounded-full border-2 border-white/10 border-t-[#d8a676]" />
                <p className="text-sm text-white/60">Preparing 3D studio…</p>
              </div>
            </div>
          }
        >
          {/*
           * key={activeRoom.id} causes React to fully unmount/remount the canvas
           * when the room changes. This cleanly disposes the old WebGL context and
           * lets Suspense show the loading fallback while the new GLB streams in.
           */}
          <RoomCanvas
            key={activeRoom.id}
            ref={canvasRef}
            room={activeRoom}
            materials={STUDIO_MATERIALS}
            assignments={currentAssignments}
            selectedPartId={selectedPart?.id}
            onSelectPart={handleSelectPartExtended}
          />
        </Suspense>
      </div>

      {/* ── Cinematic vignette overlay ───────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(108,69,43,0.18),transparent_32%),linear-gradient(180deg,rgba(5,7,13,0.32)_0%,rgba(5,7,13,0.12)_28%,rgba(5,7,13,0.74)_100%)]" />

      {/* ── UI overlay ──────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 flex flex-col">

        {/* ── Top bar ─────────────────────────────────────────────── */}
        <header className="pointer-events-auto flex items-center justify-between gap-3 px-3 pt-3 sm:px-5 sm:pt-5">
          {/* Logo */}
          <div className="inline-flex min-w-0 items-center gap-2 px-1 py-1 sm:gap-3">
            <BrandLogo
              variant="inline"
              className="h-auto w-[94px] min-[420px]:w-[104px] sm:w-[112px]"
            />
            <span className="hidden rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60 sm:inline-flex">
              3D Customiser
            </span>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-10 border-white/15 bg-[#0f131d]/72 px-3 text-white hover:bg-white/10 sm:px-4"
              aria-label="Reset camera view"
              onClick={handleResetView}
            >
              <RotateCcw className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">Reset view</span>
            </Button>

            {/* Save PNG — desktop only */}
            <Button
              variant="default"
              size="sm"
              className="hidden h-10 xl:flex"
              onClick={handleSavePng}
              aria-label="Save PNG screenshot"
            >
              <ImageDown className="size-4" />
              <span>Save PNG</span>
            </Button>

            {/* Share — desktop only */}
            <Button
              variant="outline"
              size="sm"
              className="hidden h-10 border-white/15 bg-[#0f131d]/72 text-white hover:bg-white/10 xl:flex"
              onClick={handleShare}
              aria-label="Share this design"
            >
              <Link2 className="size-4" />
              <span>Share</span>
            </Button>
          </div>
        </header>

        {/* ── Room Switcher Tab Bar ─────────────────────────────────── */}
        <nav
          className="pointer-events-auto mt-3 px-3 sm:px-5"
          aria-label="Room switcher"
        >
          <div className="mx-auto flex w-fit min-w-max items-center justify-center gap-1.5 rounded-full border border-white/10 bg-[#0f131d]/72 p-1.5 backdrop-blur-2xl">
            {rooms.map((room) => {
              const isActive = room.id === activeRoom.id;
              return (
                <button
                  key={room.id}
                  type="button"
                  id={`room-tab-${room.id}`}
                  onClick={() => handleRoomSwitch(room.id)}
                  aria-pressed={isActive}
                  title={room.intro}
                  className={`shrink-0 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#f0ddca] text-[#130e0b] shadow-[0_2px_12px_rgba(0,0,0,0.18)]'
                      : 'text-white/70 hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  <span aria-hidden="true" className="text-base leading-none">
                    {ROOM_ICON_MAP[room.id]}
                  </span>
                  <span>{room.shortLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Drag hint */}
          <div className="pointer-events-none mt-3 flex justify-center">
            <span className="rounded-full border border-white/10 bg-[#0f131d]/55 px-3 py-1.5 text-center text-[10px] text-white/55 backdrop-blur sm:text-xs">
              Drag to rotate 360° · Scroll or pinch to zoom · Tap a surface to select
            </span>
          </div>
        </nav>

        {/* ── Bottom-left selected part info (desktop xl only) ─────── */}
        <div className="mt-auto hidden px-5 pb-5 xl:block">
          <div className="max-w-[320px] rounded-[28px] border border-white/10 bg-[#0f131d]/72 p-5 backdrop-blur-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d8a676]">
              Selected Surface
            </p>
            <h1 className="mt-3 font-heading text-2xl font-semibold leading-tight tracking-[-0.05em] text-white">
              {selectedPart?.name ?? '—'}
            </h1>
            <p className="mt-1 text-sm text-white/56">
              {selectedPart?.zone
                .split('-')
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(' ') ?? ''}
            </p>
            {selectedMaterial && (
              <div className="mt-4 rounded-[18px] border border-white/10 bg-white/[0.04] p-3.5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/42">
                  Applied laminate
                </p>
                <p className="mt-2 text-base font-medium leading-tight text-white">
                  {selectedMaterial.name}
                </p>
                <p className="mt-0.5 text-sm text-[#d8a676]">{selectedMaterial.code}</p>
              </div>
            )}

            {/* Mobile save/share */}
            <div className="mt-4 flex gap-2 xl:hidden">
              <button
                type="button"
                onClick={handleSavePng}
                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-2.5 text-sm font-medium text-white hover:bg-white/[0.08]"
              >
                <Download className="size-4" />
                PNG
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-2.5 text-sm font-medium text-white hover:bg-white/[0.08]"
              >
                <Link2 className="size-4" />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* ── Sidebar (desktop right panel + mobile sheet) ─────────── */}
        {/* Rendered outside the flex column to position absolutely */}
      </div>

      {/* Sidebar rendered absolutely so it doesn't affect canvas layout */}
      <CustomizerSidebar
        key={activeRoom.id}
        activeRoom={activeRoom}
        selectedPart={selectedPart}
        currentAssignments={currentAssignments}
        selectedMaterial={selectedMaterial}
        visibleMaterials={visibleMaterials}
        activeGalleryCategory={activeGalleryCategory}
        galleryCategories={galleryCategories}
        changedItems={changedItems}
        materialsById={MATERIALS_BY_ID}
        onSelectPart={handleSelectPartExtended}
        onApplyMaterial={handleApplyMaterial}
        onSetCategory={handleSetCategory}
        onReset={handleReset}
      />

      {/* Hidden admin link */}
      <div className="hidden">
        <Link href="/studio">3D Studio Classic</Link>
        <Link href="/studio/admin">Studio Admin</Link>
      </div>
    </div>
  );
}
