import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeaturesSection from "@/components/landing/FeaturesSection";

const Features = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-20">
      <FeaturesSection />
    </div>
    <Footer />
  </div>
);

export default Features;
