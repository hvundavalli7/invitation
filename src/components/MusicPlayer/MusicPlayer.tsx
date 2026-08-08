"use client";

import Script from "next/script";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { weddingData } from "@/data/wedding";
import styles from "./MusicPlayer.module.css";

type Props = {
  /** Attempt autoplay after the invitation opening sequence is ready. */
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

const MUTE_KEY = "ah-music-muted";

function subscribeMute(onStoreChange: () => void) {
  window.addEventListener("ah-music-mute", onStoreChange);
  return () => window.removeEventListener("ah-music-mute", onStoreChange);
}

function getMutedPreference() {
  try {
    return sessionStorage.getItem(MUTE_KEY) === "1";
  } catch {
    return false;
  }
}

export default function MusicPlayer({ shouldStart = false }: Props) {
  const hostId = `yt-music-${useId().replace(/:/g, "")}`;
  const playerRef = useRef<YtPlayer | null>(null);
  const startedRef = useRef(false);
  const previousReadyHandler = useRef<(() => void) | undefined>(undefined);
  const interactionBoundRef = useRef(false);
  const [apiReady, setApiReady] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const muted = useSyncExternalStore(subscribeMute, getMutedPreference, () => false);
  const mutedRef = useRef(muted);

  const youtubeId = weddingData.music.youtubeId;
  const useYoutube = Boolean(youtubeId);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

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
        },
        onStateChange: (event) => {
          const playingState = window.YT?.PlayerState.PLAYING;
          setPlaying(event.data === playingState);
        },
      },
    });
  }, [apiReady, hostId, useYoutube, youtubeId]);

  useEffect(() => {
    if (useYoutube) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = weddingData.music.defaultVolume;
    audio.loop = true;
  }, [useYoutube]);

  useEffect(() => {
    if (!shouldStart) return;

    let cancelled = false;

    const removeInteractionListeners = () => {
      if (!interactionBoundRef.current) return;
      interactionBoundRef.current = false;
      window.removeEventListener("pointerdown", onFirstInteraction, true);
      window.removeEventListener("touchstart", onFirstInteraction, true);
      window.removeEventListener("keydown", onFirstInteraction, true);
    };

    const markStarted = () => {
      startedRef.current = true;
      setPlaying(true);
      removeInteractionListeners();
    };

    const tryStart = async () => {
      if (startedRef.current || cancelled) return true;

      // Detect mobile: try to start muted first for autoplay to work on mobile
      const isMobileOrTablet = () => {
        return typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      };

      if (useYoutube) {
        const player = playerRef.current;
        if (!player || !playerReady) return false;
        try {
          // On mobile, force mute for autoplay to work
          const shouldForceMute = isMobileOrTablet();
          if (shouldForceMute || mutedRef.current) player.mute();
          else player.unMute();
          player.setVolume(
            Math.round(
              Math.min(1, Math.max(0, weddingData.music.defaultVolume)) * 100,
            ),
          );
          player.playVideo();
          markStarted();
          return true;
        } catch {
          return false;
        }
      }

      const audio = audioRef.current;
      if (!audio) return false;
      try {
        audio.volume = weddingData.music.defaultVolume;
        // On mobile, force mute for autoplay to work
        const isMobile = isMobileOrTablet();
        audio.muted = isMobile || mutedRef.current;
        await audio.play();
        markStarted();
        return true;
      } catch {
        return false;
      }
    };

    const onFirstInteraction = () => {
      void tryStart();
    };

    const bindFallback = () => {
      if (interactionBoundRef.current || startedRef.current) return;
      interactionBoundRef.current = true;
      window.addEventListener("pointerdown", onFirstInteraction, true);
      window.addEventListener("touchstart", onFirstInteraction, {
        capture: true,
        passive: true,
      });
      window.addEventListener("keydown", onFirstInteraction, true);
    };

    void (async () => {
      const ok = await tryStart();
      if (!cancelled && !ok) bindFallback();
    })();

    return () => {
      cancelled = true;
      removeInteractionListeners();
    };
  }, [shouldStart, useYoutube, playerReady]);

  const togglePlay = async () => {
    if (useYoutube) {
      const player = playerRef.current;
      if (!player) return;
      if (playing) {
        player.pauseVideo();
        setPlaying(false);
      } else {
        player.playVideo();
        startedRef.current = true;
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
        startedRef.current = true;
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    const next = !muted;
    mutedRef.current = next;
    try {
      sessionStorage.setItem(MUTE_KEY, next ? "1" : "0");
    } catch {
      // ignore
    }
    window.dispatchEvent(new Event("ah-music-mute"));

    if (useYoutube) {
      const player = playerRef.current;
      if (!player) return;
      if (next) player.mute();
      else player.unMute();
      return;
    }

    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = next;
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
        <audio ref={audioRef} src={weddingData.music.src} preload="auto" />
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
