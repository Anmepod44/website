import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, TrendingDown, Shield, Zap, BarChart3 } from "lucide-react";

interface InfoStageProps {
  onStartAssessment: () => void;
}

const highlights = [
  {
    icon: TrendingDown,
    title: "28% TCO Reduction",
    description: "Average cost savings achieved by shifting from CapEx to OpEx model",
  },
  {
    icon: Shield,
    title: "85% Risk Mitigation",
    description: "Reduction in recovery time with automated disaster recovery",
  },
  {
    icon: Zap,
    title: "15% Revenue Lift",
    description: "Increase in qualified leads through intelligent automation",
  },
  {
    icon: BarChart3,
    title: "150+ Metrics",
    description: "Comprehensive analysis of your infrastructure and operations",
  },
];

const howItWorks = [
  {
    step: "1",
    title: "Share Your Requirements",
    description: "Answer simple questions about your business size, cloud preferences, and infrastructure complexity.",
  },
  {
    step: "2",
    title: "AI Analysis",
    description: "Our engine analyzes 150+ metrics to create your personalized modernization strategy.",
  },
  {
    step: "3",
    title: "Get Your Roadmap",
    description: "Receive a detailed phased plan with TCO projections, risk assessments, and migration timeline.",
  },
  {
    step: "4",
    title: "Expert Follow-Up",
    description: "Connect with our cloud architects to refine and implement your strategy.",
  },
];

export default function InfoStage({ onStartAssessment }: InfoStageProps) {
  return (
    <div className="min-h-[calc(100vh-96px)] px-4 py-8 md:py-12">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-block px-4 py-2 bg-[#009B77]/10 border border-[#009B77]/20 rounded-full mb-4">
            <span className="text-sm text-[#009B77]">Margin-First Modernization Strategy</span>
          </div>
          <h1 className="text-3xl md:text-6xl text-amber-900 dark:text-white mb-4 md:mb-6">
            Transform Your IT Infrastructure with str8up Map by <span className="font-bold">ZAHLENTECH</span>
          </h1>
          <p className="text-lg md:text-xl text-amber-900/70 dark:text-slate-400 max-w-3xl mx-auto mb-8">
            Get a comprehensive, AI-powered cloud modernization strategy in minutes. 
            No guesswork, no complex spreadsheets—just clear insights and actionable roadmaps.
          </p>
          <button
            onClick={onStartAssessment}
            className="px-8 py-4 bg-[#FF7800] text-white rounded-full hover:bg-[#E66D00] transition-all inline-flex items-center gap-2 group text-lg"
          >
            Start Free Assessment
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Key Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16"
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#009B77] to-[#007A5E] flex items-center justify-center mx-auto mb-4">
                <highlight.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl text-[#1C2833] dark:text-white mb-2">{highlight.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{highlight.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-2xl md:text-4xl text-amber-900 dark:text-white text-center mb-8 md:mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {howItWorks.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="relative"
              >
                {/* Connecting line - hide on last item */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-[#009B77] to-transparent -z-10" />
                )}
                
                <div className="bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-800 rounded-2xl p-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF7800] to-[#E66D00] flex items-center justify-center text-white text-2xl mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg text-amber-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-amber-900/70 dark:text-slate-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* What You'll Get */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-[#1C2833] to-[#2C3E50] dark:from-[#0F1419] dark:to-[#1C2833] rounded-2xl p-8 md:p-12 mb-12"
        >
          <h2 className="text-2xl md:text-3xl text-white text-center mb-8">
            What You'll Receive
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
            {[
              "Detailed TCO analysis with CapEx to OpEx breakdown",
              "Risk assessment and mitigation strategies",
              "Phased migration roadmap (Retire → Rehost → Replatform → Refactor)",
              "Compliance and security requirements mapping",
              "Revenue optimization opportunities",
              "Custom implementation timeline",
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.05 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className="w-6 h-6 text-[#009B77] flex-shrink-0 mt-0.5" />
                <span className="text-white/90">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Takes only 5 minutes • No credit card required • Free assessment
          </p>
          <button
            onClick={onStartAssessment}
            className="px-10 py-5 bg-[#FF7800] text-white rounded-full hover:bg-[#E66D00] hover:shadow-lg hover:shadow-[#FF7800]/30 transition-all inline-flex items-center gap-2 group text-lg"
          >
            Begin Your Assessment Now
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}