import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Sticker palette — the cube and the orange accent carry the page's color.
const FACE_COLORS = {
  right: 0xb0262f,
  left: 0xf28c28,
  top: 0xf5f5f5,
  bottom: 0xf2c11e,
  front: 0x2e9e4f,
  back: 0x2464b4,
};
const BODY = 0x111111;
const EPS = 0.001;
const SIZE = 0.94;
const GAP = 0.06;
const STEP = SIZE + GAP;
const SCRAMBLE_MOVES = 12;

function buildCubelet(x, y, z) {
  const geo = new THREE.BoxGeometry(SIZE, SIZE, SIZE);
  const mats = [
    new THREE.MeshStandardMaterial({ color: x === 1 ? FACE_COLORS.right : BODY, roughness: 0.35 }),
    new THREE.MeshStandardMaterial({ color: x === -1 ? FACE_COLORS.left : BODY, roughness: 0.35 }),
    new THREE.MeshStandardMaterial({ color: y === 1 ? FACE_COLORS.top : BODY, roughness: 0.35 }),
    new THREE.MeshStandardMaterial({ color: y === -1 ? FACE_COLORS.bottom : BODY, roughness: 0.35 }),
    new THREE.MeshStandardMaterial({ color: z === 1 ? FACE_COLORS.front : BODY, roughness: 0.35 }),
    new THREE.MeshStandardMaterial({ color: z === -1 ? FACE_COLORS.back : BODY, roughness: 0.35 }),
  ];
  const mesh = new THREE.Mesh(geo, mats);
  mesh.position.set(x * STEP, y * STEP, z * STEP);
  return mesh;
}

export default function RubiksCube() {
  const mountRef = useRef(null);
  const apiRef = useRef(null);
  const [movesFromSolved, setMovesFromSolved] = useState(0);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const turnSpeed = prefersReduced ? 30 : 3.4; // rad/s — near-instant if reduced motion

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(6.2, 5.4, 7.4);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(6, 9, 7);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xffffff, 0.5);
    fill.position.set(-6, -3, -5);
    scene.add(fill);

    const cube = new THREE.Group();
    const cubelets = [];
    for (let x = -1; x <= 1; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) {
          const c = buildCubelet(x, y, z);
          cube.add(c);
          cubelets.push(c);
        }
    cube.rotation.set(0.35, -0.6, 0);
    scene.add(cube);

    // Pivot is a child of the cube so layer turns happen in cube-local
    // space and follow any drag/idle rotation automatically.
    const pivot = new THREE.Group();
    cube.add(pivot);

    // ── Move engine: queue of pending turns + history of applied ones ──
    // "Solve" = undo the last history entry, so every click is one real
    // move closer to solved and an empty history means solved.
    const queue = [];
    const history = [];
    let turning = null;

    function startTurn(move) {
      const members = cubelets.filter(
        (c) => Math.abs(c.position[move.axis] - move.layer) < STEP / 2
      );
      pivot.rotation.set(0, 0, 0);
      members.forEach((m) => pivot.attach(m));
      turning = { ...move, angleLeft: (Math.PI / 2) * move.dir, members };
    }

    function finishTurn() {
      turning.members.forEach((m) => {
        cube.attach(m);
        m.position.set(
          Math.round(m.position.x / STEP) * STEP,
          Math.round(m.position.y / STEP) * STEP,
          Math.round(m.position.z / STEP) * STEP
        );
      });
      if (turning.kind === "scramble") {
        history.push({ axis: turning.axis, layer: turning.layer, dir: turning.dir });
      } else {
        history.pop();
      }
      turning = null;
      setMovesFromSolved(history.length);
      if (queue.length === 0) setBusy(false);
    }

    apiRef.current = {
      scramble() {
        if (turning || queue.length || history.length) return;
        let prev = null;
        for (let i = 0; i < SCRAMBLE_MOVES; i++) {
          let move;
          do {
            move = {
              axis: ["x", "y", "z"][(Math.random() * 3) | 0],
              layer: [-1, 0, 1][(Math.random() * 3) | 0] * STEP,
              dir: Math.random() < 0.5 ? 1 : -1,
              kind: "scramble",
            };
            // skip a move that exactly undoes the previous one
          } while (
            prev &&
            move.axis === prev.axis &&
            move.layer === prev.layer &&
            move.dir === -prev.dir
          );
          prev = move;
          queue.push(move);
        }
        setBusy(true);
      },
      solveOne() {
        if (turning || queue.length || !history.length) return;
        const last = history[history.length - 1];
        queue.push({ axis: last.axis, layer: last.layer, dir: -last.dir, kind: "solve" });
        setBusy(true);
      },
    };

    // ── Drag to orbit ──
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let idleSpin = !prefersReduced;
    let idleTimer = null;

    const onDown = (e) => {
      dragging = true;
      idleSpin = false;
      clearTimeout(idleTimer);
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onMove = (e) => {
      if (!dragging) return;
      const dx = (e.clientX - lastX) * 0.008;
      const dy = (e.clientY - lastY) * 0.008;
      lastX = e.clientX;
      lastY = e.clientY;
      const q = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(dy, dx, 0, "XYZ")
      );
      cube.quaternion.premultiply(q);
    };
    const onUp = () => {
      dragging = false;
      idleTimer = setTimeout(() => {
        if (!prefersReduced) idleSpin = true;
      }, 2500);
    };
    renderer.domElement.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    renderer.domElement.style.touchAction = "none";
    renderer.domElement.style.cursor = "grab";

    // ── Resize ──
    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h || 1;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // ── Loop ──
    let raf;
    const clock = new THREE.Clock();
    const AXES = {
      x: new THREE.Vector3(1, 0, 0),
      y: new THREE.Vector3(0, 1, 0),
      z: new THREE.Vector3(0, 0, 1),
    };

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);

      if (idleSpin && !dragging) cube.rotation.y += dt * 0.2;

      if (!turning && queue.length) startTurn(queue.shift());
      if (turning) {
        const stepAngle =
          Math.sign(turning.angleLeft) *
          Math.min(Math.abs(turning.angleLeft), dt * turnSpeed);
        pivot.rotateOnAxis(AXES[turning.axis], stepAngle);
        turning.angleLeft -= stepAngle;
        if (Math.abs(turning.angleLeft) < EPS) finishTurn();
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(idleTimer);
      ro.disconnect();
      apiRef.current = null;
      renderer.domElement.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      renderer.dispose();
      cubelets.forEach((c) => {
        c.geometry.dispose();
        c.material.forEach((m) => m.dispose());
      });
      mount.removeChild(renderer.domElement);
    };
  }, []);

  const solved = movesFromSolved === 0;

  return (
    <div className="relative h-full min-h-[320px] w-full">
      <div
        ref={mountRef}
        className="absolute inset-0"
        aria-label="Interactive 3D Rubik's cube. Drag to rotate."
        role="img"
      />
      <div className="absolute inset-x-5 bottom-5 z-10 flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-xs text-muted" aria-live="polite">
          {solved
            ? "solved · drag to rotate"
            : `${movesFromSolved} move${movesFromSolved === 1 ? "" : "s"} from solved`}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => apiRef.current?.scramble()}
            disabled={busy || !solved}
            className="rounded-full bg-accent px-4 py-1.5 font-mono text-xs font-medium text-white transition hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-35"
          >
            Scramble
          </button>
          <button
            type="button"
            onClick={() => apiRef.current?.solveOne()}
            disabled={busy || solved}
            className="rounded-full border border-line bg-bg px-4 py-1.5 font-mono text-xs text-ink transition hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-35"
          >
            Solve 1 move
          </button>
        </div>
      </div>
    </div>
  );
}
