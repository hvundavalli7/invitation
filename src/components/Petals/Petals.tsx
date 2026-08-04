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
  kind: "marigold" | "orange" | "yellow" | "leaf";
  drift: number;
};

const SRC: Record<Floater["kind"], string> = {
  marigold: "/images/decor/marigold.svg",
  orange: "/images/decor/flower-orange.svg",
  yellow: "/images/decor/flower-yellow.svg",
  leaf: "/images/decor/leaf-sprig.svg",
};

const KINDS: Floater["kind"][] = [
  "marigold",
  "orange",
  "leaf",
  "marigold",
  "yellow",
  "orange",
  "marigold",
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
  return Array.from({ length: 24 }, (_, i) => ({
    id: i,
    left: (i * 41 + 7) % 100,
    delay: (i % 10) * 0.85,
    duration: 12 + (i % 7) * 1.6,
    size: 12 + (i % 6) * 3.5,
    kind: KINDS[i % KINDS.length],
    drift: (i % 2 === 0 ? 1 : -1) * (22 + (i % 5) * 10),
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
          className={styles.item}
          style={
            {
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              width: p.size,
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
