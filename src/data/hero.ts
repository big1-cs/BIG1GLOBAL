export type HeroLine = {
  text: string;
  face: "sans" | "serif";
  indent: 0 | 24 | 30;
};

export const heroLines: HeroLine[] = [
  { text: "Where every mandate", face: "sans", indent: 0 },
  { text: "finds its wings", face: "serif", indent: 24 },
  { text: "across one connected", face: "sans", indent: 0 },
  { text: "ecosystem", face: "serif", indent: 30 },
];
