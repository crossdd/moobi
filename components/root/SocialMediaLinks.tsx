import { socialMediaPlatforms } from "@/constants";
import Link from "next/link";
import { FloatingNav } from "../ui/floating-navbar";

const SocialLinks = () => {
    return (
        <FloatingNav className="right-4 top-1/2 -translate-y-1/2 z-[5000] flex flex-col gap-3">
            {socialMediaPlatforms.map((item) => (
                <Link
                    key={item.title}
                    href={item.href}
                    title={item.title}
                    target="_blank"
                    className="relative flex aspect-square items-center justify-center rounded-full bg-gray-300 w-10 h-10 p-1 hover:scale-150 transition-all ease-in-out duration-300"
                >
                    <div
                        className="flex items-center justify-center w-6 h-6"
                    >
                        <item.icon fill="#000319" className="h-full w-full" />
                    </div>
                </Link>
            ))}
        </FloatingNav>
    );
};

export default SocialLinks;
