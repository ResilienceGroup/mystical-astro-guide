import { useEffect } from "react";
import { motion } from "framer-motion";

interface LoadingStepProps {
  onComplete: () => void;
}

export const LoadingStep = ({ onComplete }: LoadingStepProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 20000); // Augmenté à 20 secondes

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="relative h-[400px] flex items-center justify-center">
      <div className="absolute inset-0">
        {/* Stars background */}
        <div className="absolute inset-0 opacity-50">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", delay: i * 0.1 }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Planets */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {/* Sun */}
          <div className="absolute w-16 h-16 bg-yellow-500 rounded-full left-0 top-0" />
          
          {/* Orbits */}
          {[1, 2, 3].map((orbit) => (
            <motion.div
              key={orbit}
              className="absolute rounded-full border border-white/20"
              style={{
                width: `${orbit * 100}px`,
                height: `${orbit * 100}px`,
                left: `-${orbit * 50}px`,
                top: `-${orbit * 50}px`,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 10 - orbit * 2, repeat: Infinity, ease: "linear" }}
            >
              {/* Planet */}
              <motion.div
                className="absolute w-4 h-4 bg-primary rounded-full"
                style={{ left: "50%", top: "-2px" }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="relative z-10 text-center space-y-4">
        <h2 className="font-display text-2xl">Analyse en cours... ✨</h2>
        <p className="text-gray-300">Nous préparons votre rapport personnalisé</p>
      </div>
    </div>
  );
};