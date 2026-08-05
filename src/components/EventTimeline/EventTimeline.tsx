import { weddingData, type WeddingEvent } from "@/data/wedding";
import EventCard from "@/components/EventCard/EventCard";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import SectionCorners from "@/components/Decorative/SectionCorners";
import styles from "./EventTimeline.module.css";

const events = weddingData.events as readonly WeddingEvent[];

export default function EventTimeline() {
  return (
    <section
      id="celebrations"
      className={`section section--sage ${styles.section}`}
      aria-labelledby="events-title"
    >
      <SectionCorners />
      <div className="section__inner">
        <ScrollReveal>
          <p className="section__eyebrow">The celebrations</p>
          <h2 id="events-title" className="section__title">
            Wedding Events
          </h2>
          <p className="section__subtitle">
            Join us across days of colour, music, blessings and sacred vows.
          </p>
          <div className="ornament-rule" aria-hidden="true">
            <span className="ornament-rule__jewel" />
          </div>
        </ScrollReveal>

        <ul className={styles.grid}>
          {events.map((event, index) => (
            <li key={event.id} className={styles.item}>
              <ScrollReveal className={styles.cardWrap}>
                <EventCard event={event} index={index} />
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
