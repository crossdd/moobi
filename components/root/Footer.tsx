import Link from "next/link";
import { MdEmail } from "react-icons/md";
import { MaskContainer } from "../ui/svg-mask";
import AnimatedText from "./AnimatedText";
import MagicButton from "./MagicButton";
import { LuArrowBigDownDash } from "react-icons/lu";

const Footer = () => {
  return (
    <footer id="contact" className="flex-center gap-4 flex-col w-full px-3 py-6">
      <div id="contact" />
      <MaskContainer revealText={
        <AnimatedText
          title={
            <>
              Ready to take your digital presence to the{" "} <br />
              <span className="text-special">next level?</span>
            </>
          }
          subtitle="Reach out now let's discuss how I can help you achieve your
            goals"
          otherClasses="w-full md:max-w-[70vw] lg:max-w-[60vw]"
        />
      }>
        <div className="text-xl leading-relaxed tracking-wide max-w-2xl">
          <p>
            You are <em className="font-serif text-violet-500">unique</em> and that&apos;s what makes you special. Keep on being you
          </p>

          <p className="font-serif mt-4 flex-center flex-col animate-bounce">Adios Amigo!! See you in that call <LuArrowBigDownDash size={32} fill="#8b5cf6" /></p>
        </div>
      </MaskContainer>

      <Link href="mailto:epiphanusonyeso05@gmail.com" className="max-w-52">
        <MagicButton
          title="Let's talk"
          icon={<MdEmail />}
          position="left"
          otherClasses="mt-0"
          animate
        />
      </Link>

      <div className="mt-16 text-sm text-center md:text-base text-neutral-700">
        Copyright &copy; 2024 Epiphanus
      </div>
    </footer>
  );
};

export default Footer;
