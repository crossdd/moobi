import {
  Navbar,
  Hero,
  About,
  Skills,
  RecentProjects,
  Footer,
  SocialLinks,
  AutoThemeSwitcher,
} from "@/components/root"

export default function Home() {
  return (
    <main className="w-full overflow-x-clip min-h-screen bg-white dark:bg-black-100">
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
