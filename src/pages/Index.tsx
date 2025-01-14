import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { AISection } from "@/components/AISection";
import { Testimonials } from "@/components/Testimonials";

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <Features />
      <Testimonials />
      <AISection />
    </div>
  );
};

export default Index;