import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "../ui/text-generate";
import ImagePreview from "./ImagePreview";

const Hero = () => {
  return (
    <section id="hero" className="relative text-vio h-screen w-full flex flex-col lg:flex-row items-center justify-center lg:gap-12">
      <Spotlight />

      <TextGenerateEffect words="Creativity" />
      <TextGenerateEffect words="+" duration={2} />
      <TextGenerateEffect words="Innovation" duration={3} />
      <TextGenerateEffect words="=" duration={4} />

      <ImagePreview />
    </section>
  );
}

export default Hero;