import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { Sparkles, Moon, Sun, ArrowLeft, ChevronRight, Loader2 } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import InfoStage from "../components/str8up/InfoStage";
import OnboardingStage from "../components/str8up/OnboardingStage";
import ProcessingStage from "../components/str8up/ProcessingStage";
import ResultsStage from "../components/str8up/ResultsStage";
import CTAStage from "../components/str8up/CTAStage";

type Stage = "info" | "onboarding" | "processing" | "results" | "cta";

export default function Str8upMapPage() {
  const { theme, toggleTheme } = useTheme();
  const [currentStage, setCurrentStage] = useState<Stage>("info");
  const [formData, setFormData] = useState({
    businessSize: "",
    cloudProvider: "",
    complexity: 50,
    budget: "",
    riskTolerance: "",
    compliance: "",
  });

  const handleStartAssessment = () => {
    setCurrentStage("onboarding");
  };

  const handleOnboardingComplete = (data: typeof formData) => {
    setFormData(data);
    setCurrentStage("processing");
    
    // Simulate processing time
    setTimeout(() => {
      setCurrentStage("results");
    }, 5000);
  };

  const handleViewCTA = () => {
    setCurrentStage("cta");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-amber-50 dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-950 transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 md:py-6 bg-white/90 dark:bg-[#1C2833]/90 backdrop-blur-lg border-b border-amber-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <ArrowLeft className="w-5 h-5 text-amber-800 dark:text-slate-300 group-hover:text-amber-900 dark:group-hover:text-amber-500 transition-colors" />
            <span className="text-lg md:text-2xl text-amber-900 dark:text-white tracking-wider font-bold">ZAHLENTECH | STR8UP</span>
          </Link>

          <div className="flex items-center gap-4">
            {currentStage === "onboarding" && (
              <div className="hidden md:block text-sm text-slate-600 dark:text-slate-400">
                Margin-First Modernization Strategy
              </div>
            )}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-slate-700" />
              ) : (
                <Sun className="w-5 h-5 text-amber-400" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-20 md:pt-24">
        <AnimatePresence mode="wait">
          {currentStage === "info" && (
            <InfoStage
              key="info"
              onStartAssessment={handleStartAssessment}
            />
          )}
          {currentStage === "onboarding" && (
            <OnboardingStage
              key="onboarding"
              onComplete={handleOnboardingComplete}
            />
          )}
          {currentStage === "processing" && (
            <ProcessingStage key="processing" />
          )}
          {currentStage === "results" && (
            <ResultsStage
              key="results"
              formData={formData}
              onViewCTA={handleViewCTA}
            />
          )}
          {currentStage === "cta" && (
            <CTAStage key="cta" />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}