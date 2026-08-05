import Image from "next/image";
import { weddingData } from "@/data/wedding";
import styles from "./TraditionalFooter.module.css";

export default function TraditionalFooter() {
  const { couple, wedding, footer } = weddingData;
  const hashtag = `#${couple.bride}${couple.groom}`.replace(/\s+/g, "").toUpperCase();

  return (
    <footer className={styles.footer}>
      <div className={styles.mangoLeaf} aria-hidden="true" />
      <Image
        src="/images/decor/mango-leaf-toran.svg"
        alt=""
        width={1400}
        height={160}
        className={styles.toran}
      />
      <div className={styles.inner}>
        <div className={styles.lamps} aria-hidden="true">
          <Image src="/images/decor/diya.svg" alt="" width={28} height={28} className={styles.diya} />
          <Image src="/images/decor/diya.svg" alt="" width={28} height={28} className={styles.diya} />
        </div>
        <p className={styles.withLove}>With love</p>
        <p className={styles.names}>{couple.displayName}</p>
        <p className={styles.date}>{wedding.dateLabel}</p>
        <p className={styles.venue}>
          {wedding.venue}, {wedding.location}
        </p>
        <p className={styles.hashtag}>{hashtag}</p>
        <p className={styles.tagline}>{footer.tagline}</p>

        <nav className={styles.nav} aria-label="Footer">
          <a href="#celebrations">Celebrations</a>
          <a href="#favorites">Favorites</a>
          <a href="#gallery">Gallery</a>
          <a href="#venues">Venues</a>
          <a href="#rsvp">RSVP</a>
        </nav>

        <a className={`btn-ghost ${styles.top}`} href="#top">
          Back to top
        </a>
      </div>
    </footer>
  );
}
