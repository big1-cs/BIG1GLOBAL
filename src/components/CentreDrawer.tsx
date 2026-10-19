import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, X } from "lucide-react";
import type { GlobalCentre } from "@/data/globalCoes";
import { coeCategories } from "@/data/globalCoes";
import { company } from "@/data/company";
import { portals } from "@/data/portals";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { useAppState } from "@/context/AppState";

type CentreDrawerProps = {
  centre: GlobalCentre | null;
  onClose: () => void;
  onBridge: (portalId: string) => void;
};

export function CentreDrawer({ centre, onClose, onBridge }: CentreDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { lenis } = useAppState();
  const open = Boolean(centre);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    lenis?.stop();
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const nodes = [...panelRef.current.querySelectorAll<HTMLElement>("a, button")].filter(
        (node) => !node.hasAttribute("disabled"),
      );
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lenis?.start();
      previous?.focus();
    };
  }, [open, lenis, onClose]);

  useGSAP(
    () => {
      if (!centre || !panelRef.current) return;
      const stats = panelRef.current.querySelectorAll<HTMLElement>(".drawer-stat-value");
      if (prefersReducedMotion()) return;
      stats.forEach((el) => {
        const raw = el.dataset.raw || "";
        const match = raw.match(/^(\d[\d,]*)(.*)$/);
        if (!match) return;
        const target = Number(match[1].replace(/,/g, ""));
        const suffix = match[2] || "";
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 1.3,
          ease: "expo.out",
          onUpdate: () => {
            el.textContent = `${Math.round(counter.value).toLocaleString("en-US")}${suffix}`;
          },
        });
      });
    },
    { dependencies: [centre?.id], scope: panelRef },
  );

  if (!centre || typeof document === "undefined") return null;

  const category = coeCategories.find((item) => item.id === centre.category);
  const linked = centre.bridges
    .map((id) => portals.find((portal) => portal.id === id))
    .filter((portal) => portal != null);

  return createPortal(
    <div className="drawer-root">
      <button type="button" className="drawer-backdrop" aria-label="Close centre details" onClick={onClose} />
      <div
        ref={panelRef}
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="centre-drawer-title"
      >
        <button ref={closeRef} type="button" className="drawer-close" onClick={onClose} aria-label="Close">
          <X />
        </button>
        <p className="drawer-code">{centre.id}</p>
        <h2 id="centre-drawer-title" className="drawer-title">
          {centre.plainTitle}
        </h2>
        <p className="drawer-label">{centre.label}</p>
        {category ? <p className="drawer-cat">{category.title}</p> : null}
        <p className="drawer-summary">{centre.summary}</p>
        <div className="drawer-stats">
          {centre.stats.map((stat) => (
            <div key={stat}>
              <p className="drawer-stat-value" data-raw={stat}>
                {stat}
              </p>
            </div>
          ))}
        </div>
        <div className="drawer-bridges">
          <p className="where-kicker">Bridges to</p>
          <div className="corridor-row">
            {linked.length ? (
              linked.map((portal) => (
                <button
                  key={portal.id}
                  type="button"
                  className="mini-pill"
                  onClick={() => onBridge(portal.id)}
                >
                  {portal.name}
                </button>
              ))
            ) : (
              <span className="drawer-empty">Informational centre — no domestic portal link.</span>
            )}
          </div>
        </div>
        <a
          className="pill pill-gold drawer-cta"
          href="#route"
          onClick={(event) => {
            event.preventDefault();
            onClose();
            document.getElementById("route")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Start a mandate
          <ArrowUpRight className="pill-arrow" aria-hidden="true" />
        </a>
        <p className="about-note">{company.footnote}</p>
      </div>
    </div>,
    document.body,
  );
}
