import profile from "@/public/images/profile.jpg"
import Image from "next/image"
import { Dispatch, SetStateAction } from "react"
import StatusBar from "./StatusBar"

interface HomeScreenProps {
    setCurrentScreen: Dispatch<SetStateAction<ScreenDisplay>>
}

const HomeScreen = ({ setCurrentScreen }: HomeScreenProps) => {
    const apps = [
        { name: "phone", icon: "📞", color: "bg-green-600" },
        { name: "mail", icon: "✉️", color: "bg-blue-500" },
        { name: "gallery", icon: "📷", color: "bg-yellow-500" },
    ]

    return (
        <div className="relative w-full h-full">
            <Image
                src={profile.src}
                alt="profile-picture"
                width={300}
                height={500}
                className="absolute inset-0 w-full h-full object-cover opacity-55 z-0"
                placeholder="blur"
                blurDataURL={profile.blurDataURL}
            />
            {/* Status Bar */}
            <StatusBar />

            {/* Dock */}
            <div className="absolute bottom-0 px-6 pb-3">
                <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-3">
                    <div className="flex justify-center space-x-6">
                        {apps.map((app, index) => (
                            <button
                                key={index}
                                className="flex flex-col items-center"
                                onClick={() => setCurrentScreen(app.name as ScreenDisplay)}
                            >
                                <div className={`w-14 h-14 ${app.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}>
                                    {app.icon}
                                </div>
                                <span className="text-white text-xs mt-1 text-center">{app.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeScreen