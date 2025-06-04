import { LuFolder, LuHeart, LuSearch, LuTriangle } from "react-icons/lu"
import { MdMoreVert } from "react-icons/md"
import StatusBar from "./StatusBar"
import { Dispatch, SetStateAction } from "react"
import { useMedia } from "@/context/MediaContext"
import movieflix1 from "@/public/images/movieflix1.jpg";
import movieflix2 from "@/public/images/movieflix2.jpg";
import movieflix3 from "@/public/images/movieflix3.jpg";
import movieflix4 from "@/public/images/movieflix4.jpg";

// Define media item types
interface MediaItem {
    id: string
    type: "photo" | "video"
    thumbnail: string
    title?: string
    date: Date
    isFavorite: boolean
    duration?: string // For videos
}

interface DateGroup {
    title: string
    date: Date
    items: MediaItem[]
}

const Gallery = ({ setCurrentScreen }: { setCurrentScreen: Dispatch<SetStateAction<ScreenDisplay>> }) => {
    const { setMedia } = useMedia()

    const dateGroups: DateGroup[] = [
        {
            title: "Today",
            date: new Date(),
            items: [
                {
                    id: "today-1",
                    type: "video",
                    title: "What was bro thinking?😂",
                    thumbnail: '/videos/listen.mp4',
                    date: new Date(),
                    isFavorite: false,
                },
            ],
        },
        {
            title: "May 20",
            date: new Date(),
            items: [
                {
                    id: "may-1",
                    type: "photo",
                    thumbnail: movieflix1.src,
                    date: new Date(),
                    isFavorite: true,
                },
                {
                    id: "may-2",
                    type: "photo",
                    thumbnail: movieflix2.src,
                    date: new Date(),
                    isFavorite: true,
                },
                {
                    id: "may-3",
                    type: "photo",
                    thumbnail: movieflix3.src,
                    date: new Date(),
                    isFavorite: true,
                },
                {
                    id: "may-4",
                    type: "photo",
                    thumbnail: movieflix4.src,
                    date: new Date(),
                    isFavorite: true,
                },
            ],
        }
    ]

    // Function to render media item
    const renderMediaItem = (item: MediaItem) => {
        return (
            <div
                key={item.id}
                className="relative w-20 h-20 overflow-hidden rounded-sm"
                onClick={() => {
                    setMedia({
                        type: item.type,
                        url: item.thumbnail,
                        title: item.title || ""
                    })

                    return item.type === 'video' ? setCurrentScreen('video-player') : setCurrentScreen('image-view')
                }}
            >
                <div className="w-full h-full bg-gradient-to-b from-violet-300 to-purple" />

                {/* Video duration badge */}
                {item.type === "video" && (
                    <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded-sm flex items-center">
                        <LuTriangle size={10} className="rotate-90" />
                        {item.duration}
                    </div>
                )}

                {/* Favorite indicator */}
                {item.isFavorite && (
                    <div className="absolute bottom-1 left-1 text-white">
                        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="w-full h-full bg-black flex flex-col overflow-hidden">
            {/* Status Bar */}
            <StatusBar />

            {/* Navigation Header */}
            <div className="px-4 py-2 flex justify-between items-center">
                <div className="flex-1">
                    <h1 className="text-xl font-semibold text-white">Photos</h1>
                </div>
                <div className="flex space-x-5">
                    <LuSearch color="#fff" size={20} />
                    <MdMoreVert color="#fff" size={20} />
                </div>
            </div>

            {/* Photo Gallery */}
            <div className="flex-1 overflow-y-auto px-1 pb-16">
                {dateGroups.map((group) => (
                    <div key={group.title} className="mb-4">
                        {/* Date Header */}
                        <div className="sticky top-0 bg-black bg-opacity-80 backdrop-blur-sm z-10 px-3 py-2">
                            <div className="flex justify-between items-center">
                                <h2 className="text-gray-400 font-semibold">{group.title}</h2>
                                <button className="text-blue-400 text-sm">Select</button>
                            </div>
                        </div>

                        {/* Photo Grid */}
                        <div className="flex flex-wrap items-center gap-4 px-2">{group.items.map((item) => renderMediaItem(item))}</div>
                    </div>
                ))}
            </div>

            {/* Bottom Tab Bar */}
            <div className="absolute bottom-2 left-0 right-0 border-t border-gray-900">
                <div className="flex justify-around py-2">
                    <button className="flex flex-col items-center py-2 px-4 text-white"
                    >
                        <div className="w-6 h-6 mb-1">
                            <svg fill="currentColor" viewBox="0 0 24 24">
                                <path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z" />
                            </svg>
                        </div>
                        <span className="text-xs">Library</span>
                    </button>

                    <button className="flex flex-col items-center py-2 px-4 text-gray-400"
                    >
                        <LuHeart size={23} className="text-gray-400 fill-gray-400 mb-1" />
                        <span className="text-xs">For You</span>
                    </button>

                    <button
                        className="flex flex-col items-center py-2 px-4 text-gray-400"
                    >
                        <LuFolder size={23} className="text-gray-400 fill-gray-400 mb-1" />
                        <span className="text-xs">Albums</span>
                    </button>

                    <button className="flex flex-col items-center py-2 px-4 text-gray-400" >
                        <LuSearch size={23} className="text-gray-400 mb-1" />
                        <span className="text-xs">Search</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Gallery