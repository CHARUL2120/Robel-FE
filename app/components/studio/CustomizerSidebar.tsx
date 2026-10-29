'use client';

/**
 * CustomizerSidebar.tsx
 *
 * The right-panel / bottom-sheet sidebar for the Multi-Room 3D Customiser.
 *
 * Desktop (xl+): Fixed right panel, 380 px wide, full-height scrollable.
 * Tablet (md–xl): Narrower fixed panel, 320 px wide.
 * Mobile (<md):  A floating bottom bar + a Radix bottom sheet.
 *
 * The sidebar dynamically renders:
 *  1. Room-info header with changed-count badge
 *  2. Zone tabs (derived from the active room's zones) — clicking scrolls to that zone's parts
 *  3. Part chips filtered to the active zone
 *  4. Selected-part info card (name, zone, current material)
 *  5. Gallery category filter pills (Acrylic / Glossy / Matte / Woodgrain)
 *  6. Material gallery grid (2-col, highlighted on selection)
 *  7. Changed-items summary
 */

import Image from 'next/image';
import { Check, RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';
import type { GalleryCategory, RoomConfig, RoomPart, RoomZone, StudioMaterialDef } from '../../data/roomTypes';
import type { ChangedItem } from '../../hooks/useRoomCustomizer';

// ─── Types ─────────────────────────────────────────────────────────────────

interface SidebarProps {
  activeRoom: RoomConfig;
  selectedPart: RoomPart | undefined;
  currentAssignments: Record<string, string>;
  selectedMaterial: StudioMaterialDef | undefined;
  visibleMaterials: StudioMaterialDef[];
  activeGalleryCategory: GalleryCategory;
  galleryCategories: GalleryCategory[];
  changedItems: ChangedItem[];
  materialsById: Record<string, StudioMaterialDef>;
  onSelectPart: (partId: string) => void;
  onApplyMaterial: (materialId: string) => void;
  onSetCategory: (category: GalleryCategory) => void;
  onReset: () => void;
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function ZoneTabBar({
  zones,
  activeZoneId,
  onSelectZone,
}: {
  zones: RoomZone[];
  activeZoneId: string;
  onSelectZone: (id: string) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
      {zones.map((zone) => (
        <button
          key={zone.id}
          type="button"
          id={`zone-tab-${zone.id}`}
          onClick={() => onSelectZone(zone.id)}
          className={`shrink-0 rounded-full border px-3.5 py-2 text-xs font-semibold tracking-wide transition-all ${
            activeZoneId === zone.id
              ? 'border-[#d8a676] bg-[#d8a676] text-[#18120e]'
              : 'border-white/10 bg-white/[0.04] text-white/68 hover:border-white/20 hover:bg-white/[0.06]'
          }`}
        >
          {zone.label}
        </button>
      ))}
    </div>
  );
}

function PartChips({
  parts,
  selectedPartId,
  currentAssignments,
  defaultAssignments,
  materialsById,
  onSelectPart,
}: {
  parts: RoomPart[];
  selectedPartId: string | undefined;
  currentAssignments: Record<string, string>;
  defaultAssignments: Record<string, string>;
  materialsById: Record<string, StudioMaterialDef>;
  onSelectPart: (partId: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {parts.map((part) => {
        const isSelected = part.id === selectedPartId;
        const isChanged = currentAssignments[part.id] !== defaultAssignments[part.id];
        const matName = materialsById[currentAssignments[part.id]]?.name;

        return (
          <button
            key={part.id}
            type="button"
            id={`part-chip-${part.id}`}
            onClick={() => onSelectPart(part.id)}
            title={matName ? `${part.name}: ${matName}` : part.name}
            className={`relative flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-medium transition-all ${
              isSelected
                ? 'border-[#d8a676] bg-[#d8a676] text-[#18120e]'
                : 'border-white/10 bg-white/[0.03] text-white/68 hover:border-white/20 hover:bg-white/[0.05]'
            }`}
          >
            {isChanged && !isSelected && (
              <span className="size-1.5 rounded-full bg-[#d8a676]" aria-hidden="true" />
            )}
            {part.name}
          </button>
        );
      })}
    </div>
  );
}

function SelectedPartCard({
  part,
  material,
}: {
  part: RoomPart | undefined;
  material: StudioMaterialDef | undefined;
}) {
  if (!part) return null;

  const zoneLabel = part.zone
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/46">
        Selected surface
      </p>
      <p className="mt-2 text-lg font-semibold leading-tight text-white">{part.name}</p>
      <p className="mt-0.5 text-xs text-white/52">{zoneLabel}</p>
      {material && (
        <div className="mt-3 flex items-center gap-2 rounded-[14px] border border-white/8 bg-white/[0.03] px-3 py-2.5">
          <div
            className="size-4 shrink-0 rounded-full border border-white/20"
            style={{ background: material.baseColor }}
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">{material.name}</p>
            <p className="text-[10px] text-white/46">{material.code}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function CategoryPills({
  categories,
  activeCategory,
  onSelect,
}: {
  categories: GalleryCategory[];
  activeCategory: GalleryCategory;
  onSelect: (cat: GalleryCategory) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          id={`category-pill-${cat.toLowerCase()}`}
          onClick={() => onSelect(cat)}
          className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
            activeCategory === cat
              ? 'border-[#d8a676] bg-[#d8a676] text-[#18120e]'
              : 'border-white/10 bg-white/[0.04] text-white/68 hover:border-white/20 hover:bg-white/[0.06]'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

function MaterialGrid({
  materials,
  selectedMaterialId,
  onApply,
}: {
  materials: StudioMaterialDef[];
  selectedMaterialId: string | undefined;
  onApply: (id: string) => void;
}) {
  if (!materials.length) {
    return (
      <p className="py-6 text-center text-sm text-white/40">
        No materials in this category
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {materials.map((m) => {
        const isSelected = m.id === selectedMaterialId;

        return (
          <button
            key={m.id}
            type="button"
            id={`material-card-${m.id}`}
            onClick={() => onApply(m.id)}
            className={`overflow-hidden rounded-[20px] border text-left transition-all ${
              isSelected
                ? 'border-[#d8a676] bg-[#171b26] shadow-[0_16px_48px_-20px_rgba(0,0,0,0.45)]'
                : 'border-white/10 bg-white/[0.03] hover:border-white/18 hover:bg-white/[0.05]'
            }`}
          >
            <div className="relative aspect-[1.1/0.92]">
              <Image src={m.image} alt={m.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
              {isSelected && (
                <div className="absolute right-2.5 top-2.5 inline-flex size-7 items-center justify-center rounded-full bg-[#f2e7d8] text-[#1d140f]">
                  <Check className="size-3.5" />
                </div>
              )}
            </div>
            <div className="space-y-0.5 p-3">
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#d8a676]">
                {m.code}
              </p>
              <p className="truncate text-sm font-medium leading-tight text-white">{m.name}</p>
              <p className="text-[10px] text-white/46">{m.category}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function ChangedSummary({ items }: { items: ChangedItem[] }) {
  if (!items.length) return null;

  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d8a676]">
        {items.length} change{items.length !== 1 ? 's' : ''} from default
      </p>
      <div className="mt-3 space-y-1.5">
        {items.map((item) => (
          <div
            key={item.partId}
            className="flex items-center gap-2 rounded-[14px] border border-white/8 bg-white/[0.02] px-3 py-2"
          >
            <Check className="size-3 shrink-0 text-[#d8a676]" />
            <p className="min-w-0 truncate text-xs text-white/72">
              <span className="font-medium text-white/90">{item.partName}:</span>{' '}
              {item.materialName}{' '}
              <span className="text-white/40">({item.materialCode})</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Sidebar Panel Content ─────────────────────────────────────────────

function SidebarPanelContent({
  activeRoom,
  selectedPart,
  currentAssignments,
  selectedMaterial,
  visibleMaterials,
  activeGalleryCategory,
  galleryCategories,
  changedItems,
  materialsById,
  activeZoneId,
  onSelectZone,
  onSelectPart,
  onApplyMaterial,
  onSetCategory,
  onReset,
}: SidebarProps & { activeZoneId: string; onSelectZone: (id: string) => void }) {
  const zonePartIds = new Set(
    activeRoom.zones.find((z) => z.id === activeZoneId)?.partIds ?? []
  );
  const filteredParts = activeRoom.parts.filter((p) => zonePartIds.has(p.id));

  return (
    <div className="studio-scrollbar h-full overflow-y-auto p-5">
      <div className="space-y-5">
        {/* Room header */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d8a676]">
              {activeRoom.name}
            </p>
            <h2 className="mt-1 font-heading text-2xl font-semibold tracking-[-0.05em] text-white">
              {activeRoom.shortLabel}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {changedItems.length > 0 && (
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-white/60">
                {changedItems.length} changed
              </span>
            )}
            <button
              type="button"
              id="reset-room-btn"
              onClick={onReset}
              title="Reset to defaults"
              className="inline-flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition hover:bg-white/[0.08] hover:text-white"
            >
              <RefreshCcw className="size-4" />
            </button>
          </div>
        </div>

        {/* Zone tabs */}
        <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/46">
            Select zone
          </p>
          <div className="mt-3">
            <ZoneTabBar
              zones={activeRoom.zones}
              activeZoneId={activeZoneId}
              onSelectZone={onSelectZone}
            />
          </div>
        </div>

        {/* Part chips for active zone */}
        <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/46">
            Pick a surface
          </p>
          <div className="mt-3">
            <PartChips
              parts={filteredParts}
              selectedPartId={selectedPart?.id}
              currentAssignments={currentAssignments}
              defaultAssignments={activeRoom.defaultAssignments}
              materialsById={materialsById}
              onSelectPart={onSelectPart}
            />
          </div>
        </div>

        {/* Selected part info */}
        <SelectedPartCard part={selectedPart} material={selectedMaterial} />

        {/* Gallery */}
        <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/46">
            Material gallery
          </p>
          <div className="mt-3 space-y-4">
            <CategoryPills
              categories={galleryCategories}
              activeCategory={activeGalleryCategory}
              onSelect={onSetCategory}
            />
            <MaterialGrid
              materials={visibleMaterials}
              selectedMaterialId={selectedMaterial?.id}
              onApply={onApplyMaterial}
            />
          </div>
        </div>

        {/* Changed summary */}
        <ChangedSummary items={changedItems} />
      </div>
    </div>
  );
}

// ─── Exported Sidebar Component ─────────────────────────────────────────────

export default function CustomizerSidebar(props: SidebarProps) {
  const {
    activeRoom,
    selectedPart,
    selectedMaterial,
    changedItems,
    onSelectPart,
    onReset,
  } = props;

  // ── Local zone state (sidebar-internal, derived from room config) ───────
  const [activeZoneId, setActiveZoneId] = useState<string>(
    activeRoom.zones[0]?.id ?? ''
  );

  // When the room changes, reset the active zone to the new room's first zone
  const roomFirstZoneId = activeRoom.zones[0]?.id ?? '';
  const safeZoneId =
    activeRoom.zones.some((z) => z.id === activeZoneId)
      ? activeZoneId
      : roomFirstZoneId;

  // Select zone → auto-select first part in that zone
  const handleSelectZone = (zoneId: string) => {
    setActiveZoneId(zoneId);
    const zone = activeRoom.zones.find((z) => z.id === zoneId);
    if (zone?.partIds[0]) {
      onSelectPart(zone.partIds[0]);
    }
  };

  // ── Mobile sheet state ──────────────────────────────────────────────────
  const [sheetOpen, setSheetOpen] = useState(false);

  const sharedContentProps = {
    ...props,
    activeZoneId: safeZoneId,
    onSelectZone: handleSelectZone,
  };

  return (
    <>
      {/* ── Desktop / tablet fixed right panel (md+) ────────────────── */}
      <aside
        className="pointer-events-none absolute bottom-4 right-4 top-[128px] hidden md:block"
        aria-label="Laminate customiser controls"
      >
        <div className="pointer-events-auto flex h-full w-[320px] max-w-[42vw] flex-col overflow-hidden rounded-[30px] border border-white/10 bg-[#0f131d]/82 shadow-[0_30px_90px_-32px_rgba(0,0,0,0.45)] backdrop-blur-2xl xl:w-[380px]">
          <SidebarPanelContent {...sharedContentProps} />
        </div>
      </aside>

      {/* ── Mobile: floating bottom bar ─────────────────────────────── */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] md:hidden sm:px-5 sm:pb-5">
        <div className="pointer-events-auto mx-auto max-w-xl space-y-3">
          {/* Summary button that opens the sheet */}
          <button
            type="button"
            id="mobile-open-sheet-btn"
            onClick={() => setSheetOpen(true)}
            className="block w-full rounded-[26px] border border-white/10 bg-[#0f131d]/82 p-4 text-left backdrop-blur-2xl"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d8a676]">
                  Selected
                </p>
                <p className="mt-1.5 break-words text-lg font-semibold leading-tight text-white">
                  {selectedPart?.name ?? '—'}
                </p>
                <p className="mt-1 break-words text-sm text-white/60">
                  {selectedMaterial?.name ?? '—'}{' '}
                  {selectedMaterial?.code ? `(${selectedMaterial.code})` : ''}
                </p>
                <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-white/40">
                  Tap to change laminate
                </p>
              </div>
              {changedItems.length > 0 && (
                <span className="shrink-0 self-start rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-white/52">
                  {changedItems.length} changed
                </span>
              )}
            </div>
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              id="mobile-change-laminate-btn"
              onClick={() => setSheetOpen(true)}
              className="rounded-full border border-white/10 bg-[#0f131d]/82 px-4 py-3 text-sm font-medium text-white shadow-[0_20px_60px_-30px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
            >
              Change laminate
            </button>
            <button
              type="button"
              id="mobile-reset-btn"
              onClick={onReset}
              className="rounded-full border border-white/10 bg-[#0f131d]/82 px-4 py-3 text-sm font-medium text-white/70 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
            >
              Reset room
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile bottom sheet ──────────────────────────────────────── */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          side="bottom"
          className="h-[min(88svh,800px)] overflow-hidden rounded-t-[30px] border-white/10 bg-[#0f131d]/96 p-0 text-white backdrop-blur-2xl"
        >
          <SheetHeader className="shrink-0 px-5 pb-2 pt-5">
            <SheetTitle className="text-xl text-white">Laminate Studio</SheetTitle>
            <SheetDescription className="text-white/56">
              Select a surface zone, then tap a laminate to apply it.
            </SheetDescription>
          </SheetHeader>

          <div className="h-[calc(100%-88px)]">
            <SidebarPanelContent {...sharedContentProps} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
