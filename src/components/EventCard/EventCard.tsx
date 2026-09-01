import type { WeddingEvent } from "@/data/wedding";
import { EventIcon } from "@/components/Decorative/Motifs";
import styles from "./EventCard.module.css";

type Props = {
  event: WeddingEvent;
  index: number;
};

export default function EventCard({ event, index }: Props) {
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
          {event.location ? <span className={styles.location}> · {event.location}</span> : null}
        </p>
        <p className={styles.description}>{event.description}</p>
        {event.attire ? <p className={styles.attire}>{event.attire}</p> : null}
      </div>
    </article>
  );
}
