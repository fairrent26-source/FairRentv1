import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { DevPanelButton, DevPanelModal } from "@/components/devtools/DevPanel";
import { NoiseOverlay } from "@/components/atmosphere/NoiseOverlay";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
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
    <html lang="en" className={`dark ${inter.variable} ${playfair.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-obsidian text-ivory antialiased font-sans">
        {children}
        <NoiseOverlay />
        <DevPanelButton />
        <DevPanelModal />
      </body>
    </html>
  );
}
