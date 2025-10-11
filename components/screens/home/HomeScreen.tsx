import wallpaper from "@/public/images/wallpaper.webp";
import Image from "next/image";
import Link from "next/link";
import { mobileApps, socialMediaPlatforms } from "@/constants";
import { cn } from "@/lib/utils";
import { type ScreenOptions } from "@/types";
import MusicPlayerWidget from "@/components/screens/music-player/MusicPlayerWidget";
import { useSwipeable } from "react-swipeable";
import { FaPhone } from "react-icons/fa6";
import { TfiEmail, TfiGallery } from "react-icons/tfi";
import BrowserWidget from "@/components/screens/browser/BrowserWidget";
import WeatherWidget from "@/components/screens/weather-app/WeatherWidget";
import { usePhoneStore } from "@/stores/usePhoneStore";

const dockApps = [
  { name: "Phone", slur: "phone-dialer", icon: FaPhone, color: "bg-green-600" },
  {
    name: "Gmail",
    slur: "mail-composer",
    icon: TfiEmail,
    color: "bg-blue-500",
  },
  { name: "Gallery", slur: "gallery", icon: TfiGallery, color: "bg-blue-300" },
];

const HomeScreen = () => {
  const { setCurrentScreen, fetchPhonePage, phonePage } = usePhoneStore();

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => fetchPhonePage("left"),
    onSwipedRight: () => fetchPhonePage("right"),
    preventScrollOnSwipe: true,
    trackMouse: true,
    delta: 10,
  });

  return (
    <div className="relative h-full w-full" {...swipeHandlers}>
      <Image
        src={wallpaper.src}
        alt="profile-picture"
        width={300}
        height={500}
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-35"
        placeholder="blur"
        blurDataURL={wallpaper.blurDataURL}
      />

      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${phonePage * 100}%)` }}
      >
        {mobileApps.map((apps, index) => (
          <div
            key={index}
            className="mt-14 grid min-w-full grid-cols-3 gap-4 px-3"
          >
            {index === 0 && (
              <>
                <WeatherWidget size="small" />

                {socialMediaPlatforms.map((platform) => (
                  <button
                    key={platform.title}
                    className="flex flex-col items-center"
                  >
                    <Link
                      href={platform.href}
                      target="_blank"
                      className={cn(
                        "flex h-14 w-14 items-center justify-center rounded-2xl text-2xl shadow-lg",
                      )}
                    >
                      <platform.icon
                        className={
                          platform.title === "LinkedIn"
                            ? "text-blue-500"
                            : "fill-white"
                        }
                      />
                    </Link>

                    <p className="text-sm font-light capitalize text-gray-200">
                      {platform.title}
                    </p>
                  </button>
                ))}
              </>
            )}

            {index === 1 && <BrowserWidget />}

            {apps.map((app, idx) => (
              <button
                key={idx}
                className="flex flex-col items-center"
                onClick={() => setCurrentScreen(app.slur as ScreenOptions)}
              >
                <div
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-2xl text-2xl shadow-lg",
                    app.color,
                  )}
                >
                  <app.icon />
                </div>
                <p className="text-sm font-light text-gray-200">{app.name}</p>
              </button>
            ))}

            {index === 2 && (
              <MusicPlayerWidget className="col-span-3 row-span-2" />
            )}
          </div>
        ))}
      </div>

      {/* Dock */}
      <div className="absolute bottom-0 z-20 ml-2 px-6 pb-3">
        <div className="rounded-2xl bg-neutral-600/20 p-3 shadow-inner shadow-neutral-900/30 backdrop-blur-md">
          <div className="flex justify-center space-x-6">
            {dockApps.map((app, index) => (
              <button
                key={index}
                className="flex flex-col items-center"
                onClick={() => setCurrentScreen(app.slur as ScreenOptions)}
              >
                <div
                  className={`h-14 w-14 ${app.color} flex items-center justify-center rounded-2xl text-2xl shadow-lg`}
                >
                  <app.icon />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
