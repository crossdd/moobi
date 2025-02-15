import About from "@/components/About";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import RecentProjects from "@/components/RecentProjects";
import Testimonials from "@/components/Testimonials";
import Skills from "@/components/Skills";
import SocialLinks from "@/components/SocialMediaLinks";

export default function Home() {
  return (
    <main className="font-merriweather w-full min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <RecentProjects />
      <Testimonials />
      <SocialLinks />
      <Footer />
    </main>
  );
}
