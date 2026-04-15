'use client';

import {
  forwardRef,
  Suspense,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef
} from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { ContactShadows, Html, OrbitControls, useGLTF, useTexture } from '@react-three/drei';
import {
  Box3,
  MeshPhysicalMaterial,
  RepeatWrapping,
  SRGBColorSpace,
  Vector3
} from 'three';

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function disposeMaterial(material) {
  if (Array.isArray(material)) {
    material.forEach((entry) => entry?.dispose?.());
    return;
  }

  material?.dispose?.();
}

function usesPatternTexture(material) {
  const descriptor = `${material.finish} ${material.sheen} ${material.collection} ${material.tags.join(' ')}`.toLowerCase();

  return (
    descriptor.includes('wood') ||
    descriptor.includes('grain') ||
    descriptor.includes('marble') ||
    descriptor.includes('stone') ||
    descriptor.includes('fluted') ||
    descriptor.includes('sparkle')
  );
}

function createSurfaceMaterial(material, texture, selected) {
  const descriptor = `${material.finish} ${material.sheen}`.toLowerCase();
  const mirrorSurface = descriptor.includes('mirror');
  const glossySurface =
    material.category === 'Acrylic Sheet' ||
    descriptor.includes('gloss') ||
    descriptor.includes('mirror') ||
    descriptor.includes('metallic');
  const matteSurface =
    material.category === 'ASA Laminate' ||
    descriptor.includes('matte') ||
    descriptor.includes('soft touch');
  const texturedSurface = usesPatternTexture(material) ? texture : null;
  const baseRoughness = glossySurface
    ? mirrorSurface
      ? clamp(material.roughness * 0.2, 0.02, 0.07)
      : clamp(material.roughness * 0.45, 0.04, 0.2)
    : matteSurface
      ? clamp(material.roughness, 0.48, 0.92)
      : clamp(material.roughness * 0.82, 0.18, 0.56);
  const baseMetalness = glossySurface
    ? mirrorSurface
      ? clamp(material.reflectivity * 0.95, 0.38, 0.92)
      : clamp(material.reflectivity * 0.72, 0.08, 0.68)
    : clamp(material.reflectivity * 0.28, 0.02, 0.24);

  return new MeshPhysicalMaterial({
    map: texturedSurface,
    color: texturedSurface ? '#ffffff' : material.baseColor,
    roughness: baseRoughness,
    metalness: baseMetalness,
    clearcoat: glossySurface ? 1 : clamp(material.reflectivity + 0.14, 0.18, 0.7),
    clearcoatRoughness: glossySurface
      ? mirrorSurface
        ? clamp(baseRoughness * 0.65, 0.01, 0.04)
        : clamp(baseRoughness * 0.42, 0.02, 0.08)
      : clamp(baseRoughness * 0.9, 0.12, 0.52),
    reflectivity: glossySurface ? (mirrorSurface ? 1 : 0.92) : clamp(material.reflectivity + 0.14, 0.18, 0.82),
    envMapIntensity: mirrorSurface ? 3.4 : glossySurface ? 2.35 : matteSurface ? 0.55 : 1.2,
    sheen: matteSurface ? 0.18 : 0.06,
    sheenRoughness: matteSurface ? 0.74 : clamp(baseRoughness, 0.14, 0.5),
    transmission: mirrorSurface ? 0 : glossySurface ? 0.02 : 0,
    thickness: mirrorSurface ? 0 : glossySurface ? 0.18 : 0,
    specularIntensity: mirrorSurface ? 1 : glossySurface ? 0.95 : 0.65,
    emissive: selected ? material.accentColor : '#000000',
    emissiveIntensity: selected ? 0.06 : 0,
    toneMapped: true
  });
}

function StudioBackdrop() {
  return (
    <>
      <color attach="background" args={['#f7f2ea']} />
      <fog attach="fog" args={['#f7f2ea', 18, 32]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.82, 0]} receiveShadow>
        <planeGeometry args={[28, 28]} />
        <meshStandardMaterial color="#e8ddd1" roughness={0.95} metalness={0.02} />
      </mesh>
      <mesh position={[0, 8, -8]} receiveShadow>
        <boxGeometry args={[30, 20, 0.4]} />
        <meshStandardMaterial color="#fcf8f2" roughness={0.96} metalness={0.01} />
      </mesh>
      <mesh position={[-8, 6, -2]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[18, 16, 0.4]} />
        <meshStandardMaterial color="#f3ece4" roughness={0.98} metalness={0.01} />
      </mesh>
      <mesh position={[7.2, 5.5, 4]}>
        <sphereGeometry args={[2.8, 28, 28]} />
        <meshBasicMaterial color="#ecdfd1" transparent opacity={0.6} />
      </mesh>
      <mesh position={[-5.2, 4.5, -3.5]}>
        <sphereGeometry args={[2.1, 24, 24]} />
        <meshBasicMaterial color="#f7eee3" transparent opacity={0.82} />
      </mesh>
      <ContactShadows
        position={[0, -0.8, 0]}
        opacity={0.24}
        scale={20}
        blur={2.4}
        far={9}
      />
    </>
  );
}

function InteractiveModel({
  space,
  materials,
  assignments,
  selectedPartId,
  onSelectPart
}) {
  const { size: viewportSize } = useThree();
  const { scene } = useGLTF(space.modelPath);
  const texturePaths = useMemo(
    () => materials.map((material) => material.texture || material.image),
    [materials]
  );
  const loadedTextures = useTexture(texturePaths);
  const textureLookup = useMemo(
    () =>
      Object.fromEntries(
        materials.map((material, index) => {
          const nextTexture = loadedTextures[index].clone();
          nextTexture.wrapS = RepeatWrapping;
          nextTexture.wrapT = RepeatWrapping;
          nextTexture.repeat.set(material.repeat[0], material.repeat[1]);
          nextTexture.colorSpace = SRGBColorSpace;
          nextTexture.needsUpdate = true;
          return [material.id, nextTexture];
        })
      ),
    [loadedTextures, materials]
  );
  const materialLookup = useMemo(
    () => Object.fromEntries(materials.map((material) => [material.id, material])),
    [materials]
  );
  const assignableIds = useMemo(() => new Set(space.parts.map((part) => part.id)), [space.parts]);
  const processedScene = useMemo(() => {
    const nextScene = scene.clone(true);

    nextScene.traverse((child) => {
      if (!child.isMesh) {
        return;
      }

      child.castShadow = true;
      child.receiveShadow = true;
      child.userData.surfaceId = assignableIds.has(child.name) ? child.name : null;

      if (!child.userData.surfaceId) {
        return;
      }

      const surfaceId = child.userData.surfaceId;
      const assignedMaterial = materialLookup[assignments[surfaceId]];

      if (!assignedMaterial) {
        return;
      }

      child.material = createSurfaceMaterial(
        assignedMaterial,
        textureLookup[assignedMaterial.id],
        selectedPartId === surfaceId
      );
    });

    return nextScene;
  }, [assignableIds, assignments, materialLookup, scene, selectedPartId, textureLookup]);
  const fitScale = useMemo(() => {
    const bounds = new Box3().setFromObject(processedScene);
    const size = bounds.getSize(new Vector3());
    const widest = Math.max(size.x, size.y, size.z);
    const viewportAspect =
      viewportSize?.width > 0 ? viewportSize.width / Math.max(1, viewportSize.height) : 1;

    if (!widest) {
      return 1;
    }

    // Portrait mobile viewports need more breathing room so the model isn't visually clipped
    // by UI overlays (top bar + bottom actions).
    const baseFit = viewportAspect < 0.82 ? 6.0 : viewportAspect < 1 ? 6.4 : 6.8;
    const minScale = viewportAspect < 0.82 ? 0.62 : 0.72;

    return clamp(baseFit / widest, minScale, 1.1);
  }, [processedScene, viewportSize.height, viewportSize.width]);

  useEffect(() => {
    return () => {
      processedScene.traverse((child) => {
        if (!child.isMesh || !child.userData.surfaceId) {
          return;
        }

        disposeMaterial(child.material);
      });
    };
  }, [processedScene]);

  return (
    <group
      position={[0, -0.82, 0]}
      scale={fitScale}
      onPointerDown={(event) => {
        const surfaceId = event.object.userData.surfaceId;

        if (!surfaceId) {
          return;
        }

        event.stopPropagation();
        onSelectPart(surfaceId);
      }}
    >
      <primitive object={processedScene} />
    </group>
  );
}

function StudioScene({
  space,
  materials,
  assignments,
  selectedPartId,
  onSelectPart
}) {
  return (
    <>
      <StudioBackdrop />
      <OrbitControls
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={4.8}
        maxDistance={11}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2.04}
        target={space.camera.target}
      />
      <ambientLight intensity={1.5} color="#fffaf4" />
      <directionalLight
        position={[6, 9, 8]}
        intensity={2}
        color="#fff1df"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <spotLight
        position={[-6, 7, 4]}
        intensity={0.9}
        angle={0.35}
        penumbra={0.7}
        color="#f2e5d6"
      />
      <pointLight position={[0, 5, 6]} intensity={0.38} color="#fffdf9" />

      <Suspense
        fallback={
          <Html center>
            <div className="rounded-full border border-white/12 bg-[#0f1219]/86 px-4 py-2 text-sm text-white/78 backdrop-blur-xl">
              Loading 3D model...
            </div>
          </Html>
        }
      >
        <InteractiveModel
          space={space}
          materials={materials}
          assignments={assignments}
          selectedPartId={selectedPartId}
          onSelectPart={onSelectPart}
        />
      </Suspense>
    </>
  );
}

const PremiumStudioCanvas = forwardRef(function PremiumStudioCanvas(
  { space, materials, assignments, selectedPartId, onSelectPart },
  ref
) {
  const rendererRef = useRef(null);

  useImperativeHandle(
    ref,
    () => ({
      async captureImage() {
        if (!rendererRef.current) {
          return null;
        }

        return rendererRef.current.domElement.toDataURL('image/png');
      }
    }),
    []
  );

  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
      camera={{ position: space.camera.position, fov: 36 }}
      onCreated={({ gl }) => {
        rendererRef.current = gl;
        gl.outputColorSpace = SRGBColorSpace;
      }}
      onPointerMissed={() => onSelectPart(space.defaultFocusPartId)}
    >
      <StudioScene
        space={space}
        materials={materials}
        assignments={assignments}
        selectedPartId={selectedPartId}
        onSelectPart={onSelectPart}
      />
    </Canvas>
  );
});

useGLTF.preload('/assets/studio-models/kitchen-atelier.glb');
useGLTF.preload('/assets/studio-models/wardrobe-suite.glb');
useGLTF.preload('/assets/studio-models/tv-lounge-suite.glb');

export default PremiumStudioCanvas;
