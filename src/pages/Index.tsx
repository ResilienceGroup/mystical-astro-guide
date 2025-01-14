import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { AISection } from "@/components/AISection";

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <Features />
      <AISection />
    </div>
  );
};

export default Index;