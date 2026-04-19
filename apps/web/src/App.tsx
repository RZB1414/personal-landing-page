import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/ui/Hero";
import TechMarquee from "@/components/ui/TechMarquee";
import Services from "@/components/ui/Services";
import Process from "@/components/ui/Process";
import Contact from "@/components/ui/Contact";
import Footer from "@/components/ui/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <Services />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
