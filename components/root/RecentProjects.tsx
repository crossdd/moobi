import { projects } from "@/constants";
import AnimatedText from "./AnimatedText";
import ProjectCard from "./ProjectCard";

const RecentProjects = () => {
  return (
    <section
      id="projects"
      className="py-12 my-10 w-full overflow-hidden"
    >
      <AnimatedText
        title={
          <>
            A small selection of{" "}
            <span className="text-special">Recent Projects</span>
          </>
        }
        otherClasses="sm:max-w-[70vw] lg:max-w-[60vw] mx-auto"
      />

      <div className="flex-center flex-wrap w-full gap-x-24 gap-y-12">
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
