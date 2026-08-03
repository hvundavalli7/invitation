"use client";

import { useMemo, useSyncExternalStore } from "react";
import styles from "./Petals.module.css";

type Petal = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  kind: "petal" | "gold";
};

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function createPetals(): Petal[] {
  return Array.from({ length: 28 }, (_, i) => ({
    id: i,
    left: (i * 37) % 100,
    delay: (i % 7) * 0.85,
    duration: 7 + (i % 5) * 1.6,
    size: 8 + (i % 6) * 2,
    kind: i % 3 === 0 ? "gold" : "petal",
  }));
}

export default function Petals({ active }: { active: boolean }) {
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => true,
  );

  const petals = useMemo(() => {
    if (!active || reduced) return [] as Petal[];
    return createPetals();
  }, [active, reduced]);

  if (!active || reduced || petals.length === 0) return null;

  return (
    <div className={styles.layer} aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className={p.kind === "gold" ? styles.gold : styles.petal}
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            width: p.size,
            height: p.size * (p.kind === "gold" ? 1 : 1.35),
          }}
        />
      ))}
    </div>
  );
}
