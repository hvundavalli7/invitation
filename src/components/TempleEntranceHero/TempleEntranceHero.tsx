import Image from "next/image";
import { weddingData } from "@/data/wedding";
import styles from "./TempleEntranceHero.module.css";

export default function TempleEntranceHero() {
  const { couple, wedding, hero } = weddingData;

  return (
    <header className={styles.hero} id="top">
      <div className={styles.parchment} aria-hidden="true" />
      <div className={styles.templeArch} aria-hidden="true" />

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

      <div className={styles.bells} aria-hidden="true">
        <Image
          src="/images/decor/temple-bell.svg"
          alt=""
          width={48}
          height={60}
          className={`${styles.bell} ${styles.bellLeft}`}
        />
        <Image
          src="/images/decor/temple-bell.svg"
          alt=""
          width={48}
          height={60}
          className={`${styles.bell} ${styles.bellRight}`}
        />
      </div>

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
      </div>

      <div className={styles.diyas} aria-hidden="true">
        <Image
          src="/images/decor/diya.svg"
          alt=""
          width={48}
          height={48}
          className={`${styles.diya} ${styles.diyaLeft}`}
        />
        <Image
          src="/images/decor/diya.svg"
          alt=""
          width={48}
          height={48}
          className={`${styles.diya} ${styles.diyaRight}`}
        />
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
            <div className={styles.ornateFrame}>
              <Image
                src="/images/decor/ornate-corner.svg"
                alt=""
                width={80}
                height={80}
                className={`${styles.frameCorner} ${styles.fcTl}`}
              />
              <Image
                src="/images/decor/ornate-corner.svg"
                alt=""
                width={80}
                height={80}
                className={`${styles.frameCorner} ${styles.fcTr}`}
              />
              <Image
                src="/images/decor/ornate-corner.svg"
                alt=""
                width={80}
                height={80}
                className={`${styles.frameCorner} ${styles.fcBl}`}
              />
              <Image
                src="/images/decor/ornate-corner.svg"
                alt=""
                width={80}
                height={80}
                className={`${styles.frameCorner} ${styles.fcBr}`}
              />
              <Image
                src={hero.image}
                alt={hero.imageAlt}
                width={1024}
                height={1536}
                className={styles.sceneImage}
                priority
                sizes="(max-width: 800px) 100vw, 560px"
              />
            </div>
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
