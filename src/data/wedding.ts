/**
 * Centralized wedding information.
 * Edit this file to update names, dates, venues, and copy across the site.
 */

export const weddingData = {
  couple: {
    bride: "Aarohi",
    groom: "Rohan",
    displayName: "Aarohi & Rohan",
    /** Line shown directly above the couple names in the hero */
    togetherLine: "With love and blessings from both families",
    inviteLine: "invite you to celebrate their wedding",
  },

  /** Main wedding ceremony — America/Chicago (Texas Central Time) */
  wedding: {
    dateLabel: "April 12, 2027",
    /** ISO-like local datetime used for countdown (Texas / America/Chicago) */
    dateISO: "2027-03-11T08:00:00",
    timeZone: "America/Chicago",
    timeZoneLabel: "Central Time (Texas)",
    time: "8:30 AM",
    venue: "The Royal Palm Courtyard",
    location: "Austin, Texas",
    address: "The Royal Palm Courtyard, Austin, Texas",
    mapsQuery: "The Royal Palm Courtyard, Austin, Texas",
    description:
      "Together with our families, we invite you to witness our sacred Hindu wedding celebration, rooted in Telugu tradition, as we begin our forever.",
  },

  hero: {
    ganeshaBlessing: "|| Shree Ganeshay Namah ||",
    /**
     * Animated couple cutout from the South Indian invitation caricature
     * (gathbandhan knot, gold saree, laptop + drafting tube) soft-blended
     * into VenueCanvas.
     */
    image: "/images/couple/caricature-hero-feathered.webp",
    imageAlt:
      "Illustrated caricature of Aarohi and Rohan in traditional South Indian wedding attire",
  },

  scratchCard: {
    prompt: "Scratch to Reveal Our Wedding Invitation",
    skipLabel: "Reveal invitation",
    revealThreshold: 0.5,
    sessionKey: "ah-scratch-revealed",
  },

  countdown: {
    heading: "The celebration is almost here",
    endedMessage: "The Celebration Has Begun!",
    celebrationMessage: "We cannot wait to celebrate with you.",
  },

  events: [
    {
      id: "mehendi",
      name: "Mehendi",
      dateLabel: "March 9, 2027",
      time: "9:00 AM onwards",
      venue: "316 Parkwood Dr",
      location: "Austin, Texas",
      address: "316 Parkwood Dr, Lakewood Village, TX 75068",
      mapsQuery: "316 Parkwood Dr, Lakewood Village, TX 75068",
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
      time: "6:00 PM",
      venue: "The Bliss at Aubrey",
      location: "Austin, Texas",
      address: "The Bliss at Aubrey, Austin, Texas",
      mapsQuery: "The Bliss at Aubrey, Austin, Texas",
      description:
        "Two families. One playlist. Endless dancing. With hearts full and speakers louder, please join us to celebrate our Sangeet night.",
      attire: "Attire: Festive glam/Bollywood chic (comfortable shoes recommended).",
      motif: "sangeet" as const,
      icon: "music",
    },
    {
      id: "pellikoduku-pellikuthuru",
      name: "Pellikoduku & Pellikuthuru",
      dateLabel: "March 10, 2027",
      time: "9:30 AM",
      venue: "316 Parkwood Dr",
      location: "Austin, Texas",
      address: "316 Parkwood Dr, Lakewood Village, TX 75068",
      mapsQuery: "316 Parkwood Dr, Lakewood Village, TX 75068",
      description:
        "Traditional Telugu pre-wedding rituals with family blessings, sacred customs, and meaningful moments for both bride and groom.",
      attire: "Attire: Traditional Indian wear is recommended.",
      motif: "pellikuthuru" as const,
      icon: "bell",
    },
    {
      id: "haldi",
      name: "Haldi",
      dateLabel: "March 10, 2027",
      time: "After Pellikoduku & Pellikuthuru",
      venue: "316 Parkwood Dr",
      location: "Austin, Texas",
      address: "316 Parkwood Dr, Lakewood Village, TX 75068",
      mapsQuery: "316 Parkwood Dr, Lakewood Village, TX 75068",
      description:
        "A vibrant turmeric ceremony filled with laughter, blessings, and a joyful chapter of our wedding celebrations.",
      attire: "Attire: Shades of mint and sage green are encouraged.",
      motif: "haldi" as const,
      icon: "turmeric",
    },
    {
      id: "wedding",
      name: "Wedding Ceremony",
      dateLabel: "April 12, 2027",
      time: "8:30 AM",
      venue: "The Royal Palm Courtyard",
      location: "Austin, Texas",
      address: "The Royal Palm Courtyard, Austin, Texas",
      mapsQuery: "The Royal Palm Courtyard, Austin, Texas",
      description:
        "Together with our families, we invite you to witness our sacred Hindu wedding celebration, rooted in Telugu tradition, as we begin our forever.",
      attire: "Attire: Traditional attire. Please avoid black.",
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
        alt: "Aarohi and Rohan during one of their early cafe dates",
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
      body: "Dear family and friends, we are so grateful to celebrate this sacred occasion with you. Your love and blessings mean the world to us as we begin our life together. Here's to forever.",
      photo: {
        src: "/images/gallery/WhatsApp Image 2026-08-09 at 20.08.57.jpeg",
        alt: "Aarohi and Rohan standing together on a beach",
        caption: "Here's to forever",
      },
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
    subtitle: "",
    abhigna: {
      photo: "/images/couple/abhi.jpeg",
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
      photo: "/images/couple/abhihem.jpeg",
      quote: "",
      food: "",
      dessert: "",
      song: "",
      movie: "",
      travelDestination: "",
      partnerQuality: "",
      ultimateFavorite: "Aarohi",
      ultimateTagline: "That’s it. That’s the favourite!",
    },
  },

  details: {
    title: "Wedding Details",
    items: [
      {
        title: "Ceremony Timing",
        body: "The wedding ceremony begins at 8:30 AM on April 12, 2027. Guests are kindly requested to arrive 30–45 minutes early to settle in and receive a warm welcome.",
      },
      {
        title: "A Note on Gifts",
        body: "We are truly grateful to have you celebrate with us. As we are both travelling from different cities, physical gifts can be tricky to carry. So in lieu of gifts, cash contributions are welcomed and appreciated.",
      },
    ],
    accommodation: {
      title: "Accommodation",
      subtitle: "Tap the box below to view our suggestions.",
      hotels: [
        {
          name: "The Westin Austin Downtown",
          fullAddress: "Courtyard by Marriott Denton, 2800 Colorado Blvd, Denton, TX 76210",
          query: "Courtyard by Marriott Denton, TX",
        },
        {
          name: "Hotel Indigo Austin",
          fullAddress: "Hampton Inn & Suites Denton, 1513 Centre Place Dr, Denton, TX 76205",
          query: "Hampton Inn and Suites Denton, TX",
        },
        {
          name: "The Driskill",
          fullAddress: "Hilton Garden Inn Denton, 4211 N Interstate 35, Denton, TX 76207",
          query: "Hilton Garden Inn Denton, TX",
        },
        {
          name: "Hyatt Regency Austin",
          fullAddress: "SpringHill Suites by Marriott Denton, 1434 Centre Place Dr, Denton, TX 76205",
          query: "SpringHill Suites by Marriott Denton, TX",
        },
        {
          name: "Fairmont Austin",
          fullAddress: "The Elm, a Ramada by Wyndham, 1100 W Eldorado Pkwy, Little Elm, TX 75068",
          query: "The Elm, a Ramada by Wyndham, Little Elm, TX",
        },
      ],
    },
    contact: {
      title: "Contact",
      email: "rohan.wedding@example.com",
      phone: "+1 (512) 555-0142",
      additional: {
        email: "aarohi.family@example.com",
        phone: "+1 (512) 555-0148",
      },
      note: "For questions about the wedding, please reach out to the couple or their families.",
    },
  },

  venues: [
    {
      id: "bella-cavalli",
      name: "The Royal Palm Courtyard",
      fullAddress: "The Royal Palm Courtyard, Austin, Texas",
      location: "Austin, Texas",
      mapsQuery: "The Royal Palm Courtyard, Austin, Texas",
      note: "Primary wedding venue.",
    },
    {
      id: "the-bliss",
      name: "The Bliss at Aubrey",
      fullAddress: "The Bliss at Aubrey, Austin, Texas",
      location: "Austin, Texas",
      mapsQuery: "The Bliss at Aubrey, Austin, Texas",
      note: "Sangeet venue.",
    },
    {
      id: "airbnb-lakewood-village",
      name: "Pre Wedding Events",
      fullAddress: "316 Parkwood Dr, Lakewood Village, TX 75068",
      location: "Lakewood Village, Texas",
      mapsQuery: "316 Parkwood Dr, Lakewood Village, TX 75068",
      note: "Haldi, Mehendi, and Pellikoduku & Pellikuthuru venue.",
    },
  ],

  rsvp: {
    title: "RSVP",
    subtitle: "We joyfully request the honour of your presence. Please RSVP by November 1, 2026.",
    confirmation:
      "Thank you! Your RSVP has been received. We cannot wait to celebrate with you.",
    /**
      * Leave empty to use /api/rsvp when SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
      * or RESEND_API_KEY is set, or use FormSubmit (browser) as the fallback.
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
     * Vaa Kannamma (Violin Version) by Nikhil Neelakandan.
     * Streamed via YouTube IFrame API —
     * no copyrighted audio file is hosted in this repo.
     */
    youtubeId: "rvnDI7myzZY",
    label: "Vaa Kannamma (Violin Version)",
    artist: "Nikhil Neelakandan",
    defaultVolume: 0.28,
    /** Optional local fallback if youtubeId is removed */
    src: "/audio/wedding-instrumental.wav",
  },

  footer: {
    tagline: "Made with love for our wedding celebration",
    contactEmail: "hello@abhigna-hemanth.wedding",
  },

  seo: {
    title: "Aarohi & Rohan | Wedding Invitation",
    description:
      "You are warmly invited to the wedding of Aarohi and Rohan on April 12, 2027 at The Royal Palm Courtyard, Austin, Texas. Join us for sacred South Indian Hindu wedding celebrations.",
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
