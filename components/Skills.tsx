'use client'

import { skills } from "@/constants";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { SkillRings } from "./SkillRings";
import { Button } from "./ui/button";

type Skill = "frontend" | "backend" | "tools"

const Skills = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [skillToShow, setSkillToShow] = useState<Skill>("backend");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleToggle = (skill: Skill) => {
    if (skill === skillToShow) return

    setIsCollapsed(true);
    setIsTransitioning(true);

    // Wait for collapse animation
    setTimeout(() => {
      setSkillToShow(skill);

      // Wait before expanding
      setTimeout(() => {
        setIsCollapsed(false);

        // Reset transition state after animation completes
        setTimeout(() => {
          setIsTransitioning(false);
        }, 500);
      }, 600);
    }, 500);
  };

  const currentSkills = skillToShow === 'frontend' ? skills.frontend : skillToShow === 'backend' ? skills.backend : skills.tools

  return (
    <div className="flex-center flex-col lg:flex-row-reverse gap-12 h-svh">
      <div className="flex-center relative flex-col gap-7 w-full lg:basis-[45%] h-full">
        <h2 className="heading capitalize">My tech stack</h2>

        <div className="flex gap-4">
          {Object.keys(skills).map((skill) => (
            <StackButton
              key={skill}
              skill={skill as Skill}
              skillToShow={skillToShow}
              isTransitioning={isTransitioning}
              handleToggle={handleToggle}
            />
          ))}
        </div>
      </div>

      <div className="flex-center flex-col h-fit mx-auto scale-75 md:scale-90 lg:scale-100 w-full
       lg:basis-[55%] xl:mt-0 gap-36">
        <div className="flex-center h-[23rem] w-[23rem] md:h-[30rem] md:w-[30rem] bg-[#326FB7] rounded-full ">
          <div className="relative bg-[#12153E] w-72 h-72 flex items-center justify-center rounded-full">
            <h2 className="relative z-10 flex-center capitalize w-60 h-60 rounded-full text-center text-white font-exo text-xl lg:text-xl">
              {skillToShow}
            </h2>

            {currentSkills.map((skill, i) => (
              <SkillRings
                key={i}
                index={i}
                borderRadius="9999px"
                duration={4000}
                containerClassName={cn("rounded-full flex-center absolute w-72 h-72 bg-[#12153E] overflow-hidden", {
                  "-top-[50%] -left-36": i === 0,
                  "-top-[50%] -right-36": i === 1,
                  "-bottom-[50%] -left-36": i === 2,
                  "-bottom-[50%] -right-36": i === 3
                })}

                isCollapsed={isCollapsed}
                className="flex items-center justify-center bg-purple w-48 h-48 text-center text-xl font-semibold tracking-wide rounded-full"
              >
                {skill}
              </SkillRings>
            )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;

const StackButton = (
  {
    skill,
    skillToShow,
    isTransitioning,
    handleToggle
  }: {
    skill: Skill,
    skillToShow: Skill,
    isTransitioning: boolean,
    handleToggle: (skill: Skill) => void
  }) => (
  <Button
    onClick={() => handleToggle(skill)}
    disabled={isTransitioning || skillToShow === skill}
    className={cn("capitalize p-3 w-24 h-12 text-base shadow-sm shadow-black-100 text-gray-950 disabled:opacity-80", {
      "shadow-inner": skillToShow === skill
    })}
  >
    {skill}
  </Button>
)