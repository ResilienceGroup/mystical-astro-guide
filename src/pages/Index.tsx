import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { AISection } from "@/components/AISection";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <Features />
      <Testimonials />
      <AISection />
      <FAQ />
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <Link to="/legal" className="text-sm text-gray-400 hover:text-white">
            Mentions légales & CGU
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Index;