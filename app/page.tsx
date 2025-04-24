import {
  About,
  Footer,
  Hero,
  Navbar,
  RecentProjects,
  Skills,
  // SocialLinks
} from "@/components/root";
import { FloatingNav } from "@/components/ui/floating-navbar";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden min-h-screen bg-black">
      <Navbar />

      <Hero />
      <About />
      <Skills />
      <RecentProjects />
      <Footer />

      <div className="h-[10rem]">
        <FloatingNav />
      </div>
    </main>
  );
}
