import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata = {
  title: {
    template: "%s | Kumanime - Nonton Anime Sub Indo Terlengkap & Terbaru",
    default: "Kumanime - Nonton Anime Sub Indo Terlengkap & Terbaru",
  },
  description:
    "Kumanime adalah platform terbaik untuk nonton anime sub Indo terbaru dan terlengkap dengan kualitas HD. Temukan anime favoritmu dari berbagai genre seperti action, romance, fantasy, dan banyak lagi. Streaming gratis, kapan saja dan di mana saja!",
  openGraph: {
    type: "website",
    title: "Kumanime - Nonton Anime Sub Indo Terlengkap & Terbaru",
    description:
      "Kumanime adalah platform terbaik untuk nonton anime sub Indo terbaru dan terlengkap dengan kualitas HD. Temukan anime favoritmu dari berbagai genre seperti action, romance, fantasy, dan banyak lagi. Streaming gratis, kapan saja dan di mana saja!",
    url: baseUrl, // Use the baseUrl here
    siteName: "Kumanime",
    images: [
      {
        url: `${baseUrl}/banner.jpg`, // Image for the open graph
        width: 800,
        height: 600,
        alt: "Kumanime Banner",
      },
      {
        url: `${baseUrl}/banner.jpg`, // Larger resolution image
        width: 1800,
        height: 1600,
        alt: "Kumanime Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kumanime - Nonton Anime Sub Indo Terlengkap & Terbaru",
    description:
      "Kumanime adalah platform terbaik untuk nonton anime sub Indo terbaru dan terlengkap dengan kualitas HD. Temukan anime favoritmu dari berbagai genre seperti action, romance, fantasy, dan banyak lagi. Streaming gratis, kapan saja dan di mana saja!",
    images: [`${baseUrl}/banner.jpg`], // Use the correct image URL for Twitter card
  },
  metadataBase: new URL(baseUrl), // Set the base URL here
};

export const viewport = {
  themeColor: "#39FF14", // You can change this to a color that suits the Kumanime brand
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-black antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
