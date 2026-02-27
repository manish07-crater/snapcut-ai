import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="py-32">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-card p-12 md:p-20 text-center border border-white/10"
        >
          {/* Animated Background Gradients */}
          <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-primary/20 blur-[80px]" />
          <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-accent/20 blur-[80px]" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary glow-primary">
              <Sparkles className="h-8 w-8" />
            </div>

            <h2 className="mb-6 text-4xl font-black md:text-5xl lg:text-6xl tracking-tight leading-tight">
              Ready to automate your <br />
              <span className="gradient-text">creative workflow?</span>
            </h2>

            <p className="mx-auto mb-10 max-w-2xl text-xl text-muted-foreground leading-relaxed">
              Experience the power of state-of-the-art AI. Sign up today and get your first 5 high-resolution images absolutely free.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="h-16 px-10 text-lg font-bold gradient-cta hover:opacity-90 transition-all rounded-2xl glow-primary" asChild>
                <Link to="/register">
                  Start Creating Now
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Link>
              </Button>
            </div>

            <p className="mt-8 text-sm text-muted-foreground/60 font-medium tracking-wide uppercase">
              Limited time: Get 20% off on Pro plans with code: SNAP20
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
