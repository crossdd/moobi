import Link from "next/link";
import { MdEmail } from "react-icons/md";
import { MaskContainer } from "../ui/svg-mask";
import AnimatedText from "./AnimatedText";
import MagicButton from "./MagicButton";

const Footer = () => {
  return (
    <footer id="contact" className="flex-center gap-4 h-[10rem] flex-col w-full px-3 py-6">
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
        <div className="flex-center flex-col gap-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Leaving Already??
          </h2>
          <p className="text-lg max-w-[600px]">
            Well then, remember this: &apos;&apos;You are <em className="font-serif text-violet-500">unique</em> and that&apos;s what makes you <em className="font-serif text-violet-500">special</em>.&apos;&apos; Keep shining
          </p>
        </div>
      </MaskContainer>

      <Link href="mailto:epiphanusonyeso05@gmail.com" className="max-w-52 bg-viole">
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
