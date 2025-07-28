import wallpaper from "@/public/images/wallpaper.jpg"
import Image from "next/image"
import {useMedia} from "@/context/MediaContext";
import Link from "next/link";
import {mobileApps, socialMediaPlatforms} from "@/constants";
import {cn} from "@/lib/utils";
import {type ScreenOptions} from "@/types";
import MusicPlayerWidget from "@/components/screens/music-player/MusicPlayerWidget";
import {useSwipeable} from "react-swipeable";
import {FaPhone} from "react-icons/fa6";
import {TfiEmail, TfiGallery} from "react-icons/tfi";
import {useState} from "react";
import BrowserWidget from "@/components/screens/browser/BrowserWidget";

const dockApps = [
    { name: "phone", icon: FaPhone, color: "bg-green-600" },
    { name: "mail", icon: TfiEmail, color: "bg-blue-500" },
    { name: "gallery", icon: TfiGallery, color: "bg-blue-300" },
]

const HomeScreen = () => {
    const [currentPage, setCurrentPage] = useState(0)

    const {setCurrentScreen} = useMedia()

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => {
            if (currentPage < mobileApps.length - 1) setCurrentPage(prev => prev + 1);
        },
        onSwipedRight: () => {
            if (currentPage > 0) setCurrentPage(prev => prev - 1);
        },
        preventScrollOnSwipe: true,
        trackMouse: true,
        delta: 10
    });

    return (
        <div className="relative w-full h-full" {...swipeHandlers}>
            <Image
                src={wallpaper.src}
                alt="profile-picture"
                width={300}
                height={500}
                className="absolute inset-0 w-full h-full object-cover opacity-45 z-0"
                placeholder="blur"
                blurDataURL={wallpaper.blurDataURL}
            />

            <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentPage * 100}%)` }}
            >
                {mobileApps.map((apps, index) => (
                    <div key={index} className="min-w-full px-3 grid grid-cols-3 gap-4 mt-14">
                        {currentPage === 2 && (
                            <div className="col-span-3">
                                <MusicPlayerWidget />
                            </div>
                        )}

                        {currentPage === 1 && (
                            <BrowserWidget />
                        )}

                        {apps.map((app, idx) => (
                            <button
                                key={idx}
                                className="flex flex-col items-center"
                                onClick={() =>
                                    setCurrentScreen(app.name?.toLowerCase?.() as ScreenOptions)
                                }
                            >
                                <div className={`w-14 h-14 ${app.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}>
                                    <app.icon />
                                </div>
                                <p className="text-gray-200 text-sm font-light">
                                    {app.name}
                                </p>
                            </button>
                        ))}

                        {currentPage === 0 && socialMediaPlatforms.map(platform => (
                            <button
                                key={platform.title}
                                className="flex flex-col items-center"
                            >
                                <Link href={platform.href} target="_blank" className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg")}>
                                    <platform.icon className={platform.title === 'LinkedIn' ? "text-blue-500" : "fill-white"}/>
                                </Link>

                                <p className="capitalize text-gray-200 text-sm font-light">{platform.title}</p>
                            </button>
                        ))}
                    </div>
                ))}
            </div>


            {/* Dock */}
            <div className="absolute bottom-0 ml-2 px-6 pb-3 z-50">
                <div className="bg-neutral-600/20 backdrop-blur-md shadow-inner shadow-neutral-900/30 rounded-2xl p-3">
                    <div className="flex justify-center space-x-6">
                        {dockApps.map((app, index) => (
                            <button
                                key={index}
                                className="flex flex-col items-center"
                                onClick={() => setCurrentScreen(app.name as ScreenOptions)}
                            >
                                <div className={`w-14 h-14 ${app.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}>
                                    <app.icon />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeScreen