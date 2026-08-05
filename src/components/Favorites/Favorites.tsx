import { weddingData } from "@/data/wedding";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import SectionCorners from "@/components/Decorative/SectionCorners";
import styles from "./Favorites.module.css";

type FavoriteFields = {
  food: string;
  dessert: string;
  song: string;
  movie: string;
  travelDestination: string;
  partnerQuality: string;
  ultimateFavorite: string;
};

const LABELS: { key: keyof Omit<FavoriteFields, "ultimateFavorite">; label: string }[] = [
  { key: "food", label: "Favorite food" },
  { key: "dessert", label: "Favorite dessert" },
  { key: "song", label: "Favorite song" },
  { key: "movie", label: "Favorite movie" },
  { key: "travelDestination", label: "Favorite travel destination" },
  { key: "partnerQuality", label: "Favorite quality about their partner" },
];

function FavoriteCard({
  name,
  data,
}: {
  name: string;
  data: FavoriteFields;
}) {
  const items = LABELS.filter((item) => data[item.key].trim().length > 0);
  const ultimate = data.ultimateFavorite.trim();

  return (
    <article className={styles.card}>
      <div className={styles.corner} aria-hidden="true" />
      <div className={`${styles.corner} ${styles.cornerBr}`} aria-hidden="true" />
      <h3 className={styles.cardTitle}>{name}</h3>
      {items.length > 0 ? (
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.key} className={styles.row}>
              <span className={styles.icon} aria-hidden="true">
                ✦
              </span>
              <div>
                <p className={styles.label}>{item.label}</p>
                <p className={styles.value}>{data[item.key]}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.emptyHint} aria-hidden="true" />
      )}
      {ultimate ? (
        <div className={styles.ultimate}>
          <p className={styles.ultimateLabel}>Ultimate favorite</p>
          <p className={styles.ultimateValue}>{ultimate}</p>
        </div>
      ) : null}
    </article>
  );
}

export default function Favorites() {
  const { favorites, couple } = weddingData;

  return (
    <section
      id="favorites"
      className={`section section--cream ${styles.section}`}
      aria-labelledby="favorites-title"
    >
      <SectionCorners />
      <div className="section__inner">
        <ScrollReveal>
          <p className="section__eyebrow">Little things we love</p>
          <h2 id="favorites-title" className="section__title">
            {favorites.title}
          </h2>
          <p className="section__subtitle">{favorites.subtitle}</p>
          <div className="ornament-rule" aria-hidden="true">
            <span className="ornament-rule__jewel" />
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          <ScrollReveal>
            <FavoriteCard
              name={`${couple.bride}’s Favorites`}
              data={favorites.abhigna}
            />
          </ScrollReveal>
          <ScrollReveal>
            <FavoriteCard
              name={`${couple.groom}’s Favorites`}
              data={favorites.hemanth}
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
