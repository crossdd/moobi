import type {Metadata} from "next";
import "./globals.css";
import {MediaProvider} from "@/context/MediaContext";
import React from "react";

export const metadata: Metadata = {
  title: "Epiphanus Onyeso",
  description: "Fullstack developer based in Nigeria. I specialize in building web applications using Next.js, React, Typescript, GraphQL and PostgreSQL. I am available for collaborations.",
  keywords: [
    "next.js developer",
    "react developer",
    "typescript developer",
    "postgresql",
    "graphql",
    "fullstack developer",
    "fullstack web developer",
    "web developer",
    "web development",
    "software engineer",
    "software development",
    "software engineer in Nigeria",
    "remote",
    "freelancer",
    "freelance web developer",
  ],

  icons: {
    icon: "/images/logo.png"
  },

  openGraph: {
    title: "Epiphanus Onyeso",
    description:
      "I specialize in building web and mobile applications using Next.js, React, React Native, Typescript, GraphQL and PostgreSQL.",
    url: "https://epiphanusonyeso.vercel.app",
    siteName: "Epiphanus Onyeso",
    images: [
      {
        url: "https://epiphanusonyeso.vercel.app/images/logo.png",
        width: 650,
        height: 300,
        alt: "Epiphanus Onyeso",
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
    <html lang="en">
      <body className="antialiased bg-black">
        <MediaProvider>
            {children}
          {/*<Analytics />*/}
          {/*<SpeedInsights />*/}
        </MediaProvider>
      </body>
    </html>
  );
}
