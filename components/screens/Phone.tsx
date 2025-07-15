"use client"

import React from "react"
import dynamic from "next/dynamic"
import Loader from "@/components/screens/Loader";
import {useMedia} from "@/context/MediaContext"
import LockScreen from "@/components/screens/LockScreen";
import Frame from "@/components/screens/Frame";

const HomeScreen = dynamic(() => import('@/components/screens/HomeScreen'), {
    loading: () =><Loader />,
})
const PhoneDialer = dynamic(() => import('@/components/screens/PhoneDialer'), {
    loading: () =><Loader />,
})
const MailCompose = dynamic(() => import('@/components/screens/MailCompose'), {
    loading: () => <Loader />,
})
const Gallery = dynamic(() => import('@/components/screens/Gallery'), {
    loading: () =><Loader />,
})
const VideoPlayer = dynamic(() => import('@/components/screens/VideoPlayer'), {
    loading: () =><Loader />,
})
const ImageView = dynamic(() => import('@/components/screens/ImageView'), {
    loading: () =><Loader />,
})
const About = dynamic(() => import('@/components/screens/InfoScreen'), {
    loading: () =><Loader />,
})
const Projects = dynamic(() => import('@/components/screens/Projects'), {
    loading: () =><Loader />,
})
const ProjectDetails = dynamic(() => import('@/components/screens/ProjectDetails'), {
    loading: () =><Loader />,
})
const Browser = dynamic(() => import('@/components/screens/Browser'), {
    loading: () =><Loader />,
})
const SnakeGame = dynamic(() => import('@/components/screens/SnakeGame'), {
    loading: () =><Loader />,
})
const GuessGame = dynamic(() => import('@/components/screens/GuessGame'), {
    loading: () =><Loader />,
})

export default function Phone() {
    const {currentScreen} = useMedia()

    const ScreenDisplay = () => {
        return currentScreen === 'gallery'
            ? <Gallery  />
            : currentScreen === 'video-player'
                ? <VideoPlayer />
                : currentScreen === 'image-view'
                    ? <ImageView />
                    : currentScreen === 'phone'
                        ? <PhoneDialer />
                        : currentScreen === 'mail'
                            ? <MailCompose />
                            : currentScreen === 'info'
                                ? <About />
                                :currentScreen === 'projects'
                                    ? <Projects />
                                    :currentScreen === 'project-detail'
                                        ? <ProjectDetails />
                                        :currentScreen === 'chrome'
                                            ? <Browser />
                                            :currentScreen === 'home'
                                                ? <HomeScreen />
                                                : currentScreen === 'snake'
                                                    ? <SnakeGame />
                                                    : currentScreen === 'guess'
                                                        ? <GuessGame />
                                                        : <LockScreen />
    }



    return (
        <div className="flex items-center justify-center h-full xsx:scale-75 xxs:scale-95 xs:scale-100">
           <Frame>
               <ScreenDisplay />
           </Frame>
        </div>
    )
}

