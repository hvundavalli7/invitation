"use client";

import Image from "next/image";
import { useState } from "react";
import { weddingData } from "@/data/wedding";
import styles from "./EnvelopeOpen.module.css";

type Props = {
  onComplete: () => void;
};

export default function EnvelopeOpen({ onComplete }: Props) {
  const [opening, setOpening] = useState(false);
  const { couple } = weddingData;

  const open = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(() => onComplete(), 1100);
  };

  return (
    <div
      className={`${styles.overlay} ${opening ? styles.opening : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Open wedding invitation envelope"
    >
      <div className={styles.floaters} aria-hidden="true">
        <span className={styles.floater} />
        <span className={`${styles.floater} ${styles.floater2}`} />
        <span className={`${styles.floater} ${styles.floater3}`} />
        <span className={`${styles.floater} ${styles.floater4}`} />
      </div>

      <button type="button" className={styles.envelopeBtn} onClick={open} aria-label="Open invitation">
        <Image
          src="/images/decor/envelope.svg"
          alt=""
          width={360}
          height={290}
          className={`${styles.envelope} ${opening ? styles.envelopeOpen : ""}`}
          priority
        />
      </button>

      <h1 className={styles.title}>You&apos;re Invited</h1>
      <p className={styles.subtitle}>Tap the envelope to open your invitation</p>
      <p className={styles.names}>
        {couple.bride} &amp; {couple.groom}
      </p>

      <button type="button" className={`btn-ghost ${styles.skip}`} onClick={open}>
        Skip and Enter
      </button>
    </div>
  );
}
