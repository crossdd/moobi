import { socialMediaPlatforms } from "@/constants";
import Link from "next/link";

const SocialLinks = () => {

    return (
        <div
            className="flex flex-col gap-4 rounded-2xl fixed right-2 z-50 top-[75%] -translate-y-[75%] md:top-1/2 md:-translate-y-1/2"
        >
            {socialMediaPlatforms.map((item) => (
                <Link
                    key={item.title}
                    href={item.href}
                    target="_blank"
                    className="relative flex aspect-square items-center justify-center rounded-full bg-gray-300 w-10 h-10 p-1 hover:scale-150 transition-all ease-in-out duration-300">
                    <div
                        className="flex items-center justify-center w-6 h-6"
                    >
                        <item.icon className="h-full w-full text-black-100" />
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default SocialLinks;
