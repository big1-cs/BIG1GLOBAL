import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

const VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FRAG = `
uniform sampler2D uTex;
uniform float uRibs;
uniform vec2 uMouse;
uniform float uStrength;
uniform float uTime;
uniform float uZoom;
uniform float uClear;
uniform float uPlaneAspect;
uniform float uImageAspect;
varying vec2 vUv;

vec2 coverUv(vec2 uv) {
  vec2 r = vec2(1.0);
  if (uPlaneAspect > uImageAspect) {
    r.y = uImageAspect / uPlaneAspect;
  } else {
    r.x = uPlaneAspect / uImageAspect;
  }
  vec2 anchor = vec2(0.5, 0.5);
  float zoom = 1.12 * uZoom;
  return (uv - anchor) * (r / zoom) + anchor;
}

void main() {
  vec2 uv = vUv;
  float f = fract(uv.x * uRibs) - 0.5;
  float dist = distance(uv, uMouse);
  float falloff = mix(1.0, smoothstep(0.0, 0.32, dist), uClear);
  float strength = uStrength * falloff;

  vec2 p = coverUv(uv);
  p.x += f * (0.9 / max(uRibs, 1.0)) * strength;
  p.y += sin(floor(uv.x * uRibs) * 1.7 + uTime * 0.4) * 0.012 * strength;

  float chroma = 0.0014 * strength;
  vec3 col;
  col.r = texture2D(uTex, p + vec2(chroma, 0.0)).r;
  col.g = texture2D(uTex, p).g;
  col.b = texture2D(uTex, p - vec2(chroma, 0.0)).b;

  float shade = 0.8 + 0.35 * (1.0 - abs(f) * 2.0);
  float edge = mix(1.0, 0.58, smoothstep(0.22, 0.5, abs(f)));
  float rib = shade * edge;
  col *= mix(1.0, rib, clamp(strength, 0.0, 1.0));

  float sweep = fract(uTime * 0.035);
  float band = exp(-pow((uv.x - sweep) * 8.5, 2.0));
  col += vec3(0.961, 0.722, 0.239) * band * 0.14 * clamp(strength, 0.0, 1.15);

  float vig = smoothstep(1.12, 0.28, length((uv - 0.5) * vec2(1.05, 1.18)));
  col *= mix(0.72, 1.0, vig);

  vec3 bg = vec3(0.0667, 0.0667, 0.0667);
  float bottom = smoothstep(0.4, 0.0, uv.y);
  col = mix(col, bg, bottom * 0.9);
  float top = smoothstep(0.8, 1.0, uv.y);
  col = mix(col, col * 0.78 + bg * 0.22, top);

  if (p.x < 0.0 || p.y < 0.0 || p.x > 1.0 || p.y > 1.0) {
    col = bg;
  }

  gl_FragColor = vec4(col, 1.0);
}
`;

type HeroRibsProps = {
  revealed: boolean;
};

export function HeroRibs({ revealed }: HeroRibsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const revealedRef = useRef(revealed);
  revealedRef.current = revealed;
  const [fallback, setFallback] = useState(false);

  useGSAP(() => {
    const canvas = canvasRef.current;
    if (!canvas || fallback || !revealed) return;

    const reduced = prefersReducedMotion();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
      });
    } catch {
      setFallback(true);
      return;
    }

    const gl = renderer.getContext();
    if (!gl) {
      renderer.dispose();
      setFallback(true);
      return;
    }

    renderer.setClearColor(0x111111, 1);
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);
    const uniforms = {
      uTex: { value: null as THREE.Texture | null },
      uRibs: { value: window.innerWidth < 760 ? 24 : 56 },
      uMouse: { value: new THREE.Vector2(0.5, 0.48) },
      uStrength: { value: reduced ? 0.55 : 2.4 },
      uTime: { value: 0 },
      uZoom: { value: 1 },
      uClear: { value: reduced ? 1 : 0 },
      uPlaneAspect: { value: window.innerWidth / Math.max(window.innerHeight, 1) },
      uImageAspect: { value: 2752 / 1536 },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERT,
      fragmentShader: FRAG,
      toneMapped: false,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const base = { strength: reduced ? 0.55 : 2.4 };
    const mouse = new THREE.Vector2(0.5, 0.48);
    const mouseTarget = new THREE.Vector2(0.5, 0.48);
    let scrollP = 0;
    let introStarted = reduced;
    let alive = true;
    let texture: THREE.Texture | null = null;

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, width < 760 ? 1.25 : 1.5);
      renderer.setPixelRatio(dpr);
      renderer.setSize(width, height, false);
      uniforms.uPlaneAspect.value = width / Math.max(height, 1);
      uniforms.uRibs.value = width < 760 ? 24 : 56;
    };
    resize();

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const x = (event.clientX - rect.left) / rect.width;
      const y = 1 - (event.clientY - rect.top) / rect.height;
      const inside = x >= 0 && x <= 1 && y >= 0 && y <= 1;
      mouseTarget.set(inside ? x : -0.4, inside ? y : -0.4);
    };

    const loader = new THREE.TextureLoader();
    loader.load(
      "/assets/world-people.png",
      (loaded) => {
        if (!alive) {
          loaded.dispose();
          return;
        }
        loaded.colorSpace = THREE.NoColorSpace;
        loaded.minFilter = THREE.LinearFilter;
        loaded.magFilter = THREE.LinearFilter;
        loaded.generateMipmaps = false;
        texture = loaded;
        uniforms.uTex.value = loaded;
        if (loaded.image?.width && loaded.image?.height) {
          uniforms.uImageAspect.value = loaded.image.width / loaded.image.height;
        }
        ScrollTrigger.refresh();
      },
      undefined,
      () => {
        if (!alive) return;
      },
    );

    const trigger = ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        scrollP = self.progress;
      },
    });

    const tick = () => {
      if (revealedRef.current && !introStarted) {
        introStarted = true;
        gsap.to(base, {
          strength: 0.55,
          duration: 2.4,
          ease: "expo.out",
        });
        gsap.to(uniforms.uClear, {
          value: 1,
          duration: 1.6,
          delay: 0.6,
          ease: "expo.out",
        });
      }

      mouse.lerp(mouseTarget, 0.08);
      uniforms.uMouse.value.copy(mouse);
      uniforms.uStrength.value = gsap.utils.interpolate(base.strength, 0.2, scrollP);
      uniforms.uZoom.value = gsap.utils.interpolate(1, 1.15, scrollP);
      if (!reduced) uniforms.uTime.value += 0.016;
      renderer.render(scene, camera);
    };

    gsap.ticker.add(tick);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);

    return () => {
      alive = false;
      gsap.ticker.remove(tick);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      trigger.kill();
      geometry.dispose();
      material.dispose();
      texture?.dispose();
      renderer.dispose();
    };
  }, [revealed, fallback]);

  return (
    <div className="hero-media" aria-hidden="true">
      {fallback ? (
        <img className="hero-fallback" src="/assets/world-people.png" alt="" />
      ) : (
        <canvas ref={canvasRef} className="hero-canvas" />
      )}
      <div className="hero-scrim" />
    </div>
  );
}
