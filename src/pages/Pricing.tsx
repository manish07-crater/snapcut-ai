import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingSection from "@/components/landing/PricingSection";

const Pricing = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-20">
      <PricingSection />
    </div>
    <Footer />
  </div>
);

export default Pricing;
