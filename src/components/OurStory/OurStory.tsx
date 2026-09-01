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
              {story.howWeMet.photo ? (
                <figure className={styles.inlineFrame}>
                  <Image
                    src={story.howWeMet.photo.src}
                    alt={story.howWeMet.photo.alt}
                    width={640}
                    height={880}
                    loading="lazy"
                    className={styles.inlineImage}
                  />
                  <figcaption>{story.howWeMet.photo.caption}</figcaption>
                </figure>
              ) : null}
            </article>
            <article className={`${styles.block} wood-panel`}>
              <h3>{story.proposal.title}</h3>
              <p>{story.proposal.body}</p>
              {story.proposal.photo ? (
                <figure className={styles.inlineFrame}>
                  <Image
                    src={story.proposal.photo.src}
                    alt={story.proposal.photo.alt}
                    width={640}
                    height={880}
                    loading="lazy"
                    className={`${styles.inlineImage} ${styles.proposalImage}`}
                  />
                  <figcaption>{story.proposal.photo.caption}</figcaption>
                </figure>
              ) : null}
            </article>
            <article className={`${styles.block} ${styles.message} wood-panel`}>
              <h3>{story.message.title}</h3>
              <p>{story.message.body}</p>
              {story.message.photo ? (
                <figure className={styles.messageFrame}>
                  <Image
                    src={story.message.photo.src}
                    alt={story.message.photo.alt}
                    width={900}
                    height={1200}
                    loading="lazy"
                    className={styles.messageImage}
                  />
                  <figcaption>{story.message.photo.caption}</figcaption>
                </figure>
              ) : null}
            </article>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
