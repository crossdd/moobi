import { testimonials } from "@/constants"
import AnimatedText from "./AnimatedText";
import { AnimatedTestimonials } from "./ui/AnimatedTestimonials";

const Testimonials = () => {
  return (
    <div id="testimonial" className="min-h-screen">
      <AnimatedText
        title={
          <>
            Hear from my{" "}
            <span className="text-violet-500 font-exo">satisfied clients</span>
          </>
        }
      />
      <AnimatedTestimonials testimonials={testimonials} />
    </div>
  );
};

export default Testimonials;
