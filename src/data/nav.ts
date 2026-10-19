export type NavLink = {
  id: string;
  label: string;
  href: string;
  cta?: boolean;
};

export const navLinks: NavLink[] = [
  { id: "ecosystem", label: "Ecosystem", href: "#ecosystem" },
  { id: "portals", label: "Portals+", href: "#portals" },
  { id: "networks", label: "Networks", href: "#networks" },
  { id: "about", label: "About", href: "/about" },
  { id: "route", label: "Initiate mandate", href: "#route", cta: true },
];

export const placeholderSections = [
  { id: "portals" },
  { id: "route" },
  { id: "join" },
] as const;
