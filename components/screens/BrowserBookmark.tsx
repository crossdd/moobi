import {About, Footer, Hero, Navbar, RecentProjects, Skills} from "@/components/screens/browser-bookmark";
import {useMedia} from "@/context/MediaContext";
import ProjectInfo from "@/components/screens/browser-bookmark/ProjectInfo";
import type React from "react";

const BrowserBookmark = () => {
    const {projectId} = useMedia()

    if(projectId === "") {
        return (
            <>
                <Navbar />
                <Hero />
                <About />
                <Skills />
                <RecentProjects />
                <Footer />
            </>
        )
    }

    return (
        <ProjectInfo projectId={projectId} />
    )
}
export default BrowserBookmark
