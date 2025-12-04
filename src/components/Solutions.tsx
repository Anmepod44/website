import { motion } from "motion/react";
import { Building2, Rocket, Factory, Briefcase } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";
import SolutionModal from "./SolutionModal";

const solutions = [
  {
    icon: Rocket,
    title: "Startups",
    description: "Launch faster with scalable cloud infrastructure and AI tools designed for rapid growth.",
    image: "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwbmV0d29ya3xlbnwxfHx8fDE3NjQ0OTYzMDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    detailedInfo: {
      overview: "Perfect for early-stage companies looking to build a solid technical foundation without breaking the bank. Our startup solutions provide enterprise-grade infrastructure at startup-friendly pricing.",
      keyFeatures: [
        "Pay-as-you-grow cloud infrastructure",
        "Pre-configured development environments",
        "Automated CI/CD pipelines",
        "Built-in security and compliance",
        "24/7 technical support",
        "Free migration assistance",
      ],
      benefits: [
        "Launch your MVP 3x faster with ready-to-use templates",
        "Scale seamlessly from 10 to 10,000 users without infrastructure changes",
        "Reduce initial infrastructure costs by up to 60%",
        "Focus on product development while we handle DevOps",
        "Access to startup accelerator programs and credits",
      ],
      useCases: [
        "SaaS Startups",
        "Mobile Apps",
        "E-commerce Platforms",
        "Tech MVPs",
        "API Services",
      ],
      pricing: "Starting at $500/month • Includes $2,000 in cloud credits",
    },
  },
  {
    icon: Building2,
    title: "Enterprises",
    description: "Transform legacy systems with enterprise-grade cloud solutions and advanced automation.",
    image: "https://images.unsplash.com/photo-1651955784685-f969100bfc25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzZXJ2ZXIlMjBkYXRhfGVufDF8fHx8MTc2NDU2NTg4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    detailedInfo: {
      overview: "Comprehensive digital transformation services for large organizations looking to modernize legacy infrastructure, improve operational efficiency, and drive innovation at scale.",
      keyFeatures: [
        "Multi-cloud strategy and implementation",
        "Legacy system modernization",
        "Zero-downtime migration",
        "Enterprise security and governance",
        "Dedicated cloud architects",
        "Custom SLA agreements",
      ],
      benefits: [
        "Reduce total cost of ownership by up to 35%",
        "Improve system reliability to 99.99% uptime",
        "Accelerate digital transformation initiatives",
        "Meet stringent compliance requirements (SOC 2, HIPAA, PCI DSS)",
        "Gain real-time insights with advanced analytics",
      ],
      useCases: [
        "Fortune 500 Companies",
        "Financial Institutions",
        "Healthcare Organizations",
        "Government Agencies",
        "Manufacturing",
      ],
      pricing: "Custom enterprise pricing • Volume discounts available",
    },
  },
  {
    icon: Factory,
    title: "Industrial",
    description: "Optimize operations with IoT integration, predictive analytics, and real-time monitoring.",
    image: "https://images.unsplash.com/photo-1667984390527-850f63192709?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGNvbXB1dGluZyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY0NDU3NDc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    detailedInfo: {
      overview: "Industry 4.0 solutions that connect your factory floor to the cloud, enabling predictive maintenance, real-time monitoring, and operational excellence through data-driven insights.",
      keyFeatures: [
        "IoT device integration and management",
        "Real-time production monitoring",
        "Predictive maintenance AI models",
        "Edge computing capabilities",
        "Supply chain optimization",
        "Energy consumption analytics",
      ],
      benefits: [
        "Reduce equipment downtime by up to 45%",
        "Increase overall equipment effectiveness (OEE) by 25%",
        "Lower energy costs through intelligent optimization",
        "Improve supply chain visibility and efficiency",
        "Enable predictive rather than reactive maintenance",
      ],
      useCases: [
        "Manufacturing Plants",
        "Oil & Gas",
        "Mining Operations",
        "Logistics & Warehousing",
        "Utilities",
      ],
      pricing: "Starting at $2,500/month • ROI guarantee available",
    },
  },
  {
    icon: Briefcase,
    title: "Financial Services",
    description: "Secure, compliant automation solutions for finance teams and accounting workflows.",
    image: "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwbmV0d29ya3xlbnwxfHx8fDE3NjQ0OTYzMDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    detailedInfo: {
      overview: "Specialized solutions for financial institutions requiring the highest levels of security, compliance, and operational efficiency. From banking to fintech, we understand your unique challenges.",
      keyFeatures: [
        "Regulatory compliance automation",
        "Real-time fraud detection",
        "Secure data encryption",
        "Automated financial reporting",
        "Risk management dashboards",
        "Audit trail and logging",
      ],
      benefits: [
        "Achieve and maintain SOC 2, PCI DSS compliance automatically",
        "Reduce manual processing time by up to 70%",
        "Detect fraudulent transactions in real-time",
        "Streamline month-end close processes",
        "Ensure complete data sovereignty and privacy",
      ],
      useCases: [
        "Banks & Credit Unions",
        "FinTech Companies",
        "Insurance Providers",
        "Investment Firms",
        "Accounting Firms",
      ],
      pricing: "Starting at $3,000/month • Compliance package included",
    },
  },
];

export default function Solutions() {
  const [selectedSolution, setSelectedSolution] = useState<typeof solutions[0] | null>(null);

  return (
    <>
      <section id="solutions" className="relative py-16 md:py-32 px-4 md:px-8 bg-gradient-to-br from-amber-50 via-orange-50 to-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12 md:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-2 bg-amber-200 dark:bg-teal-900/30 border border-amber-400 dark:border-teal-700/50 rounded-full mb-4">
              <span className="text-sm text-amber-900 dark:text-teal-300">Industry Solutions</span>
            </div>
            <h2 className="text-3xl md:text-5xl text-amber-900 dark:text-white mb-4 md:mb-6">
              Tailored for Your <span className="text-amber-800 dark:text-amber-500">Industry</span>
            </h2>
            <p className="text-lg md:text-xl text-amber-900/70 dark:text-slate-400 max-w-2xl mx-auto">
              From startups to enterprises, we deliver customized solutions that address your unique challenges.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {solutions.map((solution, index) => (
              <motion.button
                key={solution.title}
                onClick={() => setSelectedSolution(solution)}
                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 backdrop-blur-sm border border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-700 transition-all duration-300 text-left w-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Image */}
                <div className="relative h-48 md:h-64 overflow-hidden">
                  <ImageWithFallback
                    src={solution.image}
                    alt={solution.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 via-white/50 dark:via-slate-950/50 to-transparent" />
                  
                  {/* Icon */}
                  <div className="absolute top-4 md:top-6 left-4 md:left-6 w-12 md:w-14 h-12 md:h-14 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                    <solution.icon className="w-6 md:w-7 h-6 md:h-7 text-amber-700 dark:text-amber-500" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl text-slate-900 dark:text-white mb-2 md:mb-3">{solution.title}</h3>
                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mb-4 md:mb-6">{solution.description}</p>
                  <div className="text-amber-700 dark:text-amber-500 hover:text-amber-800 dark:hover:text-amber-400 transition-colors flex items-center gap-2 group/btn">
                    Learn More
                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-orange-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:via-orange-500/5 group-hover:to-amber-500/5 transition-all duration-300 pointer-events-none" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <SolutionModal
        isOpen={selectedSolution !== null}
        onClose={() => setSelectedSolution(null)}
        solution={selectedSolution || solutions[0]}
      />
    </>
  );
}