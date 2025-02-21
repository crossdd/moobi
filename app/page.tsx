import {
  About,
  Footer,
  Hero,
  Navbar,
  RecentProjects,
  Skills,
  SocialLinks
} from "@/components/root";

export default function Home() {
  return (
    <main className="w-full overflow-x-clip min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <RecentProjects />
      <Footer />

      <SocialLinks />
    </main>
  );
}
