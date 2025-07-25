import Image from "next/image";
import {FaLocationArrow} from "react-icons/fa6";

import {CardBody, CardContainer, CardItem} from "@/components/ui/3d-card";
import {cn, getTechIcon} from "@/lib/utils";
import {type Project} from "@/types";
import {useMedia} from "@/context/MediaContext";

const ProjectCard = ({project}: { project: Project }) => {
    const {setProjectId} = useMedia()

    const handleClick = () => {
        setProjectId(project.id)
    }

  return (
    <CardContainer>
      <CardBody className="relative group/card  hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-black border-white/[0.2] w-auto h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-white"
        >
          {project.title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-sm max-w-sm mt-2 text-neutral-300 line-clamp-3"
        >
          {project.description}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={project.thumbnail || "/images/bg.png"}
            alt={project.title}
            width={400}
            height={400}
            loading="lazy"
            className="w-full h-full rounded-2xl object-cover"
          />
        </CardItem>

        <div className="flex justify-between items-center mt-10">
          <CardItem
            translateZ={20}
            className="flex"
          >
            {project.technologies.map((tech, index) => (
              <div
                key={tech}
                className="ring-1 ring-white/[0.1] bg-black rounded-full w-8 h-8 flex-center"
                style={{
                  transform: `translateX(-${5 * index * 2}px)`,
                }}
                title={tech}
              >
                <Image
                  src={getTechIcon(tech)}
                  alt={tech}
                  width={50}
                  height={50}
                  loading="lazy"
                  className={cn("w-full h-auto object-center object-cover p-2", tech === 'Prisma' && "invert fill-white")}
                />
              </div>
            ))}
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold flex items-center w-fit"
          >
              <span onClick={handleClick}>View</span>
              <FaLocationArrow className="ml-2" />
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default ProjectCard