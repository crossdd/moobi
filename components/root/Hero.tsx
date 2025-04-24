"use client";
import React from "react";
import { Spotlight } from "@/components/ui/spotlight";

const Hero = () => {
  return (
    <section id="hero" className="h-screen w-full rounded-md flex items-center justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight />
    </section>
  );
}

export default Hero;