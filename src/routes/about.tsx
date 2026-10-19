import { createFileRoute } from "@tanstack/react-router";
import { AboutField } from "@/components/about/AboutField";
import { AboutScroll } from "@/components/about/AboutScroll";

const title = "About BIG1 Global | Sovereign Consulting Conglomerate — BIG1CS (India) & BIG1GC (Global)";
const description =
  "BIG1 Global is a multi-layered corporate consulting and enterprise ecosystem. Operating through two flagship wings—BIG1CS for Indian MSMEs, startups, and enterprises, and BIG1GC for international businesses—powered by the THALMUX intelligence engine.";

const wings = [
  ["Strategic Mandate", "The Sovereign Domestic Consulting Wing", "The Sovereign International Consulting Wing"],
  ["Target Jurisdiction", "Pan-India (Bharat)", "Global Markets (Americas, EMEA, APAC & Cross-Border)"],
  [
    "Core Clientele",
    "Indian Startups, High-Growth MSMEs, Domestic Corporates & Large Enterprises",
    "International Corporations, Overseas Founders, Global SMEs & Institutional Investors",
  ],
  [
    "Primary Focus",
    "Indian Regulatory Compliance, Domestic Taxation, Corporate Law, MSME Scaling, Strategic Finance & Brand Transformation",
    "Cross-Border Advisory, International Structuring, Global Financial Modeling, Market Entry, Offshore Operations & Digital Transformation",
  ],
  ["Operating Engine", "Powered by THALMUX & Executed via PEN / CAN / BEN", "Powered by THALMUX & Executed via PEN / CAN / BEN"],
] as const;

const coes = [
  ["Strategic Finance & Corporate Governance", "Advanced ratio and DuPont analysis, cash flow modeling, iXBRL standardization, valuation, and cross-jurisdictional compliance."],
  ["Enterprise Technology & AI Automation", "Full-stack cloud architecture, custom enterprise applications, and low-code/AI operational pipelines that eliminate manual business bottlenecks."],
  ["Corporate Branding & Market Influence", "High-authority brand ecosystems, strategic communication frameworks, and omnichannel market positioning for domestic and global audiences."],
  ["Real-Economy & Industrial Advisory", "End-to-end operational consulting across manufacturing, supply chain modernization, agricultural processing, and consumer goods."],
];

const networks = [
  ["CAN", "Client Acquisition Network", "The Outreach & Growth Layer", "A structured, data-driven outreach and market expansion architecture. CAN connects domestic Indian enterprises with BIG1CS and bridges international corporations and overseas founders directly to BIG1GC."],
  ["PEN", "Professional Excellence Network", "The Elite Execution Layer", "A curated global alliance of Chartered Accountants, Certified Public Accountants, Company Secretaries, Financial Analysts, Legal Strategists, and Technology Architects. Operating under strict institutional benchmarks, PEN executes complex domestic mandates for BIG1CS and cross-border engagements for BIG1GC with zero friction."],
  ["BEN", "Business Excellence Network", "The Ecosystem & Community Layer", "A premier leadership and enterprise community that unites domestic and international founders, Managing Directors, CXOs, and institutional pioneers—fostering cross-border alliances, peer intelligence, capital access, and long-term strategic transformation."],
];

const pillars = [
  ["Dual-Market Mastery", "Unmatched local depth in Indian corporate law, finance, and MSME scaling via BIG1CS, paired with seamless international advisory and cross-border execution via BIG1GC."],
  ["Institutional Rigor for Every Enterprise", "Delivering Fortune-500 strategic clarity and financial precision to startups, MSMEs, and large conglomerates alike."],
  ["Intelligence-First Execution", "Replacing traditional consultancy delays with THALMUX-driven automation, real-time analytics, and standardized governance."],
  ["End-to-End Ownership", "Bridging the gap between boardroom strategy and real-world execution across finance, compliance, technology, and brand influence."],
];

const faqs = [
  ["What is BIG1 Global and how is it structured?", "BIG1 Global is an integrated corporate conglomerate and multi-layered consulting ecosystem headquartered in India with a global operational footprint. It operates through two primary consulting wings—BIG1CS (Big1 Consultancy Services) for the domestic Indian market and BIG1GC (Big1 Global Consulting) for international markets—both unified by the proprietary THALMUX intelligence engine and executed through the CAN, PEN, and BEN networks."],
  ["What is the difference between BIG1CS and BIG1GC?", "BIG1CS (Big1 Consultancy Services) serves Indian businesses, including startups, MSMEs, and large domestic enterprises, focusing on Indian corporate law, taxation, regulatory compliance, financial modeling, and domestic scale. BIG1GC (Big1 Global Consulting) serves global businesses and overseas clients, providing international corporate strategy, cross-border structuring, global financial advisory, market-entry consulting, and offshore digital and operational execution."],
  ["What is THALMUX and how does it support BIG1CS and BIG1GC?", "THALMUX is the proprietary central intelligence layer and internal operating system of BIG1 Global. It acts as the shared backbone for both BIG1CS and BIG1GC, coordinating specialized Centres of Excellence and synchronizing the CAN (Client Acquisition Network), PEN (Professional Excellence Network), and BEN (Business Excellence Network) to ensure consistent, high-velocity service delivery worldwide."],
  ["How do the CAN, PEN, and BEN networks operate across India and global markets?", "CAN drives strategic client outreach across domestic and international corridors. PEN mobilizes vetted financial, legal, and technical experts to execute client mandates under strict quality benchmarks. BEN connects Indian and global business leaders into a unified executive community for cross-border growth and strategic partnerships."],
  ["Who can partner with BIG1 Global?", "Indian startups, MSMEs, and domestic corporations can partner with BIG1CS for end-to-end domestic advisory and scaling. International companies, overseas founders, and global enterprises can engage BIG1GC for cross-border strategy, financial analysis, and global operations. Elite professionals and industry leaders can join the ecosystem through the PEN, CAN, and BEN networks."],
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "BIG1 Global, BIG1CS, Big1 Consultancy Services, BIG1GC, Big1 Global Consulting, Sovereign Consulting Conglomerate, Corporate Advisory India, Cross-Border Enterprise Consulting, MSME & Startup Consulting India, Global Business Expansion, THALMUX Intelligence Engine",
      },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
    links: [{ rel: "canonical", href: "https://www.big1global.com/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <AboutScroll>
    <main className="apage">
      <header className="apage-bar">
        <a className="apage-brand" href="/">
          BIG1 GLOBAL
        </a>
        <nav aria-label="About">
          <a href="/#ecosystem">Ecosystem</a>
          <a href="/#portals">Portals</a>
          <a href="/#networks">Networks</a>
          <a href="/about" aria-current="page">
            About
          </a>
          <a className="apage-cta" href="/#route">
            Initiate mandate
          </a>
        </nav>
      </header>

      <section className="apage-hero">
        <div className="apage-hero-copy">
        <p className="apage-kicker">The sovereign enterprise ecosystem</p>
        <h1>
          One sovereign vision.
          <span className="serif"> Two consulting wings.</span>
          <br />
          Built for Bharat and the world.
        </h1>
        <p className="apage-lead">
          BIG1 Global is a next-generation corporate conglomerate and integrated enterprise ecosystem. Operating through two specialized consulting wings—BIG1CS (Big1 Consultancy Services) for the Indian market and BIG1GC (Big1 Global Consulting) for international markets—we unite institutional-grade strategy, financial engineering, regulatory mastery, and proprietary operational intelligence under one unified standard of excellence.
        </p>
        </div>
        <AboutField />
        <ul className="apage-points">
          <li className="apage-card" data-reveal>
            <strong>BIG1CS · Domestic wing</strong>
            Empowering Indian startups, MSMEs, and large domestic enterprises with sovereign corporate advisory, compliance, and scale.
          </li>
          <li className="apage-card" data-reveal>
            <strong>BIG1GC · International wing</strong>
            Cross-border strategy, global compliance, financial structuring, and offshore execution for overseas businesses and international investors.
          </li>
          <li className="apage-card" data-reveal>
            <strong>THALMUX Intelligence</strong>
            Synchronizing global and domestic mandates through the proprietary central operating system and Centres of Excellence.
          </li>
          <li className="apage-card" data-reveal>
            <strong>Tri-network flywheel</strong>
            Borderless market outreach, elite execution, and leadership alliances via CAN, PEN, and BEN.
          </li>
        </ul>
      </section>

      <section className="apage-section" data-reveal>
        <p className="apage-kicker">Executive summary</p>
        <h2>
          Bridging domestic mastery and <span className="serif">global ambition</span> under one architecture.
        </h2>
        <div className="apage-prose">
          <p>
            For decades, institutional-grade corporate strategy, deep financial modeling, and end-to-end regulatory execution were gatekept by fragmented legacy firms. High-growth domestic businesses struggled to access Fortune-500 advisory standards, while international corporations faced friction, high costs, and disconnected advisors when scaling across borders.
          </p>
          <p>BIG1 Global was engineered to solve both challenges simultaneously.</p>
          <p>
            Structured as a sovereign, multi-layered enterprise ecosystem, BIG1 Global serves as the overarching parent conglomerate that harmonizes domestic market dominance with international consulting capability. By dividing advisory firepower into two dedicated flagship wings—BIG1CS for India and BIG1GC for the world—and uniting them atop the proprietary THALMUX intelligence engine, operational borders fall away.
          </p>
          <p>
            Whether guiding an Indian MSME toward institutional scale, restructuring a domestic conglomerate, or advising an overseas corporation on global expansion, financial modeling, and cross-border governance, BIG1 Global builds architectures that endure.
          </p>
        </div>
        <blockquote data-reveal>
          “We do not merely advise from the sidelines. Through BIG1CS in India and BIG1GC across international corridors, we build the operating infrastructure, the execution networks, and the intelligence systems that turn ambitious enterprises into market sovereigns.”
        </blockquote>
      </section>

      <section className="apage-section" data-reveal>
        <p className="apage-kicker">Two wings. One global standard.</p>
        <h2>
          Tailored jurisdiction mastery. <span className="serif">Unified institutional rigor.</span>
        </h2>
        <p className="apage-lead">
          At the core of BIG1 Global lies a dual-wing consulting structure designed to provide hyper-specialized regulatory, financial, and strategic precision for both domestic and international markets.
        </p>
        <div className="apage-table-wrap">
          <table className="apage-table">
            <thead>
              <tr>
                <th>Attribute</th>
                <th>BIG1CS · Big1 Consultancy Services</th>
                <th>BIG1GC · Big1 Global Consulting</th>
              </tr>
            </thead>
            <tbody>
              {wings.map((row) => (
                <tr key={row[0]}>
                  <th>{row[0]}</th>
                  <td>{row[1]}</td>
                  <td>{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="apage-pair">
          <article className="apage-card" data-reveal>
            <p className="apage-kicker">01</p>
            <h3>BIG1CS — the sovereign domestic giant</h3>
            <p>
              BIG1CS is the flagship Indian consulting arm of BIG1 Global. Engineered for the complexities and high-velocity growth of the Indian economy, it democratizes institutional-grade advisory for Indian startups, MSMEs, and large domestic enterprises.
            </p>
            <p>
              From corporate incorporation, statutory compliance, and Indian taxation to advanced DuPont financial analysis, Inline XBRL (iXBRL) standardization, corporate governance, and pan-India brand positioning, BIG1CS provides a homegrown consulting infrastructure built to rival multinational firms.
            </p>
          </article>
          <article className="apage-card" data-reveal>
            <p className="apage-kicker">02</p>
            <h3>BIG1GC — the international advisory powerhouse</h3>
            <p>
              BIG1GC is the international consulting wing of BIG1 Global, dedicated to overseas businesses, foreign founders, and multinational enterprises operating outside India or expanding across global corridors.
            </p>
            <p>
              Just as BIG1CS commands the domestic landscape, BIG1GC delivers borderless corporate strategy, international financial analysis, cross-border compliance, India-entry and global-expansion advisory, automated technology workflows, and global brand engineering for clients worldwide.
            </p>
          </article>
        </div>
      </section>

      <section className="apage-section" data-reveal>
        <p className="apage-kicker">Intelligence & specialization</p>
        <h2>
          Powered by <span className="serif">THALMUX</span> and multidisciplinary Centres of Excellence.
        </h2>
        <p className="apage-lead">
          Both BIG1CS and BIG1GC operate on a shared, high-precision technological and intellectual backbone—so a client in Mumbai, Lucknow, London, Dubai, or New York receives the same institutional quality.
        </p>
        <article className="apage-card apage-engine" data-reveal>
          <h3>THALMUX — the central intelligence layer</h3>
          <p>
            THALMUX is BIG1 Global’s proprietary internal intelligence engine and operational nervous system. Acting as the central operating system across both BIG1CS and BIG1GC, it coordinates specialized Centres of Excellence, powers AI-driven workflow automation, standardizes financial and regulatory reporting, and orchestrates collaboration across domestic and international mandates.
          </p>
        </article>
        <div className="apage-coes">
          {coes.map(([name, text]) => (
            <article className="apage-card" key={name} data-reveal>
              <h3>{name}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="apage-section" data-reveal>
        <p className="apage-kicker">Orchestrated scale</p>
        <h2>
          Synchronizing global and domestic value through <span className="serif">CAN, PEN & BEN</span>.
        </h2>
        <p className="apage-lead">
          Coordinated by the THALMUX engine, BIG1 Global powers a self-reinforcing three-network architecture that scales both BIG1CS and BIG1GC across geographies.
        </p>
        <div className="apage-nets">
          {networks.map(([code, name, layer, text]) => (
            <article className="apage-card" key={code} data-reveal>
              <p className="apage-code">{code}</p>
              <h3>{name}</h3>
              <p className="apage-layer">{layer}</p>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="apage-section" data-reveal>
        <p className="apage-kicker">Our governing principles</p>
        <h2>
          Rooted in sovereign strength. <span className="serif">Built for borderless impact.</span>
        </h2>
        <div className="apage-doctrine">
          <article className="apage-card" data-reveal>
            <h3>Our vision</h3>
            <p>
              To establish the world’s most trusted corporate and industrial consulting ecosystem—championing Indian enterprise growth through BIG1CS while commanding international advisory corridors through BIG1GC.
            </p>
          </article>
          <article className="apage-card" data-reveal>
            <h3>Our mission</h3>
            <p>
              To empower businesses of every scale—from emerging Indian MSMEs to global corporations—by integrating elite human expertise (PEN), executive community synergy (BEN), borderless market outreach (CAN), and algorithmic intelligence (THALMUX) into a single, frictionless engine of growth.
            </p>
          </article>
        </div>
        <ol className="apage-pillars">
          {pillars.map(([name, text], index) => (
            <li className="apage-card" key={name} data-reveal>
              <span>0{index + 1}</span>
              <h3>{name}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="apage-section" data-reveal>
        <p className="apage-kicker">Questions</p>
        <h2>
          What people ask <span className="serif">before they begin</span>.
        </h2>
        <div className="apage-faq">
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="apage-close" data-reveal>
        <p className="apage-kicker">Begin</p>
        <h2>
          Ready to scale with <span className="serif">BIG1 Global</span>?
        </h2>
        <p>Choose the consulting wing built for your market, or join the global execution ecosystem.</p>
        <p className="apage-lead">
          <a href="/big1cs">corporate consulting firm in India BIG1CS</a>
          {" · "}
          <a href="/big1gc">global consulting firm BIG1GC</a>
          {" · "}
          <a href="/thalmux">THALMUX intelligence engine</a>
        </p>
        <div className="apage-actions">
          <a href="https://big1cs.com" target="_blank" rel="noopener noreferrer">
            <span>Domestic · India</span>
            Partner with BIG1CS
            <small>Indian startups, MSMEs and enterprises</small>
          </a>
          <a href="/#route">
            <span>International · Global</span>
            Partner with BIG1GC
            <small>Overseas businesses and global corporations</small>
          </a>
          <a href="/#networks">
            <span>Ecosystem</span>
            Join CAN / PEN / BEN
            <small>Network access</small>
          </a>
        </div>
      </section>
    </main>
    </AboutScroll>
  );
}
