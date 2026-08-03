import { weddingData } from "@/data/wedding";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import { DiyaIcon } from "@/components/Decorative/Motifs";
import styles from "./WeddingDetails.module.css";

export default function WeddingDetails() {
  const { details } = weddingData;

  return (
    <section id="details" className={`section ${styles.section}`} aria-labelledby="details-title">
      <div className="section__inner">
        <ScrollReveal>
          <p className="section__eyebrow">For our honoured guests</p>
          <h2 id="details-title" className="section__title">
            {details.title}
          </h2>
          <div className="ornament-rule" aria-hidden="true">
            <span className="ornament-rule__jewel" />
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {details.items.map((item) => (
            <ScrollReveal key={item.title} className={`${styles.item} wood-panel`}>
              <div className={styles.itemHead}>
                <DiyaIcon className={styles.icon} />
                <h3>{item.title}</h3>
              </div>
              <p>{item.body}</p>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className={`${styles.contact} brass-frame`}>
          <h3>{details.contact.title}</h3>
          <p>{details.contact.note}</p>
          {details.contact.email ? (
            <p>
              <a href={`mailto:${details.contact.email}`}>{details.contact.email}</a>
            </p>
          ) : null}
          {details.contact.phone && !/X{2,}/i.test(details.contact.phone) ? (
            <p>{details.contact.phone}</p>
          ) : null}
        </ScrollReveal>
      </div>
    </section>
  );
}
