"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./EnvelopeOpen.module.css";

type Props = {
  onOpenStart?: () => void;
  onComplete: () => void;
};

export default function EnvelopeOpen({ onOpenStart, onComplete }: Props) {
  const [opening, setOpening] = useState(false);

  const open = () => {
    if (opening) return;
    onOpenStart?.();
    setOpening(true);
    window.setTimeout(() => onComplete(), 1900);
  };

  return (
    <div
      className={`${styles.overlay} ${opening ? styles.opening : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Open wedding invitation envelope"
    >
      <div className={styles.backdrop} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.sideLeaves} aria-hidden="true">
          <Image
            src="/images/decor/banana-leaf-left.svg"
            alt=""
            width={220}
            height={400}
            className={`${styles.banana} ${styles.bananaLeft}`}
          />
          <Image
            src="/images/decor/banana-leaf-right.svg"
            alt=""
            width={220}
            height={400}
            className={`${styles.banana} ${styles.bananaRight}`}
          />
        </div>

        <button type="button" className={styles.envelopeBtn} onClick={open} aria-label="Open invitation">
          <span className={`${styles.card} ${opening ? styles.cardOpen : ""}`}>
            <Image
              src="/images/decor/invitation-envelope.png"
              alt=""
              width={871}
              height={980}
              className={styles.envelope}
              priority
            />
          </span>
        </button>

        <h1 className={styles.title}>You&apos;re Invited</h1>
        <p className={styles.subtitle}>Tap the envelope to open your invitation</p>
      </div>
    </div>
  );
}
