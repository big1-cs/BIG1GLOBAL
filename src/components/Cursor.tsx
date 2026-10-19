import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ring = ringRef.current;
    if (!ring) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    document.documentElement.classList.add("has-cursor");
    gsap.set(ring, { xPercent: -50, yPercent: -50, opacity: 0 });

    const xTo = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });
    const label = ring.querySelector(".cursor-label");

    const onMove = (event: PointerEvent) => {
      xTo(event.clientX);
      yTo(event.clientY);
      if (ring.dataset.on !== "1") {
        ring.dataset.on = "1";
        gsap.to(ring, { opacity: 1, duration: 0.35, ease: "power2.out" });
      }
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const hot = target?.closest("a, button, [data-cursor]");
      ring.classList.toggle("is-hot", Boolean(hot));
      const text = hot?.getAttribute("data-cursor-label") ?? "";
      if (label) label.textContent = text;
      ring.classList.toggle("has-label", Boolean(text));
    };

    const onLeave = () => {
      gsap.to(ring, { opacity: 0, duration: 0.25 });
      ring.dataset.on = "0";
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div ref={ringRef} className="cursor-ring" aria-hidden="true">
      <span className="cursor-plus" />
      <span className="cursor-label" />
    </div>
  );
}
