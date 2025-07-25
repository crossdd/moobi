import wallpaper from "@/public/images/wallpaper.jpg"
import Image from "next/image"
import {FaPhone} from "react-icons/fa6";
import {TfiEmail, TfiGallery} from "react-icons/tfi";
import {useMedia} from "@/context/MediaContext";
import {IoInformationCircle} from "react-icons/io5";
import Link from "next/link";
import {socialMediaPlatforms} from "@/constants";
import {cn} from "@/lib/utils";
import {BsBrowserChrome, BsFolder} from "react-icons/bs";
import {type ScreenOptions} from "@/types";
import {GiSnake} from "react-icons/gi";
import {LuBrain} from "react-icons/lu";
import {FcMusic} from "react-icons/fc";

const HomeScreen = () => {
    const {setCurrentScreen} = useMedia()

    const apps = [
        { name: "Info", icon: IoInformationCircle, color: "bg-gray-400" },
        { name: "Guess", icon: LuBrain, color: "text-primary bg-white" },
        { name: "Projects", icon: BsFolder, color: "bg-yellow-300" },
        { name: "Chrome", icon: BsBrowserChrome, color: "bg-gradient-to-br from-red-500 via-yellow-500 to-green-500" },
        { name: "Snake", icon: GiSnake, color: "bg-green-600" },
        { name: "iTunes", icon: FcMusic, color: "bg-red-200" },
    ]

    const dockApps = [
        { name: "phone", icon: FaPhone, color: "bg-green-600" },
        { name: "mail", icon: TfiEmail, color: "bg-blue-500" },
        { name: "gallery", icon: TfiGallery, color: "bg-blue-300" },
    ]

    return (
        <div className="relative w-full h-full">
            <Image
                src={wallpaper.src}
                alt="profile-picture"
                width={300}
                height={500}
                className="absolute inset-0 w-full h-full object-cover opacity-45 z-0"
                placeholder="blur"
                blurDataURL={wallpaper.blurDataURL}
            />

            <div className="absolute top-12 grid grid-cols-3 gap-4 px-3 mt-4 z-50 w-full">
                {apps.map((app, index) => (
                    <button
                        key={index}
                        className="flex flex-col items-center"
                        onClick={() => setCurrentScreen(app.name.toLowerCase() as ScreenOptions)}
                    >
                        <div className={`w-14 h-14 ${app.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}>
                            <app.icon />
                        </div>

                        <p className="text-gray-200 text-sm font-light">{app.name}</p>
                    </button>
                ))}

                {socialMediaPlatforms.map(platform => (
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