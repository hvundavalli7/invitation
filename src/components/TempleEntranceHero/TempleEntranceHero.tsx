import Image from "next/image";
import { weddingData } from "@/data/wedding";
import styles from "./TempleEntranceHero.module.css";

export default function TempleEntranceHero() {
  const { couple, wedding, hero } = weddingData;

  return (
    <header className={styles.hero} id="top">
      <div className={styles.atmosphere} aria-hidden="true">
        <div className={styles.sunGlow} />
        <div className={styles.groundFade} />
      </div>

      <div className={styles.stage}>
        <div className={styles.ganeshWrap}>
          <Image
            src="/images/decor/ganesh-idol.png"
            alt=""
            width={120}
            height={120}
            className={styles.ganesh}
            priority
          />
        </div>

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
              sizes="(max-width: 800px) 92vw, 520px"
            />
            <div className={styles.sceneBlend} aria-hidden="true" />
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
