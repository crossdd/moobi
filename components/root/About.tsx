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
      <div className="flex justify-center flex-col px-4 md:px-12  md:justify-start lg:justify-center lg:basis-1/2">
        <div className="text-center">
          <h1 className="heading text-center">
            Who am I?
          </h1>
          <h3 className="text-sm text-gray-400">Just a chill guy who wants to build, build, build, ...</h3>
        </div>

        <div className="max-w-3xl text-[17px] md:text-xl mt-8 text-left leading-loose tracking-wide flex flex-col gap-3 text-gray-300">
          <p>
            I am Epiphanus Onyeso. I am a fullstack developer who enjoys building user-friendly web and mobile applications that solve real-world problems and enhance user experiences.
          </p>

          <p>
            I am not just a machine who writes code though. I have practiced a diverse set of skills: critical thinking, business strategy, sales and marketing, in order to build complete, scalable web applications. An app that can save the whole planet with no users is just a side project, right?
          </p>

          <p>
            I strive to stay up-to-date with modern technologies and trends, creating efficient and elegant solutions that help businesses stand out.
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
