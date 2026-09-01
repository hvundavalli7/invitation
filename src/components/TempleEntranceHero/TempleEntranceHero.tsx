import Image from "next/image";
import { weddingData } from "@/data/wedding";
import styles from "./TempleEntranceHero.module.css";

export default function TempleEntranceHero() {
  const { couple, hero } = weddingData;
  const renderName = (value: string) => (
    <>
      <span className={styles.initial}>{value.charAt(0)}</span>
      {value.slice(1)}
    </>
  );

  return (
    <header className={styles.hero} id="top">
      <div className={styles.atmosphere} aria-hidden="true">
        <div className={styles.sunGlow} />
        <div className={styles.groundFade} />
      </div>

      <div className={styles.stage}>
        <div className={styles.ganeshWrap}>
          <Image
            src="/images/decor/ganesh-idol.png"
            alt=""
            width={120}
            height={120}
            className={styles.ganesh}
            priority
          />
        </div>

        <p className={styles.blessing}>{hero.ganeshaBlessing}</p>

        <p className={styles.together}>{couple.togetherLine}</p>

        <h1 className={styles.names}>
          <span className={styles.name}>{renderName(couple.bride)}</span>
          <span className={styles.ampersand} aria-hidden="true">
            and
          </span>
          <span className={styles.name}>{renderName(couple.groom)}</span>
        </h1>

        <p className={styles.inviteLine}>{couple.inviteLine}</p>

        {hero.image ? (
          <div className={styles.scene}>
            <Image
              src={hero.image}
              alt={hero.imageAlt}
              width={1024}
              height={1536}
              className={styles.sceneImage}
              priority
              sizes="(max-width: 800px) 92vw, 520px"
            />
          </div>
        ) : null}
      </div>
    </header>
  );
}
