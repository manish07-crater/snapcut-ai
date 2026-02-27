import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Upload, Sparkles, Zap, Image as ImageIcon, CheckCircle2 } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20 bg-mesh">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary shimmer"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Next-Gen AI Technology
            </motion.div>

            <h1 className="mb-6 text-5xl font-black leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
              Clean Backgrounds, <br />
              <span className="gradient-text">Zero Effort.</span>
            </h1>

            <p className="mb-8 max-w-lg text-xl text-muted-foreground leading-relaxed">
              Transform your photos instantly. Our advanced AI removes backgrounds with pixel-perfect precision in under 5 seconds.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="h-14 px-8 text-lg font-bold gradient-cta hover:opacity-90 transition-all rounded-xl glow-primary" asChild>
                <Link to="/upload">
                  <Upload className="mr-2 h-5 w-5" />
                  Try it Free
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-bold border-white/10 bg-white/5 hover:bg-white/10 transition-all rounded-xl backdrop-blur-md" asChild>
                <Link to="/api-docs">
                  <Zap className="mr-2 h-5 w-5 text-primary" />
                  API Access
                </Link>
              </Button>
            </div>

            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>No Credit Card</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>HD Quality</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div className="glass-card rounded-3xl p-4 md:p-6 overflow-hidden relative group">
              {/* Fake UI Header */}
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="text-[10px] text-muted-foreground/50 font-mono">snapcut-editor.ai</div>
              </div>

              <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted/20 border border-white/5 flex items-center justify-center group">
                 {/* Decorative background for the preview */}
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.05)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]" />
                
                <div className="z-10 text-center animate-float">
                  <div className="mx-auto mb-4 w-20 h-20 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center glow-primary">
                    <ImageIcon className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">Upload an image</h3>
                  <p className="text-sm text-muted-foreground">to see the AI magic happen</p>
                </div>

                {/* Floating tags */}
                <div className="absolute top-4 left-4 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider">
                  Processing...
                </div>
                <div className="absolute bottom-4 right-4 rounded-lg bg-primary/90 text-primary-foreground px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider glow-primary">
                  100% Precision
                </div>
              </div>
            </div>

            {/* Decorative back-cards */}
            <div className="absolute -z-10 top-10 -right-4 w-full h-full border border-primary/10 rounded-3xl bg-primary/5 -rotate-3" />
            <div className="absolute -z-20 top-20 -right-8 w-full h-full border border-accent/10 rounded-3xl bg-accent/5 -rotate-6" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
