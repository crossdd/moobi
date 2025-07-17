import signature from "@/public/images/signature.svg";
import Image from "next/image";
import React from "react";
import MacbookScroll from "@/components/ui/macbook-scroll";

const Footer = () => {
  return (
    <footer id="contact" className="flex-center flex-col w-full px-3">
      <MacbookScroll
        title={
          <h2 className="heading text-center">
            Ready to take your digital presence to the next level?
          </h2>
        }
        badge={
          <Image src={signature} alt="Iam Unique" width={100} height={30} className="invert" />
        }
      />

      <div className="text-sm md:text-base text-neutral-700 pt-12 pb-5">
        &copy; Epiphanus {new Date().getFullYear()} | All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
