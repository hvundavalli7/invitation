"use client";

import Image from "next/image";
import { useState } from "react";
import { weddingData } from "@/data/wedding";
import styles from "./EnvelopeOpen.module.css";

type Props = {
  onComplete: () => void;
};

const CORNER_SPRIGS = [
  { className: styles.cornerTL, rotate: 0 },
  { className: styles.cornerTR, rotate: 90 },
  { className: styles.cornerBL, rotate: -90 },
  { className: styles.cornerBR, rotate: 180 },
] as const;

export default function EnvelopeOpen({ onComplete }: Props) {
  const [opening, setOpening] = useState(false);
  const { couple } = weddingData;
  const initials = `${couple.bride.charAt(0)} & ${couple.groom.charAt(0)}`;

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
        <Image src="/images/decor/flower-pink.svg" alt="" width={28} height={28} className={`${styles.floater} ${styles.f1}`} />
        <Image src="/images/decor/flower-orange.svg" alt="" width={24} height={24} className={`${styles.floater} ${styles.f2}`} />
        <Image src="/images/decor/butterfly.svg" alt="" width={34} height={28} className={`${styles.floater} ${styles.f3}`} />
        <Image src="/images/decor/leaf-sprig.svg" alt="" width={26} height={34} className={`${styles.floater} ${styles.f4}`} />
        <Image src="/images/decor/flower-pink.svg" alt="" width={22} height={22} className={`${styles.floater} ${styles.f5}`} />
        <Image src="/images/decor/flower-yellow.svg" alt="" width={24} height={24} className={`${styles.floater} ${styles.f6}`} />
      </div>

      {CORNER_SPRIGS.map((corner) => (
        <Image
          key={corner.className}
          src="/images/decor/leaf-sprig.svg"
          alt=""
          width={48}
          height={64}
          className={`${styles.corner} ${corner.className}`}
          style={{ transform: `rotate(${corner.rotate}deg)` }}
          aria-hidden="true"
        />
      ))}

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
          <span className={styles.seal} aria-hidden="true">
            {initials}
          </span>
        </span>
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
