import {
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  Bot,
  Briefcase,
  Building2,
  ClipboardCheck,
  Cog,
  Coins,
  Compass,
  Cpu,
  Eye,
  FileCheck,
  FilePlus2,
  Gem,
  Globe,
  Handshake,
  Landmark,
  Leaf,
  LineChart,
  Network,
  Receipt,
  RefreshCcw,
  Scale,
  Search,
  Share2,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Ship,
  Sparkles,
  Sun,
  TrendingUp,
  Truck,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { coeCategories, globalCentres } from "@/data/globalCoes";
import { portals, type PortalGroup } from "@/data/portals";

const groups: { id: PortalGroup; title: string; note?: string }[] = [
  { id: "india", title: "India" },
  { id: "network", title: "Networks" },
  { id: "ai", title: "Intelligence" },
];

const rowIcons: Record<string, [LucideIcon, LucideIcon]> = {
  big1cs: [Landmark, Building2],
  setup: [Building2, FilePlus2],
  compliance: [ClipboardCheck, Scale],
  wealth: [Gem, Wallet],
  assurance: [ShieldCheck, Eye],
  advisory: [Compass, Briefcase],
  diligence: [Search, ClipboardCheck],
  ben: [Users, Network],
  pen: [BadgeCheck, Briefcase],
  can: [Handshake, Share2],
  thalmux: [Cpu, Sparkles],
  "COE-01": [Scale, FileCheck],
  "COE-02": [Receipt, Globe],
  "COE-03": [Shield, Search],
  "COE-04": [TrendingUp, Handshake],
  "COE-05": [BarChart3, Landmark],
  "COE-06": [RefreshCcw, Scale],
  "COE-07": [Gem, Landmark],
  "COE-08": [ShieldAlert, Shield],
  "COE-09": [Coins, Cpu],
  "COE-10": [Cog, Bot],
  "COE-11": [Leaf, Sun],
  "COE-12": [Landmark, Globe],
  "COE-13": [Cpu, RefreshCcw],
  "COE-14": [Truck, Ship],
  "COE-15": [BookOpen, LineChart],
};

function plainName(name: string) {
  return name.replace(/^CoE\s+/i, "");
}

function RowEnds({ id }: { id: string }) {
  const pair = rowIcons[id];
  if (!pair) return null;
  const [Left, Right] = pair;
  return (
    <>
      <Left className="portal-row-icon left" aria-hidden="true" />
      <Right className="portal-row-icon right" aria-hidden="true" />
    </>
  );
}

export function PortalsIndex() {
  const categoryTitle = new Map(coeCategories.map((category) => [category.id, category.title]));

  return (
    <section id="portals" className="site-block" aria-labelledby="portals-title">
      <div className="about-wrap">
        <header className="block-head">
          <h2 id="portals-title">
            The <em className="serif">portals</em>.
          </h2>
          <p>Every centre, network and programme under BIG1 GLOBAL.</p>
        </header>

        <div className="portal-index">
          <p className="block-kicker">India</p>
          <ul>
            {portals
              .filter((portal) => portal.group === "india")
              .map((portal) => (
                <li key={portal.id}>
                  <a className="portal-index-row" href={portal.url} target="_blank" rel="noopener noreferrer">
                    <RowEnds id={portal.id} />
                    <span className="portal-index-name">
                      {plainName(portal.name)}
                      <ArrowUpRight aria-hidden="true" />
                    </span>
                    <span className="portal-index-tag">{portal.tagline}</span>
                    <span className="portal-index-desc">{portal.description}</span>
                  </a>
                </li>
              ))}
          </ul>
        </div>

        <div className="portal-index">
          <p className="block-kicker">Global Excellences</p>
          <p className="portal-index-note">15 international centres of excellence.</p>
          <ul>
            {globalCentres.map((centre) => (
              <li key={centre.id}>
                <div className="portal-index-row">
                  <RowEnds id={centre.id} />
                  <span className="portal-index-name">{centre.label}</span>
                  <span className="portal-index-tag">{categoryTitle.get(centre.category)}</span>
                  <span className="portal-index-desc">{centre.summary}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {groups
          .filter((group) => group.id !== "india")
          .map((group) => {
            const items = portals.filter((portal) => portal.group === group.id);
            return (
              <div key={group.id} className="portal-index">
                <p className="block-kicker">{group.title}</p>
                <ul>
                  {items.map((portal) => (
                    <li key={portal.id}>
                      <a className="portal-index-row" href={portal.url} target="_blank" rel="noopener noreferrer">
                    <RowEnds id={portal.id} />
                        <span className="portal-index-name">
                          {plainName(portal.name)}
                          <ArrowUpRight aria-hidden="true" />
                        </span>
                        <span className="portal-index-tag">{portal.tagline}</span>
                        <span className="portal-index-desc">{portal.description}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
      </div>
    </section>
  );
}
