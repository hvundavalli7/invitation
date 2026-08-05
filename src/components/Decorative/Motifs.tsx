import styles from "./Motifs.module.css";

export function LotusIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`${styles.icon} ${className}`}
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      <path
        d="M32 10c2 8 2 14 0 22-2-8-2-14 0-22Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M18 18c6 6 10 12 12 20-8-4-14-10-12-20Z"
        fill="currentColor"
        opacity="0.75"
      />
      <path
        d="M46 18c-6 6-10 12-12 20 8-4 14-10 12-20Z"
        fill="currentColor"
        opacity="0.75"
      />
      <path
        d="M12 30c8 2 14 6 18 14-10 0-18-4-18-14Z"
        fill="currentColor"
        opacity="0.65"
      />
      <path
        d="M52 30c-8 2-14 6-18 14 10 0 18-4 18-14Z"
        fill="currentColor"
        opacity="0.65"
      />
      <circle cx="32" cy="36" r="5" fill="currentColor" />
    </svg>
  );
}

export function KalashIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`${styles.icon} ${className}`}
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      <path
        d="M24 14h16l2 6H22l2-6Z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M20 22h24c2 6 4 14 2 24-1 6-7 10-14 10s-13-4-14-10c-2-10 0-18 2-24Z"
        fill="currentColor"
      />
      <path d="M28 8h8v6h-8V8Z" fill="currentColor" opacity="0.7" />
      <path
        d="M32 4c4 4 6 8 0 12-6-4-4-8 0-12Z"
        fill="currentColor"
        opacity="0.55"
      />
    </svg>
  );
}

export function DiyaIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`${styles.icon} ${className}`}
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      <path
        className={styles.flame}
        d="M32 8c6 8 8 14 0 24-8-10-6-16 0-24Z"
        fill="#e0c15a"
      />
      <ellipse cx="32" cy="42" rx="20" ry="10" fill="currentColor" />
      <path d="M12 42c4 10 14 14 20 14s16-4 20-14" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

export function BellIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`${styles.icon} ${className}`}
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      <path d="M30 6h4v8h-4V6Z" fill="currentColor" />
      <path
        d="M18 28c0-8 6-14 14-14s14 6 14 14v10H18V28Z"
        fill="currentColor"
      />
      <path d="M12 40h40l-4 8H16l-4-8Z" fill="currentColor" opacity="0.85" />
      <circle cx="32" cy="52" r="4" fill="currentColor" />
    </svg>
  );
}

export function HennaIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`${styles.icon} ${className}`}
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      <path
        d="M32 8c8 10 12 18 12 28a12 12 0 1 1-24 0c0-10 4-18 12-28Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="32" cy="36" r="5" fill="currentColor" />
      <path
        d="M20 28c4 2 8 2 12 0M24 22c3 2 7 2 10 0"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

export function MusicIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`${styles.icon} ${className}`}
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      <path
        d="M24 14v28a8 8 0 1 1-4-7V20l24-6v22a8 8 0 1 1-4-7V14L24 14Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function TurmericIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`${styles.icon} ${className}`}
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="18" fill="currentColor" opacity="0.85" />
      <circle cx="24" cy="26" r="5" fill="currentColor" opacity="0.5" />
      <circle cx="38" cy="38" r="4" fill="currentColor" opacity="0.45" />
      <path
        d="M18 44c6-10 22-10 28 0"
        stroke="#1b3a2a"
        strokeWidth="2"
        fill="none"
        opacity="0.35"
      />
    </svg>
  );
}

export function PeacockFeather({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`${styles.icon} ${className}`}
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      <path
        d="M32 6c10 12 16 24 16 36 0 8-6 14-16 14S16 50 16 42C16 30 22 18 32 6Z"
        fill="currentColor"
        opacity="0.7"
      />
      <circle cx="32" cy="28" r="8" fill="#1b3a2a" opacity="0.55" />
      <circle cx="32" cy="28" r="3.5" fill="#e0c15a" />
    </svg>
  );
}

export function EventIcon({
  type,
  className = "",
}: {
  type: string;
  className?: string;
}) {
  switch (type) {
    case "henna":
      return <HennaIcon className={className} />;
    case "music":
      return <MusicIcon className={className} />;
    case "lotus":
    default:
      return <LotusIcon className={className} />;
  }
}

export function KolamDivider() {
  return (
    <div className={styles.kolam} aria-hidden="true">
      <span />
      <LotusIcon className={styles.kolamLotus} />
      <span />
    </div>
  );
}
