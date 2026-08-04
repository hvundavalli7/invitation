import Image from "next/image";
import { weddingData } from "@/data/wedding";
import styles from "./TempleEntranceHero.module.css";

export default function TempleEntranceHero() {
  const { couple, wedding, hero } = weddingData;

  return (
    <header className={styles.hero} id="top">
      <div className={styles.borderFrame} aria-hidden="true">
        <Image
          src="/images/decor/leaf-left.svg"
          alt=""
          width={200}
          height={300}
          className={`${styles.decor} ${styles.decorLeftTop}`}
        />
        <Image
          src="/images/decor/leaf-right.svg"
          alt=""
          width={200}
          height={300}
          className={`${styles.decor} ${styles.decorRightTop}`}
        />
        <Image
          src="/images/decor/corner-botanical.svg"
          alt=""
          width={180}
          height={180}
          className={`${styles.decor} ${styles.decorLeftBottom}`}
        />
        <Image
          src="/images/decor/corner-botanical.svg"
          alt=""
          width={180}
          height={180}
          className={`${styles.decor} ${styles.decorRightBottom}`}
        />

        <Image src="/images/decor/rose.svg" alt="" width={52} height={52} className={`${styles.bloom} ${styles.bloom1}`} />
        <Image src="/images/decor/flower-yellow.svg" alt="" width={40} height={40} className={`${styles.bloom} ${styles.bloom2}`} />
        <Image src="/images/decor/flower-blue.svg" alt="" width={38} height={38} className={`${styles.bloom} ${styles.bloom3}`} />
        <Image src="/images/decor/flower-pink.svg" alt="" width={42} height={42} className={`${styles.bloom} ${styles.bloom4}`} />
        <Image src="/images/decor/flower-orange.svg" alt="" width={36} height={36} className={`${styles.bloom} ${styles.bloom5}`} />
        <Image src="/images/decor/leaf-sprig.svg" alt="" width={40} height={52} className={`${styles.bloom} ${styles.bloom6}`} />
      </div>

      <div className={styles.stage}>
        <Image
          src="/images/decor/ganesh-idol.png"
          alt="Lord Ganesha"
          width={120}
          height={120}
          className={styles.ganesh}
          priority
        />
        <p className={styles.mantra}>॥ Shree Ganeshaya Namah ॥</p>

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
