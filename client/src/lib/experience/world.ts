/**
 * Selam CPA — Cinematic 3D World
 *
 * A scroll-driven Three.js scene: five "acts" the camera travels through as
 * the visitor scrolls. All heavy objects are built once; per-frame work is
 * limited to interpolation and small rotations so the scene stays cheap on
 * mid-range hardware. The page owns the DOM/scroll; this module only receives
 * a normalized scroll progress (0..1) and pointer position (-1..1).
 */
import * as THREE from "three";

export interface WorldHandle {
  /** Scroll progress across the whole journey, 0..1 */
  setScroll(progress: number): void;
  /** Normalized pointer, -1..1 on both axes */
  setPointer(x: number, y: number): void;
  /** Pause/resume the render loop (tab hidden, canvas offscreen) */
  setRunning(running: boolean): void;
  /** Render a single frame without starting the loop (reduced motion) */
  renderOnce(): void;
  resize(): void;
  dispose(): void;
}

const NAVY = new THREE.Color("#0a0f1e");
const EMERALD = new THREE.Color("#10b981");
const EMERALD_SOFT = new THREE.Color("#34d399");
const BLUE = new THREE.Color("#38bdf8");
const SLATE = new THREE.Color("#94a3b8");

const PARTICLE_COUNT = 2600;
const STAR_COUNT = 900;

/** Smoothstep a value into 0..1 between edges */
function smooth(edge0: number, edge1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function damp(current: number, target: number, lambda: number, dt: number): number {
  return THREE.MathUtils.damp(current, target, lambda, dt);
}

/** Soft radial glow sprite so particles render as light points, not squares */
function makeGlowTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.35, "rgba(255,255,255,0.6)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createWorld(canvas: HTMLCanvasElement): WorldHandle {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  const scene = new THREE.Scene();
  scene.background = NAVY.clone();
  scene.fog = new THREE.FogExp2(NAVY.getHex(), 0.028);

  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 220);

  // ---------------------------------------------------------------- lighting
  const ambient = new THREE.AmbientLight(0x2a3550, 1.4);
  const keyLight = new THREE.PointLight(EMERALD.getHex(), 320, 90, 1.9);
  const rimLight = new THREE.PointLight(BLUE.getHex(), 200, 90, 1.9);
  const fillLight = new THREE.DirectionalLight(0x6b7a99, 0.5);
  fillLight.position.set(-4, 8, 6);
  scene.add(ambient, keyLight, rimLight, fillLight);

  const disposables: Array<{ dispose(): void }> = [];
  const track = <T extends { dispose(): void }>(d: T): T => {
    disposables.push(d);
    return d;
  };

  const glowTexture = track(makeGlowTexture());

  // ------------------------------------------------------------- star field
  {
    const positions = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      const r = 60 + Math.random() * 120;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const geo = track(new THREE.BufferGeometry());
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const mat = track(
      new THREE.PointsMaterial({
        color: SLATE.getHex(),
        size: 0.35,
        map: glowTexture,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
      }),
    );
    scene.add(new THREE.Points(geo, mat));
  }

  // ----------------------------------------------- Act I/II: particle ledger
  // Particles morph from a chaotic cloud ("shoebox of receipts") into an
  // ordered rising bar-chart constellation as the visitor scrolls Act II.
  const chaosPositions = new Float32Array(PARTICLE_COUNT * 3);
  const orderPositions = new Float32Array(PARTICLE_COUNT * 3);
  {
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // chaos: a loose swirling cloud around the entry corridor
      const r = 3 + Math.random() * 14;
      const a = Math.random() * Math.PI * 2;
      chaosPositions[i * 3] = Math.cos(a) * r;
      chaosPositions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      chaosPositions[i * 3 + 2] = -6 - Math.random() * 30;

      // order: 12 ascending "bars" of particles — a skyline of clean numbers
      const bar = i % 12;
      const height = 1.5 + bar * 0.62 + Math.random() * 0.5;
      orderPositions[i * 3] = (bar - 5.5) * 1.35 + (Math.random() - 0.5) * 0.42;
      orderPositions[i * 3 + 1] = Math.random() * height - 3.2;
      orderPositions[i * 3 + 2] = -22 + (Math.random() - 0.5) * 1.6;
    }
  }
  const particleGeo = track(new THREE.BufferGeometry());
  particleGeo.setAttribute("position", new THREE.BufferAttribute(chaosPositions.slice(), 3));
  const particleMat = track(
    new THREE.PointsMaterial({
      color: EMERALD_SOFT.getHex(),
      size: 0.16,
      map: glowTexture,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // ------------------------------------------------- Act III: ascent helix
  // A rising spiral of glowing rings the camera climbs through — the tax
  // strategy ascent. Slight per-ring rotation gives it life without cost.
  const helix = new THREE.Group();
  const ringGeo = track(new THREE.TorusGeometry(2.6, 0.045, 12, 96));
  const ringMats: THREE.MeshStandardMaterial[] = [];
  for (let i = 0; i < 9; i++) {
    const t = i / 8;
    const mat = track(
      new THREE.MeshStandardMaterial({
        color: EMERALD.clone().lerp(BLUE, t),
        emissive: EMERALD.clone().lerp(BLUE, t),
        emissiveIntensity: 0.9,
        metalness: 0.4,
        roughness: 0.35,
      }),
    );
    ringMats.push(mat);
    const ring = new THREE.Mesh(ringGeo, mat);
    ring.position.set(Math.sin(t * Math.PI * 2.4) * 1.1, -4 + i * 2.1, -46 - i * 0.4);
    ring.rotation.x = Math.PI / 2 + (Math.random() - 0.5) * 0.28;
    helix.add(ring);
  }
  scene.add(helix);

  // ------------------------------------------------ Act IV: intelligence core
  // A wireframe icosahedron "AI core" with an inner glow sphere and orbiting
  // satellites — the firm's AI tooling, alive but composed.
  const core = new THREE.Group();
  core.position.set(0, 15.5, -74);
  {
    const wireGeo = track(new THREE.IcosahedronGeometry(2.4, 1));
    const wireMat = track(
      new THREE.MeshBasicMaterial({ color: EMERALD_SOFT.getHex(), wireframe: true, transparent: true, opacity: 0.85 }),
    );
    core.add(new THREE.Mesh(wireGeo, wireMat));

    const innerGeo = track(new THREE.IcosahedronGeometry(1.15, 2));
    const innerMat = track(
      new THREE.MeshStandardMaterial({
        color: 0x0e2237,
        emissive: EMERALD.getHex(),
        emissiveIntensity: 1.6,
        roughness: 0.2,
        metalness: 0.1,
      }),
    );
    core.add(new THREE.Mesh(innerGeo, innerMat));

    const satGeo = track(new THREE.SphereGeometry(0.16, 16, 16));
    for (let i = 0; i < 5; i++) {
      const satMat = track(
        new THREE.MeshStandardMaterial({
          color: BLUE.getHex(),
          emissive: BLUE.getHex(),
          emissiveIntensity: 1.2,
          roughness: 0.3,
        }),
      );
      const sat = new THREE.Mesh(satGeo, satMat);
      sat.userData.orbit = { radius: 3.4 + i * 0.5, speed: 0.35 + i * 0.12, phase: (i / 5) * Math.PI * 2, tilt: i * 0.5 };
      core.add(sat);
    }
  }
  scene.add(core);

  // --------------------------------------------------- Act V: trust gallery
  // Calm floating glass panels catching soft light — the "steady hands"
  // moment before the invitation.
  const gallery = new THREE.Group();
  gallery.position.set(0, 30, -100);
  {
    const panelGeo = track(new THREE.PlaneGeometry(2.6, 3.6));
    const edgeGeo = track(new THREE.EdgesGeometry(panelGeo));
    for (let i = 0; i < 6; i++) {
      const mat = track(
        new THREE.MeshPhysicalMaterial({
          color: 0x16283f,
          metalness: 0.1,
          roughness: 0.15,
          transparent: true,
          opacity: 0.32,
          side: THREE.DoubleSide,
          clearcoat: 1,
          clearcoatRoughness: 0.2,
        }),
      );
      const panel = new THREE.Mesh(panelGeo, mat);
      const edgeMat = track(
        new THREE.LineBasicMaterial({ color: EMERALD_SOFT.getHex(), transparent: true, opacity: 0.5 }),
      );
      panel.add(new THREE.LineSegments(edgeGeo, edgeMat));
      const side = i % 2 === 0 ? -1 : 1;
      panel.position.set(side * (3.4 + (i % 3) * 1.1), (Math.random() - 0.5) * 3.5, -Math.floor(i / 2) * 4.5);
      panel.rotation.y = side * -0.5;
      panel.userData.floatPhase = i * 1.3;
      gallery.add(panel);
    }
  }
  scene.add(gallery);

  // ------------------------------------------------------- camera choreography
  // Keyframed dolly path through the acts; Catmull-Rom gives cinematic eases
  // between keys, and scroll damping removes scroll-wheel judder.
  const cameraPath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0, 0.4, 9), // arrival — facing the chaos cloud
      new THREE.Vector3(0, -0.4, -8), // gliding into the ledger skyline
      new THREE.Vector3(0.6, 0.2, -16), // hold on the ordered bars
      new THREE.Vector3(-0.8, 2.5, -34), // banking upward into the helix
      new THREE.Vector3(0.6, 10, -46), // climbing the rings
      new THREE.Vector3(0, 15.5, -66), // approach the intelligence core
      new THREE.Vector3(-1.2, 21, -84), // rising toward the gallery
      new THREE.Vector3(0, 30, -92), // drifting among the glass panels
      new THREE.Vector3(0, 31.5, -78), // the pull-back reveal / invitation
    ],
    false,
    "catmullrom",
    0.4,
  );
  const lookTargets = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0, 0, -14),
      new THREE.Vector3(0, -0.5, -22),
      new THREE.Vector3(0, 0, -24),
      new THREE.Vector3(0, 5, -48),
      new THREE.Vector3(0, 13, -52),
      new THREE.Vector3(0, 15.5, -74),
      new THREE.Vector3(0, 26, -96),
      new THREE.Vector3(0, 30, -104),
      new THREE.Vector3(0, 28, -120),
    ],
    false,
    "catmullrom",
    0.4,
  );

  // ---------------------------------------------------------------- run state
  let targetScroll = 0;
  let scroll = 0;
  const pointer = { x: 0, y: 0 };
  const smoothedPointer = { x: 0, y: 0 };
  let running = false;
  let rafId = 0;
  let elapsed = 0;
  let lastTime = 0;
  let disposed = false;

  // Adaptive resolution: start sharp, back off if frames run long.
  let pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);
  let slowFrames = 0;

  const camPos = new THREE.Vector3();
  const camLook = new THREE.Vector3();

  function update(dt: number) {
    elapsed += dt;
    scroll = damp(scroll, targetScroll, 4.5, dt);
    smoothedPointer.x = damp(smoothedPointer.x, pointer.x, 5, dt);
    smoothedPointer.y = damp(smoothedPointer.y, pointer.y, 5, dt);

    const p = THREE.MathUtils.clamp(scroll, 0, 1);

    // camera along the dolly path, with subtle pointer parallax
    cameraPath.getPointAt(p, camPos);
    lookTargets.getPointAt(p, camLook);
    camera.position.set(
      camPos.x + smoothedPointer.x * 0.55,
      camPos.y + smoothedPointer.y * 0.35,
      camPos.z,
    );
    camera.lookAt(camLook);

    // lights travel with the camera so every act is lit
    keyLight.position.set(camPos.x + 4, camPos.y + 3, camPos.z - 6);
    rimLight.position.set(camPos.x - 5, camPos.y - 2, camPos.z - 12);

    // Act II morph: chaos -> ordered skyline across scroll 0.08..0.3
    const morph = smooth(0.08, 0.3, p);
    const posAttr = particleGeo.getAttribute("position") as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const wobble = Math.sin(elapsed * 0.6) * 0.05;
    for (let i = 0; i < PARTICLE_COUNT * 3; i += 3) {
      arr[i] = THREE.MathUtils.lerp(chaosPositions[i], orderPositions[i], morph);
      arr[i + 1] = THREE.MathUtils.lerp(chaosPositions[i + 1], orderPositions[i + 1], morph) + wobble;
      arr[i + 2] = THREE.MathUtils.lerp(chaosPositions[i + 2], orderPositions[i + 2], morph);
    }
    posAttr.needsUpdate = true;
    particles.rotation.y = (1 - morph) * elapsed * 0.05;

    // Act III rings breathe and spin gently as the camera climbs
    const helixEnergy = smooth(0.28, 0.5, p);
    helix.children.forEach((ring, i) => {
      ring.rotation.z = elapsed * (0.12 + i * 0.015);
      const s = 1 + Math.sin(elapsed * 1.4 + i) * 0.03 * helixEnergy;
      ring.scale.setScalar(s);
    });
    ringMats.forEach((m, i) => {
      m.emissiveIntensity = 0.5 + helixEnergy * (0.8 + Math.sin(elapsed * 2 + i) * 0.25);
    });

    // Act IV core rotation + satellite orbits
    core.rotation.y = elapsed * 0.25;
    core.rotation.x = Math.sin(elapsed * 0.3) * 0.15;
    core.children.forEach((child) => {
      const orbit = child.userData.orbit;
      if (!orbit) return;
      const a = elapsed * orbit.speed + orbit.phase;
      child.position.set(
        Math.cos(a) * orbit.radius,
        Math.sin(a * 1.3 + orbit.tilt) * 1.2,
        Math.sin(a) * orbit.radius,
      );
    });

    // Act V panels float on slow sine offsets
    gallery.children.forEach((panel) => {
      const phase = panel.userData.floatPhase ?? 0;
      panel.position.y += Math.sin(elapsed * 0.5 + phase) * 0.0016;
      panel.rotation.z = Math.sin(elapsed * 0.3 + phase) * 0.03;
    });

    // fog thins as the journey rises out of the opening chaos
    (scene.fog as THREE.FogExp2).density = 0.028 - 0.012 * smooth(0.3, 0.8, p);
  }

  function frame(now: number) {
    if (!running || disposed) return;
    rafId = requestAnimationFrame(frame);
    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;

    update(dt);
    renderer.render(scene, camera);

    // degrade resolution rather than frame rate on weak GPUs
    if (dt > 0.034) {
      slowFrames++;
      if (slowFrames > 30 && pixelRatio > 1) {
        pixelRatio = Math.max(1, pixelRatio - 0.25);
        renderer.setPixelRatio(pixelRatio);
        slowFrames = 0;
      }
    } else if (slowFrames > 0) {
      slowFrames--;
    }
  }

  function resize() {
    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height, false);
  }

  resize();
  update(0.016);
  renderer.render(scene, camera);

  return {
    setScroll(progress: number) {
      targetScroll = THREE.MathUtils.clamp(progress, 0, 1);
    },
    setPointer(x: number, y: number) {
      pointer.x = THREE.MathUtils.clamp(x, -1, 1);
      pointer.y = THREE.MathUtils.clamp(y, -1, 1);
    },
    setRunning(next: boolean) {
      if (disposed || next === running) return;
      running = next;
      if (running) {
        lastTime = performance.now();
        rafId = requestAnimationFrame(frame);
      } else {
        cancelAnimationFrame(rafId);
      }
    },
    renderOnce() {
      if (disposed) return;
      scroll = targetScroll;
      update(0.016);
      renderer.render(scene, camera);
    },
    resize,
    dispose() {
      if (disposed) return;
      disposed = true;
      running = false;
      cancelAnimationFrame(rafId);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    },
  };
}
