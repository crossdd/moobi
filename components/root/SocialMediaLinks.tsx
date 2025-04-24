import { socialMediaPlatforms } from "@/constants";
import Link from "next/link";

const SocialLinks = () => {
    return (
        <div
            className="flex flex-col gap-4 rounded-2xl fixed right-1 md:right-2 z-50 top-1/2 -translate-y-1/2"
        >
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
        </div>
    );
};

export default SocialLinks;
