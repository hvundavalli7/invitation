import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Tangerine } from "next/font/google";
import { weddingData } from "@/data/wedding";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const tangerine = Tangerine({
  variable: "--font-tangerine",
  subsets: ["latin"],
  weight: ["400", "700"],
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
  themeColor: "#2c1810",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${tangerine.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
