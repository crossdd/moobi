import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa6";

export const navItems = [
  { name: "About", link: "#about" },
  { name: "Skills", link: "#skills" },
  { name: "Projects", link: "#projects" },
  { name: "Contact", link: "#contact" },
];

export const projects = [
  {
    id: "zentry",
    title: "Zentry - Gaming Website",
    des: "Delve into the world of gaming with insane animations and excellent graphics - The Exp is unreal",
    thumbnail: "/images/zentry.png",
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
    liveUrl: "https://zentryawwwards.vercel.app/",
    githubUrl: "https://github.com/IamUniq/zentry",
  },
  {
    id: "pixel-care",
    title: "Pixel Care",
    des: "A Comprehensive Health Management System designed to streamline hospital operations ensuring top-tier care and operational excellence",
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
    githubUrl: "https://github.com/IamUniq/pixel-care",
  },
  {
    id: "brainwave",
    title: "Brainwave",
    des: "Learning how to use GSAP to create nice animations and transitions. Totally worth it...",
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
    githubUrl: "https://github.com/IamUniq/pixel-brainwave",
  },
  {
    id: "gericht",
    title: "Gericht",
    des: "Minimalistic website for a restaurant: responsive and neatly designed",
    thumbnail: "/images/gericht.png",
    technologies: [
      {
        title: "React",
        icon: "/icons/re.svg",
      },
      {
        title: "Tailwindcss",
        icon: "/icons/tail.svg",
      },
    ],
    liveUrl: "https://gericht-restaurant-rust.vercel.app/",
    githubUrl: "https://github.com/IamUniq/gericht-restaurant",
  },
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
  frontend: ["HTML & CSS", "Javascript", "React", "Next.js"],
  backend: ["Node.js", "PostgreSQL", "GraphQL", "Appwrite"],
  tools: ["Tailwindcss", "Vite", "Typescript", "Prisma"],
  mobile: ["React Native", "Expo"]
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
    href: "https://x.com/1am_uniq",
  },
  {
    title: "GitHub",
    icon: FaGithub,
    href: "https://github.com/IamUniq",
  },
];