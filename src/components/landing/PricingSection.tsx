import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Get started with basic usage",
    features: ["5 images/day", "Max 10MB per image", "Standard processing", "7-day history"],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "₹499",
    period: "/month",
    description: "Unlimited processing for professionals",
    features: ["Unlimited images", "Max 10MB per image", "Priority processing", "30-day history", "Batch upload", "API access"],
    cta: "Go Pro",
    highlighted: true,
  },
  {
    name: "API",
    price: "₹999",
    period: "/month",
    description: "For developers and businesses",
    features: ["5,000 API calls/month", "Dedicated API key", "Webhook support", "Usage analytics", "Priority support", "SLA guarantee"],
    cta: "Get API Access",
    highlighted: false,
  },
];

const PricingSection = () => {
  return (
    <section className="relative py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/5 blur-[120px]" />

      <div className="container relative">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Simple, transparent <span className="gradient-text">pricing</span>
          </h2>
          <p className="text-muted-foreground">Start free. Scale as you grow.</p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`rounded-2xl p-6 ${
                plan.highlighted
                  ? "neon-border bg-card"
                  : "glass-card"
              }`}
            >
              <h3 className="mb-1 text-lg font-semibold">{plan.name}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{plan.description}</p>
              <div className="mb-6">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>

              <Button
                variant={plan.highlighted ? "hero" : "hero-outline"}
                className="mb-6 w-full"
                asChild
              >
                <Link to="/register">{plan.cta}</Link>
              </Button>

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
