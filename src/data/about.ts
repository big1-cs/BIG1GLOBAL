export type StatementWord = {
  text: string;
  accent?: boolean;
};

export const aboutStatement: StatementWord[] = [
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
  { text: "fifteen", accent: true },
  { text: "global" },
  { text: "centres," },
  { text: "six", accent: true },
  { text: "Indian" },
  { text: "domestic" },
  { text: "centres," },
  { text: "three", accent: true },
  { text: "living" },
  { text: "networks" },
  { text: "and" },
  { text: "one", accent: true },
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
  { text: "whom." },
];

export const aboutInterlude = {
  lead: "Two wings.",
  accent: "One apex.",
};

export const principles = [
  {
    n: "01",
    title: "One apex, many specialists",
    body: [
      "BIG1 GLOBAL holds the centre. Specialist centres and live portals carry the work.",
      "A mandate stays with the people who actually practise that discipline.",
    ],
  },
  {
    n: "02",
    title: "Verified people, not just software",
    body: [
      "Networks are built from accredited professionals and operating businesses.",
      "Software routes the work. People remain accountable for it.",
    ],
  },
  {
    n: "03",
    title: "Transparent from introduction to payout",
    body: [
      "Introducers, professionals and clients can see how a mandate moves.",
      "Credit and commission follow a ledger, not a private arrangement.",
    ],
  },
] as const;
