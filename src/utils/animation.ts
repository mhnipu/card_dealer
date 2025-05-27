import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const fadeInUp = (element: Element) => {
  return gsap.from(element, {
    y: 60,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: element,
      start: "top bottom-=100",
      toggleActions: "play none none reverse"
    }
  });
};

export const staggerFadeIn = (elements: Element[], stagger = 0.1) => {
  return gsap.from(elements, {
    opacity: 0,
    y: 30,
    stagger,
    duration: 0.8,
    scrollTrigger: {
      trigger: elements[0],
      start: "top bottom-=100",
      toggleActions: "play none none reverse"
    }
  });
};

export const parallaxEffect = (element: Element, speed = 0.5) => {
  return gsap.to(element, {
    y: () => (window.innerHeight * speed),
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
};

export const scaleIn = (element: Element) => {
  return gsap.from(element, {
    scale: 0.8,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: element,
      start: "top bottom-=100",
      toggleActions: "play none none reverse"
    }
  });
};