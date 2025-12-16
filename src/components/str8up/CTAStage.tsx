import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Mail, Phone, CheckCircle2, Loader2 } from "lucide-react";
import { submitCTAForm } from "../../services/str8up-api.service";

interface CTAStageProps {
  sessionId?: string;
}

export default function CTAStage({ sessionId }: CTAStageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!sessionId) {
      setError("Session expired. Please restart the assessment.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await submitCTAForm({
        sessionId,
        name: formData.name,
        email: formData.email,
        company: formData.company || undefined,
        phone: formData.phone || undefined,
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to submit CTA form:", error);
      setError("Failed to submit form. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[calc(100vh-96px)] flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-2xl"
        >
          <div className="w-20 h-20 rounded-full bg-[#009B77] flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl text-[#1C2833] dark:text-white mb-4">
            Thank You!
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Your Margin-First Modernization plan is on its way. Our team will reach out within 24 hours to schedule your consultation.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-200 dark:bg-slate-800 text-[#1C2833] dark:text-white rounded-full hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
          >
            Return to Home
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-96px)] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-5xl text-[#1C2833] dark:text-white mb-4">
            Ready to Lock in Your Margin-First Modernization?
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Get your personalized implementation plan and connect with our cloud architects to start your transformation journey.
          </p>
        </motion.div>

        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#1C2833] to-[#2C3E50] dark:from-[#0F1419] dark:to-[#1C2833] rounded-2xl shadow-2xl p-8 md:p-12 mb-8"
        >
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="space-y-6 mb-8">
              <div>
                <label htmlFor="name" className="block text-sm mb-2 text-white/90">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-4 text-base bg-white dark:bg-slate-900 border-2 border-amber-200 dark:border-slate-700 rounded-xl text-amber-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF7800] focus:border-transparent min-h-[56px] disabled:opacity-50"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm mb-2 text-white/90">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@company.com"
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-4 text-base bg-white dark:bg-slate-900 border-2 border-amber-200 dark:border-slate-700 rounded-xl text-amber-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF7800] focus:border-transparent min-h-[56px] disabled:opacity-50"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm mb-2 text-white/90">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Your Company Inc."
                  disabled={isSubmitting}
                  className="w-full px-4 py-4 text-base bg-white dark:bg-slate-900 border-2 border-amber-200 dark:border-slate-700 rounded-xl text-amber-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF7800] focus:border-transparent min-h-[56px] disabled:opacity-50"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm mb-2 text-white/90">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                  disabled={isSubmitting}
                  className="w-full px-4 py-4 text-base bg-white dark:bg-slate-900 border-2 border-amber-200 dark:border-slate-700 rounded-xl text-amber-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF7800] focus:border-transparent min-h-[56px] disabled:opacity-50"
                />
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg">
                <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 text-base md:text-lg bg-[#FF7800] text-white rounded-full hover:bg-[#E66D00] transition-all flex items-center justify-center gap-2 group min-h-[56px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Request Follow-Up & Final Plan
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Alternative Contact Options */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#009B77] to-[#007A5E] flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg text-[#1C2833] dark:text-white">Speak with an Expert</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Call us directly</p>
              </div>
            </div>
            <a
              href="tel:+15551234567"
              className="text-[#FF7800] hover:text-[#E66D00] transition-colors"
            >
              +1 (555) 123-4567
            </a>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FF7800] to-[#E66D00] flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg text-[#1C2833] dark:text-white">Email Our Team</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Get in touch via email</p>
              </div>
            </div>
            <a
              href="mailto:str8up@zahlentech.com"
              className="text-[#FF7800] hover:text-[#E66D00] transition-colors"
            >
              str8up@zahlentech.com
            </a>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-slate-500 dark:text-slate-500 mb-4">
            Trusted by over 500+ companies worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400 dark:text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#009B77]" />
              <span className="text-sm">SOC 2 Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#009B77]" />
              <span className="text-sm">AWS Partner</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#009B77]" />
              <span className="text-sm">Azure Expert MSP</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}