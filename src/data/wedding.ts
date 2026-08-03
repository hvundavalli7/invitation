/**
 * Centralized wedding information.
 * Edit this file to update names, dates, venues, and copy across the site.
 */

export const weddingData = {
  couple: {
    bride: "Abhigna",
    groom: "Hemanth",
    displayName: "Abhigna & Hemanth",
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
      "Together with our families, we invite you to witness our sacred Hindu wedding ceremony and celebrate the beginning of our forever.",
  },

  hero: {
    ctaLabel: "View Celebrations",
    ctaHref: "#celebrations",
    /** Set once couple photos are added under /public/images/couple/ */
    image: "/images/couple/hero.jpg",
    imageAlt: "Abhigna and Hemanth on the beach",
  },

  scratchCard: {
    prompt: "Scratch to Reveal Our Wedding Invitation",
    skipLabel: "Skip and Enter",
    revealThreshold: 0.55,
  },

  countdown: {
    endedMessage: "The Celebration Has Begun!",
  },

  events: [
    {
      id: "mehendi",
      name: "Mehendi",
      dateLabel: "March 9, 2027",
      time: "9:00 AM · Morning",
      venue: "To be announced",
      location: "Aubrey, Texas",
      address: "", // Add verified address when available
      mapsQuery: "Aubrey, Texas",
      description:
        "Join us for a joyful morning filled with intricate henna, music, laughter and the beginning of our wedding celebrations.",
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
        "An evening of music, dance and celebration as our families come together before the wedding.",
      motif: "sangeet" as const,
      icon: "music",
    },
    {
      id: "haldi-pellikoduku-pellikuthuru",
      name: "Haldi & Pellikoduku–Pellikuthuru",
      dateLabel: "March 10, 2027",
      time: "7:00 AM onwards",
      venue: "To be announced",
      location: "Aubrey, Texas",
      address: "", // Add verified address when available
      mapsQuery: "Aubrey, Texas",
      description:
        "A vibrant traditional ceremony filled with turmeric, blessings, laughter and love — including the cherished Telugu Pellikoduku–Pellikuthuru rites where the bride and groom receive blessings from their families before beginning their new journey.",
      motif: "haldi" as const,
      icon: "turmeric",
      subEvents: [
        {
          name: "Haldi",
          description:
            "A vibrant traditional ceremony filled with turmeric, blessings, laughter and love.",
        },
        {
          name: "Pellikoduku–Pellikuthuru",
          description:
            "A cherished Telugu pre-wedding tradition where the bride and groom receive blessings from their families before beginning their new journey.",
        },
      ],
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
        "Together with our families, we invite you to witness our sacred Hindu wedding ceremony and celebrate the beginning of our forever.",
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
    photos: [
      {
        id: "story-1",
        alt: "Abhigna and Hemanth embracing on the beach",
        src: "/images/couple/embrace.jpg",
        caption: "Abhigna & Hemanth",
      },
      {
        id: "story-2",
        alt: "The proposal moment on the beach",
        src: "/images/couple/proposal.jpg",
        caption: "The Proposal",
      },
    ],
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
      email: "hello@abhigna-hemanth.wedding", // Update with real contact
      phone: "+1 (XXX) XXX-XXXX", // Update with real contact
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
    /** Set to Formspree / API endpoint when ready. Leave empty for local confirmation demo. */
    endpoint: "",
    events: [
      { id: "mehendi", label: "Mehendi" },
      { id: "sangeet", label: "Sangeet" },
      { id: "haldi", label: "Haldi" },
      { id: "pellikoduku-pellikuthuru", label: "Pellikoduku–Pellikuthuru" },
      { id: "wedding", label: "Wedding" },
    ],
    mealOptions: ["Vegetarian", "Non-Vegetarian", "Vegan", "No Preference"],
  },

  gallery: {
    title: "Gallery",
    subtitle: "Moments from our journey — engagement, portraits, and forever.",
    images: [
      {
        id: "g1",
        src: "/images/couple/hero.jpg",
        alt: "Walking hand in hand on the beach at sunset",
        category: "Engagement",
      },
      {
        id: "g2",
        src: "/images/couple/forehead-kiss.jpg",
        alt: "A tender forehead kiss by the shore",
        category: "Couple",
      },
      {
        id: "g3",
        src: "/images/couple/dance.jpg",
        alt: "Dancing together on the coastal cliffs",
        category: "Pre-wedding",
      },
      {
        id: "g4",
        src: "/images/couple/proposal.jpg",
        alt: "The proposal with white roses on the beach",
        category: "Engagement",
      },
      {
        id: "g5",
        src: "/images/couple/embrace.jpg",
        alt: "Foreheads together, smiling on the beach",
        category: "Couple",
      },
    ],
  },

  music: {
    src: "/audio/wedding-instrumental.wav",
    label: "Traditional instrumental music",
    defaultVolume: 0.28,
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
    ogImage: "/images/couple/hero.jpg",
  },
} as const;

export type EventMotif = "mehendi" | "sangeet" | "haldi" | "wedding";

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
  motif: EventMotif;
  icon: string;
  subEvents?: ReadonlyArray<{
    name: string;
    description: string;
  }>;
};

export type WeddingData = typeof weddingData;

export function mapsSearchUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function mapsDirectionsUrl(query: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}
