import Image from "next/image";
import styles from "./SectionCorners.module.css";

/** Temple-style ornate corners for section borders. */
export default function SectionCorners() {
  return (
    <div className={styles.corners} aria-hidden="true">
      <Image
        src="/images/decor/ornate-corner.svg"
        alt=""
        width={72}
        height={72}
        className={`${styles.mark} ${styles.tl}`}
      />
      <Image
        src="/images/decor/ornate-corner.svg"
        alt=""
        width={72}
        height={72}
        className={`${styles.mark} ${styles.tr}`}
      />
      <Image
        src="/images/decor/ornate-corner.svg"
        alt=""
        width={72}
        height={72}
        className={`${styles.mark} ${styles.bl}`}
      />
      <Image
        src="/images/decor/ornate-corner.svg"
        alt=""
        width={72}
        height={72}
        className={`${styles.mark} ${styles.br}`}
      />
    </div>
  );
}
