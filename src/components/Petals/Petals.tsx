"use client";

import Image from "next/image";
import { useMemo, useSyncExternalStore, type CSSProperties } from "react";
import styles from "./Petals.module.css";

type Floater = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  kind: "marigold" | "orange" | "yellow" | "leaf" | "diya";
  drift: number;
};

const SRC: Record<Floater["kind"], string> = {
  marigold: "/images/decor/marigold.svg",
  orange: "/images/decor/flower-orange.svg",
  yellow: "/images/decor/flower-yellow.svg",
  leaf: "/images/decor/leaf-sprig.svg",
  diya: "/images/decor/diya.svg",
};

const KINDS: Floater["kind"][] = [
  "marigold",
  "orange",
  "leaf",
  "marigold",
  "yellow",
  "diya",
  "orange",
  "leaf",
];

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function createFloaters(): Floater[] {
  return Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: (i * 41 + 7) % 100,
    delay: (i % 9) * 0.9,
    duration: 11 + (i % 6) * 1.8,
    size: 14 + (i % 5) * 4,
    kind: KINDS[i % KINDS.length],
    drift: (i % 2 === 0 ? 1 : -1) * (18 + (i % 4) * 8),
  }));
}

export default function Petals({ active }: { active: boolean }) {
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => true,
  );

  const floaters = useMemo(() => {
    if (!active || reduced) return [] as Floater[];
    return createFloaters();
  }, [active, reduced]);

  if (!active || reduced || floaters.length === 0) return null;

  return (
    <div className={styles.layer} aria-hidden="true">
      {floaters.map((p) => (
        <span
          key={p.id}
          className={`${styles.item} ${p.kind === "diya" ? styles.diya : ""}`}
          style={
            {
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              width: p.kind === "diya" ? p.size * 1.15 : p.size,
              "--drift": `${p.drift}px`,
            } as CSSProperties
          }
        >
          <Image
            src={SRC[p.kind]}
            alt=""
            width={p.size}
            height={p.size}
            className={styles.img}
            style={{ width: "100%", height: "auto" }}
          />
        </span>
      ))}
    </div>
  );
}
