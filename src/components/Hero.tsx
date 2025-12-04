import { motion } from "motion/react";
import { ArrowRight, Sparkles, Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300" />
      
      {/* Animated orbs - brown theme */}
      <motion.div
        className="absolute top-20 left-20 w-96 h-96 bg-amber-600/20 dark:bg-amber-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500/20 dark:bg-orange-600/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Navigation */}
      <motion.nav
        className="absolute top-0 left-0 right-0 z-50 px-4 md:px-8 py-6"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl md:text-2xl text-slate-900 dark:text-white tracking-wider">ZAHLENTECH</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-slate-600 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-500 transition-colors">
              Services
            </a>
            <a href="#solutions" className="text-slate-600 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-500 transition-colors">
              Solutions
            </a>
            <Link to="/str8up-map" className="text-slate-600 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-500 transition-colors">
              str8up Map
            </Link>
            <a href="#contact" className="text-slate-600 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-500 transition-colors">
              Contact
            </a>
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
            <button className="px-6 py-2 bg-amber-700 dark:bg-amber-600 text-white rounded-full hover:bg-amber-800 dark:hover:bg-amber-700 transition-colors">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-200 dark:bg-slate-800"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-slate-700" />
              ) : (
                <Sun className="w-5 h-5 text-amber-400" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-900 dark:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col p-4 space-y-4">
              <a href="#services" className="text-slate-600 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-500 py-2">
                Services
              </a>
              <a href="#solutions" className="text-slate-600 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-500 py-2">
                Solutions
              </a>
              <Link to="/str8up-map" className="text-slate-600 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-500 py-2">
                str8up Map
              </Link>
              <a href="#contact" className="text-slate-600 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-500 py-2">
                Contact
              </a>
              <button className="px-6 py-2 bg-amber-700 dark:bg-amber-600 text-white rounded-full hover:bg-amber-800 dark:hover:bg-amber-700 transition-colors">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center pt-20 md:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700/50 rounded-full mb-6 md:mb-8"
        >
          <span className="text-sm text-amber-900 dark:text-amber-300">Your Digital Transformation Partner</span>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl lg:text-8xl text-slate-900 dark:text-white mb-4 md:mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Transform Your Business
          <br />
          with <span className="text-amber-700 dark:text-amber-500">Cloud & AI</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 md:mb-12 max-w-3xl mx-auto px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Empowering businesses of all sizes with cutting-edge cloud solutions, AI-driven insights, 
          and modern digital tools. From AWS to Azure, we deliver tailored innovation for your success.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <button className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-amber-700 to-orange-600 dark:from-amber-600 dark:to-orange-500 text-white rounded-full hover:shadow-lg hover:shadow-amber-500/50 transition-all flex items-center justify-center gap-2 group">
            Start Your Journey
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-full hover:bg-white dark:hover:bg-slate-800 transition-all">
            View Solutions
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-4 md:gap-8 mt-16 md:mt-24 max-w-3xl mx-auto px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="text-center">
            <div className="text-2xl md:text-4xl text-amber-700 dark:text-amber-500 mb-2">500+</div>
            <div className="text-xs md:text-base text-slate-600 dark:text-slate-400">Projects Delivered</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-4xl text-orange-600 dark:text-orange-500 mb-2">98%</div>
            <div className="text-xs md:text-base text-slate-600 dark:text-slate-400">Client Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-4xl text-teal-600 dark:text-teal-500 mb-2">24/7</div>
            <div className="text-xs md:text-base text-slate-600 dark:text-slate-400">Expert Support</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}