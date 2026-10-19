import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as cornerstone, w as canonical } from "./router-DUsPvi5N.mjs";
import { t as company } from "./company-Cf-lyrYb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SeoArticle-CHHVN0vc.js
var import_jsx_runtime = require_jsx_runtime();
var mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.hq.address)}`;
function SeoArticle({ page }) {
	const localSchema = page.local ? {
		"@context": "https://schema.org",
		"@type": "ProfessionalService",
		name: "BIG1CS (Big1 Consultancy Services)",
		url: canonical(page.path),
		parentOrganization: { "@id": "https://www.big1global.com/#organization" },
		telephone: company.hq.phone,
		email: company.hq.email,
		image: "https://www.big1global.com/assets/big1-global-logo.png",
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
		areaServed: {
			"@type": "City",
			name: page.local.city
		}
	} : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "apage",
		children: [
			localSchema ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
				type: "application/ld+json",
				dangerouslySetInnerHTML: { __html: JSON.stringify(localSchema) }
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "apage-bar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "apage-brand",
					href: "/",
					children: "BIG1 GLOBAL"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					"aria-label": "Cornerstone",
					children: cornerstone.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: link.href,
						children: link.label
					}, link.href))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "apage-section",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "apage-kicker",
						children: page.kicker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: page.h1 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "apage-lead",
						children: page.answer
					}),
					page.blocks.map((block) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: block.heading }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "apage-lead",
							children: block.answer
						}),
						block.paragraphs?.map((paragraph) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "apage-lead",
							children: paragraph
						}, paragraph)),
						block.list ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "apage-points",
							children: block.list.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item))
						}) : null
					] }, block.heading)),
					page.table ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "apage-table-wrap",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "apage-table",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
									className: "apage-kicker",
									children: page.table.caption
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: page.table.headers.map((header) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: header }, header)) }) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: page.table.rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: row.map((cell) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: cell.startsWith("http") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: cell,
									children: cell.replace("https://", "")
								}) : cell }, cell)) }, row[0])) })
							]
						})
					}) : null,
					page.local ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "apage-card",
						style: { marginTop: 36 },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Name, address, phone" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "apage-lead",
								children: [
									company.name,
									". ",
									company.legal,
									". One headquarters, used for every city this page serves."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: company.hq.address }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: company.hq.phoneHref,
									children: company.hq.phone
								}),
								" · ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `mailto:${company.hq.email}`,
									children: company.hq.email
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								"Markets named on this page: ",
								page.local.neighborhoods.join(", "),
								"."
							] }),
							page.map ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: mapHref,
								children: "Open the Lucknow headquarters on Google Maps"
							}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								"There is no separate office in ",
								page.local.city,
								". The map pin is the Lucknow headquarters."
							] })
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "apage-actions",
						"aria-label": "Related",
						children: cornerstone.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: link.href,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Cornerstone" }), link.label]
						}, link.href))
					})
				]
			})
		]
	});
}
//#endregion
export { SeoArticle as t };
