import Image from "next/image";
import { AuroraBackground } from "../ui/aurora-background";
import { StarsBackground } from "../ui/StarsBackground";
import Link from "next/link";
import MagicButton from "./MagicButton";
import { MdExplore } from "react-icons/md";

const Hero = () => {
  return (
    <AuroraBackground showRadialGradient={true}>
      <div className="flex flex-col md:items-center lg:items-start gap-2 leading-loose tracking-wider text-center lg:text-left z-50 lg:w-1/2 lg:ms-12">
        <p className="text-base">
          Hello there 👋
        </p>

        <h1 className="heading font-bold">I&apos;m Epiphanus Onyeso</h1>

        <h2 className="text-2xl font-medium max-w-md">Full Stack Developer. Turning ideas into interactive, scalable and beautiful web solutions, one code at a time.</h2>

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
            src={"/images/profile.jpg"}
            alt={"Onyeso Epiphanus"}
            width={400}
            height={400}
            className="w-full h-full rounded-full object-cover object-center"
          />
        </div>
      </div>

      <StarsBackground />
    </AuroraBackground>
  );
};

export default Hero;