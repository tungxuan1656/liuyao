import {
  ACESFilmicToneMapping,
  AmbientLight,
  CircleGeometry,
  CylinderGeometry,
  DirectionalLight,
  Group,
  Mesh,
  MeshStandardMaterial,
  PCFShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  Scene,
  ShadowMaterial,
  TorusGeometry,
  WebGLRenderer,
} from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import type { CoinTossResult } from '@liuyao/core';
import { createCoinTexture } from './coin-texture';
import { poseCamera, poseCoins, TOSS_DURATION } from './coin-motion';

export function createCoinScene(host: HTMLElement) {
  const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'low-power',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.9;
  host.appendChild(renderer.domElement);
  const scene = new Scene();
  const camera = new PerspectiveCamera(32, 1, 0.1, 40);
  const room = new RoomEnvironment();
  const generator = new PMREMGenerator(renderer);
  const environment = generator.fromScene(room, 0.05);
  scene.environment = environment.texture;
  room.dispose();
  generator.dispose();
  scene.add(new AmbientLight(0xffeed9, 0.7));
  const key = new DirectionalLight(0xfff0d4, 2.5);
  key.position.set(-3, 7, 4);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4 });
  key.shadow.normalBias = 0.03;
  key.shadow.bias = -0.0003;
  key.shadow.radius = 5;
  scene.add(key);
  const fill = new DirectionalLight(0xd9e5ef, 1);
  fill.position.set(4, 4, -3);
  scene.add(fill);
  const floor = new Mesh(new PlaneGeometry(200, 200), new ShadowMaterial({ opacity: 0.2 }));
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);
  const coins: Group[] = [];
  const textures: ReturnType<typeof createCoinTexture>[] = [];
  const geometries: (CylinderGeometry | TorusGeometry | CircleGeometry)[] = [];
  const materials: MeshStandardMaterial[] = [];
  let frame = 0;
  let count = 0;
  let disposed = false;

  function clearCoins() {
    for (const coin of coins) scene.remove(coin);
    coins.length = 0;
    for (const resource of [...textures, ...geometries, ...materials]) resource.dispose();
    textures.length = geometries.length = materials.length = 0;
  }

  function buildCoins(nextCount: number) {
    if (count === nextCount) return;
    clearCoins();
    count = nextCount;
    const body = new CylinderGeometry(0.55, 0.55, 0.12, 64);
    const rim = new TorusGeometry(0.514, 0.018, 8, 64);
    geometries.push(body, rim);
    const edge = new MeshStandardMaterial({ color: 0x9f783f, metalness: 0.8, roughness: 0.32 });
    materials.push(edge);
    for (let i = 0; i < count; i++) {
      const faces = [true, false].map(heads => {
        const map = createCoinTexture(heads, count === 4 ? i : undefined);
        map.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);
        textures.push(map);
        const material = new MeshStandardMaterial({ map, metalness: 0.58, roughness: 0.43 });
        materials.push(material);
        return material;
      });
      const coin = new Group();
      const mesh = new Mesh(body, [edge, ...faces]);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      coin.add(mesh);
      for (const side of [-1, 1]) {
        const lip = new Mesh(rim, edge);
        lip.rotation.x = Math.PI / 2;
        lip.position.y = side * 0.061;
        coin.add(lip);
      }
      scene.add(coin);
      coins.push(coin);
    }
  }

  function render() {
    if (!disposed) renderer.render(scene, camera);
  }
  const resize = new ResizeObserver(() => {
    const { width, height } = host.getBoundingClientRect();
    renderer.setSize(width, height);
    camera.aspect = width / Math.max(height, 1);
    camera.updateProjectionMatrix();
    render();
  });
  resize.observe(host);

  return {
    update(
      nextCount: number,
      toss: CoinTossResult | undefined,
      animate: boolean,
      complete: () => void,
    ) {
      cancelAnimationFrame(frame);
      buildCoins(nextCount);
      const start = performance.now();
      const draw = (now: number) => {
        if (disposed) return;
        const elapsed = animate ? Math.min(now - start, TOSS_DURATION) : TOSS_DURATION;
        poseCoins(coins, toss?.coins, elapsed, animate);
        poseCamera(camera, animate ? elapsed : 0, !animate && Boolean(toss));
        render();
        if (animate && elapsed < TOSS_DURATION) frame = requestAnimationFrame(draw);
        else if (animate) complete();
      };
      frame = requestAnimationFrame(draw);
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      clearCoins();
      floor.geometry.dispose();
      floor.material.dispose();
      key.shadow.dispose();
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
