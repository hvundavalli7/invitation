"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import styles from "./ConfettiBurst.module.css";

type Props = {
  /** Becomes true once when confetti should fire */
  active: boolean;
};

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const COLORS = ["#c89b3c", "#7b1e2b", "#2f6b24", "#e4c36a", "#c62828", "#e9a825", "#fff8e8"];

const PIECES = Array.from({ length: 42 }, (_, i) => ({
  id: i,
  left: 8 + ((i * 17) % 84),
  delay: (i % 12) * 0.04,
  duration: 1.6 + (i % 5) * 0.18,
  color: COLORS[i % COLORS.length],
  rotate: (i * 37) % 360,
  size: 6 + (i % 5),
  drift: -40 + ((i * 13) % 80),
}));

/**
 * One-shot celebratory confetti — complementary wedding palette.
 * Does not permanently cover the page; auto-dismisses after animation.
 */
export default function ConfettiBurst({ active }: Props) {
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => true,
  );
  const [visible, setVisible] = useState(false);
  const firedRef = useRef(false);

  useEffect(() => {
    if (!active || reduced || firedRef.current) return;
    firedRef.current = true;
    const showId = window.setTimeout(() => setVisible(true), 0);
    const hideId = window.setTimeout(() => setVisible(false), 2800);
    return () => {
      window.clearTimeout(showId);
      window.clearTimeout(hideId);
    };
  }, [active, reduced]);

  if (!visible) return null;

  return (
    <div className={styles.root} aria-hidden="true">
      {PIECES.map((p) => (
        <span
          key={p.id}
          className={styles.piece}
          style={{
            left: `${p.left}%`,
            background: p.color,
            width: p.size,
            height: p.size * 1.4,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            ["--drift" as string]: `${p.drift}px`,
            ["--spin" as string]: `${p.rotate}deg`,
          }}
        />
      ))}
    </div>
  );
}
