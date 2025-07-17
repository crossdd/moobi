import {projects} from "@/constants";
import ProjectCard from "./ProjectCard";
import {BrowserBookmarkProps} from "@/types";

const RecentProjects = (props: BrowserBookmarkProps) => {
  return (
    <section
      id="projects"
      className="flex-center flex-col px-3 mt-3 w-full overflow-hidden"
    >
      <h2 className="heading text-center">
       Recent Projects
      </h2>

      <div
        className="flex-center flex-wrap w-full gap-12 py-5">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            {...props}
          />
        ))}
      </div>
    </section>
  );
};

export default RecentProjects;
