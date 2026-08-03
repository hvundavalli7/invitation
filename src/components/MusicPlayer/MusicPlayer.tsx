"use client";

import { useEffect, useRef, useState } from "react";
import { weddingData } from "@/data/wedding";
import styles from "./MusicPlayer.module.css";

type Props = {
  /** Start playback after user has interacted (scratch / skip). */
  shouldStart?: boolean;
};

export default function MusicPlayer({ shouldStart = false }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = weddingData.music.defaultVolume;
    audio.loop = true;
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !shouldStart || startedRef.current) return;

    startedRef.current = true;
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => {
        // Autoplay may still be blocked; user can press play.
        setPlaying(false);
      });
  }, [shouldStart]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  return (
    <div className={styles.player} role="region" aria-label="Background music controls">
      <audio ref={audioRef} src={weddingData.music.src} preload="none" />
      <button
        type="button"
        className={styles.btn}
        onClick={togglePlay}
        aria-pressed={playing}
        aria-label={playing ? "Pause music" : "Play music"}
        title={playing ? "Pause" : "Play"}
      >
        {playing ? "Pause" : "Play"}
      </button>
      <button
        type="button"
        className={styles.btn}
        onClick={toggleMute}
        aria-pressed={muted}
        aria-label={muted ? "Unmute music" : "Mute music"}
        title={muted ? "Unmute" : "Mute"}
      >
        {muted ? "Muted" : "Sound"}
      </button>
      <span className={styles.label}>{weddingData.music.label}</span>
    </div>
  );
}
