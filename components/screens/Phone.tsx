"use client"

import React from "react"
import dynamic from "next/dynamic"
import Loader from "@/components/Loader";
import {useMedia} from "@/context/MediaContext"
import LockScreen from "@/components/screens/LockScreen";
import Frame from "@/components/screens/Frame";
import BootScreen from "@/components/screens/BootScreen";

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
const Browser = dynamic(() => import('@/components/screens/browser/Browser'), {
    loading: () =><Loader />,
})
const SnakeGame = dynamic(() => import('@/components/screens/SnakeGame'), {
    loading: () =><Loader />,
})
const GuessGame = dynamic(() => import('@/components/screens/GuessGame'), {
    loading: () =><Loader />,
})
const MusicPlayer = dynamic(() => import('@/components/screens/music-player/iTunes'), {
    loading: () =><Loader />,
})
const WeatherApp = dynamic(() => import('@/components/screens/weather-app/Weather'), {
    loading: () =><Loader />,
})

const Phone = () => {
    const {currentScreen} = useMedia()

    const screen: {[key: string]: React.JSX.Element} = {
        gallery: <Gallery />,
        "video-player": <VideoPlayer />,
        "image-view": <ImageView />,
        phone: <PhoneDialer />,
        mail: <MailCompose />,
        info: <About />,
        projects: <Projects />,
        "project-detail": <ProjectDetails />,
        home: <HomeScreen />,
        snake: <SnakeGame />,
        guess: <GuessGame />,
        boot: <BootScreen />,
        shutdown: <BootScreen />,
        chrome:  <Browser />,
        itunes: <MusicPlayer />,
        lock: <LockScreen />,
        weather: <WeatherApp />
    }

    return (
        <div className="flex-center flex-1 h-full py-2">
           <Frame>
               {screen[currentScreen]}
           </Frame>
        </div>
    )
}

export default Phone

