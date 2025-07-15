import {useMedia} from '@/context/MediaContext'
import Image from 'next/image'
import {useSwipeable} from "react-swipeable";
import type React from "react";

const ImageView = () => {
    const { media, goToNextMedia, goToPreviousMedia } = useMedia()

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => {
            goToNextMedia()
        },
        onSwipedRight: () => {
            goToPreviousMedia()
        },
        preventScrollOnSwipe: true,
        trackMouse: true,
        delta: 10
    });

    return (
        <div
            className="w-full h-full relative overflow-hidden"
             {...swipeHandlers}
        >
            <div className="relative mb-10">
            <div className="absolute -top-4 left-0 right-0 p-6">
                <h4 className="text-white text-lg font-semibold">
                    {media.title}
                </h4>
            </div>

            {media.type === 'photo' && (
                <Image
                    src={media.url}
                    alt={media.title || 'Media'}
                    width={700}
                    height={700}
                    className="w-full h-full object-cover"
                />
            )}
            </div>
        </div>
    )
}

export default ImageView