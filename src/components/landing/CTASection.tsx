import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl rounded-2xl neon-border bg-card p-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Ready to remove backgrounds?
          </h2>
          <p className="mb-8 text-muted-foreground">
            Join thousands of creators using AutoCut AI for instant, professional results.
          </p>
          <Button variant="hero" size="lg" className="text-base" asChild>
            <Link to="/register">
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
