import { useLenis } from "@/hooks/useLenis";
import CustomCursor from "@/components/CustomCursor";
import GradientBackground from "@/components/GradientBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Works from "@/components/Works";
import AnimationsSection from "@/components/AnimationsSection";
import VFXSection from "@/components/VFXSection";
import PostersSection from "@/components/PostersSection";
import ToolsSection from "@/components/ToolsSection";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  useLenis();

  return (
    <div className="relative min-h-screen selection:bg-primary/30 selection:text-primary-foreground">
      <GradientBackground />
      <CustomCursor />
      
      <Navbar />
      
      <main className="flex flex-col w-full relative z-10">
        <Hero />
        <About />
        <Works />
        <AnimationsSection />
        <VFXSection />
        <PostersSection />
        <ToolsSection />
        <Reviews />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
