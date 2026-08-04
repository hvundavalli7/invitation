"use client";

import { useEffect, useState } from "react";
import EnvelopeOpen from "@/components/EnvelopeOpen/EnvelopeOpen";
import TempleEntranceHero from "@/components/TempleEntranceHero/TempleEntranceHero";
import DateScratch from "@/components/DateScratch/DateScratch";
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
import VenueCanvas from "@/components/VenueCanvas/VenueCanvas";

export default function InvitationApp() {
  const [revealed, setRevealed] = useState(false);
  const [musicReady, setMusicReady] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("invitation-locked", !revealed);
    return () => document.body.classList.remove("invitation-locked");
  }, [revealed]);

  const handleReveal = () => {
    setRevealed(true);
    setMusicReady(true);
  };

  return (
    <>
      {!revealed ? <EnvelopeOpen onComplete={handleReveal} /> : null}

      <VenueCanvas active={revealed} />

      <div
        className={revealed ? "invitation-revealed" : "invitation-hidden"}
        aria-hidden={!revealed}
        inert={!revealed ? true : undefined}
      >
        <TempleEntranceHero />
        <DateScratch />
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
      <Petals active={revealed} />
    </>
  );
}
