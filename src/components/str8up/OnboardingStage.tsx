import { useState } from "react";
import { motion } from "motion/react";
import { ChevronRight, BarChart3, Cloud, DollarSign, Shield } from "lucide-react";

interface OnboardingStageProps {
  onComplete: (data: any) => void;
}

const steps = [
  {
    id: 1,
    title: "Business Profile",
    icon: BarChart3,
    fields: ["businessSize", "cloudProvider"],
  },
  {
    id: 2,
    title: "Technical Assessment",
    icon: Cloud,
    fields: ["complexity"],
  },
  {
    id: 3,
    title: "Financial Parameters",
    icon: DollarSign,
    fields: ["budget"],
  },
  {
    id: 4,
    title: "Risk & Compliance",
    icon: Shield,
    fields: ["riskTolerance", "compliance"],
  },
];

export default function OnboardingStage({ onComplete }: OnboardingStageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessSize: "",
    cloudProvider: "",
    complexity: 50,
    budget: "",
    riskTolerance: "",
    compliance: "",
  });

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const currentStepData = steps[currentStep - 1];

  return (
    <div className="min-h-[calc(100vh-96px)] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Progress Indicator */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors text-sm ${
                    currentStep >= step.id
                      ? "bg-[#009B77] text-white"
                      : "bg-amber-200 dark:bg-slate-800 text-amber-900 dark:text-slate-400"
                  }`}
                >
                  {currentStep > step.id ? "✓" : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-colors ${
                      currentStep > step.id
                        ? "bg-[#009B77]"
                        : "bg-amber-200 dark:bg-slate-800"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-sm text-amber-900 dark:text-slate-400">
              Step {currentStep} of {steps.length}: {currentStepData.title}
            </p>
          </div>
        </motion.div>

        {/* Input Card */}
        <motion.div
          key={currentStep}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-amber-200 dark:border-slate-800 p-6 md:p-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#009B77] to-[#007A5E] flex items-center justify-center">
              <currentStepData.icon className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl text-amber-900 dark:text-white">{currentStepData.title}</h2>
          </div>

          <div className="space-y-6">
            {/* Step 1: Business Profile */}
            {currentStep === 1 && (
              <>
                <div>
                  <label className="block text-sm mb-2 text-amber-900 dark:text-slate-300">
                    Business Size
                  </label>
                  <select
                    value={formData.businessSize}
                    onChange={(e) =>
                      setFormData({ ...formData, businessSize: e.target.value })
                    }
                    className="w-full px-4 py-4 text-base bg-amber-50 dark:bg-slate-800 border-2 border-amber-200 dark:border-slate-700 rounded-xl text-amber-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#009B77] focus:border-transparent"
                  >
                    <option value="">Select business size</option>
                    <option value="small">Small (1-50 employees)</option>
                    <option value="medium">Medium (51-500 employees)</option>
                    <option value="large">Large (500+ employees)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-amber-900 dark:text-slate-300">
                    Preferred Cloud Provider
                  </label>
                  <select
                    value={formData.cloudProvider}
                    onChange={(e) =>
                      setFormData({ ...formData, cloudProvider: e.target.value })
                    }
                    className="w-full px-4 py-4 text-base bg-amber-50 dark:bg-slate-800 border-2 border-amber-200 dark:border-slate-700 rounded-xl text-amber-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#009B77] focus:border-transparent"
                  >
                    <option value="">Select cloud provider</option>
                    <option value="aws">Amazon Web Services (AWS)</option>
                    <option value="azure">Microsoft Azure</option>
                    <option value="gcp">Google Cloud Platform</option>
                    <option value="hybrid">Hybrid/Multi-Cloud</option>
                  </select>
                </div>
              </>
            )}

            {/* Step 2: Technical Assessment */}
            {currentStep === 2 && (
              <div>
                <label className="block text-sm mb-4 text-amber-900 dark:text-slate-300">
                  Infrastructure Complexity Score: {formData.complexity}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.complexity}
                  onChange={(e) =>
                    setFormData({ ...formData, complexity: Number(e.target.value) })
                  }
                  className="w-full h-3 bg-amber-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#009B77]"
                  style={{ 
                    WebkitAppearance: 'none',
                    height: '12px'
                  }}
                />
                <div className="flex justify-between mt-2 text-xs text-amber-800 dark:text-slate-400">
                  <span>Simple</span>
                  <span>Complex</span>
                </div>
                <p className="mt-4 text-sm text-amber-900/80 dark:text-slate-400">
                  Rate your current infrastructure complexity based on number of systems,
                  integrations, and technical debt.
                </p>
              </div>
            )}

            {/* Step 3: Financial Parameters */}
            {currentStep === 3 && (
              <div>
                <label className="block text-sm mb-2 text-amber-900 dark:text-slate-300">
                  Estimated Annual IT Budget
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData({ ...formData, budget: e.target.value })
                  }
                  className="w-full px-4 py-4 text-base bg-amber-50 dark:bg-slate-800 border-2 border-amber-200 dark:border-slate-700 rounded-xl text-amber-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#009B77] focus:border-transparent"
                >
                  <option value="">Select budget range</option>
                  <option value="under100k">Under $100,000</option>
                  <option value="100k-500k">$100,000 - $500,000</option>
                  <option value="500k-1m">$500,000 - $1 Million</option>
                  <option value="1m-5m">$1 Million - $5 Million</option>
                  <option value="over5m">Over $5 Million</option>
                </select>
              </div>
            )}

            {/* Step 4: Risk & Compliance */}
            {currentStep === 4 && (
              <>
                <div>
                  <label className="block text-sm mb-2 text-amber-900 dark:text-slate-300">
                    Risk Tolerance Level
                  </label>
                  <div className="space-y-2">
                    {["low", "medium", "high"].map((level) => (
                      <label
                        key={level}
                        className="flex items-center gap-3 p-4 bg-amber-50 dark:bg-slate-800 rounded-xl cursor-pointer hover:bg-amber-100 dark:hover:bg-slate-700 transition-colors border-2 border-transparent has-[:checked]:border-[#009B77]"
                      >
                        <input
                          type="radio"
                          name="risk"
                          value={level}
                          checked={formData.riskTolerance === level}
                          onChange={(e) =>
                            setFormData({ ...formData, riskTolerance: e.target.value })
                          }
                          className="w-5 h-5 accent-[#009B77]"
                        />
                        <span className="text-base text-amber-900 dark:text-white capitalize">
                          {level} Risk Tolerance
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-amber-900 dark:text-slate-300">
                    Compliance Requirements
                  </label>
                  <select
                    value={formData.compliance}
                    onChange={(e) =>
                      setFormData({ ...formData, compliance: e.target.value })
                    }
                    className="w-full px-4 py-4 text-base bg-amber-50 dark:bg-slate-800 border-2 border-amber-200 dark:border-slate-700 rounded-xl text-amber-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#009B77] focus:border-transparent"
                  >
                    <option value="">Select compliance needs</option>
                    <option value="none">No specific requirements</option>
                    <option value="hipaa">HIPAA</option>
                    <option value="pci">PCI DSS</option>
                    <option value="sox">SOX</option>
                    <option value="gdpr">GDPR</option>
                    <option value="multiple">Multiple Standards</option>
                  </select>
                </div>
              </>
            )}
          </div>

          <button
            onClick={handleNext}
            disabled={
              (currentStep === 1 && (!formData.businessSize || !formData.cloudProvider)) ||
              (currentStep === 3 && !formData.budget) ||
              (currentStep === 4 && (!formData.riskTolerance || !formData.compliance))
            }
            className="w-full mt-8 px-6 py-4 text-base md:text-lg bg-[#FF7800] text-white rounded-full hover:bg-[#E66D00] disabled:bg-amber-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 group min-h-[56px]"
          >
            {currentStep < steps.length ? "Next Insight" : "Generate Strategy"}
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}