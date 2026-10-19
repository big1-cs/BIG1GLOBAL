import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { heroLines } from "@/data/hero";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { HeroRibs } from "@/components/HeroRibs";
import { SiteNav } from "@/components/SiteNav";

type HeroProps = {
  revealed: boolean;
};

export function Hero({ revealed }: HeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const revealedRef = useRef(revealed);
  revealedRef.current = revealed;

  useGSAP(
    () => {
      const lines = gsap.utils.toArray<HTMLElement>(".line-inner");
      if (!lines.length) return;
      if (prefersReducedMotion()) {
        gsap.set(lines, { yPercent: 0 });
        return;
      }
      gsap.set(lines, { yPercent: 110 });
      if (!revealed) return;
      gsap.to(lines, {
        yPercent: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "expo.out",
        delay: 0.4,
      });
    },
    { scope: rootRef, dependencies: [revealed] },
  );

  return (
    <section ref={rootRef} id="hero" className="hero">
      <HeroRibs revealed={revealed} />
      <div className="hero-logo">
        <img className="hero-logo-mark" src="/assets/big1-global-logo.png" alt="BIG1 GLOBAL" />
      </div>
      <h1 className="hero-copy">
        {heroLines.map((line) => (
          <span
            key={line.text}
            className={`line-mask indent-${line.indent}`}
          >
            <span className={`line-inner hero-line ${line.face === "serif" ? "serif" : ""}`}>
              {line.text}
            </span>
          </span>
        ))}
      </h1>
      <SiteNav />
    </section>
  );
}
