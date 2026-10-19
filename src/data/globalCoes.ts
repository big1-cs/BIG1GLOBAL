export type GlobalCentre = {
  id: string;
  code: string;
  label: string;
  plainTitle: string;
  summary: string;
  stats: [string, string];
  category: string;
  bridges: string[];
};

export type CoeCategory = {
  id: string;
  title: string;
  centreIds: string[];
};

export const coeCategories: CoeCategory[] = [
  {
    id: "governance",
    title: "Governance & Tax",
    centreIds: ["COE-01", "COE-02", "COE-15"],
  },
  {
    id: "capital",
    title: "Capital & Turnaround",
    centreIds: ["COE-04", "COE-05", "COE-06"],
  },
  {
    id: "wealth",
    title: "Wealth & Risk",
    centreIds: ["COE-03", "COE-07", "COE-08"],
  },
  {
    id: "frontier",
    title: "Frontier & Technology",
    centreIds: ["COE-09", "COE-10", "COE-13"],
  },
  {
    id: "strategy",
    title: "Strategy & Trade",
    centreIds: ["COE-11", "COE-12", "COE-14"],
  },
];

export const globalCentres: GlobalCentre[] = [
  {
    id: "COE-01",
    code: "01",
    label: "Statutory & Compliance",
    plainTitle: "Global Company Governance & Filings",
    summary:
      "Cross-border entity governance, statutory filings and company-secretarial coordination.",
    stats: ["180+ jurisdictions", "Filings per mandate"],
    category: "governance",
    bridges: ["setup", "compliance"],
  },
  {
    id: "COE-02",
    code: "02",
    label: "International Taxation",
    plainTitle: "Cross-Border Taxes & Treaties",
    summary:
      "Treaty analysis, withholding positions and cross-border tax structuring support.",
    stats: ["94 DTAAs", "Treaty positions"],
    category: "governance",
    bridges: ["setup"],
  },
  {
    id: "COE-03",
    code: "03",
    label: "Risk Assurance & Forensic",
    plainTitle: "Global Audits & Fraud Investigation",
    summary:
      "Audit, forensic review and fraud investigation scoped to the engagement letter.",
    stats: ["450+ cases", "Forensic reviews"],
    category: "wealth",
    bridges: ["assurance", "diligence"],
  },
  {
    id: "COE-04",
    code: "04",
    label: "Corporate Finance",
    plainTitle: "Cross-Border M&A & Valuations",
    summary:
      "Buy-side and sell-side support, valuation and transaction structuring across borders.",
    stats: ["$8.4B+ advised", "Transaction support"],
    category: "capital",
    bridges: ["advisory"],
  },
  {
    id: "COE-05",
    code: "05",
    label: "Capital Markets & Securities",
    plainTitle: "Global IPOs & Institutional Funds",
    summary:
      "Listing readiness, fund formation context and institutional capital-markets support.",
    stats: ["42 offerings", "Capital markets"],
    category: "capital",
    bridges: ["advisory"],
  },
  {
    id: "COE-06",
    code: "06",
    label: "Insolvency & Restructuring",
    plainTitle: "Turnarounds & Debt Restructuring",
    summary:
      "Distress review, creditor coordination and restructuring options for stressed mandates.",
    stats: ["78% turnaround rate", "Restructuring"],
    category: "capital",
    bridges: [],
  },
  {
    id: "COE-07",
    code: "07",
    label: "Private Wealth & Estate",
    plainTitle: "Family Offices & Global Trusts",
    summary:
      "Family-office governance, trust structuring context and multi-generational wealth planning.",
    stats: ["115+ family offices", "Private wealth"],
    category: "wealth",
    bridges: ["wealth"],
  },
  {
    id: "COE-08",
    code: "08",
    label: "Crisis Management",
    plainTitle: "Emergency Defense & Cyber Response",
    summary:
      "Rapid response coordination for crisis, incident and cyber-defence mandates.",
    stats: ["<45 min response", "Crisis desk"],
    category: "wealth",
    bridges: [],
  },
  {
    id: "COE-09",
    code: "09",
    label: "Digital Assets & AI",
    plainTitle: "AI Compliance & Web3 Licensing",
    summary:
      "Licensing, policy and compliance context for AI systems and digital-asset activity.",
    stats: ["260+ AI protocols", "Digital assets"],
    category: "frontier",
    bridges: [],
  },
  {
    id: "COE-10",
    code: "10",
    label: "Frontier Tech & Automation",
    plainTitle: "Patents, Robotics & R&D Tax Cash",
    summary:
      "Patent strategy context, robotics programmes and R&D incentive identification.",
    stats: ["1,400+ patents", "R&D incentives"],
    category: "frontier",
    bridges: [],
  },
  {
    id: "COE-11",
    code: "11",
    label: "Energy, Sustainability & ESG",
    plainTitle: "Carbon Credits & Green Finance",
    summary:
      "Carbon, sustainability reporting and green-finance structuring support.",
    stats: ["$2.3B green bonds", "ESG finance"],
    category: "strategy",
    bridges: ["assurance"],
  },
  {
    id: "COE-12",
    code: "12",
    label: "Public Policy & Strategy",
    plainTitle: "Government Affairs & Trade Deals",
    summary:
      "Public-policy context, trade-agreement reading and government-affairs coordination.",
    stats: ["38 FTAs", "Trade policy"],
    category: "strategy",
    bridges: [],
  },
  {
    id: "COE-13",
    code: "13",
    label: "Digital Transformation",
    plainTitle: "Cloud ERP & AI Modernization",
    summary:
      "ERP, cloud and AI modernisation programmes tied to operating-model change.",
    stats: ["180+ ERP deployments", "Modernisation"],
    category: "frontier",
    bridges: ["compliance"],
  },
  {
    id: "COE-14",
    code: "14",
    label: "Supply Chain & Logistics",
    plainTitle: "Customs Duties & Global Shipping Law",
    summary:
      "Customs classification, duties and shipping-law support for cross-border goods.",
    stats: ["75,000+ customs entries", "Trade compliance"],
    category: "strategy",
    bridges: ["diligence"],
  },
  {
    id: "COE-15",
    code: "15",
    label: "Research & Thought Leadership",
    plainTitle: "Macro Intelligence & Market Benchmarks",
    summary:
      "Market benchmarks and macro intelligence briefs prepared for a specific mandate.",
    stats: ["320+ reports", "Market intelligence"],
    category: "governance",
    bridges: [],
  },
];

export function centresIn(categoryId: string) {
  return globalCentres.filter((centre) => centre.category === categoryId);
}
