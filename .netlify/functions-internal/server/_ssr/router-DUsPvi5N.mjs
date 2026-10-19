import { i as __toESM } from "../_runtime.mjs";
import { n as gsapWithCSS, r as require_react, t as useGSAP } from "../_libs/gsap+gsap__react+react.mjs";
import { _ as lazyRouteComponent, b as useRouter, f as Scripts, g as Outlet, h as createRouter, p as HeadContent, v as createFileRoute, x as require_jsx_runtime, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { i as ScrollTrigger, n as Flip, r as DrawSVGPlugin, t as MotionPathPlugin } from "../_libs/gsap.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seoPages-Cmc997al.js
var ORIGIN = "https://www.big1global.com";
var cornerstone = [
	{
		href: "/about",
		label: "About BIG1 Global"
	},
	{
		href: "/big1cs",
		label: "corporate consulting firm in India BIG1CS"
	},
	{
		href: "/big1gc",
		label: "global consulting firm BIG1GC"
	},
	{
		href: "/thalmux",
		label: "THALMUX intelligence engine"
	},
	{
		href: "/networks",
		label: "CAN, PEN and BEN networks"
	}
];
var seoPages = {
	big1cs: {
		path: "/big1cs",
		title: "BIG1CS | Business Consulting Firm in India for Startups, MSMEs and Enterprises",
		description: "BIG1CS is the domestic consulting wing of BIG1 Global. Corporate advisory, taxation, compliance, financial modeling and scale for Indian startups, MSMEs and large enterprises. Headquartered in Lucknow.",
		kicker: "Domestic wing · India",
		h1: "Business consulting firm in India for startups, MSMEs and large enterprises",
		answer: "BIG1CS (Big1 Consultancy Services) is the Indian consulting wing of BIG1 Global. It advises startups, MSMEs and domestic enterprises on incorporation, taxation, statutory compliance, DuPont financial analysis, iXBRL reporting, governance and brand positioning, from its Lucknow headquarters.",
		blocks: [{
			heading: "What BIG1CS holds",
			answer: "BIG1CS is built for the Indian regulatory system. A mandate can cover formation, GST and income-tax filing, ROC work, wealth planning, assurance, strategy or diligence, then stay with one accountable centre.",
			list: [
				"Corporate incorporation and foundational structuring",
				"GST, income-tax and ROC/MCA compliance",
				"DuPont analysis, valuation and iXBRL standardization",
				"MSME scaling and domestic brand positioning"
			]
		}],
		table: {
			caption: "Where a domestic mandate usually starts",
			headers: [
				"Need",
				"Centre",
				"Live portal"
			],
			rows: [
				[
					"Formation",
					"Setup",
					"https://setup.big1cs.com"
				],
				[
					"Statutory filing",
					"Compliance",
					"https://compliance.big1cs.com"
				],
				[
					"Wealth",
					"Wealth",
					"https://wealth.big1cs.com"
				],
				[
					"Assurance",
					"Assurance",
					"https://assurance.big1cs.com"
				],
				[
					"Strategy",
					"Advisory",
					"https://advisory.big1cs.com"
				],
				[
					"Verification",
					"Diligence",
					"https://diligence.big1cs.com"
				]
			]
		}
	},
	lucknow: {
		path: "/big1cs/consulting-firm-lucknow",
		title: "Consulting Firm in Lucknow | BIG1CS Headquarters, Sushant Golf City",
		description: "BIG1CS is a consulting firm in Lucknow for startups, MSMEs and enterprises. Headquarters at Sushant Golf City. Corporate advisory, compliance, taxation and financial modeling across Uttar Pradesh.",
		kicker: "Lucknow · Headquarters",
		h1: "Consulting firm in Lucknow for corporate advisory and MSME scale",
		answer: "BIG1CS is a consulting firm headquartered in Lucknow, Uttar Pradesh. From Sushant Golf City it advises startups, MSMEs and enterprises on Indian corporate law, taxation, compliance, financial modeling and growth, and serves the wider Uttar Pradesh market from this single office.",
		local: {
			city: "Lucknow",
			neighborhoods: [
				"Sushant Golf City",
				"Gomti Nagar",
				"Hazratganj",
				"Vibhuti Khand"
			]
		},
		map: true,
		blocks: [{
			heading: "The Lucknow headquarters",
			answer: "This is the only BIG1CS office. Mandates for Lucknow and the rest of India are accepted here and routed to the centre that should hold the work. There is no second storefront.",
			paragraphs: ["Clients across Gomti Nagar, Hazratganj, Vibhuti Khand and Sushant Golf City are served from this address. Scope is confirmed in the engagement letter."]
		}]
	},
	delhi: {
		path: "/big1cs/consulting-firm-delhi-ncr",
		title: "Consulting Firm for Delhi NCR | BIG1CS — Gurugram, Noida and New Delhi",
		description: "BIG1CS advises Delhi NCR startups, MSMEs and corporates on compliance, taxation, governance and scale. Work is delivered from the Lucknow headquarters, not a separate NCR office.",
		kicker: "Delhi NCR · Served from Lucknow",
		h1: "Consulting firm for New Delhi, Gurugram and Noida",
		answer: "BIG1CS advises companies in Delhi NCR on corporate compliance, taxation, governance and growth. The firm does not keep a separate Delhi office. Mandates from New Delhi, Gurugram and Noida are held from the Lucknow headquarters and staffed through the professional network.",
		local: {
			city: "Delhi NCR",
			neighborhoods: [
				"New Delhi",
				"Gurugram",
				"Noida",
				"Connaught Place"
			]
		},
		blocks: [{
			heading: "How an NCR mandate is held",
			answer: "A Delhi NCR brief is read at headquarters, then routed to the BIG1CS centre that matches the work: setup, compliance, assurance, advisory, wealth or diligence."
		}]
	},
	mumbai: {
		path: "/big1cs/consulting-firm-mumbai",
		title: "Consulting Firm for Mumbai | BIG1CS Corporate and Financial Advisory",
		description: "BIG1CS advises Mumbai companies on corporate finance context, compliance, taxation and governance. Delivery is from the Lucknow headquarters. No separate Mumbai office.",
		kicker: "Mumbai · Served from Lucknow",
		h1: "Consulting firm for Mumbai companies and financial mandates",
		answer: "BIG1CS advises Mumbai businesses on statutory compliance, taxation, governance and strategic finance. BIG1CS has no Mumbai office. Bandra Kurla Complex, Nariman Point and the wider Maharashtra market are served from the Lucknow headquarters under one engagement letter.",
		local: {
			city: "Mumbai",
			neighborhoods: [
				"Bandra Kurla Complex",
				"Nariman Point",
				"Andheri"
			]
		},
		blocks: [{
			heading: "What Mumbai mandates usually need",
			answer: "Typical work includes compliance calendars, board reporting context, transaction support and diligence. The centre is named before work starts."
		}]
	},
	bengaluru: {
		path: "/big1cs/consulting-firm-bengaluru",
		title: "Consulting Firm for Bengaluru Startups | BIG1CS",
		description: "BIG1CS advises Bengaluru startups and technology companies on formation, compliance, finance and scale. The office is in Lucknow. Bengaluru is a service corridor, not a branch.",
		kicker: "Bengaluru · Served from Lucknow",
		h1: "Consulting firm for Bengaluru startups and technology companies",
		answer: "BIG1CS advises Bengaluru startups and product companies on incorporation, statutory compliance, financial modeling and scale. There is no Bengaluru branch. Whitefield, Koramangala and the wider city are served from the Lucknow headquarters.",
		local: {
			city: "Bengaluru",
			neighborhoods: [
				"Whitefield",
				"Koramangala",
				"Indiranagar"
			]
		},
		blocks: [{
			heading: "Startup and scale work",
			answer: "A Bengaluru brief can start in formation or compliance and later move to advisory. THALMUX routes the scenario to the centre that should hold it."
		}]
	},
	hyderabad: {
		path: "/big1cs/consulting-firm-hyderabad",
		title: "Consulting Firm for Hyderabad | BIG1CS Enterprise Advisory",
		description: "BIG1CS advises Hyderabad enterprises on compliance, taxation, governance and operating-model work. Headquarters remain in Lucknow. Hyderabad is a served market.",
		kicker: "Hyderabad · Served from Lucknow",
		h1: "Consulting firm for Hyderabad enterprises",
		answer: "BIG1CS advises Hyderabad companies on Indian corporate compliance, taxation, governance and financial reporting. HITEC City and Gachibowli are served markets. The only office is the Lucknow headquarters of BIG1CS.",
		local: {
			city: "Hyderabad",
			neighborhoods: [
				"HITEC City",
				"Gachibowli",
				"Financial District"
			]
		},
		blocks: [{
			heading: "Enterprise reporting",
			answer: "Hyderabad mandates often need a clean compliance calendar, board-ready numbers and iXBRL-ready reporting context. Scope is written down before work begins."
		}]
	},
	ahmedabad: {
		path: "/big1cs/consulting-firm-ahmedabad",
		title: "Consulting Firm for Ahmedabad and Gujarat MSMEs | BIG1CS",
		description: "BIG1CS advises Ahmedabad and Gujarat MSMEs on compliance, finance and industrial scale. Work is run from Lucknow. GIFT City is a corridor, not a second headquarters.",
		kicker: "Ahmedabad · Served from Lucknow",
		h1: "Consulting firm for Ahmedabad industry and Gujarat MSMEs",
		answer: "BIG1CS advises Ahmedabad manufacturers and Gujarat MSMEs on compliance, taxation, finance and operating scale. SG Highway and the GIFT City corridor are served from Lucknow. BIG1CS does not operate a separate Ahmedabad office.",
		local: {
			city: "Ahmedabad",
			neighborhoods: [
				"SG Highway",
				"GIFT City",
				"Naroda"
			]
		},
		blocks: [{
			heading: "Industrial and MSME work",
			answer: "Gujarat mandates often combine statutory filing with supply-chain or expansion questions. The domestic centre stays accountable for the letter of engagement."
		}]
	},
	big1gc: {
		path: "/big1gc",
		title: "BIG1GC | Global Consulting Firm for Cross-Border Enterprises",
		description: "BIG1GC is the international consulting wing of BIG1 Global. Cross-border strategy, global financial structuring, market entry and offshore execution for overseas businesses and multinationals.",
		kicker: "International wing",
		h1: "Global consulting firm for cross-border enterprises and international growth",
		answer: "BIG1GC (Big1 Global Consulting) is the international wing of BIG1 Global. It advises overseas founders, foreign corporations and multinationals on cross-border strategy, international structuring, global financial modeling, market entry and offshore operations. It is not a separate website. A mandate is opened from BIG1 Global.",
		blocks: [{
			heading: "What an international mandate covers",
			answer: "BIG1GC reads the jurisdiction, the capital path and the operating question, then places the work with the international centre that matches it. Fifteen global centres sit under this wing.",
			list: [
				"Cross-border entity governance and filings",
				"Treaty and withholding analysis",
				"Valuation, listings context and restructuring options",
				"India-entry and global expansion advisory"
			]
		}]
	},
	strategy: {
		path: "/big1gc/international-corporate-strategy",
		title: "International Corporate Strategy | BIG1GC Cross-Border Advisory",
		description: "BIG1GC international corporate strategy for market expansion, trade policy context and cross-border operating models. A mandate of BIG1 Global, not a standalone firm.",
		kicker: "BIG1GC · Strategy",
		h1: "International corporate strategy and cross-border advisory",
		answer: "International corporate strategy at BIG1GC is the work of choosing a market, a structure and an operating model across borders. It covers expansion sequencing, trade-agreement context and government-affairs coordination for a named mandate. BIG1 Global holds the engagement.",
		blocks: [{
			heading: "Where strategy sits",
			answer: "Public policy, trade and market-entry questions are read with the financial and compliance questions. They are not sold as a separate product line."
		}]
	},
	modeling: {
		path: "/big1gc/global-financial-modeling-ixbrl",
		title: "Global Financial Modeling and iXBRL | BIG1GC",
		description: "DuPont analysis, cash-flow modeling, valuation context and iXBRL standardization for cross-border mandates, delivered by BIG1GC under BIG1 Global.",
		kicker: "BIG1GC · Finance",
		h1: "Global financial modeling, DuPont analysis and iXBRL reporting",
		answer: "BIG1GC financial work covers DuPont and ratio analysis, cash-flow models, valuation context and Inline XBRL standardization for cross-border reporting. The model follows the engagement letter. It does not replace a statutory audit unless that audit is separately agreed.",
		blocks: [{
			heading: "What the model is for",
			answer: "The model exists so a board can see leverage, margin and cash in one place, and so a filing pack can be prepared in a consistent format across jurisdictions."
		}]
	},
	entry: {
		path: "/big1gc/india-market-entry-advisory",
		title: "India Market Entry Advisory | BIG1GC for Foreign Companies",
		description: "BIG1GC helps foreign companies read an India entry: entity choice, compliance path and operating setup, alongside BIG1CS for the domestic work.",
		kicker: "BIG1GC · India entry",
		h1: "India market-entry advisory for foreign companies",
		answer: "India market-entry advisory at BIG1GC helps a foreign company choose an entity path, a compliance calendar and an operating setup. BIG1GC holds the cross-border question. BIG1CS holds the Indian statutory work. One parent, two wings, one letter of engagement.",
		blocks: [{
			heading: "How the two wings split the entry",
			answer: "The international wing frames structure, capital and reporting. The domestic wing handles incorporation, tax registration and Indian filings. THALMUX keeps the brief in one place."
		}]
	},
	us: {
		path: "/us",
		title: "North America Corporate Consulting | BIG1GC United States Corridor",
		description: "BIG1GC advisory for United States and North American companies entering or operating across borders, including the Delaware corridor. Delivered by BIG1 Global.",
		kicker: "Corridor · United States",
		h1: "North America corporate consulting for cross-border mandates",
		answer: "The United States corridor of BIG1GC is for North American companies that need cross-border structure, reporting or an India operating path. Delaware is one jurisdiction in that reading. BIG1GC does not claim a United States office. The headquarters are in Lucknow.",
		blocks: [{
			heading: "What this corridor is",
			answer: "It is a way to open a mandate, not a local branch. Work is scoped in writing and delivered by the international centres and the professional network."
		}]
	},
	uk: {
		path: "/uk",
		title: "UK and European Enterprise Advisory | BIG1GC",
		description: "BIG1GC advisory for United Kingdom and European enterprises on cross-border structure, reporting and India-entry. No London office is claimed. Headquarters are in Lucknow.",
		kicker: "Corridor · United Kingdom",
		h1: "UK and European enterprise advisory",
		answer: "The United Kingdom corridor of BIG1GC reads London and wider European questions of structure, tax treaties and market entry. BIG1 Global does not operate a UK office. Mandates are accepted at the Lucknow headquarters and staffed through BIG1GC.",
		blocks: [{
			heading: "European mandates",
			answer: "A UK or EMEA brief names the jurisdiction, the filing question and the commercial goal. The centre that holds it is chosen after that reading."
		}]
	},
	ae: {
		path: "/ae",
		title: "UAE and Middle East Strategic Consulting | BIG1GC",
		description: "BIG1GC advisory for UAE and Middle East companies, including the Dubai corridor. Cross-border structure and India links. Headquarters remain in Lucknow.",
		kicker: "Corridor · United Arab Emirates",
		h1: "UAE and Middle East strategic consulting",
		answer: "The UAE corridor of BIG1GC covers Dubai and wider Middle East questions of holding structure, trade and India expansion. DIFC is a jurisdiction clients ask about. BIG1 Global does not keep a Dubai office. The firm is headquartered in Lucknow.",
		blocks: [{
			heading: "Middle East to India",
			answer: "Many briefs connect a Gulf holding company with an Indian operating company. BIG1GC reads the cross-border side. BIG1CS reads the Indian filings."
		}]
	},
	sg: {
		path: "/sg",
		title: "Singapore and APAC Consulting Corridor | BIG1GC",
		description: "BIG1GC advisory for Singapore and Asia-Pacific companies on regional structure and India entry. No Singapore office is claimed. Headquarters are in Lucknow.",
		kicker: "Corridor · Singapore",
		h1: "Singapore and APAC consulting corridor",
		answer: "The Singapore corridor of BIG1GC is for Asia-Pacific companies that use Singapore as a regional base and need a cross-border or India plan. BIG1 Global has no Singapore office. Mandates are opened from the Lucknow headquarters.",
		blocks: [{
			heading: "Regional structure",
			answer: "The work is entity reading, reporting consistency and market sequence. It is confirmed per engagement, not offered as a local licence."
		}]
	},
	thalmux: {
		path: "/thalmux",
		title: "THALMUX | Central Intelligence Engine of BIG1 Global",
		description: "THALMUX is the proprietary operating layer of BIG1 Global. It reads a scenario and routes it to BIG1CS, BIG1GC and the CAN, PEN and BEN networks.",
		kicker: "Intelligence layer",
		h1: "THALMUX, the intelligence engine that routes a mandate",
		answer: "THALMUX is the proprietary intelligence layer of BIG1 Global. It reads a client scenario and routes it to the right centres, professionals and partners across BIG1CS and BIG1GC. It is an operating system for the firm, not a public chatbot and not a separate company.",
		blocks: [{
			heading: "What THALMUX coordinates",
			answer: "THALMUX keeps domestic and international work on one brief. It points at the centre, the network and the person who stays accountable.",
			list: [
				"Routes a scenario to BIG1CS or BIG1GC",
				"Connects CAN for origin, PEN for execution, BEN for leadership",
				"Keeps the engagement letter as the boundary of the work"
			]
		}]
	},
	networks: {
		path: "/networks",
		title: "CAN, PEN and BEN | The Three Networks of BIG1 Global",
		description: "CAN originates mandates, PEN executes them, BEN connects leaders. The three networks of BIG1 Global, used by both BIG1CS and BIG1GC.",
		kicker: "Tri-network",
		h1: "CAN, PEN and BEN, the three networks under BIG1 Global",
		answer: "CAN, PEN and BEN are the three networks of BIG1 Global. CAN is the client acquisition network. PEN is the professional excellence network. BEN is the business excellence network. THALMUX routes work across them for both BIG1CS in India and BIG1GC internationally.",
		blocks: [{
			heading: "What each network does",
			answer: "They are not three extra consulting firms. They are how a mandate is found, staffed and kept in a leadership community.",
			list: [
				"CAN — outreach and introducers. Live at can.big1cs.com.",
				"PEN — vetted professionals. Live at pen.big1cs.com.",
				"BEN — founders and CXOs. Live at ben.big1cs.com."
			]
		}]
	},
	finance: {
		path: "/services/finance-governance",
		title: "Strategic Finance and Corporate Governance | BIG1 Global",
		description: "DuPont analysis, cash-flow modeling, valuation context, iXBRL and governance for BIG1CS and BIG1GC mandates.",
		kicker: "Centre of excellence",
		h1: "Strategic finance and corporate governance",
		answer: "Strategic finance and corporate governance at BIG1 Global covers ratio and DuPont analysis, cash-flow modeling, valuation context, iXBRL standardization and cross-jurisdiction compliance. BIG1CS uses it for Indian companies. BIG1GC uses it for international mandates.",
		blocks: [{
			heading: "The boundary",
			answer: "Analysis and reporting support follow the engagement letter. An audit, a legal opinion or a filing is included only when that scope is written down."
		}]
	},
	corporate: {
		path: "/services/corporate-strategy",
		title: "Corporate Strategy and Market Entry | BIG1 Global",
		description: "Market entry, MSME scaling and cross-border operating strategy from BIG1CS in India and BIG1GC internationally.",
		kicker: "Centre of excellence",
		h1: "Corporate strategy, market entry and scale",
		answer: "Corporate strategy at BIG1 Global is the choice of market, structure and operating sequence. BIG1CS applies it to Indian MSMEs and domestic groups. BIG1GC applies it to foreign companies entering India or expanding across borders.",
		blocks: [{
			heading: "Domestic and international",
			answer: "The same parent holds both. The wing changes with the jurisdiction. The letter of engagement names the work."
		}]
	},
	ai: {
		path: "/services/ai-automation",
		title: "Enterprise AI and Workflow Automation | BIG1 Global",
		description: "Workflow automation, reporting standardization and AI-assisted routing inside BIG1 Global mandates, coordinated by THALMUX.",
		kicker: "Centre of excellence",
		h1: "Enterprise technology and AI workflow automation",
		answer: "Enterprise technology work at BIG1 Global covers workflow automation, reporting pipelines and operating-model change tied to a mandate. THALMUX is the internal routing layer. This is not a general software product and not an open API.",
		blocks: [{
			heading: "Where automation is used",
			answer: "Automation removes repeated filing and reporting steps inside an agreed engagement. It does not replace the person accountable for the mandate."
		}]
	},
	brand: {
		path: "/services/branding-influence",
		title: "Corporate Branding and Market Influence | BIG1 Global",
		description: "Brand architecture and market positioning for Indian companies through BIG1CS and for international mandates through BIG1GC.",
		kicker: "Centre of excellence",
		h1: "Corporate branding and market influence",
		answer: "Corporate branding at BIG1 Global is the market position that sits beside the legal and financial structure. BIG1CS applies it to Indian companies. BIG1GC applies it when an international mandate needs a cross-border market story. It follows the same engagement letter.",
		blocks: [{
			heading: "What is in scope",
			answer: "Positioning, narrative and the link to the operating company. Media buying and campaign production are included only if the letter says so."
		}]
	},
	contact: {
		path: "/contact",
		title: "Contact BIG1 Global | Lucknow Headquarters for BIG1CS and BIG1GC",
		description: "Contact BIG1 Global at its Lucknow headquarters. One address and one phone for BIG1CS India mandates and BIG1GC international mandates.",
		kicker: "Headquarters",
		h1: "Contact BIG1 Global in Lucknow",
		answer: "BIG1 Global is contacted at its Lucknow headquarters. The same address and phone open a BIG1CS mandate for an Indian company or a BIG1GC mandate for an international one. Write to info@big1cs.com or call +91 73075 35860.",
		map: true,
		local: {
			city: "Lucknow",
			neighborhoods: [
				"Sushant Golf City",
				"Gomti Nagar",
				"Hazratganj"
			]
		},
		blocks: [{
			heading: "How to open a mandate",
			answer: "Use the Initiate mandate form on the homepage, or write directly. Say who you are, the jurisdiction, and the work. A person replies to the email you give."
		}]
	}
};
Object.values(seoPages);
function canonical(path) {
	return path === "/" ? `${ORIGIN}/` : `${ORIGIN}${path}`;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-DUsPvi5N.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var organizationGraph = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": ["Corporation", "Organization"],
			"@id": "https://www.big1global.com/#organization",
			name: "BIG1 Global",
			legalName: "BIG1 Consultancy Services",
			alternateName: ["Big1 Global Ecosystem", "BIG1 Conglomerate"],
			url: "https://www.big1global.com",
			logo: "https://www.big1global.com/assets/big1-global-logo.png",
			description: "BIG1 Global is a sovereign corporate consulting conglomerate and enterprise ecosystem operating through two flagship wings: BIG1CS (Big1 Consultancy Services) for Indian startups, MSMEs, and enterprises, and BIG1GC (Big1 Global Consulting) for international corporations, powered by the THALMUX intelligence engine.",
			foundingLocation: {
				"@type": "Place",
				name: "Lucknow, Uttar Pradesh, India"
			},
			telephone: "+91 73075 35860",
			email: "info@big1cs.com",
			address: {
				"@type": "PostalAddress",
				streetAddress: "2nd Floor, J2/30, Sector-J, Sushant Golf City, Amar Shaheed Path",
				addressLocality: "Lucknow",
				addressRegion: "Uttar Pradesh",
				postalCode: "226030",
				addressCountry: "IN"
			},
			sameAs: [
				"https://www.big1cs.com",
				"https://www.linkedin.com/company/big1-consultancy-services",
				"https://www.instagram.com/big1cs",
				"https://x.com/BIG1CS",
				"https://www.youtube.com/@big1cs_official"
			],
			subOrganization: [{ "@id": "https://www.big1global.com/#big1cs" }, { "@id": "https://www.big1global.com/#big1gc" }]
		},
		{
			"@type": ["ProfessionalService", "LocalBusiness"],
			"@id": "https://www.big1global.com/#big1cs",
			name: "BIG1CS (Big1 Consultancy Services)",
			parentOrganization: { "@id": "https://www.big1global.com/#organization" },
			url: "https://www.big1cs.com",
			image: "https://www.big1global.com/assets/big1-global-logo.png",
			telephone: "+91 73075 35860",
			priceRange: "$$$",
			description: "Business consulting firm in India serving startups, MSMEs, and large domestic enterprises with corporate strategy, taxation, regulatory compliance, DuPont financial modeling, iXBRL standardization, and brand transformation.",
			areaServed: [
				{
					"@type": "Country",
					name: "India"
				},
				{
					"@type": "City",
					name: "Lucknow"
				},
				{
					"@type": "State",
					name: "Uttar Pradesh"
				}
			],
			address: {
				"@type": "PostalAddress",
				streetAddress: "2nd Floor, J2/30, Sector-J, Sushant Golf City, Amar Shaheed Path",
				addressLocality: "Lucknow",
				addressRegion: "Uttar Pradesh",
				postalCode: "226030",
				addressCountry: "IN"
			},
			geo: {
				"@type": "GeoCoordinates",
				latitude: "26.8467",
				longitude: "80.9462"
			},
			hasOfferCatalog: {
				"@type": "OfferCatalog",
				name: "Domestic Corporate and MSME Consulting Services",
				itemListElement: [
					{
						"@type": "Offer",
						itemOffered: {
							"@type": "Service",
							name: "MSME and Startup Strategy Consulting"
						}
					},
					{
						"@type": "Offer",
						itemOffered: {
							"@type": "Service",
							name: "Corporate Compliance, Taxation and Governance"
						}
					},
					{
						"@type": "Offer",
						itemOffered: {
							"@type": "Service",
							name: "Financial Analysis, DuPont Modeling and iXBRL"
						}
					}
				]
			}
		},
		{
			"@type": ["ProfessionalService", "Organization"],
			"@id": "https://www.big1global.com/#big1gc",
			name: "BIG1GC (Big1 Global Consulting)",
			parentOrganization: { "@id": "https://www.big1global.com/#organization" },
			url: "https://www.big1global.com/big1gc",
			description: "Global consulting firm serving international businesses, overseas founders, and multinational corporations with cross-border strategy, global financial engineering, AI workflow automation, and market expansion.",
			areaServed: "Global"
		},
		{
			"@type": "WebSite",
			"@id": "https://www.big1global.com/#website",
			url: "https://www.big1global.com",
			name: "BIG1 Global",
			publisher: { "@id": "https://www.big1global.com/#organization" }
		}
	]
};
gsapWithCSS.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin, Flip, MotionPathPlugin);
function ensureMotion() {
	if (typeof window === "undefined") return;
	window.gsap = gsapWithCSS;
	gsapWithCSS.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin, Flip, MotionPathPlugin);
}
var styles_default = "/assets/styles-BpVGpbnf.css";
var APP_NAME = "BIG1 GLOBAL";
var Route$24 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "BIG1 Global is a sovereign consulting conglomerate. BIG1CS serves Indian startups, MSMEs and enterprises. BIG1GC serves international businesses. Both run on the THALMUX intelligence engine."
			},
			{
				name: "theme-color",
				content: "#111111"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&family=Inter+Tight:wght@300;400;500&display=swap"
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => {
		ensureMotion();
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
			lang: "en",
			suppressHydrationWarning: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
				type: "application/ld+json",
				dangerouslySetInnerHTML: { __html: JSON.stringify(organizationGraph) }
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			] })]
		});
	}
});
var $$splitComponentImporter$23 = () => import("./routes-DBCHnyLW.mjs");
var Route$23 = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: "BIG1 Global | Sovereign Consulting Conglomerate — BIG1CS India and BIG1GC" },
			{
				name: "description",
				content: "BIG1 Global is a sovereign consulting conglomerate. BIG1CS advises Indian startups, MSMEs and enterprises. BIG1GC advises international businesses. THALMUX routes every mandate."
			},
			{
				property: "og:title",
				content: "BIG1 Global | Sovereign Consulting Conglomerate"
			},
			{
				property: "og:description",
				content: "One ecosystem. BIG1CS for India. BIG1GC for international mandates. Headquartered in Lucknow."
			},
			{
				property: "og:url",
				content: "https://www.big1global.com/"
			}
		],
		links: [
			{
				rel: "canonical",
				href: "https://www.big1global.com/"
			},
			{
				rel: "alternate",
				hrefLang: "en-in",
				href: "https://www.big1global.com/big1cs"
			},
			{
				rel: "alternate",
				hrefLang: "en",
				href: "https://www.big1global.com/big1gc"
			},
			{
				rel: "alternate",
				hrefLang: "x-default",
				href: "https://www.big1global.com/"
			}
		]
	}),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./about-C6_78XCX.mjs");
var title = "About BIG1 Global | Sovereign Consulting Conglomerate — BIG1CS (India) & BIG1GC (Global)";
var description = "BIG1 Global is a multi-layered corporate consulting and enterprise ecosystem. Operating through two flagship wings—BIG1CS for Indian MSMEs, startups, and enterprises, and BIG1GC for international businesses—powered by the THALMUX intelligence engine.";
var Route$22 = createFileRoute("/about")({
	head: () => ({
		meta: [
			{ title },
			{
				name: "description",
				content: description
			},
			{
				name: "keywords",
				content: "BIG1 Global, BIG1CS, Big1 Consultancy Services, BIG1GC, Big1 Global Consulting, Sovereign Consulting Conglomerate, Corporate Advisory India, Cross-Border Enterprise Consulting, MSME & Startup Consulting India, Global Business Expansion, THALMUX Intelligence Engine"
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: description
			}
		],
		links: [{
			rel: "canonical",
			href: "https://www.big1global.com/about"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var page$21 = seoPages.ae;
var $$splitComponentImporter$21 = () => import("./ae-DCdrG2zj.mjs");
var Route$21 = createFileRoute("/ae")({
	head: () => ({
		meta: [
			{ title: page$21.title },
			{
				name: "description",
				content: page$21.description
			},
			{
				property: "og:title",
				content: page$21.title
			},
			{
				property: "og:description",
				content: page$21.description
			},
			{
				property: "og:url",
				content: canonical(page$21.path)
			}
		],
		links: [{
			rel: "canonical",
			href: canonical(page$21.path)
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var page$20 = seoPages.big1cs;
var $$splitComponentImporter$20 = () => import("./big1cs-DSSM7-xp.mjs");
var Route$20 = createFileRoute("/big1cs")({
	head: () => ({
		meta: [
			{ title: page$20.title },
			{
				name: "description",
				content: page$20.description
			},
			{
				property: "og:title",
				content: page$20.title
			},
			{
				property: "og:description",
				content: page$20.description
			},
			{
				property: "og:url",
				content: canonical(page$20.path)
			}
		],
		links: [{
			rel: "canonical",
			href: canonical(page$20.path)
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var page$19 = seoPages.big1gc;
var $$splitComponentImporter$19 = () => import("./big1gc-BJY7oZXB.mjs");
var Route$19 = createFileRoute("/big1gc")({
	head: () => ({
		meta: [
			{ title: page$19.title },
			{
				name: "description",
				content: page$19.description
			},
			{
				property: "og:title",
				content: page$19.title
			},
			{
				property: "og:description",
				content: page$19.description
			},
			{
				property: "og:url",
				content: canonical(page$19.path)
			}
		],
		links: [{
			rel: "canonical",
			href: canonical(page$19.path)
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var page$18 = seoPages.contact;
var $$splitComponentImporter$18 = () => import("./contact-DRdetHTD.mjs");
var Route$18 = createFileRoute("/contact")({
	head: () => ({
		meta: [
			{ title: page$18.title },
			{
				name: "description",
				content: page$18.description
			},
			{
				property: "og:title",
				content: page$18.title
			},
			{
				property: "og:description",
				content: page$18.description
			},
			{
				property: "og:url",
				content: canonical(page$18.path)
			}
		],
		links: [{
			rel: "canonical",
			href: canonical(page$18.path)
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var page$17 = seoPages.networks;
var $$splitComponentImporter$17 = () => import("./networks-CHUhIQg8.mjs");
var Route$17 = createFileRoute("/networks")({
	head: () => ({
		meta: [
			{ title: page$17.title },
			{
				name: "description",
				content: page$17.description
			},
			{
				property: "og:title",
				content: page$17.title
			},
			{
				property: "og:description",
				content: page$17.description
			},
			{
				property: "og:url",
				content: canonical(page$17.path)
			}
		],
		links: [{
			rel: "canonical",
			href: canonical(page$17.path)
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var page$16 = seoPages.sg;
var $$splitComponentImporter$16 = () => import("./sg-BkaEkJ_S.mjs");
var Route$16 = createFileRoute("/sg")({
	head: () => ({
		meta: [
			{ title: page$16.title },
			{
				name: "description",
				content: page$16.description
			},
			{
				property: "og:title",
				content: page$16.title
			},
			{
				property: "og:description",
				content: page$16.description
			},
			{
				property: "og:url",
				content: canonical(page$16.path)
			}
		],
		links: [{
			rel: "canonical",
			href: canonical(page$16.path)
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var page$15 = seoPages.thalmux;
var $$splitComponentImporter$15 = () => import("./thalmux-aszARYR_.mjs");
var Route$15 = createFileRoute("/thalmux")({
	head: () => ({
		meta: [
			{ title: page$15.title },
			{
				name: "description",
				content: page$15.description
			},
			{
				property: "og:title",
				content: page$15.title
			},
			{
				property: "og:description",
				content: page$15.description
			},
			{
				property: "og:url",
				content: canonical(page$15.path)
			}
		],
		links: [{
			rel: "canonical",
			href: canonical(page$15.path)
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var page$14 = seoPages.uk;
var $$splitComponentImporter$14 = () => import("./uk-DW2DJCWb.mjs");
var Route$14 = createFileRoute("/uk")({
	head: () => ({
		meta: [
			{ title: page$14.title },
			{
				name: "description",
				content: page$14.description
			},
			{
				property: "og:title",
				content: page$14.title
			},
			{
				property: "og:description",
				content: page$14.description
			},
			{
				property: "og:url",
				content: canonical(page$14.path)
			}
		],
		links: [{
			rel: "canonical",
			href: canonical(page$14.path)
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var page$13 = seoPages.us;
var $$splitComponentImporter$13 = () => import("./us-DxqOpdm1.mjs");
var Route$13 = createFileRoute("/us")({
	head: () => ({
		meta: [
			{ title: page$13.title },
			{
				name: "description",
				content: page$13.description
			},
			{
				property: "og:title",
				content: page$13.title
			},
			{
				property: "og:description",
				content: page$13.description
			},
			{
				property: "og:url",
				content: canonical(page$13.path)
			}
		],
		links: [{
			rel: "canonical",
			href: canonical(page$13.path)
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var page$12 = seoPages.ahmedabad;
var $$splitComponentImporter$12 = () => import("./big1cs_.consulting-firm-ahmedabad-BhjRvOww.mjs");
var Route$12 = createFileRoute("/big1cs_/consulting-firm-ahmedabad")({
	head: () => ({
		meta: [
			{ title: page$12.title },
			{
				name: "description",
				content: page$12.description
			},
			{
				property: "og:title",
				content: page$12.title
			},
			{
				property: "og:description",
				content: page$12.description
			},
			{
				property: "og:url",
				content: canonical(page$12.path)
			}
		],
		links: [{
			rel: "canonical",
			href: canonical(page$12.path)
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var page$11 = seoPages.bengaluru;
var $$splitComponentImporter$11 = () => import("./big1cs_.consulting-firm-bengaluru-DR1C8Fbs.mjs");
var Route$11 = createFileRoute("/big1cs_/consulting-firm-bengaluru")({
	head: () => ({
		meta: [
			{ title: page$11.title },
			{
				name: "description",
				content: page$11.description
			},
			{
				property: "og:title",
				content: page$11.title
			},
			{
				property: "og:description",
				content: page$11.description
			},
			{
				property: "og:url",
				content: canonical(page$11.path)
			}
		],
		links: [{
			rel: "canonical",
			href: canonical(page$11.path)
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var page$10 = seoPages.delhi;
var $$splitComponentImporter$10 = () => import("./big1cs_.consulting-firm-delhi-ncr-BxKva_Q_.mjs");
var Route$10 = createFileRoute("/big1cs_/consulting-firm-delhi-ncr")({
	head: () => ({
		meta: [
			{ title: page$10.title },
			{
				name: "description",
				content: page$10.description
			},
			{
				property: "og:title",
				content: page$10.title
			},
			{
				property: "og:description",
				content: page$10.description
			},
			{
				property: "og:url",
				content: canonical(page$10.path)
			}
		],
		links: [{
			rel: "canonical",
			href: canonical(page$10.path)
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var page$9 = seoPages.hyderabad;
var $$splitComponentImporter$9 = () => import("./big1cs_.consulting-firm-hyderabad-D5vAfVHY.mjs");
var Route$9 = createFileRoute("/big1cs_/consulting-firm-hyderabad")({
	head: () => ({
		meta: [
			{ title: page$9.title },
			{
				name: "description",
				content: page$9.description
			},
			{
				property: "og:title",
				content: page$9.title
			},
			{
				property: "og:description",
				content: page$9.description
			},
			{
				property: "og:url",
				content: canonical(page$9.path)
			}
		],
		links: [{
			rel: "canonical",
			href: canonical(page$9.path)
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var page$8 = seoPages.lucknow;
var $$splitComponentImporter$8 = () => import("./big1cs_.consulting-firm-lucknow-C-znpHcQ.mjs");
var Route$8 = createFileRoute("/big1cs_/consulting-firm-lucknow")({
	head: () => ({
		meta: [
			{ title: page$8.title },
			{
				name: "description",
				content: page$8.description
			},
			{
				property: "og:title",
				content: page$8.title
			},
			{
				property: "og:description",
				content: page$8.description
			},
			{
				property: "og:url",
				content: canonical(page$8.path)
			}
		],
		links: [{
			rel: "canonical",
			href: canonical(page$8.path)
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var page$7 = seoPages.mumbai;
var $$splitComponentImporter$7 = () => import("./big1cs_.consulting-firm-mumbai-CJjNvI0C.mjs");
var Route$7 = createFileRoute("/big1cs_/consulting-firm-mumbai")({
	head: () => ({
		meta: [
			{ title: page$7.title },
			{
				name: "description",
				content: page$7.description
			},
			{
				property: "og:title",
				content: page$7.title
			},
			{
				property: "og:description",
				content: page$7.description
			},
			{
				property: "og:url",
				content: canonical(page$7.path)
			}
		],
		links: [{
			rel: "canonical",
			href: canonical(page$7.path)
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var page$6 = seoPages.modeling;
var $$splitComponentImporter$6 = () => import("./big1gc_.global-financial-modeling-ixbrl-DUUDHz0Z.mjs");
var Route$6 = createFileRoute("/big1gc_/global-financial-modeling-ixbrl")({
	head: () => ({
		meta: [
			{ title: page$6.title },
			{
				name: "description",
				content: page$6.description
			},
			{
				property: "og:title",
				content: page$6.title
			},
			{
				property: "og:description",
				content: page$6.description
			},
			{
				property: "og:url",
				content: canonical(page$6.path)
			}
		],
		links: [{
			rel: "canonical",
			href: canonical(page$6.path)
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var page$5 = seoPages.entry;
var $$splitComponentImporter$5 = () => import("./big1gc_.india-market-entry-advisory-CrIRaChF.mjs");
var Route$5 = createFileRoute("/big1gc_/india-market-entry-advisory")({
	head: () => ({
		meta: [
			{ title: page$5.title },
			{
				name: "description",
				content: page$5.description
			},
			{
				property: "og:title",
				content: page$5.title
			},
			{
				property: "og:description",
				content: page$5.description
			},
			{
				property: "og:url",
				content: canonical(page$5.path)
			}
		],
		links: [{
			rel: "canonical",
			href: canonical(page$5.path)
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var page$4 = seoPages.strategy;
var $$splitComponentImporter$4 = () => import("./big1gc_.international-corporate-strategy-DVSRraVS.mjs");
var Route$4 = createFileRoute("/big1gc_/international-corporate-strategy")({
	head: () => ({
		meta: [
			{ title: page$4.title },
			{
				name: "description",
				content: page$4.description
			},
			{
				property: "og:title",
				content: page$4.title
			},
			{
				property: "og:description",
				content: page$4.description
			},
			{
				property: "og:url",
				content: canonical(page$4.path)
			}
		],
		links: [{
			rel: "canonical",
			href: canonical(page$4.path)
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var page$3 = seoPages.ai;
var $$splitComponentImporter$3 = () => import("./services_.ai-automation-kzqZkyyV.mjs");
var Route$3 = createFileRoute("/services_/ai-automation")({
	head: () => ({
		meta: [
			{ title: page$3.title },
			{
				name: "description",
				content: page$3.description
			},
			{
				property: "og:title",
				content: page$3.title
			},
			{
				property: "og:description",
				content: page$3.description
			},
			{
				property: "og:url",
				content: canonical(page$3.path)
			}
		],
		links: [{
			rel: "canonical",
			href: canonical(page$3.path)
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var page$2 = seoPages.brand;
var $$splitComponentImporter$2 = () => import("./services_.branding-influence-Bze_lzT-.mjs");
var Route$2 = createFileRoute("/services_/branding-influence")({
	head: () => ({
		meta: [
			{ title: page$2.title },
			{
				name: "description",
				content: page$2.description
			},
			{
				property: "og:title",
				content: page$2.title
			},
			{
				property: "og:description",
				content: page$2.description
			},
			{
				property: "og:url",
				content: canonical(page$2.path)
			}
		],
		links: [{
			rel: "canonical",
			href: canonical(page$2.path)
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var page$1 = seoPages.corporate;
var $$splitComponentImporter$1 = () => import("./services_.corporate-strategy-Yfu-PSWF.mjs");
var Route$1 = createFileRoute("/services_/corporate-strategy")({
	head: () => ({
		meta: [
			{ title: page$1.title },
			{
				name: "description",
				content: page$1.description
			},
			{
				property: "og:title",
				content: page$1.title
			},
			{
				property: "og:description",
				content: page$1.description
			},
			{
				property: "og:url",
				content: canonical(page$1.path)
			}
		],
		links: [{
			rel: "canonical",
			href: canonical(page$1.path)
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var page = seoPages.finance;
var $$splitComponentImporter = () => import("./services_.finance-governance-f-6Q6Saz.mjs");
var Route = createFileRoute("/services_/finance-governance")({
	head: () => ({
		meta: [
			{ title: page.title },
			{
				name: "description",
				content: page.description
			},
			{
				property: "og:title",
				content: page.title
			},
			{
				property: "og:description",
				content: page.description
			},
			{
				property: "og:url",
				content: canonical(page.path)
			}
		],
		links: [{
			rel: "canonical",
			href: canonical(page.path)
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$23.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$24
	}),
	AboutRoute: Route$22.update({
		id: "/about",
		path: "/about",
		getParentRoute: () => Route$24
	}),
	AeRoute: Route$21.update({
		id: "/ae",
		path: "/ae",
		getParentRoute: () => Route$24
	}),
	Big1csRoute: Route$20.update({
		id: "/big1cs",
		path: "/big1cs",
		getParentRoute: () => Route$24
	}),
	Big1gcRoute: Route$19.update({
		id: "/big1gc",
		path: "/big1gc",
		getParentRoute: () => Route$24
	}),
	ContactRoute: Route$18.update({
		id: "/contact",
		path: "/contact",
		getParentRoute: () => Route$24
	}),
	NetworksRoute: Route$17.update({
		id: "/networks",
		path: "/networks",
		getParentRoute: () => Route$24
	}),
	SgRoute: Route$16.update({
		id: "/sg",
		path: "/sg",
		getParentRoute: () => Route$24
	}),
	ThalmuxRoute: Route$15.update({
		id: "/thalmux",
		path: "/thalmux",
		getParentRoute: () => Route$24
	}),
	UkRoute: Route$14.update({
		id: "/uk",
		path: "/uk",
		getParentRoute: () => Route$24
	}),
	UsRoute: Route$13.update({
		id: "/us",
		path: "/us",
		getParentRoute: () => Route$24
	}),
	Big1csConsultingFirmAhmedabadRoute: Route$12.update({
		id: "/big1cs_/consulting-firm-ahmedabad",
		path: "/big1cs/consulting-firm-ahmedabad",
		getParentRoute: () => Route$24
	}),
	Big1csConsultingFirmBengaluruRoute: Route$11.update({
		id: "/big1cs_/consulting-firm-bengaluru",
		path: "/big1cs/consulting-firm-bengaluru",
		getParentRoute: () => Route$24
	}),
	Big1csConsultingFirmDelhiNcrRoute: Route$10.update({
		id: "/big1cs_/consulting-firm-delhi-ncr",
		path: "/big1cs/consulting-firm-delhi-ncr",
		getParentRoute: () => Route$24
	}),
	Big1csConsultingFirmHyderabadRoute: Route$9.update({
		id: "/big1cs_/consulting-firm-hyderabad",
		path: "/big1cs/consulting-firm-hyderabad",
		getParentRoute: () => Route$24
	}),
	Big1csConsultingFirmLucknowRoute: Route$8.update({
		id: "/big1cs_/consulting-firm-lucknow",
		path: "/big1cs/consulting-firm-lucknow",
		getParentRoute: () => Route$24
	}),
	Big1csConsultingFirmMumbaiRoute: Route$7.update({
		id: "/big1cs_/consulting-firm-mumbai",
		path: "/big1cs/consulting-firm-mumbai",
		getParentRoute: () => Route$24
	}),
	Big1gcGlobalFinancialModelingIxbrlRoute: Route$6.update({
		id: "/big1gc_/global-financial-modeling-ixbrl",
		path: "/big1gc/global-financial-modeling-ixbrl",
		getParentRoute: () => Route$24
	}),
	Big1gcIndiaMarketEntryAdvisoryRoute: Route$5.update({
		id: "/big1gc_/india-market-entry-advisory",
		path: "/big1gc/india-market-entry-advisory",
		getParentRoute: () => Route$24
	}),
	Big1gcInternationalCorporateStrategyRoute: Route$4.update({
		id: "/big1gc_/international-corporate-strategy",
		path: "/big1gc/international-corporate-strategy",
		getParentRoute: () => Route$24
	}),
	ServicesAiAutomationRoute: Route$3.update({
		id: "/services_/ai-automation",
		path: "/services/ai-automation",
		getParentRoute: () => Route$24
	}),
	ServicesBrandingInfluenceRoute: Route$2.update({
		id: "/services_/branding-influence",
		path: "/services/branding-influence",
		getParentRoute: () => Route$24
	}),
	ServicesCorporateStrategyRoute: Route$1.update({
		id: "/services_/corporate-strategy",
		path: "/services/corporate-strategy",
		getParentRoute: () => Route$24
	}),
	ServicesFinanceGovernanceRoute: Route.update({
		id: "/services_/finance-governance",
		path: "/services/finance-governance",
		getParentRoute: () => Route$24
	})
};
var routeTree = Route$24._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { page$21 as C, page$20 as S, cornerstone as T, page$15 as _, page$3 as a, page$18 as b, page$6 as c, page$9 as d, page$10 as f, page$14 as g, page$13 as h, page$2 as i, page$7 as l, page$12 as m, page as n, page$4 as o, page$11 as p, page$1 as r, page$5 as s, router_exports as t, page$8 as u, page$16 as v, canonical as w, page$19 as x, page$17 as y };
