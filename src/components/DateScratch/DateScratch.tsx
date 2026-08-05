"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { weddingData } from "@/data/wedding";
import SectionCorners from "@/components/Decorative/SectionCorners";
import styles from "./DateScratch.module.css";

type Props = {
  onRevealed?: () => void;
  initiallyRevealed?: boolean;
};

const BRUSH = 28;

export default function DateScratch({
  onRevealed,
  initiallyRevealed = false,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const scratching = useRef(false);
  const checking = useRef(false);
  const finishedRef = useRef(false);
  const [localRevealed, setLocalRevealed] = useState(false);
  const revealed = initiallyRevealed || localRevealed;
  const threshold = weddingData.scratchCard.revealThreshold;

  const paintCover = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap || revealed) return;

    const rect = wrap.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const { width, height } = rect;
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#9a7528");
    gradient.addColorStop(0.35, "#e4c36a");
    gradient.addColorStop(0.55, "#c89b3c");
    gradient.addColorStop(0.8, "#f0d78a");
    gradient.addColorStop(1, "#8a6820");
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 1100; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      ctx.fillStyle = `rgba(255,245,210,${0.06 + Math.random() * 0.14})`;
      ctx.fillRect(x, y, 1.5, 1.5);
    }

    ctx.strokeStyle = "rgba(123,30,43,0.28)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, Math.min(width, height) * 0.28, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = "rgba(92,21,32,0.55)";
    ctx.font = `700 ${Math.max(12, width * 0.042)}px Cinzel Decorative, Cinzel, serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✦  SCRATCH GOLD FOIL  ✦", width / 2, height / 2);
  }, [revealed]);

  useEffect(() => {
    paintCover();
    window.addEventListener("resize", paintCover);
    return () => window.removeEventListener("resize", paintCover);
  }, [paintCover]);

  const finish = useCallback(() => {
    if (finishedRef.current || initiallyRevealed || localRevealed) return;
    finishedRef.current = true;
    setLocalRevealed(true);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      const rect = canvas.getBoundingClientRect();
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillRect(0, 0, rect.width, rect.height);
    }
    try {
      sessionStorage.setItem(weddingData.scratchCard.sessionKey, "1");
      window.dispatchEvent(new Event("ah-scratch-revealed"));
    } catch {
      // sessionStorage may be unavailable
    }
    onRevealed?.();
  }, [initiallyRevealed, localRevealed, onRevealed]);

  const clearedRatio = () => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return 0;
    const { width, height } = canvas;
    const data = ctx.getImageData(0, 0, width, height).data;
    let clear = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += 160) {
      total += 1;
      if (data[i] < 60) clear += 1;
    }
    return total ? clear / total : 0;
  };

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed || finishedRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(clientX - rect.left, clientY - rect.top, BRUSH, 0, Math.PI * 2);
    ctx.fill();

    if (!checking.current) {
      checking.current = true;
      window.requestAnimationFrame(() => {
        checking.current = false;
        if (clearedRatio() >= threshold) finish();
      });
    }
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    scratching.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    scratchAt(e.clientX, e.clientY);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!scratching.current) return;
    e.preventDefault();
    scratchAt(e.clientX, e.clientY);
  };

  const onPointerUp = () => {
    scratching.current = false;
  };

  return (
    <section className={styles.section} aria-labelledby="date-scratch-title">
      <SectionCorners />
      <p className={styles.eyebrow}>A date to remember</p>
      <h2 id="date-scratch-title" className={styles.title}>
        Scratch to Reveal
      </h2>
      <div className="ornament-rule" aria-hidden="true">
        <span className="ornament-rule__jewel" />
      </div>

      <div ref={wrapRef} className={styles.card}>
        <div className={styles.reveal} aria-hidden={!revealed}>
          <p className={styles.save}>SAVE THE DATE</p>
          <p className={styles.date}>{weddingData.wedding.dateLabel}</p>
        </div>

        {!revealed ? (
          <canvas
            ref={canvasRef}
            className={styles.canvas}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onPointerLeave={onPointerUp}
            aria-label={weddingData.scratchCard.prompt}
          />
        ) : null}
      </div>

      {!revealed ? (
        <button type="button" className={`btn-ghost ${styles.skip}`} onClick={finish}>
          {weddingData.scratchCard.skipLabel}
        </button>
      ) : null}
    </section>
  );
}
