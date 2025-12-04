import { motion } from "motion/react";
import { CheckCircle2, TrendingUp, Users, Lock } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const features = [
  {
    icon: CheckCircle2,
    title: "Enterprise-Grade Solutions",
    description: "Battle-tested infrastructure trusted by startups and Fortune 500 companies alike.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Architecture",
    description: "Grow without limits with cloud solutions designed to scale with your business.",
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "24/7 access to certified cloud architects and AI specialists.",
  },
  {
    icon: Lock,
    title: "Security First",
    description: "Industry-leading security practices to protect your most valuable assets.",
  },
];

export default function Features() {
  return (
    <section className="relative py-16 md:py-32 px-4 md:px-8 overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-50/50 dark:via-amber-950/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left side - Image */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-2xl overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1667984390527-850f63192709?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGNvbXB1dGluZyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY0NDU3NDc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Cloud technology infrastructure"
                className="w-full h-[300px] md:h-[500px] object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-700/40 to-orange-600/40" />
              
              {/* Floating card */}
              <motion.div
                className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8 p-4 md:p-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border border-slate-200 dark:border-slate-800 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 md:w-6 h-5 md:h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm md:text-base text-slate-900 dark:text-white">Cloud Infrastructure Active</div>
                    <div className="text-xs md:text-sm text-slate-600 dark:text-slate-300">99.99% Uptime Guaranteed</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 md:w-32 h-24 md:h-32 bg-amber-500/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-24 md:w-32 h-24 md:h-32 bg-orange-500/20 rounded-full blur-2xl" />
          </motion.div>

          {/* Right side - Features */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-2 bg-orange-100 dark:bg-orange-900/30 border border-orange-300 dark:border-orange-700/50 rounded-full mb-4 md:mb-6">
              <span className="text-sm text-orange-900 dark:text-orange-300">Why Choose Zahlentech</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl text-slate-900 dark:text-white mb-4 md:mb-6">
              Built for <span className="text-amber-700 dark:text-amber-500">Performance</span>
            </h2>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 md:mb-12">
              We combine technical expertise with personalized support to deliver solutions that drive real business results.
            </p>

            <div className="space-y-4 md:space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-colors"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-10 md:w-12 h-10 md:h-12 rounded-lg bg-gradient-to-br from-amber-600 to-orange-600 dark:from-amber-500 dark:to-orange-500 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 md:w-6 h-5 md:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg text-slate-900 dark:text-white mb-1">{feature.title}</h3>
                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}