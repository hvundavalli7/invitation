"use client";

import Script from "next/script";
import { useEffect, useId, useRef, useState } from "react";
import { weddingData } from "@/data/wedding";
import styles from "./MusicPlayer.module.css";

type Props = {
  /** Start playback after user has interacted (envelope / scratch / skip). */
  shouldStart?: boolean;
};

type YtPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  setVolume: (volume: number) => void;
  destroy: () => void;
};

type YtPlayerEvent = {
  data: number;
  target: YtPlayer;
};

type YtNamespace = {
  Player: new (
    elementId: string,
    options: {
      height: string | number;
      width: string | number;
      videoId: string;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: (event: { target: YtPlayer }) => void;
        onStateChange?: (event: YtPlayerEvent) => void;
      };
    },
  ) => YtPlayer;
  PlayerState: {
    PLAYING: number;
    PAUSED: number;
    ENDED: number;
  };
};

declare global {
  interface Window {
    YT?: YtNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export default function MusicPlayer({ shouldStart = false }: Props) {
  const hostId = `yt-music-${useId().replace(/:/g, "")}`;
  const playerRef = useRef<YtPlayer | null>(null);
  const startedRef = useRef(false);
  const shouldStartRef = useRef(shouldStart);
  const previousReadyHandler = useRef<(() => void) | undefined>(undefined);
  const [apiReady, setApiReady] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const youtubeId = weddingData.music.youtubeId;
  const useYoutube = Boolean(youtubeId);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    shouldStartRef.current = shouldStart;
  }, [shouldStart]);

  useEffect(() => {
    return () => {
      if (previousReadyHandler.current !== undefined) {
        window.onYouTubeIframeAPIReady = previousReadyHandler.current;
      }
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, []);

  const handleYoutubeScriptReady = () => {
    if (window.YT?.Player) {
      setApiReady(true);
      return;
    }

    previousReadyHandler.current = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousReadyHandler.current?.();
      setApiReady(true);
    };
  };

  useEffect(() => {
    if (!useYoutube || !apiReady || !window.YT?.Player || playerRef.current) {
      return;
    }

    const volume = Math.round(
      Math.min(1, Math.max(0, weddingData.music.defaultVolume)) * 100,
    );

    playerRef.current = new window.YT.Player(hostId, {
      height: 1,
      width: 1,
      videoId: youtubeId,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        playsinline: 1,
        rel: 0,
        loop: 1,
        playlist: youtubeId,
      },
      events: {
        onReady: (event) => {
          event.target.setVolume(volume);
          setPlayerReady(true);
          if (shouldStartRef.current && !startedRef.current) {
            startedRef.current = true;
            event.target.playVideo();
            setPlaying(true);
          }
        },
        onStateChange: (event) => {
          const playingState = window.YT?.PlayerState.PLAYING;
          setPlaying(event.data === playingState);
        },
      },
    });
  }, [apiReady, hostId, useYoutube, youtubeId]);

  useEffect(() => {
    if (!useYoutube) return;
    const player = playerRef.current;
    if (!player || !playerReady || !shouldStart || startedRef.current) return;

    startedRef.current = true;
    player.playVideo();
    setPlaying(true);
  }, [playerReady, shouldStart, useYoutube]);

  useEffect(() => {
    if (useYoutube) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = weddingData.music.defaultVolume;
    audio.loop = true;
  }, [useYoutube]);

  useEffect(() => {
    if (useYoutube) return;
    const audio = audioRef.current;
    if (!audio || !shouldStart || startedRef.current) return;

    startedRef.current = true;
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [shouldStart, useYoutube]);

  const togglePlay = async () => {
    if (useYoutube) {
      const player = playerRef.current;
      if (!player) return;
      if (playing) {
        player.pauseVideo();
        setPlaying(false);
      } else {
        player.playVideo();
        setPlaying(true);
      }
      return;
    }

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
    if (useYoutube) {
      const player = playerRef.current;
      if (!player) return;
      if (player.isMuted()) {
        player.unMute();
        setMuted(false);
      } else {
        player.mute();
        setMuted(true);
      }
      return;
    }

    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  return (
    <div className={styles.player} role="region" aria-label="Background music controls">
      {useYoutube ? (
        <>
          <Script
            src="https://www.youtube.com/iframe_api"
            strategy="afterInteractive"
            onReady={handleYoutubeScriptReady}
          />
          <div id={hostId} className={styles.ytHost} aria-hidden="true" />
        </>
      ) : (
        <audio ref={audioRef} src={weddingData.music.src} preload="none" />
      )}

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
      <span className={styles.label}>
        {weddingData.music.label}
        {weddingData.music.artist ? (
          <span className={styles.artist}>{weddingData.music.artist}</span>
        ) : null}
      </span>
    </div>
  );
}
