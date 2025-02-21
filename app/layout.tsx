import type { Metadata } from "next";
import "./globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: "Epiphanus Onyeso",
  description: "Frontend web developer based in Nigeria",
  keywords: [
    "next.js",
    "react",
    "typescript",
    "postgresql",
    "remote",
    "freelancer",
    "freelance web developer",
    "Nigeria",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
