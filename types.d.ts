interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    des: string;
    thumbnail: string;
    technologies: {
      title: string;
      icon: string;
    }[];
    liveUrl: string;
    githubUrl: string;
  };
}

type ScreenDisplay =
  | "home"
  | "phone"
  | "mail"
  | "gallery"
  | "video-player"
  | "image-view";
