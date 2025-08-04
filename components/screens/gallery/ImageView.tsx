import Image from "next/image";
import { useSwipeable } from "react-swipeable";
import type React from "react";
import { GalleryMedia } from "@/types";

const ImageView = ({
  media,
  goToNextMedia,
  goToPreviousMedia,
}: {
  media: GalleryMedia;
  goToNextMedia: () => void;
  goToPreviousMedia: () => void;
}) => {
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      goToNextMedia();
    },
    onSwipedRight: () => {
      goToPreviousMedia();
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
    delta: 10,
  });

  return (
    <div
      className="flex-center relative h-[85%] w-full overflow-hidden"
      {...swipeHandlers}
    >
      <Image
        src={media.url}
        alt="gallery-image"
        width={400}
        height={400}
        className="h-full w-auto object-center"
      />
    </div>
  );
};

export default ImageView;
