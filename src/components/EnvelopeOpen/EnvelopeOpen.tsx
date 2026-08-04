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
      <Image
        src="/images/decor/mango-leaf-toran.svg"
        alt=""
        width={1200}
        height={140}
        className={styles.toran}
        priority
      />
      <Image
        src="/images/decor/marigold-garland.svg"
        alt=""
        width={1200}
        height={160}
        className={styles.garland}
        priority
      />

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

      <div className={styles.floaters} aria-hidden="true">
        <Image src="/images/decor/marigold.svg" alt="" width={28} height={28} className={`${styles.floater} ${styles.f1}`} />
        <Image src="/images/decor/diya.svg" alt="" width={26} height={26} className={`${styles.floater} ${styles.f2}`} />
        <Image src="/images/decor/marigold.svg" alt="" width={26} height={26} className={`${styles.floater} ${styles.f3}`} />
        <Image src="/images/decor/temple-bell.svg" alt="" width={24} height={30} className={`${styles.floater} ${styles.f4}`} />
        <Image src="/images/decor/flower-yellow.svg" alt="" width={22} height={22} className={`${styles.floater} ${styles.f5}`} />
        <Image src="/images/decor/marigold.svg" alt="" width={24} height={24} className={`${styles.floater} ${styles.f6}`} />
      </div>

      <div className={styles.ganesh} aria-hidden="true">
        <Image
          src="/images/decor/ganesh-idol.png"
          alt=""
          width={72}
          height={72}
          priority
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
