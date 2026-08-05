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
    ganeshaBlessing: "|| Shree Ganesha Namah ||",
    /** Soft-edged South Indian invitation caricature (blends into VenueCanvas) */
    image: "/images/couple/caricature-hero-feathered.webp",
    imageAlt:
      "Illustrated caricature of Abhigna and Hemanth in traditional South Indian wedding attire",
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
      body: "Every love story has a beginning. Ours started with a spark that grew into something we knew we wanted to share with the people we love most.",
    },
    proposal: {
      title: "The Proposal",
      body: "With joy in our hearts and blessings from our families, we promised each other a lifetime — and now we invite you to celebrate that promise with us.",
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
      // Enter Abhigna’s favorites here:
      food: "",
      dessert: "",
      song: "",
      movie: "",
      travelDestination: "",
      partnerQuality: "",
      ultimateFavorite: "",
    },
    hemanth: {
      // Enter Hemanth’s favorites here:
      food: "",
      dessert: "",
      song: "",
      movie: "",
      travelDestination: "",
      partnerQuality: "",
      ultimateFavorite: "",
    },
  },

  details: {
    title: "Wedding Details",
    items: [
      {
        title: "Dress Code",
        body: "Traditional South Indian / Indian festive attire is warmly encouraged. Think silk sarees, elegant lehengas, kurtas, and sherwanis in rich jewel tones of maroon, gold, ivory, and emerald.",
      },
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
      { id: "wedding", label: "Wedding Ceremony" },
    ],
  },

  gallery: {
    title: "Gallery",
    subtitle: "Moments from our journey — older memories to recent celebrations.",
    /**
     * Story order: older memories → early relationship → travel/candid →
     * engagement/pre-wedding → recent formal.
     *
     * Older / early-relationship photographs are not yet in the repository.
     * Add files under /public/images/gallery/ (suggested names):
     *   - old-memory-1.jpg, old-memory-2.jpg  (category: "old-memory")
     *   - early-1.jpg, early-2.jpg            (category: "travel")
     *   - recent-formal-1.jpg                 (category: "recent")
     * Then register them at the top of this images array. Do not invent remote URLs.
     * Proposal photo kept for engagement chapter: /images/gallery/proposal-dogs-1.jpg
     */
    images: [
      {
        id: "g-proposal",
        src: "/images/gallery/proposal-dogs-1.jpg",
        alt: "Proposal moment with golden retrievers in the mountains",
        caption: "The proposal",
        year: "",
        category: "engagement" as const,
      },
      {
        id: "g1",
        src: "/images/gallery/beach-sitting.jpg",
        alt: "Sitting together on the beach, holding hands with roses",
        caption: "By the shore",
        year: "",
        category: "travel" as const,
      },
      {
        id: "g2",
        src: "/images/gallery/coastal-dance.jpg",
        alt: "Dancing together on the coastal cliffs",
        caption: "Coastal dance",
        year: "",
        category: "travel" as const,
      },
      {
        id: "g3",
        src: "/images/gallery/beachfront-together.jpg",
        alt: "Foreheads together, smiling with the ocean behind us",
        caption: "Ocean breeze",
        year: "",
        category: "travel" as const,
      },
      {
        id: "g4",
        src: "/images/gallery/sunset-walk.jpg",
        alt: "Walking hand in hand along the shore at sunset",
        caption: "Sunset walk",
        year: "",
        category: "engagement" as const,
      },
      {
        id: "g5",
        src: "/images/gallery/golden-moment.jpg",
        alt: "A tender moment by the beach with ocean backdrop",
        caption: "Golden hour",
        year: "",
        category: "recent" as const,
      },
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

export type EventMotif = "mehendi" | "sangeet" | "wedding";

export type GalleryCategory = "old-memory" | "travel" | "engagement" | "recent";

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
