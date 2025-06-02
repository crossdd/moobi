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
  // subtitle: string;
  // status: string;
  // duration: string;
  // team: string;
  // year: string;
  // features: string[];
  // challenges: string[];
  // learnings: string[];
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
