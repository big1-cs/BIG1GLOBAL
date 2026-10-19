export type SeoBlock = {
  heading: string;
  answer: string;
  paragraphs?: string[];
  list?: string[];
};

export type SeoPage = {
  path: string;
  title: string;
  description: string;
  kicker: string;
  h1: string;
  answer: string;
  blocks: SeoBlock[];
  table?: { caption: string; headers: string[]; rows: string[][] };
  local?: { city: string; neighborhoods: string[] };
  map?: boolean;
};

const ORIGIN = "https://www.big1global.com";

export const cornerstone = [
  { href: "/about", label: "About BIG1 Global" },
  { href: "/big1cs", label: "corporate consulting firm in India BIG1CS" },
  { href: "/big1gc", label: "global consulting firm BIG1GC" },
  { href: "/thalmux", label: "THALMUX intelligence engine" },
  { href: "/networks", label: "CAN, PEN and BEN networks" },
] as const;

export const seoPages = {
  big1cs: {
    path: "/big1cs",
    title: "BIG1CS | Business Consulting Firm in India for Startups, MSMEs and Enterprises",
    description:
      "BIG1CS is the domestic consulting wing of BIG1 Global. Corporate advisory, taxation, compliance, financial modeling and scale for Indian startups, MSMEs and large enterprises. Headquartered in Lucknow.",
    kicker: "Domestic wing · India",
    h1: "Business consulting firm in India for startups, MSMEs and large enterprises",
    answer:
      "BIG1CS (Big1 Consultancy Services) is the Indian consulting wing of BIG1 Global. It advises startups, MSMEs and domestic enterprises on incorporation, taxation, statutory compliance, DuPont financial analysis, iXBRL reporting, governance and brand positioning, from its Lucknow headquarters.",
    blocks: [
      {
        heading: "What BIG1CS holds",
        answer:
          "BIG1CS is built for the Indian regulatory system. A mandate can cover formation, GST and income-tax filing, ROC work, wealth planning, assurance, strategy or diligence, then stay with one accountable centre.",
        list: [
          "Corporate incorporation and foundational structuring",
          "GST, income-tax and ROC/MCA compliance",
          "DuPont analysis, valuation and iXBRL standardization",
          "MSME scaling and domestic brand positioning",
        ],
      },
    ],
    table: {
      caption: "Where a domestic mandate usually starts",
      headers: ["Need", "Centre", "Live portal"],
      rows: [
        ["Formation", "Setup", "https://setup.big1cs.com"],
        ["Statutory filing", "Compliance", "https://compliance.big1cs.com"],
        ["Wealth", "Wealth", "https://wealth.big1cs.com"],
        ["Assurance", "Assurance", "https://assurance.big1cs.com"],
        ["Strategy", "Advisory", "https://advisory.big1cs.com"],
        ["Verification", "Diligence", "https://diligence.big1cs.com"],
      ],
    },
  },
  lucknow: {
    path: "/big1cs/consulting-firm-lucknow",
    title: "Consulting Firm in Lucknow | BIG1CS Headquarters, Sushant Golf City",
    description:
      "BIG1CS is a consulting firm in Lucknow for startups, MSMEs and enterprises. Headquarters at Sushant Golf City. Corporate advisory, compliance, taxation and financial modeling across Uttar Pradesh.",
    kicker: "Lucknow · Headquarters",
    h1: "Consulting firm in Lucknow for corporate advisory and MSME scale",
    answer:
      "BIG1CS is a consulting firm headquartered in Lucknow, Uttar Pradesh. From Sushant Golf City it advises startups, MSMEs and enterprises on Indian corporate law, taxation, compliance, financial modeling and growth, and serves the wider Uttar Pradesh market from this single office.",
    local: {
      city: "Lucknow",
      neighborhoods: ["Sushant Golf City", "Gomti Nagar", "Hazratganj", "Vibhuti Khand"],
    },
    map: true,
    blocks: [
      {
        heading: "The Lucknow headquarters",
        answer:
          "This is the only BIG1CS office. Mandates for Lucknow and the rest of India are accepted here and routed to the centre that should hold the work. There is no second storefront.",
        paragraphs: [
          "Clients across Gomti Nagar, Hazratganj, Vibhuti Khand and Sushant Golf City are served from this address. Scope is confirmed in the engagement letter.",
        ],
      },
    ],
  },
  delhi: {
    path: "/big1cs/consulting-firm-delhi-ncr",
    title: "Consulting Firm for Delhi NCR | BIG1CS — Gurugram, Noida and New Delhi",
    description:
      "BIG1CS advises Delhi NCR startups, MSMEs and corporates on compliance, taxation, governance and scale. Work is delivered from the Lucknow headquarters, not a separate NCR office.",
    kicker: "Delhi NCR · Served from Lucknow",
    h1: "Consulting firm for New Delhi, Gurugram and Noida",
    answer:
      "BIG1CS advises companies in Delhi NCR on corporate compliance, taxation, governance and growth. The firm does not keep a separate Delhi office. Mandates from New Delhi, Gurugram and Noida are held from the Lucknow headquarters and staffed through the professional network.",
    local: { city: "Delhi NCR", neighborhoods: ["New Delhi", "Gurugram", "Noida", "Connaught Place"] },
    blocks: [
      {
        heading: "How an NCR mandate is held",
        answer:
          "A Delhi NCR brief is read at headquarters, then routed to the BIG1CS centre that matches the work: setup, compliance, assurance, advisory, wealth or diligence.",
      },
    ],
  },
  mumbai: {
    path: "/big1cs/consulting-firm-mumbai",
    title: "Consulting Firm for Mumbai | BIG1CS Corporate and Financial Advisory",
    description:
      "BIG1CS advises Mumbai companies on corporate finance context, compliance, taxation and governance. Delivery is from the Lucknow headquarters. No separate Mumbai office.",
    kicker: "Mumbai · Served from Lucknow",
    h1: "Consulting firm for Mumbai companies and financial mandates",
    answer:
      "BIG1CS advises Mumbai businesses on statutory compliance, taxation, governance and strategic finance. BIG1CS has no Mumbai office. Bandra Kurla Complex, Nariman Point and the wider Maharashtra market are served from the Lucknow headquarters under one engagement letter.",
    local: { city: "Mumbai", neighborhoods: ["Bandra Kurla Complex", "Nariman Point", "Andheri"] },
    blocks: [
      {
        heading: "What Mumbai mandates usually need",
        answer:
          "Typical work includes compliance calendars, board reporting context, transaction support and diligence. The centre is named before work starts.",
      },
    ],
  },
  bengaluru: {
    path: "/big1cs/consulting-firm-bengaluru",
    title: "Consulting Firm for Bengaluru Startups | BIG1CS",
    description:
      "BIG1CS advises Bengaluru startups and technology companies on formation, compliance, finance and scale. The office is in Lucknow. Bengaluru is a service corridor, not a branch.",
    kicker: "Bengaluru · Served from Lucknow",
    h1: "Consulting firm for Bengaluru startups and technology companies",
    answer:
      "BIG1CS advises Bengaluru startups and product companies on incorporation, statutory compliance, financial modeling and scale. There is no Bengaluru branch. Whitefield, Koramangala and the wider city are served from the Lucknow headquarters.",
    local: { city: "Bengaluru", neighborhoods: ["Whitefield", "Koramangala", "Indiranagar"] },
    blocks: [
      {
        heading: "Startup and scale work",
        answer:
          "A Bengaluru brief can start in formation or compliance and later move to advisory. THALMUX routes the scenario to the centre that should hold it.",
      },
    ],
  },
  hyderabad: {
    path: "/big1cs/consulting-firm-hyderabad",
    title: "Consulting Firm for Hyderabad | BIG1CS Enterprise Advisory",
    description:
      "BIG1CS advises Hyderabad enterprises on compliance, taxation, governance and operating-model work. Headquarters remain in Lucknow. Hyderabad is a served market.",
    kicker: "Hyderabad · Served from Lucknow",
    h1: "Consulting firm for Hyderabad enterprises",
    answer:
      "BIG1CS advises Hyderabad companies on Indian corporate compliance, taxation, governance and financial reporting. HITEC City and Gachibowli are served markets. The only office is the Lucknow headquarters of BIG1CS.",
    local: { city: "Hyderabad", neighborhoods: ["HITEC City", "Gachibowli", "Financial District"] },
    blocks: [
      {
        heading: "Enterprise reporting",
        answer:
          "Hyderabad mandates often need a clean compliance calendar, board-ready numbers and iXBRL-ready reporting context. Scope is written down before work begins.",
      },
    ],
  },
  ahmedabad: {
    path: "/big1cs/consulting-firm-ahmedabad",
    title: "Consulting Firm for Ahmedabad and Gujarat MSMEs | BIG1CS",
    description:
      "BIG1CS advises Ahmedabad and Gujarat MSMEs on compliance, finance and industrial scale. Work is run from Lucknow. GIFT City is a corridor, not a second headquarters.",
    kicker: "Ahmedabad · Served from Lucknow",
    h1: "Consulting firm for Ahmedabad industry and Gujarat MSMEs",
    answer:
      "BIG1CS advises Ahmedabad manufacturers and Gujarat MSMEs on compliance, taxation, finance and operating scale. SG Highway and the GIFT City corridor are served from Lucknow. BIG1CS does not operate a separate Ahmedabad office.",
    local: { city: "Ahmedabad", neighborhoods: ["SG Highway", "GIFT City", "Naroda"] },
    blocks: [
      {
        heading: "Industrial and MSME work",
        answer:
          "Gujarat mandates often combine statutory filing with supply-chain or expansion questions. The domestic centre stays accountable for the letter of engagement.",
      },
    ],
  },
  big1gc: {
    path: "/big1gc",
    title: "BIG1GC | Global Consulting Firm for Cross-Border Enterprises",
    description:
      "BIG1GC is the international consulting wing of BIG1 Global. Cross-border strategy, global financial structuring, market entry and offshore execution for overseas businesses and multinationals.",
    kicker: "International wing",
    h1: "Global consulting firm for cross-border enterprises and international growth",
    answer:
      "BIG1GC (Big1 Global Consulting) is the international wing of BIG1 Global. It advises overseas founders, foreign corporations and multinationals on cross-border strategy, international structuring, global financial modeling, market entry and offshore operations. It is not a separate website. A mandate is opened from BIG1 Global.",
    blocks: [
      {
        heading: "What an international mandate covers",
        answer:
          "BIG1GC reads the jurisdiction, the capital path and the operating question, then places the work with the international centre that matches it. Fifteen global centres sit under this wing.",
        list: [
          "Cross-border entity governance and filings",
          "Treaty and withholding analysis",
          "Valuation, listings context and restructuring options",
          "India-entry and global expansion advisory",
        ],
      },
    ],
  },
  strategy: {
    path: "/big1gc/international-corporate-strategy",
    title: "International Corporate Strategy | BIG1GC Cross-Border Advisory",
    description:
      "BIG1GC international corporate strategy for market expansion, trade policy context and cross-border operating models. A mandate of BIG1 Global, not a standalone firm.",
    kicker: "BIG1GC · Strategy",
    h1: "International corporate strategy and cross-border advisory",
    answer:
      "International corporate strategy at BIG1GC is the work of choosing a market, a structure and an operating model across borders. It covers expansion sequencing, trade-agreement context and government-affairs coordination for a named mandate. BIG1 Global holds the engagement.",
    blocks: [
      {
        heading: "Where strategy sits",
        answer:
          "Public policy, trade and market-entry questions are read with the financial and compliance questions. They are not sold as a separate product line.",
      },
    ],
  },
  modeling: {
    path: "/big1gc/global-financial-modeling-ixbrl",
    title: "Global Financial Modeling and iXBRL | BIG1GC",
    description:
      "DuPont analysis, cash-flow modeling, valuation context and iXBRL standardization for cross-border mandates, delivered by BIG1GC under BIG1 Global.",
    kicker: "BIG1GC · Finance",
    h1: "Global financial modeling, DuPont analysis and iXBRL reporting",
    answer:
      "BIG1GC financial work covers DuPont and ratio analysis, cash-flow models, valuation context and Inline XBRL standardization for cross-border reporting. The model follows the engagement letter. It does not replace a statutory audit unless that audit is separately agreed.",
    blocks: [
      {
        heading: "What the model is for",
        answer:
          "The model exists so a board can see leverage, margin and cash in one place, and so a filing pack can be prepared in a consistent format across jurisdictions.",
      },
    ],
  },
  entry: {
    path: "/big1gc/india-market-entry-advisory",
    title: "India Market Entry Advisory | BIG1GC for Foreign Companies",
    description:
      "BIG1GC helps foreign companies read an India entry: entity choice, compliance path and operating setup, alongside BIG1CS for the domestic work.",
    kicker: "BIG1GC · India entry",
    h1: "India market-entry advisory for foreign companies",
    answer:
      "India market-entry advisory at BIG1GC helps a foreign company choose an entity path, a compliance calendar and an operating setup. BIG1GC holds the cross-border question. BIG1CS holds the Indian statutory work. One parent, two wings, one letter of engagement.",
    blocks: [
      {
        heading: "How the two wings split the entry",
        answer:
          "The international wing frames structure, capital and reporting. The domestic wing handles incorporation, tax registration and Indian filings. THALMUX keeps the brief in one place.",
      },
    ],
  },
  us: {
    path: "/us",
    title: "North America Corporate Consulting | BIG1GC United States Corridor",
    description:
      "BIG1GC advisory for United States and North American companies entering or operating across borders, including the Delaware corridor. Delivered by BIG1 Global.",
    kicker: "Corridor · United States",
    h1: "North America corporate consulting for cross-border mandates",
    answer:
      "The United States corridor of BIG1GC is for North American companies that need cross-border structure, reporting or an India operating path. Delaware is one jurisdiction in that reading. BIG1GC does not claim a United States office. The headquarters are in Lucknow.",
    blocks: [
      {
        heading: "What this corridor is",
        answer:
          "It is a way to open a mandate, not a local branch. Work is scoped in writing and delivered by the international centres and the professional network.",
      },
    ],
  },
  uk: {
    path: "/uk",
    title: "UK and European Enterprise Advisory | BIG1GC",
    description:
      "BIG1GC advisory for United Kingdom and European enterprises on cross-border structure, reporting and India-entry. No London office is claimed. Headquarters are in Lucknow.",
    kicker: "Corridor · United Kingdom",
    h1: "UK and European enterprise advisory",
    answer:
      "The United Kingdom corridor of BIG1GC reads London and wider European questions of structure, tax treaties and market entry. BIG1 Global does not operate a UK office. Mandates are accepted at the Lucknow headquarters and staffed through BIG1GC.",
    blocks: [
      {
        heading: "European mandates",
        answer:
          "A UK or EMEA brief names the jurisdiction, the filing question and the commercial goal. The centre that holds it is chosen after that reading.",
      },
    ],
  },
  ae: {
    path: "/ae",
    title: "UAE and Middle East Strategic Consulting | BIG1GC",
    description:
      "BIG1GC advisory for UAE and Middle East companies, including the Dubai corridor. Cross-border structure and India links. Headquarters remain in Lucknow.",
    kicker: "Corridor · United Arab Emirates",
    h1: "UAE and Middle East strategic consulting",
    answer:
      "The UAE corridor of BIG1GC covers Dubai and wider Middle East questions of holding structure, trade and India expansion. DIFC is a jurisdiction clients ask about. BIG1 Global does not keep a Dubai office. The firm is headquartered in Lucknow.",
    blocks: [
      {
        heading: "Middle East to India",
        answer:
          "Many briefs connect a Gulf holding company with an Indian operating company. BIG1GC reads the cross-border side. BIG1CS reads the Indian filings.",
      },
    ],
  },
  sg: {
    path: "/sg",
    title: "Singapore and APAC Consulting Corridor | BIG1GC",
    description:
      "BIG1GC advisory for Singapore and Asia-Pacific companies on regional structure and India entry. No Singapore office is claimed. Headquarters are in Lucknow.",
    kicker: "Corridor · Singapore",
    h1: "Singapore and APAC consulting corridor",
    answer:
      "The Singapore corridor of BIG1GC is for Asia-Pacific companies that use Singapore as a regional base and need a cross-border or India plan. BIG1 Global has no Singapore office. Mandates are opened from the Lucknow headquarters.",
    blocks: [
      {
        heading: "Regional structure",
        answer:
          "The work is entity reading, reporting consistency and market sequence. It is confirmed per engagement, not offered as a local licence.",
      },
    ],
  },
  thalmux: {
    path: "/thalmux",
    title: "THALMUX | Central Intelligence Engine of BIG1 Global",
    description:
      "THALMUX is the proprietary operating layer of BIG1 Global. It reads a scenario and routes it to BIG1CS, BIG1GC and the CAN, PEN and BEN networks.",
    kicker: "Intelligence layer",
    h1: "THALMUX, the intelligence engine that routes a mandate",
    answer:
      "THALMUX is the proprietary intelligence layer of BIG1 Global. It reads a client scenario and routes it to the right centres, professionals and partners across BIG1CS and BIG1GC. It is an operating system for the firm, not a public chatbot and not a separate company.",
    blocks: [
      {
        heading: "What THALMUX coordinates",
        answer:
          "THALMUX keeps domestic and international work on one brief. It points at the centre, the network and the person who stays accountable.",
        list: [
          "Routes a scenario to BIG1CS or BIG1GC",
          "Connects CAN for origin, PEN for execution, BEN for leadership",
          "Keeps the engagement letter as the boundary of the work",
        ],
      },
    ],
  },
  networks: {
    path: "/networks",
    title: "CAN, PEN and BEN | The Three Networks of BIG1 Global",
    description:
      "CAN originates mandates, PEN executes them, BEN connects leaders. The three networks of BIG1 Global, used by both BIG1CS and BIG1GC.",
    kicker: "Tri-network",
    h1: "CAN, PEN and BEN, the three networks under BIG1 Global",
    answer:
      "CAN, PEN and BEN are the three networks of BIG1 Global. CAN is the client acquisition network. PEN is the professional excellence network. BEN is the business excellence network. THALMUX routes work across them for both BIG1CS in India and BIG1GC internationally.",
    blocks: [
      {
        heading: "What each network does",
        answer:
          "They are not three extra consulting firms. They are how a mandate is found, staffed and kept in a leadership community.",
        list: [
          "CAN — outreach and introducers. Live at can.big1cs.com.",
          "PEN — vetted professionals. Live at pen.big1cs.com.",
          "BEN — founders and CXOs. Live at ben.big1cs.com.",
        ],
      },
    ],
  },
  finance: {
    path: "/services/finance-governance",
    title: "Strategic Finance and Corporate Governance | BIG1 Global",
    description:
      "DuPont analysis, cash-flow modeling, valuation context, iXBRL and governance for BIG1CS and BIG1GC mandates.",
    kicker: "Centre of excellence",
    h1: "Strategic finance and corporate governance",
    answer:
      "Strategic finance and corporate governance at BIG1 Global covers ratio and DuPont analysis, cash-flow modeling, valuation context, iXBRL standardization and cross-jurisdiction compliance. BIG1CS uses it for Indian companies. BIG1GC uses it for international mandates.",
    blocks: [
      {
        heading: "The boundary",
        answer:
          "Analysis and reporting support follow the engagement letter. An audit, a legal opinion or a filing is included only when that scope is written down.",
      },
    ],
  },
  corporate: {
    path: "/services/corporate-strategy",
    title: "Corporate Strategy and Market Entry | BIG1 Global",
    description:
      "Market entry, MSME scaling and cross-border operating strategy from BIG1CS in India and BIG1GC internationally.",
    kicker: "Centre of excellence",
    h1: "Corporate strategy, market entry and scale",
    answer:
      "Corporate strategy at BIG1 Global is the choice of market, structure and operating sequence. BIG1CS applies it to Indian MSMEs and domestic groups. BIG1GC applies it to foreign companies entering India or expanding across borders.",
    blocks: [
      {
        heading: "Domestic and international",
        answer:
          "The same parent holds both. The wing changes with the jurisdiction. The letter of engagement names the work.",
      },
    ],
  },
  ai: {
    path: "/services/ai-automation",
    title: "Enterprise AI and Workflow Automation | BIG1 Global",
    description:
      "Workflow automation, reporting standardization and AI-assisted routing inside BIG1 Global mandates, coordinated by THALMUX.",
    kicker: "Centre of excellence",
    h1: "Enterprise technology and AI workflow automation",
    answer:
      "Enterprise technology work at BIG1 Global covers workflow automation, reporting pipelines and operating-model change tied to a mandate. THALMUX is the internal routing layer. This is not a general software product and not an open API.",
    blocks: [
      {
        heading: "Where automation is used",
        answer:
          "Automation removes repeated filing and reporting steps inside an agreed engagement. It does not replace the person accountable for the mandate.",
      },
    ],
  },
  brand: {
    path: "/services/branding-influence",
    title: "Corporate Branding and Market Influence | BIG1 Global",
    description:
      "Brand architecture and market positioning for Indian companies through BIG1CS and for international mandates through BIG1GC.",
    kicker: "Centre of excellence",
    h1: "Corporate branding and market influence",
    answer:
      "Corporate branding at BIG1 Global is the market position that sits beside the legal and financial structure. BIG1CS applies it to Indian companies. BIG1GC applies it when an international mandate needs a cross-border market story. It follows the same engagement letter.",
    blocks: [
      {
        heading: "What is in scope",
        answer:
          "Positioning, narrative and the link to the operating company. Media buying and campaign production are included only if the letter says so.",
      },
    ],
  },
  contact: {
    path: "/contact",
    title: "Contact BIG1 Global | Lucknow Headquarters for BIG1CS and BIG1GC",
    description:
      "Contact BIG1 Global at its Lucknow headquarters. One address and one phone for BIG1CS India mandates and BIG1GC international mandates.",
    kicker: "Headquarters",
    h1: "Contact BIG1 Global in Lucknow",
    answer:
      "BIG1 Global is contacted at its Lucknow headquarters. The same address and phone open a BIG1CS mandate for an Indian company or a BIG1GC mandate for an international one. Write to info@big1cs.com or call +91 73075 35860.",
    map: true,
    local: {
      city: "Lucknow",
      neighborhoods: ["Sushant Golf City", "Gomti Nagar", "Hazratganj"],
    },
    blocks: [
      {
        heading: "How to open a mandate",
        answer:
          "Use the Initiate mandate form on the homepage, or write directly. Say who you are, the jurisdiction, and the work. A person replies to the email you give.",
      },
    ],
  },
} satisfies Record<string, SeoPage>;

export const seoPageList = Object.values(seoPages);

export function canonical(path: string) {
  return path === "/" ? `${ORIGIN}/` : `${ORIGIN}${path}`;
}
