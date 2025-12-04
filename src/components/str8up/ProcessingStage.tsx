import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

const slides = [
  {
    title: "Achieve 28% TCO Reduction",
    description: "Our clients average a 28% reduction in Total Cost of Ownership within the first 12 months of cloud migration.",
    highlight: "28%",
  },
  {
    title: "99.99% Uptime Guarantee",
    description: "Enterprise-grade reliability with automated failover and disaster recovery built into every solution.",
    highlight: "99.99%",
  },
  {
    title: "85% Faster Deployment",
    description: "Accelerate time-to-market with our proven migration frameworks and automation tools.",
    highlight: "85%",
  },
  {
    title: "Zero Security Incidents",
    description: "Industry-leading security practices ensure your data stays protected throughout the modernization journey.",
    highlight: "100%",
  },
];

export default function ProcessingStage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[calc(100vh-96px)] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl text-center">
        {/* Processing Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Loader2 className="w-8 h-8 text-[#009B77] animate-spin" />
            <h2 className="text-2xl md:text-3xl text-[#1C2833] dark:text-white">
              Analyzing Your Infrastructure
            </h2>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Crunching 150+ metrics to generate your Margin-First Modernization Strategy...
          </p>
        </motion.div>

        {/* Slider */}
        <div className="relative h-96 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-amber-200 dark:border-slate-800 overflow-hidden">
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 flex flex-col items-center justify-center p-8"
              initial={{ opacity: 0, x: 100 }}
              animate={{
                opacity: currentSlide === index ? 1 : 0,
                x: currentSlide === index ? 0 : -100,
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-7xl md:text-8xl text-[#009B77] mb-6">
                {slide.highlight}
              </div>
              <h3 className="text-2xl md:text-3xl text-amber-900 dark:text-white mb-4">
                {slide.title}
              </h3>
              <p className="text-lg text-amber-900/70 dark:text-slate-400 max-w-xl">
                {slide.description}
              </p>
            </motion.div>
          ))}

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index
                    ? "w-8 bg-[#009B77]"
                    : "bg-amber-300 dark:bg-slate-700"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Subtle Brand Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-sm text-amber-800 dark:text-slate-500"
        >
          Powered by ZAHLENTECH's AI-driven modernization engine
        </motion.p>
      </div>
    </div>
  );
}