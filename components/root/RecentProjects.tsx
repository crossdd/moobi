import { projects } from "@/constants";
import ProjectCard from "./ProjectCard";

const RecentProjects = () => {
  return (
    <section
      id="projects"
      className="flex-center flex-col xxs:gap-10 xsx:my-14 xxs:my-12 md:my-28 lg:my-20 w-full overflow-hidden"
    >
      <h2 className="heading text-center w-full md:max-w-[70vw] lg:max-w-[60vw] px-5">
        A small selection of{" "}
        <span className="text-special">Recent Projects</span>
      </h2>

      <div
        className="flex-center flex-wrap w-full gap-12 py-5">
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
