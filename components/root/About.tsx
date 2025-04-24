import Link from "next/link";
import { MdHandshake } from "react-icons/md";
import { MacbookScroll } from "../ui/macbook-scroll";
import MagicButton from "./MagicButton";
import Image from "next/image";
import signature from "@/public/images/signature.svg"

const About = () => {
  return (
    <section
      id="about"
      className="w-full relative flex flex-col md:flex-row gap-8 min-h-screen"
    >
      <div className="flex justify-center flex-col px-4 md:px-12  md:justify-start lg:justify-center lg:basis-1/2">
        <h2 className="heading leading-tight font-poppins">About Me</h2>

        <div className="max-w-3xl text-[17px] md:text-xl mt-8 text-left leading-relaxed tracking-wide flex flex-col gap-3 text-gray-300">
          <p>
            I am that unique fullstack developer engineer who enjoys building user-friendly applications that solve real-world problems and enhance user experiences.
          </p>

          <p>Having honed a diverse set of skills, I build complete, scalable web applications. Beyond clean code, I bring critical thinking, business strategy, sales and marketing experience to the table. </p>

          <p>
            I strive to stay up-to-date with modern technologies and trends, creating efficient and elegant solutions that help businesses stand out.
          </p>
        </div>

        <Link href="#projects" className="w-52">
          <MagicButton
            title="View Projects"
            icon={<MdHandshake />}
            position="right"
            animate={true}
          />
        </Link>
      </div>

      <MacbookScroll badge={
        <Image src={signature} alt="Iam Unique" width={100} height={30} className="invert" />
      } />
    </section>
  );
};

export default About;
