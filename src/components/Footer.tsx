import { Sparkles, Linkedin, Twitter, Github } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative border-t border-amber-200 dark:border-slate-800 py-8 md:py-12 px-4 md:px-8 bg-amber-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg md:text-xl text-amber-900 dark:text-white tracking-wider font-bold">ZAHLENTECH</span>
            </div>
            <p className="text-sm md:text-base text-amber-900/70 dark:text-slate-400 mb-6">
              Your partner for digital transformation and sustainable growth.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-amber-100 dark:bg-slate-900 border border-amber-200 dark:border-slate-800 flex items-center justify-center hover:bg-amber-200 dark:hover:bg-slate-800 transition-colors">
                <Linkedin className="w-5 h-5 text-amber-900 dark:text-slate-400" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-amber-100 dark:bg-slate-900 border border-amber-200 dark:border-slate-800 flex items-center justify-center hover:bg-amber-200 dark:hover:bg-slate-800 transition-colors">
                <Twitter className="w-5 h-5 text-amber-900 dark:text-slate-400" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-amber-100 dark:bg-slate-900 border border-amber-200 dark:border-slate-800 flex items-center justify-center hover:bg-amber-200 dark:hover:bg-slate-800 transition-colors">
                <Github className="w-5 h-5 text-amber-900 dark:text-slate-400" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-amber-900 dark:text-white mb-4">Services</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm md:text-base text-amber-900/70 dark:text-slate-400 hover:text-amber-900 dark:hover:text-amber-500 transition-colors">Cloud Migration</a></li>
              <li><a href="#" className="text-sm md:text-base text-amber-900/70 dark:text-slate-400 hover:text-amber-900 dark:hover:text-amber-500 transition-colors">AI Solutions</a></li>
              <li><a href="#" className="text-sm md:text-base text-amber-900/70 dark:text-slate-400 hover:text-amber-900 dark:hover:text-amber-500 transition-colors">IT Transformation</a></li>
              <li><a href="#" className="text-sm md:text-base text-amber-900/70 dark:text-slate-400 hover:text-amber-900 dark:hover:text-amber-500 transition-colors">Data Management</a></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-amber-900 dark:text-white mb-4">Solutions</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm md:text-base text-amber-900/70 dark:text-slate-400 hover:text-amber-900 dark:hover:text-amber-500 transition-colors">For Startups</a></li>
              <li><a href="#" className="text-sm md:text-base text-amber-900/70 dark:text-slate-400 hover:text-amber-900 dark:hover:text-amber-500 transition-colors">For Enterprises</a></li>
              <li><a href="#" className="text-sm md:text-base text-amber-900/70 dark:text-slate-400 hover:text-amber-900 dark:hover:text-amber-500 transition-colors">For Industrial</a></li>
              <li><a href="#" className="text-sm md:text-base text-amber-900/70 dark:text-slate-400 hover:text-amber-900 dark:hover:text-amber-500 transition-colors">For Finance</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-amber-900 dark:text-white mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm md:text-base text-amber-900/70 dark:text-slate-400 hover:text-amber-900 dark:hover:text-amber-500 transition-colors">About Us</a></li>
              <li><Link to="/str8up-map" className="text-sm md:text-base text-amber-900/70 dark:text-slate-400 hover:text-amber-900 dark:hover:text-amber-500 transition-colors">str8up Map</Link></li>
              <li><a href="#" className="text-sm md:text-base text-amber-900/70 dark:text-slate-400 hover:text-amber-900 dark:hover:text-amber-500 transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm md:text-base text-amber-900/70 dark:text-slate-400 hover:text-amber-900 dark:hover:text-amber-500 transition-colors">Careers</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 md:pt-8 border-t border-amber-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-amber-900/70 dark:text-slate-400 text-xs md:text-sm text-center md:text-left">
            © 2025 ZAHLENTECH. All rights reserved.
          </p>
          <div className="flex items-center gap-4 md:gap-6">
            <a href="#" className="text-amber-900/70 dark:text-slate-400 hover:text-amber-900 dark:hover:text-amber-500 transition-colors text-xs md:text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-amber-900/70 dark:text-slate-400 hover:text-amber-900 dark:hover:text-amber-500 transition-colors text-xs md:text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-amber-900/70 dark:text-slate-400 hover:text-amber-900 dark:hover:text-amber-500 transition-colors text-xs md:text-sm">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}