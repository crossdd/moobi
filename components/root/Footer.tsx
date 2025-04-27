import Link from "next/link";
import { MdEmail } from "react-icons/md";
import AnimatedText from "./AnimatedText";
import MagicButton from "./MagicButton";

const Footer = () => {
  return (
    <footer id="contact" className="flex-center gap-4 flex-col w-full px-3 py-6">
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
