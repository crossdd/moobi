import {About, Footer, Hero, Navbar, RecentProjects, Skills} from "@/components/screens/browser-bookmark";
import {type BrowserBookmarkProps} from "@/types";
import React from "react";

const BrowserBookmark = (props: BrowserBookmarkProps) => {
    return (
        <>
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <RecentProjects {...props} />
            <Footer />
        </>
    )
}
export default BrowserBookmark
