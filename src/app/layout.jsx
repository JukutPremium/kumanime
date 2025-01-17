import "./globals.css";

import { GeistSans } from "geist/font/sans";
// import { GeistMono } from 'geist/font/mono';

export const metadata = {
  title: "Kumanime - Nonton Anime Sub Indo Terlengkap dan Terbaru",
  description:
    "Kumanime adalah platform terbaik untuk nonton anime sub Indo terbaru dan terlengkap dengan kualitas HD. Temukan anime favoritmu dari berbagai genre seperti action, romance, fantasy, dan masih banyak lagi. Streaming gratis, kapan saja dan di mana saja!",
  openGraph: {
    type: "website",
    title: "Kumanime - Nonton Anime Sub Indo Terlengkap & Terbaru",
    description:
      "Kumanime adalah platform terbaik untuk nonton anime sub Indo terbaru dan terlengkap dengan kualitas HD. Temukan anime favoritmu dari berbagai genre seperti action, romance, fantasy, dan masih banyak lagi. Streaming gratis, kapan saja dan di mana saja!",
    url: "https://kumanimeweb.vercel.app", // Sesuaikan dengan URL situs Kumanime
    siteName: "Kumanime",
    images: [
      {
        url: "https://kumanimeweb.vercel.app/banner.jpg", // Gambar sesuai dengan yang disediakan
        width: 800,
        height: 600,
      },
      {
        url: "https://kumanimeweb.vercel.app/banner.jpg", // Gambar dengan resolusi lebih besar
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
      "Kumanime adalah platform terbaik untuk nonton anime sub Indo terbaru dan terlengkap dengan kualitas HD. Temukan anime favoritmu dari berbagai genre seperti action, romance, fantasy, dan masih banyak lagi. Streaming gratis, kapan saja dan di mana saja!",
    siteId: "1234567890", // Ganti dengan ID Twitter yang sesuai
    creator: "@KumanimeOfficial", // Ganti dengan handle Twitter Kumanime jika ada
    creatorId: "1234567890", // Ganti dengan ID Twitter yang sesuai
    images: ["https://kumanimeweb.vercel.app/banner.jpg"], // Ganti dengan URL gambar yang sesuai
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${GeistSans.className} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
