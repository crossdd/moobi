import { Footer, SocialLinks } from "@/components/root";
import BackButton from "@/components/root/BackButton";
import MagicButton from "@/components/root/MagicButton";
import ProjectExp from "@/components/root/ProjectExp";
import { projects } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LuExternalLink, LuGithub } from "react-icons/lu";

const ProjectDetailsPage = async ({ params }: { params: Promise<{ [key: string]: string }> }) => {
    const { id } = await params

    const project: Project | undefined = projects.find(project => project.id === id)

    if (!project) {
        return notFound()
    }

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div
                className="absolute inset-0 opacity-25"
                style={{
                    backgroundImage: `radial-gradient(circle, #333 1px, transparent 1px)`,
                    backgroundSize: "20px 20px",
                }}
            />

            <SocialLinks />

            <div className="relative z-10">
                {/* Header */}
                <div className="p-4">
                    <BackButton />
                </div>

                {/* Project Hero */}
                <section className="px-6 py-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                        <div>
                            {/* <div className="mb-4 bg-violet-500/55 text-neutral-300 px-4 py-2 rounded-full font-semibold text-sm w-16">{project.team ? 'Team' : 'Solo'}</div> */}

                            <h1 className="text-5xl lg:text-6xl font-bold mb-4">
                                <span
                                    className="text-transparent stroke-white stroke-2"
                                    style={{
                                        WebkitTextStroke: "2px white",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    {project.title.split(" ")[0]}
                                </span> {" "}
                                <span className="text-white">{project.title.split(" ").slice(1).join(" ")}</span>
                            </h1>

                            <p className="text-xl text-gray-300 mb-6">{project?.subtitle}</p>
                            <p className="text-gray-400 leading-relaxed mb-8">{project.description}</p>

                            <div className="flex gap-4 ">
                                <Link
                                    href={project.liveUrl}
                                    target="_blank"
                                    className="flex items-center max-w-52"
                                >
                                    <MagicButton
                                        title="View Live"
                                        icon={<LuExternalLink />}
                                        position="left"
                                        otherClasses="mt-0"
                                        animate
                                    />
                                </Link>
                                <Link
                                    href={project.githubUrl}
                                    target="_blank"
                                    className="flex items-center gap-2 border border-gray-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                                >
                                    <LuGithub className="w-4 h-4" />
                                    <span className="xsx:hidden xs:flex">Source</span> Code
                                </Link>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple to-walnut-300 rounded-2xl blur-xl opacity-30"></div>
                            <Image
                                src={project.thumbnail}
                                alt={project.title}
                                width={600}
                                height={600}
                                priority
                                className="relative rounded-2xl w-full shadow-2xl"
                            />
                        </div>
                    </div>
                </section>

                <section className="xsx:h-[29rem] xxs:h-[28rem] xs:h-[26.7rem] px-8 lg:px-24 py-12 mb-12 max-w-4xl [perspective:1000px] relative">
                    <ProjectExp
                        project={project}
                    />
                </section>

                <Footer />
            </div>
        </div>
    )
}

export default ProjectDetailsPage