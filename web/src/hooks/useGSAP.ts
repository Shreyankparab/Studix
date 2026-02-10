'use client';

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useGSAP(callback: (gsap: typeof import('gsap').default) => void, deps: React.DependencyList = []) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      callback(gsap);
    }, ref);

    return () => ctx.revert();
  }, deps);

  return ref;
}

export default useGSAP;
