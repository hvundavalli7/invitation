import { mapsDirectionsUrl, mapsSearchUrl, weddingData } from "@/data/wedding";
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
            Addresses are editable until verified — open each venue in Google Maps for the latest directions.
          </p>
          <div className="ornament-rule" aria-hidden="true">
            <span className="ornament-rule__jewel" />
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {weddingData.venues.map((venue) => {
            const embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(venue.mapsQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
            return (
              <ScrollReveal key={venue.id} className={`${styles.card} wood-panel`}>
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
                  />
                </div>
                <div className={styles.actions}>
                  <a
                    className="btn-temple"
                    href={mapsSearchUrl(venue.mapsQuery)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in Google Maps
                  </a>
                  <a
                    className="btn-ghost"
                    href={mapsDirectionsUrl(venue.mapsQuery)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Directions
                  </a>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
