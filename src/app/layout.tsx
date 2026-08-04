import type { Metadata, Viewport } from "next";
import {
  Cinzel,
  Cinzel_Decorative,
  Cormorant_Garamond,
  Great_Vibes,
  Lora,
} from "next/font/google";
import { weddingData } from "@/data/wedding";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const cinzelDecorative = Cinzel_Decorative({
  variable: "--font-cinzel-dec",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const { seo, couple, wedding } = weddingData;

export const metadata: Metadata = {
  metadataBase: new URL(seo.siteUrl),
  title: seo.title,
  description: seo.description,
  keywords: [
    "South Indian wedding",
    "Hindu wedding invitation",
    "Telugu wedding",
    couple.bride,
    couple.groom,
    wedding.venue,
    "Aubrey Texas wedding",
  ],
  authors: [{ name: `${couple.bride} & ${couple.groom}` }],
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: seo.siteUrl,
    siteName: seo.title,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: seo.ogImage,
        width: 1200,
        height: 630,
        alt: `${couple.displayName} Wedding Invitation`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: [seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#7b1e2b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cinzelDecorative.variable} ${cormorant.variable} ${lora.variable} ${greatVibes.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
