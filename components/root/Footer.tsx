import signature from "@/public/images/signature.svg";
import Image from "next/image";
import { MacbookScroll } from "../ui/macbook-scroll";

const Footer = () => {
  return (
    <footer id="contact" className="flex-center flex-col w-full px-3 py-6">
      <MacbookScroll
        title={
          <h2 className="heading text-center w-full md:max-w-[70vw] lg:max-w-[60vw]">
            Ready to take your digital presence to the {" "}
            <span className="text-special">next level?</span>
          </h2>
        }
        badge={
          <Image src={signature} alt="Iam Unique" width={100} height={30} className="invert" />
        }
      />

      <div className="text-sm md:text-base text-neutral-700">
        Copyright &copy; 2024 Epiphanus
      </div>
    </footer>
  );
};

export default Footer;
