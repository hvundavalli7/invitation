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

const FLOATERS = [
  { id: 1, src: "/images/decor/flower-pink.svg", left: "4%", top: "18%", size: 28, delay: 0 },
  { id: 2, src: "/images/decor/flower-yellow.svg", left: "92%", top: "22%", size: 24, delay: 1.2 },
  { id: 3, src: "/images/decor/leaf-sprig.svg", left: "6%", top: "62%", size: 36, delay: 0.6 },
  { id: 4, src: "/images/decor/flower-orange.svg", left: "90%", top: "58%", size: 26, delay: 1.8 },
  { id: 5, src: "/images/decor/butterfly.svg", left: "12%", top: "40%", size: 22, delay: 2.4 },
  { id: 6, src: "/images/decor/marigold.svg", left: "86%", top: "78%", size: 24, delay: 0.9 },
  { id: 7, src: "/images/decor/flower-pink.svg", left: "78%", top: "12%", size: 20, delay: 1.5 },
  { id: 8, src: "/images/decor/flower-yellow.svg", left: "18%", top: "82%", size: 22, delay: 2.1 },
] as const;

/**
 * Fixed cream invitation atmosphere — no parallax / no mixed scenic layers
 * that shift while scrolling. Decorative florals stay gently in place.
 */
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
      <div className={styles.parchment} />
      <div className={styles.cornerBloom} />

      <div className={styles.toranWrap}>
        <Image
          src="/images/decor/mango-leaf-toran.svg"
          alt=""
          width={1400}
          height={160}
          priority
          className={styles.toran}
          sizes="100vw"
        />
      </div>

      <div className={styles.floaters}>
        {FLOATERS.map((f) => (
          <Image
            key={f.id}
            src={f.src}
            alt=""
            width={f.size}
            height={f.size}
            className={`${styles.floater} ${reduced ? "" : styles.floaterDrift}`}
            style={{
              left: f.left,
              top: f.top,
              width: f.size,
              height: f.size,
              animationDelay: `${f.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
