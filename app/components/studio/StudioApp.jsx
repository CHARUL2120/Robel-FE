'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  Check,
  Copy,
  Download,
  ImageDown,
  Link2,
  MessageCircle,
} from 'lucide-react';
import { Button } from '../ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '../ui/sheet';
import BrandLogo from '../site/BrandLogo';
import {
  applyStudioAdminState,
  studioMaterials,
  studioModelLibrary,
  studioSpaces
} from '../../data/studioData';
import {
  buildStudioViewerMaterials,
  buildStudioViewerSpaces,
  studioViewerCategories
} from '../../data/studioViewerData';
import {
  decodeStudioConfig,
  encodeStudioConfig,
  loadJsonStorage,
  STUDIO_ADMIN_STATE_KEY
} from './storage';

const PremiumStudioCanvas = dynamic(() => import('./PremiumStudioCanvas'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[100svh] items-center justify-center bg-[#06080f] text-sm text-white/70">
      Loading premium 3D studio...
    </div>
  )
});

const defaultAdminState = {
  materials: {},
  spaces: {},
  models: {}
};

const initialViewerSpaces = buildStudioViewerSpaces(studioSpaces);
const initialViewerMaterials = buildStudioViewerMaterials(studioMaterials);
const defaultAssignmentsBySpace = Object.fromEntries(
  initialViewerSpaces.map((space) => [space.id, { ...space.defaultAssignments }])
);
const initialSharedConfig =
  typeof window === 'undefined'
    ? null
    : decodeStudioConfig(new URLSearchParams(window.location.search).get('config'));
const initialSpaceId =
  initialSharedConfig?.spaceId && defaultAssignmentsBySpace[initialSharedConfig.spaceId]
    ? initialSharedConfig.spaceId
    : initialViewerSpaces[0].id;
const initialPartId =
  initialSharedConfig?.selectedPartId ||
  Object.keys(initialSharedConfig?.assignments || {})[0] ||
  initialViewerSpaces.find((space) => space.id === initialSpaceId)?.defaultFocusPartId ||
  initialViewerSpaces[0].defaultFocusPartId;
const initialAssignments = initialSharedConfig?.spaceId
  ? {
      ...defaultAssignmentsBySpace,
      [initialSharedConfig.spaceId]: {
        ...defaultAssignmentsBySpace[initialSharedConfig.spaceId],
        ...initialSharedConfig.assignments
      }
    }
  : defaultAssignmentsBySpace;
const initialMaterialId =
  initialAssignments[initialSpaceId]?.[initialPartId] ||
  initialAssignments[initialSpaceId]?.[
    initialViewerSpaces.find((space) => space.id === initialSpaceId)?.defaultFocusPartId
  ];
const initialCategory =
  initialViewerMaterials.find((material) => material.id === initialMaterialId)?.galleryCategory ||
  'Acrylic';

function formatZoneLabel(zone) {
  return zone?.replaceAll('-', ' ') || 'surface';
}

function MaterialGallery({
  materials,
  selectedMaterialId,
  onApplyMaterial,
  titleClassName = 'text-lg font-semibold'
}) {
  return (
    <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
      {materials.map((material) => {
        const isSelected = material.id === selectedMaterialId;

        return (
          <button
            key={material.id}
            type="button"
            onClick={() => onApplyMaterial(material.id)}
            className={`overflow-hidden rounded-[22px] border text-left transition ${
              isSelected
                ? 'border-[#d8a676] bg-[#171b26] shadow-[0_18px_48px_-24px_rgba(0,0,0,0.45)]'
                : 'border-white/10 bg-white/[0.03] hover:border-white/18 hover:bg-white/[0.05]'
            }`}
          >
            <div className="relative aspect-[1.1/0.92]">
              <Image src={material.image} alt={material.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/8 to-transparent" />
              {isSelected && (
                <div className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-full bg-[#f2e7d8] text-[#1d140f]">
                  <Check className="size-4" />
                </div>
              )}
            </div>
            <div className="space-y-1 p-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d8a676]">
                {material.code}
              </p>
              <h3 className={titleClassName}>{material.name}</h3>
              <p className="text-xs text-white/56">{material.galleryCategory}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default function StudioApp() {
  const canvasRef = useRef(null);
  const spaceTabsRef = useRef(null);
  const spaceTabRefs = useRef({});
  const [adminState, setAdminState] = useState(() =>
    loadJsonStorage(STUDIO_ADMIN_STATE_KEY, defaultAdminState)
  );
  const [activeSpaceId, setActiveSpaceId] = useState(initialSpaceId);
  const [selectedPartId, setSelectedPartId] = useState(initialPartId);
  const [assignmentsBySpace, setAssignmentsBySpace] = useState(initialAssignments);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [mobileSheetView, setMobileSheetView] = useState('materials');

  const catalogState = applyStudioAdminState(
    studioMaterials,
    studioSpaces,
    studioModelLibrary,
    adminState
  );
  const activeModelIds = new Set(
    catalogState.models.filter((model) => model.active !== false).map((model) => model.id)
  );
  const availableSpaces = buildStudioViewerSpaces(catalogState.spaces).filter(
    (space) => space.active !== false && activeModelIds.has(space.id)
  );
  const materials = buildStudioViewerMaterials(
    catalogState.materials.filter((material) => material.active !== false)
  );
  const activeSpace =
    availableSpaces.find((space) => space.id === activeSpaceId) || availableSpaces[0];
  const currentAssignments = assignmentsBySpace[activeSpace?.id] || activeSpace?.defaultAssignments || {};
  const selectedPart =
    activeSpace?.parts.find((part) => part.id === selectedPartId) ||
    activeSpace?.parts.find((part) => part.id === activeSpace?.defaultFocusPartId) ||
    activeSpace?.parts[0];
  const selectedMaterial =
    materials.find((material) => material.id === currentAssignments[selectedPart?.id]) || materials[0];
  const visibleMaterials = materials
    .filter((material) => material.galleryCategory === activeCategory)
    .sort((left, right) => {
      const leftRecommended = left.recommendedFor.includes(activeSpace?.id);
      const rightRecommended = right.recommendedFor.includes(activeSpace?.id);

      if (leftRecommended !== rightRecommended) {
        return leftRecommended ? -1 : 1;
      }

      if (left.featured !== right.featured) {
        return left.featured ? -1 : 1;
      }

      return left.name.localeCompare(right.name);
    });
  const changedItems = activeSpace
    ? activeSpace.parts
        .map((part) => {
          const materialId = currentAssignments[part.id];

          if (materialId === activeSpace.defaultAssignments[part.id]) {
            return null;
          }

          const material = materials.find((entry) => entry.id === materialId);
          return {
            partId: part.id,
            partName: part.name,
            materialName: material?.name || 'Unknown',
            materialCode: material?.code || 'N/A'
          };
        })
        .filter(Boolean)
    : [];

  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === STUDIO_ADMIN_STATE_KEY) {
        setAdminState(loadJsonStorage(STUDIO_ADMIN_STATE_KEY, defaultAdminState));
      }
    };

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    const container = spaceTabsRef.current;
    const activeButton = spaceTabRefs.current[activeSpaceId];

    if (!container || !activeButton) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();
    const nextLeft =
      container.scrollLeft +
      (buttonRect.left + buttonRect.width / 2) -
      (containerRect.left + containerRect.width / 2);
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

    container.scrollTo({
      left: Math.max(0, nextLeft),
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  }, [activeSpaceId]);

  if (!activeSpace) {
    return null;
  }

  const makeShareUrl = () => {
    const snapshot = {
      version: 2,
      spaceId: activeSpace.id,
      selectedPartId: selectedPart?.id,
      assignments: currentAssignments
    };

    const encodedSnapshot = encodeStudioConfig(snapshot);
    return `${window.location.origin}/studio?config=${encodeURIComponent(encodedSnapshot)}`;
  };

  const handleSpaceChange = (spaceId) => {
    const nextSpace = availableSpaces.find((space) => space.id === spaceId);

    if (!nextSpace) {
      return;
    }

    const nextMaterialId = assignmentsBySpace[nextSpace.id]?.[nextSpace.defaultFocusPartId];
    const nextMaterial = materials.find((material) => material.id === nextMaterialId);

    setActiveSpaceId(nextSpace.id);
    setSelectedPartId(nextSpace.defaultFocusPartId);
    setActiveCategory(nextMaterial?.galleryCategory || 'Acrylic');
  };

  const handleSelectPart = (partId) => {
    const nextPart = activeSpace.parts.find((part) => part.id === partId);
    const currentMaterial = materials.find(
      (material) => material.id === currentAssignments[partId]
    );

    if (!nextPart) {
      return;
    }

    setSelectedPartId(partId);
    setActiveCategory(currentMaterial?.galleryCategory || activeCategory);
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setMobileSheetView('materials');
      setMobileSheetOpen(true);
    }
  };

  const handleApplyMaterial = (materialId) => {
    if (!selectedPart) {
      return;
    }

    setAssignmentsBySpace((current) => ({
      ...current,
      [activeSpace.id]: {
        ...current[activeSpace.id],
        [selectedPart.id]: materialId
      }
    }));
  };

  const handleSaveImage = async () => {
    const dataUrl = await canvasRef.current?.captureImage();

    if (!dataUrl) {
      return;
    }

    const anchor = document.createElement('a');
    anchor.href = dataUrl;
    anchor.download = `robel-${activeSpace.shortLabel.toLowerCase().replace(/\s+/g, '-')}.png`;
    anchor.click();
  };

  const buildPngFile = async () => {
    const dataUrl = await canvasRef.current?.captureImage();

    if (!dataUrl) {
      return null;
    }

    const response = await fetch(dataUrl);
    const blob = await response.blob();
    const fileName = `robel-${activeSpace.shortLabel.toLowerCase().replace(/\s+/g, '-')}.png`;

    return {
      dataUrl,
      file: new File([blob], fileName, { type: 'image/png' }),
      fileName
    };
  };

  const handleShareLink = async () => {
    const url = makeShareUrl();

    try {
      if (navigator.share) {
        await navigator.share({
          title: `Robel ${activeSpace.shareLabel} Studio`,
          text: `Review this ${activeSpace.shareLabel.toLowerCase()} finish concept from Robel.`,
          url
        });
      } else {
        await navigator.clipboard.writeText(url);
      }
    } catch {}
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(makeShareUrl());
    } catch {}
  };

  const handleWhatsApp = async () => {
    const pngPayload = await buildPngFile();

    if (!pngPayload) {
      return;
    }

    try {
      if (
        navigator.share &&
        (!navigator.canShare || navigator.canShare({ files: [pngPayload.file] }))
      ) {
        await navigator.share({
          files: [pngPayload.file]
        });
        return;
      }

      const anchor = document.createElement('a');
      anchor.href = pngPayload.dataUrl;
      anchor.download = pngPayload.fileName;
      anchor.click();
    } catch {}
  };

  const actionPanel = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
        <Button className="h-12" onClick={handleSaveImage}>
          <ImageDown className="size-4" />
          PNG
        </Button>
        <Button variant="outline" className="h-12" onClick={handleShareLink}>
          <Link2 className="size-4" />
          Share
        </Button>
        <Button variant="outline" className="h-12" onClick={handleCopyLink}>
          <Copy className="size-4" />
          Copy link
        </Button>
        <Button variant="outline" className="h-12" onClick={handleWhatsApp}>
          <MessageCircle className="size-4" />
          WhatsApp
        </Button>
      </div>
    </div>
  );

  const materialPanel = (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {studioViewerCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
              activeCategory === category
                ? 'border-[#d8a676] bg-[#d8a676] text-[#18120e]'
                : 'border-white/10 bg-white/[0.04] text-white/72 hover:border-white/20 hover:bg-white/[0.06]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <MaterialGallery
        materials={visibleMaterials}
        selectedMaterialId={selectedMaterial?.id}
        onApplyMaterial={handleApplyMaterial}
      />
    </div>
  );

  return (
    <div
      data-studio-app="true"
      className="relative h-[100svh] min-h-[100svh] overflow-hidden bg-[#05070d] text-white md:h-[100dvh] md:max-h-[100dvh]"
    >
      <div className="absolute inset-0">
        <PremiumStudioCanvas
          key={activeSpace.id}
          ref={canvasRef}
          space={activeSpace}
          materials={materials}
          assignments={currentAssignments}
          selectedPartId={selectedPart?.id}
          onSelectPart={handleSelectPart}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(108,69,43,0.18),transparent_32%),linear-gradient(180deg,rgba(5,7,13,0.32)_0%,rgba(5,7,13,0.12)_28%,rgba(5,7,13,0.74)_100%)]" />

      <div className="pointer-events-none absolute inset-0 flex flex-col">
        <div className="pointer-events-auto flex items-center justify-between gap-3 px-3 pt-3 sm:px-5 sm:pt-5">
          <div className="inline-flex min-w-0 items-center gap-2 px-1 py-1 sm:gap-3">
            <BrandLogo variant="inline" className="h-auto w-[94px] min-[420px]:w-[104px] sm:w-[112px]" />
            <span className="hidden rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60 sm:inline-flex">
              3D Studio
            </span>
          </div>

          <div className="hidden items-center gap-3 xl:flex">
            <Button className="h-11" onClick={handleSaveImage}>
              <Download className="size-4" />
              Save PNG
            </Button>
          </div>
        </div>

        <div className="pointer-events-auto px-3 pt-3 sm:px-5 sm:pt-4">
          <div ref={spaceTabsRef} className="mx-auto w-full overflow-x-auto no-scrollbar">
            <div className="mx-auto flex w-fit min-w-max items-center justify-center gap-2 rounded-full border border-white/10 bg-[#0f131d]/72 p-1.5 backdrop-blur-2xl">
              {availableSpaces.map((space) => (
                <button
                  key={space.id}
                  type="button"
                  ref={(node) => {
                    if (node) {
                      spaceTabRefs.current[space.id] = node;
                    } else {
                      delete spaceTabRefs.current[space.id];
                    }
                  }}
                  onClick={() => handleSpaceChange(space.id)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeSpace.id === space.id
                      ? 'bg-[#f0ddca] text-[#130e0b]'
                      : 'text-white/70 hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  {space.shortLabel}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto hidden px-5 pb-5 xl:block">
          <div className="flex items-end justify-between gap-5">
            <div className="max-w-[340px] rounded-[28px] border border-white/10 bg-[#0f131d]/72 p-5 backdrop-blur-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d8a676]">
                Selected Surface
              </p>
              <h1 className="mt-3 text-balance font-heading text-3xl font-semibold leading-tight tracking-[-0.05em] text-white">
                {selectedPart?.name}
              </h1>
              <p className="mt-2 text-sm text-white/68">{formatZoneLabel(selectedPart?.zone)}</p>
              <div className="mt-4 rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/46">
                  Applied laminate
                </p>
                <p className="mt-2 text-lg font-medium">
                  {selectedMaterial?.name} ({selectedMaterial?.code})
                </p>
              </div>
            </div>

            <div className="pointer-events-auto hidden h-[calc(100svh-120px)] w-[370px] shrink-0 overflow-hidden rounded-[32px] border border-white/10 bg-[#0f131d]/76 shadow-[0_30px_90px_-32px_rgba(0,0,0,0.45)] backdrop-blur-2xl xl:block">
              <div className="studio-scrollbar h-full overflow-y-auto p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d8a676]">
                    {activeSpace.name}
                  </p>
                  <h2 className="mt-2 font-heading text-3xl font-semibold tracking-[-0.05em] text-white">
                    {activeSpace.shortLabel}
                  </h2>
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs uppercase tracking-[0.2em] text-white/60">
                  {changedItems.length} changed
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/46">
                    Tap or pick a surface
                  </p>
                  <div className="mt-3 flex max-h-[112px] flex-wrap gap-2 overflow-y-auto pr-1">
                    {activeSpace.parts.map((part) => (
                      <button
                        key={part.id}
                        type="button"
                        onClick={() => handleSelectPart(part.id)}
                        className={`rounded-full border px-3 py-2 text-xs transition ${
                          selectedPart?.id === part.id
                            ? 'border-[#d8a676] bg-[#d8a676] text-[#18120e]'
                            : 'border-white/10 bg-white/[0.03] text-white/68 hover:border-white/20'
                        }`}
                      >
                        {part.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/46">
                    Material Gallery
                  </p>
                  <div className="mt-4">{materialPanel}</div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/46">
                    Save & Share
                  </p>
                  <div className="mt-4">{actionPanel}</div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-4 right-4 top-[134px] hidden md:block xl:hidden">
          <div className="pointer-events-auto flex h-full w-[320px] max-w-[42vw] flex-col overflow-hidden rounded-[30px] border border-white/10 bg-[#0f131d]/82 shadow-[0_30px_90px_-32px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
            <div className="studio-scrollbar flex-1 overflow-y-auto p-4">
              <div className="space-y-3">
                <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d8a676]">
                        Selected Surface
                      </p>
                      <h2 className="mt-2 break-words text-xl font-semibold leading-tight text-white">
                        {selectedPart?.name}
                      </h2>
                      <p className="mt-1 text-sm text-white/62">
                        {selectedMaterial?.name} ({selectedMaterial?.code})
                      </p>
                    </div>
                    <div className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-white/56">
                      {changedItems.length}
                    </div>
                  </div>
                </div>

                <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/46">
                    Tap or pick a surface
                  </p>
                  <div className="mt-3 flex max-h-[132px] flex-wrap gap-2 overflow-y-auto pr-1">
                    {activeSpace.parts.map((part) => (
                      <button
                        key={part.id}
                        type="button"
                        onClick={() => handleSelectPart(part.id)}
                        className={`rounded-full border px-3 py-2 text-xs transition ${
                          selectedPart?.id === part.id
                            ? 'border-[#d8a676] bg-[#d8a676] text-[#18120e]'
                            : 'border-white/10 bg-white/[0.03] text-white/68 hover:border-white/20'
                        }`}
                      >
                        {part.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/46">
                    Material Gallery
                  </p>
                  <div className="mt-4">{materialPanel}</div>
                </div>

                <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/46">
                    Save & Share
                  </p>
                  <div className="mt-4">{actionPanel}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] md:hidden sm:px-5 sm:pb-5">
        <div className="pointer-events-auto mx-auto max-w-xl space-y-3">
          <button
            type="button"
            onClick={() => {
              setMobileSheetView('materials');
              setMobileSheetOpen(true);
            }}
            className="block w-full rounded-[26px] border border-white/10 bg-[#0f131d]/82 p-4 text-left backdrop-blur-2xl"
          >
            <div className="flex items-start justify-between gap-3 max-[420px]:flex-col max-[420px]:items-stretch">
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d8a676]">
                  Selected
                </p>
                <h2 className="mt-2 break-words text-lg font-semibold leading-tight text-white">
                  {selectedPart?.name}
                </h2>
                <p className="mt-1 break-words text-sm text-white/62">
                  {selectedMaterial?.name} ({selectedMaterial?.code})
                </p>
                <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-white/46">
                  Tap to change laminate
                </p>
              </div>
              <div className="shrink-0 self-start rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs uppercase tracking-[0.2em] text-white/56">
                {changedItems.length} changed
              </div>
            </div>
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setMobileSheetView('materials');
                setMobileSheetOpen(true);
              }}
              className="rounded-full border border-white/10 bg-[#0f131d]/82 px-4 py-3 text-sm font-medium text-white shadow-[0_20px_60px_-30px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
            >
              Change Laminate
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileSheetView('actions');
                setMobileSheetOpen(true);
              }}
              className="rounded-full border border-white/10 bg-[#0f131d]/82 px-4 py-3 text-sm font-medium text-white shadow-[0_20px_60px_-30px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
            >
              Actions
            </button>
          </div>
        </div>
      </div>

      <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
          <SheetContent
          side="bottom"
          className="h-[min(84svh,760px)] overflow-hidden rounded-t-[30px] border-white/10 bg-[#0f131d]/96 p-0 text-white backdrop-blur-2xl"
        >
          <SheetHeader className="shrink-0 pb-2">
            <SheetTitle className="text-xl text-white">
              {mobileSheetView === 'materials' ? 'Material Gallery' : 'Studio Actions'}
            </SheetTitle>
              <SheetDescription className="text-white/56">
                {mobileSheetView === 'materials'
                  ? 'Tap a surface in the model, then apply a laminate here.'
                  : 'Save, share, or export your studio view.'}
              </SheetDescription>
          </SheetHeader>

          <div className="studio-scrollbar min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] touch-pan-y">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d8a676]">
                Current selection
              </p>
              <p className="mt-2 break-words text-lg font-medium leading-tight text-white">
                {selectedPart?.name}
              </p>
              <p className="mt-1 break-words text-sm text-white/62">
                {selectedMaterial?.name} ({selectedMaterial?.code})
              </p>
              <div className="mt-4 flex max-h-[112px] flex-wrap gap-2 overflow-y-auto overscroll-contain pr-1 touch-pan-y">
                {activeSpace.parts.map((part) => (
                  <button
                    key={part.id}
                    type="button"
                    onClick={() => handleSelectPart(part.id)}
                    className={`rounded-full border px-3 py-2 text-xs transition ${
                      selectedPart?.id === part.id
                        ? 'border-[#d8a676] bg-[#d8a676] text-[#18120e]'
                        : 'border-white/10 bg-white/[0.03] text-white/68'
                    }`}
                  >
                    {part.name}
                  </button>
                ))}
              </div>
            </div>

            {mobileSheetView === 'materials' ? materialPanel : actionPanel}

            {changedItems.length > 0 && (
              <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d8a676]">
                  Applied changes
                </p>
                <div className="mt-3 space-y-2">
                  {changedItems.map((item) => (
                    <div
                      key={item.partId}
                      className="rounded-[18px] border border-white/10 bg-white/[0.03] px-3 py-3 text-sm text-white/72"
                    >
                      {item.partName}: {item.materialName} ({item.materialCode})
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <div className="hidden">
        <Link href="/studio/admin">Studio Admin</Link>
      </div>
    </div>
  );
}
