"use client";

import Image from "next/image";
import { useEffect, useRef, useSyncExternalStore } from "react";
import styles from "./VenueCanvas.module.css";

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: ((i * 37) % 97) + 1.5,
  top: ((i * 53) % 88) + 4,
  size: 2 + (i % 4),
  delay: (i % 10) * 0.7,
  duration: 6 + (i % 7) * 1.1,
}));

export default function VenueCanvas({ active }: { active: boolean }) {
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => true,
  );

  const rootRef = useRef<HTMLDivElement>(null);
  const templeRef = useRef<HTMLDivElement>(null);
  const gardenRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || reduced) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const p = Math.min(1, y / max);

        if (templeRef.current) {
          templeRef.current.style.transform = `translate3d(0, ${y * 0.18}px, 0) scale(${1 + p * 0.04})`;
        }
        if (gardenRef.current) {
          gardenRef.current.style.transform = `translate3d(0, ${y * -0.08}px, 0)`;
        }
        if (leftRef.current) {
          leftRef.current.style.transform = `translate3d(${-y * 0.02}px, ${y * 0.06}px, 0)`;
        }
        if (rightRef.current) {
          rightRef.current.style.transform = `translate3d(${y * 0.02}px, ${y * 0.05}px, 0)`;
        }
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [active, reduced]);

  if (!active) return null;

  return (
    <div className={styles.root} ref={rootRef} aria-hidden="true">
      <div className={styles.baseWash} />

      <div className={styles.templeLayer} ref={templeRef}>
        <Image
          src="/images/venue/venue-temple-garden.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.templeImage}
        />
      </div>

      <div className={styles.mist} />
      <div className={styles.lightRays} />

      <div className={`${styles.side} ${styles.sideLeft}`} ref={leftRef}>
        <Image
          src="/images/venue/venue-foliage-side.webp"
          alt=""
          width={420}
          height={720}
          className={`${styles.sideImage} ${styles.swayLeft}`}
          sizes="(max-width: 700px) 120px, 280px"
        />
      </div>

      <div className={`${styles.side} ${styles.sideRight}`} ref={rightRef}>
        <Image
          src="/images/venue/venue-foliage-side.webp"
          alt=""
          width={420}
          height={720}
          className={styles.sideImage}
          sizes="(max-width: 700px) 120px, 280px"
        />
      </div>

      <div className={styles.toranWrap}>
        <Image
          src="/images/venue/venue-toran-garland.webp"
          alt=""
          width={1600}
          height={480}
          priority
          className={styles.toran}
          sizes="100vw"
        />
      </div>

      <div className={styles.gardenLayer} ref={gardenRef}>
        <Image
          src="/images/venue/venue-garden-foreground.webp"
          alt=""
          fill
          sizes="100vw"
          className={styles.gardenImage}
        />
      </div>

      <div className={styles.cornerBloom} />

      {!reduced ? (
        <div className={styles.particles}>
          {PARTICLES.map((p) => (
            <span
              key={p.id}
              className={styles.particle}
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: p.size,
                height: p.size,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
