export type Audience = {
  id: string;
  label: string;
  nodes: string[];
  centres: string[];
  caption: string;
  firstPortal: string;
};

export const audiences: Audience[] = [
  {
    id: "founder",
    label: "Founder",
    nodes: ["apex", "wing-india", "big1cs", "setup", "compliance", "cat-governance", "ben", "pen", "thalmux"],
    centres: ["COE-01", "COE-02"],
    caption:
      "Start with **Setup** → **Compliance**, delivered by **PEN**, routed by **THALMUX**.",
    firstPortal: "setup",
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
      "thalmux",
    ],
    centres: ["COE-04"],
    caption:
      "Start with **Compliance**, **Assurance** and **Advisory**, delivered by **PEN**, routed by **THALMUX**.",
    firstPortal: "compliance",
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
      "thalmux",
    ],
    centres: ["COE-02", "COE-14", "COE-11", "COE-13"],
    caption:
      "Both wings — **Compliance**, **Assurance**, **Diligence** — through **BEN** and **PEN**, routed by **THALMUX**.",
    firstPortal: "compliance",
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
      "thalmux",
    ],
    centres: ["COE-07", "COE-02", "COE-05"],
    caption:
      "Start with **Wealth** and **Advisory**, through **BEN**, **PEN** and **CAN**, routed by **THALMUX**.",
    firstPortal: "wealth",
  },
  {
    id: "professional",
    label: "CA / CPA / CS / lawyer",
    nodes: ["pen", "thalmux"],
    centres: [],
    caption: "Enter through **PEN**. The work you carry is routed by **THALMUX**.",
    firstPortal: "pen",
  },
  {
    id: "partner",
    label: "Introducer / partner",
    nodes: ["can", "thalmux"],
    centres: [],
    caption: "Enter through **CAN**. Origination is ledgered, then routed by **THALMUX**.",
    firstPortal: "can",
  },
];
