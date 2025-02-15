import Image from "next/image";
import { AuroraBackground } from "./ui/aurora-background";

const Hero = () => {
  return (
    <AuroraBackground showRadialGradient={true} className="overflow-hidden gap-12 lg:gap-0">
      <div className="flex flex-col gap-2 leading-loose tracking-wider text-center lg:text-left z-50 lg:w-1/2 lg:px-12">
        <p className="text-base">
          Hello there 👋
        </p>

        <h1 className="heading font-bold">I&apos;m Epiphanus Onyeso</h1>

        <h2 className="test-2xl font-medium">Full Stack Developer. Turning ideas into interactive, scalable and beautiful web solutions, one code at a time.</h2>
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
    </AuroraBackground>
  );
};

export default Hero;