/**
 * Centralized wedding information.
 * Edit this file to update names, dates, venues, and copy across the site.
 */

export const weddingData = {
  couple: {
    bride: "Abhigna",
    groom: "Hemanth",
    displayName: "Abhigna & Hemanth",
    /** Line shown directly above the couple names in the hero */
    togetherLine: "Together with their families",
    inviteLine:
      "Together with their families, invite you to celebrate their wedding",
  },

  /** Main wedding ceremony — America/Chicago (Texas Central Time) */
  wedding: {
    dateLabel: "March 11, 2027",
    /** ISO-like local datetime used for countdown (Texas / America/Chicago) */
    dateISO: "2027-03-11T08:00:00",
    timeZone: "America/Chicago",
    timeZoneLabel: "Central Time (Texas)",
    time: "8:00 AM",
    venue: "Bella Cavalli Events",
    location: "Aubrey, Texas",
    address: "Bella Cavalli Events, Aubrey, Texas", // Update with verified full address
    mapsQuery: "Bella Cavalli Events, Aubrey, Texas",
    description:
      "Together with our families, we invite you to witness our sacred Hindu wedding, rooted in Telugu tradition, as we begin our forever.",
  },

  hero: {
    ganeshaBlessing: "|| Shree Ganeshay Namah ||",
    /**
     * Soft-feathered couple cutout: Kasavu saree + gathbandhan knot,
     * laptop & drafting tube, garden path with lotuses and diyas —
     * blended into VenueCanvas.
     */
    image: "/images/couple/caricature-hero-feathered.webp",
    imageAlt:
      "Illustrated caricature of Abhigna and Hemanth in traditional South Indian wedding attire, linked by a gathbandhan knot",
  },

  scratchCard: {
    prompt: "Scratch to Reveal Our Wedding Invitation",
    skipLabel: "Reveal invitation",
    revealThreshold: 0.5,
    sessionKey: "ah-scratch-revealed",
  },

  countdown: {
    heading: "The big day is just around the corner",
    endedMessage: "The Celebration Has Begun!",
    celebrationMessage: "We cannot wait to celebrate with you.",
  },

  events: [
    {
      id: "mehendi",
      name: "Mehendi",
      dateLabel: "March 9, 2027",
      time: "9:00 AM onwards",
      venue: "To be announced",
      location: "Aubrey, Texas",
      address: "", // Add verified address when available
      mapsQuery: "Aubrey, Texas",
      description:
        "Join us for a joyful morning filled with vibrant colours, music, dance and henna as we kick off the wedding celebrations!",
      attire: "Attire: Bright festive colours.",
      motif: "mehendi" as const,
      icon: "henna",
    },
    {
      id: "sangeet",
      name: "Sangeet",
      dateLabel: "March 9, 2027",
      time: "Evening",
      venue: "The Bliss at Aubrey",
      location: "Aubrey, Texas",
      address: "The Bliss at Aubrey, Aubrey, Texas", // Update with verified full address
      mapsQuery: "The Bliss at Aubrey, Aubrey, Texas",
      description:
        "Two families. One playlist. Endless dancing. With hearts full and speakers louder, please join us to celebrate our Sangeet night.",
      attire: "Attire: Festive glam/Bollywood chic (comfortable shoes recommended).",
      motif: "sangeet" as const,
      icon: "music",
    },
    {
      id: "haldi",
      name: "Haldi",
      dateLabel: "March 10, 2027",
      time: "Morning",
      venue: "To be announced",
      location: "Aubrey, Texas",
      address: "", // Add verified address when available
      mapsQuery: "Aubrey, Texas",
      description:
        "A vibrant turmeric ceremony filled with laughter, blessings, and bright yellow hues as we begin another joyful chapter of our wedding celebrations.",
      attire: "Attire: Shades of yellow or festive pastels are encouraged.",
      motif: "haldi" as const,
      icon: "turmeric",
    },
    {
      id: "pellikoduku-pellikuthuru",
      name: "Pellikoduku & Pellikuthuru",
      dateLabel: "March 10, 2027",
      time: "Afternoon",
      venue: "To be announced",
      location: "Aubrey, Texas",
      address: "", // Add verified address when available
      mapsQuery: "Aubrey, Texas",
      description:
        "Traditional Telugu pre-wedding rituals with family blessings, sacred customs, and meaningful moments for both bride and groom.",
      attire: "Attire: Traditional Indian wear is recommended.",
      motif: "pellikuthuru" as const,
      icon: "bell",
    },
    {
      id: "wedding",
      name: "Wedding Ceremony",
      dateLabel: "March 11, 2027",
      time: "8:00 AM",
      venue: "Bella Cavalli Events",
      location: "Aubrey, Texas",
      address: "Bella Cavalli Events, Aubrey, Texas", // Update with verified full address
      mapsQuery: "Bella Cavalli Events, Aubrey, Texas",
      description:
        "Together with our families, we invite you to witness our sacred Hindu wedding, rooted in Telugu tradition, as we begin our forever.",
      attire: "Attire: Traditional attire. Please avoid white and black.",
      motif: "wedding" as const,
      icon: "lotus",
    },
  ],

  story: {
    title: "Our Story",
    howWeMet: {
      title: "How We Met",
      body: "A Cafe, A conversation. The year 2022. Neither of us knew it then, but that day marked the beginning of our journey together.",
      photo: {
        src: "/images/gallery/meeting.jpeg",
        alt: "Abhigna and Hemanth during one of their early cafe dates",
        caption: "Where it all began",
      },
    },
    proposal: {
      title: "The Proposal",
      body: "Vermont. A dozen golden retrievers. One knee on the ground. The most unexpected, most perfect proposal ever.",
      photo: {
        src: "/images/gallery/proposal-dogs-1.jpg",
        alt: "Proposal moment surrounded by golden retrievers",
        caption: "The Proposal",
      },
    },
    message: {
      title: "A Note from Us",
      body: "Dear family and friends, we are so grateful to celebrate this sacred occasion with you. Your love and blessings mean the world to us as we begin our life together.",
    },
    /** Keep only the preferred primary proposal image */
    photos: [
      {
        id: "story-1",
        alt: "Proposal moment with golden retrievers in the mountains",
        src: "/images/gallery/proposal-dogs-1.jpg",
        caption: "The Proposal",
      },
    ],
  },

  /**
   * Favorites — enter real answers below.
   * Empty strings are hidden in the public UI (no TBD / placeholder copy).
   */
  favorites: {
    title: "Our Favorites",
    subtitle: "A few little things that make us, us.",
    abhigna: {
      photo: "/images/couple/abhigna_favourite.jpeg",
      quote: "",
      food: "Coffee",
      dessert: "Ice Cream",
      song: "Dance",
      movie: "",
      travelDestination: "",
      partnerQuality: "Dogs",
      ultimateFavorite: "",
      ultimateTagline: "",
    },
    hemanth: {
      photo: "/images/couple/hemanth-favourite.jpeg",
      quote: "",
      food: "",
      dessert: "",
      song: "",
      movie: "",
      travelDestination: "",
      partnerQuality: "",
      ultimateFavorite: "Abhigna",
      ultimateTagline: "That’s it. That’s the favourite!",
    },
  },

  details: {
    title: "Wedding Details",
    items: [
      {
        title: "Ceremony Timing",
        body: "The wedding ceremony begins at 8:00 AM on March 11, 2027. Guests are kindly requested to arrive 30–45 minutes early to settle in and receive a warm welcome.",
      },
      {
        title: "Arrival Instructions",
        body: "Please follow venue signage upon arrival. A welcome desk will guide you to seating. Details will be updated closer to the wedding date.",
      },
      {
        title: "Parking",
        body: "Parking information for Bella Cavalli Events and other venues will be shared here once confirmed. Please check back closer to the celebrations.",
      },
      {
        title: "Accommodation",
        body: "Hotel and lodging recommendations for guests traveling to Aubrey, Texas will be listed here. Contact the couple or families for early assistance.",
      },
      {
        title: "Important Notes",
        body: "This is a sacred Hindu wedding celebration. Kindly silence phones during the ceremony. Additional guest notes will be shared as plans are finalized.",
      },
    ],
    contact: {
      title: "Contact",
      email: "hemanthbhargav13@gmail.com", // Update with real contact
      phone: "+1 (609) 598-6984", // Update with real contact
      note: "For questions about the wedding, please reach out to the couple or their families.",
    },
  },

  venues: [
    {
      id: "bella-cavalli",
      name: "Bella Cavalli Events",
      fullAddress: "Bella Cavalli Events, Aubrey, Texas", // Replace with verified street address
      location: "Aubrey, Texas",
      mapsQuery: "Bella Cavalli Events, Aubrey, Texas",
      note: "Primary wedding venue. Full street address to be confirmed.",
    },
    {
      id: "the-bliss",
      name: "The Bliss at Aubrey",
      fullAddress: "The Bliss at Aubrey, Aubrey, Texas", // Replace with verified street address
      location: "Aubrey, Texas",
      mapsQuery: "The Bliss at Aubrey, Aubrey, Texas",
      note: "Sangeet venue. Full street address to be confirmed.",
    },
  ],

  rsvp: {
    title: "RSVP",
    subtitle: "We joyfully request the honour of your presence. Kindly respond at your earliest convenience.",
    confirmation:
      "Thank you! Your RSVP has been received. We cannot wait to celebrate with you.",
    /**
     * Leave empty to email details.contact.email via FormSubmit (browser)
     * or via /api/rsvp when RESEND_API_KEY is set. Or set a Formspree / API URL.
     */
    endpoint: "",
    events: [
      { id: "mehendi", label: "Mehendi" },
      { id: "sangeet", label: "Sangeet" },
      { id: "haldi", label: "Haldi" },
      { id: "pellikoduku-pellikuthuru", label: "Pellikoduku & Pellikuthuru" },
      { id: "wedding", label: "Wedding Ceremony" },
    ],
  },

  music: {
    /**
     * Official Sony Music South VEVO upload of Yedhemaina Sakhi
     * (Vikramasimha · A.R. Rahman). Streamed via YouTube IFrame API —
     * no copyrighted audio file is hosted in this repo.
     */
    youtubeId: "tGEGGWt9wgI",
    label: "Yedhemaina Sakhi",
    artist: "A.R. Rahman",
    defaultVolume: 0.28,
    /** Optional local fallback if youtubeId is removed */
    src: "/audio/wedding-instrumental.wav",
  },

  footer: {
    tagline: "Made with love for our wedding celebration",
    contactEmail: "hello@abhigna-hemanth.wedding",
  },

  seo: {
    title: "Abhigna & Hemanth | Wedding Invitation",
    description:
      "You are warmly invited to the wedding of Abhigna and Hemanth on March 11, 2027 at Bella Cavalli Events, Aubrey, Texas. Join us for sacred South Indian Hindu wedding celebrations.",
    siteUrl: "https://abhigna-hemanth.wedding",
    ogImage: "/images/couple/caricature-hero-feathered.webp",
  },
} as const;

export type EventMotif = "mehendi" | "haldi" | "pellikuthuru" | "sangeet" | "wedding";

export type WeddingEvent = {
  id: string;
  name: string;
  dateLabel: string;
  time: string;
  venue: string;
  location: string;
  address: string;
  mapsQuery: string;
  description: string;
  attire: string;
  motif: EventMotif;
  icon: string;
};

export type FavoritePerson = {
  food: string;
  dessert: string;
  song: string;
  movie: string;
  travelDestination: string;
  partnerQuality: string;
  ultimateFavorite: string;
};

export type WeddingData = typeof weddingData;

export function mapsSearchUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
