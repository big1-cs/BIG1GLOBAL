import { useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

export function AboutScroll({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.9,
        autoRaf: false,
      });
      lenis.on("scroll", ScrollTrigger.update);
      const onTick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);

      gsap.from(".apage-hero-copy > *", {
        y: 32,
        autoAlpha: 0,
        duration: 1.15,
        stagger: 0.1,
        ease: "expo.out",
      });

      gsap.from(".apage-field", {
        autoAlpha: 0,
        scale: 0.94,
        duration: 1.4,
        ease: "expo.out",
      });

      gsap.to(".apage-progress span", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((item) => {
        gsap.from(item, {
          y: 36,
          autoAlpha: 0,
          duration: 1.05,
          ease: "expo.out",
          immediateRender: false,
          clearProps: "transform",
          scrollTrigger: { trigger: item, start: "top 88%" },
        });
      });

      const glow = root.current?.querySelector<HTMLElement>(".apage-glow");
      const grid = root.current?.querySelector<HTMLElement>(".apage-grid");
      const xTo = glow ? gsap.quickTo(glow, "x", { duration: 0.55, ease: "power3.out" }) : null;
      const yTo = glow ? gsap.quickTo(glow, "y", { duration: 0.55, ease: "power3.out" }) : null;
      const onMove = (event: PointerEvent) => {
        xTo?.(event.clientX);
        yTo?.(event.clientY);
        if (grid) {
          grid.style.setProperty("--gx", `${event.clientX}px`);
          grid.style.setProperty("--gy", `${event.clientY}px`);
        }
      };
      window.addEventListener("pointermove", onMove);

      gsap.fromTo(
        ".apage-traveller",
        { y: 0, rotation: 0 },
        {
          y: () => Math.max(window.innerHeight * 3.2, 1200),
          rotation: 260,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        },
      );
      gsap.from(".apage-table tbody tr", {
        y: 20,
        autoAlpha: 0,
        stagger: 0.07,
        duration: 0.8,
        ease: "expo.out",
        immediateRender: false,
        scrollTrigger: { trigger: ".apage-table", start: "top 82%" },
      });

      return () => {
        window.removeEventListener("pointermove", onMove);
        gsap.ticker.remove(onTick);
        lenis.destroy();
      };
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <div className="apage-grid" aria-hidden="true" />
      <div className="apage-glow" aria-hidden="true" />
      <div className="apage-traveller" aria-hidden="true">
        <svg viewBox="0 0 160 160" fill="none">
          <circle cx="80" cy="80" r="58" stroke="rgba(245,243,238,0.35)" strokeWidth="1" />
          <path d="M80 18 A62 62 0 0 0 80 142" stroke="#22d3ee" strokeWidth="1.4" />
          <path d="M80 18 A62 62 0 0 1 80 142" stroke="#f5b83d" strokeWidth="1.4" />
          <circle cx="80" cy="80" r="10" stroke="#f5b83d" strokeWidth="1.2" />
          <circle cx="80" cy="80" r="3" fill="#f5b83d" />
        </svg>
      </div>
      <div className="apage-progress" aria-hidden="true">
        <span />
      </div>
      {children}
    </div>
  );
}
