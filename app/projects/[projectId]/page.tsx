import BackButton from "@/components/BackButton";
import { ProjectImages } from "@/components/ProjectImages";
import { Button } from "@/components/ui/button";
import { projects } from "@/constants";
import { ExternalLink } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaGithub } from "react-icons/fa6";

type Params = {
    params: Promise<{ [key: string]: string }>;
}

export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
    const param = await params;

    const project = projects.find(project => project.id === param.projectId)

    if (!project) return {
        title: "Project could not be found"
    }

    return {
        title: `Epiphanus Onyeso Project | ${project?.title}`
    }
}

const ProjectDetails = async ({ params }: Params) => {
    const param = await params;

    const project = projects.find(project => project.id === param.projectId)

    if (!project) notFound();

    return (
        <div className="container mx-auto px-6 py-10 lg:py-12 lg:px-4">
            <BackButton />

            <div className="grid md:grid-cols-2 gap-12 items-start mt-4 lg:mt-8">
                <div className="space-y-6 text-gray-700">
                    <h1 className="heading">{project.title}</h1>
                    <p className="text-xl ">{project.des}</p>
                    <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                            <span key={tech.title} className="px-3 py-1 border border-gray-700  rounded-full text-sm">
                                {tech.title}
                            </span>
                        ))}
                    </div>

                    <p className="">{project.des}</p>

                    <div className="flex gap-4">
                        <Button variant="outline" className="rounded-xl p-2 ">
                            <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View Live
                            </Link>
                        </Button>
                        <Button className="bg-black-100 rounded-xl p-2 text-gray-200">
                            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                <FaGithub className="mr-2 h-4 w-4" />
                                View on GitHub
                            </Link>
                        </Button>
                    </div>
                </div>

                <ProjectImages title={project.title} images={project.thumbnail} />
            </div>
        </div>
    )
}

export default ProjectDetails