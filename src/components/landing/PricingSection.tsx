import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, Sparkles, Star } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Perfect for quick, one-off removals",
    features: ["5 images/day", "Standard 720p Quality", "Max 10MB per image", "Standard processing", "7-day history"],
    cta: "Start Free",
    highlighted: false,
    color: "bg-white/5",
  },
  {
    name: "Pro",
    price: "₹499",
    period: "/month",
    description: "The complete toolkit for creators",
    features: ["Unlimited HD images", "No Watermarks", "Priority processing", "30-day history", "Batch Processing", "Commercial License", "24/7 Support"],
    cta: "Go Pro",
    highlighted: true,
    color: "bg-primary/5",
  },
  {
    name: "Enterprise",
    price: "₹999",
    period: "/month",
    description: "Scale your creative production",
    features: ["5,000 API calls/month", "Dedicated API key", "Custom Webhooks", "Usage analytics", "Team Management", "SLA guarantee", "Bulk Exports"],
    cta: "Contact Sales",
    highlighted: false,
    color: "bg-accent/5",
  },
];

const PricingSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -z-10" />

      <div className="container relative z-10">
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-4 flex items-center justify-center gap-2 text-primary font-bold tracking-widest uppercase text-xs"
          >
            <Star className="h-4 w-4 fill-primary" />
            Pricing Plans
          </motion.div>
          <h2 className="mb-6 text-4xl font-black md:text-5xl">
            Flexible <span className="gradient-text">Pricing</span> for Everyone
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Choose the plan that fits your creative needs. Upgrade or cancel anytime.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative flex flex-col rounded-[2rem] p-8 transition-all duration-500 hover:-translate-y-2 border border-white/10 ${plan.highlighted
                  ? "neon-border bg-card shadow-[0_0_50px_rgba(3,169,244,0.15)]"
                  : "glass-card hover:bg-white/10"
                }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1.5 text-xs font-black uppercase text-primary-foreground glow-primary flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{plan.description}</p>
              </div>

              <div className="mb-8 items-baseline flex gap-1">
                <span className="text-5xl font-black tracking-tighter">{plan.price}</span>
                <span className="text-muted-foreground font-semibold">{plan.period}</span>
              </div>

              <Button
                variant={plan.highlighted ? "hero" : "hero-outline"}
                size="xl"
                className="mb-8 w-full font-black rounded-2xl"
                asChild
              >
                <Link to="/register">{plan.cta}</Link>
              </Button>

              <div className="space-y-4">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Included Features</p>
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm font-medium text-foreground/80 list-none">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    {feature}
                  </li>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
