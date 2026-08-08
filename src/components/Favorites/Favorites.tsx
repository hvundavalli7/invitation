import Image from "next/image";
import { weddingData } from "@/data/wedding";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import SectionCorners from "@/components/Decorative/SectionCorners";
import styles from "./Favorites.module.css";

type FavoriteFields = {
  photo: string;
  quote: string;
  food: string;
  dessert: string;
  song: string;
  movie: string;
  travelDestination: string;
  partnerQuality: string;
  ultimateFavorite: string;
  ultimateTagline: string;
};

const CHIPS: { key: keyof Omit<FavoriteFields, "ultimateFavorite" | "ultimateTagline" | "photo" | "quote">; icon: string }[] = [
  { key: "food",              icon: "🍽️" },
  { key: "dessert",           icon: "🍦" },
  { key: "song",              icon: "🎵" },
  { key: "movie",             icon: "🎬" },
  { key: "travelDestination", icon: "✈️" },
  { key: "partnerQuality",    icon: "❤️" },
];

function FavoriteCard({ name, data }: { name: string; data: FavoriteFields }) {
  const chips = CHIPS.filter((c) => data[c.key].trim().length > 0);
  const ultimate = data.ultimateFavorite.trim();
  const hasPhoto = data.photo.trim().length > 0;
  const hasQuote = data.quote.trim().length > 0;

  return (
    <article className={styles.card}>
      <div className={styles.corner} aria-hidden="true" />
      <div className={`${styles.corner} ${styles.cornerBr}`} aria-hidden="true" />

      <h3 className={styles.cardTitle}>{name}</h3>

      {/* Portrait image */}
      {hasPhoto && (
        <div className={styles.photoFrame}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/decor/marigold.svg" className={`${styles.florals} ${styles.floralTL}`} alt="" aria-hidden="true" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/decor/marigold.svg" className={`${styles.florals} ${styles.floralTR}`} alt="" aria-hidden="true" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/decor/flower-orange.svg" className={`${styles.florals} ${styles.floralBL}`} alt="" aria-hidden="true" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/decor/flower-orange.svg" className={`${styles.florals} ${styles.floralBR}`} alt="" aria-hidden="true" />
          <div className={styles.photoWrap}>
            <Image
              src={data.photo}
              alt={`Photo of ${name.split("\u2019")[0]}`}
              width={480}
              height={640}
              className={styles.photo}
            />
          </div>
        </div>
      )}

      {/* Pill chips — 2-column grid */}
      {chips.length > 0 && (
        <div className={styles.chips}>
          {chips.map((c) => (
            <div key={c.key} className={styles.chip}>
              <span className={styles.chipIcon} aria-hidden="true">{c.icon}</span>
              <span className={styles.chipText}>{data[c.key]}</span>
            </div>
          ))}
        </div>
      )}

      {/* Personality quote */}
      {hasQuote && (
        <div className={styles.quoteBlock}>
          <p className={styles.quoteText}>&ldquo;{data.quote}&rdquo;</p>
        </div>
      )}

      {/* Ultimate favourite */}
      {ultimate && (
        <div className={styles.ultimate}>
          <p className={styles.ultimateLabel}>Ultimate Favourite</p>
          <p className={styles.ultimateValue}>{ultimate} ❤️</p>
          {data.ultimateTagline && (
            <p className={styles.ultimateTagline}>{data.ultimateTagline}</p>
          )}
        </div>
      )}
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
              name={`${couple.bride}\u2019s Favourite`}
              data={favorites.abhigna}
            />
          </ScrollReveal>
          <ScrollReveal>
            <FavoriteCard
              name={`${couple.groom}\u2019s Favourite`}
              data={favorites.hemanth}
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
