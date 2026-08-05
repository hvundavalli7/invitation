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
import Gallery from "@/components/Gallery/Gallery";
import RSVPForm from "@/components/RSVPForm/RSVPForm";
import MusicPlayer from "@/components/MusicPlayer/MusicPlayer";
import TraditionalFooter from "@/components/TraditionalFooter/TraditionalFooter";
import Petals from "@/components/Petals/Petals";
import VenueCanvas from "@/components/VenueCanvas/VenueCanvas";
import {
  getScratchSessionServerSnapshot,
  getScratchSessionSnapshot,
  markScratchSessionRevealed,
  subscribeScratchSession,
} from "@/lib/sessionScratch";

function subscribeHydration(onStoreChange: () => void) {
  onStoreChange();
  return () => {};
}

function getHydrationSnapshot() {
  return true;
}

function getHydrationServerSnapshot() {
  return false;
}

export default function InvitationApp() {
  const [opened, setOpened] = useState(false);
  const [confettiOnce, setConfettiOnce] = useState(false);
  const [musicReady, setMusicReady] = useState(false);

  const hydrated = useSyncExternalStore(
    subscribeHydration,
    getHydrationSnapshot,
    getHydrationServerSnapshot,
  );

  const scratchRevealed = useSyncExternalStore(
    subscribeScratchSession,
    getScratchSessionSnapshot,
    getScratchSessionServerSnapshot,
  );

  useEffect(() => {
    document.body.classList.toggle("invitation-locked", !opened);
    return () => document.body.classList.remove("invitation-locked");
  }, [opened]);

  const handleOpen = () => {
    setOpened(true);
    setMusicReady(true);
  };

  const handleScratchRevealed = useCallback(() => {
    if (getScratchSessionSnapshot()) return;
    markScratchSessionRevealed();
    setConfettiOnce(true);
  }, []);

  return (
    <>
      {!opened ? <EnvelopeOpen onComplete={handleOpen} /> : null}

      <VenueCanvas active={opened} />
      <ConfettiBurst active={confettiOnce} />

      <div
        className={opened ? "invitation-revealed" : "invitation-hidden"}
        aria-hidden={!opened}
        inert={!opened ? true : undefined}
      >
        <TempleEntranceHero />
        {hydrated ? (
          <DateScratch
            key={scratchRevealed ? "revealed" : "sealed"}
            onRevealed={handleScratchRevealed}
            initiallyRevealed={scratchRevealed}
          />
        ) : null}
        <main>
          <WeddingCountdown visible={scratchRevealed} />
          <EventTimeline />
          <OurStory />
          <Favorites />
          <WeddingDetails />
          <VenueMap />
          <Gallery />
          <RSVPForm />
        </main>
        <TraditionalFooter />
      </div>

      {opened ? <MusicPlayer shouldStart={musicReady} /> : null}
      <Petals active={opened} />
    </>
  );
}
