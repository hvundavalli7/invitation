import Image from "next/image";
import styles from "./SectionCorners.module.css";

/** Soft colorful botanical accents for section borders. */
export default function SectionCorners() {
  return (
    <div className={styles.corners} aria-hidden="true">
      <Image
        src="/images/decor/leaf-sprig.svg"
        alt=""
        width={40}
        height={52}
        className={`${styles.mark} ${styles.tl}`}
      />
      <Image
        src="/images/decor/flower-pink.svg"
        alt=""
        width={34}
        height={34}
        className={`${styles.mark} ${styles.tr}`}
      />
      <Image
        src="/images/decor/flower-orange.svg"
        alt=""
        width={32}
        height={32}
        className={`${styles.mark} ${styles.bl}`}
      />
      <Image
        src="/images/decor/leaf-sprig.svg"
        alt=""
        width={40}
        height={52}
        className={`${styles.mark} ${styles.br}`}
      />
    </div>
  );
}
