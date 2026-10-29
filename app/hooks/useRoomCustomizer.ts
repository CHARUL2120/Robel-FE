'use client';

/**
 * useRoomCustomizer.ts
 *
 * Central state hook for the Multi-Room 3D Customiser.
 *
 * Manages:
 * - Active room (with seamless camera-reset on switch)
 * - Selected part within that room
 * - Per-room material assignments (preserved across room switches)
 * - Active gallery category filter (auto-synced to the selected material)
 *
 * All derived values (visible materials, changed parts, etc.) are memoised
 * to avoid unnecessary re-renders of the R3F canvas and sidebar.
 */

import { useCallback, useMemo, useState } from 'react';
import type { GalleryCategory, RoomConfig, RoomPart, StudioMaterialDef } from '../data/roomTypes';
import { ROOMS, ROOMS_BY_ID } from '../data/roomsConfig';
import { MATERIALS_BY_ID, STUDIO_MATERIALS } from '../data/roomsMaterials';
import { GALLERY_CATEGORIES } from '../data/roomTypes';

// ─── Types ─────────────────────────────────────────────────────────────────

export interface ChangedItem {
  partId: string;
  partName: string;
  materialName: string;
  materialCode: string;
}

export interface UseRoomCustomizerReturn {
  // ── Data
  rooms: RoomConfig[];
  activeRoom: RoomConfig;
  selectedPart: RoomPart | undefined;
  currentAssignments: Record<string, string>;
  selectedMaterial: StudioMaterialDef | undefined;
  materials: StudioMaterialDef[];
  visibleMaterials: StudioMaterialDef[];
  activeGalleryCategory: GalleryCategory;
  galleryCategories: GalleryCategory[];
  changedItems: ChangedItem[];

  // ── Actions
  handleRoomSwitch: (roomId: string) => void;
  handleSelectPart: (partId: string) => void;
  handleApplyMaterial: (materialId: string) => void;
  handleSetCategory: (category: GalleryCategory) => void;
  handleReset: () => void;
}

// ─── Initial state helpers ─────────────────────────────────────────────────

function buildDefaultAssignments(): Record<string, Record<string, string>> {
  return Object.fromEntries(
    ROOMS.map((room) => [room.id, { ...room.defaultAssignments }])
  );
}

// ─── Hook ──────────────────────────────────────────────────────────────────

export function useRoomCustomizer(): UseRoomCustomizerReturn {
  const [activeRoomId, setActiveRoomId] = useState<string>(ROOMS[0].id);
  const [selectedPartId, setSelectedPartId] = useState<string>(
    ROOMS[0].defaultFocusPartId
  );
  const [activeGalleryCategory, setActiveGalleryCategory] =
    useState<GalleryCategory>('Acrylic');
  const [assignmentsByRoom, setAssignmentsByRoom] = useState<
    Record<string, Record<string, string>>
  >(buildDefaultAssignments);

  // ── Derived: active room ────────────────────────────────────────────────
  const activeRoom = useMemo<RoomConfig>(
    () => ROOMS_BY_ID[activeRoomId] ?? ROOMS[0],
    [activeRoomId]
  );

  // ── Derived: current assignments for the active room ───────────────────
  const currentAssignments = useMemo<Record<string, string>>(
    () => assignmentsByRoom[activeRoom.id] ?? activeRoom.defaultAssignments,
    [assignmentsByRoom, activeRoom]
  );

  // ── Derived: selected part object ─────────────────────────────────────
  const selectedPart = useMemo<RoomPart | undefined>(
    () =>
      activeRoom.parts.find((p) => p.id === selectedPartId) ??
      activeRoom.parts.find((p) => p.id === activeRoom.defaultFocusPartId) ??
      activeRoom.parts[0],
    [activeRoom, selectedPartId]
  );

  // ── Derived: material applied to the selected part ────────────────────
  const selectedMaterial = useMemo<StudioMaterialDef | undefined>(() => {
    if (!selectedPart) return undefined;
    const materialId = currentAssignments[selectedPart.id];
    return materialId ? MATERIALS_BY_ID[materialId] : undefined;
  }, [selectedPart, currentAssignments]);

  // ── Derived: all active materials (no admin gate for simplicity) ───────
  const materials = useMemo<StudioMaterialDef[]>(() => STUDIO_MATERIALS, []);

  // ── Derived: filtered + sorted materials for the sidebar gallery ───────
  const visibleMaterials = useMemo<StudioMaterialDef[]>(() => {
    return materials
      .filter((m) => m.galleryCategory === activeGalleryCategory)
      .sort((a, b) => {
        // 1. Materials recommended for the active room surface first
        const aRec = a.recommendedFor.includes(activeRoom.id);
        const bRec = b.recommendedFor.includes(activeRoom.id);
        if (aRec !== bRec) return aRec ? -1 : 1;

        // 2. Featured items next
        if (a.featured !== b.featured) return a.featured ? -1 : 1;

        // 3. Alphabetical fallback
        return a.name.localeCompare(b.name);
      });
  }, [materials, activeGalleryCategory, activeRoom.id]);

  // ── Derived: parts that differ from defaults (for the change summary) ──
  const changedItems = useMemo<ChangedItem[]>(() => {
    return activeRoom.parts
      .map((part) => {
        const assigned = currentAssignments[part.id];
        const defaultId = activeRoom.defaultAssignments[part.id];
        if (!assigned || assigned === defaultId) return null;
        const material = MATERIALS_BY_ID[assigned];
        return {
          partId: part.id,
          partName: part.name,
          materialName: material?.name ?? 'Unknown',
          materialCode: material?.code ?? 'N/A',
        };
      })
      .filter((item): item is ChangedItem => item !== null);
  }, [activeRoom, currentAssignments]);

  // ─── Actions ────────────────────────────────────────────────────────────

  /**
   * Switch to a different room.
   * - Resets `selectedPartId` to the new room's `defaultFocusPartId`
   * - Syncs `activeGalleryCategory` to the category of the material currently
   *   applied to the default focus part (so the gallery feels contextually correct)
   * - Per-room assignments are preserved, not wiped
   */
  const handleRoomSwitch = useCallback(
    (roomId: string) => {
      const nextRoom = ROOMS_BY_ID[roomId];
      if (!nextRoom) return;

      const nextPartId = nextRoom.defaultFocusPartId;
      const nextMaterialId =
        assignmentsByRoom[roomId]?.[nextPartId] ??
        nextRoom.defaultAssignments[nextPartId];
      const nextMaterial = nextMaterialId
        ? MATERIALS_BY_ID[nextMaterialId]
        : undefined;

      setActiveRoomId(roomId);
      setSelectedPartId(nextPartId);
      setActiveGalleryCategory(nextMaterial?.galleryCategory ?? 'Acrylic');
    },
    [assignmentsByRoom]
  );

  /**
   * Select a surface part in the active room.
   * - Syncs the gallery category to the material currently on that part
   * - On mobile, the caller may open the bottom sheet after calling this
   */
  const handleSelectPart = useCallback(
    (partId: string) => {
      const part = activeRoom.parts.find((p) => p.id === partId);
      if (!part) return;

      const materialId = currentAssignments[partId];
      const material = materialId ? MATERIALS_BY_ID[materialId] : undefined;

      setSelectedPartId(partId);
      if (material) {
        setActiveGalleryCategory(material.galleryCategory);
      }
    },
    [activeRoom.parts, currentAssignments]
  );

  /**
   * Apply a laminate material to the currently selected part.
   * Updates only the active room's assignment map; other rooms are untouched.
   */
  const handleApplyMaterial = useCallback(
    (materialId: string) => {
      if (!selectedPart) return;
      setAssignmentsByRoom((prev) => ({
        ...prev,
        [activeRoom.id]: {
          ...prev[activeRoom.id],
          [selectedPart.id]: materialId,
        },
      }));
    },
    [activeRoom.id, selectedPart]
  );

  /** Switch the gallery category filter */
  const handleSetCategory = useCallback((category: GalleryCategory) => {
    setActiveGalleryCategory(category);
  }, []);

  /**
   * Reset all assignments for the active room back to their defaults.
   * Preserves assignments in all other rooms.
   */
  const handleReset = useCallback(() => {
    setAssignmentsByRoom((prev) => ({
      ...prev,
      [activeRoom.id]: { ...activeRoom.defaultAssignments },
    }));
    setSelectedPartId(activeRoom.defaultFocusPartId);
  }, [activeRoom]);

  // ─── Return ─────────────────────────────────────────────────────────────

  return {
    rooms: ROOMS,
    activeRoom,
    selectedPart,
    currentAssignments,
    selectedMaterial,
    materials,
    visibleMaterials,
    activeGalleryCategory,
    galleryCategories: GALLERY_CATEGORIES,
    changedItems,
    handleRoomSwitch,
    handleSelectPart,
    handleApplyMaterial,
    handleSetCategory,
    handleReset,
  };
}
