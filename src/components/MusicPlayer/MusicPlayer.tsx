"use client";

import Script from "next/script";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { weddingData } from "@/data/wedding";
import styles from "./MusicPlayer.module.css";

type Props = {
  /** Attempt autoplay once the invitation opening sequence is ready. */
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

let mutePreference = false;
const muteListeners = new Set<() => void>();

function emitMute() {
  muteListeners.forEach((l) => l());
}

function subscribeMute(onStoreChange: () => void) {
  muteListeners.add(onStoreChange);
  return () => muteListeners.delete(onStoreChange);
}

let muteHydrated = false;

function getMuteSnapshot() {
  if (!muteHydrated) {
    muteHydrated = true;
    try {
      mutePreference = localStorage.getItem(weddingData.music.muteStorageKey) === "1";
    } catch {
      mutePreference = false;
    }
  }
  return mutePreference;
}

function getMuteServerSnapshot() {
  return false;
}

function saveMute(next: boolean) {
  mutePreference = next;
  muteHydrated = true;
  try {
    localStorage.setItem(weddingData.music.muteStorageKey, next ? "1" : "0");
  } catch {
    // ignore
  }
  emitMute();
}

function readSavedMute(): boolean {
  return mutePreference;
}

export default function MusicPlayer({ shouldStart = false }: Props) {
  const hostId = `yt-music-${useId().replace(/:/g, "")}`;
  const playerRef = useRef<YtPlayer | null>(null);
  const startedRef = useRef(false);
  const shouldStartRef = useRef(shouldStart);
  const previousReadyHandler = useRef<(() => void) | undefined>(undefined);
  const interactionCleanup = useRef<(() => void) | null>(null);
  const [apiReady, setApiReady] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const muted = useSyncExternalStore(
    subscribeMute,
    getMuteSnapshot,
    getMuteServerSnapshot,
  );

  const youtubeId = weddingData.music.youtubeId;
  const useYoutube = Boolean(youtubeId);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    shouldStartRef.current = shouldStart;
  }, [shouldStart]);

  useEffect(() => {
    return () => {
      interactionCleanup.current?.();
      interactionCleanup.current = null;
      if (previousReadyHandler.current !== undefined) {
        window.onYouTubeIframeAPIReady = previousReadyHandler.current;
      }
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, []);

  const clearInteractionListeners = () => {
    interactionCleanup.current?.();
    interactionCleanup.current = null;
  };

  const attachInteractionFallback = (tryPlay: () => void) => {
    clearInteractionListeners();
    const events: Array<keyof WindowEventMap> = [
      "pointerdown",
      "touchstart",
      "click",
      "keydown",
    ];
    const onInteract = () => {
      tryPlay();
    };
    events.forEach((evt) =>
      window.addEventListener(evt, onInteract, { once: false, passive: true }),
    );
    interactionCleanup.current = () => {
      events.forEach((evt) => window.removeEventListener(evt, onInteract));
    };
  };

  const startYoutube = (player: YtPlayer) => {
    if (startedRef.current) return;
    try {
      if (readSavedMute()) {
        player.mute();
      } else {
        player.unMute();
      }
      player.playVideo();
      startedRef.current = true;
      setPlaying(true);
      clearInteractionListeners();
    } catch {
      attachInteractionFallback(() => startYoutube(player));
    }
  };

  const startAudio = async (audio: HTMLAudioElement) => {
    if (startedRef.current) return;
    try {
      audio.muted = readSavedMute();
      await audio.play();
      startedRef.current = true;
      setPlaying(true);
      clearInteractionListeners();
    } catch {
      // Autoplay blocked — wait for first valid interaction
      attachInteractionFallback(() => {
        void startAudio(audio);
      });
      setPlaying(false);
    }
  };

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
            startYoutube(event.target);
            // YouTube often needs a gesture; if not playing shortly, attach fallback
            window.setTimeout(() => {
              if (!startedRef.current) {
                attachInteractionFallback(() => startYoutube(event.target));
              }
            }, 700);
          }
        },
        onStateChange: (event) => {
          const playingState = window.YT?.PlayerState.PLAYING;
          const isPlaying = event.data === playingState;
          setPlaying(isPlaying);
          if (isPlaying) {
            startedRef.current = true;
            clearInteractionListeners();
          }
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- start helpers close over stable refs
  }, [apiReady, hostId, useYoutube, youtubeId]);

  useEffect(() => {
    if (!useYoutube) return;
    const player = playerRef.current;
    if (!player || !playerReady || !shouldStart || startedRef.current) return;
    startYoutube(player);
    window.setTimeout(() => {
      if (!startedRef.current) {
        attachInteractionFallback(() => startYoutube(player));
      }
    }, 700);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerReady, shouldStart, useYoutube]);

  useEffect(() => {
    if (useYoutube) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = weddingData.music.defaultVolume;
    audio.loop = true;
    audio.muted = readSavedMute();
  }, [useYoutube]);

  useEffect(() => {
    if (useYoutube) return;
    const audio = audioRef.current;
    if (!audio || !shouldStart || startedRef.current) return;
    void startAudio(audio);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        startedRef.current = true;
        setPlaying(true);
        clearInteractionListeners();
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
        clearInteractionListeners();
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
        saveMute(false);
      } else {
        player.mute();
        saveMute(true);
      }
      return;
    }

    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    saveMute(audio.muted);
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
        onClick={toggleMute}
        aria-pressed={muted}
        aria-label={muted ? "Unmute music" : "Mute music"}
        title={muted ? "Unmute" : "Mute"}
      >
        {muted ? "Muted" : "Sound"}
      </button>
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
      <span className={styles.label}>
        {weddingData.music.label}
        {weddingData.music.artist ? (
          <span className={styles.artist}>{weddingData.music.artist}</span>
        ) : null}
      </span>
    </div>
  );
}
