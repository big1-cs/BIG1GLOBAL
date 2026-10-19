import { gsap } from "@/lib/gsap-install";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { Flip } from "gsap/Flip";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// Keep the return value. A production bundler otherwise deletes this call,
// because the gsap package is marked side-effect free.
export const gsapReady = gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin, Flip, MotionPathPlugin);

export function ensureMotion() {
  if (typeof window === "undefined") return;
  window.gsap = gsap;
  gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin, Flip, MotionPathPlugin);
}

export { gsap, ScrollTrigger, DrawSVGPlugin, Flip, MotionPathPlugin };
