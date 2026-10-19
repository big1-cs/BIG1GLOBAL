import { useRef, useState, type MouseEvent } from "react";
import { Moon, Sun } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { navLinks } from "@/data/nav";
import { Flip, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { useAppState } from "@/context/AppState";
import { Roll } from "@/components/Roll";

export function SiteNav() {
  const navRef = useRef<HTMLElement>(null);
  const { lenis, theme, toggleTheme } = useAppState();
  const [active, setActive] = useState("");
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;
  const flipUnderline = useRef<Flip.FlipState | null>(null);

  const rememberUnderline = () => {
    const underline = navRef.current?.querySelector(".nav-underline");
    if (underline) flipUnderline.current = Flip.getState(underline);
  };

  useGSAP(
    () => {
      const nav = navRef.current;
      if (!nav) return;
      const reduced = prefersReducedMotion();

      const apply = (next: "bar" | "pill") => {
        const same = nav.dataset.mode === next;
        const nodes = nav.querySelectorAll<HTMLElement>("[data-flip]");
        const state =
          nav.dataset.primed === "1" && !same && !reduced ? Flip.getState(nodes) : null;
        nav.dataset.mode = next;
        nav.dataset.primed = "1";
        if (state) {
          Flip.from(state, {
            duration: 0.9,
            ease: "expo.out",
            absolute: true,
            nested: true,
            prune: true,
          });
        }
      };

      apply("bar");

      const morph = ScrollTrigger.create({
        trigger: "#hero",
        start: "60% top",
        onEnter: () => apply("pill"),
        onLeaveBack: () => apply("bar"),
      });

      const spies = navLinks.map((link) =>
        ScrollTrigger.create({
          trigger: `#${link.id}`,
          start: "top 60%",
          end: "bottom 45%",
          onToggle: (self) => {
            if (!self.isActive) return;
            rememberUnderline();
            setActive(link.id);
          },
        }),
      );

      const clear = ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: "bottom 70%",
        onEnterBack: () => setActive(""),
      });

      return () => {
        morph.kill();
        clear.kill();
        spies.forEach((spy) => spy.kill());
      };
    },
    { dependencies: [] },
  );

  useGSAP(
    () => {
      const state = flipUnderline.current;
      if (!state) return;
      flipUnderline.current = null;
      if (prefersReducedMotion()) return;
      Flip.from(state, { duration: 0.55, ease: "expo.out", absolute: true });
    },
    { dependencies: [active] },
  );

  const onNavigate = (event: MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    if (!href.startsWith("#")) return;
    const target = document.querySelector(href);
    if (!(target instanceof HTMLElement)) return;
    event.preventDefault();
    rememberUnderline();
    setActive(id);
    if (lenisRef.current && !prefersReducedMotion()) {
      lenisRef.current.scrollTo(target, { offset: 0, duration: 1.15 });
    } else {
      target.scrollIntoView();
    }
  };

  return (
    <nav ref={navRef} className="site-nav" aria-label="Primary">
      <button
        type="button"
        className={`nav-sun ${theme === "day" ? "is-day" : ""}`}
        data-flip
        onClick={toggleTheme}
        aria-label={theme === "day" ? "Switch to dark" : "Switch to day"}
      >
        {theme === "day" ? <Moon strokeWidth={1.25} /> : <Sun strokeWidth={1.25} />}
      </button>
      <div className="nav-links" data-flip>
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            data-flip
            className={`nav-link ${link.cta ? "nav-cta" : ""} ${active === link.id ? "is-active" : ""}`}
            aria-current={active === link.id ? "true" : undefined}
            onClick={(event) => onNavigate(event, link.href, link.id)}
          >
            <Roll label={link.cta ? `${link.label} ↗` : link.label} />
            {active === link.id ? <span className="nav-underline" /> : null}
          </a>
        ))}
      </div>
    </nav>
  );
}
