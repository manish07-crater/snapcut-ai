import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-3 text-sm font-semibold">Product</h3>
            <div className="flex flex-col gap-2">
              <Link to="/features" className="text-sm text-muted-foreground hover:text-foreground">Features</Link>
              <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link>
              <Link to="/api-docs" className="text-sm text-muted-foreground hover:text-foreground">API</Link>
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold">Company</h3>
            <div className="flex flex-col gap-2">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">About</Link>
              <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">Blog</Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link>
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold">Legal</h3>
            <div className="flex flex-col gap-2">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link>
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold">Support</h3>
            <div className="flex flex-col gap-2">
              <a href="mailto:support@autocut.ai" className="text-sm text-muted-foreground hover:text-foreground">support@autocut.ai</a>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-border/50 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} AutoCut AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
