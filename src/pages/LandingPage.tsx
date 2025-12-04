import Hero from "../components/Hero";
import ProductSlider from "../components/ProductSlider";
import Services from "../components/Services";
import Features from "../components/Features";
import Solutions from "../components/Solutions";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <ProductSlider />
      <Services />
      <Features />
      <Solutions />
      <CTA />
      <Footer />
    </div>
  );
}