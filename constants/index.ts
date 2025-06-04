import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa6";

export const navItems = [
  { name: "About", link: "#about" },
  { name: "Skills", link: "#skills" },
  { name: "Projects", link: "#projects" },
  { name: "Contact", link: "#contact" },
];

export const projects = [
  {
    id: "snapgram",
    title: "Snapgram",
    description:
      "A modern social media web app that lets users share photos, videos, and stories in real time. It mimics the experience of platforms like Instagram with a focus on simplicity and responsiveness. Users can upload content, follow others, and interact through likes and views. It’s designed for creators and social media enthusiasts who want a lightweight, fast, and visually engaging experience.",
    thumbnail: "/images/snapgram.png",
    technologies: [
      {
        title: "Nextjs",
        icon: "/icons/next.svg",
      },
      {
        title: "Tailwindcss",
        icon: "/icons/tail.svg",
      },
      {
        title: "Typescript",
        icon: "/icons/ts.svg",
      },
      {
        title: "Appwrite",
        icon: "/icons/appwrite.svg",
      },
    ],
    liveUrl: "https://snapgram-patroncodes.vercel.app/",
    githubUrl: "https://github.com/patroncodes/snapgram",
    features: [
      "User Authentication and Management",
      "Content Management (posts, stories, highlights)",
      "Like and save functionality",
      "Personalized user profiles",
    ],
    challenges: [
      "Handling errors and providing proper feedback",
      "Working with Tanstack Query, since it was my first time",
      "Creating intuitive data visualizations",
    ],
    learnings: [
      "How to use TanStack Query for managing server state, caching, and background data synchronization",
      "How to create and implement Appwrite Functions",
    ],
  },
  {
    id: "pixel-care",
    title: "Pixel Care",
    description:
      "A healthcare management platform tailored for clinics, hospitals, and solo practitioners. It helps medical professionals manage appointments, patient records, and doctor-patient interactions efficiently. It prioritizes ease of use, data security, and speed. The platform serves both healthcare providers and patients looking for organized, digital-first medical experiences",
    thumbnail: "/images/pixelcare.png",
    technologies: [
      {
        title: "Nextjs",
        icon: "/icons/next.svg",
      },
      {
        title: "Tailwindcss",
        icon: "/icons/tail.svg",
      },
      {
        title: "Typescript",
        icon: "/icons/ts.svg",
      },
      {
        title: "Appwrite",
        icon: "/icons/appwrite.svg",
      },
    ],
    liveUrl: "https://pixel-care.vercel.app",
    githubUrl: "https://github.com/patroncodes/pixel-care",
    features: [
      "Appointment Scheduling",
      "Medical Records Management",
      "Real-Time Notifications",
      "Responsive design",
    ],
    challenges: [
      "Handling sensitive data",
      "Ensuring role based access control",
    ],
    learnings: ["Efficient state and data management"],
  },
  {
    id: "brainwave",
    title: "Brainwave",
    description:
      "Brainwave is an AI-powered landing page for a fictional product or service that blends cutting-edge animations with modern web design. It demonstrates the power of motion and interactivity in user interfaces. It's aimed at startups and creative agencies seeking to make a bold visual impression with their digital presence.",
    thumbnail: "/images/brainwave.png",
    technologies: [
      {
        title: "React",
        icon: "/icons/re.svg",
      },
      {
        title: "Tailwindcss",
        icon: "/icons/tail.svg",
      },
      {
        title: "Typescript",
        icon: "/icons/ts.svg",
      },
      {
        title: "GSAP",
        icon: "/icons/gsap.svg",
      },
    ],
    liveUrl: "https://pixel-brainwave.vercel.app",
    githubUrl: "https://github.com/patroncodes/pixel-brainwave",
    features: [
      "Hero Animation and Smooth Transitions",
      "Interactive Content Sections",
      "Typescript-Driven Component Structure",
    ],
    challenges: [
      "Working with GSAP since it's my first time",
      "Performance Optimization",
      "Synchronizing animation timelines",
    ],
    learnings: [
      "Mastering animation with GSAP",
      "Design for Experience",
      "Strong Tying with Typescript",
    ],
  },
  {
    id: "e-library",
    title: "Bookwise",
    description:
      "An online e-library platform that allows students and academic institutions to access digital learning materials with ease. Users can browse categorized books, search academic resources, and potentially download or preview them. The platform is built for educational communities aiming to modernize access to knowledge and streamline digital content distribution.",
    thumbnail: "/images/e-library.png",
    technologies: [
      {
        title: "Nextjs",
        icon: "/icons/next.svg",
      },
      {
        title: "Tailwindcss",
        icon: "/icons/tail.svg",
      },
      {
        title: "Prisma",
        icon: "/icons/prisma.svg",
      },
      {
        title: "Redis",
        icon: "/icons/redis.svg",
      },
    ],
    liveUrl: "https://university-library-theta-jet.vercel.app/",
    githubUrl: "https://github.com/patroncodes/university-library",
    features: [
      "Searchable Digital Library",
      "Categorized Book Listings",
      "Book Preview and Borrowing Option",
      "Admin and Upload Panel",
    ],
    challenges: [
      "Resource Management (Books, PDFs, etc)",
      "Scalability of Content",
    ],
    learnings: [],
  },
  // {
  //   id: "school-manager",
  //   title: "My School",
  //   description:
  //     "A modern e-library platform offering easy access to a vast collection of digital books, research materials, and learning resources anytime, anywhere.",
  //   thumbnail: "/images/e-library.png",
  //   technologies: [
  //     {
  //       title: "Nextjs",
  //       icon: "/icons/next.svg",
  //     },
  //     {
  //       title: "Tailwindcss",
  //       icon: "/icons/tail.svg",
  //     },
  //   ],
  //   liveUrl: "https://university-library-theta-jet.vercel.app/",
  //   githubUrl: "https://github.com/patroncodes/school-manager",
  // },
];

export const testimonials = [
  {
    quote:
      "Collaborating with Epiphanus was an absolute pleasure. His promptness, and dedication to delivering exceptional results were evident throughout our project.",
    name: "Michael Chen",
    designation: "Product Manager at TechFlow",
    src: "/images/profile.jpg",
  },
  {
    quote:
      "Epiphanus's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Epiphanus is the ideal partner.",
    name: "Emily Watson",
    designation: "",
    src: "/images/no-img.png",
  },
];

export const skills = {
  frontend: ["HTML & CSS", "Javascript (TS)", "React", "Next.js"],
  backend: ["Node.js", "PostgreSQL", "GraphQL", "Appwrite"],
  tools: ["Tanstack Query", "Vite", "Upstash Redis", "Prisma"],
  mobile: ["React Native", "Expo"],
};

export const socialMediaPlatforms = [
  {
    title: "LinkedIn",
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/onyeso-epiphanus-8651b1284",
  },
  {
    title: "Twitter",
    icon: FaTwitter,
    href: "https://x.com/patroncodes",
  },
  {
    title: "GitHub",
    icon: FaGithub,
    href: "https://github.com/patroncodes",
  },
];
