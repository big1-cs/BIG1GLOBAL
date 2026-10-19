import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { useAppState } from "@/context/AppState";

export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { setRevealed } = useAppState();
  const [gone, setGone] = useState(false);
  const revealRef = useRef(setRevealed);
  revealRef.current = setRevealed;

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const reduced = prefersReducedMotion();
      let done = false;

      const finish = () => {
        if (done) return;
        done = true;
        window.clearTimeout(timer);
        revealRef.current(true);
        if (reduced) {
          setGone(true);
          return;
        }
        gsap.to(root, {
          yPercent: -100,
          duration: 0.35,
          ease: "power3.inOut",
          onComplete: () => setGone(true),
        });
      };

      const timer = window.setTimeout(finish, 420);

      return () => window.clearTimeout(timer);
    },
    { scope: rootRef },
  );

  if (gone) return null;

  return (
    <div ref={rootRef} className="preloader" role="status" aria-live="polite" aria-label="Loading">
      <img className="preloader-logo" src="/assets/big1-global-logo.png" alt="BIG1 GLOBAL" />
    </div>
  );
}
