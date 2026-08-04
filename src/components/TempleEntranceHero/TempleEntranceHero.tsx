import Image from "next/image";
import { weddingData } from "@/data/wedding";
import styles from "./TempleEntranceHero.module.css";

export default function TempleEntranceHero() {
  const { couple, wedding, hero } = weddingData;

  return (
    <header className={styles.hero} id="top">
      <div className={styles.sky} aria-hidden="true" />
      <div className={styles.meadow} aria-hidden="true" />
      <div className={styles.gopuram} aria-hidden="true" />

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
          width={280}
          height={520}
          className={`${styles.banana} ${styles.bananaLeft}`}
        />
        <Image
          src="/images/decor/banana-leaf-right.svg"
          alt=""
          width={280}
          height={520}
          className={`${styles.banana} ${styles.bananaRight}`}
        />
        <Image
          src="/images/decor/coconut-frond.svg"
          alt=""
          width={220}
          height={360}
          className={`${styles.coconut} ${styles.coconutLeft}`}
        />
        <Image
          src="/images/decor/coconut-frond.svg"
          alt=""
          width={220}
          height={360}
          className={`${styles.coconut} ${styles.coconutRight}`}
        />
      </div>

      <div className={styles.stage}>
        <p className={styles.label}>Wedding Invitation</p>

        <h1 className={styles.names}>
          <span className={styles.name}>{couple.bride}</span>
          <span className={styles.ampersand} aria-hidden="true">
            &amp;
          </span>
          <span className={styles.name}>{couple.groom}</span>
        </h1>

        <p className={styles.invite}>{couple.inviteLine}</p>

        {hero.image ? (
          <div className={styles.scene}>
            <Image
              src={hero.image}
              alt={hero.imageAlt}
              width={1024}
              height={1536}
              className={styles.sceneImage}
              priority
              sizes="(max-width: 800px) 100vw, 720px"
            />
          </div>
        ) : null}

        <p className={styles.venue}>
          {wedding.venue}
          <span aria-hidden="true"> · </span>
          {wedding.location}
        </p>

        <a className={`btn-invite ${styles.cta}`} href={hero.ctaHref}>
          {hero.ctaLabel}
        </a>
      </div>
    </header>
  );
}
