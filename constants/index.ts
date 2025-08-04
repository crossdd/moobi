import { HistoryType } from "@/types";
import { BiCalculator } from "react-icons/bi";
import {
  BsBrowserChrome,
  BsClockFill,
  BsFolder,
  BsTwitterX,
} from "react-icons/bs";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { FcMusic } from "react-icons/fc";
import { GiSnake } from "react-icons/gi";
import { IoInformationCircle } from "react-icons/io5";
import { LuBrain } from "react-icons/lu";
import { TiWeatherCloudy } from "react-icons/ti";

export const socialMediaPlatforms = [
  {
    title: "LinkedIn",
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/onyeso-epiphanus-8651b1284",
  },
  {
    title: "Twitter",
    icon: BsTwitterX,
    href: "https://x.com/patroncodes",
  },
  {
    title: "GitHub",
    icon: FaGithub,
    href: "https://github.com/patroncodes",
  },
];

export const gallery = [
  {
    title: "Today",
    date: new Date(),
    items: [
      {
        id: "today-1",
        type: "video",
        title: "What was bro thinking?😂",
        thumbnail: "/videos/listen.mp4",
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
        title: "",
        thumbnail: "/images/movieflix1.jpg",
        date: new Date(),
        isFavorite: true,
      },
      {
        id: "may-2",
        type: "photo",
        title: "",
        thumbnail: "/images/movieflix2.jpg",
        date: new Date(),
        isFavorite: true,
      },
      {
        id: "may-3",
        type: "photo",
        title: "",
        thumbnail: "/images/movieflix3.jpg",
        date: new Date(),
        isFavorite: true,
      },
      {
        id: "may-4",
        type: "photo",
        title: "",
        thumbnail: "/images/movieflix4.jpg",
        date: new Date(),
        isFavorite: true,
      },
      {
        id: "may-5",
        type: "photo",
        title: "",
        thumbnail: "/images/profile.jpg",
        date: new Date(),
        isFavorite: true,
      },
      {
        id: "may-6",
        type: "photo",
        title: "",
        thumbnail: "/images/profile-animated.png",
        date: new Date(),
        isFavorite: true,
      },
    ],
  },
];

export const browserHistory: HistoryType[] = [
  {
    id: 1,
    query: "GitHub",
    time: "10:02",
  },
  {
    id: 2,
    query: "MDN Web Docs",
    time: "13:45",
  },
  {
    id: 3,
    query: "Vercel",
    time: "13:52",
  },
];

// Each array is a screen. Each screen is allowed to have only 9 apps. Your app won't be displayed if you don't adhere to that.
// Screen 1 should have only 6 apps
export const mobileApps = [
  [
    { name: "Info", icon: IoInformationCircle, color: "bg-gray-400" },
    { name: "Snake", icon: GiSnake, color: "text-green-600" },
    { name: "Calculator", icon: BiCalculator, color: "text-yellow-600" },
    { name: "Clock", icon: BsClockFill, color: "text-gray-400" },
  ],
  [
    { name: "Weather", icon: TiWeatherCloudy, color: "bg-blue-500" },
    { name: "Guess", icon: LuBrain, color: "text-primary bg-white" },
    { name: "iTunes", icon: FcMusic, color: "bg-red-200" },
    { name: "Projects", icon: BsFolder, color: "bg-yellow-300" },
    {
      name: "Chrome",
      icon: BsBrowserChrome,
      color:
        "bg-gradient-to-br from-red-500 via-yellow-500 to-green-500 text-white",
    },
  ],
  [
    // Intentionally left empty for the music player widget. Add your apps in another array
  ],
];
