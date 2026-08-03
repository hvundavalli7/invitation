"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { weddingData } from "@/data/wedding";
import { KalashIcon, LotusIcon } from "@/components/Decorative/Motifs";
import styles from "./ScratchReveal.module.css";

type Props = {
  onComplete: () => void;
};

const BRUSH = 28;

export default function ScratchReveal({ onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrappingRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [hintVisible, setHintVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const scratching = useRef(false);
  const completed = useRef(false);

  const finish = useCallback(() => {
    if (completed.current) return;
    completed.current = true;
    setHintVisible(false);
    setDoorsOpen(true);
    setExiting(true);
    window.setTimeout(() => onComplete(), 1400);
  }, [onComplete]);

  const paintCover = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas;
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#6b4a1e");
    gradient.addColorStop(0.35, "#c9a227");
    gradient.addColorStop(0.55, "#e0c15a");
    gradient.addColorStop(0.75, "#8a7018");
    gradient.addColorStop(1, "#4a3210");
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // brass texture noise
    for (let i = 0; i < 1800; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const a = 0.04 + Math.random() * 0.08;
      ctx.fillStyle = `rgba(255,235,180,${a})`;
      ctx.fillRect(x, y, 1.5, 1.5);
    }

    // ornamental border
    ctx.strokeStyle = "rgba(80,50,10,0.55)";
    ctx.lineWidth = 10;
    ctx.strokeRect(18, 18, width - 36, height - 36);
    ctx.strokeStyle = "rgba(255,230,150,0.35)";
    ctx.lineWidth = 2;
    ctx.strokeRect(28, 28, width - 56, height - 56);

    // mandala-like rings
    ctx.save();
    ctx.translate(width / 2, height * 0.42);
    ctx.strokeStyle = "rgba(60,35,8,0.35)";
    for (let r = 30; r <= 110; r += 16) {
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();

    ctx.fillStyle = "rgba(40,22,8,0.78)";
    ctx.font = `600 ${Math.max(16, width * 0.045)}px Cinzel, serif`;
    ctx.textAlign = "center";
    ctx.fillText("Scratch to Reveal", width / 2, height * 0.72);
    ctx.font = `500 ${Math.max(13, width * 0.032)}px Cinzel, serif`;
    ctx.fillText("Our Wedding Invitation", width / 2, height * 0.8);
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    paintCover();
    setReady(true);
  }, [paintCover]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  const clearedRatio = () => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return 0;
    const { width, height } = canvas;
    const sample = 4;
    const data = ctx.getImageData(0, 0, width, height).data;
    let transparent = 0;
    let total = 0;
    for (let y = 0; y < height; y += sample) {
      for (let x = 0; x < width; x += sample) {
        const idx = (y * width + x) * 4 + 3;
        total += 1;
        if (data[idx] < 40) transparent += 1;
      }
    }
    return total ? transparent / total : 0;
  };

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || completed.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, BRUSH, 0, Math.PI * 2);
    ctx.fill();

    // soft trail
    ctx.beginPath();
    ctx.arc(x, y, BRUSH * 0.65, 0, Math.PI * 2);
    ctx.fill();

    if (hintVisible) setHintVisible(false);

    if (!wrappingRef.current) {
      wrappingRef.current = true;
      window.requestAnimationFrame(() => {
        wrappingRef.current = false;
        if (clearedRatio() >= weddingData.scratchCard.revealThreshold) {
          // auto-complete remaining scratch using CSS pixel space
          const rect = canvas.getBoundingClientRect();
          ctx.globalCompositeOperation = "destination-out";
          ctx.fillStyle = "#000";
          ctx.fillRect(0, 0, rect.width, rect.height);
          finish();
        }
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
    scratchAt(e.clientX, e.clientY);
  };

  const onPointerUp = () => {
    scratching.current = false;
  };

  return (
    <div
      className={`${styles.overlay} ${exiting ? styles.exiting : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Scratch card wedding invitation reveal"
    >
      <div className={`${styles.doors} ${doorsOpen ? styles.open : ""}`} aria-hidden="true">
        <div className={`${styles.door} ${styles.doorLeft}`} />
        <div className={`${styles.door} ${styles.doorRight}`} />
      </div>

      <div className={styles.content}>
        <p className={styles.kicker}>Abhigna &amp; Hemanth</p>
        <h1 className={styles.title}>A Sacred Invitation Awaits</h1>

        <div className={`${styles.card} wood-panel`}>
          <div className={styles.cardInner}>
            <div className={styles.revealPreview} aria-hidden={!ready}>
              <div className={styles.previewOrnament}>
                <LotusIcon className={styles.previewIcon} />
                <KalashIcon className={styles.previewIcon} />
              </div>
              <p className={styles.previewNames}>Abhigna &amp; Hemanth</p>
              <p className={styles.previewDate}>March 11, 2027</p>
              <p className={styles.previewVenue}>Bella Cavalli Events · Aubrey, Texas</p>
            </div>

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

            {hintVisible && (
              <div className={styles.hint} aria-hidden="true">
                <span className={styles.hand}>✦</span>
                <span className={styles.sparkle}>Scratch here</span>
              </div>
            )}
          </div>
        </div>

        <p className={styles.prompt}>{weddingData.scratchCard.prompt}</p>

        <button type="button" className="btn-ghost" onClick={finish}>
          {weddingData.scratchCard.skipLabel}
        </button>
      </div>
    </div>
  );
}
