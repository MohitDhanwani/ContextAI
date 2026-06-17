import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { DemoSection } from "@/components/landing/DemoSection";
import { FooterSection } from "@/components/landing/FooterSection";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-base selection:bg-accent selection:text-[#0a0a0a]">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <DemoSection />
      <FooterSection />
    </main>
  );
}
