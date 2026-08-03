import Image from "next/image";
import { weddingData } from "@/data/wedding";
import styles from "./TempleEntranceHero.module.css";

export default function TempleEntranceHero() {
  const { couple, wedding, hero } = weddingData;

  return (
    <header className={styles.hero} id="top">
      <Image
        src="/images/decor/leaf-left.svg"
        alt=""
        width={180}
        height={260}
        className={`${styles.decor} ${styles.decorLeft}`}
        aria-hidden="true"
      />
      <Image
        src="/images/decor/leaf-right.svg"
        alt=""
        width={180}
        height={260}
        className={`${styles.decor} ${styles.decorRight}`}
        aria-hidden="true"
      />
      <Image
        src="/images/decor/rose.svg"
        alt=""
        width={48}
        height={48}
        className={`${styles.bloom} ${styles.bloom1}`}
        aria-hidden="true"
      />
      <Image
        src="/images/decor/flower-yellow.svg"
        alt=""
        width={36}
        height={36}
        className={`${styles.bloom} ${styles.bloom2}`}
        aria-hidden="true"
      />
      <Image
        src="/images/decor/flower-blue.svg"
        alt=""
        width={34}
        height={34}
        className={`${styles.bloom} ${styles.bloom3}`}
        aria-hidden="true"
      />

      <div className={styles.stage}>
        <Image
          src="/images/decor/ganesh.svg"
          alt=""
          width={72}
          height={72}
          className={styles.ganesh}
          priority
        />
        <p className={styles.mantra}>। Shree Ganeshaya Namah ।</p>

        <p className={styles.invite}>{couple.inviteLine}</p>

        <h1 className={styles.names}>
          <span className={styles.name}>{couple.bride}</span>
          <span className={styles.with}>with</span>
          <span className={styles.name}>{couple.groom}</span>
        </h1>

        {hero.image ? (
          <figure className={styles.photoFrame}>
            <Image
              src={hero.image}
              alt={hero.imageAlt}
              width={720}
              height={900}
              className={styles.photo}
              priority
            />
          </figure>
        ) : null}

        <p className={styles.date}>{wedding.dateLabel}</p>
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
