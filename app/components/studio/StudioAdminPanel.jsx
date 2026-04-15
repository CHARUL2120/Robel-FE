'use client';

import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Download,
  Eye,
  Layers3,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Undo2
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import {
  applyStudioAdminState,
  studioAdminHighlights,
  studioMaterials,
  studioModelLibrary,
  studioSpaces
} from '../../data/studioData';
import {
  loadJsonStorage,
  saveJsonStorage,
  STUDIO_ADMIN_STATE_KEY
} from './storage';

const defaultAdminState = {
  materials: {},
  spaces: {},
  models: {}
};

export default function StudioAdminPanel() {
  const [adminState, setAdminState] = useState(() =>
    loadJsonStorage(STUDIO_ADMIN_STATE_KEY, defaultAdminState)
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [statusMessage, setStatusMessage] = useState('Local admin controls are ready.');
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const catalogState = applyStudioAdminState(
    studioMaterials,
    studioSpaces,
    studioModelLibrary,
    adminState
  );

  const filteredMaterials = useMemo(() => {
    const query = deferredSearchTerm.trim().toLowerCase();

    if (!query) {
      return catalogState.materials;
    }

    return catalogState.materials.filter((material) =>
      [material.name, material.code, material.category, material.collection]
        .join(' ')
        .toLowerCase()
        .includes(query)
    );
  }, [catalogState.materials, deferredSearchTerm]);

  const filteredModels = useMemo(() => {
    const query = deferredSearchTerm.trim().toLowerCase();

    if (!query) {
      return catalogState.models;
    }

    return catalogState.models.filter((model) =>
      [model.name, model.shortLabel, model.category]
        .join(' ')
        .toLowerCase()
        .includes(query)
    );
  }, [catalogState.models, deferredSearchTerm]);

  useEffect(() => {
    saveJsonStorage(STUDIO_ADMIN_STATE_KEY, adminState);
  }, [adminState]);

  const updateMaterial = (materialId, patch) => {
    setAdminState((current) => ({
      ...current,
      materials: {
        ...current.materials,
        [materialId]: {
          ...current.materials[materialId],
          ...patch
        }
      }
    }));
    setStatusMessage('Material override saved for the studio experience.');
  };

  const updateModel = (modelId, patch) => {
    setAdminState((current) => ({
      ...current,
      models: {
        ...current.models,
        [modelId]: {
          ...current.models[modelId],
          ...patch
        }
      }
    }));
    setStatusMessage('Model override saved for the studio experience.');
  };

  const updateSpace = (spaceId, patch) => {
    setAdminState((current) => ({
      ...current,
      spaces: {
        ...current.spaces,
        [spaceId]: {
          ...current.spaces[spaceId],
          ...patch
        }
      }
    }));
    setStatusMessage('Space override saved for the studio experience.');
  };

  const resetAdminState = () => {
    setAdminState(defaultAdminState);
    setStatusMessage('Studio admin state reset to defaults.');
  };

  const exportState = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      adminState,
      materials: catalogState.materials,
      models: catalogState.models
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'robel-studio-admin-export.json';
    anchor.click();
    URL.revokeObjectURL(url);
    setStatusMessage('Studio admin export downloaded.');
  };

  return (
    <div className="pb-12 pt-28 sm:pb-16 sm:pt-32">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[38px] border border-white/45 bg-[linear-gradient(135deg,rgba(24,18,14,0.98),rgba(46,34,28,0.94)_42%,rgba(91,63,39,0.88)_100%)] px-6 py-8 text-white shadow-[0_36px_110px_-46px_rgba(31,21,15,0.7)] sm:px-8 sm:py-10 lg:px-12 lg:py-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,221,188,0.18),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_28%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="space-y-6">
              <span className="inline-flex rounded-full border border-white/16 bg-white/8 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/78 backdrop-blur-xl">
                Studio admin console
              </span>
              <div className="space-y-4">
                <h1 className="max-w-3xl font-heading text-4xl font-semibold tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl">
                  Control which materials and 3D model presets appear in the premium visualization experience.
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-white/76 sm:text-base">
                  This client-side control surface lets the team promote hero materials,
                  disable unfinished scenes, and export the current studio schema without
                  changing the viewer contract.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-12 px-6">
                  <Link href="/studio">
                    Open customer studio
                    <Eye className="size-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="h-12 border-white/18 bg-white/10 px-6 text-white hover:bg-white/16"
                  onClick={exportState}
                >
                  Export current state
                  <Download className="size-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {studioAdminHighlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[26px] border border-white/12 bg-white/10 p-5 backdrop-blur-xl"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
                    Operations layer
                  </p>
                  <h2 className="mt-3 font-heading text-2xl font-semibold tracking-[-0.04em] text-white">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-white/72">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto mt-8 space-y-6 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-4">
          <MetricCard
            icon={Sparkles}
            label="Studio materials"
            value={`${catalogState.materials.filter((item) => item.active !== false).length}/${catalogState.materials.length}`}
            detail="Active in viewer"
          />
          <MetricCard
            icon={Layers3}
            label="Studio models"
            value={`${catalogState.models.filter((item) => item.active !== false).length}/${catalogState.models.length}`}
            detail="Visible to customers"
          />
          <MetricCard
            icon={ShieldCheck}
            label="Featured finishes"
            value={`${catalogState.materials.filter((item) => item.featured).length}`}
            detail="Highlighted in catalog"
          />
          <MetricCard
            icon={Settings2}
            label="Local overrides"
            value={`${Object.keys(adminState.materials).length + Object.keys(adminState.models).length + Object.keys(adminState.spaces).length}`}
            detail="Stored on this device"
          />
        </div>

        <Card className="rounded-[34px] border-white/50 bg-white/65 shadow-[0_28px_90px_-42px_rgba(33,22,16,0.32)]">
          <CardContent className="p-6 sm:p-7">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8b6a4a]">
                  Search and status
                </p>
                <h2 className="mt-2 font-heading text-3xl font-semibold tracking-[-0.05em] text-[#221a16]">
                  Manage the studio catalog surface
                </h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="relative block">
                  <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#8b6a4a]" />
                  <input
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search materials or models"
                    className="h-11 w-full min-w-[280px] rounded-full border border-[#e4d9ce] bg-white pl-11 pr-4 text-sm text-[#211914] outline-none placeholder:text-[#988a7b]"
                  />
                </label>
                <Button variant="outline" onClick={resetAdminState}>
                  <Undo2 className="size-4" />
                  Reset
                </Button>
              </div>
            </div>

            <div className="mt-5 rounded-[26px] border border-[#eadfce] bg-[#fbf7f2] px-4 py-3 text-sm text-[#5f544a]">
              {statusMessage}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
          <Card className="rounded-[34px] border-white/50 bg-white/65 shadow-[0_28px_90px_-42px_rgba(33,22,16,0.32)]">
            <CardContent className="p-6 sm:p-7">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8b6a4a]">
                  Material governance
                </p>
                <h2 className="mt-2 font-heading text-3xl font-semibold tracking-[-0.05em] text-[#221a16]">
                  Control what customers can apply inside the 3D studio
                </h2>
              </div>

              <div className="mt-6 grid gap-4">
                {filteredMaterials.map((material) => (
                  <div
                    key={material.id}
                    className="rounded-[28px] border border-white/70 bg-white p-5 shadow-[0_20px_55px_-38px_rgba(31,22,16,0.22)]"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div className="space-y-2">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8b6a4a]">
                          {material.code} / {material.category}
                        </p>
                        <h3 className="font-heading text-2xl font-semibold tracking-[-0.04em] text-[#221a16]">
                          {material.name}
                        </h3>
                        <p className="text-sm leading-7 text-[#62574e]">{material.note}</p>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
                        <TogglePill
                          label="Active"
                          value={material.active !== false}
                          onToggle={() =>
                            updateMaterial(material.id, { active: material.active === false })
                          }
                        />
                        <TogglePill
                          label="Featured"
                          value={material.featured}
                          onToggle={() =>
                            updateMaterial(material.id, { featured: !material.featured })
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="rounded-[34px] border-white/50 bg-white/65 shadow-[0_28px_90px_-42px_rgba(33,22,16,0.32)]">
              <CardContent className="p-6 sm:p-7">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8b6a4a]">
                    Model visibility
                  </p>
                  <h2 className="mt-2 font-heading text-3xl font-semibold tracking-[-0.05em] text-[#221a16]">
                    Set which 3D room presets are live
                  </h2>
                </div>

                <div className="mt-6 grid gap-4">
                  {filteredModels.map((model) => (
                    <div
                      key={model.id}
                      className="rounded-[28px] border border-white/70 bg-white p-5 shadow-[0_20px_55px_-38px_rgba(31,22,16,0.22)]"
                    >
                      <div className="space-y-3">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8b6a4a]">
                            {model.category}
                          </p>
                          <h3 className="mt-2 font-heading text-2xl font-semibold tracking-[-0.04em] text-[#221a16]">
                            {model.name}
                          </h3>
                          <p className="mt-1 text-sm text-[#62574e]">
                            {model.parts} editable parts / {model.engine} / {model.complexity} complexity
                          </p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <TogglePill
                            label="Live"
                            value={model.active !== false}
                            onToggle={() =>
                              updateModel(model.id, { active: model.active === false })
                            }
                          />
                          <TogglePill
                            label="Hero"
                            value={model.hero}
                            onToggle={() => updateModel(model.id, { hero: !model.hero })}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[34px] border-white/50 bg-[#231b17] text-white shadow-[0_28px_90px_-42px_rgba(33,22,16,0.65)]">
              <CardContent className="space-y-5 p-6">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/48">
                    Scene metadata
                  </p>
                  <h2 className="mt-2 font-heading text-3xl font-semibold tracking-[-0.05em] text-white">
                    Luxury positioning and availability
                  </h2>
                </div>

                <div className="grid gap-4">
                  {catalogState.spaces.map((space) => (
                    <div key={space.id} className="rounded-[26px] border border-white/10 bg-white/6 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45">
                            {space.shortLabel}
                          </p>
                          <h3 className="mt-2 font-heading text-2xl font-semibold tracking-[-0.04em] text-white">
                            {space.name}
                          </h3>
                          <p className="mt-2 text-sm leading-7 text-white/70">{space.mood}</p>
                        </div>
                        <div className="grid gap-3">
                          <TogglePill
                            label="Available"
                            dark
                            value={space.active !== false}
                            onToggle={() =>
                              updateSpace(space.id, { active: space.active === false })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, detail }) {
  return (
    <Card className="rounded-[30px] border-white/50 bg-white/70 shadow-[0_24px_70px_-40px_rgba(33,22,16,0.28)]">
      <CardContent className="p-5">
        <div className="flex size-11 items-center justify-center rounded-full bg-[#2d231c] text-white">
          <Icon className="size-4" />
        </div>
        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8b6a4a]">
          {label}
        </p>
        <h3 className="mt-2 font-heading text-3xl font-semibold tracking-[-0.04em] text-[#221a16]">
          {value}
        </h3>
        <p className="mt-1 text-sm text-[#5b5148]">{detail}</p>
      </CardContent>
    </Card>
  );
}

function TogglePill({ label, value, onToggle, dark = false }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`inline-flex items-center justify-between gap-3 rounded-full border px-4 py-2 text-sm transition ${
        dark
          ? value
            ? 'border-[#d7ab7d] bg-[#d7ab7d] text-[#241912]'
            : 'border-white/12 bg-white/8 text-white/74'
          : value
            ? 'border-[#2d231c] bg-[#2d231c] text-white'
            : 'border-[#e4d9ce] bg-[#f8f2eb] text-[#5f544a]'
      }`}
    >
      <span>{label}</span>
      <span className="rounded-full bg-black/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]">
        {value ? 'On' : 'Off'}
      </span>
    </button>
  );
}
