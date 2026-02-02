import Hero from "@/components/ui/Hero";
import TechMarquee from "@/components/ui/TechMarquee";
import BentoGrid from "@/components/ui/BentoGrid";
import Blueprint from "@/components/ui/Blueprint";
import SocialProof from "@/components/ui/SocialProof";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col overflow-x-hidden">
      <Hero />
      <TechMarquee />
      <BentoGrid />
      <Blueprint />
      <SocialProof />
      <Footer />
    </main>
  );
}
