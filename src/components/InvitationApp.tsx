"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import EnvelopeOpen from "@/components/EnvelopeOpen/EnvelopeOpen";
import TempleEntranceHero from "@/components/TempleEntranceHero/TempleEntranceHero";
import DateScratch from "@/components/DateScratch/DateScratch";
import WeddingCountdown from "@/components/WeddingCountdown/WeddingCountdown";
import ConfettiBurst from "@/components/ConfettiBurst/ConfettiBurst";
import EventTimeline from "@/components/EventTimeline/EventTimeline";
import OurStory from "@/components/OurStory/OurStory";
import Favorites from "@/components/Favorites/Favorites";
import WeddingDetails from "@/components/WeddingDetails/WeddingDetails";
import VenueMap from "@/components/VenueMap/VenueMap";
import RSVPForm from "@/components/RSVPForm/RSVPForm";
import MusicPlayer from "@/components/MusicPlayer/MusicPlayer";
import TraditionalFooter from "@/components/TraditionalFooter/TraditionalFooter";
import Petals from "@/components/Petals/Petals";
import VenueCanvas from "@/components/VenueCanvas/VenueCanvas";
import { weddingData } from "@/data/wedding";

function subscribeScratchSession(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("ah-scratch-revealed", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("ah-scratch-revealed", onStoreChange);
  };
}

function getScratchSession() {
  try {
    return sessionStorage.getItem(weddingData.scratchCard.sessionKey) === "1";
  } catch {
    return false;
  }
}

export default function InvitationApp() {
  const [revealed, setRevealed] = useState(false);
  const [musicReady, setMusicReady] = useState(false);
  const sessionScratch = useSyncExternalStore(
    subscribeScratchSession,
    getScratchSession,
    () => false,
  );
  const [scratchRevealed, setScratchRevealed] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const scratchDone = sessionScratch || scratchRevealed;

  useEffect(() => {
    document.body.classList.toggle("invitation-locked", !revealed);
    return () => document.body.classList.remove("invitation-locked");
  }, [revealed]);

  const handleReveal = () => {
    setRevealed(true);
    setMusicReady(true);
  };

  const handleScratchRevealed = useCallback(() => {
    setScratchRevealed((prev) => {
      if (prev || sessionScratch) return true;
      queueMicrotask(() => {
        setConfettiActive(true);
        window.setTimeout(() => setConfettiActive(false), 3000);
      });
      return true;
    });
  }, [sessionScratch]);

  return (
    <>
      {!revealed ? <EnvelopeOpen onComplete={handleReveal} /> : null}

      <VenueCanvas active={revealed} />
      <ConfettiBurst active={confettiActive} />

      <div
        className={revealed ? "invitation-revealed" : "invitation-hidden"}
        aria-hidden={!revealed}
        inert={!revealed ? true : undefined}
      >
        <TempleEntranceHero />
        <DateScratch
          onRevealed={handleScratchRevealed}
          initiallyRevealed={scratchDone}
        />
        <main>
          <WeddingCountdown visible={scratchDone} />
          <EventTimeline />
          <OurStory />
          <Favorites />
          <WeddingDetails />
          <VenueMap />
          <RSVPForm />
        </main>
        <TraditionalFooter />
      </div>

      {revealed ? <MusicPlayer shouldStart={musicReady} /> : null}
      <Petals active={revealed} />
    </>
  );
}
