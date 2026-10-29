'use client';

/**
 * RoomCanvas.tsx
 *
 * Production-ready R3F canvas for the Multi-Room 3D Customiser.
 *
 * Architecture:
 * ┌─ PremiumRoomCanvas (forwardRef)   — Canvas host, imperative API
 * │   ├─ RoomScene                    — Lighting rig + OrbitControls + Suspense
 * │   │   └─ InteractiveGLTFModel     — GLB loader + mesh traversal + PBR binding
 * │   └─ StudioBackdrop              — Floor / wall planes + contact shadows
 *
 * PBR Material Engine:
 * - MeshPhysicalMaterial with clearcoat, sheen, and transmission
 * - Roughness / metalness clamped per finish descriptor (gloss / matte / mirror)
 * - Per-material texture repeat via wrapS/wrapT + repeat.set(s, t)
 * - Emissive highlight on the selected part
 * - Environment map (drei <Environment preset="apartment">) for HDRI reflections
 *
 * Performance:
 * - scene.clone(true) keeps the cached GLTF scene untouched
 * - Disposal of cloned materials on unmount via useEffect cleanup
 * - dpr capped at 1.5 to balance quality vs. GPU load
 * - key={room.id} on the Canvas causes React to cleanly unmount/remount the
 *   entire WebGL context when the room changes, triggering the Suspense fallback
 *   as the new GLB streams in — no stale mesh residue, no memory leaks.
 */

import {
  forwardRef,
  Suspense,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { MutableRefObject } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import type { ThreeEvent } from '@react-three/fiber';
import type { OrbitControls as OrbitControlsInstance } from 'three-stdlib';
import {
  ContactShadows,
  Environment,
  Html,
  OrbitControls,
  useGLTF,
  useTexture,
} from '@react-three/drei';
import {
  Box3,
  Material,
  Mesh,
  MeshPhysicalMaterial,
  RepeatWrapping,
  SRGBColorSpace,
  Texture,
  Vector3,
  WebGLRenderer,
} from 'three';
import type { RoomConfig, StudioMaterialDef } from '../../data/roomTypes';

// ─── Types ─────────────────────────────────────────────────────────────────

export interface RoomCanvasHandle {
  /** Smoothly return the camera to its initial position */
  resetView(): void;
  /** Capture the current frame as a PNG data URL */
  captureImage(): Promise<string | null>;
}

interface RoomCanvasProps {
  room: RoomConfig;
  materials: StudioMaterialDef[];
  assignments: Record<string, string>;
  selectedPartId: string | undefined;
  onSelectPart: (partId: string) => void;
}

// ─── Utilities ─────────────────────────────────────────────────────────────

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function disposeMaterial(material: Material | Material[] | null): void {
  if (!material) return;
  if (Array.isArray(material)) {
    material.forEach((m) => m?.dispose?.());
  } else {
    material.dispose();
  }
}

function getPartId(event: ThreeEvent<PointerEvent>): string | null {
  const partId: unknown = event.object.userData.partId;
  return typeof partId === 'string' ? partId : null;
}

/**
 * Returns true for finishes that carry a texture pattern (wood grain, marble, stone,
 * fluted, sparkle). These are the only materials where we apply a texture *map*;
 * solid colours use `baseColor` only.
 */
function isPatternedFinish(material: StudioMaterialDef): boolean {
  const descriptor =
    `${material.finish} ${material.sheen} ${material.category} ${material.tags.join(' ')}`.toLowerCase();
  return (
    descriptor.includes('wood') ||
    descriptor.includes('grain') ||
    descriptor.includes('marble') ||
    descriptor.includes('stone') ||
    descriptor.includes('fluted') ||
    descriptor.includes('sparkle') ||
    descriptor.includes('oak') ||
    descriptor.includes('walnut')
  );
}

/**
 * Creates a PBR MeshPhysicalMaterial from a StudioMaterialDef.
 *
 * Roughness / metalness / clearcoat values are clamped per finish class:
 *  - Mirror  → very low roughness, high metalness, max env-map intensity
 *  - Glossy  → low roughness, moderate clearcoat
 *  - Matte   → high roughness, minimal clearcoat, soft sheen
 *  - Default → mid-range values
 */
function createPBRMaterial(
  material: StudioMaterialDef,
  texture: Texture | null,
  isSelected: boolean
): MeshPhysicalMaterial {
  const descriptor = `${material.finish} ${material.sheen}`.toLowerCase();
  const isMirror = descriptor.includes('mirror');
  const isGlossy =
    material.category === 'Acrylic Sheet' ||
    descriptor.includes('gloss') ||
    descriptor.includes('metallic') ||
    isMirror;
  const isMatte =
    material.category === 'ASA Laminate' ||
    descriptor.includes('matte') ||
    descriptor.includes('soft touch');

  // ── Roughness ──
  const baseRoughness = isGlossy
    ? isMirror
      ? clamp(material.roughness * 0.2, 0.02, 0.07)
      : clamp(material.roughness * 0.45, 0.04, 0.2)
    : isMatte
      ? clamp(material.roughness, 0.48, 0.92)
      : clamp(material.roughness * 0.82, 0.18, 0.56);

  // ── Metalness ──
  const baseMetalness = isGlossy
    ? isMirror
      ? clamp(material.reflectivity * 0.95, 0.38, 0.92)
      : clamp(material.reflectivity * 0.72, 0.08, 0.68)
    : clamp(material.reflectivity * 0.28, 0.02, 0.24);

  // Patterned finishes use the texture map; solid colours use baseColor
  const useTexMap = isPatternedFinish(material) && texture !== null;

  return new MeshPhysicalMaterial({
    map: useTexMap ? texture : null,
    color: useTexMap ? '#ffffff' : material.baseColor,
    roughness: baseRoughness,
    metalness: baseMetalness,
    clearcoat: isGlossy ? 1.0 : clamp(material.reflectivity + 0.14, 0.18, 0.7),
    clearcoatRoughness: isGlossy
      ? isMirror
        ? clamp(baseRoughness * 0.65, 0.01, 0.04)
        : clamp(baseRoughness * 0.42, 0.02, 0.08)
      : clamp(baseRoughness * 0.9, 0.12, 0.52),
    reflectivity: isGlossy
      ? isMirror
        ? 1.0
        : 0.92
      : clamp(material.reflectivity + 0.14, 0.18, 0.82),
    envMapIntensity: isMirror ? 3.4 : isGlossy ? 2.35 : isMatte ? 0.55 : 1.2,
    sheen: isMatte ? 0.18 : 0.06,
    sheenRoughness: isMatte ? 0.74 : clamp(baseRoughness, 0.14, 0.5),
    specularIntensity: isMirror ? 1.0 : isGlossy ? 0.95 : 0.65,
    emissive: isSelected ? material.accentColor : '#000000',
    emissiveIntensity: isSelected ? 0.06 : 0,
    toneMapped: true,
  });
}

// ─── Scene Backdrop ─────────────────────────────────────────────────────────

function RoomBackdrop() {
  return (
    <>
      <color attach="background" args={['#f7f2ea']} />
      <fog attach="fog" args={['#f7f2ea', 18, 32]} />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.82, 0]} receiveShadow>
        <planeGeometry args={[28, 28]} />
        <meshStandardMaterial color="#e8ddd1" roughness={0.95} metalness={0.02} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 8, -8]} receiveShadow>
        <boxGeometry args={[30, 20, 0.4]} />
        <meshStandardMaterial color="#fcf8f2" roughness={0.96} metalness={0.01} />
      </mesh>

      {/* Left side wall */}
      <mesh position={[-8, 6, -2]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[18, 16, 0.4]} />
        <meshStandardMaterial color="#f3ece4" roughness={0.98} metalness={0.01} />
      </mesh>

      {/* Ambient depth spheres */}
      <mesh position={[7.2, 5.5, 4]}>
        <sphereGeometry args={[2.8, 28, 28]} />
        <meshBasicMaterial color="#ecdfd1" transparent opacity={0.6} />
      </mesh>
      <mesh position={[-5.2, 4.5, -3.5]}>
        <sphereGeometry args={[2.1, 24, 24]} />
        <meshBasicMaterial color="#f7eee3" transparent opacity={0.82} />
      </mesh>

      <ContactShadows position={[0, -0.8, 0]} opacity={0.24} scale={20} blur={2.4} far={9} />
    </>
  );
}

// ─── Interactive GLTF Model ─────────────────────────────────────────────────

interface InteractiveGLTFModelProps {
  room: RoomConfig;
  materials: StudioMaterialDef[];
  assignments: Record<string, string>;
  selectedPartId: string | undefined;
  onSelectPart: (partId: string) => void;
}

interface OverlayPartProps {
  part: RoomConfig['parts'][number];
  material: StudioMaterialDef;
  texture: Texture | undefined;
  selected: boolean;
  onSelectPart: (partId: string) => void;
  onHoverPart: (partId: string | null) => void;
}

function OverlayPart({
  part,
  material,
  texture,
  selected,
  onSelectPart,
  onHoverPart,
}: OverlayPartProps) {
  const surfaceMaterial = useMemo(
    () => createPBRMaterial(material, texture ?? null, selected),
    [material, selected, texture]
  );

  useEffect(() => () => surfaceMaterial.dispose(), [surfaceMaterial]);

  return (
    <mesh
      position={[
        part.position[0] + part.normal[0] * part.depthOffset,
        part.position[1] + part.normal[1] * part.depthOffset,
        part.position[2] + part.normal[2] * part.depthOffset,
      ]}
      userData={{ partId: part.id }}
      castShadow
      receiveShadow
      onPointerOver={(event) => {
        event.stopPropagation();
        onHoverPart(part.id);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        onHoverPart(null);
        document.body.style.cursor = 'auto';
      }}
      onPointerDown={(event) => {
        event.stopPropagation();
        onSelectPart(part.id);
      }}
    >
      <boxGeometry args={part.size} />
      <primitive object={surfaceMaterial} attach="material" />
    </mesh>
  );
}

function InteractiveGLTFModel({
  room,
  materials,
  assignments,
  selectedPartId,
  onSelectPart,
}: InteractiveGLTFModelProps) {
  const { size: viewportSize } = useThree();
  const { scene } = useGLTF(room.modelUrl);
  const [hoveredPartId, setHoveredPartId] = useState<string | null>(null);

  // ── Build a stable set of assignable part IDs for O(1) lookups ─────────
  const assignableIds = useMemo(
    () => new Set(room.parts.map((p) => p.id)),
    [room.parts]
  );

  // ── Build materialId → StudioMaterialDef lookup ─────────────────────
  const materialLookup = useMemo(
    () => Object.fromEntries(materials.map((m) => [m.id, m])),
    [materials]
  );

  // ── Load textures for all materials ────────────────────────────────────
  // useTexture must be called unconditionally (Rules of Hooks).
  // We load the full catalog; Three.js caches by URL so cost is paid once.
  const texturePaths = useMemo(
    () => materials.map((m) => m.texture || m.image),
    [materials]
  );
  const loadedTextures = useTexture(texturePaths);

  // ── Build materialId → cloned texture lookup ──────────────────────────
  // Each texture is cloned so repeat settings are per-material, not shared.
  const textureLookup = useMemo(() => {
    const lookup: Record<string, Texture> = {};
    materials.forEach((m, i) => {
      const tex = (loadedTextures as Texture[])[i].clone();
      tex.wrapS = RepeatWrapping;
      tex.wrapT = RepeatWrapping;
      // Texture repeat ensures the laminate tile looks correct on large wardrobe
      // doors AND small kitchen cabinet fronts without stretching.
      tex.repeat.set(m.repeat[0], m.repeat[1]);
      tex.colorSpace = SRGBColorSpace;
      tex.needsUpdate = true;
      lookup[m.id] = tex;
    });
    return lookup;
  }, [loadedTextures, materials]);

  useEffect(
    () => () => {
      Object.values(textureLookup).forEach((texture) => texture.dispose());
    },
    [textureLookup]
  );

  // ── Clone + patch the GLTF scene ──────────────────────────────────────
  // We clone so the original cached scene stays untouched and can be reused.
  const processedScene = useMemo(() => {
    const cloned = scene.clone(true);

    cloned.traverse((child) => {
      if (!(child instanceof Mesh)) return;
      const mesh = child;

      mesh.castShadow = true;
      mesh.receiveShadow = true;

      // Match mesh name against the room's assignable part IDs
      const isAssignable = assignableIds.has(mesh.name);
      mesh.userData.partId = isAssignable ? mesh.name : null;

      if (!isAssignable) return;

      const partId = mesh.name as string;
      const materialId = assignments[partId];
      const matDef = materialId ? materialLookup[materialId] : undefined;

      if (!matDef) return;

      const texture = isPatternedFinish(matDef) ? textureLookup[matDef.id] ?? null : null;
      const isSelected = partId === selectedPartId;
      const isHovered = partId === hoveredPartId;

      mesh.material = createPBRMaterial(
        matDef,
        texture,
        isSelected || isHovered
      );
    });

    return cloned;
  }, [
    scene,
    assignableIds,
    assignments,
    materialLookup,
    textureLookup,
    selectedPartId,
    hoveredPartId,
  ]);

  // ── Auto-scale to fit viewport ────────────────────────────────────────
  const fitScale = useMemo(() => {
    const bounds = new Box3().setFromObject(processedScene);
    const size = bounds.getSize(new Vector3());
    const widest = Math.max(size.x, size.y, size.z);
    const aspect =
      viewportSize?.width > 0
        ? viewportSize.width / Math.max(1, viewportSize.height)
        : 1;

    if (!widest) return 1;

    // Tighter fit on portrait mobile to avoid 3D content being cropped by UI
    const baseFit = aspect < 0.82 ? 6.0 : aspect < 1 ? 6.4 : 6.8;
    const minScale = aspect < 0.82 ? 0.62 : 0.72;

    return clamp(baseFit / widest, minScale, 1.1);
  }, [processedScene, viewportSize.height, viewportSize.width]);

  // ── Dispose cloned materials on unmount / scene change ────────────────
  useEffect(() => {
    return () => {
      processedScene.traverse((child) => {
        if (!(child instanceof Mesh) || typeof child.userData.partId !== 'string') return;
        disposeMaterial(child.material);
      });
    };
  }, [processedScene]);

  // ── Pointer event helpers ─────────────────────────────────────────────
  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    const partId = getPartId(event);
    if (partId) {
      event.stopPropagation();
      setHoveredPartId(partId);
      document.body.style.cursor = 'pointer';
    }
  };

  const handlePointerOut = (event: ThreeEvent<PointerEvent>) => {
    const partId = getPartId(event);
    if (partId) {
      setHoveredPartId(null);
      document.body.style.cursor = 'auto';
    }
  };

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    const partId = getPartId(event);
    if (!partId) return;
    event.stopPropagation();
    onSelectPart(partId);
  };

  return (
    <group
      position={[0, -0.82, 0]}
      scale={fitScale}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onPointerDown={handlePointerDown}
    >
      <primitive object={processedScene} />
      {room.parts.map((part) => {
        const materialId = assignments[part.id];
        const material = materialId ? materialLookup[materialId] : undefined;
        if (!material) return null;

        return (
          <OverlayPart
            key={part.id}
            part={part}
            material={material}
            texture={textureLookup[material.id]}
            selected={part.id === selectedPartId || part.id === hoveredPartId}
            onSelectPart={onSelectPart}
            onHoverPart={setHoveredPartId}
          />
        );
      })}
    </group>
  );
}

// ─── Room Scene ─────────────────────────────────────────────────────────────

interface RoomSceneProps extends InteractiveGLTFModelProps {
  controlsRef: MutableRefObject<OrbitControlsInstance | null>;
  room: RoomConfig;
}

function RoomScene({
  room,
  materials,
  assignments,
  selectedPartId,
  onSelectPart,
  controlsRef,
}: RoomSceneProps) {
  return (
    <>
      <RoomBackdrop />

      {/* ── Lighting rig ─────────────────────────────────────────────── */}
      <ambientLight intensity={1.5} color="#fffaf4" />
      <directionalLight
        position={[6, 9, 8]}
        intensity={2}
        color="#fff1df"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={40}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
      />
      <spotLight
        position={[-6, 7, 4]}
        intensity={0.9}
        angle={0.35}
        penumbra={0.7}
        color="#f2e5d6"
      />
      <pointLight position={[0, 5, 6]} intensity={0.38} color="#fffdf9" />

      {/* ── HDRI environment map for PBR reflections ──────────────────── */}
      <Environment preset="apartment" />

      {/* ── Orbit controls ────────────────────────────────────────────── */}
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={4.8}
        maxDistance={11}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2.04}
        target={room.cameraTarget}
      />

      {/* ── Model with per-frame Suspense boundary ────────────────────── */}
      <Suspense
        fallback={
          <Html center>
            <div className="rounded-full border border-white/12 bg-[#0f1219]/86 px-5 py-2.5 text-sm text-white/78 backdrop-blur-xl">
              Loading 3D model…
            </div>
          </Html>
        }
      >
        <InteractiveGLTFModel
          room={room}
          materials={materials}
          assignments={assignments}
          selectedPartId={selectedPartId}
          onSelectPart={onSelectPart}
        />
      </Suspense>
    </>
  );
}

// ─── Canvas Host (exported) ─────────────────────────────────────────────────

/**
 * The main R3F canvas component.
 *
 * Accepts a `ref` that exposes two imperative methods:
 * - `resetView()` — restores the OrbitControls to the room's default camera position
 * - `captureImage()` — returns a PNG data URL of the current frame
 *
 * The `key={room.id}` prop on `<Canvas>` is set by the parent `MultiRoomCustomizerApp`
 * so that switching rooms triggers a full unmount → remount cycle. This cleanly
 * disposes the old WebGL context and lets Suspense show the loading fallback while
 * the new GLB streams in.
 */
const RoomCanvas = forwardRef<RoomCanvasHandle, RoomCanvasProps>(function RoomCanvas(
  { room, materials, assignments, selectedPartId, onSelectPart },
  ref
) {
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControlsInstance | null>(null);

  useImperativeHandle(ref, () => ({
    resetView() {
      controlsRef.current?.reset();
    },
    async captureImage() {
      if (!rendererRef.current) return null;
      return (rendererRef.current.domElement as HTMLCanvasElement).toDataURL('image/png');
    },
  }));

  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
      camera={{
        position: room.defaultCameraPosition,
        fov: room.fov,
        near: 0.1,
        far: 60,
      }}
      onCreated={({ gl }) => {
        rendererRef.current = gl;
        gl.outputColorSpace = SRGBColorSpace;
      }}
      onPointerMissed={() => {
        onSelectPart(room.defaultFocusPartId);
      }}
    >
      <RoomScene
        room={room}
        materials={materials}
        assignments={assignments}
        selectedPartId={selectedPartId}
        onSelectPart={onSelectPart}
        controlsRef={controlsRef}
      />
    </Canvas>
  );
});

// ── Preload all three GLB models so switching between rooms is near-instant ──
useGLTF.preload('/assets/studio-models/kitchen-atelier.glb');
useGLTF.preload('/assets/studio-models/wardrobe-suite.glb');
useGLTF.preload('/assets/studio-models/tv-lounge-suite.glb');

export default RoomCanvas;
