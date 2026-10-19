import { i as __toESM } from "../_runtime.mjs";
import { n as gsapWithCSS, r as require_react, t as useGSAP } from "../_libs/gsap+gsap__react+react.mjs";
import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as ScrollTrigger } from "../_libs/gsap.mjs";
import { t as prefersReducedMotion } from "./motion-BNlVN8Le.mjs";
import { d as Scene, h as TorusGeometry, l as PerspectiveCamera, n as Clock, o as Mesh, p as SphereGeometry, r as IcosahedronGeometry, s as MeshBasicMaterial, t as WebGLRenderer } from "../_libs/three.mjs";
import { t as Lenis } from "../_libs/lenis.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-C6_78XCX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AboutField() {
	const host = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = host.current;
		if (!el) return;
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const renderer = new WebGLRenderer({
			antialias: true,
			alpha: true
		});
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
		renderer.setClearColor(0, 0);
		el.appendChild(renderer.domElement);
		const scene = new Scene();
		const camera = new PerspectiveCamera(32, 1, .1, 40);
		camera.position.set(0, .15, 8.2);
		const core = new Mesh(new IcosahedronGeometry(.78, 1), new MeshBasicMaterial({
			color: 16103485,
			wireframe: true
		}));
		const heart = new Mesh(new SphereGeometry(.26, 24, 24), new MeshBasicMaterial({ color: 16103485 }));
		const india = new Mesh(new TorusGeometry(1.85, .014, 12, 90, Math.PI * 1.2), new MeshBasicMaterial({ color: 2282478 }));
		india.rotation.z = 1.15;
		const world = new Mesh(new TorusGeometry(1.85, .014, 12, 90, Math.PI * 1.2), new MeshBasicMaterial({ color: 16103485 }));
		world.rotation.z = -1.15;
		world.rotation.y = Math.PI;
		const orbit = new Mesh(new TorusGeometry(2.45, .006, 8, 140), new MeshBasicMaterial({
			color: 16118766,
			transparent: true,
			opacity: .28
		}));
		orbit.rotation.x = 1.15;
		const nodeGeo = new SphereGeometry(.075, 16, 16);
		const nodes = [
			3900150,
			9133302,
			1096065
		].map((color) => new Mesh(nodeGeo, new MeshBasicMaterial({ color })));
		scene.add(core, heart, india, world, orbit, ...nodes);
		let frame = 0;
		let aimX = 0;
		let aimY = 0;
		const onMove = (event) => {
			const box = el.getBoundingClientRect();
			aimX = ((event.clientX - box.left) / box.width - .5) * .7;
			aimY = ((event.clientY - box.top) / box.height - .5) * .45;
		};
		const resize = () => {
			const width = el.clientWidth || 320;
			const height = el.clientHeight || 420;
			renderer.setSize(width, height, false);
			camera.aspect = width / Math.max(height, 1);
			camera.updateProjectionMatrix();
		};
		const clock = new Clock();
		const tick = () => {
			const time = clock.getElapsedTime();
			if (!reduced) {
				core.rotation.y = time * .22;
				core.rotation.x = time * .07;
				orbit.rotation.z = time * .1;
				india.rotation.y = Math.sin(time * .45) * .18;
				world.rotation.y = Math.PI + Math.sin(time * .45 + .6) * .18;
				nodes.forEach((node, index) => {
					const angle = time * .42 + index * Math.PI * 2 / 3;
					node.position.set(Math.cos(angle) * 2.45, Math.sin(angle * .65) * .38, Math.sin(angle) * 2.45);
				});
				camera.position.x += (aimX * 1.1 - camera.position.x) * .05;
				camera.position.y += (.15 - aimY * .7 - camera.position.y) * .05;
				camera.lookAt(0, 0, 0);
			}
			renderer.render(scene, camera);
			frame = requestAnimationFrame(tick);
		};
		resize();
		const observer = new ResizeObserver(resize);
		observer.observe(el);
		el.addEventListener("pointermove", onMove);
		tick();
		return () => {
			cancelAnimationFrame(frame);
			observer.disconnect();
			el.removeEventListener("pointermove", onMove);
			const geometries = /* @__PURE__ */ new Set();
			const materials = /* @__PURE__ */ new Set();
			scene.traverse((object) => {
				if (object instanceof Mesh) {
					geometries.add(object.geometry);
					const material = object.material;
					if (Array.isArray(material)) material.forEach((item) => materials.add(item));
					else materials.add(material);
				}
			});
			geometries.forEach((geometry) => geometry.dispose());
			materials.forEach((material) => material.dispose());
			renderer.dispose();
			renderer.domElement.remove();
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "apage-field",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: host,
			className: "apage-field-canvas"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "apage-field-key",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "is-cs" }), " BIG1CS"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "is-core" }), " THALMUX"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "is-gc" }), " BIG1GC"] })
			]
		})]
	});
}
function AboutScroll({ children }) {
	const root = (0, import_react.useRef)(null);
	useGSAP(() => {
		if (prefersReducedMotion()) return;
		const lenis = new Lenis({
			duration: 1.15,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smoothWheel: true,
			syncTouch: false,
			wheelMultiplier: .9,
			autoRaf: false
		});
		lenis.on("scroll", ScrollTrigger.update);
		const onTick = (time) => lenis.raf(time * 1e3);
		gsapWithCSS.ticker.add(onTick);
		gsapWithCSS.ticker.lagSmoothing(0);
		gsapWithCSS.from(".apage-hero-copy > *", {
			y: 32,
			autoAlpha: 0,
			duration: 1.15,
			stagger: .1,
			ease: "expo.out"
		});
		gsapWithCSS.from(".apage-field", {
			autoAlpha: 0,
			scale: .94,
			duration: 1.4,
			ease: "expo.out"
		});
		gsapWithCSS.to(".apage-progress span", {
			scaleY: 1,
			ease: "none",
			scrollTrigger: {
				trigger: root.current,
				start: "top top",
				end: "bottom bottom",
				scrub: true
			}
		});
		gsapWithCSS.utils.toArray("[data-reveal]").forEach((item) => {
			gsapWithCSS.from(item, {
				y: 36,
				autoAlpha: 0,
				duration: 1.05,
				ease: "expo.out",
				immediateRender: false,
				clearProps: "transform",
				scrollTrigger: {
					trigger: item,
					start: "top 88%"
				}
			});
		});
		const glow = root.current?.querySelector(".apage-glow");
		const grid = root.current?.querySelector(".apage-grid");
		const xTo = glow ? gsapWithCSS.quickTo(glow, "x", {
			duration: .55,
			ease: "power3.out"
		}) : null;
		const yTo = glow ? gsapWithCSS.quickTo(glow, "y", {
			duration: .55,
			ease: "power3.out"
		}) : null;
		const onMove = (event) => {
			xTo?.(event.clientX);
			yTo?.(event.clientY);
			if (grid) {
				grid.style.setProperty("--gx", `${event.clientX}px`);
				grid.style.setProperty("--gy", `${event.clientY}px`);
			}
		};
		window.addEventListener("pointermove", onMove);
		gsapWithCSS.fromTo(".apage-traveller", {
			y: 0,
			rotation: 0
		}, {
			y: () => Math.max(window.innerHeight * 3.2, 1200),
			rotation: 260,
			ease: "none",
			scrollTrigger: {
				trigger: root.current,
				start: "top top",
				end: "bottom bottom",
				scrub: 1
			}
		});
		gsapWithCSS.from(".apage-table tbody tr", {
			y: 20,
			autoAlpha: 0,
			stagger: .07,
			duration: .8,
			ease: "expo.out",
			immediateRender: false,
			scrollTrigger: {
				trigger: ".apage-table",
				start: "top 82%"
			}
		});
		return () => {
			window.removeEventListener("pointermove", onMove);
			gsapWithCSS.ticker.remove(onTick);
			lenis.destroy();
		};
	}, { scope: root });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: root,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "apage-grid",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "apage-glow",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "apage-traveller",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					viewBox: "0 0 160 160",
					fill: "none",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "80",
							cy: "80",
							r: "58",
							stroke: "rgba(245,243,238,0.35)",
							strokeWidth: "1"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M80 18 A62 62 0 0 0 80 142",
							stroke: "#22d3ee",
							strokeWidth: "1.4"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M80 18 A62 62 0 0 1 80 142",
							stroke: "#f5b83d",
							strokeWidth: "1.4"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "80",
							cy: "80",
							r: "10",
							stroke: "#f5b83d",
							strokeWidth: "1.2"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "80",
							cy: "80",
							r: "3",
							fill: "#f5b83d"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "apage-progress",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
			}),
			children
		]
	});
}
var wings = [
	[
		"Strategic Mandate",
		"The Sovereign Domestic Consulting Wing",
		"The Sovereign International Consulting Wing"
	],
	[
		"Target Jurisdiction",
		"Pan-India (Bharat)",
		"Global Markets (Americas, EMEA, APAC & Cross-Border)"
	],
	[
		"Core Clientele",
		"Indian Startups, High-Growth MSMEs, Domestic Corporates & Large Enterprises",
		"International Corporations, Overseas Founders, Global SMEs & Institutional Investors"
	],
	[
		"Primary Focus",
		"Indian Regulatory Compliance, Domestic Taxation, Corporate Law, MSME Scaling, Strategic Finance & Brand Transformation",
		"Cross-Border Advisory, International Structuring, Global Financial Modeling, Market Entry, Offshore Operations & Digital Transformation"
	],
	[
		"Operating Engine",
		"Powered by THALMUX & Executed via PEN / CAN / BEN",
		"Powered by THALMUX & Executed via PEN / CAN / BEN"
	]
];
var coes = [
	["Strategic Finance & Corporate Governance", "Advanced ratio and DuPont analysis, cash flow modeling, iXBRL standardization, valuation, and cross-jurisdictional compliance."],
	["Enterprise Technology & AI Automation", "Full-stack cloud architecture, custom enterprise applications, and low-code/AI operational pipelines that eliminate manual business bottlenecks."],
	["Corporate Branding & Market Influence", "High-authority brand ecosystems, strategic communication frameworks, and omnichannel market positioning for domestic and global audiences."],
	["Real-Economy & Industrial Advisory", "End-to-end operational consulting across manufacturing, supply chain modernization, agricultural processing, and consumer goods."]
];
var networks = [
	[
		"CAN",
		"Client Acquisition Network",
		"The Outreach & Growth Layer",
		"A structured, data-driven outreach and market expansion architecture. CAN connects domestic Indian enterprises with BIG1CS and bridges international corporations and overseas founders directly to BIG1GC."
	],
	[
		"PEN",
		"Professional Excellence Network",
		"The Elite Execution Layer",
		"A curated global alliance of Chartered Accountants, Certified Public Accountants, Company Secretaries, Financial Analysts, Legal Strategists, and Technology Architects. Operating under strict institutional benchmarks, PEN executes complex domestic mandates for BIG1CS and cross-border engagements for BIG1GC with zero friction."
	],
	[
		"BEN",
		"Business Excellence Network",
		"The Ecosystem & Community Layer",
		"A premier leadership and enterprise community that unites domestic and international founders, Managing Directors, CXOs, and institutional pioneers—fostering cross-border alliances, peer intelligence, capital access, and long-term strategic transformation."
	]
];
var pillars = [
	["Dual-Market Mastery", "Unmatched local depth in Indian corporate law, finance, and MSME scaling via BIG1CS, paired with seamless international advisory and cross-border execution via BIG1GC."],
	["Institutional Rigor for Every Enterprise", "Delivering Fortune-500 strategic clarity and financial precision to startups, MSMEs, and large conglomerates alike."],
	["Intelligence-First Execution", "Replacing traditional consultancy delays with THALMUX-driven automation, real-time analytics, and standardized governance."],
	["End-to-End Ownership", "Bridging the gap between boardroom strategy and real-world execution across finance, compliance, technology, and brand influence."]
];
var faqs = [
	["What is BIG1 Global and how is it structured?", "BIG1 Global is an integrated corporate conglomerate and multi-layered consulting ecosystem headquartered in India with a global operational footprint. It operates through two primary consulting wings—BIG1CS (Big1 Consultancy Services) for the domestic Indian market and BIG1GC (Big1 Global Consulting) for international markets—both unified by the proprietary THALMUX intelligence engine and executed through the CAN, PEN, and BEN networks."],
	["What is the difference between BIG1CS and BIG1GC?", "BIG1CS (Big1 Consultancy Services) serves Indian businesses, including startups, MSMEs, and large domestic enterprises, focusing on Indian corporate law, taxation, regulatory compliance, financial modeling, and domestic scale. BIG1GC (Big1 Global Consulting) serves global businesses and overseas clients, providing international corporate strategy, cross-border structuring, global financial advisory, market-entry consulting, and offshore digital and operational execution."],
	["What is THALMUX and how does it support BIG1CS and BIG1GC?", "THALMUX is the proprietary central intelligence layer and internal operating system of BIG1 Global. It acts as the shared backbone for both BIG1CS and BIG1GC, coordinating specialized Centres of Excellence and synchronizing the CAN (Client Acquisition Network), PEN (Professional Excellence Network), and BEN (Business Excellence Network) to ensure consistent, high-velocity service delivery worldwide."],
	["How do the CAN, PEN, and BEN networks operate across India and global markets?", "CAN drives strategic client outreach across domestic and international corridors. PEN mobilizes vetted financial, legal, and technical experts to execute client mandates under strict quality benchmarks. BEN connects Indian and global business leaders into a unified executive community for cross-border growth and strategic partnerships."],
	["Who can partner with BIG1 Global?", "Indian startups, MSMEs, and domestic corporations can partner with BIG1CS for end-to-end domestic advisory and scaling. International companies, overseas founders, and global enterprises can engage BIG1GC for cross-border strategy, financial analysis, and global operations. Elite professionals and industry leaders can join the ecosystem through the PEN, CAN, and BEN networks."]
];
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutScroll, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "apage",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "apage-bar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "apage-brand",
					href: "/",
					children: "BIG1 GLOBAL"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					"aria-label": "About",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/#ecosystem",
							children: "Ecosystem"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/#portals",
							children: "Portals"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/#networks",
							children: "Networks"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/about",
							"aria-current": "page",
							children: "About"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "apage-cta",
							href: "/#route",
							children: "Initiate mandate"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "apage-hero",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "apage-hero-copy",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "apage-kicker",
								children: "The sovereign enterprise ecosystem"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
								"One sovereign vision.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "serif",
									children: " Two consulting wings."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Built for Bharat and the world."
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "apage-lead",
								children: "BIG1 Global is a next-generation corporate conglomerate and integrated enterprise ecosystem. Operating through two specialized consulting wings—BIG1CS (Big1 Consultancy Services) for the Indian market and BIG1GC (Big1 Global Consulting) for international markets—we unite institutional-grade strategy, financial engineering, regulatory mastery, and proprietary operational intelligence under one unified standard of excellence."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutField, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "apage-points",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "apage-card",
								"data-reveal": true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "BIG1CS · Domestic wing" }), "Empowering Indian startups, MSMEs, and large domestic enterprises with sovereign corporate advisory, compliance, and scale."]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "apage-card",
								"data-reveal": true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "BIG1GC · International wing" }), "Cross-border strategy, global compliance, financial structuring, and offshore execution for overseas businesses and international investors."]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "apage-card",
								"data-reveal": true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "THALMUX Intelligence" }), "Synchronizing global and domestic mandates through the proprietary central operating system and Centres of Excellence."]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "apage-card",
								"data-reveal": true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Tri-network flywheel" }), "Borderless market outreach, elite execution, and leadership alliances via CAN, PEN, and BEN."]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "apage-section",
				"data-reveal": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "apage-kicker",
						children: "Executive summary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
						"Bridging domestic mastery and ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "serif",
							children: "global ambition"
						}),
						" under one architecture."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "apage-prose",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "For decades, institutional-grade corporate strategy, deep financial modeling, and end-to-end regulatory execution were gatekept by fragmented legacy firms. High-growth domestic businesses struggled to access Fortune-500 advisory standards, while international corporations faced friction, high costs, and disconnected advisors when scaling across borders." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "BIG1 Global was engineered to solve both challenges simultaneously." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Structured as a sovereign, multi-layered enterprise ecosystem, BIG1 Global serves as the overarching parent conglomerate that harmonizes domestic market dominance with international consulting capability. By dividing advisory firepower into two dedicated flagship wings—BIG1CS for India and BIG1GC for the world—and uniting them atop the proprietary THALMUX intelligence engine, operational borders fall away." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Whether guiding an Indian MSME toward institutional scale, restructuring a domestic conglomerate, or advising an overseas corporation on global expansion, financial modeling, and cross-border governance, BIG1 Global builds architectures that endure." })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
						"data-reveal": true,
						children: "“We do not merely advise from the sidelines. Through BIG1CS in India and BIG1GC across international corridors, we build the operating infrastructure, the execution networks, and the intelligence systems that turn ambitious enterprises into market sovereigns.”"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "apage-section",
				"data-reveal": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "apage-kicker",
						children: "Two wings. One global standard."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["Tailored jurisdiction mastery. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "serif",
						children: "Unified institutional rigor."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "apage-lead",
						children: "At the core of BIG1 Global lies a dual-wing consulting structure designed to provide hyper-specialized regulatory, financial, and strategic precision for both domestic and international markets."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "apage-table-wrap",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "apage-table",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Attribute" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "BIG1CS · Big1 Consultancy Services" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "BIG1GC · Big1 Global Consulting" })
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: wings.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: row[0] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: row[1] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: row[2] })
							] }, row[0])) })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "apage-pair",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "apage-card",
							"data-reveal": true,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "apage-kicker",
									children: "01"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "BIG1CS — the sovereign domestic giant" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "BIG1CS is the flagship Indian consulting arm of BIG1 Global. Engineered for the complexities and high-velocity growth of the Indian economy, it democratizes institutional-grade advisory for Indian startups, MSMEs, and large domestic enterprises." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "From corporate incorporation, statutory compliance, and Indian taxation to advanced DuPont financial analysis, Inline XBRL (iXBRL) standardization, corporate governance, and pan-India brand positioning, BIG1CS provides a homegrown consulting infrastructure built to rival multinational firms." })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "apage-card",
							"data-reveal": true,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "apage-kicker",
									children: "02"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "BIG1GC — the international advisory powerhouse" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "BIG1GC is the international consulting wing of BIG1 Global, dedicated to overseas businesses, foreign founders, and multinational enterprises operating outside India or expanding across global corridors." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Just as BIG1CS commands the domestic landscape, BIG1GC delivers borderless corporate strategy, international financial analysis, cross-border compliance, India-entry and global-expansion advisory, automated technology workflows, and global brand engineering for clients worldwide." })
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "apage-section",
				"data-reveal": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "apage-kicker",
						children: "Intelligence & specialization"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
						"Powered by ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "serif",
							children: "THALMUX"
						}),
						" and multidisciplinary Centres of Excellence."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "apage-lead",
						children: "Both BIG1CS and BIG1GC operate on a shared, high-precision technological and intellectual backbone—so a client in Mumbai, Lucknow, London, Dubai, or New York receives the same institutional quality."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "apage-card apage-engine",
						"data-reveal": true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "THALMUX — the central intelligence layer" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "THALMUX is BIG1 Global’s proprietary internal intelligence engine and operational nervous system. Acting as the central operating system across both BIG1CS and BIG1GC, it coordinates specialized Centres of Excellence, powers AI-driven workflow automation, standardizes financial and regulatory reporting, and orchestrates collaboration across domestic and international mandates." })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "apage-coes",
						children: coes.map(([name, text]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "apage-card",
							"data-reveal": true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: text })]
						}, name))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "apage-section",
				"data-reveal": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "apage-kicker",
						children: "Orchestrated scale"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
						"Synchronizing global and domestic value through ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "serif",
							children: "CAN, PEN & BEN"
						}),
						"."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "apage-lead",
						children: "Coordinated by the THALMUX engine, BIG1 Global powers a self-reinforcing three-network architecture that scales both BIG1CS and BIG1GC across geographies."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "apage-nets",
						children: networks.map(([code, name, layer, text]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "apage-card",
							"data-reveal": true,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "apage-code",
									children: code
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: name }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "apage-layer",
									children: layer
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: text })
							]
						}, code))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "apage-section",
				"data-reveal": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "apage-kicker",
						children: "Our governing principles"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["Rooted in sovereign strength. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "serif",
						children: "Built for borderless impact."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "apage-doctrine",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "apage-card",
							"data-reveal": true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Our vision" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "To establish the world’s most trusted corporate and industrial consulting ecosystem—championing Indian enterprise growth through BIG1CS while commanding international advisory corridors through BIG1GC." })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "apage-card",
							"data-reveal": true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Our mission" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "To empower businesses of every scale—from emerging Indian MSMEs to global corporations—by integrating elite human expertise (PEN), executive community synergy (BEN), borderless market outreach (CAN), and algorithmic intelligence (THALMUX) into a single, frictionless engine of growth." })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "apage-pillars",
						children: pillars.map(([name, text], index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "apage-card",
							"data-reveal": true,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["0", index + 1] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: name }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: text })
							]
						}, name))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "apage-section",
				"data-reveal": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "apage-kicker",
						children: "Questions"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
						"What people ask ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "serif",
							children: "before they begin"
						}),
						"."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "apage-faq",
						children: faqs.map(([question, answer]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: question }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: answer })] }, question))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "apage-close",
				"data-reveal": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "apage-kicker",
						children: "Begin"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
						"Ready to scale with ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "serif",
							children: "BIG1 Global"
						}),
						"?"
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Choose the consulting wing built for your market, or join the global execution ecosystem." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "apage-lead",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "/big1cs",
								children: "corporate consulting firm in India BIG1CS"
							}),
							" · ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "/big1gc",
								children: "global consulting firm BIG1GC"
							}),
							" · ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "/thalmux",
								children: "THALMUX intelligence engine"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "apage-actions",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "https://big1cs.com",
								target: "_blank",
								rel: "noopener noreferrer",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Domestic · India" }),
									"Partner with BIG1CS",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Indian startups, MSMEs and enterprises" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "/#route",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "International · Global" }),
									"Partner with BIG1GC",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Overseas businesses and global corporations" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "/#networks",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ecosystem" }),
									"Join CAN / PEN / BEN",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Network access" })
								]
							})
						]
					})
				]
			})
		]
	}) });
}
//#endregion
export { AboutPage as component };
