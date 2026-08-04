import Image from "next/image";
import { weddingData } from "@/data/wedding";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import SectionCorners from "@/components/Decorative/SectionCorners";
import styles from "./OurStory.module.css";

export default function OurStory() {
  const { story } = weddingData;

  return (
    <section id="our-story" className={`section section--cream ${styles.section}`} aria-labelledby="story-title">
      <SectionCorners />
      <div className="section__inner">
        <ScrollReveal>
          <p className="section__eyebrow">Written in the stars</p>
          <h2 id="story-title" className="section__title">
            {story.title}
          </h2>
          <div className="ornament-rule" aria-hidden="true">
            <span className="ornament-rule__jewel" />
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          <ScrollReveal className={styles.copy}>
            <article className={`${styles.block} wood-panel`}>
              <h3>{story.howWeMet.title}</h3>
              <p>{story.howWeMet.body}</p>
            </article>
            <article className={`${styles.block} wood-panel`}>
              <h3>{story.proposal.title}</h3>
              <p>{story.proposal.body}</p>
            </article>
            <article className={`${styles.block} ${styles.message} wood-panel`}>
              <h3>{story.message.title}</h3>
              <p>{story.message.body}</p>
            </article>
          </ScrollReveal>

          <ScrollReveal className={styles.photos}>
            {story.photos.map((photo) => (
              <figure key={photo.id} className={styles.frame}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={480}
                  height={600}
                  loading="lazy"
                  className={styles.image}
                />
                <figcaption>{photo.caption}</figcaption>
              </figure>
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
