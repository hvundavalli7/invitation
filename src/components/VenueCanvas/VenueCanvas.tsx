"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
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

  if (!active) return null;

  return (
    <div className={styles.root} aria-hidden="true">
      <div className={styles.baseWash} />

      <div className={styles.mist} />
      <div className={styles.lightRays} />


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

      <div className={styles.gardenLayer}>
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
