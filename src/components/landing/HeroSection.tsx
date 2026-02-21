import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Upload, Sparkles, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      {/* Ambient glow effects */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 top-1/2 h-64 w-64 rounded-full bg-accent/10 blur-[100px]" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
            <Sparkles className="h-3 w-3" />
            AI-Powered Background Removal
          </div>

          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Remove backgrounds{" "}
            <span className="gradient-text">instantly</span> with AI
          </h1>

          <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">
            Upload any image and get a clean, transparent background in seconds.
            Professional quality at lightning speed.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button variant="hero" size="lg" className="min-w-[200px] text-base" asChild>
              <Link to="/upload">
                <Upload className="mr-2 h-4 w-4" />
                Start Free
              </Link>
            </Button>
            <Button variant="hero-outline" size="lg" className="min-w-[200px] text-base" asChild>
              <Link to="/api-docs">
                <Zap className="mr-2 h-4 w-4" />
                View API
              </Link>
            </Button>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            5 free images/day · No credit card required
          </p>
        </motion.div>

        {/* Demo preview area */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="mx-auto mt-16 max-w-4xl"
        >
          <div className="glass-card rounded-2xl p-8">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="flex-1 rounded-xl border border-border/50 bg-muted/30 p-12 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Upload className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm font-medium">Original</p>
                <p className="text-xs text-muted-foreground">Upload your image</p>
              </div>

              <div className="flex items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-cta animate-pulse-glow">
                  <Zap className="h-4 w-4 text-primary-foreground" />
                </div>
              </div>

              <div className="flex-1 rounded-xl border border-primary/20 bg-muted/30 p-12 text-center neon-border">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm font-medium">Result</p>
                <p className="text-xs text-muted-foreground">Transparent background</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
