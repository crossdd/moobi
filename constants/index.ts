import { type App, type CalendarEvent, type HistoryType } from "@/types";
import { BiCalculator } from "react-icons/bi";
import {
  BsBrowserChrome,
  BsCalendar3,
  BsClockFill,
  BsFolder,
  BsTwitterX,
} from "react-icons/bs";
import { FaChessQueen, FaGithub, FaLinkedin, FaPhone } from "react-icons/fa6";
import { FcMusic } from "react-icons/fc";
import { GiSnake } from "react-icons/gi";
import { IoInformationCircle, IoLogoAppleAppstore } from "react-icons/io5";
import {
  LuBookOpen,
  LuBrain,
  LuBriefcase,
  LuCamera,
  LuGamepad2,
  LuHeart,
  LuListTodo,
  LuMessageSquare,
  LuPlay,
  LuSmartphone,
  LuZap,
} from "react-icons/lu";
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

export const mockApps: App[] = [
  {
    id: "notes-app",
    name: "Notes & Todos",
    developer: "Apple Inc.",
    category: "productivity",
    price: 0,
    rating: 4.8,
    reviewCount: 125000,
    size: "45.2 MB",
    version: "1.0.0",
    description:
      "Capture thoughts and organize tasks with our powerful notes and todo app.",
    longDescription:
      "Notes & Todos is the perfect companion for capturing your thoughts, ideas, and managing your daily tasks. With a beautiful, intuitive interface and powerful features, you can create rich text notes, organize todo lists with priorities, and keep everything synced across your devices.\n\nFeatures include color-coded notes, priority-based todos, search functionality, and seamless organization tools. Whether you're a student, professional, or just someone who likes to stay organized, Notes & Todos has everything you need.",
    screenshots: [
      {
        url: "/images/appstore/notes-app-main.png",
        caption: "Main notes list",
      },
      {
        url: "/images/appstore/note-editing-interface.png",
        caption: "Rich text editing",
      },
      {
        url: "/images/appstore/todo-list-with-checkboxes.png",
        caption: "Todo management",
      },
    ],
    icon: "/images/appstore/yellow-notes-app-icon.png",
    features: [
      "Rich text notes",
      "Priority-based todos",
      "Color organization",
      "Search functionality",
      "Offline access",
    ],
    requirements: "iOS 15.0 or later",
    releaseNotes: "Initial release with full notes and todo functionality.",
    ageRating: "4+",
    languages: ["English", "Spanish", "French", "German"],
    reviews: [
      {
        id: "r1",
        userName: "ProductivityPro",
        rating: 5,
        title: "Perfect for organization!",
        comment:
          "This app has completely changed how I organize my thoughts and tasks. The interface is beautiful and intuitive.",
        date: "2024-12-15",
        helpful: 23,
      },
      {
        id: "r2",
        userName: "StudentLife",
        rating: 4,
        title: "Great for school",
        comment:
          "Love using this for class notes and homework tracking. The color coding is super helpful.",
        date: "2024-12-10",
        helpful: 15,
      },
    ],
    isFeatured: true,
    isEditorChoice: true,
  },
  {
    id: "calendar-app",
    name: "Calendar Pro",
    developer: "Apple Inc.",
    category: "productivity",
    price: 0,
    rating: 4.7,
    reviewCount: 89000,
    size: "32.1 MB",
    version: "2.1.0",
    description:
      "Beautiful calendar with global events and personal scheduling.",
    longDescription:
      "Calendar Pro brings you a stunning calendar experience with real global events, holidays, and seamless personal event management. Stay organized with color-coded categories, event reminders, and an intuitive interface that makes scheduling effortless.",
    screenshots: [
      {
        url: "/images/appstore/calendar-month-view.png",
        caption: "Monthly calendar view",
      },
      {
        url: "/images/appstore/event-details-modal.png",
        caption: "Event management",
      },
    ],
    icon: "/images/appstore/red-calendar-app-icon.png",
    features: [
      "Global events database",
      "Personal event management",
      "Color categories",
      "Event reminders",
    ],
    requirements: "iOS 15.0 or later",
    releaseNotes: "Added recurring events and improved performance.",
    ageRating: "4+",
    languages: ["English", "Spanish", "French"],
    reviews: [
      {
        id: "r3",
        userName: "TimeManager",
        rating: 5,
        title: "Best calendar app!",
        comment:
          "The global events feature is amazing. Never miss important holidays again!",
        date: "2024-12-12",
        helpful: 31,
      },
    ],
    isFeatured: true,
  },
  {
    id: "weather-app",
    name: "Weather Plus",
    developer: "Weather Corp",
    category: "utilities",
    price: 0,
    rating: 4.6,
    reviewCount: 156000,
    size: "28.7 MB",
    version: "3.2.1",
    description:
      "Accurate weather forecasts with beautiful widgets and detailed conditions.",
    longDescription:
      "Weather Plus delivers the most accurate weather forecasts with stunning visuals and comprehensive data. Get hourly and 10-day forecasts, severe weather alerts, and beautiful home screen widgets.",
    screenshots: [
      {
        url: "/images/appstore/weather-app-main-screen.png",
        caption: "Current conditions",
      },
      {
        url: "/images/appstore/hourly-weather-forecast.png",
        caption: "Hourly forecast",
      },
    ],
    icon: "/images/appstore/weather-app-icon-blue-cloud.png",
    features: [
      "10-day forecast",
      "Hourly updates",
      "Weather widgets",
      "Severe weather alerts",
      "Multiple locations",
    ],
    requirements: "iOS 14.0 or later",
    releaseNotes: "Improved forecast accuracy and added new widget styles.",
    ageRating: "4+",
    languages: ["English", "Spanish", "French", "German", "Japanese"],
    reviews: [],
  },
  {
    id: "music-app",
    name: "Music Streaming",
    developer: "Audio Inc.",
    category: "entertainment",
    price: 0,
    rating: 4.5,
    reviewCount: 234000,
    size: "67.3 MB",
    version: "4.1.2",
    description:
      "Stream millions of songs with high-quality audio and personalized playlists.",
    longDescription:
      "Discover and stream millions of songs with crystal-clear audio quality. Create personalized playlists, discover new artists, and enjoy music offline with our premium features.",
    screenshots: [
      {
        url: "/images/appstore/modern-music-player.png",
        caption: "Now playing",
      },
      {
        url: "/images/appstore/music-library-playlists.png",
        caption: "Your library",
      },
    ],
    icon: "/images/appstore/purple-headphones-music-app-icon.png",
    features: [
      "Millions of songs",
      "Offline playback",
      "Personalized playlists",
      "High-quality audio",
      "Social sharing",
    ],
    requirements: "iOS 15.0 or later",
    releaseNotes: "Added new discovery features and improved audio quality.",
    ageRating: "12+",
    languages: ["English", "Spanish", "French", "German", "Italian"],
    reviews: [],
    inAppPurchases: true,
  },
  {
    id: "snake-game",
    name: "Snake Classic",
    developer: "Retro Games Ltd",
    category: "games",
    price: 1.99,
    rating: 4.3,
    reviewCount: 45000,
    size: "15.2 MB",
    version: "1.5.0",
    description:
      "The classic snake game reimagined with modern graphics and smooth gameplay.",
    longDescription:
      "Relive the nostalgia of the classic Snake game with modern graphics and buttery-smooth gameplay. Challenge yourself with multiple difficulty levels and compete for high scores.",
    screenshots: [
      {
        url: "/images/appstore/snake-gameplay.png",
        caption: "Classic gameplay",
      },
      {
        url: "/images/appstore/snake-game-high-scores.png",
        caption: "High scores",
      },
    ],
    icon: "/images/appstore/snake-game-icon-green.png",
    features: [
      "Classic gameplay",
      "Multiple difficulty levels",
      "High score tracking",
      "Smooth controls",
      "Retro graphics",
    ],
    requirements: "iOS 13.0 or later",
    releaseNotes: "Fixed minor bugs and improved performance.",
    ageRating: "4+",
    languages: ["English"],
    reviews: [],
  },
  {
    id: "number-guessing",
    name: "Number Guesser",
    developer: "Puzzle Games Inc",
    category: "games",
    price: 0,
    rating: 4.1,
    reviewCount: 12000,
    size: "8.5 MB",
    version: "1.2.0",
    description: "Test your logic with this addictive number guessing game.",
    longDescription:
      "Challenge your mind with Number Guesser, a simple yet addictive puzzle game that tests your logical thinking and deduction skills.",
    screenshots: [
      {
        url: "/images/appstore/placeholder.svg?height=600&width=300",
        caption: "Game interface",
      },
    ],
    icon: "/placeholder.svg?height=120&width=120",
    features: [
      "Logic puzzles",
      "Multiple difficulty levels",
      "Statistics tracking",
      "Clean interface",
    ],
    requirements: "iOS 12.0 or later",
    releaseNotes: "Added new difficulty modes.",
    ageRating: "4+",
    languages: ["English", "Spanish"],
    reviews: [],
  },
  {
    id: "instagram",
    name: "Instagram",
    developer: "Meta Platforms, Inc.",
    category: "social",
    price: 0,
    rating: 4.4,
    reviewCount: 2500000,
    size: "156.8 MB",
    version: "312.0",
    description:
      "Share photos and videos with friends and discover content from around the world.",
    longDescription:
      "Instagram is a simple way to capture and share the world's moments. Follow your friends and family to see what they're up to, and discover accounts from all over the world that are sharing things you love.",
    screenshots: [
      { url: "/placeholder.svg?height=600&width=300", caption: "Your feed" },
      { url: "/placeholder.svg?height=600&width=300", caption: "Stories" },
      { url: "/placeholder.svg?height=600&width=300", caption: "Reels" },
    ],
    icon: "/placeholder.svg?height=120&width=120",
    features: [
      "Photo & video sharing",
      "Stories",
      "Reels",
      "Direct messaging",
      "Live streaming",
    ],
    requirements: "iOS 14.0 or later",
    releaseNotes: "Bug fixes and performance improvements.",
    ageRating: "12+",
    languages: [
      "English",
      "Spanish",
      "French",
      "German",
      "Italian",
      "Portuguese",
      "Japanese",
      "Korean",
    ],
    reviews: [],
    inAppPurchases: true,
    isFeatured: true,
  },
  {
    id: "whatsapp",
    name: "WhatsApp Messenger",
    developer: "WhatsApp Inc.",
    category: "social",
    price: 0,
    rating: 4.6,
    reviewCount: 1800000,
    size: "198.2 MB",
    version: "24.1.78",
    description: "Simple, reliable, private messaging and calling for free.",
    longDescription:
      "WhatsApp Messenger is a FREE messaging app available for iPhone and other smartphones. WhatsApp uses your phone's Internet connection to message and call friends and family.",
    screenshots: [
      { url: "/placeholder.svg?height=600&width=300", caption: "Chats" },
      { url: "/placeholder.svg?height=600&width=300", caption: "Messaging" },
    ],
    icon: "/placeholder.svg?height=120&width=120",
    features: [
      "Free messaging",
      "Voice & video calls",
      "Group chats",
      "End-to-end encryption",
      "Status updates",
    ],
    requirements: "iOS 15.1 or later",
    releaseNotes: "Improved call quality and bug fixes.",
    ageRating: "4+",
    languages: [
      "English",
      "Spanish",
      "French",
      "German",
      "Italian",
      "Portuguese",
      "Arabic",
      "Hindi",
    ],
    reviews: [],
  },
];

export const appCategories = [
  { key: "all", name: "All", icon: LuSmartphone },
  { key: "games", name: "Games", icon: LuGamepad2 },
  {
    key: "productivity",
    name: "Productivity",
    icon: LuBriefcase,
  },
  {
    key: "social",
    name: "Social",
    icon: LuMessageSquare,
  },
  {
    key: "entertainment",
    name: "Entertainment",
    icon: LuPlay,
  },
  {
    key: "utilities",
    name: "Utilities",
    icon: LuZap,
  },
  { key: "health", name: "Health", icon: LuHeart },
  {
    key: "education",
    name: "Education",
    icon: LuBookOpen,
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
      name: "Gallery",
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
      name: "Camera",
      slur: "camera",
      icon: LuCamera,
      color: "bg-white text-black",
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
      name: "Mail",
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
  ],
  [
    {
      name: "Mi Store",
      slur: "app-store",
      icon: IoLogoAppleAppstore,
      color: "",
    },
    {
      name: "Phone",
      slur: "phone-dialer",
      icon: FaPhone,
      color: "bg-green-600",
    },
    {
      name: "Chess",
      slur: "chess",
      icon: FaChessQueen,
      color: "bg-yellow-200",
    },
    // Intentionally left empty for the music player widget. Add your apps in another array
  ],
];
