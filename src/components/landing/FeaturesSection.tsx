import { motion } from "framer-motion";
import { Zap, Shield, Globe, Image, Clock, Code, Sparkles } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Process images in under 5 seconds with our optimized AI pipeline. Real-time feedback.",
    color: "text-yellow-400",
    glow: "hover:shadow-[0_0_30px_rgba(250,204,21,0.2)]"
  },
  {
    icon: Image,
    title: "HD Quality",
    description: "Support for images up to 5000×5000px. JPG, PNG, and WebP formats with no loss.",
    color: "text-blue-400",
    glow: "hover:shadow-[0_0_30px_rgba(96,165,250,0.2)]"
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Images auto-delete after 24 hours. Your data is encrypted and never shared.",
    color: "text-green-400",
    glow: "hover:shadow-[0_0_30px_rgba(74,222,128,0.2)]"
  },
  {
    icon: Code,
    title: "Developer API",
    description: "RESTful API with rate limiting, usage tracking, and full documentation for scale.",
    color: "text-purple-400",
    glow: "hover:shadow-[0_0_30px_rgba(192,132,252,0.2)]"
  },
  {
    icon: Globe,
    title: "Batch Processing",
    description: "Process multiple images at once with our Pro and API plans. Drag & Drop folder support.",
    color: "text-pink-400",
    glow: "hover:shadow-[0_0_30px_rgba(244,114,182,0.2)]"
  },
  {
    icon: Clock,
    title: "Upload History",
    description: "Access your processed images for 7 days from your dashboard across all devices.",
    color: "text-orange-400",
    glow: "hover:shadow-[0_0_30px_rgba(251,146,60,0.2)]"
  },
];

const FeaturesSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -z-10" />

      <div className="container relative z-10">
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-4 flex items-center justify-center gap-2 text-primary font-bold tracking-widest uppercase text-xs"
          >
            <Sparkles className="h-4 w-4" />
            Core Capabilities
          </motion.div>
          <h2 className="mb-6 text-4xl font-black md:text-5xl">
            Why choose <span className="gradient-text">SnapCut AI</span>?
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We provide professional-grade AI tools that handle complex edges like hair and fur with unmatched precision.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass-card group relative rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 border-white/5 hover:border-primary/50 ${feature.glow}`}
            >
              <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/20 ${feature.color}`}>
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed italic">"{feature.description}"</p>

              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                <div className="shimmer absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
