import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import * as d3Geo from 'd3-geo';
import * as topojson from 'topojson-client';
import worldAtlasData from 'world-atlas/countries-110m.json';
import { MATH_COMMUNITIES_PINS, MathCommunityPin } from '../data/communitiesMapData';

export type Artifact3DMode = 'globe' | 'ishango' | 'sangaku' | 'enigma';
export type CameraPreset = 'overview' | 'closeup' | 'top' | 'side';
export type FinishPreset = 'museum-brass' | 'obsidian-gold' | 'archival-stone';

interface ThreeSpatialAtlasProps {
  activeMode: Artifact3DMode;
  onModeChange: (mode: Artifact3DMode) => void;
  selectedPinId?: string;
  onSelectPin?: (pin: MathCommunityPin) => void;
  isFullScreenModal?: boolean;
  onToggleFullScreen?: () => void;
}

// Pre-allocated module-scope scratch objects (Zero GC in render loop)
const _vec3 = new THREE.Vector3();
const _camTargetPos = new THREE.Vector3();
const _camTargetLook = new THREE.Vector3();
const _dummy = new THREE.Object3D();
const _color = new THREE.Color();

function latLngToVector3(lat: number, lng: number, radius: number, out: THREE.Vector3): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  out.x = -(radius * Math.sin(phi) * Math.cos(theta));
  out.z = radius * Math.sin(phi) * Math.sin(theta);
  out.y = radius * Math.cos(phi);
  return out;
}

function createProceduralWorldTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Deep ocean background
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#0c192c');
  grad.addColorStop(0.5, '#132847');
  grad.addColorStop(1, '#0c192c');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 512);

  // Graticule grid (meridians and parallels)
  const projection = d3Geo.geoEquirectangular().translate([512, 256]).scale(1024 / (2 * Math.PI));
  const geoPath = d3Geo.geoPath(projection, ctx);

  ctx.strokeStyle = 'rgba(212, 175, 55, 0.16)';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  geoPath(d3Geo.geoGraticule10());
  ctx.stroke();

  // Authentic Natural Earth countries via world-atlas TopoJSON
  const topology = worldAtlasData as unknown as TopoJSON.Topology;
  const countries = topojson.feature(
    topology,
    topology.objects.countries as TopoJSON.GeometryCollection
  );

  ctx.fillStyle = '#233b59';
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  geoPath(countries);
  ctx.fill();
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = maxAnisotropy;
  return texture;
}

function createAzimuthDialTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#141923';
  ctx.fillRect(0, 0, 512, 512);

  const cx = 256;
  const cy = 256;
  ctx.strokeStyle = '#d4af37';
  for (let deg = 0; deg < 360; deg += 5) {
    const rad = (deg * Math.PI) / 180;
    const r1 = deg % 30 === 0 ? 195 : 215;
    const r2 = 235;
    ctx.lineWidth = deg % 30 === 0 ? 2.5 : 1;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(rad) * r1, cy + Math.sin(rad) * r1);
    ctx.lineTo(cx + Math.cos(rad) * r2, cy + Math.sin(rad) * r2);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

function createSangakuTabletTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d')!;

  // Warm Edo cedar wood grain background
  const grad = ctx.createLinearGradient(0, 0, 1024, 640);
  grad.addColorStop(0, '#d8b384');
  grad.addColorStop(0.5, '#cfa472');
  grad.addColorStop(1, '#c39560');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 640);

  // Subtle wood grain lines
  ctx.strokeStyle = 'rgba(110, 68, 28, 0.14)';
  ctx.lineWidth = 2;
  for (let y = 12; y < 640; y += 16) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(320, y + 6, 680, y - 6, 1024, y);
    ctx.stroke();
  }

  // Outer calligraphy border
  ctx.strokeStyle = '#291c14';
  ctx.lineWidth = 10;
  ctx.strokeRect(36, 36, 952, 568);

  // Classic Sangaku Theorem: Tangent Circles inside an Outer Circle & Triangle
  const cx = 512;
  const cy = 335;
  ctx.strokeStyle = '#1c1917';
  ctx.lineWidth = 4;

  // Baseline tangent line
  ctx.beginPath();
  ctx.moveTo(150, 510);
  ctx.lineTo(874, 510);
  ctx.stroke();

  // Left large circle (Vermilion)
  ctx.fillStyle = '#b93829';
  ctx.beginPath();
  ctx.arc(335, 350, 160, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Right large circle (Deep Lapis)
  ctx.fillStyle = '#1e3a8a';
  ctx.beginPath();
  ctx.arc(695, 365, 145, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Kissing inner circle (Gold)
  ctx.fillStyle = '#d99b26';
  ctx.beginPath();
  ctx.arc(522, 472, 38, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Upper inscribed circle (Jade)
  ctx.fillStyle = '#15803d';
  ctx.beginPath();
  ctx.arc(512, 185, 88, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Header inscription
  ctx.fillStyle = '#1c1917';
  ctx.font = 'bold 28px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText('算額 · SANGAKU TEMPLE GEOMETRY · 1/√r₃ = 1/√r₁ + 1/√r₂', cx, 86);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

export const ThreeSpatialAtlas: React.FC<ThreeSpatialAtlasProps> = ({
  activeMode,
  onModeChange,
  selectedPinId,
  onSelectPin,
  isFullScreenModal = false,
  onToggleFullScreen,
}) => {
  const canvasMountRef = useRef<HTMLDivElement | null>(null);
  const [explodedAmount, setExplodedAmount] = useState<number>(0);
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('overview');
  const [finishPreset, setFinishPreset] = useState<FinishPreset>('museum-brass');
  const [isDockCollapsed, setIsDockCollapsed] = useState<boolean>(false);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

  // Mutable refs for smooth animation loop access without re-mounting WebGL
  const modeRef = useRef<Artifact3DMode>(activeMode);
  const explodedRef = useRef<number>(explodedAmount);
  const presetRef = useRef<CameraPreset>(cameraPreset);
  const finishRef = useRef<FinishPreset>(finishPreset);
  const cameraAnimatingRef = useRef<boolean>(false);
  const onSelectPinRef = useRef(onSelectPin);

  useEffect(() => {
    modeRef.current = activeMode;
    cameraAnimatingRef.current = true;
  }, [activeMode]);

  useEffect(() => {
    explodedRef.current = explodedAmount;
  }, [explodedAmount]);

  useEffect(() => {
    presetRef.current = cameraPreset;
    cameraAnimatingRef.current = true;
  }, [cameraPreset]);

  useEffect(() => {
    finishRef.current = finishPreset;
  }, [finishPreset]);

  useEffect(() => {
    onSelectPinRef.current = onSelectPin;
  }, [onSelectPin]);

  // Keyboard shortcut 'H' to toggle bottom control dock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key.toLowerCase() === 'h') {
        setIsDockCollapsed((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const container = canvasMountRef.current;
    if (!container) return;

    // 1. Detect software WebGL from GPU renderer string
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 560;

    const scene = new THREE.Scene();
    const bgHex = 0x0d131f;
    scene.background = new THREE.Color(bgHex);
    scene.fog = new THREE.FogExp2(bgHex, 0.028);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 200);
    camera.position.set(0, 3.6, 8.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Studio Environment Map via RoomEnvironment + PMREMGenerator
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTarget = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envTarget.texture;
    pmremGenerator.dispose();

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

    // 3. Balanced 3-Point Studio Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x1e293b, 0.65);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff3db, 2.2);
    keyLight.position.set(6, 9, 6);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 25;
    const d = 6;
    keyLight.shadow.camera.left = -d;
    keyLight.shadow.camera.right = d;
    keyLight.shadow.camera.top = d;
    keyLight.shadow.camera.bottom = -d;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x60a5fa, 1.1);
    rimLight.position.set(-6, 5, -6);
    scene.add(rimLight);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.minDistance = 3.2;
    controls.maxDistance = 16;
    controls.maxPolarAngle = Math.PI * 0.49;
    controls.target.set(0, 1.4, 0);

    controls.addEventListener('start', () => {
      cameraAnimatingRef.current = false;
    });

    // Shared PBR Materials with >= 0.25 roughness variation across adjacent parts
    const brassMat = new THREE.MeshPhysicalMaterial({
      color: 0xd4af37,
      metalness: 0.92,
      roughness: 0.18,
      anisotropy: 0.6,
      clearcoat: 0.3,
    });
    const darkBronzeMat = new THREE.MeshStandardMaterial({
      color: 0x3b2f26,
      metalness: 0.65,
      roughness: 0.52,
    });
    const obsidianBaseMat = new THREE.MeshStandardMaterial({
      color: 0x161d2a,
      metalness: 0.25,
      roughness: 0.72,
    });
    const ivoryBoneMat = new THREE.MeshStandardMaterial({
      color: 0xe6dac3,
      metalness: 0.05,
      roughness: 0.68,
    });
    const quartzCrystalMat = new THREE.MeshPhysicalMaterial({
      color: 0x93c5fd,
      metalness: 0.0,
      roughness: 0.12,
      transmission: isSoftwareGl ? 0 : 0.88,
      transparent: true,
      opacity: isSoftwareGl ? 0.55 : 1,
      ior: 1.55,
      thickness: 0.8,
      clearcoat: 1.0,
    });
    const cedarWoodMat = new THREE.MeshStandardMaterial({
      color: 0x8c5830,
      metalness: 0.08,
      roughness: 0.64,
    });

    // Ground Pedestal & Contact Shadow Plane (prevents floating)
    const stageGroup = new THREE.Group();
    scene.add(stageGroup);

    const floorGeo = new THREE.CylinderGeometry(5.6, 6.0, 0.24, 64);
    const floorMesh = new THREE.Mesh(floorGeo, obsidianBaseMat);
    floorMesh.position.y = -0.12;
    floorMesh.receiveShadow = true;
    stageGroup.add(floorMesh);

    const dialTex = createAzimuthDialTexture(maxAnisotropy);
    const dialMat = new THREE.MeshStandardMaterial({
      map: dialTex,
      roughness: 0.4,
      metalness: 0.5,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    const dialGeo = new THREE.RingGeometry(1.8, 4.4, 64);
    dialGeo.rotateX(-Math.PI / 2);
    const dialMesh = new THREE.Mesh(dialGeo, dialMat);
    dialMesh.position.y = 0.01;
    stageGroup.add(dialMesh);

    // ==================== COMPOSITE MODEL 1: 3D ARMILLARY GLOBE & GENIUS CLUSTERS (9 PARTS) ====================
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Part 1: Lathe Pedestal Base
    const lathePoints = [
      new THREE.Vector2(0.0, 0.0),
      new THREE.Vector2(1.35, 0.0),
      new THREE.Vector2(1.2, 0.18),
      new THREE.Vector2(0.55, 0.35),
      new THREE.Vector2(0.38, 0.85),
      new THREE.Vector2(0.65, 1.0),
      new THREE.Vector2(0.0, 1.0),
    ];
    const pedestalGeo = new THREE.LatheGeometry(lathePoints, 48);
    const pedestalMesh = new THREE.Mesh(pedestalGeo, darkBronzeMat);
    pedestalMesh.castShadow = true;
    pedestalMesh.receiveShadow = true;
    globeGroup.add(pedestalMesh);

    // Part 2: Outer Horizon Ring
    const horizonRingGeo = new THREE.TorusGeometry(2.15, 0.065, 24, 96);
    horizonRingGeo.rotateX(Math.PI / 2);
    const horizonRingMesh = new THREE.Mesh(horizonRingGeo, brassMat);
    horizonRingMesh.position.y = 2.25;
    horizonRingMesh.userData.baseY = 2.25;
    horizonRingMesh.userData.explodeY = 0.55;
    globeGroup.add(horizonRingMesh);

    // Part 3: Prime Meridian Brass Arc
    const meridianGeo = new THREE.TorusGeometry(1.92, 0.05, 20, 96);
    const meridianMesh = new THREE.Mesh(meridianGeo, brassMat);
    meridianMesh.position.y = 2.25;
    meridianMesh.userData.baseY = 2.25;
    meridianMesh.userData.explodeY = 0.35;
    globeGroup.add(meridianMesh);

    // Part 4: Tilted Celestial Ecliptic Band
    const eclipticGeo = new THREE.TorusGeometry(1.74, 0.035, 16, 80);
    const eclipticMesh = new THREE.Mesh(eclipticGeo, darkBronzeMat);
    eclipticMesh.position.y = 2.25;
    eclipticMesh.rotation.z = THREE.MathUtils.degToRad(23.4);
    eclipticMesh.userData.baseY = 2.25;
    eclipticMesh.userData.explodeY = 0.2;
    globeGroup.add(eclipticMesh);

    // Part 5: Rotating Terrestrial Sphere + Beacons + Knowledge Arcs
    const earthPivot = new THREE.Group();
    earthPivot.position.y = 2.25;
    earthPivot.rotation.z = THREE.MathUtils.degToRad(12);
    globeGroup.add(earthPivot);

    const worldTex = createProceduralWorldTexture(maxAnisotropy);
    const earthMat = new THREE.MeshStandardMaterial({
      map: worldTex,
      roughness: 0.42,
      metalness: 0.18,
    });
    const earthGeo = new THREE.SphereGeometry(1.48, 64, 64);
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthMesh.castShadow = true;
    earthPivot.add(earthMesh);

    // Part 6 & 7: Polar Brass Caps
    const capGeo = new THREE.CylinderGeometry(0.08, 0.22, 0.28, 24);
    const northCap = new THREE.Mesh(capGeo, brassMat);
    northCap.position.y = 1.56;
    earthPivot.add(northCap);

    const southCap = new THREE.Mesh(capGeo, brassMat);
    southCap.position.y = -1.56;
    southCap.rotation.z = Math.PI;
    earthPivot.add(southCap);

    // Part 8: InstancedMesh of Mathematical Community Beacons (> 20 instances)
    const pinCount = MATH_COMMUNITIES_PINS.length;
    const beaconGeo = new THREE.OctahedronGeometry(0.058, 1);
    const beaconMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0xd97706,
      emissiveIntensity: 0.45,
    });
    const beaconInstanced = new THREE.InstancedMesh(beaconGeo, beaconMat, pinCount);
    beaconInstanced.layers.enable(1);

    MATH_COMMUNITIES_PINS.forEach((pin, idx) => {
      latLngToVector3(pin.coordinates[0], pin.coordinates[1], 1.52, _vec3);
      _dummy.position.copy(_vec3);
      _dummy.lookAt(0, 0, 0);
      _dummy.scale.setScalar(pin.scale === 'campania' ? 1.25 : 1.0);
      _dummy.updateMatrix();
      beaconInstanced.setMatrixAt(idx, _dummy.matrix);

      if (pin.scale === 'campania') _color.setHex(0xf97316);
      else if (pin.scale === 'italia') _color.setHex(0x22c55e);
      else if (pin.scale === 'europa') _color.setHex(0x38bdf8);
      else _color.setHex(0xfacc15);
      beaconInstanced.setColorAt(idx, _color);
    });
    beaconInstanced.instanceMatrix.needsUpdate = true;
    if (beaconInstanced.instanceColor) beaconInstanced.instanceColor.needsUpdate = true;
    beaconInstanced.computeBoundingSphere();
    earthPivot.add(beaconInstanced);

    // Part 9: Geodesic Knowledge Transmission Arcs (TubeGeometry)
    const arcPairs: Array<[[number, number], [number, number]]> = [
      [[10.33, 76.21], [33.31, 44.36]], // Kerala -> Baghdad
      [[33.31, 44.36], [44.49, 11.34]], // Baghdad -> Bologna/Pisa
      [[44.49, 11.34], [51.53, 9.93]], // Bologna -> Gottingen
      [[47.49, 19.04], [40.33, -74.66]], // Budapest -> Princeton
      [[49.84, 24.03], [55.7, 37.53]], // Lwow -> Moscow
      [[58.38, 26.72], [40.84, 14.25]], // Tartu -> Napoli
    ];
    arcPairs.forEach(([startCoord, endCoord]) => {
      const p1 = latLngToVector3(startCoord[0], startCoord[1], 1.5, new THREE.Vector3());
      const p2 = latLngToVector3(endCoord[0], endCoord[1], 1.5, new THREE.Vector3());
      const mid = p1.clone().add(p2).multiplyScalar(0.5).normalize().multiplyScalar(1.85);
      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.012, 8, false);
      const tubeMesh = new THREE.Mesh(tubeGeo, brassMat);
      earthPivot.add(tubeMesh);
    });

    // ==================== COMPOSITE MODEL 2: ISHANGO BONE & INCA QUIPU (8 PARTS) ====================
    const ishangoGroup = new THREE.Group();
    ishangoGroup.visible = false;
    scene.add(ishangoGroup);

    // Pedestal cradle
    const cradleBase = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.32, 1.4), obsidianBaseMat);
    cradleBase.position.y = 0.16;
    ishangoGroup.add(cradleBase);

    // Brass support pillars
    const pillarL = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 1.4, 20), brassMat);
    pillarL.position.set(-0.9, 0.85, 0);
    ishangoGroup.add(pillarL);

    const pillarR = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 1.4, 20), brassMat);
    pillarR.position.set(0.9, 0.85, 0);
    ishangoGroup.add(pillarR);

    // Carved Baboon Fibula Bone via LatheGeometry
    const boneProfile = [
      new THREE.Vector2(0.0, 0.0),
      new THREE.Vector2(0.24, 0.1),
      new THREE.Vector2(0.21, 0.8),
      new THREE.Vector2(0.19, 1.8),
      new THREE.Vector2(0.23, 2.6),
      new THREE.Vector2(0.16, 2.85),
      new THREE.Vector2(0.0, 2.9),
    ];
    const boneGeo = new THREE.LatheGeometry(boneProfile, 36);
    boneGeo.rotateZ(Math.PI / 2);
    const boneMesh = new THREE.Mesh(boneGeo, ivoryBoneMat);
    boneMesh.position.set(1.45, 1.65, 0);
    boneMesh.castShadow = true;
    boneMesh.userData.baseY = 1.65;
    boneMesh.userData.explodeY = 0.45;
    ishangoGroup.add(boneMesh);

    // Engraved Quartz Tip at the end of the Ishango Bone
    const quartzGeo = new THREE.OctahedronGeometry(0.22, 0);
    const quartzMesh = new THREE.Mesh(quartzGeo, quartzCrystalMat);
    quartzMesh.position.set(-1.52, 1.65, 0);
    quartzMesh.scale.set(1.4, 0.85, 0.85);
    quartzMesh.userData.baseY = 1.65;
    quartzMesh.userData.explodeY = 0.7;
    ishangoGroup.add(quartzMesh);

    // Prime-number tally notch rings (11, 13, 17, 19) using InstancedMesh
    const notchGeo = new THREE.TorusGeometry(0.215, 0.014, 12, 32);
    notchGeo.rotateY(Math.PI / 2);
    const notchInstanced = new THREE.InstancedMesh(notchGeo, darkBronzeMat, 28);
    for (let i = 0; i < 28; i++) {
      _dummy.position.set(-1.1 + i * 0.085, 1.65, 0);
      _dummy.rotation.set(0, 0, (i % 4) * 0.08);
      _dummy.scale.setScalar(1);
      _dummy.updateMatrix();
      notchInstanced.setMatrixAt(i, _dummy.matrix);
    }
    notchInstanced.instanceMatrix.needsUpdate = true;
    notchInstanced.computeBoundingSphere();
    ishangoGroup.add(notchInstanced);

    // Suspended Inca Quipu Main Cord & Knotted Pendant Cords
    const quipuBarCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.6, 2.85, -0.3),
      new THREE.Vector3(0, 2.72, -0.3),
      new THREE.Vector3(1.6, 2.85, -0.3),
    ]);
    const quipuBarMesh = new THREE.Mesh(new THREE.TubeGeometry(quipuBarCurve, 32, 0.04, 12, false), brassMat);
    quipuBarMesh.userData.baseY = 0;
    quipuBarMesh.userData.explodeY = 0.9;
    ishangoGroup.add(quipuBarMesh);

    // ==================== COMPOSITE MODEL 3: EDO SANGAKU TABLET & SOROBAN ABACUS (9 PARTS) ====================
    const sangakuGroup = new THREE.Group();
    sangakuGroup.visible = false;
    scene.add(sangakuGroup);

    const sangakuTex = createSangakuTabletTexture(maxAnisotropy);
    const sangakuBoardMat = new THREE.MeshStandardMaterial({
      map: sangakuTex,
      roughness: 0.45,
      metalness: 0.05,
    });
    const tabletMesh = new THREE.Mesh(new THREE.BoxGeometry(3.5, 2.2, 0.16), sangakuBoardMat);
    tabletMesh.position.set(0, 2.1, 0);
    tabletMesh.castShadow = true;
    sangakuGroup.add(tabletMesh);

    // Beveled Temple Roof Frame above Sangaku
    const roofGeo = new THREE.ConeGeometry(2.7, 0.55, 4);
    roofGeo.rotateY(Math.PI / 4);
    const roofMesh = new THREE.Mesh(roofGeo, darkBronzeMat);
    roofMesh.scale.set(1.05, 1, 0.35);
    roofMesh.position.set(0, 3.42, 0);
    roofMesh.userData.baseY = 3.42;
    roofMesh.userData.explodeY = 0.65;
    sangakuGroup.add(roofMesh);

    // Soroban Abacus Frame in foreground
    const sorobanFrame = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.18, 1.1), cedarWoodMat);
    sorobanFrame.position.set(0, 0.52, 0.85);
    sangakuGroup.add(sorobanFrame);

    // Instanced Biconical Soroban Beads (35 beads across 7 rods)
    const beadGeo = new THREE.CylinderGeometry(0.04, 0.13, 0.09, 16);
    const beadInstanced = new THREE.InstancedMesh(beadGeo, brassMat, 35);
    let beadIdx = 0;
    for (let rod = -3; rod <= 3; rod++) {
      for (let row = 0; row < 5; row++) {
        _dummy.position.set(rod * 0.32, 0.65, 0.48 + row * 0.16);
        _dummy.rotation.set(Math.PI / 2, 0, 0);
        _dummy.scale.setScalar(1);
        _dummy.updateMatrix();
        beadInstanced.setMatrixAt(beadIdx++, _dummy.matrix);
      }
    }
    beadInstanced.instanceMatrix.needsUpdate = true;
    beadInstanced.computeBoundingSphere();
    sangakuGroup.add(beadInstanced);

    // ==================== COMPOSITE MODEL 4: ENIGMA ROTOR & LORENZ CHAOS ATTRACTOR (9 PARTS) ====================
    const enigmaGroup = new THREE.Group();
    enigmaGroup.visible = false;
    scene.add(enigmaGroup);

    // 3 Coaxial Geared Cipher Rotors
    const rotorPositions = [-0.65, 0, 0.65];
    const rotorMeshes: THREE.Group[] = [];
    rotorPositions.forEach((rx, idx) => {
      const rGroup = new THREE.Group();
      rGroup.position.set(rx, 1.65, 0);
      rGroup.userData.baseX = rx;

      const coreCyl = new THREE.Mesh(
        new THREE.CylinderGeometry(0.95, 0.95, 0.36, 36).rotateZ(Math.PI / 2),
        idx === 1 ? brassMat : darkBronzeMat
      );
      rGroup.add(coreCyl);

      const notchedRing = new THREE.Mesh(
        new THREE.TorusGeometry(1.02, 0.06, 12, 26).rotateY(Math.PI / 2),
        brassMat
      );
      rGroup.add(notchedRing);

      enigmaGroup.add(rGroup);
      rotorMeshes.push(rGroup);
    });

    // Central Axle Shaft
    const axleMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.14, 0.14, 2.8, 24).rotateZ(Math.PI / 2),
      brassMat
    );
    axleMesh.position.set(0, 1.65, 0);
    enigmaGroup.add(axleMesh);

    // 3D Lorenz Strange Attractor Trajectory Tube (Dynamical Systems & Chaos)
    const lorenzPts: THREE.Vector3[] = [];
    let lx = 0.1;
    let ly = 0;
    let lz = 0;
    const sigma = 10;
    const rho = 28;
    const beta = 8 / 3;
    const dtStep = 0.008;
    for (let i = 0; i < 450; i++) {
      const dx = sigma * (ly - lx) * dtStep;
      const dy = (lx * (rho - lz) - ly) * dtStep;
      const dz = (lx * ly - beta * lz) * dtStep;
      lx += dx;
      ly += dy;
      lz += dz;
      lorenzPts.push(new THREE.Vector3(lx * 0.085, 2.3 + (lz - 25) * 0.055, ly * 0.085));
    }
    const lorenzCurve = new THREE.CatmullRomCurve3(lorenzPts);
    const lorenzTube = new THREE.Mesh(
      new THREE.TubeGeometry(lorenzCurve, 220, 0.028, 8, false),
      quartzCrystalMat
    );
    lorenzTube.userData.baseY = 0;
    lorenzTube.userData.explodeY = 0.6;
    enigmaGroup.add(lorenzTube);

    // Raycasting for interactive community beacons on the 3D Globe
    const raycaster = new THREE.Raycaster();
    raycaster.layers.set(1);
    const pointer = new THREE.Vector2();
    let lastRaycastTime = 0;

    const handlePointerMove = (e: MouseEvent) => {
      if (modeRef.current !== 'globe') {
        setHoveredLabel(null);
        return;
      }
      const now = performance.now();
      if (now - lastRaycastTime < 50) return;
      lastRaycastTime = now;

      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObject(beaconInstanced, false);
      if (hits.length > 0 && hits[0].instanceId !== undefined) {
        const pin = MATH_COMMUNITIES_PINS[hits[0].instanceId];
        if (pin) {
          setHoveredLabel(`${pin.name} (${pin.cityOrArea})`);
          renderer.domElement.style.cursor = 'pointer';
          return;
        }
      }
      setHoveredLabel(null);
      renderer.domElement.style.cursor = 'grab';
    };

    const handleClick = (e: MouseEvent) => {
      if (modeRef.current !== 'globe') return;
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObject(beaconInstanced, false);
      if (hits.length > 0 && hits[0].instanceId !== undefined) {
        const pin = MATH_COMMUNITIES_PINS[hits[0].instanceId];
        if (pin && onSelectPinRef.current) {
          onSelectPinRef.current(pin);
        }
      }
    };

    renderer.domElement.addEventListener('mousemove', handlePointerMove);
    renderer.domElement.addEventListener('click', handleClick);

    // Pre-warm shaders on hardware GPUs
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // 4. Animation Loop with Software-WebGL Fence Pacing & Smooth Damping
    const clock = new THREE.Clock();
    let frameId = 0;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      const dt = Math.min(clock.getDelta(), 0.1);
      const currentMode = modeRef.current;

      // Toggle visible composite model group
      globeGroup.visible = currentMode === 'globe';
      ishangoGroup.visible = currentMode === 'ishango';
      sangakuGroup.visible = currentMode === 'sangaku';
      enigmaGroup.visible = currentMode === 'enigma';

      // Material finish preset updates
      if (finishRef.current === 'museum-brass') {
        brassMat.color.setHex(0xd4af37);
        brassMat.roughness = 0.18;
      } else if (finishRef.current === 'obsidian-gold') {
        brassMat.color.setHex(0xf59e0b);
        brassMat.roughness = 0.12;
      } else {
        brassMat.color.setHex(0xcbd5e1);
        brassMat.roughness = 0.32;
      }

      // Gentle procedural rotation
      earthPivot.rotation.y += dt * 0.22;
      rotorMeshes.forEach((rm, i) => {
        rm.rotation.x += dt * (0.35 + i * 0.2) * (i % 2 === 0 ? 1 : -1);
        const targetX = rm.userData.baseX * (1 + explodedRef.current * 0.85);
        rm.position.x = THREE.MathUtils.damp(rm.position.x, targetX, 6, dt);
      });

      // Smooth Exploded-View Damping across composite parts
      const exp = explodedRef.current;
      [horizonRingMesh, meridianMesh, eclipticMesh, boneMesh, quartzMesh, quipuBarMesh, roofMesh, lorenzTube].forEach(
        (mesh) => {
          if (mesh.userData.baseY !== undefined) {
            const targetY = mesh.userData.baseY + (mesh.userData.explodeY || 0.4) * exp;
            mesh.position.y = THREE.MathUtils.damp(mesh.position.y, targetY, 6, dt);
          }
        }
      );

      // Camera Preset Smooth Damping
      if (cameraAnimatingRef.current) {
        const preset = presetRef.current;
        if (preset === 'overview') {
          _camTargetPos.set(0, 3.6, 8.8);
          _camTargetLook.set(0, 1.6, 0);
        } else if (preset === 'closeup') {
          _camTargetPos.set(0, 2.3, 5.1);
          _camTargetLook.set(0, 1.85, 0);
        } else if (preset === 'top') {
          _camTargetPos.set(0, 8.5, 2.2);
          _camTargetLook.set(0, 1.2, 0);
        } else {
          _camTargetPos.set(6.8, 2.6, 4.2);
          _camTargetLook.set(0, 1.7, 0);
        }

        camera.position.x = THREE.MathUtils.damp(camera.position.x, _camTargetPos.x, 4.5, dt);
        camera.position.y = THREE.MathUtils.damp(camera.position.y, _camTargetPos.y, 4.5, dt);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, _camTargetPos.z, 4.5, dt);
        controls.target.x = THREE.MathUtils.damp(controls.target.x, _camTargetLook.x, 4.5, dt);
        controls.target.y = THREE.MathUtils.damp(controls.target.y, _camTargetLook.y, 4.5, dt);
        controls.target.z = THREE.MathUtils.damp(controls.target.z, _camTargetLook.z, 4.5, dt);

        if (camera.position.distanceToSquared(_camTargetPos) < 0.01) {
          cameraAnimatingRef.current = false;
        }
      }

      controls.update();
      renderer.render(scene, camera);

      if (isSoftwareGl) afterDraw(tick);
      else frameId = requestAnimationFrame(tick);
    }

    tick();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 560;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousemove', handlePointerMove);
      renderer.domElement.removeEventListener('click', handleClick);
      controls.dispose();
      renderer.dispose();
    };
  }, [isFullScreenModal]);

  return (
    <div
      className={`relative w-full overflow-hidden bg-[#0d131f] text-stone-100 select-none ${
        isFullScreenModal ? 'fixed inset-0 z-50 h-screen w-screen' : 'h-[560px] rounded-xl border border-stone-800'
      }`}
    >
      {/* Dedicated WebGL Canvas Mount Container */}
      <div ref={canvasMountRef} className="w-full h-full" />

      {/* Minimal Top-Left Spec Header (Unobstructed Center Viewport) */}
      <div className="pointer-events-none absolute top-4 left-5 right-5 flex items-start justify-between gap-4">
        <div className="pointer-events-auto rounded-lg bg-[#0f172a]/90 px-4 py-2.5 border border-slate-700/80">
          <div className="text-xs font-mono-tabular text-amber-400">
            OSSERVATORIO SPAZIALE 3D · STUDIO PBR INTERATTIVO
          </div>
          <div className="text-base font-serif-display font-semibold text-white mt-0.5">
            {activeMode === 'globe' && 'Globo Armillare dei Genius Clusters & Reti Epistolari'}
            {activeMode === 'ishango' && 'Osso di Ishango (20.000 a.C.) & Quipu Andino a Nodi'}
            {activeMode === 'sangaku' && 'Tavoletta Votiva Sangaku (Edo) & Abaco Soroban'}
            {activeMode === 'enigma' && 'Rotori Crittografici Enigma & Attrattore Caotico di Lorenz'}
          </div>
          {hoveredLabel && (
            <div className="text-xs text-sky-300 mt-1 font-mono-tabular">
              Nodo selezionabile: {hoveredLabel}
            </div>
          )}
        </div>

        {onToggleFullScreen && (
          <button
            type="button"
            onClick={onToggleFullScreen}
            className="pointer-events-auto px-3.5 py-2 text-xs font-medium text-stone-100 bg-[#0f172a]/90 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            {isFullScreenModal ? 'Esci da Schermo Intero' : 'Espandi Osservatorio 3D (100vw)'}
          </button>
        )}
      </div>

      {/* Unified Collapsible Bottom Control Dock (Zero Side-Panel Clutter, No backdrop-filter) */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-4 z-20 w-[94vw] max-w-[920px] transition-transform duration-200"
        style={{
          transform: `translateX(-50%) translateY(${isDockCollapsed ? 'calc(100% - 34px)' : '0px'})`,
        }}
      >
        <div className="flex justify-center mb-1.5">
          <button
            type="button"
            onClick={() => setIsDockCollapsed((prev) => !prev)}
            className="px-3.5 py-1 text-xs font-medium text-stone-200 bg-[#111827] hover:bg-slate-800 border border-slate-700 rounded-t-lg transition-colors whitespace-nowrap shrink-0"
          >
            {isDockCollapsed ? '▴ Mostra Controlli 3D (H)' : '▾ Nascondi Controlli 3D (H)'}
          </button>
        </div>

        <div className="bg-[#0f172a] border border-slate-700/90 rounded-xl px-4 py-3 shadow-2xl flex flex-wrap items-center justify-between gap-4">
          {/* Artifact / Scene Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 mr-1 whitespace-nowrap">Modello 3D:</span>
            {(
              [
                { id: 'globe', label: 'Globo Comunità' },
                { id: 'ishango', label: 'Ishango & Quipu' },
                { id: 'sangaku', label: 'Sangaku & Soroban' },
                { id: 'enigma', label: 'Enigma & Caos' },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onModeChange(item.id)}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  activeMode === item.id
                    ? 'bg-amber-500 text-slate-950 font-semibold'
                    : 'bg-slate-800/90 text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Exploded View Slider */}
          <div className="flex items-center gap-2">
            <label htmlFor="exploded-slider" className="text-xs text-slate-300 whitespace-nowrap">
              Vista Esplosa:
            </label>
            <input
              id="exploded-slider"
              type="range"
              min={0}
              max={1}
              step={0.02}
              value={explodedAmount}
              onChange={(e) => setExplodedAmount(parseFloat(e.target.value))}
              className="w-24 accent-amber-400 cursor-pointer"
            />
          </div>

          {/* Camera View Presets */}
          <div className="flex items-center gap-1">
            <span className="text-xs text-slate-400 mr-1 whitespace-nowrap">Camera:</span>
            {(
              [
                { id: 'overview', label: ' Globale' },
                { id: 'closeup', label: 'Dettaglio' },
                { id: 'top', label: 'Zenitale' },
                { id: 'side', label: 'Profilo' },
              ] as const
            ).map((cam) => (
              <button
                key={cam.id}
                type="button"
                onClick={() => setCameraPreset(cam.id)}
                className={`px-2 py-1 text-xs rounded transition-colors whitespace-nowrap shrink-0 ${
                  cameraPreset === cam.id
                    ? 'bg-slate-200 text-slate-900 font-medium'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cam.label}
              </button>
            ))}
          </div>

          {/* Surface Finish Swatches */}
          <div className="flex items-center gap-1">
            <span className="text-xs text-slate-400 mr-1 whitespace-nowrap">Finitura:</span>
            {(
              [
                { id: 'museum-brass', label: 'Ottone' },
                { id: 'obsidian-gold', label: 'Oro' },
                { id: 'archival-stone', label: 'Platino' },
              ] as const
            ).map((fin) => (
              <button
                key={fin.id}
                type="button"
                onClick={() => setFinishPreset(fin.id)}
                className={`px-2 py-1 text-xs rounded transition-colors whitespace-nowrap shrink-0 ${
                  finishPreset === fin.id
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {fin.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
