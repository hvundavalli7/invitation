"use client";

import { useEffect, useMemo, useState } from "react";
import { weddingData } from "@/data/wedding";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import SectionCorners from "@/components/Decorative/SectionCorners";
import styles from "./WeddingCountdown.module.css";

type Parts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

type Props = {
  visible?: boolean;
};

function getWeddingTimestamp() {
  // Interpret wedding local time in America/Chicago using a stable approach:
  // Build a date string and compute offset via Intl.
  const { dateISO, timeZone } = weddingData.wedding;
  const [datePart, timePart] = dateISO.split("T");
  const [y, m, d] = datePart.split("-").map(Number);
  const [hh, mm, ss] = timePart.split(":").map(Number);

  // Guess UTC by iterating: find the UTC time that formats to the desired local wall time.
  let guess = Date.UTC(y, m - 1, d, hh, mm, ss);
  for (let i = 0; i < 3; i++) {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).formatToParts(new Date(guess));

    const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));
    const asUTC = Date.UTC(
      Number(map.year),
      Number(map.month) - 1,
      Number(map.day),
      Number(map.hour === "24" ? "0" : map.hour),
      Number(map.minute),
      Number(map.second),
    );
    const desired = Date.UTC(y, m - 1, d, hh, mm, ss);
    guess += desired - asUTC;
  }
  return guess;
}

function computeParts(target: number): Parts {
  const diff = target - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds, done: false };
}

const PLACEHOLDER: Parts = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  done: false,
};

export default function WeddingCountdown({ visible = false }: Props) {
  const target = useMemo(() => getWeddingTimestamp(), []);
  // Keep the initial render identical on server and client. Date.now() in the
  // first paint causes hydration mismatches as the clock ticks between SSR and hydrate.
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    if (!visible) return;
    const tick = () => setParts(computeParts(target));
    const id = window.setInterval(tick, 1000);
    // Defer first paint value to avoid sync setState-in-effect lint
    const frame = window.requestAnimationFrame(tick);
    return () => {
      window.clearInterval(id);
      window.cancelAnimationFrame(frame);
    };
  }, [target, visible]);

  if (!visible) {
    return null;
  }

  const display = parts ?? PLACEHOLDER;
  const ready = parts !== null;

  const units = [
    { label: "Days", value: display.days },
    { label: "Hours", value: display.hours },
    { label: "Minutes", value: display.minutes },
    { label: "Seconds", value: display.seconds },
  ];

  return (
    <section
      className={`section ${styles.section} ${styles.reveal}`}
      aria-labelledby="countdown-title"
    >
      <SectionCorners />
      <ScrollReveal className="section__inner">
        <p className="section__eyebrow">Counting the auspicious moments</p>
        <h2 id="countdown-title" className="section__title">
          {weddingData.countdown.heading}
        </h2>
        <div className="ornament-rule" aria-hidden="true">
          <span className="ornament-rule__jewel" />
        </div>

        {ready && display.done ? (
          <p className={styles.ended} role="status">
            {weddingData.countdown.endedMessage}
          </p>
        ) : (
          <div className={styles.grid} role="timer" aria-live="polite">
            {units.map((unit) => (
              <div key={unit.label} className={`${styles.box} wood-panel`}>
                <span className={styles.value}>
                  {ready ? String(unit.value).padStart(2, "0") : "--"}
                </span>
                <span className={styles.label}>{unit.label}</span>
              </div>
            ))}
          </div>
        )}

        <p className={styles.message}>{weddingData.countdown.celebrationMessage}</p>
      </ScrollReveal>
    </section>
  );
}
