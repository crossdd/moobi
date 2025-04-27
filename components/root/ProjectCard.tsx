import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLocationArrow } from "react-icons/fa6";

type ProjectCardProps = {
  project: {
    id: string;
    title: string;
    des: string;
    thumbnail: string;
    technologies: {
      title: string;
      icon: string;
    }[];
    liveUrl: string;
    githubUrl: string;
  }
}

const ProjectCard = ({
  project,
}: ProjectCardProps) => {
  return (
    <div className=
      "flex-center w-[80vw] sm:w-[470px] lg:w-[400px] xl:w-[570px]  xxs:h-[27.5rem] sm:h-[24rem] md:h-[32rem] lg:h-[34.5rem] xl:h-[27rem] relative group/pin z-50 "
    >
      <div
        className="relative flex flex-col gap-6 w-full p-3 rounded-2xl border border-white/[0.1] group-hover/pin:border-violet-500/[0.8] group-hover/pin:shadow-lg group-hover/pin:shadow-violet-300 transition duration-700 overflow-hidden"
      >
        <div className="relative flex-center w-full h-[30vh] md:h-[26vh] lg:h-[30vh] overflow-hidden">
          <Image
            src={project.thumbnail || "/images/bg.png"}
            alt={project.title}
            width={400}
            height={400}
            loading="lazy"
            className="w-full h-full rounded-2xl object-cover"
          />
        </div>

        <div className="tracking-wide leading-relaxed">
          <h2 className="font-bold line-clamp-1 text-gray-100 text-lg">
            {project.title}
          </h2>
          <p className="font-light text-base line-clamp-3 text-gray-300">
            {project.des}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {project.technologies.map((tech, index) => (
              <div
                key={tech.title}
                className="border border-white/[0.1] bg-black rounded-full w-8 h-8 flex-center"
                style={{
                  transform: `translateX(-${5 * index * 2}px)`,
                }}
                title={tech.title}
              >
                <Image
                  src={tech.icon}
                  alt={tech.title}
                  width={50}
                  height={50}
                  className="p-2"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target="_blank"
                className="flex-center border border-white/[0.1] rounded-lg p-1"
              >
                <FaGithub fill="white" />
              </Link>
            )}

            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                className="flex-center"
              >
                <span className="text-sm text-lime-50">
                  Live Site
                </span>
                <FaLocationArrow fill="#8b5cf6" className="ms-1" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard