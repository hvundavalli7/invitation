/**
 * Centralized wedding information.
 * Edit this file to update names, dates, venues, and copy across the site.
 */

export const weddingData = {
  couple: {
    bride: "Abhigna",
    groom: "Hemanth",
    displayName: "Abhigna and Hemanth",
    /** Short line shown directly above the couple names in the hero */
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
    ganeshBlessing: "|| Shree Ganesha Namah ||",
    /** South Indian invitation caricature — transparent/cream-blended */
    image: "/images/couple/caricature-hero-feathered.webp",
    imageAlt:
      "Illustrated caricature of Abhigna and Hemanth in traditional South Indian wedding attire — Abhigna in an off-white saree with a green border, Hemanth with a green kanduva",
  },

  scratchCard: {
    prompt: "Scratch to Reveal Our Wedding Invitation",
    skipLabel: "Reveal invitation",
    /** Fraction of scratched surface required to complete (45%–60%) */
    revealThreshold: 0.52,
    sessionKey: "ah-invitation-scratch-revealed",
  },

  countdown: {
    heading: "The big day is just around the corner",
    celebrationMessage: "We cannot wait to celebrate with you.",
    endedMessage: "The Celebration Has Begun!",
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
   * Favorites — fill in values below when ready.
   * Empty strings are hidden in the public UI (no TBD / placeholder copy).
   *
   * WHERE TO ENTER VALUES:
   * - favorites.abhigna.* and favorites.hemanth.*
   */
  favorites: {
    title: "Our Favorites",
    eyebrow: "A little more about us",
    abhigna: {
      name: "Abhigna",
      heading: "Abhigna’s Favorites",
      portrait: "/images/favorites/abhigna.webp",
      portraitAlt: "Illustrated portrait of Abhigna in traditional wedding attire",
      // Enter Abhigna’s answers here:
      food: "",
      dessert: "",
      song: "",
      movie: "",
      travelDestination: "",
      partnerQuality: "",
      ultimateFavorite: "",
    },
    hemanth: {
      name: "Hemanth",
      heading: "Hemanth’s Favorites",
      portrait: "/images/favorites/hemanth.webp",
      portraitAlt: "Illustrated portrait of Hemanth in traditional wedding attire",
      // Enter Hemanth’s answers here:
      food: "",
      dessert: "",
      song: "",
      movie: "",
      travelDestination: "",
      partnerQuality: "",
      /** Example: ultimateFavorite: "Only Abhigna" */
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
    subtitle: "A visual story of our journey — older memories to recent days.",
    /**
     * Gallery story order: older memories → early relationship → travel/candid
     * → engagement/pre-wedding → recent formal.
     *
     * To add older photographs:
     * 1. Place image files in /public/images/gallery/old-memories/
     * 2. Add entries below with category: "old-memory"
     * Do not invent external image URLs. Only reference files that exist.
     */
    images: [
      {
        id: "g-proposal-1",
        src: "/images/gallery/proposal-dogs-1.jpg",
        alt: "Proposal celebration with golden retrievers in the mountains",
        caption: "The proposal",
        year: "",
        category: "old-memory" as const,
      },
      {
        id: "g-proposal-moment",
        src: "/images/couple/proposal.jpg",
        alt: "Abhigna and Hemanth during their proposal celebration",
        caption: "A joyful yes",
        year: "",
        category: "old-memory" as const,
      },
      {
        id: "g-beach-sitting",
        src: "/images/gallery/beach-sitting.jpg",
        alt: "Sitting together on the beach, holding hands with roses",
        caption: "Early days by the sea",
        year: "",
        category: "travel" as const,
      },
      {
        id: "g-coastal-dance",
        src: "/images/gallery/coastal-dance.jpg",
        alt: "Dancing together on the coastal cliffs",
        caption: "Coastal dance",
        year: "",
        category: "travel" as const,
      },
      {
        id: "g-beachfront",
        src: "/images/gallery/beachfront-together.jpg",
        alt: "Foreheads together, smiling with the ocean behind us",
        caption: "By the shore",
        year: "",
        category: "travel" as const,
      },
      {
        id: "g-sunset",
        src: "/images/gallery/sunset-walk.jpg",
        alt: "Walking hand in hand along the shore at sunset",
        caption: "Sunset walk",
        year: "",
        category: "engagement" as const,
      },
      {
        id: "g-embrace",
        src: "/images/couple/embrace.jpg",
        alt: "Abhigna and Hemanth sharing a warm embrace",
        caption: "Closer still",
        year: "",
        category: "engagement" as const,
      },
      {
        id: "g-dance",
        src: "/images/couple/dance.jpg",
        alt: "Abhigna and Hemanth dancing together",
        caption: "Dancing through it all",
        year: "",
        category: "engagement" as const,
      },
      {
        id: "g-golden",
        src: "/images/gallery/golden-moment.jpg",
        alt: "A tender moment by the beach with ocean backdrop",
        caption: "Golden hour",
        year: "",
        category: "recent" as const,
      },
      {
        id: "g-forehead",
        src: "/images/couple/forehead-kiss.jpg",
        alt: "A tender forehead kiss between Abhigna and Hemanth",
        caption: "Quiet affection",
        year: "",
        category: "recent" as const,
      },
      {
        id: "g-hero-portrait",
        src: "/images/couple/hero.jpg",
        alt: "Formal portrait of Abhigna and Hemanth",
        caption: "Together",
        year: "",
        category: "recent" as const,
      },
      // Older memory slots — add files to /public/images/gallery/old-memories/ then uncomment:
      // {
      //   id: "g-old-1",
      //   src: "/images/gallery/old-memories/memory-1.jpg",
      //   alt: "Describe the older memory",
      //   caption: "Early memory",
      //   year: "20XX",
      //   category: "old-memory" as const,
      // },
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
    defaultVolume: 0.3,
    muteStorageKey: "ah-music-muted",
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

export type GalleryCategory =
  | "old-memory"
  | "travel"
  | "engagement"
  | "recent";

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  year: string;
  category: GalleryCategory;
};

export type FavoritePerson = {
  name: string;
  heading: string;
  portrait: string;
  portraitAlt: string;
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
