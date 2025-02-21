import Link from "next/link";
import Image from "next/image";
import { MdExplore } from "react-icons/md";
import { AuroraBackground } from "../ui/aurora-background";
import MagicButton from "./MagicButton";

import imageSrc from "@/public/images/profile.jpg";

const Hero = () => {
  return (
    <AuroraBackground showRadialGradient={true}>
      <div className="flex flex-col md:items-center lg:items-start gap-2 leading-loose tracking-wider text-center lg:text-left z-50 lg:w-1/2 lg:ms-12">
        <p className="text-base text-neutral-600">
          Hello there 👋
        </p>

        <h1 className="heading font-bold">I&apos;m Epiphanus Onyeso</h1>

        <h2 className="text-2xl font-medium max-w-md text-neutral-800 xxs:px-2 xs:px-0">Full Stack Developer. Turning ideas into interactive, scalable and beautiful web solutions, one code at a time.</h2>

        <Link href="#projects" className="hidden lg:block w-60">
          <MagicButton
            title="Explore My Work"
            icon={<MdExplore />}
            position="right"
          />
        </Link>
      </div>

      <div className="flex items-center justify-center lg:w-1/2 z-50">
        <div className="w-72 h-72 sm:w-[24rem] sm:h-[24rem] overflow-hidden rounded-full">
          <Image
            src={imageSrc}
            alt={"Onyeso Epiphanus"}
            className="rounded-full object-cover object-center"
            placeholder="blur"
          />
        </div>
      </div>
    </AuroraBackground>
  );
};

export default Hero;