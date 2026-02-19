import { useEffect, useRef, useState } from "react";

// Simples e confiável: calcula, a cada frame via scroll/resize, qual seção tem
// maior área visível na viewport e retorna seu id. Evita observers globais
// que podem competir com o ciclo de commit do React em alguns ambientes.
export default function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState<string | null>(null);
  const rafRef = useRef<number | null>(null);
  const retryRef = useRef<number | null>(null);

  useEffect(() => {
    let mounted = true;

    const compute = () => {
      let best: string | null = null;
      let bestRatio = 0;
      const vh = window.innerHeight || document.documentElement.clientHeight;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.height <= 0) continue;
        const visible = Math.max(
          0,
          Math.min(r.bottom, vh) - Math.max(r.top, 0),
        );
        const ratio = Math.min(1, Math.max(0, visible / r.height));
        if (ratio > bestRatio) {
          bestRatio = ratio;
          best = id;
        }
      }

      if (!mounted) return;
      setActive((prev) => {
        if (prev !== best) {
          console.debug("[useActiveSection] active ->", best, bestRatio);
        }
        return best;
      });
    };

    const schedule = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        compute();
      });
    };

    // initial compute
    schedule();

    // short retry in case sections render after mount (no MutationObserver)
    let attempts = 0;
    retryRef.current = window.setInterval(() => {
      attempts += 1;
      schedule();
      if (attempts >= 6 && retryRef.current) {
        clearInterval(retryRef.current);
        retryRef.current = null;
      }
    }, 300) as unknown as number;

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("orientationchange", schedule);

    return () => {
      mounted = false;
      if (rafRef.current) {
        try {
          cancelAnimationFrame(rafRef.current);
        } catch {
          console.error();
        }
        rafRef.current = null;
      }
      if (retryRef.current) {
        try {
          clearInterval(retryRef.current);
        } catch {
          console.error();
        }
        retryRef.current = null;
      }
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("orientationchange", schedule);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(sectionIds)]);

  return active;
}
