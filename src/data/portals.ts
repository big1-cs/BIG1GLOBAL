export type PortalGroup = "india" | "network" | "ai";

export type Portal = {
  id: string;
  name: string;
  url: string;
  group: PortalGroup;
  groupLabel: string;
  glyph: string;
  tagline: string;
  description: string;
  color: string;
};

export const portals: Portal[] = [
  {
    id: "big1cs",
    name: "BIG1CS",
    url: "https://big1cs.com",
    group: "india",
    groupLabel: "Wing 02 · India",
    glyph: "big1cs",
    tagline: "India hub",
    description:
      "India's six Centres of Excellence for setup, compliance, wealth, assurance, advisory and diligence. Headquartered in Lucknow.",
    color: "#22D3EE",
  },
  {
    id: "setup",
    name: "CoE Setup",
    url: "https://setup.big1cs.com",
    group: "india",
    groupLabel: "Wing 02 · India",
    glyph: "setup",
    tagline: "Formation",
    description:
      "Business formation, company incorporation, startup registration and foundational structuring.",
    color: "#22D3EE",
  },
  {
    id: "compliance",
    name: "CoE Compliance",
    url: "https://compliance.big1cs.com",
    group: "india",
    groupLabel: "Wing 02 · India",
    glyph: "compliance",
    tagline: "Statutory filing",
    description:
      "GST and income-tax filing, ROC/MCA compliance and related statutory filing support.",
    color: "#22D3EE",
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
    color: "#22D3EE",
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
    color: "#22D3EE",
  },
  {
    id: "advisory",
    name: "CoE Advisory",
    url: "https://advisory.big1cs.com",
    group: "india",
    groupLabel: "Wing 02 · India",
    glyph: "advisory",
    tagline: "Strategy",
    description:
      "Management consulting, business strategy, organisational change and market planning.",
    color: "#22D3EE",
  },
  {
    id: "diligence",
    name: "CoE Diligence",
    url: "https://diligence.big1cs.com",
    group: "india",
    groupLabel: "Wing 02 · India",
    glyph: "diligence",
    tagline: "Verification",
    description:
      "Due diligence, verification, field work, recovery support and valuation.",
    color: "#22D3EE",
  },
  {
    id: "ben",
    name: "BEN",
    url: "https://ben.big1cs.com",
    group: "network",
    groupLabel: "Network string",
    glyph: "ben",
    tagline: "Business Excellence Network",
    description:
      "Connecting business leaders, founders, CXOs and enterprises across India and the global ecosystem. 14,200+ businesses.",
    color: "#3B82F6",
  },
  {
    id: "pen",
    name: "PEN",
    url: "https://pen.big1cs.com",
    group: "network",
    groupLabel: "Network string",
    glyph: "pen",
    tagline: "Professional Excellence Network",
    description:
      "India's professional ecosystem for startup acceleration, governance, wealth creation, due diligence and strategic advisory. 2,850+ verified experts.",
    color: "#8B5CF6",
  },
  {
    id: "can",
    name: "CAN",
    url: "https://can.big1cs.com",
    group: "network",
    groupLabel: "Network string",
    glyph: "can",
    tagline: "Client Acquisition Network",
    description:
      "The channel-partner and introducer network with a transparent mandate-origination ledger. Up to 25% commission.",
    color: "#10B981",
  },
  {
    id: "thalmux",
    name: "THALMUX™",
    url: "https://www.thalmux.com",
    group: "ai",
    groupLabel: "AI core",
    glyph: "thalmux",
    tagline: "AI engine",
    description:
      "The AI engine that reads a scenario and routes it to the right centres, professionals and partners.",
    color: "#F5B83D",
  },
];

export const bridges: Record<string, string[]> = {
  setup: ["COE-01", "COE-02"],
  compliance: ["COE-13", "COE-01"],
  wealth: ["COE-07"],
  assurance: ["COE-03", "COE-11"],
  advisory: ["COE-04", "COE-05"],
  diligence: ["COE-03", "COE-14"],
};
