"use client"

import { experiences } from "@/constants";
import { useEffect, useRef, useState } from "react";
import { MdExplore } from "react-icons/md";
import MagicButton from "./MagicButton";
import Link from "next/link";
import ExperienceCard from "./ExperienceCard";

const About = () => {
  const [awayCards, setAwayCards] = useState<boolean[]>([false, false, false, false])
  const stackAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (stackAreaRef.current) {
        const distance = window.innerHeight * 0.5
        const topVal = stackAreaRef.current.getBoundingClientRect().top
        const index = Math.floor(-1 * (topVal / distance + 1))

        setAwayCards((prevAwayCards) => prevAwayCards.map((_, i) => i <= index))
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section
      id="about"
      ref={stackAreaRef}
      className="w-screen relative h-[180vh] lg:h-[300vh] flex flex-col lg:flex-row"
    >
      <div className="h-screen lg:basis-1/2 lg:sticky lg:top-0 lg:left-0 flex lg:justify-center flex-col px-4 lg:px-12">
        <h2 className="heading leading-tight font-poppins text-left">About Me</h2>
        <div className="max-w-2xl font-poppins text-[17px] lg:text-xl mt-8 text-left leading-relaxed">
          From a curious student to a seasoned developer, my journey in the world of web development has been filled
          with continuous learning and exciting challenges. Each step has shaped my skills and perspective.

          <br />

          <p className="mt-3">
            As a full-stack developer, I&apos;ve honed a diverse set of skills that allow me to build complete, scalable web
            applications. From crafting intuitive user interfaces to designing robust backend systems, I bring a
            comprehensive approach to every project.
          </p>

          <Link href="#projects">
            <MagicButton title="Explore My Work" icon={<MdExplore />} position="right" />
          </Link>
        </div>
      </div>

      <div className="relative lg:h-screen lg:basis-1/2 flex flex-col gap-4 p-4 lg:p-0 lg:sticky lg:top-0">
        {experiences.map((card, index) => (
          <ExperienceCard
            key={index}
            index={index}
            card={card}
            awayCards={awayCards}
          />
        ))}
      </div>
    </section>
  );
};

export default About;
