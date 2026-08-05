import { mapsSearchUrl, weddingData } from "@/data/wedding";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import SectionCorners from "@/components/Decorative/SectionCorners";
import styles from "./VenueMap.module.css";

export default function VenueMap() {
  return (
    <section id="venues" className={`section section--cream ${styles.section}`} aria-labelledby="venues-title">
      <SectionCorners />
      <div className="section__inner">
        <ScrollReveal>
          <p className="section__eyebrow">Find your way</p>
          <h2 id="venues-title" className="section__title">
            Locations
          </h2>
          <p className="section__subtitle">
            Tap a venue card to open it in Google Maps.
          </p>
          <div className="ornament-rule" aria-hidden="true">
            <span className="ornament-rule__jewel" />
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {weddingData.venues.map((venue) => {
            const mapsUrl = mapsSearchUrl(venue.mapsQuery);
            const embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(venue.mapsQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
            return (
              <ScrollReveal key={venue.id} className={styles.cardWrap}>
                <article className={`${styles.card} wood-panel`}>
                  <a
                    className={styles.stretchLink}
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${venue.name} in Google Maps`}
                  />
                  <h3>{venue.name}</h3>
                  <p className={styles.address}>{venue.fullAddress}</p>
                  <p className={styles.note}>{venue.note}</p>
                  <div className={styles.mapWrap}>
                    <iframe
                      title={`Map for ${venue.name}`}
                      src={embedSrc}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                      tabIndex={-1}
                    />
                  </div>
                  <span className={styles.mapAction} aria-hidden="true">
                    Open in Google Maps
                  </span>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
