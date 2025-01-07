import "./globals.css";

import { Geist } from "next/font/google";

const font = Geist({
  subsets: ["latin"],
});

export const metadata = {
  title: "Kumanime",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${font.className} antialiased`}>
      <body>{children}</body>
    </html>
  );
}