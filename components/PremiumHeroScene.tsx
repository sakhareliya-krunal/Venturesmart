"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type SceneItem = {
  src: string;
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  rotation: number;
};

const sceneItems: SceneItem[] = [
  {
    src: "/products/toys-blocks.jpg",
    x: -1.65,
    y: 0.48,
    z: 0.15,
    width: 1.5,
    height: 1.5,
    rotation: -0.18
  },
  {
    src: "/products/lunch-box/everyday-lunchbox-set/01.jpg",
    x: 0.28,
    y: 0.05,
    z: 0.55,
    width: 1.75,
    height: 1.75,
    rotation: 0.08
  },
  {
    src: "/products/toys-kitchen.jpg",
    x: 1.55,
    y: 0.72,
    z: -0.12,
    width: 1.35,
    height: 1.35,
    rotation: 0.2
  },
  {
    src: "/products/toys-plush.jpg",
    x: -0.06,
    y: -0.98,
    z: -0.24,
    width: 1.18,
    height: 1.18,
    rotation: -0.1
  }
];

export function PremiumHeroScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.08, 7.2);

    const group = new THREE.Group();
    scene.add(group);

    const ambientLight = new THREE.AmbientLight(0xffffff, 2.1);
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
    keyLight.position.set(2.8, 4.2, 5.5);
    scene.add(ambientLight, keyLight);

    const textureLoader = new THREE.TextureLoader();
    const meshes: THREE.Mesh[] = [];
    const cards: THREE.Group[] = [];

    const createCard = (item: SceneItem, index: number) => {
      const card = new THREE.Group();
      card.position.set(item.x, item.y, item.z);
      card.rotation.z = item.rotation;
      card.userData = {
        baseX: item.x,
        baseY: item.y,
        baseZ: item.z,
        index
      };

      const shadow = new THREE.Mesh(
        new THREE.PlaneGeometry(item.width + 0.18, item.height + 0.18),
        new THREE.MeshBasicMaterial({
          color: 0x03152f,
          opacity: 0.16,
          transparent: true
        })
      );
      shadow.position.set(0.12, -0.12, -0.04);

      const texture = textureLoader.load(item.src);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

      const image = new THREE.Mesh(
        new THREE.PlaneGeometry(item.width, item.height),
        new THREE.MeshBasicMaterial({
          map: texture,
          toneMapped: false
        })
      );

      const frame = new THREE.Mesh(
        new THREE.BoxGeometry(item.width + 0.1, item.height + 0.1, 0.07),
        new THREE.MeshStandardMaterial({
          color: 0xffffff,
          metalness: 0.08,
          roughness: 0.34
        })
      );
      frame.position.z = -0.08;

      card.add(shadow, frame, image);
      group.add(card);
      cards.push(card);
      meshes.push(shadow, image, frame);
    };

    sceneItems.forEach(createCard);

    const platform = new THREE.Mesh(
      new THREE.CylinderGeometry(2.55, 2.85, 0.16, 80),
      new THREE.MeshStandardMaterial({
        color: 0xf7f9fc,
        metalness: 0.18,
        roughness: 0.28
      })
    );
    platform.position.set(0.1, -1.78, -0.38);
    platform.scale.z = 0.28;
    group.add(platform);
    meshes.push(platform);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.34, 0.018, 12, 96),
      new THREE.MeshBasicMaterial({
        color: 0xf5b942,
        opacity: 0.45,
        transparent: true
      })
    );
    ring.position.set(0.1, -1.67, -0.34);
    ring.rotation.x = Math.PI / 2;
    group.add(ring);
    meshes.push(ring);

    const accentDots = [-1.9, -0.82, 1.16, 2.02].map((x, index) => {
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(index === 1 ? 0.06 : 0.045, 20, 20),
        new THREE.MeshStandardMaterial({
          color: index === 2 ? 0xe3062e : 0xf5b942,
          metalness: 0.2,
          roughness: 0.22
        })
      );
      dot.position.set(x, index % 2 === 0 ? 1.42 : -1.18, -0.2 - index * 0.08);
      group.add(dot);
      meshes.push(dot);
      return dot;
    });

    const pointer = new THREE.Vector2(0, 0);
    const targetPointer = new THREE.Vector2(0, 0);

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / Math.max(clientHeight, 1);
      camera.position.z = clientWidth < 700 ? 8.2 : 7.2;
      group.scale.setScalar(clientWidth < 700 ? 0.82 : 1);
      camera.updateProjectionMatrix();
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetPointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      targetPointer.y = -(((event.clientY - rect.top) / rect.height - 0.5) * 2);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    canvas.addEventListener("pointermove", handlePointerMove);
    resize();

    let animationFrame = 0;
    const clock = new THREE.Clock();

    const render = () => {
      const elapsed = clock.getElapsedTime();
      pointer.lerp(targetPointer, 0.045);

      if (!prefersReducedMotion) {
        group.rotation.y = pointer.x * 0.09 + Math.sin(elapsed * 0.26) * 0.025;
        group.rotation.x = pointer.y * 0.045;

        cards.forEach((card) => {
          const index = Number(card.userData.index);
          card.position.y = Number(card.userData.baseY) + Math.sin(elapsed * 0.7 + index) * 0.075;
          card.rotation.y = pointer.x * 0.08 + Math.sin(elapsed * 0.38 + index) * 0.035;
          card.rotation.x = pointer.y * 0.055;
        });

        accentDots.forEach((dot, index) => {
          dot.position.y += Math.sin(elapsed + index) * 0.0009;
        });
      }

      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      canvas.removeEventListener("pointermove", handlePointerMove);
      resizeObserver.disconnect();

      meshes.forEach((mesh) => {
        mesh.geometry.dispose();
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        materials.forEach((material) => {
          const mappedMaterial = material as THREE.Material & { map?: THREE.Texture | null };

          if (mappedMaterial.map) {
            mappedMaterial.map.dispose();
          }
          mappedMaterial.dispose();
        });
      });

      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="premium-hero-canvas" aria-hidden="true" />;
}
