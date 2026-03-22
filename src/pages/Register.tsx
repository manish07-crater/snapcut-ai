import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, Check, Crown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { initializeRazorpay, createPaymentOptions } from "@/lib/razorpay";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [plan, setPlan] = useState(location.state?.defaultPlan === "pro" ? "pro" : "free");
  const { toast } = useToast();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Strict validation before payment or registration
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all details before proceeding.",
        variant: "destructive",
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    if (plan === "pro") {
      const options = createPaymentOptions(
        499,
        "Pro Plan",
        "Unlimited Background Removals & HD Quality",
        (response: any) => {
          toast({
            title: "Payment Successful! 🎉",
            description: "Account created and Pro plan activated.",
          });
          // Here you would typically call your backend to finalize registration
        }
      );
      initializeRazorpay(options);
    } else {
      toast({
        title: "Account Created! ✨",
        description: "Welcome to Snapcut AI. Start editing your images.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-mesh">
      <Navbar />
      <div className="container flex min-h-screen items-center justify-center pt-24 pb-16">
        <div className="glass-card mx-auto w-full max-w-md rounded-[2.5rem] p-8 md:p-10 border-white/10 shadow-2xl relative overflow-hidden">
          {plan === "pro" && (
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-accent to-primary animate-pulse" />
          )}

          <div className="mb-8 text-center">
            <div className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl transition-all duration-500 ${plan === 'pro' ? 'bg-primary text-white glow-primary scale-110 rotate-3' : 'bg-primary/10 text-primary glow-primary'}`}>
              {plan === 'pro' ? <Crown className="h-10 w-10 text-white" /> : <Sparkles className="h-10 w-10" />}
            </div>
            <h1 className="text-3xl font-black tracking-tight mb-2">
              {plan === 'pro' ? 'Upgrade to Pro' : 'Join the future'}
            </h1>
            <p className="text-sm text-muted-foreground font-medium">
              {plan === 'pro' ? 'Unlock unlimited creative potential' : 'Create your Snapcut AI account'}
            </p>
          </div>

          <Tabs defaultValue={plan} className="mb-8" onValueChange={setPlan}>
            <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/10 p-1 h-12 rounded-xl">
              <TabsTrigger value="free" className="rounded-lg font-bold data-[state=active]:bg-white/5 data-[state=active]:text-primary">Free</TabsTrigger>
              <TabsTrigger value="pro" className="rounded-lg font-bold data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:glow-primary">Pro (Paid)</TabsTrigger>
            </TabsList>
          </Tabs>

          <form className="space-y-4" onSubmit={handleRegister} noValidate>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required className="h-12 bg-white/5" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-12 bg-white/5" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required className="h-12 bg-white/5" />
            </div>

            <Button variant={plan === 'pro' ? "hero" : "hero-outline"} className="w-full h-14 text-lg font-bold rounded-2xl glow-primary mt-4" type="submit">
              {plan === 'pro' ? (
                <>Pay ₹499 & Upgrade <Crown className="ml-2 h-5 w-5" /></>
              ) : (
                <>Create Free Account <Sparkles className="ml-2 h-5 w-5" /></>
              )}
            </Button>

            {plan === 'pro' && (
              <div className="flex items-center justify-center gap-2 mt-4 text-[10px] uppercase font-black text-muted-foreground tracking-widest bg-white/5 py-2 rounded-lg border border-white/5">
                <Check className="h-3 w-3 text-primary" /> Multi-Layer AI · <Check className="h-3 w-3 text-primary" /> HD Output · <Check className="h-3 w-3 text-primary" /> API Access
              </div>
            )}

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5" /></div>
              <div className="relative flex justify-center text-xs"><span className="bg-black px-4 text-muted-foreground font-bold uppercase tracking-widest">or</span></div>
            </div>

            <Button variant="hero-outline" className="w-full h-14 rounded-2xl border-white/10 hover:bg-white/5" type="button">
              Continue with Google
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-bold hover:underline">Sign in</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
