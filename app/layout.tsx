import type { Metadata } from "next";
import { Outfit, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { NoiseOverlay } from "@/components/atmosphere/NoiseOverlay";

const outfit = Outfit({
  weight: ["700", "800"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: "italic",
  variable: "--font-accent",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FairRent — Accountability for Rentals",
  description: "Replacing blind trust with accountability.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${playfair.variable} ${inter.variable} min-h-screen antialiased font-body`}
      >
        {children}
        <NoiseOverlay />
      </body>
    </html>
  );
}
