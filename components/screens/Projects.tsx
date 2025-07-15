import {projects} from "@/constants";
import {useMedia} from "@/context/MediaContext";
import React, {useState} from "react";

const Projects = () => {
    const {setProjectId, setCurrentScreen} = useMedia()
    const [searchQuery, setSearchQuery] = useState("")

    const filteredProjects = projects.filter(
        (project) =>
            project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.technologies.some((tech) => tech.icon.toLowerCase().includes(searchQuery.toLowerCase()))
    )

    const handleProjectSelect = (id: string) => {
        setProjectId(id)
        setCurrentScreen("project-detail")
    }

    return (
        <div className="relative w-full h-full overflow-y-scroll no-visible-scrollbar px-3 pt-16 pb-6">
            <div className="relative pb-4 rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-purple to-walnut-300 rounded-2xl blur-xl opacity-10"></div>
                <h1 className="text-3xl font-bold text-white">Projects</h1>
            </div>

            <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects, technology ..."
                className="w-full bg-gray-600 rounded-full border-0 py-3 px-4 text-base text-white flex-1 focus-visible:ring-0 focus:outline-none"
            />

            <div className="divide-y divide-gray-100 mt-4">
                {filteredProjects.map(project => (
                    <div
                        key={project.id}
                        className="border-b border-primary py-3 cursor-pointer"
                        onClick={() => handleProjectSelect(project.id)}
                    >
                        <div className="flex items-center justify-between w-full">
                            <h2 className="text-base text-gray-300">
                                {project.title}
                            </h2>

                            <div className="text-sm text-gray-400">{project.year}</div>
                        </div>
                        <p className="text-sm text-gray-400 line-clamp-2 mt-2">{project.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Projects
