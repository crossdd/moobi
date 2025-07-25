import {HoverEffect} from "@/components/ui/card-hover-effect";
import {projects, socialMediaPlatforms} from "@/constants";
import {cn, getTechIcon} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";
import {LuExternalLink, LuGithub} from "react-icons/lu";
import {type Project} from "@/types";
import SpecialText from "@/components/screens/browser/browser-bookmark/SpecialText";
import {Navbar} from "@/components/screens/browser/browser-bookmark/index";
import React from "react";

const ProjectInfo = ({ projectId }: { projectId: string }) => {
    const project: Project | undefined = projects.find(project => project.id === projectId)

    if (!project) {
        return notFound()
    }

    const features = [
        {
            title: "Features",
            contents: project.features
        },
        {
            title: "Challenges",
            contents: project.challenges
        },
        {
            title: "Knowledge Gained",
            contents: project.learnings
        },
    ]

    return (
        <>
            <Navbar />

            <div
                className="absolute inset-0 opacity-35"
                style={{
                    backgroundImage: `radial-gradient(circle, #333 1px, transparent 1px)`,
                    backgroundSize: "20px 20px",
                }}
            />

            <div className="relative z-10 flex-center flex-col gap-6 px-4">
                <div className="flex flex-col gap-12 mt-24">
                    <div>
                        <SpecialText text={project.title} as="h1" className="heading !text-5xl mb-4 flex gap-2" />

                        <p className="text-base text-gray-400 tracking-wide leading-relaxed">{project.description}</p>

                        <h2 className="text-lg text-white mt-6 mb-4">Technologies Used:</h2>
                        <div className="flex items-center w-full flex-wrap gap-4">
                            {project.technologies.map((tech, index) => (
                                <div key={index} className="flex items-center border border-neutral-700 rounded-full pr-4">
                                    <div
                                        className="bg-black rounded-full w-8 h-8 flex-center border-r border-white/10"
                                        title={tech}
                                    >
                                        <Image
                                            src={getTechIcon(tech)}
                                            alt={tech}
                                            width={50}
                                            height={50}
                                            loading="lazy"
                                            className={cn("w-full h-auto object-center object-cover p-2", tech === 'Prisma' && "invert")}
                                        />
                                    </div>

                                    <p className="text-sm text-gray-400 pl-2">{tech}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <HoverEffect items={features} />

                    <div className="flex flex-col flex-1 w-full gap-4">
                        <button className="shimmer-btn flex-center !rounded-xl text-white py-3">
                            <Link
                                href={project.liveUrl}
                                target="_blank"
                                className="flex items-center gap-2"
                            >
                                <LuGithub />
                                <span>Source Code</span>
                            </Link>
                        </button>
                        <button className="relative py-3 rounded-xl  bg-black text-white text-sm border border-gray-700 flex-center">
                            <Link
                                href={project.liveUrl}
                                target="_blank"
                                className="flex items-center gap-2"
                            >
                                <LuExternalLink />
                                <span>View Live</span>
                            </Link>
                        </button>
                    </div>

                    <div className="relative flex-1">
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

                <div className="relative my-14 pb-6 flex-center flex-col">
                    <div className="top-gradient" />
                    <p className="text-sm lg:text-base text-gray-400 pt-1">Copyright © Epiphanus {new Date().getFullYear()}</p>
                    <div className="flex gap-4 items-center mt-1">
                        {socialMediaPlatforms.map((item) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                title={item.title}
                                target="_blank"
                                className="relative flex aspect-square items-center justify-center rounded-full bg-gray-300 h-8 lg:w-10 w-8 lg:h-10 p-2 hover:scale-150 transition-all ease-in-out duration-300"
                            >
                                <div
                                    className="flex items-center justify-center w-6 h-6"
                                >
                                    <item.icon fill="#000319" className="h-full w-full" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProjectInfo