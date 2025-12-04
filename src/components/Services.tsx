import { motion } from "motion/react";
import { Cloud, Brain, Cpu, Database, Zap, Shield } from "lucide-react";

const services = [
  {
    icon: Cloud,
    title: "Cloud Migration",
    description: "Seamlessly migrate your infrastructure to AWS or Azure with zero downtime and maximum efficiency.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Brain,
    title: "Generative AI",
    description: "Harness the power of AI to automate workflows, gain insights, and drive innovation across your business.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Cpu,
    title: "IT Transformation",
    description: "Modernize your technology stack with cutting-edge solutions designed for scalability and performance.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Database,
    title: "Data Management",
    description: "Secure, efficient data storage and management solutions that ensure business continuity and compliance.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Zap,
    title: "Automation",
    description: "Streamline operations with intelligent automation workflows that save time and reduce costs.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description: "Enterprise-grade security solutions to protect your data and ensure regulatory compliance.",
    color: "from-indigo-500 to-purple-500",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-16 md:py-32 px-4 md:px-8 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-2 bg-amber-200 dark:bg-amber-900/30 border border-amber-400 dark:border-amber-700/50 rounded-full mb-4">
            <span className="text-sm text-amber-900 dark:text-amber-300">Our Services</span>
          </div>
          <h2 className="text-3xl md:text-5xl text-amber-900 dark:text-white mb-4 md:mb-6">
            Comprehensive <span className="text-amber-800 dark:text-amber-500">Tech Solutions</span>
          </h2>
          <p className="text-lg md:text-xl text-amber-900/70 dark:text-slate-400 max-w-2xl mx-auto">
            From cloud infrastructure to AI-driven innovation, we provide end-to-end solutions tailored to your needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group relative p-6 md:p-8 bg-white dark:bg-slate-900 backdrop-blur-sm border border-amber-200 dark:border-slate-800 rounded-2xl hover:shadow-lg hover:shadow-amber-500/10 dark:hover:shadow-amber-500/5 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={`w-12 md:w-14 h-12 md:h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon className="w-6 md:w-7 h-6 md:h-7 text-white" />
              </div>
              <h3 className="text-lg md:text-xl text-amber-900 dark:text-white mb-2 md:mb-3">{service.title}</h3>
              <p className="text-sm md:text-base text-amber-900/70 dark:text-slate-400">{service.description}</p>
              
              {/* Hover effect gradient border */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity -z-10`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}