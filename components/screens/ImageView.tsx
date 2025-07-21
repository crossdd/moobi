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
            className="w-full h-full flex-center relative overflow-hidden"
             {...swipeHandlers}
        >
            <div className="relative">
                <div className="absolute -top-4 left-0 right-0 p-6">
                    <h4 className="text-white text-lg font-semibold">
                        {media.title}
                    </h4>
                </div>

            {media.type === 'photo' && (
                    <Image
                        src={media.url}
                        alt={media.title || 'Media'}
                        width={400}
                        height={400}
                        className="w-full h-full"
                    />
            )}
            </div>
        </div>
    )
}

export default ImageView