import {
  About,
  Footer,
  Hero,
  Navbar,
  RecentProjects,
  Skills,
  SocialLinks,
} from "@/components/root";

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden min-h-screen bg-black">
      <Navbar />
      <SocialLinks />

      <Hero />
      <About />
      <Skills />
      <RecentProjects />
      <Footer />
    </main>
  );
}
