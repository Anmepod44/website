import { motion } from "motion/react";
import { 
  TrendingDown, 
  Shield, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  DollarSign, 
  Clock,
  AlertTriangle
} from "lucide-react";
import { useState, useEffect } from "react";
import type { AnalysisResults, OnboardingFormData } from "../../types/str8up-map.types";
import { generateMockAnalysisResults } from "../../types/str8up-map.types";

interface ResultsStageProps {
  results?: AnalysisResults;
  formData?: OnboardingFormData;
  onViewCTA: () => void;
}

export default function ResultsStage({ results: providedResults, formData, onViewCTA }: ResultsStageProps) {
  // Generate mock results if not provided
  const results = providedResults || (formData ? generateMockAnalysisResults(formData) : null);
  
  const [savingsValue, setSavingsValue] = useState(0);
  const [scoreValue, setScoreValue] = useState(0);
  const [roiValue, setRoiValue] = useState(0);

  // Early return if no results available
  if (!results) {
    return (
      <div className="min-h-[calc(100vh-96px)] px-4 py-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-slate-600 dark:text-slate-400">
            No analysis results available
          </p>
        </div>
      </div>
    );
  }

  const { calculator, llm } = results.data;
  const overallScore = results.meta.computed_overall_score;

  useEffect(() => {
    // Animate Projected Savings
    const savingsInterval = setInterval(() => {
      setSavingsValue((prev) => {
        if (prev >= calculator.projected_annual_savings) {
          clearInterval(savingsInterval);
          return calculator.projected_annual_savings;
        }
        return prev + calculator.projected_annual_savings / 50;
      });
    }, 20);

    // Animate Overall Score
    const scoreInterval = setInterval(() => {
      setScoreValue((prev) => {
        if (prev >= overallScore) {
          clearInterval(scoreInterval);
          return overallScore;
        }
        return prev + 2;
      });
    }, 30);

    // Animate ROI
    const roiInterval = setInterval(() => {
      setRoiValue((prev) => {
        if (prev >= calculator.roi_percent) {
          clearInterval(roiInterval);
          return calculator.roi_percent;
        }
        return prev + calculator.roi_percent / 50;
      });
    }, 20);

    return () => {
      clearInterval(savingsInterval);
      clearInterval(scoreInterval);
      clearInterval(roiInterval);
    };
  }, [calculator, overallScore]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const totalDuration = llm.timeline.reduce(
    (acc, phase) => acc + phase.duration_months,
    0
  );

  const wastePercentage = Math.round(calculator.waste_factor * 100);

  return (
    <div className="min-h-[calc(100vh-96px)] px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-2 bg-[#009B77]/10 border border-[#009B77]/20 rounded-full mb-4">
            <span className="text-sm text-[#009B77]">Your Personalized Analysis</span>
          </div>
          <h1 className="text-3xl md:text-5xl text-[#1C2833] dark:text-white mb-4">
            Margin-First Modernization Plan
          </h1>
          <div className="text-4xl md:text-6xl text-[#009B77] mb-2">
            {Math.round(scoreValue)}%
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Overall Modernization Score
          </p>
        </motion.div>

        {/* Key Financial Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Annual Savings */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#009B77] to-[#007A5E] flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg text-[#1C2833] dark:text-white">Annual Savings</h3>
            </div>
            <div className="text-3xl md:text-4xl text-[#009B77] mb-2">
              {formatCurrency(savingsValue)}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              Projected savings from modernization
            </p>
            <div className="space-y-2 text-xs text-slate-500 dark:text-slate-500">
              <div className="flex justify-between">
                <span>Base Spend:</span>
                <span>{formatCurrency(calculator.estimated_base_spend)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Waste ({wastePercentage}%):</span>
                <span>{formatCurrency(calculator.estimated_waste)}</span>
              </div>
            </div>
          </motion.div>

          {/* ROI */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF7800] to-[#E66D00] flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg text-[#1C2833] dark:text-white">Return on Investment</h3>
            </div>
            <div className="text-3xl md:text-4xl text-[#FF7800] mb-2">{Math.round(roiValue)}%</div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              Expected ROI over 3 years
            </p>
            {/* Circular gauge visualization */}
            <div className="flex justify-center">
              <div className="relative w-20 h-20">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    className="text-slate-200 dark:text-slate-800"
                  />
                  <motion.circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="#FF7800"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "201", strokeDashoffset: "201" }}
                    animate={{ strokeDashoffset: `${201 - (201 * Math.min(roiValue, 100)) / 100}` }}
                    transition={{ duration: 1.5 }}
                  />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Transformation Cost */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg text-[#1C2833] dark:text-white">Investment Required</h3>
            </div>
            <div className="text-3xl md:text-4xl text-amber-600 mb-2">
              {formatCurrency(calculator.estimated_transformation_cost)}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              Total transformation cost
            </p>
            <div className="text-xs text-slate-500 dark:text-slate-500">
              <div className="flex justify-between">
                <span>Payback Period:</span>
                <span>{Math.round((calculator.estimated_transformation_cost / calculator.projected_annual_savings) * 12)} months</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 md:p-8 mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl text-[#1C2833] dark:text-white">Implementation Timeline</h2>
            <div className="px-4 py-2 bg-[#009B77]/10 rounded-full">
              <span className="text-sm text-[#009B77]">{totalDuration} months total</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {llm.timeline.map((phase, index) => (
              <motion.div
                key={index}
                className="border-l-4 border-[#009B77] bg-slate-50 dark:bg-slate-800 rounded-r-xl p-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg text-[#1C2833] dark:text-white">
                    Phase {index + 1}: {phase.phase}
                  </h3>
                  <span className="text-sm text-[#009B77] bg-white dark:bg-slate-900 px-3 py-1 rounded-full">
                    {phase.duration_months} {phase.duration_months === 1 ? 'month' : 'months'}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">{phase.details}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technical Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 md:p-8 mb-12"
        >
          <h2 className="text-2xl text-[#1C2833] dark:text-white mb-6">Technical Recommendations</h2>
          <div className="space-y-4">
            {llm.technical_recommendations.map((rec, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-xl border-2 ${
                  rec.priority === 'critical' || rec.priority === 'high'
                    ? 'border-[#FF7800] bg-[#FF7800]/5'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <div className="flex items-start gap-3">
                  <div className={`px-2 py-1 rounded text-xs uppercase ${
                    rec.priority === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                    rec.priority === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' :
                    rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-400'
                  }`}>
                    {rec.priority}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#1C2833] dark:text-white mb-1">{rec.title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{rec.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Risk Assessment & Strategy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {/* Risk Assessment */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-[#FF7800]" />
              <h3 className="text-xl text-[#1C2833] dark:text-white">Risk Assessment</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-slate-500 dark:text-slate-500 mb-1">Technical Risk</div>
                <p className="text-slate-600 dark:text-slate-400">{llm.risk_assessment.technical}</p>
              </div>
              <div>
                <div className="text-sm text-slate-500 dark:text-slate-500 mb-1">Business Risk</div>
                <p className="text-slate-600 dark:text-slate-400">{llm.risk_assessment.business}</p>
              </div>
              <div>
                <div className={`inline-block px-3 py-1 rounded-full text-sm ${
                  llm.risk_assessment.likelihood === 'low' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : llm.risk_assessment.likelihood === 'medium'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {llm.risk_assessment.likelihood.toUpperCase()} likelihood
                </div>
              </div>
            </div>
          </div>

          {/* Modernization Strategy */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-6 h-6 text-[#009B77]" />
              <h3 className="text-xl text-[#1C2833] dark:text-white">Strategy</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-slate-500 dark:text-slate-500 mb-1">Approach</div>
                <p className="text-[#009B77]">{llm.modernization_strategy.approach}</p>
              </div>
              <div>
                <div className="text-sm text-slate-500 dark:text-slate-500 mb-1">Summary</div>
                <p className="text-slate-600 dark:text-slate-400">{llm.modernization_strategy.summary}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="bg-gradient-to-br from-[#009B77]/10 to-[#FF7800]/10 rounded-2xl border border-[#009B77]/20 p-6 md:p-8 mb-12"
        >
          <h2 className="text-2xl text-[#1C2833] dark:text-white mb-6">Recommended Next Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {llm.next_steps.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#009B77] mt-0.5 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">{step}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="text-center"
        >
          <button
            onClick={onViewCTA}
            className="px-8 py-4 bg-[#FF7800] text-white rounded-full hover:bg-[#E66D00] transition-colors flex items-center gap-2 mx-auto group"
          >
            Request Detailed Consultation
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-sm text-slate-500 dark:text-slate-500 mt-4">
            Our team will reach out within 24 hours
          </p>
        </motion.div>
      </div>
    </div>
  );
}