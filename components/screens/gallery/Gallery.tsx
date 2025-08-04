import { gallery } from "@/constants";
import type { GalleryMedia, GalleryScreen, MediaItem } from "@/types";
import { useState } from "react";
import AllMedia from "@/components/screens/gallery/AllMedia";
import ImageView from "@/components/screens/gallery/ImageView";
import VideoPlayer from "@/components/screens/gallery/VideoPlayer";

const Gallery = () => {
  const [currentScreen, setCurrentScreen] = useState<GalleryScreen>("library");
  const [media, setMedia] = useState<GalleryMedia | null>(null);

  const galleryMedias = gallery.flatMap((group) => group.items) as MediaItem[];

  const currentIndex = galleryMedias.findIndex(
    (item) => item.thumbnail === media?.url,
  );

  const goToMedia = (index: number) => {
    const item = galleryMedias[index];
    setMedia({
      type: item.type,
      url: item.thumbnail,
      title: item.title || "",
    });
    setCurrentScreen(item.type === "video" ? "video-player" : "image-view");
  };

  const goToNextMedia = () => {
    if (galleryMedias.length === 0) return;
    const nextIndex = (currentIndex + 1) % galleryMedias.length;
    goToMedia(nextIndex);
  };

  const goToPreviousMedia = () => {
    if (galleryMedias.length === 0) return;
    const prevIndex =
      (currentIndex - 1 + galleryMedias.length) % galleryMedias.length;
    goToMedia(prevIndex);
  };

  return (
    <div className="relative mt-12 h-full w-full">
      {currentScreen === "library" && (
        <AllMedia setMedia={setMedia} setCurrentScreen={setCurrentScreen} />
      )}

      {currentScreen === "image-view" && media && media.type === "photo" && (
        <ImageView
          media={media}
          goToNextMedia={goToNextMedia}
          goToPreviousMedia={goToPreviousMedia}
        />
      )}

      {currentScreen === "video-player" && media && media.type === "video" && (
        <VideoPlayer
          media={media}
          goToNextMedia={goToNextMedia}
          goToPreviousMedia={goToPreviousMedia}
        />
      )}
    </div>
  );
};

export default Gallery;
