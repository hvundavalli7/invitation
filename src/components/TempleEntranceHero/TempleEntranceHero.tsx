"use client";

import { weddingData } from "@/data/wedding";
import { BellIcon, DiyaIcon, LotusIcon } from "@/components/Decorative/Motifs";
import styles from "./TempleEntranceHero.module.css";

export default function TempleEntranceHero() {
  const { couple, wedding, hero } = weddingData;

  return (
    <header className={styles.hero} id="top">
      <div className={styles.atmosphere} aria-hidden="true" />
      <div className={styles.garland} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className={styles.stage}>
        <aside className={`${styles.pillar} ${styles.pillarLeft}`} aria-hidden="true">
          <div className={styles.carving} />
          <div className={styles.carving} />
          <div className={styles.carving} />
        </aside>

        <div className={styles.center}>
          <div className={styles.bells} aria-hidden="true">
            <BellIcon className={styles.bell} />
            <BellIcon className={`${styles.bell} ${styles.bellDelay}`} />
            <BellIcon className={styles.bell} />
          </div>

          <p className={styles.eyebrow}>South Indian Hindu Wedding</p>
          <h1 className={styles.names}>
            <span className={styles.name}>{couple.bride}</span>
            <span className={styles.ampersand}>&amp;</span>
            <span className={styles.name}>{couple.groom}</span>
          </h1>

          <div className={styles.ornament}>
            <DiyaIcon className={styles.diya} />
            <LotusIcon className={styles.lotus} />
            <DiyaIcon className={styles.diya} />
          </div>

          <p className={styles.invite}>{couple.inviteLine}</p>
          <p className={styles.date}>{wedding.dateLabel}</p>
          <p className={styles.venue}>
            {wedding.venue}
            <span aria-hidden="true"> · </span>
            {wedding.location}
          </p>

          <a className={`btn-temple ${styles.cta}`} href={hero.ctaHref}>
            {hero.ctaLabel}
          </a>
        </div>

        <aside className={`${styles.pillar} ${styles.pillarRight}`} aria-hidden="true">
          <div className={styles.carving} />
          <div className={styles.carving} />
          <div className={styles.carving} />
        </aside>
      </div>

      <div className={styles.threshold} aria-hidden="true" />
    </header>
  );
}
