import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  BoxGeometry,
  CylinderGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
  Scene,
  SphereGeometry
} from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const outputDir = path.join(projectRoot, 'public', 'assets', 'studio-models');

class NodeFileReader {
  constructor() {
    this.onloadend = null;
    this.result = null;
  }

  async readAsArrayBuffer(blob) {
    this.result = await blob.arrayBuffer();

    if (typeof this.onloadend === 'function') {
      this.onloadend();
    }
  }
}

if (typeof globalThis.FileReader === 'undefined') {
  globalThis.FileReader = NodeFileReader;
}

function createMaterial(color, roughness = 0.82, metalness = 0.06) {
  return new MeshStandardMaterial({
    color,
    roughness,
    metalness
  });
}

function createBox(name, size, position, material) {
  const mesh = new Mesh(new BoxGeometry(...size), material);
  mesh.name = name;
  mesh.position.set(...position);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function createRoundedBox(name, size, position, material, radius = 0.04, segments = 4) {
  const mesh = new Mesh(new RoundedBoxGeometry(...size, segments, radius), material);
  mesh.name = name;
  mesh.position.set(...position);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function createCylinder(name, radius, height, position, material, rotation = [0, 0, Math.PI / 2]) {
  const mesh = new Mesh(new CylinderGeometry(radius, radius, height, 18), material);
  mesh.name = name;
  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function addFrontReveal(root, prefix, width, height, x, y, z, material) {
  root.add(createBox(`${prefix}-top`, [width, 0.028, 0.018], [x, y + height / 2 - 0.03, z], material));
  root.add(createBox(`${prefix}-bottom`, [width, 0.028, 0.018], [x, y - height / 2 + 0.03, z], material));
  root.add(createBox(`${prefix}-left`, [0.028, height, 0.018], [x - width / 2 + 0.03, y, z], material));
  root.add(createBox(`${prefix}-right`, [0.028, height, 0.018], [x + width / 2 - 0.03, y, z], material));
}

function addFlutedRun(root, prefix, count, ribWidth, height, depth, start, gap, material) {
  for (let index = 0; index < count; index += 1) {
    root.add(
      createRoundedBox(
        `${prefix}-${index}`,
        [ribWidth, height, depth],
        [start[0] + index * gap, start[1], start[2]],
        material,
        Math.min(ribWidth * 0.2, 0.02),
        3
      )
    );
  }
}

function addKitchenModel(scene) {
  const root = new Group();
  root.name = 'kitchen-atelier';

  const shell = createMaterial('#ddd4ca', 0.9, 0.04);
  const shellDark = createMaterial('#cfc4b8', 0.88, 0.05);
  const stone = createMaterial('#ece3d9', 0.44, 0.12);
  const stoneDark = createMaterial('#d4c4b6', 0.52, 0.16);
  const metal = createMaterial('#8f7864', 0.28, 0.42);
  const glass = createMaterial('#a6978d', 0.12, 0.22);
  const warmLight = createMaterial('#f6d8b8', 0.32, 0.01);

  root.add(createBox('base-carcass', [4.28, 1.96, 1.28], [-0.82, 0.99, 0.74], shell));
  root.add(createBox('base-shadow-line', [4.34, 0.09, 1.31], [-0.82, 0.08, 0.73], shellDark));
  root.add(createBox('base-plinth', [4.18, 0.14, 1.18], [-0.82, 0.14, 0.74], shellDark));
  root.add(createBox('wall-carcass', [4.16, 1.46, 0.98], [-0.82, 3.07, -0.93], shell));
  root.add(createBox('wall-top-cap', [4.2, 0.08, 1.01], [-0.82, 3.78, -0.93], shellDark));
  root.add(createBox('pantry-carcass', [1.38, 4.44, 1.1], [3.15, 2.28, -0.96], shell));
  root.add(createBox('pantry-shadow-line', [1.42, 0.11, 1.12], [3.15, 0.08, -0.96], shellDark));
  root.add(createBox('island-carcass', [3.66, 1.72, 1.62], [0.35, 0.95, 2.83], shellDark));
  root.add(createBox('island-side-left', [0.08, 1.58, 1.62], [-1.44, 0.95, 2.83], stoneDark));
  root.add(createBox('island-side-right', [0.08, 1.58, 1.62], [2.14, 0.95, 2.83], stoneDark));
  root.add(createBox('countertop-main', [4.32, 0.1, 1.38], [-0.82, 1.98, 0.74], stone));
  root.add(createBox('countertop-main-lip', [4.34, 0.04, 1.42], [-0.82, 2.03, 0.74], stoneDark));
  root.add(createBox('countertop-island', [3.82, 0.1, 1.92], [0.35, 1.78, 2.83], stone));
  root.add(createBox('countertop-island-lip', [3.86, 0.04, 1.96], [0.35, 1.84, 2.83], stoneDark));
  root.add(createBox('backsplash-body', [4.6, 1.24, 0.06], [-1.1, 1.95, -1.1], shell));
  root.add(createBox('backsplash-led', [4.52, 0.06, 0.04], [-1.1, 2.49, -1.02], warmLight));
  root.add(createBox('open-shelf-lower', [1.05, 0.07, 0.36], [1.28, 2.62, -0.34], shellDark));
  root.add(createBox('open-shelf-upper', [1.05, 0.07, 0.36], [1.28, 3.16, -0.34], shellDark));
  root.add(createBox('open-shelf-side-left', [0.05, 0.72, 0.34], [0.78, 2.9, -0.34], shellDark));
  root.add(createBox('open-shelf-side-right', [0.05, 0.72, 0.34], [1.78, 2.9, -0.34], shellDark));
  root.add(createBox('open-shelf-back', [1.0, 0.7, 0.03], [1.28, 2.9, -0.5], glass));

  root.add(createRoundedBox('kitchen-base-left-door', [1.08, 1.72, 0.08], [-2.2, 0.98, 1.32], createMaterial('#f5f1eb', 0.22, 0.08), 0.045, 4));
  root.add(createRoundedBox('kitchen-base-right-door', [1.08, 1.72, 0.08], [-0.9, 0.98, 1.32], createMaterial('#f5f1eb', 0.22, 0.08), 0.045, 4));
  root.add(createRoundedBox('kitchen-base-drawers', [1.12, 1.72, 0.08], [0.55, 0.98, 1.32], createMaterial('#d7d3cf', 0.36, 0.12), 0.04, 4));
  root.add(createRoundedBox('kitchen-wall-left-door', [1.08, 1.28, 0.08], [-2.2, 3.08, -0.42], createMaterial('#f5f1eb', 0.2, 0.08), 0.04, 4));
  root.add(createRoundedBox('kitchen-wall-right-door', [1.08, 1.28, 0.08], [-0.9, 3.08, -0.42], createMaterial('#f5f1eb', 0.2, 0.08), 0.04, 4));
  root.add(createRoundedBox('kitchen-pantry-door', [1.2, 4.25, 0.08], [3.1, 2.35, -0.58], createMaterial('#6d7279', 0.18, 0.12), 0.05, 5));
  root.add(createRoundedBox('kitchen-island-front', [3.3, 1.52, 0.1], [0.35, 0.92, 3.45], createMaterial('#d7c0ae', 0.48, 0.1), 0.045, 4));
  root.add(createRoundedBox('kitchen-backsplash-panel', [4.55, 1.18, 0.06], [-1.1, 1.92, -1.02], createMaterial('#b9856a', 0.18, 0.24), 0.02, 3));

  root.add(createBox('base-left-frame-top', [1.12, 0.05, 0.025], [-2.2, 1.82, 1.37], shellDark));
  root.add(createBox('base-right-frame-top', [1.12, 0.05, 0.025], [-0.9, 1.82, 1.37], shellDark));
  root.add(createBox('drawer-frame-top', [1.16, 0.05, 0.025], [0.55, 1.82, 1.37], shellDark));
  root.add(createBox('wall-left-frame-top', [1.12, 0.05, 0.025], [-2.2, 3.68, -0.37], shellDark));
  root.add(createBox('wall-right-frame-top', [1.12, 0.05, 0.025], [-0.9, 3.68, -0.37], shellDark));
  root.add(createBox('pantry-frame-top', [1.24, 0.05, 0.025], [3.1, 4.44, -0.53], shellDark));
  addFrontReveal(root, 'kitchen-base-left-door-detail', 0.96, 1.6, -2.2, 0.98, 1.365, shellDark);
  addFrontReveal(root, 'kitchen-base-right-door-detail', 0.96, 1.6, -0.9, 0.98, 1.365, shellDark);
  addFrontReveal(root, 'kitchen-wall-left-door-detail', 0.96, 1.14, -2.2, 3.08, -0.375, shellDark);
  addFrontReveal(root, 'kitchen-wall-right-door-detail', 0.96, 1.14, -0.9, 3.08, -0.375, shellDark);
  addFrontReveal(root, 'kitchen-pantry-door-detail', 1.08, 4.08, 3.1, 2.35, -0.535, shell);
  addFrontReveal(root, 'kitchen-island-front-detail', 3.08, 1.28, 0.35, 0.92, 3.515, shell);
  addFlutedRun(root, 'kitchen-island-rib', 12, 0.11, 1.28, 0.04, [-1.06, 0.92, 3.54], 0.19, stoneDark);
  root.add(createBox('drawer-divider-top', [1.02, 0.03, 0.03], [0.55, 1.42, 1.37], shellDark));
  root.add(createBox('drawer-divider-mid', [1.02, 0.03, 0.03], [0.55, 0.98, 1.37], shellDark));
  root.add(createBox('drawer-divider-bottom', [1.02, 0.03, 0.03], [0.55, 0.54, 1.37], shellDark));
  root.add(createCylinder('handle-base-left', 0.022, 0.76, [-1.71, 0.98, 1.4], metal, [0, 0, 0]));
  root.add(createCylinder('handle-base-right', 0.022, 0.76, [-0.41, 0.98, 1.4], metal, [0, 0, 0]));
  root.add(createCylinder('handle-wall-left', 0.02, 0.56, [-1.71, 3.08, -0.34], metal, [0, 0, 0]));
  root.add(createCylinder('handle-wall-right', 0.02, 0.56, [-0.41, 3.08, -0.34], metal, [0, 0, 0]));
  root.add(createCylinder('handle-pantry', 0.022, 1.8, [3.64, 2.35, -0.5], metal, [0, 0, 0]));
  root.add(createBox('sink-block', [1.24, 0.16, 0.62], [-1.78, 1.92, 0.58], metal));
  root.add(createBox('hob-block', [0.92, 0.08, 0.52], [0.42, 1.96, 0.74], createMaterial('#23252c', 0.16, 0.25)));

  scene.add(root);
}

function addCupboardModel(scene) {
  const root = new Group();
  root.name = 'wardrobe-suite';

  const shell = createMaterial('#e3d8cb', 0.9, 0.04);
  const accent = createMaterial('#ddd2c7', 0.86, 0.06);
  const accentDark = createMaterial('#c8baad', 0.82, 0.08);
  const metal = createMaterial('#8f7864', 0.28, 0.42);
  const mirror = createMaterial('#9ea3ab', 0.16, 0.16);
  const warmLight = createMaterial('#f4d6b8', 0.26, 0.01);

  root.add(createBox('wardrobe-body', [5.82, 5.75, 1.12], [-0.45, 2.75, -1.32], shell));
  root.add(createBox('wardrobe-shadow-line', [5.86, 0.12, 1.14], [-0.45, 0.08, -1.32], accentDark));
  root.add(createBox('wardrobe-top-cap', [5.9, 0.1, 1.16], [-0.45, 5.67, -1.32], accentDark));
  root.add(createBox('vanity-body', [1.58, 2.1, 1.1], [3.88, 1.05, 0.28], accent));
  root.add(createBox('vanity-side-shell', [1.6, 2.68, 0.22], [3.88, 3.02, -0.58], accent));
  root.add(createBox('top-led-lip', [5.9, 0.12, 1.18], [-0.45, 5.65, -1.28], createMaterial('#f4eee6', 0.72, 0.02)));
  root.add(createBox('top-led-strip', [5.82, 0.04, 0.08], [-0.45, 5.54, -0.78], warmLight));
  root.add(createBox('loft-divider', [0.07, 1.03, 1.02], [-0.45, 5.22, -0.8], accentDark));
  root.add(createBox('vanity-counter', [1.62, 0.08, 1.14], [3.88, 2.12, 0.28], accentDark));
  root.add(createBox('mirror-panel', [1.12, 2.16, 0.04], [3.88, 3.22, -0.38], mirror));
  root.add(createBox('display-niche-base', [1.04, 0.08, 0.44], [3.88, 4.32, 0.12], accentDark));

  root.add(createRoundedBox('wardrobe-left-door', [1.22, 4.55, 0.08], [-2.55, 2.4, -0.8], createMaterial('#f1ede7', 0.2, 0.08), 0.05, 5));
  root.add(createRoundedBox('wardrobe-center-left-door', [1.22, 4.55, 0.08], [-1.15, 2.4, -0.8], createMaterial('#747b82', 0.18, 0.12), 0.05, 5));
  root.add(createRoundedBox('wardrobe-center-right-door', [1.22, 4.55, 0.08], [0.25, 2.4, -0.8], createMaterial('#747b82', 0.18, 0.12), 0.05, 5));
  root.add(createRoundedBox('wardrobe-right-door', [1.22, 4.55, 0.08], [1.65, 2.4, -0.8], createMaterial('#f1ede7', 0.2, 0.08), 0.05, 5));
  root.add(createRoundedBox('wardrobe-loft-left', [2.7, 1.02, 0.08], [-1.85, 5.22, -0.8], createMaterial('#d4cdc4', 0.56, 0.1), 0.04, 4));
  root.add(createRoundedBox('wardrobe-loft-right', [2.72, 1.02, 0.08], [0.95, 5.22, -0.8], createMaterial('#d4cdc4', 0.56, 0.1), 0.04, 4));
  root.add(createRoundedBox('wardrobe-vanity-drawers', [1.28, 1.68, 0.08], [3.88, 1.02, 0.96], createMaterial('#405645', 0.18, 0.12), 0.045, 4));
  root.add(createRoundedBox('wardrobe-vanity-panel', [1.38, 2.28, 0.08], [3.88, 2.62, -0.24], createMaterial('#6a4d39', 0.48, 0.12), 0.04, 4));

  root.add(createBox('door-frame-left', [1.26, 0.05, 0.025], [-2.55, 4.62, -0.75], accentDark));
  root.add(createBox('door-frame-center-left', [1.26, 0.05, 0.025], [-1.15, 4.62, -0.75], accentDark));
  root.add(createBox('door-frame-center-right', [1.26, 0.05, 0.025], [0.25, 4.62, -0.75], accentDark));
  root.add(createBox('door-frame-right', [1.26, 0.05, 0.025], [1.65, 4.62, -0.75], accentDark));
  addFrontReveal(root, 'wardrobe-left-door-detail', 1.08, 4.34, -2.55, 2.4, -0.755, accentDark);
  addFrontReveal(root, 'wardrobe-center-left-door-detail', 1.08, 4.34, -1.15, 2.4, -0.755, accent);
  addFrontReveal(root, 'wardrobe-center-right-door-detail', 1.08, 4.34, 0.25, 2.4, -0.755, accent);
  addFrontReveal(root, 'wardrobe-right-door-detail', 1.08, 4.34, 1.65, 2.4, -0.755, accentDark);
  addFrontReveal(root, 'wardrobe-loft-left-detail', 2.5, 0.84, -1.85, 5.22, -0.755, accentDark);
  addFrontReveal(root, 'wardrobe-loft-right-detail', 2.52, 0.84, 0.95, 5.22, -0.755, accentDark);
  addFrontReveal(root, 'wardrobe-vanity-panel-detail', 1.16, 2.04, 3.88, 2.62, -0.195, accentDark);
  root.add(createBox('wardrobe-divider-left', [0.05, 4.6, 0.1], [-1.86, 2.4, -0.84], accentDark));
  root.add(createBox('wardrobe-divider-mid', [0.05, 4.6, 0.1], [-0.46, 2.4, -0.84], accentDark));
  root.add(createBox('wardrobe-divider-right', [0.05, 4.6, 0.1], [0.94, 2.4, -0.84], accentDark));
  root.add(createBox('vanity-led-strip', [1.18, 0.03, 0.05], [3.88, 4.18, 0.12], warmLight));
  addFlutedRun(root, 'wardrobe-panel-rib', 10, 0.08, 2.0, 0.03, [3.48, 2.62, -0.14], 0.09, accentDark);
  root.add(createCylinder('handle-door-left', 0.022, 1.7, [-2.02, 2.4, -0.72], metal, [0, 0, 0]));
  root.add(createCylinder('handle-door-center-left', 0.022, 1.7, [-0.62, 2.4, -0.72], metal, [0, 0, 0]));
  root.add(createCylinder('handle-door-center-right', 0.022, 1.7, [0.78, 2.4, -0.72], metal, [0, 0, 0]));
  root.add(createCylinder('handle-door-right', 0.022, 1.7, [2.18, 2.4, -0.72], metal, [0, 0, 0]));
  root.add(createCylinder('vanity-pull-left', 0.02, 0.5, [3.88, 1.36, 1.03], metal));
  root.add(createCylinder('vanity-pull-right', 0.02, 0.5, [3.88, 0.72, 1.03], metal));

  scene.add(root);
}

function addTvModel(scene) {
  const root = new Group();
  root.name = 'tv-lounge-suite';

  const shell = createMaterial('#ddd2c5', 0.86, 0.04);
  const stone = createMaterial('#ece4da', 0.58, 0.12);
  const stoneDark = createMaterial('#d9cec3', 0.56, 0.14);
  const metal = createMaterial('#8f7864', 0.28, 0.42);
  const warmLight = createMaterial('#f4d7bd', 0.28, 0.01);
  const glass = createMaterial('#979ca3', 0.14, 0.12);

  root.add(createBox('tv-wall-shell', [4.6, 4.8, 0.22], [-1.25, 2.3, -1.82], shell));
  root.add(createBox('tv-wall-trim-top', [4.66, 0.08, 0.24], [-1.25, 4.72, -1.82], stoneDark));
  root.add(createBox('tv-console-shell', [4.15, 0.82, 1.04], [-1.0, 0.68, -0.16], shell));
  root.add(createBox('tv-console-top', [4.18, 0.08, 1.08], [-1.0, 1.09, -0.16], stoneDark));
  root.add(createBox('tv-side-shell', [1.36, 4.6, 1.12], [3.82, 2.32, -1.16], shell));
  root.add(createBox('tv-screen-void', [1.45, 0.18, 2.25], [-1.1, 2.1, -1.36], stone));
  root.add(createBox('tv-top-cap', [4.45, 0.1, 0.24], [-1.25, 4.72, -1.74], stone));
  root.add(createBox('tv-led-strip', [4.18, 0.04, 0.06], [-1.25, 4.42, -1.56], warmLight));
  root.add(createBox('tv-open-shelf-top', [1.12, 0.07, 0.32], [2.5, 3.45, -0.26], stoneDark));
  root.add(createBox('tv-open-shelf-bottom', [1.12, 0.07, 0.32], [2.5, 1.2, -0.26], stoneDark));
  root.add(createBox('tv-open-shelf-mid', [1.12, 0.06, 0.32], [2.5, 2.34, -0.26], stoneDark));
  root.add(createBox('tv-open-shelf-left', [0.06, 2.32, 0.3], [1.97, 2.33, -0.26], stoneDark));
  root.add(createBox('tv-open-shelf-right', [0.06, 2.32, 0.3], [3.03, 2.33, -0.26], stoneDark));
  root.add(createBox('tv-open-shelf-back', [1.06, 2.26, 0.02], [2.5, 2.33, -0.39], glass));

  root.add(createRoundedBox('tv-feature-wall', [4.3, 4.55, 0.08], [-1.25, 2.25, -1.68], createMaterial('#76706a', 0.7, 0.04), 0.03, 3));
  root.add(createRoundedBox('tv-center-panel', [2.08, 3.18, 0.08], [-1.15, 2.12, -1.57], createMaterial('#d7cfc7', 0.22, 0.12), 0.04, 4));
  root.add(createRoundedBox('tv-console-left', [1.2, 0.74, 0.08], [-2.3, 0.72, 0.32], createMaterial('#5d422e', 0.46, 0.14), 0.04, 4));
  root.add(createRoundedBox('tv-console-center', [1.2, 0.74, 0.08], [-1.0, 0.72, 0.32], createMaterial('#5d422e', 0.46, 0.14), 0.04, 4));
  root.add(createRoundedBox('tv-console-right', [1.2, 0.74, 0.08], [0.3, 0.72, 0.32], createMaterial('#5d422e', 0.46, 0.14), 0.04, 4));
  root.add(createRoundedBox('tv-shelf-panel', [1.16, 2.52, 0.08], [2.48, 2.2, -0.72], createMaterial('#b9856a', 0.18, 0.24), 0.04, 4));
  root.add(createRoundedBox('tv-side-tower', [1.18, 4.55, 0.08], [3.82, 2.32, -0.88], createMaterial('#747b82', 0.18, 0.12), 0.05, 5));

  addFlutedRun(root, 'tv-feature-rib', 22, 0.08, 4.24, 0.03, [-2.1, 2.25, -1.61], 0.19, stoneDark);
  addFrontReveal(root, 'tv-center-panel-detail', 1.9, 3.0, -1.15, 2.12, -1.525, stoneDark);
  addFrontReveal(root, 'tv-shelf-panel-detail', 1.02, 2.34, 2.48, 2.2, -0.675, shell);
  addFrontReveal(root, 'tv-side-tower-detail', 1.02, 4.34, 3.82, 2.32, -0.835, shell);
  root.add(createBox('tv-center-panel-trim', [2.14, 0.05, 0.025], [-1.15, 3.68, -1.52], stoneDark));
  root.add(createBox('tv-console-shadow-line', [4.18, 0.08, 1.08], [-1.0, 0.14, -0.16], stoneDark));
  root.add(createBox('tv-side-led-strip', [0.04, 4.18, 0.05], [3.22, 2.32, -0.56], warmLight));
  root.add(createCylinder('tv-console-handle-left', 0.02, 0.42, [-2.3, 0.72, 0.4], metal));
  root.add(createCylinder('tv-console-handle-center', 0.02, 0.42, [-1.0, 0.72, 0.4], metal));
  root.add(createCylinder('tv-console-handle-right', 0.02, 0.42, [0.3, 0.72, 0.4], metal));
  root.add(createBox('tv-screen-frame', [1.58, 0.08, 2.38], [-1.12, 2.12, -1.31], createMaterial('#1d1f24', 0.18, 0.18)));

  scene.add(root);
}

function addBackdrop(scene) {
  const orb = new Mesh(new SphereGeometry(0.18, 18, 18), createMaterial('#f5eadf', 0.2, 0.02));
  orb.name = 'accent-orb';
  orb.position.set(0, 6.5, 2.4);
  scene.add(orb);
}

async function exportGlb(scene, outputPath) {
  const exporter = new GLTFExporter();

  const arrayBuffer = await new Promise((resolve, reject) => {
    exporter.parse(
      scene,
      (result) => resolve(result),
      (error) => reject(error),
      { binary: true }
    );
  });

  await writeFile(outputPath, Buffer.from(arrayBuffer));
}

async function buildModel(fileName, builder) {
  const scene = new Scene();
  builder(scene);
  addBackdrop(scene);
  await exportGlb(scene, path.join(outputDir, fileName));
}

await mkdir(outputDir, { recursive: true });
await buildModel('kitchen-atelier.glb', addKitchenModel);
await buildModel('wardrobe-suite.glb', addCupboardModel);
await buildModel('tv-lounge-suite.glb', addTvModel);

console.log(`Studio models written to ${outputDir}`);
