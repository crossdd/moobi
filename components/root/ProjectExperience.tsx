import { Tabs } from "../ui/tabs";

const ProjectExperience = ({ tabs }: { tabs: any }) => {
    return (
        <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-40">
            <Tabs tabs={tabs} />
        </div>
    );
}

export default ProjectExperience