import { weddingData } from "@/data/wedding";
import { DiyaIcon, LotusIcon } from "@/components/Decorative/Motifs";
import styles from "./TraditionalFooter.module.css";

export default function TraditionalFooter() {
  const { couple, wedding, footer } = weddingData;

  return (
    <footer className={styles.footer}>
      <div className={styles.mangoLeaf} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.lamps} aria-hidden="true">
          <DiyaIcon className={styles.diya} />
          <LotusIcon className={styles.lotus} />
          <DiyaIcon className={styles.diya} />
        </div>

        <p className={styles.names}>{couple.displayName}</p>
        <p className={styles.date}>
          {wedding.dateLabel}
          <span aria-hidden="true"> · </span>
          {wedding.venue}, {wedding.location}
        </p>
        <p className={styles.tagline}>{footer.tagline}</p>

        <nav className={styles.nav} aria-label="Footer">
          <a href="#celebrations">Celebrations</a>
          <a href="#details">Details</a>
          <a href="#venues">Venues</a>
          <a href="#rsvp">RSVP</a>
          <a href={`mailto:${footer.contactEmail}`}>{footer.contactEmail}</a>
        </nav>

        <a className={`btn-ghost ${styles.top}`} href="#top">
          Back to top
        </a>
      </div>
    </footer>
  );
}
