import { Dispatch, SetStateAction } from "react";
import { LuFolder, LuHeart, LuSearch, LuTriangle } from "react-icons/lu";
import { MdMoreVert } from "react-icons/md";
import { gallery } from "@/constants";
import type { GalleryMedia, GalleryScreen, MediaItem } from "@/types";
import Image from "next/image";

const AllMedia = ({
  setMedia,
  setCurrentScreen,
}: {
  setMedia: Dispatch<SetStateAction<GalleryMedia | null>>;
  setCurrentScreen: Dispatch<SetStateAction<GalleryScreen>>;
}) => {
  const renderMediaItem = (item: MediaItem) => {
    return (
      <div
        key={item.id}
        className="relative h-20 w-20 overflow-hidden rounded-sm"
        onClick={() => {
          setMedia({
            type: item.type,
            url: item.thumbnail,
            title: item.title || "",
          });

          return item.type === "video"
            ? setCurrentScreen("video-player")
            : setCurrentScreen("image-view");
        }}
      >
        {item.type === "photo" ? (
          <Image
            src={item.thumbnail}
            alt="photo"
            width={100}
            height={100}
            className="h-full w-full rounded-lg border border-neutral-800 object-cover"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-b from-violet-300 to-purple" />
        )}

        {/* Video duration badge */}
        {item.type === "video" && (
          <div className="absolute bottom-1 right-1 flex items-center rounded-sm bg-black bg-opacity-70 px-1.5 py-0.5 text-xs text-white">
            <LuTriangle size={10} className="rotate-90" />
            {item.duration}
          </div>
        )}

        {/* Favorite indicator */}
        {item.isFavorite && (
          <div className="absolute bottom-1 left-1 text-white">
            <svg
              className="h-3.5 w-3.5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="no-visible-scrollbar relative mt-12 h-full w-full overflow-y-scroll">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-white">Photos</h1>
        </div>
        <div className="flex space-x-5">
          <LuSearch color="#fff" size={20} />
          <MdMoreVert color="#fff" size={20} />
        </div>
      </div>

      {/* Photo CameraGallery */}
      <div className="no-visible-scrollbar flex-1 overflow-y-scroll px-2 pb-16">
        {gallery.map((group) => (
          <div key={group.title} className="mb-4">
            {/* Date Header */}
            <div className="sticky top-0 z-10 bg-black bg-opacity-80 px-3 py-2 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-400">{group.title}</h2>
                <button className="text-sm text-blue-400">Select</button>
              </div>
            </div>

            {/* Photo Grid */}
            <div className="flex flex-wrap items-center gap-4 px-2">
              {group.items.map((item) => renderMediaItem(item as MediaItem))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Tab Bar */}
      <div className="absolute bottom-14 border-t border-gray-900 pr-4">
        <div className="flex justify-around py-2">
          <button className="flex flex-col items-center px-4 py-2 text-white">
            <div className="mb-1 h-6 w-6">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z" />
              </svg>
            </div>
            <span className="text-xs">Library</span>
          </button>

          <button className="flex flex-col items-center px-4 py-2 text-gray-400">
            <LuHeart size={23} className="mb-1 fill-gray-400 text-gray-400" />
            <span className="text-xs">For You</span>
          </button>

          <button className="flex flex-col items-center px-4 py-2 text-gray-400">
            <LuFolder size={23} className="mb-1 fill-gray-400 text-gray-400" />
            <span className="text-xs">Albums</span>
          </button>

          <button className="flex flex-col items-center px-4 py-2 text-gray-400">
            <LuSearch size={23} className="mb-1 text-gray-400" />
            <span className="text-xs">Search</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default AllMedia;
