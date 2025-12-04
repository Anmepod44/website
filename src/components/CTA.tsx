import { motion } from "motion/react";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

export default function CTA() {
  return (
    <section id="contact" className="relative py-16 md:py-32 px-4 md:px-8 bg-gradient-to-br from-amber-100 via-orange-100 to-amber-50 dark:from-slate-900 dark:to-slate-950 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Main CTA */}
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-700 via-orange-600 to-amber-800 dark:from-amber-600 dark:via-orange-500 dark:to-amber-700 p-8 md:p-16 mb-8 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }} />
          </div>

          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl text-white mb-4 md:mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 md:mb-10 max-w-2xl mx-auto">
              Join hundreds of companies already leveraging cloud and AI to drive growth and innovation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-white text-amber-700 rounded-full hover:bg-slate-100 transition-all flex items-center justify-center gap-2 group">
                Schedule a Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-full hover:bg-white/20 transition-all">
                View Case Studies
              </button>
            </div>
          </div>

          {/* Decorative orbs */}
          <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 md:w-64 h-48 md:h-64 bg-white/10 rounded-full blur-3xl" />
        </motion.div>

        {/* Contact Info */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-start gap-3 md:gap-4 p-4 md:p-6 bg-white dark:bg-slate-950 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-xl hover:shadow-md transition-all">
            <div className="w-10 md:w-12 h-10 md:h-12 rounded-lg bg-gradient-to-br from-amber-600 to-orange-600 dark:from-amber-500 dark:to-orange-500 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 md:w-6 h-5 md:h-6 text-white" />
            </div>
            <div>
              <h3 className="text-sm md:text-base text-slate-900 dark:text-white mb-1">Email Us</h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">contact@zahlentech.com</p>
            </div>
          </div>

          <div className="flex items-start gap-3 md:gap-4 p-4 md:p-6 bg-white dark:bg-slate-950 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-xl hover:shadow-md transition-all">
            <div className="w-10 md:w-12 h-10 md:h-12 rounded-lg bg-gradient-to-br from-orange-600 to-red-600 dark:from-orange-500 dark:to-red-500 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 md:w-6 h-5 md:h-6 text-white" />
            </div>
            <div>
              <h3 className="text-sm md:text-base text-slate-900 dark:text-white mb-1">Call Us</h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">+1 (555) 123-4567</p>
            </div>
          </div>

          <div className="flex items-start gap-3 md:gap-4 p-4 md:p-6 bg-white dark:bg-slate-950 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-xl hover:shadow-md transition-all">
            <div className="w-10 md:w-12 h-10 md:h-12 rounded-lg bg-gradient-to-br from-teal-600 to-cyan-600 dark:from-teal-500 dark:to-cyan-500 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 md:w-6 h-5 md:h-6 text-white" />
            </div>
            <div>
              <h3 className="text-sm md:text-base text-slate-900 dark:text-white mb-1">Visit Us</h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">San Francisco, CA</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}