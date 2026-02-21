import { motion } from "framer-motion";
import { Zap, Shield, Globe, Image, Clock, Code } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Process images in under 5 seconds with our optimized AI pipeline.",
  },
  {
    icon: Image,
    title: "HD Quality",
    description: "Support for images up to 5000×5000px. JPG, PNG, and WebP formats.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Images auto-delete after 24 hours. No permanent storage.",
  },
  {
    icon: Code,
    title: "Developer API",
    description: "RESTful API with rate limiting, usage tracking, and full documentation.",
  },
  {
    icon: Globe,
    title: "Batch Processing",
    description: "Process multiple images at once with our Pro and API plans.",
  },
  {
    icon: Clock,
    title: "Upload History",
    description: "Access your processed images for 7 days from your dashboard.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="relative py-24">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Everything you need for <span className="gradient-text">background removal</span>
          </h2>
          <p className="text-muted-foreground">
            Professional-grade AI that handles any image with precision and speed.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-card group rounded-2xl p-6 transition-all hover:border-primary/30"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
