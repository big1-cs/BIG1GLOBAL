import type { SVGProps } from "react";

type GlyphProps = SVGProps<SVGSVGElement>;

function Frame({ children, ...props }: GlyphProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function GlyphBig1cs(props: GlyphProps) {
  return (
    <Frame {...props}>
      <circle cx="32" cy="32" r="7" {...stroke} />
      {Array.from({ length: 8 }).map((_, index) => {
        const angle = (Math.PI / 4) * index;
        const x1 = 32 + Math.cos(angle) * 12;
        const y1 = 32 + Math.sin(angle) * 12;
        const x2 = 32 + Math.cos(angle) * 22;
        const y2 = 32 + Math.sin(angle) * 22;
        return <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} {...stroke} />;
      })}
    </Frame>
  );
}

export function GlyphSetup(props: GlyphProps) {
  return (
    <Frame {...props}>
      <path d="M32 8 L38 26 L56 32 L38 38 L32 56 L26 38 L8 32 L26 26 Z" {...stroke} />
    </Frame>
  );
}

export function GlyphCompliance(props: GlyphProps) {
  return (
    <Frame {...props}>
      <rect x="16" y="16" width="32" height="32" rx="2" {...stroke} />
      <rect x="16" y="16" width="32" height="32" rx="2" transform="rotate(20 32 32)" {...stroke} />
    </Frame>
  );
}

export function GlyphWealth(props: GlyphProps) {
  return (
    <Frame {...props}>
      <path d="M32 8 L50 32 L32 56 L14 32 Z" {...stroke} />
      <path d="M32 18 L42 32 L32 46 L22 32 Z" {...stroke} />
    </Frame>
  );
}

export function GlyphAssurance(props: GlyphProps) {
  return (
    <Frame {...props}>
      <path d="M8 32 C18 18 46 18 56 32 C46 46 18 46 8 32 Z" {...stroke} />
      <circle cx="32" cy="32" r="6" {...stroke} />
    </Frame>
  );
}

export function GlyphAdvisory(props: GlyphProps) {
  const petals = Array.from({ length: 8 });
  return (
    <Frame {...props}>
      {petals.map((_, index) => {
        const angle = (Math.PI / 4) * index;
        const cx = 32 + Math.cos(angle) * 12;
        const cy = 32 + Math.sin(angle) * 12;
        return <circle key={index} cx={cx} cy={cy} r="6.5" {...stroke} />;
      })}
    </Frame>
  );
}

export function GlyphDiligence(props: GlyphProps) {
  return (
    <Frame {...props}>
      {Array.from({ length: 8 }).map((_, index) => {
        const angle = (Math.PI / 8) * index;
        const x2 = 32 + Math.cos(angle) * 22;
        const y2 = 32 + Math.sin(angle) * 22;
        return <line key={index} x1="32" y1="32" x2={x2} y2={y2} {...stroke} />;
      })}
      <circle cx="32" cy="32" r="3" {...stroke} />
    </Frame>
  );
}

export function GlyphBen(props: GlyphProps) {
  return (
    <Frame {...props}>
      <circle cx="24" cy="32" r="10" {...stroke} />
      <circle cx="40" cy="32" r="10" {...stroke} />
      <circle cx="32" cy="22" r="10" {...stroke} />
    </Frame>
  );
}

export function GlyphPen(props: GlyphProps) {
  return (
    <Frame {...props}>
      <path d="M32 8 L50 18 L50 38 L32 48 L14 38 L14 18 Z" {...stroke} />
      <path d="M32 18 L42 24 L42 36 L32 42 L22 36 L22 24 Z" {...stroke} />
    </Frame>
  );
}

export function GlyphCan(props: GlyphProps) {
  return (
    <Frame {...props}>
      <path d="M12 24 L32 12 L52 24" {...stroke} />
      <path d="M16 34 L32 24 L48 34" {...stroke} />
      <path d="M20 44 L32 36 L44 44" {...stroke} />
    </Frame>
  );
}

export function GlyphThalmux(props: GlyphProps) {
  return (
    <Frame {...props}>
      <circle cx="32" cy="32" r="20" {...stroke} />
      <path d="M32 14 L46 42 H18 Z" {...stroke} />
      <circle cx="32" cy="32" r="2.5" fill="currentColor" stroke="none" />
    </Frame>
  );
}

export const glyphMap = {
  big1cs: GlyphBig1cs,
  setup: GlyphSetup,
  compliance: GlyphCompliance,
  wealth: GlyphWealth,
  assurance: GlyphAssurance,
  advisory: GlyphAdvisory,
  diligence: GlyphDiligence,
  ben: GlyphBen,
  pen: GlyphPen,
  can: GlyphCan,
  thalmux: GlyphThalmux,
} as const;

export type GlyphId = keyof typeof glyphMap;

export function PortalGlyph({ id, className }: { id: string; className?: string }) {
  const Glyph = glyphMap[id as GlyphId];
  if (!Glyph) return null;
  return <Glyph className={className} />;
}

