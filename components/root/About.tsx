"use client"

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { experiences } from "@/constants";
import { MdHandshake } from "react-icons/md";
import MagicButton from "./MagicButton";
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
      className="w-full relative h-[240vh] xs:h-[190vh] sm:h-[220vh] md:h-[300vh] flex flex-col md:flex-row gap-8"
    >
      <div className="h-screen md:basis-2/3 lg:basis-1/2 md:sticky md:top-0 md:left-0 flex items-center md:justify-center flex-col px-4 md:px-12">
        <h2 className="heading leading-tight font-poppins">About Me</h2>
        <div className="max-w-3xl text-[17px] md:text-xl mt-8 text-left leading-relaxed tracking-wide">
          I&apos;m a full-stack developer specializing in React, Next.js, and Tailwind CSS for sleek, high-performance frontend. On the backend, I work with GraphQL, Prisma, and PostgresSQL, ensuring scalable and secure applications

          <br />

          <p className="mt-3">
            I&apos;ve honed a diverse set of skills that allow me to build complete, scalable web applications. I strive to stay up-to-date with modern technologies to create efficient and elegant solutions for businesses and individuals.
          </p>

          <Link href="mailto:epiphanusonyeso05@gmail.com">
            <MagicButton
              title="Let's connect"
              icon={<MdHandshake />}
              position="right"
            />
          </Link>
        </div>
      </div>

      <div className="relative md:h-screen md:basis-1/3 flex flex-col gap-4 p-4 md:p-0 md:sticky md:top-0">
        <h2 className="heading leading-tight font-poppins mb-8 md:hidden text-center">My journey</h2>

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
