"use client"

import { experiences } from "@/constants";
import { useEffect, useRef, useState } from "react";
import { MdHandshake } from "react-icons/md";
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
      className="w-screen relative h-[180vh] md:h-[130vh] lg:h-[300vh] flex flex-col lg:flex-row"
    >
      <div className="h-screen lg:basis-1/2 lg:sticky lg:top-0 lg:left-0 flex items-center lg:justify-center flex-col px-4 lg:px-12">
        <h2 className="heading leading-tight font-poppins text-left md:text-center lg:text-left">About Me</h2>
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
