import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 pointer-events-none"
    >
      <div className="container mx-auto">
        <div className="glass-card pointer-events-auto rounded-2xl h-16 px-6 flex items-center justify-between border-white/5 bg-background/40 backdrop-blur-2xl shadow-2xl">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20 text-primary transition-transform group-hover:rotate-12">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-xl font-black tracking-tighter">
              Snap<span className="gradient-text">Cut</span>{" "}
              <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary uppercase border border-primary/20">Pro AI</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link to="/features" className="text-sm font-semibold text-muted-foreground transition-all hover:text-primary hover:tracking-widest">Features</Link>
            <Link to="/pricing" className="text-sm font-semibold text-muted-foreground transition-all hover:text-primary hover:tracking-widest">Pricing</Link>
            <Link to="/api-docs" className="text-sm font-semibold text-muted-foreground transition-all hover:text-primary hover:tracking-widest">API</Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="font-bold hover:bg-white/5" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button size="sm" className="gradient-cta font-bold rounded-xl glow-primary px-6" asChild>
              <Link to="/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
