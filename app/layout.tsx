import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import ProvidersWrapper from "@/components/ProvidersWrapper";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Moobi",
  description:
    "Experience a fully interactive mobile phone inside your browser. Browse, call, text, and launch apps — all in one virtual interface.",
  keywords: [
    "Moobi",
    "virtual phone",
    "web phone emulator",
    "simulated smartphone",
    "virtual mobile OS",
    "web apps",
    "browser-based phone",
    "UI simulation",
    "digital phone interface",
  ],
  icons: {
    icon: "/images/logo.png",
  },
  openGraph: {
    title: "Moobi",
    description:
      "Experience a fully interactive mobile phone inside your browser. Browse, call, text, and launch apps — all in one virtual interface.",
    url: "https://epiphanusonyeso.vercel.app",
    siteName: "Moobi",
    images: [
      {
        url: "https://moobi.vercel.app/images/logo.png",
        width: 650,
        height: 300,
        alt: "Moobi",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black antialiased">
        <ProvidersWrapper>
          <Analytics />
          <SpeedInsights />
          {children}
        </ProvidersWrapper>
      </body>
    </html>
  );
}
