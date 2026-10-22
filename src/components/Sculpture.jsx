// 워크벤치 가운데의 3D 조형물.
// 정이십면체를 80개 조각으로 나눠 두고, 정거장이 바뀔 때마다
// 조각을 흩뜨렸다가(Fragment) 정거장마다 정해진 모양으로 다시 모읍니다(Rebuild).
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

const { Vector3, Quaternion, Euler, MathUtils } = THREE;
const Z = new Vector3(0, 0, 1);
const Y = new Vector3(0, 1, 0);
const TRANSITION_SECONDS = 1.2;

function seeded(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildShards() {
  const random = seeded(1206);
  const position = new THREE.IcosahedronGeometry(1.55, 1).attributes.position;
  const shards = [];

  for (let i = 0; i < position.count; i += 3) {
    const outer = [0, 1, 2].map((k) => new Vector3().fromBufferAttribute(position, i + k));
    const center = outer[0].clone().add(outer[1]).add(outer[2]).divideScalar(3);
    const inner = outer.map((v) => v.clone().multiplyScalar(0.74));
    const [a, b, c, a2, b2, c2] = [...outer, ...inner].map((v) => v.sub(center));
    // 바깥 면, 안쪽 면, 옆면 3개로 된 두께 있는 조각
    const faces = [a, b, c, a2, c2, b2, a, a2, b2, a, b2, b, b, b2, c2, b, c2, c, c, c2, a2, c, a2, a];
    const geometry = new THREE.BufferGeometry().setFromPoints(faces);
    geometry.computeVertexNormals();

    shards.push({
      geometry,
      edges: new THREE.EdgesGeometry(geometry),
      center,
      normal: center.clone().normalize(),
      scatter: new Vector3(random() - 0.5, random() - 0.5, random() - 0.5).normalize(),
      distance: 1.2 + random() * 2.4,
      spin: new Vector3(random() - 0.5, random() - 0.5, random() - 0.5).multiplyScalar(5),
      seeds: Array.from({ length: 6 }, random),
    });
  }
  return shards;
}

// 조각의 바깥 면이 dir을 향하게 돌리고, 그 축으로 twist만큼 더 돌립니다.
function face(normal, dir, twist = 0) {
  const axis = dir.clone().normalize();
  const turn = new Quaternion().setFromUnitVectors(normal, axis);
  return new Quaternion().setFromAxisAngle(axis, twist).multiply(turn);
}

// 정거장별 모양. 각 함수는 조각 하나의 { p: 위치, q: 회전, k: 크기 }를 돌려줍니다.
const forms = {
  sphere: (s) => ({ p: s.center.clone(), q: new Quaternion(), k: 1 }),

  screen: (s, i) => {
    const col = i % 10;
    const row = Math.floor(i / 10);
    return { p: new Vector3((col - 4.5) * 0.46, (3.5 - row) * 0.4, 0), q: face(s.normal, Z, (i % 2) * Math.PI), k: 0.5 };
  },

  ring: (s, i, n) => {
    const angle = (i / n) * Math.PI * 2;
    return {
      p: new Vector3(Math.cos(angle) * 1.75, Math.sin(angle) * 1.75, Math.sin(angle * 3) * 0.25),
      q: face(s.normal, Z, angle),
      k: 0.55,
    };
  },

  // 프론트 · API · 채점기 3층 판. 판마다 5×5 조각, 남는 조각은 층 사이를 잇는 연결선.
  tiers: (s, i) => {
    const tier = Math.floor(i / 26);
    const cell = i % 26;
    if (tier < 3 && cell < 25) {
      const col = cell % 5;
      const row = Math.floor(cell / 5);
      return { p: new Vector3((col - 2) * 0.36, (1 - tier) * 1.25, (row - 2) * 0.36), q: face(s.normal, Y, (cell % 2) * Math.PI), k: 0.4 };
    }
    const link = (i * 3) % 5;
    return { p: new Vector3(0, 1.25 - link * 0.6, 0), q: face(s.normal, Z), k: 0.2 };
  },

  dock: (s, i) => {
    const col = i % 16;
    const row = Math.floor(i / 16);
    const x = (col - 7.5) * 0.27;
    const ghost = (i * 7) % 5 === 0;
    return {
      p: new Vector3(x, (row - 2) * 0.27 - 0.45 + (ghost ? 1.2 : 0), -x * x * 0.07),
      q: face(s.normal, Z, (i % 2) * Math.PI),
      k: ghost ? 0.22 : 0.48,
    };
  },

  scatter: (s) => ({
    p: new Vector3((s.seeds[0] - 0.5) * 5.2, (s.seeds[1] - 0.5) * 3.2, (s.seeds[2] - 0.5) * 2.4),
    q: new Quaternion().setFromEuler(new Euler(s.seeds[3] * 6.28, s.seeds[4] * 6.28, s.seeds[5] * 6.28)),
    k: 0.5,
  }),

  helix: (s, i) => {
    const strand = i % 2;
    const k = Math.floor(i / 2);
    const angle = k * 0.45 + strand * Math.PI;
    const out = new Vector3(Math.cos(angle), 0, Math.sin(angle));
    return { p: new Vector3(out.x * 1.05, (k / 39 - 0.5) * 3.6, out.z * 1.05), q: face(s.normal, out), k: 0.48 };
  },

  portal: (s, i, n) => {
    const inner = i % 2;
    const angle = (i / n) * Math.PI * 2;
    const radius = inner ? 0.8 : 1.25;
    return { p: new Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0), q: face(s.normal, Z, angle), k: 0.42 };
  },
};

// 천천히 도는 게 어울리는 모양 (화면·링·도크처럼 정면을 봐야 하는 모양은 돌리지 않음)
const spinningForms = new Set(['sphere', 'scatter', 'helix', 'tiers']);
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

function Shards({ form, exploded, motion, onReady }) {
  const shards = useMemo(buildShards, []);
  const targets = useMemo(
    () => Object.fromEntries(Object.entries(forms).map(([name, build]) => [name, shards.map((s, i) => build(s, i, shards.length))])),
    [shards],
  );
  const surface = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#c9d1dc', metalness: 0.55, roughness: 0.3, flatShading: true, side: THREE.DoubleSide }),
    [],
  );
  const outline = useMemo(() => new THREE.LineBasicMaterial({ color: '#9bd4ff', transparent: true, opacity: 0.55 }), []);

  const group = useRef(null);
  const meshes = useRef([]);
  const current = useRef(null);
  const transition = useRef({ from: null, t: 1 });
  const explodeAmount = useRef(0);
  const spinAngle = useRef(0);
  const framesDrawn = useRef(0);
  const motionRef = useRef(motion);
  const scratch = useMemo(() => ({ q: new Quaternion(), e: new Euler() }), []);

  if (!current.current) {
    current.current = targets[form].map((t) => ({ p: t.p.clone(), q: t.q.clone(), k: t.k }));
  }

  const invalidate = useThree((state) => state.invalidate);
  const size = useThree((state) => state.size);
  const viewportWidth = useThree((state) => state.viewport.width);
  const scale = MathUtils.clamp(viewportWidth / 5.4, 0.42, 1);

  useEffect(() => {
    motionRef.current = motion;
  }, [motion]);

  // 모양이 바뀌면 지금 위치에서 새 모양으로 넘어가는 전환을 시작합니다.
  useEffect(() => {
    transition.current = {
      from: current.current.map((c) => ({ p: c.p.clone(), q: c.q.clone(), k: c.k })),
      t: motionRef.current ? 0 : 1,
    };
    invalidate();
  }, [form, invalidate]);

  // 'demand' 모드(모션 끔)에서도 값이나 캔버스 크기가 바뀌면 다시 그립니다.
  useEffect(() => {
    invalidate();
  }, [exploded, motion, size.width, size.height, invalidate]);

  useFrame((state, delta) => {
    if (state.size.width > 0 && ++framesDrawn.current === 3) onReady();

    const live = motionRef.current;
    const tr = transition.current;
    tr.t = live ? Math.min(1, tr.t + delta / TRANSITION_SECONDS) : 1;
    const eased = easeInOut(tr.t);
    const burst = Math.sin(Math.PI * tr.t);
    explodeAmount.current = live
      ? MathUtils.damp(explodeAmount.current, exploded ? 1 : 0, 4, delta)
      : exploded
        ? 1
        : 0;
    const spread = burst * 0.9 + explodeAmount.current;
    const target = targets[form];

    shards.forEach((shard, i) => {
      const mesh = meshes.current[i];
      if (!mesh) return;
      const to = target[i];
      const now = current.current[i];
      if (tr.t >= 1 || !tr.from) {
        now.p.copy(to.p);
        now.q.copy(to.q);
        now.k = to.k;
      } else {
        const from = tr.from[i];
        now.p.lerpVectors(from.p, to.p, eased);
        now.q.slerpQuaternions(from.q, to.q, eased);
        now.k = MathUtils.lerp(from.k, to.k, eased);
      }
      mesh.position.copy(now.p).addScaledVector(shard.scatter, spread * shard.distance * 0.8);
      mesh.quaternion.copy(now.q);
      if (spread > 0.001) {
        scratch.e.set(shard.spin.x * spread, shard.spin.y * spread, shard.spin.z * spread);
        mesh.quaternion.multiply(scratch.q.setFromEuler(scratch.e));
      }
      mesh.scale.setScalar(now.k);
    });

    // 회전: 마우스를 따라 기울고, 어울리는 모양일 때만 천천히 돕니다.
    // 돌지 않는 모양으로 바뀌면 가장 가까운 한 바퀴 지점으로 돌아와 정면을 봅니다.
    const spinning = spinningForms.has(form);
    if (live && spinning) spinAngle.current += delta * 0.15;
    else if (live) spinAngle.current = MathUtils.damp(spinAngle.current, Math.round(spinAngle.current / (Math.PI * 2)) * Math.PI * 2, 3, delta);
    else spinAngle.current = 0;

    const px = live ? MathUtils.clamp(state.pointer.x, -1.5, 1.5) : 0;
    const py = live ? MathUtils.clamp(state.pointer.y, -1.5, 1.5) : 0;
    const rotateY = (spinning ? 0.4 : 0) + px * 0.4 + spinAngle.current;
    const rotateX = (form === 'tiers' ? 0.5 : 0.12) - py * 0.25;
    const g = group.current;
    if (g) {
      g.rotation.y = live ? MathUtils.damp(g.rotation.y, rotateY, 3, delta) : rotateY;
      g.rotation.x = live ? MathUtils.damp(g.rotation.x, rotateX, 3, delta) : rotateX;
    }
  });

  return (
    <group ref={group} scale={scale}>
      {shards.map((shard, index) => (
        <group key={index} ref={(node) => (meshes.current[index] = node)}>
          <mesh geometry={shard.geometry} material={surface} />
          <lineSegments geometry={shard.edges} material={outline} />
        </group>
      ))}
    </group>
  );
}

export default function Sculpture({ form, exploded, motion, visible }) {
  // 실제로 몇 프레임이 그려질 때까지는 계속 그립니다.
  // (백그라운드 탭에서는 프레임이 멈춰 있으므로 시간이 아니라 그려진 프레임 수로 판단합니다.)
  const [warmingUp, setWarmingUp] = useState(true);
  const frameloop = warmingUp || (motion && visible) ? 'always' : 'demand';

  return (
    <Canvas
      className="sculpture-canvas"
      frameloop={frameloop}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.2], fov: 40 }}
      gl={{ alpha: true, antialias: true }}
      eventSource={document.getElementById('root')}
      eventPrefix="client"
      aria-hidden="true"
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[3, 4, 5]} intensity={2.4} />
      <directionalLight position={[-5, -2, 2]} intensity={1.6} color="#9bd4ff" />
      <Shards form={form} exploded={exploded} motion={motion} onReady={() => setWarmingUp(false)} />
    </Canvas>
  );
}
