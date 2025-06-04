interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  liveUrl: string;
  githubUrl: string;
  technologies: {
    title: string;
    icon: string;
  }[];
  subtitle?: string;
  team?: boolean;
  features: string[];
  challenges: string[];
  learnings: string[];
}

interface ProjectCardProps {
  project: Project;
}

type ScreenDisplay =
  | "home"
  | "phone"
  | "mail"
  | "gallery"
  | "video-player"
  | "image-view";
