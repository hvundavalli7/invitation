"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import styles from "./ConfettiBurst.module.css";

type Props = {
  active: boolean;
};

const PIECES = Array.from({ length: 42 }, (_, i) => ({
  id: i,
  left: 8 + ((i * 17) % 84),
  delay: (i % 12) * 0.04,
  duration: 1.8 + (i % 5) * 0.22,
  size: 6 + (i % 5),
  rotate: (i * 37) % 360,
  color:
    ["#c89b3c", "#e4c36a", "#7b1e2b", "#2f6b24", "#f0a020", "#fff8e8", "#9a2f3f"][
      i % 7
    ],
}));

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function ConfettiBurst({ active }: Props) {
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => true,
  );
  const [visible, setVisible] = useState(false);
  const playedRef = useRef(false);

  useEffect(() => {
    if (!active || reduced || playedRef.current) return;
    playedRef.current = true;
    const start = window.requestAnimationFrame(() => setVisible(true));
    const stop = window.setTimeout(() => setVisible(false), 2800);
    return () => {
      window.cancelAnimationFrame(start);
      window.clearTimeout(stop);
    };
  }, [active, reduced]);

  if (!visible || reduced) return null;

  return (
    <div className={styles.root} aria-hidden="true">
      {PIECES.map((p) => (
        <span
          key={p.id}
          className={styles.piece}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.55,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            ["--rot" as string]: `${p.rotate}deg`,
          }}
        />
      ))}
    </div>
  );
}
