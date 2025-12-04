import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { ArrowRight, Sparkles, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const products = [
  {
    id: 1,
    name: "str8up Map",
    tagline: "Margin-First Modernization Strategy",
    description: "Transform your IT infrastructure with our AI-powered migration planning tool. str8up Map analyzes 150+ metrics to deliver a customized cloud modernization strategy that reduces TCO by up to 28%, mitigates risks by 85%, and accelerates revenue growth through intelligent automation.",
    benefits: [
      "Eliminate CapEx burden with consumption-based OpEx model",
      "Achieve 99.99% uptime with automated disaster recovery",
      "Get phased migration roadmap (Retire → Rehost → Replatform → Refactor)",
      "Real-time risk assessment and compliance mapping",
    ],
    gradient: "from-[#009B77] to-[#007A5E]",
    cta1: { text: "Start Your Assessment", link: "/str8up-map" },
    cta2: { text: "View Demo", link: "/str8up-map" },
  },
  {
    id: 2,
    name: "CloudSync Pro",
    tagline: "Multi-Cloud Management Platform",
    description: "Seamlessly manage AWS, Azure, and GCP environments from a single dashboard. CloudSync Pro provides unified visibility, cost optimization, and automated governance across all your cloud infrastructure.",
    benefits: [
      "Unified dashboard for multi-cloud operations",
      "Automated cost optimization saving up to 35%",
      "Real-time security monitoring and compliance",
      "One-click resource provisioning across providers",
    ],
    gradient: "from-amber-600 to-orange-600",
    cta1: { text: "Get Started", link: "#contact" },
    cta2: { text: "Learn More", link: "#contact" },
  },
  {
    id: 3,
    name: "AI Insights Engine",
    tagline: "Predictive Analytics & Automation",
    description: "Leverage generative AI to unlock actionable insights from your data. Our AI Insights Engine automates workflows, predicts infrastructure needs, and optimizes operations in real-time.",
    benefits: [
      "Predictive scaling based on usage patterns",
      "Automated incident response and resolution",
      "Natural language query interface for data analysis",
      "15% average lift in operational efficiency",
    ],
    gradient: "from-purple-600 to-pink-600",
    cta1: { text: "Explore AI Solutions", link: "#contact" },
    cta2: { text: "Book Demo", link: "#contact" },
  },
  {
    id: 4,
    name: "SecureVault Enterprise",
    tagline: "Advanced Data Security & Compliance",
    description: "Enterprise-grade security platform ensuring your data meets all regulatory requirements. SecureVault provides end-to-end encryption, audit trails, and automated compliance reporting.",
    benefits: [
      "SOC 2, HIPAA, PCI DSS, and GDPR compliant",
      "Zero-trust architecture with multi-factor authentication",
      "Automated backup and disaster recovery",
      "Real-time threat detection and response",
    ],
    gradient: "from-blue-600 to-cyan-600",
    cta1: { text: "Schedule Audit", link: "#contact" },
    cta2: { text: "View Features", link: "#contact" },
  },
];

export default function ProductSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 8000); // 8 seconds per slide

    return () => clearInterval(interval);
  }, []);

  const currentProduct = products[currentSlide];

  return (
    <section className="relative from-amber-100 via-orange-100 to-amber-50 dark:from-slate-900 dark:to-slate-950 min-h-screen flex flex-col overflow-hidden border-b border-amber-200 dark:border-slate-800">
      {/* Navigation */}
      <motion.nav
        className="relative z-50 px-4 md:px-8 py-6"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl md:text-2xl text-amber-900 dark:text-white tracking-wider font-bold">ZAHLENTECH</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-amber-800 dark:text-slate-300 hover:text-amber-900 dark:hover:text-amber-500 transition-colors">
              Services
            </a>
            <a href="#solutions" className="text-amber-800 dark:text-slate-300 hover:text-amber-900 dark:hover:text-amber-500 transition-colors">
              Solutions
            </a>
            <Link to="/str8up-map" className="text-amber-800 dark:text-slate-300 hover:text-amber-900 dark:hover:text-amber-500 transition-colors">
              str8up Map
            </Link>
            <a href="#contact" className="text-amber-800 dark:text-slate-300 hover:text-amber-900 dark:hover:text-amber-500 transition-colors">
              Contact
            </a>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-amber-200 dark:bg-slate-800 hover:bg-amber-300 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-amber-900" />
              ) : (
                <Sun className="w-5 h-5 text-amber-400" />
              )}
            </button>
            <button className="px-6 py-2 bg-amber-800 dark:bg-amber-600 text-white rounded-full hover:bg-amber-900 dark:hover:bg-amber-700 transition-colors">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-amber-200 dark:bg-slate-800"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-amber-900" />
              ) : (
                <Sun className="w-5 h-5 text-amber-400" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/20 dark:bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/20 dark:bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative flex-1 flex items-center py-12 md:py-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center"
          >
            {/* Left side - Content */}
            <div>
              <div className={`inline-block px-4 py-2 bg-gradient-to-r ${currentProduct.gradient} rounded-full mb-4`}>
                <span className="text-sm text-white">Featured Solution</span>
              </div>

              <h2 className="text-3xl md:text-5xl text-amber-900 dark:text-white mb-3">
                {currentProduct.name}
              </h2>
              
              <p className="text-lg md:text-xl text-amber-800 dark:text-amber-500 mb-6">
                {currentProduct.tagline}
              </p>

              <p className="text-base md:text-lg text-amber-900/80 dark:text-slate-400 mb-6">
                {currentProduct.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {currentProduct.cta1.link.startsWith('/') ? (
                  <Link
                    to={currentProduct.cta1.link}
                    className={`px-6 py-3 bg-gradient-to-r ${currentProduct.gradient} text-white rounded-full hover:shadow-lg transition-all flex items-center justify-center gap-2 group`}
                  >
                    {currentProduct.cta1.text}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ) : (
                  <a
                    href={currentProduct.cta1.link}
                    className={`px-6 py-3 bg-gradient-to-r ${currentProduct.gradient} text-white rounded-full hover:shadow-lg transition-all flex items-center justify-center gap-2 group`}
                  >
                    {currentProduct.cta1.text}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                )}

                {currentProduct.cta2.link.startsWith('/') ? (
                  <Link
                    to={currentProduct.cta2.link}
                    className="px-6 py-3 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
                  >
                    {currentProduct.cta2.text}
                  </Link>
                ) : (
                  <a
                    href={currentProduct.cta2.link}
                    className="px-6 py-3 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
                  >
                    {currentProduct.cta2.text}
                  </a>
                )}
              </div>

              {/* Slide Indicators */}
              <div className="flex gap-2">
                {products.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1 rounded-full transition-all ${
                      currentSlide === index
                        ? "w-8 bg-amber-800 dark:bg-amber-500"
                        : "w-4 bg-amber-300 dark:bg-slate-700"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right side - Benefits */}
            <div className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm border border-amber-200 dark:border-slate-800 rounded-2xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl text-amber-900 dark:text-white mb-6">
                Key Benefits
              </h3>
              <ul className="space-y-4">
                {currentProduct.benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${currentProduct.gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-amber-900/90 dark:text-slate-300">
                      {benefit}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}