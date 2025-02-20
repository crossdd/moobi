import { projects } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLocationArrow } from "react-icons/fa6";
import AnimatedText from "../AnimatedText";
import { PinContainer } from "../ui/3d-pin";

const RecentProjects = () => {
  return (
    <section id="projects" className="py-12 mt-10 w-full overflow-hidden">
      <AnimatedText
        title={
          <>
            A small selection of{" "}
            <span className="text-special">Recent Projects</span>
          </>
        }
        otherClasses="sm:max-w-[70vw] lg:max-w-[60vw] mx-auto"
      />

      <div className="flex-center flex-wrap gap-x-24 lg:gap-y-6">
        {projects.map(({ id, title, des, thumbnail, technologies, liveUrl, githubUrl }) => (
          <PinContainer
            key={id}
            title={title}
            containerClassName="flex-center w-[80vw] h-[32rem] sm:w-[570px] sm:h-[30rem] md:h-[32rem] lg:h-[32.5rem]"
          >
            <div className="relative flex items-center justify-center sm:w-[570px] w-[80vw] h-[30vh] md:h-[35vh] overflow-hidden mb-10">
              <div className="relative h-full w-full overflow-hidden lg:rounded-3xl bg-[#13162d]">
                <Image
                  src="/images/bg.png"
                  alt="bg-img"
                  width={100}
                  height={100}
                />
              </div>
              <Image
                src={thumbnail}
                alt={title}
                width={400}
                height={400}
                loading="lazy"
                className="z-10 absolute bottom-0 w-full h-full rounded-2xl object-cover"
              />
            </div>
            <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1 text-black-100 dark:text-white">
              {title}
            </h1>
            <p className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2 text-black-100 dark:text-gray-100">
              {des}
            </p>

            <div className="flex items-center justify-between mt-7 mb-3">
              <div className="flex items-center">
                {technologies.map((tech, index) => (
                  <div
                    key={tech.title}
                    className="border border-white/[0.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                    style={{
                      transform: `translateX(-${5 * index * 2}px)`,
                    }}
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
                {githubUrl && (
                  <Link
                    href={githubUrl}
                    target="_blank"
                    className="flex justify-center items-center"
                  >
                    <span className="flex lg:text-xl md:text-xs text-sm text-black-100 dark:text-purple">
                      View Code
                    </span>
                    <FaGithub className="ms-2 fill-[#000319] dark:fill-purple" />
                  </Link>
                )}

                {liveUrl && (
                  <Link
                    href={liveUrl}
                    target="_blank"
                    className="flex justify-center items-center"
                  >
                    <span className="flex lg:text-xl md:text-xs text-sm text-black-100 dark:text-purple">
                      Live Site
                    </span>
                    <FaLocationArrow className="ms-2 fill-[#000319] dark:fill-purple" />
                  </Link>
                )}
              </div>
            </div>
          </PinContainer>
        ))}
      </div>
    </section>
  );
};

export default RecentProjects;
