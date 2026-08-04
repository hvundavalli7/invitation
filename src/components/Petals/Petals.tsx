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
  kind: "pink" | "orange" | "yellow" | "leaf" | "blue" | "butterfly";
  drift: number;
};

const SRC: Record<Floater["kind"], string> = {
  pink: "/images/decor/flower-pink.svg",
  orange: "/images/decor/flower-orange.svg",
  yellow: "/images/decor/flower-yellow.svg",
  leaf: "/images/decor/leaf-sprig.svg",
  blue: "/images/decor/flower-blue.svg",
  butterfly: "/images/decor/butterfly.svg",
};

const KINDS: Floater["kind"][] = [
  "pink",
  "orange",
  "leaf",
  "pink",
  "yellow",
  "butterfly",
  "blue",
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
  return Array.from({ length: 22 }, (_, i) => ({
    id: i,
    left: (i * 41 + 7) % 100,
    delay: (i % 9) * 0.9,
    duration: 10 + (i % 6) * 1.8,
    size: 16 + (i % 5) * 4,
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
          className={`${styles.item} ${p.kind === "butterfly" ? styles.butterfly : ""}`}
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
          />
        </span>
      ))}

      <span className={styles.butterflyPath} style={{ animationDelay: "0s" }}>
        <span className={styles.butterflyWings}>
          <Image src={SRC.butterfly} alt="" width={38} height={32} />
        </span>
      </span>
      <span className={styles.butterflyPath} style={{ animationDelay: "-9s", animationDuration: "22s" }}>
        <span className={styles.butterflyWings}>
          <Image src={SRC.butterfly} alt="" width={30} height={26} />
        </span>
      </span>
    </div>
  );
}
