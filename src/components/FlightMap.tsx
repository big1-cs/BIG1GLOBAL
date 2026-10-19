import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { audiences, type Audience } from "@/data/audiences";
import { centresIn, coeCategories, globalCentres, type GlobalCentre } from "@/data/globalCoes";
import { bridges, portals, type Portal } from "@/data/portals";
import { PortalGlyph } from "@/components/Glyphs";
import { Roll } from "@/components/Roll";
import { CentreDrawer } from "@/components/CentreDrawer";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { elbow, type Point } from "@/lib/wires";

type Side = "top" | "bottom" | "left" | "right";
type WireKind = "main" | "tail" | "spine" | "bridge";

type Wire = {
  id: string;
  d: string;
  color: string;
  kind: WireKind;
  from: string;
  to: string;
  centres: string[];
};

const GOLD = "#F5B83D";
const INDIA = "#22D3EE";
const BEN = "#3B82F6";
const PEN = "#8B5CF6";
const CAN = "#10B981";

type Edge = {
  from: string;
  to: string;
  color: string;
  kind: WireKind;
  centres?: string[];
  fromSide?: Side;
  toSide?: Side;
};

function buildEdges(): Edge[] {
  const edges: Edge[] = [
    { from: "apex", to: "wing-global", color: GOLD, kind: "main" },
    { from: "apex", to: "wing-india", color: INDIA, kind: "main" },
    { from: "wing-india", to: "big1cs", color: INDIA, kind: "main" },
    { from: "wing-global", to: "big1gc", color: GOLD, kind: "main" },
    {
      from: "spine-left",
      to: "wing-global",
      color: "rgba(245,243,238,0.55)",
      kind: "spine",
      fromSide: "top",
      toSide: "bottom",
    },
    {
      from: "spine-right",
      to: "wing-india",
      color: "rgba(245,243,238,0.55)",
      kind: "spine",
      fromSide: "top",
      toSide: "bottom",
    },
    { from: "ben", to: "thalmux", color: BEN, kind: "tail" },
    { from: "pen", to: "thalmux", color: PEN, kind: "tail" },
    { from: "can", to: "thalmux", color: CAN, kind: "tail" },
  ];

  coeCategories.forEach((category) => {
    edges.push({
      from: "big1gc",
      to: `cat-${category.id}`,
      color: GOLD,
      kind: "main",
    });
  });

  portals.forEach((portal) => {
    if (portal.group === "india" && portal.id !== "big1cs") {
      edges.push({ from: "big1cs", to: portal.id, color: INDIA, kind: "main" });
    }
  });

  const seen = new Set<string>();
  Object.entries(bridges).forEach(([portalId, codes]) => {
    codes.forEach((code) => {
      const centre = globalCentres.find((item) => item.id === code);
      if (!centre) return;
      const to = `cat-${centre.category}`;
      const key = `${portalId}->${to}`;
      if (seen.has(key)) return;
      seen.add(key);
      edges.push({
        from: portalId,
        to,
        color: "rgba(245,243,238,0.42)",
        kind: "bridge",
        centres: codes.filter((id) => globalCentres.find((item) => item.id === id)?.category === centre.category),
        fromSide: "left",
        toSide: "right",
      });
    });
  });

  return edges;
}

function anchor(stage: DOMRect, el: HTMLElement, side: Side, index: number, count: number): Point {
  const rect = el.getBoundingClientRect();
  let x = rect.left + rect.width / 2;
  let y = rect.top + rect.height / 2;
  if (side === "top") y = rect.top;
  if (side === "bottom") y = rect.bottom;
  if (side === "left") x = rect.left;
  if (side === "right") x = rect.right;
  if ((side === "top" || side === "bottom") && count > 1) {
    const spread = Math.min(rect.width * 0.7, 240);
    const t = index / (count - 1);
    x = rect.left + (rect.width - spread) / 2 + spread * t;
  }
  if ((side === "left" || side === "right") && count > 1) {
    const spread = Math.min(rect.height * 0.55, 90);
    const t = index / (count - 1);
    y = rect.top + (rect.height - spread) / 2 + spread * t;
  }
  return { x: x - stage.left, y: y - stage.top };
}

function measure(stage: HTMLElement): Wire[] {
  const stageRect = stage.getBoundingClientRect();
  const edges = buildEdges();
  const groups = new Map<string, Edge[]>();
  edges.forEach((edge) => {
    const key = `${edge.from}:${edge.fromSide || "bottom"}`;
    const list = groups.get(key) ?? [];
    list.push(edge);
    groups.set(key, list);
  });
  const wires: Wire[] = [];
  groups.forEach((list) => {
    list.forEach((edge, index) => {
      const fromEl = stage.querySelector<HTMLElement>(`[data-node="${edge.from}"]`);
      const toEl = stage.querySelector<HTMLElement>(`[data-node="${edge.to}"]`);
      if (!fromEl || !toEl) return;
      const fromSide = edge.fromSide ?? "bottom";
      const toSide = edge.toSide ?? "top";
      const start = anchor(stageRect, fromEl, fromSide, index, list.length);
      const end = anchor(stageRect, toEl, toSide, 0, 1);
      wires.push({
        id: `${edge.kind}-${edge.from}-${edge.to}`,
        d: elbow(start, end),
        color: edge.color,
        kind: edge.kind,
        from: edge.from,
        to: edge.to,
        centres: edge.centres ?? [],
      });
    });
  });
  return wires;
}

function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) =>
    part.startsWith("**") ? (
      <em key={index} className="serif">
        {part.slice(2, -2)}
      </em>
    ) : (
      <span key={index}>{part}</span>
    ),
  );
}

function CatMark({ index }: { index: number }) {
  const rot = index * 15;
  return (
    <svg className="glyph-svg" viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="5" fill="none" stroke="currentColor" strokeWidth="1.25" />
      {[0, 90, 180, 270].map((angle) => (
        <path
          key={angle}
          d="M32 8 L37 24 H27 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          transform={`rotate(${rot + angle} 32 32)`}
        />
      ))}
    </svg>
  );
}

function nodeOn(active: Set<string> | null, id: string) {
  return Boolean(active?.has(id));
}

export function FlightMap() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const travellerRef = useRef<HTMLSpanElement>(null);
  const sigRef = useRef("");
  const [wires, setWires] = useState<Wire[]>([]);
  const [box, setBox] = useState({ w: 1, h: 1 });
  const [audience, setAudience] = useState<Audience | null>(null);
  const [hot, setHot] = useState("");
  const [centre, setCentre] = useState<GlobalCentre | null>(null);
  const [pulse, setPulse] = useState("");
  const [globalOpen, setGlobalOpen] = useState(true);
  const [indiaOpen, setIndiaOpen] = useState(true);

  const active = audience ? new Set(audience.nodes) : null;
  if (active?.has("wing-global")) active.add("big1gc");
  if (active && (active.has("ben") || active.has("pen") || active.has("can"))) {
    if (active.has("wing-global")) active.add("spine-left");
    if (active.has("wing-india")) active.add("spine-right");
  }
  const centreSet = audience ? new Set(audience.centres) : null;
  const motionKey = `${box.w}x${Math.round(box.h / 8)}:${wires.length}:${globalOpen}:${indiaOpen}`;

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const run = () => {
      const desktop = window.matchMedia("(min-width: 1100px)").matches;
      const sig = `${stage.clientWidth}|${desktop ? 1 : 0}|${globalOpen}|${indiaOpen}`;
      if (sig === sigRef.current) return;
      sigRef.current = sig;
      const next = measure(stage);
      const w = Math.max(1, stage.offsetWidth);
      const h = Math.max(1, stage.offsetHeight);
      setBox((prev) => (prev.w === w && Math.abs(prev.h - h) < 8 ? prev : { w, h }));
      setWires((prev) => {
        if (
          prev.length === next.length &&
          prev.every((wire, index) => wire.d === next[index]?.d && wire.id === next[index]?.id)
        ) {
          return prev;
        }
        return next;
      });
    };
    sigRef.current = "";
    run();
    const onResize = () => {
      sigRef.current = "";
      run();
    };
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(onResize).catch(() => undefined);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [globalOpen, indiaOpen]);

  useGSAP(
    () => {
      const lines = gsap.utils.toArray<HTMLElement>(".map-line");
      if (!lines.length) return;
      if (prefersReducedMotion()) {
        gsap.set(lines, { yPercent: 0 });
        return;
      }
      gsap.set(lines, { yPercent: 110 });
      gsap.to(lines, {
        yPercent: 0,
        duration: 1.1,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".map-lead", start: "top 78%" },
      });
      gsap.from(".map-sub", {
        y: 20,
        autoAlpha: 0,
        duration: 1,
        ease: "expo.out",
        delay: 0.15,
        scrollTrigger: { trigger: ".map-lead", start: "top 78%" },
      });
    },
    { scope: rootRef },
  );

  useGSAP(
    () => {
      const stage = stageRef.current;
      if (!stage || !wires.length) return;
      const reduced = prefersReducedMotion();
      const desktop = window.matchMedia("(min-width: 1100px)").matches;
      const cards = gsap.utils.toArray<HTMLElement>(".map-card", stage);
      const drawn = gsap.utils.toArray<SVGPathElement>(".map-wire-draw", stage);
      const dashed = gsap.utils.toArray<SVGPathElement>(".map-wire-dashed", stage);
      const rule = stage.querySelector(".spine-rule");

      if (reduced) {
        gsap.set(cards, { autoAlpha: 1, y: 0 });
        gsap.set(drawn, { drawSVG: "100%" });
        gsap.set(dashed, { autoAlpha: 1 });
        if (rule) gsap.set(rule, { scaleX: 1 });
        return;
      }

      gsap.set(cards, { autoAlpha: 1, y: 0, clearProps: "opacity,visibility,transform" });

      if (rule) {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "#networks",
              start: "top 80%",
              end: "top 40%",
              scrub: true,
            },
          },
        );
      }

      const rail = stage.querySelector(".rail-fill");
      if (rail && !desktop) {
        gsap.fromTo(
          rail,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: stage,
              start: "top 70%",
              end: "bottom 80%",
              scrub: true,
            },
          },
        );
      }

      if (!desktop) return;

      drawn.forEach((path) => {
        const targetId = path.dataset.to;
        const target = targetId ? stage.querySelector(`[data-node="${targetId}"]`) : stage;
        gsap.fromTo(
          path,
          { drawSVG: 0 },
          {
            drawSVG: "100%",
            duration: 1.25,
            ease: "expo.out",
            scrollTrigger: { trigger: target, start: "top 86%", toggleActions: "play none none none" },
            onComplete: () => {
              const flow = path.nextElementSibling;
              if (flow) gsap.set(flow, { autoAlpha: 1 });
            },
          },
        );
      });

      dashed.forEach((path) => {
        const targetId = path.dataset.to;
        const target = targetId ? stage.querySelector(`[data-node="${targetId}"]`) : stage;
        gsap.fromTo(
          path,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 0.8,
            ease: "expo.out",
            scrollTrigger: { trigger: target, start: "top 84%", toggleActions: "play none none none" },
          },
        );
      });
    },
    { scope: rootRef, dependencies: [motionKey] },
  );

  useEffect(() => {
    const dot = travellerRef.current;
    const stage = stageRef.current;
    if (!dot || !stage) return;
    if (!audience) {
      gsap.set(dot, { autoAlpha: 0 });
      return;
    }
    const nodes = audience.nodes
      .map((id) => stage.querySelector<HTMLElement>(`[data-node="${id}"]`))
      .filter((node): node is HTMLElement => Boolean(node));
    const origin = stage.getBoundingClientRect();
    const reduced = prefersReducedMotion();
    const timeline = gsap.timeline();
    gsap.set(dot, { autoAlpha: 1 });
    nodes.forEach((node, index) => {
      const rect = node.getBoundingClientRect();
      const x = rect.left + rect.width / 2 - origin.left;
      const y = rect.top + rect.height / 2 - origin.top;
      if (reduced) {
        if (index === nodes.length - 1) gsap.set(dot, { x, y });
        return;
      }
      timeline.to(dot, { x, y, duration: 0.45, ease: "power2.inOut" }, index * 0.14);
    });
    return () => {
      timeline.kill();
    };
  }, [audience, motionKey]);

  useEffect(() => {
    if (!pulse) return;
    const timer = window.setTimeout(() => setPulse(""), 1800);
    return () => window.clearTimeout(timer);
  }, [pulse]);

  const india = portals.filter((portal) => portal.group === "india" && portal.id !== "big1cs");
  const networks = portals.filter((portal) => portal.group === "network");
  const thalmux = portals.find((portal) => portal.id === "thalmux");
  const hub = portals.find((portal) => portal.id === "big1cs");
  const first = audience ? portals.find((portal) => portal.id === audience.firstPortal) : null;

  const onStageKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const key = event.key;
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(key)) return;
    const stage = stageRef.current;
    if (!stage) return;
    const cards = [...stage.querySelectorAll<HTMLElement>("[data-card]")];
    const current = document.activeElement instanceof HTMLElement ? document.activeElement.closest<HTMLElement>("[data-card]") : null;
    const index = current ? cards.indexOf(current) : -1;
    if (index < 0) return;
    event.preventDefault();
    const cols = window.innerWidth >= 1100 ? 2 : 1;
    let next = index;
    if (key === "ArrowRight") next = index + 1;
    if (key === "ArrowLeft") next = index - 1;
    if (key === "ArrowDown") next = index + cols;
    if (key === "ArrowUp") next = Math.max(0, index - cols);
    const card = cards[(next + cards.length) % cards.length];
    const focusable = card.matches("a, button") ? card : card.querySelector<HTMLElement>("a, button") ?? card;
    focusable.focus();
  };

  const closeCentre = useCallback(() => setCentre(null), []);

  const jumpToPortal = useCallback((id: string) => {
    setCentre(null);
    window.setTimeout(() => {
      const node = stageRef.current?.querySelector<HTMLElement>(`[data-node="${id}"]`);
      node?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "center" });
      setPulse(id);
    }, 40);
  }, []);

  return (
    <section
      ref={rootRef}
      id="ecosystem"
      className="flight-map night-lock"
      data-pathed={audience ? "1" : "0"}
      data-hot={hot}
      onMouseOver={(event) => {
        const target = event.target instanceof Element ? event.target : null;
        const centreId = target?.closest("[data-centre]")?.getAttribute("data-centre");
        const node = target?.closest("[data-node]")?.getAttribute("data-node");
        const next = centreId || node || "";
        setHot((current) => (current === next ? current : next));
      }}
      onMouseLeave={() => setHot("")}
    >
      <div className="about-wrap map-lead">
        <h2 className="map-title" id="map-title">
          <span className="line-mask">
            <span className="map-line">
              The <em className="serif">ecosystem</em>, mapped.
            </span>
          </span>
        </h2>
        <p className="map-sub">Everything under BIG1 GLOBAL, and how it connects.</p>
      </div>

      <div className="finder">
        <div className="finder-row" role="group" aria-label="I am a…">
          {audiences.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`finder-chip${audience?.id === item.id ? " is-on" : ""}`}
              aria-pressed={audience?.id === item.id}
              onClick={() => setAudience((current) => (current?.id === item.id ? null : item))}
            >
              {item.label}
            </button>
          ))}
          {audience ? (
            <button type="button" className="finder-chip finder-reset" onClick={() => setAudience(null)}>
              Reset
            </button>
          ) : null}
        </div>
        {audience && first ? (
          <div className="finder-caption">
            <p>
              <Rich text={audience.caption} />
            </p>
            <a className="pill pill-gold" href={first.url} target="_blank" rel="noopener noreferrer" data-cursor-label="OPEN">
              Open {first.name}
              <ArrowUpRight className="pill-arrow" aria-hidden="true" />
            </a>
          </div>
        ) : (
          <p className="finder-hint">I am a… choose a path and the chart lights the route.</p>
        )}
      </div>

      <div ref={stageRef} className="map-stage" onKeyDown={onStageKey}>
        <span className="rail-fill" aria-hidden="true" />
        <svg
          className="map-wires"
          viewBox={`0 0 ${box.w} ${box.h}`}
          width={box.w}
          height={box.h}
          aria-hidden="true"
        >
          <defs>
            <filter id="soft-dot" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="1.5" />
            </filter>
          </defs>
          {wires.map((wire) => {
            const lit =
              wire.kind === "bridge"
                ? Boolean(active?.has(wire.from) && (active.has(wire.to) || wire.centres.some((id) => centreSet?.has(id))))
                : Boolean(active?.has(wire.from) && active.has(wire.to));
            const bridgeHot =
              wire.kind === "bridge" &&
              (hot === wire.from || hot === wire.to || wire.centres.includes(hot));
            const draw = wire.kind === "main" || wire.kind === "tail";
            return (
              <g key={wire.id}>
                <path
                  d={wire.d}
                  className={`map-wire is-${wire.kind} ${draw ? "map-wire-draw" : "map-wire-dashed"}${lit ? " is-lit" : ""}${bridgeHot ? " is-hot" : ""}`}
                  data-from={wire.from}
                  data-to={wire.to}
                  stroke={wire.color}
                />
                {draw ? (
                  <path d={wire.d} className={`map-wire-flow${lit ? " is-lit" : ""}`} stroke={wire.color} />
                ) : null}
              </g>
            );
          })}
        </svg>
        <span ref={travellerRef} className="traveller" aria-hidden="true" />

        <article className={`map-card apex${nodeOn(active, "apex") ? " is-lit" : ""}`} data-card data-node="apex" tabIndex={0}>
          <div className="map-card-face apex-face">
            <div className="medallion">
              <img className="medallion-mark" src="/assets/big1-global-logo.png" alt="" />
            </div>
            <div>
              <p className="map-kicker gold">Head</p>
              <h3>BIG1 GLOBAL</h3>
              <p className="map-desc">Apex of the ecosystem</p>
            </div>
          </div>
        </article>

        <article
          className={`map-card wing${nodeOn(active, "wing-global") ? " is-lit" : ""}`}
          data-card
          data-node="wing-global"
          data-group="global"
          tabIndex={0}
        >
          <div className="map-card-face">
            <p className="map-kicker gold">Wing 01 · International</p>
            <h3>15 Global Centres</h3>
            <p className="map-desc">The international wing. Informational programmes, opened here — not a separate site.</p>
          </div>
        </article>

        <article
          className={`map-card wing${nodeOn(active, "wing-india") ? " is-lit" : ""}`}
          data-card
          data-node="wing-india"
          data-group="india"
          tabIndex={0}
        >
          <div className="map-card-face">
            <p className="map-kicker india">Wing 02 · BIG1CS India</p>
            <h3>6 Domestic Centres</h3>
            <p className="map-desc">The India wing. BIG1CS and six live centres, each a portal of its own.</p>
          </div>
        </article>

        <div className={`fold fold-global${globalOpen ? "" : " is-shut"}`}>
          <button
            type="button"
            className="fold-toggle"
            aria-expanded={globalOpen}
            onClick={() => setGlobalOpen((open) => !open)}
          >
            {globalOpen ? "Hide global centres" : "Show 15 global centres"}
          </button>
          <div className="fold-body global-stack">
            <article
              className={`map-card${nodeOn(active, "big1gc") ? " is-lit" : ""}`}
              data-card
              data-node="big1gc"
              data-group="global"
              tabIndex={0}
            >
              <div className="map-card-face">
                <p className="map-kicker gold">Big1 Global Consulting</p>
                <h3>BIG1GC</h3>
                <p className="map-desc">The consulting house for the fifteen international centres.</p>
              </div>
            </article>
            <div className="cat-grid">
            {coeCategories.map((category, index) => (
              <article
                key={category.id}
                className={`map-card cat-card${nodeOn(active, `cat-${category.id}`) ? " is-lit" : ""}`}
                data-card
                data-node={`cat-${category.id}`}
                data-group="global"
                tabIndex={0}
              >
                <div className="map-card-face">
                  <div className="glyph-tile gold">
                    <CatMark index={index} />
                  </div>
                  <p className="map-kicker gold">Global programme</p>
                  <h3>{category.title}</h3>
                  <div className="mini-row">
                    {centresIn(category.id).map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className={`mini-pill${centreSet?.has(item.id) ? " is-lit" : ""}`}
                        data-centre={item.id}
                        data-cursor-label="OPEN"
                        onClick={() => setCentre(item)}
                      >
                        {item.id} {item.label}
                      </button>
                    ))}
                  </div>
                  <button type="button" className="text-btn" onClick={() => setCentre(centresIn(category.id)[0] ?? null)}>
                    Explore centre
                  </button>
                </div>
              </article>
            ))}
            </div>
          </div>
        </div>

        <div className={`fold fold-india${indiaOpen ? "" : " is-shut"}`}>
          <button
            type="button"
            className="fold-toggle"
            aria-expanded={indiaOpen}
            onClick={() => setIndiaOpen((open) => !open)}
          >
            {indiaOpen ? "Hide domestic portals" : "Show domestic portals"}
          </button>
          <div className="fold-body india-stack">
            {hub ? (
              <PortalCard portal={hub} node="big1cs" lit={nodeOn(active, "big1cs")} pulse={pulse === "big1cs"} featured />
            ) : null}
            <div className="portal-grid">
              {india.map((portal) => (
                <PortalCard
                  key={portal.id}
                  portal={portal}
                  lit={nodeOn(active, portal.id)}
                  pulse={pulse === portal.id}
                  compact
                />
              ))}
            </div>
          </div>
        </div>

        <div id="networks" className="spine">
          <span className="spine-anchor" data-node="spine-left" aria-hidden="true" />
          <span className="spine-anchor right" data-node="spine-right" aria-hidden="true" />
          <div className="spine-rule" aria-hidden="true" />
          <p className="spine-caption serif">runs through every centre</p>
          <div className="spine-grid">
            {networks.map((portal) => (
              <PortalCard
                key={portal.id}
                portal={portal}
                lit={nodeOn(active, portal.id)}
                pulse={pulse === portal.id}
                spine
              />
            ))}
          </div>
        </div>

        {thalmux ? (
          <div className="tail">
            <PortalCard portal={thalmux} lit={nodeOn(active, "thalmux")} pulse={pulse === "thalmux"} featured />
            <p className="tail-caption">Routes every mandate</p>
            <p className="tail-line">Mandate routed → Professionals assigned → Partner credited → Intelligence delivered</p>
          </div>
        ) : null}
      </div>

      <ol className="sr-only">
        <li>
          BIG1 GLOBAL, apex
          <ol>
            <li>
              Wing 01 International, 15 global centres
              <ol>
                {coeCategories.map((category) => (
                  <li key={category.id}>
                    {category.title}: {category.centreIds.join(", ")}
                  </li>
                ))}
              </ol>
            </li>
            <li>
              Wing 02 BIG1CS India
              <ol>
                <li>BIG1CS</li>
                {india.map((portal) => (
                  <li key={portal.id}>{portal.name}</li>
                ))}
              </ol>
            </li>
          </ol>
        </li>
        <li>Spine: BEN, PEN, CAN</li>
        <li>THALMUX routes every mandate</li>
      </ol>

      <CentreDrawer centre={centre} onClose={closeCentre} onBridge={jumpToPortal} />
    </section>
  );
}

function PortalCard({
  portal,
  lit,
  pulse,
  compact,
  featured,
  spine,
  node,
}: {
  portal: Portal;
  lit: boolean;
  pulse: boolean;
  compact?: boolean;
  featured?: boolean;
  spine?: boolean;
  node?: string;
}) {
  return (
    <a
      className={`map-card portal-card${compact ? " is-compact" : ""}${featured ? " is-featured" : ""}${spine ? " is-spine" : ""}${lit ? " is-lit" : ""}${pulse ? " is-pulse" : ""}`}
      data-card
      data-node={node ?? portal.id}
      data-group={portal.group}
      href={portal.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor-label="OPEN"
      style={{ "--card": portal.color } as CSSProperties}
    >
      <div className="map-card-face">
        <div className="glyph-tile" style={{ color: portal.color }}>
          <PortalGlyph id={portal.glyph} className="glyph-svg" />
        </div>
        <div className="portal-copy">
          <p className="map-kicker" style={{ color: portal.color }}>
            {portal.groupLabel}
          </p>
          <h3>{portal.name}</h3>
          <p className="map-desc">{compact ? portal.tagline : portal.description}</p>
          <span className="pill">
            <Roll label="Visit portal" />
            <ArrowUpRight className="pill-arrow" aria-hidden="true" />
          </span>
        </div>
      </div>
    </a>
  );
}
