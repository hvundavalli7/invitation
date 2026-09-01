import Image from "next/image";
import { weddingData } from "@/data/wedding";
import styles from "./TraditionalFooter.module.css";

type Props = {
  className?: string;
};

export default function TraditionalFooter({ className }: Props) {
  const { couple } = weddingData;
  const hashtag = "#ABHIMANTH";

  return (
    <footer className={[styles.footer, className].filter(Boolean).join(" ")}>
      <div className={styles.mangoLeaf} aria-hidden="true" />
      <Image
        src="/images/venue/venue-toran-garland.webp"
        alt=""
        width={1600}
        height={480}
        className={styles.toran}
      />
      <div className={styles.inner}>
        <div className={styles.lamps} aria-hidden="true">
          <Image src="/images/decor/diya.svg" alt="" width={28} height={28} className={styles.diya} />
          <Image src="/images/decor/diya.svg" alt="" width={28} height={28} className={styles.diya} />
        </div>
        <p className={styles.withLove}>With love</p>
        <p className={styles.names}>{couple.displayName}</p>
        <p className={styles.hashtag}>{hashtag}</p>

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
