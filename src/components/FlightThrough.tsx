import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

function place(path: SVGPathElement, el: HTMLElement, progress: number, bank: boolean) {
  const length = path.getTotalLength();
  const point = path.getPointAtLength(Math.max(0, Math.min(length, progress * length)));
  const ahead = path.getPointAtLength(Math.max(0, Math.min(length, progress * length + 8)));
  const svg = path.ownerSVGElement;
  const matrix = svg?.getScreenCTM();
  if (!svg || !matrix) return;
  const local = svg.createSVGPoint();
  local.x = point.x;
  local.y = point.y;
  const screen = local.matrixTransform(matrix);
  const angle = (Math.atan2(ahead.y - point.y, ahead.x - point.x) * 180) / Math.PI;
  const fade = Math.min(1, progress / 0.06, (1 - progress) / 0.08);
  gsap.set(el, {
    x: screen.x,
    y: screen.y,
    rotation: bank ? angle * 0.08 : 0,
    opacity: Math.max(0, fade),
  });
  path.style.strokeDasharray = `${length}`;
  path.style.strokeDashoffset = `${length * (1 - progress)}`;
}

export function FlightThrough() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || prefersReducedMotion()) return;
      const eaglePath = root.querySelector<SVGPathElement>("#eagle-route");
      const globePath = root.querySelector<SVGPathElement>("#globe-route");
      const eagle = root.querySelector<HTMLElement>(".flyer-eagle");
      const globe = root.querySelector<HTMLElement>(".flyer-globe");
      if (!eaglePath || !globePath || !eagle || !globe) return;

      gsap.set([eagle, globe], { xPercent: -50, yPercent: -50, opacity: 0 });
      [eaglePath, globePath].forEach((path) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;
      });
      const proxy = { p: 0 };
      const tween = gsap.to(proxy, {
        p: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "#about",
          start: "top bottom",
          endTrigger: "#footer",
          end: "bottom top",
          scrub: 1.15,
        },
        onUpdate: () => {
          place(eaglePath, eagle, proxy.p, true);
          place(globePath, globe, Math.min(1, proxy.p * 0.92 + 0.04), false);
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="flight-layer" aria-hidden="true">
      <svg className="flight-svg" viewBox="0 0 1440 900" preserveAspectRatio="none">
        <path
          id="eagle-route"
          className="flight-route eagle-route"
          d="M1560 210 C 1180 60, 960 340, 700 150 S 280 390, -180 120"
        />
        <path
          id="globe-route"
          className="flight-route globe-route"
          d="M-160 680 C 240 520, 560 860, 900 600 S 1280 430, 1620 760"
        />
      </svg>
      <div className="flyer flyer-eagle">
        <img src="/assets/eagle-earth.png" alt="" draggable={false} />
      </div>
      <div className="flyer flyer-globe">
        <div className="globe-sphere">
          <span className="globe-ring" />
        </div>
      </div>
    </div>
  );
}
