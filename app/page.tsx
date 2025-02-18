import About from "@/components/About";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import AutoThemeSwitcher from "@/components/AutoThemeSwitcher";
import Navbar from "@/components/Navbar";
import RecentProjects from "@/components/RecentProjects";
import Skills from "@/components/Skills";
import SocialLinks from "@/components/SocialMediaLinks";

export default function Home() {
  return (
    <main className="w-screen max-w-[100vw] bg-white dark:bg-black-100 min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <RecentProjects />
      <Footer />

      <SocialLinks />
      <AutoThemeSwitcher />
    </main>
  );
}
