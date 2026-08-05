import Image from "next/image";
import { weddingData, type FavoritePerson } from "@/data/wedding";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import SectionCorners from "@/components/Decorative/SectionCorners";
import styles from "./Favorites.module.css";

const LABELS: { key: keyof Pick<
  FavoritePerson,
  "food" | "dessert" | "song" | "movie" | "travelDestination" | "partnerQuality"
>; label: string }[] = [
  { key: "food", label: "Favorite food" },
  { key: "dessert", label: "Favorite dessert" },
  { key: "song", label: "Favorite song" },
  { key: "movie", label: "Favorite movie" },
  { key: "travelDestination", label: "Favorite travel destination" },
  { key: "partnerQuality", label: "Favorite quality about their partner" },
];

function FavoriteCard({ person }: { person: FavoritePerson }) {
  const rows = LABELS.filter((item) => person[item.key].trim().length > 0);
  const ultimate = person.ultimateFavorite.trim();

  return (
    <article className={styles.card}>
      <div className={styles.floral} aria-hidden="true">
        <Image src="/images/decor/flower-pink.svg" alt="" width={22} height={22} className={styles.f1} />
        <Image src="/images/decor/flower-yellow.svg" alt="" width={20} height={20} className={styles.f2} />
        <Image src="/images/decor/leaf-sprig.svg" alt="" width={28} height={28} className={styles.f3} />
        <Image src="/images/decor/butterfly.svg" alt="" width={20} height={20} className={styles.f4} />
      </div>

      <h3 className={styles.cardTitle}>{person.heading}</h3>

      <div className={styles.portraitWrap}>
        <Image
          src={person.portrait}
          alt={person.portraitAlt}
          width={640}
          height={640}
          loading="lazy"
          className={styles.portrait}
          sizes="(max-width: 860px) 80vw, 360px"
        />
      </div>

      {rows.length > 0 ? (
        <ul className={styles.list}>
          {rows.map((row) => (
            <li key={row.key} className={styles.row}>
              <span className={styles.rowLabel}>{row.label}</span>
              <span className={styles.rowValue}>{person[row.key]}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {ultimate ? (
        <div className={styles.ultimate}>
          <p className={styles.ultimateLabel}>Ultimate Favourite</p>
          <p className={styles.ultimateValue}>{ultimate}</p>
          <p className={styles.ultimateTag}>That&apos;s it. That&apos;s the favourite!</p>
        </div>
      ) : null}
    </article>
  );
}

export default function Favorites() {
  const { favorites } = weddingData;
  const people: FavoritePerson[] = [favorites.abhigna, favorites.hemanth];

  return (
    <section
      id="favorites"
      className={`section section--cream ${styles.section}`}
      aria-labelledby="favorites-title"
    >
      <SectionCorners />
      <div className="section__inner">
        <ScrollReveal>
          <p className="section__eyebrow">{favorites.eyebrow}</p>
          <h2 id="favorites-title" className="section__title">
            {favorites.title}
          </h2>
          <div className="ornament-rule" aria-hidden="true">
            <span className="ornament-rule__jewel" />
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {people.map((person) => (
            <ScrollReveal key={person.name}>
              <FavoriteCard person={person} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
