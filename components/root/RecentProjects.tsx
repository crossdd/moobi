import { projects } from "@/constants";
import AnimatedText from "./AnimatedText";
import ProjectCard from "./ProjectCard";

const RecentProjects = () => {
  return (
    <section
      className="flex flex-col xxs:gap-10 xxs:my-28 xs:my-0 lg:my-10 w-full overflow-hidden"
    >
      <AnimatedText
        title={
          <>
            A small selection of{" "} <br />
            <span className="text-special">Recent Projects</span>
          </>
        }
        otherClasses="sm:max-w-[70vw] lg:max-w-[60vw] mx-auto"
      />

      <div
        id="projects"
        className="flex-center flex-wrap w-full gap-x-24 gap-y-12">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </div>
    </section>
  );
};

export default RecentProjects;
