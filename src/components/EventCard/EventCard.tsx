import type { WeddingEvent } from "@/data/wedding";
import { mapsDirectionsUrl, mapsSearchUrl } from "@/data/wedding";
import { EventIcon } from "@/components/Decorative/Motifs";
import styles from "./EventCard.module.css";

type Props = {
  event: WeddingEvent;
  index: number;
};

export default function EventCard({ event, index }: Props) {
  const query = event.mapsQuery || event.location;
  const hasMap = Boolean(query);

  return (
    <article
      className={`${styles.card} ${styles[event.motif]}`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className={styles.iconWrap} aria-hidden="true">
        <EventIcon type={event.icon} className={styles.icon} />
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{event.name}</h3>
        <p className={styles.meta}>
          <span>{event.dateLabel}</span>
          <span aria-hidden="true"> · </span>
          <span>{event.time}</span>
        </p>
        <p className={styles.venue}>
          <strong>{event.venue}</strong>
          {event.location ? ` · ${event.location}` : null}
        </p>
        <p className={styles.description}>{event.description}</p>

        {event.subEvents?.length ? (
          <ul className={styles.subEvents}>
            {event.subEvents.map((sub) => (
              <li key={sub.name}>
                <strong>{sub.name}</strong>
                <span>{sub.description}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {hasMap ? (
          <div className={styles.actions}>
            <a
              className="btn-ghost"
              href={mapsSearchUrl(query)}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Location
            </a>
            <a
              className="btn-ghost"
              href={mapsDirectionsUrl(query)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
            </a>
          </div>
        ) : null}
      </div>
    </article>
  );
}
