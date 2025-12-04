import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, ArrowRight } from "lucide-react";
import { useEffect } from "react";

interface SolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  solution: {
    icon: any;
    title: string;
    description: string;
    image: string;
    detailedInfo: {
      overview: string;
      keyFeatures: string[];
      benefits: string[];
      useCases: string[];
      pricing?: string;
    };
  };
}

export default function SolutionModal({ isOpen, onClose, solution }: SolutionModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                </button>

                {/* Scrollable Content */}
                <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
                  {/* Header Image */}
                  <div className="relative h-48 md:h-64 overflow-hidden">
                    <img
                      src={solution.image}
                      alt={solution.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-transparent to-transparent" />
                    
                    {/* Icon Badge */}
                    <div className="absolute bottom-4 left-4 md:left-8 w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-lg">
                      <solution.icon className="w-8 h-8 md:w-10 md:h-10 text-amber-700 dark:text-amber-500" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    {/* Title & Description */}
                    <div className="mb-8">
                      <h2 className="text-3xl md:text-4xl text-slate-900 dark:text-white mb-4">
                        {solution.title}
                      </h2>
                      <p className="text-lg text-slate-600 dark:text-slate-400">
                        {solution.description}
                      </p>
                    </div>

                    {/* Overview */}
                    <div className="mb-8">
                      <h3 className="text-xl text-slate-900 dark:text-white mb-3">Overview</h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        {solution.detailedInfo.overview}
                      </p>
                    </div>

                    {/* Key Features */}
                    <div className="mb-8">
                      <h3 className="text-xl text-slate-900 dark:text-white mb-4">Key Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {solution.detailedInfo.keyFeatures.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
                          >
                            <CheckCircle2 className="w-5 h-5 text-[#009B77] flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-slate-700 dark:text-slate-300">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="mb-8">
                      <h3 className="text-xl text-slate-900 dark:text-white mb-4">Benefits</h3>
                      <ul className="space-y-3">
                        {solution.detailedInfo.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-amber-700 dark:bg-amber-500 mt-2 flex-shrink-0" />
                            <span className="text-slate-600 dark:text-slate-400">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Use Cases */}
                    <div className="mb-8">
                      <h3 className="text-xl text-slate-900 dark:text-white mb-4">Perfect For</h3>
                      <div className="flex flex-wrap gap-2">
                        {solution.detailedInfo.useCases.map((useCase, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700/50 rounded-full text-sm text-amber-900 dark:text-amber-300"
                          >
                            {useCase}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-200 dark:border-slate-800">
                      <button className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-700 to-orange-600 dark:from-amber-600 dark:to-orange-500 text-white rounded-full hover:shadow-lg transition-all flex items-center justify-center gap-2 group">
                        Get Started
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button className="flex-1 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                        Schedule Demo
                      </button>
                    </div>

                    {/* Pricing if available */}
                    {solution.detailedInfo.pricing && (
                      <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg text-center">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {solution.detailedInfo.pricing}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
