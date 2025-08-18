import { type CalendarEvent, type HistoryType } from "@/types";
import { BiCalculator } from "react-icons/bi";
import {
  BsBrowserChrome,
  BsCalendar3,
  BsClockFill,
  BsFolder,
  BsTwitterX,
} from "react-icons/bs";
import { FaGithub, FaLinkedin, FaPhone } from "react-icons/fa6";
import { FcMusic } from "react-icons/fc";
import { GiSnake } from "react-icons/gi";
import { IoInformationCircle } from "react-icons/io5";
import { LuBrain, LuListTodo } from "react-icons/lu";
import { TiWeatherDownpour } from "react-icons/ti";
import { TfiEmail, TfiGallery } from "react-icons/tfi";

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

export const globalEvents: CalendarEvent[] = [
  // January 2025
  {
    id: "ny2025",
    title: "New Year's Day",
    date: "2025-01-01",
    category: "holiday",
    isGlobal: true,
  },
  {
    id: "mlk2025",
    title: "Martin Luther King Jr. Day",
    date: "2025-01-20",
    category: "holiday",
    isGlobal: true,
  },
  {
    id: "aus2025",
    title: "Australia Day",
    date: "2025-01-26",
    category: "holiday",
    isGlobal: true,
  },

  // February 2025
  {
    id: "gd2025",
    title: "Groundhog Day",
    date: "2025-02-02",
    category: "holiday",
    isGlobal: true,
  },
  {
    id: "vd2025",
    title: "Valentine's Day",
    date: "2025-02-14",
    category: "holiday",
    isGlobal: true,
  },
  {
    id: "pres2025",
    title: "Presidents' Day",
    date: "2025-02-17",
    category: "holiday",
    isGlobal: true,
  },

  // March 2025
  {
    id: "std2025",
    title: "St. Patrick's Day",
    date: "2025-03-17",
    category: "holiday",
    isGlobal: true,
  },
  {
    id: "spring2025",
    title: "Spring Equinox",
    date: "2025-03-20",
    category: "holiday",
    isGlobal: true,
  },

  // April 2025
  {
    id: "april2025",
    title: "April Fools' Day",
    date: "2025-04-01",
    category: "holiday",
    isGlobal: true,
  },
  {
    id: "earth2025",
    title: "Earth Day",
    date: "2025-04-22",
    category: "holiday",
    isGlobal: true,
  },

  // May 2025
  {
    id: "may2025",
    title: "May Day",
    date: "2025-05-01",
    category: "holiday",
    isGlobal: true,
  },
  {
    id: "mothers2025",
    title: "Mother's Day",
    date: "2025-05-11",
    category: "holiday",
    isGlobal: true,
  },
  {
    id: "memorial2025",
    title: "Memorial Day",
    date: "2025-05-26",
    category: "holiday",
    isGlobal: true,
  },

  // June 2025
  {
    id: "fathers2025",
    title: "Father's Day",
    date: "2025-06-15",
    category: "holiday",
    isGlobal: true,
  },
  {
    id: "summer2025",
    title: "Summer Solstice",
    date: "2025-06-21",
    category: "holiday",
    isGlobal: true,
  },

  // July 2025
  {
    id: "july4",
    title: "Independence Day",
    date: "2025-07-04",
    category: "holiday",
    isGlobal: true,
  },

  // August 2025
  {
    id: "friendship2025",
    title: "International Friendship Day",
    date: "2025-08-01",
    category: "holiday",
    isGlobal: true,
  },

  // September 2025
  {
    id: "labor2025",
    title: "Labor Day",
    date: "2025-09-01",
    category: "holiday",
    isGlobal: true,
  },
  {
    id: "autumn2025",
    title: "Autumn Equinox",
    date: "2025-09-23",
    category: "holiday",
    isGlobal: true,
  },

  // October 2025
  {
    id: "columbus2025",
    title: "Columbus Day",
    date: "2025-10-13",
    category: "holiday",
    isGlobal: true,
  },
  {
    id: "halloween2025",
    title: "Halloween",
    date: "2025-10-31",
    category: "holiday",
    isGlobal: true,
  },

  // November 2025
  {
    id: "veterans2025",
    title: "Veterans Day",
    date: "2025-11-11",
    category: "holiday",
    isGlobal: true,
  },
  {
    id: "thanksgiving2025",
    title: "Thanksgiving",
    date: "2025-11-27",
    category: "holiday",
    isGlobal: true,
  },

  // December 2025
  {
    id: "winter2025",
    title: "Winter Solstice",
    date: "2025-12-21",
    category: "holiday",
    isGlobal: true,
  },
  {
    id: "christmas2025",
    title: "Christmas Day",
    date: "2025-12-25",
    category: "holiday",
    isGlobal: true,
  },
  {
    id: "nye2025",
    title: "New Year's Eve",
    date: "2025-12-31",
    category: "holiday",
    isGlobal: true,
  },

  // Some 2024 events for reference
  {
    id: "ny2024",
    title: "New Year's Day",
    date: "2024-01-01",
    category: "holiday",
    isGlobal: true,
  },
  {
    id: "vd2024",
    title: "Valentine's Day",
    date: "2024-02-14",
    category: "holiday",
    isGlobal: true,
  },
  {
    id: "std2024",
    title: "St. Patrick's Day",
    date: "2024-03-17",
    category: "holiday",
    isGlobal: true,
  },
  {
    id: "july42024",
    title: "Independence Day",
    date: "2024-07-04",
    category: "holiday",
    isGlobal: true,
  },
  {
    id: "halloween2024",
    title: "Halloween",
    date: "2024-10-31",
    category: "holiday",
    isGlobal: true,
  },
  {
    id: "christmas2024",
    title: "Christmas Day",
    date: "2024-12-25",
    category: "holiday",
    isGlobal: true,
  },
];

// Each array is a screen. Each screen is allowed to have only 9 apps. Your app won't be displayed if you don't adhere to that.
// Screen 1 should have only 6 apps
export const mobileApps = [
  [
    {
      name: "Info",
      slur: "info",
      icon: IoInformationCircle,
      color: "bg-gray-400",
    },
    { name: "Snake", slur: "snake", icon: GiSnake, color: "text-green-600" },
    {
      name: "Calculator",
      slur: "calculator",
      icon: BiCalculator,
      color: "text-orange-500",
    },
    { name: "Clock", slur: "clock", icon: BsClockFill, color: "text-gray-400" },
    {
      name: "Chrome",
      slur: "chrome-browser",
      icon: BsBrowserChrome,
      color:
        "bg-gradient-to-br from-red-500 via-yellow-500 to-green-500 text-white",
    },
  ],
  [
    {
      name: "gallery",
      slur: "gallery",
      icon: TfiGallery,
      color: "bg-blue-300",
    },
    {
      name: "Calendar",
      slur: "calendar",
      icon: BsCalendar3,
      color: "text-blue-500",
    },
    {
      name: "Weather",
      slur: "weather",
      icon: TiWeatherDownpour,
      color: "bg-blue-500",
    },
    {
      name: "Guess",
      slur: "guess",
      icon: LuBrain,
      color: "text-primary bg-white",
    },
    {
      name: "mail",
      slur: "mail-composer",
      icon: TfiEmail,
      color: "bg-blue-500",
    },
    {
      name: "iTunes",
      slur: "music-player",
      icon: FcMusic,
      color: "bg-red-200",
    },
    { name: "Notes", slur: "notes", icon: LuListTodo, color: "bg-yellow-300" },
    {
      name: "File Manager",
      slur: "file-manager",
      icon: BsFolder,
      color: "bg-yellow-300",
    },
    {
      name: "phone",
      slur: "phone-dialer",
      icon: FaPhone,
      color: "bg-green-600",
    },
  ],
  [
    // Intentionally left empty for the music player widget. Add your apps in another array
  ],
];
