"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { weddingData, type GalleryImage } from "@/data/wedding";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import SectionCorners from "@/components/Decorative/SectionCorners";
import styles from "./Gallery.module.css";

const CATEGORY_LABEL: Record<GalleryImage["category"], string> = {
  "old-memory": "Older memory",
  travel: "Travel",
  engagement: "Engagement",
  recent: "Recent",
};

export default function Gallery() {
  const images = weddingData.gallery.images as readonly GalleryImage[];
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(() => {
    setActive((i) => (i === null ? i : (i + images.length - 1) % images.length));
  }, [images.length]);
  const next = useCallback(() => {
    setActive((i) => (i === null ? i : (i + 1) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, close, prev, next]);

  return (
    <section id="gallery" className={`section section--sage ${styles.section}`} aria-labelledby="gallery-title">
      <SectionCorners />
      <div className="section__inner">
        <ScrollReveal>
          <p className="section__eyebrow">Cherished moments</p>
          <h2 id="gallery-title" className="section__title">
            {weddingData.gallery.title}
          </h2>
          <p className="section__subtitle">{weddingData.gallery.subtitle}</p>
          <div className="ornament-rule" aria-hidden="true">
            <span className="ornament-rule__jewel" />
          </div>
        </ScrollReveal>

        <ul className={styles.grid}>
          {images.map((image, index) => (
            <li key={image.id}>
              <ScrollReveal>
                <button
                  type="button"
                  className={styles.frame}
                  onClick={() => setActive(index)}
                  aria-label={`Open ${image.alt}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={480}
                    height={600}
                    loading="lazy"
                    className={styles.image}
                  />
                  <span className={styles.category}>
                    {CATEGORY_LABEL[image.category]}
                    {image.year ? ` · ${image.year}` : ""}
                  </span>
                </button>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>

      {active !== null ? (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
          onClick={close}
        >
          <button type="button" className={styles.close} onClick={close} aria-label="Close lightbox">
            Close
          </button>
          <button
            type="button"
            className={`${styles.nav} ${styles.prev}`}
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous image"
          >
            ‹
          </button>
          <figure
            className={styles.lightboxFrame}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[active].src}
              alt={images[active].alt}
              width={900}
              height={1125}
              className={styles.lightboxImage}
              priority
            />
            <figcaption>
              {images[active].caption || CATEGORY_LABEL[images[active].category]}
              {images[active].year ? ` · ${images[active].year}` : ""}
            </figcaption>
          </figure>
          <button
            type="button"
            className={`${styles.nav} ${styles.next}`}
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      ) : null}
    </section>
  );
}
