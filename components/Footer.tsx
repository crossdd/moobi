import { MdEmail } from "react-icons/md";
import AnimatedText from "./AnimatedText";
import MagicButton from "./MagicButton";

const Footer = () => {
  return (
    <footer id="contact" className="w-full px-3 py-6">
      <AnimatedText
        title={
          <>
            Ready to take your digital presence to the{" "}
            <span className="text-violet-500 font-exo">next level?</span>
          </>
        }
        subtitle="Reach out now let's discuss how I can help you achieve your
            goals"
        otherClasses="w-full md:max-w-[60vw] flex-center mx-auto"
      >
        <a href="mailto:onyesoepiphanus@gmail.com">
          <MagicButton
            title="Let's talk"
            icon={<MdEmail />}
            position="left"
            otherClasses="mt-0"
            animate
          />
        </a>
      </AnimatedText>

      <div className="mt-16 text-sm text-center md:text-base">
        Copyright &copy; 2024 Epiphanus
      </div>
    </footer>
  );
};

export default Footer;
