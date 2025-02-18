import { Award, Baby, Bug, Rocket } from "lucide-react";

export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Stack", link: "#stack" },
  { name: "Contact", link: "#contact" },
];

export const projects = [
  {
    id: "zentry",
    title: "Zentry - Gaming Website",
    des: "Delve into the world of gaming with insane animations and excellent graphics - The Exp is unreal",
    thumbnail: ["/images/zentry.png"],
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
    githubUrl: "https://github.com/lucidfort/zentry",
  },
  {
    id: "pixel-care",
    title: "Pixel Care",
    des: "A Comprehensive Health Management System designed to streamline hospital operations ensuring top-tier care and operational excellence",
    thumbnail: ["/images/pixelcare.png"],
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
    githubUrl: "https://github.com/lucidfort/pixel-care",
  },
  {
    id: "brainwave",
    title: "Brainwave",
    des: "Learning how to use GSAP to create nice animations and transitions. Totally worth it...",
    thumbnail: ["/images/brainwave.png"],
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
    githubUrl: "https://github.com/lucidfort/pixel-brainwave",
  },
  {
    id: "gericht",
    title: "Gericht",
    des: "Minimalistic website for a restaurant: responsive and neatly designed",
    thumbnail: ["/images/gericht.png"],
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
    githubUrl: "https://github.com/lucidfort/gericht-restaurant",
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
  tools: ["Tailwindcss", "Drizzle", "Typescript", "Prisma"],
};

export const experiences = [
  {
    year: "12/03/2023",
    title: "The Beginning",
    content:
      "The journey of a thousand miles began. Wrote my first ever HTML code.",
    color: "#3b82f6",
    icon: Baby,
  },
  {
    year: "May 18, 2023 - May 21, 2023",
    title: "Coding Freak",
    content:
      "Ahh!! The times when I all cared about was just writing code. Stayed up for 3 days, learning and building projects.",
    color: "#22c55e",
    icon: Award,
  },
  {
    year: "Jan 12, 2024",
    title: "Bug Attack",
    content:
      "The day I encountered my first monstrous bug. It was a nightmare.",
    color: "#5d3a1a",
    icon: Bug,
  },
  {
    year: new Date().toDateString(),
    title: "What Now?",
    content:
      "Nothing has changed. Late nights, bug attacks, and the joy of building something new. The journey continues...",
    color: "#ec4899",
    icon: Rocket,
  },
];
