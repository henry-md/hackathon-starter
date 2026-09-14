import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const basel = localFont({
  src: "./fonts/Basel-Grotesk-Essential-Variable-DLsVmAqn.woff2",
  variable: "--font-basel",
  weight: "100 900",
  display: "swap",
  fallback: ["Arial"],
  adjustFontFallback: false,
});

const featureDeck = localFont({
  src: "./fonts/FeatureDeck-Regular-Web-BDk3ax68.woff2",
  variable: "--font-feature-deck",
  weight: "400",
  display: "swap",
  fallback: ["Times New Roman"],
  adjustFontFallback: false,
});

const featureDisplay = localFont({
  src: "./fonts/FeatureDisplay-Regular-Web-DeS-3LWM.woff2",
  variable: "--font-feature-display",
  weight: "400",
  display: "swap",
  fallback: ["Times New Roman"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "CD&R Hackathon",
  description: "A workspace for turning ideas into working demos.",
  icons: { icon: "/cdr-logo.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${basel.variable} ${featureDeck.variable} ${featureDisplay.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
