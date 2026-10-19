import { i as __toESM } from "../_runtime.mjs";
import { n as gsapWithCSS, r as require_react, t as useGSAP } from "../_libs/gsap+gsap__react+react.mjs";
import { d as require_react_dom, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as ArrowUpRight, r as Sun, t as X } from "../_libs/lucide-react.mjs";
import { t as Lenis } from "../_libs/lenis.mjs";
import { n as ScrollTrigger, t as Flip } from "../_libs/gsap.mjs";
import { a as OrthographicCamera, c as ShaderMaterial, i as Mesh, l as TextureLoader, n as LinearFilter, o as PlaneGeometry, r as LinearSRGBColorSpace, s as Scene, t as WebGLRenderer, u as Vector2 } from "../_libs/three.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-11lnT_k6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_react_dom = require_react_dom();
var AppStateContext = (0, import_react.createContext)(null);
function AppStateProvider({ children }) {
	const [theme, setTheme] = (0, import_react.useState)("dark");
	const [lenis, setLenis] = (0, import_react.useState)(null);
	const [mandateOpen, setMandateOpen] = (0, import_react.useState)(false);
	const [revealed, setRevealed] = (0, import_react.useState)(false);
	const toggleTheme = (0, import_react.useCallback)(() => {
		setTheme((current) => current === "dark" ? "day" : "dark");
	}, []);
	(0, import_react.useEffect)(() => {
		const root = document.documentElement;
		if (theme === "day") root.dataset.theme = "day";
		else delete root.dataset.theme;
	}, [theme]);
	(0, import_react.useEffect)(() => {
		document.documentElement.dataset.mandate = mandateOpen ? "open" : "closed";
	}, [mandateOpen]);
	const value = (0, import_react.useMemo)(() => ({
		theme,
		toggleTheme,
		lenis,
		setLenis,
		mandateOpen,
		setMandateOpen,
		revealed,
		setRevealed
	}), [
		theme,
		toggleTheme,
		lenis,
		mandateOpen,
		revealed
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppStateContext.Provider, {
		value,
		children
	});
}
function useAppState() {
	const value = (0, import_react.useContext)(AppStateContext);
	if (!value) throw new Error("useAppState must be used within AppStateProvider");
	return value;
}
function prefersReducedMotion() {
	return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function SmoothScroll({ children }) {
	const { setLenis } = useAppState();
	useGSAP(() => {
		if (prefersReducedMotion()) return;
		const lenis = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smoothWheel: true,
			syncTouch: false,
			wheelMultiplier: .9,
			autoRaf: false
		});
		setLenis(lenis);
		lenis.on("scroll", ScrollTrigger.update);
		const onTick = (time) => {
			lenis.raf(time * 1e3);
		};
		gsapWithCSS.ticker.add(onTick);
		gsapWithCSS.ticker.lagSmoothing(0);
		const refresh = () => ScrollTrigger.refresh();
		document.fonts?.ready.then(refresh).catch(() => void 0);
		window.addEventListener("load", refresh);
		return () => {
			window.removeEventListener("load", refresh);
			gsapWithCSS.ticker.remove(onTick);
			lenis.destroy();
			setLenis(null);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const refresh = () => ScrollTrigger.refresh();
		document.fonts?.ready.then(refresh).catch(() => void 0);
	}, []);
	return children;
}
function Cursor() {
	const ringRef = (0, import_react.useRef)(null);
	useGSAP(() => {
		const ring = ringRef.current;
		if (!ring) return;
		if (!window.matchMedia("(pointer: fine)").matches) return;
		document.documentElement.classList.add("has-cursor");
		gsapWithCSS.set(ring, {
			xPercent: -50,
			yPercent: -50,
			opacity: 0
		});
		const xTo = gsapWithCSS.quickTo(ring, "x", {
			duration: .45,
			ease: "power3.out"
		});
		const yTo = gsapWithCSS.quickTo(ring, "y", {
			duration: .45,
			ease: "power3.out"
		});
		const label = ring.querySelector(".cursor-label");
		const onMove = (event) => {
			xTo(event.clientX);
			yTo(event.clientY);
			if (ring.dataset.on !== "1") {
				ring.dataset.on = "1";
				gsapWithCSS.to(ring, {
					opacity: 1,
					duration: .35,
					ease: "power2.out"
				});
			}
		};
		const onOver = (event) => {
			const hot = (event.target instanceof Element ? event.target : null)?.closest("a, button, [data-cursor]");
			ring.classList.toggle("is-hot", Boolean(hot));
			const text = hot?.getAttribute("data-cursor-label") ?? "";
			if (label) label.textContent = text;
			ring.classList.toggle("has-label", Boolean(text));
		};
		const onLeave = () => {
			gsapWithCSS.to(ring, {
				opacity: 0,
				duration: .25
			});
			ring.dataset.on = "0";
		};
		window.addEventListener("pointermove", onMove);
		window.addEventListener("pointerover", onOver);
		document.documentElement.addEventListener("pointerleave", onLeave);
		return () => {
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerover", onOver);
			document.documentElement.removeEventListener("pointerleave", onLeave);
			document.documentElement.classList.remove("has-cursor");
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: ringRef,
		className: "cursor-ring",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "cursor-plus" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "cursor-label" })]
	});
}
function LogoMark({ className, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className,
		viewBox: "0 0 64 64",
		fill: "currentColor",
		role: title ? "img" : "presentation",
		"aria-hidden": title ? void 0 : true,
		"aria-label": title,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M31.4 29.2C22.2 24.6 11.2 20.2 2.2 23.4c4.4 3.2 9.6 4.2 14 4.6C8.4 31.4 3 37.2 5.2 43.6 12.8 38.6 21.2 35.4 28.4 36.8 21.2 40.2 14.6 47.4 17.2 53.2 23.4 47.4 29 41.6 32 37.2 31.2 34.2 30.8 31.6 31.4 29.2Z" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M32.6 29.2C41.8 24.6 52.8 20.2 61.8 23.4c-4.4 3.2-9.6 4.2-14 4.6 7.8 3.4 13.2 9.2 11 15.6-7.6-5-16-8.2-23.2-6.8 7.2 3.4 13.8 10.6 11.2 16.4-6.2-5.8-11.8-11.6-14.8-16 .8-3 1.2-5.6.8-8Z" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M26.2 26.4c-.4 9.2-.2 18.8 3.2 28.4L32 60.2l2.6-5.4c3.4-9.6 3.6-19.2 3.2-28.4-2.6 2.8-6.8 3-11.6 0Z" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M27.2 20.6c.2-4.6 4.2-7.6 7.8-5.8 2.4 1.2 3.4 3.8 2.6 6.2-1 3.2-3.8 5-7 4.8-2.6-.1-3.6-2.4-3.4-5.2Z" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M36.4 18.2 45.2 20.2 36.2 22.6Z" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M25.4 52.6 21.2 63.2 27.6 58.4 32 64 36.4 58.4 42.8 63.2 38.6 52.6Z" })
		]
	});
}
function Preloader() {
	const rootRef = (0, import_react.useRef)(null);
	const countRef = (0, import_react.useRef)(null);
	const { setRevealed } = useAppState();
	const [gone, setGone] = (0, import_react.useState)(false);
	const revealRef = (0, import_react.useRef)(setRevealed);
	revealRef.current = setRevealed;
	useGSAP(() => {
		const root = rootRef.current;
		if (!root) return;
		const reduced = prefersReducedMotion();
		const strokes = root.querySelectorAll(".logo-draw");
		const finish = () => {
			revealRef.current(true);
			if (reduced) {
				setGone(true);
				return;
			}
			gsapWithCSS.to(root, {
				yPercent: -100,
				duration: 1,
				ease: "power3.inOut",
				onComplete: () => setGone(true)
			});
		};
		if (reduced) {
			if (countRef.current) countRef.current.textContent = "100";
			finish();
			return;
		}
		if (strokes.length) gsapWithCSS.from(strokes, {
			drawSVG: 0,
			duration: 1.35,
			stagger: .07,
			ease: "expo.out"
		});
		const counter = { value: 0 };
		gsapWithCSS.to(counter, {
			value: 100,
			duration: 1.6,
			ease: "power1.inOut",
			onUpdate: () => {
				if (countRef.current) countRef.current.textContent = String(Math.round(counter.value));
			},
			onComplete: finish
		});
	}, { scope: rootRef });
	if (gone) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: rootRef,
		className: "preloader",
		role: "status",
		"aria-live": "polite",
		"aria-label": "Loading",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "preloader-mark",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, { className: "preloader-logo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				ref: countRef,
				className: "preloader-count",
				children: "0"
			})]
		})
	});
}
var heroLines = [
	{
		text: "Where every mandate",
		face: "sans",
		indent: 0
	},
	{
		text: "finds its wings",
		face: "serif",
		indent: 24
	},
	{
		text: "across one connected",
		face: "sans",
		indent: 0
	},
	{
		text: "ecosystem",
		face: "serif",
		indent: 30
	}
];
var VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
var FRAG = `
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
  vec2 anchor = vec2(0.5, 0.65);
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
function HeroRibs({ revealed }) {
	const canvasRef = (0, import_react.useRef)(null);
	const revealedRef = (0, import_react.useRef)(revealed);
	revealedRef.current = revealed;
	const [fallback, setFallback] = (0, import_react.useState)(false);
	useGSAP(() => {
		const canvas = canvasRef.current;
		if (!canvas || fallback) return;
		const reduced = prefersReducedMotion();
		let renderer;
		try {
			renderer = new WebGLRenderer({
				canvas,
				antialias: false,
				alpha: false,
				powerPreference: "high-performance"
			});
		} catch {
			setFallback(true);
			return;
		}
		if (!renderer.getContext()) {
			renderer.dispose();
			setFallback(true);
			return;
		}
		renderer.setClearColor(1118481, 1);
		renderer.outputColorSpace = LinearSRGBColorSpace;
		renderer.toneMapping = 0;
		const scene = new Scene();
		const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
		const geometry = new PlaneGeometry(2, 2);
		const uniforms = {
			uTex: { value: null },
			uRibs: { value: window.innerWidth < 760 ? 24 : 56 },
			uMouse: { value: new Vector2(.5, .48) },
			uStrength: { value: reduced ? .55 : 2.4 },
			uTime: { value: 0 },
			uZoom: { value: 1 },
			uClear: { value: reduced ? 1 : 0 },
			uPlaneAspect: { value: window.innerWidth / Math.max(window.innerHeight, 1) },
			uImageAspect: { value: 2752 / 1536 }
		};
		const material = new ShaderMaterial({
			uniforms,
			vertexShader: VERT,
			fragmentShader: FRAG,
			toneMapped: false
		});
		const mesh = new Mesh(geometry, material);
		scene.add(mesh);
		const base = { strength: reduced ? .55 : 2.4 };
		const mouse = new Vector2(.5, .48);
		const mouseTarget = new Vector2(.5, .48);
		let scrollP = 0;
		let introStarted = reduced;
		let alive = true;
		let texture = null;
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
		const onMove = (event) => {
			const rect = canvas.getBoundingClientRect();
			if (rect.width === 0 || rect.height === 0) return;
			const x = (event.clientX - rect.left) / rect.width;
			const y = 1 - (event.clientY - rect.top) / rect.height;
			const inside = x >= 0 && x <= 1 && y >= 0 && y <= 1;
			mouseTarget.set(inside ? x : -.4, inside ? y : -.4);
		};
		new TextureLoader().load("/assets/eagle-earth.png", (loaded) => {
			if (!alive) {
				loaded.dispose();
				return;
			}
			loaded.colorSpace = "";
			loaded.minFilter = LinearFilter;
			loaded.magFilter = LinearFilter;
			loaded.generateMipmaps = false;
			texture = loaded;
			uniforms.uTex.value = loaded;
			if (loaded.image?.width && loaded.image?.height) uniforms.uImageAspect.value = loaded.image.width / loaded.image.height;
			ScrollTrigger.refresh();
		}, void 0, () => {
			if (!alive) return;
		});
		const trigger = ScrollTrigger.create({
			trigger: "#hero",
			start: "top top",
			end: "bottom top",
			scrub: true,
			onUpdate: (self) => {
				scrollP = self.progress;
			}
		});
		const tick = () => {
			if (revealedRef.current && !introStarted) {
				introStarted = true;
				gsapWithCSS.to(base, {
					strength: .55,
					duration: 2.4,
					ease: "expo.out"
				});
				gsapWithCSS.to(uniforms.uClear, {
					value: 1,
					duration: 1.6,
					delay: .6,
					ease: "expo.out"
				});
			}
			mouse.lerp(mouseTarget, .08);
			uniforms.uMouse.value.copy(mouse);
			uniforms.uStrength.value = gsapWithCSS.utils.interpolate(base.strength, .2, scrollP);
			uniforms.uZoom.value = gsapWithCSS.utils.interpolate(1, 1.15, scrollP);
			if (!reduced) uniforms.uTime.value += .016;
			renderer.render(scene, camera);
		};
		gsapWithCSS.ticker.add(tick);
		window.addEventListener("resize", resize);
		window.addEventListener("pointermove", onMove);
		return () => {
			alive = false;
			gsapWithCSS.ticker.remove(tick);
			window.removeEventListener("resize", resize);
			window.removeEventListener("pointermove", onMove);
			trigger.kill();
			geometry.dispose();
			material.dispose();
			texture?.dispose();
			renderer.dispose();
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "hero-media",
		"aria-hidden": "true",
		children: [fallback ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			className: "hero-fallback",
			src: "/assets/eagle-earth.png",
			alt: ""
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref: canvasRef,
			className: "hero-canvas"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-scrim" })]
	});
}
var navLinks = [
	{
		id: "ecosystem",
		label: "Ecosystem",
		href: "#ecosystem"
	},
	{
		id: "portals",
		label: "Portals+",
		href: "#portals"
	},
	{
		id: "networks",
		label: "Networks",
		href: "#networks"
	},
	{
		id: "about",
		label: "About",
		href: "#about"
	},
	{
		id: "route",
		label: "Initiate mandate",
		href: "#route",
		cta: true
	}
];
var placeholderSections = [
	{ id: "portals" },
	{ id: "route" },
	{ id: "join" }
];
function Roll({ label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "roll",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "roll-inner",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				children: label
			})]
		})
	});
}
function SiteNav() {
	const navRef = (0, import_react.useRef)(null);
	const { lenis, theme, toggleTheme } = useAppState();
	const [active, setActive] = (0, import_react.useState)("");
	const lenisRef = (0, import_react.useRef)(lenis);
	lenisRef.current = lenis;
	const flipUnderline = (0, import_react.useRef)(null);
	const rememberUnderline = () => {
		const underline = navRef.current?.querySelector(".nav-underline");
		if (underline) flipUnderline.current = Flip.getState(underline);
	};
	useGSAP(() => {
		const nav = navRef.current;
		if (!nav) return;
		const reduced = prefersReducedMotion();
		const apply = (next) => {
			const same = nav.dataset.mode === next;
			const nodes = nav.querySelectorAll("[data-flip]");
			const state = nav.dataset.primed === "1" && !same && !reduced ? Flip.getState(nodes) : null;
			nav.dataset.mode = next;
			nav.dataset.primed = "1";
			if (state) Flip.from(state, {
				duration: .9,
				ease: "expo.out",
				absolute: true,
				nested: true,
				prune: true
			});
		};
		apply("bar");
		const morph = ScrollTrigger.create({
			trigger: "#hero",
			start: "60% top",
			onEnter: () => apply("pill"),
			onLeaveBack: () => apply("bar")
		});
		const spies = navLinks.map((link) => ScrollTrigger.create({
			trigger: `#${link.id}`,
			start: "top 60%",
			end: "bottom 45%",
			onToggle: (self) => {
				if (!self.isActive) return;
				rememberUnderline();
				setActive(link.id);
			}
		}));
		const clear = ScrollTrigger.create({
			trigger: "#hero",
			start: "top top",
			end: "bottom 70%",
			onEnterBack: () => setActive("")
		});
		return () => {
			morph.kill();
			clear.kill();
			spies.forEach((spy) => spy.kill());
		};
	}, { dependencies: [] });
	useGSAP(() => {
		const state = flipUnderline.current;
		if (!state) return;
		flipUnderline.current = null;
		if (prefersReducedMotion()) return;
		Flip.from(state, {
			duration: .55,
			ease: "expo.out",
			absolute: true
		});
	}, { dependencies: [active] });
	const onNavigate = (event, href, id) => {
		const target = document.querySelector(href);
		if (!(target instanceof HTMLElement)) return;
		event.preventDefault();
		rememberUnderline();
		setActive(id);
		if (lenisRef.current && !prefersReducedMotion()) lenisRef.current.scrollTo(target, {
			offset: 0,
			duration: 1.15
		});
		else target.scrollIntoView();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		ref: navRef,
		className: "site-nav",
		"aria-label": "Primary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: `nav-sun ${theme === "day" ? "is-day" : ""}`,
			"data-flip": true,
			onClick: toggleTheme,
			"aria-label": theme === "day" ? "Switch to dark" : "Switch to day",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { strokeWidth: 1.25 })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "nav-links",
			"data-flip": true,
			children: navLinks.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: link.href,
				"data-flip": true,
				className: `nav-link ${link.cta ? "nav-cta" : ""} ${active === link.id ? "is-active" : ""}`,
				"aria-current": active === link.id ? "true" : void 0,
				onClick: (event) => onNavigate(event, link.href, link.id),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Roll, { label: link.cta ? `${link.label} ↗` : link.label }), active === link.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "nav-underline" }) : null]
			}, link.id))
		})]
	});
}
function Hero({ revealed }) {
	const rootRef = (0, import_react.useRef)(null);
	const revealedRef = (0, import_react.useRef)(revealed);
	revealedRef.current = revealed;
	useGSAP(() => {
		const lines = gsapWithCSS.utils.toArray(".line-inner");
		if (!lines.length) return;
		if (prefersReducedMotion()) {
			gsapWithCSS.set(lines, { yPercent: 0 });
			return;
		}
		gsapWithCSS.set(lines, { yPercent: 110 });
		if (!revealed) return;
		gsapWithCSS.to(lines, {
			yPercent: 0,
			duration: 1.1,
			stagger: .12,
			ease: "expo.out",
			delay: .4
		});
	}, {
		scope: rootRef,
		dependencies: [revealed]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref: rootRef,
		id: "hero",
		className: "hero",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroRibs, { revealed }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hero-logo",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, {
					className: "hero-logo-mark",
					title: "BIG1 GLOBAL"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "hero-copy",
				children: heroLines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `line-mask indent-${line.indent}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `line-inner hero-line ${line.face === "serif" ? "serif" : ""}`,
						children: line.text
					})
				}, line.text))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {})
		]
	});
}
var aboutStatement = [
	{ text: "BIG1" },
	{ text: "GLOBAL" },
	{ text: "is" },
	{ text: "the" },
	{ text: "apex" },
	{ text: "of" },
	{ text: "one" },
	{ text: "connected" },
	{ text: "ecosystem" },
	{ text: "—" },
	{
		text: "fifteen",
		accent: true
	},
	{ text: "global" },
	{ text: "centres," },
	{
		text: "six",
		accent: true
	},
	{ text: "Indian" },
	{ text: "domestic" },
	{ text: "centres," },
	{
		text: "three",
		accent: true
	},
	{ text: "living" },
	{ text: "networks" },
	{ text: "and" },
	{
		text: "one",
		accent: true
	},
	{ text: "AI" },
	{ text: "router" },
	{ text: "that" },
	{ text: "decides" },
	{ text: "who" },
	{ text: "should" },
	{ text: "do" },
	{ text: "what," },
	{ text: "and" },
	{ text: "for" },
	{ text: "whom." }
];
var aboutInterlude = {
	lead: "Two wings.",
	accent: "One apex."
};
var principles = [
	{
		n: "01",
		title: "One apex, many specialists",
		body: ["BIG1 GLOBAL holds the centre. Specialist centres and live portals carry the work.", "A mandate stays with the people who actually practise that discipline."]
	},
	{
		n: "02",
		title: "Verified people, not just software",
		body: ["Networks are built from accredited professionals and operating businesses.", "Software routes the work. People remain accountable for it."]
	},
	{
		n: "03",
		title: "Transparent from introduction to payout",
		body: ["Introducers, professionals and clients can see how a mandate moves.", "Credit and commission follow a ledger, not a private arrangement."]
	}
];
var company = {
	name: "BIG1 GLOBAL",
	legal: "BIG1 Consultancy Services",
	hq: {
		campus: "Sushant Golf City",
		city: "Lucknow",
		region: "Uttar Pradesh, India",
		address: "2nd Floor, J2/30, Sector-J, Sushant Golf City, Amar Shaheed Path, Lucknow, UP 226030",
		email: "info@big1cs.com",
		phone: "+91 73075 35860",
		phoneHref: "tel:+917307535860"
	},
	corridors: [
		"Delaware (US)",
		"London (UK)",
		"Singapore",
		"Dubai (DIFC)",
		"GIFT City (India)"
	],
	jurisdictions: "180+",
	centresTotal: 21,
	footnote: "",
	socials: [
		{
			id: "linkedin",
			label: "LinkedIn",
			href: "https://linkedin.com/company/big1-consultancy-services"
		},
		{
			id: "x",
			label: "X",
			href: "https://x.com/BIG1CS"
		},
		{
			id: "youtube",
			label: "YouTube",
			href: "https://youtube.com/@big1cs_official"
		},
		{
			id: "instagram",
			label: "Instagram",
			href: "https://instagram.com/big1cs"
		}
	]
};
var proofPoints = [
	{
		value: 21,
		suffix: "",
		label: "Centres of Excellence"
	},
	{
		value: 180,
		suffix: "+",
		label: "Jurisdictions"
	},
	{
		value: 11,
		suffix: "",
		label: "Live portals"
	},
	{
		value: 3,
		suffix: "",
		label: "Networks"
	}
];
function About() {
	const rootRef = (0, import_react.useRef)(null);
	useGSAP(() => {
		const root = rootRef.current;
		if (!root) return;
		const reduced = prefersReducedMotion();
		const words = gsapWithCSS.utils.toArray(".scrub-word", root);
		const rules = gsapWithCSS.utils.toArray(".about-rule", root);
		const lines = gsapWithCSS.utils.toArray(".about-line", root);
		const image = root.querySelector(".interlude-img");
		const phrase = root.querySelector(".interlude-phrase");
		const nums = gsapWithCSS.utils.toArray(".stat-value", root);
		const pills = gsapWithCSS.utils.toArray(".corridor-pill", root);
		const cine = gsapWithCSS.utils.toArray("[data-cine]", root);
		const rail = root.querySelector(".about-rail-fill");
		if (reduced) {
			gsapWithCSS.set(words, { opacity: 1 });
			gsapWithCSS.set(lines, { yPercent: 0 });
			gsapWithCSS.set(rules, { scaleX: 1 });
			gsapWithCSS.set(pills, {
				autoAlpha: 1,
				y: 0
			});
			gsapWithCSS.set(cine, {
				autoAlpha: 1,
				y: 0
			});
			if (rail) gsapWithCSS.set(rail, { scaleY: 1 });
			return;
		}
		gsapWithCSS.set(lines, {
			y: 0,
			yPercent: 110
		});
		gsapWithCSS.set(rules, {
			scaleX: 0,
			transformOrigin: "left center"
		});
		gsapWithCSS.set(pills, {
			autoAlpha: 0,
			y: 16
		});
		gsapWithCSS.set(cine, {
			autoAlpha: 0,
			y: 36
		});
		gsapWithCSS.to(words, {
			opacity: 1,
			stagger: .045,
			ease: "none",
			scrollTrigger: {
				trigger: ".about-statement",
				start: "top 72%",
				end: "bottom 48%",
				scrub: true
			}
		});
		if (image) gsapWithCSS.fromTo(image, { yPercent: -8 }, {
			yPercent: 8,
			ease: "none",
			scrollTrigger: {
				trigger: ".interlude",
				start: "top bottom",
				end: "bottom top",
				scrub: true
			}
		});
		if (phrase) gsapWithCSS.from(phrase, {
			y: 28,
			autoAlpha: 0,
			duration: 1.15,
			ease: "expo.out",
			scrollTrigger: {
				trigger: ".interlude",
				start: "top 62%"
			}
		});
		gsapWithCSS.to(rules, {
			scaleX: 1,
			duration: 1.3,
			ease: "expo.out",
			stagger: .12,
			scrollTrigger: {
				trigger: ".about-numbers",
				start: "top 78%"
			}
		});
		nums.forEach((el) => {
			const target = Number(el.dataset.value || "0");
			const suffix = el.dataset.suffix || "";
			const counter = { value: 0 };
			gsapWithCSS.to(counter, {
				value: target,
				duration: 1.6,
				ease: "expo.out",
				scrollTrigger: {
					trigger: el,
					start: "top 82%",
					once: true
				},
				onUpdate: () => {
					el.textContent = `${Math.round(counter.value)}${suffix}`;
				}
			});
		});
		gsapWithCSS.to(lines, {
			y: 0,
			yPercent: 0,
			duration: 1.1,
			stagger: .08,
			ease: "expo.out",
			scrollTrigger: {
				trigger: ".principles",
				start: "top 78%"
			}
		});
		gsapWithCSS.to(cine, {
			autoAlpha: 1,
			y: 0,
			duration: 1.1,
			stagger: .08,
			ease: "expo.out",
			scrollTrigger: {
				trigger: ".principles",
				start: "top 72%"
			}
		});
		gsapWithCSS.to(pills, {
			autoAlpha: 1,
			y: 0,
			duration: .9,
			stagger: .08,
			ease: "expo.out",
			scrollTrigger: {
				trigger: ".corridors",
				start: "top 82%"
			}
		});
		const whereBits = gsapWithCSS.utils.toArray("[data-where]", root);
		gsapWithCSS.from(whereBits, {
			y: 32,
			autoAlpha: 0,
			duration: 1.05,
			stagger: .1,
			ease: "expo.out",
			scrollTrigger: {
				trigger: ".where",
				start: "top 80%"
			}
		});
		if (rail) gsapWithCSS.fromTo(rail, { scaleY: 0 }, {
			scaleY: 1,
			ease: "none",
			scrollTrigger: {
				trigger: root,
				start: "top 70%",
				end: "bottom 80%",
				scrub: true
			}
		});
	}, { scope: rootRef });
	const dash = aboutStatement.findIndex((word) => word.text === "—");
	const headingWords = dash === -1 ? aboutStatement : aboutStatement.slice(0, dash);
	const bodyWords = dash === -1 ? [] : aboutStatement.slice(dash + 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref: rootRef,
		id: "about",
		className: "about",
		"aria-label": "About",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "about-rail",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "about-rail-fill" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "about-wrap about-statement",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "about-heading",
					children: headingWords.map((word, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: `scrub-word${word.accent ? " accent serif" : ""}`,
						children: [word.text, " "]
					}, `${word.text}-${index}`))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "about-prose",
					children: bodyWords.map((word, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: `scrub-word${word.accent ? " accent serif" : ""}`,
						children: [word.text, " "]
					}, `${word.text}-${index}`))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "interlude",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "interlude-img",
						src: "/assets/eagle-earth.png",
						alt: "",
						draggable: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "interlude-ribs",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "interlude-scrim",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "interlude-phrase",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "serif",
								children: aboutInterlude.lead
							}),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "serif accent",
								children: aboutInterlude.accent
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "about-wrap about-rest",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "about-numbers",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "about-rule" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "stat-row",
								children: proofPoints.map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "stat",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "stat-value",
											"data-value": point.value,
											"data-suffix": point.suffix,
											"aria-hidden": "true",
											children: ["0", point.suffix]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "sr-only",
											children: [
												point.value,
												point.suffix,
												" ",
												point.label
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "stat-label",
											children: point.label
										})
									]
								}, point.label))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "about-rule" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "about-note",
								children: company.footnote
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "principles",
						children: principles.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "principle",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "principle-head",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "principle-n",
									"data-cine": true,
									children: item.n
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "principle-title",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "line-mask",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "about-line serif",
											children: item.title
										})
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "principle-body",
								children: item.body.map((sentence) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-cine": true,
									children: sentence
								}, sentence))
							})]
						}, item.n))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "where",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "where-main",
							"data-where": true,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "where-title",
									children: ["Where we ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "serif",
										children: "operate"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "where-address",
									children: company.hq.address
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "where-links",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										className: "text-link",
										href: `mailto:${company.hq.email}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Roll, { label: company.hq.email })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										className: "text-link",
										href: company.hq.phoneHref,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Roll, { label: company.hq.phone })
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "corridors",
							"data-where": true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "where-kicker",
								children: "Corridors"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "corridor-row",
								children: company.corridors.map((corridor) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "corridor-pill",
									children: corridor
								}, corridor))
							})]
						})]
					})
				]
			})
		]
	});
}
var audiences = [
	{
		id: "founder",
		label: "Founder",
		nodes: [
			"apex",
			"wing-india",
			"big1cs",
			"setup",
			"compliance",
			"cat-governance",
			"ben",
			"pen",
			"thalmux"
		],
		centres: ["COE-01", "COE-02"],
		caption: "Start with **Setup** → **Compliance**, delivered by **PEN**, routed by **THALMUX**.",
		firstPortal: "setup"
	},
	{
		id: "msme",
		label: "MSME / business owner",
		nodes: [
			"apex",
			"wing-india",
			"big1cs",
			"compliance",
			"assurance",
			"advisory",
			"cat-capital",
			"ben",
			"pen",
			"thalmux"
		],
		centres: ["COE-04"],
		caption: "Start with **Compliance**, **Assurance** and **Advisory**, delivered by **PEN**, routed by **THALMUX**.",
		firstPortal: "compliance"
	},
	{
		id: "global",
		label: "Global corporate",
		nodes: [
			"apex",
			"wing-global",
			"wing-india",
			"big1cs",
			"compliance",
			"assurance",
			"diligence",
			"cat-governance",
			"cat-strategy",
			"cat-frontier",
			"ben",
			"pen",
			"thalmux"
		],
		centres: [
			"COE-02",
			"COE-14",
			"COE-11",
			"COE-13"
		],
		caption: "Both wings — **Compliance**, **Assurance**, **Diligence** — through **BEN** and **PEN**, routed by **THALMUX**.",
		firstPortal: "compliance"
	},
	{
		id: "family",
		label: "Family office",
		nodes: [
			"apex",
			"wing-global",
			"wing-india",
			"big1cs",
			"wealth",
			"advisory",
			"cat-wealth",
			"cat-governance",
			"cat-capital",
			"ben",
			"pen",
			"can",
			"thalmux"
		],
		centres: [
			"COE-07",
			"COE-02",
			"COE-05"
		],
		caption: "Start with **Wealth** and **Advisory**, through **BEN**, **PEN** and **CAN**, routed by **THALMUX**.",
		firstPortal: "wealth"
	},
	{
		id: "professional",
		label: "CA / CPA / CS / lawyer",
		nodes: ["pen", "thalmux"],
		centres: [],
		caption: "Enter through **PEN**. The work you carry is routed by **THALMUX**.",
		firstPortal: "pen"
	},
	{
		id: "partner",
		label: "Introducer / partner",
		nodes: ["can", "thalmux"],
		centres: [],
		caption: "Enter through **CAN**. Origination is ledgered, then routed by **THALMUX**.",
		firstPortal: "can"
	}
];
var coeCategories = [
	{
		id: "governance",
		title: "Governance & Tax",
		centreIds: [
			"COE-01",
			"COE-02",
			"COE-15"
		]
	},
	{
		id: "capital",
		title: "Capital & Turnaround",
		centreIds: [
			"COE-04",
			"COE-05",
			"COE-06"
		]
	},
	{
		id: "wealth",
		title: "Wealth & Risk",
		centreIds: [
			"COE-03",
			"COE-07",
			"COE-08"
		]
	},
	{
		id: "frontier",
		title: "Frontier & Technology",
		centreIds: [
			"COE-09",
			"COE-10",
			"COE-13"
		]
	},
	{
		id: "strategy",
		title: "Strategy & Trade",
		centreIds: [
			"COE-11",
			"COE-12",
			"COE-14"
		]
	}
];
var globalCentres = [
	{
		id: "COE-01",
		code: "01",
		label: "Statutory & Compliance",
		plainTitle: "Global Company Governance & Filings",
		summary: "Cross-border entity governance, statutory filings and company-secretarial coordination.",
		stats: ["180+ jurisdictions", "Filings per mandate"],
		category: "governance",
		bridges: ["setup", "compliance"]
	},
	{
		id: "COE-02",
		code: "02",
		label: "International Taxation",
		plainTitle: "Cross-Border Taxes & Treaties",
		summary: "Treaty analysis, withholding positions and cross-border tax structuring support.",
		stats: ["94 DTAAs", "Treaty positions"],
		category: "governance",
		bridges: ["setup"]
	},
	{
		id: "COE-03",
		code: "03",
		label: "Risk Assurance & Forensic",
		plainTitle: "Global Audits & Fraud Investigation",
		summary: "Audit, forensic review and fraud investigation scoped to the engagement letter.",
		stats: ["450+ cases", "Forensic reviews"],
		category: "wealth",
		bridges: ["assurance", "diligence"]
	},
	{
		id: "COE-04",
		code: "04",
		label: "Corporate Finance",
		plainTitle: "Cross-Border M&A & Valuations",
		summary: "Buy-side and sell-side support, valuation and transaction structuring across borders.",
		stats: ["$8.4B+ advised", "Transaction support"],
		category: "capital",
		bridges: ["advisory"]
	},
	{
		id: "COE-05",
		code: "05",
		label: "Capital Markets & Securities",
		plainTitle: "Global IPOs & Institutional Funds",
		summary: "Listing readiness, fund formation context and institutional capital-markets support.",
		stats: ["42 offerings", "Capital markets"],
		category: "capital",
		bridges: ["advisory"]
	},
	{
		id: "COE-06",
		code: "06",
		label: "Insolvency & Restructuring",
		plainTitle: "Turnarounds & Debt Restructuring",
		summary: "Distress review, creditor coordination and restructuring options for stressed mandates.",
		stats: ["78% turnaround rate", "Restructuring"],
		category: "capital",
		bridges: []
	},
	{
		id: "COE-07",
		code: "07",
		label: "Private Wealth & Estate",
		plainTitle: "Family Offices & Global Trusts",
		summary: "Family-office governance, trust structuring context and multi-generational wealth planning.",
		stats: ["115+ family offices", "Private wealth"],
		category: "wealth",
		bridges: ["wealth"]
	},
	{
		id: "COE-08",
		code: "08",
		label: "Crisis Management",
		plainTitle: "Emergency Defense & Cyber Response",
		summary: "Rapid response coordination for crisis, incident and cyber-defence mandates.",
		stats: ["<45 min response", "Crisis desk"],
		category: "wealth",
		bridges: []
	},
	{
		id: "COE-09",
		code: "09",
		label: "Digital Assets & AI",
		plainTitle: "AI Compliance & Web3 Licensing",
		summary: "Licensing, policy and compliance context for AI systems and digital-asset activity.",
		stats: ["260+ AI protocols", "Digital assets"],
		category: "frontier",
		bridges: []
	},
	{
		id: "COE-10",
		code: "10",
		label: "Frontier Tech & Automation",
		plainTitle: "Patents, Robotics & R&D Tax Cash",
		summary: "Patent strategy context, robotics programmes and R&D incentive identification.",
		stats: ["1,400+ patents", "R&D incentives"],
		category: "frontier",
		bridges: []
	},
	{
		id: "COE-11",
		code: "11",
		label: "Energy, Sustainability & ESG",
		plainTitle: "Carbon Credits & Green Finance",
		summary: "Carbon, sustainability reporting and green-finance structuring support.",
		stats: ["$2.3B green bonds", "ESG finance"],
		category: "strategy",
		bridges: ["assurance"]
	},
	{
		id: "COE-12",
		code: "12",
		label: "Public Policy & Strategy",
		plainTitle: "Government Affairs & Trade Deals",
		summary: "Public-policy context, trade-agreement reading and government-affairs coordination.",
		stats: ["38 FTAs", "Trade policy"],
		category: "strategy",
		bridges: []
	},
	{
		id: "COE-13",
		code: "13",
		label: "Digital Transformation",
		plainTitle: "Cloud ERP & AI Modernization",
		summary: "ERP, cloud and AI modernisation programmes tied to operating-model change.",
		stats: ["180+ ERP deployments", "Modernisation"],
		category: "frontier",
		bridges: ["compliance"]
	},
	{
		id: "COE-14",
		code: "14",
		label: "Supply Chain & Logistics",
		plainTitle: "Customs Duties & Global Shipping Law",
		summary: "Customs classification, duties and shipping-law support for cross-border goods.",
		stats: ["75,000+ customs entries", "Trade compliance"],
		category: "strategy",
		bridges: ["diligence"]
	},
	{
		id: "COE-15",
		code: "15",
		label: "Research & Thought Leadership",
		plainTitle: "Macro Intelligence & Market Benchmarks",
		summary: "Market benchmarks and macro intelligence briefs prepared for a specific mandate.",
		stats: ["320+ reports", "Market intelligence"],
		category: "governance",
		bridges: []
	}
];
function centresIn(categoryId) {
	return globalCentres.filter((centre) => centre.category === categoryId);
}
var portals = [
	{
		id: "big1cs",
		name: "BIG1CS",
		url: "https://big1cs.com",
		group: "india",
		groupLabel: "Wing 02 · India",
		glyph: "big1cs",
		tagline: "India hub",
		description: "India's six Centres of Excellence for setup, compliance, wealth, assurance, advisory and diligence. Headquartered in Lucknow.",
		color: "#22D3EE"
	},
	{
		id: "setup",
		name: "CoE Setup",
		url: "https://setup.big1cs.com",
		group: "india",
		groupLabel: "Wing 02 · India",
		glyph: "setup",
		tagline: "Formation",
		description: "Business formation, company incorporation, startup registration and foundational structuring.",
		color: "#22D3EE"
	},
	{
		id: "compliance",
		name: "CoE Compliance",
		url: "https://compliance.big1cs.com",
		group: "india",
		groupLabel: "Wing 02 · India",
		glyph: "compliance",
		tagline: "Statutory filing",
		description: "GST and income-tax filing, ROC/MCA compliance and related statutory filing support.",
		color: "#22D3EE"
	},
	{
		id: "wealth",
		name: "CoE Wealth",
		url: "https://wealth.big1cs.com",
		group: "india",
		groupLabel: "Wing 02 · India",
		glyph: "wealth",
		tagline: "Wealth planning",
		description: "Personal and business wealth planning and structuring.",
		color: "#22D3EE"
	},
	{
		id: "assurance",
		name: "CoE Assurance",
		url: "https://assurance.big1cs.com",
		group: "india",
		groupLabel: "Wing 02 · India",
		glyph: "assurance",
		tagline: "Assurance",
		description: "Audit, review and assurance engagements based on the agreed scope.",
		color: "#22D3EE"
	},
	{
		id: "advisory",
		name: "CoE Advisory",
		url: "https://advisory.big1cs.com",
		group: "india",
		groupLabel: "Wing 02 · India",
		glyph: "advisory",
		tagline: "Strategy",
		description: "Management consulting, business strategy, organisational change and market planning.",
		color: "#22D3EE"
	},
	{
		id: "diligence",
		name: "CoE Diligence",
		url: "https://diligence.big1cs.com",
		group: "india",
		groupLabel: "Wing 02 · India",
		glyph: "diligence",
		tagline: "Verification",
		description: "Due diligence, verification, field work, recovery support and valuation.",
		color: "#22D3EE"
	},
	{
		id: "ben",
		name: "BEN",
		url: "https://ben.big1cs.com",
		group: "network",
		groupLabel: "Network string",
		glyph: "ben",
		tagline: "Business Excellence Network",
		description: "Connecting business leaders, founders, CXOs and enterprises across India and the global ecosystem. 14,200+ businesses.",
		color: "#3B82F6"
	},
	{
		id: "pen",
		name: "PEN",
		url: "https://pen.big1cs.com",
		group: "network",
		groupLabel: "Network string",
		glyph: "pen",
		tagline: "Professional Excellence Network",
		description: "India's professional ecosystem for startup acceleration, governance, wealth creation, due diligence and strategic advisory. 2,850+ verified experts.",
		color: "#8B5CF6"
	},
	{
		id: "can",
		name: "CAN",
		url: "https://can.big1cs.com",
		group: "network",
		groupLabel: "Network string",
		glyph: "can",
		tagline: "Client Acquisition Network",
		description: "The channel-partner and introducer network with a transparent mandate-origination ledger. Up to 25% commission.",
		color: "#10B981"
	},
	{
		id: "thalmux",
		name: "THALMUX™",
		url: "https://www.thalmux.com",
		group: "ai",
		groupLabel: "AI core",
		glyph: "thalmux",
		tagline: "AI engine",
		description: "The AI engine that reads a scenario and routes it to the right centres, professionals and partners.",
		color: "#F5B83D"
	}
];
var bridges = {
	setup: ["COE-01", "COE-02"],
	compliance: ["COE-13", "COE-01"],
	wealth: ["COE-07"],
	assurance: ["COE-03", "COE-11"],
	advisory: ["COE-04", "COE-05"],
	diligence: ["COE-03", "COE-14"]
};
function Frame({ children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 64 64",
		fill: "none",
		"aria-hidden": "true",
		...props,
		children
	});
}
var stroke = {
	stroke: "currentColor",
	strokeWidth: 1.25,
	strokeLinecap: "round",
	strokeLinejoin: "round"
};
function GlyphBig1cs(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, {
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "32",
			cy: "32",
			r: "7",
			...stroke
		}), Array.from({ length: 8 }).map((_, index) => {
			const angle = Math.PI / 4 * index;
			const x1 = 32 + Math.cos(angle) * 12;
			const y1 = 32 + Math.sin(angle) * 12;
			const x2 = 32 + Math.cos(angle) * 22;
			const y2 = 32 + Math.sin(angle) * 22;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1,
				y1,
				x2,
				y2,
				...stroke
			}, index);
		})]
	});
}
function GlyphSetup(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M32 8 L38 26 L56 32 L38 38 L32 56 L26 38 L8 32 L26 26 Z",
			...stroke
		})
	});
}
function GlyphCompliance(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, {
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "16",
			y: "16",
			width: "32",
			height: "32",
			rx: "2",
			...stroke
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "16",
			y: "16",
			width: "32",
			height: "32",
			rx: "2",
			transform: "rotate(20 32 32)",
			...stroke
		})]
	});
}
function GlyphWealth(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, {
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M32 8 L50 32 L32 56 L14 32 Z",
			...stroke
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M32 18 L42 32 L32 46 L22 32 Z",
			...stroke
		})]
	});
}
function GlyphAssurance(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, {
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M8 32 C18 18 46 18 56 32 C46 46 18 46 8 32 Z",
			...stroke
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "32",
			cy: "32",
			r: "6",
			...stroke
		})]
	});
}
function GlyphAdvisory(props) {
	const petals = Array.from({ length: 8 });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
		...props,
		children: petals.map((_, index) => {
			const angle = Math.PI / 4 * index;
			const cx = 32 + Math.cos(angle) * 12;
			const cy = 32 + Math.sin(angle) * 12;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx,
				cy,
				r: "6.5",
				...stroke
			}, index);
		})
	});
}
function GlyphDiligence(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, {
		...props,
		children: [Array.from({ length: 8 }).map((_, index) => {
			const angle = Math.PI / 8 * index;
			const x2 = 32 + Math.cos(angle) * 22;
			const y2 = 32 + Math.sin(angle) * 22;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "32",
				y1: "32",
				x2,
				y2,
				...stroke
			}, index);
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "32",
			cy: "32",
			r: "3",
			...stroke
		})]
	});
}
function GlyphBen(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, {
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "24",
				cy: "32",
				r: "10",
				...stroke
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "40",
				cy: "32",
				r: "10",
				...stroke
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "32",
				cy: "22",
				r: "10",
				...stroke
			})
		]
	});
}
function GlyphPen(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, {
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M32 8 L50 18 L50 38 L32 48 L14 38 L14 18 Z",
			...stroke
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M32 18 L42 24 L42 36 L32 42 L22 36 L22 24 Z",
			...stroke
		})]
	});
}
function GlyphCan(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, {
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M12 24 L32 12 L52 24",
				...stroke
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M16 34 L32 24 L48 34",
				...stroke
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M20 44 L32 36 L44 44",
				...stroke
			})
		]
	});
}
function GlyphThalmux(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, {
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "32",
				cy: "32",
				r: "20",
				...stroke
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M32 14 L46 42 H18 Z",
				...stroke
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "32",
				cy: "32",
				r: "2.5",
				fill: "currentColor",
				stroke: "none"
			})
		]
	});
}
var glyphMap = {
	big1cs: GlyphBig1cs,
	setup: GlyphSetup,
	compliance: GlyphCompliance,
	wealth: GlyphWealth,
	assurance: GlyphAssurance,
	advisory: GlyphAdvisory,
	diligence: GlyphDiligence,
	ben: GlyphBen,
	pen: GlyphPen,
	can: GlyphCan,
	thalmux: GlyphThalmux
};
function PortalGlyph({ id, className }) {
	const Glyph = glyphMap[id];
	if (!Glyph) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Glyph, { className });
}
function CentreDrawer({ centre, onClose, onBridge }) {
	const panelRef = (0, import_react.useRef)(null);
	const closeRef = (0, import_react.useRef)(null);
	const { lenis } = useAppState();
	const open = Boolean(centre);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
		document.body.style.overflow = "hidden";
		lenis?.stop();
		closeRef.current?.focus();
		const onKey = (event) => {
			if (event.key === "Escape") {
				event.preventDefault();
				onClose();
				return;
			}
			if (event.key !== "Tab" || !panelRef.current) return;
			const nodes = [...panelRef.current.querySelectorAll("a, button")].filter((node) => !node.hasAttribute("disabled"));
			if (!nodes.length) return;
			const first = nodes[0];
			const last = nodes[nodes.length - 1];
			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		};
		window.addEventListener("keydown", onKey);
		return () => {
			window.removeEventListener("keydown", onKey);
			document.body.style.overflow = "";
			lenis?.start();
			previous?.focus();
		};
	}, [
		open,
		lenis,
		onClose
	]);
	useGSAP(() => {
		if (!centre || !panelRef.current) return;
		const stats = panelRef.current.querySelectorAll(".drawer-stat-value");
		if (prefersReducedMotion()) return;
		stats.forEach((el) => {
			const match = (el.dataset.raw || "").match(/^(\d[\d,]*)(.*)$/);
			if (!match) return;
			const target = Number(match[1].replace(/,/g, ""));
			const suffix = match[2] || "";
			const counter = { value: 0 };
			gsapWithCSS.to(counter, {
				value: target,
				duration: 1.3,
				ease: "expo.out",
				onUpdate: () => {
					el.textContent = `${Math.round(counter.value).toLocaleString("en-US")}${suffix}`;
				}
			});
		});
	}, {
		dependencies: [centre?.id],
		scope: panelRef
	});
	if (!centre || typeof document === "undefined") return null;
	const category = coeCategories.find((item) => item.id === centre.category);
	const linked = centre.bridges.map((id) => portals.find((portal) => portal.id === id)).filter((portal) => portal != null);
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "drawer-root",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "drawer-backdrop",
			"aria-label": "Close centre details",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: panelRef,
			className: "drawer",
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "centre-drawer-title",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					ref: closeRef,
					type: "button",
					className: "drawer-close",
					onClick: onClose,
					"aria-label": "Close",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "drawer-code",
					children: centre.id
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "centre-drawer-title",
					className: "drawer-title",
					children: centre.plainTitle
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "drawer-label",
					children: centre.label
				}),
				category ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "drawer-cat",
					children: category.title
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "drawer-summary",
					children: centre.summary
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "drawer-stats",
					children: centre.stats.map((stat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "drawer-stat-value",
						"data-raw": stat,
						children: stat
					}) }, stat))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "drawer-bridges",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "where-kicker",
						children: "Bridges to"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "corridor-row",
						children: linked.length ? linked.map((portal) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mini-pill",
							onClick: () => onBridge(portal.id),
							children: portal.name
						}, portal.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "drawer-empty",
							children: "Informational centre — no domestic portal link."
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					className: "pill pill-gold drawer-cta",
					href: "#route",
					onClick: (event) => {
						event.preventDefault();
						onClose();
						document.getElementById("route")?.scrollIntoView({ behavior: "smooth" });
					},
					children: ["Start a mandate", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
						className: "pill-arrow",
						"aria-hidden": "true"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "about-note",
					children: company.footnote
				})
			]
		})]
	}), document.body);
}
function elbow(a, b, radius = 22) {
	const dx = b.x - a.x;
	const dy = b.y - a.y;
	if (Math.hypot(dx, dy) < 4) return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
	if (Math.abs(dx) < 2 || Math.abs(dy) < 2) return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} L ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
	const dirX = dx >= 0 ? 1 : -1;
	const dirY = dy >= 0 ? 1 : -1;
	const midY = a.y + dy / 2;
	const r = Math.min(radius, Math.abs(dx) / 2, Math.abs(dy) / 2);
	if (r < 1) return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} L ${a.x.toFixed(1)} ${midY.toFixed(1)} L ${b.x.toFixed(1)} ${midY.toFixed(1)} L ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
	const y1 = midY - dirY * r;
	const x1 = a.x + dirX * r;
	const x2 = b.x - dirX * r;
	const y2 = midY + dirY * r;
	return [
		`M ${a.x.toFixed(1)} ${a.y.toFixed(1)}`,
		`L ${a.x.toFixed(1)} ${y1.toFixed(1)}`,
		`Q ${a.x.toFixed(1)} ${midY.toFixed(1)} ${x1.toFixed(1)} ${midY.toFixed(1)}`,
		`L ${x2.toFixed(1)} ${midY.toFixed(1)}`,
		`Q ${b.x.toFixed(1)} ${midY.toFixed(1)} ${b.x.toFixed(1)} ${y2.toFixed(1)}`,
		`L ${b.x.toFixed(1)} ${b.y.toFixed(1)}`
	].join(" ");
}
var GOLD = "#F5B83D";
var INDIA = "#22D3EE";
var BEN = "#3B82F6";
var PEN = "#8B5CF6";
var CAN = "#10B981";
function buildEdges() {
	const edges = [
		{
			from: "apex",
			to: "wing-global",
			color: GOLD,
			kind: "main"
		},
		{
			from: "apex",
			to: "wing-india",
			color: INDIA,
			kind: "main"
		},
		{
			from: "wing-india",
			to: "big1cs",
			color: INDIA,
			kind: "main"
		},
		{
			from: "spine-left",
			to: "wing-global",
			color: "rgba(245,243,238,0.55)",
			kind: "spine",
			fromSide: "top",
			toSide: "bottom"
		},
		{
			from: "spine-right",
			to: "wing-india",
			color: "rgba(245,243,238,0.55)",
			kind: "spine",
			fromSide: "top",
			toSide: "bottom"
		},
		{
			from: "ben",
			to: "thalmux",
			color: BEN,
			kind: "tail"
		},
		{
			from: "pen",
			to: "thalmux",
			color: PEN,
			kind: "tail"
		},
		{
			from: "can",
			to: "thalmux",
			color: CAN,
			kind: "tail"
		}
	];
	coeCategories.forEach((category) => {
		edges.push({
			from: "wing-global",
			to: `cat-${category.id}`,
			color: GOLD,
			kind: "main"
		});
	});
	portals.forEach((portal) => {
		if (portal.group === "india" && portal.id !== "big1cs") edges.push({
			from: "big1cs",
			to: portal.id,
			color: INDIA,
			kind: "main"
		});
	});
	const seen = /* @__PURE__ */ new Set();
	Object.entries(bridges).forEach(([portalId, codes]) => {
		codes.forEach((code) => {
			const centre = globalCentres.find((item) => item.id === code);
			if (!centre) return;
			const to = `cat-${centre.category}`;
			const key = `${portalId}->${to}`;
			if (seen.has(key)) return;
			seen.add(key);
			edges.push({
				from: portalId,
				to,
				color: "rgba(245,243,238,0.42)",
				kind: "bridge",
				centres: codes.filter((id) => globalCentres.find((item) => item.id === id)?.category === centre.category),
				fromSide: "left",
				toSide: "right"
			});
		});
	});
	return edges;
}
function anchor(stage, el, side, index, count) {
	const rect = el.getBoundingClientRect();
	let x = rect.left + rect.width / 2;
	let y = rect.top + rect.height / 2;
	if (side === "top") y = rect.top;
	if (side === "bottom") y = rect.bottom;
	if (side === "left") x = rect.left;
	if (side === "right") x = rect.right;
	if ((side === "top" || side === "bottom") && count > 1) {
		const spread = Math.min(rect.width * .7, 240);
		const t = index / (count - 1);
		x = rect.left + (rect.width - spread) / 2 + spread * t;
	}
	if ((side === "left" || side === "right") && count > 1) {
		const spread = Math.min(rect.height * .55, 90);
		const t = index / (count - 1);
		y = rect.top + (rect.height - spread) / 2 + spread * t;
	}
	return {
		x: x - stage.left,
		y: y - stage.top
	};
}
function measure(stage) {
	const stageRect = stage.getBoundingClientRect();
	const edges = buildEdges();
	const groups = /* @__PURE__ */ new Map();
	edges.forEach((edge) => {
		const key = `${edge.from}:${edge.fromSide || "bottom"}`;
		const list = groups.get(key) ?? [];
		list.push(edge);
		groups.set(key, list);
	});
	const wires = [];
	groups.forEach((list) => {
		list.forEach((edge, index) => {
			const fromEl = stage.querySelector(`[data-node="${edge.from}"]`);
			const toEl = stage.querySelector(`[data-node="${edge.to}"]`);
			if (!fromEl || !toEl) return;
			const fromSide = edge.fromSide ?? "bottom";
			const toSide = edge.toSide ?? "top";
			const start = anchor(stageRect, fromEl, fromSide, index, list.length);
			const end = anchor(stageRect, toEl, toSide, 0, 1);
			wires.push({
				id: `${edge.kind}-${edge.from}-${edge.to}`,
				d: elbow(start, end),
				color: edge.color,
				kind: edge.kind,
				from: edge.from,
				to: edge.to,
				centres: edge.centres ?? []
			});
		});
	});
	return wires;
}
function Rich({ text }) {
	return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => part.startsWith("**") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
		className: "serif",
		children: part.slice(2, -2)
	}, index) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: part }, index));
}
function CatMark({ index }) {
	const rot = index * 15;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: "glyph-svg",
		viewBox: "0 0 64 64",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "32",
			cy: "32",
			r: "5",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.25"
		}), [
			0,
			90,
			180,
			270
		].map((angle) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M32 8 L37 24 H27 Z",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.25",
			transform: `rotate(${rot + angle} 32 32)`
		}, angle))]
	});
}
function nodeOn(active, id) {
	return Boolean(active?.has(id));
}
function FlightMap() {
	const rootRef = (0, import_react.useRef)(null);
	const stageRef = (0, import_react.useRef)(null);
	const travellerRef = (0, import_react.useRef)(null);
	const sigRef = (0, import_react.useRef)("");
	const [wires, setWires] = (0, import_react.useState)([]);
	const [box, setBox] = (0, import_react.useState)({
		w: 1,
		h: 1
	});
	const [audience, setAudience] = (0, import_react.useState)(null);
	const [hot, setHot] = (0, import_react.useState)("");
	const [centre, setCentre] = (0, import_react.useState)(null);
	const [pulse, setPulse] = (0, import_react.useState)("");
	const [globalOpen, setGlobalOpen] = (0, import_react.useState)(true);
	const [indiaOpen, setIndiaOpen] = (0, import_react.useState)(true);
	const active = audience ? new Set(audience.nodes) : null;
	if (active && (active.has("ben") || active.has("pen") || active.has("can"))) {
		if (active.has("wing-global")) active.add("spine-left");
		if (active.has("wing-india")) active.add("spine-right");
	}
	const centreSet = audience ? new Set(audience.centres) : null;
	const motionKey = `${box.w}x${Math.round(box.h / 8)}:${wires.length}:${globalOpen}:${indiaOpen}`;
	(0, import_react.useLayoutEffect)(() => {
		const stage = stageRef.current;
		if (!stage) return;
		const run = () => {
			const desktop = window.matchMedia("(min-width: 1100px)").matches;
			const sig = `${stage.clientWidth}|${desktop ? 1 : 0}|${globalOpen}|${indiaOpen}`;
			if (sig === sigRef.current) return;
			sigRef.current = sig;
			const next = measure(stage);
			const w = Math.max(1, stage.offsetWidth);
			const h = Math.max(1, stage.offsetHeight);
			setBox((prev) => prev.w === w && Math.abs(prev.h - h) < 8 ? prev : {
				w,
				h
			});
			setWires((prev) => {
				if (prev.length === next.length && prev.every((wire, index) => wire.d === next[index]?.d && wire.id === next[index]?.id)) return prev;
				return next;
			});
		};
		sigRef.current = "";
		run();
		const onResize = () => {
			sigRef.current = "";
			run();
		};
		window.addEventListener("resize", onResize);
		document.fonts?.ready.then(onResize).catch(() => void 0);
		return () => {
			window.removeEventListener("resize", onResize);
		};
	}, [globalOpen, indiaOpen]);
	useGSAP(() => {
		const lines = gsapWithCSS.utils.toArray(".map-line");
		if (!lines.length) return;
		if (prefersReducedMotion()) {
			gsapWithCSS.set(lines, { yPercent: 0 });
			return;
		}
		gsapWithCSS.set(lines, { yPercent: 110 });
		gsapWithCSS.to(lines, {
			yPercent: 0,
			duration: 1.1,
			stagger: .1,
			ease: "expo.out",
			scrollTrigger: {
				trigger: ".map-lead",
				start: "top 78%"
			}
		});
		gsapWithCSS.from(".map-sub", {
			y: 20,
			autoAlpha: 0,
			duration: 1,
			ease: "expo.out",
			delay: .15,
			scrollTrigger: {
				trigger: ".map-lead",
				start: "top 78%"
			}
		});
	}, { scope: rootRef });
	useGSAP(() => {
		const stage = stageRef.current;
		if (!stage || !wires.length) return;
		const reduced = prefersReducedMotion();
		const desktop = window.matchMedia("(min-width: 1100px)").matches;
		const cards = gsapWithCSS.utils.toArray(".map-card", stage);
		const drawn = gsapWithCSS.utils.toArray(".map-wire-draw", stage);
		const dashed = gsapWithCSS.utils.toArray(".map-wire-dashed", stage);
		const rule = stage.querySelector(".spine-rule");
		if (reduced) {
			gsapWithCSS.set(cards, {
				autoAlpha: 1,
				y: 0
			});
			gsapWithCSS.set(drawn, { drawSVG: "100%" });
			gsapWithCSS.set(dashed, { autoAlpha: 1 });
			if (rule) gsapWithCSS.set(rule, { scaleX: 1 });
			return;
		}
		cards.forEach((card) => {
			gsapWithCSS.from(card, {
				y: 42,
				autoAlpha: 0,
				duration: 1.05,
				ease: "expo.out",
				scrollTrigger: {
					trigger: card,
					start: "top 88%",
					toggleActions: "play none none none"
				}
			});
		});
		if (rule) gsapWithCSS.fromTo(rule, { scaleX: 0 }, {
			scaleX: 1,
			ease: "none",
			scrollTrigger: {
				trigger: "#networks",
				start: "top 80%",
				end: "top 40%",
				scrub: true
			}
		});
		const rail = stage.querySelector(".rail-fill");
		if (rail && !desktop) gsapWithCSS.fromTo(rail, { scaleY: 0 }, {
			scaleY: 1,
			ease: "none",
			scrollTrigger: {
				trigger: stage,
				start: "top 70%",
				end: "bottom 80%",
				scrub: true
			}
		});
		if (!desktop) return;
		drawn.forEach((path) => {
			const targetId = path.dataset.to;
			const target = targetId ? stage.querySelector(`[data-node="${targetId}"]`) : stage;
			gsapWithCSS.fromTo(path, { drawSVG: 0 }, {
				drawSVG: "100%",
				duration: 1.25,
				ease: "expo.out",
				scrollTrigger: {
					trigger: target,
					start: "top 86%",
					toggleActions: "play none none none"
				},
				onComplete: () => {
					const flow = path.nextElementSibling;
					if (flow) gsapWithCSS.set(flow, { autoAlpha: 1 });
				}
			});
		});
		dashed.forEach((path) => {
			const targetId = path.dataset.to;
			const target = targetId ? stage.querySelector(`[data-node="${targetId}"]`) : stage;
			gsapWithCSS.fromTo(path, { autoAlpha: 0 }, {
				autoAlpha: 1,
				duration: .8,
				ease: "expo.out",
				scrollTrigger: {
					trigger: target,
					start: "top 84%",
					toggleActions: "play none none none"
				}
			});
		});
	}, {
		scope: rootRef,
		dependencies: [motionKey]
	});
	(0, import_react.useEffect)(() => {
		const dot = travellerRef.current;
		const stage = stageRef.current;
		if (!dot || !stage) return;
		if (!audience) {
			gsapWithCSS.set(dot, { autoAlpha: 0 });
			return;
		}
		const nodes = audience.nodes.map((id) => stage.querySelector(`[data-node="${id}"]`)).filter((node) => Boolean(node));
		const origin = stage.getBoundingClientRect();
		const reduced = prefersReducedMotion();
		const timeline = gsapWithCSS.timeline();
		gsapWithCSS.set(dot, { autoAlpha: 1 });
		nodes.forEach((node, index) => {
			const rect = node.getBoundingClientRect();
			const x = rect.left + rect.width / 2 - origin.left;
			const y = rect.top + rect.height / 2 - origin.top;
			if (reduced) {
				if (index === nodes.length - 1) gsapWithCSS.set(dot, {
					x,
					y
				});
				return;
			}
			timeline.to(dot, {
				x,
				y,
				duration: .45,
				ease: "power2.inOut"
			}, index * .14);
		});
		return () => {
			timeline.kill();
		};
	}, [audience, motionKey]);
	(0, import_react.useEffect)(() => {
		if (!pulse) return;
		const timer = window.setTimeout(() => setPulse(""), 1800);
		return () => window.clearTimeout(timer);
	}, [pulse]);
	const india = portals.filter((portal) => portal.group === "india" && portal.id !== "big1cs");
	const networks = portals.filter((portal) => portal.group === "network");
	const thalmux = portals.find((portal) => portal.id === "thalmux");
	const hub = portals.find((portal) => portal.id === "big1cs");
	const first = audience ? portals.find((portal) => portal.id === audience.firstPortal) : null;
	const onStageKey = (event) => {
		const key = event.key;
		if (![
			"ArrowLeft",
			"ArrowRight",
			"ArrowUp",
			"ArrowDown"
		].includes(key)) return;
		const stage = stageRef.current;
		if (!stage) return;
		const cards = [...stage.querySelectorAll("[data-card]")];
		const current = document.activeElement instanceof HTMLElement ? document.activeElement.closest("[data-card]") : null;
		const index = current ? cards.indexOf(current) : -1;
		if (index < 0) return;
		event.preventDefault();
		const cols = window.innerWidth >= 1100 ? 2 : 1;
		let next = index;
		if (key === "ArrowRight") next = index + 1;
		if (key === "ArrowLeft") next = index - 1;
		if (key === "ArrowDown") next = index + cols;
		if (key === "ArrowUp") next = Math.max(0, index - cols);
		const card = cards[(next + cards.length) % cards.length];
		(card.matches("a, button") ? card : card.querySelector("a, button") ?? card).focus();
	};
	const closeCentre = (0, import_react.useCallback)(() => setCentre(null), []);
	const jumpToPortal = (0, import_react.useCallback)((id) => {
		setCentre(null);
		window.setTimeout(() => {
			(stageRef.current?.querySelector(`[data-node="${id}"]`))?.scrollIntoView({
				behavior: prefersReducedMotion() ? "auto" : "smooth",
				block: "center"
			});
			setPulse(id);
		}, 40);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref: rootRef,
		id: "ecosystem",
		className: "flight-map night-lock",
		"data-pathed": audience ? "1" : "0",
		"data-hot": hot,
		onMouseOver: (event) => {
			const target = event.target instanceof Element ? event.target : null;
			const centreId = target?.closest("[data-centre]")?.getAttribute("data-centre");
			const node = target?.closest("[data-node]")?.getAttribute("data-node");
			const next = centreId || node || "";
			setHot((current) => current === next ? current : next);
		},
		onMouseLeave: () => setHot(""),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "about-wrap map-lead",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "map-title",
					id: "map-title",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "line-mask",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "map-line",
							children: [
								"The ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: "serif",
									children: "ecosystem"
								}),
								", mapped."
							]
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "map-sub",
					children: "Everything under BIG1 GLOBAL, and how it connects."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "finder",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "finder-row",
					role: "group",
					"aria-label": "I am a…",
					children: [audiences.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: `finder-chip${audience?.id === item.id ? " is-on" : ""}`,
						"aria-pressed": audience?.id === item.id,
						onClick: () => setAudience((current) => current?.id === item.id ? null : item),
						children: item.label
					}, item.id)), audience ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "finder-chip finder-reset",
						onClick: () => setAudience(null),
						children: "Reset"
					}) : null]
				}), audience && first ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "finder-caption",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rich, { text: audience.caption }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						className: "pill pill-gold",
						href: first.url,
						target: "_blank",
						rel: "noopener noreferrer",
						"data-cursor-label": "OPEN",
						children: [
							"Open ",
							first.name,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
								className: "pill-arrow",
								"aria-hidden": "true"
							})
						]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "finder-hint",
					children: "I am a… choose a path and the chart lights the route."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: stageRef,
				className: "map-stage",
				onKeyDown: onStageKey,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rail-fill",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						className: "map-wires",
						viewBox: `0 0 ${box.w} ${box.h}`,
						width: box.w,
						height: box.h,
						"aria-hidden": "true",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("filter", {
							id: "soft-dot",
							x: "-80%",
							y: "-80%",
							width: "260%",
							height: "260%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feGaussianBlur", { stdDeviation: "1.5" })
						}) }), wires.map((wire) => {
							const lit = wire.kind === "bridge" ? Boolean(active?.has(wire.from) && (active.has(wire.to) || wire.centres.some((id) => centreSet?.has(id)))) : Boolean(active?.has(wire.from) && active.has(wire.to));
							const bridgeHot = wire.kind === "bridge" && (hot === wire.from || hot === wire.to || wire.centres.includes(hot));
							const draw = wire.kind === "main" || wire.kind === "tail";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: wire.d,
								className: `map-wire is-${wire.kind} ${draw ? "map-wire-draw" : "map-wire-dashed"}${lit ? " is-lit" : ""}${bridgeHot ? " is-hot" : ""}`,
								"data-from": wire.from,
								"data-to": wire.to,
								stroke: wire.color
							}), draw ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: wire.d,
								className: `map-wire-flow${lit ? " is-lit" : ""}`,
								stroke: wire.color
							}) : null] }, wire.id);
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						ref: travellerRef,
						className: "traveller",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
						className: `map-card apex${nodeOn(active, "apex") ? " is-lit" : ""}`,
						"data-card": true,
						"data-node": "apex",
						tabIndex: 0,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "map-card-face apex-face",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "medallion",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, { className: "medallion-mark" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "map-kicker gold",
									children: "Head"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "BIG1 GLOBAL" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "map-desc",
									children: "Apex of the ecosystem"
								})
							] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
						className: `map-card wing${nodeOn(active, "wing-global") ? " is-lit" : ""}`,
						"data-card": true,
						"data-node": "wing-global",
						"data-group": "global",
						tabIndex: 0,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "map-card-face",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "map-kicker gold",
									children: "Wing 01 · International"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "15 Global Centres" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "map-desc",
									children: "The international wing. Informational programmes, opened here — not a separate site."
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
						className: `map-card wing${nodeOn(active, "wing-india") ? " is-lit" : ""}`,
						"data-card": true,
						"data-node": "wing-india",
						"data-group": "india",
						tabIndex: 0,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "map-card-face",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "map-kicker india",
									children: "Wing 02 · BIG1CS India"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "6 Domestic Centres" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "map-desc",
									children: "The India wing. BIG1CS and six live centres, each a portal of its own."
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `fold fold-global${globalOpen ? "" : " is-shut"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "fold-toggle",
							"aria-expanded": globalOpen,
							onClick: () => setGlobalOpen((open) => !open),
							children: globalOpen ? "Hide global centres" : "Show 15 global centres"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "fold-body cat-grid",
							children: coeCategories.map((category, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
								className: `map-card cat-card${nodeOn(active, `cat-${category.id}`) ? " is-lit" : ""}`,
								"data-card": true,
								"data-node": `cat-${category.id}`,
								"data-group": "global",
								tabIndex: 0,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "map-card-face",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "glyph-tile gold",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CatMark, { index })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "map-kicker gold",
											children: "Global programme"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: category.title }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mini-row",
											children: centresIn(category.id).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												className: `mini-pill${centreSet?.has(item.id) ? " is-lit" : ""}`,
												"data-centre": item.id,
												"data-cursor-label": "OPEN",
												onClick: () => setCentre(item),
												children: [
													item.id,
													" ",
													item.label
												]
											}, item.id))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "text-btn",
											onClick: () => setCentre(centresIn(category.id)[0] ?? null),
											children: "Explore centre"
										})
									]
								})
							}, category.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `fold fold-india${indiaOpen ? "" : " is-shut"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "fold-toggle",
							"aria-expanded": indiaOpen,
							onClick: () => setIndiaOpen((open) => !open),
							children: indiaOpen ? "Hide domestic portals" : "Show domestic portals"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "fold-body india-stack",
							children: [hub ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalCard, {
								portal: hub,
								node: "big1cs",
								lit: nodeOn(active, "big1cs"),
								pulse: pulse === "big1cs",
								featured: true
							}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "portal-grid",
								children: india.map((portal) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalCard, {
									portal,
									lit: nodeOn(active, portal.id),
									pulse: pulse === portal.id,
									compact: true
								}, portal.id))
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						id: "networks",
						className: "spine",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "spine-anchor",
								"data-node": "spine-left",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "spine-anchor right",
								"data-node": "spine-right",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "spine-rule",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "spine-caption serif",
								children: "runs through every centre"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "spine-grid",
								children: networks.map((portal) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalCard, {
									portal,
									lit: nodeOn(active, portal.id),
									pulse: pulse === portal.id,
									spine: true
								}, portal.id))
							})
						]
					}),
					thalmux ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "tail",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalCard, {
								portal: thalmux,
								lit: nodeOn(active, "thalmux"),
								pulse: pulse === "thalmux",
								featured: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "tail-caption",
								children: "Routes every mandate"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "tail-line",
								children: "Mandate routed → Professionals assigned → Partner credited → Intelligence delivered"
							})
						]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
				className: "sr-only",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["BIG1 GLOBAL, apex", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Wing 01 International, 15 global centres", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { children: coeCategories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						category.title,
						": ",
						category.centreIds.join(", ")
					] }, category.id)) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Wing 02 BIG1CS India", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "BIG1CS" }), india.map((portal) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: portal.name }, portal.id))] })] })] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Spine: BEN, PEN, CAN" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "THALMUX routes every mandate" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CentreDrawer, {
				centre,
				onClose: closeCentre,
				onBridge: jumpToPortal
			})
		]
	});
}
function PortalCard({ portal, lit, pulse, compact, featured, spine, node }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		className: `map-card portal-card${compact ? " is-compact" : ""}${featured ? " is-featured" : ""}${spine ? " is-spine" : ""}${lit ? " is-lit" : ""}${pulse ? " is-pulse" : ""}`,
		"data-card": true,
		"data-node": node ?? portal.id,
		"data-group": portal.group,
		href: portal.url,
		target: "_blank",
		rel: "noopener noreferrer",
		"data-cursor-label": "OPEN",
		style: { "--card": portal.color },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "map-card-face",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "glyph-tile",
				style: { color: portal.color },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalGlyph, {
					id: portal.glyph,
					className: "glyph-svg"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "portal-copy",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "map-kicker",
						style: { color: portal.color },
						children: portal.groupLabel
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: portal.name }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "map-desc",
						children: compact ? portal.tagline : portal.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "pill",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Roll, { label: "Visit portal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
							className: "pill-arrow",
							"aria-hidden": "true"
						})]
					})
				]
			})]
		})
	});
}
function Placeholders() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [placeholderSections.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: section.id,
		className: "anchor-section",
		"aria-label": section.id
	}, section.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		id: "footer",
		className: "anchor-section anchor-footer"
	})] });
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppStateProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Experience, {}) });
}
function Experience() {
	const { revealed } = useAppState();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SmoothScroll, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cursor, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Preloader, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, { revealed }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(About, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlightMap, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Placeholders, {})
		] })
	] });
}
//#endregion
export { Home as component };
