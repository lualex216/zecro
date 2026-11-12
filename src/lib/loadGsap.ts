import type { gsap as Gsap } from "gsap";

// GSAP + ScrollTrigger se încarcă la cerere (chunk separat), ca să nu intre în JS-ul inițial:
// reveal-ul cuvintelor pornește imediat după hidratare, iar textul e vizibil și înainte de el.
let pending: Promise<typeof Gsap> | null = null;

export function loadGsap() {
  pending ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
    ([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);
      return gsap;
    },
  );
  return pending;
}
