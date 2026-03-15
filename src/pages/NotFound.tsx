import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AlertTriangle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: Accessing:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-mesh">
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="glass-card max-w-md w-full p-12 text-center rounded-[2.5rem] border-white/5 bg-black/40 backdrop-blur-2xl shadow-2xl">
          <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-red-500/10 text-red-500 glow-red">
            <AlertTriangle className="h-10 w-10" />
          </div>
          <h1 className="mb-2 text-6xl font-black gradient-text">404</h1>
          <h2 className="mb-4 text-2xl font-bold">Lost in Space?</h2>
          <p className="mb-8 text-muted-foreground leading-relaxed">
            The page <code className="bg-white/5 px-2 py-0.5 rounded text-primary font-mono">{location.pathname}</code> doesn't exist.
          </p>
          <Button size="xl" className="w-full font-black rounded-2xl gradient-cta glow-primary" asChild>
            <Link to="/">
              <Home className="mr-2 h-5 w-5" />
              Back to Safety
            </Link>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
