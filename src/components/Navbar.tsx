import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="SnapCut AI" className="h-8 w-8 rounded-md" />
          <span className="text-lg font-bold tracking-tight">
            Snap<span className="text-primary">Cut</span>{" "}
            <span className="rounded-md border border-primary/40 px-1.5 py-0.5 text-xs text-primary">AI</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link to="/features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Features</Link>
          <Link to="/pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Pricing</Link>
          <Link to="/api-docs" className="text-sm text-muted-foreground transition-colors hover:text-foreground">API</Link>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Log in</Link>
          </Button>
          <Button variant="hero" size="sm" asChild>
            <Link to="/register">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
