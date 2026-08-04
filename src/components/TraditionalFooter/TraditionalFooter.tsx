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
        src="/images/decor/marigold-garland.svg"
        alt=""
        width={1200}
        height={160}
        className={styles.garland}
      />
      <div className={styles.inner}>
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
          <a href="#details">Details</a>
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
