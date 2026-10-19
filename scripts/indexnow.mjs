const key = "a7c3e91b4d2f6085b1e0c4d8a9f3b6e2";
const host = "www.big1global.com";
const paths = [
  "/",
  "/about",
  "/big1cs",
  "/big1cs/consulting-firm-lucknow",
  "/big1cs/consulting-firm-delhi-ncr",
  "/big1cs/consulting-firm-mumbai",
  "/big1cs/consulting-firm-bengaluru",
  "/big1cs/consulting-firm-hyderabad",
  "/big1cs/consulting-firm-ahmedabad",
  "/big1gc",
  "/big1gc/international-corporate-strategy",
  "/big1gc/global-financial-modeling-ixbrl",
  "/big1gc/india-market-entry-advisory",
  "/us",
  "/uk",
  "/ae",
  "/sg",
  "/thalmux",
  "/networks",
  "/services/finance-governance",
  "/services/corporate-strategy",
  "/services/ai-automation",
  "/services/branding-influence",
  "/contact",
];

const body = {
  host,
  key,
  keyLocation: `https://${host}/${key}.txt`,
  urlList: paths.map((path) => (path === "/" ? `https://${host}/` : `https://${host}${path}`)),
};

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});

console.log(response.status, await response.text());
if (!response.ok) process.exit(1);
