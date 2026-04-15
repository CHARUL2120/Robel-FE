'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Check, Download, Layers3, Palette, Sofa } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import {
  applyStudioAdminState,
  studioMaterials,
  studioModelLibrary,
  studioSpaces
} from '../../data/studioData';
import { loadJsonStorage, STUDIO_ADMIN_STATE_KEY } from './storage';

const defaultAdminState = {
  materials: {},
  spaces: {},
  models: {}
};

const defaultAssignmentsBySpace = Object.fromEntries(
  studioSpaces.map((space) => [space.id, { ...space.defaultAssignments }])
);

function formatZoneLabel(zone) {
  return zone?.replaceAll('-', ' ') || 'selected area';
}

function buildDownloadContent({ space, changedItems, assignments, materialsById }) {
  const lines = [
    'Robel Studio Selection',
    `Space: ${space.name}`,
    `Checked changes: ${changedItems.length}`,
    ''
  ];

  if (!changedItems.length) {
    lines.push('No custom changes were made. The space is using its default material setup.');
    lines.push('');
  } else {
    lines.push('Changed items:');
    changedItems.forEach((item) => {
      lines.push(`- ${item.partName}: ${item.materialName} (${item.materialCode})`);
    });
    lines.push('');
  }

  lines.push('Current materials:');
  space.parts.forEach((part) => {
    const material = materialsById[assignments[part.id]];
    lines.push(`- ${part.name}: ${material?.name || 'Unknown'} (${material?.code || 'N/A'})`);
  });

  return lines.join('\n');
}

export default function StudioExperience() {
  const [adminState, setAdminState] = useState(() =>
    loadJsonStorage(STUDIO_ADMIN_STATE_KEY, defaultAdminState)
  );
  const [activeSpaceId, setActiveSpaceId] = useState(studioSpaces[0].id);
  const [selectedPartId, setSelectedPartId] = useState(studioSpaces[0].defaultFocusPartId);
  const [assignmentsBySpace, setAssignmentsBySpace] = useState(defaultAssignmentsBySpace);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [downloadStatus, setDownloadStatus] = useState('');

  const catalogState = applyStudioAdminState(
    studioMaterials,
    studioSpaces,
    studioModelLibrary,
    adminState
  );

  const activeModelIds = new Set(
    catalogState.models.filter((model) => model.active !== false).map((model) => model.id)
  );
  const availableSpaces = catalogState.spaces.filter(
    (space) => space.active !== false && activeModelIds.has(space.id)
  );
  const activeMaterials = catalogState.materials.filter((material) => material.active !== false);
  const materialsById = Object.fromEntries(activeMaterials.map((material) => [material.id, material]));
  const activeSpace =
    availableSpaces.find((space) => space.id === activeSpaceId) || availableSpaces[0];

  const currentAssignments = assignmentsBySpace[activeSpace?.id] || activeSpace?.defaultAssignments || {};

  const selectedPart =
    activeSpace?.parts.find((part) => part.id === selectedPartId) ||
    activeSpace?.parts.find((part) => part.id === activeSpace?.defaultFocusPartId) ||
    activeSpace?.parts[0];

  const selectedMaterial = activeMaterials.find(
    (material) => material.id === currentAssignments[selectedPart?.id]
  );

  const materialCategories = ['All', ...new Set(activeMaterials.map((material) => material.category))];

  const visibleMaterials = activeMaterials
    .filter((material) => categoryFilter === 'All' || material.category === categoryFilter)
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

  const changedItems = !activeSpace
    ? []
    : activeSpace.parts
        .map((part) => {
          const materialId = currentAssignments[part.id];
          const defaultMaterialId = activeSpace.defaultAssignments[part.id];
          const material = materialsById[materialId];

          if (materialId === defaultMaterialId) {
            return null;
          }

          return {
            partId: part.id,
            partName: part.name,
            materialName: material?.name || 'Unknown',
            materialCode: material?.code || 'N/A'
          };
        })
        .filter(Boolean);

  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === STUDIO_ADMIN_STATE_KEY) {
        setAdminState(loadJsonStorage(STUDIO_ADMIN_STATE_KEY, defaultAdminState));
      }
    };

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  if (!activeSpace) {
    return null;
  }

  const handleSpaceChange = (spaceId) => {
    const nextSpace = availableSpaces.find((space) => space.id === spaceId);

    if (!nextSpace) {
      return;
    }

    setActiveSpaceId(nextSpace.id);
    setSelectedPartId(nextSpace.defaultFocusPartId);
    setDownloadStatus('');
  };

  const handleMaterialApply = (materialId) => {
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
    setDownloadStatus('');
  };

  const handleDownload = () => {
    const content = buildDownloadContent({
      space: activeSpace,
      changedItems,
      assignments: currentAssignments,
      materialsById
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `robel-${activeSpace.shortLabel.toLowerCase().replace(/\s+/g, '-')}-selection.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
    setDownloadStatus('Selection downloaded.');
  };

  return (
    <div className="pb-12 pt-28 sm:pb-16 sm:pt-32">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-[34px] border border-white/50 bg-[linear-gradient(145deg,#1d1612_0%,#32231d_52%,#8c603d_100%)] p-5 text-white shadow-[0_36px_110px_-46px_rgba(31,21,15,0.75)] sm:p-7">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,220,186,0.18),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_26%)]" />
            <div className="relative grid gap-5 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
              <div className="space-y-4">
                <span className="inline-flex rounded-full border border-white/15 bg-white/8 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/76">
                  Smart mobile laminate view
                </span>
                <div className="space-y-2">
                  <h1 className="font-heading text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl lg:text-5xl">
                    Pick the room, check the laminate, download the selection.
                  </h1>
                  <p className="max-w-2xl text-sm leading-6 text-white/72 sm:text-base">
                    A simple premium viewer for phone and tablet with a clean, touch-first laminate workflow.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-[24px] border border-white/12 bg-white/8 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/48">
                      Room
                    </p>
                    <p className="mt-2 font-heading text-2xl font-semibold">{activeSpace.shortLabel}</p>
                  </div>
                  <div className="rounded-[24px] border border-white/12 bg-white/8 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/48">
                      Selected area
                    </p>
                    <p className="mt-2 font-heading text-2xl font-semibold">{selectedPart?.name}</p>
                  </div>
                  <div className="rounded-[24px] border border-white/12 bg-white/8 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/48">
                      Checked changes
                    </p>
                    <p className="mt-2 font-heading text-2xl font-semibold">{changedItems.length}</p>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-[30px] border border-white/12 bg-black/18 p-3">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] sm:aspect-[5/4]">
                  <Image
                    src={activeSpace.heroImage}
                    alt={activeSpace.name}
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,8,7,0.04)_0%,rgba(11,8,7,0.28)_52%,rgba(11,8,7,0.86)_100%)]" />
                  <div className="absolute left-4 right-4 top-4 z-20 flex items-center justify-between gap-3">
                    <span className="rounded-full border border-white/12 bg-[#120e0c]/58 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/74 backdrop-blur-xl">
                      {activeSpace.shortLabel}
                    </span>
                  </div>
                  <div className="absolute inset-x-4 bottom-4 rounded-[22px] border border-white/12 bg-[#120e0c]/64 p-4 backdrop-blur-xl">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/46">
                      Current choice
                    </p>
                    <h2 className="mt-2 font-heading text-2xl font-semibold text-white">
                      {selectedMaterial?.name}
                    </h2>
                    <p className="mt-1 text-sm text-white/72">
                      {selectedMaterial?.code} / {selectedMaterial?.category}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-6 2xl:order-1">
              <Card className="rounded-[32px] border-white/50 bg-white/70 shadow-[0_28px_90px_-42px_rgba(33,22,16,0.32)]">
                <CardContent className="space-y-6 p-5 sm:p-6">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8b6a4a]">
                      Step 1
                    </p>
                    <h2 className="mt-2 font-heading text-2xl font-semibold tracking-[-0.04em] text-[#221a16] sm:text-3xl">
                      Choose your room
                    </h2>
                  </div>

                  <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                    {availableSpaces.map((space) => (
                      <button
                        key={space.id}
                        type="button"
                        onClick={() => handleSpaceChange(space.id)}
                        className={`shrink-0 rounded-full border px-4 py-3 text-sm font-medium transition ${
                          activeSpace.id === space.id
                            ? 'border-[#2d231c] bg-[#2d231c] text-white'
                            : 'border-[#e7d9cb] bg-white text-[#4c4139] hover:border-[#c9b29a]'
                        }`}
                      >
                        {space.shortLabel}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[32px] border-white/50 bg-white/70 shadow-[0_28px_90px_-42px_rgba(33,22,16,0.32)]">
                <CardContent className="space-y-6 p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-full bg-[#2d231c] text-white">
                      <Layers3 className="size-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8b6a4a]">
                        Step 2
                      </p>
                      <h2 className="mt-1 font-heading text-2xl font-semibold tracking-[-0.04em] text-[#221a16] sm:text-3xl">
                        Choose area
                      </h2>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {activeSpace.parts.map((part) => {
                      const currentMaterial = materialsById[currentAssignments[part.id]];
                      const isSelected = selectedPart?.id === part.id;
                      const isChanged =
                        currentAssignments[part.id] !== activeSpace.defaultAssignments[part.id];

                      return (
                        <button
                          key={part.id}
                          type="button"
                          onClick={() => {
                            setSelectedPartId(part.id);
                            setDownloadStatus('');
                          }}
                          className={`rounded-[24px] border p-4 text-left transition ${
                            isSelected
                              ? 'border-[#2d231c] bg-[#fff7ef] shadow-[0_18px_44px_-26px_rgba(36,27,20,0.22)]'
                              : 'border-[#eadfce] bg-white hover:border-[#d4bea7]'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="break-words text-base font-semibold text-[#241b16]">
                                {part.name}
                              </p>
                              <p className="mt-1 text-sm text-[#74675d]">
                                {formatZoneLabel(part.zone)}
                              </p>
                            </div>
                            {isChanged && (
                              <span className="inline-flex size-8 items-center justify-center rounded-full bg-[#2d231c] text-white">
                                <Check className="size-4" />
                              </span>
                            )}
                          </div>
                          <p className="mt-4 text-sm text-[#5f544a]">
                            {currentMaterial?.name} ({currentMaterial?.code})
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[32px] border-white/50 bg-white/70 shadow-[0_28px_90px_-42px_rgba(33,22,16,0.32)]">
                <CardContent className="space-y-6 p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-full bg-[#2d231c] text-white">
                      <Palette className="size-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8b6a4a]">
                        Step 3
                      </p>
                      <h2 className="mt-1 font-heading text-2xl font-semibold tracking-[-0.04em] text-[#221a16] sm:text-3xl">
                        Choose laminate
                      </h2>
                    </div>
                  </div>

                  <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                    {materialCategories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => {
                          setCategoryFilter(category);
                          setDownloadStatus('');
                        }}
                        className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
                          categoryFilter === category
                            ? 'border-[#2d231c] bg-[#2d231c] text-white'
                            : 'border-[#e7d9cb] bg-white text-[#4c4139] hover:border-[#c9b29a]'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {visibleMaterials.map((material) => {
                      const isApplied = currentAssignments[selectedPart?.id] === material.id;

                      return (
                        <button
                          key={material.id}
                          type="button"
                          onClick={() => handleMaterialApply(material.id)}
                          className={`overflow-hidden rounded-[26px] border text-left transition ${
                            isApplied
                              ? 'border-[#2d231c] bg-[#fff7ef] shadow-[0_18px_44px_-26px_rgba(36,27,20,0.22)]'
                              : 'border-[#eadfce] bg-white hover:border-[#d4bea7]'
                          }`}
                        >
                          <div className="relative aspect-[4/3]">
                            <Image
                              src={material.image}
                              alt={material.name}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/52 via-black/10 to-transparent" />
                            {isApplied && (
                              <div className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-full bg-white text-[#241b16] shadow-md">
                                <Check className="size-4" />
                              </div>
                            )}
                          </div>
                          <div className="space-y-1 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8b6a4a]">
                              {material.code}
                            </p>
                            <h3 className="text-lg font-semibold text-[#221a16]">
                              {material.name}
                            </h3>
                            <p className="text-sm text-[#665b52]">{material.category}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6 2xl:order-2 2xl:sticky 2xl:top-28 2xl:self-start">
              <Card className="rounded-[32px] border-white/50 bg-white/70 shadow-[0_28px_90px_-42px_rgba(33,22,16,0.32)]">
                <CardContent className="space-y-5 p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-full bg-[#2d231c] text-white">
                      <Sofa className="size-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8b6a4a]">
                        Checked selection
                      </p>
                      <h2 className="mt-1 font-heading text-2xl font-semibold tracking-[-0.04em] text-[#221a16] sm:text-3xl">
                        What changed
                      </h2>
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-[#eadfce] bg-[#fbf6f0] p-4">
                    <p className="text-sm text-[#66584d]">{activeSpace.name}</p>
                    <p className="mt-2 text-lg font-semibold text-[#241b16]">
                      {selectedPart?.name}: {selectedMaterial?.name}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {changedItems.length > 0 ? (
                      changedItems.map((item) => (
                        <div
                          key={item.partId}
                          className="flex items-start gap-3 rounded-[22px] border border-[#eadfce] bg-[#fbf6f0] px-4 py-3"
                        >
                          <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[#2d231c] text-white">
                            <Check className="size-4" />
                          </span>
                          <div>
                            <p className="font-medium text-[#241b16]">{item.partName}</p>
                            <p className="text-sm text-[#66584d]">
                              {item.materialName} ({item.materialCode})
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-[22px] border border-dashed border-[#d9cabd] bg-[#fbf6f0] px-4 py-5 text-sm text-[#66584d]">
                        No changes yet. Select an area and apply a laminate to check it here.
                      </div>
                    )}
                  </div>

                  <div className="rounded-[24px] border border-[#eadfce] bg-[#fbf6f0] px-4 py-3 text-sm text-[#66584d]">
                    Download a simple text file with the checked changes and full room selection.
                  </div>

                  <Button className="h-14 w-full text-base" onClick={handleDownload}>
                    <Download className="size-4" />
                    Download selection
                  </Button>

                  {downloadStatus && (
                    <div className="rounded-[20px] border border-[#eadfce] bg-[#fbf6f0] px-4 py-3 text-sm text-[#66584d]">
                      {downloadStatus}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
