"use client";

import { useEffect, useState } from "react";
import ScratchReveal from "@/components/ScratchReveal/ScratchReveal";
import TempleEntranceHero from "@/components/TempleEntranceHero/TempleEntranceHero";
import WeddingCountdown from "@/components/WeddingCountdown/WeddingCountdown";
import EventTimeline from "@/components/EventTimeline/EventTimeline";
import OurStory from "@/components/OurStory/OurStory";
import WeddingDetails from "@/components/WeddingDetails/WeddingDetails";
import VenueMap from "@/components/VenueMap/VenueMap";
import Gallery from "@/components/Gallery/Gallery";
import RSVPForm from "@/components/RSVPForm/RSVPForm";
import MusicPlayer from "@/components/MusicPlayer/MusicPlayer";
import TraditionalFooter from "@/components/TraditionalFooter/TraditionalFooter";
import Petals from "@/components/Petals/Petals";

export default function InvitationApp() {
  const [revealed, setRevealed] = useState(false);
  const [musicReady, setMusicReady] = useState(false);
  const [showPetals, setShowPetals] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("invitation-locked", !revealed);
    return () => document.body.classList.remove("invitation-locked");
  }, [revealed]);

  const handleReveal = () => {
    setRevealed(true);
    setMusicReady(true);
    setShowPetals(true);
    window.setTimeout(() => setShowPetals(false), 12000);
  };

  return (
    <>
      {!revealed ? <ScratchReveal onComplete={handleReveal} /> : null}

      <div
        className={revealed ? "invitation-revealed" : "invitation-hidden"}
        aria-hidden={!revealed}
        inert={!revealed ? true : undefined}
      >
        <TempleEntranceHero />
        <main>
          <WeddingCountdown />
          <EventTimeline />
          <OurStory />
          <WeddingDetails />
          <VenueMap />
          <Gallery />
          <RSVPForm />
        </main>
        <TraditionalFooter />
      </div>

      {revealed ? <MusicPlayer shouldStart={musicReady} /> : null}
      <Petals active={showPetals} />
    </>
  );
}
