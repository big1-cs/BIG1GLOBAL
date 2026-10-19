import gsap from "gsap";

// The ESM build does not put itself on window. ScrollTrigger only auto-registers
// if window.gsap already exists when its module is evaluated.
if (typeof window !== "undefined") {
  window.gsap = gsap;
}

export { gsap };
