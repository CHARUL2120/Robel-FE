'use client';

import { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Html, OrbitControls, useTexture } from '@react-three/drei';
import {
  Color,
  DoubleSide,
  MathUtils,
  RepeatWrapping,
  SRGBColorSpace,
  Vector3
} from 'three';

function RoomEnvelope({ spaceId }) {
  if (spaceId === 'kitchen-atelier') {
    return (
      <group>
        <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[18, 18]} />
          <meshStandardMaterial color="#d8c7b6" roughness={0.86} metalness={0.04} />
        </mesh>
        <mesh position={[0, 3.2, -2.2]} receiveShadow>
          <boxGeometry args={[18, 6.6, 0.12]} />
          <meshStandardMaterial color="#f2ece3" roughness={0.92} />
        </mesh>
        <mesh position={[-5.4, 3.2, 2.6]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
          <boxGeometry args={[10, 6.6, 0.12]} />
          <meshStandardMaterial color="#e8dfd5" roughness={0.94} />
        </mesh>
      </group>
    );
  }

  if (spaceId === 'wardrobe-suite') {
    return (
      <group>
        <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[16, 16]} />
          <meshStandardMaterial color="#dfd1c3" roughness={0.86} />
        </mesh>
        <mesh position={[0, 3.4, -2.1]} receiveShadow>
          <boxGeometry args={[16, 7, 0.12]} />
          <meshStandardMaterial color="#f3ede5" roughness={0.92} />
        </mesh>
      </group>
    );
  }

  if (spaceId === 'tv-lounge-suite') {
    return (
      <group>
        <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[16, 16]} />
          <meshStandardMaterial color="#d5c4b6" roughness={0.82} />
        </mesh>
        <mesh position={[0, 3.2, -2.3]} receiveShadow>
          <boxGeometry args={[16, 6.6, 0.12]} />
          <meshStandardMaterial color="#eee7de" roughness={0.94} />
        </mesh>
      </group>
    );
  }

  return (
    <group>
      <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[18, 18]} />
        <meshStandardMaterial color="#d9cabd" roughness={0.9} />
      </mesh>
      <mesh position={[0, 3.1, -2.25]} receiveShadow>
        <boxGeometry args={[18, 6.4, 0.12]} />
        <meshStandardMaterial color="#f2ebe4" roughness={0.94} />
      </mesh>
    </group>
  );
}

function CarcassBlocks({ carcass }) {
  return (
    <group>
      {carcass.map((block) => (
        <mesh
          key={`${block.position.join('-')}-${block.size.join('-')}`}
          position={block.position}
          castShadow
          receiveShadow
        >
          <boxGeometry args={block.size} />
          <meshStandardMaterial color={block.color} roughness={0.86} metalness={0.04} />
        </mesh>
      ))}
    </group>
  );
}

function PartHandles({ type, size }) {
  if (type !== 'door' && type !== 'drawer' && type !== 'wall-cabinet') {
    return null;
  }

  if (type === 'drawer') {
    return (
      <mesh position={[0, 0, size[2] / 2 + 0.035]} castShadow>
        <boxGeometry args={[size[0] * 0.44, 0.05, 0.04]} />
        <meshStandardMaterial color="#8f7864" metalness={0.56} roughness={0.22} />
      </mesh>
    );
  }

  return (
    <mesh position={[size[0] / 2 - 0.1, 0, size[2] / 2 + 0.035]} castShadow>
      <boxGeometry args={[0.05, size[1] * 0.45, 0.04]} />
      <meshStandardMaterial color="#8f7864" metalness={0.56} roughness={0.22} />
    </mesh>
  );
}

function PartMesh({
  part,
  material,
  selected,
  onSelect
}) {
  const meshRef = useRef(null);
  const [surfaceTexture, previewTexture] = useTexture([
    material.texture,
    material.image
  ]);
  const [hovered, setHovered] = useState(false);
  const basePosition = useMemo(() => new Vector3(...part.position), [part.position]);
  const normal = useMemo(() => new Vector3(...part.normal), [part.normal]);
  const configuredTexture = useMemo(() => {
    const nextTexture = surfaceTexture.clone();
    nextTexture.wrapS = RepeatWrapping;
    nextTexture.wrapT = RepeatWrapping;
    nextTexture.repeat.set(material.repeat[0], material.repeat[1]);
    nextTexture.colorSpace = SRGBColorSpace;
    nextTexture.needsUpdate = true;
    return nextTexture;
  }, [material.repeat, surfaceTexture]);
  const configuredPreviewTexture = useMemo(() => {
    const nextTexture = previewTexture.clone();
    nextTexture.colorSpace = SRGBColorSpace;
    nextTexture.needsUpdate = true;
    return nextTexture;
  }, [previewTexture]);
  const bump = (selected ? part.depthOffset || 0.09 : 0) + (hovered ? 0.05 : 0);

  useFrame((_, delta) => {
    if (!meshRef.current) {
      return;
    }

    const nextPosition = basePosition.clone().add(normal.clone().multiplyScalar(bump));
    meshRef.current.position.lerp(nextPosition, 1 - Math.exp(-8 * delta));

    const nextScale = selected ? 1.03 : hovered ? 1.015 : 1;
    const currentScale = meshRef.current.scale.x;
    const smoothedScale = MathUtils.lerp(currentScale, nextScale, 1 - Math.exp(-10 * delta));
    meshRef.current.scale.setScalar(smoothedScale);
  });

  return (
    <group
      ref={meshRef}
      position={part.position}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(part.id);
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={part.size} />
        <meshPhysicalMaterial
          key={`${part.id}-${material.id}`}
          map={configuredTexture}
          color={material.baseColor}
          roughness={material.roughness}
          metalness={Math.min(0.5, material.reflectivity * 0.55)}
          clearcoat={Math.max(0.12, material.reflectivity)}
          clearcoatRoughness={Math.max(0.06, material.roughness * 0.55)}
          reflectivity={Math.max(0.2, material.reflectivity)}
          emissive={material.accentColor}
          emissiveIntensity={selected ? 0.03 : 0.015}
          side={DoubleSide}
        />
      </mesh>
      <mesh position={[0, 0, part.size[2] / 2 + 0.0025]} castShadow>
        <planeGeometry args={[part.size[0] * 0.98, part.size[1] * 0.98]} />
        <meshStandardMaterial
          map={configuredPreviewTexture}
          color="#ffffff"
          transparent
          opacity={0.98}
          roughness={Math.max(0.16, material.roughness * 0.92)}
          metalness={Math.min(0.24, material.reflectivity * 0.3)}
          polygonOffset
          polygonOffsetFactor={-2}
        />
      </mesh>
      <PartHandles type={part.type} size={part.size} />
      {(selected || hovered) && (
        <mesh>
          <boxGeometry
            args={[
              part.size[0] + 0.05,
              part.size[1] + 0.05,
              part.size[2] + 0.05
            ]}
          />
          <meshBasicMaterial
            color={selected ? '#d3a776' : '#eddcc8'}
            wireframe
            transparent
            opacity={selected ? 0.6 : 0.35}
          />
        </mesh>
      )}
      {selected && (
        <Html position={[0, part.size[1] / 2 + 0.28, 0]} center distanceFactor={7}>
          <div className="rounded-full border border-white/60 bg-[#241b16]/82 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_12px_32px_rgba(14,10,8,0.35)] backdrop-blur-xl">
            {part.name}
          </div>
        </Html>
      )}
    </group>
  );
}

function LuxuryStudioScene({
  space,
  materialLookup,
  assignments,
  selectedPartId,
  onSelectPart,
  autoRotate,
  lightIntensity,
  warmth,
  lightingPreset
}) {
  const ambientColor = new Color(warmth >= 0 ? '#fff1de' : '#dfeeff');
  const directionalColor = new Color(warmth >= 0 ? '#ffe6c7' : '#edf4ff');
  const rimColor = new Color(warmth >= 0 ? '#ffd5b3' : '#d4ecff');

  return (
    <>
      <OrbitControls
        enablePan={false}
        minDistance={6}
        maxDistance={13}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2.1}
        autoRotate={autoRotate}
        autoRotateSpeed={0.55}
        target={space.camera.target}
      />
      <ambientLight
        intensity={lightingPreset.ambient * lightIntensity}
        color={ambientColor}
      />
      <directionalLight
        position={[6, 8, 7]}
        intensity={lightingPreset.directional * lightIntensity}
        color={directionalColor}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <spotLight
        position={[-5, 7, 4]}
        angle={0.38}
        penumbra={0.7}
        intensity={lightingPreset.rim * lightIntensity}
        color={rimColor}
        castShadow
      />
      <pointLight position={[0, 2.8, 5.2]} intensity={0.3 * lightIntensity} color="#ffffff" />

      <RoomEnvelope spaceId={space.id} />
      <CarcassBlocks carcass={space.carcass} />

      {space.parts.map((part) => (
        <PartMesh
          key={`${part.id}-${assignments[part.id]}`}
          part={part}
          material={materialLookup[assignments[part.id]]}
          selected={selectedPartId === part.id}
          onSelect={onSelectPart}
        />
      ))}

      <ContactShadows
        position={[0, -0.01, 0]}
        opacity={0.3}
        scale={14}
        blur={2.8}
        far={7}
      />
    </>
  );
}

export default function LuxuryStudioCanvas({
  space,
  materials,
  assignments,
  selectedPartId,
  onSelectPart,
  autoRotate,
  lightIntensity,
  warmth,
  lightingPreset,
  onClearSelection
}) {
  const materialLookup = Object.fromEntries(
    materials.map((material) => [material.id, material])
  );

  return (
    <Canvas
      shadows
      gl={{ antialias: true, alpha: true }}
      camera={{ position: space.camera.position, fov: 36 }}
      onPointerMissed={onClearSelection}
      dpr={[1, 1.8]}
    >
      <Suspense fallback={null}>
        <LuxuryStudioScene
          space={space}
          materialLookup={materialLookup}
          assignments={assignments}
          selectedPartId={selectedPartId}
          onSelectPart={onSelectPart}
          autoRotate={autoRotate}
          lightIntensity={lightIntensity}
          warmth={warmth}
          lightingPreset={lightingPreset}
        />
      </Suspense>
    </Canvas>
  );
}
