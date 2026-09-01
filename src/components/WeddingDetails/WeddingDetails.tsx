import { createPortal } from "react-dom";
import { useState } from "react";
import { mapsSearchUrl, weddingData } from "@/data/wedding";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import SectionCorners from "@/components/Decorative/SectionCorners";
import { DiyaIcon } from "@/components/Decorative/Motifs";
import styles from "./WeddingDetails.module.css";

export default function WeddingDetails() {
  const { details } = weddingData;
  const [open, setOpen] = useState(false);

  const accommodation = details.accommodation;

  return (
    <section id="details" className={`section ${styles.section}`} aria-labelledby="details-title">
      <SectionCorners />
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

            {accommodation ? (
              <ScrollReveal className={`${styles.item} wood-panel`}>
                <div className={styles.itemHead}>
                  <DiyaIcon className={styles.icon} />
                  <h3>{accommodation.title}</h3>
                </div>
                <p>{accommodation.subtitle}</p>
                <button type="button" className={styles.suggestionsButton} onClick={() => setOpen(true)}>
                  Click for suggestions
                </button>
              </ScrollReveal>
            ) : null}
          </div>

        {open && accommodation ? createPortal(
          <div className={styles.modalBackdrop} role="presentation" onClick={() => setOpen(false)}>
            <div
              className={styles.modal}
              role="dialog"
              aria-modal="true"
              aria-labelledby="accommodation-modal-title"
              onClick={(event) => event.stopPropagation()}
            >
              <button type="button" className={styles.modalClose} onClick={() => setOpen(false)} aria-label="Close accommodation suggestions">
                ×
              </button>
              <h3 id="accommodation-modal-title">{accommodation.title}</h3>
              <p className={styles.modalIntro}>{accommodation.subtitle}</p>

              <div className={styles.accommodationGroup}>
                <p className={styles.accommodationGroupTitle}>Hotels</p>
                <div className={styles.accommodationList}>
                  {accommodation.hotels.map((stay) => (
                    <a
                      key={stay.name}
                      className={styles.accommodationLink}
                      href={mapsSearchUrl(stay.query)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className={styles.linkTitle}>{stay.name}</span>
                      <span className={styles.linkAddress}>{stay.fullAddress}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          , document.body) : null}

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
          {details.contact.additional ? (
            <div className={styles.additionalContact}>
              {details.contact.additional.email ? (
                <p>
                  <a href={`mailto:${details.contact.additional.email}`}>
                    {details.contact.additional.email}
                  </a>
                </p>
              ) : null}
              {details.contact.additional.phone ? <p>{details.contact.additional.phone}</p> : null}
            </div>
          ) : null}
        </ScrollReveal>
      </div>
    </section>
  );
}
