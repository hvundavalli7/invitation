import type { Metadata, Viewport } from "next";
import { weddingData } from "@/data/wedding";
import "./globals.css";

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
  themeColor: "#143820",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
