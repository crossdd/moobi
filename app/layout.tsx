import type { Metadata } from "next";
import "./globals.css";

// import { SpeedInsights } from "@vercel/speed-insights/next"
// import { Analytics } from "@vercel/analytics/react"

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

  // openGraph: {
  //   title: "Epiphanus Onyeso",
  //   description:
  //     "Fullstack developer based in Nigeria. I specialize in building web applications using Next.js, React, Typescript, GraphQL and PostgreSQL. I am available for collaborations.",
  //   url: "https://epiphanusonyeso.vercel.app",
  //   siteName: "Epiphanus Onyeso",
  //   images: [
  //     {
  //       url: "/og-image.png",
  //       width: 1200,
  //       height: 630,
  //       alt: "Epiphanus Onyeso",
  //     },
  //   ],
  // },
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
        {/* <SpeedInsights />
        <Analytics /> */}
      </body>
    </html>
  );
}
