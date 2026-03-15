import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Twitter, Instagram, Linkedin, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-black/50 backdrop-blur-xl">
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="space-y-6">
            <h3 className="text-xl font-black gradient-text drop-shadow-[0_0_15px_rgba(var(--primary),0.3)]">Snapcut AI</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Precision background removal powered by state-of-the-art AI technology.
            </p>
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">Product</h3>
            <div className="flex flex-col gap-3">
              <Link to="/features" className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</Link>
              <Link to="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
              <Link to="/api-docs" className="text-sm text-muted-foreground hover:text-primary transition-colors">API docs</Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">Legal</h3>
            <div className="flex flex-col gap-3">
              <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms-conditions" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</Link>
              <Link to="/refund-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Refund & Cancellation</Link>
              <Link to="/shipping-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Shipping & Delivery</Link>
              <Link to="/contact-us" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact Us</Link>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">Support</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-2 text-sm text-muted-foreground group">
                <Mail className="h-4 w-4 mt-1 text-primary group-hover:scale-110 transition-transform" />
                <a href="mailto:support@snapcut.ai" className="hover:text-primary transition-colors">support@snapcut.ai</a>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mt-1 text-primary" />
                <a href="tel:+917493060946" className="hover:text-primary transition-colors">+91 74930 60946</a>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground pt-4 border-t border-white/10">
                <MapPin className="h-4 w-4 mt-1 text-primary" />
                <p className="leading-relaxed">
                  Snapcut AI, 123 Tech park,<br />
                  Gorakhpur, UP 273001
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-tighter text-muted-foreground font-bold">
          <p>© {new Date().getFullYear()} Snapcut AI. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Powered by Razorpay</span>
            <span>AI Processing v2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
