import Link from "next/link";
import { MdEmail } from "react-icons/md";
import MagicButton from "./MagicButton";
import Phone from "./Phone";

const About = () => {
  return (
    <section
      id="about"
      className="w-full relative flex flex-col items-center lg:flex-row gap-8 min-h-screen xsx:mt-12 xxs:mt-0"
    >
      <div className="flex justify-center flex-col px-4 md:px-12  md:justify-start lg:justify-center lg:basis-1/2 gap-8">
        <div className="text-center">
          <h1 className="heading text-center">
            Who am I?
          </h1>
          <h3 className="text-sm text-gray-400">Just a chill guy who wants to build, build, build, ...</h3>
        </div>

        <div className="max-w-3xl text-[17px] md:text-xl text-left leading-loose tracking-wide flex flex-col gap-3 text-gray-300">
          <p>
            I&apos;m Epiphanus Onyeso, a fullstack developer passionate about building web and mobile apps that solve real problems and deliver great user experiences.
          </p>

          <p>
            Beyond coding, I&apos;ve explored business strategy, marketing, and sales — because a great app needs more than just clean code, right?. I stay current with modern tech to create smart, scalable, and user-focused solutions that help businesses grow.
          </p>
        </div>

        <Link href="mailto:epiphanusonyeso05@gmail.com" className="max-w-52">
          <MagicButton
            title="Let's talk"
            icon={<MdEmail />}
            position="left"
            otherClasses="mt-0"
            animate
          />
        </Link>
      </div>

      <div className="flex-center lg:basis-1/2">
        <Phone />
      </div>
    </section>
  );
};

export default About;
