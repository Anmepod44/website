import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { Sparkles, Moon, Sun, ArrowLeft, ChevronRight, Loader2 } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import InfoStage from "../components/str8up/InfoStage";
import OnboardingStage from "../components/str8up/OnboardingStage";
import ProcessingStage from "../components/str8up/ProcessingStage";
import ResultsStage from "../components/str8up/ResultsStage";
import CTAStage from "../components/str8up/CTAStage";
import { submitOnboarding, checkProcessingStatus, getAnalysisResults } from "../services/str8up-api.service";
import type { AnalysisResults } from "../types/str8up-map.types";

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
  const [sessionId, setSessionId] = useState<string>("");
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingError, setProcessingError] = useState<string>("");
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleStartAssessment = () => {
    setCurrentStage("onboarding");
  };

  const handleOnboardingComplete = async (data: typeof formData) => {
    setFormData(data);
    setCurrentStage("processing");
    setProcessingProgress(0);
    setProcessingError("");
    
    try {
      // Submit onboarding data and get session ID
      const response = await submitOnboarding(data);
      setSessionId(response.sessionId);
      
      // Start polling for processing status
      startPolling(response.sessionId, data);
    } catch (error) {
      console.error("Failed to start analysis:", error);
      setProcessingError("Failed to start analysis. Please try again.");
      // Fall back to mock behavior for development
      setTimeout(() => {
        setCurrentStage("results");
      }, 3000);
    }
  };

  const startPolling = (sessionId: string, formData: any) => {
    const pollStatus = async () => {
      try {
        const statusResponse = await checkProcessingStatus(sessionId);
        setProcessingProgress(statusResponse.progress);
        
        if (statusResponse.status === 'completed') {
          // Stop polling and fetch results
          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
            pollingIntervalRef.current = null;
          }
          
          try {
            const resultsResponse = await getAnalysisResults(sessionId, formData);
            setAnalysisResults(resultsResponse.data);
            setCurrentStage("results");
          } catch (error) {
            console.error("Failed to fetch results:", error);
            setProcessingError("Analysis completed but failed to fetch results.");
          }
        } else if (statusResponse.status === 'failed') {
          // Stop polling on failure
          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
            pollingIntervalRef.current = null;
          }
          setProcessingError("Analysis failed. Please try again.");
        }
      } catch (error) {
        console.error("Failed to check processing status:", error);
        // Continue polling on network errors
      }
    };

    // Poll immediately, then every 2 seconds
    pollStatus();
    pollingIntervalRef.current = setInterval(pollStatus, 2000);
  };

  const handleViewCTA = () => {
    setCurrentStage("cta");
  };

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

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
              onStartAssessment={handleStartAssessment}
            />
          )}
          {currentStage === "onboarding" && (
            <OnboardingStage
              onComplete={handleOnboardingComplete}
            />
          )}
          {currentStage === "processing" && (
            <ProcessingStage 
              progress={processingProgress}
              error={processingError}
            />
          )}
          {currentStage === "results" && (
            <ResultsStage
              results={analysisResults}
              formData={formData}
              onViewCTA={handleViewCTA}
            />
          )}
          {currentStage === "cta" && (
            <CTAStage sessionId={sessionId} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}