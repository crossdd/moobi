import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa6";
import { FloatingDock } from "./ui/floating-docks";

const SocialLinks = () => {
    const links = [
        {
            title: "LinkedIn",
            icon: (
                <FaLinkedin className="h-full w-full text-black-100" />
            ),
            href: "https://www.linkedin.com/in/onyeso-epiphanus-8651b1284",
        },
        {
            title: "Twitter",
            icon: (
                <FaTwitter className="h-full w-full text-black-100" />
            ),
            href: "https://x.com/CopTrippie87871",
        },
        {
            title: "GitHub",
            icon: (
                <FaGithub className="h-full w-full text-black-100" />
            ),
            href: "https://github.com/lucidfort",
        },
    ];
    return (
        <FloatingDock mobileClassName="translate-y-20" items={links} />
    );
};

export default SocialLinks;
